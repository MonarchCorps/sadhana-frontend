/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import Course from './Course'
import Loading2 from '../../../../../components/Loaders/Loading2'
import ReactPagination from '../../../../../components/ReactPagination'

function TableBody({ filteredCourses: allCourses, handleCheckedState, deleteCourse, setCoursesToDelete, coursesToDelete, handleApproval, isLoading }) {

    const [page, setPage] = useState(0);
    // this filteredData is for the pagination on page
    const [filteredData, setFilteredData] = useState();
    const n = 5

    useEffect(() => {
        setFilteredData(
            allCourses?.length > 0 && allCourses.filter((user, index) => {
                return (index >= page * n) & (index < (page + 1) * n)
            })
        )
    }, [page, allCourses])

    return (
        <div>
            <Loading2 data={'courses'} isLoading={isLoading} />
            {
                !isLoading && filteredData && filteredData.length > 0 ? (
                    filteredData.map(course => {
                        return (
                            <Course key={course?._id} course={course} handleCheckedState={handleCheckedState} deleteCourse={deleteCourse} setCoursesToDelete={setCoursesToDelete} coursesToDelete={coursesToDelete} handleApproval={handleApproval} />
                        )
                    })
                ) : !isLoading && (
                    <p className='w-full text-center mt-20'>No courses found! Check back later or reload page!</p>
                )
            }
            <ReactPagination data={allCourses} setPage={setPage} n={n} isLoading={isLoading} filteredData={filteredData} />
        </div>
    )
}

export default TableBody