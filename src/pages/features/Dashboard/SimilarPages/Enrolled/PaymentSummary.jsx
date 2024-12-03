/* eslint-disable react/prop-types */
import useAuth from '../../../../../hooks/useAuth'
import getTotalPrice from '../../../../../utils/getTotalPrice'
import TableHead from './TableHead'
import TableBody from './TableBody'
import Overview from './Overview'

function PaymentSummary({ filteredDetails }) {

    const { auth } = useAuth()
    return (
        <div className='-mt-[4.5rem] px-3 esm:px-0'>
            <div className=" mt-6 rounded-sm bg-slate-50 p-4">
                <div className='flex gap-1 text-slate-950 text-xl md:text-base font-500 ixsm:text-sm xsm:flex-wrap'>
                    <span>Payments </span>
                    <h1 className='text-[#1b6540]'>#{(auth?._id)?.slice(0, 12)} </h1>
                    <span className='font-roboto'>for </span>
                    <span>NGN </span>
                    <h1 className='text-[#1b6540]'>{getTotalPrice(filteredDetails, 'totalAmount')}</h1>
                </div>
                <div className='px-3 py-3 esm:px-1'>
                    <TableHead />
                    <TableBody filteredDetails={filteredDetails} />
                </div>
            </div>
            <Overview enrolledDetails={filteredDetails} />
        </div>
    )
}

export default PaymentSummary