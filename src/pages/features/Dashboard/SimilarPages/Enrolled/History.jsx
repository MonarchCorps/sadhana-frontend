/* eslint-disable react/prop-types */
import { format } from 'date-fns'
import { MdPayment } from 'react-icons/md'

function History({ enrolledCourse }) {
    return (
        <div className="bg-[#f6f6f6] py-3 px-4 rounded-md mt-10 mb-5 w-1/2">
            <h1 className="font-500 font-sans text-xl">History</h1>
            <h3 className="text-[0.7rem] text-[#008000] mt-2">First three history will be displayed</h3>
            <div className='overflow-scroll max-h-[18.5rem]'>
                {
                    enrolledCourse.map((course, i) => {
                        if (i <= 3) {
                            return (
                                <div key={i} className='mt-3 flex gap-6 items-center '>
                                    <div className='bg-[#226c30] w-fit p-3 rounded'>
                                        <span className='text-slate-50 text-3xl'><MdPayment /></span>
                                    </div>
                                    {
                                        course.courseDetails?.length > 1 ? (
                                            <div>
                                                <span className='text-sm font-500 opacity-65'>Enrollment on </span>
                                                <span className='text-sm font-500'>{format(course?.createdAt, 'MMM, dd yyyy pp')} </span>
                                                <span className='opacity-65'>for</span>
                                                <div className='block ml-5'>
                                                    {
                                                        course.courseDetails.map((details, i) => {
                                                            return (
                                                                <span key={i} className='block'>
                                                                    <span className='font-sans opacity-65'>{i + 1}. </span>
                                                                    <span className='font-600 text-sm'>{details?.classname}</span>
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div>
                                                    <span className='font-600 text-sm'>Price: </span>
                                                    <span className='text-sm'>{`NGN ${(course.totalAmount).toLocaleString()}`}</span>
                                                </div>
                                            </div>

                                        ) : (
                                            <div>
                                                <span className='text-sm font-500 opacity-65'>Enrolled for </span>
                                                <span className='font-600 text-sm'>{course.courseDetails[0]?.classname}</span>
                                                <div className='ml-5'>
                                                    <span className='font-600 text-sm'>Price: </span>
                                                    <span className='text-sm'>{`NGN ${course.courseDetails[0]?.paidPrice}`}</span>
                                                </div>
                                                <span className='text-sm font-500'>{format(course?.createdAt, 'MMM, dd yyyy pp')} </span>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div >
    )
}

export default History