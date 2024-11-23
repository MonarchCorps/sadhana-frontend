/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import User from './User'
import Loading2 from '../../../../../components/Loaders/Loading2'
import ReactPagination from '../../../../../components/ReactPagination'

function TableBody({ filteredUsers: allUsers, handleCheckedState, deleteUser, setUsersToDelete, usersToDelete, isLoading }) {
    const [page, setPage] = useState(0);

    // this filteredData is for the pagination on page
    const [filteredData, setFilteredData] = useState();
    const n = 5

    useEffect(() => {
        setFilteredData(
            allUsers?.length > 0 && allUsers?.filter((user, index) => {
                return (index >= page * n) & (index < (page + 1) * n)
            })
        )
    }, [page, allUsers])

    return (
        <div>
            <Loading2 data={'users'} isLoading={isLoading} />
            {
                !isLoading && filteredData && filteredData?.length > 0 ? (
                    filteredData.map(user => {
                        return (
                            <User key={user?._id} user={user} handleCheckedState={handleCheckedState} deleteUser={deleteUser} setUsersToDelete={setUsersToDelete} usersToDelete={usersToDelete} />
                        )
                    })
                ) : !isLoading && (
                    <p className='w-full text-center mt-20'>No users found! Check back later or reload page!</p>
                )
            }
            <ReactPagination data={allUsers} setPage={setPage} n={n} isLoading={isLoading} filteredData={filteredData} />
        </div>
    )
}

export default TableBody