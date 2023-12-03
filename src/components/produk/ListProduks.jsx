import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import BannerProduk from '../../assets/banner1.png';
import { FaShoppingCart } from 'react-icons/fa';

const ListProduks = () => {
    let navigate = useNavigate();
    const [produks, setProduks] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        getProduks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProduks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/produk');
            console.log('response', response.data);
            const listProduks = response.data?.datas;

            // List produks sesuai kode produknya
            listProduks.sort((a, b) => {
                const kodeA = parseInt(a.kode_produk.slice(1));
                const kodeB = parseInt(b.kode_produk.slice(1));
                return kodeA - kodeB;
            });

            setProduks(listProduks);
        } catch (error) {
            console.log(error, "error");
        }
    }

    return (
        <div className="bg-[#fafafa] pt-12 flex flex-col justify-start">
            <img src={BannerProduk} alt="BannerProduk" className='mx-auto pt-16 w-[50%]' />
            <div className="px-[68px] md:px-16 lg:px-20 xl:px-[73px] 2xl:px-36 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-7 md:pb-16 pt-9 gap-6 sm:gap-8 md:gap-9 lg:gap-7">
                {produks.map((produk, index) => {
                    return (
                        <div key={index} id={produk.id}
                            className='bg-[#edeae4] p-3 rounded-3xl'>
                            <div>
                                <img src={produk.gambar} onClick={() => navigate(`/produks/${produk.id}`)} alt="" className='h-52 mx-auto' />
                                <h4 className='text-[#675e51] text-base md:text-lg font-semibold py-3  text-center uppercase'>{produk.nama_produk}</h4>
                            </div>
                            <div className='pr-20 lg:pr-[70px] 2xl:pr-24'>
                                <h6 className='text-[#675e51] text-[14px] font-bold rounded-2xl'>Rp. {produk.harga}</h6>
                                <h6 className='text-[#675e51] text-[14px] rounded-2xl font-normal'>{produk.kategori_id}</h6>
                            </div>
                            <div className='flex justify-end gap-1.5 text-right pt-2'>
                                {/* <div className="rounded-full h-8 w-8 flex items-center justify-center bg-[#a3292f] hover:bg-[#ff3333]">
                                    <FaShoppingCart className="text-lg text-white" />

                                </div> */} 
                                <button
                                    className="btn btn-sm border-0  bg-[#a3292f] text-white font-medium text-sm rounded-2xl hover:bg-[#ff3333]">
                                    Order
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ListProduks