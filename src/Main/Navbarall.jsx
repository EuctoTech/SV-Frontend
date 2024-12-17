import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { NavLink } from "react-router-dom";
import { AiOutlineMail } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';
import Navbar from 'react-bootstrap/Navbar';
import logoProlife from '../images/prolife-logo.png';
import {LiaFileInvoiceDollarSolid} from 'react-icons/lia'
import {FaHandHoldingMedical} from 'react-icons/fa'
import {IoGitCompareOutline} from 'react-icons/io5'
import {MdOutlineAppRegistration} from 'react-icons/md';
import {IoCalendarSharp} from 'react-icons/io5';
import {FaUserShield} from 'react-icons/fa';
import {AiOutlineDashboard} from 'react-icons/ai';


const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`}>
      <a href="javascript:void(0)" className="closebtn" onClick={onClose}>
        &times;
      </a>
      <NavLink to='/Main/Dashboard' className='DashboardBox'><AiOutlineDashboard size={35} className='mr-3'/>Dashboard</NavLink><hr/>
      <NavLink to='/Main/Appoinment/AppointmentList' className='DashboardBox'><IoCalendarSharp size={35} className='mr-3'/>Appointment</NavLink><hr/>
      <NavLink to='/Main/Registration/Registrations' className='DashboardBox'><MdOutlineAppRegistration size={35} className='mr-3'/>Registration</NavLink><hr/>
      <NavLink to='/Main/Pharmacy/PharmacyList' className='DashboardBox'><FaHandHoldingMedical size={35} className='mr-3'/>Pharmacy</NavLink><hr/>
      <NavLink to='/Main/Master/Masters' className='DashboardBox'><IoGitCompareOutline size={35} className='mr-3'/>Masters</NavLink><hr/>
      <NavLink to='/Main/Billing/BillingTable' className='DashboardBox'><LiaFileInvoiceDollarSolid size={35} className='mr-3'/>Billing System</NavLink><hr/>
      <NavLink to='/' className='DashboardBox'><FaUserShield size={35} className='mr-3'/>User Role</NavLink><hr/>
      <NavLink to='/' className='DashboardBoxLogout'><AiOutlineLogout size={35} className='mr-3'/>Log Out</NavLink><hr/>
    </div>
  );
};

const Navbarall = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openNav = () => {
    setIsSidebarOpen(true);
    document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
  };

  const closeNav = () => {
    setIsSidebarOpen(false);
    document.body.style.backgroundColor = 'white';
  };

  return (
    <div>
      {/* bg="light" */}
      <Navbar bg='light' expand="lg" >
        <Container fluid>

          <Navbar.Brand href="/">
            <img style={{ width: '100px', padding: '10px' }} src={logoProlife} alt="CompanyLogo" />
          </Navbar.Brand>

          <span style={{ fontSize: '30px', cursor: 'pointer', marginLeft: 'auto' }} onClick={openNav}>
            &#9776;
          </span>

          <Sidebar isOpen={isSidebarOpen} onClose={closeNav} />

        </Container>
      </Navbar>
    </div>
  );
};

export default Navbarall;













// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import { NavLink } from "react-router-dom";
// import {AiOutlineMail} from 'react-icons/ai'
// import {AiFillSetting} from 'react-icons/ai';
// import Navbar from 'react-bootstrap/Navbar';
// import logoProlife from '../images/prolife-logo.png'
// import Avatar from '@mui/material/Avatar';
// import Dropdown from 'react-bootstrap/Dropdown';

// const Navbarall = () => {
  
//   return (
//     <div>
//       {/* bg="light" */}
//       <Navbar bg='light' expand="lg" >
//       <Container fluid>

//         <Navbar.Brand href="/">
//           <img style={{ width: '100px', padding: '10px' }} src={logoProlife} alt="CompanyLogo" />
//         </Navbar.Brand>



//       </Container>
//     </Navbar>
//     </div>
//   )
// }


// export default Navbarall

