import React,{useContext, useState} from 'react'
import UserSidebar from '../partials/UserSidebar'
import {useForm} from 'react-hook-form'
import { UseAuthContext } from '../context/Authcontext';
function ClaimForm() {
  const {user} = useContext(UseAuthContext);
  const {formData,setFormData} = useState('');
  let submittedBy = user.user.email;
  console.log(submittedBy);
  const {register,handleSubmit,watch,formState:{errors}} = useForm({
  });
  const url = `http://localhost:8080/api/claim/createClaim`;
  const onSubmit =  async(data)=>{
const {carOwner,registrationNo,vehicleType,vehiclePurpose,insuranceCover,phoneNumber} = data;
console.log(carOwner,registrationNo,vehicleType,vehiclePurpose,phoneNumber,insuranceCover);
const resp = await fetch(url,
  {
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({carOwner,registrationNo,vehicleType,vehiclePurpose,submittedBy,insuranceCover,phoneNumber}),
    credentials:'include',
    withCredentials:true
  })
  const {Claim}= await resp.json();
  console.log(Claim);
  if(resp.ok){
    alert('claim added succesfully');
    window.location.replace('/');
  }
  }
  return (
    <div className='flex flex-row mt-60px h-screen bg-base-200'>
      <UserSidebar />
    <section className='max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20'>
<h1 className='text-xl font-bold text-white capitalize dark:text-white'>
Claim Forms
</h1>
<form onSubmit={handleSubmit(onSubmit)}>
  <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
  <div>
                <label className="text-white dark:text-gray-200" for="username">Car Owner</label>
                <input {...register('carOwner',{required:true})} type='text' className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring' />
                   {errors.carOwner?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">Car Owner is required 😶</p>}
  </div>
  <div>
                <label className="text-white dark:text-gray-200" for="username">Phone Number</label>
                <input {...register('phoneNumber',{required:true})} type='text' className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring' />
                   {errors.phoneNumber?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">Phone Number is required 😶</p>}
  </div>
  <div>
  <label class="text-white dark:text-gray-200">RegNo</label>
                    <input {...register('registrationNo',{required:true})} type='text' className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'/>
   {errors.registrationNo?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">Registration No is required 😶</p>}
    </div>
            <div>
            <label class="text-white dark:text-gray-200">Vehicle Type</label>
                    <input {...register('vehicleType',{required:true})} type='text' className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'/>
   {errors.vehicleType?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">Vehicle Type is required 😶</p>}
            </div>
            <div>
            <label className="text-white dark:text-gray-200">Vehicle Purpose</label>
            <select type="text" className="input input-warning "
                value={formData?.vehiclePurpose} {...register("vehiclePurpose", { required: true })} onChange={e => setFormData({ ...formData, vehiclePurpose: e.target.value })}
              >
                <option defaultValue={'false'} disabled>
Select Vehicle Purpose
                </option>
                <option value='personal'>personal</option>
                <option value='psv'>psv</option>
                </select>
            </div> 
            <div>
                <label className="text-white dark:text-gray-200">
                    Insurance Cover
                  </label>
                <select type="text" className="input input-warning "
                value={formData?.insuranceCover} {...register("insuranceCover", { required: true })} onChange={e => setFormData({ ...formData, insuranceCover: e.target.value })}
              >
                <option defaultValue={'false'} disabled>
Select Type of Insurance Cover
                </option>
                <option value='third party only'>third party only</option>
                <option value='third party fire and theft'>third party fire and theft</option>
                <option value='comprehensive'>Comprehensive</option>
                </select>
                </div>
            </div>
            <div class="flex justify-end mt-6">
                <button  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-gray-600">Submit Form</button>
            </div>
</form>
    </section>
    </div>
  )
}

export default ClaimForm