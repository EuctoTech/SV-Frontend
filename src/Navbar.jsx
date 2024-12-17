import React from 'react';
import './nav.css';
import {VscHome} from 'react-icons/vsc'
import {CgProfile} from 'react-icons/cg'
import {GiBanknote} from 'react-icons/gi'
import {TbLogout} from 'react-icons/tb'
import {MdOutlinePayments, MdViewWeek} from 'react-icons/md';
import Badge from '@mui/material/Badge';
import {IoMdNotificationsOutline} from 'react-icons/io';
// import logo from './Assets/logo.png';
import logo from '../src/StudentAndSponsor/pages/Svs-invoice.jpg';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
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
        sessionStorage.removeItem('student_info');
  
  
  // setIsLoggedIn(false);
  
  
  // Store the response data in session storage 
  console.log("logout");
    window.location.href = '/svsportaladmintest/LoginAdmin';
  } catch (error) {
  console.error(error);
  }
};
  
const Navbar = ({ currentPage }) => {
  const currentPath = window.location.pathname;

  return (
    <div>
      <nav className='navbar'>
    <span className="boxlogo" style={{padding:'4px'}}>  <img 
  src={logo} 
  className="logoSVS" 
  style={{
    // paddingLeft: '10px',
    borderRadius: '50%',
    border: '1px solid white',  // White border
    boxShadow: '0 0 1px 1px rgba(255, 255, 255, 0.8)', // Default glowing effect
    width: '100px', // Adjust size
    height: '100px' // Ensure it's a square shape
  }} 
  alt="logo" 
/>
        </span>
        <span className="boxhead" style={{padding:'4px'}}>
          <h3 className='SchoolNameNav ps-2 pt-2'>Santhosha Vidhyalaya Online Fee Management Portal</h3>
       </span> 
          <ul className='desktop-list pt-2'>
    <li className='menuText'>
        <a style={{ color: '#fff' }} href='/svsportaladmintest/student/dashboard'>
            Dashboard
        </a>
    </li>
    {currentPath === '/svsportaladmintest/student/dashboard' && (
        <li className='menuText'>
            <a  href='/svsportaladmintest/Payfees'
                style={{ color: '#fff', cursor: 'pointer' }}
                onClick={() => window.scrollTo(0, document.body.scrollHeight)}
            >
               Terms of Use 
            </a>
        </li>
    )}
    <li className='menuText'>
        <a style={{ color: '#fff' }} href='/svsportaladmintest/report'>
            Report
        </a>
    </li>
    <li className='menuText'>
        <a style={{ color: '#fff' }} href='/svsportaladmintest/Myprofile'>
            My Profile
        </a>
    </li>
    <li>
        <a style={{ cursor: 'pointer' }} onClick={handleLogout}>
            <TbLogout size={24} style={{ color: 'red' }} />
        </a>
    </li>
</ul>

{/*---------- mobile View ---------------------------------*/}
        <ul className='mobile-list'>
            <li><a href='/svsportaladmintest/student/dashboard'><VscHome size={35} className='recticons'/></a></li>
            <li><a href='/svsportaladmintest/Payfees'><MdOutlinePayments size={35} className='recticons'/></a></li>
            <li><a href='/svsportaladmintest/report'><MdViewWeek size={35} className='recticons'/></a></li>
            {/* <li><a href='#'>
              <Badge badgeContent={4} color="error">
                <IoMdNotificationsOutline size={35} className='recticons' color="action" />
             </Badge></a>
            </li> */}
            <li>
              <a href='/svsportaladmintest/Myprofile'>
              <Stack direction="row" spacing={2}>
              <Avatar alt="Remy Sharp" src={logo} />
              </Stack>
              </a>
            </li>
            <li>
              <a onClick={handleLogout} ><TbLogout size={35} style={{color:'#FFD404', paddingBottom:'6px'}} /></a>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
