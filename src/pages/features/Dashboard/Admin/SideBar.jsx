import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { FaHome, FaUserAlt, FaMoneyBillAlt, FaDiscourse } from 'react-icons/fa'
import { FaBookBookmark, FaKey, FaPhotoFilm } from 'react-icons/fa6'
import { CgTrending } from 'react-icons/cg'
import { GiShadowFollower } from 'react-icons/gi'
import { RiPassPendingFill } from 'react-icons/ri'
import { MdAddAPhoto } from 'react-icons/md'

import useScrollTop from '../../../../hooks/useScrollTop'
import useHandleClickOutside from '../../../../hooks/useHandleClickOutside'
import logo from '../../../../assets/images/logo.png'
import AsideBottomNav from '../../../../components/AsideBottomNav'
import usePathAfterSlash from '../../../../hooks/usePathAfterSlash'

import {
    Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarSeparator
} from "@/components/ui/sidebar"
import { ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

function SideBar() {

    const pathAfterSlash = usePathAfterSlash();
    const { scrollTop } = useScrollTop();

    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef(null);

    useHandleClickOutside(isOpen, setIsOpen, dropDownRef)

    const isActiveFunc = (path) => {
        const isAdminPath = pathAfterSlash === 'admin-cp' && path === '';
        const isExactPath = pathAfterSlash === path;
        return {
            isActive: isAdminPath || isExactPath
        }
    }

    const getActiveStyles = (path) => {
        if (isActiveFunc(path).isActive) {
            return {
                backgroundColor: '#1f1e1e',
                color: '#eee',
                fontWeight: '700'
            };
        }
        return {}
    }

    const navLinks = [
        { id: 1, icon: <FaHome />, text: 'Dashboard', path: '', },
        { id: 2, icon: <FaUserAlt />, text: 'Manage Users', path: 'manage-users' },
        { id: 3, icon: <RiPassPendingFill />, text: 'Pending Instructors', path: 'pending-instructors' },
        {
            id: 4,
            icon: <FaBookBookmark />,
            text: 'Course',
            children: [
                { id: 1, icon: <FaBookBookmark />, text: 'Pending Class', path: 'pending-classes' },
                { id: 2, icon: <FaDiscourse />, text: 'Manage course', path: 'manage-course' }
            ]
        },
        {
            id: 5,
            icon: <MdAddAPhoto />,
            text: 'Custom photo',
            children: [
                { id: 1, icon: <MdAddAPhoto />, text: 'Upload photo', path: 'custom-photo/manage' },
                { id: 2, icon: <FaPhotoFilm />, text: 'View photos', path: 'custom-photo/view' }
            ]
        }
    ]

    const extraLinks = [
        { id: 1, icon: <FaHome />, text: 'Home', path: '' },
        { id: 2, icon: <FaKey />, text: 'Security & access', path: '' },
        { id: 3, icon: <FaMoneyBillAlt />, text: 'Payments', path: '' },
        { id: 4, icon: <CgTrending />, text: 'Trending', path: '' },
        { id: 5, icon: <GiShadowFollower />, text: 'Following', path: '' },
    ]

    const [openItems, setOpenItems] = useState({});

    const toggleItem = (id) => {
        setOpenItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const excludedIndices = [1, 2, 3]

    return (

        <Sidebar >
            <SidebarHeader>
                <Link to="/" onClick={scrollTop} className='bg-white -m-2 p-2'>
                    <img
                        src={logo}
                        alt="logo image"
                        width="150px"
                        height="150px"
                        className="object-cover mb-2 text-slate-50 bg-blend-lighten"
                    />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navLinks.map((link, index) => (
                                excludedIndices.includes(index + 1) ? (
                                    <SidebarMenuItem key={link.id}>
                                        <SidebarMenuButton asChild isActive={isActiveFunc(link.path).isActive} style={getActiveStyles(link.path)} >
                                            <Link to={link.path} className="flex" onClick={scrollTop}>
                                                <span className='w-fit'>
                                                    {link?.icon}
                                                </span>
                                                <span>{link.text}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ) : (
                                    <Collapsible
                                        key={link.id}
                                        open={!!openItems[link.id]}
                                        onOpenChange={() => toggleItem(link.id)}
                                        className="group/collapsible"
                                        defaultOpen={true}
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton asChild>
                                                    <div className="flex justify-between cursor-pointer">
                                                        <span>{link.text}</span>
                                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                                    </div>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    <SidebarMenuSubItem>
                                                        {
                                                            link?.children.map(childLink => (
                                                                <SidebarMenuButton key={childLink.id} asChild isActive={isActiveFunc(link.path).isActive} style={getActiveStyles(childLink.path)} >
                                                                    <Link to={childLink.path} className="flex" onClick={scrollTop}>
                                                                        <span className='w-fit'>
                                                                            {childLink.icon}
                                                                        </span>
                                                                        <span>{childLink.text}</span>
                                                                        {/* <childLink.icon /> */}
                                                                    </Link>
                                                                </SidebarMenuButton>
                                                            ))
                                                        }
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                )
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator className="bg-slate-200" />
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {extraLinks.map(link => (
                                <SidebarMenuItem key={link.id}>
                                    <SidebarMenuButton asChild>
                                        <Link to={link.path} className="flex justify-between">
                                            <span>{link.text}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <AsideBottomNav />
        </Sidebar>
    )
}

export default SideBar