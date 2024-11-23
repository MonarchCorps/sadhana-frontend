/* eslint-disable react/prop-types */
import { FaInfoCircle } from 'react-icons/fa'
import Loading4 from '../Loaders/Loading4'
import { OpenModal } from '../Modals/ImageModal'
import UploadImageKitImg from './UploadImageKitImg'
import { IKImage } from 'imagekitio-react'

function UploadImageKit({ imgUrl, img, setImg, setPreview, ikUploadRef, isOpen, setIsOpen, preview, isLoading, imgName, multiple = false }) {
    const previews =
        Array.isArray(preview)
            ? preview
            : preview !== null
                ? [preview]
                : null

    return (
        // Note ur EditProfile UpdateClass and  component doesn't have isLoading because we aren't requesting anything from the url
        <UploadImageKitImg img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef} multiple={multiple}>
            <label htmlFor={imgName} className={`relative flex flex-col items-center justify-center border-2 rounded-xl overflow-hidden border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 w-full h-[20rem] ${img?.isLoading ? 'cursor-default' : 'cursor-pointer'}`} onClick={() => ikUploadRef.current.click()}>
                <OpenModal isOpen={isOpen} setIsOpen={setIsOpen} />
                {
                    previews && previews.length > 0 ? (
                        <div className='relative'>
                            <div className={
                                `grid gap-1 ${previews.length === 1
                                    ? 'grid-cols-1'
                                    : previews.length === 2
                                        ? 'grid-cols-2'
                                        : previews.length === 3
                                            ? 'grid-cols-3'
                                            : 'grid-cols-4'
                                }`}>
                                {
                                    previews.map((preview, i) => {
                                        return (
                                            <div key={i}>
                                                <img src={preview} alt="Preview" className='cursor-pointer size-full object-cover select-none' />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {img?.isLoading && !img?.error ? (
                                <div className='absolute size-full top-0 left-0 grid place-items-center bg-[#49444452] rounded-md'>
                                    <Loading4 size={45} bgColor='#000' />
                                </div>
                            ) : !img?.isLoading && img?.error && (
                                <div className='absolute size-full top-0 left-0 grid place-items-center bg-[#bf707028] rounded-md'>
                                    <span className='grid place-items-center rounded-full overflow-hidden'>
                                        <FaInfoCircle className='text-red-800 text-4xl bg-white rounded-2xl' />
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : imgUrl ? (
                        <IKImage
                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                            path={imgUrl}
                            className='cursor-pointer size-full object-cover'
                            loading='lazy'
                            lqip={{
                                active: true,
                                quality: 20
                            }}
                            alt='image'
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" /> </svg>
                            <p className="mb-2 text-[11px] text-gray-500 dark:text-gray-400">
                                <span className="font-semibold ">{isLoading ? <Loading4 size={45} bgColor='#fff' /> : 'Click to upload photo'}</span>
                            </p>
                        </div>
                    )
                }
            </label >
        </UploadImageKitImg>
    )
}

export default UploadImageKit