import LeftMoment from "./LeftMoment"
import RightMoment from "./RightMoment"

function Moment() {
    return (
        <section className="bg-[url('./assets/images/close-up-of-a-man-in-white-sportswear-doing-yoga-in-a-fitness-room-with-a-balgovon-the-concept-of-a.jpg')] bg-no-repeat bg-center w-full bg-cover mt-28">
            <div className="py-[5.2rem] px-10 bg-[#1a1a1a63] h-full">
                <div className="max-w-[94%] mx-auto flex gap-4">
                    <LeftMoment />
                    <RightMoment />
                </div>
            </div>
        </section>
    )
}

export default Moment