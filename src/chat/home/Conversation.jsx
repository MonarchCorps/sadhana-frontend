/* eslint-disable react/prop-types */
import { CheckCheck, ImageIcon, Users, VideoIcon } from 'lucide-react'
import { formatDate } from '../lib/utils'
import { IKImage } from 'imagekitio-react'
import trim from '@/utils/trim'
import useAuth from '@/hooks/useAuth'
import useOnlineUsers from '@/hooks/useOnlineUsers'

import { useConversationStore } from '../store/chatStore'
import { useEffect } from 'react'
import useSocket from '@/hooks/useSocket'
import { useQueryClient } from '@tanstack/react-query'

const Conversation = ({ conversation }) => {
    const { auth } = useAuth()
    const { onlineUsers } = useOnlineUsers()
    const { connectSocket } = useSocket()
    const queryClient = useQueryClient()

    const conversationImage = conversation?.groupImage || conversation?.userDetails?.profileImage
    const conversationName = conversation?.groupName || conversation?.userDetails?.username
    const lastMessage = conversation?.lastMessage
    const lastMessageType = lastMessage?.messageType
    const isGroup = conversation?.isGroup

    const { selectedConversation, setSelectedConversation } = useConversationStore()
    const activeBgClass = selectedConversation?._id === conversation?._id

    const socket = connectSocket(auth?._id)

    const onlineParticipants = conversation?.participants
        ?.filter((participant) => participant !== auth?._id)
        .map((participant) => ({
            id: participant,
            isOnline: onlineUsers.includes(participant),
        }))

    useEffect(() => {
        const handleNewConversation = (newConversation) => {
            console.log('Received new conversation:', newConversation);
            if (newConversation) {
                queryClient.invalidateQueries({ queryKey: ['fetchConversations', auth?._id] });
            }
        };

        socket.on('newConversation', handleNewConversation);

        return () => {
            socket.off('newConversation', handleNewConversation);
        };
    }, [auth?._id, queryClient, socket, selectedConversation?._id]);

    const isAnyParticipantOnline = onlineParticipants?.some((p) => p.isOnline)

    return (
        <>
            <div
                className={`flex gap-3 p-3 hover:bg-[#f4f5f5] cursor-pointer ${activeBgClass ? 'bg-[#eff0f0]' : ''
                    }`}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div
                    className={`w-12 ${!isGroup && isAnyParticipantOnline
                        ? 'border border-gray-900 overflow-visible relative rounded-full'
                        : ''
                        }`}
                >
                    {!isGroup && isAnyParticipantOnline && (
                        <div className='absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-solid border-[#020817] z-50' />
                    )}
                    <IKImage
                        path={conversationImage}
                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                        className='w-10 h-10 rounded-full object-cover'
                        lqip={{ active: true, quality: 20 }}
                        transformation={[{ quality: 'auto', format: 'auto' }]}
                        alt={`${conversationName} image`}
                    />
                </div>
                <div className='w-full'>
                    <div className='flex items-center'>
                        <h3 className='text-xs lg:text-sm font-medium'>{conversationName}</h3>
                        <span className='text-[10px] lg:text-xs text-gray-500 ml-auto'>
                            {formatDate(lastMessage?.createdAt || conversation?.createdAt)}
                        </span>
                    </div>
                    <p className='text-[12px] mt-1 text-gray-500 flex items-center gap-1 '>
                        {lastMessage?.sender === auth?._id && <CheckCheck size={15} />}
                        {conversation?.isGroup && <Users size={16} />}
                        {!lastMessage && 'Say Hi!'}
                        {lastMessageType === 'text' ? (
                            <span className='text-xs'>
                                {lastMessage?.content.length > 30
                                    ? trim(lastMessage?.content, 30)
                                    : lastMessage?.content}
                            </span>
                        ) : null}
                        {lastMessageType === 'image' && (
                            <>
                                <span className='text-xs'>Photo</span> <ImageIcon size={16} />
                            </>
                        )}
                        {lastMessageType === 'video' && (
                            <>
                                <span className='text-xs'>Video</span> <VideoIcon size={16} />
                            </>
                        )}
                    </p>
                </div>
            </div>
            <hr className='h-[1px] mx-10 bg-[#f0f2f5]' />
        </>
    )
}

export default Conversation
