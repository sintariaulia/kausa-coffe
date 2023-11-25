import React from 'react'
import KasirSidebar from './shared/KasirSidebar'
import KasirNavbar from './shared/KasirNavbar'
import DashboardStatGrid from '../admin/home/DashboardStatGrid';

const DashboardKasir = () => {
  return (
    <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex flex-row">
      <KasirSidebar />
      <div className="flex flex-col flex-1">
        <KasirNavbar />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <DashboardStatGrid />
        </div>
      </div>
    </div>
  )
}

export default DashboardKasir