/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import useAuth from '../../../../../hooks/useAuth'
import useHideScroll from '../../../../../hooks/useHideScroll'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'
import useRefreshToken from '../../../../../hooks/useRefreshToken'

import Loading from '../../../../../components/Loaders/Loading'
import EditInstructorProfileForm from './EditInstructorProfileForm'

import { useMutation } from '@tanstack/react-query'

function EditInstructorProfile() {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const refresh = useRefreshToken()

    const ikUploadRef = useRef()

    const [img, setImg] = useState({
        isLoading: false,
        error: '',
        dbData: {},
    });

    const [formData, setFormData] = useState({
        experience: auth?.experience || '',
        bgImage: auth?.bgImage || null,
    });

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            bgImage: img.dbData?.filePath || auth?.bgImage
        }))
    }, [img])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.bgImage || !formData.experience) return toast.error('All field is required')

        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        })

        mutate(formDataToSend)

    }

    const { isPending, mutate } = useMutation({
        mutationFn: (formDataToSend) => {
            return axiosPrivate.patch(`/instructor-cp/edit-instructor-profile/${auth?._id}`, formDataToSend, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
        },
        onSuccess: () => {
            refresh()
            toast.success('Updated successfully')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to update';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(isPending);

    return (
        <>
            <Loading isLoading={isPending} />
            <section>
                <div className='pt-14 px-3 pb-3 w-full h-full flex flex-col justify-center max-w-[38.8rem] amd:max-w-[34rem] esm:px-5 mx-auto'>
                    <div className='w-full text-start'>
                        <h1 className='text-[2rem] amd:text-2xl ixsm:text-xl mb-4 font-500 font-serif text-center'>
                            Hello 👋🏻 👋🏻 <span className='text-[#27554a] font-sans'>{auth?.username}</span> and welcome to Sadhana</h1>
                        <p className='mb-3 font-500 text-center w-full'>Let's update your profile as an instructor 😊</p>
                    </div>
                    <div className='w-full'>
                        <EditInstructorProfileForm preview={preview} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef} />
                    </div>
                </div>
            </section>
        </>

    )
}

export default EditInstructorProfile