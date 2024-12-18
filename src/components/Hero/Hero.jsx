import { Link } from 'react-router-dom'
import bgOrnament from '../../assets/images/bg-ornament.png'
import heroImg from '../../assets/images/hero-bg-image.jpg'
import useAuth from '../../hooks/useAuth'
import useScrollTop from '../../hooks/useScrollTop'
import { motion } from "motion/react"

function Hero() {

    const { auth } = useAuth()
    const { scrollTop } = useScrollTop()
    const screenHeight = screen.height

    return (
        <section
            className="w-screen relative bg-[#eff6f6]"
        >
            <div className='max-w-[90%] mx-auto'>
                <div className='pt-40 hrmd2:max-w-[80%] sm:max-w-[96%] lg:max-w-[50%] max-w-[46%] h-full p-3 z-50 relative'>
                    <motion.div
                        initial={{ x: "20vw", opacity: 0 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className='opacity-0  mb-4 flex items-center'
                    >
                        <div className='w-10 h-[0.16rem] mr-4 bg-[#D6809C]'></div>
                        <div className='text-xl hrmd:text-base font-500 tracking-wide text-[#050505]'>Yoga Class and Studio</div>
                    </motion.div>
                    <motion.h1
                        initial={{ x: "-40vw", opacity: 0 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className='text-5xl hrmd:text-4xl font-500 text-[#927397] leading-[1.15] mb-4'
                    >
                        <span>Bend your mind, inspire yourself</span>
                    </motion.h1>
                    <div className='leading-[1.5] text-base hrmd:text-sm'>
                        <motion.p
                            initial={{ x: "-45vw", opacity: 0 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.82, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            A way to reconnect with yourself even amidst the chaos of your daily routine. Finding yourself is a journey, not a destination.
                        </motion.p>
                        <br />
                        <motion.p
                            initial={{ x: "30vw", opacity: 0 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.82, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            The practice of yoga has been associated with the meditation, relaxation and the development of strength and flexibility.
                        </motion.p>
                    </div>
                    <br className='hrmd:hidden' />
                    <motion.div
                        initial={{ y: "20vh", opacity: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.82, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className='mt-6 flex gap-2 hrmd:flex-col'
                    >
                        <Link
                            to={
                                auth?.roles
                                    ? '/dashboard'
                                    : '/register'
                            }
                            onClick={scrollTop}
                            className='text-sm px-7 py-4 bg-[#e5759a] rounded-full text-slate-50 shadow-inner p-1 hrmd2:w-3/5 hrmd:w-4/5 text-center'
                        >
                            Join Today

                        </Link>
                        <Link
                            to='/class'
                            onClick={scrollTop}
                            className='text-sm px-7 py-3 text-[#e5759a] rounded-full hrmd2:w-3/5 hrmd:w-4/5 text-center bg-slate-50 shadow-inner border-[#e5779a] border-solid border-2'
                        >
                            View Courses
                        </Link>
                    </motion.div>
                </div>
                <motion.div
                    className='absolute -top-44 -left-96 sm:left-[-30rem] z-20 opacity-75'
                    initial={{ rotate: 0 }}
                    whileInView={{ rotate: 90 }}
                    transition={{ duration: 0.82, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.img
                        src={bgOrnament}
                        alt="logo"
                        className='select-none'
                    />
                </motion.div>
                <div className='absolute w-full top-0 right-0 hrmd:right-40 left-0 z-10 bg-[#eff6f6]'>
                    <img src={heroImg} alt="logo" className=' object-cover w-full' style={{ height: `${screenHeight}px` }} />
                </div>
            </div>
        </section>
    )
}

export default Hero