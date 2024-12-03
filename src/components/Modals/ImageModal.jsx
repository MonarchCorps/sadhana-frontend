/* eslint-disable react/prop-types */
import { IKImage } from 'imagekitio-react';
import noImage from '../../assets/images/17280583876532104226055950268000.jpg'

const OpenModal = () => {
    return (
        <span className='cursor-pointer absolute text-white text-xl right-4 top-3 z-[100]'>
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 100 100">
                <rect x="5" y="5" width="40" height="40" rx="10" fill="#000" />
                <rect x="55" y="5" width="40" height="40" rx="10" fill="#000" />
                <rect x="5" y="55" width="40" height="40" rx="10" fill="#000" />
                <rect x="55" y="55" width="40" height="40" rx="10" fill="#000" />
            </svg>
        </span>
    )
}


const ModalContent = ({ preview, imgUrl }) => {
    return (
        <div>
            {
                preview ? (
                    <div>
                        {
                            <div>
                                <img src={preview} alt="Preview" className='cursor-pointer size-full max-h-[425px] max-w-[425px] object-cover select-none' />
                            </div>
                        }
                    </div>
                )
                    : imgUrl ? (
                        <IKImage
                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                            path={imgUrl}
                            className='object-cover size-full max-h-[425px] max-w-[425px] select-none'
                            loading='lazy'
                            lqip={{
                                active: true,
                                quality: 20
                            }}
                            alt='Image'
                        />
                    ) : (
                        <div className='w-full grid place-items-center'>
                            <img src={noImage} alt="no image" className='object-cover size-full max-h-[425px] max-w-[425px] select-none' />
                        </div>
                    )
            }
        </div>
    );
};

export { ModalContent, OpenModal }