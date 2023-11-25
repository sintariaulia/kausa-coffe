import {
	HiOutlineHome,
	HiOutlineChartBar,
	HiOutlineShoppingCart,
	HiCurrencyDollar,
	HiDocumentText,
	HiUserGroup,
	HiTag,
	HiListBullet
} from 'react-icons/hi2'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin/dashboard',
		icon: <HiOutlineHome />
	},
    {
		key: 'user',
		label: 'User',
		path: '/admin/users',
		icon: <HiUserGroup />
	},
	{
		key: 'kategoriproduk',
		label: 'Kategori Produk',
		path: '/admin/kategori',
		icon: <HiListBullet />
	},
	{
		key: 'produk',
		label: 'Produk',
		path: '/admin/produks',
		icon: <HiTag />
	},
	{
		key: 'pesanan',
		label: 'Pesanan',
		path: '/admin/pesanan',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'pembayaran',
		label: 'Pembayaran',
		path: '/admin/bayar',
		icon: <HiCurrencyDollar />
	},
	{
		key: 'transaksi',
		label: 'Transaksi',
		path: '/admin/transaksi',
		icon: <HiOutlineChartBar />
	},
	{
		key: 'penjualan',
		label: 'Laporan Pemesanan',
		path: '/admin',
		icon: <HiDocumentText />
	},
	// {
	// 	key: 'pendapatan',
	// 	label: 'Laporan Pendapatan',
	// 	path: '/admin',
	// 	icon: <HiDocumentText />
	// },
]
