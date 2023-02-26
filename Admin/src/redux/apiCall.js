import { 
  loginFailure, 
  loginStart,
  loginSuccess,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure
} 
from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getClaimFailure,
  getClaimStart,
  getClaimSuccess,
  deleteClaimFailure,
  deleteClaimStart,
  deleteClaimSuccess,
  updateClaimFailure,
  updateClaimStart,
  updateClaimSuccess,
  addClaimFailure,
  addClaimStart,
  addClaimSuccess,
} from "./claimRedux";


export const login = async (dispatch, user) => {

  dispatch(loginStart());
  try {
    console.log(dispatch,user);
    const res = await publicRequest.post("Auth/signIn", user);
      dispatch(loginSuccess(res.data));

  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getClaims = async (dispatch) => {
  dispatch(getClaimStart());
  try {
    const res = await publicRequest.get("/claim/getClaims");
    let {getAllclaims} = res.data.data;
    const data = getAllclaims
    console.log(data);
    dispatch(getClaimSuccess(data));
  } catch (err) {
    dispatch(getClaimFailure());
  }
};

export const deleteClaims = async (id, dispatch) => {
  dispatch(deleteClaimStart());
  try {
     await userRequest.delete(`/claim/${id}`);
    dispatch(deleteClaimSuccess(id));
  } catch (err) {
    dispatch(deleteClaimFailure());
  }
};

export const updateClaim = async (id, updatedClaim, dispatch) => {
  dispatch(updateClaimStart());
  try {
    //update in mongodb
    await userRequest.patch(`/claim/${id}`,updatedClaim)
    // update in our state.
    dispatch(updateClaimSuccess({ id, updatedClaim }));
  } catch (err) {
    dispatch(updateClaimFailure());
  }
};
export const addClaim = async (claim, dispatch) => {
  dispatch(addClaimStart());
  try {
    const res = await userRequest.post(`/claim/createclaim`, claim);
    dispatch(addClaimSuccess(res.data));
  } catch (err) {
    dispatch(addClaimFailure());
  }
};


//user
export const getUsers = async (dispatch)=>{
dispatch(getUserStart());
try{
const res = await userRequest.get('/user/getUser');
console.log(res);
console.log(res.data);
dispatch(getUserSuccess(res.data));
}catch(err){
dispatch(getUserFailure());
}
}

//delete user 
export const deleteUser = async (id,dispatch)=>{
  dispatch(deleteUserStart())
  try
  {
    await userRequest.delete(`/user/${id}`);
    dispatch(deleteUserSuccess())
  }catch(err){
dispatch(deleteUserFailure());
  }
}

//update User
export const updateUser = async(id,user,dispatch)=>{
dispatch(updateUserStart())
try
{

dispatch(updateUserSuccess({id,user}))
}catch(err){
  dispatch(updateUserFailure)
}
}

//add user

export const addUser = async (user, dispatch) => {
  console.log(user);
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/user/createUser`, user);
    console.log(res);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};