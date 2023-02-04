import React,{useState,useEffect} from 'react'
import Header from '../partials/Header';
import StripeCheckout from 'react-stripe-checkout';
import  logo from '../images/Motorchapchap.png';
import axios from 'axios';
function Checkoutpage() {
  const [stripeToken,setstripeToken] = useState(null);
  const KEY = 'pk_test_51MX2dJFIqJP3zxtmcqkI1dHBfR0NM1RCn4CaYvHIGRKcTKOC94VFJaqy6zvHuDuWyHtJSImGKDevrPoNwMjvG3ZU00BgsbrGj3';
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
    body:JSON.stringify({tokenId:stripeToken.id,amount:5000}),
    credentials:'include',
    withCredentials:true
  });
  const data = await resp.json();
  console.log(data);
  window.location.replace('/');
}catch(err){
console.log(err);
}
}
 stripeToken && makeRequest();
console.log(stripeToken);

},[stripeToken])

  return (
<div className='flex justify-center'>
{/* <Header /> */}
{stripeToken ? (<span> Processing please wait</span>):
(
<StripeCheckout 
name='Motorchapchap'
image={logo}
billingAddress
shippingAddress
description='Pay for your package'
amount={5000}
token={onToken}
stripeKey={KEY}
>
<button className='btn btn-info btn-outline'>Pay 1 to upgrade to Premium Tier</button>
</StripeCheckout>
)}

</div>
  )
}

export default Checkoutpage