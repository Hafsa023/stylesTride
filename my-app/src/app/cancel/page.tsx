import React from 'react';

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-500 to-orange-600 text-center px-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="font-extrabold text-3xl text-red-600 mb-4">
          Payment Not Successful
        </h1>
        <p className="text-gray-800 text-lg mb-4">
          Unfortunately, your order could not be processed.
        </p>
        <p className="text-gray-600">
          Please try again or contact support if the issue persists.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="text-blue-500 underline hover:text-blue-600 transition-colors duration-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
