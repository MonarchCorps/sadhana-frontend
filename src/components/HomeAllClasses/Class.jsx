/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useScrollTop from '../../hooks/useScrollTop';
import trim from '../../utils/trim'
import { Link } from 'react-router-dom'
import { IKImage } from 'imagekitio-react';

function Class({ course, handleBookClass, handleUnBookClass, enrolledCourses }) {

    const navigate = useNavigate();
    const { auth } = useAuth();
    const { scrollTop } = useScrollTop();
    return (
        <div className="rounded-md overflow-hidden flex flex-col justify-between shadow-shadow">
            <IKImage
                urlEndpoint={"https://ik.imagekit.io/4sbkuudrb"}
                path={course?.thumbnailPhoto}
                className="w-[90rem] h-[16rem] object-cover "
                loading='lazy'
                lqip={{
                    active: true,
                    quality: 20
                }}
                alt={`${course?.classname} image`}
            />
            <div className="mt-3 px-5 flex flex-col justify-between">
                <div>
                    <h1 className="font-500 text-xl sm:text-base">{trim(course?.classname, 20)}</h1>
                    <h3 className="text-[0.85rem] sm:text-sm text-[#030303b9] my-1 break-words">
                        <span>Instructor: </span>
                        <span>{course?.username}</span>
                    </h3>
                    <div className="flex flex-wrap justify-between mb-3 text-[0.95rem] text-[#030303b9]">
                        <p>Total Seat {course?.totalSeats}: </p>
                        <p className="text-[#e5759a] text-[1.15rem] sm:text-sm">#{course?.price.toLocaleString()}</p>
                    </div>
                </div>
                <div className="text-center mb-5 flex flex-wrap justify-center gap-3 mt-2">
                    {
                        enrolledCourses?.flatMap(data => {
                            return (
                                data.courseDetails
                            )
                        })?.some(details => details._id === course._id)
                            ? <button
                                disabled
                                className='text-sm h-[2.8rem] w-24 bg-[#e5759a] text-slate-50 shadow-inner p-1 transition-all hover:rounded-full cursor-default'
                            >
                                Enrolled
                            </button>
                            : auth?.selectedCourses?.some(selectedCourse => selectedCourse.courseId == course._id) ? (
                                <button
                                    className='text-sm h-[2.8rem] w-24 bg-[#e5759a] text-slate-50 shadow-inner p-1 transition-all hover:rounded-full'
                                    onClick={() => {
                                        if (!auth?.username) return navigate('/auth');
                                        handleUnBookClass.mutate(course?._id);
                                    }}
                                >
                                    Unbook
                                </button>
                            ) : (
                                <button
                                    className='text-sm h-[2.8rem] w-24 bg-[#e5759a] text-slate-50 shadow-inner p-1 transition-all hover:rounded-full'
                                    onClick={() => {
                                        if (!auth?.username) return navigate('/auth');
                                        handleBookClass.mutate(course?._id);
                                    }}
                                >
                                    Book now
                                </button>
                            )
                    }

                    <Link
                        to={`/class/${course?._id}`}
                        onClick={scrollTop}
                        className='text-sm text-[#e5759a] bg-slate-50 shadow-inner border-[#e5779a] border-solid border-2 transition-all hover:rounded-full py-[11px] px-4'
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Class