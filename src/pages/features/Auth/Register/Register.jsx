import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'
import useAuth from '../../../../hooks/useAuth'
import useHideScroll from '../../../../hooks/useHideScroll'
import axios from '../../../../api/axios'
import RegisterForm from './RegisterForm'
import Loading from '../../../../components/Loaders/Loading'
import AuthSwiper from '../../../../components/AuthSwiper/AuthSwiper'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import AuthHeader from '../AuthHeader'
import useSocket from '@/hooks/useSocket'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'
import botLogo from '../../../../assets/images/9c7d37cd-ba05-4987-8a75-c5376ac4990d.png'

function Register() {

    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';


    const { screenWidth } = useGetScreenWidth()
    const screenHeight = screenWidth <= 986 ? `100vh` : `${screen.height}px` // Check if (amd) media is on then display that width


    const { connectSocket } = useSocket()

    const queryParams = new URLSearchParams(location.search);
    const initialParams = {
        username: queryParams.get('username'),
        email: queryParams.get('email'),
        phoneNumber: queryParams.get('phoneNumber'),
        redirectUrl: queryParams.get('redirectUrl')
    };
    const [img, setImg] = useState({
        isLoading: false,
        error: '',
        dbData: {},
    });
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        username: initialParams.username || '',
        password: '',
        email: initialParams.email || '',
        phoneNumber: initialParams.phoneNumber || '',
        gender: '',
        profileImage: img.dbData?.filePath || null,
    })

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            profileImage: img.dbData?.filePath
        }))
    }, [img])

    const [step, setStep] = useState(1)

    const { isPending, mutate, } = useMutation({
        mutationFn: (formDataToSend) => {
            return axios.post('/register', formDataToSend, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
        },
        onSuccess: (response) => {

            setAuth(response.data);
            // To check if the redirectUrl is from browser, if true it's from the mobile app
            if (initialParams.redirectUrl === 'web') {
                navigate(from, {
                    replace: true
                });
            }
            toast.success('Registered successfully')

            setFormData({
                username: '',
                password: '',
                email: '',
                phoneNumber: '',
                gender: '',
                profileImage: null,
            })

            connectSocket(response.data._id)
        },
        onError: (error) => {
            if (!error?.response) {
                toast.error('No server response')
            } else if (error.response?.status === 401) {
                toast.error(error.response.data.message)
            }
            else if (error.response?.status === 409) {
                setStep(1)
                navigate(-1)
                toast.error(error.response.data.message)
            } else {
                toast.error('Failed to register')
            }
        },
    })

    useHideScroll(isPending);

    const handleSubmit = async (e) => {

        e.preventDefault()

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        })
        mutate(formDataToSend)

    }

    const togglePersist = () => {
        setPersist(prev => !prev)
    }

    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist])

    return (
        <Fragment>
            <Loading isLoading={isPending} />
            <AuthHeader />
            <section>
                <div className="grid grid-cols-2 w-[75%] amd:grid-cols-1 clg:place-items-center ilg:w-[85%] hrmd:w-full mx-auto" style={{ height: `${screenHeight}` }}>
                    <div className="form-container flex flex-col justify-center place-items-center w-full p-3 hrmd:mx-5 amd:max-w-[500px] amd:mx-auto amd:mt-9">
                        {step == 1 && screenWidth <= 710 && (
                            <div className='text-4xl font-serif mb-6 self-start ml-5 max-w-[500px] xsm:text-3xl'>
                                Register to Sadhana
                                <img src={botLogo} alt="bot logo" className='w-7 ml-3 inline mb-2' />
                            </div>
                        )}
                        <RegisterForm isPending={isPending} handleSubmit={handleSubmit} step={step} setStep={setStep} setFormData={setFormData} formData={formData} img={img} setImg={setImg} preview={preview} setPreview={setPreview} />
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
                            <span className='underline'>
                                <Link to='/privacy-policy'>
                                    Privacy policy
                                </Link>
                            </span>
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

export default Register