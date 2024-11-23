import { FaArrowDown } from 'react-icons/fa'

function TableHead() {
    return (
        <div className='grid grid-cols-[auto_1fr_0.53fr_0.3fr_0.3fr_50px] items-center w-full bg-[#f2f2f26d] px-6 py-[0.9rem] rounded-xl mb-5'>
            <div>
                <div className='w-5 h-5 rounded-md border border-solid border-[#8b8888] align-text-bottom'></div>
            </div>
            <p className='text-start'>
                <span className='font-300 text-base ml-3 tracking-tight align-text-top -mb-1'>User name</span>
            </p>
            <p className='text-start'>
                <span className='font-300 text-base tracking-tight align-text-top -mb-1'>Access</span>
            </p>
            <p className='grid grid-flow-col items-center justify-end'>
                <span className='font-300 text-base tracking-tight text-end -mb-1 mr-3'>Last active</span>
                <FaArrowDown className='-mb-1 text-[#222121] ' />
            </p>
            <p className='text-end'>
                <span className='font-300 text-base tracking-tight align-text-top -mb-1'>Date Added</span>
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