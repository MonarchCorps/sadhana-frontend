import { Fragment, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import useAuth from '../../../../../hooks/useAuth'
import EnrolledCourse from './EnrolledCourse'
import History from './History'
import PaymentSummary from './PaymentSummary'
import PaymentHead from './PaymentHead'
import AskQuestion from './AskQuestion'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function Enrolled() {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate()

    const { data: enrolledCourse, isPending } = useQuery({
        queryKey: ['enrolledDetails'],
        queryFn: () =>
            axiosPrivate.get(`/enrolled/${auth?._id}`).then(res => {
                return res?.data
            })
    })

    const [filteredDetails, setFilteredDetails] = useState(enrolledCourse);

    return (
        <Fragment>
            <section className='w-screen'>
                <div className="max-w-[95%] mx-auto py-10 h-full relative">
                    <div className="mb-10 text-center">
                        <h1 className='text-[2.3rem] mb-2 font-500 font-sans text-center'>
                            My <span className="text-[#27554a]">Enrolled course</span>
                        </h1>
                        <p className="text-base">Here you can see how many enrolled course you current have</p>
                        <p className="text-sm">{`${enrolledCourse?.flatMap(data => { return data?.courseDetails })?.length || 0} ${enrolledCourse?.length <= 1 ? 'class' : 'classes'}`}</p>
                    </div>
                    <>
                        <EnrolledCourse enrolledCourse={enrolledCourse} isLoading={isPending} />
                        {
                            enrolledCourse?.length > 0 && (
                                <div className='max-w-[90%] hrmd:max-w-[94%] mx-auto flex imd:flex-col ixsm:max-w-[100%] gap-5 mt-6'>
                                    <History enrolledCourse={enrolledCourse} />
                                    <AskQuestion />
                                </div>
                            )
                        }
                        {
                            !isPending && enrolledCourse?.length > 0 && (
                                <Fragment>
                                    <PaymentHead enrolledCourse={enrolledCourse} setFilteredDetails={setFilteredDetails} />
                                    <PaymentSummary filteredDetails={filteredDetails} />
                                </Fragment>

                            )
                        }
                    </>
                </div>
            </section >
        </Fragment>
    )
}

export default Enrolled