function TableHead() {
    return (
        <div className='grid grid-cols-12 items-center w-full bg-[#dee1dfc6] px-6 py-[0.9rem] ilg:grid-cols-9 amd:grid-cols-7 ixsm:grid-cols-1 rounded-xl mb-5'>
            <p className='hidden ixsm:block text-center col-span-3 '>
                <span className='font-300 text-base tracking-tight align-text-top amd:text-sm'>Payment details</span>
            </p>
            <p className='ixsm:hidden text-start grid grid-flow-col w-fit col-span-5 amd:col-span-4'>
                <div className='w-5 h-5 rounded-md border border-solid border-[#8b8888] align-text-bottom'></div>
                <span className='font-300 text-base ml-3 tracking-tight align-text-top -mb-1 amd:text-sm'>Course name</span>
            </p>
            <p className='ixsm:hidden text-center col-span-3 ilg:hidden'>
                <span className='font-300 text-base tracking-tight align-text-top amd:text-sm'>Payment ID</span>
            </p>
            <p className='ixsm:hidden text-center'>
                <span className='font-300 text-base tracking-tight align-text-top amd:text-sm'>Amount</span>
            </p>
            <p className='ixsm:hidden text-center'>
                <span className='font-300 text-base tracking-tight align-text-top amd:text-sm'>Type</span>
            </p>
            <p className='ixsm:hidden text-center'>
                <span className='font-300 text-base tracking-tight amd:text-sm'>Status</span>
            </p>
            <p className='ixsm:hidden text-center'>
                <span className='font-300 text-base tracking-tight align-text-top amd:hidden amd:text-sm'>Ship. A</span>
            </p>
        </div>
    )
}

export default TableHead