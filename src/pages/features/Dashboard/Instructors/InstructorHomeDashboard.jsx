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
import useGetScreenWidth from '@/hooks/useGetScreenWidth'

import styled from 'styled-components'
import { useState } from 'react'

function InstructorHomeDashboard() {

    const { auth } = useAuth()
    const { screenWidth } = useGetScreenWidth()

    const { isLoading, data: classes } = useQuery({
        queryKey: ['homeAllCourses'],
        queryFn: () =>
            axios.get('/public/class').then((res) => {
                return Array.isArray(res?.data) ? res.data : [];
            }),
    })

    const { scrollTop } = useScrollTop();

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

    const { arrayOfNoImage, randomNumber } = randomNoBgImage()

    const Text = styled.p`
        font-size: 16px;
            line-height: 1.6;
            color: #333;
            white-space: pre-wrap;
            overflow: hidden;
            max-height: ${({ expanded }) => (expanded ? "none" : "120px")};
            transition: max-height 0.3s ease;
        `;

    const ToggleButton = styled.button`
            margin-top: 10px;
            color: #D6809C;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            text-align: center;

            &:hover {
               text-decoration: underline;
            }

            @media (min-width: 768px) {
                width: auto;
            }
        `;

    const [expanded, setExpanded] = useState(false)

    const toggleReadMore = () => {
        setExpanded(!expanded);
    }

    const providedExperience = 'From my perspective as an instructor, a yoga experience is all about finding the balance between body and mind. It’s about guiding students through each pose with care, focusing on alignment and breath, while fostering a welcoming space where everyone feels supported. I aim to help students not just improve their physical practice but also connect with their inner selves, finding moments of calm and clarity on and off the mat. Each class is a journey, where we learn to embrace challenges, release tension, and cultivate mindfulness, leaving with a sense of renewal and inner strength.'

    return (
        <section className='w-screen'>
            <div className='relative -ml-1'>
                <div className='absolute right-0 left-0 h-[19rem] -z-20'>
                    {
                        auth?.bgImage ? (
                            <ThumbnailAdjuster imageUrl={auth?.bgImage} imageHeight='24rem' alt="Background Image" />
                        ) : (
                            <img src={arrayOfNoImage[randomNumber]} alt="No image" className='h-[24rem] w-full object-cover' />)
                    }
                </div>
                <div className='pt-64 px-6'>
                    <div className='p-4'>
                        <div className='border-solid border-slate-50 border-8 w-fit rounded-full overflow-hidden'>
                            <IKImage
                                urlEndpoint={"https://ik.imagekit.io/4sbkuudrb"}
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
                        <h1 className='text-[2rem] mb-4 font-500 font-serif imd:text-3xl imd:mt-2'>
                            {auth?.username || 'Instructor'}
                        </h1>
                        <div className='shadow-shadow bg-[#EDE8DC] px-4 py-5 pb-2 rounded-md'>
                            <p className='text-base font-400 hrmd2:text-sm hrmd2:leading-6'>
                                <span className='font-800 text-base font-sans'>Experience:</span>
                                <Text expanded={expanded}>{auth?.experience || providedExperience}</Text>
                                <ToggleButton onClick={toggleReadMore}>
                                    {expanded ? "Read Less" : "Read More"}
                                </ToggleButton>
                            </p>
                        </div>
                    </div>
                    <UserDetails user={auth} />
                    <div className='p-4 mt-4 max-w-[96%] mx-auto'>
                        {classes?.length > 0 && (
                            <div>
                                <h1 className='text-[1.14rem] font-500 font-sans inline-block'>Courses</h1>
                                {classes?.length >= 8 && <Link to='/class' className='float-right underline text-[#053323]' onClick={scrollTop}><span>See all</span></Link>}
                            </div>
                        )}
                        <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 ixsm:gap-4 gap-3 mt-4'>
                            {isLoading && (<SkeletonLoader2 value={noOfSkeletons()} />)}
                            {!isLoading && classes?.length > 0 && (
                                classes?.slice(0, 4).map(course => {
                                    return (
                                        <OtherCourseDetails key={course?._id} course={course} />
                                    )
                                }))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InstructorHomeDashboard