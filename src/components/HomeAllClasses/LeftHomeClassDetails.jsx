/* eslint-disable react/prop-types */
import { IKImage } from 'imagekitio-react';
import ThumbnailAdjuster from '../ThumbnailAdjuster'
import { format } from 'date-fns'
import HardCodedClassDescription from '../HardCodedClassDescription'

function LeftHomeClassDetails({ course }) {
    return (
        <div>
            <div>
                <ThumbnailAdjuster imageUrl={course[0]?.thumbnailPhoto} imageHeight='24.6rem' alt={`${course[0]?.classname} image`} />
            </div>
            <div className='mt-7'>
                <h1 className='font-500 text-3xl mb-4'>{course[0]?.classname}</h1>
                <div>
                    <div>
                        <div>
                            <IKImage
                                urlEndpoint={"https://ik.imagekit.io/4sbkuudrb"}
                                path={course[0]?.profileImage}
                                className='w-20 h-20 rounded-full object-cover'
                                loading='lazy'
                                lqip={{
                                    active: true,
                                    quality: 20
                                }}
                                alt={`${course[0]?.profileImage} image`}
                            />
                        </div>
                        <div className='font-sans font-500 mt-3 text-xl'>
                            <span className='text-[#632136]'>Instructor: </span>
                            <span>{course[0]?.username}</span>
                        </div>
                    </div>
                    <div className='font-sans font-500 mt-1 text-xl'>
                        <p className='text-[#632136] inline-block'>Applied on: </p>
                        &nbsp;
                        <p className='inline-block'>{course[0]?.dateApproved && format(course[0]?.dateApproved, "MMM dd, yyyy")}</p>
                    </div>
                    <HardCodedClassDescription />
                </div>
            </div>
        </div>
    );
}

export default LeftHomeClassDetails;
