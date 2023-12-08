import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import NavbarAdmin from '../shared/NavbarAdmin'
import AdminSidebar from '../shared/AdminSidebar'
import { FaPlus, FaRegEdit, FaRegTrashAlt, FaRegEye } from 'react-icons/fa'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const ListProdukAdmin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [produks, setProduks] = useState([]);

    // Fuction Fetch API Get List
    useEffect(() => {
        const fetchProduks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/produk');
                console.log('response', response.data);
                const listProduks = response.data?.datas;
                listProduks.sort((a, b) => b.id - a.id);    // Sort New Produk
                setProduks(listProduks);
            } catch (error) {
                console.log(error, "error");
            }
        };
        fetchProduks();
    }, []);

    // Fetch API Delete & Function Delete
    const deleteProduks = async (id) => {
        console.log(id);
        try {
            const getToken = localStorage.getItem("token");
            const config = {
                method: "delete",
                url: `http://localhost:3001/produk/${id}`,
                headers: {
                    Authorization: `Bearer ${getToken}`,
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
                    Swal.fire("Deleted!", "Your products has been deleted.", "success");
                    window.location.reload();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire("Cancelled", "Your products is safe :)", "error");
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = produks.slice(indexOfFirstProduct, indexOfLastProduct);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
            <AdminSidebar />
            <div className="flex flex-col flex-1">
                <NavbarAdmin />
                <div className="flex-1 px-4 py-2 min-h-0 overflow-auto">
                    {/* Content Data Produk */}
                    <div className="justify-center">
                        <div className='w-[1000px] mx-32 '>
                            <h1 className="text-[3.4rem] text-[#675e51] font-bold">Produk</h1>
                            <p className="pb-2 text-[#675e51]">Dashboard / Produk</p>
                        </div>
                        <div className=" bg-white mx-20 mt-5 justify-center rounded-xl shadow-sm shadow-textFunc">
                            <div className="flex items-center justify-between px-5 pt-5">
                                <div>
                                    <Link
                                        className="inline-flex items-center text-gray-700 bg-[#edeae4] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-4 py-2 "
                                        type="button"
                                        to={"/admin/produks/create-produk"}
                                    >
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
                                                Kode Produk
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Nama Produk
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Kategori
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Harga
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentProducts.map((produk, index) => {
                                            return (
                                                <tr key={produk.id} className="bg-white border-b text-base text-center">
                                                    <td scope="row" className="px-6 py-4 ">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4">{produk.kode_produk}</td>
                                                    <td className="px-6 py-4">{produk.nama_produk}</td>
                                                    <td className="px-6 py-4">{produk.kategori_id}</td>
                                                    <td className="px-6 py-4">{produk.harga}</td>
                                                    <td className="px-6 py-4 flex gap-3 justify-center">
                                                        <Link to={`/admin/produks/${produk.id}/detail`} className='text-yellow-400 text-xl'><FaRegEye /></Link>
                                                        <Link to={`/admin/produks/${produk.id}/edit`} className='text-yellow-400 text-xl'><FaRegEdit /></Link>
                                                        <button onClick={() => deleteProduks(produk.id)} className='text-red-800 text-xl'><FaRegTrashAlt /></button>
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
                                        {[...Array(Math.ceil(produks.length / productsPerPage))].map((_, index) => (
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
                                                    paginate(currentPage < Math.ceil(produks.length / productsPerPage) ? currentPage + 1 : currentPage)
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
                    {/* Content Data Produk */}

                </div>
            </div>
        </div>
    )
}

export default ListProdukAdmin