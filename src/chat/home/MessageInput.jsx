import { Laugh, Mic, Plus, Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const MessageInput = () => {
    const [msgText, setMsgText] = useState('')

    return (
        <div className='bg-[#f0f2f5] p-2 flex gap-4 items-center'>
            <div className='relative flex gap-2 ml-2'>
                <Laugh className='text-gray-600' />
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
            </form>
        </div>
    )
}

export default MessageInput