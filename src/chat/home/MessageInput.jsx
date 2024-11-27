import { Laugh, Mic, Plus, Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from '@/hooks/useAuth'
import { useConversationStore } from '../store/chatStore'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import toast from 'react-hot-toast'
import useComponentVisible from '@/hooks/useComponentVisible'
import EmojiPicker, { Theme } from 'emoji-picker-react'

const MessageInput = () => {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    const [msgText, setMsgText] = useState('')
    const { selectedConversation } = useConversationStore()
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    const handleSendMessage = useMutation({
        mutationFn: () => {
            return axiosPrivate.post(`/message/${auth?._id}`,
                {
                    content: msgText,
                    conversation: selectedConversation?._id
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
            console.log(error)
            toast.error('Error sending message')
        },
    })


    return (
        <div className='bg-[#f0f2f5] p-2 flex gap-4 items-center'>
            <div className='relative flex gap-2 ml-2'>
                <div ref={ref} onClick={() => setIsComponentVisible(true)}>
                    {isComponentVisible && (
                        <EmojiPicker
                            theme={Theme.DARK}
                            onEmojiClick={emojiObject => {
                                setMsgText(prev => prev + emojiObject.emoji)
                            }}
                            style={{ position: 'absolute', bottom: '1.5rem', left: '1rem', zIndex: 50 }}
                        />
                    )}
                    <Laugh className='text-gray-600 cursor-pointer' />
                </div>
                <Plus className='text-gray-600' />
            </div>
            <form className='w-full flex gap-3'>
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