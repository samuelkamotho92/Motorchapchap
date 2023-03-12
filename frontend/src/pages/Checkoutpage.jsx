import React,{useState,useEffect} from 'react'
import Header from '../partials/Header';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../images/Motorchapchap.png';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
function Checkoutpage() {
  const [isShow,setShow] = useState(false);
  const {register,handleSubmit,watch,formState:{errors}} = useForm();
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

const initModal = ()=>{
setShow(true);
}

const onSubmit = async(data)=>{
  const phonenumber = data.phonenumber
console.log(phonenumber,amount);
const url = `http://localhost:8080/api/checkout/mpesaPay`
const resp = await fetch(url,{
  method:'POST',
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({phonenumber,amount}),
  credentials: 'include',
  withCredentials:true
});
const val = await resp.json();
console.log(val);
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
const url = `http://localhost:8080/api/claim/${claimId}`;
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
  alert('payment made successfuly');
  window.location.replace('/');
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
                                <button
                                 className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-green-500 hover:bg-green-600 text-white focus:outline-none focus-visible:ring-2"
                                 onClick={initModal}
                                 >MPESA</button>
                            </div>
                            <div className="text-xs text-gray-500 italic text-center">You'll be charged 0.4% VAT</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</section>
{
  isShow && (
 <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
<div className='relative w-auto my-6 mx-auto max-w-3xl'>
<div className='border-0 rounded-lg  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
<div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
<h3 className='text-3xl font-semibold'>
Enter Your Details
</h3>
<button onClick={()=>setShow(false)}>
 <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
   </span>
  </button>
</div>
<div className='relative p-6 flex-auto'>
<form onSubmit={handleSubmit(onSubmit)} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
<h2 className='font-bold'>Amount to be paid:</h2>
<h3>{amount}</h3>
<label className="block text-black text-sm font-bold mb-1">
    Phone Number
</label>
<input  type='number' 
className='input input-warning'
{...register("phonenumber", { required: true })}
/>
<div className='flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b'>
<button
className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
type="submit"
>
PAYNOW
</button>
</div>
</form>
</div>
</div>
</div>
 </div>
  )
}
</div>
  )
}

export default Checkoutpage