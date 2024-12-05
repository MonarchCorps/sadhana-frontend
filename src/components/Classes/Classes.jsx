import ClassesOverview from './ClassesOverview'
import PartClasses from './PartClasses'
import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from '../../api/axios'

import CustomizedProgressBars from '../Loaders/Loading4'
import useClassActions from '../../hooks/useClassActions'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useAuth from '@/hooks/useAuth'

function Classes() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const { handleBookClass, handleUnBookClass } = useClassActions()

    const { isLoading, data: classes } = useQuery({
        queryKey: ['homeAllCourses'],
        queryFn: () =>
            axios.get('/public/class').then((res) => {
                return res?.data
            }),
    })

    const { data: enrolledCourses } = useQuery({
        queryKey: ['enrolledDetails'],
        queryFn: () =>
            axiosPrivate.get(`/enrolled/${auth?._id}`).then(res => {
                return res?.data
            })
    })

    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        if (classes) {
            setFilteredCourses(classes?.filter(course => course?.status === 'approved'))
        }
    }, [classes])

    return (
        <>
            <section>
                <div className='max-w-[90%] mx-auto pt-28 flex flex-col service-bg'>
                    <ClassesOverview />
                    {isLoading && (
                        <div className='grid w-full place-items-center' >
                            <button
                                className='text-sm w-fit flex items-center gap-3 px-6 py-2 text-[#e5759a] rounded-full bg-slate-50 shadow-inner border-[#e5779a] border-solid border-2 cursor-progress'
                            >
                                Loading
                                <CustomizedProgressBars />
                            </button>
                        </div>
                    )}
                    {filteredCourses?.length > 0 ? (
                        filteredCourses.slice(0, 3).map((course) => (
                            <PartClasses
                                key={course._id}
                                course={course}
                                handleBookClass={handleBookClass}
                                handleUnBookClass={handleUnBookClass}
                                enrolledCourses={enrolledCourses}
                            />
                        ))
                    ) : (
                        !isLoading && <p className="text-center">No courses available for now! Check back later or reload the page!</p>
                    )}
                    {
                        filteredCourses?.length > 3 && (
                            <div className='w-full text-center mt-12'>
                                <Link to='class' onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    })
                                }}>
                                    <span className='text-sm h-14 w-36 mr-2 bg-[#e5759a] rounded-full text-slate-50 shadow-inner p-4 font-500 text-center'>
                                        See all courses
                                    </span>
                                </Link>
                            </div>
                        )
                    }
                </div >
            </section >
        </>
    )
}

export default Classes