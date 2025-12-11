import { useForm } from 'react-hook-form'
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';
import { imageUpload } from '../../../../utils';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';
import ErrorPage from '../../../ErrorPage';

const AddProductForm = () => {
    const { user } = useAuth();

    // useMutation hook useCase (POST || PUT || PATCH || DELETE)
    const {
        isPending,
        isError,
        mutateAsync,
        reset: mutationReset,
    } = useMutation({
        mutationFn: async payload =>
            await axios.post(`${import.meta.env.VITE_API_URL}/products`, payload),

        onSuccess: data => {
            console.log('Product added successfully:', data);

            // show success notification or perform other actions
            toast.success('Product added successfully');

            // navigate to my inventory page


            mutationReset(); // resets mutation to initial state

            // Query key invalidate can be done here if needed
        },

        onError: error => {
            console.error('Error adding product:', error);
            toast.error('Failed to add product');
        },

        onMutate: payload => {
            console.log(`I'll post this data---> `, payload);
        },

        onSettled: (data, error) => {
            if (data) console.log(`I'm from onSettled---> `, data);
            if (error) console.log('Error occurred from onSettled:', error);
        },

        retry: 3, //retry 3 times to request in backend
    });


    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,

    } = useForm();

    const onSubmit = async (data) => {
        try {
            // Upload multiple images
            const imageUrls = await Promise.all(
                [...data.images].map((file) => imageUpload(file))
            );
            const productData = {
                title: data.title,
                description: data.description,
                category: data.category,
                price: Number(data.price),
                quantity: Number(data.quantity),
                moq: Number(data.moq),
                images: imageUrls,
                demoVideo: data.demoVideo || null,
                paymentOption: data.paymentOption,
                showOnHome: data.showOnHome || false,
                manager: {
                    name: user?.displayName,
                    email: user?.email,
                    image: user?.photoURL,
                },
            };

            // const res = await axios.post(`${import.meta.env.VITE_API_URL}/products`, productData);

            // *****
            await mutateAsync(productData); // call mutation func
            // *****

            // if (res.data) {
            //     console.table(res.data)
            //     toast.success("Product created successfully!");
            // }
            reset(); // resets from data

        } catch (err) {
            console.error(err);
            toast.error("Failed to create product");
        }
    };

    if (isPending) return <LoadingSpinner />;
    if (isError) return <ErrorPage />;
    return (
        <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-secondary p-6">
            <h2>
                Add Product
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md"
            >
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Product Title */}
                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium">Product Name</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter product name"
                            className="w-full px-4 py-3 border rounded-md focus:outline-primary"
                            {...register("title", { required: "Product name is required" })}
                        />
                        {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-gray-700 font-medium">Category</label>
                        <select
                            id="category"
                            className="w-full px-4 py-3 border rounded-md focus:outline-primary"
                            {...register("category", { required: "Category is required" })}
                        >
                            <option value="">Select Category</option>
                            <option value="Shirt">Shirt</option>
                            <option value="Pant">Pant</option>
                            <option value="Cap">Cap</option>
                            <option value="Jacket">Jacket</option>
                        </select>
                        {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-medium">Description</label>
                        <textarea
                            id="description"
                            placeholder="Enter product description"
                            className="w-full h-32 px-4 py-3 border rounded-md focus:outline-primary"
                            {...register("description", { required: "Description is required" })}
                        ></textarea>
                        {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Price, Quantity, MOQ */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-gray-700 font-medium">Price</label>
                            <input
                                id="price"
                                type="number"
                                placeholder="Price"
                                className="w-full px-4 py-3 border rounded-md focus:outline-primary"
                                {...register("price", { required: "Price is required", min: 1 })}
                            />
                            {errors.price && <p className="text-red-600 text-sm">{errors.price.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block text-gray-700 font-medium">Quantity</label>
                            <input
                                id="quantity"
                                type="number"
                                placeholder="Available quantity"
                                className="w-full px-4 py-3 border rounded-md focus:outline-primary"
                                {...register("quantity", { required: "Quantity is required", min: 1 })}
                            />
                            {errors.quantity && <p className="text-red-600 text-sm">{errors.quantity.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="moq" className="block text-gray-700 font-medium">MOQ</label>
                            <input
                                id="moq"
                                type="number"
                                placeholder="Minimum order quantity"
                                className="w-full px-4 py-3 border rounded-md focus:outline-primary"
                                {...register("moq", { required: "MOQ is required", min: 1 })}
                            />
                            {errors.moq && <p className="text-red-600 text-sm">{errors.moq.message}</p>}
                        </div>
                    </div>

                    {/* Images Upload */}
                    <div>
                        <label className="block text-gray-700 font-medium">Upload Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="w-full px-4 py-2 border rounded-md focus:outline-primary"
                            {...register("images", { required: "At least one image is required" })}
                        />
                        {errors.images && <p className="text-red-600 text-sm">{errors.images.message}</p>}
                    </div>

                    {/* Demo Video Link */}
                    <div>
                        <label htmlFor="demoVideo" className="block text-gray-700 font-medium">Demo Video Link (Optional)</label>
                        <input
                            type="url"
                            placeholder="https://youtube.com/demo"
                            className="w-full px-4 py-3 border rounded-md focus:outline-primary"
                            {...register("demoVideo")}
                        />
                    </div>

                    {/* Payment Options */}
                    <div>
                        <label htmlFor="paymentOption" className="block text-gray-700 font-medium">Payment Option</label>
                        <select
                            id="paymentOption"
                            className="w-full px-4 py-3 border rounded-md focus:outline-primary"
                            {...register("paymentOption", { required: "Payment option is required" })}
                        >
                            <option value="">Select Payment Option</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                            <option value="PayFirst">PayFirst</option>
                        </select>
                        {errors.paymentOption && <p className="text-red-600 text-sm">{errors.paymentOption.message}</p>}
                    </div>

                    {/* Show on Home Page */}
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="showOnHome" {...register("showOnHome")} />
                        <label htmlFor="showOnHome" className="text-gray-700">Show on Home Page</label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white rounded-md shadow-md hover:bg-secondary transition cursor-pointer"
                    >
                        {isPending ? (
                            <TbFidgetSpinner className='animate-spin m-auto' />
                        ) :
                            (
                                'Create Product'
                            )}

                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;
