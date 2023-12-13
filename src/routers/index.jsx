import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import HomePage from '../pages/homepages';
import SignIns from '../pages/signinpages';
import SignUps from '../pages/signuppages';
// ! USER
import AboutUsPage from '../pages/customers/aboutuspages';
import StorePageUs from '../pages/customers/storeuspages';
import ProfilePages from '../pages/customers/profilepages';
import RiwayatPesananPages from '../pages/customers/riwayatpesananpages';
// Produk
import ListProdukPages from '../pages/produks/ListProdukPages';
import DetailProdukPages from '../pages/produks/DetailProdukPages';
// Pesanan
import OrderProdukPages from '../pages/produks/OrderProdukPages';
import DetailPesananPage from '../pages/pemesanans/DetailPesananPage';
import UploadPaymentPage from '../pages/pemesanans/UploadPaymentPage';
import PaymentSuccess from '../components/pemesanan/PaymentSuccess';
// ! ADMIN
import DashboardAdminPage from '../pages/admin/DashboardAdminPage';
// import AdminDashboardGuard from '../pages/admin/AdminDashboardGuard';
// Data Kategori
import ListKategoriAdminPage from '../pages/admin/kategoriAdminPage/ListKategoriAdminPage';
// Data User
import ListUserAdminPage from '../pages/admin/userAdminPage/ListUserAdminPage';
import CreateUserAdminPage from '../pages/admin/userAdminPage/CreateUserAdminPage';
import DetailUserAdminPage from '../pages/admin/userAdminPage/DetailUserAdminPage';
// Data Produk
import ListProdukAdminPage from '../pages/admin/produkAdminPage/ListProdukAdminPage';
import DetailProdukAdminPage from '../pages/admin/produkAdminPage/DetailProdukAdminPage';
import CreateProdukAdminPage from '../pages/admin/produkAdminPage/CreateProdukAdminPage';
import EditProdukAdminPage from '../pages/admin/produkAdminPage/EditProdukAdminPage';
// Data Pesanan
import ListPesananAdminPage from '../pages/admin/pesananAdminPage/ListPesananAdminPage';
import DetailPesananAdminPage from '../pages/admin/pesananAdminPage/DetailPesananAdminPage';
import CreatePesananAdminPage from '../pages/admin/pesananAdminPage/CreatePesananAdminPage';
// Data Pembayaran
import ListPaymentAdminPage from '../pages/admin/paymentAdminPage/ListPaymentAdminPage';
import DetailPaymentAdminPage from '../pages/admin/paymentAdminPage/DetailPaymentAdminPage';

// ! KASIR
import DashboardKasirPage from '../pages/kasir/DashboardKasirPage';
// Data Produk
import ListProdukKasirPage from '../pages/kasir/produkKasirPage/ListProdukKasirPage';
import CreateProdukKasirPage from '../pages/kasir/produkKasirPage/CreateProdukKasirPage';
import DetailProdukKasirPage from '../pages/kasir/produkKasirPage/DetailProdukKasirPage';
import EditProdukKasirPage from '../pages/kasir/produkKasirPage/EditProdukKasirPage';
// Data Pesanan
import ListPesananKasirPage from '../pages/kasir/pesananKasirPage/ListPesananKasirPage';
import DetailPesananKasirPage from '../pages/kasir/pesananKasirPage/DetailPesananKasirPage';
// Data Pembayaran
import ListPembayaranKasirPage from '../pages/kasir/pembayaranKasirPage/ListPembayaranKasirPage';
import DetailPembayaranKasirPage from '../pages/kasir/pembayaranKasirPage/DetailPembayaranKasirPage';

function IndexRouter() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-bgFunc h-12 w-12 mb-4"></div>
        </div>
      ) : (
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<SignIns />} />
          <Route path='/signup' element={<SignUps />} />
          <Route path='/aboutus' element={<AboutUsPage />} />
          <Route path='/store' element={<StorePageUs />} />

          {/* User */}
          <Route path='/profile' element={<ProfilePages />} />
          <Route path='/riwayatpesanan' element={<RiwayatPesananPages />} />

          <Route path='/produks' element={<ListProdukPages />} />
          <Route path='/produks/:id' element={<DetailProdukPages />} />

          <Route path='/order/:id' element={<OrderProdukPages />} />
          <Route path='/pesanan/:id/detail' element={<DetailPesananPage />} />
          {/* Untuk POST Payment */}
          <Route path='/pesanan/:id/upload-payment' element={<UploadPaymentPage />} />
          <Route path='/pesanan/success' element={<PaymentSuccess />} />

          {/* Admin */}
          <Route path='/admin/dashboard' element={<DashboardAdminPage />} />
          <Route path='/admin/users' element={<ListUserAdminPage />} />
          <Route path='/admin/user/create-user' element={<CreateUserAdminPage />} />
          <Route path='/admin/users/:id/detail' element={<DetailUserAdminPage />} />
          <Route
            path='/admin/kategori'
            element={
              <ListKategoriAdminPage />
            }
          />

          <Route path='/admin/produks' element={<ListProdukAdminPage />} />
          <Route
            path='/admin/produks/create-produk'
            element={
              <CreateProdukAdminPage />
            } />
          <Route path='/admin/produks/:id/edit' element={<EditProdukAdminPage />} />
          <Route
            path='/admin/produks/:id/detail'
            element={
              <DetailProdukAdminPage />
            } />

          <Route path='/admin/pesanan' element={<ListPesananAdminPage />} />
          <Route path='/admin/pesanan/:id/detail' element={<DetailPesananAdminPage />} />
          <Route
            path='/admin/pesanan/create-pesanan'
            element={
              <CreatePesananAdminPage />
            } />

          <Route path='/admin/payment' element={<ListPaymentAdminPage />} />
          <Route path='/admin/payment/:id/detail' element={<DetailPaymentAdminPage />} />
          <Route path="/admin/payment/:pesananId" element={<DetailPaymentAdminPage />} />
          {/* End Admin Route */}

          {/* Kasir */}
          <Route path='/kasir/dashboard' element={<DashboardKasirPage />} />
          <Route path='/kasir/produks' element={<ListProdukKasirPage />} />
          <Route path='/kasir/produks/create-produk' element={<CreateProdukKasirPage />} />
          <Route path='/kasir/produks/:id/detail' element={<DetailProdukKasirPage />} />
          <Route path='/kasir/produks/:id/edit' element={<EditProdukKasirPage />} />
          <Route path='/kasir/pesanan' element={<ListPesananKasirPage />} />
          <Route path='/kasir/pesanan/:id/detail' element={<DetailPesananKasirPage />} />
          <Route path='/kasir/payment' element={<ListPembayaranKasirPage />} />
          <Route path='/kasir/payment/:id/detail' element={<DetailPembayaranKasirPage />} />
          {/* End Kasir Route */}

        </Routes>
      )}
    </div>
  )
}

export default IndexRouter