import React from 'react'
import { Link } from 'react-router-dom'
function Packages() {
  return (
    <div>
        <main className="max-w-6xl mx-auto pt-10 pb-36 px-8">
   <div className="max-w-md mx-auto mb-14 text-center">
    <h1 className="text-4xl font-semibold mb-6 lg:text-5xl"><span className="text-indigo-600">Flexible</span> Plans</h1>
    <p className="text-xl text-gray-500 font-medium">Choose an Insurance Cover plan for your vehicle</p>
  </div>
  
  <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start">
    
    <div className="w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1 lg:rounded-r-none">
      <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
        <img src="https://res.cloudinary.com/williamsondesign/abstract-1.jpg"  alt="" className="rounded-3xl w-20 h-20" />
        <div className="ml-5">
          <span className="block text-2xl font-semibold">Third Party Only</span>
          <span><span className="font-medium text-gray-500 text-xl align-top">ksh&thinsp;</span><span className="text-3xl font-bold">5,000</span></span><span className="text-gray-500 font-medium">/ per annum</span>
        </div>
      </div>
      <ul className="mb-7 font-medium text-gray-500">
        <li className="flex text-lg mb-2">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span className="ml-3">Covers <span className="text-black">Damages Caused to third party</span></span>
        </li>
        <li className="flex text-lg mb-2">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span className="ml-3">Caters for <span className="text-black"> Third party vehicle damages</span></span>
        </li>
        <li className="flex text-lg">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span className="ml-3">Hanldes <span className="text-black"> Third party physical  injuries </span></span>
        </li>
      </ul>
      <Link to="/insurance Cover" className="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl">
        Choose Plan
        <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" className="ml-2" />
      </Link>
    </div>
    
    <div className="w-full flex-1 p-8 order-1 shadow-xl rounded-3xl bg-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0">
      <div className="mb-8 pb-8 flex items-center border-b border-gray-600">
        <img src="https://res.cloudinary.com/williamsondesign/abstract-2.jpg"  alt="" className="rounded-3xl w-20 h-20" />
        <div className="ml-5">
          <span className="block text-3xl font-semibold text-white">Third party,fire and theft</span>
          <span><span className="font-medium text-xl align-top">ksh&thinsp;</span><span className="text-3xl font-bold text-white">7500</span></span><span className="font-medium">/ per annum</span>
        </div>
      </div>
      <ul className="mb-10 font-medium text-xl">
        <li className="flex mb-6">
          <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
          <span className="ml-3">Covers <span className="text-white">All the third party benefits</span></span>
        </li>
        <li className="flex mb-6">
          <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
          <span className="ml-3">Caters <span className="text-white"> for damages caused by fire </span></span>
        </li>
        <li className="flex">
          <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
          <span className="ml-3">Compensate for<span className="text-white"> vehicle stolen</span></span>
        </li>
      </ul>
      <Link to="/InsuranceCover" className="flex justify-center items-center bg-indigo-600 rounded-xl py-6 px-4 text-center text-white text-2xl">
        Choose Plan
        <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" className="ml-2" />
      </Link>
    </div>
    
    <div className="w-full flex-1 mt-8 p-8 order-3 bg-red-400 shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-3 lg:rounded-l-none h-94">
      <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
        <img src="https://res.cloudinary.com/williamsondesign/abstract-3.jpg"  alt="" className="rounded-3xl w-20 h-20" />
        <div className="ml-5">
          <span className="block text-2xl font-semibold">Comprehensive Insurance Cover</span>
          <span><span className="font-medium text-gray-500 text-xl align-top">ksh&thinsp;</span><span className="text-3xl font-bold">10000</span></span><span className="text-gray-500 font-medium">/ per anuum</span>
        </div>
      </div>
      <ul className="mb-7 font-medium text-gray-500">
        <li className="flex text-lg mb-2">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span className="ml-3">All Compensation in <span className="text-black">Third Party included</span></span>
        </li>
        <li className="flex text-lg mb-2">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span className="ml-3">Covers <span className="text-black">Damages Caused To third Party</span></span>
        </li>
        <li className="flex text-lg">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span className="ml-3"><span className="text-black">Caters</span> for all damages on your vehicle and you</span>
        </li>
      </ul>
      <Link to="/insuranceCover" className="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl">
        Choose Plan
        <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" className="ml-2" />
      </Link>
    </div>
  </div>
</main>
    </div>
  )
}

export default Packages