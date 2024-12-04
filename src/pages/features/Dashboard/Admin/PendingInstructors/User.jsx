/* eslint-disable react/prop-types */
import trim from '../../../../../utils/trim'
import { IKImage } from 'imagekitio-react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { formatDate } from '@/chat/lib/utils'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'

function User({ user, handleApproval, index }) {

    const { screenWidth } = useGetScreenWidth()

    return (
        <AccordionItem value={user?._id} className='border-b-0' key={user?._id}>
            <AccordionTrigger className={`w-screen grid grid-cols-12 pmd:grid-cols-9 md:grid-cols-5 ixsm:grid-cols-1 items-center px-6 pt-[0.9rem] pb-4 imd:px-2 border-b border-solid border-[#d2d1d1c8] accordionWrapper ${screenWidth <= 973 ? 'cursor-pointer' : 'cursor-default'}`} style={{ textDecoration: 'none', userSelect: 'text' }}>
                <div className='text-start flex items-center ml-4 col-span-5 pmd:col-span-4 ixsm:col-span-full'>
                    <div className='mr-3'>
                        {index + 1}
                    </div>
                    <div className='w-12 h-12'>
                        <IKImage
                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                            path={user?.profileImage}
                            className='size-full rounded-full object-cover'
                            loading='lazy'
                            lqip={{
                                active: true,
                                quality: 20
                            }}
                            alt={`${user?.username} image`}
                        />
                    </div>
                    <div>
                        <span className='font-500 text-base ml-3 tracking-tight align-text-top mb-1 block esm:text-sm esm:font-700' title={user?.username}>
                            {trim(user?.username, 50)}
                        </span>
                        <span className='font-400 text-base ml-3 tracking-tight align-text-top esm:text-sm break-words asm:text-xs' title={user?.email}>
                            {trim(user?.email, 22)}
                        </span>
                    </div>
                </div>
                <div className='text-center md:text-end md:mr-3 ixsm:hidden'>
                    <span className='font-500 text-base tracking-tight align-text-top'>
                        <span className='border border-solid border-[#85440bf2] bg-[#85440b31] text-[#85440bf2] px-4 mr-1 rounded-2xl'>
                            <span className='text-[0.8rem] align-text-top'>
                                {user?.status}
                            </span>
                        </span>
                    </span>
                </div>
                <div className='text-center col-span-2 pmd:hidden'>
                    <span className='font-500 tracking-tight text-start text-sm'>
                        {user?.dateApplied && formatDate(user?.dateApplied)}
                    </span>
                </div>
                <div className='text-center col-span-4 pmd:text-end md:text-start md:mt-6 md:flex md:flex-wrap md:gap-1'>
                    <span className='font-800 text-base hidden md:inline-block asm:text-sm'>Details: &nbsp;</span>
                    <button
                        type='button'
                        className='w-fit mr-1'
                        onClick={() => handleApproval.mutate({ id: user?._id, action: 'approve' })}
                    >
                        <span className='text-[0.8rem] bg-[#0c2f0d] text-slate-200 rounded-xl py-1 px-4 asm:text-xs'>Approve </span>
                    </button>
                    <button
                        type='button'
                        className='w-fit mr-1'
                        onClick={() => handleApproval.mutate({ id: user?._id, action: 'denied' })}
                    >
                        <span className='text-[0.8rem] bg-[#4a1614] text-slate-200 rounded-xl py-1 px-4 asm:text-xs'>Deny </span>
                    </button>
                    <button
                        type='button'>
                        <span className='text-[0.8rem] bg-[#152768] text-slate-200 rounded-xl py-1 px-4 asm:text-xs'>Feedback </span>
                    </button>
                </div>
                <div>
                    <span className='flex justify-end'>
                    </span>
                </div>
                {screenWidth <= 973 && (
                    <div className='col-span-full'>
                        <AccordionContent className='flex gap-3 mt-1 pt-4 pb-1 amd:justify-between esm:flex-col esm:items-start esm:gap-0 esm:pt-2 mr-2'>
                            <p className='hidden pmd:block text-start'>
                                <span className='esm:inline-block text-sm  font-bold'>Applied on: &nbsp;</span>
                                <span> {user?.dateApplied && formatDate(user?.dateApplied)}</span>
                            </p>
                            <p className='hidden ixsm:block text-start mt-1'>
                                <span className='esm:inline-block text-sm font-bold'>Status: &nbsp;</span>
                                <span className=' border-[#85440bf2] bg-[#85440b31] text-[#85440bf2] px-4 rounded-2xl'>{user?.status}</span>
                            </p>
                        </AccordionContent>
                    </div>
                )}
            </AccordionTrigger>
        </AccordionItem>
    )
}

export default User