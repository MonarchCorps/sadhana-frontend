/* eslint-disable react/no-unescaped-entities */
function Subscribe() {
    return (
        <section className="bg-[#FAF5EF]">
            <div className="pt-16 pb-5 max-w-[90%] mx-auto flex hrmd2:flex-col justify-between border-solid border-b-[1px] border-[#b6b2b2] items-center">
                <div className="w-[50%] hrmd2:w-full">
                    <h3 className="font-crimson text-[22px] mb-4 tracking-wide hrmd:text-xl xsm:text-base">
                        Subscribe to our News Letter
                    </h3>
                    <h1 className="text-[2.4rem] leading-[1.18] font-500 font-sans mb-6 hrmd:text-4xl xsm:text-3xl">
                        Let's Do Yoga Together
                    </h1>
                    <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-6 hrmd:text-base xsm:text-sm">
                        Join in for a shared yoga experience that promotes strength, balance, and tranquility. Together, we’ll connect, grow, and find inner peace through mindful practice.                    </p>
                </div>
                <div className="flex flex-col w-2/5 hrmd2:w-full">
                    <input type='text' placeholder="Enter email address" className='text-sm h-14 w-full mb-4 px-4 rounded-full  shadow-inner border-[#3a3939] border-solid border-[1px] outline-none placeholder:text-[#3a3939]' />
                    <button className='text-sm h-14 w-full mr-2 bg-[#e5759a] rounded-full text-slate-50 shadow-inner p-1'>Subscribe</button>
                </div>
            </div>
        </section>
    )
}

export default Subscribe