import ServicesCard from "./ServicesCard"

function Services() {
    return (
        <section /*className='bg-[#ebf3f3]'*/ className='relative service-bg'>
            {/* <div className='absolute bg-[url("./assets/images/Ornament-1-a.png")] bg-no-repeat bg-top w-full h-full top-[10.75rem] left-0 -z-10'> */}
            {/* </div> */}
            {/* <div className='size-full bg-no-repeat absolute top-0 -z-10 bg-cover bg-[url("./assets/images/Ornament-1-a.png")]'></div> */}
            <div className="max-w-[98%] mx-auto text-center pt-32 px-10 pb-10">
                <h3 className="font-crimson text-[26px] mb-4 tracking-wide">
                    Our Services
                </h3>
                <h1 className="text-[2.8rem] leading-[1.18] font-500 font-sans mb-6">
                    Discover yourself, discover yoga
                </h1>
                <div className="text-center w-full flex">
                    <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-6 max-w-prose mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                    </p>
                </div>
                <ServicesCard />
            </div>
        </section>
    )
}

export default Services