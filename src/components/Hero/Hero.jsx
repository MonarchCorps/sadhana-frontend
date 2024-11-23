import { Link } from 'react-router-dom'
import bgOrnament from '../../assets/images/bg-ornament.png'
import useAuth from '../../hooks/useAuth'
import useScrollTop from '../../hooks/useScrollTop'

function Hero() {

    const { auth } = useAuth()
    const { scrollTop } = useScrollTop();

    return (
        <section className="pt-52 relative h-[50rem]">
            <div className='size-full bg-no-repeat absolute top-0 -z-10 bg-cover bg-[url("./assets/images/hero-bg-image.jpg")]'></div>
            <div className='max-w-[92%] mx-auto'>
                <div className='max-w-[46%] p-3 z-[3]'>
                    <div className='mb-4 flex items-center'>
                        <div className='w-10 h-[0.16rem] mr-4 bg-[#D6809C]'></div>
                        <div className='text-xl font-500 tracking-wide text-[#050505]'>Yoga Class and Studio</div>
                    </div>
                    <h1 className='text-[65px] font-500 text-[#927397] leading-[1.15] mb-4'>
                        <span>Bend your mind,</span>
                        <br />
                        <span>inspire yourself</span>
                    </h1>
                    <div className='leading-[1.5] text-base'>
                        <p>A way to reconnect with yourself even amidst the chaos of your daily routine. Finding yourself is a journey, not a destination.</p>
                        <br />
                        <p>The practice of yoga has been associated with the meditation, relaxation and the development of strength and flexibility.</p>
                    </div><br />
                    <div className='mt-6'>
                        <Link
                            to={
                                auth?.roles?.includes(Number(import.meta.env.VITE_USER_CODE))
                                    ? '/dashboard/student-cp'
                                    : auth?.roles?.includes(Number(import.meta.env.VITE_INSTRUCTOR_CODE))
                                        ? '/dashboard/instructor-cp'
                                        : auth?.roles?.includes(Number(import.meta.env.VITE_ADMIN_CODE))
                                            ? '/dashboard/admin-cp'
                                            : '/register'
                            }
                            onClick={scrollTop}
                            className='text-sm px-7 py-[1.15rem] mr-2 bg-[#e5759a] rounded-full text-slate-50 shadow-inner p-1'
                        >
                            Join Today

                        </Link>
                        <Link
                            to='/class'
                            onClick={scrollTop}
                            className='text-sm px-7 py-4 text-[#e5759a] rounded-full bg-slate-50 shadow-inner border-[#e5779a] border-solid border-2'
                        >
                            View Courses
                        </Link>
                    </div>
                </div>
                <div className='absolute top-[-10rem] left-[-10rem] -z-10 bg-[#eff6f6] opacity-75'>
                    <img src={bgOrnament} alt="logo" className='select-none' />
                </div>
            </div>
        </section>
    )
}

export default Hero