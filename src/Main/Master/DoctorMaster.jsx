import React,{useState,useRef,useEffect} from 'react';
import Navbarall from '../Navbarall';
import {Form,Button,Row,Col,Table} from 'react-bootstrap';
import {BsHospital} from 'react-icons/bs';
import {IoChevronBackCircleOutline} from 'react-icons/io5';
import {FaUserDoctor} from 'react-icons/fa6';
import {NavLink} from 'react-router-dom'
import Select from 'react-select';
import { RadioGroup, FormControlLabel, Radio,Checkbox  } from '@mui/material';
import DatePicker from 'react-datepicker';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'


const format = 'HH:mm';






const DoctorMaster = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null)
  const [showResetButton, setShowResetButton] = useState(false)

  const [doctorMaster, setDoctorMaster] = useState([]);
  const [newId, setNewId] = useState('');
  const [newDesignation, setNewDesignation] = useState('')
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newMobile, setNewMobile] = useState('')
  const [newWhatappNum, setNewWhatappNum] = useState('')
  const [newProlifeDoctor, setNewProlifeDoctor] = useState('')
  const [newReferral, setNewReferral] = useState('')
  const [newOnConsultant, setNewOnConsultant] = useState('')
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newQualification, setNewQualification ] = useState('')
  const [newRegistration, setNewRegistration] = useState('')
  const [newBlockDateFrom, setNewBlockDateFrom] = useState('');
  const [newBlockDateTo, setNewBlockDateTo] = useState('');
  const [newBlockTimeFrom, setNewBlockTimeFrom] = useState('');
  const [newBlockTimeTo, setNewBlockTimeTo] = useState('');
  const [newFee, setNewFee] = useState('');
  const [newBlockDays, setNewBlockDays] = useState('')
  const [newBranch, setNewBranch] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Fetch branch data from the API
    fetch('https://euctostaging.com/prolife/api/masters/branches')
      .then(response => response.json())
      .then(data => {
        const branchOptions = data.map(branch => ({
          value: branch.id,
          label: `${branch.code} - ${branch.branch_name}`
        }));
        setOptions(branchOptions);
      })
      .catch(error => console.error('Error fetching branch data:', error));
  }, []);

  const handleBranchChange = selectedOption => {
    setNewBranch(selectedOption); 
  };


  const optioner = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
  ];

  const handleOptionChange = (value) => {
    if (newBlockDays.includes(value)) {
      setNewBlockDays(newBlockDays.filter(option => option !== value));
    } else {
      setNewBlockDays([...newBlockDays, value]);
    }
  };


  const handleDateChangeFrom = (date) => {
    setSelectedDate(date);
    setNewBlockDateFrom(date.toLocaleDateString())

  };
  const handleDateChangeTo = (date) => {
    setSelectedDate(date);
    setNewBlockDateTo(date.toLocaleDateString())
  };

    /////////  Create Input data ///////////////////
    const createDoctor = async (event) => {
      event.preventDefault();
      const databody = {
        designation: newDesignation,
        name: newName,
        email: newEmail,
        mobile: newMobile,
        whatsapp_no: newWhatappNum,
        a4_doctor: newProlifeDoctor,
        referral_doctor: newReferral,
        on_call_consultant: newOnConsultant,
        city: newCity,
        state: newState,
        qualification: newQualification,
        registration_no: newRegistration,
        block_days_from: newBlockDateFrom,
        block_days_to: newBlockDateTo,
        block_days_from_time: newBlockTimeFrom,
        block_days_to_time: newBlockTimeTo,
        branch: newBranch.value,
        fee: newFee,
        block_days: newBlockDays,
      };
      
      try {
        const response = await fetch('https://euctostaging.com/prolife/api/masters/doctor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(databody),
  
        });
        const data = await response.json();
        setDoctorMaster([...doctorMaster, data[0]]);
        Swal.fire({
          icon: 'success',
          title: 'Doctor Created successfully !',
          showConfirmButton: false,
          timer: 1800
        })
        setNewDesignation('');
        setNewName('');
        setNewEmail('');
        setNewMobile('');
        setNewWhatappNum('');
        setNewProlifeDoctor('');
        setNewReferral('');
        setNewOnConsultant('');
        setNewCity('');
        setNewState('');
        setNewQualification('');
        setNewRegistration('');
        setNewBlockDateFrom('');
        setNewBlockDateTo('');
        setNewBlockTimeFrom('');
        setNewBlockTimeTo('');
        setNewBranch('');
        setNewFee('');
        setNewBlockDays('');
      } catch (error) {
        console.log(error);
      }
    };


  // const handleUploadImage = (event) => {
  //   const imageFile = event.target.files[0];
  //   const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  //   if (imageFile && allowedTypes.includes(imageFile.type)) {
  //     const imageURL = URL.createObjectURL(imageFile);
  //     setUploadedImage(imageURL);
  //     setShowResetButton(true); 
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Invalid file type. Please upload an image (jpeg, jpg, png, gif).',
  //     })
  //   }
  // };
  // const handleReset = () => {
  //   setUploadedImage(null);
  //   setShowResetButton(false)
  // };
  // const dummyImage = "https://media.istockphoto.com/id/1225961106/vector/doctor-flat-line-icon-vector-outline-illustration-of-male-physician-in-coat-with-stethoscope.jpg?s=612x612&w=0&k=20&c=HIO_PYuz5h8lHAPUFWVLq5wrTmRDrKxu5-G4_4t9Z0A=";



  return (
    <div>
      <Navbarall/>
      <div>
      <div className='pt-5 px-4 py-4'>
         <div  style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
          <div className='row pt-3 px-3'>
            <Col><h3> <FaUserDoctor size={35} className='mr-3'/>Create Doctor</h3></Col>
            <Col style={{textAlign:'right'}}>
              <NavLink to='/Main/Master/DoctorMasterTable'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
            </Col>
          </div><hr/>
          <div className='px-2 py-3'>
            <Form>
              <Row>
                <Col>
                <Form.Group>
                    <Form.Label>Designation</Form.Label>
                    <Form.Control value={newDesignation} onChange={(e)=>setNewDesignation(e.target.value) } autoComplete='off' type="text" placeholder="Enter Designation" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label  className=''>Doctor's Name</Form.Label>
                    <Form.Control value={newName} onChange={(e)=>setNewName(e.target.value) } autoComplete='off' type="text" placeholder="Enter Doctor's Name" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='py-4'>
                <Col>
                  <Form.Group>
                    <Form.Label  className=''>Email ID</Form.Label>
                    <Form.Control value={newEmail} onChange={(e)=>setNewEmail(e.target.value) } autoComplete='off' type="email" placeholder="Enter Email ID" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label  className=''>Mobile Number</Form.Label>
                    <Form.Control value={newMobile} onChange={(e)=>setNewMobile(e.target.value) } autoComplete='off' type="number" placeholder="Mobile Number" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label  className=''>What's App number</Form.Label>
                    <Form.Control value={newWhatappNum} onChange={(e)=>setNewWhatappNum(e.target.value) } autoComplete='off' type="number" placeholder="What's App number" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className=''>
                <Col>
                  <Form.Group>
                    <Form.Label  className=''>Prolife's Doctor</Form.Label>
                    <div style={{border:'1px solid #000' , backgroundColor:'rgb(226 226 226 / 80%)', borderRadius:'15px'}} >
                    <RadioGroup value={newProlifeDoctor} onChange={(e)=>setNewProlifeDoctor(e.target.value)} row className='ml-2'>
                      <FormControlLabel value="Yes" control={<Radio />} label="YES" />
                      <FormControlLabel value="No" control={<Radio />} label="NO" />
                    </RadioGroup>
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label  className=''>Referrel Doctor</Form.Label>
                    <div style={{border:'1px solid #000' , backgroundColor:'rgb(226 226 226 / 80%)', borderRadius:'15px'}} >
                    <RadioGroup value={newReferral} onChange={(e)=>setNewReferral(e.target.value)} row className='ml-2'>
                      <FormControlLabel value="Yes" control={<Radio />} label="YES" />
                      <FormControlLabel value="No" control={<Radio />} label="NO" />
                    </RadioGroup>
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label  className=''>On call Consultant</Form.Label>
                    <div style={{border:'1px solid #000' , backgroundColor:'rgb(226 226 226 / 80%)', borderRadius:'15px'}} >
                    <RadioGroup value={newOnConsultant} onChange={(e)=>setNewOnConsultant(e.target.value)} row className='ml-2'>
                      <FormControlLabel value="Yes" control={<Radio />} label="YES" />
                      <FormControlLabel value="No" control={<Radio />} label="NO" />
                    </RadioGroup>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row className='py-4'>
                {/* <Col>

                   <Form.Group>
                     <Form.Label>Status</Form.Label>
                      <Select options={options} />
                  </Form.Group>
                </Col> */}
                <Col>
                  <Form.Group>
                    <Form.Label  className=''>City</Form.Label>
                    <Form.Control value={newCity} onChange={(e)=> setNewCity(e.target.value) } autoComplete='off' type="text" placeholder="Enter City" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label  className=''>State</Form.Label>
                    <Form.Control value={newState} onChange={(e)=> setNewState(e.target.value) } autoComplete='off' type="text" placeholder="Enter State" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                <Form.Group>
                <Form.Label >Qualification</Form.Label>
                    <Form.Control value={newQualification} onChange={(e)=> setNewQualification(e.target.value)} autoComplete='off' type="text" placeholder="Enter Doctor's Qualification" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label  className=''>Registration</Form.Label>
                    <Form.Control value={newRegistration} onChange={(e)=> setNewRegistration(e.target.value) } autoComplete='off' type="text" placeholder="Enter Registration" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='py-4'>
                <Col >
                  <Form.Group  className='d-grid'>
                    <Form.Label  style={{width: '100%'}}>Block days from</Form.Label>
                  <DatePicker
                      placeholderText="DD/MM/YYYY"
                      selected={selectedDate}
                      onChange={handleDateChangeFrom}
                      value={newBlockDateFrom}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                      showMonthDropdown
                      scrollableMonthYearDropdown
                      customInput={
                        <input type="text" id="txtDate" placeholderText="Select a date" name="SelectedDate" readOnly  style={{ cursor: 'pointer',height: '40px', width: '100%'}}/>}/>
                </Form.Group>
                </Col>

                <Col >
                <Form.Group  className='d-grid'>
                    <Form.Label  style={{width: '100%'}}>Block days to</Form.Label>
                  <DatePicker 
                      placeholderText="DD/MM/YYYY"
                      selected={selectedDate}
                      onChange={handleDateChangeTo}
                      value={newBlockDateTo}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                      showMonthDropdown
                      scrollableMonthYearDropdown
                      customInput={
                        <input type="text" id="txtDate"  name="SelectedDate" readOnly  style={{ cursor: 'pointer', height: '40px', width: '100%' }}/>
                      }/>
                </Form.Group>
                </Col>
              </Row>

              <Row >
                <Col>
                  <Form.Group>
                    <Form.Label style={{width:'100%', display:'flex'}}>Block from time<p className='mb-0 pl-2 text-danger'> (HH:MM)</p></Form.Label>
                     <Form.Control value={newBlockTimeFrom} onChange={(e)=> setNewBlockTimeFrom(e.target.value)} autoComplete='off' type="time" placeholder="00:00" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label style={{width:'100%', display:'flex'}}>Blocks to time <p className='mb-0 pl-2 text-danger'> (HH:MM)</p></Form.Label>
                     <Form.Control value={newBlockTimeTo} onChange={(e)=> setNewBlockTimeTo(e.target.value)} autoComplete='off' type="time" placeholder="00:00" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='py-4'>
                <Col>
                <Form.Group>
            <Form.Label>Select Branch:</Form.Label>
            <Select
              options={options}
              value={newBranch}
              onChange={handleBranchChange}
              isClearable={true}  />
          </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label  className=''>Fees</Form.Label>
                    <Form.Control value={newFee} onChange={(e)=> setNewFee(e.target.value)} autoComplete='off' type="text" placeholder="Enter Doctor's Name" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Label>Select Days Doctor Available</Form.Label>
              <Row>
                  {optioner.map(option => (
                    <Col key={option.value} xs={6} sm={4} md={3} lg={2}>
                    {/* <Col key={option.value} xs={6} sm={4} md={3} lg={2}> */}
                      <Form.Check
                        type="checkbox"
                        id={option.value}
                        label={option.label}
                        checked={newBlockDays.includes(option.value)}
                        onChange={() => handleOptionChange(option.value)}
                      />
                    </Col>
                  ))}
            </Row>
              {/* <Row className="py-4">
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Upload ID Proof</Form.Label>
                    <Form.Control type="file" onChange={handleUploadImage} />
                  </Form.Group>
                  {showResetButton && (
                  <div className='pt-4'>
                      <Button onClick={handleReset} style={{ fontFamily: 'sans-serif',backgroundColor:'rgb(255 79 91)'}}>Reupload Image</Button>
                  </div>
                   )}
                  </Col>
                 
                  <Col>
                    <div style={{ display: 'flex' }}>
                      <div>
                        {uploadedImage ? (
                          <div >
                            <h6 style={{ fontFamily: 'sans-serif'}}>Doctor's Image:</h6>
                            <div style={{ maxWidth: '150px', maxHeight: '300px', overflow: 'hidden' }}>
                              <img src={uploadedImage} alt="Uploaded" style={{ width: '100%', height: 'auto' }} />
                            </div>

                          </div>

                          ) : (
                            <div>
                              <div style={{ maxWidth: '150px', maxHeight: '200px', overflow: 'hidden' }}>
                                <img src={dummyImage} alt="Dummy" style={{ width: '100%', height: 'auto' }} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                  </Col>
              </Row> */}
              <div style={{textAlign:"center", paddingTop:'30px'}}>
                <Button onClick={createDoctor} style={{backgroundColor:'green',borderColor:'green'}}>Submit</Button>
              </div>
            </Form>
          </div>

         </div>
       </div>
      </div>
    </div>
  )
}

export default DoctorMaster

























// import React,{useState,useRef} from 'react';
// import Navbarall from '../Navbarall';
// import {Form,Button,Row,Col,Table} from 'react-bootstrap';
// import {BsHospital} from 'react-icons/bs';
// import {IoChevronBackCircleOutline} from 'react-icons/io5';
// import {FaUserDoctor} from 'react-icons/fa6';
// import {NavLink} from 'react-router-dom'
// import Select from 'react-select';
// import { RadioGroup, FormControlLabel, Radio,Checkbox  } from '@mui/material';
// import DatePicker from 'react-datepicker';
// import { TimePicker } from 'antd';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2'


// const format = 'HH:mm';



// const options = [
//   { value: 'Kavitha S', label: 'Kavitha S' },
//   { value: 'Harini', label: 'Harini' },
//   { value: 'Joyhi Sree', label: 'Joyhi Sree' }
// ]


// const DoctorMaster = () => {
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null)
//   const [showResetButton, setShowResetButton] = useState(false)

//   const [doctorMaster, setDoctorMaster] = useState([]);
//   const [newId, setNewId] = useState('');
//   const [newDesignation, setNewDesignation] = useState('')
//   const [newName, setNewName] = useState('')
//   const [newEmail, setNewEmail] = useState('')
//   const [newMobile, setNewMobile] = useState('')
//   const [newWhatappNum, setNewWhatappNum] = useState('')
//   const [newProlifeDoctor, setNewProlifeDoctor] = useState('')
//   const [newReferral, setNewReferral] = useState('')
//   const [newOnConsultant, setNewOnConsultant] = useState('')
//   const [newCity, setNewCity] = useState('');
//   const [newState, setNewState] = useState('');
//   const [newQualification, setNewQualification ] = useState('')
//   const [newRegistration, setNewRegistration] = useState('')
//   const [newBlockDateFrom, setNewBlockDateFrom] = useState('');
//   const [newBlockDateTo, setNewBlockDateTo] = useState('');
//   const [newBlockTimeFrom, setNewBlockTimeFrom] = useState('');
//   const [newBlockTimeTo, setNewBlockTimeTo] = useState('');
//   const [newBranch, setNewBranch] = useState('');
//   const [newFee, setNewFee] = useState('');
//   const [newBlockDays, setNewBlockDays] = useState('')


//   const optioner = [
//     { value: 'Monday', label: 'Monday' },
//     { value: 'Tuesday', label: 'Tuesday' },
//     { value: 'Wednesday', label: 'Wednesday' },
//     { value: 'Thursday', label: 'Thursday' },
//     { value: 'Friday', label: 'Friday' },
//     { value: 'Saturday', label: 'Saturday' },
//     { value: 'Sunday', label: 'Sunday' },
//   ];

//   const handleOptionChange = (value) => {
//     if (newBlockDays.includes(value)) {
//       setNewBlockDays(newBlockDays.filter(option => option !== value));
//     } else {
//       setNewBlockDays([...newBlockDays, value]);
//     }
//   };


//   const handleDateChangeFrom = (date) => {
//     setSelectedDate(date);
//     setNewBlockDateFrom(date.toLocaleDateString())

//   };
//   const handleDateChangeTo = (date) => {
//     setSelectedDate(date);
//     setNewBlockDateTo(date.toLocaleDateString())
//   };

//     /////////  Create Input data ///////////////////
//     const createDoctor = async (event) => {
//       event.preventDefault();
//       const databody = {
//         designation: newDesignation,
//         name: newName,
//         email: newEmail,
//         mobile: newMobile,
//         whatsapp_no: newWhatappNum,
//         a4_doctor: newProlifeDoctor,
//         referral_doctor: newReferral,
//         on_call_consultant: newOnConsultant,
//         city: newCity,
//         state: newState,
//         qualification: newQualification,
//         registration_no: newRegistration,
//         block_days_from: newBlockDateFrom,
//         block_days_to: newBlockDateTo,
//         block_days_from_time: newBlockTimeFrom,
//         block_days_to_time: newBlockTimeTo,
//         branch: newBranch,
//         fee: newFee,
//         block_days: newBlockDays,
//       };
      
//       try {
//         const response = await fetch('https://euctostaging.com/prolife/api/masters/doctor', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(databody),
  
//         });
//         const data = await response.json();
//         setDoctorMaster([...doctorMaster, data[0]]);
//         Swal.fire({
//           icon: 'success',
//           title: 'Doctor Created successfully !',
//           showConfirmButton: false,
//           timer: 1800
//         })
//         setNewDesignation('');
//         setNewName('');
//         setNewEmail('');
//         setNewMobile('');
//         setNewWhatappNum('');
//         setNewProlifeDoctor('');
//         setNewReferral('');
//         setNewOnConsultant('');
//         setNewCity('');
//         setNewState('');
//         setNewQualification('');
//         setNewRegistration('');
//         setNewBlockDateFrom('');
//         setNewBlockDateTo('');
//         setNewBlockTimeFrom('');
//         setNewBlockTimeTo('');
//         setNewBranch('');
//         setNewFee('');
//         setNewBlockDays('');
//       } catch (error) {
//         console.log(error);
//       }
//     };


//   // const handleUploadImage = (event) => {
//   //   const imageFile = event.target.files[0];
//   //   const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
//   //   if (imageFile && allowedTypes.includes(imageFile.type)) {
//   //     const imageURL = URL.createObjectURL(imageFile);
//   //     setUploadedImage(imageURL);
//   //     setShowResetButton(true); 
//   //   } else {
//   //     Swal.fire({
//   //       icon: 'error',
//   //       title: 'Oops...',
//   //       text: 'Invalid file type. Please upload an image (jpeg, jpg, png, gif).',
//   //     })
//   //   }
//   // };
//   // const handleReset = () => {
//   //   setUploadedImage(null);
//   //   setShowResetButton(false)
//   // };
//   // const dummyImage = "https://media.istockphoto.com/id/1225961106/vector/doctor-flat-line-icon-vector-outline-illustration-of-male-physician-in-coat-with-stethoscope.jpg?s=612x612&w=0&k=20&c=HIO_PYuz5h8lHAPUFWVLq5wrTmRDrKxu5-G4_4t9Z0A=";



//   return (
//     <div>
//       <Navbarall/>
//       <div>
//       <div className='pt-5 px-4 py-4'>
//          <div  style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
//           <div className='row pt-3 px-3'>
//             <Col><h3> <FaUserDoctor size={35} className='mr-3'/>Create Doctor</h3></Col>
//             <Col style={{textAlign:'right'}}>
//               <NavLink to='/Main/Master/DoctorMasterTable'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
//             </Col>
//           </div><hr/>
//           <div className='px-2 py-3'>
//             <Form>
//               <Row>
//                 <Col>
//                 <Form.Group>
//                     <Form.Label>Designation</Form.Label>
//                     <Form.Control value={newDesignation} onChange={(e)=>setNewDesignation(e.target.value) } autoComplete='off' type="text" placeholder="Enter Designation" />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label  className=''>Doctor's Name</Form.Label>
//                     <Form.Control value={newName} onChange={(e)=>setNewName(e.target.value) } autoComplete='off' type="text" placeholder="Enter Doctor's Name" />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className='py-4'>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label  className=''>Email ID</Form.Label>
//                     <Form.Control value={newEmail} onChange={(e)=>setNewEmail(e.target.value) } autoComplete='off' type="email" placeholder="Enter Email ID" />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label  className=''>Mobile Number</Form.Label>
//                     <Form.Control value={newMobile} onChange={(e)=>setNewMobile(e.target.value) } autoComplete='off' type="number" placeholder="Mobile Number" />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label  className=''>What's App number</Form.Label>
//                     <Form.Control value={newWhatappNum} onChange={(e)=>setNewWhatappNum(e.target.value) } autoComplete='off' type="number" placeholder="What's App number" />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className=''>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label  className=''>Prolife's Doctor</Form.Label>
//                     <div style={{border:'1px solid #000' , backgroundColor:'rgb(226 226 226 / 80%)', borderRadius:'15px'}} >
//                     <RadioGroup value={newProlifeDoctor} onChange={(e)=>setNewProlifeDoctor(e.target.value)} row className='ml-2'>
//                       <FormControlLabel value="Yes" control={<Radio />} label="YES" />
//                       <FormControlLabel value="No" control={<Radio />} label="NO" />
//                     </RadioGroup>
//                     </div>
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label  className=''>Referrel Doctor</Form.Label>
//                     <div style={{border:'1px solid #000' , backgroundColor:'rgb(226 226 226 / 80%)', borderRadius:'15px'}} >
//                     <RadioGroup value={newReferral} onChange={(e)=>setNewReferral(e.target.value)} row className='ml-2'>
//                       <FormControlLabel value="Yes" control={<Radio />} label="YES" />
//                       <FormControlLabel value="No" control={<Radio />} label="NO" />
//                     </RadioGroup>
//                     </div>
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label  className=''>On call Consultant</Form.Label>
//                     <div style={{border:'1px solid #000' , backgroundColor:'rgb(226 226 226 / 80%)', borderRadius:'15px'}} >
//                     <RadioGroup value={newOnConsultant} onChange={(e)=>setNewOnConsultant(e.target.value)} row className='ml-2'>
//                       <FormControlLabel value="Yes" control={<Radio />} label="YES" />
//                       <FormControlLabel value="No" control={<Radio />} label="NO" />
//                     </RadioGroup>
//                     </div>
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className='py-4'>
//                 {/* <Col>

//                    <Form.Group>
//                      <Form.Label>Status</Form.Label>
//                       <Select options={options} />
//                   </Form.Group>
//                 </Col> */}
//                 <Col>
//                   <Form.Group>
//                     <Form.Label  className=''>City</Form.Label>
//                     <Form.Control value={newCity} onChange={(e)=> setNewCity(e.target.value) } autoComplete='off' type="text" placeholder="Enter City" />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label  className=''>State</Form.Label>
//                     <Form.Control value={newState} onChange={(e)=> setNewState(e.target.value) } autoComplete='off' type="text" placeholder="Enter State" />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col>
//                 <Form.Group>
//                 <Form.Label >Qualification</Form.Label>
//                     <Form.Control value={newQualification} onChange={(e)=> setNewQualification(e.target.value)} autoComplete='off' type="text" placeholder="Enter Doctor's Qualification" />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label  className=''>Registration</Form.Label>
//                     <Form.Control value={newRegistration} onChange={(e)=> setNewRegistration(e.target.value) } autoComplete='off' type="text" placeholder="Enter Registration" />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className='py-4'>
//                 <Col >
//                   <Form.Group  className='d-grid'>
//                     <Form.Label  style={{width: '100%'}}>Block days from</Form.Label>
//                   <DatePicker
//                       placeholderText="DD/MM/YYYY"
//                       selected={selectedDate}
//                       onChange={handleDateChangeFrom}
//                       value={newBlockDateFrom}
//                       dateFormat="dd/MM/yyyy"
//                       showYearDropdown
//                       scrollableYearDropdown
//                       showMonthDropdown
//                       scrollableMonthYearDropdown
//                       customInput={
//                         <input type="text" id="txtDate" placeholderText="Select a date" name="SelectedDate" readOnly  style={{ cursor: 'pointer',height: '40px', width: '100%'}}/>}/>
//                 </Form.Group>
//                 </Col>

//                 <Col >
//                 <Form.Group  className='d-grid'>
//                     <Form.Label  style={{width: '100%'}}>Block days to</Form.Label>
//                   <DatePicker 
//                       placeholderText="DD/MM/YYYY"
//                       selected={selectedDate}
//                       onChange={handleDateChangeTo}
//                       value={newBlockDateTo}
//                       dateFormat="dd/MM/yyyy"
//                       showYearDropdown
//                       scrollableYearDropdown
//                       showMonthDropdown
//                       scrollableMonthYearDropdown
//                       customInput={
//                         <input type="text" id="txtDate"  name="SelectedDate" readOnly  style={{ cursor: 'pointer', height: '40px', width: '100%' }}/>
//                       }/>
//                 </Form.Group>
//                 </Col>
//               </Row>

//               <Row >
//                 <Col>
//                   <Form.Group>
//                     <Form.Label style={{width:'100%', display:'flex'}}>Block from time<p className='mb-0 pl-2 text-danger'> (HH:MM)</p></Form.Label>
//                      <Form.Control value={newBlockTimeFrom} onChange={(e)=> setNewBlockTimeFrom(e.target.value)} autoComplete='off' type="time" placeholder="00:00" />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label style={{width:'100%', display:'flex'}}>Blocks to time <p className='mb-0 pl-2 text-danger'> (HH:MM)</p></Form.Label>
//                      <Form.Control value={newBlockTimeTo} onChange={(e)=> setNewBlockTimeTo(e.target.value)} autoComplete='off' type="time" placeholder="00:00" />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className='py-4'>
//                 <Col>
//                 <Form.Group>
//                     <Form.Label>Branch</Form.Label>
//                     <Select  options={options} />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label  className=''>Fees</Form.Label>
//                     <Form.Control value={newFee} onChange={(e)=> setNewFee(e.target.value)} autoComplete='off' type="text" placeholder="Enter Doctor's Name" />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Form.Label>Select Days Doctor Available</Form.Label>
//               <Row>
//                   {optioner.map(option => (
//                     <Col key={option.value} xs={6} sm={4} md={3} lg={2}>
//                     {/* <Col key={option.value} xs={6} sm={4} md={3} lg={2}> */}
//                       <Form.Check
//                         type="checkbox"
//                         id={option.value}
//                         label={option.label}
//                         checked={newBlockDays.includes(option.value)}
//                         onChange={() => handleOptionChange(option.value)}
//                       />
//                     </Col>
//                   ))}
//             </Row>
//               {/* <Row className="py-4">
//                 <Col>
//                   <Form.Group controlId="formBasicEmail">
//                     <Form.Label>Upload ID Proof</Form.Label>
//                     <Form.Control type="file" onChange={handleUploadImage} />
//                   </Form.Group>
//                   {showResetButton && (
//                   <div className='pt-4'>
//                       <Button onClick={handleReset} style={{ fontFamily: 'sans-serif',backgroundColor:'rgb(255 79 91)'}}>Reupload Image</Button>
//                   </div>
//                    )}
//                   </Col>
                 
//                   <Col>
//                     <div style={{ display: 'flex' }}>
//                       <div>
//                         {uploadedImage ? (
//                           <div >
//                             <h6 style={{ fontFamily: 'sans-serif'}}>Doctor's Image:</h6>
//                             <div style={{ maxWidth: '150px', maxHeight: '300px', overflow: 'hidden' }}>
//                               <img src={uploadedImage} alt="Uploaded" style={{ width: '100%', height: 'auto' }} />
//                             </div>

//                           </div>

//                           ) : (
//                             <div>
//                               <div style={{ maxWidth: '150px', maxHeight: '200px', overflow: 'hidden' }}>
//                                 <img src={dummyImage} alt="Dummy" style={{ width: '100%', height: 'auto' }} />
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                   </Col>
//               </Row> */}
//               <div style={{textAlign:"center", paddingTop:'30px'}}>
//                 <Button onClick={createDoctor} style={{backgroundColor:'green',borderColor:'green'}}>Submit</Button>
//               </div>
//             </Form>
//           </div>

//          </div>
//        </div>
//       </div>
//     </div>
//   )
// }

// export default DoctorMaster
