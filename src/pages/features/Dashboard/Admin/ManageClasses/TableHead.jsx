function TableHead() {
    return (
        <div className='grid grid-cols-[repeat(9,minmax(0,1fr)),50px] cmd:grid-cols-[repeat(8,minmax(0,1fr)),50px] imd:grid-cols-[repeat(7,minmax(0,1fr)),50px] cimd:grid-cols-[repeat(6,minmax(0,1fr)),50px] sm:grid-cols-1 items-center w-full bg-[#f2f2f26d] px-6 py-[0.9rem] rounded-xl mb-5'>
            <div className='text-start col-span-4 flex sm:col-span-full'>
                <div className='w-5 h-5 rounded-md border border-solid border-[#8b8888] align-text-bottom'></div>
                <span className='font-300 text-base ml-3 tracking-tight sm:text-sm sm:font-400 sm:hidden'>Class name</span>
                <span className='font-300 text-base ml-3 tracking-tight  sm:text-sm sm:font-600 hidden sm:block'>Course Details</span>
            </div>
            <p className='text-center cimd:hidden'>
                <span className='font-300 text-base tracking-tight'>Status</span>
            </p>
            <p className='text-center sm:hidden'>
                <span className='font-300 text-base tracking-tight sm:text-sm sm:font-400'>Total seats</span>
            </p>
            <p className='text-center sm:hidden'>
                <span className='font-300 text-base tracking-tight sm:text-sm sm:font-400'>Price</span>
            </p>
            <p className='text-center cmd:hidden'>
                <span className='font-300 text-base tracking-tight'>D. Applied</span>
            </p>
            <p className='text-end imd:hidden'>
                <span className='font-300 text-base tracking-tight'>D. Approved</span>
            </p>
            <p>
                <span>
                    <span></span>
                </span>
            </p>
        </div>
    )
}

export default TableHead