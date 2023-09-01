import React from 'react'
import "./home.css"

const Home = () => {

    return (
        <div className="wrapper lg:flex bg-[#f7f4ef] items-center justify-between px-12 sm:px-[60px] md:px-[70px]  w-full h-full">

            {/* left side */}
            <div className="open-img mx-auto heading flex md:my-5 lg:my-28  flex-col items-start justify-center">
                <span className='font-bold pt-10 text-[#e9ac4a] text-[26px] sm:text-[37px] lg:text-[40px] xl:text-[52px] 2xl:text-[68px]'>
                    Made for everyday's
                </span>
                <span className='text-[#e9ac4a] font-extrabold text-[26px] sm:text-[37px] lg:text-[43px] xl:text-[55px] 2xl:text-[75px]'>
                    Coffee Experience
                </span>
                {/* Mobile screen */}
                <div className="lg:hidden block">
                    <img src="/img/hero1.png" alt="" className="pt-6 md:px-8 md:pl-10 md:py-3" />
                </div>
                <p className="lg:pt-6 pt-10 sm:pt-8 text-slate-600 text-left">
                    <span className='font-semibold text-[17px] sm:text-[25px] md:text-[20px] xl:text-[21px] pb-1'> Beautiful Coffee, New Experience</span>
                    <br/><span className='font-semibold text-[17px] sm:text-[25px] xl:text-[21px] pb-1'> and Something Different</span>
                </p>
                <p className='block md:hidden font-light pb-7 pt-2 sm:pt-1 text-base sm:text-[20px] md:text-[18px] lg:text-[18px] text-slate-600 text-left'>"We're working hard to bring you the best,
                    and really exciting for whats coming.
                    Everyday is a day to be happy recharge and begin again with kausa"
                </p>
                {/* Tampilan MD */}
                <p className='md:block hidden font-light pb-7 pt-1 text-[17px] md:text-[18px] lg:text-[18px] text-slate-600 text-left'>"We're working hard to bring you the best,
                    and really exciting for whats coming.
                    <br /> Everyday is a day to be happy recharge and begin again with kausa"
                </p>
                <div className='md:block hidden md:pb-14 lg:pb-1 text-white font-semibold'>
                    <button className="border-[2px] rounded-3xl lg:text-[16px] xl:text-[18px] bg-[#d0161f] hover:bg-[#ff3333] px-[25px] py-[7px] font-bold">Order Now</button>
                </div>
                <img src="/img/open.png" alt=""
                    className="z-10 absolute 2xl:pt-[340px] 2xl:ml-[1300px] xl:pt-[280px] xl:ml-[980px] xl:w-[300px] lg:w-[250px] 
                    lg:pt-[360px] lg:ml-[760px] md:w-[300px] md:pt-[200px] md:ml-[450px] sm:pt-[290px] sm:ml-[370px] sm:w-[250px] ml-[230px] w-[170px] pt-[220px]" />
            </div>


            {/* right side when : lebar layar > md */}
            <div className="home-img hidden lg:block 2xl:py-14 relative xl:w-[550px] 2xl:w-[670px] mx-auto">
                <img src="/img/hero1.png" alt="" />
            </div>

        </div>
    )
}

export default Home