import React, { useState, useEffect } from 'react'
import FormBanner from '../../assets/bannerform.png';
import { Link, useNavigate } from 'react-router-dom';

const FormPesanan = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }

    const [time, setTime] = useState('01:00');
    const onChange = (timeValue) => {
        setTime(timeValue);
    }

    return (
        <div className="bg-[#fafafa] pt-11 h-[930px] pb-3 flex flex-col justify-start">
            <img src={FormBanner} alt="produkorder" className='mx-auto pt-14 w-[25%]' />
            <div className='mx-32 my-6 bg-[#edeae4]'>
                <form>
                    <h1 className="p-3 font-bold bg-[#a3292f] text-lg text-white rounded-sm rounded-t-md">DATA PESANAN</h1>
                    <div className="p-10">
                        <div className="relative z-0 w-full mb-7 group">
                            <h3 className='className="cursor-not-allowed block py-2.5 px-0 w-full text-base text-gray-900"'>
                                Time
                            </h3>
                            <label className="absolute text-xl text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                                Produk
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-7 group">
                            <h3 className='className="cursor-not-allowed block py-2.5 px-0 w-full text-base text-gray-900"'>
                                Time
                            </h3>
                            <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                                Quantity
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-7 group">
                            <h3 className='className="cursor-not-allowed block py-2.5 px-0 w-full text-base text-gray-900"'>
                                Time
                            </h3>
                            <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                                Waktu Ambil Pesanan
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-7 group">
                            <h3 className='className="cursor-not-allowed block py-2.5 px-0 w-full text-base text-gray-900"'>
                                Time
                            </h3>
                            <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                                Total Harga
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            <div className='mx-32 py-5'>
                <div className="text-center flex mt-5 w-full justify-between items-center ">
                    <button onClick={handleBack}
                        className="text-white font-semibold py-2 px-10 rounded-full bg-[#54514d] hover:bg-gray-400">
                        &laquo; Kembali Ke Produk
                    </button>
                    <Link to='/pesanan/upload-payment'>
                        <button className="text-white font-semibold py-2 px-6 rounded-full bg-[#a3292f] hover:bg-[#ff3333] ">
                            Upload Bukti Pembayaran &raquo;
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FormPesanan