import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DetailProdukKasir = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [kategori, setKategori] = useState("");
    const [namaProduk, setNamaProduk] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [harga, setHarga] = useState("");
    const [gambar, setGambar] = useState("");

    const handleBack = () => {
        navigate(-1);
    };

    // Fetch API
    useEffect(() => {
        const fetchProdukById = async () => {
            console.log("API Response Running")
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/produk/${id}`);
                const produkData = response.data?.datas;
                setKategori(produkData.kategori_id);
                setNamaProduk(produkData.nama_produk);
                setDeskripsi(produkData.deskripsi);
                setHarga(produkData.harga);
                setGambar(produkData.gambar);
                console.log(produkData);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProdukById();
    }, [id]);


    return (
        <div className="flex-1 p-4 min-h-0 overflow-auto">
            <div className=" mt-5 justify-center">
                {/* judul */}
                <div className='w-[1000px] mx-32 '>
                    <h1 className="text-6xl text-[#675e51] font-bold">Detail Produk</h1>
                    <p className="my-3 text-[#675e51]">Kasir / Produk / Detail</p>
                </div>
                {/* content */}
                <div className=" bg-white mx-20 mt-7 justify-center rounded-xl shadow-sm">
                    <div className="relative overflow-x-auto p-5">
                        <div className='flex-1'>
                            <div className='w-full px-10 pt-7 text-[#675e51]'>
                                <form action="" className='space-y-4'>
                                    <table className='w-full'>
                                        <tr>
                                            <td className="py-5">
                                                <label htmlFor="kategori" className="block mb-1 font-bold">
                                                    Kategori
                                                </label>
                                            </td>
                                            <td className="">
                                                <p
                                                    type="text"
                                                    id="kategori"
                                                    className="w-full py-2 px-2 border-white rounded-md"
                                                >
                                                    <span className='px-8 font-bold'> : </span>{kategori}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-5">
                                                <label htmlFor="namaProduk" className="block mb-1 font-bold">
                                                    Nama Produk
                                                </label>
                                            </td>
                                            <td className="">
                                                <p
                                                    type="text"
                                                    id="namaProduk"
                                                    className="w-full py-2 px-2 border-white rounded-md"
                                                >
                                                    <span className='px-8 font-bold'> : </span>{namaProduk}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-5">
                                                <label htmlFor="deskripsi" className="block mb-1 font-bold">
                                                    Deskripsi
                                                </label>
                                            </td>
                                            <td className="">
                                                <p
                                                    type="text"
                                                    id="deskripsi"
                                                    className="w-full py-2 px-2 border-white rounded-md"
                                                >
                                                    <span className='px-8 font-bold'> : </span>{deskripsi}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-5">
                                                <label htmlFor="harga" className="block mb-1 font-bold">
                                                    Harga
                                                </label>
                                            </td>
                                            <td className="">
                                                <p
                                                    type="text"
                                                    id="harga"
                                                    className="w-full py-2 px-2 border-white rounded-md"
                                                >
                                                    <span className='px-8 font-bold'> : </span>{harga}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-5">
                                                <label className="block mb-1 font-bold">
                                                    Gambar Produk
                                                </label>
                                            </td>
                                            <td className="">
                                                <p type="text"
                                                    id="gambar"
                                                    className="w-full py-2 px-2 border-white rounded-md">
                                                    <div className='flex items-center'>
                                                        <span className='px-8 font-bold'> : </span>
                                                        {" "}
                                                        <img
                                                            src={`${process.env.REACT_APP_BASE_URL}${gambar}`}
                                                            alt="Product Preview"
                                                            className="w-50 h-60 mx-8 object-center border border-[#675e51] rounded-3xl p-2"
                                                        />
                                                    </div>
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
                                            className="w-[100px] px-4 py-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-600">
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
    )
}

export default DetailProdukKasir