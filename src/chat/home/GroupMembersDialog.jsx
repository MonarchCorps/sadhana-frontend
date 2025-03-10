/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Crown } from 'lucide-react'
import { IKImage } from 'imagekitio-react'
import useAuth from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const GroupMembersDialog = ({ selectedConversation }) => {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const { data: users } = useQuery({
        queryKey: ['groupMembersDialog', auth?._id],
        queryFn: () =>
            axiosPrivate.get(`/conversation/group-members/${selectedConversation?._id}`, { conversationId: selectedConversation?._id }).then((res) => {
                return res?.data
            }),
    })

    return (
        <Dialog>
            <DialogTrigger>
                <p className='text-xs text-[#64748b] text-left'>See members</p>
            </DialogTrigger>
            <DialogContent className="bg-[#0c1317] text-slate-100">
                <DialogHeader>
                    <DialogTitle className='my-2'>Current Members</DialogTitle>
                    <DialogDescription>
                        <div className='flex flex-col gap-3 '>
                            {users?.map((user) => (
                                <div key={user?._id} className={`flex gap-3 items-center p-2 rounded`}>
                                    <div className={`${user?.isOnline && 'border border-gray-900 overflow-visible relative rounded-full'}`}>
                                        {user?.isOnline && (
                                            <div className='absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-solid border-[#020817] z-50' />
                                        )}
                                        <IKImage
                                            key={user?.profileImage}
                                            urlEndpoint={"https://ik.imagekit.io/4sbkuudrb"}
                                            path={user?.profileImage}
                                            className='w-10 h-8 bg-gray-tertiary object-cover rounded-full'
                                            loading='lazy'
                                            lqip={{
                                                active: true,
                                                quality: 20
                                            }}
                                            alt={`${user?.username} image`}
                                        />
                                    </div>
                                    <div className='w-full '>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='text-md font-medium text-slate-400'>
                                                {user?.username}
                                            </h3>
                                            {user?._id === selectedConversation?.admin && <Crown size={16} className='text-yellow-400' />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
export default GroupMembersDialog;