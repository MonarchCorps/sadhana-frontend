/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import { format } from 'date-fns'

function EnrolledDetails({ details }) {

    return (
        <Fragment>
            {
                details?.courseDetails?.map((course, i) => {
                    return (
                        <div key={i} className='grid grid-cols-[0.95fr_0.4fr_0.3fr_0.15fr_0.3fr_0.3fr] items-center w-full px-3 py-2 rounded-xl mb-1 border border-solid'>
                            <div className="grid grid-flow-col items-center gap-3 w-fit">
                                <div className="w-12 h-12 rounded overflow-hidden">
                                    <img src={course?.thumbnailPhoto} alt={`${course?.classname} image`} className="size-full object-cover" />
                                </div>
                                <div>
                                    <h1 className='font-500 tracking-tight'>{course?.classname}</h1>
                                    <p className='text-sm font-400 text-slate-800 opacity-70'>
                                        {format(details?.createdAt, 'MMMM dd, yyyy')}
                                    </p>
                                </div>
                            </div>
                            <p className='text-[0.85rem] text-center'>
                                {details.paymentDetails?.paymentId}
                            </p>
                            <p className='text-center text-sm text-[#1b6540]'>
                                #{course?.paidPrice}
                            </p>
                            <p className='text-end'>
                                [{details.paymentDetails?.payment_method_type}]
                            </p>
                            <p className='text-center text-[#1b6540] text-sm'>
                                {details.paymentDetails?.payment_status}
                            </p>
                            <p className='text-center text-sm text-[#1b6540]'>
                                #{(details?.fees / details?.courseDetails?.length).toFixed(2)}
                            </p>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default EnrolledDetails