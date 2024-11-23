import LeftTestimonials from "./LeftTestimonials"
import RightTestimonials from "./RightTestimonials"

function Testimonials() {
    return (
        <section>
            <div className="pt-24 max-w-[90%] mx-auto flex gap-5 items-center">
                <LeftTestimonials />
                <RightTestimonials />
            </div>
        </section>
    )
}

export default Testimonials