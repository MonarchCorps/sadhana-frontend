import Loading2 from '@/components/Loaders/Loading2'
import Loading3 from '@/components/Loaders/Loading3'
import randomNoBgImage from '@/components/randomNoBgImage'
import ThumbnailAdjuster from '@/components/ThumbnailAdjuster'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQuery } from '@tanstack/react-query'
import { IKImage } from 'imagekitio-react'
import { Fragment, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import useGetScreenWidth from '@/hooks/useGetScreenWidth'
import styled from 'styled-components'
import UserDetails from '@/components/UserDetails'
import SkeletonLoader2 from '@/components/SkeletonLoaders/SkeletonLoader2'
import OtherCourseDetails from '../OtherCourseDetails'
import SkeletonLoader from '@/components/SkeletonLoaders/SkeletonLoader'
import Trainer from '@/components/Trainer'
import NoData from '@/components/NoData'

function ViewProfile() {

    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()

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

    const { arrayOfNoImage, randomNumber } = randomNoBgImage()

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

    const Text = styled.p`
    font-size: 16px;
        line-height: 1.6;
        color: #333;
        white-space: pre-wrap;
        overflow: hidden;
        max-height: ${({ expanded }) => (expanded ? "none" : "100px")};
        transition: max-height 0.3s ease;

        @media (max-width: 525px) {
            font-size: 14px;
        }
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

    return (
        <section className='w-screen'>
            <div className="relative">
                {isLoading && (
                    <div className='mt-20 h-[90vh] flex flex-col justify-between'>
                        <Loading3 />
                        <Loading2 data='profile details' isLoading={isLoading} />
                    </div>
                )}
                {!isLoading && user?._id ? (
                    <Fragment>
                        <div className="absolute right-0 left-0 h-[21rem] -z-20">
                            {
                                instructor?.bgImage ? (
                                    <ThumbnailAdjuster imageUrl={instructor?.bgImage} imageHeight='24rem' alt="Background Image" />
                                ) : (
                                    <img src={arrayOfNoImage[randomNumber]} alt="No image" className='h-[24rem] w-full object-cover' />)
                            }
                        </div>
                        <div className="pt-60 px-4 aism:px-2">
                            <div className="p-4">
                                <div className='border-solid border-slate-50 border-8 w-fit rounded-full overflow-hidden'>
                                    {user?.profileImage ? (
                                        <IKImage
                                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                            path={user?.profileImage}
                                            className='w-[10rem] h-[10rem] object-cover imd:w-[8rem] imd:h-[8rem]'
                                            loading='lazy'
                                            lqip={{
                                                active: true,
                                                quality: 20
                                            }}
                                            alt={`${user?.username} image`}
                                        />
                                    ) : (
                                        <div className="w-[10rem] h-[10rem] bg-gray-200 rounded-full"></div>
                                    )}
                                </div>

                                <h1 className='text-[2rem] mb-4 font-500 font-serif imd:text-3xl imd:mt-2'>
                                    {user?.username}
                                </h1>

                                <div className="shadow-shadow bg-[#EDE8DC] px-4 pt-5 pb-3 mb-7 rounded-md">
                                    <h1 className="mb-4 font-sans text-3xl aism:text-2xl">
                                        Instructor experience
                                    </h1>
                                    <Text expanded={expanded}>{instructor?.experience || 'Not available'}</Text>
                                    <ToggleButton onClick={toggleReadMore}>
                                        {expanded ? "Read Less" : "Read More"}
                                    </ToggleButton>
                                </div>

                                <UserDetails user={user} selectedCourses={selectedCourses} uploadedCourse={uploadedCourse} />

                                <div className='mt-5 max-w-[96%] mx-auto'>
                                    {uploadedCourse?.length >= 1 && (
                                        <Fragment>
                                            <h1 className="text-[1.14rem] font-700 font-sans inline-block">
                                                Uploaded courses
                                            </h1>
                                            {uploadedCourse?.length >= 5 && (
                                                <Link
                                                    to={`/instructor/${user?._id}/all-courses`}
                                                    target='_blank'
                                                    className="float-right underline text-[#053323] select-none"
                                                >
                                                    <span>See all</span>
                                                </Link>
                                            )}
                                        </Fragment>
                                    )}
                                    <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 ixsm:gap-4 gap-3 mt-4'>
                                        {isLoading && (<SkeletonLoader2 value={noOfSkeletons()} />)}
                                        {
                                            !isLoading && uploadedCourse?.length > 0 &&
                                            uploadedCourse?.slice(0, 4)?.map((course) => {
                                                return (
                                                    <OtherCourseDetails
                                                        key={course?._id}
                                                        course={course}
                                                    />
                                                );
                                            })
                                        }
                                    </div>
                                </div>

                                <div className='mt-5 max-w-[96%] mx-auto'>
                                    {selectedCourses?.length >= 1 && (
                                        <h1 className="text-[1.14rem] font-700 font-sans inline-block">
                                            Selected courses
                                        </h1>
                                    )}
                                    <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 ixsm:gap-4 gap-3 mt-4'>
                                        {isLoading && (<SkeletonLoader2 value={noOfSkeletons()} />)}
                                        {
                                            !isLoading && selectedCourses?.length > 0 &&
                                            selectedCourses?.slice(0, 4)?.map((course) => {
                                                return (
                                                    <OtherCourseDetails
                                                        key={course?._id}
                                                        course={course}
                                                    />
                                                );
                                            })
                                        }
                                    </div>
                                </div>

                                <div className='mt-5 max-w-[96%] mx-auto'>
                                    {trainers?.length >= 1 && (
                                        <h1 className="text-[1.14rem] font-700 font-sans inline-block">
                                            Trainers
                                        </h1>
                                    )}
                                    <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 ixsm:gap-4 gap-3 mt-4'>
                                        {isLoading && (<SkeletonLoader value={noOfSkeletons()} />)}
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
                    </Fragment>
                ) : !isLoading && !user?._id && (
                    <NoData>
                        <span>No details available at the moment. Check back later or reload page!</span>
                    </NoData>
                )}
            </div>
        </section>

    )
}

export default ViewProfile