import React , {useState}from 'react'
import { UseAuthHook } from './UserAuthHook';
 export const signInhook = ()=>{
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);
    const {dispatch} = UseAuthHook()
    const signIn = async(email,password)=>{
        setError(null);
        setLoading(true);
        const url = 'http://localhost:8080/api/Auth/signIn'
        const resp = await fetch(url,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
          body:JSON.stringify({email,password}),
          credentials: 'include',
          withCredentials:true
        });
        const data = await resp.json();
        if(!resp.ok){
    //         console.log(data.error)
    //   const myError =  Object.values(data.error);
    //   console.log(...myError);
    //         setError(...myError);
    //         setLoading(false);
    console.log(data);
    alert(data.message);
        }
        if(resp.ok){
                //set the token and useron frontend
    localStorage.setItem('user',JSON.stringify(data));
    dispatch({type:'LOGIN',payload:data});
    // window.location.replace('/');
setLoading(false);
        }
    }
    return {signIn,error,loading}
 }