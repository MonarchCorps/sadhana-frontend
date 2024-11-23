import { useEffect, useState } from 'react'
import BotButton from './BotButton'
import Header from './Header'
import NewPrompt from './NewPrompt'
import Content from './Content'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import Loading from '../Loaders/Loading'
import useHideScroll from '../../hooks/useHideScroll'
import IllustrationAnimation1 from '../../components/IllustrationAnimations/Illustration1/IllustrationAnimation1'
import CurvedArrow from '../IllustrationAnimations/CurvedArrow/CurvedArrow'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function BotChat() {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient()

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(!open);

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isGenerating, setIsGenerating] = useState(false)
    const [chats, setChats] = useState([]);
    const [errMsg, setErrMsg] = useState('')
        ;
    // This isMounted is for the questions
    const [isMounted, setIsMounted] = useState(true)
    const [illIsMounted, setIllIsMounted] = useState(true);
    const [dataERR, setDataERR] = useState('')

    const [preview, setPreview] = useState(null);

    const [img, setImg] = useState({
        isLoading: false,
        error: '',
        dbData: {},
        aiData: {}
    });

    const { isLoading, data, error: dataErrMsg } = useQuery({
        queryKey: ['botChats'],
        queryFn: () =>
            axiosPrivate.get(`/bot/chat/${auth?._id}`).then((res) => {
                return res?.data
            }),
    })
    useEffect(() => {
        setChats(data)
    }, [data])

    useEffect(() => {
        setDataERR(dataErrMsg)
    }, [dataErrMsg])

    useEffect(() => {
        setDataERR('')
    }, [question])

    useEffect(() => {
        if (!open) {
            setErrMsg('')
            setAnswer('')
            setQuestion('')
            setPreview(null)
            setIsGenerating(false)
            setIllIsMounted(false)
            setImg({
                isLoading: false,
                error: '',
                dbData: {},
                aiData: {}
            })
        }
    }, [open])

    const handleDeleteBotChat = useMutation({
        mutationFn: () => {
            return axiosPrivate.delete(`/bot/chat/${auth?._id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["botChats"] })
            toast.success('Deleted successfully')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to delete';
            toast.error(error.response ? errorMessage : 'No server response');
        },
    })

    useHideScroll(handleDeleteBotChat.isPending)

    return (
        <>
            <Loading isLoading={handleDeleteBotChat.isPending} />
            {
                open && illIsMounted && (
                    <>
                        <IllustrationAnimation1 />
                        <CurvedArrow color='#a45638' />
                    </>
                )
            }
            {
                !open && (
                    <div className='shadow-lg bg-[#fcfcfc] rounded-md w-[26rem] flex flex-col overflow-hidden max-h-[85vh]'>
                        <Header handleOpen={handleOpen} handleDeleteBotChat={handleDeleteBotChat} />

                        <Content question={question} answer={answer} chats={chats} isGenerating={isGenerating} errMsg={errMsg} isMounted={isMounted} isLoading={isLoading} dataERR={dataERR} preview={preview} img={img} />

                        <NewPrompt setQuestion={setQuestion} setAnswer={setAnswer} isGenerating={isGenerating} setIsGenerating={setIsGenerating}
                            setErrMsg={setErrMsg} errMsg={errMsg} question={question} isMounted={isMounted} setIsMounted={setIsMounted}
                            isLoading={isLoading} preview={preview} setPreview={setPreview} setImg={setImg} img={img} setChats={setChats} />
                    </div>
                )
            }
            <div className='fixed bottom-5 right-10 z-[1500]'>
                <BotButton handleOpen={handleOpen} />
            </div>
        </>
    )
}

export default BotChat