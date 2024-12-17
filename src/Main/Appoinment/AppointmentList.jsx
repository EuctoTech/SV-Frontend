import React from 'react';
import Navbarall from '../Navbarall'
import {Row,Col} from 'react-bootstrap';
import {SlCalender} from 'react-icons/sl';
import {FaUserDoctor} from 'react-icons/fa6';
import {GiCardExchange} from 'react-icons/gi'
import {MdAdminPanelSettings,MdWifiCalling, MdMedicalServices} from 'react-icons/md';
import {TbReportAnalytics} from 'react-icons/tb';
import { NavLink } from 'react-router-dom';



const AppointmentList = () => {
  return (
    <div>
      <Navbarall/>
      <div className='container'>
        <Row className='optionBox py-3'>
          <Col xs={6} md={3}>
            <NavLink to='/Main/Appoinment/Appoinment' style={{textDecoration:'none'}} >
            <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center py-4'>
                <SlCalender size={55}/>
                <h4 className='pt-3'>Appointments</h4>
              </div>
            </div></NavLink>
          </Col>
          <Col xs={6} md={3}>
          <NavLink to='/Main/Appoinment/AppoinmentReport' style={{textDecoration:'none'}} >
          <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center py-4'>
                <TbReportAnalytics size={62}/>
                <h5 className='pt-3'>Appointment Report</h5>

              </div>
            </div></NavLink>
          </Col>

          <Col xs={6} md={3}>
          <NavLink to='/Main/Appoinment/TelecallTable'  style={{textDecoration:'none'}}>
          <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center py-4'>
                <MdWifiCalling size={55}/>
                <h4 className='pt-3'>Telecalls</h4>
              </div>
            </div></NavLink>
          </Col>
          <Col xs={6} md={3}>
          {/* <NavLink to='/Main/Appoinment/TelecallTable'  style={{textDecoration:'none'}}>
          <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center py-4'>
                <MdWifiCalling size={55}/>
                <h4 className='pt-3'>Telecalls</h4>
              </div>
            </div></NavLink> */}
          </Col>
        </Row>
      </div>
    </div>
  )
}



export default AppointmentList
