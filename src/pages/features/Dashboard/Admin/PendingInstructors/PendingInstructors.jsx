import TableHead from './TableHead'
import TableBody from './TableBody'
import { useState, useEffect } from 'react'
import UsersManagementHeading from '../UsersManagementHeading'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'
import Loading from '../../../../../components/Loaders/Loading'
import useHideScroll from '../../../../../hooks/useHideScroll'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

function PendingInstructors() {

    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient()

    const { isLoading, data: pendingInstructors } = useQuery({
        queryKey: ['pendingInstructors'],
        queryFn: () =>
            axiosPrivate.get('/admin-cp/pending-instructor').then((res) => {
                return res?.data
            }),
    })

    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        setFilteredUsers(pendingInstructors)
    }, [pendingInstructors]);


    const handleApproval = useMutation({
        mutationFn: ({ id, action }) => {
            return axiosPrivate.patch(`/admin-cp/${id}/approve-instructor`, {
                action
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["pendingInstructors"] })
            queryClient.invalidateQueries({ queryKey: ["allUsers"] })
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
            <section>
                <div className='mt-8 mx-5'>
                    <UsersManagementHeading data={pendingInstructors || []} setFilteredData={setFilteredUsers} management='Users management' title='Pending' desc='Manage all pending or denied instructor application here' />
                    <div className='mt-14'>
                        <div className='w-full'>
                            <TableHead />
                            <TableBody filteredUsers={filteredUsers} handleApproval={handleApproval} isLoading={isLoading} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PendingInstructors