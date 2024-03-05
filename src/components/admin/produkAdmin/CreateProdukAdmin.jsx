import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CiSaveDown2 } from 'react-icons/ci'

const CreateProdukAdmin = () => {
    const getToken = localStorage.getItem("token");
    const navigate = useNavigate();
    const [namaProduk, setNamaProduk] = useState("");
    const [kategori, setKategori] = useState("");
    const [harga, setHarga] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [gambar, setGambar] = useState(null);

    const handleBack = () => {
        navigate(-1);
    };

    // Select Data Kategori
    const [kategoris, setKategoris] = useState([]);
    useEffect(() => {
        const fetchKategoris = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/kategori`);
                // console.log('response', response.data);
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
            const formDataProduk = new FormData();
            formDataProduk.append("kategori_id", kategori);
            formDataProduk.append("nama_produk", namaProduk);
            formDataProduk.append("deskripsi", deskripsi);
            formDataProduk.append("harga", harga);
            formDataProduk.append("gambar", gambar);

            const config = {
                method: "post",
                url: `${process.env.REACT_APP_BASE_URL}/produk`,
                headers: {
                    Authorization: `Bearer ${getToken}`,
                    'Content-Type': 'multipart/form-data',
                },
                data: formDataProduk,
            };
            // const dataProduk = {
            //     kategori_id: kategori,
            //     nama_produk: namaProduk,
            //     deskripsi: deskripsi,
            //     harga: harga,
            //     gambar: gambar,
            // }
            // const response = await axios.post('http://localhost:3001/produk', dataProduk, config);

            const response = await axios(config);
            console.log(response.data);
            Swal.fire({
                title: "Berhasil!",
                text: "Data berhasil ditambahkan.",
                icon: "success",
                confirmButtonText: "OK",
            });

            setTimeout(() => {
                navigate('/admin/produks');
            }, 2000);

        } catch (error) {
            console.log("error", error)
        }
    };

    const handleGambarProdukChange = (e) => {
        const file = e.target.files[0];
        const maxSize = 10 * 1024 * 1024; //2MB
        if (file.size > maxSize) {
            Swal.fire({
                title: "Ukuran Gambar Terlalu Besar",
                text: "Ukuran gambar tidak boleh melebihi 2MB.",
                icon: "error",
            });
            setGambar(null); // Reset the selected gambar product
            return;
        }
        setGambar(file);
    }

    return (
        <div className="flex-1 p-3 min-h-0 overflow-auto">
            <div className="mt-7 justify-center">
                {/* judul */}
                <div className='w-[1000px] mx-32 '>
                    <h1 className="text-[42px] text-[#675e51] font-bold">Tambah Data Produk</h1>
                    <p className="my-3 text-[#675e51]">Dashboard / Produk / Create</p>
                </div>
                {/* content */}
                <div className=" bg-white mx-20 mt-8 justify-center text-[#675e51] rounded-2xl shadow-sm">
                    <div className="relative overflow-x-auto px-20 py-14">
                        <form onSubmit={handleFormSubmit}>
                            <div className='mb-7'>
                                <label htmlFor='nama_produk' className="block mb-2 font-semibold">Nama Produk</label>
                                <div className='border border-gray-300 rounded-lg '>
                                    <input
                                        type="text"
                                        id="nama_produk"
                                        name='nama_produk'
                                        value={namaProduk}
                                        onChange={(e) => setNamaProduk(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 rounded-lg w-full" required />
                                </div>
                            </div>
                            <div className="grid gap-10 mb-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="kategori_id" className="block mb-2 font-semibold ">Kategori</label>
                                    <select
                                        id="kategori_id"
                                        value={kategori}
                                        onChange={(e) => setKategori(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 rounded-lg w-full">
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
                                    <div className='border border-gray-300 rounded-lg '>
                                        <input
                                            type="text"
                                            id="harga"
                                            name='harga'
                                            value={harga}
                                            onChange={(e) => setHarga(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 rounded-lg w-full" required />
                                    </div>
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
                            <div class="mb-6">
                                <label class="block mb-2 mt-1 font-semibold " htmlFor="gambar">Upload Gambar</label>
                                <div className='border border-gray-300 rounded-lg'>
                                    <input
                                        id="produkGambar"
                                        type="file"
                                        name='produkGambar'
                                        class="block w-full rounded-lg bg-gray-50 cursor-pointer"
                                        onChange={handleGambarProdukChange} required />
                                </div>
                            </div>
                            <div className='flex justify-between pt-6'>
                                <button onClick={handleBack} type="button"
                                    className="px-11 py-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-600">
                                    Kembali
                                </button>
                                <button type="submit" className="btn-success inline-flex gap-2 items-center text-white font-bold py-2 px-10 rounded-md">
                                    <span className='text-2xl'> <CiSaveDown2 /> </span>
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

export default CreateProdukAdmin