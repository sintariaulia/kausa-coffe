import React from 'react'
import AdminSidebar from './shared/AdminSidebar'
import NavbarAdmin from './shared/NavbarAdmin'
import DashboardStatGrid from './home/DashboardStatGrid'
import TransactionChart from './home/TransactionChart'

const DashboardAdmin = () => {
    return (
        <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
            <AdminSidebar />
            <div className="flex flex-col flex-1">
                <NavbarAdmin />
                <div className="flex-1 p-4 min-h-0 overflow-auto">
                    <DashboardStatGrid />
                    <div className='pt-10 px-10'>
                        <TransactionChart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardAdmin