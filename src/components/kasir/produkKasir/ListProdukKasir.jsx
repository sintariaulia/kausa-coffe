import React from 'react'
import { Link } from 'react-router-dom'
import NavbarAdmin from '../../admin/shared/NavbarAdmin'
import AdminSidebar from '../../admin/shared/AdminSidebar'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

const ListProdukKasir = () => {
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

                                        className="inline-flex items-center text-gray-700 bg-[#edeae4] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 "
                                        type="button"
                                        to={"/admin/blog/create-blog"}
                                    >
                                        <span className='text-lg pr-3'>
                                            <FaPlus />
                                        </span>
                                        Tambah
                                    </Link>
                                </div>
                            </div>
                            <div className="">
                                <div className="relative overflow-x-auto p-5">
                                    <table className="w-full text-base text-left text-gray-500 ">
                                        <thead className=" text-gray-700  bg-[#edeae4] text-center">
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
                                                <th scope="col" className="px-6 py-3">
                                                    Deskripsi
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Harga
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Gambar
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {/* <tr className="bg-white border-b text-base text-center">
                                                <td scope="row" className="px-6 py-4 ">1
                                                </td>
                                                <td className="px-6 py-4">Signature</td>
                                                <td className="px-6 py-4 flex gap-3 justify-center">
                                                    <Link to="" className='text-yellow-400 text-xl'><FaEdit /></Link>
                                                    <button className='text-red-700 text-xl'><FaTrash /></button>
                                                </td>
                                            </tr>             */}

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

export default ListProdukKasir