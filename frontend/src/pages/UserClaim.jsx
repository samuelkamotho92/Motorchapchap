import React from 'react'
import UserSidebar from '../partials/UserSidebar';
import UserClaimtable from '../partials/UserClaimtable';
function UserClaim() {
  return (
    <div className='flex flex-row mt-60px h-screen bg-base-200'>
<UserSidebar />
<UserClaimtable />
    </div>
  )
}

export default UserClaim