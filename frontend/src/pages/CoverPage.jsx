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
width:50vw;
margin:0px auto;
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
display:flex;
align-items:center;
justify-content:center;
background-color:#82CD47;
width:50%;
height:45vh;
`;

const CoverPage = () => {
  const {claimId} = location.state;
  const getData = async()=>{
const url = `http://localhost:8080/api/claim/getClaim/${claimId}`
const resp = await fetch(url);
const data = await resp.json();
console.log(data);
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
Insurance Details
</CoverContainer>
    </Coverage>
  )
}

export default CoverPage