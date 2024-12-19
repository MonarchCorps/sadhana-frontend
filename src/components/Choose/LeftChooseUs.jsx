/* eslint-disable react/prop-types */
import { motion } from "motion/react"
import { useState } from 'react'

function LeftChooseUs() {

    const progressContent = [
        { id: 1, text: 'Metabolism', percentage: 93 },
        { id: 2, text: 'Flexibility', percentage: 75 },
        { id: 3, text: 'Breathing', percentage: 80 }
    ]

    return (
        <div className="w-[45%] hrmd2:w-full">
            <motion.h3
                initial={{ x: "-30vw", opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
                className="font-crimson text-[26px] mb-4 tracking-wide hrmd:text-xl"
            >
                Why Choose Us
            </motion.h3>
            <motion.h1
                initial={{ y: "12vh", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-[2.8rem] leading-[1.18] font-500 font-sans mb-6 hrmd:text-3xl"
            >
                You can always control what goes on inside
            </motion.h1>
            <motion.p
                initial={{ y: "14vh", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.82, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-6 hrmd:text-sm"
            >
                Join our yoga site for expert-led courses, flexible sessions, and a supportive community. Experience peace, strength, and balance, whether you&apos;re a beginner or seasoned practitioner—whenever and wherever you are.
            </motion.p>
            <div>
                {
                    progressContent.map(content => {
                        return (
                            <ProgressBar key={content.id} content={content} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LeftChooseUs

const ProgressBar = ({ content }) => {

    const [count, setCount] = useState(0);

    return (
        <div className="mb-5">
            <div
                className="flex justify-between"
                style={{ width: `${count}%` }}
            >
                <span className="text-base hrmd:text-sm">{content.text}</span>
                <span className="text-[#9f769f] text-xl ml-4">{count}%</span>
            </div>
            <div className="mt-2">
                <div className="w-full bg-[#CFCFCF] h-[0.35rem] rounded relative overflow-hidden">
                    <motion.div
                        style={{
                            background: "#D6809C",
                            height: "100%",
                            borderRadius: "5px",
                        }}
                        initial={{ width: "0%" }}
                        whileInView={{
                            width: `${content.percentage}%`,
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                        }}
                        onUpdate={(latest) => {
                            const percentage = Math.round(parseFloat(latest.width));
                            setCount(percentage);
                        }}
                        viewport={{ once: true }}
                    />
                </div>
            </div>
        </div>
    )
}