import yogaWomanInYellow from '../../assets/images/in-yellow-sportive-clothes-woman-doing-yoga-indoors.jpg'
import yogaTookta from '../../assets/images/yoga-tookta.jpg'

function RightThreads() {
    return (
        <div className='relative'>
            <div className='rounded-xl shadow-xl p-5  w-[19.5rem] h-[14rem] bg-[#ffffff] absolute z-10 -bottom-12 -left-16'>
                <img src={yogaWomanInYellow} alt="Yoga woman in yellow" className='w-[19.5rem] rounded-xl' />
            </div>
            <div className='rounded-xl p-6 bg-transparent backdrop-blur-md border border-solid border-[#acacac] w-[37rem] h-[25.8rem]'>
                <img src={yogaTookta} alt="" className='w-[37rem] rounded-xl' />
            </div>
            <div className='w-[13rem] h-[13rem] bg-[#e57595] rounded-2xl absolute -top-10 -right-9 -z-10'></div>
        </div>
    )
}

export default RightThreads