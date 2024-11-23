/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from 'react'
import ReactPagination from '../../../../../components/ReactPagination'
import EnrolledDetails from './EnrolledDetails'

function TableBody({ filteredDetails }) {

    const [page, setPage] = useState(0);
    // this filteredData is for the pagination on page
    const [filteredData, setFilteredData] = useState();
    const n = 5

    useEffect(() => {
        setFilteredData(
            filteredDetails.length > 0 && filteredDetails.filter((user, index) => {
                return (index >= page * n) & (index < (page + 1) * n)
            })
        )
    }, [page, filteredDetails])

    return (
        <Fragment>
            {
                filteredData && filteredData.length > 0 ? (
                    filteredData.map(details => {
                        return (
                            <EnrolledDetails key={details?._id} details={details} />
                        )
                    })
                ) : (
                    <p className='w-full text-center mt-20'>No details found! Check back later or reload page!</p>
                )
            }
            <ReactPagination data={filteredDetails} setPage={setPage} n={n} filteredData={filteredData} />
        </Fragment>
    )
}

export default TableBody