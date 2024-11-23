import { useParams } from 'react-router-dom'
import Header from '../partials/Header/Header'
import Subscribe from '../Subscribe/Subscribe'
import Footer from '../partials/Footer/Footer'
import LeftHomeClassDetails from './LeftHomeClassDetails'
import RightHomeClassDetails from './RightHomeClassDetails'
import SkeletonLoader3 from '../SkeletonLoaders/SkeletonLoader3'
import SkeletonLoader2 from '../SkeletonLoaders/SkeletonLoader2'
import { useQuery } from '@tanstack/react-query'
import axios from '../../api/axios'

function HomeClassDetails() {

    const { id } = useParams();

    const { isLoading, data: classes } = useQuery({
        queryKey: ['homePageClasses'],
        queryFn: () =>
            axios.get('/public/class').then((res) => {
                return res?.data
            }),
    })
    const course = classes?.filter(course => course._id === id);

    return (
        <>
            <Header />
            <main>
                <section>
                    {
                        isLoading && (
                            <div className='py-28 px-10 grid grid-cols-[1fr_400px] gap-20'>
                                <div>
                                    <SkeletonLoader3 value={4} />
                                </div>
                                <div>
                                    <SkeletonLoader2 value={2} />
                                </div>
                            </div>
                        )
                    }
                    {
                        !isLoading && course.length > 0 ? (
                            <div className='py-28 px-10 grid grid-cols-[1fr_400px] gap-10'>
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
