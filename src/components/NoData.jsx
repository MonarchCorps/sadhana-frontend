/* eslint-disable react/prop-types */
import noDataImage from '../assets/images/17280568351339057725320967394372.jpg'

function NoData({ children }) {
    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <img src={noDataImage} alt="No details available" className='w-full max-w-[40rem]' />
            <p className='p-10 text-center msm:text-sm asm:text-xs/relaxed'>
                {children}
            </p>
        </div>
    )
}

export default NoData