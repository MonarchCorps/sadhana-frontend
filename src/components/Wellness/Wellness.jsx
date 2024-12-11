import { motion } from "motion/react"

function Wellness() {
    return (
        <section className="bg-[url('./assets/images/glad-calm-slim-millennial-european-female-in-sportswear-practicing-yoga-enjoy-training-meditating.jpg')] bg-no-repeat bg-center w-full bg-cover mt-28">
            <div className="py-[3rem] px-10 hrmd:px-0 bg-[#1a1a1a63]">
                <motion.div
                    initial={{ y: "10vh", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="py-5s px-10 h-full"
                >
                    <div className="max-w-[50%] p-4 sm:p-2 h-full lg:max-w-[100%]">
                        <h1 className="text-[2.5rem] leading-[1.18] font-600 font-sans mb-6 text-[#eee9e9] lg:text-3xl sm:text-2xl">
                            Let the threads of life get connected with yoga
                        </h1>
                        <p className="text-[15px] leading-[1.69] font-400 opacity-80 mb-6 text-[#eee9e9] hrmd:text-sm sm:text-xs">
                            At posuere potenti montes ligula risus. Metus suspendisse ornare senectus taciti molestie dis arcu duis. Fusce mus sit eget nibh curae id montes finibus venenatis hendrerit.
                        </p>
                        <button className='text-sm h-14 w-36 hrmd:h-12 hrmd:w-32 hrmd:text-xs mr-2 bg-[#e5759a] rounded-full text-slate-50 shadow-inner p-1 mt-6'>Discover more</button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Wellness