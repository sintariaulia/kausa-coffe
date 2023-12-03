import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const DetailProduks = () => {
  const params = useParams();
  const [produks, setProduks] = useState(null);

  useEffect(() => {
    getProduksById();
  }, []);

  const getProduksById = async () => {
    try {
      const responseDetail = await axios.get(`http://localhost:3001/produk/${params.id}`);
      const produkDetail = responseDetail.data.datas;
      setProduks(produkDetail);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='bg-[#fafafa] pt-48 pb-28'>
      {/* Card */}
      <div className='bg-[#edeae4] mx-auto rounded-[60px] w-[74rem]'>
        <div className=" grid grid-cols justify-center md:grid-cols-2">
          <img src={produks?.gambar} alt="Kausa" className='mx-auto w-[80%]' />
          <div className='justify-start py-14'>
            <div className='py-10 text-[#675e51] '>
              <h1 className='font-semibold text-[45px]'>{produks?.nama_produk}</h1>
              <span className='text-lg font-light'>{produks?.kategori_id}</span>
            </div>
            <h3 className='text-[#a3292f] text-lg pb- font-bold'>Rp.  <span className='text-[22px]'>{produks?.harga}</span></h3>
            <p className='text-[#675e51] pr-16 text-base md:text-lg font-normal text-justify  py-3'>{produks?.deskripsi}</p>

            <div className='flex justify-start text-white py-5 font-semibold gap-5'>
              <button className="border-[2px] rounded-full text-[15px] bg-[#a3292f] hover:bg-[#ff3333] px-[50px] py-[8px]">Order </button>
              {/* <div className="rounded-full h-12 w-12 flex items-center justify-center bg-[#a3292f] hover:bg-[#ff3333]">
                <FaShoppingCart className="text-lg text-white" />
              </div> */}
            </div>

          </div>
        </div>
      </div>
      {/* Card */}
    </div>
  )
}

export default DetailProduks