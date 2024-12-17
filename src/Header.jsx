import React from 'react';
import './dashboard.css';
import Container from 'react-bootstrap/Container';
import { NavLink } from "react-router-dom";
import {AiOutlineMail} from 'react-icons/ai'
import {AiFillSetting} from 'react-icons/ai';
import {Row,Col} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import logoProlife from './images/prolife-logo.png'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
  
  return (
    <div>
      {/* bg="light" */}
      <Navbar bg='light' expand="lg" >
      <Container fluid>

        <Navbar.Brand href="/">
          <img style={{ width: '100px', padding: '10px' }} src={logoProlife} alt="CompanyLogo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <div className="ml-auto"> {/* Use ml-auto class here */}
            <div style={{ paddingTop: '12px', textAlign: 'right', alignSelf: 'center', display:'flex' }} className='pe-5'>
            <AiOutlineMail className='pe-2' size={30} style={{cursor:'pointer',margin: '15px',marginBottom:'10px'}}/>
            <AiFillSetting className='pe-2' size={30} style={{cursor:'pointer',margin: '15px',marginBottom:'10px'}}/>
              <Dropdown style={{top:'5px',border:'none'}} > 
                <Dropdown.Toggle style={{ backgroundColor: '#F8F9FA', color: '#F8F9FA', border: 'none' }} id="dropdown-basic">
                  <Avatar alt="Remy Sharp" src="" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/">My Profile</Dropdown.Item>
                  <Dropdown.Item href="/" className='text-danger'>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          
        </Navbar.Collapse>

      </Container>
    </Navbar>
    </div>
  )
}

export default Header














// import React from 'react'
// import Button from 'react-bootstrap/Button';
// import FormControl from 'react-bootstrap/FormControl';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import {Row,Col} from 'react-bootstrap'
// import {AiFillSetting} from 'react-icons/ai';
// import {AiOutlineLogout} from 'react-icons/ai';
// import logoProlife from './images/prolife-logo.png'
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';
// import Badge from '@mui/material/Badge';
// import Dropdown from 'react-bootstrap/Dropdown';
// import { NavLink } from "react-router-dom";
// import {AiOutlineHistory} from 'react-icons/ai'
// import {HiOutlineLogout} from 'react-icons/hi';
// import {MdOutlineManageAccounts} from 'react-icons/md';


// const StyledBadge = styled(Badge)(({ theme }) => ({
//   '& .MuiBadge-badge': {
//     backgroundColor: '#44b700',
//     color: '#44b700',
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     '&::after': {
//       width: '10%',
//       height: '10%',
//       borderRadius: '50%',
//       animation: 'ripple 1.2s infinite ease-in-out',
//       border: '1px solid currentColor',
//       content: '""',
//     },
//   },
//   '@keyframes ripple': {
//     '0%': {
//       transform: 'scale(.8)',
//       opacity: 1,
//     },
//     '100%': {
//       transform: 'scale(2.4)',
//       opacity: 0,
//     },
//   },
// }));




// const Header = () => {
//   return (
//     <div>
//       <Navbar bg="light" expand="lg">
//         <Row>
//             <Col>
//                <Navbar.Brand href="#home">
//                 <img style={{width:'15%'}} src={logoProlife} alt='logo'/>
//                 </Navbar.Brand>
//             </Col>

//             <Col  style={{textAlign: 'right',alignSelf: 'center'}}>
//                 <div>
//                    <AiFillSetting className='pe-2' size={30} style={{cursor:'pointer',margin: '15px'}}/>
                   
//             <div style={{paddingTop:'12px'}} className='pe-5'>
//             <Dropdown>
//       {/* <Dropdown.Toggle style={{backgroundColor:'#F0F0F0',color:'#000',border:'none'}} id="dropdown-basic"> */}
//       <Dropdown.Toggle style={{backgroundColor:'#F0F0F0',color:'#F0F0F0',border:'none'}} id="dropdown-basic">
//       <Avatar alt="Remy Sharp" src="https://img.freepik.com/premium-photo/portrait-young-bearded-indian-man-streets-outdoors_251136-80087.jpg?w=900" />
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1"><AiOutlineHistory size={30} className="pe-2" />History</Dropdown.Item>
//         <Dropdown.Item href="#/action-2"><MdOutlineManageAccounts size={30} className="pe-2"/>My Account</Dropdown.Item>
//         <Dropdown.Item href="/" className='text-danger'><HiOutlineLogout size={30} className="pe-2"/>Logout</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//             </div>
// {/* 
//                    <Stack style={{ display: 'contents', cursor:'pointer'}}  direction="row" spacing={2} >
//                     <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
//                         <Avatar alt="Remy Sharp" src="https://img.freepik.com/premium-photo/young-female-doctor-front-view-wearing-coat-stethoscope-around-neck-indian-pakistani-model_561639-131.jpg" />
//                     </StyledBadge>
//                     </Stack> */}
//                    {/* <AiOutlineLogout className='ps-5'  size={30} style={{color:'red',cursor:'pointer',marginRight: '15px'}} /> */}
//                     {/* <Button className='bg-danger'>Logout</Button>  */}
//                 </div>
//             </Col>
//           </Row>
//         </Navbar>
//     </div>
//   )
// }

// export default Header
