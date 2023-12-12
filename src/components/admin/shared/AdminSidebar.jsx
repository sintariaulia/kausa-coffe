import React from 'react'
import LogoHori from '../assets/logo1.png'
import LogoKausa from '../assets/logo2.png'
import classNames from 'classnames'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../services/authSlice'
import { 
    HiOutlineHome,
	HiOutlineShoppingCart,
	HiCurrencyDollar,
	HiUserGroup,
	HiTag,
	HiListBullet
} from 'react-icons/hi2'
import { HiOutlineLogout } from 'react-icons/hi'

const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-[#f0ede6] hover:no-underline active:bg-neutral-600 rounded-xl font-bold text-base'

const AdminSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout()); // Langkah 5: Panggil aksi logout saat tombol logout diklik
        navigate("/");
    };

    const DASHBOARD_SIDEBAR_LINKS = [
        {
            key: 'dashboard',
            label: 'Dashboard',
            path: '/admin/dashboard',
            icon: <HiOutlineHome />
        },
        {
            key: 'user',
            label: 'User',
            path: '/admin/users',
            icon: <HiUserGroup />
        },
        {
            key: 'kategoriproduk',
            label: 'Kategori Produk',
            path: '/admin/kategori',
            icon: <HiListBullet />
        },
        {
            key: 'produk',
            label: 'Produk',
            path: '/admin/produks',
            icon: <HiTag />
        },
        {
            key: 'pesanan',
            label: 'Pesanan',
            path: '/admin/pesanan',
            icon: <HiOutlineShoppingCart />
        },
        {
            key: 'pembayaran',
            label: 'Pembayaran',
            path: '/admin/payment',
            icon: <HiCurrencyDollar />
        },
    ]

    return (
        <div className="bg-[#f6f6f6] font-bold w-[19rem] p-3 flex flex-col">
            <div className="flex items-center justify-center gap-2 px-1 pt-10">
                <img
                    src={LogoKausa}
                    alt="LogoKausa"
                    className="cursor-pointer w-[40px] duration-500"
                />
                <img
                    src={LogoHori}
                    alt="LogoHori"
                    className="text-textSec origin-left w-[180px] duration-200"
                />

            </div>
            <div className="py-12 flex flex-1 flex-col font-semibold px-5 gap-5">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarAdminLink key={link.key} link={link} />
                ))}
                <div
                    className={classNames(linkClass, 'cursor-pointer text-red-600')}
                    onClick={() => handleLogout()} >
                    <span className="text-xl"><HiOutlineLogout /></span>
                    Logout
                </div>
            </div>
        </div>
    )
}

function SidebarAdminLink({ link }) {
    const { pathname } = useLocation()
    return (
        <Link
            to={link.path}
            className={classNames(pathname === link.path ? 'bg-[#edeae4] text-[#675e51]' : 'text-[#675e51]', linkClass)}>
            <span className="text-xl">{link.icon}</span>
            {link.label}
        </Link>
    )
}

export default AdminSidebar