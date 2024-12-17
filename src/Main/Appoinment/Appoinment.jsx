import React, { useState,useEffect } from 'react'
import Navbarall from '../Navbarall'
import MyCalendar from '../Appoinment/MyCalendar'
import {Row, Col,Form,Button} from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import {FaSearchengin} from 'react-icons/fa';
import {AiOutlineTable} from 'react-icons/ai';
import Paper from '@mui/material/Paper';
import {NavLink} from 'react-router-dom'
import {BsCalendar2PlusFill,BsTable} from 'react-icons/bs';






const Appoinment = () => {

  const [selectedDataFrom, setSelectedDataFrom] = useState('')
  const [selectedDateAppointmentTO, setSelectedDateAppointmentTO] = useState('')
  const [selectedDateAppointment,setSelectedDateAppointment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Define the API URL
    const apiUrl = 'https://euctostaging.com/prolife/api/masters/doctor';

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDateFrom = (date) => {
    setSelectedDateAppointment(date);
  };
  const handleDateTo = (date) => {
    setSelectedDateAppointmentTO(date);
  };

  const getRandomCount = () => {
    return Math.floor(Math.random() * 100) + 1;
  };
  return (
    <div>
        <Navbarall/>

        <div className='container pt-3'>

        <div style={{backgroundColor:'#ffff', border:'1px solid #000', borderRadius:'10px'}}>
        <div>
        <Row className='pt-3 container'>
            <Col>
              <h3 style={{fontFamily:'serif'}}>Schedule Appointment</h3>
            </Col>
            <Col style={{textAlign:'right'}}>
              <NavLink to='/Main/Appoinment/AppoinmentForm'>
              <Button style={{backgroundColor:'#CCA047', color:'white'}}><BsCalendar2PlusFill className='mr-2'/>Create Appointment</Button></NavLink>
            </Col>
          </Row><hr style={{marginTop:'1px'}}/>
            </div>
                <div className='container py-3'>
                  <Form>
                    <Row>
                      <Col>
                      <Form.Group>
                          <Form.Label style={{width: '100%'}}>From</Form.Label>
                          <DatePicker
                                placeholderText="DD/MM/YYYY"
                                selected={selectedDateAppointment}
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
                    <NavLink to="/Main/Appoinment/AppointmentTable">
                    <Button style={{ backgroundColor: '#00AC47' }} className="mr-2 DashboardAppointmentTable">
                      <BsTable className='mr-2' />View Table
                    </Button></NavLink>
                  </div>

                  </Form>
                </div>
              </div>



          <Row className='py-4' >
            <Col md={8} xs={12} >
              <div style={{border:'1px solid #CCA047',backgroundColor:'#ffff', borderRadius:'10px'}}>
                 <MyCalendar/>
              </div>
            </Col>
            <Col md={4} xs={12}>
            <div>
            <div
              style={{
                height: '550px',
                overflow: 'auto',
                backgroundColor: '#ffff',
                border: '1px solid #000',
                borderRadius: '10px',
              }}>
              <style>
                {`
                  ::-webkit-scrollbar {
                    width: 0;
                  }
                  scrollbar-width: none;
                  -ms-overflow-style: none;`}
              </style>
              <div style={{ position: 'sticky',top: '0',backgroundColor: '#EEEEEE',zIndex: '1',padding: '10px',}}>
              <div className='container py-3'>
                <input
                  className="search__input"
                  type="text"
                  placeholder="Search Doctor"
                  value={searchQuery}
                  onChange={handleSearchChange} />
                <selectedDataFromhr />
              </div>
              </div>
              <hr className='m-0' />
    <div className='px-2 my-3'>
      {filteredDoctors.map((doctor, index) => (
        <div className='mb-3'>
          <Paper elevation={4} className='py-3 container DashboardAppointment' key={index}>
            <h5 style={{ fontFamily: 'sans-serif' }}>{doctor.name}</h5>
            <h6 style={{ fontFamily: 'sans-serif', paddingTop: '3px' }}>{doctor.designation}</h6>
            <Row className='pt-2'>
              <Col xs={6}>
                <Button
                  style={{
                    backgroundColor: '#FF7979',
                    cursor: 'default',
                    borderRadius: '10px',
                    border: 'none',
                    fontFamily: 'sans-serif',
                  }} >Charge: {doctor.fee}
                </Button>
              </Col>
              <Col xs={6}>
                <Button
                  style={{
                    backgroundColor: 'rgb(110 117 226)',
                    cursor: 'default',
                    borderRadius: '8px',
                    border: 'none',
                    fontFamily: 'sans-serif',
                  }}>
                  Count: {getRandomCount()}
                </Button>
              </Col>
            </Row>
          </Paper>
        </div>
      ))}
    </div>
  </div>
           </div>

            </Col>
          </Row>
        </div>
    </div>
  )
}

export default Appoinment














// import React, { useState } from 'react'
// import Navbarall from '../Navbarall'
// import MyCalendar from '../Appoinment/MyCalendar'
// import {Row, Col,Form,Button} from 'react-bootstrap'
// import DatePicker from 'react-datepicker';
// import {FaSearchengin} from 'react-icons/fa';
// import {AiOutlineTable} from 'react-icons/ai';
// import Paper from '@mui/material/Paper';
// import {NavLink} from 'react-router-dom'
// import {BsCalendar2PlusFill,BsTable} from 'react-icons/bs';






// const Appoinment = () => {

//   const [selectedDataFrom, setSelectedDataFrom] = useState('')
//   const [selectedDateAppointment,setSelectedDateAppointment] = useState(null);

//   const handleDateFrom = (date) => {
//     setSelectedDateAppointment(date);
//   };
//   return (
//     <div>
//         <Navbarall/>

//         <div className='container pt-3'>

//         <div style={{backgroundColor:'#ffff', border:'1px solid #000', borderRadius:'10px'}}>
//         <div>
//         <Row className='pt-3 container'>
//             <Col>
//               <h3 style={{fontFamily:'serif'}}>Schedule Appointment</h3>
//             </Col>
//             <Col style={{textAlign:'right'}}>
//               <NavLink to='/Main/Appoinment/AppoinmentForm'>
//               <Button style={{backgroundColor:'#CCA047', color:'white'}}><BsCalendar2PlusFill className='mr-2'/>Create Appointment</Button></NavLink>
//             </Col>
//           </Row><hr style={{marginTop:'1px'}}/>
//             </div>
//                 <div className='container py-3'>
//                   <Form>
//                     <Row>
//                       <Col>
//                       <Form.Group>
//                           <Form.Label style={{width: '100%'}}>From</Form.Label>
//                           <DatePicker
//                                 placeholderText="DD/MM/YYYY"
//                                 selected={selectedDateAppointment}
//                                 onChange={handleDateFrom}
//                                 dateFormat="dd/MM/yyyy"
//                                 showYearDropdown
//                                 scrollableYearDropdown
//                                 showMonthDropdown
//                                 scrollableMonthYearDropdown
//                                 customInput={
//                                   <input
//                                     type="text"
//                                     id="txtDate"
//                                     name="SelectedDate"
//                                     style={{ cursor: 'pointer', width: '100%', height: '35px' }}/>}/>
//                         </Form.Group>
//                       </Col>
//                       <Col>
//                         <Form.Group>
//                             <Form.Label style={{width: '100%'}}>To</Form.Label>
//                             <DatePicker
//                                 placeholderText="DD/MM/YYYY"
//                                 selected={selectedDateAppointment}
//                                 onChange={handleDateFrom}
//                                 dateFormat="dd/MM/yyyy"
//                                 showYearDropdown
//                                 scrollableYearDropdown
//                                 showMonthDropdown
//                                 scrollableMonthYearDropdown
//                                 customInput={
//                                   <input
//                                     type="text"
//                                     id="txtDate"
//                                     name="SelectedDate"
//                                     style={{ cursor: 'pointer', width: '100%', height: '35px' }}/>}/>
//                           </Form.Group>
//                       </Col>
//                     </Row>
//                     <div className='pt-3 text-center'>
//                     <Button style={{ backgroundColor: '#6D5DA8' }} className="mr-2">
//                       <FaSearchengin className='mr-2' />Search
//                     </Button>
//                     <NavLink to="/Main/Appoinment/AppointmentTable">
//                     <Button style={{ backgroundColor: '#00AC47' }} className="mr-2 DashboardAppointmentTable">
//                       <BsTable className='mr-2' />View Table
//                     </Button></NavLink>
//                   </div>

//                   </Form>
//                 </div>
//               </div>



//           <Row className='py-4' >
//             <Col md={8} xs={12} >
//               <div style={{border:'1px solid #CCA047',backgroundColor:'#ffff', borderRadius:'10px'}}>
//                  <MyCalendar/>
//               </div>
//             </Col>
//             <Col md={4} xs={12}>
//              <div>
//              <div style={{backgroundColor:'#ffff', border:'1px solid #000', borderRadius:'10px'}}>
//                 <div className='container py-3'>
//                 <input className="search__input" type="text" placeholder="Search Doctor" /><selectedDataFromhr/>
//                 </div><hr/>
//                 <div className='px-2 mb-3'>
//                       <Paper elevation={2} className='py-3 container DashboardAppointment' >
//                         <h5 style={{fontFamily: 'sans-serif'}}>Dr.Udhaya Sariya</h5>
//                         <h6 style={{fontFamily: 'sans-serif', paddingTop:'3px'}}>Chief Doctor</h6>
//                         <Row className='pt-2'>
//                           <Col xs={6}>
//                           <Button style={{backgroundColor:'#FF7979',cursor: 'default', borderRadius:'10px',border: 'none',fontFamily: 'sans-serif'}}>Charge: ₹250</Button>
//                           </Col>
//                           <Col xs={6}>
//                             <Button style={{backgroundColor:'rgb(110 117 226)',cursor: 'default', borderRadius:'8px',border: 'none',fontFamily: 'sans-serif'}}>Count: 83</Button>
//                           </Col>
//                         </Row>
//                       </Paper>
//                 </div>
//                   <div className='px-2 mb-3'>
//                       <Paper elevation={2} className='py-3 container DashboardAppointment' >
//                         <h5 style={{fontFamily: 'sans-serif'}}>Dr.Mohammed Fareestha</h5>
//                         <h6 style={{fontFamily: 'sans-serif', paddingTop:'3px'}}>Diagnosing</h6>
//                         <Row className='pt-2'>
//                           <Col xs={6}>
//                           <Button style={{backgroundColor:'#FF7979',cursor: 'default', borderRadius:'10px',border: 'none',fontFamily: 'sans-serif'}}>Charge: ₹250</Button>
//                           </Col>
//                           <Col xs={6}>
//                             <Button style={{backgroundColor:'rgb(110 117 226)',cursor: 'default', borderRadius:'8px',border: 'none',fontFamily: 'sans-serif'}}>Count: 83</Button>
//                           </Col>
//                         </Row>
//                       </Paper>
//                 </div>
//                   <div className='px-2 mb-3'>
//                       <Paper elevation={4} className='py-3 container DashboardAppointment' >
//                         <h5 style={{fontFamily: 'sans-serif'}}>Dr.Hari Kiran</h5>
//                         <h6 style={{fontFamily: 'sans-serif', paddingTop:'3px'}}>Intracytoplasmic sperm injection (ICSI)</h6>
//                         <Row className='pt-2'>
//                           <Col xs={6}>
//                           <Button style={{backgroundColor:'#FF7979',cursor: 'default', borderRadius:'10px',border: 'none',fontFamily: 'sans-serif'}}>Charge: ₹250</Button>
//                           </Col>
//                           <Col xs={6}>
//                             <Button style={{backgroundColor:'rgb(110 117 226)',cursor: 'default', borderRadius:'8px',border: 'none',fontFamily: 'sans-serif'}}>Count: 83</Button>
//                           </Col>
//                         </Row>
//                       </Paper>
//                 </div>
//               </div>
//              </div>
//             </Col>
//           </Row>
//         </div>
//     </div>
//   )
// }

// export default Appoinment










