/* eslint-disable react/prop-types */
import { FaClock } from 'react-icons/fa'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import { IKImage } from 'imagekitio-react'
import trim from '../../utils/trim'

function PartClasses({ course, handleBookClass, handleUnBookClass }) {

    const navigate = useNavigate();
    const { auth } = useAuth()

    const { data: enrolledCourse } = useQuery({
        queryKey: ['homePageEnrolledCourse'],
        queryFn: () =>
            axios.get(`/enrolled/${auth?._id}`).then((res) => {
                return res?.data
            }),
    })

    return (
        <div className='shadow-shadow rounded-lg overflow-hidden flex mb-6'>
            <div className='mr-8 w-[35%] h-80'>
                <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={course?.thumbnailPhoto}
                    className='size-full object-cover -mb-56'
                    loading='lazy'
                    lqip={{
                        active: true,
                        quality: 20
                    }}
                    alt={`${course?.classname} image`}
                />
            </div>
            <div className='py-8 px-2 w-1/2 flex flex-col justify-between'>
                <div>
                    <h1 className='font-500 text-2xl mb-3'>{course?.classname}</h1>
                    <div className='flex gap-3 mb-3'>
                        <span>
                            <span className='inline-block mr-2 text-[#e5759a]'>
                                <FontAwesomeIcon icon={faCalendarAlt} />
                            </span>
                            <span className='text-[#3a3939] text-sm'>{course?.day}</span>
                        </span>
                        <span>
                            <span className='inline-block mr-2 text-[#e5759a] mb-[-0.125rem]'><FaClock /></span>
                            <span>
                                <span className='text-[#3a3939] text-sm'>{course?.time?.startTime}</span>
                                <span>-</span>
                                <span className='text-[#3a3939] text-sm'>{course?.time?.endTime}</span>
                            </span>
                        </span>
                    </div>
                    <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-6 ">
                        {trim(course?.description, 240)}
                    </p>
                </div>
                <div className='mt-6'>
                    {
                        enrolledCourse?.length > 0 && enrolledCourse?.some(enrolledDetails =>
                            enrolledDetails.courseDetails.some(enrolled =>
                                enrolled._id === course._id
                            )
                        ) ? (
                            <button
                                className='text-sm h-14 w-36 mr-2 bg-[#e5759a] rounded-full text-slate-50 shadow-inner p-1'
                            >
                                Enrolled
                            </button>
                        ) : (
                            auth?.selectedCourses?.some(selectedCourse => selectedCourse.courseId == course._id) ? (
                                <button
                                    className='text-sm h-14 w-36 mr-2 bg-[#e5759a] rounded-full text-slate-50 shadow-inner p-1'
                                    onClick={() => {
                                        if (!auth?.username) return navigate('/auth');
                                        handleUnBookClass.mutate(course?._id);
                                    }}
                                >
                                    UnBook
                                </button>
                            ) : (
                                <button
                                    className='text-sm h-14 w-36 mr-2 bg-[#e5759a] rounded-full text-slate-50 shadow-inner p-1'
                                    onClick={() => {
                                        if (!auth?.username) return navigate('/auth');
                                        handleBookClass.mutate(course?._id);
                                    }}
                                >
                                    Book now
                                </button>
                            )
                        )
                    }
                    <Link
                        to={`/class/${course?._id}`}
                        className='text-sm py-4 px-7 text-[#e5759a] rounded-full bg-slate-50 shadow-inner border-[#e5779a] border-solid border-2'
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            })
                        }}
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PartClasses