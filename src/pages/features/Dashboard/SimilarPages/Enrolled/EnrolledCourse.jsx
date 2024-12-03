/* eslint-disable react/prop-types */
import Class from './Class'
import noDataImage from '../../../../../assets/images/17280568351339057725320967394372.jpg'
import SkeletonLoader2 from '../../../../../components/SkeletonLoaders/SkeletonLoader2'
import ReactPagination from '../../../../../components/ReactPagination'
import { useEffect, useState } from 'react'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'

function EnrolledCourse({ enrolledCourse, isLoading }) {

    const { screenWidth } = useGetScreenWidth()

    const [page, setPage] = useState(0);
    // this filteredData is for the pagination on page
    const [filteredData, setFilteredData] = useState([]);
    // const [totalAmount, setTotalAmount] = useState()
    const n = 2

    useEffect(() => {
        setFilteredData(
            enrolledCourse?.length > 0 && enrolledCourse.filter((course, index) => {
                return (index >= page * n) & (index < (page + 1) * n)
            })
        ) || []
    }, [page, enrolledCourse])

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
        <div className="grid grid-flow-row gap-2 hrmd:gap-6">
            {
                isLoading &&
                <div className='grid grid-cols-4 ilg:grid-cols-3 imd:grid-cols-2 ixsm:grid-cols-1 ixsm:gap-4 gap-3 max-w-[96%] mx-auto mt-4'>
                    <SkeletonLoader2 value={noOfSkeletons()} />
                </div>
            }
            {
                !isLoading && filteredData && filteredData?.length !== 0 ? (
                    // Flatten the courseDetails to one array and map through the array
                    filteredData?.flatMap(data => {
                        return (data.courseDetails)
                    }).map(course => {
                        return (
                            <Class key={course?._id} course={course} />
                        )
                    })
                ) : !isLoading && filteredData?.length === 0 && (
                    <div className='flex flex-col items-center pt-16'>
                        <img src={noDataImage} alt="No details available" className='w-3/4 object-cover h-3/4' />
                        <p className='p-10'>No enrolled course check back later or reload page!</p>
                    </div>
                )
            }
            <ReactPagination data={enrolledCourse} setPage={setPage} n={n} isLoading={isLoading} filteredData={filteredData} />
        </div>
    )
}

export default EnrolledCourse