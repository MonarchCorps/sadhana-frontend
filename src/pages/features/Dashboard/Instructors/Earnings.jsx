import { useQuery } from '@tanstack/react-query'

import useAuth from '../../../../hooks/useAuth'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'

const Earnings = () => {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const { isLoading, data: earnings } = useQuery({
        queryKey: ['instructorEarnings'],
        queryFn: () =>
            axiosPrivate.get(`/earnings/${auth?._id}`).then((res) => {
                return res?.data
            }
            ),
    })


    return (
        <p>Earnings</p>
    )
}

export default Earnings