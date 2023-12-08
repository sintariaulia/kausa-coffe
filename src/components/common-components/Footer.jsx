import React from "react";
import LogoFooter from '../../assets/logo.png';
import { GrInstagram } from "react-icons/gr";

const Footer = () => {
    const instagramAccount = "https://www.instagram.com/kausa.idn/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==";

    return (
        <footer className="footer footer-center p-3 bg-[#edeae4] shadow-2xl text-[#675e51]">
            <div>
                <img src={LogoFooter} alt="LogoFooter" className='mx-5 w-[70px] h-[70px] ' />
                <div className="flex gap-3 items-center">
                    <p className="font-semibold text-base">Kausa meet space & coffee</p>
                    <a href={instagramAccount} target="_blank" rel="noopener noreferrer">
                        <p className="text-2xl cursor-pointer font-bold"> <GrInstagram /> </p>
                    </a>
                </div>
                <p>Jl. Dr. Moh. Hatta No.12, Binuang Kp. Dalam, Kec. Pauh, Kota Padang, Sumatera Barat 25176</p>
                <p>Copyright © 2023 - All right reserved</p>
            </div>
        </footer>

    )
}

export default Footer