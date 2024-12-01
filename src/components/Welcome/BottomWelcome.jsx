import peopleLovingYoga from '../../assets/images/people-doing-yoga.jpg'
import { FaQuoteRight } from 'react-icons/fa'

function BottomWelcome() {
    return (
        <div className='grid grid-cols-2 hrmd:flex hrmd:flex-col-reverse  mt-10 gap-14 items-center'>
            <div className='border border-solid border-[#dfdfdf] p-4 rounded-xl'>
                <img src={peopleLovingYoga} alt="People loving yoga image" className='w-full' />
            </div>
            <div>
                <div className='border-y-[#d5d3d3] border-solid border border-x-0 flex py-7 gap-7 mb-6'>
                    <span className="text-5xl text-[#edcba9]">
                        <FaQuoteRight />
                    </span>
                    <h1 className='text-[1.18rem] text-[#3a3939] tracking-[0.13px] font-400'>
                        Pellentesque magna facilisis elit facilisi purus inceptos ut potenti aliquam ex lectus. Pretium hendrerit nostra commodo dignissim est nam leo torquent finibus ut.
                    </h1>
                </div>
                <p className='text-base text-[#3a3939] font-400 mb-8'>
                    Suscipit eleifend quam odio arcu duis habitant placerat. Praesent odio hendrerit semper id ut vitae aliquet dictum velit. Sociosqu nostra consequat ipsum facilisi dictumst dolor ad id mi.
                </p>
                <div>
                    <p className='font-cuba'>
                        Monarch Corps
                    </p>
                    <p className='mt-2 font-700'>
                        Monarch Corps
                    </p>
                    <p className='font-300 opacity-70'>
                        Yoga Trainer
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BottomWelcome