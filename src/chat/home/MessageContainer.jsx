import { messages } from '../dummyData/db'
import ChatBubble from './ChatBubble'

const MessageContainer = () => {
    return (
        <div className='relative p-3 flex-1 overflow-auto h-full bg-light-img'>
            <div className='mx-12 flex flex-col gap-3 h-full'>
                {messages?.map(msg => (
                    <div key={msg._id}>
                        <ChatBubble />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MessageContainer