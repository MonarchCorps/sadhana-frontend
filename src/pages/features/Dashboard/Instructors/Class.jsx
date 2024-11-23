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
            <div>
                <div className={`shadow-shadow rounded-lg overflow-hidden flex mb-6 h-[22rem]`}>
                    <div className='mr-9 w-2/5'>
                        <IKImage
                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                            path={course?.thumbnailPhoto}
                            className=' h-full object-cover -mb-56' loading='lazy'
                            lqip={{
                                active: true,
                                quality: 20
                            }}
                            alt={`${course?.classname} image`}
                        />
                    </div>
                    <div className='py-8 px-2 w-3/5'>
                        <h1 className='font-500 text-2xl mb-3'>{course?.classname}</h1>
                        <div className='grid mb-3 grid-cols-2 w-fit gap-y-2 gap-x-6'>
                            <span>
                                <span className='inline-block mr-2 text-[#27554a]'>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </span>
                                <span className='text-[#3a3939] text-sm'>{course?.day}</span>
                            </span>
                            <span>
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
                            <span>
                                <span>Total Seats: </span>
                                <span className='text-sm text-[#27554a]'>{course?.totalSeats}</span>
                            </span>
                            <span>
                                <span>Total Students: </span>
                                <span className='text-sm text-[#27554a]'>10</span>
                            </span>
                            <span>
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
                        <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-6 ">
                            {trim(course.description, 200)}
                        </p>
                        <div className='grid grid-flow-col w-fit gap-2'>
                            {
                                pathAfterSlash === 'my-classes' && (
                                    <Fragment>
                                        <Link to={`/dashboard/instructor-cp/class/edit/${course?._id}`} className='text-center grid place-items-center h-12 w-28 text-[#3f32ff] rounded-full bg-slate-50 shadow-inner border-[#3f32ff] border-solid border-2 hover:bg-[#3f32ff] hover:text-slate-50 transition-all cursor-pointer' onClick={scrollTop}>
                                            <span className='text-sm' >Update</span>
                                        </Link>
                                        <div className='text-center grid place-items-center h-12 w-28 text-[#c23a3a] rounded-full bg-slate-50 shadow-inner border-[#c23a3a] border-solid border-2 hover:bg-[#c23a3a] hover:text-slate-50 transition-all cursor-pointer' onClick={() => setIsModalOpen(prev => !prev)}>
                                            <span className='text-sm'>Delete</span>
                                        </div>
                                    </Fragment>
                                )
                            }
                            <Link
                                to={`/class/${course?._id}`}
                                onClick={scrollTop}
                                className='text-center grid place-items-center h-12 w-28 text-[#00d661] rounded-full bg-slate-50 shadow-inner border-[#00d661] border-solid border-2 hover:bg-[#00d661] hover:text-slate-50 transition-all'
                            >
                                <span className='text-sm'>Read More</span>
                            </Link>
                        </div>
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