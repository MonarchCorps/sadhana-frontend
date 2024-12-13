/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import Chats from './Chats'
import Loading2 from '../Loaders/Loading2'
import { IKImage } from 'imagekitio-react'
import HardCodedContent from './HardCodedContent'
import applyCustomStyles from '../../utils/applyCustomStyles'

function Content({ question, answer, chats, isGenerating, errMsg, isMounted, isLoading, dataERR, preview, img }) {
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [question, answer, errMsg, isLoading, dataERR, isMounted, chats]);

    return (
        <div className='flex-grow mb-2 axsm:mx-3 asm:pr-1 asm:mr-1 mt-20 p-6 pb-0 overflow-scroll'>
            <HardCodedContent />
            <div className='mt-8 mb-4'>
                <Loading2 isLoading={isLoading} data='user chats' />
            </div>
            {chats?.history && (<Chats chats={chats} />)}
            <>
                {question && preview && (
                    <div className='mb-2'>
                        <div className='w-full grid justify-items-end'>
                            <div className='max-w-[70%] ahsm:max-w-[75%] asm:max-w-[85%]'>
                                <IKImage
                                    urlEndpoint={"https://ik.imagekit.io/4sbkuudrb"}
                                    path={img.dbData?.filePath}
                                    className='w-80 h-80 rounded-md object-cover'
                                    loading='lazy'
                                    lqip={{
                                        active: true,
                                        quality: 20
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {question && (
                    <div className='w-full grid justify-items-end mb-4' >
                        <h3 className='w-fit rounded-md break-words bg-[#f2f2f2] p-3 max-w-[70%] ahsm:max-w-[75%] asm:max-w-[85%]'>
                            <span className='whitespace-pre-wrap text-sm'>
                                {question}
                            </span>
                        </h3>
                    </div>
                )}
                {answer && (
                    <div className='w-full grid justify-items-start mb-4'>
                        <h3 className='w-fit rounded-md break-words bg-[#34536e58] p-3 max-w-[80%] ahsm:max-w-[88%] asm:max-w-[95%] relative overflow-hidden flex flex-col'>
                            <span className={`whitespace-pre-wrap text-sm ${isGenerating && ' mb-3'}`}>
                                {applyCustomStyles(answer)}
                            </span>
                            {
                                isGenerating && (
                                    <div className='w-full px-6 grid items-center justify-end'>
                                        <div className='w-12  isGenerating-loader self-end'></div>
                                    </div>
                                )
                            }
                        </h3>
                    </div>
                )}
            </>
            {!isLoading && (errMsg || dataERR) && (
                <div className='bg-red-300 border border-solid border-red-600 text-red-800 p-3 rounded-xl leading-[1.2]'>
                    <span>{errMsg || dataERR}</span>
                </div>
            )}
            {!isGenerating && !errMsg && !question && !answer && isMounted && !preview && (<div className='p-10'></div>)}
            <div ref={endRef}></div>
        </div>
    )
}

export default Content