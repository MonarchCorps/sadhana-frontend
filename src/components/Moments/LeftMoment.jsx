import { FaPlay } from 'react-icons/fa6'

function LeftMoment() {
    return (
        <div className="w-[46%]">
            <div className="grid items-center w-full h-full place-items-center p-3">
                <div className="border-[5px] border-solid text-[#CFCFCF3B] border-[#CFCFCF3B] rounded-full w-24 h-24 text-center grid place-items-center cursor-pointer hover:bg-[#FFFFFF] hover:border-[#FFFFFF] hover:text-[#D6809C] transition-all duration-[350ms]">
                    <span className="text-2xl ml-1">
                        <FaPlay />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default LeftMoment