import { FaHome, FaUserAlt, FaMoneyBillAlt, FaDiscourse } from 'react-icons/fa'
import { FaBookBookmark, FaKey, FaPhotoFilm, FaRegCommentDots } from 'react-icons/fa6'
import { CgTrending } from 'react-icons/cg'
import { GiShadowFollower } from 'react-icons/gi'
import { RiPassPendingFill } from 'react-icons/ri'
import { MdAddAPhoto } from 'react-icons/md'

import SidebarState from '../SimilarPages/SidebarState'

function SideBar() {

    const navLinks = [
        { id: 1, icon: <FaHome />, text: 'Dashboard', path: '', },
        { id: 2, icon: <FaUserAlt />, text: 'Manage Users', path: 'manage-users' },
        { id: 3, icon: <RiPassPendingFill />, text: 'Pending Instructors', path: 'pending-instructors' },
        { id: 4, icon: <FaRegCommentDots />, text: 'Chat page', path: '/chat' },
        {
            id: 5,
            text: 'Course',
            children: [
                { id: 1, icon: <FaBookBookmark />, text: 'Pending Class', path: 'pending-classes' },
                { id: 2, icon: <FaDiscourse />, text: 'Manage course', path: 'manage-course' }
            ]
        },
        {
            id: 6,
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

    const excludedIndices = [1, 2, 3, 4]

    return (
        <SidebarState navLinks={navLinks} extraLinks={extraLinks} excludedIndices={excludedIndices} comparePath='admin-cp' />
    )
}

export default SideBar