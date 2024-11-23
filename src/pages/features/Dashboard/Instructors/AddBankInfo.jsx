import useAuth from '../../../../hooks/useAuth'
import { Fragment, useState } from 'react'
import Select from 'react-select'
import Loading from '../../../../components/Loaders/Loading'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

const AddBankInfo = () => {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate()

    const [accountBank, setAccountBank] = useState('')
    const [accountNumber, setAccountNumber] = useState('')

    const navigate = useNavigate()

    const handleCreate = useMutation({
        mutationFn: () => {
            if (accountNumber.length < 10) {
                return toast.error('Minimum of 10 chars')
            }
            return axiosPrivate.post('/create-instructor-account', {
                accountBank: accountBank,
                accountNumber: accountNumber,
                id: auth?._id
            })
        },
        onSuccess: () => {
            setAccountNumber('')
            setAccountBank('')
            navigate('/dashboard/instructor-cp')
            toast.success('Created successfully')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to create';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    const options = handleCreate.data?.map(bank => {
        return {
            value: bank?.name,
            label: bank?.name,
            code: bank?.code
        }
    })

    const handleAccountNumberChange = (e) => {
        const value = e.target.value
        if (/^\d*$/.test(value) && value.length <= 10) {
            setAccountNumber(value)
        }
    }

    return (
        <Fragment>
            <Loading isLoading={handleCreate.isPending} />
            <section>
                <div className='max-w-[90%] mx-auto pt-20 pb-10'>
                    <h1 className='text-[1.7rem] mb-4 font-500 font-sans text-center'>
                        Hello<span className='text-[#27554a]'> {auth?.username || 'Instructor'}</span>, quickly  add your bank details
                    </h1>
                    <form className='grid grid-flow-row gap-6 place-items-center w-full max-w-[60%] mx-auto' onSubmit={handleCreate.mutate()}>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="username" className='text-sm mb-2 font-500'>Username</label>
                            <input
                                type="text"
                                name='username'
                                id='username'
                                value={auth?.username}
                                readOnly
                                className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full bg-[#d4e9fc82] outline-none cursor-default'
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="email" className='text-sm mb-2 font-500'>Email</label>
                            <input
                                type="text"
                                name='email'
                                id='email'
                                value={auth?.email}
                                readOnly
                                className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full bg-[#d4e9fc82] outline-none cursor-default'
                            />
                        </div>
                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="accountBank" className='text-sm mb-2 font-500'>Account bank</label>
                            <Select
                                id="accountBank"
                                value={accountBank}
                                className='mt-1'
                                required
                                isMulti={false}
                                options={options}
                                onChange={(e) => setAccountBank(e)}
                                closeMenuOnSelect={false}
                                isLoading={handleCreate.isPending}
                            />
                        </div>
                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="accountNumber" className='text-sm mb-2 font-500'>Account Number</label>
                            <input
                                type="text"
                                name='accountNumber'
                                id='accountNumber'
                                onChange={handleAccountNumberChange}
                                value={accountNumber}
                                className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                                required
                            />
                        </div>
                        <div className='w-full'>
                            <button
                                type="submit"
                                className='text-[#f2f2f2] text-sm bg-[#1b1b1b] h-12 w-full rounded-[10px] shadow-sm shadow-[#241a1a] font-500 disabled:cursor-not-allowed'
                            >
                                Submit
                            </button>
                        </div>
                    </form >
                </div>
            </section>
        </Fragment>
    )
}

export default AddBankInfo