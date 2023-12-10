import React from 'react'
import NavbarAdmin from '../../../components/admin/shared/NavbarAdmin'
import AdminSidebar from '../../../components/admin/shared/AdminSidebar'
import ListPesananAdmin from '../../../components/admin/pesananAdmin/ListPesananAdmin'

const ListPesananAdminPage = () => {
    return (
        <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
            <AdminSidebar />
            <div className="flex flex-col flex-1">
                <NavbarAdmin />
                <div className="flex-1 min-h-0 overflow-auto">
                    <ListPesananAdmin />
                </div>
            </div>
        </div>
    )
}

export default ListPesananAdminPage