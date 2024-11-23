import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import useAuth from '../../../../hooks/useAuth'
import useScrollTop from '../../../../hooks/useScrollTop'

import bgImage from '../../../../assets/images/download.png'

import randomNoBgImage from '../../../../components/randomNoBgImage'
import ThumbnailAdjuster from '../../../../components/ThumbnailAdjuster'
import SkeletonLoader2 from '../../../../components/SkeletonLoaders/SkeletonLoader2'
import UserDetails from '../../../../components/UserDetails'
import OtherCourseDetails from '../Admin/OtherCourseDetails'

import axios from '../../../../api/axios'
import { IKImage } from 'imagekitio-react'

function UserHomeDashboard() {

    const { auth } = useAuth();
    const { scrollTop } = useScrollTop();

    const [selectedCourses, setSelectedCourses] = useState([])

    const { isLoading, data: classes } = useQuery({
        queryKey: ['homePageClasses'],
        queryFn: () =>
            axios.get('/public/class').then((res) => {
                return res?.data
            }),
    })

    useEffect(() => {
        if (classes) {
            const idsInArray2 = new Set(auth?.selectedCourses.map(obj => obj.courseId));
            const data = classes?.filter(obj => idsInArray2.has(obj._id));

            setSelectedCourses(data, auth?.selectedCourses)
        }
    }, [classes, auth?.selectedCourses])

    const { arrayOfNoImage, randomNumber } = randomNoBgImage()

    return (
        <section>
            <div className='relative -ml-1'>
                <div className='absolute right-0 left-0 h-[21rem] -z-20'>
                    <ThumbnailAdjuster imageUrl={arrayOfNoImage[randomNumber]} imageHeight='24rem' alt="Background Image" />
                </div>

                <div className='pt-60 px-6'>
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
                            {auth?.username || 'User'}
                        </h1>
                    </div>
                    <UserDetails user={auth} />
                    {
                        selectedCourses && selectedCourses?.length > 0 && (
                            <div>
                                <h1 className='text-[1.14rem] font-500 font-sans inline-block'>
                                    Selected Courses
                                </h1>
                                {selectedCourses?.length >= 8 && <Link to='selected' className='float-right underline text-[#053323]' onClick={scrollTop}><span>See all</span></Link>}
                            </div>
                        )
                    }
                    <div className='grid grid-cols-4 grid-flow-col mt-6 mb-4 gap-4'>
                        {isLoading && (<SkeletonLoader2 value={4} />)}
                        {
                            !isLoading && selectedCourses && selectedCourses.length > 0 && (
                                selectedCourses.map((course, i) => {
                                    if (i <= 4) {
                                        return (
                                            // This OtherCourseDetails component is from my adminDashboard component
                                            <OtherCourseDetails key={course?._id} course={course} />
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            )
                        }
                    </div>

                    <div className='w-full flex items-center justify-center flex-col'>
                        <div className='mb-6'>
                            <img src={bgImage} alt="" className='w-[20rem] h-[15rem] object-cover rounded-2xl' />
                        </div>
                        <h1 className='text-[2rem] mb-4 font-500 font-sans'>
                            Hi <span className='text-[#27554a]'>{auth?.username}</span> Welcome to your dashboard
                        </h1>
                        <div>
                            <p className='max-w-prose mx-auto text-center mb-5 font-500'>Hey boss!! 👋🏻👋🏻 This is a simple dashboard page. Our developers are working hard on updating it</p>
                        </div>
                        <p>You can jump to any page from here</p>
                        <div className='mt-10 grid grid-flow-col gap-3'>
                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                <Link to='enrolled' className="min-h-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Enrolled
                                </Link>
                            </button>

                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                <Link to='selected' className="min-h-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Selected
                                </Link>
                            </button>
                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                <Link to='payments' className="min-h-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Payments
                                </Link>
                            </button>
                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                <Link to='apply-instructor' className="min-h-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Join as an instructor
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default UserHomeDashboard