import { FaQuoteRight } from 'react-icons/fa'
import profileImage1 from '../../assets/images/Staff-7-1.jpg'
import profileImage2 from '../../assets/images/Staff-4-1.jpg'
import profileImage3 from '../../assets/images/Staff-2-1.jpg'
import { useEffect, useRef } from 'react'
import Testimonial from './Testimonial'
import { register } from 'swiper/element/bundle'

function RightTestimonials() {

    const swiperRef = useRef(null);

    useEffect(() => {
        const swiperContainer = swiperRef.current;
        register(); // Registers Swiper elements like 'swiper-container'

        const params = {
            navigation: true,
            injectStyles: [
                `
					.swiper-button-next,
					 .swiper-button-prev {
						position: absolute;
						padding: 4 6px;
						color: #fff;
						top: 94%;
						width: 0px;
					}
					.swiper-button-next::after {
						content: '\\2192';
						font-size: 30px;
						margin-right: 40px;
					}
					.swiper-button-prev::before {
						content: '\\27F5';
						font-size: 20px;
						margin-left: 40px;
					}
				`
            ]
        };
        Object.assign(swiperContainer, params);
        swiperContainer.initialize();
    }, []);

    const reviews = [
        {
            id: 1,
            name: 'Selena Gomez',
            image: profileImage1,
            description: 'Orci mollis cursus aliquet gravida dui habitant facilisi. Vivamus semper posuere praesent facilisi cras nam quisque proin. Volutpat dictum nibh iaculis orci habitasse commodo erat lorem dapibus.'
        },
        {
            id: 2,
            name: 'Bruce Gate',
            image: profileImage2,
            description: 'Orci mollis cursus aliquet gravida dui habitant facilisi. Vivamus semper posuere praesent facilisi cras nam quisque proin. Volutpat dictum nibh iaculis orci habitasse commodo erat lorem dapibus.'
        },
        {
            id: 3,
            name: 'John Wayne',
            image: profileImage3,
            description: 'Orci mollis cursus aliquet gravida dui habitant facilisi. Vivamus semper posuere praesent facilisi cras nam quisque proin. Volutpat dictum nibh iaculis orci habitasse commodo erat lorem dapibus.'
        }
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
                <swiper-container ref={swiperRef} init="false" space-between="10" slides-per-view="2" >
                    {
                        reviews.map((review, i) => {
                            return (
                                <Testimonial key={i} review={review} />
                            )
                        })
                    }

                </swiper-container>
            </div>
        </div>
    )
}

export default RightTestimonials