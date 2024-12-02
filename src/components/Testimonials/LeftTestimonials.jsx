import testimonialBg from '../../assets/images/Orn-5.png'

function LeftTestimonials() {
    return (
        <div className='w-2/5 md:hidden'>
            <div className='testimonials-bg'>
                <div>
                    <img src={testimonialBg} alt="Testimonial background image" />
                </div>
            </div>
        </div>
    )
}

export default LeftTestimonials