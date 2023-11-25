import React, { useEffect } from 'react';
import StoreBanner from '../../assets/banner2.png';
import Place2 from '../../assets/place2.jpg';
import Place3 from '../../assets/place3.png';
import Place4 from '../../assets/place4.png';
import Place5 from '../../assets/place5.png';
import Place1 from '../../assets/place1.jpg';
import Place6 from '../../assets/place6.png';
import Place7 from '../../assets/place7.png';
import Place8 from '../../assets/place8.png';

const StoreUs = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='bg-[#fafafa] pt-16'>
            <img src={StoreBanner} alt="StoreBanner" className='mx-auto pt-5 w-[550px]' />

            {/* Store Section */}
            <div className='flex justify-center py-6'>
                <div className="mapouter ">
                    <div class="gmap_canvas  ">
                        <iframe style={{ width: "75rem", height: "520px" }} id="gmap_canvas" src="https://maps.google.com/maps?q=kausa padang&t=&z=14&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="pt-5 pb-12">
                <div className='bg-[#edeae4] mx-auto rounded-[60px] max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-[90rem]'>
                    <p className='text-[#edaf4c] text-center font-normal text-[25px] pt-10'> - Our <span className='font-bold text-[#d79d3f]'>Gallery</span></p>
                    <p className='text-[#675e51] text-center font-semibold text-[45px] -mt-4'>Kausa Situation</p>
                    <div className="grid grid-cols items-center sm:grid-cols-2 md:grid-cols-4 xl:px-20 pt-8 pb-16 gap-6">
                        <img src={Place2} alt="Place2" className='w-[23rem] rounded-[30px]' />
                        <img src={Place3} alt="Place3" className='w-[23rem] rounded-[30px]' />
                        <img src={Place4} alt="Place4" className='w-[23rem] rounded-[30px]' />
                        <img src={Place1} alt="Place1" className='w-[23rem] rounded-[30px]' />
                        <img src={Place5} alt="Place5" className='w-[23rem] rounded-[30px]' />
                        <img src={Place6} alt="Place6" className='w-[23rem] rounded-[30px]' />
                        <img src={Place7} alt="Place7" className='w-[23rem] rounded-[30px]' />
                        <img src={Place8} alt="Place8" className='w-[23rem] rounded-[30px]' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreUs