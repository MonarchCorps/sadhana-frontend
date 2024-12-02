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
                <h1 className="font-bold ism:text-sm">{instructor?.username}</h1>
                <p className="text-sm break-words">Instructor</p>
            </div>
            <div>
                <div>
                    <h3 className="font-bold ism:text-sm">Address: </h3>
                    <p className="ism:text-sm">{trim(instructor?.address, 20) || 'Not available'}</p>
                </div>
                <div>
                    <h3 className="font-bold ism:text-sm">Phone number: </h3>
                    <p className="ism:text-sm">{instructor?.phoneNumber}</p>
                </div>
                <div>
                    <h3 className="font-bold ism:text-sm">Email: </h3>
                    <p className="ism:text-sm break-words">{trim(instructor?.email, 20)}</p>
                </div>
                <div>
                    <h3 className="font-bold ism:text-sm">Total course uploaded: </h3>
                    <p className="ism:text-sm">{`${instructor?.courseCount} ${instructor?.courseCount <= 1 ? 'course' : 'courses'}`}</p>
                </div>
            </div>
        </div>
    )
}

export default Instructor