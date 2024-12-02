import Header from '../partials/Header/Header'
import Footer from '../partials/Footer/Footer'
import Subscribe from '../Subscribe/Subscribe'
import SkeletonLoader2 from '../SkeletonLoaders/SkeletonLoader2'
import { useQuery } from '@tanstack/react-query'
import axios from '../../api/axios'

import Instructor from './Instructor'

function HomeAllInstructors() {

    const { isLoading, data: instructors } = useQuery({
        queryKey: ['homeAllInstructors'],
        queryFn: () =>
            axios.get('/public/instructor').then((res) => {
                return res?.data
            }
            ),
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
                        <div className='max-w-[96%] mx-auto grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 gap-7'>
                            {
                                instructors?.length > 0 && !isLoading ? (
                                    instructors.map(instructor => {
                                        return (
                                            <Instructor key={instructor._id} instructor={instructor} />
                                        )
                                    })
                                ) : (

                                    !isLoading && (
                                        <p className='text-center w-full col-span-4'>No instructor available for now! Check back later or reload page!</p>
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

export default HomeAllInstructors