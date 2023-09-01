import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import NavMobile from './NavbarMobile';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    // const [modal, setModal] = useState(false);
    // const [isLogin, setIsLogin] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    }

    // useEffect(() => {
    //     const authToken = localStorage.getItem('authToken');
    //     if (authToken) {
    //         setIsLogin(true);
    //     }
    // }, []);

    // const handleLogin = () => {
    //     window.location.href = "/SignIn"
    // }

    // const handleLogout = () => {
    //     localStorage.clear();
    //     setIsLogin(false);
    //     window.location.href = "/SignIn"
    // }

    // const handleModal = () => {
    //     setModal(true);
    // }

    return (
        <nav className='bg-[#edeae4] shadow-2xl'>
            <div className='flex items-center font-medium justify-around'>
                <div className='z-50 p-1 md:w-auto w-full flex justify-between'>
                    <Link to="/">
                        <img src="/img/logo.png" alt="logoIcon" className='md:cursor-pointer mx-5 md:mx-0 w-[65px] h-[65px] lg:w-[75px] lg:h-[75px]' />
                    </Link>
                    <div className='block md:hidden my-6 px-9  text-xl' onClick={toggleMenu}>
                        {open ? <FaTimes /> : <FaBars />}
                    </div>
                </div>

                <ul className='md:flex hidden items-center text-[16.5px] gap-8 text-black font-semibold '>
                    <li className='py-7 px-3 inline-block hover:text-[#f1cb8e]'>
                        <Link to="/" className=''>
                            Home
                        </Link>
                    </li>
                    <li className='py-7 px-3 inline-block hover:text-[#f1cb8e]'>
                        <Link to="/">
                            Product
                        </Link>
                    </li>
                    <li className='py-7 px-3 inline-block hover:text-[#ff3333]'>
                        <Link to="/">
                            About Us
                        </Link>
                    </li>
                    <li className='py-7 px-3 inline-block hover:text-[#ff3333]'>
                        <Link to="/">
                            Our Store
                        </Link>
                    </li>
                    <li className='py-7 px-3 inline-block hover:text-[#ff3333]'>
                        <Link to="/">
                            <FaShoppingCart />
                        </Link>
                    </li>
                </ul>

                <div className='md:block hidden text-white font-semibold'>
                    <button className="border-[2px] rounded-full text-[15px] bg-[#d0161f] hover:bg-[#ff3333] px-[25px] py-[7px]">Sign In</button>
                    <button className="border-[2px] rounded-full text-[15px] bg-[#e9ac4a] hover:bg-[#f1cb8e] px-[25px] py-[7px]">Sign Up</button>
                </div>

                {/* Mobile Progresive Navbar */}
                <NavMobile open={open} toggleMenu={toggleMenu}/>

            </div>
        </nav>
    )
}

export default Navbar