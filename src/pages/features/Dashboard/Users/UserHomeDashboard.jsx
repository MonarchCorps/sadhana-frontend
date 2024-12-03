import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import useAuth from '../../../../hooks/useAuth'
import useScrollTop from '../../../../hooks/useScrollTop'

import randomNoBgImage from '../../../../components/randomNoBgImage'
import ThumbnailAdjuster from '../../../../components/ThumbnailAdjuster'
import SkeletonLoader2 from '../../../../components/SkeletonLoaders/SkeletonLoader2'
import UserDetails from '../../../../components/UserDetails'
import OtherCourseDetails from '../Admin/OtherCourseDetails'

import axios from '../../../../api/axios'
import { IKImage } from 'imagekitio-react'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import Trainer from '@/components/Trainer'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'

function UserHomeDashboard() {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate()
    const { scrollTop } = useScrollTop();

    const { screenWidth } = useGetScreenWidth()

    const noOfSkeletons = () => {
        if (screenWidth <= 473) {
            return 2
        } else if (screenWidth <= 852) {
            return 2
        } else if (screenWidth <= 1199) {
            return 3
        } else {
            return 4
        }
    }

    const [selectedCourses, setSelectedCourses] = useState([])

    const { isLoading, data: classes } = useQuery({
        queryKey: ['homePageClasses'],
        queryFn: () =>
            axios.get('/public/class').then((res) => {
                return res?.data
            }),
    })

    const { data: trainers } = useQuery({
        queryKey: ['homeAllInstructors'],
        queryFn: () =>
            axiosPrivate.get('/public/instructor').then((res) => {
                return res?.data
            }),
    })

    useEffect(() => {
        const idsInArray2 = new Set(auth?.selectedCourses.map(obj => obj.courseId));
        const data = classes?.filter(obj => idsInArray2.has(obj._id));

        setSelectedCourses(data)
    }, [classes, auth?.selectedCourses])

    const { arrayOfNoImage, randomNumber } = randomNoBgImage()

    return (
        <section className='w-screen'>
            <div className='relative -ml-1'>
                <div className='absolute right-0 left-0 h-[19rem] -z-20'>
                    <ThumbnailAdjuster imageUrl={arrayOfNoImage[randomNumber]} imageHeight='24rem' alt="Background Image" />
                </div>
                <div className='pt-64 px-6'>
                    <div className='border-solid border-slate-50 border-8 w-fit rounded-full overflow-hidden'>
                        <IKImage
                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                            path={auth?.profileImage}
                            className='w-[10rem] h-[10rem] object-cover imd:w-[8rem] imd:h-[8rem]'
                            loading='lazy'
                            lqip={{
                                active: true,
                                quality: 20
                            }}
                            alt={`${auth?.username} image`}
                        />
                    </div>

                    <div>
                        <h1 className='text-[2rem] mb-4 font-500 font-serif imd:text-3xl imd:mt-2'>
                            {auth?.username || 'User'}
                        </h1>
                    </div>
                    <UserDetails user={auth} />
                    {selectedCourses && selectedCourses?.length > 0 && (
                        <div className='max-w-[96%] mx-auto mt-4'>
                            <h1 className='text-[1.14rem] font-500 font-sans inline-block'>
                                Selected Courses
                            </h1>
                            {selectedCourses?.length >= 8 && <Link to='selected' className='float-right underline text-[#053323]' onClick={scrollTop}><span>See all</span></Link>}
                        </div>)}
                    <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 ixsm:gap-4 gap-3 max-w-[96%] mx-auto mt-4'>
                        {isLoading && (<SkeletonLoader2 value={noOfSkeletons()} />)}
                        {!isLoading && selectedCourses && selectedCourses.length > 0 && (
                            selectedCourses?.slice(0, 4).map(course => {
                                return (
                                    // This OtherCourseDetails component is from my adminDashboard component
                                    <OtherCourseDetails key={course?._id} course={course} />
                                )
                            }))}
                    </div>
                    <div className='p-4 mt-4'>
                        {classes && classes?.length > 0 && (
                            <div>
                                <h1 className='text-[1.14rem] font-500 font-sans inline-block'>Available Courses</h1>
                                {classes?.length >= 8 && <Link to='/class' className='float-right underline text-[#053323]' onClick={scrollTop}><span>See all</span></Link>}
                            </div>
                        )}
                        <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 ixsm:gap-4 gap-3 max-w-[96%] mx-auto mt-4'>
                            {isLoading && (<SkeletonLoader2 value={noOfSkeletons()} />)}
                            {!isLoading && classes && classes.length > 0 && (
                                classes?.slice(0, 4).map(course => {
                                    return (
                                        <OtherCourseDetails key={course?._id} course={course} />
                                    )
                                }))}
                        </div>
                    </div>
                    <div className='p-4'>
                        {trainers && trainers.length > 0 && (
                            <div>
                                <h1 className='text-[1.14rem] font-500 font-sans inline-block'>Instructors</h1>
                                {trainers?.length >= 8 && <Link to='/instructors' className='float-right underline text-[#053323]' onClick={scrollTop}><span>See all</span></Link>}
                            </div>
                        )}
                        <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 ixsm:gap-4 gap-3 max-w-[96%] mx-auto mt-4'>
                            {isLoading && (<SkeletonLoader2 value={noOfSkeletons()} />)}
                            {!isLoading && trainers && trainers.length > 0 && (
                                trainers.map(trainer => {
                                    return (
                                        <Trainer key={trainer?._id} trainer={trainer} />
                                    )
                                }))}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default UserHomeDashboard