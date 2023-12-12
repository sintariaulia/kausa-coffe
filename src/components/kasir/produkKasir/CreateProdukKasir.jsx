import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CiSaveDown2 } from 'react-icons/ci'

const CreateProdukKasir = () => {
    const navigate = useNavigate();
    const [namaProduk, setNamaProduk] = useState("");
    const [kategori, setKategori] = useState("");
    const [harga, setHarga] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [gambar, setGambar] = useState("");

    const handleGoBack = () => {
        navigate(-1)
    }

    // Select Data Kategori
    const [kategoris, setKategoris] = useState([]);
    useEffect(() => {
        const fetchKategoris = async () => {
            try {
                const response = await axios.get('http://localhost:3001/kategori');
                const listKategoris = response.data?.datas;
                setKategoris(listKategoris);
            } catch (error) {
                console.log(error, "error");
            }
        };
        fetchKategoris();
    }, []);

    // Fuction Create Data Produk
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/produk', {
                kategori_id: kategori,
                nama_produk: namaProduk,
                deskripsi: deskripsi,
                harga: harga,
                gambar: gambar,
            });

            Swal.fire({
                title: "Berhasil!",
                text: "Data berhasil ditambahkan.",
                icon: "success",
                confirmButtonText: "OK",
            });

            setTimeout(() => {
                navigate('/kasir/produks');
            }, 3000);

        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div className="flex-1 p-3 min-h-0 overflow-auto">
            <div className=" mt-5 justify-center">
                {/* judul */}
                <div className='w-[1000px] mx-32 '>
                    <h1 className="text-4xl text-[#675e51] font-bold">Tambah Data Produk</h1>
                    <p className="my-3 text-[#675e51]">Kasir / Produk / Create</p>
                </div>
                {/* content */}
                <div className=" bg-white mx-20 mt-8 justify-center text-[#675e51] rounded-2xl shadow-sm">
                    <div className="relative overflow-x-auto px-20 py-14">
                        <form onSubmit={handleFormSubmit}>
                            <div className="grid gap-10 mb-6 md:grid-cols-2">
                                
                                <div>
                                    <label htmlFor='nama_produk' className="block mb-2 font-semibold">Nama Produk</label>
                                    <input
                                        type="text"
                                        id="nama_produk"
                                        name='nama_produk'
                                        value={namaProduk}
                                        onChange={(e) => setNamaProduk(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 rounded-lg w-full" required />
                                </div>
                                <div>
                                    <label htmlFor="kategori_id" className="block mb-2 font-semibold ">Kategori</label>
                                    <select
                                        id="kategori_id"
                                        value={kategori}
                                        onChange={(e) => setKategori(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 rounded-lg w-full"
                                    >
                                        <option value="">-- Pilih Kategori --</option>
                                        {kategoris.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.nama_kategori}
                                            </option>
                                        ))}
                                    </select>

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
                            <div className='flex justify-between pt-6'>
                                <button onClick={handleGoBack} type="button"
                                    className="w-[100px] px-4 py-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-600">
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

export default CreateProdukKasir