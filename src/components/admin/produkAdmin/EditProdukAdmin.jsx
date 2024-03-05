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
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/produk/${id}`);
                const produkData = response.data.datas;
                console.log(produkData)
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
                const formDataProduk = new FormData();
                formDataProduk.append("nama_produk", namaProduk);
                formDataProduk.append("deskripsi", deskripsi);
                formDataProduk.append("harga", harga);
                formDataProduk.append("gambar", gambar);

                const getToken = localStorage.getItem("token");
                const config = {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/produk/${id}`,
                    headers: {
                        Authorization: `Bearer ${getToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                    data: formDataProduk,
                };
                // Form Body Request Edit
                // const editProduk = {
                //     nama_produk: namaProduk,
                //     deskripsi: deskripsi,
                //     harga: harga,
                //     gambar: gambar,
                // }
                // await axios.put(`http://localhost:3001/produk/${id}`, editProduk, config);

                const response = await axios(config);
                console.log(response.data);
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
                                    <div className='border border-gray-300 rounded-lg'>
                                        <input
                                            type='text'
                                            id='nama_produk'
                                            value={namaProduk}
                                            onChange={(e) => setNamaProduk(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 rounded-lg w-full" required />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="harga" className="block mb-2 font-semibold ">Harga</label>
                                    <div className='border border-gray-300 rounded-lg'>
                                        <input
                                            type="number"
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
                            <div className="mb-6">
                                <label htmlFor="produkGambar" className="block mb-2 font-semibold">Gambar Produk</label>
                                <div className='border border-gray-300 rounded-lg'>
                                    <input
                                        type='file'
                                        id='produkGambar'
                                        name='produkGambar'
                                        onChange={handleGambarProdukChange}
                                        className="block cursor-pointer rounded-lg w-full" required/>
                                </div>
                            </div>
                            <div className='flex justify-between gap-5 pt-5'>
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

export default EditProdukAdmin