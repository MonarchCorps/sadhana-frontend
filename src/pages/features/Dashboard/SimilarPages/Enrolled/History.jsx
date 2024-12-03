/* eslint-disable react/prop-types */
import { format } from 'date-fns'
import { MdPayment } from 'react-icons/md'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import trim from '@/utils/trim'

function History({ enrolledCourse }) {

    const flattenDetails = enrolledCourse?.map(e => {
        const cd = e?.courseDetails.map(c => {
            return { ...c, createdAt: e.createdAt }
        })
        return cd
    })?.flatMap(details => details)

    return (
        <Card className='w-1/2 imd:w-full imd:max-w-[30rem]'>
            <CardHeader className='pb-2'>
                <CardTitle>
                    <h1 className="font-500 font-sans text-xl">History</h1>
                </CardTitle>
                <CardDescription><h3 className="text-[0.7rem] text-[#008000] mt-2">First three history will be displayed</h3></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
                <div className='overflow-scroll max-h-[18.5rem]'>
                    {
                        flattenDetails.slice(0, 3).map((course, i) => {
                            return (
                                <div key={i} className='mt-3 flex gap-6 xsm:gap-5 items-center'>
                                    <div className='bg-[#226c30] w-fit p-3 rounded xsm:p-2'>
                                        <span className='text-slate-50 text-3xl xsm:text-2xl'><MdPayment /></span>
                                    </div>
                                    <div>
                                        <span className='text-sm font-500 opacity-65'>Enrolled for </span>
                                        <span className='font-600 text-sm'>{trim(course?.classname, 30)}</span>
                                        <div className='ml-5'>
                                            <span className='font-600 text-sm'>Price: </span>
                                            <span className='text-sm'>{`NGN ${course?.paidPrice.toLocaleString()}`}</span>
                                        </div>
                                        <span className='text-sm font-500'>{format(course?.createdAt, 'MMM, dd yyyy pp')} </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div >
            </CardContent>
        </Card>
    )
}

export default History