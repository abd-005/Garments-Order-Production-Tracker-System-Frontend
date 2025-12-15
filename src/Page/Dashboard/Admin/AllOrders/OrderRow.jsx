import React from 'react'
import { Link } from 'react-router'

const OrderRow = ({ order }) => {
  return (
    <tr>
      {/* Order ID */}
      <td className="px-5 py-5 border-b bg-white text-sm break-all">
        {order._id}
      </td>

      {/* User */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <div className="flex items-center gap-3">
          <img
            src={order.manager?.image}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-gray-900">{order.customer}</p>
          </div>
        </div>
      </td>

      {/* Product */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <div className="flex items-center gap-3">
          <img
            src={order.image}
            className="w-12 h-12 rounded object-cover"
          />
          <div>
            <p className="text-gray-900">{order.name}</p>
            <p className="text-xs text-gray-500">{order.category}</p>
          </div>
        </div>
      </td>

      {/* Quantity */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        {order.quantity}
      </td>

      {/* Status */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            order.status === 'pending'
              ? 'bg-yellow-100 text-yellow-700'
              : order.status === 'approved'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {order.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <Link
          to={`/dashboard/order-details/${order._id}`}
          className="px-3 py-1 bg-primary text-white rounded-md text-sm"
        >
          View
        </Link>
      </td>
    </tr>
  )
}

export default OrderRow
