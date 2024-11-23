import logo from '../../../assets/images/logo.png'
import { Link } from 'react-router-dom'
import useScrollTop from '../../../hooks/useScrollTop'

function Footer() {

    const date = new Date();
    const year = date.getFullYear();
    const { scrollTop } = useScrollTop();

    return (
        <footer className="bg-[#FAF5EF]">
            <div className='pt-12 max-w-[90%] mx-auto'>
                <div className='grid grid-cols-4 gap-6 pb-8 border-solid border-b-[1px] border-[#b6b2b2]'>
                    <div className='w-[107%]'>
                        <Link to='/' onClick={scrollTop}>
                            <img src={logo} alt="logo image" width='150px' height='150px' className='object-cover' />
                        </Link>
                        <p className="text-[15px] leading-[1.69] text-[#3a3939] font-400 opacity-80 mt-6 ">
                            Aptent eleifend sem pede consectetuer vel felis amet pharetra. Ipsum dapibus cubilia potenti elit risus erat ut.
                        </p>
                    </div>
                    <div className='text-center grid place-items-center'>
                        <div className='text-justify'>
                            <h1 className='font-600 mb-3 text-xl text-[#171717]'>About</h1>
                            <h3 className='text-[#292828] text-base mb-2'>Our Story</h3>
                            <h3 className='text-[#292828] text-base mb-2'>Services</h3>
                            <h3 className='text-[#292828] text-base mb-2'>Pricing</h3>
                            <h3 className='text-[#292828] text-base mb-2'>Our Trainer</h3>
                        </div>
                    </div>
                    <div>
                        <div className='text-justify'>
                            <h1 className='font-600 mb-3 text-xl text-[#171717]'>Join</h1>
                            <h3 className='text-[#292828] text-base mb-2'>Our Class</h3>
                            <h3 className='text-[#292828] text-base mb-2'>Events</h3>
                            <h3 className='text-[#292828] text-base mb-2'>Programs</h3>
                            <h3 className='text-[#292828] text-base mb-2'>Registration Form</h3>
                        </div>
                    </div>
                    <div>
                        <h1 className='font-600 mb-3 text-xl text-[#171717]'>Contact</h1>
                        <h3 className='text-[#292828] text-base mb-2'>7, Monarch Corps Street, opposite CBN - United States Of Monarch</h3>
                        <h3 className='text-[#292828] text-base mb-2'>
                            <a href="mailto:monarchcorps01@gmail.com">monarchcorps01@gmail.com</a>
                        </h3>
                        <h3 className='text-[#292828] text-base mb-2'>
                            <a href="tel:+2348081135966">+234 808 1135 966</a>
                        </h3>
                    </div>
                </div>
                <div className='px-4 py-9 text-center'>
                    <p className="text-sm">
                        Copyright © {year} Sadhana, All rights reserved. Powered by Monarch Corps
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer