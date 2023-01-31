import React,{useState,useEffect} from 'react';
function ClaimTables() {
	const [claim,setclaims] = useState('');
	const getMyClaims = async ()=>{
		const url = `http://localhost:8080/api/claim/getClaims`;
		const resp = await fetch(url);
		const {data} = await resp.json();
		const  {getAllclaims} = data;
		setclaims(getAllclaims);
		console.log(getAllclaims);
	}
	useEffect(()=>{
	getMyClaims();
	},[]);
  return (
 <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
    <h2 className="mb-4 text-2xl font-semibold leading-tight"> Invoices</h2>
    <div className='overflow-x-auto'>
<table className='min-w-full text-xs'>
<colgroup>
<col />
<col />
<col />
<col />
<col />
<col  className='w-24' />
</colgroup>
<thead className="dark:bg-gray-700">
				<tr className="text-left">
					<th className="p-3">Claim ID</th>
					<th className="p-3">Car Owner</th>
					<th className="p-3">Reg no</th>
					<th className="p-3">Vehicle Type</th>
					<th className="p-3">Vehicle Purpose</th>
                    <th className='p-3'>Submitted On</th>
					<th className="p-3">Status</th>
                    <th className="p-3">UPDATE</th>
                    <th className="p-3">DELETE</th>
				</tr>
			</thead>
            <tbody>
				{
				claim?.map(item=>console.log(item))
				}
				<tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
					<td className="p-3">
						<p>97412378923</p>
					</td>
					<td className="p-3">
						<p>Samuel Kamotho</p>
					</td>
                    <td className="p-3">
						<p>KBZ:123X</p>
					</td>
                    <td className="p-3">
						<p>BMW</p>
					</td>
                    <td className="p-3">
						<p>Personal</p>
					</td>
					<td className="p-3">
						<p>14 Jan 2022</p>
						<p className="dark:text-gray-400">Friday</p>
					</td>
					<td className="p-3 text-right">
						<span className="px-3 py-1 font-semibold rounded-md dark:bg-purple-400 dark:text-gray-900">
						<button className="btn btn-primary" style={{color:'teal'}}>PENDING</button>
						</span>
					</td>
                    <td className="p-3 text-right">
	
						<button className="btn btn-active btn-secondary" style={{color:'blue'}}>UPDATE</button>
					</td>
                    <td className="p-3 text-right">
						<span className="px-3 py-1 font-semibold rounded-md dark:bg-purple-400 dark:text-gray-900">
						<button className="btn btn-error" style={{color:'red'}}>DELETE</button>
						</span>
					</td>
				</tr>
			</tbody>
</table>
    </div>
 </div>

  )
}

export default ClaimTables