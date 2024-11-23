/* eslint-disable react/prop-types */
import { format } from 'date-fns'

function UserDetails({ user, uploadedCourse = [], selectedCourses = [] }) {

    // I am converting the roles object to an array. In my backend login and register, i am sending the roles as an array but in other places as an obj
    const roles = Array.isArray(user?.roles) ? user?.roles : Object.values(user?.roles).filter(Boolean)

    return (
        <div className='grid grid-cols-3 gap-4 p-5 bg-[#8786861e] rounded'>
            <div className='flex flex-col gap-1'>
                <span className='font-600 text-base text-[#1f2937]'>User id: </span>
                <span>{user?._id}</span>
            </div>
            <div className='flex flex-col gap-1'>
                <span className='font-600 text-base text-[#1f2937]'>Address: </span>
                <span>{user?.address}</span>
            </div>
            <div className='flex flex-col gap-1'>
                <span className='font-600 text-base text-[#1f2937]'>Email: </span>
                <span>{user?.email}</span>
            </div>
            <div className='flex flex-col gap-1'>
                <span className='font-600 text-base text-[#1f2937]'>Phone Number</span>
                <span>{user?.phoneNumber}</span>
            </div>
            <div className='flex flex-col gap-1'>
                <span className='font-600 text-base text-[#1f2937]'>Gender</span>
                <span>
                    {user?.gender && (user?.gender.charAt(0).toUpperCase() + user?.gender.slice(1))}
                </span>
            </div>
            <div className='flex flex-col gap-2'>
                <span className='font-600 text-base text-[#1f2937]'>Roles</span>
                <span className='font-500 text-base tracking-tight align-text-top -mb-1'>
                    <span>
                        {roles?.includes(parseInt(import.meta.env.VITE_ADMIN_CODE)) && (
                            <span className='border border-solid border-[#15433c] bg-[#45837a1a] text-[#15433c] px-4 mr-1 rounded-2xl'>
                                <span className='text-[0.8rem]'>Admin </span>
                            </span>
                        )}
                        {roles?.includes(parseInt(import.meta.env.VITE_INSTRUCTOR_CODE)) && (
                            <span className='border border-solid border-[#4358d1] bg-[#2e387122] text-[#4358d1] px-4 mr-1 rounded-2xl'>
                                <span className='text-[0.8rem]'>Instructor </span>
                            </span>
                        )}
                        {roles?.includes(parseInt(import.meta.env.VITE_USER_CODE)) && (
                            <span className='border border-solid border-[#d143ab] bg-[#2e387122] text-[#d143ab] px-4 rounded-2xl'>
                                <span className='text-[0.8rem]'>User </span>
                            </span>
                        )}
                    </span>
                </span>
            </div>
            <div className='flex flex-col gap-1'>
                <span className='font-600 text-base text-[#1f2937]'>Date Registered</span>
                <span>{user?.dateRegistered && format(user?.dateRegistered, "MMMM dd, yyyy")}</span>
            </div>
            <div className='flex flex-col gap-1'>
                <span className='font-600 text-base text-[#1f2937]'>Number or uploaded courses</span>
                <span>{uploadedCourse?.length || 0}</span>
            </div>
            <div className='flex flex-col gap-1'>
                <span className='font-600 text-base text-[#1f2937]'>Number or selected courses</span>
                <span>{selectedCourses?.length || 0}</span>
            </div>
        </div>
    )
}

export default UserDetails