import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from '../pages/homepages';
import SignIns from '../pages/auth/signinpages';
import SignUps from '../pages/auth/signuppages';
// ! USER
import AboutUsPage from '../pages/customers/aboutuspages';
import StorePageUs from '../pages/customers/storeuspages';
// Produk
import ListProdukPages from '../pages/produks/ListProdukPages';
import DetailProdukPages from '../pages/produks/DetailProdukPages';
// ! ADMIN
import DashboardAdminPage from '../pages/admin/DashboardAdminPage';
// Data Kategori
import ListKategoriAdminPage from '../pages/admin/kategoriAdminPage/ListKategoriAdminPage';
// Data User
import ListUserAdminPage from '../pages/admin/userAdminPage/ListUserAdminPage';
// Data Produk
import ListProdukAdminPage from '../pages/admin/produkAdminPage/ListProdukAdminPage';

// ! KASIR
import DashboardKasirPage from '../pages/kasir/DashboardKasirPage';
// Data Produk
import ListProdukKasirPage from '../pages/kasir/produkKasirPage/ListProdukKasirPage';

function IndexRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/signin' element={<SignIns />} />
        <Route path='/signup' element={<SignUps />} />

        {/* User */}
        <Route path='/aboutus' element={<AboutUsPage />} />
        <Route path='/store' element={<StorePageUs />} />

        <Route path='/produks' element={<ListProdukPages />} />
        <Route path='/produks/:id' element={<DetailProdukPages />} />

        {/* Admin */}
        <Route path='/admin/dashboard' element={<DashboardAdminPage />} />
        <Route path='/admin/kategori' element={<ListKategoriAdminPage />} />
        <Route path='/admin/users' element={<ListUserAdminPage />} />
        <Route path='/admin/produks' element={<ListProdukAdminPage />} />

        {/* Kasir */}
        <Route path='/kasir/dashboard' element={<DashboardKasirPage />} />
        <Route path='/kasir' element={<ListProdukKasirPage />} />

      </Routes>
    </Router>
  )
}

export default IndexRouter