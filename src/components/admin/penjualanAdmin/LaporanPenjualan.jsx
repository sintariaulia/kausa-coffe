import React, { useState, useEffect } from 'react'
import { GrInstagram } from "react-icons/gr";
import LogoKausa from '../assets/logo1.png';
import { formatDate } from '../../../util/Helper'
import axios from 'axios';

const LaporanPenjualan = () => {
    const [pesanans, setPesanan] = useState([]);
    const [totalPenjualan, setTotalPenjualan] = useState(0);

    // Fuction Fetch Pesanan
    useEffect(() => {
        const fetchPesanans = async () => {
            try {
                const response = await axios.get('http://localhost:3001/pesanan');
                const listPesanans = response.data?.datas;
                listPesanans.sort((a, b) => b.id - a.id);
                setPesanan(listPesanans);

                // Hitung total penjualan
                const total = listPesanans.reduce((acc, pesanan) => acc + pesanan.total_harga, 0);
                setTotalPenjualan(total);
            } catch (error) {
                console.log(error, "error");
            }
        };

        fetchPesanans();
    }, []);

    return (
        <div className="p-10 text-black bg-white w-full h-full">
            <div className="relative overflow-x-auto sm:rounded-lg  shadow-lg px-20 mx-auto max-w-4xl">
                <div className='my-10 flex justify-center'>
                    <div className='flex-col items-center justify-center'>
                        <img src={LogoKausa} alt="LogoKausa" className='md:cursor-pointer pl-5 w-48 py-5' />
                        <h1 className='text-2xl font-bold'>Laporan Penjualan</h1>
                        <p className='pt-3 text-sm text-gray-600 text-center'>Kausa Meet Space & Coffee</p>
                    </div>
                </div>
                <div className='flex justify-between text-gray-700 mx-10'>
                    <span>Jl. Dr. Moh. Hatta No.12, Binuang Kp. Dalam, Kec. Pauh</span>
                    <span className='flex items-center gap-1'> <GrInstagram /> : kausa.idn</span>
                </div>

                <div className='my-5 pb-10'>
                    <div className='border border-black my-5'></div>
                    <div className='flex justify-center py-3 text-xl font-bold text-black mb-6'>
                        Data Penjualan Kausa Kopi 2023
                    </div>
                    <div className='border border-gray-300'>
                        <table className="w-full text-base text-center rtl:text-right border-collapse">
                            <thead className="text-base font-bold uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3 border">
                                        Tanggal
                                    </th>
                                    <th scope="col" className="px-6 py-3 border">
                                        Produk
                                    </th>
                                    <th scope="col" className="px-6 py-3 border">
                                        Harga
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {pesanans.map((pesanan, index) => {
                                    return (
                                        <tr className="bg-white border-b ">
                                            <td className="px-6 py-4 border">
                                                {formatDate(pesanan.created_at)}
                                            </td>
                                            <td className="px-6 py-4 border">
                                                {pesanan.produk_id}
                                            </td>
                                            <td className="px-6 py-4 border">
                                                Rp. {pesanan.total_harga}
                                            </td>
                                        </tr>
                                    )
                                })}

                                {/* Tambahkan baris sesuai dengan data penjualan */}
                            </tbody>

                        </table>
                        <div className='mx-10 py-4 flex justify-between  font-semibold text-lg'>
                            <div>Total Penjualan </div>
                            <div>Rp. {totalPenjualan.toLocaleString()}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LaporanPenjualan