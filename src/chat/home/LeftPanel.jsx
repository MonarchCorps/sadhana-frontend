import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { ListFilter, LogOut, Search } from 'lucide-react'
import Conversation from './Conversation'
import UserListDialog from './UserListDialog'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useAuth from '@/hooks/useAuth'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import Loading4 from '@/components/Loaders/Loading4'
import { IKImage } from 'imagekitio-react'
import useSocket from '@/hooks/useSocket'
import { useConversationStore } from '../store/chatStore'
import useLogout from '@/hooks/useLogout'

const LeftPanel = () => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    const { logout } = useLogout()

    const { connectSocket } = useSocket()
    const { selectedConversation, setSelectedConversation } = useConversationStore()
    const socket = connectSocket(auth?._id)

    const { data: conversations, isPending } = useQuery({
        queryKey: ['fetchConversations', auth?._id],
        queryFn: () =>
            axiosPrivate.get(`/conversation/${auth?._id}`).then((res) => res?.data),
        enabled: !!auth?._id,
    })

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            queryClient.setQueryData(['fetchConversations', auth?._id], (oldConversations) => {
                if (!oldConversations) return []

                return oldConversations.map((conversation) => {
                    if (conversation?._id === newMessage?.conversation) {
                        return {
                            ...conversation,
                            lastMessage: {
                                content: newMessage.content,
                                createdAt: newMessage.createdAt,
                                sender: newMessage.sender,
                                messageType: newMessage.messageType
                            },
                        }
                    }
                    return conversation
                })
            })
        }

        socket.on('newMessage', handleNewMessage)

        return () => {
            socket.off('newMessage', handleNewMessage)
        }
    }, [auth?._id, queryClient, socket, selectedConversation?._id])

    useEffect(() => {
        const conversationIds = conversations?.map(conversation => conversation?._id)
        if (selectedConversation && conversationIds && !conversationIds.includes(selectedConversation?._id)) {
            setSelectedConversation({ conversation: null, type: '' })
        }
    }, [conversations, selectedConversation, setSelectedConversation])

    return (
        <div className="w-1/4 pmd:w-[30%] himd:w-[35%] md:w-[38%] chsm:hidden border-slate-600 border-r">
            <div className="sticky top-0 bg-[#ffffff] z-10">
                <div className="flex justify-between bg-[#f0f2f5] p-3 items-center">
                    <Link to='/dashboard'>
                        <IKImage
                            key={auth?.profileImage}
                            urlEndpoint={"https://ik.imagekit.io/4sbkuudrb"}
                            path={auth?.profileImage}
                            className="w-10 h-10 object-cover rounded-full"
                            loading="lazy"
                            lqip={{
                                active: true,
                                quality: 20,
                            }}
                            alt={`${auth?.username || 'User'} image`}
                        />

                    </Link>
                    <div className="flex items-center gap-3">
                        <UserListDialog />
                        <LogOut size={20} className="cursor-pointer" onClick={logout} />
                    </div>
                </div>
                <div className="p-3 flex items-center">
                    <div className="relative h-10 mx-3 flex-1">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
                            size={18}
                        />
                        <Input
                            type="text"
                            placeholder="Search or start a new chat"
                            className="pl-10 py-2 text-sm w-full rounded shadow-sm bg-[#f0f2f5] focus-visible:ring-transparent"
                        />
                    </div>
                    <ListFilter className="cursor-pointer" />
                </div>
            </div>

            <div className="my-3 flex flex-col gap-0 max-h-[80%] overflow-auto">
                {isPending ? (
                    <div className="size-full grid place-content-center text-center h-[60vh]">
                        <Loading4 size={30} bgColor="#000" />
                    </div>
                ) : (
                    conversations?.map((conversation) => (
                        <Conversation key={conversation?._id} conversation={conversation} />
                    ))
                )}
                {conversations?.length === 0 && (
                    <>
                        <p className="text-center text-gray-500 text-sm mt-3">No conversations yet</p>
                        <p className="text-center text-gray-500 text-sm mt-3 ">
                            We understand you&aposre an introvert, but you&aposve got to start somewhere 😊
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default LeftPanel