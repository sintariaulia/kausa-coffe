import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./home.css";
import ImageHero from '../assets/hero1.png'
import TimeOpen from '../assets/open.png';
import PromoKopiSusu from '../assets/promo1.png';
import PromoSignatureFresh from '../assets/promo2.png';
import PromoKopiSusu500 from '../assets/promo3.png';

const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0);  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {/* Home Section */}
            <div className="wrapper lg:flex bg-[#fafafa] items-center justify-between pt-24 px-12 sm:px-[60px] md:px-[70px]  w-full h-full">

                {/* left side */}
                <div className="open-img mx-auto heading flex md:my-5 flex-col items-start justify-center">
                    <span className='font-bold text-[#675e51] text-[26px] sm:text-[37px] lg:text-[40px] xl:text-[52px] 2xl:text-[68px]'>
                        Made for everyday's
                    </span>
                    <span className='text-[#e9ac4a] font-extrabold text-[26px] sm:text-[37px] lg:text-[43px] xl:text-[55px] 2xl:text-[75px]'>
                        Coffee Experience
                    </span>
                    {/* Mobile screen */}
                    <div className="lg:hidden block">
                        <img src={ImageHero} alt="ImageHero" className="pt-6 md:px-8 md:pl-10 md:py-3" />
                    </div>
                    <p className="lg:pt-6 pt-10 sm:pt-8 text-slate-600 text-left">
                        <span className='font-semibold text-[17px] sm:text-[25px] md:text-[20px] xl:text-[21px] pb-1'> Beautiful Coffee, New Experience and Something Different</span>
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
                        <Link to="/produks">
                            <button className="border-[2px] rounded-3xl lg:text-[16px] xl:text-[18px] bg-[#a3292f] hover:bg-[#e17171] px-[25px] py-[7px] font-bold">Order Now</button>
                        </Link>
                    </div>
                    <img src={TimeOpen} alt="TimeOpen"
                        className="z-1 absolute 2xl:pt-[340px] 2xl:ml-[1300px] xl:pt-[280px] xl:ml-[980px] xl:w-[300px] lg:w-[250px] 
                        lg:pt-[360px] lg:ml-[760px] md:w-[300px] md:pt-[200px] md:ml-[450px] sm:pt-[290px] sm:ml-[370px] sm:w-[250px] ml-[230px] w-[170px] pt-[220px]" />
                </div>
                {/* right side when : lebar layar > md */}
                <div className="home-img hidden lg:block 2xl:pt-20 xl:w-[550px] 2xl:w-[670px] mx-auto z-1 relative">
                    <img src={ImageHero} alt="ImageHero" />
                </div>
            </div>

            {/* Spesial Drink Section */}
            <div className="bg-[#fafafa] pt-2 pb-24">
                <div className='bg-[#f8f1e5] mx-auto rounded-[60px] max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-[83rem]'>
                    <h1 className='text-center font-bold text-[#675e51] text-[22px] lg:text-[43px] py-5 md:pt-5 lg:pt-6'>Spesial Drink For You</h1>
                    <div className="grid grid-cols items-center sm:grid-cols-2 md:grid-cols-3 xl:px-24 py-4 gap-6">
                        <img src={PromoKopiSusu} alt="PromoKopiSusu" className='w-[23rem] rounded-3xl' />
                        <img src={PromoSignatureFresh} alt="PromoSignatureFresh" className='w-[23rem] rounded-3xl' />
                        <img src={PromoKopiSusu500} alt="PromoKopiSusu500" className='w-[23rem] rounded-3xl' />
                    </div>
                    <div className=' text-white text-center py-8'>
                        <Link to="/produks">
                            <button className="border-[1px] rounded-3xl lg:text-[16px] bg-[#54514d] hover:bg-[#f1cb8e] px-[25px] py-[7px] font-bold uppercase">Explore Our Products</button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Spesial Drink Section */}

        </div>
    )
}

export default Home