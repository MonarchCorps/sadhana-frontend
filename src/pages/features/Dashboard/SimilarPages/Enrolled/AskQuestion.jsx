import { FaQuestion } from 'react-icons/fa'

function AskQuestion() {
    return (
        <div className="bg-[#f6f6f6] py-3 px-4 rounded-md mt-10 mb-5 w-1/2 max-h-[23.2rem]">
            <div className='bg-[#226c30] w-fit p-3 rounded'>
                <span className='text-slate-50 text-2xl'><FaQuestion /></span>
            </div>
            <h1 className='font-sans font-500 text-4xl mt-4 mb-3'>Ask Us</h1>
            <p className="text-sm font-500 my-2">Having issues with a payment not popping up? </p>
            <ul className="list-disc ml-5">
                <li className="text-[0.9rem] text-slate-800">
                    Payments may take additional time to process due to banking hours, holidays, or high transaction volumes.
                </li>

                <li className="text-[0.9rem] text-slate-800">
                    A typo in account numbers or payment details can cause the payment to be misrouted or delayed.
                </li>

                <li className="text-[0.9rem] text-slate-800">
                    Technical glitches or maintenance on the bank’s side may temporarily prevent the payment from showing up.
                </li>
            </ul>
            <button
                className='text-[#f2f2f2] text-sm bg-[#1b1b1b] h-10 w-full rounded-[10px] shadow-sm shadow-[#241a1a] font-500 mt-5'
            >
                Ask Us
            </button>
        </div>
    )
}

export default AskQuestion