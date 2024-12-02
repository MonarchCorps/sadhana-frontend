import LeftThreads from "./LeftThreads"
import RightThreads from "./RightThreads"

function Threads() {
    return (
        <section className='relative'>
            <div className="max-w-[98%] mx-auto grid grid-cols-2 hrmd:flex hrmd:flex-col-reverse pt-36 px-8 pb-10 gap-24 items-center">
                <LeftThreads />
                <RightThreads />
            </div>
        </section>
    )
}

export default Threads