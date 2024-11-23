/* eslint-disable react/prop-types */
import { useState } from 'react'

import useAuth from '../../../../../hooks/useAuth'
import { ModalContent } from '../../../../../components/Modals/ImageModal'
import UploadImageKit from '../../../../../components/UploadImageKit/UploadImageKit';
import SubmitButton from '../../../../../components/SubmitButton/SubmitButton';

const ApplyInstructorForm = ({ preview, formData, handleChange, handleSubmit, img, setImg, setPreview, ikUploadRef }) => {

    const { auth } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const valid = Object.values(formData).every(value => value !== '' && value !== undefined && value !== null)

    return (
        <>
            <form className='grid grid-cols-2 gap-6 place-items-center w-full' >
                <div className='col-span-2 w-full'>
                    <UploadImageKit imgUrl={auth?.bgImage} img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef} isOpen={isOpen} setIsOpen={setIsOpen} preview={preview} imgName='bgImage' />
                </div>
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
                <div className='col-span-2 w-full'>
                    <label htmlFor="experience" className='absolute left-[-9999px]'>Experience</label>
                    <textarea
                        name="experience"
                        id="experience"
                        onChange={handleChange}
                        value={formData.experience}
                        placeholder='Experience'
                        className='border-[1px] border-solid border-[#aeacac] p-2 rounded placeholder:text-sm w-full resize-none h-[16rem]'
                    >
                    </textarea>
                </div>
                <SubmitButton divStyle="col-span-2 w-full" valid={valid} action={handleSubmit}>
                    Submit
                </SubmitButton>
            </form >
            <ModalContent isOpen={isOpen} onClose={() => setIsOpen(false)} preview={preview} imgUrl={auth?.bgImage} />
        </>
    )
}

export default ApplyInstructorForm