import React,{useState} from 'react'
import { UseAuthHook } from './UserAuthHook'
export const  UserUpdateHook = ()=>{
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);
const updateUser = async (firstname,lastname,email,nationalID,password)=>{
const url = `http://localhost:8080/api/User/updateuser`;
const resp = await fetch(url,{
    method:'POST',
    headers:{"Content-Type":"application/json"},
      body:JSON.stringify({firstname,lastname,email,nationalID,password}),
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
    dispatch({type:'UPDATE',payload:data});
}
    }
return {updateUser}
}

export default UserUpdateHook