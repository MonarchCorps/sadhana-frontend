import { FaQuoteRight } from 'react-icons/fa'
import profileImage1 from '../../assets/images/Staff-7-1.jpg'
import profileImage2 from '../../assets/images/Staff-4-1.jpg'
import profileImage3 from '../../assets/images/Staff-2-1.jpg'
import Testimonial from './Testimonial'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

function RightTestimonials() {
    const reviews = [
        {
            id: 1,
            name: 'Selena Gomez',
            image: profileImage1,
            description: 'Orci mollis cursus aliquet gravida dui habitant facilisi. Vivamus semper posuere praesent facilisi cras nam quisque proin. Volutpat dictum nibh iaculis orci habitasse commodo erat lorem dapibus.',
        },
        {
            id: 2,
            name: 'Bruce Gate',
            image: profileImage2,
            description: 'Orci mollis cursus aliquet gravida dui habitant facilisi. Vivamus semper posuere praesent facilisi cras nam quisque proin. Volutpat dictum nibh iaculis orci habitasse commodo erat lorem dapibus.',
        },
        {
            id: 3,
            name: 'John Wayne',
            image: profileImage3,
            description: 'Orci mollis cursus aliquet gravida dui habitant facilisi. Vivamus semper posuere praesent facilisi cras nam quisque proin. Volutpat dictum nibh iaculis orci habitasse commodo erat lorem dapibus.',
        },
    ]

    return (
        <div className='w-3/5'>
            <div className='flex justify-between'>
                <div>
                    <h3 className="font-crimson text-[26px] mb-4 tracking-wide">Testimonials</h3>
                    <h1 className="text-[2.57rem] leading-[1.18] font-500 font-sans mb-6">
                        What They’re Saying
                    </h1>
                    <div className='w-16 h-[0.3rem] mr-4 bg-[#D6809C]'></div>
                </div>
                <div className='text-[#e5759a] text-[4.45rem] flex items-end'>
                    <FaQuoteRight />
                </div>
            </div>
            <div className='cursor-grab mt-10'>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={10}
                    slidesPerView={2}
                    autoplay={{ delay: 3000 }}
                    loop
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <Testimonial review={review} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default RightTestimonials