import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import NavbarAdmin from '../shared/NavbarAdmin'
import AdminSidebar from '../shared/AdminSidebar'
import { FaPlus, FaRegEdit, FaRegTrashAlt, FaRegEye } from 'react-icons/fa'

const ListProdukAdmin = () => {

    const [produks, setProduks] = useState([]);

    useEffect(() => {
        const fetchProduks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/produk');
                console.log('response', response.data);
                const listProduks = response.data?.datas;
                setProduks(listProduks);
            } catch (error) {
                console.log(error, "error");
            }
        };
        fetchProduks();
    }, []);

    return (
        <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
            <AdminSidebar />
            <div className="flex flex-col flex-1">
                <NavbarAdmin />
                <div className="flex-1 p-4 min-h-0 overflow-auto">

                    {/* PRODUK */}
                    <div className=" mt-10 justify-center">
                        <div className='w-[1000px] mx-32 '>
                            <h1 className="text-6xl text-[#675e51] font-bold">Produk</h1>
                            <p className="my-3 text-[#675e51]">Dashboard / Produk</p>
                        </div>
                        <div className=" bg-white mx-20 mt-5 justify-center rounded-xl shadow-sm shadow-textFunc">
                            <div className="flex items-center justify-between px-5 pt-5">
                                <div>
                                    <Link
                                        className="inline-flex items-center text-gray-700 bg-[#edeae4] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-4 py-2 "
                                        type="button"
                                        to=""
                                    >
                                        <span className='pr-2'>
                                            <FaPlus />
                                        </span>
                                        Tambah
                                    </Link>
                                </div>
                            </div>
                            <div className="">
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
                                                    Kategori
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Nama Produk
                                                </th>
                                                {/* <th scope="col" className="px-6 py-3">
                                                    Deskripsi
                                                </th> */}
                                                <th scope="col" className="px-6 py-3">
                                                    Harga
                                                </th>
                                                {/* <th scope="col" className="px-6 py-3">
                                                    Gambar
                                                </th> */}
                                                <th scope="col" className="px-6 py-3">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {produks && produks.map((produk, index) => {
                                                return (
                                                    <tr key={produk.id} className="bg-white border-b text-base text-center">
                                                        <td scope="row" className="px-6 py-4 ">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-6 py-4">{produk.kode_produk}</td>
                                                        <td className="px-6 py-4">{produk.kategori_id}</td>
                                                        <td className="px-6 py-4">{produk.nama_produk}</td>
                                                        {/* <td className="px-6 py-4">{produk.deskripsi}</td> */}
                                                        <td className="px-6 py-4">{produk.harga}</td>
                                                        {/* <td className="px-6 py-4">{produk.gambar}</td> */}
                                                        <td className="px-6 py-4 flex gap-3 justify-center">
                                                            <Link to="" className='text-yellow-400 text-xl'><FaRegEye /></Link>
                                                            <Link to="" className='text-yellow-400 text-xl'><FaRegEdit /></Link>
                                                            <button className='text-red-700 text-xl'><FaRegTrashAlt /></button>
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
                </div>

            </div>

        </div>
    )
}

export default ListProdukAdmin