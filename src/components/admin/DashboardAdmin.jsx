import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from './shared/AdminSidebar'
import NavbarAdmin from './shared/NavbarAdmin'
import DashboardStatGrid from './home/DashboardStatGrid'
import TransactionChart from './home/TransactionChart'

const DashboardAdmin = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPesanans, setTotalPesanans] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Produk
                const responseProduk = await axios.get('http://localhost:3001/produk');
                const listProduks = responseProduk.data?.datas;
                setTotalProducts(listProduks.length);
                // Fetch Pesanan
                const responsePesanan = await axios.get('http://localhost:3001/pesanan');
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
            <AdminSidebar />
            <div className="flex flex-col flex-1">
                <NavbarAdmin />
                <div className="flex-1 p-4 mt-10 min-h-0 overflow-auto">
                    <div className='pb-10 px-10'>
                        <div className="flex justify-center gap-2 text-xl text-[#675e51] font-medium w-full p-5 bg-[#fafafa] rounded-md shadow-sm shadow-white">
                            Welcome Admin Kausa
                        </div>
                        {/* <TransactionChart /> */}
                    </div>
                    <DashboardStatGrid totalProducts={totalProducts} totalPesanans={totalPesanans} totalRevenue={totalRevenue} />

                </div>
            </div>
        </div>
    )
}

export default DashboardAdmin