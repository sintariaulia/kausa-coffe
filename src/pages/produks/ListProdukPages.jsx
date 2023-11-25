import React from 'react'
import Navbar from '../../components/common-components/Navbar'
import Footer from '../../components/common-components/Footer'
import ListProduks from '../../components/produk/ListProduks'

const ListProdukPages = () => {
  return (
    <div>
        <Navbar />
        <ListProduks />
        <Footer />
    </div>
  )
}

export default ListProdukPages