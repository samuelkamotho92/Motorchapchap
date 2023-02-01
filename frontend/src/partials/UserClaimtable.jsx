import React, { useState, useEffect, useContext } from "react";
import { UseAuthContext } from "../context/Authcontext";
import {useForm} from 'react-hook-form';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
function UserClaimtable() {
  const { user } = useContext(UseAuthContext);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data)=>{
    console.log(data);
  };
  let email = user.user.email;
  const [claim, setclaims] = useState("");
  const [showModal,setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const getFormValue = (item)=>{
    console.log(item._id);
    setShowModal(true);
setFormData(item);
  }
  var data;
  const getMyClaims = async () => {
    const url = `http://localhost:8080/api/claim/getMyClaims`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      credentials: "include",
      withCredentials: true,
    });
    let getData = await resp.json();
    data = getData.data.getAllclaims;
    console.log(data);
    setclaims(data);
  };
  let arrclaim = Object.values(claim);
  console.log(arrclaim);
  useEffect(() => {
    getMyClaims();
  }, []);
  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">
        Claims Details
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="dark:bg-gray-700">
            <tr className="text-left">
              <th className="p-3">Claim ID</th>
              <th className="p-3">Car Owner</th>
              <th className="p-3">Reg no</th>
              <th className="p-3">Vehicle Type</th>
              <th className="p-3">Vehicle Purpose</th>
              <th className="p-3">Submitted On</th>
              <th className="p-3">Status</th>
              <th className="p-3">UPDATE</th>
              <th className="p-3">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {arrclaim.map((item,index) => (
              <>
                <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900" key={index}>
                  <td className="p-3">
                    <p>{item._id}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.carOwner}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.registrationNo}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.vehicleType}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.vehiclePurpose}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.dateSubmitted}</p>
                  </td>
                  <td className="p-3 text-right">
                    <span className="px-3 py-1 font-semibold rounded-md dark:bg-purple-400 dark:text-gray-900">
                      <button
                        className="btn btn-primary"
                        style={{ color: "teal" }}
                      >
                        {item.status}
                      </button>
                    </span>
                  </td>
                  <td className="p-3 text-right">
                  <button  className="btn btn btn-info btn-sm btn-outline" id={item._id} onClick={() => getFormValue(item)
                        }>
                          <FaPencilAlt />
                        </button>                  </td>
                  <td className="p-3 text-right">
                  <button className="btn  btn-error btn-outline  btn-sm" id={item._id} value={item._id} onClick={() => handleDelete({ "id": item._id, "photo": item.photo })}>
                          <FaTrashAlt />
                        </button>
                  </td>
                </tr>
              </>
            ))}
            {!arrclaim && (
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
                    <button
                      className="btn btn-primary"
                      style={{ color: "teal" }}
                    >
                      PENDING
                    </button>
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    className="btn btn-active btn-secondary"
                    style={{ color: "blue" }}
                  >
                    UPDATE
                  </button>
                </td>
                <td className="p-3 text-right">
                  <span className="px-3 py-1 font-semibold rounded-md dark:bg-purple-400 dark:text-gray-900">
                    <button className="btn btn-error" style={{ color: "red" }}>
                      DELETE
                    </button>
                  </span>
                </td>
              </tr>
            )}
            {
              showModal && (
  <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" data={formData}>
 <div className="relative w-auto my-6 mx-auto max-w-3xl">  
 <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
 <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
 <h3 className="text-3xl font=semibold">Update your details</h3>
 <button onClick={()=>setShowModal(false)}>
 <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
   </span>
  </button>
 </div>
 <div className="relative p-6 flex-auto">
 <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
              <label className="block text-black text-sm font-bold mb-1">
                Car Owner
               </label>
               <input type="text" className="input input-warning "
                value={formData?.carOwner} {...register("carOwner", { required: true })} onChange={e => setFormData({ ...formData, carOwner: e.target.value })}
              />
                 <label className="block text-black text-sm font-bold mb-1">
                      Registration Number
                    </label>
                <input type="text" className="input input-warning "
                value={formData?.registrationNo} {...register("registrationNo", { required: true })} onChange={e => setFormData({ ...formData, registrationNo: e.target.value })}
              />
               <label className="block text-black text-sm font-bold mb-1">
                      Vehicle Type
                    </label>
                <input type="text" className="input input-warning "
                value={formData?.vehicleType} {...register("vehicleType", { required: true })} onChange={e => setFormData({ ...formData, vehicleType: e.target.value })}
              />
                   <label className="block text-black text-sm font-bold mb-1">
                    Vehicle Purpose
                    </label>
                <input type="text" className="input input-warning "
                value={formData?.vehiclePurpose} {...register("vehiclePurpose", { required: true })} onChange={e => setFormData({ ...formData, vehiclePurpose: e.target.value })}
              />
              </form>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Submit
                  </button>
                </div>
 </div>
 </div>
 </div>
                </div>
              )}
          </tbody>
        </table>
        
      </div>
    </div>
  );
}

export default UserClaimtable;
