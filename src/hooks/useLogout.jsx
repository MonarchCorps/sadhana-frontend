import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import useSocket from './useSocket'

const useLogout = () => {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()
    const { disConnectSocket } = useSocket()

    const logout = async () => {
        disConnectSocket(auth?._id)
        setAuth({})
        try {
            await axios.get('/auth/logout', {
                withCredentials: true
            })
        } catch (err) {
            console.error(err)
        } finally {
            setAuth({})
            navigate('/auth')
        }
    }

    return {
        logout
    }

}

export default useLogout