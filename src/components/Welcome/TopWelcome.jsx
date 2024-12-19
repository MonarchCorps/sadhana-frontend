import { motion } from "motion/react"

function TopWelcome() {
    return (
        <div className="flex hrmd:flex-col hrmd:gap-5 items-center py-2 gap-9">
            <div className="w-[38%] mb-1 hrmd:w-full">
                <motion.h3
                    initial={{ x: "-30vw", opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="font-crimson text-[26px] mb-4 tracking-wide"
                >
                    Welcome to Sadhana
                </motion.h3>
                <motion.h1
                    initial={{ y: "12vh", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-[2.5rem] hrmd:text-4xl leading-[1.18] font-500 font-sans mb-6 hrmd:mb-4"
                >
                    A quiet mind is the healthiest mind
                </motion.h1>
                <div className='w-16 h-[0.3rem] mr-4 bg-[#D6809C]'></div>
            </div>
            <div className="w-[36%] hrmd:w-full">
                <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 sm:text-sm">
                    A quiet mind is essential for mental clarity and emotional stability. It helps reduce stress, improve focus, and enhance overall well-being, creating space for peace, creativity, and healthier living.
                </p>
            </div>
            <div className="w-[36%] hrmd:w-full">
                <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 sm:text-sm">
                    In a world full of distractions, a quiet mind offers the clarity needed for personal growth. It calms the body, reduces anxiety, and nurtures emotional resilience, fostering a healthier, balanced life.
                </p>
            </div>
        </div>
    )
}

export default TopWelcome