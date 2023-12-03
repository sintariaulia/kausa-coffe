import React from 'react'
import KasirSidebar from '../../../components/kasir/shared/KasirSidebar'
import KasirNavbar from '../../../components/kasir/shared/KasirNavbar'
import CreateProdukKasir from '../../../components/kasir/produkKasir/CreateProdukKasir'

const CreateProdukKasirPage = () => {
  return (
    <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
      <KasirSidebar />
      <div className="flex flex-col flex-1">
        <KasirNavbar />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <CreateProdukKasir />
        </div>
      </div>
    </div>
  )
}

export default CreateProdukKasirPage