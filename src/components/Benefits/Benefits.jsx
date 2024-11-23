import { FaRegCheckCircle } from "react-icons/fa"

function Benefits() {

    const benefitsContent = [
        {
            id: 1,
            heading: 'Yoga improves strength, balance & flexibility',
            text: 'Semper magna dis ultricies sem penatibus fames at. Felis ipsum mi lorem natoque.'
        },
        {
            id: 2,
            heading: 'Yoga helps with back pain relief',
            text: 'Semper magna dis ultricies sem penatibus fames at. Felis ipsum mi lorem natoque.'
        },
        {
            id: 3,
            heading: 'Yoga relaxes you, to help you sleep better',
            text: 'Semper magna dis ultricies sem penatibus fames at. Felis ipsum mi lorem natoque.'
        },
        {
            id: 4,
            heading: 'Yoga helps you manage stress',
            text: 'Semper magna dis ultricies sem penatibus fames at. Felis ipsum mi lorem natoque.'
        }
    ]

    return (
        <section className="bg-[url('./assets/images/BG4.jpg')] bg-no-repeat bg-left-bottom mt-24">
            <div className="max-w-[92%] mx-auto pt-28 pb-24 flex gap-10 items-center">
                <div className="w-[60%]">
                    <h3 className="font-crimson text-[26px] mb-4 tracking-wide">
                        Yoga Benefit
                    </h3>
                    <h1 className="text-[2.8rem] leading-[1.18] font-500 font-sans mb-6">
                        Shaping your mind with the body
                    </h1>
                    <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mb-6 ">
                        Donec fermentum mattis blandit dignissim molestie. Odio penatibus erat habitant scelerisque.
                    </p>
                    <button className='text-sm h-14 w-36 mr-2 bg-[#e5759a] rounded-full text-slate-50 shadow-inner p-1 mt-5'>Discover more</button>
                </div>
                <div className="grid grid-cols-2 gap-9 ">
                    {
                        benefitsContent.map(content => {
                            return (
                                <div className="flex gap-6" key={content.id}>
                                    <div className="bg-[#e5759a] h-fit p-4 rounded-full text-slate-50 text-2xl"><FaRegCheckCircle /></div>
                                    <div>
                                        <h1 className="text-[1.5rem] leading-[1.18] font-500 font-sans mb-3">{content.heading}</h1>
                                        <p className="text-base leading-[1.6] text-[#3a3939] opacity-80" style={{ fontWeight: '400' }}>{content.text}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Benefits