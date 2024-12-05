import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import useAuth from '../../../../hooks/useAuth'
import useTitle from '../../../../hooks/useTitle'
import BotChat from '../../../../components/Bot/BotChat'

import { SidebarProvider } from "@/components/ui/sidebar"

function UserDashboard() {

    const { auth } = useAuth()
    useTitle(`${auth?.username || 'User'} Dashboard`);

    return (
        <main>
            <SidebarProvider className="grid grid-cols-[auto_1fr]">
                <SideBar />
                <Outlet />
                <div className='fixed bottom-20 right-10 w-fit'>
                    <BotChat />
                </div>
            </SidebarProvider>
        </main>
    )
}

export default UserDashboard