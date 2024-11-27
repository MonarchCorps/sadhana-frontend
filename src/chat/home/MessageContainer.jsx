import { useQuery } from '@tanstack/react-query'
import ChatBubble from './ChatBubble'
import useAuth from '@/hooks/useAuth'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useConversationStore } from '../store/chatStore'

const MessageContainer = () => {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const { selectedConversation } = useConversationStore()

    const { data: messages } = useQuery({
        queryKey: ['fetchMessages', auth?._id],
        queryFn: () =>
            axiosPrivate.get(
                `/message/${auth?._id}`,
                JSON.stringify({
                    conversation: selectedConversation?._id
                })
            ).then((res) => {
                return res?.data
            }),
        enabled: !!auth?._id
    })
    console.log(messages)

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