import React from 'react';
import Header from '../Header';
import PieChart from './PieChart'
import {Row,Col} from 'react-bootstrap';
import {LiaFileInvoiceDollarSolid} from 'react-icons/lia'
import {FaHandHoldingMedical} from 'react-icons/fa'
import {IoGitCompareOutline} from 'react-icons/io5'
import {MdOutlineAppRegistration} from 'react-icons/md';
import {IoCalendarSharp} from 'react-icons/io5';
import {FaUserShield} from 'react-icons/fa';
import {NavLink} from 'react-router-dom'
import { Footer } from 'antd/es/layout/layout';


const Dashboard = () => {
  return (
    <div>
      <Header/>
       <div className='container pt-5'>
         <Row>
            <Col md={8} >
                <Row className='optionBox'>
                    <Col xs={6} md={4}>
                      <NavLink to='/Main/Appoinment/AppointmentList' style={{textDecoration:'none'}}>
                        <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
                           <div className='text-center py-3' >
                              <IoCalendarSharp size={55}/>
                             <h4 className='pt-3'>Appointment</h4>
                           </div>
                        </div>
                        </NavLink>
                    </Col>
                    <Col md={4} xs={6}>
                      <NavLink to='/Main/Registration/Registrations' style={{textDecoration:'none'}}>
                    <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
                           <div className='text-center py-3'>
                              <MdOutlineAppRegistration size={55}/>
                             <h4 className='pt-3'>Registration</h4>
                           </div>
                        </div></NavLink>
                    </Col>
                    <Col md={4} xs={6}>
                    <NavLink to='/Main/Pharmacy/PharmacyList' style={{textDecoration:'none'}}>
                    <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
                           <div className='text-center py-3'>
                              <FaHandHoldingMedical size={55}/>
                             <h4 className='pt-3'>Pharmacy</h4>
                           </div>
                        </div></NavLink>
                    </Col>


                    <Col md={4} xs={6}>
                      <NavLink to='/Main/Master/Masters' style={{textDecoration:'none'}}>
                        <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
                           <div className='text-center py-3'>
                              <IoGitCompareOutline size={55}/>
                             <h4 className='pt-3'>Masters</h4>
                           </div>
                        </div></NavLink>
                    </Col>
                    <Col md={4} xs={6}>
                    <NavLink to='/Main/Billing/BillingTable' style={{textDecoration:'none'}}>
                    <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
                           <div className='text-center py-3'>
                              <LiaFileInvoiceDollarSolid size={55}/>
                             <h4 className='pt-3'>Billing</h4>
                           </div>
                        </div></NavLink>
                    </Col>
                    <Col md={4} xs={6}>
                    <NavLink to='/Main/Registration/Registrations' style={{textDecoration:'none'}}>
                    <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
                           <div className='text-center py-3'>
                              <FaUserShield size={55}/>
                             <h4 className='pt-3'>User</h4>
                           </div>
                        </div></NavLink>
                    </Col>
                    </Row>
               </Col>
            <Col md={4}>
                <div style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff'}}>
                    <div className='py-3'>
                        <PieChart/>
                    </div>
                </div>
            </Col>
         </Row>
       </div>
    </div>
  )
}

export default Dashboard
