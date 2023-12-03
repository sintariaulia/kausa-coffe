import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminSidebar from '../shared/AdminSidebar'
import NavbarAdmin from '../shared/NavbarAdmin'

const DetailUserAdmin = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nama, setNama] = useState("");
    const [role, setRole] = useState("");
    const [noHp, setNoHp] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
            <AdminSidebar />
            <div className="flex flex-col flex-1">
                <NavbarAdmin />
                {/* Detil Produk */}
                <div className="flex-1 p-4 min-h-0 overflow-auto">
                    <div className=" mt-10 justify-center">
                        {/* judul */}
                        <div className='w-[1000px] mx-32 '>
                            <h1 className="text-6xl text-[#675e51] font-bold">Detail User</h1>
                            <p className="my-3 text-[#675e51]">Dashboard / User / Detail</p>
                        </div>
                        {/* content */}
                        <div className=" bg-white mx-20 mt-10 justify-center rounded-xl shadow-sm">
                            <div className="relative overflow-x-auto p-5">
                                <div className='flex-1'>
                                    <div className='w-full px-10 pt-7 text-[#675e51]'>
                                        <form action="" className='space-y-4'>
                                            <table className='w-full'>
                                                <tr>
                                                    <td className="py-5">
                                                        <label htmlFor="nama" className="block mb-1 font-bold">
                                                            Nama
                                                        </label>
                                                    </td>
                                                    <td className="">
                                                        <p
                                                            type="text"
                                                            id="nama"
                                                            className="w-full py-2 px-2 border-white rounded-md"
                                                        >
                                                            <span className='px-8 font-bold'> : </span>{nama}
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-5">
                                                        <label htmlFor="role" className="block mb-1 font-bold">
                                                            Role
                                                        </label>
                                                    </td>
                                                    <td className="">
                                                        <p
                                                            type="text"
                                                            id="role"
                                                            className="w-full py-2 px-2 border-white rounded-md"
                                                        >
                                                            <span className='px-8 font-bold'> : </span>{role}
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-5">
                                                        <label htmlFor="noHp" className="block mb-1 font-bold">
                                                            No Handphone
                                                        </label>
                                                    </td>
                                                    <td className="">
                                                        <p
                                                            type="text"
                                                            id="noHp"
                                                            className="w-full py-2 px-2 border-white rounded-md"
                                                        >
                                                            <span className='px-8 font-bold'> : </span>{noHp}
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-5">
                                                        <label htmlFor="email" className="block mb-1 font-bold">
                                                            email
                                                        </label>
                                                    </td>
                                                    <td className="">
                                                        <p
                                                            type="text"
                                                            id="email"
                                                            className="w-full py-2 px-2 border-white rounded-md"
                                                        >
                                                            <span className='px-8 font-bold'> : </span>{email}
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-5">
                                                        <label htmlFor="password" className="block mb-1 font-bold">
                                                            Password
                                                        </label>
                                                    </td>
                                                    <td className="">
                                                        <p
                                                            type="text"
                                                            id="password"
                                                            className="w-full py-2 px-2 border-white rounded-md"
                                                        >
                                                            <span className='px-8 font-bold'> : </span>{password}
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>

                                            <div className="p-5 flex flex-wrap gap-2"
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    position: "relative",
                                                }}>
                                                <button
                                                    onClick={handleBack}
                                                    type="button"
                                                    className="w-[100px] px-4 py-2 mt-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-600"
                                                >
                                                    Kembali
                                                </button>
                                            </div>

                                        </form>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default DetailUserAdmin