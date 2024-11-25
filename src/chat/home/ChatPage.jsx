import { Link } from 'react-router-dom'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

function ChatPage() {

    return (
        <main className='m-5'>
            <Link to='/'>
                Home
            </Link>
            <div className='flex overflow-y-hidden h-[calc(100vh-50px)] max-w-[1700px] mx-auto bg-[#ffffff] shadow-md'>
                <div className='fixed top-0 left-0 w-full h-36 bg-[#00a884] -z-30' />
                <LeftPanel />
                <RightPanel />
            </div>
        </main>

    )
}


export default ChatPage