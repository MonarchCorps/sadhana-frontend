import peopleLovingYoga from '../../assets/images/people-doing-yoga.jpg'
import { FaQuoteRight } from 'react-icons/fa'
import { motion } from "motion/react"

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
                    <motion.h1
                        initial={{ y: "12vh", opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className='text-[1.18rem] text-[#3a3939] tracking-[0.13px] font-400'
                    >
                        This mindfulness practice encourages deep relaxation, providing an inner sense of peace that lasts beyond the session.
                    </motion.h1>
                </div>
                <p className='text-base text-[#3a3939] font-400 mb-8'>
                    Through breath control and mindful movements, yoga cultivates inner peace, grounding the mind and soothing the body. The practice encourages awareness and presence, promoting a calm, balanced state that supports mental clarity and emotional well-being.
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