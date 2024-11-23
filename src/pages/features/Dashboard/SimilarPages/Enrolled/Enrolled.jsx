import { Fragment, useState } from 'react'
import useAuth from '../../../../../hooks/useAuth'
import useGetDataPrivate from '../../../../../hooks/useGetDataPrivate'
import EnrolledCourse from './EnrolledCourse'
import History from './History'
import PaymentSummary from './PaymentSummary'
import PaymentHead from './PaymentHead'
import AskQuestion from './AskQuestion'

function Enrolled() {

    const { auth } = useAuth();
    const { data: enrolledCourse, isLoading } = useGetDataPrivate(`/enrolled/${auth?._id}`)

    const [filteredDetails, setFilteredDetails] = useState(enrolledCourse);

    return (
        <Fragment>
            <section>
                <div className="max-w-[66rem] mx-auto py-10 pr-5 h-full relative">
                    <div className="mb-10 text-center">
                        <h1 className='text-[2.3rem] mb-2 font-500 font-sans text-center'>
                            My <span className="text-[#27554a]">Enrolled course</span>
                        </h1>
                        <p className="text-base">Here you can see how many enrolled course you current have</p>
                        <p className="text-sm">{`${enrolledCourse?.flatMap(data => { return data?.courseDetails })?.length} ${enrolledCourse?.length <= 1 ? 'class' : 'classes'}`}</p>
                    </div>
                    <>
                        <EnrolledCourse enrolledCourse={enrolledCourse} isLoading={isLoading} />
                        {
                            enrolledCourse?.length > 0 && (
                                <div className='flex gap-5'>
                                    <History enrolledCourse={enrolledCourse} />
                                    <AskQuestion />
                                </div>
                            )
                        }
                        {
                            !isLoading && enrolledCourse?.length > 0 && (
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