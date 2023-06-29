import { createContext, useReducer ,useEffect } from "react";
const initialState = {
user:JSON.parse(localStorage.getItem('user')) || null
}
console.log(initialState);
export const UseAuthContext = createContext(initialState);

//check user from the local storage

//useReducers

const authReducer = (state,action)=>{
 switch (action.type) {
        case 'LOGIN':
             return {
            user: action.payload
        }
        case 'LOGOUT':
            return {
                user:action.payload
            }
        case 'UPDATE':
            return{
                user:action.payload
            }
        
        default:
    return state
    }
}


export  const UseAuthProvider = ({children})=>{
    const [state,dispatch] = useReducer(authReducer,{
user:null
    });
    useEffect(()=>{
 const user = JSON.parse(localStorage.getItem('user'));
 if(user){
    dispatch({type:'LOGIN',payload:user})
 }
    },[])
    console.log(state);
return (
<UseAuthContext.Provider value={{...state,dispatch}}>
{children}
    </UseAuthContext.Provider>
)
}