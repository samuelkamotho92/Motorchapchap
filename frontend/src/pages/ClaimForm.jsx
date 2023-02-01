import React,{useContext} from 'react'
import UserSidebar from '../partials/UserSidebar'
import {useForm} from 'react-hook-form'
import { UseAuthContext } from '../context/Authcontext';
function ClaimForm() {
  const {user} = useContext(UseAuthContext);
  let submittedBy = user.user.email;
  console.log(submittedBy);
  const {register,handleSubmit,watch,formState:{errors}} = useForm({
    defaultValues:{
      carOwner:'firstname lastname',
      registrationNo:'KXX:000A'
    }
  });
  const url = `http://localhost:8080/api/claim/createClaim`;
  const onSubmit =  async(data)=>{
const {carOwner,registrationNo,vehicleType,purpose} = data;
console.log(carOwner,registrationNo,vehicleType,purpose);
const resp = await fetch(url,
  {
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({carOwner,registrationNo,vehicleType,purpose,submittedBy}),
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
      <section class="grid h-screen place-items-center  mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
        <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Claims Form</h2>
    
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label class="text-blue-700 dark:text-gray-200">Car Owner</label>
                    <input {...register('carOwner',{required:true})} type='text' />
                    {errors.carOwner?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">Car Owner is required 😶</p>}

                </div>
      <div>
                    <label class="text-blue-600 dark:text-gray-200">Registration Number</label>
                    <input {...register('registrationNo',{required:true,minLength:{
                      value:6,
                      message:'min length is less than 6'
                    }})} type='text'/>
                    {errors.registrationNo?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">Regsitration number is required 😶</p>}
                </div>
    
                <div>
                    <label class="text-blue-600 dark:text-gray-200">Vehicle Type</label>
                    <input {...register('vehicleType',{required:true})} type='text'/>
                    {errors.vehicleType?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">Vehicle Type is required 😶</p>}

                </div>
    
                <div>
                    <label class="text-blue-600 dark:text-gray-200">Vehicle Purpose</label>
                    <input {...register('vehiclePurpose',{required:true})} type='text'/>
                    {errors.purpose?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">Vehicle purpose is required 😶</p>}
                </div>
            </div>
            <div class="flex justify-end mt-6">
                <button  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submitted Form</button>
            </div>
        </form>
    </section>
    </div>
  )
}

export default ClaimForm