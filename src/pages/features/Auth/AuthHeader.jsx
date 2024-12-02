import logo from '../../../assets/images/logo.png'
import { Link, useLocation } from 'react-router-dom'
import useScrollTop from '../../../hooks/useScrollTop'


function AuthHeader() {

    const { scrollTop } = useScrollTop()
    const location = useLocation()
    const path = location.pathname.split('/')[1]

    return (
        <div className='w-full flex justify-between items-center px-7 py-2 shadow-sm fixed z-[500] backdrop-blur-md'>
            <Link to='/' onClick={scrollTop}>
                <img src={logo} alt="logo image" width='150px' height='150px' className='object-cover' />
            </Link>
            {
                path === 'register' || path === 'register/' ? (
                    <Link to='/auth' className='bg-slate-900 text-slate-100 py-2 px-3 rounded-md text-sm font-sans transition-all border border-solid border-current hover:bg-slate-50 hover:text-slate-900 xsm:px-2 xsm:text-xs' onClick={scrollTop}>Login</Link>
                ) : (
                    <Link to='/register' className='bg-slate-900 text-slate-100 py-2 px-3 rounded-md text-sm font-sans transition-all border border-solid border-current hover:bg-slate-50 hover:text-slate-900 xsm:px-2 xsm:text-xs' onClick={scrollTop}>Register</Link>
                )
            }
        </div>
    )
}

export default AuthHeader