import React, { useEffect, useState } from 'react'
import axios from 'axios';
import KasirSidebar from './shared/KasirSidebar'
import KasirNavbar from './shared/KasirNavbar'
import DashboardStatGrid from '../admin/home/DashboardStatGrid';

const DashboardKasir = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPesanans, setTotalPesanans] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Produk
        const responseProduk = await axios.get(`${process.env.REACT_APP_BASE_URL}/produk`);
        const listProduks = responseProduk.data?.datas;
        setTotalProducts(listProduks.length);
        // Fetch Pesanan
        const responsePesanan = await axios.get(`${process.env.REACT_APP_BASE_URL}/pesanan`);
        const listPesanan = responsePesanan.data?.datas;
        setTotalPesanans(listPesanan.length);
        // Calculate Total Pendapatan
        const totalRevenue = listPesanan.reduce((total, pesanan) => total + pesanan.total_harga, 0);
        setTotalRevenue(totalRevenue);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, [setTotalRevenue]);

  return (
    <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
      <KasirSidebar />
      <div className="flex flex-col flex-1">
        <KasirNavbar />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <div className="flex-1 px-4 py-2 min-h-0 overflow-auto mb-10">
            {/* Content */}
            <div className="justify-center">
              <div className='w-[1000px] pb-12 mx-24'>
                <h2 className="text-[3.4rem] text-[#675e51] font-bold">Dashboard</h2>
                <p className="pb-2 text-[#675e51]">Dashboard / Kasir</p>
              </div>
              <div className='px-14 mb-10'>
                <DashboardStatGrid totalProducts={totalProducts} totalPesanans={totalPesanans} totalRevenue={totalRevenue} />
              </div>
              <div className='px-20'>
                <div className="flex flex-wrap gap-5 justify-center text-lg text-[#675e51] w-full p-5 bg-[#fafafa] rounded-xl shadow-sm shadow-white">
                  Halo Kasir Kausa
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardKasir