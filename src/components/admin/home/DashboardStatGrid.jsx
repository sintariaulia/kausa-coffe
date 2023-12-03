import React from 'react'
import { IoBagHandle, IoPieChart, IoCart } from 'react-icons/io5'
import { HiBanknotes, HiCreditCard, HiOutlineShoppingCart } from 'react-icons/hi2'

const DashboardStatGrid = ({ totalProducts }) => {
  return (
    <div className="flex gap-4 px-10 text-[#675e51]">
      <BoxWrapper className='bg-[#f6f6f6] rounded-2xl'>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-400">
          <HiBanknotes className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-[#675e51] font-light">Total Pendapatan</span>
          <div className="flex items-center">
            <strong className="text-xl font-bold">Rp 525.000</strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper className='bg-[#f6f6f6] rounded-2xl'>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-700">
          <HiCreditCard className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light">Total Produk</span>
          <div className="flex items-center">
            <strong className="text-xl  font-bold">{totalProducts}</strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper className='bg-[#f6f6f6] rounded-2xl'>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-400">
          <HiOutlineShoppingCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light">Total Pemesanan</span>
          <div className="flex items-center">
            <strong className="text-xl font-bold">160</strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  )
}

function BoxWrapper({ children, className }) {
  return <div className={`bg-white rounded-2xl p-4 flex-1 border border-gray-200 flex items-center ${className}`}>{children}</div>
}

export default DashboardStatGrid