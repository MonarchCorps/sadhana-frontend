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

function Register() {

    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    const screenHeight = screen.height

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
                <div className="grid grid-cols-2 place-items-center w-[75%] mx-auto" style={{ height: `${screenHeight}px` }}>
                    <div className="form-container flex flex-col justify-center place-items-center w-full p-3 mr-10">
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
                    <div className='h-[35rem] w-full rounded-xl overflow-hidden ml-10 relative'>
                        <AuthSwiper />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Register