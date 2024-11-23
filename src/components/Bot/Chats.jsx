import { IKImage } from 'imagekitio-react'
import { Fragment, useState } from 'react'
import { FaCheck, FaCopy } from 'react-icons/fa6'
import applyCustomStyles from '../../utils/applyCustomStyles'
import handleCopy from '../../utils/handleCopy'

function Chats({ chats, visibleRefs }) {
    const [copySuccess, setCopySuccess] = useState([]);

    return (
        chats?.history.map((chat, i) => (
            chat?.role === 'user' ? (
                <div key={chat?.parts[0]?._id} className='w-full grid justify-items-end'>
                    <div className='max-w-[70%]'>
                        {
                            chat?.img && (
                                <div className='mb-2'>
                                    <IKImage
                                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                        path={chat?.img}
                                        className='w-80 h-80 rounded-md object-cover'
                                        loading='lazy'
                                        lqip={{
                                            active: true,
                                            quality: 20
                                        }}
                                    />
                                </div>
                            )
                        }
                        <h3 className='w-fit rounded-md break-words bg-[#f2f2f2] p-3 mb-4 float-end'>
                            <span className='whitespace-pre-wrap text-sm'>
                                {chat?.parts[0]?.text}
                            </span>
                        </h3>
                    </div>
                </div>
            ) : (
                <div
                    className='w-full grid justify-items-start mb-4'
                    key={chat?.parts[0]?._id}
                    onMouseEnter={() => {
                        visibleRefs.current[i].classList.remove('hidden')
                        visibleRefs.current[i].classList.add('flex')
                    }}
                    onMouseLeave={() => {
                        visibleRefs.current[i].classList.remove('flex')
                        visibleRefs.current[i].classList.add('hidden')
                    }}
                >
                    <h3 className='w-fit rounded-md break-words bg-[#34536e58] p-3 max-w-[80%] relative overflow-hidden'>
                        <div
                            ref={(el) => (visibleRefs.current[i] = el)}
                            className='hidden absolute top-0 px-3 pl-2 py-2 right-0 cursor-pointer w-fit bg-slate-900 text-slate-50' onClick={(event) => {
                                handleCopy(event, i, copySuccess, setCopySuccess)
                            }} data-content={chat?.parts[0]?.text}>
                            {
                                copySuccess[i] === true ? (
                                    <Fragment>
                                        <span className='text-[0.7rem] float-end ml-3'>Copied</span>
                                        <FaCheck className='float-end text-[0.75rem] align-middle mt-[0.1rem] ml-2' />
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <span className='text-[0.7rem] float-end ml-3'>Copy</span>
                                        <FaCopy className='float-end text-[0.75rem] align-middle mt-[0.1rem] ml-2' />
                                    </Fragment>
                                )
                            }
                        </div>
                        <span className='whitespace-pre-wrap text-sm'>
                            {applyCustomStyles(chat?.parts[0]?.text)}
                        </span>
                    </h3>
                </div >
            )
        ))
    )
}

export default Chats