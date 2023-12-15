import React, { useState, useEffect } from 'react'
import PaymentBanner from '../../assets/bannerpay.png'
import LogoBCA from '../../assets/logobca.jpeg'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const UploadPayment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [totalHarga, setTotalHarga] = useState("");
    const token = localStorage.getItem("token");
    const [status] = useState("Pembayaran Diterima")
    const [buktiBayar, setBuktiBayar] = useState(null);

    const handlePayment = async (e) => {
        e.preventDefault();
        console.log(id, status, buktiBayar);

        try {
            const formData = new FormData();
            formData.append('pesanan_id', id);
            formData.append('bukti_bayar', buktiBayar);
            formData.append('status', status);

            const config = {
                method: "post",
                url: "http://localhost:3001/payment",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                data: formData,
            };

            const response = await axios(config);
            console.log(response.data);
            navigate("/pesanan/success");
        } catch (error) {
            console.log(error);
        }
    };

    const handleBuktiBayarChange = (e) => {
        const file = e.target.files[0];
        const maxSize = 10 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            Swal.fire({
                title: "Ukuran Gambar Terlalu Besar",
                text: "Ukuran gambar tidak boleh melebihi 2MB.",
                icon: "error",
            });
            setBuktiBayar(null); // Reset the selected thumbnail
            return;
        }
        setBuktiBayar(file);
    };

    // Fetch API Pesanan By Id
    useEffect(() => {
        const fetchPesananById = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/pesanan/${id}`);
                const pesananData = response.data?.datas;
                setTotalHarga(pesananData.total_harga);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPesananById();
    }, [id]);

    return (
        <div className="bg-[#fafafa] pt-11 h-[930px] pb-3 flex flex-col justify-start">
            <img src={PaymentBanner} alt="produkorder" className='mx-auto pt-20 w-[25%]' />
            <div className='mx-40 my-10 bg-[#edeae4]'>
                <form onSubmit={handlePayment}>
                    <h1 className="p-3 font-bold bg-[#a3292f] text-lg text-white rounded-sm rounded-t-md">DETAIL PEMBAYARAN</h1>
                    <div className="p-5 text-[#54514d]">
                        <div className="flex justify-between items-center my-5">
                            <div>
                                <h1 className="text-[#54514d] text-2xl font-extrabold ">INVOICE</h1>
                            </div>
                            <div className="flex flex-col text-center">
                                <p className="text-[#54514d] text-sm">Rabu, 13/12/2023</p>
                                <p className="text-[#54514d] text-sm">22.10 WIB</p>
                            </div>
                        </div>
                        <div className="w-full my-3 border border-[#54514d]"></div>

                        <div className="mt-10">
                            <div className="flex justify-between mt-7 text-lg text-[#54514d] font-semibold">
                                <div>Total Pembayaran</div>
                                <h3 className='text-xl' >Rp. {totalHarga}</h3>
                            </div>
                            <div className="w-full my-3 border border-[#54514d]"></div>
                        </div>
                        <p className="mt-10 text-[#54514d]">
                            Apabila data anda sudah benar, silahkan melakukan pembayaran anda melalui :
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-[100px] my-5">
                                <img src={LogoBCA} alt="" />
                            </div>
                            <div>No. Rek : 12344566 A/N Kausa Admin</div>
                        </div>
                        <div className="w-full my-3 border border-[#54514d]"></div>

                        <div className="mt-10 text-[#54514d]">
                            Apabila telah selesai melakukan transfer pada nomor rekening diatas silahkan upload bukti transfer dibawah
                            ini
                        </div>
                        <div className="p-5">
                            <div className="relative z-0 w-full mb-6 group bg-white/60">
                                <div className=' border border-white'>
                                    <input type="file" name="buktiPembayaran" id="buktiPembayaran" onChange={handleBuktiBayarChange} required />
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-2 border border-[#54514d]"></div>

                        <div className='mt-7 '>
                            <button
                                type="submit"
                                className="py-3 rounded-lg font-bold px-6 w-full  text-white bg-[#a3292f] hover:bg-[#ff3333]">
                                Upload Bukti Pembayaran
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadPayment