import { motion } from "motion/react"
import { FaRegCheckCircle } from "react-icons/fa"

function Benefits() {

    const benefitsContent = [
        {
            id: 1,
            heading: 'Yoga improves strength, balance & flexibility',
            text: 'It improves strength, balance, and flexibility, while also fostering mental clarity and emotional stability for overall well- being.',
            dur: 0.8
        },
        {
            id: 2,
            heading: 'Yoga helps with back pain relief',
            text: 'Gentle stretches and targeted poses help alleviate back pain, improve posture, and enhance flexibility for lasting relief.',
            dur: 1.2
        },
        {
            id: 3,
            heading: 'Yoga relaxes you, to help you sleep better',
            text: 'Mindful movement and deep breathing relax the body and mind, promoting restful sleep and reducing nighttime stress.',
            dur: 1.6
        },
        {
            id: 4,
            heading: 'Yoga helps you manage stress',
            text: 'Mindful breathing and movement help calm the mind, reduce tension, and promote relaxation, effectively managing stress.',
            dur: 1.85
        }
    ]

    return (
        <section className="bg-[url('./assets/images/BG4.jpg')] bg-no-repeat bg-left-bottom mt-24 overflow-hidden">
            <div className="max-w-[92%] mx-auto pt-28 pb-24 flex hrmd:flex-col hrmd:pt-20 hrmd:pb-16 gap-8 items-center">
                <div className="w-[60%] hrmd:w-full">
                    <motion.h3
                        initial={{ x: "-10vw", opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.82, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="font-crimson text-[26px] mb-4 tracking-wide lg:text-xl sm:text-base"
                    >
                        Yoga Benefit
                    </motion.h3>
                    <motion.h1
                        initial={{ y: "10vh", opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-[2.8rem] leading-[1.18] font-500 font-sans mb-6 lg:text-4xl sm:text-2xl"
                    >
                        Shaping your mind with the body
                    </motion.h1>
                    <motion.p
                        initial={{ y: "13vh", opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-4 hrmd:mb-2 sm:text-sm"
                    >
                        Through mindful movement and breath, the body strengthens while the mind finds clarity, balance, and resilience.
                    </motion.p>
                    <motion.button
                        initial={{ x: "13vw", opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        type='button'
                        className='text-sm h-14 w-36 mr-2 bg-[#e5759a] rounded-full text-slate-50 shadow-inner p-1 mt-5'
                    >
                        Discover more
                    </motion.button>
                </div>
                <div className="grid grid-cols-2 gap-9 md:grid-cols-1 md:w-full md:gap-5">
                    {
                        benefitsContent.map(content => {
                            return (
                                <motion.div
                                    initial={{ x: "8vw", opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: content.dur, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="flex gap-6"
                                    key={content.id}>
                                    <div className="bg-[#e5759a] h-fit p-4 rounded-full text-slate-50 text-2xl lg:text-xl"><FaRegCheckCircle /></div>
                                    <div>
                                        <h1 className="text-[1.5rem] leading-[1.18] font-500 font-sans mb-3 sm:text-xl">{content.heading}</h1>
                                        <p className="text-base leading-[1.6] text-[#3a3939] opacity-80 lg:text-sm lg:leading-[1.7] sm:text-sm" style={{ fontWeight: '400' }}>{content.text}</p>
                                    </div>
                                </motion.div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Benefits