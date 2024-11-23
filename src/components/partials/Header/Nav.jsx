import { Link } from 'react-router-dom'
import useScrollTop from '../../../hooks/useScrollTop'
import useAuth from '../../../hooks/useAuth';

function Nav() {

    const { scrollTop } = useScrollTop();
    const { auth } = useAuth()

    const links = [
        { id: 1, link: 'Home', path: '/' },
        { id: 2, link: 'Instructors', path: '/instructor' },
        { id: 3, link: 'Classes', path: '/class' },
        { id: 4, link: 'About us', path: '/about' },
        { id: 5, link: 'Subscribe', path: '/' }
    ]

    return (
        <nav className="grid place-items-center h-full">
            <ul className="flex gap-5">
                {
                    links.map(link => {
                        return (
                            <li key={link.id} className="text-base font-500 text-[#0b0b0b]">
                                <Link to={link.path} onClick={scrollTop}>{link.link}</Link>
                            </li>

                        )
                    })
                }

                {
                    auth?.roles && (
                        <Link
                            className="text-base font-500 text-[#0b0b0b]"
                            to='/dashboard'
                            onClick={scrollTop}
                        >
                            Dashboard
                        </Link>
                    )
                }
            </ul>
        </nav>
    )
}

export default Nav