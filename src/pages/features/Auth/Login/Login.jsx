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
import useGetScreenWidth from '@/hooks/useGetScreenWidth'
import botLogo from '../../../../assets/images/9c7d37cd-ba05-4987-8a75-c5376ac4990d.png'

function Login() {

    const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const { connectSocket } = useSocket()

    const { screenWidth } = useGetScreenWidth()
    const screenHeight = screenWidth <= 986 ? `100vh` : `${screen.height}px` // Check if (hrmd) media is on then display that width

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
                <div className="grid grid-cols-2 w-[75%] amd:grid-cols-1 clg:place-items-center ilg:w-[85%] hrmd:w-full mx-auto" style={{ height: `${screenHeight}` }}>
                    <div className="form-container flex flex-col justify-center place-items-center w-full p-3 hrmd:mx-5 amd:max-w-[500px] amd:mx-auto amd:mt-9">
                        {screenWidth <= 710 && (
                            <div className='text-4xl font-serif mb-6 self-start ml-5 max-w-[500px] xsm:text-3xl'>
                                Login to Sadhana
                                <img src={botLogo} alt="bot logo" className='w-7 ml-3 inline mb-2' />
                            </div>
                        )}
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
                    <div className='hrmd:h-screen w-full rounded-xl hrmd:rounded-none amd:hidden overflow-hidden ml-10 relative'>
                        <AuthSwiper />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Login