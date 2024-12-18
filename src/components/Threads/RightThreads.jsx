import { motion } from "motion/react"
import yogaWomanInYellow from '../../assets/images/in-yellow-sportive-clothes-woman-doing-yoga-indoors.jpg'
import yogaTookta from '../../assets/images/yoga-tookta.jpg'

function RightThreads() {
    return (
        <div className='relative amd:max-w-[30rem]'>
            <div className='overflow-hidden rounded-xl shadow-xl p-5 w-[19.5rem] h-[14rem] sm:w-[14.5rem] sm:h-[11rem] bg-[#ffffff] absolute z-10 -bottom-12 -left-16 ism:-left-10'>
                <motion.img
                    initial={{ y: "14vh", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    src={yogaWomanInYellow}
                    alt="Yoga woman in yellow"
                    className='w-[19.5rem] sm:w-[14.5rem] rounded-xl'
                />
            </div>
            <div className='overflow-hidden rounded-xl p-6 bg-transparent backdrop-blur-md border border-solid border-[#acacac] h-[23.8rem] sm:h-[19rem]'>
                <motion.img
                    initial={{ y: "-10vh", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    src={yogaTookta}
                    alt=""
                    className='h-[20.8rem] w-full sm:h-[16rem] object-cover rounded-xl'
                />
            </div>
            <motion.div
                initial={{ x: "4vw", opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className='w-[13rem] h-[13rem] sm:w-[10rem] sm:h-[10rem] bg-[#e57595] rounded-2xl absolute -top-10 -right-9 -z-10 ism:-right-6'
            />
        </div>
    )
}

export default RightThreads