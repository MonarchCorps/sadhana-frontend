function TableHead() {
    return (
        <div className='grid grid-cols-[auto_0.7fr_0.3fr_0.3fr_0.6fr_50px] items-center w-full bg-[#f2f2f26d] px-6 py-[0.9rem] rounded-xl mb-5'>
            <div>
                <div className='w-5 h-5 rounded-md border border-solid border-[#8b8888] align-text-bottom'></div>
            </div>
            <p className='text-start'>
                <span className='font-300 text-base ml-3 tracking-tight align-text-top -mb-1'>User name</span>
            </p>
            <p className='text-center -ml-4'>
                <span className='font-300 text-base tracking-tight align-text-top -mb-1'>Status</span>
            </p>
            <p className="text-center">
                <span className='font-300 text-base tracking-tight align-text-top -mb-1'>Date applied</span>
            </p>
            <p className="text-start ml-14">
                <span className='font-300 text-base tracking-tight align-text-top -mb-1'>
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