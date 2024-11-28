import axios from '../api/axios'
import useAuth from './useAuth'

function useRefreshToken() {

    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken,
                username: response.data.username,
                profileImage: response.data.profileImage,
                email: response.data.email,
                _id: response.data._id,
                experience: response.data?.instructor?.experience,
                bgImage: response.data?.instructor?.bgImage,
                dateRegistered: response.data.dateRegistered,
                gender: response.data.gender,
                phoneNumber: response.data.phoneNumber,
                address: response.data.address,
                selectedCourses: response.data.selectedCourses,
                account: response.data?.instructor?.account
            }
        });
        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;