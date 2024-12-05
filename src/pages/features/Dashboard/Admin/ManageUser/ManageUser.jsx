import useAuth from '../../../../../hooks/useAuth'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'
import TableHead from './TableHead'
import TableBody from './TableBody'
import { useState, useEffect } from 'react'

import Loading from '../../../../../components/Loaders/Loading'

import ManagementHeading from '../ManagementHeading'

import useHideScroll from '../../../../../hooks/useHideScroll'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

function ManageUser() {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const queryClient = useQueryClient()

    const { isLoading, data: allUsers } = useQuery({
        queryKey: ['allUsers'],
        queryFn: () =>
            axiosPrivate.get('/admin-cp/all-users').then((res) => {
                return res?.data
            }),
    })

    const [usersToDelete, setUsersToDelete] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        setFilteredUsers(allUsers)
    }, [allUsers]);


    const handleCheckedState = (e, userId) => {
        const { checked } = e.target
        if (checked && !usersToDelete.includes(userId)) {
            setUsersToDelete(prevData => [...prevData, userId])
        } else if (!checked && usersToDelete.includes(userId)) {
            const updatedList = usersToDelete.filter(id => id !== userId);
            setUsersToDelete(updatedList)
        }
    }

    const deleteUser = useMutation({
        mutationFn: () => {
            return axiosPrivate.delete(`/admin-cp/delete-users/${auth?._id}`, {
                data: {
                    usersId: usersToDelete
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allUsers"] })
            toast.success('Deleted successfully')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Error deleting user(s)';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(deleteUser.isPending)

    return (
        <>
            <Loading isLoading={deleteUser.isPending} />
            <section className='w-screen'>
                <div className='mt-8 mx-5 relative'>
                    <ManagementHeading data={allUsers || []} dataToDelete={usersToDelete} setDataToDelete={setUsersToDelete} deleteData={deleteUser} setFilteredData={setFilteredUsers} management='Users management' title='All' desc='Manage your members and their account permissions here' />
                    <div className='mt-14'>
                        <div className='w-full'>
                            <TableHead />
                            <TableBody handleCheckedState={handleCheckedState} filteredUsers={filteredUsers} deleteUser={deleteUser} setUsersToDelete={setUsersToDelete} usersToDelete={usersToDelete} isLoading={isLoading} />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ManageUser