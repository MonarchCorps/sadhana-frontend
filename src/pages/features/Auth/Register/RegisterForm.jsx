/* eslint-disable react/prop-types */
import { Fragment, useRef, useState } from 'react';
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash, FaInfoCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Loading4 from '../../../../components/Loaders/Loading4';
import SubmitButton from '../../../../components/SubmitButton/SubmitButton';
import UploadImageKitImg from '../../../../components/UploadImageKit/UploadImageKitImg';

function RegisterForm({ isPending, handleSubmit, step, setStep, setFormData, formData, img, setImg, preview, setPreview }) {

    const ikUploadRef = useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const navigate = useNavigate()
    const [deploying, setDeploying] = useState(false)
    const [open, setOpen] = useState(false)

    const submitValid = formData.password && formData.gender && formData.profileImage && !img.error && !isPending
    const deployValid = formData.username && formData.email && formData.phoneNumber && !deploying

    const queryParams = new URLSearchParams(location.search).get('redirectUrl')

    const deploySubmit = (e) => {
        e.preventDefault()
        if (!formData.email.includes('@') || formData.email.length < 6) {
            return toast.error('Enter valid email')
        }
        setDeploying(true)
        toast.loading('Deploying...');
        setTimeout(() => {
            toast.success('Deployed successful!');

            setDeploying(false)
            if (!deploying) {
                setStep(2)
                navigate(`/register?username=${formData.username}&email=${formData.email}&phoneNumber=${formData.phoneNumber}&redirectUrl=${queryParams || 'web'}`);
            }
            setTimeout(() => {
                toast.dismiss();
            }, 1000)
        }, 1200)
    }

    return (
        <form className="flex flex-col place-items-center w-full gap-x-4 gap-y-3 amd:px-6">
            {
                step === 1 ? (
                    <Fragment>
                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="username" className='text-sm mb-2 font-500'>Name</label>
                            <input
                                type="text"
                                name='username'
                                id='username'
                                placeholder='Enter your name'
                                autoComplete='off'
                                autoCapitalize='on'
                                className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                                onChange={handleChange}
                                value={formData.username}
                                maxLength='30'
                                minLength='5'
                                required
                                disabled={deploying}
                            />
                        </div>
                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="email" className='text-sm mb-2 font-500'>Email</label>
                            <input
                                type="text"
                                name='email'
                                id='email'
                                placeholder='Enter your email'
                                autoComplete='off'
                                className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                                onChange={handleChange}
                                value={formData.email}
                                required
                                disabled={deploying}
                            />
                        </div>

                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="phoneNumber" className='text-sm mb-2 font-500'>Phone Number</label>
                            <input
                                type='number'
                                name='phoneNumber'
                                id='phoneNumber'
                                placeholder='Enter phone number'
                                autoComplete='off'
                                className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                                onChange={handleChange}
                                value={formData.phoneNumber}
                                required
                                disabled={deploying}
                            />
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <UploadImageKitImg img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef}>
                            <label htmlFor='profileImage' className={`flex flex-col items-center justify-center w-[150px] h-[150px] border-2 rounded-md overflow-hidden border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 animate-scaleIn transition-all ${img?.isLoading ? 'cursor-default' : 'cursor-pointer'}`} onClick={() => ikUploadRef.current.click()}>
                                {
                                    preview ? (
                                        <div className='relative'>
                                            <img src={preview} alt="" className='cursor-pointer w-[150px] object-cover h-[150px] rounded-md' />
                                            {img?.isLoading && !img?.error ? (
                                                <div className='absolute size-full top-0 left-0 grid place-items-center bg-[#49444452] rounded-md'>
                                                    <Loading4 size={45} bgColor='#000' />
                                                </div>
                                            ) : !img?.isLoading && img?.error && (
                                                <div className='absolute size-full top-0 left-0 grid place-items-center bg-[#7e747428] rounded-md'>
                                                    <span className='w-7 h-7 bg-black grid place-items-center rounded-full overflow-hidden'>
                                                        <FaInfoCircle className='text-red-800 text-2xl bg-white rounded-xl' />
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" /> </svg>
                                                <p className="mb-2 text-[11px] text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold ">Click to upload</span>
                                                </p>
                                            </div>
                                        </>
                                    )
                                }
                            </label>
                        </UploadImageKitImg>
                        <div className='flex flex-col w-full relative animate-scaleIn transition-all'>
                            <label htmlFor="password" className='text-sm mb-2 font-500'>Password</label>
                            <input
                                type={`${open ? 'text' : 'password'}`}
                                name='password'
                                id='password'
                                placeholder='Enter password'
                                autoComplete='off'
                                className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                            <span className='absolute top-[2.43rem] right-5 w-fit cursor-pointer'>
                                {open ? <FaEyeSlash onClick={() => setOpen(false)} /> : <FaEye onClick={() => setOpen(true)} />}
                            </span>
                        </div>
                        <div className='flex flex-col w-full relative animate-scaleIn transition-all'>
                            <p className='text-sm mb-2 font-500'>Gender</p>
                            <select
                                name="gender"
                                id="gender"
                                className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded'
                                onChange={handleChange}
                                value={formData.gender}
                                required
                            >
                                <option value="gender" defaultValue>Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="notSpecified">Not Specified</option>
                            </select>
                        </div>
                    </Fragment>
                )
            }
            {
                step === 1 ? (
                    <SubmitButton divStyle='col-span-2 w-full mt-7' valid={deployValid} action={deploySubmit}>
                        {!deploying ? 'Next' : 'Deploying'}
                    </SubmitButton>
                ) : (
                    <SubmitButton divStyle='col-span-2 w-full mt-7' valid={submitValid} action={handleSubmit}>
                        Register
                    </SubmitButton>
                )
            }

        </form>
    )
}

export default RegisterForm;