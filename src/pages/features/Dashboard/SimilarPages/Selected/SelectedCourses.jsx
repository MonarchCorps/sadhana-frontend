/* eslint-disable react/prop-types */
import SkeletonLoader2 from '../../../../../components/SkeletonLoaders/SkeletonLoader2'
import ReactPagination from '../../../../../components/ReactPagination'
import { useEffect, useState } from 'react'
import Loading from '../../../../../components/Loaders/Loading'
import useClassActions from '@/hooks/useClassActions'
import PartClasses from '@/components/Classes/PartClasses'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'
import NoData from '@/components/NoData'

function SelectedCourses({ selectedCourses, isLoading }) {

    const { handleUnBookClass } = useClassActions()
    const { screenWidth } = useGetScreenWidth()

    const [page, setPage] = useState(0);

    const [filteredData, setFilteredData] = useState([]);
    const n = 2

    useEffect(() => {
        setFilteredData(
            selectedCourses?.length > 0 && selectedCourses?.filter((course, index) => {
                return (index >= page * n) & (index < (page + 1) * n)
            }) || []
        )
    }, [page, selectedCourses])

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
        <div className="grid grid-flow-row gap-2">
            <Loading isLoading={isLoading} />
            {
                isLoading &&
                <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 ixsm:gap-4 gap-3 max-w-[96%] mx-auto mt-4'>
                    <SkeletonLoader2 value={noOfSkeletons()} />
                </div>
            }
            {
                !isLoading && filteredData && filteredData?.length !== 0 ? (
                    filteredData.map(course => {
                        return (
                            // <Class key={course._id} course={course} handleUnBookClass={handleUnBookClass} />
                            <PartClasses key={course?._id} course={course} handleUnBookClass={handleUnBookClass} />
                        )
                    })
                ) : !isLoading && filteredData?.length === 0 && (
                    <NoData>
                        <span>No details available at the moment. Check back later or reload page!</span>
                    </NoData>
                )
            }
            <ReactPagination data={selectedCourses} setPage={setPage} n={n} isLoading={isLoading} filteredData={filteredData} />
        </div>
    )
}

export default SelectedCourses