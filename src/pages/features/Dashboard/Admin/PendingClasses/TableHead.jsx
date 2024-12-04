function TableHead() {
    return (
        <div className='grid grid-cols-12 pmd:grid-cols-9 md:grid-cols-5 ixsm:grid-cols-1 items-center w-full bg-[#f2f2f26d] px-6 py-[0.9rem] rounded-xl mb-5'>
            <div className='flex text-start col-span-5 pmd:col-span-4'>
                <div className='w-5 h-5 rounded-md border border-solid border-[#8b8888] align-text-bottom md:border-2 md:border-[#bab7b7]'></div>
                <span className='text-base ml-3 tracking-tight align-text-top font-500 hidden md:block'>Course Details</span>
                <span className='font-300 text-base ml-3 tracking-tight align-text-top md:hidden'>Course name</span>
            </div>
            <p className='text-start md:text-end md:mr-8 ixsm:hidden'>
                <span className='font-300 text-base tracking-tight align-text-top'>Status</span>
            </p>
            <p className="text-center col-span-2 pmd:hidden">
                <span className='font-300 text-base tracking-tight align-text-top'>Date applied</span>
            </p>
            <p className="text-center col-span-4 md:hidden">
                <span className='font-300 text-base tracking-tight align-text-top'>
                    Details
                </span>
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