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
          {/* <DashboardStatGrid /> */}
          <div className="flex-1 px-4 py-2 min-h-0 overflow-auto">
            {/* Content */}
            <div className="justify-center">
              <div className='w-[1000px] pb-10 mx-32'>
                <h2 className="text-[3.4rem] text-[#675e51] font-bold">Dashboard</h2>
                <p className="pb-2 text-[#675e51]">Dashboard / Kasir</p>
              </div>

              <div className='px-24'> 
                <div className="flex flex-wrap gap-5 text-lg text-[#675e51] w-full p-5 bg-[#f6f6f6] rounded-md shadow-sm shadow-white">
                  Halo Kasir
                </div>
              </div>



            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardKasir