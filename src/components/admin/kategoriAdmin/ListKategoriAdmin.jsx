import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../shared/AdminSidebar'
import NavbarAdmin from '../shared/NavbarAdmin'
import { FaPlus, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { CiSaveDown2, CiCircleRemove } from 'react-icons/ci'

const ListKategoriAdmin = () => {
    const [ketegoris, setKategoris] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editCategoryId, setEditCategoryId] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchKategoris = async () => {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `http://localhost:3001/kategori`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const response = await axios.request(config);
                const listKategoris = response.data?.datas;
                listKategoris.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setKategoris(listKategoris);
            } catch (error) {
                console.log(error, "error");
            }
        };
        fetchKategoris();
    }, []);

    // Function Create Data Kategori
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `http://localhost:3001/kategori`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.request(config, {nama_kategori: newCategory,});
            console.log(JSON.stringify(response.data));
        
            // Close the form and refresh the data
            setShowForm(false);
            // swal fire
            await Swal.fire({
                title: "Berhasil!",
                text: "Data berhasil ditambahkan.",
                icon: "success",
                confirmButtonText: "OK",
            });

            setNewCategory('');
            window.location.reload();
        } catch (error) {
            console.log(error, 'error');
        }
    };

    // Function Edit Data Kategori
    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/kategori/${editCategoryId}`, {
                nama_kategori: editCategory,
            });
            setShowForm(false);

            await Swal.fire({
                title: "Update Saved!",
                icon: "success",
            });

            setEditCategory('');
            setEditCategoryId(null);
            window.location.reload();
        } catch (error) {
            console.log(error, 'error');
        }
    };

    // Function to open the edit form
    const openEditForm = (kategori) => {
        setShowForm(true);
        setEditCategory(kategori.nama_kategori);
        setEditCategoryId(kategori.id);
    };

    // Function to Delete 
    const deleteKategoris = async (id) => {
        console.log(id);
        try {
            const config = {
                method: "delete",
                url: `http://localhost:3001/kategori/${id}`,
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
                    Swal.fire("Deleted!", "Your category has been deleted.", "success");
                    window.location.reload();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire("Cancelled", "Your category is safe :)", "error");
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

                    {/* KATEGORI */}
                    <div className=" mt-10 justify-center">
                        <div className='w-[1000px] mx-32 '>
                            <h1 className="text-6xl text-[#675e51] font-bold">Kategori</h1>
                            <p className="my-3 text-[#675e51]">Dashboard / Kategori</p>
                        </div>
                        <div className=" bg-white mx-20 mt-5 justify-center rounded-xl shadow-sm shadow-textFunc">
                            <div className="flex items-center justify-between px-5 pt-5">
                                <div>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="inline-flex items-center text-gray-700 bg-[#edeae4] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-4 py-2 "
                                        type="button"
                                    >
                                        <span className='pr-3'>
                                            <FaPlus />
                                        </span>
                                        Tambah
                                    </button>
                                </div>
                            </div>

                            <div className="">
                                <div className="relative overflow-x-auto p-5">
                                    <table className="w-full text-base text-left text-gray-500 ">
                                        <thead className=" text-gray-700  bg-[#d5d0c4] text-center">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">No</th>
                                                <th scope="col" className="px-6 py-3">Nama Kategori</th>
                                                <th scope="col" className="px-6 py-3">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ketegoris.map((kategori, index) => {
                                                return (
                                                    <tr key={kategori.id} className="bg-white border-b text-base text-center">
                                                        <td scope="row" className="px-6 py-4 ">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-6 py-4">{kategori.nama_kategori}</td>
                                                        <td className="px-6 py-4 flex gap-3 justify-center">
                                                            <button onClick={() => openEditForm(kategori)} className='text-yellow-400 text-xl'>
                                                                <FaRegEdit />
                                                            </button>
                                                            <button onClick={() => deleteKategoris(kategori.id)} className='text-red-800 text-xl'>
                                                                <FaRegTrashAlt />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Pop Up Form Create & Edit Data Kategori */}
                            {showForm && (
                                <div className="fixed inset-0 text-[#675e51] flex p-20 justify-center bg-black bg-opacity-50">
                                    <div className="container mx-auto max-w-lg py-5">
                                        <div className="card bg-white rounded-lg shadow mb-6">
                                            <div className="card-body">
                                                <button onClick={() => setShowForm(false)} className='flex justify-end -mt-4'>
                                                    <span className='text-4xl'> <CiCircleRemove /> </span>
                                                </button>
                                                <h2 className="font-bold text-xl text-center mb-4">
                                                    {editCategoryId ? "Edit Data Kategori" : "Form Data Kategori"}
                                                </h2>
                                                <form onSubmit={editCategoryId ? handleEditFormSubmit : handleFormSubmit}>
                                                    <div className="mb-4">
                                                        <label htmlFor="nama_kategori" className="block">
                                                            Nama Kategori
                                                        </label>
                                                        <input type="text"
                                                            id="nama_kategori"
                                                            name='nama_kategori'
                                                            value={editCategoryId ? editCategory : newCategory}
                                                            onChange={(e) => editCategoryId ? setEditCategory(e.target.value) : setNewCategory(e.target.value)}
                                                            className="form-input border-[#675e51] w-full mt-2 rounded-md"
                                                        />
                                                    </div>
                                                    <div className='flex justify-end'>
                                                        <button type="submit" className="btn-success inline-flex items-center text-white font-bold py-2 px-3 rounded-md">
                                                            <span className='pr-2 text-2xl'> <CiSaveDown2 /> </span>
                                                            {editCategoryId ? "Simpan Perubahan" : "Simpan"}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Pop Up Form Create & Edit Data Kategori */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListKategoriAdmin