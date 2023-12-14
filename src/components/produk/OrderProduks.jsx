import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import FormBanner from '../../assets/bannerform.png';
import { TimePicker } from 'react-ios-time-picker';
import Swal from 'sweetalert2';

const OrderProduks = () => {
  const token = localStorage.getItem("token");
  const params = useParams();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth); // Get user information from Redux store
  const userId = authState.user.id; // Assuming you have a user object in your Redux state
  const [orderProduk, setOrderProduk] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(0);

  const [time, setTime] = useState('01:00');
  const onChange = (timeValue) => {
    setTime(timeValue);
  }

  const handleBack = () => {
    navigate('/produks');
  };

  // Fetch Produk Order Id
  useEffect(() => {
    const getOrderProdukId = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/produk/${params.id}`);
        const produkOrder = response.data.datas;
        setOrderProduk(produkOrder);
      } catch (error) {
        console.log(error);
      }
    }

    getOrderProdukId();
  }, [params.id]);

  // Effect to calculate subtotal when quantity changes
  useEffect(() => {
    if (orderProduk) {
      setSubtotal(orderProduk.harga * quantity);
    }
  }, [quantity, orderProduk]);

  // Function to handle quantity change
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setSubtotal(orderProduk?.harga * newQuantity);
  };

  // POST Pesanan
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const orderData = {
        user_id: userId,
        produk_id: params.id,
        quantity: quantity,
        waktu_pickup: time,
        total_harga: subtotal,
        status_pesanan: "Di Proses",
      };

      // Menampilkan SweetAlert Confirm Pesanan
      const confirmationResult = await Swal.fire({
        title: "Pastikan Data Pesanan Sudah Benar",
        text: "Apakah Anda yakin data sudah benar?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cek Data Pesanan ?",
        confirmButtonText: "Sudah Benar",
        reverseButtons: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      if (confirmationResult.isConfirmed) {
        const response = await axios.post('http://localhost:3001/pesanan', orderData, config);
        console.log(response.data);
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            const orderId = response.data?.datas?.id;
            navigate(`/pesanan/${orderId}/detail`);
          } else {
            // memilih untuk tidak melanjutkan
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#fafafa] pt-10 flex flex-col justify-start">
      <img src={FormBanner} alt="produkorder" className='mx-auto pt-16 w-[30%]' />
      <div className="cart-container">
        <div className='mx-36'>
          <div className="titles text-[#675e51] font-semibold">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            {/* <h3 className="total">Total</h3> */}
            <h3 className="total">Waktu Pick-Up</h3>
          </div>
          <div className="cart-items">
            <div className="cart-item" key=''>
              <div className="cart-product">
                <img src={`${process.env.REACT_APP_BASE_URL}${orderProduk?.gambar}`} alt='gambar' />
                <div className='p-10 '>
                  <h3 className='text-2xl text-[#675e51]'>{orderProduk?.nama_produk}</h3>
                  <p className='text-[#675e51]'>{orderProduk?.kategori_id}</p>
                </div>
              </div>
              <div className="cart-product-price text-[#675e51] text-lg">Rp. {orderProduk?.harga}</div>
              <div className="cart-product-quantity text-[#675e51]">
                <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
                <div className="count">{quantity}</div>
                <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
              </div>
              <div className="cart-product-total-price text-[#675e51] text-lg">
                {/* Rp. {subtotal} */}
                <TimePicker onChange={onChange} value={time} />
              </div>
            </div>
          </div>
          <form onSubmit={handleOrderSubmit}>
            <div className="cart-summary mt-5">
              <div className="cart-checkout">
                <div className="subtotal">
                  <span className='text-[#675e51]'>Subtotal</span>
                  <span className="amount text-[#675e51]">RP. {subtotal}</span>
                </div>
                <p>Taxes and shipping calculated at continue</p>
                <button type='submit' className='next-btn'>Simpan Pesanan</button>
                <button className='back-btn my-3' onClick={handleBack}>Kembali</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderProduks;
