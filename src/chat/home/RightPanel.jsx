import ChatPlaceHolder from './ChatPlaceholder'
import { IKImage } from 'imagekitio-react'
import { Phone, Video, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import MessageContainer from './MessageContainer'
import MessageInput from './MessageInput'
import GroupMembersDialog from './GroupMembersDialog'
import { useConversationStore } from '../store/chatStore'
import TypingUsers from './TypingUsers'
import { useState } from 'react'

const RightPanel = () => {
    const { selectedConversation, setSelectedConversation } = useConversationStore()
    const [showName, setShowName] = useState('')

    if (!selectedConversation) return <ChatPlaceHolder />

    const conversationName = selectedConversation?.groupName || selectedConversation?.userDetails?.username
    const conversationImage = selectedConversation?.groupImage || selectedConversation?.userDetails?.profileImage
    const isGroup = selectedConversation?.isGroup

    return (
        <div className='w-3/4 flex flex-col'>
            <div className='w-full sticky top-0 z-50'>
                {/* Header */}
                <div className='flex justify-between bg-[#f0f2f5] p-3'>
                    <div className='flex gap-3 items-center'>
                        <IKImage
                            key={conversationImage}
                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                            path={conversationImage}
                            className='animate-pulse w-10 h-10 rounded-full object-cover'
                            loading='lazy'
                            lqip={{
                                active: true,
                                quality: 20
                            }}
                            alt={`${conversationName} image`}
                        />
                        <div className='flex flex-col'>
                            <p className='text-sm'>{conversationName}</p>
                            <TypingUsers showName={showName} setShowName={setShowName} />
                            {isGroup && !showName && <GroupMembersDialog selectedConversation={selectedConversation} />}
                        </div>
                    </div>

                    <div className='flex items-center gap-7 mr-5'>
                        <Link to='/video-call' target='_blank' rel='noopener noreferrer'>
                            <Video size={23} />
                        </Link>
                        <Link to='/voice-call' target='_blank' rel='noopener noreferrer'>
                            <Phone size={23} />
                        </Link>
                        <X size={16} className='cursor-pointer' onClick={() => setSelectedConversation(null)} />
                    </div>
                </div>
            </div>
            <MessageContainer />

            <MessageInput />
        </div >
    );
};
export default RightPanel