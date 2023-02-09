import React,{useState,useEffect} from 'react'
import Header from '../partials/Header';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../images/Motorchapchap.png';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
function Checkoutpage() {
  const location = useLocation();
  const {cover} = location.state;
  const {claimId} = location.state;
  console.log(cover,claimId);
  const [stripeToken,setstripeToken] = useState(null);
  const KEY = 'pk_test_51MX2dJFIqJP3zxtmcqkI1dHBfR0NM1RCn4CaYvHIGRKcTKOC94VFJaqy6zvHuDuWyHtJSImGKDevrPoNwMjvG3ZU00BgsbrGj3';

  let amount = cover == "third party only"?"5000":cover == "comprehensive"?"10000":"75000";
  console.log(amount);

  const onToken = async(token)=>{
  setstripeToken(token);
  console.log(stripeToken);
}
console.log(stripeToken);
useEffect(()=>{
const makeRequest = async()=>{
try{
  const url =`http://localhost:8080/api/checkout/payments`;
  const resp = await fetch(url,{
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      tokenId:stripeToken.id,
      amount:amount
    }),
    credentials:'include',
    withCredentials:true
  });
  const data = await resp.json();
  console.log(data);
  if(resp.ok){
    //caryout another fetch
    const updateDetails = async()=>{
const url = `http://localhost:8080/api/claim/getClaim/${claimId}`;
      console.log(url);
      const resp = await fetch(url,{
        method:'PATCH',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          amount:amount,
          paymentStatus:"paid"
        }),
        credentials:'include',
      withCredentials:true
      })
      const data = await resp.json();
      console.log(data);
    }
    updateDetails();
  }
  // alert('payment made successfuly');
  // window.location.replace('/');
}catch(err){
console.log(err);
}
}
 stripeToken && makeRequest();
console.log(stripeToken);

},[stripeToken])

  return (
<div>
  <Header />
<section className="antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
    <div className="h-full">
        <div>
            <div className="relative px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
                <img className="rounded-t shadow-lg" src={logo} width="460" height="180" alt="Pay background" />
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto" x-data="{ card: true }">
                <div className="bg-white px-8 pb-6 rounded-b shadow-lg">

                    <div className="text-center mb-6">
                        <div className="mb-2">
                            <img className="-mt-8 inline-flex rounded-full" src="https://preview.cruip.com/mosaic/images/user-64-13.jpg" width="64" height="64" alt="User" />
                        </div>
                        <h1 className="text-xl leading-snug text-gray-800 font-semibold mb-2">Choose Payment Method 💰 </h1>
                        <div className="text-sm">
                           Pay using Credit Card or Mpesa
                        </div>
                    </div>

                     <div className="flex justify-center mb-6">
                        <div className="relative flex w-full p-1 bg-gray-50 rounded">
                          <span className="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
                            <span className="absolute inset-0 w-1/2 bg-white rounded border border-gray-200 shadow-sm transform transition duration-150 ease-in-out translate-x-0"></span> 
                        </span>   
                        </div>
                    </div> 
                    <div x-show="card">
                        <div className="mt-6">
              <div className='mb-4'>
{stripeToken ? (<span style={{color:'purple'}}>Payment Made succesfully</span>):
(
<StripeCheckout 
name='Motorchapchap'
image={logo}
billingAddress
shippingAddress
description='Pay for your package'
amount={amount}
token={onToken}
stripeKey={KEY}
>
<button className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">STRIPE</button>
</StripeCheckout>
)}
</div>
                            <div className="text-xs text-gray-500 italic text-center">You'll be charged 0.2% VAT</div>
                        </div>

                    </div>
                    <div x-show="!card" x-cloak>
                        <div>
                            <div className="mb-4">
                                <button className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-green-500 hover:bg-green-600 text-white focus:outline-none focus-visible:ring-2">MPESA</button>
                            </div>
                            <div className="text-xs text-gray-500 italic text-center">You'll be charged 0.4% VAT</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>
</div>
  )
}

export default Checkoutpage