/* eslint-disable react/prop-types */
import useAuth from '@/hooks/useAuth'
import { useConversationStore } from '../store/chatStore'
import applyCustomStyles from '@/utils/applyCustomStyles'
import ChatBubbleAvatar from './ChatBubbleAvatar'
import DateIndicator from './DateIndicator'
import { CheckCheck } from 'lucide-react'
import ReactPlayer from 'react-player'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'

const ChatBubble = ({ message, previousMessage, lastIdx, endRef }) => {
    const { auth } = useAuth()
    console.log(message)
    const date = new Date(message?.createdAt)
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    const time = `${hour}:${minute}`

    const { selectedConversation } = useConversationStore()
    const isMember = selectedConversation?.participants?.includes(message?.sender?._id) || false
    const isGroup = selectedConversation?.isGroup
    const fromMe = message?.sender?._id === auth?._id
    const bgClass = fromMe ? 'bg-[#d9fdd3]' : 'bg-[#1f2b32] text-[#dddbdb]'

    const [open, setOpen] = useState(false)

    const renderMessageContent = () => {
        switch (message.messageType) {
            case 'text':
                return <TextMessage message={message} />
            case 'image':
                return <ImageMessage message={message} handleClick={() => setOpen(true)} />
            case 'video':
                return <VideoMessage message={message} />
            default:
                return null
        }
    }

    if (!fromMe) {
        return (
            <>
                <DateIndicator message={message} previousMessage={previousMessage} />
                <div className={`flex gap-1 w-2/3 ${lastIdx && 'mb-1'}`}>
                    <ChatBubbleAvatar isGroup={isGroup} isMember={isMember} message={message} previousMessage={previousMessage} />
                    <div className={`flex z-20 max-w-fit px-2 pt-1 rounded-md shadow-md relative ${bgClass}`}>
                        <OtherMessageIndicator />
                        {renderMessageContent()}
                        {open && <ImageDialog src={message?.content} open={open} onClose={() => setOpen(false)} />}
                        <MessageTime time={time} fromMe={fromMe} message={message} />
                    </div>
                </div>
                {lastIdx && <div ref={endRef}></div>}
            </>
        );
    }

    return (
        <>
            <DateIndicator message={message} previousMessage={previousMessage} />
            <div className='flex gap-1 w-2/3 ml-auto'>
                <div className={`flex z-20 max-w-fit px-2 py-1 rounded-md shadow-md ml-auto relative ${bgClass}`}>
                    <SelfMessageIndicator />
                    {renderMessageContent()}
                    {open && <ImageDialog src={message?.content} open={open} onClose={() => setOpen(false)} />}
                    <MessageTime time={time} fromMe={fromMe} message={message} />
                </div>
            </div>
            {lastIdx && <div ref={endRef}></div>}
        </>
    )
}

export default ChatBubble


const ImageDialog = ({ src, onClose, open }) => {
    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >
            <DialogContent className='min-w-[750px] bg-[#005c4b]'>
                <DialogDescription className='relative h-[450px] flex justify-center'>
                    <img src={src} className='rounded-lg object-contain' alt='image' />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

const VideoMessage = ({ message }) => {
    return <ReactPlayer url={message.content} width='250px' height='250px' controls={true} />;
}

const ImageMessage = ({ message, handleClick }) => {
    return (
        <div className='w-[250px] h-[250px] my-1 relative block'>
            <img
                src={message.content}
                className='cursor-pointer object-cover rounded size-full'
                alt='image'
                onClick={handleClick}
            />
        </div>
    );
}

const MessageTime = ({ time, fromMe, message }) => {
    return (
        <p className={`text-[10px] mt-2 self-end flex gap-1 items-center ${message?.messageType === 'video' || message?.messageType === 'image' ? 'absolute bg-slate-200 text-slate-800 p-1 rounded bottom-3 right-3 font-500 font-sans' : ''}`}>
            {time} {fromMe && <CheckCheck size={15} />}
        </p>
    );
}

const OtherMessageIndicator = () => (
    <div className='absolute bg-[#1f2b32] top-0 -left-[4px] w-3 h-3 rounded-bl-full' />
)

const SelfMessageIndicator = () => (
    <div className='absolute bg-[#d9fdd3] top-0 -right-[3px] w-3 h-3 rounded-br-full overflow-hidden' />
)

const TextMessage = ({ message }) => {
    const isLink = /^(ftp|http|https):\/\/[^ ']+$/.test(message.content); // Check if the content is a URL

    return (
        <div>
            {isLink ? (
                <a
                    href={message.content}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`mr-2 text-sm font-light text-blue-400 underline`}
                >
                    {message.content}
                </a>
            ) : (
                <p className={`mr-2 mb-2 text-sm font-light`}>{applyCustomStyles(message.content)}</p>
            )}
        </div>
    )
}