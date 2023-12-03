import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from './shared/AdminSidebar'
import NavbarAdmin from './shared/NavbarAdmin'
import DashboardStatGrid from './home/DashboardStatGrid'
import TransactionChart from './home/TransactionChart'

const DashboardAdmin = () => {

    const [totalProducts, setTotalProducts] = useState(0);
    useEffect(() => {
        const fetchProduks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/produk');
                // console.log('response', response.data);
                const listProduks = response.data?.datas;
                setTotalProducts(listProduks.length);  // Set total products count
            } catch (error) {
                console.log(error, "error");
            }
        };
        fetchProduks();
    }, []);


    return (
        <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
            <AdminSidebar />
            <div className="flex flex-col flex-1">
                <NavbarAdmin />
                <div className="flex-1 p-4 min-h-0 overflow-auto">
                    <DashboardStatGrid totalProducts={totalProducts} />
                    <div className='pt-10 px-10'>
                        <TransactionChart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardAdmin