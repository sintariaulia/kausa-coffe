import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaPlus, FaRegEdit, FaRegTrashAlt, FaRegEye } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { formatDate } from '../../../util/Helper'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const ListPembayaranKasir = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paymentPerPage] = useState(9);
    const [payments, setPayments] = useState([]);
    const token = localStorage.getItem("token");

    // Function Fetch Pesanan
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:3001/payment');
                const listPayments = response.data?.datas;
                console.log(listPayments)
                listPayments.sort((a, b) => b.id - a.id);
                setPayments(listPayments);
            } catch (error) {
                console.log(error, "error");
            }
        }
        fetchPayments();
    }, []);

    return (
        <div className="flex-1 px-4 py-2 min-h-0 overflow-auto">
            {/* Content Data Pembayaran */}
            <div className="justify-center">
                <div className='w-[1000px] mx-32 '>
                    <h1 className="text-[3.4rem] text-[#675e51] font-bold">Pembayaran</h1>
                    <p className="pb-2 text-[#675e51]">Kasir / Pembayaran</p>
                </div>
                <div className=" bg-white mx-20 mt-5 justify-center rounded-xl shadow-sm shadow-textFunc">
                    <div className="flex items-center justify-between px-5 pt-5">
                        <div>
                            <Link to=""
                                className="inline-flex items-center text-gray-700 bg-[#edeae4] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-4 py-2 "
                                type="button">
                                <span className='pr-2'>
                                    <FaPlus />
                                </span>
                                Tambah
                            </Link>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto p-5">

                        <table className="w-full text-base text-left text-gray-500 ">
                            <thead className="text-gray-700  bg-[#d5d0c4] text-center">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Pesanan ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tanggal
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status Pembayaran
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => {
                                    return (
                                        <tr key={payment.id} className="bg-white border-b text-base text-center">
                                            <td scope="row" className="px-6 py-4 ">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">{payment.pesanan_id}</td>
                                            <td className="px-6 py-4">{formatDate(payment.created_at)}</td>
                                            <td className="px-6 py-4">{payment.status}</td>
                                            {/* <td className="px-6 py-4">{payment.bukti_bayar}</td> */}
                                            <td className="px-6 py-4 flex gap-3 justify-center">
                                                <Link to="" className='text-yellow-400 text-xl'><FaRegEye /></Link>
                                                <Link to="" className='text-yellow-400 text-xl'><FaRegEdit /></Link>
                                                {/* <button onClick={() => deletePayment(payment.id)} className='text-red-800 text-xl'><FaRegTrashAlt /></button> */}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListPembayaranKasir