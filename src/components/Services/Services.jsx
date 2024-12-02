import bgOrnament from '../../assets/images/bg-ornament.png'
import ServicesCard from './ServicesCard'

function Services() {
    return (
        <section className='relative service-bg'>
            <div className='absolute top-14 left-1/2 -translate-x-1/2 sm:left-[-30rem] z-20 opacity-75'>
                <img src={bgOrnament} alt='logo' className='select-none' />
            </div>
            <div className='max-w-[98%] mx-auto text-center pt-32 px-10 pb-10 z-30 relative'>
                <h3 className='font-crimson text-[26px] mb-4 tracking-wide'>
                    Our Services
                </h3>
                <h1 className='text-[2.8rem] leading-[1.18] font-500 font-sans mb-6 '>
                    Discover yourself, discover yoga
                </h1>
                <div className='text-center w-full flex'>
                    <p className='text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-6 max-w-prose mx-auto'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                    </p>
                </div>
                <ServicesCard />
            </div>
        </section>
    )
}

export default Services