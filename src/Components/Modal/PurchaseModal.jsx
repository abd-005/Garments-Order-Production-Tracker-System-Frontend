import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { TbFidgetSpinner } from 'react-icons/tb'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Swal from 'sweetalert2'
import 'swiper/css'

const PurchaseModal = ({ closeModal, isOpen, product }) => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const {
        _id,
        title,
        description,
        price,
        category,
        quantity: availableQuantity,
        moq,
        paymentOption,
        images,
        manager,
    } = product || {}

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            description,
            email: user?.email || '',
            name: title || '',
            unitPrice: price || 0,
            orderQuantity: moq || 1,
            firstName: user?.displayName?.split(' ')?.[0] || '',
            lastName: user?.displayName?.split(' ')?.slice(1).join('') || '',
            contactNumber: '',
            address: '',
            notes: '',
        },
    })
    console.log(user)
    const orderQuantity = Number(watch('orderQuantity') || 0)
    const orderPrice = Number((orderQuantity * (price || 0)).toFixed(2))

    const bookingMutation = useMutation({
        mutationFn: async (payload) => await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, payload),
        onSuccess: () => {
            toast.success('Booking saved')
        },
        onError: () => {
            toast.error('Failed to save booking')
        },
    })

    const onSubmit = async (data) => {
        if (orderQuantity < (moq || 1)) {
            toast.error(`Minimum order is ${moq}`)
            return
        }
        if (orderQuantity > (availableQuantity || 0)) {
            toast.error('Order quantity exceeds available stock')
            return
        }

        const bookingPayload = {
            productId: _id,
            name: title,
            category,
            images,
            unitPrice: Number(price),
            orderQuantity,
            totalPrice: orderPrice,
            description,
            minimum: Number(moq),
            maximum: Number(availableQuantity),
            manager,
            customer: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                contactNumber: data.contactNumber,
                address: data.address,
                notes: data.notes,
                image: user?.photoURL || null,
            },
            paymentOption,
            status: 'Pending',
            createdAt: new Date().toISOString(),
        }
        try {
            if (paymentOption === 'PayFirst') {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_URL}/create-checkout-session`,
                    {
                        ...bookingPayload,
                        returnUrl: `${window.location.origin}/dashboard/my-orders`,
                    }
                )
                console.log(data.url)
                window.location.href = data.url // redirect user to respected url window
                return
            }

            await bookingMutation.mutateAsync(bookingPayload)
            closeModal()
            navigate('/dashboard/my-orders')
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong')
        }
    }

    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={closeModal}
        >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex scale-80 items-center justify-center p-4 my-12">
                    <DialogPanel className="w-full max-w-2xl bg-white p-6 duration-300 shadow-xl rounded-2xl">
                        <DialogTitle as="h3" className="text-lg font-medium text-gray-900 text-center">
                            Order
                        </DialogTitle>



                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm text-gray-700">Email</label>
                                    <input
                                        readOnly
                                        {...register('email')}
                                        className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">Product Name</label>
                                    <input
                                        readOnly
                                        {...register('name')}
                                        className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">Unit Price</label>
                                    <input
                                        readOnly
                                        {...register('unitPrice')}
                                        className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">First Name</label>
                                    <input
                                        {...register('firstName', { required: 'First name is required' })}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                    {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">Last Name</label>
                                    <input
                                        {...register('lastName', { required: 'Last name is required' })}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                    {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm text-gray-700">Order Quantity</label>
                                    <input
                                        type="number"
                                        {...register('orderQuantity', {
                                            required: 'Quantity is required',
                                            valueAsNumber: true,
                                            min: { value: moq || 1, message: `Minimum order is ${moq || 1}` },
                                            max: { value: availableQuantity || 0, message: 'Exceeds available quantity' },
                                        })}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                    {errors.orderQuantity && <p className="text-red-600 text-sm">{errors.orderQuantity.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">Order Price</label>
                                    <input
                                        readOnly
                                        value={`${orderPrice}$`}
                                        className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">Contact Number</label>
                                    <input
                                        {...register('contactNumber', { required: 'Contact number is required' })}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                    {errors.contactNumber && <p className="text-red-600 text-sm">{errors.contactNumber.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700">Delivery Address</label>
                                    <input
                                        {...register('address', { required: 'Delivery address is required' })}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                    {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700">Additional Notes</label>
                                    <textarea {...register('notes')} className="w-full px-3 py-2 border rounded-md" />
                                </div>
                            </div>

                            <div className="md:col-span-2 flex items-center justify-end gap-3 mt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 rounded-md bg-red-100 text-red-800 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md bg-primary text-white flex items-center gap-2 cursor-pointer"
                                >
                                    {bookingMutation.isLoading ? <TbFidgetSpinner className="animate-spin" /> : 'Place Order'}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default PurchaseModal
