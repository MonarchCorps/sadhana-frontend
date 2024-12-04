function TableHead() {
    return (
        <div className='grid grid-cols-12 eumd:grid-cols-10 hrmd2:grid-cols-9 items-center w-full bg-[#f2f2f26d] px-6 py-[0.9rem] rounded-xl mb-5'>
            <div className='text-start flex items-center col-span-5 eumd:col-span-4 md:col-span-full'>
                <div className='w-5 h-5 rounded-md border border-solid border-[#8b8888] align-text-bottom md:border-2 md:border-[#bab7b7]'></div>
                <span className='text-base ml-3 tracking-tight align-text-top font-500 hidden md:block'>User Details</span>
                <span className='font-300 text-base ml-3 tracking-tight align-text-top md:hidden'>User name</span>
            </div>
            <p className='text-start col-span-4 eumd:text-center md:hidden'>
                <span className='font-300 text-base tracking-tight align-text-top'>Access</span>
            </p>
            <p className='text-center'>
                <span className='font-300 text-base tracking-tight hrmd2:hidden'>Online</span>
            </p>
            <p className='text-end ml-4 eumd:hidden'>
                <span className='font-300 text-base tracking-tight align-text-top'>Registered</span>
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