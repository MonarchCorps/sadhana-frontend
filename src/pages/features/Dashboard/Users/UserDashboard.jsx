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
            <SidebarProvider className="grid grid-cols-[auto_0px_1fr] md:grid-cols-[0px_0px_1fr]">
                <SideBar />
                <Outlet />
                <div className='fixed bottom-20 right-10 w-fit z-[400]'>
                    <BotChat />
                </div>
            </SidebarProvider>
        </main>
    )
}

export default UserDashboard