import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center bg-white items-center h-screen">
      <div
        className="loader"
        style={{
          width: '60px',
          aspectRatio: '2',
          background: `
            no-repeat radial-gradient(circle closest-side, #000 90%, transparent) 0% 50%,
            no-repeat radial-gradient(circle closest-side, #000 90%, transparent) 50% 50%,
            no-repeat radial-gradient(circle closest-side, #000 90%, transparent) 100% 50%
          `,
          backgroundSize: 'calc(100% / 3) 50%',
          animation: 'l3 1s infinite linear',
        }}
      ></div>

      <style>
        {`
          @keyframes l3 {
            20% { background-position: 0% 0%, 50% 50%, 100% 50%; }
            40% { background-position: 0% 100%, 50% 0%, 100% 50%; }
            60% { background-position: 0% 50%, 50% 100%, 100% 0%; }
            80% { background-position: 0% 50%, 50% 50%, 100% 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;