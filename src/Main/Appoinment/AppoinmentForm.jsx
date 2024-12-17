import React,{useEffect, useState} from 'react';
import Navbarall from '../Navbarall';
import {Form,Button,Col,Row} from 'react-bootstrap';
import {BsCalendar2CheckFill} from 'react-icons/bs';
import {MdFileDownloadDone} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {IoChevronBackCircleOutline,IoPersonAdd} from 'react-icons/io5';
import Select from 'react-select';
import Swal from 'sweetalert2'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';



const AppoinmentForm = () => {
  const [optionsID, setOptionsID] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhoneNumber, setPatientPhoneNumber] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientUHID, setPatientUHID] = useState('');
  const [PatientID, setPatientID] = useState('');
  const [optionsDoctor, setOptionsDoctor] = useState([]);
  const [optionsDoctorRef, setOptionsDoctorRef] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDoctorRef, setSelectedDoctorRef] = useState(null);

  const [appointment, setAppointment] = useState([]);
  const [newBookedTime, setNewBookedTime] = useState('')
  const [newTokenID,setNewTokenID] = useState('')
  const [newConsultationType, setNewConsultationType] = useState('')
  const [newCategoryType,setNewCategoryType] = useState('')
  const [newPatientName, setNewPatientName] = useState('')
  const [newUhid, setNewUhid] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newDoctorName,setNewDoctorName] = useState('')
  const [newReferralDoctorName,setNewReferralDoctorName] = useState('')
  const [newPurpose, setNewPurpose ] = useState('')
  const [newAppointmentStatus,setNewAppointmentStatus] = useState('')
  const [newAppointmentDate, setNewAppointmentDate] = useState('')
  const [newSourceOfReferral, setNewSourceOfReferral] = useState('')
  const [newVisitType, setNewVisitType] = useState('')

   
   
   /////////  Create Input data ///////////////////
   const createAppointment = async (event) => {
     event.preventDefault();
     const databody = {
      patient_id:selectedOption.value,
      token_id: newTokenID,
       booked_time_slot:newBookedTime,
       consultation_type:newConsultationType,
       category_type:newCategoryType,
       patient_name:patientName,
       uhid:patientUHID,
       phone_number:patientPhoneNumber,
       e_mail:patientEmail,
       doctor_name:selectedDoctor.lable,
       doctor_id:selectedDoctor.value,
       referral_doctor_name:selectedDoctorRef.lable,
       referral_doctor_id:selectedDoctorRef.value,
       purpose:newPurpose,
       appointment_status:newAppointmentStatus,
       appointment_date:newAppointmentDate,
       source_of_referral:newSourceOfReferral,
       visit_type:newVisitType,
     };
     
     try {
       const response = await fetch('https://euctostaging.com/prolife/api/appointment_create', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(databody),
 
       });
       const data = await response.json();
       setAppointment([...appointment, data[0]]);
       Swal.fire({
         icon: 'success',
         title: 'Appointment Created successfully',
         showConfirmButton: false,
         timer: 1800
       })
       setNewBookedTime('')
       setNewTokenID('')
       setNewConsultationType('')
       setNewCategoryType('') 
       setPatientName('')
       setPatientUHID('')
       setPatientPhoneNumber('')
       setPatientEmail('')
       setSelectedDoctor('')
       setSelectedDoctorRef('')
       setNewPurpose('') 
       setNewAppointmentStatus('')
       setNewAppointmentDate('')
       setNewSourceOfReferral('')
       setNewVisitType('')
     } catch (error) {
       console.log(error);
     }
   };

  useEffect(() => {
    // Fetch data from the doctor API
    fetch('https://euctostaging.com/prolife/api/masters/doctor')
      .then((response) => response.json())
      .then((data) => {
        const formattedOptions = data.map((doctor) => ({
          value: doctor.id, 
          label: doctor.name,
        }));
        setOptionsDoctor(formattedOptions);
        setOptionsDoctorRef(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSelectDoctor = (selectedOption) => {
    setSelectedDoctor(selectedOption);
  };

  const handleSelectDoctorRef = (selectedOption) => {
    setSelectedDoctorRef(selectedOption);
  };

  useEffect(() => {
    fetch('https://euctostaging.com/prolife/api/patient/getPatientsSelect')
      .then((response) => response.json())
      .then((data) => {
        const patientIDs = data.map((patient) => ({
          value: patient.id,
          label: `${patient.uhid_patient_name}`,
          // Add patient data as custom properties
          patientName: patient.patient_name,
          patientPhoneNumber: patient.phone_number,
          patientEmail:patient.e_mail,
          patientUHID:patient.uhid,
          patientID: patient.id,
        }));
        setOptionsID(patientIDs);
      })
      .catch((error) => {
        console.error('Error fetching Patient data:', error);
      });
  }, []);

  const handlePatientId = (selectedOption) => {
    setSelectedOption(selectedOption);
    setPatientName(selectedOption.patientName);
    setPatientPhoneNumber(selectedOption.patientPhoneNumber);
    setPatientEmail(selectedOption.patientEmail);
    setPatientUHID(selectedOption.patientUHID);
    setPatientID(selectedOption.patientID);
  };

  return (
    <div>
      <Navbarall/>
      <div>
      <div className='pt-5 px-4 py-4'>
         <div  style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
         <div className='row pt-3 px-3'>
            <Col><h3> <BsCalendar2CheckFill size={30} className='mr-3'/>Create Appointment</h3></Col>
            <Col style={{textAlign:'right'}}>
              <NavLink to='/Main/Appoinment/Appoinment'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
            </Col>
          </div><hr/>

          <div  className='px-4'>
            <Form>
              <Row>
                <Col>
                <FormControl style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form.Label>Visit Type</Form.Label>
                    <RadioGroup  value={newVisitType} onChange={(e)=> setNewVisitType(e.target.value)} aria-labelledby="demo-radio-buttons-group-label" defaultValue="none" name="radio-buttons-group" style={{ display: 'flex', flexDirection: 'row' }}>
                        <FormControlLabel value="New patients" control={<Radio />} label="New patients" />
                        <FormControlLabel value="Existing" control={<Radio />} label="Existing " />
                    </RadioGroup>
                    </FormControl>
                </Col>
                <Col>
                <FormControl style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form.Label>Consultation Status</Form.Label>
                    <RadioGroup value={newConsultationType} onChange={(e)=> setNewConsultationType(e.target.value)}  aria-labelledby="demo-radio-buttons-group-label"  defaultValue="none" name="radio-buttons-group"       style={{ display: 'flex', flexDirection: 'row' }}>
                        <FormControlLabel value="Online" control={<Radio />} label="Online" />
                        <FormControlLabel value="Direct" control={<Radio />} label="Direct " />
                    </RadioGroup>
                    </FormControl>
                </Col>
              </Row>
               <hr/>
{/* ------ Time Slot & Consultation Status -------------- */}   
              <Row className='mb-3'>
                {/* <Col>
                  <Form.Group>
                    <Form.Label>Time Slots</Form.Label>
                    <Form.Control type='number' />
                  </Form.Group>
                </Col> */}
                <Col>
                </Col>
              </Row>

{/* ------ patient ID & Category -------------- */}              
              <Row className='mb-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Patient ID</Form.Label>
                    <Select
                       options={optionsID}
                       value={selectedOption}
                       onChange={handlePatientId} />
                  </Form.Group>
                </Col>
                <Col>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={patientEmail} onChange={(e)=>setPatientEmail(e.target.value)} type='email' />
                  </Form.Group>
                </Col>
              </Row>

{/* ------ patient Name & PID -------------- */}
              <Row className='mb-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control value={patientName}
                      onChange={(e) => setPatientName(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>UH ID</Form.Label>
                    <Form.Control value={patientUHID} onChange={(e) => setPatientUHID(e.target.value)} type='text' />
                  </Form.Group>
                </Col>
              </Row>

{/* ------ Number & Email -------------- */}
              <Row className='mb-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control value={patientPhoneNumber} onChange={(e) => setPatientPhoneNumber(e.target.value)}/>
                  </Form.Group>
                </Col>
                <Col>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control  value={newCategoryType} onChange={(e)=> setNewCategoryType(e.target.value)} as='select'>
                      <option value='' disabled>--Select--</option>
                      <option value='Fertility'>Fertility</option>
                      <option value='Gynace'>Gynace</option>
                      <option value='Antenatal'>Antenatal</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

{/* ------ Doctor Name & Referral Doctor Name -------------- */}
              <Row className='mb-3'>
                <Col>
                <Form.Group>
                    <Form.Label>Doctor Name</Form.Label>
                    <Select
                      value={selectedDoctor}
                      onChange={handleSelectDoctor}
                      options={optionsDoctor}
                      isClearable={true}
                      placeholder="Select a doctor"/>
                  </Form.Group>
                  
                </Col>
                <Col>
                  {/* <Form.Group>
                    <Form.Label>Referral Doctor Name</Form.Label>
                    <Form.Control value={newReferralDoctorName} onChange={(e)=> setNewReferralDoctorName(e.target.value)} type='text' />
                  </Form.Group> */}
                  <Form.Group>
                  <Form.Label>Referral Doctor Name</Form.Label>
                  <Select
                      value={selectedDoctorRef}
                      onChange={handleSelectDoctorRef}
                      options={optionsDoctorRef}
                      isClearable={true}
                      placeholder="Select a doctor"/>
                  </Form.Group>
                </Col>
              </Row>

{/* ------ Purpose & Token ID -------------- */}
              <Row className='mb-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Purpose</Form.Label>
                    <Form.Control value={newPurpose} onChange={(e)=> setNewPurpose(e.target.value)} type='text' />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Token ID</Form.Label>
                    <Form.Control value={newTokenID} onChange={(e)=> setNewTokenID(e.target.value)}  type='number' />
                  </Form.Group>
                </Col>
              </Row>

{/* ------ In Time Of The Patient &  Appointment Status -------------- */}
              <Row className='mb-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>At the patient's appointed time</Form.Label>
                    <Form.Control value={newBookedTime} onChange={(e)=> setNewBookedTime(e.target.value) } type='time' />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Appointment Status</Form.Label>
                    <Form.Control value={newAppointmentStatus} onChange={(e)=> setNewAppointmentStatus(e.target.value)} as='select'>
                        <option value='' disabled >--Select--</option>
                        <option value='Pending'>Pending</option>
                        <option value='Scheduled'>Scheduled</option>
                        <option value='Cancelled'>Cancelled</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

{/* ------ Source of referral &  Appointment Date  -------------- */}
              <Row className='mb-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Source of referral</Form.Label>
                    <Form.Control value={newSourceOfReferral} onChange={(e) =>setNewSourceOfReferral(e.target.value)} as='select'>
                        <option value='' disabled >--Select--</option>
                        <option value='Telecall'>Telecall</option>
                        <option value='walkIn'>walkIn</option>
                        <option value='Online'>Online</option>
                        <option value='Review'>Review</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Appointment Date </Form.Label>
                    <Form.Control value={newAppointmentDate} onChange={(e)=> setNewAppointmentDate(e.target.value)} type='date' />
                  </Form.Group>
                </Col>
              </Row>




            <div className='text-center py-4'>
                <Button onClick={createAppointment} style={{backgroundColor:'#6D5DA8'}}>Add Appointment</Button>
            </div>

            </Form>
          </div>

         </div>
       </div>
      </div>
    </div>
  )
}


export default AppoinmentForm















// import React,{useEffect, useState} from 'react';
// import Navbarall from '../Navbarall';
// import {Form,Button,Col,Row} from 'react-bootstrap';
// import {BsCalendar2CheckFill} from 'react-icons/bs';
// import {MdFileDownloadDone} from 'react-icons/md';
// import { NavLink } from 'react-router-dom';
// import {IoChevronBackCircleOutline,IoPersonAdd} from 'react-icons/io5';
// import Select from 'react-select';
// import Swal from 'sweetalert2'
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import Checkbox from '@mui/material/Checkbox';



// const AppoinmentForm = () => {
//   const [optionsID, setOptionsID] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [patientName, setPatientName] = useState('');
//   const [patientPhoneNumber, setPatientPhoneNumber] = useState('');
//   const [patientEmail, setPatientEmail] = useState('');
//   const [patientUHID, setPatientUHID] = useState('');
//   const [PatientID, setPatientID] = useState('');
//   const [optionsDoctor, setOptionsDoctor] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);

//   const [appointment, setAppointment] = useState([]);
//   const [newBookedTime, setNewBookedTime] = useState('')
//   const [newTokenID,setNewTokenID] = useState('')
//   const [newConsultationType, setNewConsultationType] = useState('')
//   const [newCategoryType,setNewCategoryType] = useState('')
//   const [newPatientName, setNewPatientName] = useState('')
//   const [newUhid, setNewUhid] = useState('')
//   const [newPhoneNumber, setNewPhoneNumber] = useState('')
//   const [newEmail, setNewEmail] = useState('')
//   const [newDoctorName,setNewDoctorName] = useState('')
//   const [newReferralDoctorName,setNewReferralDoctorName] = useState('')
//   const [newPurpose, setNewPurpose ] = useState('')
//   const [newAppointmentStatus,setNewAppointmentStatus] = useState('')
//   const [newAppointmentDate, setNewAppointmentDate] = useState('')
//   const [newSourceOfReferral, setNewSourceOfReferral] = useState('')
//   const [newVisitType, setNewVisitType] = useState('')

   
   
//    /////////  Create Input data ///////////////////
//    const createAppointment = async (event) => {
//      event.preventDefault();
//      const databody = {
//       token_id: newTokenID,
//        booked_time_slot:newBookedTime,
//        consultation_type:newConsultationType,
//        category_type:newCategoryType,
//        patient_name:newPatientName,
//        uhid:newUhid,
//        phone_number:newPhoneNumber,
//        e_mail:newEmail,
//        doctor_name:newDoctorName,
//        referral_doctor_name:newReferralDoctorName,
//        purpose:newPurpose,
//        appointment_status:newAppointmentStatus,
//        appointment_date:newAppointmentDate,
//        source_of_referral:newSourceOfReferral,
//        visit_type:newVisitType,
//      };
     
//      try {
//        const response = await fetch('https://euctostaging.com/prolife/api/appointment_create/', {
//          method: 'POST',
//          headers: {
//            'Content-Type': 'application/json',
//          },
//          body: JSON.stringify(databody),
 
//        });
//        const data = await response.json();
//        setAppointment([...appointment, data[0]]);
//        Swal.fire({
//          icon: 'success',
//          title: 'Appointment Created successfully',
//          showConfirmButton: false,
//          timer: 1800
//        })
//        setNewBookedTime('')
//        setNewTokenID('')
//        setNewConsultationType('')
//        setNewCategoryType('') 
//        setNewPatientName('')
//        setNewUhid('')
//        setNewPhoneNumber('')
//        setNewEmail('')
//        setNewDoctorName('')
//        setNewReferralDoctorName('')
//        setNewPurpose('') 
//        setNewAppointmentStatus('')
//        setNewAppointmentDate('')
//        setNewSourceOfReferral('')
//        setNewVisitType('')
//      } catch (error) {
//        console.log(error);
//      }
//    };

//   useEffect(() => {
//     // Fetch data from the doctor API
//     fetch('https://euctostaging.com/prolife/api/masters/doctor')
//       .then((response) => response.json())
//       .then((data) => {
//         const formattedOptions = data.map((doctor) => ({
//           label: doctor.name,
//           value: doctor.id, 
//         }));
//         setOptionsDoctor(formattedOptions);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const handleSelectDoctor = (selectedOption) => {
//     setSelectedDoctor(selectedOption);
//   };

//   useEffect(() => {
//     fetch('https://euctostaging.com/prolife/api/patient/getPatientsSelect')
//       .then((response) => response.json())
//       .then((data) => {
//         const patientIDs = data.map((patient) => ({
//           value: patient.id,
//           label: `${patient.uhid_patient_name}`,
//           // Add patient data as custom properties
//           patientName: patient.patient_name,
//           patientPhoneNumber: patient.phone_number,
//           patientEmail:patient.e_mail,
//           patientUHID:patient.uhid,
//           patientID: patient.id,
//         }));
//         setOptionsID(patientIDs);
//       })
//       .catch((error) => {
//         console.error('Error fetching Patient data:', error);
//       });
//   }, []);

//   const handlePatientId = (selectedOption) => {
//     setSelectedOption(selectedOption);
//     setPatientName(selectedOption.patientName);
//     setPatientPhoneNumber(selectedOption.patientPhoneNumber);
//     setPatientEmail(selectedOption.patientEmail);
//     setPatientUHID(selectedOption.patientUHID);
//     setPatientID(selectedOption.patientID);
//   };

//   return (
//     <div>
//       <Navbarall/>
//       <div>
//       <div className='pt-5 px-4 py-4'>
//          <div  style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
//          <div className='row pt-3 px-3'>
//             <Col><h3> <BsCalendar2CheckFill size={30} className='mr-3'/>Create Appointment</h3></Col>
//             <Col style={{textAlign:'right'}}>
//               <NavLink to='/Main/Appoinment/Appoinment'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
//             </Col>
//           </div><hr/>

//           <div  className='px-4'>
//             <Form>
//               <Row>
//                 <Col>
//                 <FormControl style={{ display: 'flex', flexDirection: 'column' }}>
//                     <Form.Label>Visit Type</Form.Label>
//                     <RadioGroup  value={newVisitType} onChange={(e)=> setNewVisitType(e.target.value)} aria-labelledby="demo-radio-buttons-group-label" defaultValue="none" name="radio-buttons-group" style={{ display: 'flex', flexDirection: 'row' }}>
//                         <FormControlLabel value="New patients" control={<Radio />} label="New patients" />
//                         <FormControlLabel value="Existing" control={<Radio />} label="Existing " />
//                     </RadioGroup>
//                     </FormControl>
//                 </Col>
//                 <Col>
//                 <FormControl style={{ display: 'flex', flexDirection: 'column' }}>
//                     <Form.Label>Consultation Status</Form.Label>
//                     <RadioGroup value={newConsultationType} onChange={(e)=> setNewConsultationType(e.target.value)}  aria-labelledby="demo-radio-buttons-group-label"  defaultValue="none" name="radio-buttons-group"       style={{ display: 'flex', flexDirection: 'row' }}>
//                         <FormControlLabel value="Online" control={<Radio />} label="Online" />
//                         <FormControlLabel value="Direct" control={<Radio />} label="Direct " />
//                     </RadioGroup>
//                     </FormControl>
//                 </Col>
//               </Row>
//                <hr/>
// {/* ------ Time Slot & Consultation Status -------------- */}   
//               <Row className='mb-3'>
//                 {/* <Col>
//                   <Form.Group>
//                     <Form.Label>Time Slots</Form.Label>
//                     <Form.Control type='number' />
//                   </Form.Group>
//                 </Col> */}
//                 <Col>
//                 </Col>
//               </Row>

// {/* ------ patient ID & Category -------------- */}              
//               <Row className='mb-3'>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Patient ID</Form.Label>
//                     <Select
//                        options={optionsID}
//                        value={selectedOption}
//                        onChange={handlePatientId} />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                 <Form.Group>
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control value={patientEmail} onChange={(e)=>setPatientEmail(e.target.value)} type='email' />
//                   </Form.Group>
//                 </Col>
//               </Row>

// {/* ------ patient Name & PID -------------- */}
//               <Row className='mb-3'>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Patient Name</Form.Label>
//                     <Form.Control value={patientName}
//                       onChange={(e) => setPatientName(e.target.value)} />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>UH ID</Form.Label>
//                     <Form.Control value={patientUHID} onChange={(e) => setPatientUHID(e.target.value)} type='text' />
//                   </Form.Group>
//                 </Col>
//               </Row>

// {/* ------ Number & Email -------------- */}
//               <Row className='mb-3'>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Mobile Number</Form.Label>
//                     <Form.Control value={patientPhoneNumber} onChange={(e) => setPatientPhoneNumber(e.target.value)}/>
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                 <Form.Group>
//                     <Form.Label>Category</Form.Label>
//                     <Form.Control  value={newCategoryType} onChange={(e)=> setNewCategoryType(e.target.value)} as='select'>
//                       <option value='' disabled>--Select--</option>
//                       <option value='Fertility'>Fertility</option>
//                       <option value='Gynace'>Gynace</option>
//                       <option value='Antenatal'>Antenatal</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//               </Row>

// {/* ------ Doctor Name & Referral Doctor Name -------------- */}
//               <Row className='mb-3'>
//                 <Col>
//                 <Form.Group>
//                     <Form.Label>Doctor Name</Form.Label>
//                     <Select
//                       value={selectedDoctor}
//                       onChange={handleSelectDoctor}
//                       options={optionsDoctor}
//                       isClearable={true}
//                       placeholder="Select a doctor"/>
//                   </Form.Group>

//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Referral Doctor Name</Form.Label>
//                     <Form.Control value={newReferralDoctorName} onChange={(e)=> setNewReferralDoctorName(e.target.value)} type='text' />
//                   </Form.Group>
//                 </Col>
//               </Row>

// {/* ------ Purpose & Token ID -------------- */}
//               <Row className='mb-3'>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Purpose</Form.Label>
//                     <Form.Control value={newPurpose} onChange={(e)=> setNewPurpose(e.target.value)} type='text' />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Token ID</Form.Label>
//                     <Form.Control value={newTokenID} onChange={(e)=> setNewTokenID(e.target.value)}  type='number' />
//                   </Form.Group>
//                 </Col>
//               </Row>

// {/* ------ In Time Of The Patient &  Appointment Status -------------- */}
//               <Row className='mb-3'>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>At the patient's appointed time</Form.Label>
//                     <Form.Control value={newBookedTime} onChange={(e)=> setNewBookedTime(e.target.value) } type='time' />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Appointment Status</Form.Label>
//                     <Form.Control value={newAppointmentStatus} onChange={(e)=> setNewAppointmentStatus(e.target.value)} as='select'>
//                         <option value='' disabled >--Select--</option>
//                         <option value='Registration Done'>Registration Done</option>
//                         <option value='Vitals Done'>Vitals Done</option>
//                         <option value='Dom Done'>Dom Done</option>
//                         <option value='Consultation Done'>Consultation Done</option>
//                         <option value='Billing Done'>Billing Done</option>
//                         <option value='Scan Done'>Scan Done</option>
//                         <option value='Report Give'>Report Give</option>
//                         <option value='Lab Work Done'>Lab Work Done</option>
//                         <option value='Billing Done'>Billing Done</option>
//                         <option value='Pharmacy Done'>Pharmacy Done</option>
//                         <option value='Injection Done'>Injection Done</option>
//                         <option value='Pending'>Pending</option>
//                         <option value='Scheduled'>Scheduled</option>
//                         <option value='Cancelled'>Cancelled</option>

//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//               </Row>

// {/* ------ Source of referral &  Appointment Date  -------------- */}
//               <Row className='mb-3'>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Source of referral</Form.Label>
//                     <Form.Control value={newSourceOfReferral} onChange={(e) =>setNewSourceOfReferral(e.target.value)} as='select'>
//                         <option value='' disabled >--Select--</option>
//                         <option value='Telecall'>Telecall</option>
//                         <option value='walkIn'>walkIn</option>
//                         <option value='Online'>Online</option>
//                         <option value='Review'>Review</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Appointment Date </Form.Label>
//                     <Form.Control value={newAppointmentDate} onChange={(e)=> setNewAppointmentDate(e.target.value)} type='date' />
//                   </Form.Group>
//                 </Col>
//               </Row>




//             <div className='text-center py-4'>
//                 <Button onClick={createAppointment} style={{backgroundColor:'#6D5DA8'}}>Add Appointment</Button>
//             </div>

//             </Form>
//           </div>

//          </div>
//        </div>
//       </div>
//     </div>
//   )
// }


// export default AppoinmentForm
