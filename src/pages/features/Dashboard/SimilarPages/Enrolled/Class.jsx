/* eslint-disable react/prop-types */
import { FaClock } from 'react-icons/fa'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import useScrollTop from '../../../../../hooks/useScrollTop'
import trim from '../../../../../utils/trim'

//At least other component is using this Class component
function Class({ course }) {

    const { scrollTop } = useScrollTop();

    return (
        <div className='shadow-shadow rounded-lg overflow-hidden flex mb-6 h-80'>
            <div className='w-[35%]'>
                <img src={course?.thumbnailPhoto} alt="Course image" className='size-full object-cover -mb-56' />
            </div>
            <div className='pt-6 px-2 ml-8 w-1/2'>
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
                        &nbsp;
                        &nbsp;
                        <span className='text-sm text-[#27554a]'>#&nbsp;{`${course?.paidPrice}`}</span>
                    </span>
                </div>
                <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-6 ">
                    {trim(course?.description, 100)}
                </p>
                <Link
                    to={`/class/${course?._id}`}
                    onClick={scrollTop}
                    className='text-center grid place-items-center h-12 w-28 text-[#00d661] rounded-full bg-slate-50 shadow-inner border-[#00d661] border-solid border-2 hover:bg-[#00d661] hover:text-slate-50 transition-all'
                >
                    <span className='text-sm'>Read More</span>
                </Link>
            </div>
        </div>
    )
}

export default Class