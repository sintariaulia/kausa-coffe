import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CiSaveDown2 } from 'react-icons/ci';
import Swal from 'sweetalert2';

const CreatePesananAdmin = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [hargaProduk, setHargaProduk] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [waktuPickUp, setWaktuPickUp] = useState("");
  const [totalHarga, setTotalHarga] = useState(0)
  const [statusPesanan, setStatusPesanan] = useState("");
  const token = localStorage.getItem("token");

  const handleBack = () => {
    navigate(-1);
  }

  // Select Data Produks by ID
  const [produks, setProduks] = useState([]);
  useEffect(() => {
    const fetchDataProduks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/produk`);
        const listProduk = response.data?.datas;
        setProduks(listProduk);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDataProduks();
  }, []);

  // Menghitung total harga
  useEffect(() => {
    const calculatedTotalHarga = hargaProduk * quantity;
    setTotalHarga(calculatedTotalHarga);
  }, [hargaProduk, quantity]);

  // Function Create Data Pesanan By Admin
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const dataPesanan = {
        user_id: userId,
        produk_id: namaProduk,
        quantity: quantity,
        waktu_pickup: waktuPickUp,
        total_harga: totalHarga,
        status_pesanan: statusPesanan,
      };

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/pesanan`, dataPesanan, config);
      console.log(response.data);
      Swal.fire({
        title: "Berhasil!",
        text: "Data Pesanan berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => {
        navigate('/admin/pesanan');
      }, 3000);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="flex-1 p-3 min-h-0 overflow-auto">
      <div className="mt-7 justify-center">
        {/* judul */}
        <div className='w-[1000px] mx-32 '>
          <h1 className="text-[43px] text-[#675e51] font-bold">Tambah Data Pesanan</h1>
          <p className="my-3 text-[#675e51]">Dashboard / Pesanan / Create</p>
        </div>
        {/* content */}
        <div className=" bg-white mx-20 mt-8 justify-center text-[#675e51] rounded-2xl shadow-sm">
          <div className="relative overflow-x-auto px-20 py-14">
            <form onSubmit={handleFormSubmit}>
              <div className="grid gap-10 mb-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-semibold ">Nama Produk</label>
                  <select
                    id="produk"
                    value={namaProduk}
                    onChange={(e) => setNamaProduk(e.target.value)}
                    className="bg-gray-50 border border-gray-300 rounded-lg w-full">
                    <option value="">-- Pilih Produk Kausa --</option>
                    {produks.map((produk) => (
                      <option key={produk.id} value={produk.id}>
                        {produk.nama_produk} {produk.harga}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-semibold ">Harga Produk</label>
                  <div className='border border-gray-300 rounded-lg '>
                    <input
                      type="number"
                      id="harga"
                      name='harga'
                      value={hargaProduk}
                      onChange={(e) => setHargaProduk(e.target.value)}
                      className="bg-gray-50 border border-gray-300 rounded-lg w-full" />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-semibold ">Quantity</label>
                  <div className='border border-gray-300 rounded-lg '>
                    <input
                      type="number"
                      id="quantity"
                      name='quantity'
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="bg-gray-50 border border-gray-300 rounded-lg w-full" required />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-semibold ">Total Harga</label>
                  <div className='border border-gray-300 rounded-lg '>
                    <input
                      value={totalHarga}
                      type="text"
                      id="total_harga"
                      name='total_harga'
                      className="bg-gray-50 border border-gray-300 rounded-lg w-full"
                      required
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-semibold ">Waktu Pick Up</label>
                  <div className='border border-gray-300 rounded-lg '>
                    <input
                      value={waktuPickUp}
                      onChange={(e) => setWaktuPickUp(e.target.value)}
                      type="time"
                      id="waktu_pickup"
                      name='waktu_pickup'
                      className="bg-gray-50 border border-gray-300 rounded-lg w-full" required />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-semibold ">Status Pesanan</label>
                  <select
                    id="status_pesanan"
                    name='status_pesanan'
                    onChange={(e) => setStatusPesanan(e.target.value)}
                    className="bg-gray-50 border border-gray-300 rounded-lg w-full">
                    <option value="">-- Select Status Pesanan</option>
                    <option value="Di Proses">Di Proses</option>
                    <option value="Pesanan Selesai">Pesanan Selesai</option>
                  </select>
                </div>
              </div>
              <div className='flex justify-between pt-8'>
                <button onClick={handleBack} type="button"
                  className="px-10 py-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-600">
                  Kembali
                </button>
                <button type="submit" className="btn-success inline-flex items-center text-white font-bold py-2 px-8 rounded-md">
                  <span className='pr-2 text-2xl'> <CiSaveDown2 /> </span>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePesananAdmin;
