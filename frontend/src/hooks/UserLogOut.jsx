import { UseAuthContext } from "../context/Authcontext";
export const UserLogOutHook = ()=>{
        const logOut = ()=>{
            localStorage.removeItem('user');
            dispatch({type:'LOGOUT'})
        }
        window.location.replace('/');
        return {logOut}
}