import {
	HiOutlineHome,
	HiOutlineShoppingCart,
	HiCurrencyDollar,
	HiTag,
} from 'react-icons/hi2'

export const KASIR_SIDEBAR_LINKS = [
	{
		key: 'dashboardkasir',
		label: 'Dashboard',
		path: '/kasir/dashboard',
		icon: <HiOutlineHome />
	},
	{
		key: 'produkkasir',
		label: 'Produk',
		path: '/kasir/produks',
		icon: <HiTag />
	},
	{
		key: 'pesanan',
		label: 'Pesanan',
		path: '/kasir/pesanan',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'pembayaran',
		label: 'Pembayaran',
		path: '/kasir/payment',
		icon: <HiCurrencyDollar />
	},
]
