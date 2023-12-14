import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { HiOutlineLogout } from 'react-icons/hi'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { logout } from '../../../services/authSlice'

const KasirNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout()); // Langkah 5: Panggil aksi logout saat tombol logout diklik
        navigate("/");
    };

    // Untuk Modal Logout
    const [modal, setModal] = useState(false);
    const handleModal = () => {
        setModal(true);
    }

    return (
        <div className="bg-[#f6f6f6] h-20 px-10 flex items-center border-b border-gray-300 justify-end">
            <div className="relative font-normal text-[#675e51]">
                Kasir
            </div>
            <Menu as="div" className="relative">
                <div className='pr-10'>
                    <Menu.Button className="ml-5 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                        <div
                            className="h-12 w-12 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                            style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}>
                            <span className="sr-only">Marc Backes</span>
                        </div>
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-xl shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active && 'bg-gray-100',
                                        'active:bg-gray-200 flex items-center px-4 py-2 text-red-600 cursor-pointer focus:bg-gray-200'
                                    )}
                                    onClick={() => handleModal()}>
                                    Logout
                                    <span className="text-xl pl-3"><HiOutlineLogout /></span>
                                </div>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
            {modal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
                    <input type="checkbox" id="my-modal" className="modal-toggle" defaultChecked={modal} />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box text-left bg-[#edeae4]">
                            <p className="text-sm text-red-500 pt-2">Logout Confirmation</p>
                            <h3 className="font-semibold text-black text-base ">Are you sure to Logout ?</h3>
                            <div className="modal-action">
                                <button className="btn btn-sm text-white bg-slate-500 hover:bg-slate-400" onClick={() => setModal(false)}>Cancel</button>
                                <button className="btn btn-sm text-white bg-red-600 hover:bg-red-400" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default KasirNavbar