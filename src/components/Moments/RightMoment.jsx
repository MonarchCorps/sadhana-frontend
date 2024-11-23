import { FaLeaf } from "react-icons/fa"

function RightMoment() {
    return (
        <div className="w-[54%]">
            <div className="border-2 border-dashed border-[#eeeeee28] p-14 rounded-md overflow-hidden text-center">
                <div className="mb-5 max-w-[40%] mx-auto flex items-center gap-3">
                    <div className="bg-[#E7CBAE] h-[0.095rem] w-full"></div>
                    <span className="text-[#E7CBAE] text-xl">
                        <FaLeaf />
                    </span>
                    <div className="bg-[#E7CBAE] h-[0.095rem] w-full"></div>
                </div>
                <h1 className="text-[#f3f1f1] text-4xl font-600 leading-[1.32] mb-5">
                    Each Moment Is An Opportunity To Be Kind To Yourself And Your Body
                </h1>
                <p className="text-[#f3f1f1] text-base leading-[1.6]">
                    Per sociosqu ultrices ante egestas elementum odio dignissim donec sed. Luctus tellus euismod netus felis phasellus mollis fusce. Condimentum diam parturient feugiat vitae consectetuer sit tincidunt sem neque aptent tellus.
                </p>
            </div>
        </div>
    )
}

export default RightMoment