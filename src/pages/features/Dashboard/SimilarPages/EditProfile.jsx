import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import useHideScroll from '../../../../hooks/useHideScroll'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import useAuth from '../../../../hooks/useAuth'
import useRefreshToken from '../../../../hooks/useRefreshToken'

import Loading from '../../../../components/Loaders/Loading'
import EditProfileForm from './EditProfileForm'
import { useNavigate } from 'react-router-dom'


function EditProfile() {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const refresh = useRefreshToken()
    const navigate = useNavigate()

    const ikUploadRef = useRef(null)

    const [img, setImg] = useState({
        isLoading: false,
        error: '',
        dbData: {},
    });

    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        username: auth?.username || '',
        profileImage: auth?.profileImage || '',
        email: auth?.email || '',
        dateRegistered: auth?.dateRegistered || '',
        _id: auth?._id || '',
        gender: auth?.gender || 'gender',
        phoneNumber: auth?.phoneNumber || '',
        address: auth?.address || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    };

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            profileImage: img.dbData?.filePath || auth?.profileImage
        }))
    }, [img])

    const emptyField = Object.values(formData).some(value => value === '')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (emptyField === true) return toast.error('All fields are required')

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        })

        mutate(formDataToSend)
    }

    const { isPending, mutate } = useMutation({
        mutationFn: (formDataToSend) => {
            return axiosPrivate.patch(`/edit-profile/${auth?._id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
        },
        onSuccess: () => {
            refresh()
            toast.success('Updated successfully')
            setTimeout(() => {
                navigate('/auth', {
                    replace: true
                })
            }, 400)
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to update';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(isPending)

    return (
        <>
            <Loading isLoading={isPending} />
            <section>
                <div className='pt-14 px-3 pb-3 w-full h-full flex flex-col justify-center max-w-[38.8rem] amd:max-w-[34rem] esm:px-5 mx-auto'>
                    <div className='w-full text-start'>
                        <h1 className='text-[2rem] amd:text-2xl ixsm:text-xl mb-4 font-500 font-serif'>
                            Edit you profile <span className='text-[#27554a] font-roboto'>{auth?.username}</span>
                        </h1>
                    </div>
                    <div className='w-full'>
                        <EditProfileForm handleChange={handleChange} preview={preview} formData={formData} handleSubmit={handleSubmit} img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditProfile