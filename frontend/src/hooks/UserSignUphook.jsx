import React , {useState}from 'react'
import { UseAuthHook } from './UserAuthHook';
 export const signUphook = ()=>{
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);
    const {dispatch} = UseAuthHook()
    const signUp = async(firstname,lastname,email,nationalID,password,passwordConfirm)=>{
        setError(null);
        setLoading(true);
        const url = 'http://localhost:8080/api/Auth/signUp'
        const resp = await fetch(url,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
          body:JSON.stringify({firstname,lastname,email,nationalID,password,passwordConfirm}),
          credentials: 'include',
          withCredentials:true
        });
        const data = await resp.json();
        if(!resp.ok){
            console.log(data.error)
      const myError =  Object.values(data.error);
      console.log(...myError);
            setError(...myError);
            setLoading(false);
        }
        if(resp.ok){
                //set the token and useron frontend
    localStorage.setItem('user',JSON.stringify(data));
    dispatch({type:'LOGIN',payload:data});
    window.location.replace('/');
setLoading(false);
        }
    }
    return {signUp,error,loading}
 }