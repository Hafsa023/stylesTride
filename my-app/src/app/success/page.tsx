import React from 'react';

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-500 to-purple-600 text-center px-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="font-extrabold text-3xl text-gradient mb-4">
          Payment Successful
        </h1>
        <p className="text-gray-800 text-lg mb-4">
          Your order has been placed successfully!
        </p>
        <p className="text-gray-600">
          Thank you for your purchase. We are processing your order and will notify you once it's shipped.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="text-green-500 underline hover:text-green-600 transition-colors duration-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
