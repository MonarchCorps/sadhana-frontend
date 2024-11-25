/* eslint-disable react/prop-types */
import Masonry from 'react-masonry-css'
import { FaTrash } from 'react-icons/fa'
// import ReactImageMagnify from 'react-image-magnify';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

function ViewUploadPreview({ previews, setPreviews, isUploading }) {

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1
    }
    console.log(isUploading)

    return (
        previews && previews.length > 0 && (
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex -ml-[1.875rem] w-auto"
                columnClassName="pl-[1.875rem]"
            >
                {previews.map((preview, i) => (
                    <div key={i} style={{ position: 'relative' }} className='mb-3'>
                        <HoverCard
                            openDelay={0}
                            closeDelay={0}
                            style={{
                                position: 'absolute',
                                background: isUploading ? 'gray' : 'red',
                                pointerEvents: isUploading ? 'none' : 'auto',
                                opacity: isUploading ? 0.5 : 1,
                            }}
                        >
                            <HoverCardTrigger>
                                {/* <ReactImageMagnify
                                    {...{
                                        smallImage: {
                                            alt: 'Wristwatch by Ted Baker London',
                                            isFluidWidth: true,
                                            src: preview.blobUrl,
                                        },
                                        largeImage: {
                                            src: preview.blobUrl,
                                            width: 1000,
                                            height: 1000,
                                            objectFit: 'contain',
                                        },
                                        enlargedImageContainerStyle: {
                                            zIndex: 1000,
                                            objectFit: 'cover',
                                        },
                                        lensStyle: {
                                            backgroundColor: 'rgba(0,0,0,0.3)', // Optional lens effect
                                            zIndex: 10,
                                        },
                                    }}
                                /> */}
                                <img src={preview.blobUrl} alt="Preview" />
                            </HoverCardTrigger>
                            <HoverCardContent
                                align="center"
                                side="bottom"
                                sideOffset={-80}
                                avoidCollisions={true}
                                className={`bg-transparent border-none p-0 grid items-center w-fit ${isUploading ? 'pointer-events-none opacity-50' : ''
                                    }`}
                            >
                                <button
                                    className="flex gap-1 items-center border border-solid border-red-600 bg-slate-50 rounded-xl transition-all px-3 py-2 text-red-500 hover:border-current hover:bg-red-500 hover:text-slate-50"
                                    onClick={() => {
                                        const updated = previews.filter((_, idx) => idx !== i);
                                        setPreviews(updated);
                                    }}
                                    disabled={isUploading}
                                >
                                    Delete Photo
                                    <FaTrash />
                                </button>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                ))}
            </Masonry>
        )

    )
}

export default ViewUploadPreview;
