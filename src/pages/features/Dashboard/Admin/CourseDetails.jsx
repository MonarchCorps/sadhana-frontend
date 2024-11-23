import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ThumbnailAdjuster from '../../../../components/ThumbnailAdjuster'
import Loading2 from '../../../../components/Loaders/Loading2'
import { Link } from 'react-router-dom'
import { FaMoneyBill } from 'react-icons/fa'
import { SiStatuspal } from 'react-icons/si'
import { MdAirlineSeatReclineExtra } from 'react-icons/md'
import OtherCourseDetails from './OtherCourseDetails'

import noDataImage from '../../../../assets/images/17280568351339057725320967394372.jpg'
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import { IKImage } from 'imagekitio-react'

import HardCodedClassDescription from '../../../../components/HardCodedClassDescription'

function CourseDetails() {

    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate()

    const { isLoading, data: allCourses } = useQuery({
        queryKey: ['homeAllCourses'],
        queryFn: () =>
            axiosPrivate.get('/public/class').then((res) => {
                return res?.data
            }),
    })

    const [course, setCourse] = useState({});
    const [otherUploadedCourse, setOtherUploadedCourse] = useState([]);

    useEffect(() => {
        const filtered = allCourses?.find(course => course?._id === id);
        setCourse(filtered);
        setOtherUploadedCourse(allCourses?.filter(otherCourse => otherCourse?._id !== course?._id && otherCourse?.userId == course?.userId))
    }, []);


    return (
        <>
            <section>
                <div className='relative -ml-4'>
                    {isLoading && <Loading2 data='course details' isLoading={isLoading} />}
                    {
                        !isLoading && course?._id ? (
                            <>
                                <div className='absolute right-0 left-0 h-[21rem] -z-20'>
                                    <ThumbnailAdjuster imageUrl={course?.thumbnailPhoto} imageHeight='24rem' alt="Background Image" />
                                </div>
                                <div className='pt-60 px-6'>
                                    <div className='p-4'>
                                        <div className='border-solid border-slate-50 border-8 w-fit rounded-full overflow-hidden'>
                                            <IKImage
                                                key={course?.profileImage}
                                                urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                                path={course?.profileImage}
                                                className='w-[10rem] h-[10rem] object-cover'
                                                loading='lazy'
                                                lqip={{
                                                    active: true,
                                                    quality: 20
                                                }}
                                                alt={`${course?.username} image`}
                                            />
                                        </div>
                                        <div>
                                            <h1 className='text-[2rem] mb-4 font-500 font-cuba'>
                                                {course?.username}
                                            </h1>
                                        </div>
                                        <div className='shadow-shadow bg-[#EDE8DC] px-4 py-5 mb-10 rounded-md'>
                                            <h1 className='mb-4 font-sans text-3xl'>Instructor experience</h1>
                                            <p className='text-base font-400'>
                                                {course?.experience}
                                            </p>
                                        </div>
                                        <HardCodedClassDescription />
                                    </div>
                                    <div className='p-4 grid grid-flow-col grid-col-3 bg-[#8786861e] rounded'>
                                        <div className='mb-1 w-fit flex items-center'>
                                            <span className='font-600 text-xl flex items-center text-[#1f2937] gap-2'>
                                                <FaMoneyBill />
                                                Price:
                                            </span>
                                            <span className='-mb-1 ml-4 text-md'>${course?.price}</span>
                                        </div>
                                        <div className='mb-1 w-fit flex items-center'>
                                            <div className='items-center flex'>
                                                <span className='font-600 text-xl flex items-center text-[#1f2937] gap-2'>
                                                    <SiStatuspal />
                                                    Status:
                                                </span>
                                                <span className='font-500 text-sm tracking-tight align-text-top ml-4'>
                                                    <span className={`border border-solid px-4 mr-1 rounded-2xl ${course?.status !== 'approved' ? 'border-[#85440bf2] bg-[#85440b31] text-[#85440bf2]' : 'border-[#126e0cf2] bg-[#0b85155a] text-[#125333f2]'}`}>
                                                        <span className='text-[0.8rem] align-text-top'>
                                                            {course?.status}
                                                        </span>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className='mb-1 w-fit flex items-center'>
                                            <span className='font-600 text-xl flex items-center text-[#1f2937] gap-2'>
                                                <MdAirlineSeatReclineExtra />
                                                Total Seats:
                                            </span>
                                            <span className='-mb-1 ml-4 text-md'>{course?.totalSeats}</span>
                                        </div>
                                    </div>
                                    <div className='mt-4 p-3'>
                                        <div>
                                            {
                                                otherUploadedCourse && otherUploadedCourse.length > 0 ? (
                                                    <>
                                                        <h1 className='text-[1.14rem] font-500 font-sans inline-block'>
                                                            Other uploaded courses
                                                        </h1>
                                                        {otherUploadedCourse.length >= 5 && <Link to={`/instructor/${course?.userId}/all-courses`} className='float-right underline text-[#053323] select-none'><span>See all</span></Link>}
                                                    </>
                                                ) : allCourses?.length > 0 && (
                                                    <>
                                                        <h1 className='text-[1.14rem] font-500 font-sans inline-block'>
                                                            All courses
                                                        </h1>
                                                        {allCourses.length >= 5 && <Link to='/class' className='float-right underline text-[#053323] select-none'><span>See all</span></Link>}
                                                    </>
                                                )
                                            }
                                        </div>
                                        <div className='mt-8 grid grid-cols-4 gap-3'>
                                            {
                                                otherUploadedCourse && otherUploadedCourse.length > 0 ? (
                                                    otherUploadedCourse.splice(0, 4).map(course => {
                                                        return (
                                                            <OtherCourseDetails key={course?._id} course={course} />
                                                        )
                                                    })
                                                ) : allCourses?.length > 0 && (
                                                    allCourses.splice(0, 4).map(course => {
                                                        return (
                                                            <OtherCourseDetails key={course?._id} course={course} />
                                                        )
                                                    })
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : !isLoading && !course?._id && (
                            <div className='flex flex-col items-center pt-16'>
                                <img src={noDataImage} alt="No details available" className='w-3/4 object-cover h-3/4' />
                                <p className='p-10'>No details details available at the moment. Check back later or reload page!</p>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default CourseDetails