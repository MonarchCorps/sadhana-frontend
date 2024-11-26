import useAuth from '@/hooks/useAuth'
import ChatPlaceHolder from './ChatPlaceholder'
import { IKImage } from 'imagekitio-react'
import { Phone, Video, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import MessageContainer from './MessageContainer'
import MessageInput from './MessageInput'
import GroupMembersDialog from './GroupMemebersDialog'

const RightPanel = () => {
    const { auth } = useAuth()
    const selectedConversation = true
    if (!selectedConversation) return <ChatPlaceHolder />

    const conversationName = 'John Doe'
    const isGroup = true

    return (
        <div className='w-3/4 flex flex-col'>
            <div className='w-full sticky top-0 z-50'>
                {/* Header */}
                <div className='flex justify-between bg-[#f0f2f5] p-3'>
                    <div className='flex gap-3 items-center'>
                        <IKImage
                            key={auth?.profileImage}
                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                            path={auth?.profileImage}
                            className='animate-pulse w-10 h-10 rounded-full object-cover'
                            loading='lazy'
                            lqip={{
                                active: true,
                                quality: 20
                            }}
                            alt={`${auth?.username} image`}
                        />
                        <div className='flex flex-col'>
                            <p className='text-sm'>{conversationName}</p>
                            {isGroup && <GroupMembersDialog />}
                            {!isGroup && (auth?.roles?.includes(parseInt(import.meta.env.VITE_ADMIN_CODE))
                                ?
                                <span className='border border-solid border-[#15433c] bg-[#45837a1a] text-[#15433c] rounded-2xl text-center p-0 h-5 grid place-items-center'>
                                    <span className='text-[0.65rem] tracking-tight leading-none pt-[0.15rem]'>Admin </span>
                                </span>
                                :
                                auth?.roles?.includes(parseInt(import.meta.env.VITE_INSTRUCTOR_CODE)) ?
                                    <span className='border border-solid border-[#4358d1] bg-[#2e387122] text-[#4358d1] rounded-2xl text-center p-0 h-5 grid place-items-center'>
                                        <span className='text-[0.65rem] tracking-tight leading-none pt-[0.15rem]'>Instructor </span>
                                    </span>

                                    :
                                    < span className='border border-solid border-[#d143ab] bg-[#2e387122] text-[#d143ab] rounded-2xl text-center p-0 h-5 grid place-items-center'>
                                        <span className='text-[0.65rem] tracking-tight leading-none pt-[0.15rem]'>User </span>
                                    </span>
                            )}

                        </div>
                    </div>

                    <div className='flex items-center gap-7 mr-5'>
                        <Link to='/video-call' target='_blank' rel='noopener noreferrer'>
                            <Video size={23} />
                        </Link>
                        <Link to='/voice-call' target='_blank' rel='noopener noreferrer'>
                            <Phone size={23} />
                        </Link>
                        <X size={16} className='cursor-pointer' />
                    </div>
                </div>
            </div>
            <MessageContainer />

            <MessageInput />
        </div >
    );
};
export default RightPanel