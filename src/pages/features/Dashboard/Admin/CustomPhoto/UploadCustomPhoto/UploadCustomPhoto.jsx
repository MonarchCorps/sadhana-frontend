/* eslint-disable react/prop-types */
import { useState } from 'react'
import UploadCustomPhotoForm from './UploadCustomPhotoForm'
import useHideScroll from '../../../../../../hooks/useHideScroll'
import Loading from '../../../../../../components/Loaders/Loading'
import useAxiosPrivate from '../../../../../../hooks/useAxiosPrivate'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

function UploadCustomPhoto({ previews, setPreviews, isUploading, setIsUploading }) {

    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient()

    const [img, setImg] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!img || img.length === 0) {
            return toast.error('Pictures is/are required')
        }
        const customPhotos = img.map(img => ({ customPhoto: img }))
        handleUpload.mutate(customPhotos)

    }

    const handleUpload = useMutation({
        mutationFn: (customPhotos) => {
            return axiosPrivate.post('/custom-photo', customPhotos, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allCustomPhotos"] })
            setImg([])
            toast.success('Uploaded successfully')
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Error uploading photos';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(handleUpload.isPending)

    return (
        <>
            <Loading isLoading={handleUpload.isPending} />
            <div className='px-3 pb-3 w-fit sticky top-3'>
                <UploadCustomPhotoForm setImg={setImg} img={img} handleSubmit={handleSubmit} setPreviews={setPreviews} previews={previews} isUploading={isUploading} setIsUploading={setIsUploading} />
            </div>
        </>
    )
}

export default UploadCustomPhoto