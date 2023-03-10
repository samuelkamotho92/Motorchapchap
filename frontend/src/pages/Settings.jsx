import React,{useState,useContext} from 'react';
import UserSidebar from '../partials/UserSidebar';
import {useForm} from 'react-hook-form';
import imagePlaceholder from '../images/kevo.png';
import {UserUpdateHook} from '../hooks/UserUpdateHook';
import { UseAuthContext } from '../context/Authcontext';

function Settings() {
    const {user} = useContext(UseAuthContext);
    const { register, handleSubmit, watch , formState: { errors } } = useForm({
        defaultValues:{
            firstname:user.user.firstname,
            lastname:user.user.lastname,
            email:user.user.email,
            nationalID:user.user.nationalID
    }});
const {updateUser,error} = UserUpdateHook();
    const onSubmit = async (data,e)=>{
        e.preventDefault();
        const {firstname,lastname,email,nationalID} = data
await updateUser(firstname,lastname,email,nationalID);
    }
  return (
    <div className='flex flex-row mt-60px h-screen bg-base-200'>
    <UserSidebar />
    
    <section class="grid h-screen place-items-center  mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
        <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account Details</h2>
    
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label class="text-blue-600 dark:text-gray-200">firstname</label>
                    <input {...register('firstname',{required:true})} type='text' />
                    {errors.firstname?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">firstname is required 😶</p>}

                </div>
      <div>
                    <label class="text-blue-600 dark:text-gray-200" >lastname</label>
                    <input {...register('lastname',{required:true})} type='text'/>
                    {errors.lastname?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">lastname is required 😶</p>}
                </div>
    
                <div>
                    <label class="text-blue-600 dark:text-gray-200">National ID</label>
                    <input {...register('nationalID',{required:true,minLength:{
                         value:8,
                         message:'min length is less than 8 ❌'
                    }})} type='text'/>
                    {errors.nationalID?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">nationalID is required 😶</p>}

                </div>
    
                <div>
                    <label class="text-blue-600 dark:text-gray-200">Email</label>
                    <input {...register('email',{required:true})} type='text'/>
                    {errors.email?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">email is required 😶</p>}
                </div>
            </div>
            <div class="flex justify-end mt-6">
                <button  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Update Details</button>
            </div>
        </form>
    </section>
        </div>

  
  )
}

export default Settings