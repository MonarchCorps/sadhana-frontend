import toast from 'react-hot-toast'
import useAuth from './useAuth'
import useAxiosPrivate from './useAxiosPrivate'
import { useMutation } from '@tanstack/react-query'
import useRefreshToken from './useRefreshToken'

const useClassActions = () => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const refresh = useRefreshToken()

    const handleBookClass = useMutation({
        mutationFn: (courseId) => {
            return toast.promise(
                axiosPrivate.patch(`/class/${auth?._id}`,
                    { courseId },
                    { headers: { 'Content-Type': 'application/json' }, withCredentials: true }),
                {
                    loading: 'Booking course...',
                    success: 'Booked successfully!',
                    error: 'Failed to book course!',
                }
            )
        },
        onSuccess: () => {
            refresh()
            toast.success('Booked successfully')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to book';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    const handleUnBookClass = useMutation({
        mutationFn: (courseId) => {
            return toast.promise(
                axiosPrivate.patch(`/class/unbook-class/${auth?._id}`,
                    { courseId },
                    { headers: { 'Content-Type': 'application/json' }, withCredentials: true }),
                {
                    loading: 'Unbooking course...',
                    success: 'Unbooked successfully!',
                    error: 'Failed to unbook course!',
                }
            )
        },
        onSuccess: () => {
            refresh()
            toast.success('Unbooked successfully')
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to unbook';
            toast.error(error.response ? errorMessage : 'No server response');
        },
    })

    return { handleBookClass, handleUnBookClass }

}

export default useClassActions;