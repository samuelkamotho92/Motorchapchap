import React from 'react'
import { useContext ,useState ,useEffect} from 'react'
import { UseAuthContext } from '../context/Authcontext'
import {useForm} from 'react-hook-form';
import UserSidebar from '../partials/UserSidebar';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
function Profile() {
    const {register,formState:{errors},handleSubmit} = useForm();
    let {user} = useContext(UseAuthContext);
    console.log(user);

    useEffect(()=>{
      user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
    },[])
  return (
    <div className='flex flex-row mt-60px h-screen bg-base-200'>
<UserSidebar />
<section class="grid h-screen place-items-center  mx-auto">
    <form>
    <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account Details</h2>

        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="text-blue-600 dark:text-gray-200 text-2xl">firstname</label>
                <div>{user.user?.firstname}</div>
            </div>
  <div>
                <label class="text-blue-600 dark:text-gray-200 text-2xl">lastname</label>
                <div>{user.user?.lastname}</div>
            </div>

            <div>
                <label class="text-blue-600 dark:text-gray-200 text-2xl">National ID</label>
                <div>{user.user?.nationalID}</div>
            </div>

            <div>
                <label class="text-blue-600 dark:text-gray-200 text-2xl">Email</label>
                <div>{user.user?.email}</div>
            </div>
            <div>
                <label class="text-blue-600 dark:text-gray-200 text-2xl">Role</label>
                <div>{user.user?.role}</div>
            </div>
        </div>

        <div class="flex justify-end mt-6 text-2xl">
            <Link to='/settings' class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Update Details</Link>
        </div>
    </form>
</section>
    </div>
  )
}

export default Profile