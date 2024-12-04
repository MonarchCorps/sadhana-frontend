import { Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import useTitle from '../../../../hooks/useTitle'
import useAuth from '../../../../hooks/useAuth'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'

import BotChat from '../../../../components/Bot/BotChat'
import SideBar from './SideBar'

import { SidebarProvider } from "@/components/ui/sidebar"

function InstructorDashboard() {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const { isLoading, isFetching, data: classes } = useQuery({
        queryKey: ['instructorClasses'],
        queryFn: () =>
            axiosPrivate.get(`/class/${auth?._id}/my-classes`).then((res) => {
                return res?.data
            }),
    })

    useTitle(`${auth?.username || 'Instructor'} Dashboard`);

    return (
        <main>
            <SidebarProvider className="grid grid-cols-[auto_1fr] md:grid-cols-1">
                <SideBar />
                <Outlet context={{
                    classes,
                    isLoading,
                    isFetching,
                }} />
                <div className='fixed bottom-20 right-10 w-fit z-[400]'>
                    <BotChat />
                </div>
            </SidebarProvider>
        </main>
    )
}

export default InstructorDashboard