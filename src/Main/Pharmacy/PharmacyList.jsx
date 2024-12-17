import React from 'react';
import Navbarall from '../Navbarall'
import {Row,Col} from 'react-bootstrap';
import {BsHospital,BsCartPlusFill} from 'react-icons/bs';
import {FaNotesMedical} from 'react-icons/fa';
import {AiFillSchedule} from 'react-icons/ai';
import { MdSummarize} from 'react-icons/md';
import { PiTargetDuotone} from 'react-icons/pi';
import { NavLink } from 'react-router-dom';



const PharmacyList = () => {
  return (
    <div>
      <Navbarall/>
      <div className='container'>
        <Row className='optionBox py-3'>
          <Col xs={6} md={3}>
            <NavLink to='/Main/Pharmacy/GrnList'  style={{textDecoration:'none'}}>
          <div className='DashboardBox' style={{height: '175px', border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center py-4'>
                <FaNotesMedical size={55}/>
                <h2 className='pt-4'>GRN</h2>
              </div>
            </div></NavLink>
          </Col>

          <Col xs={6} md={3}>
          <NavLink to='/Main/Pharmacy/SalesTable' style={{textDecoration:'none'}} >
          <div className='DashboardBox' style={{height: '175px',border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center pt-4 pb-1'>
                <PiTargetDuotone size={55}/>
                <h2 className='pt-3'>Sales</h2>
              </div>
            </div></NavLink>
          </Col>

          <Col xs={6} md={3}>
          <NavLink to='/Main/Pharmacy/ProductBatchStock' style={{textDecoration:'none'}} >
          <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center pt-4 pb-1'>
                <BsCartPlusFill size={55}/>
                <h4 className='pt-3'>Product Batch</h4>
                <h4 className=''>Wise Stock</h4>
              </div>
            </div></NavLink>
          </Col>
          <Col xs={6} md={3}>
          <NavLink to='/Main/Pharmacy/ProductWiseSummary' style={{textDecoration:'none'}} >
          <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center pt-4 pb-1'>
                <MdSummarize size={55}/>
                <h4 className='pt-3'>Product Wise</h4>
                <h4 className=''>Summary Stock</h4>
              </div>
            </div></NavLink>
          </Col>
          <Col xs={6} md={3}>
          <NavLink to='/Main/Pharmacy/ScheduledRegister' style={{textDecoration:'none'}} >
          <div className='DashboardBox' style={{ border: '1px solid black',borderRadius: '10px', backgroundColor:'#ffff',color:'#CCA047', cursor:'pointer'}}>
              <div className='text-center pt-4 pb-1'>
                <AiFillSchedule size={55}/>
                <h4 className='pt-3'>Scheduled</h4>
                <h4 className=''>Register</h4>
              </div>
            </div></NavLink>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default PharmacyList
