import { FaUserAltSlash } from 'react-icons/fa'
import { GiTeacher } from 'react-icons/gi'
import useAuth from '../hooks/useAuth'
import useLogout from '../hooks/useLogout'
import useScrollTop from '../hooks/useScrollTop'
import { Link, useNavigate } from 'react-router-dom'
import { AdminOnly, UserAndInstructor, UserOnly } from '../utils/rolePermission'
import { IKImage } from 'imagekitio-react'
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { BadgeCheck, ChevronsUpDown, LogOut, Sparkles } from 'lucide-react'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'

function AsideBottomNav() {

    const { auth } = useAuth()
    const { logout } = useLogout()
    const { scrollTop } = useScrollTop()
    const navigate = useNavigate()

    const { screenWidth } = useGetScreenWidth()

    const userOnly = UserOnly()
    const userAndInstructor = UserAndInstructor()
    const adminOnly = AdminOnly()

    const handleProfileNavigate = () => {
        setTimeout(() => {
            if (userOnly) {
                return navigate('/dashboard/student-cp/details/edit-profile')
            } else if (userAndInstructor) {
                return navigate('/dashboard/instructor-cp/details/edit-profile')
            } else if (adminOnly) {
                return navigate('/dashboard/admin-cp/details/edit-profile')
            } else {
                navigate('/dashboard')
            }
            scrollTop();
        }, 200)
    }

    const getOffset = () => {
        if (screenWidth <= 333) {
            return -230
        } else if (screenWidth <= 357) {
            return -200
        } else if (screenWidth <= 406) {
            return -170
        } else if (screenWidth <= 455) {
            return -130
        } else if (screenWidth <= 547) {
            return -30
        } else if (screenWidth <= 504) {
            return -80
        } else {
            return -4
        }
    }

    const handleInstNavigate = () => {
        setTimeout(() => {
            navigate('/dashboard/instructor-cp/edit-instructor-profile')
            scrollTop();
        }, 200)


    }

    return (
        <SidebarFooter className="cursor-pointer">
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <IKImage
                                    key={auth?.profileImage}
                                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                    path={auth?.profileImage}
                                    className="h-8 w-8 rounded-lg"
                                    loading='lazy'
                                    lqip={{
                                        active: true,
                                        quality: 20
                                    }}
                                    alt={`${auth?.username} image`}
                                />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{auth?.name}</span>
                                    <span className="truncate text-xs">{auth?.email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg z-[1000] relative"
                            side={"right"}
                            sideOffset={getOffset()}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <IKImage
                                        key={auth?.profileImage}
                                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                        path={auth?.profileImage}
                                        className="h-8 w-8 rounded-lg"
                                        loading='lazy'
                                        lqip={{
                                            active: true,
                                            quality: 20
                                        }}
                                        alt={`${auth?.username} image`}
                                    />
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{auth?.username}</span>
                                        <span className="truncate text-xs">{auth?.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Link className='flex gap-1 items-center'>
                                        <Sparkles />
                                        Bot
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <SidebarMenuButton>
                                        <BadgeCheck />
                                        Account
                                    </SidebarMenuButton>
                                </DropdownMenuItem>
                                <div onClick={() => handleProfileNavigate()}>
                                    <DropdownMenuItem >
                                        <SidebarMenuButton>
                                            <span>
                                                <FaUserAltSlash />
                                            </span>
                                            <span className='font-sans font-500 text-[0.93rem] text-[#100f0f]'>Edit profile</span>
                                        </SidebarMenuButton>
                                    </DropdownMenuItem>
                                </div>
                                {
                                    userAndInstructor && (
                                        <div onClick={() => handleInstNavigate()}>
                                            <DropdownMenuItem >
                                                <SidebarMenuButton>
                                                    <span>
                                                        <GiTeacher />
                                                    </span>
                                                    <span className='font-sans font-500 text-[0.93rem] text-[#100f0f]'>Edit Instructor profile</span>
                                                </SidebarMenuButton>
                                            </DropdownMenuItem>
                                        </div>)
                                }
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout} className="cursor-pointer">
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}

export default AsideBottomNav