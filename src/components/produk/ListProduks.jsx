import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import BannerProduk from '../../assets/banner1.png';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const ListProduks = () => {
    let navigate = useNavigate();
    const [produks, setProduks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    // Fetch All Produk
    useEffect(() => {
        const getProduks = async () => {
            try {
                let url = 'http://localhost:3001/produk';
                if (selectedCategory !== '') {
                    url = `http://localhost:3001/produk/kategori/${selectedCategory}`;
                }
                const responseProduk = await axios.get(url);
                const listProduks = responseProduk.data.datas;
                listProduks.sort((a, b) => {
                    const kodeA = parseInt(a.kode_produk.slice(1));
                    const kodeB = parseInt(b.kode_produk.slice(1));
                    return kodeA - kodeB;
                });
                setProduks(listProduks);
            } catch (error) {
                console.log(error);
            }
        };
        getProduks();
        window.scrollTo(0, 0);
    }, [selectedCategory]);

    // Handle Order Produk (Satu user cuma bisa order satu produk)
    const authState = useSelector((state) => state.auth);
    const handleOrderProduk = async (selectedProduk) => {
        if (authState.isLogin === false) {
            try {
                // Tampilkan pesan kesalahan menggunakan SweetAlert atau cara lain sesuai preferensi Anda
                const result = await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You need to login first!",
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
        <div className="bg-[#fafafa] pt-12 h-[120%] flex flex-col justify-start">
            <img src={BannerProduk} alt="BannerProduk" className='mx-auto pt-16 pb-5 w-[50%]' />
            <div className='flex gap-28 bg-[#6c6966] mx-24 rounded-full text-[#eeeae6] text-base md:text-xl font-bold py-2 my-6 justify-center uppercase'>
                <h3 className={selectedCategory === '' ? 'active-menu2 cursor-pointer' : 'hover:text-[#9e978c] cursor-pointer'} onClick={() => setSelectedCategory('')}>All</h3>
                <h3 className={selectedCategory === 'Signature' ? 'active-menu2 cursor-pointer' : 'hover:text-[#9e978c] cursor-pointer'} onClick={() => setSelectedCategory('Signature')}>Signature</h3>
                <h3 className={selectedCategory === 'Manual Brew' ? 'active-menu2 cursor-pointer' : 'hover:text-[#9e978c] cursor-pointer'} onClick={() => setSelectedCategory('Manual Brew')}>Manual Brew</h3>
                <h3 className={selectedCategory === 'Coffee Base' ? 'active-menu2 cursor-pointer' : 'hover:text-[#9e978c] cursor-pointer'} onClick={() => setSelectedCategory('Coffee Base')}>Coffee Base</h3>
                <h3 className={selectedCategory === 'Non Coffee' ? 'active-menu2 cursor-pointer' : 'hover:text-[#9e978c] cursor-pointer'} onClick={() => setSelectedCategory('Non Coffee')}>Non Coffee</h3>
                <h3 className={selectedCategory === 'Tea' ? 'active-menu2 cursor-pointer' : 'hover:text-[#9e978c] cursor-pointer'} onClick={() => setSelectedCategory('Tea')}>Tea</h3>
                <h3 className={selectedCategory === '500 ML Series' ? 'active-menu2 cursor-pointer' : 'hover:text-[#9e978c] cursor-pointer'} onClick={() => setSelectedCategory('500 ML Series')}>500 ML Series</h3>
            </div>
            <div className={selectedCategory === '' ? 'text-[#bbb5ab]' : 'hover:text-[#bbb5ab]'} onClick={() => setSelectedCategory('')}>
                <div className="px-[68px] lg:px-20 xl:px-[73px] 2xl:px-36 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-7 md:pb-16 pt-9 gap-6 sm:gap-8 md:gap-9 lg:gap-7">

                    {produks && produks.map((produk, index) => {
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
                                    <button
                                        onClick={() => handleOrderProduk(produk)}
                                        className="btn btn-sm border-0  bg-[#a3292f] text-white font-medium text-sm rounded-2xl hover:bg-[#ff3333]">
                                        <FaShoppingCart className="text-base" />
                                        Order
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    )
}

export default ListProduks