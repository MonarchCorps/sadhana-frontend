import { FaSearch } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { LuListFilter } from 'react-icons/lu'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useAuth from '@/hooks/useAuth'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import toast from 'react-hot-toast'

function Earnings() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [amount, setAmount] = useState(0)

    const { data: earnings } = useQuery({
        queryKey: ['instructorEarnings'],
        queryFn: () =>
            axiosPrivate.get(`/earning/${auth?._id}`).then(res => {
                return res?.data
            })
    })

    const { isPending, mutate } = useMutation({
        mutationFn: () =>
            axiosPrivate.post('/payout', {
                instructorId: auth?._id,
                amount
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }),
        onSuccess: (response) => {
            toast.success(response.data.message)
            setAmount(0)
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    return (
        <section>
            <div className='max-w-full flex flex-col px-8'>
                <div className='w-[70%] relative py-3 mx-3'>
                    <span className='absolute top-3'>
                        <FaSearch className='rotate-90 text-xl text-[#b6b2b2] font-400' />
                    </span>
                    <input
                        type='search'
                        name=''
                        id=''
                        className='pl-7 w-full border-b border-solid border-[#d6d1d1] outline-none font-500 font-sans'
                    />
                </div>
                <div className='mt-10 mb-5 mr-5 flex justify-between md:flex-col flex-wrap md:gap-y-3'>
                    <h1 className='text-[1.59rem] font-500 asm:text-xl mr-2'>
                        <span>Earnings</span>
                        &nbsp;
                    </h1>
                    <div className='grid grid-flow-col items-center gap-7 msm:grid-flow-row msm:gap-y-5 relative'>
                        <div className='w-96 msm:w-full'>
                            <label htmlFor='search' className='sr-only'>Search</label>
                            <div className='relative h-11'>
                                <span className='absolute text-[#8b8888] text-[1.2rem] top-[0.58rem] left-3 font-300'>
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                                <input
                                    type='text'
                                    placeholder='Search'
                                    className=' pl-9 pr-4 py-1 size-full rounded-md border border-solid border-[#8b8888] outline-none font-400 text-[#292323] placeholder:font-arial placeholder:text-[0.95rem] placeholder:tracking-wide'
                                />
                            </div>
                        </div>
                        <button type='button' id='openButton' className='flex items-center justify-center text-[0.9rem] border border-solid border-current px-6 py-[0.78rem] rounded-xl text-[#efefef] font-sans font-700 hover:border-current hover:bg-slate-50 bg-[#0a0808] hover:text-[#0a0808] hmd:justify-self-end msm:justify-self-start ixsm:w-full'>
                            <span className='mr-3' id='openButton'> <LuListFilter /> </span>
                            <span id='openButton'>Filter</span>
                        </button>
                    </div>
                </div>
                <div>
                    {earnings?.length > 0 ? (
                        <div className='px-10 flex items-center gap-4'>
                            <h1 className='font-sans text-2xl font-400'>Total Earnings</h1>
                            <p className='text-xl text-green-900'>
                                #
                                {
                                    earnings?.map(earning => earning.amountPaid)?.reduce((acc, value) => {
                                        return acc += value
                                    }).toLocaleString()
                                }
                            </p>
                        </div>
                    ) : (
                        <p className='text-center mt-14'>No payments found</p>
                    )}
                </div>
                <div className='mt-5'>
                    <h1 className='text-2xl font-sans font-800 mb-3'>Request Payout</h1>
                    <input
                        type='number'
                        name='requestPayout'
                        id='requestPayout'
                        className='outline-none border border-solid rounded-md text-slate-950 font-400 px-4 py-2'
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                    <Button
                        type='button'
                        className={`block mt-5 ${isPending ? 'opacity-60' : ''}`}
                        onClick={() => mutate()}
                        disabled={isPending}
                    >
                        Request payout
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Earnings