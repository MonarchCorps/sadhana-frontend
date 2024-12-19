import { useConversationStore } from '@/chat/store/chatStore'
import useLogout from '@/hooks/useLogout'
import { FaHome, FaUserAlt } from 'react-icons/fa'
import { FaArrowRightFromBracket, FaRegCommentDots } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function MobileNavigation() {

    const { stateType, setSelectedConversation } = useConversationStore()
    const { logout } = useLogout()

    return (
        <div className='hidden chsm:block bg-[#0e0f0f] text-slate-50 fixed bottom-0 left-0 right-0 p-2 z-50'>
            <div className={`max-w-[90%] mx-auto grid grid-cols-4 place-content-center gap-x-4`}>
                <Link to='/' className='flex flex-col items-center justify-center py-2 rounded-lg'>
                    <FaHome className='text-base' />
                    <span className='text-sm mt-[1px]'>Home</span>
                </Link>
                <div className={`flex flex-col items-center justify-center  py-2 rounded-lg ${stateType === 'allChat' ? 'font-700 bg-[#000]' : ''}`}>
                    <FaRegCommentDots className='text-base' />
                    <span className={`text-sm mt-[1px]`} onClick={() => setSelectedConversation({ type: 'allChat' })}>Chat</span>
                </div>
                <div className={`flex flex-col items-center justify-center py-2 rounded-lg ${stateType === 'users' ? 'font-700 bg-[#000]' : ''}`}>
                    <FaUserAlt className='text-base' />
                    <span className={`text-sm mt-[1px]`} onClick={() => setSelectedConversation({ type: 'users' })}>Users</span>
                </div>
                <div className='flex flex-col items-center justify-center py-2 rounded-lg' onClick={logout}>
                    <FaArrowRightFromBracket className='text-base' />
                    <span className='text-sm mt-[1px]'>Logout</span>
                </div>
            </div>
        </div>
    );
}

export default MobileNavigation;
