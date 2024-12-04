import { useOutletContext } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'

import ReactPagination from '../../../../components/ReactPagination'
import Class from './Class'

import noDataImage from '../../../../assets/images/17280568351339057725320967394372.jpg'
import Loading from '../../../../components/Loaders/Loading'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'
import SkeletonLoader2 from '@/components/SkeletonLoaders/SkeletonLoader2'

function MyClass() {

    const { classes, isLoading, isFetching } = useOutletContext();

    const [page, setPage] = useState(0);

    const [filteredData, setFilteredData] = useState();
    const n = 3

    useEffect(() => {
        setFilteredData(
            classes?.length > 0 && classes.filter((course, index) => {
                return (index >= page * n) & (index < (page + 1) * n)
            })
        )
    }, [page, classes])

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
        <Fragment>
            <Loading isLoading={!isLoading && isFetching} />
            <section className='w-screen'>
                <div className="max-w-[66rem] imd:max-w-[90%] imd:px-5 ixsm:px-1 ixsm:max-w-[97%] mx-auto p-10 pb-0 h-full relative">
                    <div className="mb-10 text-center">
                        <h1 className='text-[2.3rem] ixsm:text-2xl mb-2 font-500 font-sans text-center'>
                            My <span className="text-[#27554a]">Courses</span>
                        </h1>
                        <p className="text-base esm:text-sm ixsm:text-xs">Here you can see how many classes you currently have</p>
                        <p className="text-sm">{`${classes?.length || 0} class(es)`}</p>
                    </div>
                    {isLoading && (
                        <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 gap-2'>
                            <SkeletonLoader2 value={noOfSkeletons()} />
                        </div>)}
                    {!isLoading && filteredData?.length > 0 ? (
                        <div className="grid grid-flow-row gap-2 hrmd:gap-5">
                            {filteredData.map(course => {
                                return (
                                    <Class key={course._id} course={course} />
                                )
                            })}
                        </div>
                    ) : !isLoading && filteredData?.length === 0 && (
                        <div className='flex flex-col items-center pt-16'>
                            <img src={noDataImage} alt="No details available" className='w-3/4 object-cover h-3/4' />
                            <p className='p-10'>No course check back later or reload page!</p>
                        </div>
                    )}
                    <ReactPagination data={classes} setPage={setPage} n={n} isLoading={isLoading} filteredData={filteredData} />
                </div>
            </section>
        </Fragment>
    )
}

export default MyClass