import React from 'react'
import NavbarAdmin from '../../../components/admin/shared/NavbarAdmin'
import AdminSidebar from '../../../components/admin/shared/AdminSidebar'
import DetailPaymentAdmin from '../../../components/admin/paymentAdmin/DetailPaymentAdmin'

const DetailPaymentAdminPage = () => {
    return (
        <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
            <AdminSidebar />
            <div className="flex flex-col flex-1">
                <NavbarAdmin />
                <div className="flex-1 min-h-0 overflow-auto">
                    <DetailPaymentAdmin />
                </div>
            </div>
        </div>
    )
}

export default DetailPaymentAdminPage