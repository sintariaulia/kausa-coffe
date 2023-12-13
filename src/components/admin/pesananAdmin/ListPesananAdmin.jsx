import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaPlus, FaRegTrashAlt, FaRegEye } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { formatDate } from '../../../util/Helper'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const ListPesananAdmin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pesananPerPage] = useState(8);
    const [pesanans, setPesanan] = useState([]);
    const token = localStorage.getItem("token");

    // Fuction Fetch Pesanan
    useEffect(() => {
        const fetchPesanans = async () => {
            try {
                const response = await axios.get('http://localhost:3001/pesanan');
                const listPesanans = response.data?.datas;
                listPesanans.sort((a, b) => b.id - a.id);
                setPesanan(listPesanans);
            } catch (error) {
                console.log(error, "error");
            }
        };

        fetchPesanans();
    }, []);

    // Function Form Delete Pesanan
    const deletePesanan = async (id) => {
        console.log(id);
        try {
            const config = {
                method: "delete",
                url: `http://localhost:3001/pesanan/${id}`,
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
                    Swal.fire("Deleted!", "Order has been deleted.", "success");
                    window.location.reload();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire("Cancelled", "Data Order is safe :)", "error");
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    // BackGround Status
    const getStatusClass = (status) => {
        switch (status) {
            case 'Di Proses':
                return 'btn-warning ';
            case 'Pesanan Selesai':
                return 'btn-success';
            default:
                return '';
        }
    };

    // Handle Pagination
    const indexOfLastPesanan = currentPage * pesananPerPage;
    const indexOfFirstPesanan = indexOfLastPesanan - pesananPerPage;
    const currentPesanan = pesanans.slice(indexOfFirstPesanan, indexOfLastPesanan);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex-1 px-4 py-2 min-h-0 overflow-auto">
            {/* Content Data Pemesanan */}
            <div className="mt-5 justify-center">
                <div className='w-[1000px] mx-32'>
                    <h1 className="text-[55px] text-[#675e51] font-bold">Pesanan</h1>
                    <p className="pb-2 text-[#675e51]">Dashboard / Pesanan</p>
                </div>
                <div className=" bg-white mx-20 mt-5 justify-center rounded-xl">
                    <div className="flex items-center justify-between px-5 pt-5">
                        <div>
                            <Link to={'/admin/pesanan/create-pesanan'} type="button"
                                className="inline-flex items-center text-gray-700 bg-[#edeae4] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-4 py-2 ">
                                <span className='pr-2'> <FaPlus /> </span>
                                Tambah
                            </Link>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto p-5">

                        <table className="w-full text-base text-left text-gray-500">
                            <thead className="text-gray-700  bg-[#d5d0c4] text-center">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Pesanan ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        User ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Produk
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tanggal
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status Pesanan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPesanan.map((pesanan, index) => {
                                    return (
                                        <tr key={pesanan.id} className="bg-white border-b text-base text-center">
                                            <td scope="row" className="px-6 py-4 ">
                                                {pesanan.id}
                                            </td>
                                            <td className="px-6 py-4">{pesanan.id}</td>
                                            <td className="px-6 py-4">{pesanan.user_id}</td>
                                            <td className="px-6 py-4">{pesanan.produk_id}</td>
                                            <td className="px-6 py-4">{formatDate(pesanan.created_at)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block text-gray-700 px-5 py-1 rounded-full ${getStatusClass(pesanan.status_pesanan)}`}>
                                                    {pesanan.status_pesanan}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 flex gap-3 justify-center">
                                                <Link to={`/admin/pesanan/${pesanan.id}/detail`} className='text-yellow-400 text-xl'><FaRegEye /></Link>
                                                {/* <Link to={`/admin/pesanan/${pesanan.id}/edit`} className='text-yellow-400 text-xl'><FaRegEdit /></Link> */}
                                                <button onClick={() => deletePesanan(pesanan.id)} className='text-red-800 text-xl'><FaRegTrashAlt /></button>
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
                                {[...Array(Math.ceil(pesanans.length / pesananPerPage))].map((_, index) => (
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
                                            paginate(currentPage < Math.ceil(pesanans.length / pesananPerPage) ? currentPage + 1 : currentPage)
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

export default ListPesananAdmin