import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaPlus, FaRegTrashAlt, FaRegEye } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { formatDate } from '../../../util/Helper'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const ListPaymentAdmin = () => {
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

    // Function Delete Payment
    const deletePayment = async (id) => {
        try {
            const config = {
                method: "delete",
                url: `http://localhost:3001/payment/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to delete this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.request(config);
                    // Jika Anda ingin melakukan sesuatu setelah kategori dihapus, lakukan di sini
                    Swal.fire("Deleted!", "Payment has been deleted.", "success");
                    window.location.reload();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire("Cancelled", "Data Payment is safe :)", "error");
                }
            });
        } catch (error) {
            console.log(error)
        }
    };

    // BackGround Status
    const getStatusClass = (status) => {
        switch (status) {
            case 'Pembayaran Diterima':
                return 'btn-warning';
            case 'Pembayaran Sukses':
                return 'btn-success';
            case 'Pembayaran Ditolak':
                return 'btn-error ';
            default:
                return '';
        }
    };

    // Handle Pagination
    const indexOfLastPayment = currentPage * paymentPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentPerPage;
    const currentPayment = payments.slice(indexOfFirstPayment, indexOfLastPayment);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex-1 px-4 py-2 min-h-0 overflow-auto">
            {/* Content Data Pembayaran */}
            <div className="mt-5 justify-center">
                <div className='w-[1000px] mx-32 '>
                    <h1 className="text-[55px] text-[#675e51] font-bold">Pembayaran</h1>
                    <p className="pb-2 text-[#675e51]">Dashboard / Pembayaran</p>
                </div>
                <div className=" bg-white mx-20 mt-5 justify-center rounded-xl shadow-sm shadow-textFunc">
                    <div className="flex items-center justify-between px-5 pt-5">
                        {/* <div>
                            <Link to="" type="button"
                                className="inline-flex items-center text-gray-700 bg-[#edeae4] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-4 py-2 "
                            >
                                <span className='pr-2'> <FaPlus /> </span>
                                Tambah
                            </Link>
                        </div> */}
                    </div>
                    <div className="relative overflow-x-auto p-5">

                        <table className="w-full text-base text-left text-gray-500 ">
                            <thead className="text-gray-700  bg-[#d5d0c4] text-center">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ID Payment
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
                                {currentPayment.map((payment, index) => {
                                    return (
                                        <tr key={payment.id} className="bg-white border-b text-base text-center">
                                            <td scope="row" className="px-6 py-4 ">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">{payment.id}</td>
                                            <td className="px-6 py-4">{payment.pesanan_id}</td>
                                            <td className="px-6 py-4">{formatDate(payment.created_at)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block text-gray-700 px-5 py-1 rounded-full ${getStatusClass(payment.status)}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            {/* <td className="px-6 py-4">{payment.bukti_bayar}</td> */}
                                            <td className="px-6 py-4 flex gap-3 justify-center">
                                                <Link to={`/admin/payment/${payment.id}/detail`} className='text-yellow-400 text-xl'><FaRegEye /></Link>
                                                <button onClick={() => deletePayment(payment.id)} className='text-red-800 text-xl'><FaRegTrashAlt /></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="flex items-center justify-end mt-4">
                            <ul className="flex items-center -space-x-px h-8 text-sm">
                                <li>
                                    <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-600 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-200"
                                        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)} >
                                        <HiChevronLeft className="w-5 h-5" />
                                    </a>
                                </li>
                                {[...Array(Math.ceil(payments.length / paymentPerPage))].map((_, index) => (
                                    <li key={index}>
                                        <a
                                            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-gray-200 ${currentPage === index + 1 ? 'text-blue-600 bg-blue-50' : ''}`}
                                            onClick={() => paginate(index + 1)} >
                                            {index + 1}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <a
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-600 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-200"
                                        onClick={() =>
                                            paginate(currentPage < Math.ceil(payments.length / paymentPerPage) ? currentPage + 1 : currentPage)
                                        } >
                                        <HiChevronRight className="w-5 h-5" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* End Pagination */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListPaymentAdmin;