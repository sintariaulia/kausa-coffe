import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { formatDate } from '../../../util/Helper'

const DetailPesananAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [pesananId, setPesananId] = useState("")
  const [user, setUser] = useState("")
  const [produk, setProduk] = useState("")
  const [quantity, setQuantity] = useState("")
  const [waktuPickUp, setWaktuPickUp] = useState("")
  const [totalHarga, setTotalHarga] = useState("")
  const [statusPesanan, setStatusPesanan] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const token = localStorage.getItem("token")

  const handleBack = () => {
    navigate('/admin/pesanan');
  }

  // Fetch API Data Pesanan
  useEffect(() => {
    const getPesananById = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/pesanan/${id}`);
        const dataPesanan = response.data?.datas;
        setPesananId(dataPesanan.id)
        setUser(dataPesanan.user_id);
        setProduk(dataPesanan.produk_id);
        setQuantity(dataPesanan.quantity);
        setWaktuPickUp(dataPesanan.waktu_pickup);
        setTotalHarga(dataPesanan.total_harga);
        setStatusPesanan(dataPesanan.status_pesanan);
        setCreatedAt(dataPesanan.created_at)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getPesananById();
  }, [id]);

  // Function Edit Status Pesanan
  const updateStatus = async (status_pesanan) => {
    const data = {
      status_pesanan,
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(`http://localhost:3001/pesanan/${id}`, data, config);
      console.log(response.data?.datas);
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatusPesanan = async () => {
    Swal.fire({
      title: "Ubah Status Pemesanan?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Pesenan Selesai",
      denyButtonText: "Penasan Dibatalkan",
      cancelButtonText: "Cancel",
      confirmButtonClass: "bg-green-500 hover:bg-purple-600 text-white font-semibold",
      denyButtonClass: "bg-red-500 hover:bg-red-600 text-white font-semibold",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await updateStatus("Pesanan Selesai");
        Swal.fire("Sukses!", "", "success");
        navigate("/admin/pesanan");
      } else if (result.isDenied) {
        await updateStatus("Pesanan Dibatalkan");
        Swal.fire("Pesanan Anda Dibatalkan, Silahkan", "", "info");
        navigate("/admin/pesanan");
      }
    });
  };

  // BackGround Status
  const getStatusClass = (status) => {
    switch (status) {
        case 'Di Proses':
            return 'btn-warning ';
        case 'Pesanan Selesai':
            return 'btn-success';
        case 'Pesanan Dibatalkan':
            return 'btn-error ';
        default:
            return '';
    }
};

  return (
    <div className="flex-1 p-4 min-h-0 overflow-auto">
      <div className=" mt-5 justify-center">
        {/* judul */}
        <div className='w-[1000px] mx-32 '>
          <h1 className="text-[45px] text-[#675e51] font-bold">Detail Pesanan</h1>
          <p className="my-3 text-[#675e51]">Dashboard / Pesanan / Detail</p>
        </div>
        {/* content */}
        <div className=" bg-white mx-20 mt-10 justify-center rounded-xl shadow-sm">
          <div className="relative overflow-x-auto p-5">
            <div className='flex-1'>
              <div className='w-full px-10 pt-3 text-[#675e51]'>
                <form action="" className='space-y-4'>
                  <table className='w-full ml-20'>
                    <tbody>
                      <tr>
                        <td className="py-5">
                          <label className="block mb-1 font-bold">
                            Pesanan ID
                          </label>
                        </td>
                        <td className="pr-96">
                          <p
                            type="text"
                            id="id"
                            className="w-full py-2 px-2 border-white rounded-md"
                          >
                            <span className='px-8 font-bold'> : </span>{pesananId}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-5">
                          <label className="block mb-1 font-bold">
                            User ID
                          </label>
                        </td>
                        <td className="pr-96">
                          <p
                            type="text"
                            id="user_id"
                            className="w-full py-2 px-2 border-white rounded-md"
                          >
                            <span className='px-8 font-bold'> : </span>{user}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-5">
                          <label className="block mb-1 font-bold">
                            Produk
                          </label>
                        </td>
                        <td className="">
                          <p
                            type="text"
                            id="produk_id"
                            className="w-full py-2 px-2 border-white rounded-md"
                          >
                            <span className='px-8 font-bold'> : </span>{produk}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-5">
                          <label className="block mb-1 font-bold">
                            Quantity
                          </label>
                        </td>
                        <td className="">
                          <p type="text"
                            id="quantity"
                            className="w-full py-2 px-2 border-white rounded-md" >
                            <span className='px-8 font-bold'> : </span>{quantity}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-5">
                          <label className="block mb-1 font-bold">
                            Waktu Pick Up Pesanan
                          </label>
                        </td>
                        <td className="">
                          <p type="text"
                            id="waktu_pickup"
                            className="w-full py-2 px-2 border-white rounded-md" >
                            <span className='px-8 font-bold'> : </span>{waktuPickUp}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-5">
                          <label className="block mb-1 font-bold">
                            Total Harga
                          </label>
                        </td>
                        <td className="">
                          <p type="text"
                            id="total_harga"
                            className="w-full py-2 px-2 border-white rounded-md"  >
                            <span className='px-8 font-bold'> : </span>{totalHarga}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-5">
                          <label className="block mb-1 font-bold">
                            Status Pesanan
                          </label>
                        </td>
                        <td className="">
                          <p type="text"
                            id="status_pesanan"
                            className="w-full py-2 px-2 border-white rounded-md">
                            <span className='px-8 font-bold'> : </span>
                            <span className={`inline-block text-gray-700 px-6 py-2 rounded-lg ${getStatusClass(statusPesanan)}`}> {statusPesanan} </span>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-5">
                          <label className="block mb-1 font-bold">
                            Tanggal Pesanan
                          </label>
                        </td>
                        <td className="">
                          <p type="text"
                            id="created_at"
                            className="w-full py-2 px-2 border-white rounded-md">
                            <span className='px-8 font-bold'> : </span>{formatDate(createdAt)}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex flex-wrap justify-between pb-7 mx-16">
                    <button
                      onClick={handleBack}
                      type="button"
                      className="px-4 py-2 mt-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-600">
                      Kembali
                    </button>

                    <button
                      onClick={handleStatusPesanan}
                      type="button"
                      className="px-4 py-2 mt-2 btn-warning text-white font-semibold rounded-md hover:bg-yellow-200">
                      Ubas Status Pesanan
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

export default DetailPesananAdmin