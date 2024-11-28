import Header from '../partials/Header/Header'
import Subscribe from '../Subscribe/Subscribe'
import Footer from '../partials/Footer/Footer'
import SkeletonLoader2 from '../SkeletonLoaders/SkeletonLoader2'
import { useParams } from 'react-router-dom'
import Class from '../HomeAllClasses/Class'
import useClassActions from '../../hooks/useClassActions'
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'


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

    return (
        <>
            <Header />
            <main>
                <section>
                    <div className='py-28 px-10'>
                        {
                            isLoading &&
                            <div className='max-w-[96%] mx-auto grid grid-cols-4 gap-10'>
                                <SkeletonLoader2 value={4} />
                            </div>
                        }
                        <div className='max-w-[96%] mx-auto grid grid-cols-4 gap-7'>
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