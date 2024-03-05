import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from '../../assets/banneruser.png'
import axios from 'axios'
import { formatDate } from '../../util/Helper'
import { useSelector } from 'react-redux'

const RiwayatPesanan = () => {
    const [pesanans, setPesanan] = useState([]);
    const authState = useSelector((state) => state.auth);
    const userId = authState.user.id;

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    };

    // Function Fetch Pesanan
    useEffect(() => {
        const fetchPesananUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/pesanan?user_id=${userId}`);
                const listPesanans = response.data?.datas;
                listPesanans.sort((a, b) => b.id - a.id);
                setPesanan(listPesanans);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPesananUsers();
    }, [userId]);

    // BackGround Status
    const getStatusClass = (status) => {
        switch (status) {
            case 'Di Proses':
                return 'btn-warning ';
            case 'Pesanan Selesai':
                return 'btn-success';
            case 'Pesanan Dibatalkan':
                return 'btn-error ';
            default:
                return '';
        }
    };

    return (
        <div className="bg-[#fafafa] pt-11 h-[760px] pb-3 flex flex-col justify-start">
            <img src={Banner} alt="produkorder" className='mx-auto pt-14 w-[28%]' />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-10 mx-20">
                <button className='bg-[#a3292f] hover:bg-[#ff3333] text-white font-semibold rounded-full px-12 py-2 mx-10 mb-10' onClick={handleBack}>
                    Kembali
                </button>
                <table className="w-full text-[#675e51] text-base text-center rtl:text-right ">
                    <thead className="text-lg text-[#675e51] font-bold uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Produk
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Waktu Pickup
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tanggal
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Harga
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status Pesanan
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pesanans.map((pesanan, index) => {
                            return (
                                <tr key={pesanan.id} className="bg-white border-b ">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {pesanan.produk_id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pesanan.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pesanan.waktu_pickup}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatDate(pesanan.created_at)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pesanan.total_harga}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block text-gray-700 px-5 py-1 rounded-full ${getStatusClass(pesanan.status_pesanan)}`}>
                                            {pesanan.status_pesanan}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RiwayatPesanan