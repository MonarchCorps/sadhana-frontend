import { Fragment } from 'react'
import { format } from 'date-fns'
import botLogo from '../../assets/images/9c7d37cd-ba05-4987-8a75-c5376ac4990d.png'

function HardCodedContent() {
    return (
        <Fragment>
            <div className="p-3 rounded-xl break-words  bg-[#f2f2f2] w-4/5 ">
                <p className="whitespace-pre-wrap text-sm">
                    If you leave the chat, you&apos;ll receive replies to
                </p>
            </div>
            <div className="my-4 text-center text-[#716f6f] text-sm">{format(new Date(), "EEEE, MMM yyyy")}</div>
            <div className='mb-2'>
                <div className="p-3 rounded-xl break-words bg-[#f2f2f2] w-4/5 ">
                    <div className="whitespace-pre-wrap text-sm">
                        <p>👋🏻Welcome to Sadhana🧘‍♀️</p>
                        <br />
                        <p>Our AI bot 🤖 is here to provide assistance 🌤 in generating content 📕 for your course </p>
                    </div>
                </div>
                <div className='mt-3 text-[#716f6f] text-sm flex'>
                    <img src={botLogo} alt="bot logo" className='w-7 inline' />
                    <span className='ml-2 flex items-center'>
                        <span>Chatbot</span>
                        <span className='mx-1 -mt-1 font-900 text-[2rem]'>&middot;</span>
                        <span className='text-[0.8rem]'>
                            {format(new Date(), "p")}
                        </span>
                    </span>
                </div>
            </div>
        </Fragment>
    )
}

export default HardCodedContent