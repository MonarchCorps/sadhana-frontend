/* eslint-disable react/prop-types */
import { useState, useRef, Fragment } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaUserAlt, FaEdit, FaTrash, FaMoneyBillAlt, FaInfoCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import useScrollTop from '../../../../../hooks/useScrollTop'
import useHideScroll from '../../../../../hooks/useHideScroll'
import trim from '../../../../../utils/trim'
import { IKImage } from 'imagekitio-react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { formatDate } from '@/chat/lib/utils'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'
import { DeleteCancelButton, DeleteConfirmButton, DeleteModal } from '@/components/Modals/DeleteModal'

function Course({ course, handleCheckedState, deleteCourse, setCoursesToDelete, coursesToDelete, handleApproval }) {

    const { scrollTop } = useScrollTop();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { screenWidth } = useGetScreenWidth()

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
        <Fragment>
            <AccordionItem value={course?._id} className='border-b-0' key={course?._id}>
                <AccordionTrigger className={`w-screen grid grid-cols-[repeat(9,minmax(0,1fr)),50px] cmd:grid-cols-[repeat(8,minmax(0,1fr)),50px] imd:grid-cols-[repeat(7,minmax(0,1fr)),50px] cimd:grid-cols-[repeat(6,minmax(0,1fr)),50px] sm:grid-cols-6 xsm:grid-cols-5 sm:pb-0 msm:grid-cols-5 gap-3 items-center px-2 pt-[0.9rem] pb-4 border-b border-solid border-[#d2d1d1c8] casm:px-0 accordionWrapper ${screenWidth <= 930 ? 'cursor-pointer' : 'cursor-default'}`} style={{ textDecoration: 'none', userSelect: 'text' }}>
                    <div className='text-start flex items-center ml-4 col-span-4 msm:col-span-full axsm:items-start'>
                        <input
                            type="checkbox"
                            name="course"
                            id="course"
                            onChange={(e) => handleCheckedState(e, course?._id)}
                            checked={coursesToDelete?.includes(course._id)}
                            className='w-5 h-5 mr-4 rounded-md border border-solid border-[#8b8888] align-text-bottom axsm:mt-3'
                        />
                        <div className='flex axsm:flex-col'>
                            <div className='w-12 h-12'>
                                <IKImage
                                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                    path={course?.thumbnailPhoto}
                                    className='size-full rounded-full object-cover'
                                    loading='lazy'
                                    lqip={{
                                        active: true,
                                        quality: 20
                                    }}
                                    alt={`${course.thumbnailPhoto} image`}
                                />
                            </div>
                            <div className='w-[86%]'>
                                <span className='font-500 text-base ml-3 tracking-tight align-text-top mb-1 block asm:text-sm asm:font-bold' title={course?.classname}>
                                    {trim(course.classname, 26)}
                                </span>
                                <span className='font-400 text-base ml-3 tracking-tight align-text-top asm:text-sm' title={course?.email}>
                                    {trim(course.description, 26)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='text-center cimd:hidden'>
                        <span className='font-500 text-base tracking-tight align-text-top'>
                            <span className={`border border-solid px-4 mr-1 rounded-2xl ${course?.status !== 'approved' ? 'border-[#85440bf2] bg-[#85440b31] text-[#85440bf2]' : 'border-[#126e0cf2] bg-[#0b85155a] text-[#125333f2]'}`}>
                                <span className='text-[0.8rem] align-text-top'>
                                    {course?.status}
                                </span>
                            </span>
                        </span>
                    </div>
                    <div className='text-center sm:col-span-2 sm:mt-2'>
                        <span className='font-500 text-base tracking-tight align-text-top'>
                            <p className='hidden sm:inline text-base asm:text-sm'>Total Seats: </p>
                            {course?.totalSeats}
                        </span>
                    </div>
                    <div className='text-center sm:col-span-3 sm:text-start sm:mt-2 msm:col-span-2'>
                        <span className='font-500 text-base tracking-tight align-text-top'>
                            <p className='hidden sm:inline text-base text-green-800 asm:text-sm'>Price: </p>
                            <span className='asm:text-sm asm:ml-1'> #{(course.price).toLocaleString()}</span>
                        </span>
                    </div>
                    <div className='text-center cmd:hidden'>
                        <span className='font-500 tracking-tight text-start text-sm'>{course?.dateApplied && formatDate(course?.dateApplied)}</span>
                    </div>
                    <div className='text-center imd:hidden'>
                        <span className='font-500 text-sm tracking-tight align-text-top'>
                            {
                                course?.dateApproved && formatDate(course?.dateApproved)
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
                    <div className='relative sm:col-span-3 sm:flex sm:justify-end sm:mt-2 sm:mr-2 msm:col-span-1'>
                        <span className='flex justify-end w-fit'>
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
                                    <div className='grid grid-flow-col justify-start items-center gap-3 text-red-500'>
                                        <span>
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
                    </div>
                    {screenWidth <= 930 && (
                        <div className='col-span-full'>
                            <AccordionContent className='flex gap-3 pb-1 amd:justify-between esm:flex-wrap esm:items-start esm:gap-0 esm:pt-2'>
                                <p className='hidden cimd:block text-start mt-1'>
                                    <span className='esm:inline-block text-sm amd:text-xs font-bold'>Status &nbsp;</span>
                                    <span className={`font-500 text-base amd:text-xs tracking-tight align-text-top border border-solid px-4 mr-1 rounded-2xl ${course?.status !== 'approved' ? 'border-[#85440bf2] bg-[#85440b31] text-[#85440bf2]' : 'border-[#126e0cf2] bg-[#0b85155a] text-[#125333f2]'}`}>
                                        <span className='text-[0.8rem] align-text-top'>
                                            {course?.status}
                                        </span>
                                    </span>
                                </p>
                                <p className='hidden cmd:block text-start'>
                                    <span className='esm:inline-block text-sm amd:text-xs font-bold'>Applied on: &nbsp;</span>
                                    <span className='amd:text-xs'>{course?.dateApplied && formatDate(course?.dateApplied)}</span>
                                </p>
                                <p className='hidden imd:block text-start'>
                                    <span className='esm:inline-block text-sm amd:text-xs font-bold'>Approved on: &nbsp;</span>
                                    <span className='amd:text-xs'>
                                        {
                                            course?.dateApproved && formatDate(course?.dateApproved)
                                            ||
                                            (
                                                <span className='font-500 text-sm tracking-tight'>
                                                    <button
                                                        type='button'
                                                        className='bg-[#0c2f0d] text-slate-200 rounded-xl text-sm px-3 py-[2px]'
                                                        onClick={() => handleApproval.mutate({ id: course?._id, action: 'approve' })}
                                                    >
                                                        Approve
                                                    </button>
                                                </span>
                                            )
                                        }
                                    </span>
                                </p>
                            </AccordionContent>
                        </div>
                    )}
                </AccordionTrigger >
            </AccordionItem>
            {isModalOpen && (
                <DeleteModal>
                    <p>
                        {`Are you sure you want to delete ${course?.classname}`}
                    </p>
                    <div className='mt-3 w-full text-center flex gap-4 justify-center'>
                        <DeleteCancelButton
                            onClick={() => {
                                setIsModalOpen(false)
                                setCoursesToDelete([])
                            }}
                        />
                        <DeleteConfirmButton
                            onClick={() => {
                                deleteCourse.mutate()
                                setIsModalOpen(false)
                            }}
                        />
                    </div>
                </DeleteModal>
            )}
        </Fragment>
    )
}

export default Course