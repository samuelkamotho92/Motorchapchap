import { createContext, useReducer } from "react";
export const UseAuthContext = createContext();

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
        
        default:
    return state
    }
}


export  const UseAuthProvider = ({children})=>{
    const [state,dispatch] = useReducer(authReducer,{
user:null
    });
    console.log(state);
return (
<UseAuthContext.Provider value={{...state,dispatch}}>
{children}
    </UseAuthContext.Provider>
)
}