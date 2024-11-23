import { useParams, Link } from 'react-router-dom'

import ThumbnailAdjuster from '../../../../../components/ThumbnailAdjuster'
import OtherCourseDetails from '../OtherCourseDetails'

import noImage1 from '../../../../../assets/images/noImages/photo-1505330622279-bf7d7fc918f4.avif'
import noImage2 from '../../../../../assets/images/noImages/photo-1576158114254-3ba81558b87d.avif'
import noImage3 from '../../../../../assets/images/noImages/photo-1627507055227-dd9c87118eb3.avif'
import noImage4 from '../../../../../assets/images/noImages/photo-1628155930542-3c7a64e2c833.avif'
import noImage5 from '../../../../../assets/images/noImages/photo-1633675254386-dc5bb4279d56.avif'
import noImage6 from '../../../../../assets/images/noImages/photo-1633783714421-332b7f929148.avif'
import noImage7 from '../../../../../assets/images/noImages/premium_photo-1697945800806-e5d8fe424928.avif'

import noDataImage from '../../../../../assets/images/17280568351339057725320967394372.jpg'

import Loading3 from '../../../../../components/Loaders/Loading3'
import Loading2 from '../../../../../components/Loaders/Loading2'

import Trainer from '../../../../../components/Trainer'
import UserDetails from '../../../../../components/UserDetails'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'
import { IKImage } from 'imagekitio-react'
import { useEffect } from 'react'

function ViewProfile() {

    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    const { isLoading, data } = useQuery({
        queryKey: ['viewUsersProfile', id],
        queryFn: () =>
            axiosPrivate.get(`/admin-cp/user/profile/${id}`).then((res) => {
                return res?.data
            })
    })

    const { instructor, uploadedCourse, selectedCourses, ...user } = data || {}
    const { data: trainers } = useQuery({
        queryKey: ['homeAllInstructors'],
        queryFn: () =>
            axiosPrivate.get('/public/instructor').then((res) => {
                return res?.data
            }),
    })
    const arrayOfNoImage = [noImage2, noImage3, noImage1, noImage4, noImage5, noImage6, noImage7]
    const randomNumber = Math.floor(Math.random() * 7)

    useEffect(() => {
        queryClient.invalidateQueries(['viewUsersProfile']);
    }, [id]);

    return (
        <>
            {
                isLoading && (
                    <section>
                        <div className='mt-20 -ml-4 h-[90vh] flex flex-col justify-between'>
                            <Loading3 />
                            <div>
                                <Loading2 data='profile details' isLoading={isLoading} />
                            </div>
                        </div>
                    </section>
                )
            }
            {
                !isLoading && user?.username ? (
                    <section>
                        <div className='relative -ml-4'>
                            <div className='absolute right-0 left-0 h-[21rem] -z-20'>
                                {
                                    instructor?.bgImage ? (
                                        <ThumbnailAdjuster imageUrl={instructor?.bgImage} imageHeight='24rem' alt="Background Image" />
                                    ) : (
                                        <img src={arrayOfNoImage[randomNumber]} alt="No image" className='h-[24rem] w-full object-cover' />)
                                }
                            </div>
                            <div className='pt-60 px-6'>
                                <div className='p-4'>
                                    <div className='border-solid border-slate-50 border-8 w-fit rounded-full overflow-hidden'>
                                        <IKImage
                                            key={user?.profileImage}
                                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                            path={user?.profileImage}
                                            className='w-[10rem] h-[10rem] object-cover'
                                            loading='lazy'
                                            lqip={{
                                                active: true,
                                                quality: 20
                                            }}
                                            alt={`${user?.username} image`}
                                        />
                                    </div>
                                    <div>
                                        <h1 className='text-[2rem] mb-4 font-500 font-cuba'>
                                            {user?.username}
                                        </h1>
                                    </div>
                                    {
                                        instructor?.experience && (
                                            <div className='shadow-shadow bg-[ #EDE8DC] px-4 py-5 rounded-md'>
                                                <p className='text-base font-400'>
                                                    {instructor.experience}
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                                <UserDetails user={user} selectedCourses={selectedCourses} uploadedCourse={uploadedCourse} />
                                {uploadedCourse && uploadedCourse.length > 0 && (
                                    <div className='p-4'>
                                        <div>
                                            <h1 className='text-[1.14rem] font-500 font-sans inline-block'>
                                                All uploaded courses
                                            </h1>
                                            {uploadedCourse?.length >= 5 && <Link to={`/instructor/${user?._id}/all-courses`} className='float-right underline text-[#053323] select-none'><span>See all</span></Link>}

                                        </div>
                                        <div className='grid grid-cols-4 grid-flow-col mt-6 gap-4'>
                                            {

                                                uploadedCourse.map((course, i) => {
                                                    if (i <= 4) {
                                                        return (
                                                            <OtherCourseDetails key={i} course={course} />
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                )}

                                {selectedCourses && selectedCourses.length > 0 && (
                                    <div className='p-4'>
                                        <div>
                                            <h1 className='text-[1.14rem] font-500 font-sans inline-block'>
                                                Selected courses
                                            </h1>
                                            {selectedCourses?.length >= 5 && <Link to={`/instructor/${user?._id}/all-courses`} className='float-right underline text-[#053323] select-none'><span>See all</span></Link>}

                                        </div>
                                        <div className='grid grid-cols-4 grid-flow-col mt-6 gap-4'>
                                            {
                                                selectedCourses.map((course, i) => {
                                                    if (i <= 4) {
                                                        return (
                                                            <OtherCourseDetails key={course?._id} course={course} />
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                )}

                                {trainers && trainers.length > 0 && (
                                    <div className='p-4'>
                                        <div>
                                            <h1 className='text-[1.14rem] font-500 font-sans inline-block'>
                                                Trainer
                                            </h1>
                                            {trainers.length >= 5 && <Link className='float-right underline text-[#053323]'><span>See all</span></Link>}
                                        </div>
                                        <div className='grid grid-cols-4 grid-flow-col mt-6 gap-4'>
                                            {
                                                trainers.map(trainer => {
                                                    return (
                                                        <Trainer key={trainer._id} trainer={trainer} />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section >
                ) : !isLoading && (
                    <div className='flex flex-col items-center pt-16'>
                        <img src={noDataImage} alt="No details available" className='w-3/4 object-cover h-3/4' />
                        <p className='p-10'>No details available at the moment. Check back later or reload page!</p>
                    </div>
                )
            }

        </>
    )
}

export default ViewProfile