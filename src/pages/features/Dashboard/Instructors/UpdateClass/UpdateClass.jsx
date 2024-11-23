
import { useEffect, useRef, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useHideScroll from '../../../../../hooks/useHideScroll'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'

import Loading from '../../../../../components/Loaders/Loading'
import UpdateClassForm from './UpdateClassForm'
import trim from '../../../../../utils/trim'

function UpdateClass() {

    const { classes } = useOutletContext();
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();

    const queryClient = useQueryClient()

    const ikUploadRef = useRef(null)

    const [course, setCourse] = useState([]);
    const [preview, setPreview] = useState(null);

    const [dayArray, setDayArray] = useState([]);
    const [time, setTime] = useState({
        startTime: course?.time?.startTime || '',
        endTime: course?.time?.endTime || '',
    });

    const [img, setImg] = useState({
        isLoading: false,
        error: '',
        dbData: {},
    });

    const [formData, setFormData] = useState({
        classname: '',
        thumbnailPhoto: null,
        totalSeats: '',
        price: '',
        videoUrl: '',
        description: '',
        day: '',
        time: {
            startTime: '',
            endTime: '',
        }
    });


    useEffect(() => {
        const updateCourse = classes.find(course => course._id === id);
        setCourse(updateCourse)
    }, [id, classes]);

    useEffect(() => {
        if (course) {
            setFormData({
                classname: course.classname || '',
                thumbnailPhoto: course.thumbnailPhoto || null,
                totalSeats: course.totalSeats || '',
                price: course.price || '',
                videoUrl: course.videoUrl || '',
                description: course.description || '',
                day: course.day || '',
                time: {
                    startTime: course.time?.startTime || '',
                    endTime: course.time?.endTime || '',
                }
            });

            if (course?.day) {
                const day = course.day.split(',').map((day) => {
                    return String.prototype.trim.apply(day);
                });
                setDayArray(day);
            }
        }
    }, [course]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            thumbnailPhoto: img.dbData?.filePath
        }))
    }, [img])

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
    }, [dayArray]);

    const handleChange = (e) => {
        const { name, value } = e.target;
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
            return toast.error('All fields are required')
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
            return axiosPrivate.put(`/class/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["instructorClasses"] })
            toast.success('Updated successfully')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to update';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(isPending);

    return (
        <>
            <Loading isLoading={isPending} />
            <section className='w-full'>
                <div className='grid place-items-center w-full h-full'>
                    <div className="border-4 border-solid py-6 px-4 rounded-xl w-full max-w-[41rem] bg-white mt-10">
                        <h1 className='text-[1.7rem] font-sans flex justify-between'>
                            <span></span>
                            <span className='font-500 text-[1.9rem] font-cuba'> {trim(formData?.classname, 20)}</span>
                        </h1>
                        <UpdateClassForm handleSubmit={handleSubmit} handleChange={handleChange} preview={preview} formData={formData} handleTimeChange={handleTimeChange} dayArray={dayArray} setDayArray={setDayArray} img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default UpdateClass