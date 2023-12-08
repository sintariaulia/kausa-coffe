import React from 'react'
import Navbar from '../../components/common-components/Navbar'
import Footer from '../../components/common-components/Footer'
import OrderProduks from '../../components/produk/OrderProduks'

const OrderProdukPages = () => {
  return (
    <div>
      <Navbar />
      <OrderProduks />
      <Footer />
    </div>
  )
}

export default OrderProdukPages