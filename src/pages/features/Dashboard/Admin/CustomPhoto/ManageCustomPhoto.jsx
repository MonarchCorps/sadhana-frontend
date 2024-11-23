import UploadCustomPhoto from './UploadCustomPhoto/UploadCustomPhoto'
import ViewUploadPreview from './ViewUploadPreview'
import { useState } from 'react';

function ManageCustomPhoto() {

    const [previews, setPreviews] = useState([]);

    return (
        <section>
            <div className='grid grid-cols-[auto_300px]'>
                <div className='py-12 w-[50rem]'>
                    <ViewUploadPreview previews={previews} setPreviews={setPreviews} />
                </div>
                <div className='w-[26rem] py-12 pl-7'>
                    <UploadCustomPhoto previews={previews} setPreviews={setPreviews} />
                </div>
            </div>
        </section>
    )
}

export default ManageCustomPhoto