import { useQuery } from '@tanstack/react-query'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import axios from '@/api/axios'
import { IKImage } from 'imagekitio-react'

function TrainersList() {

    const { data: trainers = [] } = useQuery({
        queryKey: ['homeAllInstructors'],
        queryFn: () =>
            axios.get('/public/instructor').then((res) => {
                return Array.isArray(res?.data) ? res.data : [];
            }),
    })

    return (
        <>
            {
                trainers?.slice(0, 3)?.map(trainer => {
                    return (
                        <div key={trainer?._id} className='shadow-shadow rounded-xl overflow-hidden'>
                            <div className='relative'>
                                <IKImage
                                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                    path={trainer?.profileImage}
                                    className='h-[20rem] w-full object-cover'
                                    loading='lazy'
                                    lqip={{
                                        active: true,
                                        quality: 20
                                    }}
                                    alt={`${trainer?.username} image`}
                                />
                                <div className='absolute flex sm:grid sm:grid-cols-2 bottom-6 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-4'>
                                    <span className='text-[#e5759a] bg-slate-50 w-10 h-10 rounded-full grid place-items-center text-sm cursor-pointer'>
                                        <FaFacebookF />
                                    </span>
                                    <span className='text-[#e5759a] bg-slate-50 w-10 h-10 rounded-full grid place-items-center text-sm cursor-pointer'>
                                        <FaInstagram />
                                    </span>
                                    <span className='text-[#e5759a] bg-slate-50 w-10 h-10 rounded-full grid place-items-center text-sm cursor-pointer sm:col-span-2 sm:text-center'>
                                        <FaLinkedinIn />
                                    </span>
                                </div>
                            </div>
                            <div className='p-6 text-center'>
                                <h1 className='text-[#927397] text-xl tracking-wide mb-1 sm:text-base'>{trainer?.username}</h1>
                                <h1 className='text-[#927397] tracking-wide mb-1 hidden tmd:block text-xs break-words'>{trainer?.email}</h1>
                                <p className='text-[#3a3939] text-[15px] sm:text-sm'>Yoga Trainer</p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default TrainersList