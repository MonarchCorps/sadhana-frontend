import { FaLeaf } from "react-icons/fa"

function RightMoment() {
    return (
        <div className="w-[64%] hrmd:w-full">
            <div className="border-2 border-dashed border-[#eeeeee28] p-14 hrmd:px-8 rounded-md overflow-hidden text-center">
                <div className="mb-5 max-w-[40%] mx-auto flex items-center gap-3">
                    <div className="bg-[#E7CBAE] h-[0.095rem] w-full"></div>
                    <span className="text-[#E7CBAE] text-xl">
                        <FaLeaf />
                    </span>
                    <div className="bg-[#E7CBAE] h-[0.095rem] w-full"></div>
                </div>
                <h1 className="text-[#f3f1f1] text-3xl font-600 leading-[1.32] mb-5 hrmd:text-2xl md:text-xl">
                    Each Moment Is An Opportunity To Be Kind To Yourself And Your Body
                </h1>
                <p className="text-[#f3f1f1] text-base leading-[1.5] hrmd:text-sm">
                    Per sociosqu ultrices ante egestas elementum odio dignissim donec sed. Luctus tellus euismod netus felis phasellus mollis fusce. Condimentum diam parturient feugiat vitae consectetuer.
                </p>
            </div>
        </div>
    )
}

export default RightMoment