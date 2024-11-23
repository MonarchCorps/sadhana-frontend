/* eslint-disable react/prop-types */
import { format } from 'date-fns'
import { useState, useRef } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaUserAlt, FaEdit, FaTrash, FaMoneyBillAlt, FaInfoCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import useScrollTop from '../../../../../hooks/useScrollTop'
import useHideScroll from '../../../../../hooks/useHideScroll'
import trim from '../../../../../utils/trim'
import { IKImage } from 'imagekitio-react'

function Course({ course, handleCheckedState, deleteCourse, setCoursesToDelete, coursesToDelete, handleApproval }) {

    const { scrollTop } = useScrollTop();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const visibleRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useHideScroll(isModalOpen)

    const handleMouseEnter = () => {
        setIsOpen(true);
    }

    const handleMouseLeave = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div className='grid grid-cols-[auto_1fr_0.3fr_0.3fr_0.15fr_0.3fr_0.3fr_50px] gap-3 items-center px-6 pt-[0.9rem] pb-4 border-b border-solid border-[#d2d1d1c8]'>
                <div>
                    <input
                        type="checkbox"
                        name="course"
                        id="course"
                        onChange={(e) => handleCheckedState(e, course?._id)}
                        checked={coursesToDelete?.includes(course._id)}
                        className='w-5 h-5 rounded-md border border-solid border-[#8b8888] align-text-bottom'
                    />
                </div>
                <div className='text-start flex items-center ml-4'>
                    <div>
                        <IKImage
                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                            path={course?.thumbnailPhoto}
                            className='w-12 h-12 rounded-full object-cover'
                            loading='lazy'
                            lqip={{
                                active: true,
                                quality: 20
                            }}
                            alt={`${course.thumbnailPhoto} image`}
                        />
                    </div>
                    <div>
                        <span className='font-500 text-base ml-3 tracking-tight align-text-top mb-1 block' title={course?.classname}>
                            {trim(course.classname, 70)}
                        </span>
                        <span className='font-400 text-base ml-3 tracking-tight align-text-top -mb-1' title={course?.email}>
                            {trim(course.description, 30)}
                        </span>
                    </div>
                </div>
                <div className='text-center'>
                    <span className='font-500 text-base tracking-tight align-text-top -mb-1'>
                        <span className={`border border-solid px-4 mr-1 rounded-2xl ${course?.status !== 'approved' ? 'border-[#85440bf2] bg-[#85440b31] text-[#85440bf2]' : 'border-[#126e0cf2] bg-[#0b85155a] text-[#125333f2]'}`}>
                            <span className='text-[0.8rem] align-text-top'>
                                {course?.status}
                            </span>
                        </span>
                    </span>
                </div>
                <div className='text-center'>
                    <span className='font-500 text-base tracking-tight align-text-top -mb-1'>
                        {course?.totalSeats}
                    </span>
                </div>
                <div className='text-center'>
                    <span className='font-500 text-base tracking-tight align-text-top -mb-1'>
                        ${(course.price).toLocaleString()}
                    </span>
                </div>
                <div className='text-center'>
                    <span className='font-500 tracking-tight text-start -mb-1 text-sm'>{course?.dateApplied && format(course?.dateApplied, 'MMM, dd yyyy')}</span>
                </div>
                <div className='text-end'>
                    <span className='font-500 text-sm tracking-tight align-text-top -mb-1'>

                        {
                            course?.dateApproved && format(course?.dateApproved, 'MMM, dd yyyy')
                            ||
                            (
                                <span className='font-500 text-sm tracking-tight align-text-top'>
                                    <button
                                        type='button'
                                        className='bg-[#0c2f0d] text-slate-200 rounded-xl text-sm px-3 py-1'
                                        onClick={() => handleApproval.mutate({ id: course?._id, action: 'approve' })}
                                    >
                                        Approve
                                    </button>
                                </span>
                            )
                        }
                    </span>
                </div>
                <div className='relative'>
                    <span className='flex justify-end w-fit ml-5'>
                        <CiMenuKebab className='text-2xl cursor-pointer w-fit' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                    </span>
                    <div ref={visibleRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                        className="absolute right-0 bottom-0 bg-[#fff] w-64 py-4 pr-2 pl-1 shadow-shadow border border-solid border-slate-900 rounded-xl z-10" style={{ display: `${isOpen ? 'block' : 'none'}` }}>
                        <ul>
                            <Link to={`/dashboard/admin-cp/class/details/${course?._id}`} className='cursor-pointer font-400 hover:bg-[#f2f2f2] pl-5 hover:font-500 py-2 rounded-md grid grid-flow-col justify-start items-center gap-3 select-none' onClick={scrollTop}>
                                <span className='text-[#6a6767]'>
                                    <FaUserAlt />
                                </span>
                                <span className='font-sans'>View details</span>
                            </Link>
                            <Link to={`/dashboard/admin-cp/class/edit/${course?._id}`} className='cursor-pointer font-400 hover:bg-[#f2f2f2] pl-5 hover:font-500 py-2 rounded-md grid grid-flow-col justify-start items-center gap-3 select-none' onClick={scrollTop}>
                                <span className='text-[#6a6767]'>
                                    <FaEdit />
                                </span>
                                <span className='font-sans'>Edit details</span>
                            </Link>
                            <li className='cursor-pointer font-400 hover:bg-[#f2f2f2] pl-5 hover:font-500 py-2 rounded-md grid grid-flow-col justify-start items-center gap-3 select-none'>
                                <span className='text-[#6a6767]'>
                                    <FaMoneyBillAlt />
                                </span>
                                <span className='font-sans'>Payments</span>
                            </li>
                            <li className='cursor-pointer hover:bg-[#f2f2f2] font-400 pl-5 hover:font-500 py-2 rounded-md flex justify-between items-center select-none' onClick={
                                () => {
                                    setIsModalOpen(true)
                                    setCoursesToDelete([])
                                    setCoursesToDelete([course?._id])
                                }
                            }>
                                <div className='grid grid-flow-col justify-start items-center gap-3'>
                                    <span className='text-[#6a6767]'>
                                        <FaTrash />
                                    </span>
                                    <span className='font-sans'>Delete course</span>
                                </div>
                                <span className='text-red-500 mr-2'>
                                    <FaInfoCircle />
                                </span>
                            </li>
                        </ul>
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
                                            setIsModalOpen(false)
                                            setCoursesToDelete([])
                                        }}
                                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            deleteCourse.mutate()
                                            setIsModalOpen(false)
                                        }}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </>
    )
}

export default Course