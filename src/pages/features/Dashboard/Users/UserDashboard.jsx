import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import useAuth from '../../../../hooks/useAuth'
import useTitle from '../../../../hooks/useTitle'
import BotChat from '../../../../components/Bot/BotChat'

function UserDashboard() {

    const { auth } = useAuth()
    useTitle(`${auth?.username || 'User'} Dashboard`);

    return (
        <main>
            <div className='grid grid-cols-[260px_1fr]'>
                <SideBar />
                <Outlet />
                <div className='fixed bottom-20 right-10 w-fit z-[400]'>
                    <BotChat />
                </div>
            </div>
        </main>
    )
}

export default UserDashboard