function TableHead() {
    return (
        <div className='grid grid-cols-[1fr_0.6fr_0.3fr_0.3fr_0.3fr_0.3fr] items-center w-full bg-[#dee1dfc6] px-6 py-[0.9rem] rounded-xl mb-5'>
            <p className='text-start grid grid-flow-col w-fit'>
                <div className='w-5 h-5 rounded-md border border-solid border-[#8b8888] align-text-bottom'></div>
                <span className='font-300 text-base ml-3 tracking-tight align-text-top -mb-1'>Course name</span>
            </p>
            <p className='text-center ml-5'>
                <span className='font-300 text-base tracking-tight align-text-top'>Payment ID</span>
            </p>
            <p className='text-center'>
                <span className='font-300 text-base tracking-tight align-text-top'>Amount</span>
            </p>
            <p className='text-center -ml-2'>
                <span className='font-300 text-base tracking-tight align-text-top'>Type</span>
            </p>
            <p className='text-start '>
                <span className='font-300 text-base tracking-tight '>Status</span>
            </p>
            <p className='text-end'>
                <span className='font-300 text-base tracking-tight align-text-top'>Shipping. A</span>
            </p>
        </div>
    )
}

export default TableHead