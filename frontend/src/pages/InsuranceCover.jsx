import React,{useState,useEffect} from 'react'
import UserSidebar from '../partials/UserSidebar'
import {FaShoppingCart,FaDownload} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const InsuranceCover = () => {
const [approvedClaims,setapproveClaim] = useState('');
let data;
const getAllApproved = async()=>{
const url = `http://localhost:8080/api/claim/getApproved`;
const resp = await fetch(url);
let getData = await resp.json();
data = getData.data.myApproved;
console.log(data);
setapproveClaim(data);
}
let appr = Object.values(approvedClaims);
    useEffect(()=>{
getAllApproved();
    },[])



  return (
    <div className='flex flex-row mt-60px h-screen bg-base-200'>
        <UserSidebar />
<div className='container p-2 mx-auto sm:p-4 dark:text-gray-100'>
<h2 className='mb-4 text-2xl font-semibold leading-tight'>
    Insurance Cover
</h2>
<div className='overflow-x-auto'>
<table className='min-w-full text-xs'>
<thead className='dark:bg-gray-700'>
<tr className='text-left'>
<th className='p-2'>Claim ID</th>
<th className='p-2'>Car Owner</th>
<th className='p-2'>Mobile Number</th>
<th className='p-2'>Vehicle Reg no</th>
<th className='p-2'>Insurance Cover</th>
<th className='p-2'>Amount Paid</th>
<th className='p-2'>Payment Status</th>
<th className='p-2'>PAY</th>
<th className='p-2'>DOWNLOAD</th>
</tr>
</thead>
<tbody>
    {
        appr.map((item,index)=>(
<tr className='border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900' key={index}>
<>
<td className='p-2'>
<p>{item._id.slice(0,7)}</p>
</td>
<td>
    <p>{item.carOwner}</p>
</td>
<td>
    <p>{item.phoneNumber}</p>
</td>
<td>
    <p>{item.registrationNo}</p>
</td>
<td>
    <p>{item.insuranceCover}</p>
</td>
<td>
    <p>{item.amount}</p>
</td>
<td>
    <p>{item.paymentStatus}</p>
</td>
<td>

    <Link to='/checkout'>
<button className="btn btn btn-info btn-sm btn-outline" 
>
    <FaShoppingCart />
</button> 
    </Link>
</td>
<td>
<button className='btn btn btn-info btn-sm btn-outline'>
<FaDownload />
</button>
</td>
</>
</tr> 
        ))
    }

</tbody>
</table>
</div>
    </div>
    </div>

  )
}

export default InsuranceCover