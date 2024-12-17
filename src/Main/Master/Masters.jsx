import React from 'react';
import Navbarall from '../Navbarall'
import {Row,Col} from 'react-bootstrap';
import {BsHospital,BsCartPlusFill} from 'react-icons/bs';
import {FaUserDoctor} from 'react-icons/fa6';
import {GiCardExchange} from 'react-icons/gi'
import {MdAdminPanelSettings,MdOutlineFamilyRestroom, MdMedicalServices} from 'react-icons/md';
import { NavLink } from 'react-router-dom';



const Masters = () => {
  return (
    <div>
      <Navbarall/>
      <div className='container'>
        <Row className='optionBox py-3'>
          <Col xs={6} md={3}>
            <NavLink to='/Main/Master/BranchMaster' style={{textDecoration:'none'}} >
            <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center py-4'>
                <BsHospital size={55}/>
                <h4 className='pt-3'>Branch Master</h4>
              </div>
            </div></NavLink>
          </Col>
          <Col xs={6} md={3}>
            <NavLink to='/Main/Master/DoctorMasterTable'  style={{textDecoration:'none'}}>
          <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center py-4'>
                <FaUserDoctor size={55}/>
                <h4 className='pt-3'>Doctor Master</h4>
              </div>
            </div></NavLink>
          </Col>

          <Col xs={6} md={3}>
          <NavLink to='/Main/Master/Supplier' style={{textDecoration:'none'}} >
          <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center py-4'>
                <GiCardExchange size={55}/>
                <h4 className='pt-3'>Supplier Master</h4>
              </div>
            </div></NavLink>
          </Col>
          <Col xs={6} md={3}>
          <NavLink to='/Main/Master/ServiceMasterTable' style={{textDecoration:'none'}} >
          <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center py-4'>
                <MdMedicalServices size={55}/>
                <h4 className='pt-3'>Service Master</h4>
              </div>
            </div></NavLink>
          </Col>
        </Row>

        <Row className='optionBox '>
        <Col xs={6} md={3}>
        <NavLink to='/Main/Master/ProductTable' style={{textDecoration:'none'}} >
          <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center py-4'>
                <BsCartPlusFill size={55}/>
                <h4 className='pt-3'>Generic Medicine</h4>
              </div>
            </div></NavLink>
          </Col>
        <Col xs={6} md={3}>
        <NavLink to='/Main/Registration/Registrations' style={{textDecoration:'none'}} >
          <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center py-4'>
                <MdOutlineFamilyRestroom size={55}/>
                <h4 className='pt-3'>Patient Master</h4>
              </div>
            </div></NavLink>
          </Col>
        <Col xs={6} md={3}>
          <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center py-4'>
                <MdAdminPanelSettings size={55}/>
                <h4 className='pt-3'>Role Master</h4>
              </div>
            </div>
          </Col>
        <Col xs={6} md={3}>
          <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center py-4'>
                <MdAdminPanelSettings size={55}/>
                <h4 className='pt-3'>Role Master</h4>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Masters
