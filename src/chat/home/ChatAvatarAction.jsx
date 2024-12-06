/* eslint-disable react/prop-types */
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import useAuth from '@/hooks/useAuth'
import { Ban, ChevronDown, LogOut } from 'lucide-react'
import { useConversationStore } from '../store/chatStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useEffect } from 'react'
import useSocket from '@/hooks/useSocket'

function ChatAvatarAction({ message, conversationId, handleCreateConversation }) {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    const { connectSocket } = useSocket()
    const { selectedConversation, setSelectedConversation } = useConversationStore()

    const isMember = selectedConversation?.participants?.includes(message.sender?._id)
    const socket = connectSocket(auth?._id)

    useEffect(() => {
        socket.on('removedUser', (removedUser) => {
            if (removedUser.conversation === selectedConversation?._id) {
                queryClient.invalidateQueries({ queryKey: ['fetchConversations', auth?._id, selectedConversation?._id] })
                queryClient.invalidateQueries({ queryKey: ['fetchMessages', auth?._id, selectedConversation?._id] })
            }
        })

        return () => {
            socket.off('newMessage')
        }
    }, [auth?._id, selectedConversation?._id, queryClient, socket])

    const handleRemoveUser = useMutation({
        mutationFn: ({ id, conversationId }) => {
            return axiosPrivate.post(
                `/conversation/remover-member/${id}`,
                { conversationId },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            )
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['fetchConversations', auth?._id] })
            queryClient.invalidateQueries({ queryKey: ['fetchMessages', auth?._id, selectedConversation?._id] })
            setSelectedConversation({ conversation: response.data, type: 'chat' })
            toast.success('Success')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return (
        <>
            {
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='absolute top-0 right-0 opacity-0 transform scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 cursor-pointer z-50 bg-[#1f2b32]'>
                            <ChevronDown className='w-[27px] font-900 text-white shadow-md' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-30' >
                        <DropdownMenuItem className='cursor-pointer' onClick={() => handleCreateConversation.mutate({ userId: message.sender?._id })}>
                            <span className='text-nowrap'>Message Privately</span>
                        </DropdownMenuItem>
                        {
                            selectedConversation?.admin === auth?._id && (
                                <>
                                    {message?.messageType === 'text'
                                        && <DropdownMenuItem className='cursor-pointer'>
                                            <span >Edit Message</span>
                                        </DropdownMenuItem>}
                                    <DropdownMenuItem className='cursor-pointer'>
                                        <span >Delete Message</span>
                                    </DropdownMenuItem>
                                    {
                                        isMember ? (
                                            <DropdownMenuItem className='cursor-pointer text-red-500' onClick={() => handleRemoveUser.mutate({ id: message.sender?._id, conversationId })}>
                                                <LogOut />
                                                <span >Remove user</span>
                                            </DropdownMenuItem>
                                        ) : (
                                            <DropdownMenuItem className='text-red-500'>
                                                <Ban />
                                                <span >Not a member</span>
                                            </DropdownMenuItem>
                                        )}
                                </>
                            )
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            }
        </>
    )

}

export default ChatAvatarAction