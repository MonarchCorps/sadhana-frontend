import { FaHome, FaUserAlt, FaMoneyBill } from 'react-icons/fa'
import { FaBookBookmark, FaRegCommentDots } from 'react-icons/fa6'
import { VscGitStashApply } from 'react-icons/vsc'
import { CgTrending } from 'react-icons/cg'
import { GiShadowFollower } from 'react-icons/gi'
import SidebarState from '../SimilarPages/SidebarState'

function SideBar() {

    const navLinks = [
        { id: 1, icon: <FaHome />, text: 'Dashboard', path: '', },
        { id: 2, icon: <FaUserAlt />, text: 'Enrolled', path: 'enrolled' },
        { id: 3, icon: <FaBookBookmark />, text: 'Selected', path: 'selected' },
        { id: 4, icon: <FaRegCommentDots />, text: 'Chat page', path: '/chat' },
        { id: 5, icon: <FaMoneyBill />, text: 'Payments', path: 'payments' },
        { id: 6, icon: <VscGitStashApply />, text: 'Apply for instructor', path: 'apply-instructor' }
    ]

    const extraLinks = [
        { id: 1, text: 'Home', icon: <FaHome />, path: '' },
        { id: 2, text: 'Trending', icon: <GiShadowFollower />, path: '' },
        { id: 3, text: 'Following', icon: <CgTrending />, path: '' },
    ]

    const excludedIndices = [1, 2, 3, 4, 5, 6]
    return (
        <SidebarState navLinks={navLinks} extraLinks={extraLinks} excludedIndices={excludedIndices} comparePath='student-cp' />

    )
}

export default SideBar