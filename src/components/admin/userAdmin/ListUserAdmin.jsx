import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import NavbarAdmin from '../shared/NavbarAdmin'
import AdminSidebar from '../shared/AdminSidebar'
import { FaRegEye, FaRegTrashAlt, FaRegEdit, FaPlus } from 'react-icons/fa'
import { CiSaveDown2, CiCircleRemove } from 'react-icons/ci'

const ListUserAdmin = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    const [showForm, setShowForm] = useState(false);
    const [editedUserName, setEditedUserName] = useState('');
    const [editedUserNoHp, setEditedUserNoHp] = useState('');
    const [editedUserId, setEditedUserId] = useState(null);

    // Function Fetch API Get Users
    useEffect(() => {
        const fetchGetUsers = async () => {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_BASE_URL}/user`,
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

    // Function Edit Data User
    const handleFormEdit = async (e) => {
        e.preventDefault();
        const confirmResult = await Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonColor: "#d33",
        });

        if (confirmResult.isConfirmed) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const editedUserData = {
                    nama: editedUserName,
                    no_hp: editedUserNoHp,
                };
                await axios.put(`${process.env.REACT_APP_BASE_URL}/user/${editedUserId}`, editedUserData, config);
                setShowForm(false);
                Swal.fire({
                    title: "Update Profile Saved!",
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/admin/users/${editedUserId}/detail`);
                    }
                });
                setEditedUserName('');
                setEditedUserNoHp('');
                setEditedUserId(null);
            } catch (error) {
                console.log(error)
            }
        }
    }
    // Function To Open Edit Form
    const openEditForm = (user) => {
        setShowForm(true);
        setEditedUserName(user.nama);
        setEditedUserNoHp(user.no_hp);
        setEditedUserId(user.id);
    }

    // Function Delete User
    const deleteUser = async (id) => {
        // console.log(id);
        try {
            const config = {
                method: "delete",
                url: `${process.env.REACT_APP_BASE_URL}/user/${id}`,
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
                    Swal.fire("Deleted!", "The user has been deleted.", "success");
                    window.location.reload();
                    // navigate(`/admin/users`);
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire("Cancelled", "Your user data is safe :)", "error");
                }
            });
        } catch (error) {
            console.log(error, 'error');
        }
    }

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
                        <div className=" bg-white mx-20 mt-5 justify-center rounded-xl ">
                            <div className="">
                                <div className="flex items-center justify-between px-5 pt-5">
                                    <div>
                                        <Link
                                            className="inline-flex items-center text-gray-700 bg-[#edeae4] border border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-4 py-2 "
                                            type="button"
                                            to={"/admin/user/create-user"} >
                                            <span className='pr-2'>
                                                <FaPlus />
                                            </span>
                                            Tambah
                                        </Link>
                                    </div>
                                </div>
                                <div className="relative overflow-x-auto p-5">
                                    <table className="w-full text-base text-left text-gray-500 ">
                                        <thead className=" text-gray-700 bg-[#d5d0c4] text-center">
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
                                                        <td className="px-6 py-4">{user.email}</td>
                                                        <td className="px-6 py-4 flex gap-3 justify-center">
                                                            <Link to={`/admin/users/${user.id}/detail`} className='text-yellow-400 text-xl'><FaRegEye /></Link>
                                                            <button onClick={() => openEditForm(user)} className='text-yellow-400 text-xl'><FaRegEdit /></button>
                                                            <button onClick={() => deleteUser(user.id)} className='text-red-700 text-xl'><FaRegTrashAlt /></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>

                                        {/* Pop Up Form Edit Profile */}
                                        {showForm && (
                                            <div className="fixed inset-0 text-[#675e51] flex items-center justify-center bg-black bg-opacity-50">
                                                <div className="container mx-auto max-w-2xl py-5">
                                                    <div className="card bg-[#f8f6f4] rounded-2xl shadow mb-6">
                                                        <div className="card-body">
                                                            <button onClick={() => setShowForm(false)} className='flex justify-end text-4xl -mt-4'>
                                                                <CiCircleRemove />
                                                            </button>
                                                            <h2 className="font-bold text-2xl text-center -mt-7 mb-4">
                                                                Form Edit Data
                                                            </h2>
                                                            <form onSubmit={handleFormEdit} className='px-10'>
                                                                <div className="mb-5">
                                                                    <label htmlFor="nama_kategori" className="block text-lg pb-2 font-semibold">
                                                                        Nama :
                                                                    </label>
                                                                    <div className='border border-gray-500 rounded-xl'>
                                                                        <input type="text"
                                                                            id="nama"
                                                                            name='nama'
                                                                            value={editedUserName}
                                                                            onChange={(e) => setEditedUserName(e.target.value)}
                                                                            className="form-input bg-[#f8f6f4] w-full my-1" />
                                                                    </div>
                                                                </div>
                                                                <div className="mb-7">
                                                                    <label className="block text-lg pb-2 font-semibold">
                                                                        No WhatsApp :
                                                                    </label>
                                                                    <div className='border border-gray-500 rounded-xl'>
                                                                        <input type="tel"
                                                                            id="no_hp"
                                                                            name='no_hp'
                                                                            value={editedUserNoHp}
                                                                            onChange={(e) => setEditedUserNoHp(e.target.value)}
                                                                            className="form-input bg-[#f8f6f4] w-full my-1" />
                                                                    </div>
                                                                </div>
                                                                <div className='flex justify-end pb-3'>
                                                                    <button type="submit" className="btn-success inline-flex items-center text-white font-bold py-2 px-3 rounded-xl">
                                                                        <span className='pr-2 text-2xl'> <CiSaveDown2 /> </span>
                                                                        Simpan Perubahan
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {/* Pop Up Form Edit Profile */}
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