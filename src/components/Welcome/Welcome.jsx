import BottomWelcome from "./BottomWelcome"
import TopWelcome from "./TopWelcome"

function Welcome() {
    return (
        <section>
            <div className="max-w-[92%] mx-auto pt-16 flex flex-col">
                <TopWelcome />
                <BottomWelcome />
            </div>
        </section>
    )
}

export default Welcome