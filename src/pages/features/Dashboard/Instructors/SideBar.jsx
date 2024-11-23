import { useState, useRef } from 'react'
import { FaHome, FaUserAlt, FaMoneyBill, FaAddressBook, FaCheckDouble } from 'react-icons/fa'
import { FaBookBookmark, FaHatWizard } from 'react-icons/fa6'
import { CgTrending } from 'react-icons/cg'
import { GiShadowFollower } from 'react-icons/gi'
import { Link } from 'react-router-dom'

import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons/faCheckToSlot'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useScrollTop from '../../../../hooks/useScrollTop'
import useHandleClickOutside from '../../../../hooks/useHandleClickOutside'

import AsideBottomNav from '../../../../components/AsideBottomNav'
import usePathAfterSlash from '../../../../hooks/usePathAfterSlash'
import logo from '../../../../assets/images/logo.png'


function SideBar() {

    const pathAfterSlash = usePathAfterSlash();

    const { scrollTop } = useScrollTop();

    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef(null);

    useHandleClickOutside(isOpen, setIsOpen, dropDownRef)

    const navLinks = [
        {
            id: 1,
            text: 'Dashboard',
            icon: <FaHome />,
            path: ''
        },
        {
            id: 2,
            text: 'Enrolled',
            icon: <FaUserAlt />,
            path: 'enrolled'
        },
        {
            id: 3,
            text: 'Selected',
            icon: <FaBookBookmark />,
            path: 'selected'
        },
        {
            id: 4,
            text: 'Payments',
            icon: <FaMoneyBill />,
            path: 'payments'
        },
        {
            id: 5,
            text: 'Add a Class',
            icon: <FaAddressBook />,
            path: 'add-class'
        },
        {
            id: 6,
            text: 'My Classes',
            icon: <FaHatWizard />,
            path: 'my-classes'
        },
        {
            id: 7,
            text: 'Pending Classes',
            icon: <FontAwesomeIcon icon={faCheckToSlot} />,
            path: 'pending-classes'
        },
        {
            id: 8,
            text: 'Approved Classes',
            icon: <FaCheckDouble />,
            path: 'approved-classes'
        },
        {
            id: 9,
            text: 'Earnings',
            icon: <FaCheckDouble />,
            path: 'earnings'
        }
    ]

    return (
        <div>
            <button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar" aria-controls="cta-button-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <aside id="cta-button-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex justify-between flex-col">
                    <div>
                        <ul className="space-y-1 font-medium">
                            <li className='mb-5 select-none'>
                                <Link to='/' onClick={scrollTop}>
                                    <img src={logo} alt="logo image" width='150px' height='150px' className='object-cover' />
                                </Link>
                            </li>
                            {
                                navLinks.map((link) => {
                                    return (
                                        <li key={link.id}>
                                            <Link
                                                to={link.path}
                                                onClick={scrollTop}
                                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                                style={{ backgroundColor: `${(pathAfterSlash === link.path) || (pathAfterSlash === 'instructor-cp' && link.path === '') ? '#010101' : ''}` }}
                                            >
                                                <span className='text-[1.19rem] flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'>
                                                    {link.icon}
                                                </span>
                                                <span className="flex-1 ms-3 whitespace-nowrap text-sm">{link.text}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                            <li>
                                <Link to='/' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <span className='text-[1.19rem] flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'>
                                        <FaHome />
                                    </span>
                                    <span className="flex-1 ms-3 whitespace-nowrap text-sm">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <span className='text-[1.19rem] flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'>
                                        <CgTrending />
                                    </span>
                                    <span className="flex-1 ms-3 whitespace-nowrap text-sm">Trending</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <span className='text-[1.19rem] flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'>
                                        <GiShadowFollower />
                                    </span>
                                    <span className="flex-1 ms-3 whitespace-nowrap text-sm">Following</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <AsideBottomNav setIsOpen={setIsOpen} isOpen={isOpen} dropDownRef={dropDownRef} />
                </div>

            </aside>
        </div>
    )
}

export default SideBar