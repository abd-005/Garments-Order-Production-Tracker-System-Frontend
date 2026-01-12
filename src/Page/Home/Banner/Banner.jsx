import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/pagination';
import banner1 from '../../../assets/img/Image-5.jpg'
import banner2 from '../../../assets/img/Image-3.jpg'
import banner3 from '../../../assets/img/Image-2.jpg'
import banner4 from '../../../assets/img/Image-4.jpg'
import banner5 from '../../../assets/img/Image-1.jpg'
import { useNavigate } from 'react-router';

const banners = [banner1, banner2, banner3, banner4, banner5];

const Banner = () => {
    const navigate = useNavigate()

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
                        <figure className="max-h-[65vh] relative overflow-hidden">
                            <img
                                src={img}
                                alt={`Hero banner ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/60 dark:bg-black/40" aria-hidden="true"></div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                                <h1 className="text-white text-3xl sm:text-4xl font-bold drop-shadow-md">
                                    Tailored Craftsmanship
                                </h1>
                                <p className="text-white/90 mt-2 max-w-xl">
                                    Handmade garments with sustainable materials — book a fitting or view products.
                                </p>
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        aria-label="View products"
                                        onClick={() => navigate('/products')}
                                        className="px-5 py-2 bg-primary text-white rounded-md shadow"
                                    >
                                        View Products
                                    </button>
                                </div>
                            </div>
                        </figure>

                    </SwiperSlide>
                    )
                }
            </Swiper>
        </div>


    );
};

export default Banner;