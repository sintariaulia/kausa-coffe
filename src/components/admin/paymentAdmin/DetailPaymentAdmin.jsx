import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { formatDate } from '../../../util/Helper'
import BuktiBayar from '../assets/buktipembayaran.png'

const DetailPaymentAdmin = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [paymentId, setPaymentId] = useState("")
  const [pesananId, setPesananId] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [statusBayar, setStatus] = useState("");
  const [buktiBayar, setBuktiBayar] = useState("")
  const token = localStorage.getItem("token")

  const handleBack = () => {
    navigate('/admin/payment');
  }

  // Function fetch API Get Payment By Id 
  useEffect(() => {
    const getPaymentById = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/payment/${id}`);
        const dataPayment = response.data?.datas[0];
        setPaymentId(dataPayment.id)
        setPesananId(dataPayment.pesanan_id);
        setCreatedAt(dataPayment.created_at);
        setStatus(dataPayment.status);
        setBuktiBayar(dataPayment.bukti_bayar);
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPaymentById();
  }, [id]);

  // Function Edit Status Payment 
  const updateStatus = async (status) => {
    const data = {
      status,
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await axios.put(`http://localhost:3001/payment/${id}`, data, config);
      console.log(response.data?.datas);
    } catch (error) {
      console.log(error);
    }
  }

  const handleStatusPayment = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Ubah Status Pembayaran?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sukses",
      denyButtonText: "Ditolak",
      cancelButtonText: "Cancel",
      confirmButtonClass: "bg-green-500 hover:bg-purple-600 text-white font-semibold",
      denyButtonClass: "bg-red-500 hover:bg-red-600 text-white font-semibold",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await updateStatus("Pembayaran Sukses");
        Swal.fire("Sukses!", "", "success");
        navigate(`/admin/payment/`);
      } else if (result.isDenied) {
        await updateStatus("Pembayaran Ditolak");
        Swal.fire("Tidak Diterima", "", "info");
        navigate("/admin/payment");
      }
    });
  };

  // BackGround Status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pembayaran Diterima':
        return 'btn-info';
      case 'Pembayaran Sukses':
        return 'btn-success';
      case 'Pembayaran Ditolak':
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
          <h1 className="text-[45px] text-[#675e51] font-bold">Detail Payment</h1>
          <p className="my-3 text-[#675e51]">Dashboard / Payment / Detail</p>
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
                            Payment ID
                          </label>
                        </td>
                        <td className="pr-96">
                          <p
                            type="text"
                            id="id"
                            className="w-full py-2 px-2 border-white rounded-md"
                          >
                            <span className='px-8 font-bold'> : </span>{paymentId}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-5">
                          <label className="block mb-1 font-bold">
                            Pesanan ID
                          </label>
                        </td>
                        <td className="pr-96">
                          <p
                            type="text"
                            id="user_id"
                            className="w-full py-2 px-2 border-white rounded-md"
                          >
                            <span className='px-8 font-bold'> : </span>{pesananId}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-5">
                          <label className="block mb-1 font-bold">
                            Tanggal Payment
                          </label>
                        </td>
                        <td className="">
                          <p
                            type="text"
                            id="produk_id"
                            className="w-full py-2 px-2 border-white rounded-md"
                          >
                            <span className='px-8 font-bold'> : </span>{formatDate(createdAt)}
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td className="py-5">
                          <label className="block mb-1 font-bold">
                            Status Pembayaran
                          </label>
                        </td>
                        <td className="">
                          <p type="text"
                            id="status_pesanan"
                            className="w-full py-2 px-2 border-white rounded-md">
                            <span className='px-8 font-bold'> : </span>
                            <span className={`inline-block text-gray-700 px-6 py-2 rounded-lg ${getStatusClass(statusBayar)}`}> {statusBayar} </span>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-5">
                          <label className="block mb-1 font-bold">
                            Bukti Pembayaran
                          </label>

                        </td>
                        <td className="">
                          <p type="text"
                            id="created_at"
                            className="w-full py-2 px-2 border-white rounded-md">
                            <div className='flex items-center'>
                              <span className='px-8 font-bold'> : </span>
                              <img
                                src={BuktiBayar}
                                alt="Product Preview"
                                className="w-50 h-60 mx-8 object-center"
                              />
                            </div>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Button */}
                  <div className="flex flex-wrap justify-between pb-7 mx-16">
                    <button
                      onClick={handleBack}
                      type="button"
                      className="px-4 py-2 mt-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-600">
                      Kembali
                    </button>
                    {statusBayar !== "Pembayaran Sukses" && (
                      <button
                        onClick={handleStatusPayment}
                        type="button"
                        className="px-4 py-2 mt-2 btn-warning text-white font-semibold rounded-md hover:bg-yellow-200">
                        Ubah Status Pembayaran
                      </button>
                    )}
                  </div>
                  {/* Button */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPaymentAdmin