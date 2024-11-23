/* eslint-disable react/prop-types */
import { useRef } from 'react'
import useAuth from '../../hooks/useAuth'
import usePathAfterSlash from '../../hooks/usePathAfterSlash'
import { Link } from 'react-router-dom'
import { UserAndInstructor, UserOnly } from '../../utils/rolePermission';


function Question({ isMounted, errMsg, preview, isLoading, setIsMounted, setIsGenerating, add }) {

    const refs = useRef({});

    const { auth } = useAuth();
    const pathAfterSlash = usePathAfterSlash();

    const userAndInstructor = UserAndInstructor()
    const userOnly = UserOnly()

    return (
        isMounted && !errMsg && !preview && (
            <div className='grid grid-cols-2 w-full place-items-center mt-4 absolute bottom-16'>
                <Link to='/custom-photo' className={`grid justify-items-end w-full ${(userOnly || pathAfterSlash === 'edit-instructor-profile' || pathAfterSlash === 'edit-profile') && 'col-span-2 place-content-center'}`}>
                    <div className={`w-fit rounded-md break-words bg-[#b75591f3] text-slate-50 p-1 ${!isLoading && 'hover:bg-[#245b48]'} transition-all mb-2 mr-4 tracking-wide text-[0.9rem]`}>
                        Need a photo?
                    </div>
                </Link>
                {
                    (userAndInstructor && pathAfterSlash !== 'edit-instructor-profile' && pathAfterSlash !== 'edit-profile') && (
                        <>
                            <button
                                className='mb-2 w-full'
                                disabled={isLoading}
                                id='title' onClick={
                                    (e) => {

                                        setIsMounted(false);
                                        setIsGenerating(true)
                                        add(refs.current[e.currentTarget.id].defaultValue)
                                    }}
                            >
                                <input value='Title on a course on yoga' type="hidden" name="title" id='title' ref={(el) => (refs.current[el?.id] = el)} />
                                <h3 className={`w-fit rounded-md break-words bg-[#b75591f3] text-slate-50 p-1 ${!isLoading && 'hover:bg-[#245b48] '} transition-all`}>
                                    <span className='whitespace-pre-wrap text-sm'>
                                        Title 💬 on a course
                                    </span>
                                </h3>
                            </button>
                            <button
                                className='mb-2 col-span-2'
                                disabled={isLoading}
                                id='desc' onClick={
                                    (e) => {
                                        setIsMounted(false);
                                        setIsGenerating(true)
                                        add(refs.current[e.currentTarget.id].defaultValue)
                                    }}
                            >
                                <input value='Description on a course on yoga' type="hidden" name="desc" id='desc' ref={(el) => (refs.current[el?.id] = el)} />
                                <h3 className={`w-fit rounded-md break-words bg-[#b75591f3] text-slate-50 p-1 ${!isLoading && 'hover:bg-[#245b48] '} transition-all`}>
                                    <span className='whitespace-pre-wrap text-sm'>
                                        📒
                                        <span>
                                            Description on a course
                                        </span>
                                    </span>
                                </h3>
                            </button>
                        </>
                    )
                }
                {
                    (userOnly || pathAfterSlash === 'edit-instructor-profile') && (
                        <>
                            <button
                                className='mb-2 w-full col-span-2 grid place-items-center'
                                disabled={isLoading}
                                id='experience' onClick={
                                    (e) => {

                                        setIsMounted(false);
                                        setIsGenerating(true)
                                        add(refs.current[e.currentTarget.id].defaultValue)
                                    }}
                            >
                                <input value='Give me an experience for an instructor application on yoga' type="hidden" name="experience" id='experience' ref={(el) => (refs.current[el?.id] = el)} />
                                <h3 className={`w-fit rounded-md break-words bg-[#b75591f3] text-slate-50 p-1 ${!isLoading && 'hover:bg-[#245b48] '} transition-all`}>
                                    <span className='whitespace-pre-wrap text-sm'>
                                        Experience <span>{auth?.gender === 'male' ? '👨🏽‍⚖️' : '👩🏼‍💼'}</span> for an application ⟲
                                    </span>
                                </h3>
                            </button>
                        </>
                    )
                }
                {
                    pathAfterSlash === 'edit-profile' && (
                        <>
                            <button
                                className='mb-2 w-full col-span-2 grid place-items-center'
                                disabled={isLoading}
                                id='address' onClick={
                                    (e) => {

                                        setIsMounted(false);
                                        setIsGenerating(true)
                                        add(refs.current[e.currentTarget.id].defaultValue)
                                    }}
                            >
                                <input value='Give me a fake address' type="hidden" name="address" id='address' ref={(el) => (refs.current[el?.id] = el)} />
                                <h3 className={`w-fit rounded-md break-words bg-[#b75591f3] text-slate-50 p-1 ${!isLoading && 'hover:bg-[#245b48] '} transition-all`}>
                                    <span className='whitespace-pre-wrap text-sm'>
                                        Do you need an address 📇
                                    </span>
                                </h3>
                            </button>
                        </>
                    )
                }
            </div >
        )
    )
}

export default Question