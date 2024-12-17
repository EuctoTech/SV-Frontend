import React,{useState} from 'react';
import NavbarAll from '../Navbarall';
import {Row,Col,Button,Form} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {IoChevronBackCircleOutline} from 'react-icons/io5';
import {FaSearchengin} from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { Paper } from '@mui/material';
import AppointmentStatusPiechart from './AppointmentStatusPiechart'
import VisitstypePieChart from './VisitstypePieChart'
import AppointmentBarchart from './AppointmentBarchart'


const AppoinmentReport = () => {

    const [selectedDataFrom, setSelectedDataFrom] = useState('')
    const [selectedDateAppointmentFrom,setSelectedDateAppointmentFrom] = useState(null);
    const [selectedDateAppointmentTO,setSelectedDateAppointmentTO] = useState(null);
  
    const handleDateFrom = (date) => {
      setSelectedDateAppointmentFrom(date);
    };

    const handleDateTo = (date) => {
      setSelectedDateAppointmentTO(date);
    };


  return (
    <div>
      <NavbarAll/>
      <div className='py-4 px-3'>
        <div style={{border:'1px solid #000', borderRadius:'10px', backgroundColor:'#ffff'}}>
        <div className='row pt-3 px-3'>
            <Col><h3 style={{fontFamily: 'math'}}>Appointment Report</h3></Col>
            <Col style={{textAlign:'right'}}>
              <NavLink to='/Main/Appoinment/AppointmentList'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
            </Col>
          </div><hr/>
          <div className='container py-3' style={{border:'1px solid #000', borderRadius:'10px', backgroundColor:'#ffff'}}>
                  <Form>
                    <Row>
                      <Col>
                      <Form.Group>
                          <Form.Label style={{width: '100%'}}>From</Form.Label>
                          <DatePicker
                                placeholderText="DD/MM/YYYY"
                                selected={selectedDateAppointmentFrom}
                                onChange={handleDateFrom}
                                dateFormat="dd/MM/yyyy"
                                showYearDropdown
                                scrollableYearDropdown
                                showMonthDropdown
                                scrollableMonthYearDropdown
                                customInput={
                                  <input
                                    type="text"
                                    id="txtDate"
                                    name="SelectedDate"
                                    style={{ cursor: 'pointer', width: '100%', height: '35px' }}/>}/>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                            <Form.Label style={{width: '100%'}}>To</Form.Label>
                            <DatePicker
                                placeholderText="DD/MM/YYYY"
                                selected={selectedDateAppointmentTO}
                                onChange={handleDateTo}
                                dateFormat="dd/MM/yyyy"
                                showYearDropdown
                                scrollableYearDropdown
                                showMonthDropdown
                                scrollableMonthYearDropdown
                                customInput={
                                  <input
                                    type="text"
                                    id="txtDate"
                                    name="SelectedDate"
                                    style={{ cursor: 'pointer', width: '100%', height: '35px' }}/>}/>
                          </Form.Group>
                      </Col>
                    </Row>
                    <div className='pt-3 text-center'>
                    <Button style={{ backgroundColor: '#6D5DA8' }} className="mr-2">
                      <FaSearchengin className='mr-2' />Search
                    </Button>
                  </div>

                  </Form>
                </div>

           {/*-------  Charts ---------------*/}
          <div className='py-5 container'>
            <Row>
              <Col xs={12} md={6}>
                <Paper elevation={24} className='py-3'>
                     <h4 className='py-2 text-center' style={{fontFamily: 'sans-serif'}}>Appointment status wise count</h4><hr/>
                    <AppointmentStatusPiechart/>
                </Paper>
              </Col>
              <Col xs={12}  md={6}>
                <Paper elevation={24} className='py-3'>
                     <h4 className='py-2 text-center' style={{fontFamily: 'sans-serif'}}>Visits type wise count</h4><hr/>
                    <VisitstypePieChart/>
                </Paper>
              </Col>
            </Row>
            <Row className='py-5'>
              <Col>
               <Paper elevation={24} className='py-3 px-3'>
                <h4 className='py-3' style={{fontFamily: 'sans-serif'}}>Category wise count </h4><hr/>
                <AppointmentBarchart/>
               </Paper> 
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppoinmentReport
