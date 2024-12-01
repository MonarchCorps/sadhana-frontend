import LeftChooseUs from "./LeftChooseUs"
import RightChooseUs from "./RightChooseUs"

function ChooseUS() {
    return (
        <section>
            <div className="max-w-[92%] mx-auto pt-20 flex hrmd2:flex-col items-center gap-10">
                <LeftChooseUs />
                <RightChooseUs />
            </div>
        </section>
    )
}

export default ChooseUS