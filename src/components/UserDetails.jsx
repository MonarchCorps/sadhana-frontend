/* eslint-disable react/prop-types */
import { format } from 'date-fns'

function UserDetails({ user }) {

    // I am converting the roles object to an array. In my backend login and register, i am sending the roles as an array but in other places as an obj
    const roles = Array.isArray(user?.roles) ? user?.roles : Object.values(user?.roles).filter(Boolean)

    return (
        <div className='grid grid-cols-3 md:grid-cols-2 xsm:grid-cols-1 gap-4 ism:gap-5 p-5 bg-[#8786861e] rounded'>
            <div className='flex flex-col gap-1 break-words border-b border-solid border-slate-300 pb-2'>
                <span className='font-600 text-base text-[#1f2937] sm:text-sm'>User id: </span>
                <span className='sm:text-xs'>{user?._id}</span>
            </div>
            <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2'>
                <span className='font-600 text-base text-[#1f2937] sm:text-sm'>Address: </span>
                <span className='sm:text-xs'>{user?.address || 'Not available'}</span>
            </div>
            <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2'>
                <span className='font-600 text-base text-[#1f2937] sm:text-sm'>Email: </span>
                <span className='sm:text-xs'>{user?.email}</span>
            </div>
            <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2'>
                <span className='font-600 text-base text-[#1f2937] sm:text-sm'>Phone Number</span>
                <span className='sm:text-xs'>{user?.phoneNumber}</span>
            </div>
            <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2 sm:hidden'>
                <span className='font-600 text-base text-[#1f2937] sm:text-sm'>Gender</span>
                <span className='sm:text-xs'>
                    {user?.gender && (user?.gender.charAt(0).toUpperCase() + user?.gender.slice(1))}
                </span>
            </div>
            <div className='flex flex-col gap-2 border-b border-solid border-slate-300 pb-2 sm:hidden'>
                <span className='font-600 text-base text-[#1f2937] sm:text-sm'>Roles</span>
                <span className='font-500 text-base tracking-tight align-text-top -mb-1'>
                    <span className='sm:text-xs'>
                        {roles?.includes(parseInt(import.meta.env.VITE_ADMIN_CODE)) && (
                            <span className='border border-solid border-[#15433c] bg-[#45837a1a] text-[#15433c] px-4 mr-1 rounded-2xl'>
                                <span className='text-[0.8rem] sm:text-xs'>Admin </span>
                            </span>
                        )}
                        {roles?.includes(parseInt(import.meta.env.VITE_INSTRUCTOR_CODE)) && (
                            <span className='border border-solid border-[#4358d1] bg-[#2e387122] text-[#4358d1] px-4 mr-1 rounded-2xl'>
                                <span className='text-[0.8rem] sm:text-xs'>Instructor </span>
                            </span>
                        )}
                        {roles?.includes(parseInt(import.meta.env.VITE_USER_CODE)) && (
                            <span className='border border-solid border-[#d143ab] bg-[#2e387122] text-[#d143ab] px-4 rounded-2xl'>
                                <span className='text-[0.8rem] sm:text-xs'>User </span>
                            </span>
                        )}
                    </span>
                </span>
            </div>
            <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2 sm:hidden'>
                <span className='font-600 text-base text-[#1f2937] sm:text-sm'>Date Registered</span>
                <span className='sm:text-xs'>{user?.dateRegistered && format(user?.dateRegistered, "MMMM dd, yyyy")}</span>
            </div>
            <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2 sm:hidden'>
                <span className='font-600 text-base text-[#1f2937] sm:text-sm'>Number of uploaded courses</span>
                <span className='sm:text-xs'>{user?.courseCount || 0}</span>
            </div>
            <div className='flex flex-col gap-1 sm:hidden'>
                <span className='font-600 text-base text-[#1f2937] sm:text-sm'>Number of selected courses</span>
                <span className='sm:text-xs'>{user?.selectedCourses?.length || 0}</span>
            </div>
        </div>
    )
}

export default UserDetails