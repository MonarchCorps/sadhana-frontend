import { useEffect, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import ChatBubble from './ChatBubble'
import useAuth from '@/hooks/useAuth'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useSocket from '@/hooks/useSocket'
import { useConversationStore } from '../store/chatStore'

const MessageContainer = () => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const { selectedConversation } = useConversationStore()
    const queryClient = useQueryClient()
    const { connectSocket } = useSocket()

    const endRef = useRef(null)
    const socket = connectSocket(auth?._id)

    useEffect(() => {
        socket.on('newMessage', (newMessage) => {
            if (newMessage.conversation === selectedConversation?._id) {
                queryClient.invalidateQueries({ queryKey: ['fetchConversations', auth?._id, selectedConversation?._id] })
                queryClient.setQueryData(['fetchMessages', auth?._id, selectedConversation?._id], (oldMessages) => {
                    return [...(oldMessages || []), newMessage]
                })
            }
        })

        return () => {
            socket.off('newMessage')
        }
    }, [auth?._id, selectedConversation?._id, queryClient, socket])

    const { data: messages } = useQuery({
        queryKey: ['fetchMessages', auth?._id, selectedConversation?._id],
        queryFn: () =>
            axiosPrivate.get(`/message/${auth?._id}?conversation=${selectedConversation?._id}`)
                .then((res) => res?.data),
        enabled: !!auth?._id && !!selectedConversation?._id,
    })

    useEffect(() => {
        setTimeout(() => {
            endRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }, [messages, selectedConversation?._id])

    return (
        <div className="relative p-3 flex-1 overflow-auto h-full bg-light-img">
            <div className="mx-12 flex flex-col gap-3 h-full">
                {messages?.map((msg, idx) => (
                    <div key={msg._id}>
                        <ChatBubble message={msg} previousMessage={idx > 0 ? messages[idx - 1] : undefined} lastIdx={idx == messages?.length - 1} endRef={endRef} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MessageContainer
