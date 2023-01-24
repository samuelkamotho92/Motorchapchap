import React from 'react'
import UserSidebar from '../partials/UserSidebar';
import ClaimTables from '../partials/ClaimTables';
function ClaimDetails() {
  return (
    <div className='flex flex-row mt-60px h-screen bg-base-200'>
<UserSidebar />
<ClaimTables />
    </div>
  )
}

export default ClaimDetails