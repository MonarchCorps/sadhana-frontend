import { Fragment, useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import axios from '../../../../api/axios'
import useAuth from '../../../../hooks/useAuth'
import useHideScroll from '../../../../hooks/useHideScroll'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '../../../../components/Loaders/Loading'
import AuthSwiper from '../../../../components/AuthSwiper/AuthSwiper'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import AuthHeader from '../AuthHeader'
import useSocket from '@/hooks/useSocket'

function Login() {

    const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const { connectSocket } = useSocket()

    const screenHeight = screen.height

    const { isPending, mutate } = useMutation({
        mutationFn: () => {
            return axios.post('/auth',
                {
                    username: user.trim(),
                    password: password
                }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
        },
        onSuccess: (response) => {
            const { instructor, ...restData } = response.data;

            const bgImage = instructor?.bgImage || null;
            const experience = instructor?.experience || null;
            const account = instructor?.account || null;

            setAuth({
                bgImage, experience, account, ...restData
            });
            navigate(from, {
                replace: true
            });
            toast.success('Logged in successfully')
            setUser('');
            setPassword('');

            connectSocket(response.data._id)
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to login';
            toast.error(error.response ? errorMessage : 'No server response');
        },
    })

    useHideScroll(isPending);

    const handleSubmit = async (e) => {
        e.preventDefault();

        mutate()
    }

    const togglePersist = () => {
        setPersist(prev => !prev)
    }

    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist]);

    return (
        <Fragment>
            <Loading isLoading={isPending} />
            <section>
                <AuthHeader />
                <div className="grid grid-cols-2 place-items-center w-[75%] mx-auto" style={{ height: `${screenHeight}px` }}>
                    <div className="form-container flex flex-col justify-center place-items-center w-full p-3 mr-10">
                        <LoginForm isPending={isPending} user={user} setUser={setUser} password={password} setPassword={setPassword} handleSubmit={handleSubmit} />
                        <div className='mt-5 text-sm'>
                            <input
                                type="checkbox"
                                id='persist'
                                name='persist'
                                onChange={togglePersist}
                                checked={persist}
                            />
                            <label htmlFor="persist">
                                Trust this device
                            </label>
                        </div>
                        <div className='mt-3 text-sm'>
                            <span>Forget password?</span>
                        </div>
                    </div>
                    <div className='h-[35rem] w-full rounded-xl overflow-hidden ml-10 relative'>
                        <AuthSwiper />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Login