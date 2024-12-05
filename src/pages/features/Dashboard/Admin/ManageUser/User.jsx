/* eslint-disable react/prop-types */
import { useState, useRef, Fragment } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaUserAlt, FaEdit, FaKey, FaTrash, FaMoneyBillAlt, FaInfoCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import useScrollTop from '../../../../../hooks/useScrollTop'
import useHideScroll from '../../../../../hooks/useHideScroll'
import usePathAfterSlash from '../../../../../hooks/usePathAfterSlash'
import { IKImage } from 'imagekitio-react'
import trim from '../../../../../utils/trim'
import { formatDate } from '@/chat/lib/utils'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'
import { DeleteCancelButton, DeleteConfirmButton, DeleteModal } from '@/components/Modals/DeleteModal'

function User({ user, handleCheckedState, deleteUser, setUsersToDelete, usersToDelete, index = 0 }) {

    const { scrollTop } = useScrollTop();
    const pathAfterSlash = usePathAfterSlash();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { screenWidth } = useGetScreenWidth()

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
        <Fragment>
            <AccordionItem value={user?._id} className='border-b-0' key={user?._id}>
                <AccordionTrigger className={`w-screen grid grid-cols-12 eumd:grid-cols-10 hrmd2:grid-cols-9 md:grid-cols-5 items-center px-6 pt-[0.9rem] pb-4 border-b border-solid border-[#d2d1d1c8] accordionWrapper imd:px-2 ${screenWidth <= 905 ? 'cursor-pointer' : 'cursor-default'}`} style={{ textDecoration: 'none', userSelect: 'text' }}>
                    <div className='text-start flex items-center col-span-5 eumd:col-span-4 ixsm:col-span-full'>
                        {
                            pathAfterSlash === 'manage-users' ? (
                                <div className='mr-2'>
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
                                <div className='mr-3'>{index + 1}</div>
                            )
                        }
                        <div className='w-12 h-12'>
                            <IKImage
                                urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                path={user?.profileImage}
                                className='size-full rounded-full object-cover'
                                loading='lazy'
                                lqip={{
                                    active: true,
                                    quality: 20
                                }}
                                alt={`${user?.username} image`}
                            />
                        </div>
                        <div>
                            <span className='font-500 text-base ml-3 tracking-tight align-text-top mb-1 block esm:text-sm esm:font-700' title={user?.username}>
                                {trim(user?.username, 50)}
                            </span>
                            <span className='font-400 text-base ml-3 tracking-tight align-text-top esm:text-sm break-words asm:text-xs' title={user?.email}>
                                {trim(user?.email, 22)}
                            </span>
                        </div>
                    </div>
                    <div className='col-span-4 flex eumd:items-center eumd:justify-center md:justify-start md:mt-2 ixsm:flex-wrap'>
                        <span className='font-800 text-base hidden md:block asm:text-sm'>Access: &nbsp;</span>
                        {user?.roles?.Admin && (
                            <span className='w-fit mr-1'>
                                <span className='text-[0.8rem] border border-solid border-[#15433c] bg-[#45837a1a] text-[#15433c] rounded-2xl px-4 asm:text-xs'>Admin </span>
                            </span>
                        )}
                        {user?.roles?.Instructor && (
                            <span className='w-fit mr-1'>
                                <span className='text-[0.8rem] border border-solid border-[#4358d1] bg-[#2e387122] text-[#4358d1] rounded-2xl px-4 asm:text-xs'>Instructor </span>
                            </span>
                        )}
                        {user?.roles?.User && (
                            <span className='w-fit'>
                                <span className='text-[0.8rem] border border-solid border-[#d143ab] bg-[#2e387122] text-[#d143ab] rounded-2xl px-4 asm:text-xs'>User </span>
                            </span>
                        )}
                    </div>
                    <div className='text-center hrmd2:hidden'>
                        <span className='font-500 tracking-tight text-start text-xs align-text-top'>
                            {
                                user?.lastActive && formatDate(user?.lastActive)
                                ||
                                user?.dateRegistered && formatDate(user?.dateRegistered)
                            }
                        </span>
                    </div>
                    <div className='text-end eumd:hidden'>
                        <span className='font-500 text-xs tracking-tight align-text-top'>
                            {user?.dateRegistered && formatDate(user?.dateRegistered)}
                        </span>
                    </div>

                    <div className='relative col-span-auto flex justify-end'>
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
                                <li className='cursor-pointer text-red-500 hover:bg-[#f2f2f2] font-400 pl-5 hover:font-500 py-2 rounded-md flex justify-between items-center select-none' onClick={
                                    () => {
                                        setIsModalOpen(true)
                                        setUsersToDelete([])
                                        setUsersToDelete([user?._id])
                                    }
                                }>
                                    <div className='grid grid-flow-col justify-start items-center gap-3'>
                                        <FaTrash />
                                        <span className='font-sans'>Delete user</span>
                                    </div>
                                    <span className='mr-2'>
                                        <FaInfoCircle />
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {screenWidth <= 905 && (
                        <div className='col-span-full'>
                            <AccordionContent className='flex gap-3 pt-4 pb-1 amd:justify-between esm:flex-wrap esm:items-start esm:gap-0 esm:pt-2'>
                                <p className='hidden ilg:block text-start mr-2'>
                                    <span className='esm:inline-block text-sm amd:text-xs font-bold'>Registered on: &nbsp;</span>
                                    <span className='amd:text-xs'>{user?.dateRegistered && formatDate(user?.dateRegistered)}</span>
                                </p>
                                <p className='hidden hrmd2:block text-start'>
                                    <span className='esm:inline-block text-sm amd:text-xs font-bold'>Online: &nbsp;</span>
                                    <span className='amd:text-xs'>
                                        {
                                            user?.lastActive && formatDate(user?.lastActive)
                                            ||
                                            user?.dateRegistered && formatDate(user?.dateRegistered)
                                        }
                                    </span>
                                </p>
                            </AccordionContent>
                        </div>
                    )}
                </AccordionTrigger >
            </AccordionItem>
            {isModalOpen && (
                <DeleteModal>
                    <p>
                        {`Are you sure you want to delete ${user?.username}`}
                    </p>
                    <div className='mt-3 w-full text-center flex gap-4 justify-center'>
                        <DeleteCancelButton onClick={() => {
                            setIsModalOpen(false)
                            setUsersToDelete([])
                        }} />
                        <DeleteConfirmButton
                            onClick={() => {
                                deleteUser.mutate()
                                setIsModalOpen(false)
                            }}
                        />
                    </div>
                </DeleteModal>
            )}
        </Fragment>
    )
}

export default User