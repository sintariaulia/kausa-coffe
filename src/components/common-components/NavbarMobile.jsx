import React from 'react'
import { Link } from 'react-router-dom'

const NavMobile = ({ open, toggelMenu }) => {

    // const [modal, setModal] = useState(false);
    // const [isLogin, setIsLogin] = useState(false);

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
    //     localStorage.removeItem("authToken");
    //     localStorage.removeItem("idUserLogged");
    //     setIsLogin(false);
    //     window.location.href = "/SignIn"
    // }

    // const handleModal = () => {
    //     setModal(true);
    // }

    return (
        <ul className={`z-20 md:hidden flex flex-col shadow-2xl bg-[#edeae4] sm:text-xl text-black font-semibold absolute w-full h-full bottom-0 py-24 pl-14 duration-500 ${open ? 'left-0' : 'left-[-100%]'}`}>
            <li className='py-5 px-3 inline-block hover:text-[#e9ac4a]'>
                <Link to="/" className=''>
                    Home
                </Link>
            </li>
            <li className='py-5 px-3 inline-block hover:text-[#e9ac4a]'>
                <Link to="/">
                    Product
                </Link>
            </li>
            <li className='py-5 px-3 inline-block hover:text-[#ff3333]'>
                <Link to="/">
                    About Us
                </Link>
            </li>
            <li className='py-5 px-3 inline-block hover:text-[#ff3333]'>
                <Link to="/">
                    Our Store
                </Link>
            </li>

            <div className='pt-5 text-white'>
                <button className="border-[2px] rounded-full sm:text-xl bg-[#d0161f] hover:bg-[#ff3333] px-[25px] py-[7px]">Sign In</button>
                <button className="border-[2px] rounded-full sm:text-xl bg-[#e9ac4a] hover:bg-[#f1cb8e] px-[25px] py-[7px]">Sign Up</button>
            </div>

        </ul>

    )
}

export default NavMobile