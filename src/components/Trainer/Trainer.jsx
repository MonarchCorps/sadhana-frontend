import TrainersList from './TrainersList'
import { Link } from 'react-router-dom'
import useScrollTop from '../../hooks/useScrollTop'

function Trainer() {

    const { scrollTop } = useScrollTop();

    return (
        <section>
            <div className="max-w-[90%] mx-auto pt-24 grid grid-cols-3 hrmd:flex hrmd:flex-col gap-10">
                <div className="bg-[url('./assets/images/Orn-1.png')] bg-no-repeat hrmd:text-center hrmd:bg-[center_top_-20px]">
                    <div>
                        <h3 className="font-crimson text-[26px] mb-4 tracking-wide">
                            Meet Our Trainer
                        </h3>
                        <h1 className="text-[2.5rem] leading-[1.18] font-500 font-sans mb-6">
                            Our Professional Yoga Trainer
                        </h1>
                        <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-6 ">
                            Dis duis imperdiet feugiat ultrices tincidunt vulputate molestie. Nullam nisi odio id libero ad consectetuer lacus.
                        </p>
                        <Link
                            to='/instructor'
                            onClick={scrollTop}
                            className='text-sm px-7 py-4 hrmd:px-5 hrmd:py-3 mr-2 bg-[#e5759a] rounded-full text-slate-50 shadow-inner p-1 mt-6'
                        >
                            More about trainer
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-3 col-span-2 gap-4 tmd:grid-cols-2 xsm:grid-cols-1">
                    <TrainersList />
                </div>
            </div>
        </section>
    )
}

export default Trainer