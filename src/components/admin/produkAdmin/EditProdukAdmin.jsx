import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CiSaveDown2 } from 'react-icons/ci'

const EditProdukAdmin = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [namaProduk, setNamaProduk] = useState("");
    const [harga, setHarga] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [gambar, setGambar] = useState("");

    const handleGoBack = () => {
        navigate(-1);
    };

    // Function Fetch Data Produk For Form Update
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/produk/${id}`);
                const produkData = response.data.datas;

                setNamaProduk(produkData.nama_produk);
                setHarga(produkData.harga);
                setDeskripsi(produkData.deskripsi);
                setGambar(produkData.gambar);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]);

    // Function Edit Data Produk
    const handleFormUpdate = async (e) => {
        e.preventDefault();

        const confirmResult = await Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonColor: "#d33",
        });
        if (confirmResult.isConfirmed) {
            try {
                const getToken = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${getToken}`,
                    },
                };
                // Form Body Request Edit
                const editProduk = {
                    nama_produk: namaProduk,
                    deskripsi: deskripsi,
                    harga: harga,
                    gambar: gambar,
                }

                await axios.put(`http://localhost:3001/produk/${id}`, editProduk, config);

                Swal.fire({
                    title: "Changes saved successfully!",
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/admin/produks/${id}/detail`);
                    }
                });
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    return (
        <div className="flex-1 p-3 min-h-0 overflow-auto">
            <div className=" mt-5 justify-center">
                {/* judul */}
                <div className='w-[1000px] mx-32 '>
                    <h1 className="text-4xl text-[#675e51] font-bold">Edit Data Produk</h1>
                    <p className="my-3 text-[#675e51]">Dashboard / Produk / Edit</p>
                </div>
                {/* content */}
                <div className=" bg-white mx-20 mt-8 justify-center text-[#675e51] rounded-2xl shadow-sm">
                    <div className="relative overflow-x-auto px-20 py-14">
                        <form onSubmit={handleFormUpdate}>
                            <div className="grid gap-10 mb-6 md:grid-cols-2">
                                <div className="mb-6">
                                    <label htmlFor="nama_produk" className="block mb-2 font-semibold">Nama Produk</label>
                                    <input
                                        type='text'
                                        id='nama_produk'
                                        value={namaProduk}
                                        onChange={(e) => setNamaProduk(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 rounded-lg w-full" required />
                                </div>
                                <div>
                                    <label htmlFor="harga" className="block mb-2 font-semibold ">Harga</label>
                                    <input
                                        type="number"
                                        id="harga"
                                        name='harga'
                                        value={harga}
                                        onChange={(e) => setHarga(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 rounded-lg w-full" required />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="deskripsi" className="block mb-2 font-semibold ">Deskripsi</label>
                                <textarea
                                    id="deskripsi" rows="3"
                                    value={deskripsi}
                                    onChange={(e) => setDeskripsi(e.target.value)}
                                    className="block p-2.5 w-full  bg-gray-50 rounded-lg border border-gray-300" >
                                </textarea>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="gambar" className="block mb-2 font-semibold">URL Gambar</label>
                                <input
                                    type='text'
                                    id='gambar'
                                    value={gambar}
                                    onChange={(e) => setGambar(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 rounded-lg w-full" required />
                            </div>

                            <div className='flex justify-end gap-5 pt-5'>
                                <button type="button" className="btn-error inline-flex items-center text-white font-semibold py-2 px-3 rounded-md"
                                    onClick={handleGoBack}
                                >
                                    Kembali
                                </button>

                                <button type="submit" className="btn-success inline-flex items-center text-white font-bold py-2 px-3 rounded-md">
                                    <span className='pr-2 text-2xl'> <CiSaveDown2 /> </span>
                                    Simpan
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProdukAdmin