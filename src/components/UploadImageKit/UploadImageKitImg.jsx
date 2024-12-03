/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import toast from 'react-hot-toast'
import { IKContext, IKUpload } from 'imagekitio-react'

import useAxiosPrivate from '../../hooks/useAxiosPrivate'

function UploadImageKitImg({ img, setImg, setPreview, ikUploadRef, children }) {
    const axiosPrivate = useAxiosPrivate()

    const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT
    const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY

    const authenticator = async () => {
        const controller = new AbortController()
        try {
            const response = await axiosPrivate.get('/upload', {
                signal: controller.signal
            });
            const { signature, expire, token } = response.data;
            return { signature, expire, token };
        } catch (error) {
            console.log(error)
        }

    }
    const onError = err => {
        toast.error('Network error')
        setImg(prev => ({ ...prev, isLoading: false, error: err }))
    }

    const onSuccess = res => {
        toast.success('Success')
        setImg(prev => ({
            ...prev,
            isLoading: false,
            dbData: res
        }))
    }

    const onUploadProgress = () => {
        console.log("Progress");
    }

    const onUploadStart = evt => {
        setImg((prev) => ({ ...prev, isLoading: true, error: '' }));
        const fileType = Array.from(evt.target.files).every((file) =>
            file.type.startsWith('image/')
        );
        if (!fileType) {
            toast.error('All files must be images');
        }
    }

    const handleChange = (e) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            const previews = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setPreview(previews);
        }

    }

    return (
        <Fragment>
            <IKContext
                urlEndpoint={urlEndpoint}
                publicKey={publicKey}
                authenticator={authenticator}
            >
                <IKUpload
                    accept='image/*'
                    fileName="yoga-master.png"
                    onError={onError}
                    onSuccess={onSuccess}
                    useUniqueFileName={true}
                    onUploadProgress={onUploadProgress}
                    onUploadStart={onUploadStart}
                    className='hidden'
                    ref={ikUploadRef}
                    onChange={handleChange}
                    disabled={img?.isLoading}
                    multiple={false}
                />
                {children}
            </IKContext>
        </Fragment>
    )

}

export default UploadImageKitImg