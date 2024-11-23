/* eslint-disable react/prop-types */
import { format } from 'date-fns'
import trim from '../../../../../utils/trim'
import { IKImage } from 'imagekitio-react'

function User({ user, handleApproval, index }) {
    return (
        <div className='grid grid-cols-[auto_0.7fr_0.3fr_0.3fr_0.6fr_50px] items-center px-6 pt-[0.9rem] pb-4 border-b border-solid border-[#d2d1d1c8]'>
            <div className='mr-3'>
                {index + 1}
            </div>
            <div className='text-start flex items-center ml-4'>
                <div>
                    <IKImage
                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                        path={user?.profileImage}
                        className='w-12 h-12 rounded-full object-cover'
                        loading='lazy'
                        lqip={{
                            active: true,
                            quality: 20
                        }}
                        alt={`${user?.username} image`}
                    />
                </div>
                <div>
                    <span className='font-500 text-base ml-3 tracking-tight align-text-top mb-1 block' title={user?.username}>
                        {trim(user?.username, 100)}
                    </span>
                    <span className='font-400 text-base ml-3 tracking-tight align-text-top -mb-1' title={user?.email}>
                        {trim(user?.email, 100)}
                    </span>
                </div>
            </div>
            <div className='text-center'>
                <span className='font-500 text-base tracking-tight align-text-top -mb-1'>
                    <span className='border border-solid border-[#85440bf2] bg-[#85440b31] text-[#85440bf2] px-4 mr-1 rounded-2xl'>
                        <span className='text-[0.8rem] align-text-top'>
                            {user?.status}
                        </span>
                    </span>
                </span>
            </div>
            <div className='text-center'>
                <span className='font-500 tracking-tight text-start -mb-1 text-sm'>
                    {format(user?.dateApplied, 'MMM, dd yyyy')}
                </span>
            </div>
            <div className='text-end'>
                <span className='font-500 text-sm tracking-tight align-text-top -mb-'>
                    <button
                        type='button'
                        className='mr-2 bg-[#0c2f0d] text-slate-200 rounded-xl text-sm px-3 py-1'
                        onClick={() => handleApproval.mutate({ id: user?._id, action: 'approve' })}
                    >
                        Approve
                    </button>
                    <button
                        type='button'
                        className='mr-2 bg-[#4a1614] text-slate-200 rounded-xl text-sm px-3 py-1'
                        onClick={() => handleApproval.mutate({ id: user?._id, action: 'denied' })}
                    >
                        Deny
                    </button>
                    <button
                        type='button'
                        className='bg-[#152768] text-slate-200 rounded-xl text-sm px-3 py-1'
                    >
                        Feedback
                    </button>
                </span>
            </div>
            <div>
                <span className='flex justify-end'>
                </span>
            </div>
        </div>
    )
}

export default User