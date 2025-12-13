import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import Container from '../../../Components/Shared/Container';
import { IoBagCheckOutline } from 'react-icons/io5'
import { useState } from 'react';

const PaymentSuccess = () => {
      const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
    const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        sessionId,
      }).then( res => {
        console.log(res.data)
      })
    }
  }, [sessionId])
    return (
    <div className='bg-secondary'>
        <Container>
      <div className="min-h-[60vh] flex items-center justify-center py-12">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mx-auto w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-6">
            <IoBagCheckOutline className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Payment Successful</h1>

          <p className="text-sm text-gray-600 mb-4">
            Thank you — your payment was processed successfully. We are preparing your order now.
          </p>

          {sessionId && (
            <div className="mx-auto max-w-md text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-md p-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800 mr-3">Transaction ID</span>
                <span className="text-xs text-gray-600 break-all">{sessionId}</span>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-4">
              <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            </div>
          ) : null}

          {error && (
            <div className="text-sm text-red-600 mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mt-4">
            <Link
              to="/dashboard/my-orders"
              className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition"
            >
              View My Orders
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center justify-center px-5 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
          </div>

          <div className="mt-6 text-xs text-gray-400">
            If you need help, contact support with your transaction ID.
          </div>
        </div>
      </div>
    </Container>
    </div>
    );
};

export default PaymentSuccess;