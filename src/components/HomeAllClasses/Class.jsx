/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useScrollTop from '../../hooks/useScrollTop';
import trim from '../../utils/trim'
import { Link } from 'react-router-dom'
import { IKImage } from 'imagekitio-react';

function Class({ course, handleBookClass, handleUnBookClass }) {

    const navigate = useNavigate();
    const { auth } = useAuth();
    const { scrollTop } = useScrollTop();

    return (
        <div className="rounded-md overflow-hidden shadow-shadow">
            <div>
                <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={course?.thumbnailPhoto}
                    className="w-[90rem] h-[16rem] object-cover "
                    loading='lazy'
                    lqip={{
                        active: true,
                        quality: 20
                    }}
                    alt={`${course?.classname} image`}
                />
            </div>
            <div className="mt-3 px-5 flex flex-col justify-between">
                <div>
                    <h1 className="font-500 text-xl">{trim(course?.classname, 20)}</h1>
                    <h3 className="text-[0.85rem] text-[#030303b9] my-1">
                        <span>Instructor: </span>
                        <span>{course?.username}</span>
                    </h3>
                    <div className="flex justify-between mb-3 text-[0.95rem] text-[#030303b9]">
                        <p>Total Seat {course?.totalSeats}: </p>
                        <p className="text-[#e5759a] text-[1.15rem]">#{course?.price.toLocaleString()}</p>
                    </div>
                </div>
                <div className="text-center mb-5 mt-2">
                    {
                        auth?.selectedCourses?.some(selectedCourse => selectedCourse.courseId == course._id) ? (
                            <button
                                className='text-sm h-[2.8rem] w-28 mr-2 bg-[#e5759a] text-slate-50 shadow-inner p-1 transition-all hover:rounded-full'
                                onClick={() => {
                                    if (!auth?.username) return navigate('/auth');
                                    handleUnBookClass.mutate(course?._id);
                                }}
                            >
                                Unbook
                            </button>
                        ) : (
                            <button
                                className='text-sm h-[2.8rem] w-28 mr-2 bg-[#e5759a] text-slate-50 shadow-inner p-1 transition-all hover:rounded-full'
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