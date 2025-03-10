import { useEffect, useRef, useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ImageIcon, MessageSquareDiff } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { IKImage } from "imagekitio-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Loading4 from "@/components/Loaders/Loading4"
import useAuth from "@/hooks/useAuth"
import UploadImageKitImg from "@/components/UploadImageKit/UploadImageKitImg"
import { FaInfoCircle } from "react-icons/fa"
import toast from "react-hot-toast"
import { useConversationStore } from "../store/chatStore"
import { ModalContent } from "@/components/Modals/ImageModal"

const UserListDialog = () => {

    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    const queryClient = useQueryClient()

    const [selectedUsers, setSelectedUsers] = useState([])
    const [groupName, setGroupName] = useState("")
    const [preview, setPreview] = useState(null)
    const [img, setImg] = useState({
        isLoading: false,
        error: '',
        dbData: {}
    })
    const ikUploadRef = useRef(null)
    const dialogCloseRef = useRef(null)

    const { setSelectedConversation } = useConversationStore()

    const { isLoading: userLoading, data: allChatUsers } = useQuery({
        queryKey: ['allChatUsers'],
        queryFn: () =>
            axiosPrivate.get('/chat/all-users').then((res) => {
                return res?.data
            }),
    })

    useEffect(() => {
        if (selectedUsers?.length <= 1) {
            setPreview('')
            setImg({
                isLoading: false,
                error: '',
                dbData: {}
            })
        }
    }, [selectedUsers])

    const handleCreateConversation = useMutation({
        mutationFn: () => {
            const isGroup = selectedUsers?.length > 1
            if (!isGroup) {
                return axiosPrivate.post(`/conversation/${auth?._id}`, {
                    participants: [...selectedUsers, auth?._id],
                    isGroup: false,
                })
            } else {
                return axiosPrivate.post(`/conversation/${auth?._id}`, {
                    participants: [...selectedUsers, auth?._id],
                    isGroup: true,
                    groupName,
                    groupImage: img.dbData?.filePath,
                    admin: auth?._id
                })
            }
        },
        onSuccess: async (response) => {
            const createdConversationId = response.data
            queryClient.invalidateQueries({ queryKey: ["fetchConversations", auth?._id] })
            dialogCloseRef.current?.click()

            if (createdConversationId) {
                try {
                    const { data } = await axiosPrivate.get(`/conversation/${auth?._id}`);
                    const newConversation = data.find(conversation => conversation?._id === createdConversationId)
                    setSelectedConversation({ conversation: newConversation, type: 'chat' })
                } catch (error) {
                    console.error("Failed to fetch the new conversation:", error);
                }
            }

            setSelectedUsers([]);
            setGroupName('')
        },
        onError: (error) => {
            console.log(error)
            toast.error('Network error')
        }
    })

    return (
        <Dialog>
            <DialogTrigger>
                <MessageSquareDiff size={20} />
            </DialogTrigger>
            <DialogContent className="bg-[#0c1317] text-slate-100">
                <DialogHeader>
                    <DialogClose ref={dialogCloseRef} />
                    <DialogTitle>USERS</DialogTitle>
                </DialogHeader>

                <DialogDescription>Start a new chat</DialogDescription>
                {preview && (
                    <div className="w-full grid place-items-center">
                        <div className='relative w-fit'>
                            <Dialog>
                                <DialogTrigger asChild >
                                    <img src={preview} alt="preview" className='cursor-pointer w-[70px] object-cover h-[70px] rounded-md' />
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[90%] bg-transparent outline-none border-none">
                                    <DialogTitle className='sr-only'>Preview</DialogTitle>
                                    <ModalContent preview={preview} />
                                </DialogContent>
                            </Dialog>
                            {img?.isLoading && !img?.error ? (
                                <div className='absolute size-full top-0 left-0 grid place-items-center bg-[#49444452] rounded-md'>
                                    <Loading4 size={30} bgColor='#000' />
                                </div>
                            ) : !img?.isLoading && img?.error && (
                                <div className='absolute size-full top-0 left-0 grid place-items-center bg-[#940f0f28] rounded-md'>
                                    <span className='w-7 h-7 bg-black grid place-items-center rounded-full overflow-hidden'>
                                        <FaInfoCircle className='text-red-800 text-2xl bg-white rounded-xl' />
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {selectedUsers?.length > 1 && (
                    <>
                        <Input
                            placeholder='Group Name'
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="text-slate-950 font-sans font-500"
                        />
                        <UploadImageKitImg img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef}>
                            <Button className='flex gap-2' onClick={() => ikUploadRef.current.click()} disabled={img.isLoading}>
                                <ImageIcon size={20} />
                                Group Image
                            </Button>
                        </UploadImageKitImg>
                    </>
                )}
                <div className='flex flex-col gap-3 overflow-auto max-h-60'>
                    {userLoading ? (
                        <div className='w-full grid place-items-center'>
                            <Loading4 size={50} bgColor='#000' />
                        </div>
                    ) : allChatUsers?.filter(user => user?._id !== auth?._id)?.map((user) => (
                        <div
                            key={user?._id}
                            className={`flex gap-3 items-center p-2 rounded cursor-pointer active:scale-95 
								transition-all ease-in-out duration-300
							${selectedUsers.includes(user._id) ? "bg-[#00a884]" : ""}`}
                            onClick={() => {
                                if (selectedUsers.includes(user?._id)) {
                                    setSelectedUsers(selectedUsers.filter((id) => id !== user?._id))
                                } else {
                                    setSelectedUsers([...selectedUsers, user?._id])
                                }
                            }}
                        >
                            <IKImage
                                key={user?.profileImage}
                                urlEndpoint={"https://ik.imagekit.io/4sbkuudrb"}
                                path={user?.profileImage}
                                className='w-10 h-10 rounded-full object-cover'
                                loading='lazy'
                                lqip={{
                                    active: true,
                                    quality: 20
                                }}
                                alt={`${user?.username} image`}
                            />

                            <div className='w-full '>
                                <div className='flex items-center justify-between'>
                                    <p className='text-md font-medium'>{user?.username}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <Button onClick={() => dialogCloseRef.current?.click()}>Cancel</Button>
                    <Button
                        variant='secondary'
                        onClick={() => handleCreateConversation.mutate()}
                        disabled={selectedUsers.length === 0 || (selectedUsers.length > 1 && !groupName) || handleCreateConversation.isPending || img.isLoading || img.error || (selectedUsers.length > 1 && !img.dbData?.filePath)}
                    >
                        {handleCreateConversation.isPending ? (
                            <div className='w-5 h-5 border-t-2 border-b-2 rounded-full animate-spin' />
                        ) : (
                            "Create"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserListDialog