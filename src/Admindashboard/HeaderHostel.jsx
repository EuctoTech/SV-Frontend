import React from 'react';
import './dashboard.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';
import {BsSearch} from 'react-icons/bs';
import { NavLink } from "react-router-dom";
import Notification from './Notification';


const HeaderHostel = () => {
  return (
    <div className='headerNav'>
        <Navbar  style={{backgroundColor:'#CDCDCD'}}>
      <Container style={{width: '100%', float: "left", display: 'flex'}}>
      {/*   <div class="box">
           <BsSearch size={20}/>
           <input type="text" name="" placeholder='Search Here.....'/> 
         </div>className='typed'*/}
         <div>
          <h2  style={{fontFamily: 'initial'}}>Santhosha Vidhyalaya School</h2>
         </div>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
     <Stack direction="row" spacing={4}>
        <div className='pe-5'>
         <NavLink to="/Admindashboard/Hostel/HotelChangePass" style={{textDecoration:'none'}}> 
          <Avatar sx={{ bgcolor: deepPurple[500] }} alt="Hosteler" src="/static/images/avatar/3.jpg"/>
        </NavLink>  
        </div>
       </Stack> 
        </Navbar.Collapse>
      </Container>
       </Navbar>
    </div>
  )
}

export default HeaderHostel