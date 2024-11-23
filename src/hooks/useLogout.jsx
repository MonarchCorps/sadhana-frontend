import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const useLogout = () => {
    // return useContext(LogoutContext)
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        try {
            await axios.get('/auth/logout', {
                withCredentials: true
            });
            navigate('/');
        } catch (err) {
            console.error(err)
        }
    }

    return {
        logout
    }

}

export default useLogout