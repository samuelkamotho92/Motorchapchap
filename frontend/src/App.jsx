import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import UserProfile from './pages/Profile';
import Settings from './pages/Settings';
import ClaimForm from './pages/ClaimForm';
import ClaimDetails from './pages/ClaimDetails';
import UserClaim from './pages/UserClaim';
import Checkout from './pages/Checkoutpage';
import InsuranceCover from './pages/InsuranceCover';
import CoverPage from './pages/CoverPage';
function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      <Route path='/profile' element={<UserProfile />}> </Route>
      <Route path='/settings' element={<Settings />}></Route>
      <Route path='/claimForm' element={<ClaimForm />}></Route>
      <Route path='/claimDetails' element={<ClaimDetails />}></Route>
      <Route path='/userclaimDetails' element={<UserClaim />}></Route>
      <Route path='/checkout' element={<Checkout />}></Route>
      <Route path='/insuranceCover' element={<InsuranceCover />}></Route>
      <Route path='/coverPage' element={<CoverPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
