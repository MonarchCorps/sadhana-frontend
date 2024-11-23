/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import User from './User'
import Loading2 from '../../../../../components/Loaders/Loading2'
import ReactPagination from '../../../../../components/ReactPagination'

function TableBody({ filteredUsers: pendingInstructors, handleApproval, isLoading }) {

    const [page, setPage] = useState(0);
    const [filteredData, setFilteredData] = useState();
    const n = 5

    useEffect(() => {
        setFilteredData(
            pendingInstructors?.length > 0 && pendingInstructors.filter((user, index) => {
                return (index >= page * n) & (index < (page + 1) * n)
            })
        )
    }, [page, pendingInstructors])

    return (
        <div>
            <Loading2 data={'pending applications'} isLoading={isLoading} />
            {
                !isLoading && filteredData && filteredData?.length > 0 ? (
                    filteredData.map((user, i) => {
                        return (
                            <User key={user?._id} user={user} handleApproval={handleApproval} index={i} />
                        )
                    })
                ) : !isLoading && (
                    <p className='w-full text-center mt-16 my-6 mb-6'>No pending applications found! Check back later or reload page!</p>
                )
            }
            <ReactPagination data={pendingInstructors} setPage={setPage} n={n} isLoading={isLoading} filteredData={filteredData} />
        </div>
    )
}

export default TableBody