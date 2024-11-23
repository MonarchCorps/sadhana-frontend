import { useOutletContext } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'

import ReactPagination from '../../../../components/ReactPagination'
import SkeletonLoader3 from '../../../../components/SkeletonLoaders/SkeletonLoader3'
import Class from './Class'

import noDataImage from '../../../../assets/images/17280568351339057725320967394372.jpg'
import Loading from '../../../../components/Loaders/Loading'

function PendingClass() {

    const { classes, isLoading, isFetching } = useOutletContext();
    const [pendingClass, setPendingClass] = useState([]);

    useEffect(() => {
        if (classes) {
            const filteredClass = classes?.filter(course => course.status === 'pending');
            setPendingClass(filteredClass);
        }
    }, [classes]);

    const [page, setPage] = useState(0);
    // this filteredData is for the pagination on page
    const [filteredData, setFilteredData] = useState();
    const n = 3

    useEffect(() => {
        setFilteredData(
            pendingClass?.length > 0 && pendingClass.filter((course, index) => {
                return (index >= page * n) & (index < (page + 1) * n)
            })
        )
    }, [page, pendingClass])


    return (
        <Fragment>
            <Loading isLoading={isFetching} text='refetching class' />
            <section>
                <div className="max-w-[66rem] mx-auto p-10">
                    <div className="mb-10 text-center">
                        <h1 className='text-[2.3rem] mb-2 font-500 font-sans text-center'>
                            Pending <span className="text-[#27554a]">Classes</span>
                        </h1>
                        <p className="text-base">Here you can see how many pending classes you currently have</p>
                        <p className="text-sm">{`${pendingClass?.length || 0} class(es)`}</p>
                    </div>
                    <div className="grid grid-flow-row gap-2">
                        {isLoading && <SkeletonLoader3 value={3} />}
                        {
                            !isLoading && filteredData && filteredData.length !== 0 ? (
                                filteredData.map(course => {
                                    return (
                                        <Class key={course._id} course={course} />
                                    )
                                })
                            ) : !isLoading && (
                                <div className='flex flex-col items-center pt-16'>
                                    <img src={noDataImage} alt="No details available" className='w-3/4 object-cover h-3/4' />
                                    <p className='p-10'>No course check back later or reload page!</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <ReactPagination data={pendingClass} setPage={setPage} n={n} isLoading={isLoading} filteredData={filteredData} />
            </section>
        </Fragment>
    )
}

export default PendingClass