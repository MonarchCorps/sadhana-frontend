/* eslint-disable react/prop-types */

import { IKImage } from "imagekitio-react"
import trim from "../../utils/trim"

function Instructor({ instructor }) {
    return (
        <div className="rounded-md overflow-hidden shadow-shadow px-5 py-4 flex flex-col justify-between">
            <div className="text-center grid place-items-center">
                <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={instructor?.profileImage}
                    className="w-32 h-32 rounded-full object-cover"
                    loading='lazy'
                    lqip={{
                        active: true,
                        quality: 20
                    }}
                    alt={`${instructor?.username} image`}
                />
            </div>
            <div className="text-center mt-3">
                <h1 className="font-bold">{instructor?.username}</h1>
                <p className="text-sm">Instructor</p>
            </div>
            <div>
                <div>
                    <h3 className="font-bold">Address: </h3>
                    <p>{trim(instructor?.address, 20) || 'Not available'}</p>
                </div>
                <div>
                    <h3 className="font-bold">Phone number: </h3>
                    <p>{instructor?.phoneNumber}</p>
                </div>
                <div>
                    <h3 className="font-bold">Email: </h3>
                    <p>{instructor?.email}</p>
                </div>
                <div>
                    <h3 className="font-bold">Total course uploaded: </h3>
                    <p>{`${instructor?.courseCount} ${instructor?.courseCount <= 1 ? 'course' : 'courses'}`}</p>
                </div>
            </div>
        </div>
    )
}

export default Instructor