import LeftTestimonials from "./LeftTestimonials"
import RightTestimonials from "./RightTestimonials"

function Testimonials() {
    return (
        <section>
            <div className="pt-24 max-w-[90%] mx-auto items-center md:flex-col flex gap-5 ">
                <LeftTestimonials />
                <RightTestimonials />
            </div>
        </section>
    )
}

export default Testimonials