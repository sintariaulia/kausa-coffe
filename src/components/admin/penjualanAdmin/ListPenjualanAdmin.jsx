import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { formatDate } from '../../../util/Helper'
import { HiChevronLeft, HiChevronRight, HiPrinter } from 'react-icons/hi';

const ListPenjualanAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pesananPerPage] = useState(8);
  const [pesanans, setPesanan] = useState([]);
  const token = localStorage.getItem("token");

  // Fuction Fetch Pesanan
  useEffect(() => {
    const fetchPesanans = async () => {
      try {
        const response = await axios.get('http://localhost:3001/pesanan');
        const listPesanans = response.data?.datas;
        listPesanans.sort((a, b) => b.id - a.id);
        setPesanan(listPesanans);
      } catch (error) {
        console.log(error, "error");
      }
    };

    fetchPesanans();
  }, []);

  // Handle Pagination
  const indexOfLastPesanan = currentPage * pesananPerPage;
  const indexOfFirstPesanan = indexOfLastPesanan - pesananPerPage;
  const currentPesanan = pesanans.slice(indexOfFirstPesanan, indexOfLastPesanan);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex-1 px-4 py-2 min-h-0 overflow-auto">
      {/* Content Data Pemesanan */}
      <div className="mt-5 justify-center">
        <div className='w-[1000px] mx-32'>
          <h1 className="text-[55px] text-[#675e51] font-bold">Data Penjualan</h1>
          <p className="pb-2 text-[#675e51]">Dashboard / Data Penjualan</p>
        </div>
        <div className=" bg-white mx-20 mt-5 justify-center rounded-xl">
          <div className='mx-10 py-10 flex justify-end'>
            <Link to={"/admin/penjualan/laporan-penjualan"}>
              <button className='bg-gray-600 text-white hover:bg-gray-400 rounded-md flex gap-2 items-center justify-center px-5 py-2'>
                <span><HiPrinter /></span>
                Laporan Penjualan
              </button>
            </Link>
          </div>
          <div className="relative overflow-x-auto pb-5 mx-10">
            <table className="w-full text-base text-left text-gray-500">
              <thead className="text-gray-700  bg-[#d5d0c4] text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal Pemesanan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Produk
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Harga
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPesanan.map((pesanan, index) => {
                  return (
                    <tr key={pesanan.id} className="bg-white border-b text-base text-center">
                      <td scope="row" className="px-6 py-4 ">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">{formatDate(pesanan.created_at)}</td>
                      <td className="px-6 py-4">{pesanan.produk_id}</td>
                      <td className="px-6 py-4">Rp. {pesanan.total_harga}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-end mt-4">
              <ul className="flex items-center -space-x-px h-8 text-sm">
                <li>
                  <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-600 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-200"
                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)} >
                    <HiChevronLeft className="w-5 h-5" />
                  </a>
                </li>
                {[...Array(Math.ceil(pesanans.length / pesananPerPage))].map((_, index) => (
                  <li key={index}>
                    <a
                      className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-gray-200 ${currentPage === index + 1 ? 'text-blue-600 bg-blue-50' : ''}`}
                      onClick={() => paginate(index + 1)} >
                      {index + 1}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-600 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-200"
                    onClick={() =>
                      paginate(currentPage < Math.ceil(pesanans.length / pesananPerPage) ? currentPage + 1 : currentPage)
                    } >
                    <HiChevronRight className="w-5 h-5" />
                  </a>
                </li>
              </ul>
            </div>
            {/* End Pagination */}

          </div>
        </div>
      </div>
    </div>

  )
}

export default ListPenjualanAdmin