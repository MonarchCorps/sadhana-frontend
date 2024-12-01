/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { FaRegCommentDots } from 'react-icons/fa6'

import useScrollTop from '../hooks/useScrollTop'
import { IKImage } from 'imagekitio-react'

function Trainer({ trainer }) {

    const { scrollTop } = useScrollTop();

    return (
        <div className='border border-solid border-[#bcbcbc] p-3 rounded-md'>
            <div className='flex gap-6 items-center'>
                <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={trainer?.profileImage}
                    className='w-[3.2rem] h-[3.2rem] rounded-md object-cover'
                    loading='lazy'
                    lqip={{
                        active: true,
                        quality: 20
                    }}
                    alt={`${trainer?.username} image`} />
                <div>
                    <h1 className="font-500 text-base tracking-tight text-[#55765C]">
                        {trainer?.username}
                    </h1>
                    <div className='grid grid-flow-col place-items-center'>
                        <p className='text-sm text-[#181616c4]'>Yoga Expert</p>
                        <span className='flex text-[0.7rem] ml-3 gap-1 text-[#181616c4] items-center'>
                            <span><FaUserAlt /></span> <span className='align-middle -mb-[1px]'>40</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className='mt-6 flex justify-between items-center'>
                <Link to={`/dashboard/admin-cp/user/profile/${trainer?.userId}`} className='border-[#3a6043] border-solid border text-[#3a6043] px-3 py-2 rounded-md w-4/5 text-center transition-all hover:text-slate-50 hover:bg-[#3a6043]' onClick={scrollTop}>
                    See Profile
                </Link>
                <span className='text-[1.35rem] border border-solid p-2 rounded-md bg-[#b1dbbba6] text-[#659771ba] cursor-pointer'>
                    <Link to='/chat'>
                        <FaRegCommentDots />
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default Trainer