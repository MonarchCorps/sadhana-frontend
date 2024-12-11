import { motion } from "motion/react"

function LeftThreads() {
    return (
        <div className="relative">
            <motion.h3
                initial={{ x: "-30vw", opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
                className="font-crimson text-[26px] mb-4 tracking-wide md:text-xl sm:text-base"
            >
                Join Us
            </motion.h3>
            <motion.h1
                initial={{ y: "12vh", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-[2.4rem] leading-[1.18] font-500 font-sans mb-6 md:text-3xl sm:text-2xl"
            >
                Let the threads of life get connected with yoga
            </motion.h1>
            <motion.p
                initial={{ x: "30vw", opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-6 md:text-base sm:text-sm sm:leading-[1.72]"
            >
                At posuere potenti montes ligula risus. Metus suspendisse ornare senectus taciti molestie dis arcu duis. Fusce mus sit eget nibh curae id montes finibus venenatis hendrerit.
            </motion.p>
            <motion.button
                initial={{ y: "12vh", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
                className='text-sm h-14 w-36 mr-2 sm:w-32 sm:h-12 bg-[#e5759a] rounded-full text-slate-50 shadow-inner p-1'
            >
                Contact Us
            </motion.button>
            <div className='absolute left-0 -bottom-72 -z-10'>
                <svg width="150" height="200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="5" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="25" cy="5" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="45" cy="5" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="65" cy="5" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="85" cy="5" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="105" cy="5" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="125" cy="5" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="5" cy="20" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="25" cy="20" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="45" cy="20" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="65" cy="20" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="85" cy="20" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="105" cy="20" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="125" cy="20" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="5" cy="35" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="25" cy="35" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="45" cy="35" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="65" cy="35" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="85" cy="35" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="105" cy="35" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="125" cy="35" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="5" cy="50" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="25" cy="50" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="45" cy="50" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="65" cy="50" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="85" cy="50" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="105" cy="50" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="125" cy="50" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="5" cy="65" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="25" cy="65" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="45" cy="65" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="65" cy="65" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="85" cy="65" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="105" cy="65" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="125" cy="65" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="5" cy="80" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="25" cy="80" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="45" cy="80" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="65" cy="80" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="85" cy="80" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="105" cy="80" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="125" cy="80" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="5" cy="95" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="25" cy="95" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="45" cy="95" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="65" cy="95" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="85" cy="95" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="105" cy="95" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="125" cy="95" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="5" cy="110" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="25" cy="110" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="45" cy="110" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="65" cy="110" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="85" cy="110" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="105" cy="110" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                    <circle cx="125" cy="110" r="3" fill="#ffc0c0" fillOpacity="0.2" />
                </svg>
                <div className='w-[60px] h-[60px] absolute -top-5 right-0 bg-[#e5759a] rounded-tl-full rotate-90 opacity-[0.6]'></div>
            </div>
        </div>
    )
}

export default LeftThreads