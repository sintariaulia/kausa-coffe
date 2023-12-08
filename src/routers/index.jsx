import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from '../pages/homepages';
import SignIns from '../pages/signinpages';
import SignUps from '../pages/signuppages';
import LoginGuard from '../components/SignInGuard';
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
import FormPesananPage from '../pages/pemesanans/FormPesananPage';
import UploadPaymentPage from '../pages/pemesanans/UploadPaymentPage';
import PaymentSuccess from '../components/pemesanan/PaymentSuccess';
// ! ADMIN
import DashboardAdminPage from '../pages/admin/DashboardAdminPage';
import AdminDashboardGuard from '../pages/admin/AdminDashboardGuard';
// Data Kategori
import ListKategoriAdminPage from '../pages/admin/kategoriAdminPage/ListKategoriAdminPage';
// Data User
import ListUserAdminPage from '../pages/admin/userAdminPage/ListUserAdminPage';
import DetailUserAdminPage from '../pages/admin/userAdminPage/DetailUserAdminPage';
// Data Produk
import ListProdukAdminPage from '../pages/admin/produkAdminPage/ListProdukAdminPage';
import DetailProdukAdminPage from '../pages/admin/produkAdminPage/DetailProdukAdminPage';
import CreateProdukAdminPage from '../pages/admin/produkAdminPage/CreateProdukAdminPage';
import EditProdukAdminPage from '../pages/admin/produkAdminPage/EditProdukAdminPage';
// Data Pesanan
import ListPesananAdminPage from '../pages/admin/pesananAdminPage/ListPesananAdminPage';
// Data Pembayaran
import ListPaymentAdminPage from '../pages/admin/paymentAdminPage/ListPaymentAdminPage';

// ! KASIR
import DashboardKasirPage from '../pages/kasir/DashboardKasirPage';
// Data Produk
import ListProdukKasirPage from '../pages/kasir/produkKasirPage/ListProdukKasirPage';
import CreateProdukKasirPage from '../pages/kasir/produkKasirPage/CreateProdukKasirPage';
import DetailProdukKasirPage from '../pages/kasir/produkKasirPage/DetailProdukKasirPage';
import EditProdukKasirPage from '../pages/kasir/produkKasirPage/EditProdukKasirPage';
// Data Pesanan
import ListPesananKasirPage from '../pages/kasir/pesananKasirPage/ListPesananKasirPage';
// Data Pembayaran
import ListPembayaranKasirPage from '../pages/kasir/pembayaranKasirPage/ListPembayaranKasirPage';


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

          {/* User */}
          <Route path='/aboutus' element={<AboutUsPage />} />
          <Route path='/store' element={<StorePageUs />} />
          <Route path='/profile' element={<ProfilePages />} />
          <Route path='/riwayatpesanan' element={<RiwayatPesananPages />} />

          <Route path='/produks' element={<ListProdukPages />} />
          <Route path='/produks/:id' element={<DetailProdukPages />} />

          <Route path='/order/:id' element={<OrderProdukPages />} />
          <Route path='/pesanan/form-pesanan' element={<FormPesananPage />} />
          <Route path='/pesanan/upload-payment' element={<UploadPaymentPage />} />
          <Route path='/pesanan/success' element={<PaymentSuccess />} />

          {/* Admin */}
          <Route
            path='/admin/dashboard'
            element={
              <AdminDashboardGuard>
                <DashboardAdminPage />
              </AdminDashboardGuard>
            }
          />
          <Route path='/admin/users' element={<ListUserAdminPage />} />
          <Route path='/admin/users/:id/detail' element={<DetailUserAdminPage />} />
          <Route
            path='/admin/kategori'
            element={
              <AdminDashboardGuard>
                <ListKategoriAdminPage />
              </AdminDashboardGuard>
            }
          />
          <Route
            path='/admin/produks'
            element={
              <AdminDashboardGuard>
                <ListProdukAdminPage />
              </AdminDashboardGuard>
            }
          />
          <Route
            path='/admin/produks/create-produk'
            element={
              <AdminDashboardGuard>
                <CreateProdukAdminPage />
              </AdminDashboardGuard>
            }
          />
          <Route path='/admin/produks/:id/edit' element={<EditProdukAdminPage />} />
          <Route
            path='/admin/produks/:id/detail'
            element={
              <AdminDashboardGuard>
                <DetailProdukAdminPage />
              </AdminDashboardGuard>
            }
          />
          <Route
            path='/admin/pesanan'
            element={
              <AdminDashboardGuard>
                <ListPesananAdminPage />
              </AdminDashboardGuard>
            }
          />
          <Route
            path='/admin/pembayaran'
            element={
              <AdminDashboardGuard>
                <ListPaymentAdminPage />
              </AdminDashboardGuard>
            }
          />
          {/* End Admin Route */}

          {/* Kasir */}
          <Route path='/kasir/dashboard' element={<DashboardKasirPage />} />
          <Route path='/kasir/produks' element={<ListProdukKasirPage />} />
          <Route path='/kasir/produks/create-produk' element={<CreateProdukKasirPage />} />
          <Route path='/kasir/produks/:id/detail' element={<DetailProdukKasirPage />} />
          <Route path='/kasir/produks/:id/edit' element={<EditProdukKasirPage />} />
          <Route path='/kasir/pesanan' element={<ListPesananKasirPage />} />
          <Route path='/kasir/pembayaran' element={<ListPembayaranKasirPage />} />
          {/* End Kasir Route */}

        </Routes>
      )}
    </div>
  )
}

export default IndexRouter