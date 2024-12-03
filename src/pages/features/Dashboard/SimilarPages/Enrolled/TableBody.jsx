/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import ReactPagination from '../../../../../components/ReactPagination'
import EnrolledDetails from './EnrolledDetails'
import { Accordion } from '@/components/ui/accordion'

function TableBody({ filteredDetails }) {

    const [page, setPage] = useState(0);
    // this filteredData is for the pagination on page
    const [filteredData, setFilteredData] = useState();
    const n = 5

    useEffect(() => {
        setFilteredData(
            filteredDetails?.length > 0 && filteredDetails?.filter((user, index) => {
                return (index >= page * n) & (index < (page + 1) * n)
            })
        )
    }, [page, filteredDetails])

    return (
        <Accordion type="single" collapsible>
            {
                filteredData?.length > 0 ? (
                    filteredData?.length > 0 &&
                    filteredDetails
                        ?.flatMap(e =>
                            e?.courseDetails.map(c => ({
                                ...c,
                                createdAt: e.createdAt,
                                paymentDetails: e.paymentDetails,
                                shipping_options: e.shipping_options,
                                totalAmount: e.totalAmount,
                            }))
                        )
                        ?.map(details => <EnrolledDetails key={details?._id} details={details} />)
                ) : (
                    <p className='w-full text-center mt-20'>No details found! Check back later or reload page!</p>
                )
            }
            <ReactPagination data={filteredDetails} setPage={setPage} n={n} filteredData={filteredData} />
        </Accordion>
    )
}

export default TableBody