/* eslint-disable react/prop-types */
import { useRef, useState } from 'react'

import SubmitButton from '../../../../../../components/SubmitButton/SubmitButton';
import Loading4 from '../../../../../../components/Loaders/Loading4';
import { FaInfoCircle } from 'react-icons/fa';

import ImageKit from "imagekit-javascript"
import useAxiosPrivate from '../../../../../../hooks/useAxiosPrivate'
import toast from 'react-hot-toast';

const UploadCustomPhotoForm = ({ setImg, img, handleSubmit, setPreviews, previews }) => {
    const axiosPrivate = useAxiosPrivate()

    const ikUploadRef = useRef(null)

    const [isUploading, setIsUploading] = useState(false); // State to handle upload status
    const [error, setError] = useState(''); // State to store uploaded file URLs
    const uploadedUrls = [];

    const imageKit = new ImageKit({
        publicKey: import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY,
        urlEndpoint: import.meta.env.VITE_IMAGE_KIT_ENDPOINT,
    });

    const handleUpload = async () => {
        if (isUploading) return;

        if (!previews || previews.length === 0) {
            console.error("No files selected for upload.");
            return;
        }
        setImg([])
        try {
            setIsUploading(true);
            setError('')

            const response = await axiosPrivate.get('/upload', { params: { count: previews.length } });
            const credentials = response.data;

            if (credentials.length !== previews.length) {
                console.error("Mismatch in the number of files and tokens provided.");
                return;
            }

            for (let i = 0; i < previews.length; i++) {
                const { file } = previews[i];
                const { token, signature, expire } = credentials[i];

                try {
                    const result = await imageKit.upload({
                        file,
                        fileName: file.name,
                        token,
                        signature,
                        expire,
                    });

                    console.log("Upload successful! Public URL: " + result.url);
                    uploadedUrls.push(result.url);
                } catch (uploadError) {
                    setError(uploadError.message)
                    console.error("Upload failed. Error: ", uploadError);
                    toast.error('Network error')
                }
            }

            setImg((prev) => [...prev, ...uploadedUrls]);
        } catch (err) {
            setError(err.message)
            toast.error('Error contacting server')
        } finally {
            setIsUploading(false);
        }
    };

    const handleChange = (e) => {
        const { files } = e.target
        if (files && files.length > 0) {
            const newPreviews = Array.from(files).map((file) => ({
                blobUrl: URL.createObjectURL(file),
                file,
            }));
            setPreviews((prev) => [...prev, ...newPreviews]);// Generate a preview URL for each image
        }
    }

    const valid = !isUploading && !error && img.length > 0

    return (
        <>
            <div className='w-full flex justify-between mb-6 '>
                <h1 className='text-[1.59rem] font-500'>
                    Upload
                </h1>
                <button
                    className={`bg-slate-900 text-slate-100 py-2 px-3 rounded-md text-sm font-sans transition-all border border-solid border-current hover:bg-slate-50 hover:text-slate-900 ${isUploading && 'opacity-50'}`}
                    disabled={isUploading}
                    onClick={handleUpload}
                >
                    {isUploading ? 'Pushing' : 'Push'}
                </button>
            </div>
            <form className='w-[25rem]'>
                <input
                    type="file"
                    ref={ikUploadRef}
                    multiple
                    accept="image/*"
                    hidden
                    disabled={isUploading}
                    onChange={handleChange}
                />
                <div className='mb-6'>
                    <label htmlFor='customPhotos' className={`relative flex flex-col items-center justify-center border-2 rounded-xl overflow-hidden border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 w-full h-[20rem] ${isUploading ? 'cursor-default' : 'cursor-pointer'}`} onClick={() => ikUploadRef.current.click()}>
                        {isUploading && !error ? (
                            <div className='absolute size-full top-0 left-0 grid place-items-center bg-[#49444452] rounded-md'>
                                <Loading4 size={45} bgColor='#000' />
                            </div>
                        ) : !isUploading && error && (
                            <div className='absolute size-full top-0 left-0 grid place-items-center bg-[#bf707028] rounded-md'>
                                <span className='grid place-items-center rounded-full overflow-hidden'>
                                    <FaInfoCircle className='text-red-800 text-4xl bg-white rounded-2xl' />
                                </span>
                            </div>
                        )}
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" /> </svg>
                            <p className="mb-2 text-[11px] text-gray-500 dark:text-gray-400">
                                <span className="font-semibold ">Click to upload photo</span>
                            </p>
                        </div>

                    </label >
                </div>
                <SubmitButton valid={valid} action={handleSubmit}>
                    Upload
                </SubmitButton>
            </form>
        </>
    )
}

export default UploadCustomPhotoForm