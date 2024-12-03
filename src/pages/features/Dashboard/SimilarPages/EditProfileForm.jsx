/* eslint-disable react/prop-types */
import { format } from 'date-fns'
import SubmitButton from '../../../../components/SubmitButton/SubmitButton'
import UploadImageKit from '../../../../components/UploadImageKit/UploadImageKit'
import useAuth from '../../../../hooks/useAuth'

function EditProfileForm({ handleChange, preview, formData, handleSubmit, img, setImg, setPreview, ikUploadRef }) {

    const { auth } = useAuth()

    const valid = formData.username && formData.email && formData.gender && formData.phoneNumber && !img?.isLoading && !img?.error

    return (
        <>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 ixsm:flex ixsm:flex-col gap-3 mx-auto mt-4">
                <div className='col-span-2 mb-3'>
                    <UploadImageKit imgUrl={auth?.profileImage} img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef} preview={preview} imgName='profileImage' />
                </div >

                <div className='flex flex-col w-full'>
                    <label className='text-sm mb-2 font-500' htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full outline-none cursor-default'
                        onChange={handleChange}
                        value={formData.username}
                        minLength='5'
                    />
                </div>

                <div className='flex flex-col w-full'>
                    <label className='text-sm mb-2 font-500' htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full outline-none cursor-default'
                        onChange={handleChange}
                        value={formData.email}
                    />
                </div>

                <div className='flex flex-col w-full'>
                    <label className='text-sm mb-2 font-500' htmlFor="registeredAt">Registered at</label>
                    <div
                        name="registeredAt"
                        id="registeredAt"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full outline-none cursor-default bg-[#d4e9fc82]'
                        title='Read only field'
                    >
                        {formData?.dateRegistered && format(formData?.dateRegistered, 'MMM, dd yyyy')}

                    </div>
                </div>

                <div className='flex flex-col w-full'>
                    <label className='text-sm mb-2 font-500' htmlFor="userId">User id</label>
                    <input
                        type="text"
                        name="userId"
                        id="userId"
                        readOnly
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full outline-none cursor-default bg-[#d4e9fc82]'
                        value={formData._id}
                        title='Read only field'
                    />
                </div>

                <div className='flex flex-col w-full'>
                    <label className='text-sm mb-1 font-500' htmlFor="gender">Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        required
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 mt-1 rounded'
                        onChange={handleChange}
                        value={formData.gender}
                    >
                        <option value="" defaultValue>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="notSpecified">Not Specified</option>
                    </select>
                </div>

                <div className='flex flex-col w-full'>
                    <label className='text-sm mb-2 font-500' htmlFor="phoneNumber">Phone number</label>
                    <input
                        type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full outline-none cursor-default'
                        onChange={handleChange}
                        value={formData.phoneNumber}
                    />
                </div>

                <div className='col-span-2'>
                    <textarea
                        name="address"
                        id="address"
                        required
                        className='border-[1px] border-solid border-[#aeacac] p-2 mt-1 rounded w-full h-44'
                        onChange={handleChange}
                        value={formData.address}
                    >

                    </textarea>
                </div>
                <SubmitButton divStyle='col-span-2 w-full mt-3' valid={valid} action={handleSubmit}>
                    Submit
                </SubmitButton>
            </form >
        </>
    )
}

export default EditProfileForm