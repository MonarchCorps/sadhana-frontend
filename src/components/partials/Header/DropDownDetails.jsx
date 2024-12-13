import { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { LuLayoutDashboard } from 'react-icons/lu'
import { FaRightFromBracket } from 'react-icons/fa6'
import { IKImage } from 'imagekitio-react'

import useAuth from '../../../hooks/useAuth'
import useLogout from '../../../hooks/useLogout'
import useScrollTop from '../../../hooks/useScrollTop'

function DropDownDetails() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { auth } = useAuth();
    const { logout } = useLogout();
    const { scrollTop } = useScrollTop()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const links = [
        {
            id: 1,
            name: 'Profile',
            icon: <FaUserAlt />,
            link:
                auth?.roles?.includes(5150)
                    ? '/dashboard/admin-cp/details/edit-profile'
                    : auth?.roles?.includes(1984)
                        ? '/dashboard/instructor-cp/details/edit-profile'
                        : auth?.roles?.includes(2001)
                            ? '/dashboard/student-cp/details/edit-profile'
                            : '/auth'
        },
        {
            id: 2,
            name: 'Dashboard',
            icon: <LuLayoutDashboard />,
            link: '/dashboard'
        }
    ]


    return (
        <Box>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <div>
                    {links.map((link) => (
                        <MenuItem key={link.id}>
                            <Link to={link.link} onClick={scrollTop}>
                                <Typography className='text-center text-[1.124rem] flex gap-3'>
                                    {link?.icon}
                                    {link.name}
                                </Typography>
                            </Link>
                        </MenuItem>
                    ))}
                    <MenuItem >
                        <Typography className='text-center text-[1.124rem] flex gap-3' onClick={logout}>
                            <FaRightFromBracket />
                            Logout
                        </Typography>
                    </MenuItem>
                </div>
            </Menu>
        </Box>
    );
}

export default DropDownDetails;