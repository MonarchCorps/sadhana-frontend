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
            <SidebarProvider className="grid grid-cols-[auto_1fr] md:grid-cols-1">
                <SideBar />
                <Outlet />
                <div className='fixed bottom-20 right-10 w-fit'>
                    <BotChat />
                </div>
            </SidebarProvider>
        </main>
    )
}

export default AdminDashboard