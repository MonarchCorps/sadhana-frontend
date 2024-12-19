import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import useAuth from '../../../../../hooks/useAuth'
import useHideScroll from '../../../../../hooks/useHideScroll'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'

import ApplyInstructorForm from './ApplyInstructorForm'
import Loading from '../../../../../components/Loaders/Loading'

function ApplyInstructor() {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const location = useLocation();
    const navigate = useNavigate()

    const ikUploadRef = useRef();

    const queryParams = new URLSearchParams(location.search)
    const imgFileName = queryParams.get('photoId')

    const [img, setImg] = useState({
        isLoading: false,
        error: '',
        dbData: {},
    });

    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        experience: '',
        bgImage: img.dbData?.filePath || null,
    });

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            bgImage: img.dbData?.filePath
        }))
    }, [img])

    useEffect(() => {
        if (imgFileName) {
            setPreview(`https://ik.imagekit.io/4sbkuudrb/${imgFileName}`)
            setImg(prev => ({
                ...prev,
                isLoading: false,
                dbData: { filePath: imgFileName }
            }))
        }

        if (preview !== null && imgFileName) {
            navigate('/dashboard/student-cp/apply-instructor')
        }
    }, [imgFileName, navigate, preview])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.bgImage) {
            return toast('Background Image is required')
        }

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        })

        mutate(formDataToSend)

    }
    const { isPending, mutate } = useMutation({
        mutationFn: (formDataToSend) => {
            return axiosPrivate.post(`/student-cp/${auth?._id}/apply-instructor`, formDataToSend, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
        },
        onSuccess: () => {
            setFormData({
                experience: '',
                bgImage: null,
            });
            setPreview(null);
            setImg({
                isLoading: false,
                error: '',
                dbData: {},
            });

            toast.success('Applied successfully')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to apply';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(isPending);

    return (
        <>
            <Loading isLoading={isPending} />
            <section className='w-screen'>
                <div className='pt-14 px-3 pb-3 w-full h-full flex flex-col justify-center max-w-[38.8rem] amd:max-w-[34rem] esm:px-5 mx-auto'>
                    <div className='text-center'>
                        <h1 className='text-[2rem] amd:text-2xl ixsm:text-xl mb-4 font-500 font-sans'>
                            Hello 👋🏻 👋🏻 <span className='text-[#27554a]'>{auth?.username}</span> and welcome to Sadhana
                        </h1>
                        <p className='mb-4 font-500 amd:text-sm ixsm:text-xs'>Let&apos;s get you started as an instructor, all we need is a few details 😊</p>
                    </div>
                    <div className='w-full'>
                        <ApplyInstructorForm preview={preview} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}
                            img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef}
                        />
                    </div>
                </div>
            </section>
        </>

    )
}

export default ApplyInstructor