import { Link } from 'react-router-dom'
import useScrollTop from '../../../hooks/useScrollTop'
import useAuth from '../../../hooks/useAuth'
import { FaUser } from 'react-icons/fa6'
import logo from '../../../assets/images/logo.png'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import AsideBottomNav from '@/components/AsideBottomNav'
import { IKImage } from 'imagekitio-react'

function Nav() {

    const { scrollTop } = useScrollTop();
    const { auth } = useAuth()
    const { isMobile } = useSidebar()

    const links = [
        { id: 1, link: 'Home', path: '/' },
        { id: 2, link: 'Instructors', path: '/instructor' },
        { id: 3, link: 'Classes', path: '/class' },
        { id: 4, link: 'About us', path: '/about' },
        { id: 5, link: 'Subscribe', path: '/' }
    ]

    return (
        <>
            <nav className="grid hmd:hidden place-items-center h-full ">
                <ul className="flex gap-5">
                    {links.map(link => {
                        return (
                            <li key={link.id} className="text-base font-500 text-[#0b0b0b]"><Link to={link.path} onClick={scrollTop}>{link.link}</Link></li>)
                    })}

                    {auth?._id && (
                        <Link className="text-base font-500 text-[#0b0b0b]" to='/dashboard' onClick={scrollTop}>
                            Dashboard
                        </Link>
                    )}
                </ul>
            </nav >
            <div className='hidden hmd:block'>
                <SidebarTrigger className='fixed top-4 right-1 z-[2000] bg-black text-white rounded-md' />
                <Sidebar side='right' className='bg-slate-50' >
                    <SidebarHeader className='my-3 z-[1000]'>
                        {isMobile && auth?._id ? (
                            <div className='w-full flex justify-end'>
                                <IKImage
                                    urlEndpoint={"https://ik.imagekit.io/4sbkuudrb"}
                                    path={auth?.profileImage}
                                    className='rounded-full object-cover w-12 h-12'
                                    loading='lazy'
                                    lqip={{
                                        active: true,
                                        quality: 20
                                    }}
                                    alt={`${auth?.username} image`}
                                />
                            </div>
                        ) : !isMobile && auth?._id
                            ? <div className='w-full flex justify-start'>
                                <IKImage
                                    urlEndpoint={"https://ik.imagekit.io/4sbkuudrb"}
                                    path={auth?.profileImage}
                                    className='rounded-full object-cover w-12 h-12'
                                    loading='lazy'
                                    lqip={{
                                        active: true,
                                        quality: 20
                                    }}
                                    alt={`${auth?.username} image`}
                                />
                            </div>
                            : (
                                <Link to='/' onClick={scrollTop}>
                                    <img src={logo} alt="logo image" width='150px' height='150px' className='object-cover' />
                                </Link>
                            )}
                    </SidebarHeader>
                    <SidebarContent className='px-3'>
                        <SidebarGroup>
                            <SidebarGroupContent >
                                <SidebarMenu asChild className='flex flex-col gap-4'>
                                    {
                                        links.map(link => {
                                            return (
                                                <SidebarMenuItem key={link.id}>
                                                    <li className="text-base font-500 text-[#0b0b0b] border-b border-solid border-b-slate-200 pb-1"><Link to={link.path} onClick={scrollTop}>{link.link}</Link></li>
                                                </SidebarMenuItem>
                                            )
                                        })
                                    }
                                    {auth?._id && (
                                        <Link className="text-base font-500 text-[#0b0b0b]" to='/dashboard' onClick={scrollTop}>
                                            Dashboard
                                        </Link>
                                    )}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarMenu>
                            {
                                !auth?._id ? (
                                    <div className='w-full'>
                                        <SidebarMenuItem>
                                            <Link to='/auth' onClick={scrollTop} title='login' >
                                                <div className='border border-solid border-[#0b0b0b] px-9 py-[0.6rem] rounded text-[0.95rem] text-[#0b0b0b] bg-transparent shadow-md hover:bg-[#252525] hover:text-[#e8e7e7] hover:rounded-full transition-all w-full text-center mb-3'>Login</div>
                                            </Link>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <Link to='/register' onClick={scrollTop} title='register'>
                                                <div className='border border-solid border-[#0b0b0b] px-9 py-3 rounded-full text-[0.82rem] text-[#e8e7e7] bg-[#0b0b0b] shadow-xl hover:bg-[#e8e7e7] hover:text-[#252525] hover:rounded-none transition-all flex justify-center items-center w-full'>
                                                    <span className='-ml-3 mr-2'>Sign Up</span>
                                                    <span className='w-3 -mr-2.5'><FaUser /></span>
                                                </div>
                                            </Link>
                                        </SidebarMenuItem>
                                    </div>
                                ) : (
                                    <AsideBottomNav />
                                )
                            }
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
            </div>
        </>
    )
}

export default Nav