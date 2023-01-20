import React from 'react'
import { UseAuthHook } from './UserAuthHook'
function UserUpdateHook() {

    const updateUser = async (firstname,lastname,email,nationalID,password)=>{
const url = `http://localhost:8080/api/Auth/updateuser`;
const resp = await fetch(url,{
    method:'POST',
    headers:{"Content-Type":"application/json"},
      body:JSON.stringify({firstname,lastname,email,nationalID,password}),
      credentials: 'include',
      withCredentials:true
})
const data = await resp.json();
const {user} = data;
    }
    if(!resp.ok){
alert(data.message);
    }
    if(resp.ok){
        localStorage.setItem('user',JSON.stringify(data));
        dispatch({type:'UPDATE',payload:data});
    }

return {updateUser}
}

export default UserUpdateHook