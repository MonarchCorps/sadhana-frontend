import { useContext } from 'react'
import OnlineUsersContext from '../context/OnlineUsersProvider'

const useOnlineUsers = () => {
    return useContext(OnlineUsersContext)
}

export default useOnlineUsers