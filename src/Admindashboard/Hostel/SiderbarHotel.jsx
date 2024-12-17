import React,{useState} from 'react';
import logo from '../logo.jpeg'
import {FaSchool} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
import {RiLockPasswordFill} from 'react-icons/ri';
import axios from 'axios';

const userId = sessionStorage.getItem('token_id');
const accessToken = sessionStorage.getItem('accessToken');

const handleLogout = async () => {
try {
const payload = {
 id: userId
 };
 const config = {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
};
const response = await axios.post('https://www.santhoshavidhyalaya.com/SVSTEST/api/logout', payload,config);

// const response = await axios.post('http://127.0.0.1:8000/api/logout', payload, config);
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('user_type');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('token_id');


// setIsLoggedIn(false);


// Store the response data in session storage 
console.log("logout");
  window.location.href = '/svsportaladmintest/';
} catch (error) {
console.error(error);
}
};


const SiderbarHotel = () => {

  return (
    <div>
    <div className="sidebar">
      <div className='damDiv'>
        <div className='row' >
          <div style={{backgroundColor:'#192F59',borderRight:'1px solid'}} className='col-auto col-sm-12  d-flex flex-column justify-content-between min-vh-100 p-0'>
            <div className=''>
                <div className='bg-white'>
                  <img style={{width:'40%',paddingLeft:'10px'}} src={logo} alt='logo' />
                  {/* <AiOutlineMenu onClick={notify} className='navmenuside'/> */}
                </div>

                <div className='damIt'>
                  <div>
                  <ul class="nav nav-pills flex-column mt-2 mt-sm-0" id="parentM">

    {/*-------------------- Hostel -----------------------------------------------*/}
                  <li class="nav-item my-1 py-2 py-sm-0">
                    <a href="/svsportaladmintest/Admindashboard/Hostel/HostelFeeMap " className="nav-link text-white text-center text-sm-start menuText" aria-current="page">
                      <FaSchool size={25}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline menuSpanText'>Mapping hostel fees</span>
                    </a>
                  </li>
    {/*-------------------- Chnage Password -----------------------------------------------*/}
                  <li class="nav-item my-1 py-2 py-sm-0">
                    <a href="/svsportaladmintest/Admindashboard/Hostel/HotelChangePass" className="nav-link text-white text-center text-sm-start menuText" aria-current="page">
                      <RiLockPasswordFill size={25}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline menuSpanText'>Change Password</span>
                    </a>
                  </li>
                  </ul>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <div className='pb-2 ps-4 ' style={{position: 'fixed',top: '90%',width: '17%',background: '#192f59',zIndex: '9999'}}>
        <div>
            <hr className='text-white'/> 
        </div> 
             <h6 onClick={handleLogout} className='text-danger' style={{fontSize:'20px',cursor:'pointer'}}><FiLogOut size={30} className='pe-2'/>Logout</h6>
        </div>
        </div>
  )
}

export default SiderbarHotel


