/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import Course from './Course'
import Loading2 from '../../../../../components/Loaders/Loading2'
import ReactPagination from '../../../../../components/ReactPagination'
import { Accordion } from '@/components/ui/accordion';

function TableBody({ filteredCourses: pendingCourses, handleApproval, isLoading }) {

    const [page, setPage] = useState(0);
    const [filteredData, setFilteredData] = useState();
    const n = 5

    useEffect(() => {
        setFilteredData(
            pendingCourses && pendingCourses.length > 0 && pendingCourses.filter((user, index) => {
                return (index >= page * n) & (index < (page + 1) * n)
            })
        )
    }, [page, pendingCourses])

    return (
        <div>
            <Loading2 data={'pending courses'} isLoading={isLoading} />
            <Accordion type='single' collapsible>
                {
                    !isLoading && filteredData && filteredData.length > 0 ? (
                        filteredData.map((course, i) => {
                            return (
                                <Course key={`${course?._id}${i}`} course={course} handleApproval={handleApproval} index={i} />
                            )
                        })
                    ) : !isLoading && (
                        <p className='w-full text-center my-12 xsm:text-sm'>No pending applications found! Check back later or reload page!</p>
                    )
                }
            </Accordion>
            <ReactPagination data={pendingCourses} setPage={setPage} n={n} isLoading={isLoading} filteredData={filteredData} />
        </div>
    )
}

export default TableBody