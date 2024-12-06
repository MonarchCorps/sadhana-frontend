import { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'
import useAuth from '../../../../../hooks/useAuth'
import useHideScroll from '../../../../../hooks/useHideScroll'
import useFetchUrlImg from '../../../../../hooks/useFetchUrlImg'

import Loading from '../../../../../components/Loaders/Loading'
import AddClassForm from './AddClassForm'

function AddClass() {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate()

    const ikUploadRef = useRef();

    const queryParams = new URLSearchParams(location.search)
    const imageId = queryParams.get('photoId')
    const queryClient = useQueryClient()

    const [img, setImg] = useState({
        isLoading: false,
        error: '',
        dbData: {},
    });
    const initialForm = {
        classname: '',
        thumbnailPhoto: img.dbData?.filePath || null,
        totalSeats: 0,
        price: 0,
        videoUrl: '',
        description: '',
        day: '',
        time: {
            startTime: '',
            endTime: ''
        }
    }
    const [formData, setFormData] = useState(initialForm);

    const [preview, setPreview] = useState(null);
    const [dayArray, setDayArray] = useState([]);
    const [time, setTime] = useState({
        startTime: '',
        endTime: '',
    });

    const { isLoading } = useFetchUrlImg(imageId, setPreview, setFormData, 'thumbnailPhoto')

    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            time: {
                startTime: time.startTime,
                endTime: time.endTime
            }
        }))
    }, [time]);

    useEffect(() => {
        const dayString = dayArray.join(', ')
        setFormData(prevData => ({
            ...prevData,
            day: dayString
        }))
    }, [dayArray])

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            thumbnailPhoto: img.dbData?.filePath
        }))
    }, [img])

    useEffect(() => {
        if (preview !== null && imageId) {
            navigate('/dashboard/instructor-cp/add-class')
        }
    }, [imageId, navigate, preview])

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "totalSeats") {
            const parsedValue = parseInt(value, 10);
            if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 999) {
                return;
            }
        }
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleTimeChange = (e) => {
        const { name, value } = e.target
        setTime(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const emptyField = Object.values(formData).some(value => value === '')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (emptyField === true) {
            return toast.error('All input fields are required')
        }

        if (!formData.time.startTime) {
            return toast.error('Fill in the startTime field')
        } else if (!formData.time.endTime) {
            return toast.error('Fill in the endTime field')
        }

        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'time') {
                formDataToSend.append(key, JSON.stringify(value));
            } else if (value !== '' || value !== null) {
                formDataToSend.append(key, value);
            }
        });

        mutate(formDataToSend)

    }

    const { isPending, mutate } = useMutation({
        mutationFn: (formDataToSend) => {
            return axiosPrivate.post(`/class/${auth?._id}/add-new-class`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["instructorClasses"] })
            setFormData(initialForm);
            setPreview(null);
            setDayArray([]);
            setTime({});
            setImg({
                isLoading: false,
                error: '',
                dbData: {},
            })

            toast.success('Created successfully')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to create';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(isPending);

    return (
        <>
            <Loading isLoading={isPending} />
            <section>
                <div className='pt-14 px-3 pb-3 size-full max-w-[58rem] hrmd:max-w-[85%] aism:max-w-[94%] mx-auto place-items-center grid'>
                    <div className="text-center  mx-auto">
                        <h1 className='text-3xl hrmd:text-2xl axsm:text-xl mb-4 font-500 font-sans'>
                            Want to earn some real <span className='text-[#27554a]'>Cash 😉</span>
                        </h1>
                        <p className='mb-4 font-500 hrmd:text-sm axsm:text-xs'>Alright off we go! Add a class 😊 and we&apos;ll get you started</p>
                    </div>
                    <div className="w-full">
                        <AddClassForm preview={preview} handleChange={handleChange} formData={formData} handleSubmit={handleSubmit} handleTimeChange={handleTimeChange} dayArray={dayArray} setDayArray={setDayArray} isLoading={isLoading} img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddClass