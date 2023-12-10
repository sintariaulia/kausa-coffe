import React from 'react'
import KasirNavbar from '../../../components/kasir/shared/KasirNavbar'
import KasirSidebar from '../../../components/kasir/shared/KasirSidebar'
import ListProdukKasir from '../../../components/kasir/produkKasir/ListProdukKasir'

const ListProdukKasirPage = () => {
  return (
    <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
      <KasirSidebar />
      <div className="flex flex-col flex-1">
        <KasirNavbar />
        <div className="flex-1 min-h-0 overflow-auto">
          <ListProdukKasir />
        </div>
      </div>
    </div>
  )
}

export default ListProdukKasirPage