import { FaHome, FaUserAlt, FaMoneyBill, FaAddressBook, FaCheckDouble } from 'react-icons/fa'
import { FaBookBookmark, FaHatWizard } from 'react-icons/fa6'
import { CgTrending } from 'react-icons/cg'
import { GiShadowFollower } from 'react-icons/gi'

import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons/faCheckToSlot'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SidebarState from '../SimilarPages/SidebarState'

function SideBar() {

    const navLinks = [
        { id: 1, text: 'Dashboard', icon: <FaHome />, path: '' },
        { id: 2, text: 'Enrolled', icon: <FaUserAlt />, path: 'enrolled' },
        { id: 3, text: 'Selected', icon: <FaBookBookmark />, path: 'selected' },
        { id: 4, text: 'Payments', icon: <FaMoneyBill />, path: 'payments' },
        {
            id: 5,
            text: 'Course',
            children: [
                { id: 1, icon: <FaAddressBook />, text: 'Add a course', path: 'add-class' },
                { id: 2, icon: <FaHatWizard />, text: 'My courses', path: 'my-classes' },
                { id: 3, icon: <FontAwesomeIcon icon={faCheckToSlot} />, text: 'Pending courses', path: 'pending-classes' },
                { id: 4, icon: <FaCheckDouble />, text: 'Approved courses', path: 'approved-classes' }
            ]
        },
        { id: 6, text: 'Earnings', icon: <FaCheckDouble />, path: 'earnings' }
    ]

    const extraLinks = [
        { id: 1, text: 'Home', icon: <FaHome />, path: '' },
        { id: 2, text: 'Trending', icon: <GiShadowFollower />, path: '' },
        { id: 3, text: 'Following', icon: <CgTrending />, path: '' },
    ]

    const excludedIndices = [1, 2, 3, 4, 6]

    return (
        <SidebarState navLinks={navLinks} extraLinks={extraLinks} excludedIndices={excludedIndices} comparePath='instructor-cp' />
    )
}

export default SideBar