import Header from '../partials/Header/Header'
import Subscribe from '../Subscribe/Subscribe'
import Footer from '../partials/Footer/Footer'

import Class from './Class'
import SkeletonLoader2 from '../SkeletonLoaders/SkeletonLoader2'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useClassActions from '../../hooks/useClassActions'
import axios from '../../api/axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useAuth from '@/hooks/useAuth'

function HomeAllClasses() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const { isLoading, data: classes } = useQuery({
        queryKey: ['homePageClasses'],
        queryFn: () =>
            axios.get('/public/class').then((res) => {
                return res?.data
            }
            ),
    })

    const { data: enrolledCourses } = useQuery({
        queryKey: ['enrolledDetails'],
        queryFn: () =>
            axiosPrivate.get(`/enrolled/${auth?._id}`).then(res => {
                return res?.data
            })
    })

    const { handleBookClass, handleUnBookClass } = useClassActions();
    const [filteredCourse, setFilteredCourse] = useState([]);

    useEffect(() => {
        if (classes) {
            setFilteredCourse(classes.filter(course => course?.status === 'approved'));
        }
    }, [classes]);

    return (
        <>
            <Header />
            <main>
                <section>
                    <div className='py-28 px-10'>
                        {
                            !!isLoading && (
                                <div className='max-w-[96%] mx-auto grid grid-cols-4 gap-10'>
                                    <SkeletonLoader2 value={4} />
                                </div>
                            )
                        }
                        <div className='max-w-[96%] mx-auto grid grid-cols-4 gap-7'>
                            {
                                filteredCourse?.length > 0 && !isLoading ? (
                                    filteredCourse.map(course => {
                                        return (
                                            <Class key={course._id} course={course} handleBookClass={handleBookClass} handleUnBookClass={handleUnBookClass} enrolledCourses={enrolledCourses} />
                                        )
                                    })
                                ) : (

                                    !isLoading && (
                                        <p className='text-center w-full col-span-4'>No courses available for now! Check back later or reload page!</p>
                                    )
                                )
                            }
                        </div>
                    </div>
                </section>
            </main>
            <Subscribe />
            <Footer />
        </>
    )
}

export default HomeAllClasses