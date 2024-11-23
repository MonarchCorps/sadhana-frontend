import LeftThreads from "./LeftThreads"
import RightThreads from "./RightThreads"

function Threads() {
    return (
        <section /*className='bg-[#ebf3f3]'*/ className='relative'>
            <div className="max-w-[98%] mx-auto grid grid-cols-2 pt-36 px-10 pb-10 gap-24 items-center">
                <LeftThreads />
                <RightThreads />
            </div>
        </section>
    )
}

export default Threads