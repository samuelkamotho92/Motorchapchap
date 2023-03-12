import React from 'react'
import Logo from '../images/Motorchapchap.png'
import Styled from 'styled-components';
import {useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
const Coverage = Styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:100vw;
margin:0px auto;
position:relative;
`

const Header  = Styled.div`
display:flex;
justify-content:start;
width:50%;
background-color:wheat;
margin:0px auto;
`;
const Mylogo = Styled.img`
flex:1;
height:100px;
width:100px;
`;
const Title = Styled.h1`
flex:2;
`;

const CoverContainer = Styled.div`
background-color:#C9F4AA;
width:50%;
height:50vh;
`;
const CoverDetails = Styled.div`
`

const Button = Styled.button`
background-color:teal;
padding:5px;
margin:0px 5px;
transition:all 1s ease;
&:hover{
  background-color:crimson;
}
`;

const CoverPage = () => {
  const location = useLocation();
  const {claimId} = location.state;
  const [coverowner,setcoverowner] = useState();
  const [coverReg,setcoverReg] = useState();
  const [coverSub,setcoverSub] = useState();
  const [phoneNo,setphoneNo] = useState();
  const [insuCov,setinsuCov] = useState();
  let fullDate;
  let endDate;
  const getData = async()=>{
const url = `http://localhost:8080/api/claim/${claimId}`
const resp = await fetch(url);
const {data} = await resp.json();
let {carOwner,registrationNo,dateSubmitted,phoneNumber,vehiclePurpose} = data.getOneClaim;
setcoverowner(carOwner);
setcoverReg(registrationNo);
setcoverSub(dateSubmitted);
setphoneNo(phoneNumber);
setinsuCov(vehiclePurpose)
  }
const dateConvert = (coverSub)=>{
const mydate = new Date(coverSub);
let dateValue = mydate.getDate();
let mthValue = mydate.getMonth();
let yearValue = mydate.getFullYear();
fullDate = `${dateValue}-${mthValue}-${yearValue}`;
let expiryValue =  new Date(mydate.setFullYear(mydate.getFullYear()+1));
let expiryDate = expiryValue.getDate();
let expiryMth = expiryValue.getMonth();
let expiryYear = expiryValue.getFullYear();
endDate = `${expiryDate}-${expiryMth}-${expiryYear}`;
}
dateConvert(coverSub);
const printCover = ()=>{
  console.log('printing');
window.print();
}
  useEffect(()=>{
getData();
  },[])
  return (
    <Coverage>
        <Header>
<Mylogo src={Logo} alt='my logo'>
</Mylogo>
<Title>
File Copy <br />
CERTIFICATE OF INSURANCE
</Title>
        </Header>
<CoverContainer>
<h3 style={{textAlign:'center',color:'red'}}>No:{claimId.slice(0,7)}</h3>
<CoverDetails>
  <p style={{fontSize:'20px'}}>Policy Holder: {coverowner}</p>
  <p style={{fontSize:'20px'}}>Policy No: {claimId}</p>
  <p style={{fontSize:'20px'}}>Commencing Date: {fullDate}</p>
  <h3 style={{fontSize:'24px',fontWeight:'bolder',margin:"5px opx"}}>EXPIRING ON: {endDate}</h3>
  <p style={{fontSize:'20px'}}>REG NO:{coverReg}</p>
  <p style={{fontSize:'20px'}}>Phone Number:{phoneNo}</p>
  <h3 style={{textAlign:'center',color:'red',fontSize:'24px'}}>{insuCov} Car</h3>
  <Button onClick={printCover}>
  PRINT COVER
  </Button>
</CoverDetails>

</CoverContainer>
    </Coverage>
  )
}

export default CoverPage