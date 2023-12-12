import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const DetailProduks = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [produks, setProduks] = useState(null);
  // Fuction Fetch API Produk By Id
  useEffect(() => {
    const getProduksById = async () => {
      try {
        const responseDetail = await axios.get(`http://localhost:3001/produk/${params.id}`);
        const produkDetail = responseDetail.data.datas;
        setProduks(produkDetail);
      } catch (error) {
        console.log(error);
      }
    };
    getProduksById();
  }, []);

  // Handle Order Produk (Satu user cuma bisa order satu produk dalam jumlah yang banyak)
  const authState = useSelector((state) => state.auth);
  const handleOrderProduk = async (selectedProduk) => {
    if (authState.isLogin === false) {
      try {
        const result = await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You need login to order produk!",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          confirmButtonText: "Go to login",
        });

        if (result.isConfirmed) {
          navigate("/signin"); // Navigasi ke halaman login jika pengguna memilih "Go to login"
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate(`/order/${selectedProduk.id}`);
    }
  };

  return (
    <div className='bg-[#fafafa]  flex justify-center pt-48 pb-28'>
      {/* Card */}
      <div className='bg-[#edeae4] rounded-[60px] w-[74rem] h-[500px]'>
        <div className=" grid grid-cols justify-center md:grid-cols-2">
          <div className='flex items-center justify-center'>
            <img src={produks?.gambar} alt="Kausa" className='mx-auto w-[80%]' />
          </div>
          <div className='justify-start py-14'>
            <div className='py-10 text-[#675e51] '>
              <h1 className='font-semibold text-[45px]'>{produks?.nama_produk}</h1>
              <span className='text-lg font-light'>{produks?.kategori_id}</span>
            </div>
            <h3 className='text-[#a3292f] text-lg pb- font-bold'>Rp.  <span className='text-[22px]'>{produks?.harga}</span></h3>
            <p className='text-[#675e51] pr-16 text-base md:text-lg font-normal text-justify  py-3'>{produks?.deskripsi}</p>
            <div className='flex justify-start text-white py-5 font-semibold gap-5'>
              <button
                onClick={() => handleOrderProduk(produks)}
                className="flex justify-center items-center gap-4 border-[2px] rounded-full text-lg bg-[#a3292f] hover:bg-[#ff3333] px-20 py-[7px]">
                <FaShoppingCart />
                ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Card */}
    </div>
  )
}

export default DetailProduks