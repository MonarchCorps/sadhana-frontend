import { Laugh, Mic, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from '@/hooks/useAuth'
import { useConversationStore } from '../store/chatStore'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import toast from 'react-hot-toast'
import useComponentVisible from '@/hooks/useComponentVisible'
import EmojiPicker, { Theme } from 'emoji-picker-react'
import useSocket from '@/hooks/useSocket'
import MediaDropdown from './MediaDropdown'

const MessageInput = () => {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    const { connectSocket } = useSocket()

    const socket = connectSocket(auth?._id)

    const [msgText, setMsgText] = useState('')
    const [typingTimeout, setTypingTimeout] = useState(null);

    const { selectedConversation } = useConversationStore()
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    const handleSendMessage = useMutation({
        mutationFn: () => {
            return axiosPrivate.post(`/message/${auth?._id}`,
                {
                    content: msgText,
                    conversation: selectedConversation?._id,
                    messageType: 'text'
                }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchConversations', auth?._id] })
            setMsgText('')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to login';
            toast.error(error.response ? errorMessage : 'No server response');
        },
    })

    useEffect(() => {
        if (!socket || !selectedConversation?._id) return;

        if (msgText.length > 0) {
            socket.emit('activity', { conversationId: selectedConversation._id, status: 'typing' });
            clearTimeout(typingTimeout);

            setTypingTimeout(setTimeout(() => {
                socket.emit('activity', { conversationId: selectedConversation._id, status: 'stopped' });
            }, 2000));
        } else {
            socket.emit('activity', { conversationId: selectedConversation._id, status: 'stopped' });
        }

        return () => clearTimeout(typingTimeout);
    }, [msgText, selectedConversation?._id, socket]);

    useEffect(() => {
        setMsgText('')
    }, [selectedConversation?._id])

    return (
        <div className='bg-[#f0f2f5] p-2 flex gap-4 items-center chsm:fixed chsm:bottom-0 chsm:w-full chsm:z-50'>
            <div className='relative flex gap-2 ml-2'>
                <div ref={ref} onClick={() => setIsComponentVisible(true)} className='w-full'>
                    {isComponentVisible && (
                        <EmojiPicker
                            theme={Theme.DARK}
                            onEmojiClick={emojiObject => {
                                setMsgText(prev => prev + emojiObject.emoji)
                            }}
                            style={{ position: 'absolute', bottom: '1.5rem', left: '1rem', zIndex: 50, width: '20rem' }}
                        />
                    )}
                    <Laugh className='text-gray-600 cursor-pointer' />
                </div>
                <MediaDropdown conversationId={selectedConversation?._id} />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='w-full flex gap-3'>
                <div className='flex-1'>
                    <Input
                        type='text'
                        placeholder='Type a message'
                        className='py-2 text-sm w-full rounded-lg shadow-sm focus-visible:ring-transparent'
                        value={msgText}
                        onChange={(e) => setMsgText(e.target.value)}
                    />
                </div>
                <div className='mr-4 flex items-center gap-3'>
                    {msgText.length > 0 ? (
                        <Button
                            type='submit'
                            size={'sm'}
                            className='bg-transparent text-[#020817] hover:bg-transparent'
                            onClick={(e) => { e.preventDefault(); handleSendMessage.mutate() }}
                        >
                            <Send />
                        </Button>
                    ) : (
                        <Button
                            type='submit'
                            size={'sm'}
                            className='bg-transparent text-[#020817] hover:bg-transparent'
                        >
                            <Mic />
                        </Button>
                    )}
                </div>
            </form >
        </div >
    )
}

export default MessageInput