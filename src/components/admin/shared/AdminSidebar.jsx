import React from 'react'
import LogoHori from '../assets/logo1.png'
import LogoKausa from '../assets/logo2.png'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS } from './helper'

const linkClass ='flex items-center gap-2 font-light px-3 py-2 hover:bg-[#f0ede6] hover:no-underline active:bg-neutral-600 rounded-xl font-bold text-base'

const AdminSidebar = () => {
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
            <div className="py-12 flex flex-1 flex-col px-5 gap-3">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarAdminLink key={link.key} link={link} />
                ))}
                <div className={classNames(linkClass, 'cursor-pointer text-red-600')}>
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