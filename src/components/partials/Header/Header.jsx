import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa6'
import logo from '../../../assets/images/logo.png'
import Nav from './Nav'
import useAuth from '../../../hooks/useAuth'
import useScrollTop from '../../../hooks/useScrollTop'
import DropDownDetails from './DropDownDetails'
import { SidebarProvider } from '@/components/ui/sidebar'

function Header() {

    const { auth } = useAuth();
    const { scrollTop } = useScrollTop();

    return (
        <SidebarProvider>
            <header className='fixed top-0 w-full z-[800] backdrop-blur-sm'>
                <div className='flex justify-between max-w-[95%] mx-auto items-center h-[4.4rem] p-2' >
                    <div>
                        <Link to='/' onClick={scrollTop}>
                            <img src={logo} alt="logo image" width='150px' height='150px' className='object-cover' />
                        </Link>
                    </div>
                    <Nav />
                    {
                        !auth?._id ? (
                            <div className='grid grid-flow-col mr-4 gap-4 items-center h-full'>
                                <div className='block hmd:hidden'>
                                    <Link to='/auth' onClick={scrollTop} className='border border-solid border-[#0b0b0b] px-9 py-[0.6rem] rounded-full text-[0.95rem] text-[#0b0b0b] bg-transparent shadow-md hover:bg-[#252525] hover:text-[#e8e7e7] transition' title='login'>
                                        <span >Login</span>
                                    </Link>
                                </div>
                                <div className='block lg:hidden'>
                                    <Link to='/register' onClick={scrollTop} className='border border-solid border-[#0b0b0b] w-fit px-9 py-3 rounded-full text-[0.82rem] text-[#e8e7e7] bg-[#0b0b0b] shadow-xl hover:bg-[#e8e7e7] hover:text-[#252525] grid grid-flow-col items-center' title='register'>
                                        <span className='-ml-3 mr-2'>Sign Up</span>
                                        <span className='w-3 -mr-2.5'><FaUser /></span>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className='hrmd:mr-8'>
                                <DropDownDetails />
                            </div>
                        )
                    }
                </div>
            </header>
        </SidebarProvider>
    )
}

export default Header