import React from 'react'
import EditProdukAdmin from '../../../components/admin/produkAdmin/EditProdukAdmin'
import AdminSidebar from '../../../components/admin/shared/AdminSidebar'
import NavbarAdmin from '../../../components/admin/shared/NavbarAdmin'

const EditProdukAdminPage = () => {
    return (
        <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
            <AdminSidebar />
            <div className="flex flex-col flex-1">
                <NavbarAdmin />
                <div className="flex-1 p-4 min-h-0 overflow-auto">
                    <EditProdukAdmin />
                </div>
            </div>
        </div>
    )
}

export default EditProdukAdminPage