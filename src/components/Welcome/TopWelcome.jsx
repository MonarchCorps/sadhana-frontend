function TopWelcome() {
    return (
        <div className="flex hrmd:flex-col hrmd:gap-5 items-center py-2 gap-9">
            <div className="w-[38%] mb-1 hrmd:w-full">
                <h3 className="font-crimson text-[26px] mb-4 tracking-wide">Welcome to Sadhana</h3>
                <h1 className="text-[2.5rem] hrmd:text-4xl leading-[1.18] font-500 font-sans mb-6 hrmd:mb-4">A quiet mind is the healthiest mind</h1>
                <div className='w-16 h-[0.3rem] mr-4 bg-[#D6809C]'></div>
            </div>
            <div className="w-[36%] hrmd:w-full">
                <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 sm:text-sm">
                    Aliquet diam mattis phasellus fames cras maximus. Semper interdum pulvinar habitasse ligula hendrerit. Tellus vestibulum elit senectus donec fusce feugiat rhoncus. Integer arcu tempor posuere leo accumsan tristique hendrerit orci inceptos.
                </p>
            </div>
            <div className="w-[36%] hrmd:w-full">
                <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 sm:text-sm">
                    Senectus penatibus himenaeos pharetra massa rutrum ornare nascetur. Nascetur leo suspendisse habitant vulputate nisl convallis praesent maecenas himenaeos. Pharetra ipsum vivamus fames nostra accumsan diam lacus.
                </p>
            </div>
        </div>
    )
}

export default TopWelcome