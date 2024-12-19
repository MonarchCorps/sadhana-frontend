import { FaQuoteRight } from 'react-icons/fa'
import profileImage1 from '../../assets/images/Staff-7-1.jpg'
import profileImage2 from '../../assets/images/Staff-4-1.jpg'
import profileImage3 from '../../assets/images/Staff-2-1.jpg'
import Testimonial from './Testimonial'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'

function RightTestimonials() {
    const { screenWidth } = useGetScreenWidth()

    const reviews = [
        {
            id: 1,
            name: 'Selena Gomez',
            image: profileImage1,
            description: 'Sadhana has been a transformative experience for me. The variety of yoga styles and expert instructors have helped me improve flexibility, strength, and mental clarity. I love the personalized approach, which makes each session feel unique and impactful.'
        },
        {
            id: 2,
            name: 'Bruce Gate',
            image: profileImage2,
            description: 'I’ve been practicing yoga for years, and Sadhana has elevated my journey. The platform offers diverse classes catering to all levels, with professional instructors who provide clear, helpful guidance. my body stronger, and I feel more connected with myself after each session.'
        },
        {
            id: 3,
            name: 'John Wayne',
            image: profileImage3,
            description: 'Sadhana is more than just a yoga site; it’s a sanctuary for both body and mind. The trainers are incredibly knowledgeable, the classes are varied, and the platform is easy to navigate. It’s helped me manage stress, improve flexibility, and find inner peace.'
        },
    ]

    return (
        <div className='w-3/5 mb-3 md:self-start md:w-full'>
            <div className='flex justify-between'>
                <div>
                    <h3 className="font-crimson text-[26px] mb-4 tracking-wide hmd:text-xl">Testimonials</h3>
                    <h1 className="text-[2.57rem] leading-[1.18] font-500 font-sans mb-6 hmd:text-4xl xsm:text-2xl">
                        What They’re Saying
                    </h1>
                    <div className='w-16 h-[0.3rem] mr-4 bg-[#D6809C]'></div>
                </div>
                <div className='text-[#e5759a] text-[4.45rem] flex items-end hmd:text-5xl'>
                    <FaQuoteRight />
                </div>
            </div>
            <div className='cursor-grab mt-10'>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={10}
                    slidesPerView={screenWidth <= 939 ? 1 : 2}
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