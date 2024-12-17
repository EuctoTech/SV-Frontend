import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import Footer from '../Admindashboard/Footer'
import Logo from '../Admindashboard/logo.jpeg';
import {Col, Row} from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import StudentImage from '../Admindashboard/StudentSVSMain.jpg';
import SponsorImage from '../Admindashboard/SponsorImage.jpg';
import Adminer from '../Admindashboard/Adminer.jpg';
import Swal from 'sweetalert2';
import newlogo from "../images/newlogo.jpg"





import { useHistory } from 'react-router-dom';

const handleClick = () => {
  Swal.fire({
    title: 'Only Admin should access the login!',
    text: 'Students and Sponsors are not allowed to access!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2F6D24',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, I am the admin!',
    input: 'text', // Add an input field to the Swal alert
    inputPlaceholder: 'Enter your admin credentials',
    inputAttributes: {
      autocomplete: 'off' // Disable autocomplete
  }
  }).then((result) => {
    if (result.isConfirmed) {
      const enteredInput = result.value; // Get the entered input from the Swal result
      const validInput = 'svsadmin@123'; // Replace this with your actual valid input

      if (enteredInput === validInput) {
        window.location.href = '/svsportaladmintest/LoginAdmin';
      } else {
        Swal.fire('Incorrect input!', 'Please try again.', 'error');
      }
    }
  });
};




const Main = () => {
  return (
    <div>
      <div className='pt-5 DesktopresponsiveMain'>
        <img className='Logo-image' style={{width:'10%',display: 'block',marginLeft: 'auto',marginRight: 'auto'}}  src={newlogo}  alt="School Logo" />
        <Flip>
        <h2 style={{textAlign:'center', paddingTop:'10px',fontFamily: 'ui-serif',fontWeight: '600',}} >Santhosha Vidhyalaya Online Fee Management Portal</h2>
        </Flip>
      </div>
      
      <div className='pt-5 d-flex responsiveMain' >
        <Row>
          <Col xs={2}>
              <img className='Logo-image' style={{width:'100%'}}  src={newlogo}  alt="School Logo" />
          </Col>
          <Col xs={10}>
             <h2 style={{fontFamily: 'ui-serif',fontWeight: '600', alignItems:'center',margin: '5px 0'}}  >Santhosha Vidhyalaya Online Fee Management system</h2>
          </Col>
        </Row>
      </div>

      <div className='container'>
      <Fade bottom big>
        <div className='row pb-3 circular_imageAll ' style={{justifyContent:'space-between',display:'flex',paddingTop:'40px'}}>
          
           <div className='col-md-2 offset-md-2 exploreProduct'>
           <a href='https://santhoshavidhyalaya.com/svsportaladmintest/'> <img  className='circular_image' src={StudentImage} alt='imag-1'/></a>
             <h4 className='roundSection' style={{ textAlign: 'inherit',padding: '10px 56px',fontFamily: 'Roboto, sans-serif',fontWeight: '400'}} >Student</h4>
           </div>
           <div className='col-md-2 exploreProduct'>
             <a href='https://santhoshavidhyalaya.com/svsportaladmintest/'><img  className='circular_image' src={SponsorImage} alt='imag-1'/></a>
             <h4 className='roundSection' style={{ textAlign: 'inherit',padding: '10px 61px',fontFamily: 'Roboto, sans-serif',fontWeight: '400'}} >Sponsor</h4>
           </div>
           <div className='col-md-4  exploreProduct'>
           {/* <NavLink to="/LoginAdmin"> */}
             <img onClick={handleClick} className='circular_image' src={Adminer} alt='imag-1'/>
             <h4 className='roundSection' style={{ textAlign: 'inherit',padding: '10px 71px',fontFamily: 'Roboto, sans-serif',fontWeight: '400'}} >Admin</h4>
           </div>
        </div>
      </Fade>
      </div>
      <div className='footer'>
        <footer className="text-lg-start "> 
          <div className="p-3" style={{backgroundColor:'#afafaf',fontSize:'smaller'}}>
          <div className='text-start'> © 2023 Copyright:
            <a className="text-dark ps-2" target="_blank" href="https://www.santhoshavidhyalaya.com/">santhoshavidhyalaya</a>
          <div className='text-end' style={{float:'right'}}>VERSION 1.0.0</div>
        </div>
        </div>
      </footer>
    </div>
    </div>
  )
}

export default Main
