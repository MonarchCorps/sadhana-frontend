/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import {
    Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarSeparator,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import { ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import usePathAfterSlash from '@/hooks/usePathAfterSlash'
import useScrollTop from '@/hooks/useScrollTop'

import logo from '../../../../assets/images/logo.png'
import AsideBottomNav from '@/components/AsideBottomNav';
import { Fragment } from 'react';

function SidebarState({ navLinks, extraLinks, excludedIndices, comparePath }) {

    const { scrollTop } = useScrollTop();
    const pathAfterSlash = usePathAfterSlash();

    const isActiveFunc = (path) => {
        const isAdminPath = pathAfterSlash === comparePath && path === '';
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

    return (
        <Fragment>
            <SidebarTrigger className="z-[500] fixed top-0" />
            <Sidebar className='bg-slate-50 z-[800] h-full'>
                <SidebarHeader className='flex flex-row p-0 justify-between'>
                    <Link to='/' onClick={scrollTop} className='p-2'>
                        <img
                            src={logo}
                            alt='logo image'
                            width='150px'
                            height='150px'
                            className='object-cover mb-2 text-slate-50 '
                        />
                    </Link>
                    <SidebarTrigger className="z-[1000]" />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navLinks.map((link, index) => (
                                    excludedIndices.includes(index + 1) ? (
                                        <SidebarMenuItem key={link.id}>
                                            <SidebarMenuButton asChild isActive={isActiveFunc(link.path).isActive} style={getActiveStyles(link.path)} >
                                                <Link to={link.path} className='flex' onClick={scrollTop}>
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
                                            className='group/collapsible'
                                            defaultOpen={true}
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton asChild>
                                                        <div className='flex justify-between cursor-pointer'>
                                                            <span>{link.text}</span>
                                                            <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
                                                        </div>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        <SidebarMenuSubItem>
                                                            {
                                                                link?.children.map(childLink => (
                                                                    <SidebarMenuButton key={childLink.id} asChild isActive={isActiveFunc(link.path).isActive} style={getActiveStyles(childLink.path)} >
                                                                        <Link to={childLink.path} className='flex' onClick={scrollTop}>
                                                                            <span className='w-fit'>
                                                                                {childLink.icon}
                                                                            </span>
                                                                            <span>{childLink.text}</span>
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
                    <SidebarSeparator className='bg-slate-200' />
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {extraLinks.map(link => (
                                    <SidebarMenuItem key={link.id}>
                                        <SidebarMenuButton asChild>
                                            <Link to={link.path} className='flex justify-between'>
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
        </Fragment>
    )
}

export default SidebarState