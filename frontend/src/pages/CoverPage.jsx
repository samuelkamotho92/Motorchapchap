import React from 'react'
import Logo from '../images/Motorchapchap.png'
import Styled from 'styled-components';

const Coverage = Styled.div`
display:flex;
align-items:center;
juistify-content:center;
width:50vw;
`

const Header  = Styled.div`
display:flex;
justify-content:start;
width:50%;
height:70vh;
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

const CoverPage = () => {
  return (
    <div className='coverpage'>
        <Header>
<Mylogo src={Logo} alt='my logo'>

</Mylogo>
<Title>
File Copy <br />
          CERTIFICATE OF INSURANCE
</Title>
        </Header>
    </div>
  )
}

export default CoverPage