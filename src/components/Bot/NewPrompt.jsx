/* eslint-disable react/prop-types */
import { FiSend } from 'react-icons/fi'
import { useRef, useState } from 'react'
import model from '../../lib/gemini'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import Loading4 from '../Loaders/Loading4'
import { ModalContent } from '../Modals/ImageModal'
import Question from './Question'
import UploadImageKitImg from '../UploadImageKit/UploadImageKitImg'
import { FaFileImport } from 'react-icons/fa'

function NewPrompt({
    setQuestion, setAnswer, isGenerating, setIsGenerating,
    setErrMsg, errMsg, question, isMounted, setIsMounted,
    isLoading, preview, setPreview, setImg, img, setChats
}) {

    const [isOpen, setIsOpen] = useState(false);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const ikUploadRef = useRef()

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{
                    text: "Hello"
                }]
            }, {
                role: "model",
                parts: [{
                    text: "Greetings!"
                }]
            }
        ],
        generationConfig: {
            maxOutputTokens: 80,
            temperature: 0.7,
            topP: 0.9
        }
    })


    const handlePostChat = async (answer, question) => {

        const controller = new AbortController();
        try {
            await axiosPrivate.put(`/bot/chat/${auth?._id}`, {
                question: question,
                answer: answer,
                img: img.dbData?.filePath || null
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            let hasAdded = true
            if (hasAdded) {
                try {
                    const response = await axiosPrivate.get(`/bot/chat/${auth?._id}`, {
                        signal: controller.signal
                    });
                    setChats(response.data)
                } catch (error) {
                    console.log(error)
                } finally {
                    hasAdded = false
                }
            }
        } catch (error) {
            setErrMsg('Error updating chat!')
            console.log(error)
        }
        setQuestion('')
        setAnswer('')
        setImg({
            isLoading: false,
            error: '',
            dbData: {},
            aiData: {}
        });
        setPreview(null)

    }

    const add = async (text) => {
        setErrMsg('')
        setQuestion(text);
        setIsGenerating(true);
        setIsMounted(false)
        try {
            const result = await chat.sendMessageStream(
                Object.entries(img.aiData).length ? [img.aiData, text] : [text]
            )
            let accumulatedText = '';
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                accumulatedText += chunkText
                setAnswer(accumulatedText);
            }
            if (!isGenerating) {
                await handlePostChat(accumulatedText, text)
            }
        } catch (error) {
            setErrMsg('Error generating a response. Please try again later or reload page!')
            console.error('Failed to get response:', error);
        } finally {
            setIsGenerating(false);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let text = e.target.chatInput.value
        if (!text || text === '') return;
        add(text)
        e.target.chatInput.value = ''
    }

    return (
        <>
            {
                errMsg && (
                    <div className='w-full mb-3 mt-2 text-center'>
                        <button
                            className='border border-solid border-slate-950 bg-slate-950 text-slate-50 w-fit p-3 text-sm rounded-xl'
                            onClick={() => add(question)}
                        >
                            <span>Regenerate</span>
                        </button>
                    </div>
                )
            }
            <Question isMounted={isMounted} errMsg={errMsg} preview={preview} isLoading={isLoading} setIsMounted={setIsMounted} setIsGenerating={setIsGenerating} add={add} />
            {
                !errMsg && (
                    <form className='flex items-end gap-1 p-3' onSubmit={handleSubmit}>
                        <UploadImageKitImg img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef} >
                            <label className={`${img?.isLoading ? 'cursor-default' : 'cursor-pointer'}`} onClick={() => ikUploadRef.current.click()}>
                                <div className='border border-solid px-4 py-3 rounded'>
                                    <FaFileImport />
                                </div>
                            </label>
                        </UploadImageKitImg>
                        <div className='w-full flex flex-col border border-solid border-[#eee] bg-white'>
                            {
                                preview && !isGenerating && (
                                    <div className='px-3 py-2'>
                                        <div className='w-fit relative'>
                                            <img src={preview} alt="Preview" className='w-14 h-14 rounded-md object-cover cursor-pointer' onClick={() => {
                                                setIsOpen(!isOpen)
                                            }} />
                                            <ModalContent isOpen={isOpen} onClose={() => setIsOpen(false)} preview={preview} />
                                            {
                                                img?.isLoading && (
                                                    <div className='absolute  size-full top-0 left-0 grid place-items-center bg-[#49444452] rounded-md'>
                                                        <Loading4 size={20} />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                )
                            }
                            <textarea
                                id="chatInput"
                                name="chatInput"
                                className="w-full px-4 py-2 rounded-md resize-none text-[1rem] align-middle focus:outline-none"
                                placeholder="Ask a question..." rows="1" maxLength="200" />
                        </div>
                        {
                            isGenerating || img?.isLoading ? (
                                <button
                                    type='button'
                                    disabled
                                    className='border border-solid border-[#eee] py-3 px-4 rounded-md bg-[#ece7e7] text-slate-950'
                                >
                                    <FiSend />
                                </button>
                            ) : (
                                <button
                                    type='submit'
                                    disabled={isLoading || img?.isLoading}
                                    className='border border-solid border-[#eee] py-3 px-4 rounded-md bg-slate-950 text-slate-50 transition-all hover:bg-slate-50 hover:text-slate-950'
                                >
                                    <FiSend />
                                </button>
                            )
                        }
                    </form>
                )
            }
        </>
    )

}

export default NewPrompt
