import useAuth from '@/hooks/useAuth'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { useEffect, useState, useRef } from 'react'
import { useConversationStore } from '@/chat/store/chatStore'
import toast from 'react-hot-toast'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ModalContent } from '@/components/Modals/ImageModal'
import Loading4 from '@/components/Loaders/Loading4'
import { FaInfoCircle } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import UploadImageKitImg from '@/components/UploadImageKit/UploadImageKitImg'
import { Button } from '@/components/ui/button'
import { ImageIcon } from 'lucide-react'
import { IKImage } from 'imagekitio-react'

function Users() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    const { setSelectedConversation } = useConversationStore()

    const ikUploadRef = useRef(null)

    const [selectedUsers, setSelectedUsers] = useState([])

    const [groupName, setGroupName] = useState("")
    const [preview, setPreview] = useState(null)
    const [img, setImg] = useState({
        isLoading: false,
        error: '',
        dbData: {}
    })

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
        <div className='hidden chsm:block'>
            <h1 className="p-2 bg-[#141514] text-slate-50 font-500 text-xl">Users</h1>
            <div className='min-h-[70vh] max-h-[70vh] overflow-scroll'>
                {preview && (
                    <div className="w-full grid place-items-center mt-4">
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
                            className="text-slate-950 font-sans font-500 w-[95%] rounded mx-auto border-2 border-slate-900 my-4"
                        />
                        <UploadImageKitImg img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef}>
                            <Button className='flex gap-2 my-3 w-[95%] rounded-none mx-auto' onClick={() => ikUploadRef.current.click()} disabled={img.isLoading}>
                                <ImageIcon size={20} />
                                Group Image
                            </Button>
                        </UploadImageKitImg>
                    </>
                )}
                {allChatUsers?.map(user => {
                    return (
                        <div
                            key={user?._id}
                            className={`flex w-full mb-2 gap-3 items-center p-2 cursor-pointer active:scale-95 
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
                    )
                })}
            </div>
            <div className='flex justify-between fixed bottom-20 left-8 right-8'>
                <Button onClick={() => setSelectedUsers([])}>Cancel</Button>
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
        </div>
    )
}

export default Users