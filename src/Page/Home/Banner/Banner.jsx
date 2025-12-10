import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
// import { Pagination } from 'swiper/modules';
import banner1 from '../../../assets/img/Image-5.jpg'
import banner2 from '../../../assets/img/Image-3.jpg'
import banner3 from '../../../assets/img/Image-2.jpg'
import banner4 from '../../../assets/img/Image-4.jpg'
import banner5 from '../../../assets/img/Image-1.jpg'

const banners = [banner1, banner2, banner3, banner4, banner5];

const Banner = () => {

    return (

        
        <div className='overflow-hidden rounded-3xl my-6 shadow-2xl'>
            <Swiper className="mySwiper"
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {
                    banners.map((img, index) => <SwiperSlide key={index}>
                        <figure className='max-h-[60vh] relative overflow-hidden '>
                            <img src={img} alt="banner" className='w-full h-full object-cover' />
                            <div className='absolute inset-0 bg-black/60'></div>
                        </figure>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
        

    );
};

export default Banner;