import React from 'react';

const Prueba = () => {
  return (
    <div className="bg-indigo-900 text-white h-screen w-64 fixed left-0 top-0">
      <div className="px-4 py-2">
        <a href="#" className="text-xl font-bold">
          letswork
        </a>
      </div>
      <nav className="mt-8">
        <div className="px-4 py-2 hover:bg-indigo-800">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
        </div>
        <div className="px-4 py-2 hover:bg-indigo-800">
          <a href="#" className="hover:text-gray-300">
            Booking
          </a>
        </div>
        <div className="px-4 py-2 hover:bg-indigo-800">
          <a href="#" className="hover:text-gray-300">
            Purchase Tokens
          </a>
        </div>
        <div className="px-4 py-2 hover:bg-indigo-800">
          <a href="#" className="hover:text-gray-300">
            Company Settings
          </a>
        </div>
        <div className="px-4 py-2 hover:bg-indigo-800">
          <a href="#" className="hover:text-gray-300">
            Billing
          </a>
        </div>
        <div className="px-4 py-2 hover:bg-indigo-800">
          <a href="#" className="hover:text-gray-300">
            Help
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Prueba;