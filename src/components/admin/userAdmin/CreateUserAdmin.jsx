import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CiSaveDown2 } from 'react-icons/ci'

const CreateUserAdmin = () => {
  const navigate = useNavigate()
  const [namaUser, setNamaUser] = useState("");
  const [role, setRole] = useState("");
  const [noHp, setNoHp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");
  const handleBack = () => {
    navigate(-1);
  }

  // Function Create Data User
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const dataUser = {
        nama: namaUser,
        role: role,
        no_hp: noHp,
        email: email,
        password: password,
      }
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user`, dataUser, config);
      console.log(response.data);
      Swal.fire({
        title: "Berhasil!",
        text: "Data User berhasil ditambahkan oleh Admin",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => {
        navigate('/admin/users');
      }, 3000);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex-1 p-3 min-h-0 overflow-auto">
      <div className="mt-10 justify-center">
        {/* judul */}
        <div className='w-[1000px] mx-32'>
          <h1 className="text-[40px] text-[#675e51] font-bold">Tambah Data User</h1>
          <p className="my-3 text-[#675e51]">Dashboard / User / Create</p>
        </div>
        {/* content */}
        <div className=" bg-white mx-20 mt-8 justify-center text-[#675e51] rounded-2xl shadow-sm">
          <div className="relative overflow-x-auto px-20 py-14">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-6">
                <label htmlFor="namaUser" className="block mb-2 text-lg font-semibold">Full Name</label>
                <div className='border border-gray-300 rounded-lg'>
                  <input
                    type='text'
                    id='nama'
                    value={namaUser}
                    onChange={(e) => setNamaUser(e.target.value)}
                    className="bg-gray-50 w-full" required />
                </div>
              </div>
              <div className="grid gap-10 mb-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-semibold text-lg">Role User</label>
                  <select
                    name="role"
                    id="role"
                    onChange={(e) => setRole(e.target.value)}
                    className="bg-gray-50 border border-gray-300 rounded-lg w-full"
                  >
                    <option value="">-- Select Role User --</option>
                    <option value="kasir">Kasir</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-lg font-semibold">No WhatsApp</label>
                  <div className='border border-gray-300 rounded-lg'>
                    <input
                      type="tel"
                      id="no_hp"
                      name='no_hp'
                      value={noHp}
                      onChange={(e) => setNoHp(e.target.value)}
                      className="bg-gray-50 w-full" required />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-lg font-semibold">Email</label>
                <div className='border border-gray-300 rounded-lg'>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 rounded-lg w-full" required />
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-lg font-semibold">Password</label>
                <div className='border border-gray-300 rounded-lg'>
                  <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 w-full" required />
                </div>
              </div>
              <div className='pt-7 flex justify-between'>
                <button onClick={handleBack} type="button"
                  className="px-10 py-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-600">
                  Kembali
                </button>
                <button type="submit" className="btn-success inline-flex items-center text-white font-bold py-2 px-7 rounded-md">
                  <span className='pr-2 text-2xl'> <CiSaveDown2 /> </span>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateUserAdmin;