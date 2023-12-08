import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchUser, setToken } from '../services/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            email,
            password,
        });

        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `http://localhost:3001/auth/login`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        try {
            const response = await axios.request(config);
            const token = response.data.token
            dispatch(setToken(token));

            // console.log("Token set:", token);

            const actionResult = await dispatch(fetchUser(token));
            console.log("Fetch user result:", actionResult);
            const role = actionResult.payload.role;
            const user_id = actionResult.payload.id;
            localStorage.setItem("role", role);
            localStorage.setItem("user_id", user_id);
            redirectToRolePage(role);

            if (!token) {
                toast.error("Your Account Is Not Valid (Wrong Input Data)", {
                    autoClose: 3000
                });
            }

            // if (token) {
            //     const role = actionResult.payload.role;
            //     const user_id = actionResult.payload.id;
            //     localStorage.setItem("role", role);
            //     localStorage.setItem("user_id", user_id);
            //     console.log(role);
            //     redirectToRolePage(role);
            // } else {
            //     toast.error("Your Account Is Not Valid (Wrong Input Data)", {
            //         autoClose: 3000
            //     });
            // }
        } catch (error) {
            console.log(error);
        }
    }

    const redirectToRolePage = (role) => {
        switch (role) {
            case "admin":
                navigate("/admin/dashboard");
            // default:
                break;
            case "user":
                navigate("/");
                break;
            case "kasir":
                navigate("/kasir/dashboard");
                break;
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        // screen
        <div className='bg-[#ffff] flex w-full px-5 md:px-2 lg:w-full h-screen  items-center justify-center'>
            {/* screen dalam */}
            <div className=' flex bg-[#efe6dc] py-3 md:py-20 rounded-3xl '>
                {/* form login */}
                <div className=' pl-[70px] md:pr-10'>
                    <h1 className='text-2xl md:text-3xl font-extrabold text-center py-5 text-slate-600'>SIGN IN</h1>
                    <img src="/img/kausa.png" alt="" className='md:hidden rounded-xl py-5' />

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email' className='text-[14.7px] font-medium text-slate-600'>Email</label>
                            <input
                                value={email}
                                onChange={handleEmailChange}
                                type='email'
                                id='email'
                                name='email'
                                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1'
                                placeholder='emailaddres@gmail.com'
                                required />
                        </div>
                        <div className='pt-3'>
                            <label htmlFor='password' className='text-[14.7px] font-medium text-slate-600'>Password</label>
                            <input
                                value={password}
                                onChange={handlePasswordChange}
                                type='password'
                                id='password'
                                name='password'
                                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1'
                                placeholder='********' />
                        </div>

                        {/* BUTTON */}
                        <div className='flex flex-col gap-y-4 py-10'>
                            <button type='submit'
                                className="bg-[#54514d] rounded-2xl text-[16px]  py-[5px] mr-2 hover:bg-[#777878] text-white font-semibold" >
                                Sign In
                            </button>
                            <Link to="/signup">
                                <button className='btn-link font-semibold text-sm text-slate-600'>
                                    Don't have an account ?
                                    <span className='font-extrabold'> SIGN UP</span>
                                </button>
                            </Link>

                        </div>
                    </form>
                    <ToastContainer />
                </div>

                {/* img login */}
                <div className='home-img px-10 flex flex-col items-center'>
                    <img src="/img/hero1.png" alt="" className='hidden md:block rounded-2xl md:w-[30rem] 2xl:w-[400px]' />
                </div>
            </div>
            {/* screen dalam */}
        </div>
    )
}

export default SignIn