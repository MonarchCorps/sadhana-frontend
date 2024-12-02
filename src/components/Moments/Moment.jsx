import LeftMoment from "./LeftMoment"
import RightMoment from "./RightMoment"

function Moment() {
    return (
        <section className="bg-[url('./assets/images/close-up-of-a-man-in-white-sportswear-doing-yoga-in-a-fitness-room-with-a-balgovon-the-concept-of-a.jpg')] bg-no-repeat bg-center w-full bg-cover mt-28">
            <div className="py-[3rem] px-10 hrmd:px-5 bg-[#1a1a1a63] h-full">
                <div className="flex hrmd:flex-col gap-4">
                    <LeftMoment />
                    <RightMoment />
                </div>
            </div>
        </section>
    )
}

export default Moment