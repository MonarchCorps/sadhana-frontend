import { motion } from "motion/react"

function ClassesOverview() {
    return (
        <div className="grid grid-cols-2 items-center mb-10 hrmd:grid-cols-1">
            <div>
                <motion.h3
                    initial={{ x: "-10vw", opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="font-crimson text-[26px] mb-4 tracking-wide lg:text-2xl"
                >
                    Yoga Classes
                </motion.h3>
                <motion.h1
                    initial={{ y: "10vh", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-[2.57rem] lg:text-4xl leading-[1.18] font-500 font-sans mb-6"
                >
                    Let the threads of life get connected with yoga
                </motion.h1>
            </div>
            <div>
                <motion.p
                    initial={{ x: "10vw", opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-[#3a3939] leading-[1.6] lg:text-base"
                >
                    Hendrerit per libero donec torquent aliquet tincidunt cubilia. Placerat maximus torquent turpis ante elit. Aptent mauris taciti dolor sapien tortor bibendum vehicula sagittis potenti suscipit felis.
                </motion.p>
                <div className='w-16 h-[0.3rem] mr-4 bg-[#D6809C] mt-11'></div>
            </div>
        </div>
    )
}

export default ClassesOverview