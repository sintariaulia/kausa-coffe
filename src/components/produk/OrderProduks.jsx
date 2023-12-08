import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ProdukOrder from '../../assets/orderproduk.png';
import { TimePicker } from 'react-ios-time-picker';

const OrderProduks = () => {
  const params = useParams();
  const navigate = useNavigate();
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
        setSubtotal(produkOrder?.harga * quantity);
      } catch (error) {
        console.log(error);
      }
    }

    getOrderProdukId();
  }, [params.id, quantity]);

  // Function to handle quantity change
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setSubtotal(orderProduk?.harga * newQuantity); // Recalculate subtotal when quantity changes
  };


  return (
    <div className="bg-[#fafafa] pt-11 pb-3 flex flex-col justify-start">
      <img src={ProdukOrder} alt="produkorder" className='mx-auto pt-14 w-[30%]' />
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
                <img src={orderProduk?.gambar} alt='gambar' />
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
          <div className="cart-summary mt-5">
            <div className="cart-checkout">
              <div className="subtotal">
                <span className='text-[#675e51]'>Subtotal</span>
                <span className="amount text-[#675e51]">RP. {subtotal}</span>
              </div>
              <p>Taxes and shipping calculated at continue</p>
              <Link to="/pesanan/form-pesanan">
                <button className='next-btn'>Lanjutkan Pesanan</button>
              </Link>
              <button className='back-btn my-3' onClick={handleBack}>Kembali</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProduks;
