import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from './useAxiosPrivate'

const useFetchUsername = () => {
    const axiosPrivate = useAxiosPrivate()

    const { data: allChatUsers } = useQuery({
        queryKey: ['allChatUsers'],
        queryFn: () =>
            axiosPrivate.get('/chat/all-users').then((res) => {
                return res?.data
            }),
    })

    const fetchName = (userId) => {
        const [user] = allChatUsers.filter(chatUser => chatUser?._id === userId) || {}
        const { username } = user
        return username
    }

    return { fetchName }
}

export default useFetchUsername