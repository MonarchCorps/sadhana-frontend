import useAuth from '../../../../hooks/useAuth'
import { Link } from 'react-router-dom'
import Trainer from '../../../../components/Trainer'

import ThumbnailAdjuster from '../../../../components/ThumbnailAdjuster'
import OtherCourseDetails from '../Admin/OtherCourseDetails'

import noImage1 from '../../../../assets/images/noImages/photo-1505330622279-bf7d7fc918f4.avif'
import noImage2 from '../../../../assets/images/noImages/photo-1576158114254-3ba81558b87d.avif'
import noImage3 from '../../../../assets/images/noImages/photo-1627507055227-dd9c87118eb3.avif'
import noImage4 from '../../../../assets/images/noImages/photo-1628155930542-3c7a64e2c833.avif'
import noImage5 from '../../../../assets/images/noImages/photo-1633675254386-dc5bb4279d56.avif'
import noImage6 from '../../../../assets/images/noImages/photo-1633783714421-332b7f929148.avif'
import noImage7 from '../../../../assets/images/noImages/premium_photo-1697945800806-e5d8fe424928.avif'

import SkeletonLoader2 from '../../../../components/SkeletonLoaders/SkeletonLoader2'

import useScrollTop from '../../../../hooks/useScrollTop'
import SkeletonLoader from '../../../../components/SkeletonLoaders/SkeletonLoader'
import TableHead from './ManageUser/TableHead'
import User from './ManageUser/User'
import { IKImage } from 'imagekitio-react'
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'

function AdminHomeDashboard() {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate()

    const { isLoading, data: classes } = useQuery({
        queryKey: ['homeAllCourses'],
        queryFn: () =>
            axiosPrivate.get('/public/class').then((res) => {
                return res?.data
            }),
    })

    const { data: allUsers } = useQuery({
        queryKey: ['allUsers'],
        queryFn: () =>
            axiosPrivate.get('/admin-cp/all-users').then((res) => {
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

    const { scrollTop } = useScrollTop();

    const arrayOfNoImage = [noImage2, noImage3, noImage1, noImage4, noImage5, noImage6, noImage7]
    const randomNumber = Math.floor(Math.random() * 7)

    return (
        <section>
            <div className='relative -ml-4'>
                <div className='absolute right-0 left-0 h-[21rem] -z-20'>
                    {
                        auth?.bgImage ? (
                            <div className='select-none'>
                                <ThumbnailAdjuster imageUrl={auth?.bgImage} imageHeight='24rem' alt="Background Image" />
                            </div>
                        ) : (
                            <img src={arrayOfNoImage[randomNumber]} alt="No image" className='h-[24rem] w-full object-cover select-none' />)
                    }
                </div>
                <div className='pt-60 px-6'>
                    <div className='p-4'>
                        <div className='border-solid border-slate-50 border-8 w-fit rounded-full overflow-hidden'>
                            <IKImage
                                urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                path={auth?.profileImage}
                                className='w-[10rem] h-[10rem] object-cover'
                                loading='lazy'
                                lqip={{
                                    active: true,
                                    quality: 20
                                }}
                                alt={`${auth?.username} image`}
                            />
                        </div>
                        <div>
                            <h1 className='text-[2rem] mb-4 font-500 font-cuba'>
                                {auth?.username || 'Admin'}
                            </h1>
                        </div>
                    </div>
                    <div className='p-4'>
                        {
                            classes && classes?.length > 0 && (
                                <div>
                                    <h1 className='text-[1.14rem] font-500 font-sans inline-block'>
                                        Courses
                                    </h1>
                                    {classes?.length >= 8 && <Link to='/class' className='float-right underline text-[#053323]' onClick={scrollTop}><span>See all</span></Link>}
                                </div>
                            )
                        }
                        <div className='grid grid-cols-4 grid-flow-col mt-6 gap-4'>
                            {isLoading && (<SkeletonLoader2 value={4} />)}
                            {
                                !isLoading && classes && classes.length > 0 && (
                                    classes.map((course, i) => {
                                        if (i <= 4) {
                                            return (
                                                <OtherCourseDetails key={course?._id} course={course} />
                                            )
                                        } else {
                                            return null
                                        }
                                    })
                                )
                            }
                        </div>
                    </div>
                    <div className='p-4'>
                        {
                            trainers && trainers.length > 0 && (
                                <div>
                                    <h1 className='text-[1.14rem] font-500 font-sans inline-block'>
                                        Instructors
                                    </h1>
                                    {trainers?.length >= 8 && <Link to='/instructors' className='float-right underline text-[#053323]' onClick={scrollTop}><span>See all</span></Link>}
                                </div>
                            )
                        }
                        <div className='grid grid-cols-4 grid-flow-col mt-6 gap-4'>
                            {isLoading && (<SkeletonLoader />)}
                            {
                                !isLoading && trainers && trainers.length > 0 && (
                                    trainers.map(trainer => {
                                        return (
                                            <Trainer key={trainer?._id} trainer={trainer} />
                                        )
                                    })
                                )
                            }
                        </div>
                    </div>
                    <div className='p-4'>
                        {
                            allUsers && allUsers.length > 0 && (
                                <div>
                                    <h1 className='text-[1.14rem] font-500 font-sans inline-block mn-4'>
                                        All users
                                    </h1>
                                    {allUsers?.length >= 8 && <Link to='/instructors' className='float-right underline text-[#053323]' onClick={scrollTop}><span>See all</span></Link>}
                                </div>
                            )
                        }
                        {isLoading &&
                            (
                                <div className='grid grid-cols-4 grid-flow-col mt-6 gap-4'>
                                    <SkeletonLoader />
                                </div>
                            )}
                        {
                            !isLoading && allUsers && allUsers.length > 0 && (
                                <div>
                                    {/* I imported the table head from manageUsers */}
                                    <TableHead />
                                    <div>
                                        {allUsers.map((user, index) => {
                                            return (
                                                <User key={user?._id} user={user} index={index} />
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminHomeDashboard