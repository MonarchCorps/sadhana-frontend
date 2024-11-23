import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import useAuth from '../../../../hooks/useAuth'
import useScrollTop from '../../../../hooks/useScrollTop'

import ThumbnailAdjuster from '../../../../components/ThumbnailAdjuster'
import randomNoBgImage from '../../../../components/randomNoBgImage'
import SkeletonLoader2 from '../../../../components/SkeletonLoaders/SkeletonLoader2'
import UserDetails from '../../../../components/UserDetails'

import OtherCourseDetails from '../Admin/OtherCourseDetails'

import axios from '../../../../api/axios'
import { IKImage } from 'imagekitio-react'

function InstructorHomeDashboard() {

    const { auth } = useAuth();
    const { isLoading, data: classes } = useQuery({
        queryKey: ['homePageClasses'],
        queryFn: () =>
            axios.get('/public/class').then((res) => {
                return res?.data
            }
            ),
    })

    const { scrollTop } = useScrollTop();
    const { arrayOfNoImage, randomNumber } = randomNoBgImage()

    return (
        <section>
            <div className='relative -ml-1'>
                <div className='absolute right-0 left-0 h-[21rem] -z-20'>
                    {
                        auth?.bgImage ? (
                            <ThumbnailAdjuster imageUrl={auth?.bgImage} imageHeight='24rem' alt="Background Image" />
                        ) : (
                            <img src={arrayOfNoImage[randomNumber]} alt="No image" className='h-[24rem] w-full object-cover' />)
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
                                {auth?.username || 'Instructor'}
                            </h1>
                        </div>
                        <div className='shadow-shadow bg-[ #EDE8DC] px-4 py-5 rounded-md'>
                            <p className='text-base font-400'>
                                {auth?.experience ?? 'From my perspective as an instructor, a yoga experience is all about finding the balance between body and mind. It’s about guiding students through each pose with care, focusing on alignment and breath, while fostering a welcoming space where everyone feels supported. I aim to help students not just improve their physical practice but also connect with their inner selves, finding moments of calm and clarity on and off the mat. Each class is a journey, where we learn to embrace challenges, release tension, and cultivate mindfulness, leaving with a sense of renewal and inner strength.'}
                            </p>
                        </div>
                    </div>
                    <UserDetails user={auth} />
                    <div className='p-4'>
                        {
                            classes && classes?.length > 0 && (
                                <div>
                                    <h1 className='text-[1.14rem] font-500 font-sans inline-block'>
                                        All Courses
                                    </h1>
                                    {classes?.length >= 8 && <Link to='/class' className='float-right underline text-[#053323]' onClick={scrollTop}><span>See all</span></Link>}
                                </div>
                            )
                        }
                        <div className='grid grid-cols-4 mt-6 gap-4'>
                            {isLoading && (<SkeletonLoader2 value={4} />)}
                            {
                                !isLoading && classes && classes.length > 0 && (
                                    classes.map((course, i) => {
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
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InstructorHomeDashboard