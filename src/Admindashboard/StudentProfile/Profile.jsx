import React from 'react';
// import './dashboard.css'
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import {MdSchool} from 'react-icons/md';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import Paper from '@mui/material/Paper'; 
// import DatatableSprofile from '../MangerUser/DatatableSprofile';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'

const Profile = () => {
  return (
    <div>
       <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
      <Header/>
      <div className='text-center' style={{paddingTop:'20%'}}>
        <h3>Admin Profile</h3>
      </div>
    </div>
    </div>
  )
}

export default Profile
