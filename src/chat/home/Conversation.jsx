/* eslint-disable react/prop-types */
import { ImageIcon, Users, VideoIcon } from 'lucide-react'
import { MessageSeenSvg } from '../lib/svgs'
import { formatDate } from '../lib/utils'
import { IKImage } from 'imagekitio-react';
import useAuth from '@/hooks/useAuth';
import trim from '@/utils/trim';

const Conversation = ({ conversation }) => {
    const { auth } = useAuth()

    const conversationImage = conversation.groupImage
    const conversationName = conversation.groupName || 'Private Chat'
    const lastMessage = conversation.lastMessage
    const lastMessageType = lastMessage?.messageType
    const authUser = { _id: 'user1' }

    return (
        <>
            <div className={`flex gap-2 items-center p-3 hover:bg-[#f4f5f5] cursor-pointer`}>
                <div className={`${conversation?.isOnline && 'border border-gray-900 overflow-visible relative rounded-full'}`}>
                    {conversation?.isOnline && (
                        <div className='absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-solid border-[#020817] z-50' />
                    )}
                    <IKImage
                        key={auth?.profileImage}
                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                        path={auth?.profileImage}
                        className='w-10 h-8 object-cover rounded-full' loading='lazy'
                        lqip={{
                            active: true,
                            quality: 20
                        }}
                        alt={`${auth?.username} image`}
                    />
                </div>
                <div className='w-full'>
                    <div className='flex items-center'>
                        <h3 className='text-xs lg:text-sm font-medium'>{conversationName}</h3>
                        <span className='text-[10px] lg:text-xs text-gray-500 ml-auto'>
                            {formatDate(lastMessage?._creationTime || conversation._creationTime)}
                        </span>
                    </div>
                    <p className='text-[12px] mt-1 text-gray-500 flex items-center gap-1 '>
                        {lastMessage?.sender === authUser?._id ? <MessageSeenSvg /> : ''}
                        {conversation.isGroup && <Users size={16} />}
                        {!lastMessage && 'Say Hi!'}
                        {lastMessageType === 'text'
                            ? lastMessage?.content.length > 30 ? (
                                <span className='text-xs'>{trim(lastMessage?.content, 30)}</span>
                            ) : (
                                <span className='text-xs'>{lastMessage?.content}</span>
                            ) : null}
                        {lastMessageType === 'image' && (<><span className='text-xs'>Photo</span> <ImageIcon size={16} /></>)}
                        {lastMessageType === 'video' && (<><span className='text-xs'>Video</span> <VideoIcon size={16} /></>)}
                    </p>
                </div>
            </div>
            <hr className='h-[1px] mx-10 bg-[#f0f2f5]' />
        </>
    )
}
export default Conversation