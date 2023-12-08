import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { CiSaveDown2, CiCircleRemove } from 'react-icons/ci'

const Profile = () => {
    const authState = useSelector((state) => state.auth);
    // Cek apakah authState atau authState.user ada sebelum mengakses propertinya
    const userName = authState?.user?.nama || "Guest";
    const noHandphone = authState?.user?.no_hp || "N/A";
    const email = authState?.user?.email || "N/A";
    const role = authState?.user?.role || "N/A";

    const token = localStorage.getItem("token");
    const [showForm, setShowForm] = useState(false);
    const [editedUserName, setEditedUserName] = useState('');
    const [editedUserNoHp, setEditedUserNoHp] = useState('');
    const [editedUserId, setEditedUserId] = useState(null);

    // Function Edit
    const handleFormEditUser = async (e) => {
        e.preventDefault();
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
            await axios.put(`http://localhost:3001/user/${editedUserId}`, editedUserData, config);
            setShowForm(false);
            Swal.fire({
                title: "Update Profile Saved!",
                icon: "success",
            });
            setEditedUserName('');
            setEditedUserNoHp('');
            setEditedUserId(null);
            window.location.reload();
        } catch (error) {
            console.error("Error updating profile user:", error);
        }
    };
    // Function To Open Edit Form
    const openEditForm = (users) => {
        setShowForm(true);
        setEditedUserName(users.nama);
        setEditedUserNoHp(users.no_hp);
        setEditedUserId(users.id);
    }

    return (
        <div className="mx-20 pt-[175px] pb-32">
            <div className="flex justify-center gap-10 items-center">
                {/* Isi Card Pertama */}
                <div className="w-1/2 bg-white  border border-gray-300 rounded-lg ml-10">
                    <div className="w-full  ">
                        <div className="bg-red-800 rounded-lg">
                            <h1 className="text-white text-[20px] font-bold py-2.5 px-4">Photo</h1>
                        </div>
                        <div className="my-10 text-[200px] text-gray-800 justify-center flex w-full">
                            <FaUserCircle />
                        </div>
                        <div className="mb-11 text-gray-600 justify-center items-center text-center flex-wrap w-full">
                            <p>Hello, {userName} <br /> Welcome to your profile page</p>
                            <div>
                                <button type="button" onClick={() => openEditForm(authState.user)}
                                    className="bg-red-800 mt-3 hover:bg-red-400 px-10 py-2 rounded-full text-white">
                                    Edit Profil
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Pop Up Form Edit Profile */}
                    {showForm && (
                        <div className="fixed inset-0 text-gray-700 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="container mx-auto max-w-2xl py-5">
                                <div className="card bg-[#f1efeb] rounded-2xl shadow mb-6">
                                    <div className="card-body">
                                        <button onClick={() => setShowForm(false)} className='flex justify-end -mt-4'>
                                            <span className='text-4xl cursor-pointer'> <CiCircleRemove /> </span>
                                        </button>
                                        <h2 className="font-bold text-2xl text-center -mt-7 mb-4">
                                            Edit Profile
                                        </h2>
                                        <form onSubmit={handleFormEditUser} className='px-10'>
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
                                                        className="form-input bg-[#edeae4] w-full my-1" />
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
                                                        className="form-input bg-[#edeae4] w-full my-1" />
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
                    {/* Pop Up Form Create & Edit Profile */}
                </div>

                {/* Isi Card Kedua */}
                <div className="w-2/3 bg-lightgray  border border-gray-300 rounded-lg mr-10">
                    <div className="w-full  ">
                        <div className="bg-red-800 rounded-lg">
                            <h1 className="text-white text-[20px] font-bold py-2.5 px-4">Identitas</h1>
                        </div>
                        <div className="my-5 mx-5 text-lg text-gray-600 w-full">
                            <form>
                                <table>
                                    <thead>
                                        <tr>
                                            <td className="p-3 font-semibold">Nama Lengkap</td>
                                            <td className="p-3">:</td>
                                            <td className="p-3">{userName}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-semibold">No WhatsApp</td>
                                            <td className="p-3">:</td>
                                            <td className="p-3">{noHandphone}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-semibold">Email</td>
                                            <td className="p-3">:</td>
                                            <td className="p-3">{email}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-semibold">Role</td>
                                            <td className="p-3">:</td>
                                            <td className="p-3">{role}</td>
                                        </tr>
                                    </thead>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile