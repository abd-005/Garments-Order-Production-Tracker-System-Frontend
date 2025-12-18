import React from 'react'
import { useParams, useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner'

const OrderDetails = () => {
    const { orderId } = useParams()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const { data: order, isLoading: orderLoading, isError: orderError } = useQuery({
        queryKey: ['order-detail', orderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/orders/${orderId}`)
            return res.data
        },
        enabled: !!orderId,
    })

    const { data: trackingData, isLoading: trackingLoading } = useQuery({
        queryKey: ['order-tracking', orderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/orders/${orderId}/tracking`)
            return res.data
        },
        enabled: !!orderId,
    })

    if (orderLoading || trackingLoading) return <LoadingSpinner />
    if (orderError) return <div className="p-8">Failed to load order details.</div>
    if (!order) return <div className="p-8">Order not found.</div>

    // normalize logs
    const logs = Array.isArray(trackingData) ? trackingData : Array.isArray(trackingData?.logs) ? trackingData.logs : Array.isArray(order.tracking) ? order.tracking : []
    const sorted = [...logs].sort((a, b) => new Date(a.timestamp || a.createdAt) - new Date(b.timestamp || b.createdAt))
    const latest = sorted[sorted.length - 1]

    return (
        <div className="p-8">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">Order Details</h2>
                    <p className="text-sm text-gray-600 mt-1">Order ID: {orderId}</p>
                </div>
                <div>
                    <button onClick={() => navigate(-1)} className="px-3 py-1 border rounded-md">Back</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <section className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Order Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                            <div className="font-medium">Product</div>
                            <div>{order.name || order.title || '—'}</div>
                        </div>

                        <div>
                            <div className="font-medium">Quantity</div>
                            <div>{order.quantity ?? '—'}</div>
                        </div>

                        <div>
                            <div className="font-medium">Customer</div>
                            <div>{order.customer || order.customerEmail || '—'}</div>
                        </div>

                        <div>
                            <div className="font-medium">Status</div>
                            <div>{order.status || '—'}</div>
                        </div>

                        <div>
                            <div className="font-medium">Tracking ID</div>
                            <div>{order.trackingId || '—'}</div>
                        </div>

                        <div>
                            <div className="font-medium">Created At</div>
                            <div>{order.createdAt ? new Date(order.createdAt).toLocaleString() : '—'}</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h4 className="text-sm font-semibold mb-3">Tracking History</h4>

                        {sorted.length === 0 ? (
                            <div className="text-sm text-gray-500">No tracking updates yet.</div>
                        ) : (
                            <ol className="space-y-4">
                                {sorted.map((step, idx) => {
                                    const isLatest = step === latest
                                    return (
                                        <li key={step._id || `${idx}-${step.timestamp || step.createdAt}`} className="flex gap-3">
                                            <div className="flex-shrink-0">
                                                <span className={`inline-block w-3 h-3 rounded-full mt-2 ${isLatest ? 'bg-primary' : 'bg-gray-300'}`} />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div className={`font-medium ${isLatest ? 'text-primary' : 'text-gray-800'}`}>{step.status}</div>
                                                    <div className="text-xs text-gray-400">{new Date(step.timestamp || step.createdAt).toLocaleString()}</div>
                                                </div>

                                                {step.location && <div className="text-xs text-gray-600 mt-1">Location: {step.location}</div>}
                                                {step.note && <div className="text-xs text-gray-600 mt-1">Note: {step.note}</div>}

                                                {Array.isArray(step.images) && step.images.length > 0 && (
                                                    <div className="mt-2 grid grid-cols-3 gap-2">
                                                        {step.images.map((img, i) => (
                                                            <img key={i} src={img} alt={`track-${idx}-${i}`} className="w-full h-20 object-cover rounded border" />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    )
                                })}
                            </ol>
                        )}
                    </div>
                </section>

                <aside className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Summary</h3>

                    <div className="text-sm text-gray-700 space-y-2">
                        <div><span className="font-medium">Latest Update:</span> {latest ? latest.status : '—'}</div>
                        <div><span className="font-medium">When:</span> {latest ? new Date(latest.timestamp || latest.createdAt).toLocaleString() : '—'}</div>
                        {latest?.location && <div><span className="font-medium">Location:</span> {latest.location}</div>}
                        <div><span className="font-medium">Manager:</span> {order.manager?.name || order.manager?.email || '—'}</div>
                        <div><span className="font-medium">Price:</span> {order.price ? `$${order.price}` : '—'}</div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default OrderDetails
