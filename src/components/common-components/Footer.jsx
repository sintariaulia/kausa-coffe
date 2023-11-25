import React from "react";
import LogoFooter from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer className="footer footer-center p-3 bg-[#edeae4] shadow-2xl text-[#675e51]">
            <div>
                <img src={LogoFooter} alt="LogoFooter" className='mx-5 w-[70px] h-[70px] ' />
                <p className="font-semibold text-base">Kausa meet space & coffee</p>
                <p>Jl. Dr. Moh. Hatta No.12, Binuang Kp. Dalam, Kec. Pauh, Kota Padang, Sumatera Barat 25176</p>
                <p>Copyright © 2023 - All right reserved</p>
            </div>
        </footer>

    )
}

export default Footer