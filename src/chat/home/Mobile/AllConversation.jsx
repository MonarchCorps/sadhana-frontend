import Loading4 from '@/components/Loaders/Loading4'
import { Input } from '@/components/ui/input'
import useAuth from '@/hooks/useAuth'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQuery } from '@tanstack/react-query'
import { ListFilter, Search } from 'lucide-react'
import Conversation from '../Conversation'

function AllConversation() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const { data: conversations, isPending } = useQuery({
        queryKey: ['fetchConversations', auth?._id],
        queryFn: () =>
            axiosPrivate.get(`/conversation/${auth?._id}`).then((res) => res?.data),
        enabled: !!auth?._id,
    })

    return (
        <div className='hidden chsm:block'>
            <h1 className="p-2 bg-[#141514] text-slate-50 font-500 text-xl">Chats</h1>
            <div className='min-h-[70vh] max-h-[70vh] overflow-scroll'>
                <div className="flex items-center">
                    <div className="relative h-10 m-2 flex-1">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
                            size={18}
                        />
                        <Input
                            type="text"
                            placeholder="Search or start a new chat"
                            className="pl-10 py-2 text-sm w-full rounded shadow-sm bg-[#f0f2f5] focus-visible:ring-transparent"
                        />
                    </div>
                    <ListFilter className="cursor-pointer text-base mx-2" />
                </div>
                {isPending ? (
                    <div className="size-full grid place-content-center text-center h-[80vh]">
                        <Loading4 size={30} bgColor="#000" />
                    </div>
                ) : (
                    conversations?.map((conversation) => (
                        <Conversation key={conversation?._id} conversation={conversation} />
                    ))
                )}
                {conversations?.length === 0 && (
                    <>
                        <p className="text-center text-gray-500 text-sm mt-3">No conversations yet</p>
                        <p className="text-center text-gray-500 text-sm mt-3 ">
                            We understand you&aposre an introvert, but you&aposve got to start somewhere 😊
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default AllConversation