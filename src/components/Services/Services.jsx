import bgOrnament from '../../assets/images/bg-ornament.png'
import ServicesCard from './ServicesCard'
import { motion } from "motion/react"

function Services() {
    return (
        <section className='relative service-bg' id='services'>
            <div className='absolute top-14 left-1/2 -translate-x-1/2 sm:left-[-30rem] z-20 opacity-75'>
                <img src={bgOrnament} alt='logo' className='select-none' />
            </div>
            <div className='max-w-[98%] mx-auto text-center pt-20 px-10 pb-10 z-30 relative'>
                <motion.h3
                    initial={{ y: "12vh", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.84, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className='font-crimson text-[26px] mb-4 tracking-wide'
                >
                    Our Services
                </motion.h3>
                <motion.h1
                    initial={{ y: "15vh", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.84, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className='text-[2.8rem] leading-[1.18] font-500 font-sans mb-6 sm:text-3xl'
                >
                    Discover yourself, discover yoga
                </motion.h1>
                <motion.div
                    initial={{ y: "16.5vh", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.84, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className='text-center w-full flex'
                >
                    <p className='text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-6 max-w-prose mx-auto'>
                        Yoga invites self-discovery, helping you connect with your body and mind, fostering inner peace, clarity, and personal growth.                    </p>
                </motion.div>
                <ServicesCard />
            </div>
        </section>
    )
}

export default Services