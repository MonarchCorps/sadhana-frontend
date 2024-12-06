/* eslint-disable react/prop-types */
import Masonry from 'react-masonry-css'
import { FaTrash } from 'react-icons/fa'

function ViewUploadPreview({ previews, setPreviews, isUploading }) {

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1
    }

    return (
        previews && previews.length > 0 && (
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex  w-auto"
                columnClassName="pl-[1.875rem]"
            >
                {previews.map((preview, i) => (
                    <div key={i} className='group shadow-md relative'>
                        <img src={preview.blobUrl} alt="Preview" className='mb-4' />
                        <div
                            className={`absolute bottom-4 left-0 bg-transparent border-none p-0 grid items-center w-fit ${isUploading ? 'pointer-events-none opacity-50' : ''
                                }`}
                        >
                            <button
                                className="flex gap-1 items-center border border-solid border-red-600 bg-slate-50 rounded-xl px-3 py-2 text-red-500 hover:border-current hover:bg-red-500 hover:text-slate-50 opacity-0 transform scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 text-xs"
                                onClick={() => {
                                    const updated = previews.filter((_, idx) => idx !== i);
                                    setPreviews(updated);
                                }}
                                disabled={isUploading}
                            >
                                <span className='break-words'>Delete Photo</span>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </Masonry>
        )
    )
}

export default ViewUploadPreview;
