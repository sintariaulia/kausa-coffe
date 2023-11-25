import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import LogoKausa from '../../assets/logo.png';
import NavMobile from './NavbarMobile';
import { FaBars, FaTimes } from 'react-icons/fa';
import './navbar.css';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    // const [modal, setModal] = useState(false);
    // const [isLogin, setIsLogin] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    }

    useEffect(() => {
        setOpen(false);
      }, [location.pathname]);

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
        <nav className='fixed w-full z-10 bg-[#edeae4] shadow-xl'>
            <div className='flex items-center font-medium justify-around'>
                <div className='2xl:ml-32 p-1 md:w-auto w-full flex justify-between'>
                    <Link to="/">
                        <img src={LogoKausa} alt="LogoKausa" className='md:cursor-pointer mx-5 md:mx-0 w-[65px] h-[65px] lg:w-[75px] lg:h-[75px]' />
                    </Link>
                    <div className='block md:hidden my-6 px-9  text-xl' onClick={toggleMenu}>
                        {open ? <FaTimes /> : <FaBars />}
                    </div>
                </div>

                <ul className='md:flex hidden items-center text-[16.5px] 2xl:pl-48 gap-8 text-[#675e51] font-bold '>
                    <li className={`py-7 px-3 inline-block ${location.pathname === '/' ? 'active-menu' : ''}`}>
                        <Link to="/" className=''>
                            Home
                        </Link>
                    </li>
                    <li className={`py-7 px-3 inline-block ${location.pathname === '/produks' ? 'active-menu' : ''}`}>
                        <Link to="/produks">
                            Product
                        </Link>
                    </li>
                    <li className={`py-7 px-3 inline-block ${location.pathname === '/aboutus' ? 'active-menu' : ''}`}>
                        <Link to="/aboutus">
                            About Us
                        </Link>
                    </li>
                    <li className={`py-7 px-3 inline-block ${location.pathname === '/store' ? 'active-menu' : ''}`}>
                        <Link to="/store">
                            Our Store
                        </Link>
                    </li>
                    <li className={`py-7 px-3 inline-block ${location.pathname === '/cart' ? 'active-menu' : ''}`}>
                        <Link to="/cart">
                            <FaShoppingCart />
                        </Link>
                    </li>
                </ul>

                <div className='md:block hidden text-white 2xl:pl-40 font-semibold'>
                    <Link to="/signin">
                        <button className="border-[2px] rounded-full text-[15px] bg-[#a3292f] hover:bg-[#ff3333] px-[25px] py-[7px]">Sign In</button>

                    </Link>
                    <Link to="/signup">
                        <button className="border-[2px] rounded-full text-[15px] bg-[#54514d] hover:bg-[#f1cb8e] px-[25px] py-[7px]">Sign Up</button>

                    </Link>
                </div>

                {/* Mobile Progresive Navbar */}
                <NavMobile open={open} toggleMenu={toggleMenu} />

            </div>
        </nav>
    )
}

export default Navbar