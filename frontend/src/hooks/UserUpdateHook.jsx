import React,{useState,useContext} from 'react'
import { UseAuthHook } from './UserAuthHook'
import { UseAuthContext } from '../context/Authcontext';
export const  UserUpdateHook = ()=>{
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);
    const {user,dispatch} = useContext(UseAuthContext);
    const id = user.user._id;
    console.log(id);
const updateUser = async (firstname,lastname,email,nationalID)=>{
const url = `http://localhost:8080/api/user/${id}`;
console.log(url);
const resp = await fetch(url,{
    method:'PATCH',
    headers:{"Content-Type":"application/json"},
      body:JSON.stringify({firstname,lastname,email,nationalID}),
      credentials: 'include',
      withCredentials:true
})
const data = await resp.json();
const {user} = data;
console.log(user);
if(!resp.ok){
    console.log(data.error)
    const myError =  Object.values(data.error);
    console.log(...myError);
          setError(...myError);
          setLoading(false);
}
if(resp.ok){
    localStorage.setItem('user',JSON.stringify(data));
    // dispatch({type:'UPDATE',payload:data});
    alert('user details updated');
    window.location.replace('/');
}
    }
return {updateUser}
}

export default UserUpdateHook