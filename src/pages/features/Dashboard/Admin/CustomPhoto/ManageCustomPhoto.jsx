import UploadCustomPhoto from './UploadCustomPhoto/UploadCustomPhoto'
import ViewUploadPreview from './ViewUploadPreview'
import { useState } from 'react';

function ManageCustomPhoto() {

    const [previews, setPreviews] = useState([]);
    const [isUploading, setIsUploading] = useState(false); // State to handle upload status

    return (
        <section>
            <div className='grid grid-cols-[1fr_auto] relative'>
                <div className='py-12'>
                    <ViewUploadPreview previews={previews} setPreviews={setPreviews} isUploading={isUploading} />
                </div>
                <div className=' py-12 pl-7'>
                    <UploadCustomPhoto previews={previews} setPreviews={setPreviews} isUploading={isUploading} setIsUploading={setIsUploading} />
                </div>
            </div>
        </section>
    )
}

export default ManageCustomPhoto