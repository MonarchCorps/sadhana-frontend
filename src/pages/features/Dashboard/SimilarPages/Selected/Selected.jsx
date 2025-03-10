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
        queryKey: ['homeAllCourses'],
        queryFn: () =>
            axios.get('/public/class').then((res) => {
                return Array.isArray(res?.data) ? res.data : [];
            }),
    })

    useEffect(() => {
        if (classes) {
            const idsInArray2 = new Set(auth?.selectedCourses.map(obj => obj.courseId));
            const data = classes?.filter(obj => idsInArray2.has(obj._id));

            setSelectedCourses(data)
        }
    }, [classes, auth?.selectedCourses])

    return (
        <>
            <section className='w-screen'>
                <div className='max-w-[95%] ilg:max-w-[90%] mx-auto py-10 pr-5 ilg:px-2 h-full relative'>
                    <div className="mb-10 text-center">
                        <h1 className='text-[2.3rem] sm:text-3xl mb-2 font-500 font-sans text-center'>
                            My <span className="text-[#27554a]">Selected classes</span>
                        </h1>
                        <p className="text-base sm:text-sm">Here you can see how many selected classes you currently have</p>
                        <p className="text-sm">{`${selectedCourses?.length || 0} class(es)`}</p>
                    </div>
                    <div className='w-full grid grid-flow-col ilg:grid-flow-row gap-4'>
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