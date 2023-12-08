import React from 'react'
import { useNavigate } from 'react-router-dom';
import Banner from '../../assets/banneruser.png';

const RiwayatPesanan = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="bg-[#fafafa] pt-11 h-[760px] pb-3 flex flex-col justify-start">
            <img src={Banner} alt="produkorder" className='mx-auto pt-14 w-[28%]' />
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-10 mx-20">
                <button className='bg-[#a3292f] hover:bg-[#ff3333] text-white font-semibold rounded-full px-12 py-2 mx-10 mb-10' onClick={handleBack}>
                    Kembali
                </button>
                <table class="w-full text-[#675e51] text-base text-center rtl:text-right ">
                    <thead class="text-lg text-[#675e51] font-bold uppercase bg-gray-100">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Produk
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Waktu Pickup
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Total Harga
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status Pesanan
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b ">
                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap ">
                                Nama Produk
                            </th>
                            <td class="px-6 py-4">
                                Jumlah Produk
                            </td>
                            <td class="px-6 py-4">
                                Waktu Pickup
                            </td>
                            <td class="px-6 py-4">
                                Rp. 20000
                            </td>
                            <td class="px-6 py-4">
                                Diproses
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RiwayatPesanan