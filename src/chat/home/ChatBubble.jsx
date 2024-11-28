/* eslint-disable react/prop-types */
import useAuth from '@/hooks/useAuth'
import { useConversationStore } from '../store/chatStore'
import applyCustomStyles from '@/utils/applyCustomStyles'
import ChatBubbleAvatar from './ChatBubbleAvatar'
import DateIndicator from './DateIndicator'
import { CheckCheck } from 'lucide-react'

const ChatBubble = ({ message, previousMessage, lastIdx, endRef }) => {
    const { auth } = useAuth()

    const date = new Date(message?.createdAt)
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    const time = `${hour}:${minute}`

    const { selectedConversation } = useConversationStore()
    const isMember = selectedConversation?.participants?.includes(message?.sender?._id) || false
    const isGroup = selectedConversation?.isGroup
    const fromMe = message?.sender?._id === auth?._id
    const bgClass = fromMe ? 'bg-[#d9fdd3]' : 'bg-[#1f2b32] text-[#dddbdb]'

    if (!fromMe) {
        return (
            <>
                <DateIndicator message={message} previousMessage={previousMessage} />
                <div className={`flex gap-1 w-2/3 ${lastIdx && 'mb-1'}`}>
                    <ChatBubbleAvatar isGroup={isGroup} isMember={isMember} message={message} previousMessage={previousMessage} />
                    <div className={`flex  z-20 max-w-fit px-2 pt-1 rounded-md shadow-md relative ${bgClass}`}>
                        <OtherMessageIndicator />
                        <TextMessage message={message} />
                        <MessageTime time={time} fromMe={fromMe} />
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
                <div className={`flex z-20 max-w-fit px-2 pt-1 rounded-md shadow-md ml-auto relative ${bgClass}`}>
                    <SelfMessageIndicator />
                    <TextMessage message={message} />
                    <MessageTime time={time} fromMe={fromMe} />
                </div>
            </div>
            {lastIdx && <div ref={endRef}></div>}
        </>
    )
}

export default ChatBubble

const MessageTime = ({ time, fromMe }) => {
    return (
        <p className='text-[10px] mt-2 self-end flex gap-1 items-center'>
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