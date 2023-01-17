import {React, useContext } from "react";
import { UseAuthContext } from "../context/Authcontext";

export const UseAuthHook = ()=>{
const consumeContext = useContext(UseAuthContext);


return consumeContext;

}
