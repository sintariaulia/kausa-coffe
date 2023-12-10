import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const SignUp = () => {
    const [nama, setNama] = useState('');
    const [noHp, setNohp] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // Function Register
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/register', {
                nama: nama,
                role: "user",
                no_hp: noHp,
                email: email,
                password: password,
            });
            console.log(response.data)

            if (response.data.status_code === 409) {
                // Show SweetAlert for email already exists
                Swal.fire({
                    icon: "error",
                    text: response.data.message,
                    confirmButtonText: "OK",
                });
            } else if (response.data.message === "Register User Successfully") {
                // Show SweetAlert for successful registration
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/signin");
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        // screen
        <div className='bg-[#ffffff] flex w-full px-5 md:px-2 lg:w-full h-screen items-center justify-center'>
            {/* screen dalam */}
            <div className=' flex bg-[#efe6dc] py-3 md:py-20 rounded-3xl '>
                {/* form login */}
                <div className=' pl-[70px] md:pr-10'>
                    <h1 className='text-2xl md:text-3xl font-extrabold text-center py-5 text-slate-600'>SIGN UP</h1>
                    <img src="/img/hero.png" alt="" className='md:hidden rounded-xl py-5' />
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='nama' className='text-[14.7px] font-medium text-slate-600'>Full Name</label>
                            <input value={nama} onChange={(e) => setNama(e.target.value)}
                                type='text' id='nama'
                                className='w-full border-2 border-white rounded-xl p-2 mt-1'
                                placeholder='full name' />
                        </div>
                        <div className='pt-3'>
                            <label htmlFor='no_hp' className='text-[14.7px] font-medium text-slate-600'>No Whatsapp</label>
                            <input value={noHp} onChange={(e) => setNohp(e.target.value)}
                                type='tel' id='no_hp'
                                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1'
                                placeholder='+628xxxxxxxx' />
                        </div>
                        <div className='pt-3'>
                            <label htmlFor='email' className='text-[14.7px] font-medium text-slate-600'>Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)}
                                type='email' id='email' name='email'
                                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1'
                                placeholder='emailaddres@gmail.com' />
                        </div>
                        <div className='pt-3'>
                            <label htmlFor='password' className='text-[14.7px] font-medium text-slate-600'>Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)}
                                type='password' id='password' name='password'
                                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1'
                                placeholder='**********' />
                        </div>
                        <div className='flex flex-col gap-y-4 py-10'>
                            <button type='submit'
                                className="bg-[#54514d] rounded-2xl text-[16px]  py-[5px] mr-2 hover:bg-[#777878] text-white font-semibold" >
                                Sign Up
                            </button>
                            <Link to="/signin">
                                <button className='btn-link font-semibold text-sm text-slate-600'>
                                    Alredy have an account? <span className='font-extrabold '>SIGN IN</span> here
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
                {/* img login */}
                <div className='home-img px-10 flex flex-col justify-center'>
                    <img src="/img/hero1.png" alt="" className='hidden md:block items-center rounded-2xl md:w-[30rem] 2xl:w-[400px]' />
                </div>
            </div>
            {/* screen dalam */}
        </div>
    )
}

export default SignUp