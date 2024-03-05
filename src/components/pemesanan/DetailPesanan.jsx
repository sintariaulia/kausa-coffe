import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProdukOrder from '../../assets/orderproduk.png'
import { Link, useParams } from 'react-router-dom'

const DetailPesanan = () => {
    const { id } = useParams()
    const [produkNama, setProdukNama] = useState("")
    const [quantity, setQuantity] = useState("")
    const [waktuPickUp, setWaktuPickUp] = useState("")
    const [totalHarga, setTotalHarga] = useState("")

    // Fetch API Pesanan By Id
    useEffect(() => {
        const fetchPesananById = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/pesanan/${id}`);
                const pesananData = response.data?.datas;
                setProdukNama(pesananData.produk_id);
                setQuantity(pesananData.quantity);
                setWaktuPickUp(pesananData.waktu_pickup);
                setTotalHarga(pesananData.total_harga);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPesananById();
    }, [id]);

    return (
        <div className="bg-[#fafafa] pt-20 h-[930px] pb-3 flex flex-col justify-start">
            <img src={ProdukOrder} alt="produkorder" className='mx-auto pt-14 w-[28%]' />
            <div className='mx-40 my-6 bg-[#edeae4]'>
                <form>
                    <h1 className="p-3 font-bold bg-[#a3292f] text-lg text-white rounded-sm rounded-t-md">DATA PESANAN</h1>
                    <div className="p-10">
                        <div className="relative z-0 w-full mb-7 group">
                            <h3 className='className="cursor-not-allowed block py-2.5 px-0 w-full text-base text-gray-900"'>
                                {produkNama}
                            </h3>
                            <label className="absolute text-xl text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                                Produk
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-7 group">
                            <h3 className='className="cursor-not-allowed block py-2.5 px-0 w-full text-base text-gray-900"'>
                                {quantity}
                            </h3>
                            <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                                Quantity
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-7 group">
                            <h3 className='className="cursor-not-allowed block py-2.5 px-0 w-full text-base text-gray-900"'>
                                {waktuPickUp}
                            </h3>
                            <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                                Waktu Ambil Pesanan
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-7 group">
                            <h3 className='className="cursor-not-allowed block py-2.5 px-0 w-full text-base text-gray-900"'>
                                {totalHarga}
                            </h3>
                            <label className="absolute text-xl text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                                Total Harga
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            {/* Button */}
            <div className='mx-32 py-5'>
                <div className="text-center flex mt-5 w-full justify-end items-center ">
                    {/* <button onClick={handleBack}
                        className="text-white font-semibold py-2 px-10 rounded-full bg-[#54514d] hover:bg-gray-400">
                        &laquo; Kembali Ke Produk
                    </button> */}

                    <Link to={`/pesanan/${id}/upload-payment`}
                        className="text-white font-semibold py-2 px-6 rounded-full bg-[#a3292f] hover:bg-[#ff3333] ">
                        Upload Bukti Pembayaran &raquo;
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default DetailPesanan