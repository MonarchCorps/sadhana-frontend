function LeftChooseUs() {

    const progressContent = [
        {
            id: 1,
            text: 'Metabolism',
            percentage: '93%'
        },
        {
            id: 2,
            text: 'Flexibility',
            percentage: '75%'
        },
        {
            id: 3,
            text: 'Breathing',
            percentage: '80%'
        }
    ]

    return (
        <div className="w-[45%] hrmd2:w-full">
            <h3 className="font-crimson text-[26px] mb-4 tracking-wide hrmd:text-xl">Why Choose Us</h3>
            <h1 className="text-[2.8rem] leading-[1.18] font-500 font-sans mb-6 hrmd:text-3xl">You can always control what goes on inside</h1>
            <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-6 hrmd:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <div>
                {
                    progressContent.map(content => {
                        return (
                            <div key={content.id} className="mb-5">
                                <div className="flex justify-between" style={{ width: `${content.percentage}` }}>
                                    <span className="text-base hrmd:text-sm">{content.text}</span>
                                    <span className="text-[#9f769f] text-xl">{content.percentage}</span>
                                </div>
                                <div className="mt-2">
                                    <div className="w-full bg-[#CFCFCF] h-[0.35rem] rounded relative overflow-hidden">
                                        <span className="absolute h-full bg-[#D6809C] top-0 bottom-0 rounded" style={{ width: `${content.percentage}` }}></span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LeftChooseUs