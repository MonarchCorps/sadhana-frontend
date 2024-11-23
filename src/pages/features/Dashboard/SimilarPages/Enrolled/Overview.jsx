import getTotalPrice from "../../../../../utils/getTotalPrice"
import trim from "../../../../../utils/trim"

/* eslint-disable react/prop-types */
function Overview({ enrolledDetails }) {
    const totalEnrolledCourse = enrolledDetails?.length > 0 && (
        enrolledDetails?.map(details => {
            return details?.courseDetails?.length
        }).reduce((acc, value) => {
            return acc += value
        })
    )

    return (
        <div className="mt-12 w-96">
            <h1 className="underline decoration-[#a3410c] decoration-wavy font-500 text-[1.2rem]">Overview</h1>
            <div>
                <div className='min-h-64 border border-solid border-slate-50 shadow-sm mt-3 p-3'>
                    <ul>
                        <li className="grid grid-flow-col justify-between border-b border-solid border-b-slate-100 pb-2 mb-3">
                            <h1>
                                <span className="font-500">Courses </span>
                                <span>{`(${totalEnrolledCourse})`}</span>
                            </h1>
                            <h1>
                            </h1>
                        </li>
                        {
                            enrolledDetails?.map((details) => {
                                return details?.courseDetails?.map((course, i) => {
                                    return (
                                        <li key={i} className="grid grid-flow-col justify-between">
                                            <div>
                                                <span className='opacity-65 text-black text-2xl align-middle mr-2'>-</span>
                                                <span className="font-500 text-sm">{trim(course?.classname, 20)}</span>
                                            </div>
                                            <div>
                                                <span>
                                                    <span>#</span>
                                                    &nbsp;
                                                    <span className='text-green-900'>{course?.paidPrice}</span>
                                                </span>
                                            </div>
                                        </li>
                                    )
                                })
                            })
                        }
                    </ul>
                    <div className="mt-3 grid grid-flow-col justify-between items-center text-sm">
                        <span>Fees</span>
                        <span>
                            <span># </span>
                            <span className='text-green-900 text-[0.9rem]'>{getTotalPrice(enrolledDetails, 'fees')}</span>
                        </span>

                    </div>
                    <div className="grid justify-end mt-3 mb-1">
                        <span className='h-[0.1rem] w-14 bg-black'></span>
                    </div>
                    <p className=' grid grid-flow-col items-center justify-between'>
                        <span className="font-500 text-xl">Total:</span>
                        <span className="mx-1">
                            {getTotalPrice(enrolledDetails, 'totalAmount')}
                        </span>
                    </p>
                    <div className="grid justify-end mt-1">
                        <span className='h-[0.14rem] w-14 bg-black'>
                        </span>
                    </div>
                    <p className='text-sm mt-3'>
                        <strong>Note: </strong>
                        Other charges may apply
                    </p>
                </div>
            </div>
        </div>
    )
}

// Part classes and the selected payment summary

export default Overview