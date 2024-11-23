/* eslint-disable react/prop-types */
import { IKImage } from 'imagekitio-react';
import noImage from '../../assets/images/17280583876532104226055950268000.jpg'

const OpenModal = ({ isOpen, setIsOpen }) => {
    return (
        <span className='cursor-pointer absolute text-white text-xl right-10 top-3 z-[100]' onClick={(e) => {
            e.stopPropagation(); // Prevents file input click event
            e.preventDefault();  // Prevents any default behavior, just in case
            setIsOpen(!isOpen)
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 100 100">
                <rect x="5" y="5" width="40" height="40" rx="10" fill="#000" />
                <rect x="55" y="5" width="40" height="40" rx="10" fill="#000" />
                <rect x="5" y="55" width="40" height="40" rx="10" fill="#000" />
                <rect x="55" y="55" width="40" height="40" rx="10" fill="#000" />
            </svg>
        </span>
    )
}


const ModalContent = ({ isOpen, onClose, preview, imgUrl }) => {
    const sortedPreview =
        Array.isArray(preview)
            ? preview
            : preview !== null
                ? [preview]
                : null
    const gridLayout = () => {
        switch (sortedPreview.length) {
            case 1:
                return 'grid-cols-1'
            case 2:
                return 'grid-cols-2'
            case 3:
                return 'grid-cols-3'
            default:
                return 'grid-cols-4'
        }
    }

    return (
        <>
            {
                isOpen && (
                    <div id="myModal" className="modal">
                        <span className="close" onClick={onClose}>&times;</span>
                        <div className="modal-content w-fit">
                            {
                                sortedPreview && sortedPreview?.length > 0 && sortedPreview !== null ?
                                    (
                                        <div className={
                                            `grid gap-1 w-full place-items-center ${gridLayout()}`}>
                                            {
                                                sortedPreview.map((preview, i) => {
                                                    return (
                                                        <div key={i}>
                                                            <img src={preview} alt="Preview" className='cursor-pointer size-full object-cover select-none' />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                    : imgUrl ? (
                                        <IKImage
                                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                            path={imgUrl}
                                            className='h-[35rem] max-w-[40rem] object-cover'
                                            loading='lazy'
                                            lqip={{
                                                active: true,
                                                quality: 20
                                            }}
                                            alt='Image'
                                        />
                                    ) : (
                                        <div className='w-full grid place-items-center'>
                                            <img src={noImage} alt="no image" className='h-[35rem] max-w-[40rem] object-cover' />
                                        </div>
                                    )
                            }
                        </div>
                        <div id="caption"></div>
                    </div>
                )
            }
        </>
    );
};

export { ModalContent, OpenModal }