import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LogoKausa from '../../assets/logo.png';
import NavMobile from './NavbarMobile';
import { FaBars, FaTimes } from 'react-icons/fa';
import './navbar.css';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const [modal, setModal] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogin(true);
        }
    }, []);

    const handleLogin = () => {
        window.location.href = "/SignIn"
    }

    const handleLogout = () => {
        localStorage.clear();
        setIsLogin(false);
        window.location.href = "/"
    }

    const handleModal = () => {
        setModal(true);
    }


    const toggleMenu = () => {
        setOpen(!open);
    }

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

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
                    {/* <li className={`py-7 px-3 inline-block ${location.pathname === '/cart' ? 'active-menu' : ''}`}>
                        <Link to="/produks">
                            <FaShoppingCart />
                        </Link>
                    </li> */}
                </ul>

                <div className='md:block hidden text-white 2xl:pl-40 font-semibold'>
                    <button
                        className="border-[2px] rounded-full text-[15px] bg-[#a3292f] hover:bg-[#ff3333] px-[25px] py-[7px]"
                        onClick={isLogin ? handleModal : handleLogin}
                    >
                        {isLogin ? 'Logout' : 'Sign In'}
                    </button>
                    {!isLogin && (
                        <Link to="/signup">
                            <button
                                className="border-[2px] rounded-full text-[15px] bg-[#54514d] hover:bg-[#f1cb8e] px-[25px] py-[7px]">Sign Up</button>
                        </Link>
                    )}

                    {modal && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
                            <input type="checkbox" id="my-modal" className="modal-toggle" checked={modal} />
                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box text-left bg-[#edeae4]">
                                    <p className="text-sm text-red-500 pt-2">Logout Confirmation</p>
                                    <h3 className="font-semibold text-black text-base ">Are you sure to Logout ?</h3>
                                    <div className="modal-action">
                                        <button className="btn btn-sm text-white bg-slate-500 hover:bg-slate-400" onClick={() => setModal(false)}>Cancel</button>
                                        <button className="btn btn-sm text-white bg-red-600 hover:bg-red-400" onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* <Link to="/signin">
                        <button className="border-[2px] rounded-full text-[15px] bg-[#a3292f] hover:bg-[#ff3333] px-[25px] py-[7px]">Sign In</button>

                    </Link>  */}

                </div>

                {/* Mobile Progresive Navbar */}
                <NavMobile open={open} toggleMenu={toggleMenu} />

            </div>
        </nav>
    )
}

export default Navbar