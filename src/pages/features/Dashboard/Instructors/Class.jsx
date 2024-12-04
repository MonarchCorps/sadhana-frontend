/* eslint-disable react/prop-types */
import { FaClock } from 'react-icons/fa'
import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import Loading from '../../../../components/Loaders/Loading'

import useHideScroll from '../../../../hooks/useHideScroll'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import useScrollTop from '../../../../hooks/useScrollTop'
import usePathAfterSlash from '../../../../hooks/usePathAfterSlash'

import trim from '../../../../utils/trim'
import { IKImage } from 'imagekitio-react'

function Class({ course }) {

    const pathAfterSlash = usePathAfterSlash();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient()

    const { scrollTop } = useScrollTop();
    const axiosPrivate = useAxiosPrivate();

    const handleDeleteClass = useMutation({
        mutationFn: () => {
            return axiosPrivate.delete(`/class/${course._id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["instructorClasses"] })
            toast.success('Deleted successfully')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Deletion failed';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(handleDeleteClass.isPending)

    return (
        <>
            <Loading isLoading={handleDeleteClass.isPending} />
            <div className='w-full shadow-shadow rounded-lg overflow-hidden mb-6 grid grid-cols-3 hrmd:flex hrmd:flex-col hrmd:h-full hrmd:gap-0 gap-4'>
                <div className='col-span-1 size-full'>
                    <IKImage
                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                        path={course?.thumbnailPhoto}
                        className='size-full hrmd:h-[18.75rem] max-h-[20rem] object-cover'
                        loading='lazy'
                        lqip={{
                            active: true,
                            quality: 20
                        }}
                        alt={`${course?.classname} image`}
                    />
                </div>
                <div className='py-8 px-2 flex flex-col justify-between col-span-2 hrmd:px-5 hrmd:py-5'>
                    <div>
                        <div className='grid mb-3 grid-cols-2 imd:grid-cols-3 csm:grid-cols-2 w-fit gap-y-2 gap-x-6 casm:gap-x-3'>
                            <span>
                                <span className='inline-block mr-2 text-[#27554a]'>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </span>
                                <span className='text-[#3a3939] text-sm break-words'>{course?.day}</span>
                            </span>
                            <span className='casm:text-end'>
                                <span className='inline-block mr-2 text-[#27554a] mb-[-0.125rem]'><FaClock /></span>
                                <span className='text-[#3a3939] text-sm'>
                                    <span>{course.time?.startTime}</span>
                                    <span>-</span>
                                    <span>{course.time?.endTime}</span>
                                </span>
                            </span>
                            <span>
                                <span>Price: </span>
                                <span className='text-sm text-[#27554a]'>{`#${course?.price}`}</span>
                            </span>
                            <span className='casm:text-end'>
                                <span>Total Seats: </span>
                                <span className='text-sm text-[#27554a]'>{course?.totalSeats}</span>
                            </span>
                            <span className='casm:col-span-full'>
                                <span>Total Students: </span>
                                <span className='text-sm text-[#27554a]'>10</span>
                            </span>
                            <span className='casm:col-span-full'>
                                <span>Status: </span>
                                <span
                                    className='text-base'
                                    style={{
                                        color: `${course?.status === 'pending' || course?.status === 'denied'
                                            ? '#ff8d05'
                                            : course.status === 'approved'
                                            && 'green'}`
                                    }}>
                                    {course?.status}
                                </span>
                            </span>
                        </div>
                        <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-6 esm:text-sm esm:leading-6">
                            {trim(course.description, 180)}
                        </p>
                    </div>
                    <div className='grid grid-cols-3 casm:w-full casm:grid-cols-2  w-fit gap-2'>
                        {
                            pathAfterSlash === 'my-classes' && (
                                <Fragment>
                                    <Link to={`/dashboard/instructor-cp/class/edit/${course?._id}`} className='text-center grid place-items-center h-12 w-28 casm:w-full text-[#3f32ff] rounded-full bg-slate-50 shadow-inner border-[#3f32ff] border-solid border-2 hover:bg-[#3f32ff] hover:text-slate-50 transition-all cursor-pointer' onClick={scrollTop}>
                                        <span className='text-sm' >Update</span>
                                    </Link>
                                    <div className='text-center casm:w-full grid place-items-center h-12 w-28 text-[#c23a3a] rounded-full bg-slate-50 shadow-inner border-[#c23a3a] border-solid border-2 hover:bg-[#c23a3a] hover:text-slate-50 transition-all cursor-pointer' onClick={() => setIsModalOpen(prev => !prev)}>
                                        <span className='text-sm'>Delete</span>
                                    </div>
                                </Fragment>
                            )
                        }
                        <Link
                            to={`/class/${course?._id}`}
                            onClick={scrollTop}
                            className='text-center casm:w-full casm:col-span-full grid place-items-center h-12 w-28 text-[#00d661] rounded-full bg-slate-50 shadow-inner border-[#00d661] border-solid border-2 hover:bg-[#00d661] hover:text-slate-50 transition-all'
                        >
                            <span className='text-sm'>Read More</span>
                        </Link>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed top-0 left-0 bottom-0 right-0 w-full overflow-hidden flex items-center justify-center bg-black bg-opacity-50 z-[2000]">
                    <div className="bg-white p-5 rounded">
                        <p>
                            {`Are you sure you want to delete ${course?.classname}`}
                        </p>
                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setIsModalOpen(prev => !prev)
                                }}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleDeleteClass.mutate();
                                    setIsModalOpen(prev => !prev)
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Class