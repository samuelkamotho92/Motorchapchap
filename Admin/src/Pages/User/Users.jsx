import React,{useState,useEffect,useMemo} from 'react'
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
  import { Link, useLocation } from 'react-router-dom';
import './Users.css'
import { useSelector } from 'react-redux';
import { userRequest } from '../../requestMethods';
import {format} from 'timeago.js';
import { useDispatch } from 'react-redux';
import {updateUser} from '../../redux/apiCall'

const Users = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  console.log(userId)
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.currentUser.find((user)=>user._id === userId));
  console.log(userId,user);
 
const [inputs,setInputs] = useState();
const handleChange = (e)=>{
  setInputs((prev)=>{
    console.log({...prev,[e.target.name]:e.target.value})
    return {...prev,[e.target.name]:e.target.value}
  })
}

const handleClick = (e)=>{
  console.log('updating');
  e.preventDefault();
  console.log({...inputs});
  const updUser = {...inputs}
  console.log(updUser)
  updateUser(userId,updUser,dispatch)
  alert('user updated');
  window.location.replace('/');
}

  return (
<div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.firstname}</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.lastname}</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.nationalID}</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.role}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{`Created:${format(user.createdAt)}`}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>firstname</label>
                <input
                  type="text"
                  placeholder={user.firstname}
                  className="userUpdateInput"
                  name='firstname'
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>lastname</label>
                <input
                  type="text"
                  placeholder={user.lastname}
                  name='lastname'
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  name='email'
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>National ID</label>
                <input
                  type="text"
                  placeholder={user.nationalID}
                  name='nationalID'
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Role</label>
                <input
                  type="text"
                  placeholder={user.role}
                  name='role'
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={handleClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Users
