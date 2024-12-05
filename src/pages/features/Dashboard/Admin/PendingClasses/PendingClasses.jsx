import TableHead from './TableHead'
import TableBody from './TableBody'
import { useState, useEffect } from 'react'
import ManagementHeading from '../ManagementHeading'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'
import Loading from '../../../../../components/Loaders/Loading'
import useHideScroll from '../../../../../hooks/useHideScroll'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

function PendingClasses() {

    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const { isLoading, data: pendingCourses } = useQuery({
        queryKey: ['pendingCourses'],
        queryFn: () =>
            axiosPrivate.get('/admin-cp/pending-class').then((res) => {
                return res?.data
            }),
    })

    const [filteredCourses, setFilteredCourses] = useState(pendingCourses);

    useEffect(() => {
        setFilteredCourses(pendingCourses)
    }, [pendingCourses]);


    const handleApproval = useMutation({
        mutationFn: ({ id, action }) => {
            return axiosPrivate.patch(`/admin-cp/${id}/approve-class`, {
                action
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["pendingCourses"] })
            queryClient.invalidateQueries({ queryKey: ["homeAllCourses"] })
            toast.success(response.data?.message)
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Error updating application';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(handleApproval.isPending)

    return (
        <>
            <Loading isLoading={handleApproval.isPending} />
            <section className='w-screen'>
                <div className='mt-8 mx-5'>
                    <ManagementHeading data={pendingCourses || []} setFilteredData={setFilteredCourses} management='Course management' title='Pending' desc='Manage all pending or denied course application here' />
                    <div className='mt-14'>
                        <div className='w-full'>
                            <TableHead />
                            <TableBody filteredCourses={filteredCourses} handleApproval={handleApproval} isLoading={isLoading} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PendingClasses