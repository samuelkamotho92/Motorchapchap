import React from 'react'
import Header from '../partials/Header';
function Checkoutpage() {
  return (
    <div>
<Header />
<div className='flex items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-8'>
<div className='grid lg:grid-cols-3 md:grid-cols-2 gap-8 w-full max-w-screen-lg'>
<div className='lg:col-span-2'>
<h2 className='text-sm font-medium'>Payment Method</h2>
<div class="bg-white rounded mt-4 shadow-lg">
<div className='bg-white rounded mt-4 shadow-lg'>
<div className="flex items-center px-8 py-5">
						<input class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100" type="radio" />
						<label class="text-sm font-medium ml-4">PayPal</label>
					</div>
          <div className='border-t'>
          <div class="flex items-center px-8 py-5">
						<input class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100 bg-blue-600" type="radio" />
						<label class="text-sm font-medium ml-4">Credit Card</label>
					</div>
          
          </div>
</div>
</div>
</div>
</div>
</div>
    </div>
  )
}

export default Checkoutpage