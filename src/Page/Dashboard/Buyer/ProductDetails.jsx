import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import PurchaseModal from '../../../Components/Modal/PurchaseModal'
import Container from '../../../Components/Shared/Container'
import Button from '../../../components/Shared/Button/Button'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ProductDetails = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const [thumbsSwiper, setThumbsSwiper] = useState(null);


    const { data: product = {}, isLoading, refetch } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/product/${id}`)
            return result.data
        },
    })
    console.log(product)

    const closeModal = () => {
        setIsOpen(false)
    }

    if (isLoading) return <LoadingSpinner />

    const {
        images = [],
        demoVideo,
        title,
        description,
        category,
        quantity,
        price,
        moq,
        paymentOption,
        manager,
        features,
    } = product

    return (
        <div className='bg-secondary/30'>
            <Container>
                <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 py-12">
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">

                            {/* Swiper */}
                            <div className="lg:scale-80 border border-primary rounded-xl cursor-pointer bg-slate-100">
                                <div className="w-full *:mb-3 *:rounded-2xl shadow-md rounded-md ">
                                    <Swiper
                                        style={{
                                            '--swiper-navigation-color': '#4c4452',
                                            '--swiper-pagination-color': '#4c4452',
                                        }}
                                        loop={true}
                                        spaceBetween={10}
                                        navigation={true}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper2"
                                    >
                                        {images && images.length > 0 && images.map((src, index) => (
                                            <SwiperSlide key={`img-${index}`} className="flex flex-row-reverse items-center justify-center">
                                                <img src={src} alt={`${title}-${index}`} className="object-cover w-full h-full/80" />
                                            </SwiperSlide>
                                        ))}

                                        {demoVideo && (
                                            <SwiperSlide key="video" className="flex items-center justify-center">
                                                <div className="w-full h-full/80">
                                                    <iframe
                                                        className="w-full h-full"
                                                        src={demoVideo}
                                                        title="Demo video"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        loop={true}
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper"
                                    >

                                        {images && images.length > 0 && images.map((src, index) => (
                                            <SwiperSlide key={`img-${index}`} className="flex items-center justify-center ">
                                                <img src={src} alt={`${title}-${index}`} className="object-cover w-full h-20 rounded-md shadow-sm" />
                                            </SwiperSlide>
                                        ))}
                                        {demoVideo && (
                                            <SwiperSlide key="video" className="flex items-center justify-center">
                                                <div className="w-full h-20 rounded-md shadow-sm">
                                                    <iframe
                                                        className="w-full h-full"
                                                        src={demoVideo}
                                                        title="Demo video"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                </div>
                            </div>

                            <div className="space-y-4 lg:pt-30">
                                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                                <div className="text-sm text-gray-600">{category}</div>
                                <div className="text-lg font-bold text-gray-900">Price: <span className="text-primary">{price}$</span></div>
                                <div className="text-sm text-gray-600">Available Quantity: <span className="font-medium text-gray-800">{quantity}</span></div>
                                <div className="text-sm text-gray-600">Minimum Order: <span className="font-medium text-gray-800">{moq}</span></div>
                                <div className="text-sm text-gray-600">Payment Options: <span className="font-medium text-gray-800">{paymentOption}</span></div>

                                <div className="pt-4">
                                    <Button onClick={() => setIsOpen(true)} label="Order" />
                                </div>

                                {features && features.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="text-sm font-semibold text-gray-800">Features</h3>
                                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                                            {features.map((f, idx) => (
                                                <li key={idx}>{f}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="mt-6 text-gray-700">
                                    {description}
                                </div>

                                <div className="mt-6 text-sm text-gray-500">
                                    Manager: {manager?.name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <PurchaseModal
                    product={product}
                    closeModal={closeModal}
                    isOpen={isOpen}
                />
            </Container>
        </div>
    )
}

export default ProductDetails
