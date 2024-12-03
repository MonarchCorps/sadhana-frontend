/* eslint-disable react/prop-types */
import { FaClock, FaMoneyBill } from 'react-icons/fa'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import useScrollTop from '../../../../../hooks/useScrollTop'
import trim from '../../../../../utils/trim'
import { IKImage } from 'imagekitio-react'

//At least other component is using this Class component
function Class({ course }) {

    const { scrollTop } = useScrollTop();

    return (
        <div className='w-full shadow-shadow rounded-lg overflow-hidden mb-6 grid grid-cols-3 clg:max-h-80 hrmd:flex hrmd:flex-col hrmd:gap-1 hrmd:h-full gap-4'>
            <div className='col-span-1 size-full'>
                <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={course?.thumbnailPhoto}
                    className='size-full hrmd:h-[18.75rem] object-cover'
                    loading='lazy'
                    lqip={{
                        active: true,
                        quality: 20
                    }}
                    alt={`${course?.classname} image`}
                />
            </div>
            <div className='py-8 hrmd:py-4 px-2 flex flex-col col-span-2 hrmd:px-5'>
                <div>
                    <h1 className='font-500 text-2xl mb-3 sm:text-xl'>{trim(course?.classname, 25)}</h1>
                    <div className='flex sm:flex-col-reverse sm:gap-1 gap-3 mb-3'>
                        <span>
                            <span className='inline-block mr-2 text-[#e5759a]'>
                                <FontAwesomeIcon icon={faCalendarAlt} />
                            </span>
                            <span className='text-[#3a3939] text-sm'>{course?.day}</span>
                        </span>
                        <span>
                            <span className='inline-block mr-2 text-[#e5759a] mb-[-0.125rem]'><FaClock /></span>
                            <span>
                                <span className='text-[#3a3939] text-sm'>{course?.time?.startTime}</span>
                                <span>-</span>
                                <span className='text-[#3a3939] text-sm'>{course?.time?.endTime}</span>
                            </span>
                        </span>
                    </div>
                    <div className='mb-1'>
                        <p className='inline-flex gap-2 mr-2 text-[#e5759a]'>
                            <FaMoneyBill />
                            <span className='text-sm'>Paid Price</span>
                        </p>
                        <span className='text-[#3a3939] text-sm'>$ {course?.paidPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-[15px] leading-[1.59] text-[#3a3939] font-400 opacity-80 mb-6 lg:text-sm sm:leading-6">
                        {trim(course?.description, 140)}
                    </p>
                </div>
                <div className='mt-1 flex sm:flex-col sm:gap-3 sm:text-center'>
                    <Link
                        to={`/class/${course?._id}`}
                        className='text-sm py-[0.6rem] px-7 text-[#e5759a] rounded-full bg-slate-50 shadow-inner border-[#e5779a] border-solid border-2'
                        onClick={scrollTop}
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Class