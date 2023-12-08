import React, { useEffect, useState } from 'react';
import ImageAboutUs from '../../assets/kausa1.png';
import BaristaIvan from '../../assets/team1.png';
import BaristaLusi from '../../assets/team2.png';
import BaristaRehan from '../../assets/team3.png';
import axios from 'axios';

const AboutUs = () => {
    const [aboutUs, setAboutUs] = useState([]);
    useEffect(() => {
        const getAboutUs = async () => {
            try {
                const response = await axios.get('http://localhost:3001/aboutus');
                setAboutUs(response.data.datas);
            } catch (error) {
                console.log(error)
            }
        };
        getAboutUs();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            {/* First Section */}
            <div className="flex bg-[#fafafa] pt-16 px-40 w-full h-full">
                <div className="2xl:py-14 2xl:w-[38%]">
                    <img src={ImageAboutUs} alt="ImageAboutUs" />
                </div>
                <div className="flex flex-col pt-48 pl-24">
                    <p className='text-[#e9ac4a] font-medium text-[26px] pb-6'>
                        - About <span className='font-bold text-[#d79d3f]'>Kausa</span>
                    </p>
                    <span className='font-bold text-[#675e51] text-7xl'>
                        Cerita Kami
                    </span>
                    <span className='font-light text-3xl text-[#675e51] py-10'>
                        Hai <span className='font-medium'> Teman Kausa! </span>
                        <br />Mari berkenalan dengan tim kami mulai dari toko, lingkungan
                        <br />dan orang-orang yang bekerja bersama kami!
                    </span>
                </div>
            </div>

            {/* Second Section */}
            <div className="bg-[#fafafa] pb-20 pt-5">
                <div className='mx-auto rounded-[60px] max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-[83rem]'>
                    <p className='text-[#edaf4c] text-left pl-16 font-medium text-[25px]'> - Our <span className='font-bold text-[#d79d3f]'>Story</span></p>
                    {aboutUs.map((about, index) => {
                        return (
                            <div key={index} id={about.id} className="grid grid-cols items-center grid-cols-2">
                                <img src={about.gambar} alt="KausaStory" className='w-[73%] rounded-full' />
                                <span className='font-light text-justify text-2xl text-[#675e51]'>
                                    <p className='pb-5'>
                                        {about.story}
                                    </p>
                                    <p>
                                        Kami percaya bahwa kenyamanan dan kepuasan tidak hanya terletak pada rasa kopi yang luar biasa, tetapi juga dalam momen yang kita bagi bersama,
                                        menciptakan kenangan indah yang akan kita kenang selamanya. Selamat datang di Kausa, di mana kehangatan dan kebahagiaan bersatu dalam setiap gelas kopi,
                                        menjadikan tempat ini sebagai pilihan yang pas untuk menyegarkan semangat setelah rutinitas kuliah yang melelahkan.
                                    </p>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Third Section */}
            <div className="bg-[#fafafa] pb-20">
                <div className='bg-[#edeae4] mx-auto rounded-[60px] max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-[83rem]'>
                    <p className='text-[#edaf4c] text-center font-normal text-[25px] pt-10'> - Our <span className='font-bold text-[#d79d3f]'>Team</span></p>
                    <p className='text-[#675e51] text-center font-semibold text-[45px] -mt-4'>Barista at Kausa</p>
                    <div className="grid grid-cols items-center sm:grid-cols-2 md:grid-cols-3 xl:px-20 pt-8 pb-16 gap-6">
                        <img src={BaristaIvan} alt="BaristaIvan" className='w-[23rem] rounded-[30px]' />
                        <img src={BaristaLusi} alt="BaristaLusi" className='w-[23rem] rounded-[30px]' />
                        <img src={BaristaRehan} alt="BaristaRehan" className='w-[23rem] rounded-[30px]' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs