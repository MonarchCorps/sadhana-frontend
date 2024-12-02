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
import useGetScreenWidth from '@/hooks/useGetScreenWidth'

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

    const { screenWidth } = useGetScreenWidth()

    const noOfSkeletons = () => {
        if (screenWidth <= 473) {
            return 2
        } else if (screenWidth <= 852) {
            return 2
        } else if (screenWidth <= 1199) {
            return 3
        } else {
            return 4
        }
    }

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
                            isLoading && (
                                <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 gap-2'>
                                    <SkeletonLoader2 value={noOfSkeletons()} />
                                </div>
                            )
                        }
                        <div className='grid grid-cols-4 ilg:grid-cols-3 ilg:gap-4 imd:grid-cols-2 ixsm:grid-cols-1 gap-5'>
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