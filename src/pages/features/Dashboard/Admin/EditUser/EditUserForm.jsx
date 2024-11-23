/* eslint-disable react/prop-types */
import { format } from 'date-fns'
import Select from 'react-select'
import ReactSelect from './ReactSelect'
import { useEffect, useState } from 'react'
import useHideScroll from '../../../../../hooks/useHideScroll'
import { ModalContent } from '../../../../../components/Modals/ImageModal'
import UploadImageKit from '../../../../../components/UploadImageKit/UploadImageKit'
import SubmitButton from '../../../../../components/SubmitButton/SubmitButton'
import NoteOpen from './NoteOpen'

function EditUserForm({ user, handleChange, preview, formData, setRoles, handleSubmit, img, setImg, setPreview, ikUploadRef }) {

    const { selectedRoles, isModalOpen, handleRoleChange, confirmRemoveRole, cancelRemoveRole, MultiValueRemove, ClearIndicator, options, roleToDelete, isClearAll } = ReactSelect(user);

    useHideScroll(isModalOpen)

    const [noteOpen, setNoteOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const valid = Object.entries(formData)
        .filter(([key]) => key !== 'address')
        .every(([_, value]) => value !== '');

    useEffect(() => {
        if (selectedRoles?.length > 0) {
            const formattedRoles = selectedRoles.reduce((acc, role) => {
                acc[role.label] = role.value;
                return acc;
            }, {});
            setRoles(formattedRoles);
        }

    }, [selectedRoles]);

    useEffect(() => {
        setNoteOpen(true);
    }, [])

    return (
        <>
            <form className="grid grid-cols-2 gap-3 w-[40rem] mx-auto mt-4">
                <div className='col-span-2 mb-3'>
                    <UploadImageKit imgUrl={user?.profileImage} img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef} isOpen={isOpen} setIsOpen={setIsOpen} preview={preview} imgName='profileImage' />
                </div>

                <div className='flex flex-col w-full'>
                    <label className='text-sm mb-2 font-500' htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full outline-none cursor-default'
                        onChange={handleChange}
                        value={formData.username}
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
                    <label className='text-sm mb-2 font-500' htmlFor="updatedAt">Updated at</label>
                    <div
                        name="updatedAt"
                        id="updatedAt"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full outline-none cursor-default bg-[#d4e9fc82]'
                        title='Read only field'
                    >
                        {formData?.updatedAt && format(formData?.updatedAt, 'MMM, dd yyyy')}
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
                        <option value="gender" defaultValue>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="notSpecified">Not Specified</option>
                    </select>
                </div>

                <div className='flex flex-col w-full'>
                    <label className='text-sm mb-2 font-500' htmlFor="phoneNumber">Phone number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full outline-none cursor-default'
                        onChange={handleChange}
                        value={formData.phoneNumber}
                    />
                </div>

                <div className='relative'>
                    <label className="text-sm font-500 block" htmlFor="roles">
                        Roles
                    </label>
                    <NoteOpen noteOpen={noteOpen} user={user} setNoteOpen={setNoteOpen} gender={formData.gender} />
                    <Select
                        id="roles"
                        value={selectedRoles}
                        className='mt-1'
                        isMulti
                        options={options}
                        onChange={handleRoleChange}
                        closeMenuOnSelect={false}
                        components={{ MultiValueRemove, ClearIndicator }} // Use custom components for role removal and clearing all
                    />
                </div>
                {isModalOpen && (
                    <div className="fixed top-0 left-0 bottom-0 right-0 w-full overflow-hidden flex items-center justify-center bg-black bg-opacity-50 z-[2000]">
                        <div className="bg-white p-5 rounded">
                            <p>
                                {isClearAll
                                    ? 'Are you sure you want to remove all roles?'
                                    : `Are you sure you want to remove the role "${roleToDelete?.label}"?`}
                            </p>
                            <div className="mt-4 flex justify-end gap-3">
                                <button
                                    onClick={cancelRemoveRole}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmRemoveRole}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className='col-span-2'>
                    <textarea
                        name="address"
                        id="address"
                        className='border-[1px] border-solid border-[#aeacac] p-2 mt-1 rounded w-full h-44'
                        onChange={handleChange}
                        value={formData.address}
                    >

                    </textarea>
                </div>

                <SubmitButton divStyle="col-span-2 w-full mt-3" valid={valid} action={handleSubmit}>
                    Submit
                </SubmitButton>
            </form >
            <ModalContent isOpen={isOpen} onClose={() => setIsOpen(false)} preview={preview} imgUrl={user?.profileImage} />
        </>
    )
}

export default EditUserForm