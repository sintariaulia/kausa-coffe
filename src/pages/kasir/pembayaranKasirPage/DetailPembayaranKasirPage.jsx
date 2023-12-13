import React from 'react'
import KasirSidebar from '../../../components/kasir/shared/KasirSidebar'
import KasirNavbar from '../../../components/kasir/shared/KasirNavbar'
import DetailPembayaranKasir from '../../../components/kasir/pembayaranKasir/DetailPembayaranKasir'

const DetailPembayaranKasirPage = () => {
  return (
    <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
      <KasirSidebar />
      <div className="flex flex-col flex-1">
        <KasirNavbar />
        <div className="flex-1 min-h-0 overflow-auto">
          <DetailPembayaranKasir />
        </div>
      </div>
    </div>
  )
}

export default DetailPembayaranKasirPage