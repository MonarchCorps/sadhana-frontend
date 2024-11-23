import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from './useAxiosPrivate'
import toast from 'react-hot-toast'

import extractMimeType from '../utils/extractMimeType'
import base64ToBlob from '../utils/base64ToBlob'

function useFetchUrlImg(imageId, setPreview, setFormData, name) {

    const axiosPrivate = useAxiosPrivate();

    const { data: base64Image, isLoading } = useQuery({
        queryKey: ['customPhoto', imageId],
        queryFn: async () => {
            const response = await axiosPrivate.get(`/custom-photo/single/${imageId}`);
            return response.data.customPhoto;
        },
        enabled: !!imageId, // Only fetch if imageId is truthy
        onError: (error) => {
            console.error(error);
            toast.error('Error fetching image');
        },
    });

    useEffect(() => {
        if (base64Image) {
            const contentType = extractMimeType(base64Image);

            const base64Data = base64Image.split(',')[1];
            const blob = base64ToBlob(base64Data, contentType);

            // Convert Blob to a File object with a generated name
            const fileName = `image_${new Date().getTime()}`; // Get extension from MIME type
            const file = new File([blob], fileName, { type: contentType });

            const url = URL.createObjectURL(file);
            setPreview(url);

            setFormData(prev => ({
                ...prev,
                [name]: file
            }))
        }
    }, [base64Image])

    return { isLoading }
}

export default useFetchUrlImg