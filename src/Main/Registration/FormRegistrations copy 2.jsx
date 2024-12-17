import React, { useState, useRef , useEffect} from 'react'
import Navbarall from '../Navbarall';
import {NavLink} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import {IoChevronBackCircleOutline} from 'react-icons/io5';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import Webcam from "react-webcam";
import Swal from 'sweetalert2';


 

const FormRegistrations = () => {

  const [isChecked, setIsChecked] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateRelation,setSelectedDateRelation] = useState(null);
  const webRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [patient, setPatient] = useState([]);
  const [newPatientName, setNewPatientName] = useState('');
  const [newGender, setNewGender] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newDob, setNewDob] = useState('');
  const [newMaritalStatus, setNewMaritalStatus] = useState('');
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newRelationName, setNewRelationName] = useState('');
  const [newRelationGender, setNewRelationGender] = useState('');
  const [newRelationAge, setNewRelationAge] = useState('');
  const [newRelationDob, setNewRelationDob] = useState('');
  const [newReferralDoctor, setNewReferralDoctor] = useState('');
  const [newReason, setNewReason] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newAddress2, setNewAddress2] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newAltnumber, setNewAltnumber] = useState('');
  const [newOccupation, setNewOccupation] = useState('');
  const [newNativePlace, setNewNativePlace] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSource, setNewSource] = useState('');
  // const [newBranch, setNewBranch] = useState('');//////////////////////////////////////////////////
  const [newprofilePic, setNewProfilePic] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  const [newIDProof, setNewIDProof] = useState(null);
  const [newIDProofdd, setNewIDProofdd] = useState(null);
  const [dataCheck, setDataCheck] = useState({}); // Define data state variable here

  const fileInputRef = useRef(null);
//patient options 
const [patientsOptions, setPatientsOptions] = useState([]);
const [selectedId, setSelectedId] = useState('');
const [newBranch, setNewBranch] = useState(null);
const [options, setOptions] = useState([]);
const [showWebcamID, setShowWebcamID] = useState(false);
const [screenshot, setScreenshot] = useState(null);

const handleButtonClick = () => {
  setShowWebcamID(true);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const handleCaptureid = () => {
  const imageSrc = webRef.current.getScreenshot();
  const blob = dataURItoBlob(imageSrc);
  const file = new File([blob], 'captured_image.png', { type: 'image/png' });

  // Set the captured image as newIDProof
  setNewIDProof(file);
  setScreenshot(imageSrc);
  setShowWebcamID(false);
};
const handleResetid = () => {
  setScreenshot(null);
  setShowWebcamID(false);
};
// Handle retaking a photo with the webcam
// const handleResetid = () => {
//   setScreenshot(null);
// };
 // Function to convert Data URI to Blob
 const dataURItoBlob = (dataURI) => {
  const splitDataURI = dataURI.split(',');
  const byteString = atob(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

const handleBranchChange = (selectedOption) => {
  setNewBranch(selectedOption.value);
};
  

  const handleSelectChange = (event) => {
    setSelectedId(event.target.value);
  };
const fetchPatientData = async (id) => {
  try {
    const response = await fetch(`https://euctostaging.com/prolife/api/masters/patient/${id}`);
    const data = await response.json();
    // Process the data or set it to state as needed
    console.log(data);
    setNewPatientName(data.patient_name);
    setNewGender(data.gender);
    setNewAge(data.age);
    setNewDob(data.dob);
    setNewMaritalStatus(data.martial_status);
    setNewPartnerName(data.partner_name);
    setNewRelationName(data.p_relation);
    setNewRelationGender(data.p_gender);
    setNewRelationAge(data.p_age);
    setNewRelationDob(data.p_dob);
    setNewReferralDoctor(data.referral_doctor);
    setNewReason(data.reason);
    setNewAddress(data.address);
    setNewAddress2(data.address2);
    setNewNumber(data.phone_number);
    setNewAltnumber(data.alt_phone_number);
    setNewOccupation(data.occupation);
    setNewNativePlace(data.native_place);
    setNewEmail(data.e_mail);
    setNewSource(data.source_website);
    setNewBranch(data.branch);
    setNewProfilePic(data.photo_url);
    setCapturedImage(data.photo_url);
    setNewIDProofdd(data.source_url);
    setIsChecked(data.is_couple === 1); /// mohamad do checked if is couple == 1
 
   
    const formData = new FormData();
     formData.append('patient_name', data.patient_name);
     formData.append('marital_status', data.martial_status);
     formData.append('age', data.age);
     formData.append('dob', data.dob);
     formData.append('gender', data.gender);
     formData.append('native_place', data.native_place);
     formData.append('branch', data.branch);
     formData.append('partner_name', data.partner_name);
     formData.append('p_gender', data.p_gender);
     formData.append('p_age', data.p_age);
     formData.append('p_dob', data.p_dob);
     formData.append('p_relation', data.p_relation);
     formData.append('referral_doctor', data.referral_doctor);
     formData.append('reason', data.reason);
     formData.append('address', data.address);
     formData.append('address2', data.address2);
     formData.append('source_website', data.source_website);
     formData.append('phone_number', data.phone_number);
     formData.append('alt_phone_number', data.alt_phone_number);
     formData.append('occupation', data.occupation);
     formData.append('e_mail', data.e_mail);
     setFormData(formData);

  } catch (error) {
    console.error('Error fetching patient data:', error);
  }
  };
  useEffect(() => {
    // Fetch patient data when selectedId changes
    if (selectedId) {
      fetchPatientData(selectedId);
    }
  }, [selectedId]);
  useEffect(() => {
    // Fetch data from the API to get the list of patients
    fetch('https://euctostaging.com/prolife/api/patient/getPatientsSelect')
      .then((response) => response.json())
      .then((data) => {
        // Map the response data to create the options array
        const options = data.map((patient) => ({
          value: patient.id.toString(), // Convert id to string as the select component requires string values
          label: patient.uhid_patient_name,
        }));
        // Add the default option as the first element of the options array
        options.unshift({ value: '', label: 'Select' });
        // Set the options state
        setPatientsOptions(options);
      })
      .catch((error) => console.log(error));
  }, []);
  

  //////////////////// 

  const handleCapture = () => {
    const screenshot = webRef.current.getScreenshot();
    setCapturedImage(screenshot);
    setNewProfilePic(screenshot);
  };

  const handleOpenCamera = () => {
    setShowCamera(true);
    setCapturedImage(null); // Reset capturedImage if switching to camera mode.
    setNewProfilePic(null); // Reset capturedImage if switching to camera mode.
  };



  /////////////////////////////FILE UPLOAD///////////////////////////////
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewIDProof(file);
   // Read the contents of the uploaded text file
   const reader = new FileReader();
   reader.onload = handleFileRead;
   reader.readAsText(file);
 };

 const handleFileRead = (e) => {
   const content = e.target.result;
   formData.append('fileContent', content);
  //  setFormData(formData); // Update the formData

  //  console.log('File Content:', content);
   // You can use the 'content' variable here to process the text data further if needed.
  };
    /////////////////////////////END FILE UPLOAD///////////////////////////////

  /////////  Create Input data ///////////////////
  const createPatient = async (event) => {
    event.preventDefault();
    // const databody = {
    //       patient_name:newPatientName,
    //       marital_status:newMaritalStatus,
    //       age:newAge,
    //       dob:newDob,
    //       gender:newGender,
    //       native_place:newNativePlace,
    //       branch:newBranch,
    //       partner_name:newPartnerName ,
    //       p_gender:newRelationGender,
    //       p_age:newRelationAge,
    //       p_dob:newRelationDob,
    //       p_relation:newRelationName,
    //       referral_doctor:newReferralDoctor,
    //       reason:newReason,
    //       address:newAddress,
    //       address2:newAddress2,
    //       source_website:newSource,
    //       phone_number:newNumber,
    //       alt_phone_number:newAltnumber,
    //       occupation:newOccupation,
    //       e_mail:newEmail,
    //       source_url:newIDProof,
    //       photo_url:newprofilePic,
    // };
// Create a new FormData object
const formData = new FormData();

// Append the fields with their values to the FormData
formData.append('patient_name', newPatientName);
formData.append('marital_status', newMaritalStatus);
formData.append('age', newAge);
formData.append('dob', newDob);
formData.append('gender', newGender);
formData.append('native_place', newNativePlace);
formData.append('branch', newBranch);
formData.append('partner_name', newPartnerName);
formData.append('p_gender', newRelationGender);
formData.append('p_age', newRelationAge);
formData.append('p_dob', newRelationDob);
formData.append('p_relation', newRelationName);
formData.append('referral_doctor', newReferralDoctor);
formData.append('reason', newReason);
formData.append('address', newAddress);
formData.append('address2', newAddress2);
formData.append('source_website', newSource);
formData.append('phone_number', newNumber);
formData.append('alt_phone_number', newAltnumber);
formData.append('occupation', newOccupation);
formData.append('e_mail', newEmail);
    // formData.append('source', newIDProof);
    if (newIDProof) {
      // Extract file name and extension from the selected file
      const fileNameWithoutPath = newIDProof.name.replace(/^.*[\\\/]/, '');
      const fileName = fileNameWithoutPath.split('.').shift(); // Extract file name without extension
      const fileExtension = fileNameWithoutPath.split('.').pop(); // Extract file extension
      formData.append('fileExtension', fileExtension);
      formData.append('fileName', fileName);
      formData.append('source', newIDProof);
  
    }
   
 formData.append('photo_name', newprofilePic);
formData.append('is_couple', isChecked ? 1 : 0);

    console.log("newPatientName:", newPatientName);

    try {
      const response = await fetch('https://euctostaging.com/prolife/api/masters/patient', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data', // Change this to 'multipart/form-data'
        // },
        body: formData,

      });
      const data = await response.json();
      setPatient([...patient, data[0]]);
      Swal.fire({
        icon: 'success',
        title: 'User Created successfully !',
        showConfirmButton: false,
        timer: 1800
      })
      setCapturedImage(null);

      setNewPatientName('');
      setNewGender('');
      setNewAge('');
      setNewDob('');
      setNewMaritalStatus('');
      setNewPartnerName('');
      setNewRelationName('');
      setNewRelationGender('');
      setNewRelationAge('');
      setNewRelationDob('');
      setNewReferralDoctor('');
      setNewReason('');
      setNewAddress('');
      setNewAddress2('');
      setNewNumber('');
      setNewAltnumber('');
      setNewOccupation('');
      setNewNativePlace('');
      setNewEmail('');
      setNewSource('');
      setNewBranch('');
      setNewProfilePic('');
      // setNewIDProof('');
      setNewIDProof(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset the file input value to clear the file name
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleReset = () => {
    setShowCamera(false);
    setCapturedImage(null);
    setErrorMessage('');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setNewDob(date.toLocaleDateString())
  };
  const handleDateChangeRelation = (date) => {
    setSelectedDateRelation(date);
    setNewRelationDob(date.toLocaleDateString())
  };
  
  const handleCheckboxChange = () =>{
    setIsChecked(!isChecked)
  }
  const handlePatientNameChange = (e) => {
    console.log("Patient Name Changed:", e.target.value);
    setNewPatientName(e.target.value);
  };
  useEffect(() => {
    setIsChecked(dataCheck === 1);
  }, [dataCheck]);
  
  return (
    <div>
      <Navbarall/>
      <div className='container py-4'>
        <div className='container py-4' style={{border:'1px solid #000', backgroundColor:'white',borderRadius:'10px'}}>
          <Row>
            <Col>
              <h3 style={{fontFamily:'serif'}}>Patient Registration</h3>
            </Col>
            <Col style={{textAlign:'right'}}>
              <NavLink to='/Main/Registration/Registrations'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
            </Col>
          </Row><hr/>
          
        
            <Row>
              <div className='offset-md-9 col-md-3'>
              <Form.Group controlId="formBasicEmail">
              <Form.Label>Select Patient</Form.Label>
              <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              style={{
                backgroundColor: '#f0f0f0',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                color: '#333',
                width: '100%',
                maxWidth: '300px', 
              }}>
         {patientsOptions.map((option) => (
           <option key={option.value} value={option.value}>
           {option.label}
         </option>
        ))}
      </select>
       </Form.Group>
              </div>
            </Row>
          <hr/>
  <Form>
            <Row>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Patient Name</Form.Label>
                  <Form.Control value={newPatientName}   onChange={(e)=> setNewPatientName(e.target.value)} autoComplete='on' type="text" placeholder="Enter Partner Name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as="select" value={newGender} onChange={(e)=> setNewGender(e.target.value)}  >
                    <option value='' disabled>--Select--</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
{/*------- ----------  Age and DOB-------------------- */}
            <Row className='pt-3'>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Age</Form.Label>
                  <Form.Control value={newAge}  onChange={(e)=> setNewAge(e.target.value)}
                  autoComplete='on' type="number" placeholder="Enter Age"  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='d-grid'>
                  <Form.Label style={{width: '100%'}}>DOB</Form.Label>
                  <DatePicker
                      placeholderText="DD/MM/YYYY"
                      selected={selectedDate}
                      onChange={handleDateChange}
                      value={newDob}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                      showMonthDropdown
                      scrollableMonthYearDropdown
                      customInput={
                        <input
                         type="text" id="txtDate" name="SelectedDate"   style={{ cursor: 'pointer', width:'100%', height:'35px' }}/>
                      }/>
                </Form.Group>
              </Col>
            </Row>
{/*------- ---------- Gender and Native Place -------------------- */}
            <Row className='pt-3'>
            <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Marital Status</Form.Label>
                    <Form.Control as="select" value={newMaritalStatus} onChange={(e)=> setNewMaritalStatus(e.target.value)} >
                      <option value='' >--Select--</option>
                      <option value="Married">Married</option>
                      <option value="Single">Single</option>
                      <option value="Divorced">Divorced</option>
                    </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label  className=''>Husband/Partner Name </Form.Label>
                  <Form.Control value={newPartnerName} onChange={(e)=> setNewPartnerName(e.target.value)}
                   autoComplete='on' type="text" placeholder="Enter Partner Number" />
                </Form.Group>
              </Col>
            </Row>
{/*----------  Check-Box ----------------- */}
      {/* Checkbox */}

      <div className='pt-3 pb-1'>
      <div class="checkbox-wrapper-37">
        <input type="checkbox" name="checkbox" id="terms-checkbox-37" checked={isChecked} onChange={handleCheckboxChange} />
        <label for="terms-checkbox-37" class="terms-label" style={{width:'30%'}}>
          <svg class="checkbox-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1_476_5-37" fill="white">
              <rect width="200" height="200" />
            </mask>
            <rect width="200" height="200" class="checkbox-box" stroke-width="40" mask="url(#path-1-inside-1_476_5-37)"/>
            <path class="checkbox-tick" d="M52 111.018L76.9867 136L149 64" stroke-width="15"/>
          </svg>
          <span class="label-text">Is-Couple</span>
        </label>
      </div>  
      

      {/* Input fields (conditionally rendered based on the checkbox value) */}
      {isChecked && (
        <div className='container py-2' style={{border:'1px solid #000',backgroundColor:'#eeeeee',borderRadius:'10px'}}>
            <Row className='pt-3'>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label  className=''>Relation type </Form.Label>
                  <Form.Control value={newRelationName} onChange={(e)=> setNewRelationName(e.target.value)}
                   autoComplete='on' type="text" placeholder="eg: Husband/wife" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as="select" value={newRelationGender} onChange={(e)=> setNewRelationGender(e.target.value)}>
                    <option value='' disabled>--Select--</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className='pt-3'>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Age</Form.Label>
                  <Form.Control value={newRelationAge} onChange={(e)=> setNewRelationAge(e.target.value)}
                   autoComplete='on' type="number" placeholder="Enter Number" />
                </Form.Group>
              </Col>
              <Col>

                <Form.Group className='d-grid'>
                  <Form.Label style={{width: '100%'}}>DOB</Form.Label>
                  <DatePicker
                      placeholderText="DD/MM/YYYY"
                      selected={selectedDateRelation}
                      onChange={handleDateChangeRelation}
                      value={newRelationDob}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                      showMonthDropdown
                      scrollableMonthYearDropdown
                      customInput={
                        <input 
                         type="text" id="txtDate" name="SelectedDate" style={{ cursor: 'pointer', width:'100%', height:'35px' }}/>
                      }/>
                </Form.Group>
              </Col>
            </Row>
        </div>
      )}
    </div>

  {/* ----------- Referral Doctor and Reason ---------- */}
       <Row className='pt-3'>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Referral Doctor</Form.Label>
                  <Form.Control value={newReferralDoctor} onChange={(e)=> setNewReferralDoctor(e.target.value)}
                   autoComplete='on' type="text" placeholder="Enter Doctor Name"  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Reason</Form.Label>
                   <Form.Control value={newReason} onChange={(e)=> setNewReason(e.target.value)} 
                    autoComplete='on' type="text" placeholder="Enter Reason"  />
                </Form.Group>
              </Col>
            </Row>
{/* ----------- Address and Address1 ---------- */}
           <Row className='pt-3'>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Address Line1</Form.Label>
                  <Form.Control value={newAddress} onChange={(e)=> setNewAddress(e.target.value)}
                   autoComplete='on' type="text" placeholder="Address"  />
                </Form.Group>
              </Col>
              <Col>
               <Form.Group controlId="formBasicEmail">
                  <Form.Label>Address Line2</Form.Label>
                  <Form.Control value={newAddress2} onChange={(e)=> setNewAddress2(e.target.value)}
                   autoComplete='on' type="text" placeholder="Address"  />
                </Form.Group>
              </Col>
            </Row>
{/*------- ----------  Alternative Number and Phn Number -------------------- */}
            <Row className='pt-3'>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control value={newNumber} onChange={(e)=> setNewNumber(e.target.value)}
                   autoComplete='on' type="number" placeholder="Enter Number"  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Alternate Phone Number</Form.Label>
                   <Form.Control value={newAltnumber} onChange={(e)=> setNewAltnumber(e.target.value)}
                   autoComplete='on' type="number" placeholder="Enter Alternate Number"  />
                </Form.Group>
              </Col>
            </Row>
{/* ----------- Occupation and Native Place ---------- */}
            <Row className='pt-3'>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Occupation</Form.Label>
                  <Form.Control value={newOccupation} onChange={(e)=> setNewOccupation(e.target.value)}
                   autoComplete='on' type="text" placeholder="Enter Occupation"  />
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Native Place</Form.Label>
                   <Form.Control value={newNativePlace} onChange={(e)=> setNewNativePlace(e.target.value)}
                   autoComplete='on' type="text" placeholder="Enter Native Place"  />
                </Form.Group>
              </Col>
            </Row>
{/* ----------- Email ID and Source ---------- */}
            <Row className='pt-3'>
            <Col>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email ID</Form.Label>
                   <Form.Control value={newEmail} onChange={(e)=> setNewEmail(e.target.value)}
                    autoComplete='on' type="email" placeholder="Enter Email ID"  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Label>Source</Form.Label>
                <Form.Control value={newSource} onChange={(e)=> setNewSource(e.target.value)}
                    autoComplete='on' type="text" placeholder="Which source did you find our hospital?"  />
              </Col>
            </Row>
{/* ----------- Branch ------------------------ */}
            <Row className='pb-3'>
              <Col xs={12} md={6}>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Select Branch :</Form.Label>
                  <Select options={options}
                    value={newBranch}
                     onChange={handleBranchChange} />
                </Form.Group>
                </Col>
            </Row>
{/* ---------  Image Upload & Upload ID Proof -------------------------- */}
    <div className='container' style={{border:'1px solid #000', borderRadius:'5px', paddingTop:'10px', paddingBottom:'10px'}}>
        <Row>
          <Col xs={12} md={6}>
              <Form.Group controlId="formBasicEmail">
                <h5 className='pb-2' style={{fontFamily:'sans-serif'}}>Patient/Couple picture upload</h5>
              <div style={{ display: 'flex' }}>
                {!showCamera && !capturedImage && (
                  <div className='mr-2'>
                    {/* <Button style={{background:'#81C548'}} onClick={() => document.getElementById('fileInput').click()}>Upload Picture</Button> */}
                    {/* <input
                      type="file"
                      id="fileInput"
                      style={{ display: 'none' }}
                      onChange={handleUploadFile} /> */}
                    <Button variant="outline-danger" onClick={handleOpenCamera}>Take Picture</Button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                  </div>
                )}
                <div style={{ marginLeft: '20px', marginTop:'30px'}}>
                  {showCamera && <Webcam ref={webRef} style={{ width: '50%'}} />}<br/>
                  {showCamera && <Button style={{background:'orange',fontFamily:'math'}} onClick={handleCapture}>Capture Now</Button>}
                  {capturedImage && (
                    <div>
                      <h4 style={{ fontFamily: 'math'}}>Patient's Image:</h4>
                      <div style={{ maxWidth: '200px', maxHeight: '300px', overflow: 'hidden' }}>
                        <img
                          src={capturedImage}
                          alt="Captured"
                          style={{ width: '100%', height: 'auto' }}/>
                      </div>
                      <div className='py-2'>
                        <Button  style={{background:'red',fontFamily:'math'}} onClick={handleReset}>Retake or Reset</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              </Form.Group>
          </Col>
          {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Col xs={12} md={6}>
      <Row>
        <Col>
          <Form.Group controlId="formBasicEmail">
            <h5 className='pb-2' style={{ fontFamily: 'sans-serif' }}>Upload ID Proof</h5>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            {newIDProof ? (
              <div>
                <a href={URL.createObjectURL(newIDProof)} target="_blank" rel="noopener noreferrer">
                  <strong><u>Click here to download proof</u></strong>
                </a>
              </div>
            ) : (
              <div>
                <span className='text-danger'></span>
              </div>
            )}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <div>
              {!showWebcamID && (
                <div style={{ paddingTop: '40px' }}>
                  <Button onClick={handleButtonClick} variant="outline-danger" >Open Webcam</Button>
                </div>
              )}

              {showWebcamID && (
                <div>
                  <Webcam ref={webRef} style={{ width: '100%' }} />

                  <Button className='bg-warning' onClick={handleCaptureid}>Capture</Button>

                 {idProofImage && (
                    <div className='py-4'>
                      <h6>ID Proof</h6>
                      <img src={URL.createObjectURL(idProofImage)} alt="Captured" />
                    </div>
                  )}


                  <Button className='bg-danger' onClick={handleResetid}>Retake</Button>
                </div>
              )}
            </div>
          </Form.Group>
        </Col>
      </Row>
    </Col>
              
        </Row>
        </div>

{/* ---------  Image Upload -------------------------- */}

            <div className='pt-3 text-center'>
               <Button onClick={createPatient} type="submit" style={{backgroundColor:'#37C50D'}}>Submit</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default FormRegistrations

 