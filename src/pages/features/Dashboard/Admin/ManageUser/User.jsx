/* eslint-disable react/prop-types */
import { format } from 'date-fns'
import { useState, useRef } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaUserAlt, FaEdit, FaKey, FaTrash, FaMoneyBillAlt, FaInfoCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import useScrollTop from '../../../../../hooks/useScrollTop'
import useHideScroll from '../../../../../hooks/useHideScroll'
import usePathAfterSlash from '../../../../../hooks/usePathAfterSlash'
import { IKImage } from 'imagekitio-react'
import trim from '../../../../../utils/trim'


function User({ user, handleCheckedState, deleteUser, setUsersToDelete, usersToDelete, index = 0 }) {

    const { scrollTop } = useScrollTop();
    const pathAfterSlash = usePathAfterSlash();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const visibleRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useHideScroll(isModalOpen)

    const handleMouseEnter = () => {
        setIsOpen(true);
    }

    const handleMouseLeave = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div className='grid grid-cols-[auto_1fr_0.6fr_0.3fr_0.3fr_50px] items-center px-6 pt-[0.9rem] pb-4 border-b border-solid border-[#d2d1d1c8]'>
                {
                    pathAfterSlash === 'manage-users' ? (
                        <div>
                            <input
                                type="checkbox"
                                name="user"
                                id="user"
                                onChange={(e) => handleCheckedState(e, user?._id)}
                                checked={usersToDelete?.includes(user._id)}
                                className='w-5 h-5 rounded-md border border-solid border-[#8b8888] align-text-bottom'
                            />
                        </div>
                    ) : (
                        <div>{index + 1}</div>
                    )
                }
                <div className='text-start flex items-center ml-4'>
                    <div>
                        <IKImage
                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                            path={user?.profileImage}
                            className='w-12 h-12 rounded-full object-cover'
                            loading='lazy'
                            lqip={{
                                active: true,
                                quality: 20
                            }}
                            alt={`${user?.username} image`}
                        />
                    </div>
                    <div>
                        <span className='font-500 text-base ml-3 tracking-tight align-text-top mb-1 block' title={user?.username}>
                            {trim(user?.username, 100)}
                        </span>
                        <span className='font-400 text-base ml-3 tracking-tight align-text-top -mb-1' title={user?.email}>
                            {trim(user?.email, 100)}
                        </span>
                    </div>
                </div>
                <div className='text-start'>
                    <span className='font-500 text-base tracking-tight align-text-top -mb-1'>
                        <span>
                            {user?.roles?.Admin && (
                                <span className='border border-solid border-[#15433c] bg-[#45837a1a] text-[#15433c] px-4 mr-1 rounded-2xl'>
                                    <span className='text-[0.8rem]'>Admin </span>
                                </span>
                            )}
                            {user?.roles?.Instructor && (
                                <span className='border border-solid border-[#4358d1] bg-[#2e387122] text-[#4358d1] px-4 mr-1 rounded-2xl'>
                                    <span className='text-[0.8rem]'>Instructor </span>
                                </span>
                            )}
                            {user?.roles?.User && (
                                <span className='border border-solid border-[#d143ab] bg-[#2e387122] text-[#d143ab] px-4 rounded-2xl'>
                                    <span className='text-[0.8rem]'>User </span>
                                </span>
                            )}
                        </span>
                    </span>
                </div>
                <div className='text-center'>
                    <span className='font-500 tracking-tight text-start -mb-1 text-sm'>
                        {
                            user?.lastActive && format(user?.lastActive, 'MMM, dd yyyy pp')
                            ||
                            user?.dateRegistered && format(user?.dateRegistered, 'MMM, dd yyyy pp')
                        }
                    </span>
                </div>
                <div className='text-end'>
                    <span className='font-500 text-sm tracking-tight align-text-top -mb-1'>
                        {user?.dateRegistered && format(user?.dateRegistered, 'MMM, dd yyyy pp')}
                    </span>
                </div>
                {
                    pathAfterSlash === 'manage-users' && (
                        <div className='relative'>
                            <span className='flex justify-end w-fit ml-5'>
                                <CiMenuKebab className='text-2xl cursor-pointer w-fit' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                            </span>
                            <div ref={visibleRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                                className="absolute right-0 bottom-0 bg-[#fff] w-64 py-4 pr-2 pl-1 shadow-shadow border border-solid border-slate-900 rounded-xl z-10" style={{ display: `${isOpen ? 'block' : 'none'}` }}>
                                <ul>
                                    <Link to={`/dashboard/admin-cp/user/profile/${user?._id}`} className='cursor-pointer font-400 hover:bg-[#f2f2f2] pl-5 hover:font-500 py-2 rounded-md grid grid-flow-col justify-start items-center gap-3 select-none' onClick={scrollTop}>
                                        <span className='text-[#6a6767]'>
                                            <FaUserAlt />
                                        </span>
                                        <span className='font-sans'>View profile</span>
                                    </Link>
                                    <Link to={`/dashboard/admin-cp/users/edit/${user?._id}`} className='cursor-pointer font-400 hover:bg-[#f2f2f2] pl-5 hover:font-500 py-2 rounded-md grid grid-flow-col justify-start items-center gap-3 select-none' onClick={scrollTop}>
                                        <span className='text-[#6a6767]'>
                                            <FaEdit />
                                        </span>
                                        <span className='font-sans'>Edit details</span>
                                    </Link>
                                    <Link to={`/dashboard/admin-cp/users/edit/${user?._id}`} className='cursor-pointer font-400 hover:bg-[#f2f2f2] pl-5 hover:font-500 py-2 rounded-md grid grid-flow-col justify-start items-center gap-3 select-none'>
                                        <span className='text-[#6a6767]'>
                                            <FaKey />
                                        </span>
                                        <span className='font-sans'>Change permission</span>
                                    </Link>
                                    <li className='cursor-pointer font-400 hover:bg-[#f2f2f2] pl-5 hover:font-500 py-2 rounded-md grid grid-flow-col justify-start items-center gap-3 select-none'>
                                        <span className='text-[#6a6767]'>
                                            <FaMoneyBillAlt />
                                        </span>
                                        <span className='font-sans'>Payments</span>
                                    </li>
                                    <li className='cursor-pointer hover:bg-[#f2f2f2] font-400 pl-5 hover:font-500 py-2 rounded-md flex justify-between items-center select-none' onClick={
                                        () => {
                                            setIsModalOpen(true)
                                            setUsersToDelete([])
                                            setUsersToDelete([user?._id])
                                        }
                                    }>
                                        <div className='grid grid-flow-col justify-start items-center gap-3'>
                                            <span className='text-[#6a6767]'>
                                                <FaTrash />
                                            </span>
                                            <span className='font-sans'>Delete user</span>
                                        </div>
                                        <span className='text-red-500 mr-2'>
                                            <FaInfoCircle />
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            {isModalOpen && (
                                <div className="fixed top-0 left-0 bottom-0 right-0 w-full overflow-hidden flex items-center justify-center bg-black bg-opacity-50 z-[2000]">
                                    <div className="bg-white p-5 rounded">
                                        <p>
                                            {`Are you sure you want to delete ${user?.username}`}
                                        </p>
                                        <div className="mt-4 flex justify-end gap-3">
                                            <button
                                                onClick={() => {
                                                    setIsModalOpen(false)
                                                    setUsersToDelete([])
                                                }}
                                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => {
                                                    deleteUser.mutate()
                                                    setIsModalOpen(false)
                                                }}
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }
            </div >
        </>
    )
}

export default User