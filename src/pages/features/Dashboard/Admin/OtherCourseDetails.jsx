/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { IKImage } from 'imagekitio-react'

import useScrollTop from '../../../../hooks/useScrollTop'

import convertTime from '../../../../utils/convertTimeMoment'
import trim from '../../../../utils/trim'

function OtherCourseDetails({ course }) {

    const { scrollTop } = useScrollTop();

    return (
        <figure className='flex flex-col justify-between'>
            <div>
                <IKImage
                    urlEndpoint={"https://ik.imagekit.io/4sbkuudrb"}
                    path={course?.thumbnailPhoto}
                    className='w-72 h-52 object-cover rounded ilg:w-full'
                    loading='lazy'
                    lqip={{
                        active: true,
                        quality: 20
                    }}
                    alt={`${course?.classname} image`}
                />
                <div className='mt-3 text-sm font-mono ism:text-xs ism:font-sans'>
                    Duration: {convertTime(course?.time?.startTime, course?.time?.endTime)}
                </div>
                <div className='mt-2 font-500 font-sans leading-5 ism:text-sm'>
                    {trim(course.description, 60)}
                </div>
            </div>
            <Link to={`/class/${course?._id}`} onClick={scrollTop}>
                <div className='border-[#3a6043] border-solid border text-[#3a6043] px-3 py-2 rounded-md text-center transition-all hover:text-slate-50 hover:bg-[#3a6043] mt-4 select-none'>
                    Read more
                </div>
            </Link>
        </figure>
    )
}

export default OtherCourseDetails