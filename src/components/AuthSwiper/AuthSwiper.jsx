import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import image1 from '../../assets/authSwiperImages/photo-1527525443983-6e60c75fff46.avif'
import image2 from '../../assets/authSwiperImages/photo-1529693662653-9d480530a697.avif'
import image3 from '../../assets/authSwiperImages/photo-1709790056310-c05d29006239.avif'
import image4 from '../../assets/authSwiperImages/premium_photo-1667520211253-805db754cf22.avif'
import image5 from '../../assets/authSwiperImages/premium_photo-1682095736688-acd2ae20ffa4 22.47.32.jpeg'

import SwiperList from './SwiperList'

function AuthSwiper() {

    const swiperContent = [
        {
            id: 1,
            image: image1,
            title: 'Boost Flexibility and Balance',
            description: 'Increase physical flexibility, core balance, and overall stability with consistent yoga practice.'
        }, {
            id: 2,
            image: image2,
            title: 'Relieve Stress and Anxiety',
            description: 'Reduce mental stress and promote relaxation through mindful breathing and poses.'
        }, {
            id: 3,
            image: image3,
            title: 'Enhance Mental Clarity',
            description: 'Achieve sharper focus and a clearer mind with regular meditation and movement.'
        }, {
            id: 4,
            image: image4,
            title: 'Strengthen Body and Mind',
            description: 'Build strength, resilience, and inner peace for a balanced lifestyle.'
        }, {
            id: 5,
            image: image5,
            title: 'Improve Posture and Mobility',
            description: 'Support better posture and joint health with gentle, targeted stretches.'
        }
    ]

    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 4000 }}
            loop
        >
            {swiperContent.map((content) => (
                <SwiperSlide key={content.id}>
                    <SwiperList content={content} />
                </SwiperSlide>
            ))}
        </Swiper>
    )

}

export default AuthSwiper