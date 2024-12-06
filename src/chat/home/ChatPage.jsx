import useGetScreenWidth from '@/hooks/useGetScreenWidth'
import { useConversationStore } from '../store/chatStore'
import LeftPanel from './LeftPanel'
import MobileNavigation from './Mobile/MobileNavigation'
import RightPanel from './RightPanel'
import { useEffect } from 'react'

function ChatPage() {

    const { stateType, setSelectedConversation } = useConversationStore()
    const { screenWidth } = useGetScreenWidth()

    useEffect(() => {
        if (screenWidth > 594) {
            setSelectedConversation({ conversation: null, type: '' })
        }
    }, [])

    return (
        <main className='m-5 chsm:mx-0'>
            <div className='flex overflow-y-hidden chsm:overflow-y-scroll h-[calc(100vh-50px)] max-w-[1700px] chsm:max-w-full chsm:grid chsm:grid-flow-col mx-auto bg-[#ffffff] shadow-md'>
                <div className='fixed top-0 left-0 w-full h-36 bg-[#00a884] -z-30' />
                <LeftPanel />
                <RightPanel />
            </div>
            {stateType !== 'chat' && <MobileNavigation />}
        </main>
    )
}


export default ChatPage