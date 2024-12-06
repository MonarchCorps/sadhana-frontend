import Loading2 from '@/components/Loaders/Loading2'
import axios from '@/api/axios'
import { useQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ThumbnailAdjuster from '@/components/ThumbnailAdjuster'
import { IKImage } from 'imagekitio-react'
import styled from 'styled-components'
import HardCodedClassDescription from '@/components/HardCodedClassDescription'

import { SiStatuspal } from "react-icons/si"
import { FaMoneyBill } from 'react-icons/fa'
import { MdAirlineSeatReclineExtra } from 'react-icons/md'
import OtherCourseDetails from './OtherCourseDetails'
import SkeletonLoader2 from '@/components/SkeletonLoaders/SkeletonLoader2'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'
import SkeletonLoader from '@/components/SkeletonLoaders/SkeletonLoader'
import NoData from '@/components/NoData'

function CourseDetails() {

    const { id } = useParams()

    const [course, setCourse] = useState({})
    const [otherUploadedCourses, setOtherUploadedCourses] = useState([])

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

    const { isLoading, data: allCourses } = useQuery({
        queryKey: ["homeAllCourses"],
        queryFn: () =>
            axios.get("/public/class").then((res) => {
                return res?.data
            }),
    })

    useEffect(() => {
        if (allCourses?.length) {
            const filtered = allCourses?.find(course => course._id === id)
            setCourse(filtered)

            const otherCourses = allCourses?.filter(otherCourse => otherCourse?._id !== id && otherCourse?.userId === filtered?.userId)
            setOtherUploadedCourses(otherCourses)
        }
    }, [id, allCourses])

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

    return (
        <section className='w-screen'>
            <div className="relative">
                {isLoading && (
                    <Loading2 data="course details" isLoading={isLoading} />
                )}
                {
                    !isLoading && course?._id ? (
                        <Fragment>
                            <div className="absolute right-0 left-0 h-[21rem] -z-20">
                                <ThumbnailAdjuster
                                    imageUrl={course?.thumbnailPhoto}
                                    imageHeight="24rem"
                                    alt="Background Image"
                                />
                            </div>
                            <div className="pt-60 px-4 aism:px-2">
                                <div className="p-4">
                                    <div className='border-solid border-slate-50 border-8 w-fit rounded-full overflow-hidden'>
                                        {course?.profileImage ? (
                                            <IKImage
                                                urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                                path={course.profileImage}
                                                className='w-[10rem] h-[10rem] object-cover imd:w-[8rem] imd:h-[8rem]'
                                                loading='lazy'
                                                lqip={{
                                                    active: true,
                                                    quality: 20
                                                }}
                                                alt={`${course.username} image`}
                                            />
                                        ) : (
                                            <div className="w-[10rem] h-[10rem] bg-gray-200 rounded-full"></div>
                                        )}
                                    </div>
                                    <h1 className='text-[2rem] mb-4 font-500 font-serif imd:text-3xl imd:mt-2'>
                                        {course?.username}
                                    </h1>
                                    <div className="shadow-shadow bg-[#EDE8DC] px-4 pt-5 pb-3 mb-7 rounded-md">
                                        <h1 className="mb-4 font-sans text-3xl aism:text-2xl">
                                            Instructor experience
                                        </h1>
                                        <Text expanded={expanded}>{course?.experience || 'Not available'}</Text>
                                        <ToggleButton onClick={toggleReadMore}>
                                            {expanded ? "Read Less" : "Read More"}
                                        </ToggleButton>
                                    </div>

                                    <h1 className='font-serif text-3xl aism:text-2xl cxsm:text-xl'>
                                        <span className='font-roboto font-600'>Course name: </span>
                                        <span>{course?.classname}</span>
                                    </h1>

                                    <div className="shadow-shadow bg-[#EDE8DC] px-4 py-5 mt-5 rounded-md">
                                        <span className="mb-4 font-sans text-2xl aism:text-xl aism:font-500 cxsm:text-base cxsm:font-600 cxsm:mb-0">
                                            Description:
                                        </span>
                                        <p className='text-sm mt-4 cxsm:mt-3 leading-6 aism:text-sm/relaxed'>{course?.description}</p>
                                    </div>

                                    <div className="p-4 mt-6 grid grid-cols-3 cimd:grid-cols-2 ixsm:px-3 ixsm:grid-cols-5 cxsm:grid-cols-1 cimd:gap-y-3 bg-[#8786861e] rounded">
                                        <div className="w-fit flex items-center ixsm:col-span-2">
                                            <span className="font-600 text-xl aism:text-base ixsm:text-sm flex items-center text-[#1f2937] gap-2">
                                                <FaMoneyBill />
                                                Price:
                                            </span>
                                            <span className="ml-4 text-base aism:text-sm ixsm:text-xs">#{course?.price?.toLocaleString()}</span>
                                        </div>
                                        <div className="items-center flex ixsm:col-span-3 ixsm:justify-center cxsm:justify-start">
                                            <span className="font-600 text-xl aism:text-base ixsm:text-sm flex items-center text-[#1f2937] gap-2">
                                                <SiStatuspal />
                                                Status:
                                            </span>
                                            <span
                                                className={`border border-solid px-4 rounded-2xl font-500 text-sm tracking-tight text-[0.8rem] align-text-top ml-4 aism:text-sm ixsm:text-xs ixsm:ml-2 ${course?.status !== "approved"
                                                    ? "border-[#85440bf2] bg-[#85440b31] text-[#85440bf2]"
                                                    : "border-[#126e0cf2] bg-[#0b85155a] text-[#125333f2]"
                                                    }`}
                                            >
                                                {course?.status}
                                            </span>
                                        </div>
                                        <div className="w-fit flex items-center aism:col-span-full">
                                            <span className="font-600 text-xl aism:text-base ixsm:text-sm flex items-center text-[#1f2937] gap-2">
                                                <MdAirlineSeatReclineExtra />
                                                Total Seats:
                                            </span>
                                            <span className="ml-4 text-md aism:text-sm ixsm:text-xs">
                                                {course?.totalSeats}
                                            </span>
                                        </div>
                                    </div>

                                    <HardCodedClassDescription />

                                    <div className='mt-5 max-w-[96%] mx-auto'>
                                        <h1 className="text-[1.14rem] font-700 font-sans inline-block">
                                            All courses
                                        </h1>
                                        {allCourses?.length >= 5 && (
                                            <Link
                                                to="/class"
                                                className="float-right underline text-[#053323] select-none"
                                            >
                                                <span>See all</span>
                                            </Link>
                                        )}
                                        <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 ixsm:gap-4 gap-3 mt-4'>
                                            {isLoading && (<SkeletonLoader2 value={noOfSkeletons()} />)}
                                            {
                                                !isLoading && allCourses?.length > 0 &&
                                                allCourses?.slice(0, 4)?.map((course) => {
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
                                        <h1 className="text-[1.14rem] font-700 font-sans inline-block">
                                            Other uploaded courses
                                        </h1>
                                        {otherUploadedCourses?.length >= 5 && (
                                            <Link
                                                to={`/instructor/${course?.userId}/all-courses`}
                                                className="float-right underline text-[#053323] select-none"
                                            >
                                                <span>See all</span>
                                            </Link>
                                        )}
                                        <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 ixsm:gap-4 gap-3 mt-4'>
                                            {isLoading && (<SkeletonLoader value={noOfSkeletons()} />)}
                                            {
                                                !isLoading && otherUploadedCourses?.length > 0
                                                && otherUploadedCourses?.slice(0, 4)?.map((course) => {
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
                                </div>
                            </div>
                        </Fragment>
                    ) : !isLoading && !course?._id && (
                        <NoData>
                            <span>No details details available at the moment. Check back later or reload page!</span>
                        </NoData>
                    )
                }
            </div>
        </section>
    )
}

export default CourseDetails