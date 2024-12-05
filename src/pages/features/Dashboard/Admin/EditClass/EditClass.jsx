import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../../../../components/Loaders/Loading'
import useHideScroll from '../../../../../hooks/useHideScroll'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'
import EditClassForm from './EditClassForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import trim from '@/utils/trim'

function EditClass() {

    const { isLoading, data: allCourses } = useQuery({
        queryKey: ['homeAllCourses'],
        queryFn: () =>
            axiosPrivate.get('/public/class').then((res) => {
                return res?.data
            }),
    })

    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient()

    const ikUploadRef = useRef(null)

    const [course, setCourse] = useState({});

    const [dayArray, setDayArray] = useState([]);

    const [time, setTime] = useState({
        startTime: course?.time?.startTime || '',
        endTime: course?.time?.endTime || '',
    });

    useHideScroll(isLoading)

    useEffect(() => {
        const filteredCourse = allCourses?.find(course => course._id === id);
        setCourse(filteredCourse)
    }, [allCourses, id])

    const [preview, setPreview] = useState(null);

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

    const [img, setImg] = useState({
        isLoading: false,
        error: '',
        dbData: {},
    });

    useEffect(() => {
        if (course) {
            setFormData({
                classname: course?.classname || '',
                thumbnailPhoto: course?.thumbnailPhoto || null,
                totalSeats: course?.totalSeats || '',
                price: course?.price || '',
                videoUrl: course?.videoUrl || '',
                description: course?.description || '',
                day: course?.day || '',
                time: {
                    startTime: course?.time?.startTime || '',
                    endTime: course?.time?.endTime || '',
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

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            thumbnailPhoto: img.dbData?.filePath
        }))
    }, [img])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleTimeChange = (e) => {
        const { name, value } = e.target
        setTime(prevData => ({ ...prevData, [name]: value }))
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

        editClass.mutate(formDataToSend)
    }

    const editClass = useMutation({
        mutationFn: (formDataToSend) => {
            return axiosPrivate.put(`/class/${course?._id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allCourses"] })
            toast.success('Updated successfully')
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Error updating course';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })


    return (
        <>
            <Loading isLoading={isLoading} />
            <section className='emd:w-screen'>
                <div className='pt-14 px-3 pb-3 w-full h-full flex flex-col justify-center max-w-[38.8rem] amd:max-w-[34rem] esm:px-5 mx-auto'>
                    <div className='w-full text-start'>
                        <h1 className='text-[2rem] amd:text-2xl ixsm:text-xl font-500 font-serif'>
                            Edit course:  <span className='text-[#27554a] font-roboto'>{trim(course?.classname, 15)}</span>
                        </h1>
                    </div>
                    <div className='w-full'>
                        <EditClassForm handleSubmit={handleSubmit} handleChange={handleChange} preview={preview} course={course} formData={formData} handleTimeChange={handleTimeChange} dayArray={dayArray} setDayArray={setDayArray} img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditClass