import { useParams } from 'react-router-dom'
import Header from '../partials/Header/Header'
import Subscribe from '../Subscribe/Subscribe'
import Footer from '../partials/Footer/Footer'
import LeftHomeClassDetails from './LeftHomeClassDetails'
import RightHomeClassDetails from './RightHomeClassDetails'
import SkeletonLoader2 from '../SkeletonLoaders/SkeletonLoader2'
import { useQuery } from '@tanstack/react-query'
import axios from '../../api/axios'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'

function HomeClassDetails() {

    const { id } = useParams();

    const { isLoading, data: classes } = useQuery({
        queryKey: ['homeAllCourses'],
        queryFn: () =>
            axios.get('/public/class').then((res) => {
                return res?.data
            }),
    })
    const course = classes?.filter(course => course._id === id);

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
                    {
                        isLoading && (
                            <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 ixsm:gap-4 gap-3 mt-4'>
                                <SkeletonLoader2 value={noOfSkeletons()} />
                            </div>
                        )
                    }
                    {
                        !isLoading && course.length > 0 ? (
                            <div className='py-28 px-10 grid grid-cols-[1fr_400px] lg:grid-cols-1 gap-10'>
                                <LeftHomeClassDetails course={course} />
                                <RightHomeClassDetails course={course} />
                            </div>
                        ) : !isLoading && (
                            <div className='py-28 px-10'>
                                <p className='text-center '>Course detail unavailable at the moment. Check back later or reload the page!</p>
                            </div>
                        )
                    }

                </section>
            </main>
            <Subscribe />
            <Footer />
        </>
    )
}

export default HomeClassDetails
