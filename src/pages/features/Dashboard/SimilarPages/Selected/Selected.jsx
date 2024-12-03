import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import useAuth from '../../../../../hooks/useAuth'

import SelectedCourses from './SelectedCourses'
import PaymentSummary from './PaymentSummary'
import axios from '../../../../../api/axios'

function Selected() {

    const { auth } = useAuth();
    const [selectedCourses, setSelectedCourses] = useState([])

    const { isLoading, data: classes } = useQuery({
        queryKey: ['homePageClasses'],
        queryFn: () =>
            axios.get('/public/class').then((res) => {
                return res?.data
            }),
    })

    useEffect(() => {
        const idsInArray2 = new Set(auth?.selectedCourses.map(obj => obj.courseId));
        const data = classes?.filter(obj => idsInArray2.has(obj._id));

        setSelectedCourses(data)
    }, [classes, auth?.selectedCourses])


    return (
        <>
            <section>
                <div className='max-w-[69rem] mx-auto py-10 pr-5 h-full relative'>
                    <div className="mb-10 text-center">
                        <h1 className='text-[2.3rem] mb-2 font-500 font-sans text-center'>
                            My <span className="text-[#27554a]">Selected classes</span>
                        </h1>
                        <p className="text-base">Here you can see how many selected classes you current have</p>
                        <p className="text-sm">{`${selectedCourses?.length || 0} class(es)`}</p>
                    </div>
                    <div className='w-full grid grid-flow-col gap-4'>
                        <SelectedCourses selectedCourses={selectedCourses} isLoading={isLoading} />
                        {
                            !isLoading && selectedCourses?.length > 0 && (
                                <PaymentSummary selectedCourses={selectedCourses} />
                            )
                        }
                    </div>
                </div>
            </section >
        </>
    )
}

export default Selected