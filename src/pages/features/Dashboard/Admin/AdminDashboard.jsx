import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import useTitle from '../../../../hooks/useTitle'
import useAuth from '../../../../hooks/useAuth'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

function AdminDashboard() {

    const { auth } = useAuth();

    useTitle(`${auth?.username || 'Admin'} Dashboard`);

    return (
        <main>
            <SidebarProvider className="grid grid-cols-[auto_auto_1fr] gap-3">
                <SideBar />
                <SidebarTrigger />
                <Outlet />
            </SidebarProvider>
        </main>
    )
}

export default AdminDashboard