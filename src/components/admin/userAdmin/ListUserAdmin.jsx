import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import NavbarAdmin from '../shared/NavbarAdmin'
import AdminSidebar from '../shared/AdminSidebar'
import { FaRegEye, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

const ListUserAdmin = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    // Function Fetch API Get Users
    useEffect(() => {
        const fetchGetUsers = async () => {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `http://localhost:3001/user`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const response = await axios.request(config);
                // console.log('response', response.data);
                const listUsers = response.data?.datas;
                setUsers(listUsers);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchGetUsers();
    }, []);


    return (
        <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
            <AdminSidebar />
            <div className="flex flex-col flex-1">
                <NavbarAdmin />
                <div className="flex-1 p-4 min-h-0 overflow-auto">

                    {/* Users */}
                    <div className=" mt-10 justify-center">
                        <div className='w-[1000px] mx-32 '>
                            <h1 className="text-6xl text-[#675e51] font-bold">User</h1>
                            <p className="my-3 text-[#675e51]">Dashboard / User</p>
                        </div>

                        <div className=" bg-white mx-20 mt-5 justify-center rounded-xl shadow-sm shadow-textFunc">
                            <div className="">
                                <div className="relative overflow-x-auto p-5">
                                    <table className="w-full text-base text-left text-gray-500 ">
                                        <thead className=" text-gray-700  bg-[#edeae4] text-center">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Nama
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Role
                                                </th>
                                                {/* <th scope="col" className="px-6 py-3">
                                                    No Handphone
                                                </th> */}
                                                <th scope="col" className="px-6 py-3">
                                                    Email
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => {
                                                return (
                                                    <tr key={user.id} className="bg-white border-b text-base text-center">
                                                        <td scope="row" className="px-6 py-4 ">{index + 1}</td>
                                                        <td className="px-6 py-4">{user.nama}</td>
                                                        <td className="px-6 py-4">{user.role}</td>
                                                        {/* <td className="px-6 py-4">{user.no_hp}</td> */}
                                                        <td className="px-6 py-4">{user.email}</td>
                                                        <td className="px-6 py-4 flex gap-3 justify-center">
                                                            <Link to={`/admin/users/${user.id}/detail`} className='text-yellow-400 text-xl'><FaRegEye /></Link>
                                                            {/* <Link to="" className='text-yellow-400 text-xl'><FaRegEdit /></Link> */}
                                                            <button className='text-red-700 text-xl'><FaRegTrashAlt /></button>
                                                        </td>
                                                    </tr>
                                                )
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

export default ListUserAdmin