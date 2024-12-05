import Header from '../partials/Header/Header'
import Subscribe from '../Subscribe/Subscribe'
import Footer from '../partials/Footer/Footer'
import SkeletonLoader2 from '../SkeletonLoaders/SkeletonLoader2'
import { useParams } from 'react-router-dom'
import Class from '../HomeAllClasses/Class'
import useClassActions from '../../hooks/useClassActions'
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'


function OtherUploadedCoursesByUser() {

    const { userId } = useParams();
    const axiosPrivate = useAxiosPrivate()
    const { handleBookClass, handleUnBookClass } = useClassActions()

    const { isLoading, data: instructorUploadedCourse } = useQuery({
        queryKey: ['instructorUploadedCourse', userId],
        queryFn: () =>
            axiosPrivate.get(`/public/instructor/${userId}/all-classes`).then((res) => {
                return res?.data
            }),
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
                                instructorUploadedCourse?.length > 0 && !isLoading ? (
                                    instructorUploadedCourse.map(course => {
                                        // Note this class component is from homeAllClasses
                                        return (
                                            <Class key={course._id} course={course} handleBookClass={handleBookClass} handleUnBookClass={handleUnBookClass} />
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

export default OtherUploadedCoursesByUser