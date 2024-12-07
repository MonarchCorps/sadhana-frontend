import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import useTitle from '../../../../hooks/useTitle'
import useAuth from '../../../../hooks/useAuth'
import { SidebarProvider } from "@/components/ui/sidebar"
import BotChat from '@/components/Bot/BotChat'

function AdminDashboard() {

    const { auth } = useAuth();

    useTitle(`${auth?.username || 'Admin'} Dashboard`);

    return (
        <main>
            <SidebarProvider className="grid grid-cols-[auto_1fr]">
                <SideBar />
                <Outlet />
                <div className='absolute bottom-0'>
                    <BotChat />
                </div>
            </SidebarProvider>
        </main>
    )
}

export default AdminDashboard