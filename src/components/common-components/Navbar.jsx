import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoKausa from '../../assets/logo.png';
import NavMobile from './NavbarMobile';
import { FaBars, FaTimes, FaUserCircle, FaClipboardList } from 'react-icons/fa';
import './navbar.css';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../services/authSlice';
import { RiLogoutBoxLine, RiProfileLine, RiMapPinLine } from "react-icons/ri";

const Navbar = () => {
    const [open, setOpen] = useState(false);    // Untuk Navbar Mobile
    const location = useLocation(); // Untuk Active Menu
    const [modal, setModal] = useState(false);  // Untuk Modal Logout
    const { user, isLogin } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         setIsLogin(true);
    //     }
    // }, []);

    // const handleLogout = () => {
    //     localStorage.clear();
    //     setIsLogin(false);
    //     window.location.href = "/"
    // }
    const handleLogout = () => {
        dispatch(logout());
        setDropdownOpen(false);
        navigate("/signin");
    };
    const handleModal = () => {
        setModal(true);
    }
    // Untuk Menu tampilan Mobile
    const toggleMenu = () => {
        setOpen(!open);
    }
    // Untuk Active Menu
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    let linkTo = "";
    // const role = authState?.user?.role || "N/A";
    if (user?.role === "admin") {
        linkTo = "/admin/dashboard";
    } else if (user?.role === "kasir") {
        linkTo = "/kasir/dashboard";
    } else if (user?.role === "user") {
        linkTo = "/";
    } else {
        // Jika role tidak sesuai, Anda bisa mengatur linkTo ke halaman lain yang sesuai.
        linkTo = "/kasir/dashboard";
    }
    console.log(user?.role);

    return (
        <nav className='fixed w-full z-10 bg-[#edeae4] shadow-xl'>
            <div className='flex items-center font-medium justify-around'>
                {/* Left Section */}
                <div className='2xl:ml-32 p-1 md:w-auto w-full flex justify-between'>
                    <Link to="/">
                        <img src={LogoKausa} alt="LogoKausa" className='md:cursor-pointer mx-5 md:mx-0 w-[65px] h-[65px] lg:w-[75px] lg:h-[75px]' />
                    </Link>
                    <div className='block md:hidden my-6 px-9  text-xl' onClick={toggleMenu}>
                        {open ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
                {/* Center Section */}
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
                            <div className='flex gap-2 justify-center'>
                                <p>Our Store</p>
                                <p className='text-xl'><RiMapPinLine /></p>
                            </div>
                        </Link>
                    </li>
                </ul>
                {/* Right Section */}
                <div className='2xl:pl-40 flex items-center lg:flex-row' ref={dropdownRef}>
                    {isLogin ? (
                        <div className="text-[#675e51] flex gap-3 flex-col items-baseline lg:flex-row">
                            <div className="relative">
                                <div
                                    className="flex gap-3 items-center font-bold text-[16.5px] rounded-2xl cursor-pointer hover:text-[#a19686]"
                                    onClick={toggleDropdown}>
                                    <FaUserCircle className="text-2xl" />
                                    {user.nama}
                                </div>
                                {dropdownOpen && (
                                    <ul className="dropdown-menu w-48 py-4 mt-4 mr-20 text-base text-left rounded-xl shadow-lg min-w-max items-center bg-white/90 float-left list-none m-0 bg-clip-padding border-none dropdown-menu fixed right-5">
                                        <li>
                                            <Link className="flex gap-3 px-4 py-2 items-center font-semibold hover:bg-[#edeae4]" to="/profile">
                                                <RiProfileLine />
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="flex gap-3 px-4 py-2 items-center font-semibold hover:bg-[#edeae4]" to="/riwayatpesanan">
                                                <FaClipboardList />
                                                Pesanan
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                type="button"
                                                className="flex items-center gap-3 px-4 py-2 text-red-700 cursor-pointer hover:bg-[#edeae4]"
                                                onClick={handleModal}>
                                                <RiLogoutBoxLine />
                                                Logout
                                            </Link>
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
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='md:block hidden text-white 2xl:pl-36 font-semibold'>
                            <Link to={"/signin"}>
                                <button className="border-[2px] rounded-full text-[15px] bg-[#a3292f] hover:bg-[#ff3333] mx-3 px-[25px] py-[7px]">
                                    Sign In
                                </button>
                            </Link>
                            <Link to={"/signup"}>
                                <button className="border-[2px] rounded-full text-[15px] bg-[#54514d] hover:bg-[#f1cb8e] px-[25px] py-[7px]">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Progresive Navbar */}
                <NavMobile open={open} toggleMenu={toggleMenu} />
            </div>
        </nav>
    )
}

export default Navbar