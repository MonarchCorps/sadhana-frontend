/* eslint-disable react/prop-types */
import Class from '../Class'
import noDataImage from '../../../../../assets/images/17280568351339057725320967394372.jpg'
import SkeletonLoader2 from '../../../../../components/SkeletonLoaders/SkeletonLoader2'
import ReactPagination from '../../../../../components/ReactPagination'
import { useEffect, useState } from 'react'
import Loading from '../../../../../components/Loaders/Loading'
import toast from 'react-hot-toast'

function SelectedCourses({ selectedCourses, isLoading, isFetching, isFetched, handleUnBookClass }) {

    const [page, setPage] = useState(0);
    // this filteredData is for the pagination on page
    const [filteredData, setFilteredData] = useState();
    const n = 3

    useEffect(() => {
        setFilteredData(
            selectedCourses?.length > 0 && selectedCourses?.filter((course, index) => {
                return (index >= page * n) & (index < (page + 1) * n)
            })
        )
    }, [page, selectedCourses])

    useEffect(() => {
        if (isFetched) {
            toast.success('Fetched successfully')
        }
    }, [isFetched])

    return (
        <div className="grid grid-flow-row gap-2">
            <Loading isLoading={isFetching} text='refetching class' />
            {
                isLoading &&
                <div className='grid grid-cols-4 gap-3'>
                    <SkeletonLoader2 value={4} />
                </div>
            }

            {
                !isLoading && filteredData && filteredData?.length !== 0 ? (
                    filteredData.map(course => {
                        return (
                            <Class key={course._id} course={course} handleUnBookClass={handleUnBookClass} />
                        )
                    })
                ) : !isLoading && (
                    <div className='flex flex-col items-center pt-16'>
                        <img src={noDataImage} alt="No details available" className='w-3/4 object-cover h-3/4' />
                        <p className='p-10'>No selected course check back later or reload page!</p>
                    </div>
                )
            }
            <ReactPagination data={selectedCourses} setPage={setPage} n={n} isLoading={isLoading} filteredData={filteredData} />
        </div>
    )
}

export default SelectedCourses