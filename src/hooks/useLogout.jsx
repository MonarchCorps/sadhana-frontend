import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const useLogout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        try {
            await axios.get('/auth/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err)
        } finally {
            setAuth({})
            navigate('/auth');
        }
    }

    return {
        logout
    }

}

export default useLogout