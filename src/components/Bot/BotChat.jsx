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
        setDataERR(dataErrMsg?.message)
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
                    <div className='fixed bottom-28 right-20 ahsm:right-32'>
                        <IllustrationAnimation1 />
                        <CurvedArrow color='#a45638' />
                    </div>
                )
            }
            {!open && (
                <div className='fixed w-1/3 h-4/5 chsm:w-screen chsm:max-w-full chsm:top-0 chsm:bottom-0 chsm:h-full chsm:right-0 chsm:z-20 flex flex-col max-w-[26rem] max-h-[45rem] chsm:max-h-full  min-w-[24rem] bottom-[4rem] right-3 bg-slate-50 rounded-xl shadow-shadow backdrop-blur animate-scale-in-br transition-all duration-300'>
                    <Header handleOpen={handleOpen} handleDeleteBotChat={handleDeleteBotChat} />

                    <Content question={question} answer={answer} chats={chats} isGenerating={isGenerating} errMsg={errMsg} isMounted={isMounted} isLoading={isLoading} dataERR={dataERR} preview={preview} img={img} />

                    <NewPrompt setQuestion={setQuestion} setAnswer={setAnswer} isGenerating={isGenerating} setIsGenerating={setIsGenerating}
                        setErrMsg={setErrMsg} errMsg={errMsg} question={question} isMounted={isMounted} setIsMounted={setIsMounted}
                        isLoading={isLoading} preview={preview} setPreview={setPreview} setImg={setImg} img={img} setChats={setChats} />
                </div>
            )}
            <div className='fixed bottom-5 right-4 z-10'> <BotButton handleOpen={handleOpen} open={open} /></div>
        </>
    )
}

export default BotChat