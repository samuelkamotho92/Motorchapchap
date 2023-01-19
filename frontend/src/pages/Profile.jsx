import React from 'react'
import { useContext ,useState} from 'react'
import { UseAuthContext } from '../context/Authcontext'
import {useForm} from 'react-hook-form';
import UserSidebar from '../partials/UserSidebar';
import { Link } from 'react-router-dom';
function Profile() {
    const {register,formState:{errors},handleSubmit} = useForm();
    const {user} = useContext(UseAuthContext);
    const {userData,setuserData} = useState('ddseeerrer');
    console.log(userData);
  return (
    <div className='flex flex-row mt-60px h-screen bg-base-200'>
<UserSidebar />

<section class="grid h-screen place-items-center  mx-auto">
    <form>
    <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account Details</h2>

        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="text-gray-700 dark:text-gray-200">firstname</label>
                <div>{user.user?.firstname}</div>
            </div>
  <div>
                <label class="text-gray-700 dark:text-gray-200" >lastname</label>
                <div>{user.user?.lastname}</div>
            </div>

            <div>
                <label class="text-gray-700 dark:text-gray-200">National ID</label>
                <div>{user.user?.nationalID}</div>
            </div>

            <div>
                <label class="text-gray-700 dark:text-gray-200">Email</label>
                <div>{user.user?.email}</div>
            </div>
            <div>
                <label class="text-gray-700 dark:text-gray-200">Role</label>
                <div>{user.user?.role}</div>
            </div>
        </div>

        <div class="flex justify-end mt-6">
            <Link to='/settings' class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Update Details</Link>
        </div>
    </form>
</section>
    </div>
  )
}

export default Profile