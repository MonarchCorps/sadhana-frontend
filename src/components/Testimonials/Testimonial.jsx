/* eslint-disable react/prop-types */
function Testimonials({ review }) {
    return (
        <div className='border-[1px] border-solid border-[#3232] px-7 pt-7 pb-5 rounded-xl'>
            <div className='flex gap-3 mb-5'>
                <div>
                    <img src={review.image} alt={`${review.name} image`} className='w-12 h-12 rounded-full object-cover' />
                </div>
                <div>
                    <h1 className='text-xl font-500 font-sans tracking-wide'>{review.name}</h1>
                    <p className='text-[#e5759a] text-sm'>Designation</p>
                </div>
            </div>
            <div>
                <p className="text-[15px] leading-[1.69] font-400 text-[#726f6f]">
                    {review.description}
                </p>
            </div>
        </div>
    )
};

export default Testimonials;