/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { FaUserAlt, FaLevelUpAlt, FaPlay } from 'react-icons/fa'
import { MdClass } from 'react-icons/md'
import { IoMdTime } from 'react-icons/io'
import { IoLanguageSharp } from 'react-icons/io5'
import { PiStudentFill } from 'react-icons/pi'
import convertTime from '../../utils/convertTimeMoment'
import { PageSocialMediaShare } from '../SocialMediaShare'

import similarImage from '../../assets/images/diversity-women-in-yoga-class-for-meditation-exercise-for-fitness-peace-and-wellness-group-and-in.jpg'
import { IKImage } from 'imagekitio-react'

function RightHomeClassDetails({ course }) {
    return (
        <div className='lg:w-full lg:max-w-[30rem]'>
            <aside>
                <div className='mb-4 relative'>
                    <Link to={course[0]?.videoUrl} >
                        <IKImage
                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                            path={course[0]?.thumbnailPhoto}
                            className='h-[18rem] w-full object-cover rounded-md'
                            loading='lazy'
                            lqip={{
                                active: true,
                                quality: 20
                            }}
                            alt={`${course[0]?.username} image`}
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[5px] border-solid text-[#ffffffa7] border-[#ffffffa7] rounded-full w-24 h-24 text-center grid place-items-center cursor-pointer hover:bg-[#FFFFFF] hover:border-[#FFFFFF] hover:text-[#D6809C] transition-all duration-[350ms]">
                            <span className="text-2xl ml-1">
                                <FaPlay />
                            </span>
                        </div>
                    </Link>
                </div>
                <div>
                    <p className='text-[#e5779a] text-[1.15rem] mb-3'>#{course[0]?.price}</p>
                </div>
                <Link to='/class' className='text-center'>
                    <div className='bg-[#e5779a] py-3 text-slate-300 font-600 transition-all border border-solid hover:rounded-full hover:border-[#e5779a] hover:bg-slate-100 hover:text-[#e5779a] hover:bg-transparent'>Enroll now</div>
                </Link>
                <div className='mt-7'>
                    <div className='flex justify-between items-center border-b-[1px] border-solid border-b-[#c7c6c6] pb-4 mb-5'>
                        <span className='grid grid-flow-col gap-3 place-items-center text-base font-sans'>
                            <span><FaUserAlt /></span>
                            <span>Instructor</span>
                        </span>
                        <span>{course[0]?.username}</span>
                    </div>
                    <div className='flex justify-between items-center border-b-[1px] border-solid border-b-[#c7c6c6] pb-4 mb-5'>
                        <span className='grid grid-flow-col gap-3 place-items-center text-base font-sans'>
                            <span><MdClass /></span>
                            <span>Lectures</span>
                        </span>
                        <span>24</span>
                    </div>
                    <div className='flex justify-between items-center border-b-[1px] border-solid border-b-[#c7c6c6] pb-4 mb-5'>
                        <span className='grid grid-flow-col gap-3 place-items-center text-base font-sans'>
                            <span><IoMdTime /></span>
                            <span>Duration</span>
                        </span>
                        <span>{convertTime(course[0]?.time?.startTime, course[0]?.time?.endTime)}</span>
                    </div>
                    <div className='flex justify-between items-center border-b-[1px] border-solid border-b-[#c7c6c6] pb-4 mb-5'>
                        <span className='grid grid-flow-col gap-3 place-items-center text-base font-sans'>
                            <span><IoLanguageSharp /></span>
                            <span>Language</span>
                        </span>
                        <span>English</span>
                    </div>
                    <div className='flex justify-between items-center border-b-[1px] border-solid border-b-[#c7c6c6] pb-4 mb-5'>
                        <span className='grid grid-flow-col gap-3 place-items-center text-base font-sans'>
                            <span><PiStudentFill /></span>
                            <span>Enrolled</span>
                        </span>
                        <span>400 students</span>
                    </div>
                    <div className='flex justify-between items-center border-b-[1px] border-solid border-b-[#c7c6c6] pb-4 mb-5'>
                        <span className='grid grid-flow-col gap-3 place-items-center text-base font-sans'>
                            <span><FaLevelUpAlt /></span>
                            <span>Course Level</span>
                        </span>
                        <span>Intermediate</span>
                    </div>
                </div>
                <div>
                    <span>Share on:</span>
                    <div className='grid grid-flow-col gap-5 w-fit mt-4'>
                        <PageSocialMediaShare url={`http://www.monarch-corps.com`} title={`yoga-master`} />
                    </div>
                </div>
                <div className='mt-6'>
                    <h1 className='font-600 mb-4'>Related Courses</h1>
                    <div>
                        <div className='flex gap-8 border-b-[1px] border-solid border-[#c7c8c8] pb-4 mb-5'>
                            <img src={similarImage} alt="" className='w-20 h-20 rounded-md object-cover' />
                            <div>
                                <h1 className='font-600 mb-3'>Greatest passion in...</h1>
                                <h2 className='text-base text-pink-600'>$32.00</h2>
                            </div>
                        </div>
                        <div className='flex gap-8 border-b-[1px] border-solid border-[#c7c8c8] pb-4 mb-5'>
                            <img src={similarImage} alt="" className='w-20 h-20 rounded-md object-cover' />
                            <div>
                                <h1 className='font-600 mb-3'>Greatest passion in...</h1>
                                <h2 className='text-base text-pink-600'>$32.00</h2>
                            </div>
                        </div>
                        <div className='flex gap-8 border-b-[1px] border-solid border-[#c7c8c8] pb-4 mb-5'>
                            <img src={similarImage} alt="" className='w-20 h-20 rounded-md object-cover' />
                            <div>
                                <h1 className='font-600 mb-3'>Greatest passion in...</h1>
                                <h2 className='text-base text-pink-600'>$32.00</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default RightHomeClassDetails