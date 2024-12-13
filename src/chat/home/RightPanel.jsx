import ChatPlaceHolder from './ChatPlaceholder'
import { IKImage } from 'imagekitio-react'
import { MoreVertical, Video, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import MessageContainer from './MessageContainer'
import MessageInput from './MessageInput'
import GroupMembersDialog from './GroupMembersDialog'
import { useConversationStore } from '../store/chatStore'
import TypingUsers from './TypingUsers'
import { useState } from 'react'
import Users from './Mobile/Users'
import AllConversation from './Mobile/AllConversation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarMenuAction } from '@/components/ui/sidebar'
import { FaArrowLeft } from 'react-icons/fa'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'

const RightPanel = () => {
    const { stateType, selectedConversation, setSelectedConversation } = useConversationStore()
    const [showName, setShowName] = useState('')
    const { screenWidth } = useGetScreenWidth()

    if ((!selectedConversation && (stateType === '' || stateType === null)) || (screenWidth > 594 && stateType !== 'chat')) return <ChatPlaceHolder />
    if (screenWidth <= 594) {
        if (stateType === 'users') return <Users />
        if (stateType === 'allChat') return <AllConversation />
    }

    const conversationName = selectedConversation?.groupName || selectedConversation?.userDetails?.username
    const conversationImage = selectedConversation?.groupImage || selectedConversation?.userDetails?.profileImage
    const isGroup = selectedConversation?.isGroup

    return (
        <div className='w-3/4 chsm:w-full flex flex-col'>
            <div className='w-full sticky top-0 z-50'>
                <div className='flex justify-between bg-[#f0f2f5] p-3'>
                    <div className='flex gap-3 items-center'>
                        <FaArrowLeft className='hidden chsm:block' onClick={() => setSelectedConversation({ conversation: null, type: 'allChat' })} />
                        <IKImage
                            key={conversationImage}
                            urlEndpoint={"https://ik.imagekit.io/4sbkuudrb"}
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
                            <TypingUsers showName={showName} setShowName={setShowName} currentConversationId={selectedConversation?._id} />
                            {isGroup && !showName && <GroupMembersDialog selectedConversation={selectedConversation} />}
                        </div>
                    </div>

                    <div className='flex items-center gap-7 mr-5'>
                        <Link to='video-call' target='_blank' rel='noopener noreferrer'>
                            <Video size={23} />
                        </Link>
                        <X size={16} className='cursor-pointer chsm:hidden' onClick={() => setSelectedConversation({ conversation: null, type: '' })} />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction className='relative -mt-3 hidden chsm:block'>
                                    <MoreVertical className='font-500 text-base' />
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className='mr-4 z-[250]' sideOffset={25} onClick={() => setSelectedConversation({ conversation: null, type: 'allChat' })} >
                                <DropdownMenuItem>
                                    <span>Close chat</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='text-red-600'>
                                    <span>Delete chat</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <MessageContainer />

            <MessageInput />
        </div >
    );
};
export default RightPanel