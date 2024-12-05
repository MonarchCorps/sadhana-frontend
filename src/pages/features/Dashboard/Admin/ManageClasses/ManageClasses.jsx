import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'
import TableHead from './TableHead'
import TableBody from './TableBody'
import { useState, useEffect } from 'react'

import ManagementHeading from '../ManagementHeading'

import useHideScroll from '../../../../../hooks/useHideScroll'
import Loading from '../../../../../components/Loaders/Loading'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

function ManageClasses() {

    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient()

    const { isLoading, data: allCourses } = useQuery({
        queryKey: ['homeAllCourses'],
        queryFn: () =>
            axiosPrivate.get('/public/class').then((res) => {
                return res?.data
            }),
    })

    const [coursesToDelete, setCoursesToDelete] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        setFilteredCourses(allCourses)
    }, [allCourses]);

    const handleCheckedState = (e, courseId) => {
        const { checked } = e.target
        if (checked && !coursesToDelete.includes(courseId)) {
            setCoursesToDelete(prevData => [...prevData, courseId])
        } else if (!checked && coursesToDelete.includes(courseId)) {
            const updatedList = coursesToDelete.filter(id => id !== courseId);
            setCoursesToDelete(updatedList)
        }
    }

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
            queryClient.invalidateQueries({ queryKey: ["homeAllCourses"] })
            toast.success(response.data?.message)
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Error fetching class';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    const deleteCourse = useMutation({
        mutationFn: () => {
            return axiosPrivate.delete(`/admin-cp/delete-class`, {
                data: {
                    coursesId: coursesToDelete
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["homeAllCourses"] })
            toast.success('Deleted successfully')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Error deleting course(es)';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(handleApproval.isPending || deleteCourse.isPending)

    return (
        <>
            <Loading isLoading={deleteCourse.isPending || handleApproval.isPending} />
            <section>
                <div className='mt-8 mx-5 relative'>
                    <ManagementHeading data={allCourses || []} dataToDelete={coursesToDelete} setDataToDelete={setCoursesToDelete} deleteData={deleteCourse} setFilteredData={setFilteredCourses} management='Course management' title='All' desc='Manage all course here' />
                    <div className='mt-14'>
                        <div className='w-full'>
                            <TableHead />
                            <TableBody handleCheckedState={handleCheckedState} filteredCourses={filteredCourses} deleteCourse={deleteCourse} setCoursesToDelete={setCoursesToDelete} coursesToDelete={coursesToDelete} handleApproval={handleApproval} isLoading={isLoading} />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ManageClasses