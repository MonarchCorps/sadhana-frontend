/* eslint-disable react/prop-types */
function SwiperList({ content }) {
    return (
        <figure className='cursor-grab select-none'>
            <img src={content.image} alt="" className='h-[calc(80vh)] hrmd:h-screen w-full object-cover' />
            <div className='absolute bottom-12 px-4'>
                <h2 className='font-800 font-sans text-slate-50 inline-block'>{content.title}:</h2>
                <p className="inline text-slate-50"> {content.description}</p>
            </div>
        </figure>
    )
}

export default SwiperList