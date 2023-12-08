import React from 'react'
import { Link } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
    return (
        <div className="text-center bg-[#e5e3e3] h-screen flex flex-wrap justify-center items-center">
            <div className="text-center">
                <span className="block">
                    <FaRegCheckCircle className="text-[64px] text-[#d7ae6b] inline-block align-middle" />
                </span>
                <span className="block text-[40px] text-[#54514d] font-bold mt-5">Pembayaran Diterima</span>
                <p className="text-[#54514d] mt-5 w-[700px] mx-auto">
                    Pesanan dan Pembayaran sudah berhasil diupload. Silahkan menunggu kasir mengecek pembayaran kamu.
                </p>
                <div className="h-10 rounded-full py-2 mt-4 text-white text-lg font-bold bg-[#cda86b] hover:bg-[#ecd4ae] w-[300px] mx-auto">
                    <Link to={"/"}>Kembali Halaman Utama</Link>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess