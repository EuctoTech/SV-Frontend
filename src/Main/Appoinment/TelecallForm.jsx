import React,{useEffect, useState} from 'react';
import Navbarall from '../Navbarall';
import {Form,Button,Col,Row} from 'react-bootstrap';
import {BiSolidPhoneCall} from 'react-icons/bi';
import {MdFileDownloadDone} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {IoChevronBackCircleOutline,IoPersonAdd} from 'react-icons/io5';
import Select from 'react-select';
import Swal from 'sweetalert2'


const TelecallForm = () => {
  const [options, setOptions] = useState([]);
  const [newBranch, setNewBranch] = useState(null);
  const [newTcpSelectBranch, setNewTcpSelectBranch] = useState(null)
  const [optionsNewPatient, setOptionsNewPatient] = useState([]);
  const [newBranchNewPatient, setNewBranchNewPatient] = useState(null);
  const [optionsID, setOptionsID] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [newAddPatient, setNewAddPatient] = useState([])
  const [newPatientName, setNewPatientName] = useState('')
  const [newPatientContact , setNewPatientContact] = useState('')
  const [newPatientBranch, setNewPatientBranch] = useState('')
  const [telecall, setTelecall] = useState([]);
  const [newTcpName, setNewTcpName] = useState('')
  const [newTcpNumber, setNewTcpNumber] = useState('')
  const [newTcpQueryCategory, setNewTcpQueryCategory] = useState('')
  const [newTcpQueryReason, setNewTcpQueryReason] = useState('')
  const [newTcpResolutionstatus, setNewTcpResolutionstatus] = useState('')
  const [newTcpRemark, setNewTcpRemark] = useState('')
  const [patientName, setPatientName] = useState('');
  const [patientPhoneNumber, setPatientPhoneNumber] = useState('');
  const [PatientID, setPatientID] = useState('');

  //Branch
  useEffect(() => {
    fetch('https://euctostaging.com/prolife/api/masters/branches')
      .then(response => response.json())
      .then(data => {
        const branchOptions = data.map(branch => ({
          value: branch.branch_name,
          label: `${branch.code} - ${branch.branch_name}`
        }));
        setOptions(branchOptions);
      })
      .catch(error => console.error('Error fetching branch data:', error));
  }, []);
  const handleBranchChange = (selectedOption) => {
    setNewBranch(selectedOption);
    setNewTcpSelectBranch(selectedOption.value)
  };

  //New patient Branch
  useEffect(() => {
    fetch('https://euctostaging.com/prolife/api/masters/branches')
      .then(response => response.json())
      .then(data => {
        const branchOptions = data.map(branch => ({
          value: branch.id,
          label: `${branch.code} - ${branch.branch_name}`
        }));
        setOptionsNewPatient(branchOptions);
      })
      .catch(error => console.error('Error fetching branch data:', error));
  }, []);
  const handleBranchNewPatient = (selectedOptionNewPatient) => {
    // show Branch
    setNewBranchNewPatient(selectedOptionNewPatient);
    //all Inter branch
    setNewPatientBranch(selectedOptionNewPatient.value)
  };

//Patient ID
useEffect(() => {
  // Fetch the list of patient IDs and populate the options
  fetch('https://euctostaging.com/prolife/api/patient/getPatientsSelect')
    .then((response) => response.json())
    .then((data) => {
      const patientIDs = data.map((patient) => ({
        value: patient.id,
        label: `${patient.uhid_patient_name}`,
        // Add patient data as custom properties
        patientName: patient.patient_name,
        patientPhoneNumber: patient.phone_number,
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

  // Extract patient data from selected option and set it in state
  setPatientName(selectedOption.patientName);
  setPatientPhoneNumber(selectedOption.patientPhoneNumber);
  setPatientID(selectedOption.patientID);
};
    

//Add Patient
const createNewPatient = async () => {

  try {
    const response = await fetch(`https://euctostaging.com/prolife/api/masters/patient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        patient_name: newPatientName,
        phone_number: newPatientContact,
        branch: newPatientBranch,
       }),
    });
    const data = await response.json();
    setNewAddPatient([...newAddPatient, data[0]]);
    console.log(data);
    Swal.fire({
      icon: 'success',
      title: 'Patient created successfully !',
      showConfirmButton: false,
      timer: 1800
    })
    setNewPatientName('');
    setNewPatientContact('');
    setNewPatientBranch('');
  } catch (error) {
    console.log(error);
  }
};


//Add all Telecalls
const createAllForm = async (event) => {

  event.preventDefault();
  const databody = {
    Patient_name: patientName,
    contact: patientPhoneNumber,
    remarks:newTcpRemark ,
    Category: newTcpQueryCategory,
    query_reason: newTcpQueryReason,
    resolution_status: newTcpResolutionstatus,
    branch: newTcpSelectBranch,
    Patient_id: PatientID
  };
  
  try {
    const response = await fetch('https://euctostaging.com/prolife/api/telecall', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(databody),

    });
    const data = await response.json();
    setTelecall([...telecall, data[0]]);
    Swal.fire({
      icon: 'success',
      title: 'Created successfully !',
      showConfirmButton: false,
      timer: 1800
    })
    
    setPatientName('');
    setPatientPhoneNumber('');
    setNewTcpRemark('');
    setNewTcpQueryCategory('');
    setNewTcpQueryReason('');
    setNewTcpResolutionstatus('');
    setNewTcpSelectBranch('');
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div>
      <Navbarall/>
      <div>
      <div className='pt-5 px-4 py-4'>
         <div  style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
         <div className='row pt-3 px-3'>
            <Col><h3> <BiSolidPhoneCall size={35} className='mr-3'/>Create Telecall</h3></Col>
            <Col style={{textAlign:'right'}}>
              <NavLink to='/Main/Appoinment/TelecallTable'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
            </Col>
          </div><hr/>
            <div className='py-3 container'>
                <Form>
                    <Row>
                    <Form.Control value={PatientID}
                            type='hidden' />
                    <Col>
                          <Form.Group>
                            <Form.Label>Patient ID</Form.Label>
                            <Select
                              options={optionsID}
                              value={selectedOption}
                              onChange={handlePatientId}/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Patient Name</Form.Label>
                            <Form.Control  value={patientName}
                          onChange={(e) => setPatientName(e.target.value)} />
                        </Form.Group>
                        </Col>
                   
                    </Row>
                    <Row className='pt-3'>
                        <Col>
                        <Form.Group>
                            <Form.Label>Contact No</Form.Label>PatientID
                            <Form.Control value={patientPhoneNumber}  onChange={(e) => setPatientPhoneNumber(e.target.value)} />
                        </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Query Category</Form.Label>
                            <Form.Control value={newTcpQueryCategory} onChange={(e)=> setNewTcpQueryCategory(e.target.value)} as='select'>
                                <option value='' disabled>--Select--</option>
                                <option value='Gynec'>Gynec</option>
                                <option value='Fertility'>Fertility</option>
                                <option value='Obs'>Obs</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row className='pt-3'>
                        <Col>
                        <Form.Group>
                            <Form.Label>Query Reason</Form.Label>
                            <Form.Control value={newTcpQueryReason} onChange={(e)=> setNewTcpQueryReason(e.target.value) } type='text' />
                        </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Resolution status</Form.Label>
                            <Form.Control value={newTcpResolutionstatus} onChange={(e)=> setNewTcpResolutionstatus(e.target.value)}  as='select'>
                                <option value='' disabled>--Select--</option>
                                <option value='pending'>pending</option>
                                <option value='Resolved'>Resolved</option>
                                {/* <option value='Forwarded'>Forwarded</option> */}
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>

                    <Row className='py-3'>
                      <Col xs={12} md={6}>
                      <Form.Group controlId="formBasicEmail">
                          <Form.Label>Select Branch :</Form.Label>
                          <Select
                            options={options}
                            value={newBranch}
                            onChange={handleBranchChange}/>
                        </Form.Group>
                        </Col>
                      <Col xs={12} md={6}>
                      <Form.Group controlId="formBasicEmail">
                          <Form.Label>Remark</Form.Label>
                           <Form.Control value={newTcpRemark} onChange={(e)=> setNewTcpRemark(e.target.value)} type='text' />
                        </Form.Group>
                        </Col>
                    </Row>
                    <div className='text-center pt-4'>
                        <Button onClick={createAllForm} className='bg-success'><MdFileDownloadDone className='mr-2'/>Submit</Button>
                    </div>
                </Form>
            </div>

              <div className='container mb-5' style={{border:'1px solid #000', borderRadius:'10px'}}>
                <div className='px-4 py-4'>
              <div className='pb-3'>
                <h3> <IoPersonAdd  className='mr-2'/>Create Patient</h3>
              </div>
              <Form>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formBasicEmail">
                            <Form.Label>Patient Name</Form.Label>
                            <Form.Control value={newPatientName} onChange={(e)=> setNewPatientName(e.target.value)} type='text' />
                    </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                    <Form.Group controlId="formBasicEmail">
                            <Form.Label>Patient Contact no</Form.Label>
                            <Form.Control value={newPatientContact} onChange={(e)=> setNewPatientContact(e.target.value)} type='number' />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} className='pt-3'>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Select Branch :</Form.Label>
                            <Select
                              options={optionsNewPatient}
                              value={newBranchNewPatient}
                              onChange={handleBranchNewPatient}/>
                          </Form.Group>
                          </Col>
                  <Col xs={12} md={6} className='pt-3' style={{marginTop:'32px'}}>
                    <Button onClick={createNewPatient} style={{backgroundColor:'#6D5DA8'}}><IoPersonAdd className='mr-2' />Add Patient</Button>
                  </Col>
                </Row>
              </Form>
              </div>
            </div>

         </div>
       </div>
      </div>
    </div>
  )
}

export default TelecallForm
















// import React,{useEffect, useState} from 'react';
// import Navbarall from '../Navbarall';
// import {Form,Button,Col,Row} from 'react-bootstrap';
// import {BiSolidPhoneCall} from 'react-icons/bi';
// import {MdFileDownloadDone} from 'react-icons/md';
// import { NavLink } from 'react-router-dom';
// import {IoChevronBackCircleOutline,IoPersonAdd} from 'react-icons/io5';
// import Select from 'react-select';
// import Swal from 'sweetalert2'


// const TelecallForm = () => {
//   const [options, setOptions] = useState([]);
//   const [newBranch, setNewBranch] = useState(null);
//   const [newTcpSelectBranch, setNewTcpSelectBranch] = useState(null)
//   const [optionsNewPatient, setOptionsNewPatient] = useState([]);
//   const [newBranchNewPatient, setNewBranchNewPatient] = useState(null);
//   const [optionsID, setOptionsID] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [newAddPatient, setNewAddPatient] = useState([])
//   const [newPatientName, setNewPatientName] = useState('')
//   const [newPatientContact , setNewPatientContact] = useState('')
//   const [newPatientBranch, setNewPatientBranch] = useState('')
//   const [telecall, setTelecall] = useState([]);
//   const [newTcpName, setNewTcpName] = useState('')
//   const [newTcpNumber, setNewTcpNumber] = useState('')
//   const [newTcpQueryCategory, setNewTcpQueryCategory] = useState('')
//   const [newTcpQueryReason, setNewTcpQueryReason] = useState('')
//   const [newTcpResolutionstatus, setNewTcpResolutionstatus] = useState('')
//   const [newTcpRemark, setNewTcpRemark] = useState('')
//   const [patientName, setPatientName] = useState('');
//   const [patientPhoneNumber, setPatientPhoneNumber] = useState('');


//   //Branch
//   useEffect(() => {
//     fetch('https://euctostaging.com/prolife/api/masters/branches')
//       .then(response => response.json())
//       .then(data => {
//         const branchOptions = data.map(branch => ({
//           value: branch.id,
//           label: `${branch.code} - ${branch.branch_name}`
//         }));
//         setOptions(branchOptions);
//       })
//       .catch(error => console.error('Error fetching branch data:', error));
//   }, []);
//   const handleBranchChange = (selectedOption) => {
//     setNewBranch(selectedOption);
//     setNewTcpSelectBranch(selectedOption.value)
//   };

//   //New patient Branch
//   useEffect(() => {
//     fetch('https://euctostaging.com/prolife/api/masters/branches')
//       .then(response => response.json())
//       .then(data => {
//         const branchOptions = data.map(branch => ({
//           value: branch.id,
//           label: `${branch.code} - ${branch.branch_name}`
//         }));
//         setOptionsNewPatient(branchOptions);
//       })
//       .catch(error => console.error('Error fetching branch data:', error));
//   }, []);
//   const handleBranchNewPatient = (selectedOptionNewPatient) => {
//     // show Branch
//     setNewBranchNewPatient(selectedOptionNewPatient);
//     //all Inter branch
//     setNewPatientBranch(selectedOptionNewPatient.value)
//   };

// //Patient ID

// useEffect(() => {
//   // Fetch the list of patient IDs and populate the options
//   fetch('https://euctostaging.com/prolife/api/patient/getPatientsSelect')
//     .then((response) => response.json())
//     .then((data) => {
//       const patientIDs = data.map((patient) => ({
//         value: patient.id,
//         label: `${patient.uhid_patient_name}`,
//         // Add patient data as custom properties
//         patientName: patient.patient_name,
//         patientPhoneNumber: patient.phone_number,
//       }));
//       setOptionsID(patientIDs);
//     })
//     .catch((error) => {
//       console.error('Error fetching Patient data:', error);
//     });
// }, []);

// const handlePatientId = (selectedOption) => {
//   setSelectedOption(selectedOption);

//   // Extract patient data from selected option and set it in state
//   setPatientName(selectedOption.patientName);
//   setPatientPhoneNumber(selectedOption.patientPhoneNumber);
// };
    

// //Add Patient
// const createNewPatient = async () => {

//   try {
//     const response = await fetch(`https://euctostaging.com/prolife/api/masters/patient`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ 
//         patient_name: newPatientName,
//         phone_number: newPatientContact,
//         branch: newPatientBranch,
//        }),
//     });
//     const data = await response.json();
//     setNewAddPatient([...newAddPatient, data[0]]);
//     console.log(data);
//     Swal.fire({
//       icon: 'success',
//       title: 'Patient created successfully !',
//       showConfirmButton: false,
//       timer: 1800
//     })
//     setNewPatientName('');
//     setNewPatientContact('');
//     setNewPatientBranch('');
//   } catch (error) {
//     console.log(error);
//   }
// };


// //Add all Telecalls
// const createAllForm = async (event) => {

//   event.preventDefault();
//   const databody = {
//     Patient_name: patientName,
//     contact: patientPhoneNumber,
//     remarks:newTcpRemark ,
//     Category: newTcpQueryCategory,
//     query_reason: newTcpQueryReason,
//     resolution_status: newTcpResolutionstatus,
//     branch: newTcpSelectBranch,
//   };
  
//   try {
//     const response = await fetch('https://euctostaging.com/prolife/api/telecall', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(databody),

//     });
//     const data = await response.json();
//     setTelecall([...telecall, data[0]]);
//     Swal.fire({
//       icon: 'success',
//       title: 'Doctor Created successfully !',
//       showConfirmButton: false,
//       timer: 1800
//     })
    
//     setPatientName('');
//     setPatientPhoneNumber('');
//     setNewTcpRemark('');
//     setNewTcpQueryCategory('');
//     setNewTcpQueryReason('');
//     setNewTcpResolutionstatus('');
//     setNewTcpSelectBranch('');
//   } catch (error) {
//     console.log(error);
//   }
// };


//   return (
//     <div>
//       <Navbarall/>
//       <div>
//       <div className='pt-5 px-4 py-4'>
//          <div  style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
//          <div className='row pt-3 px-3'>
//             <Col><h3> <BiSolidPhoneCall size={35} className='mr-3'/>Create Telecall</h3></Col>
//             <Col style={{textAlign:'right'}}>
//               <NavLink to='/Main/Appoinment/TelecallTable'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
//             </Col>
//           </div><hr/>
//             <div className='py-3 container'>
//                 <Form>
//                     <Row>
//                     <Col>
//                           <Form.Group>
//                             <Form.Label>Patient ID</Form.Label>
//                             <Select
//                               options={optionsID}
//                               value={selectedOption}
//                               onChange={handlePatientId}/>
//                         </Form.Group>
//                         </Col>
//                         <Col>
//                         <Form.Group>
//                             <Form.Label>Patient Name</Form.Label>
//                             <Form.Control  value={patientName}
//                           onChange={(e) => setPatientName(e.target.value)} />
//                         </Form.Group>
//                         </Col>
                   
//                     </Row>
//                     <Row className='pt-3'>
//                         <Col>
//                         <Form.Group>
//                             <Form.Label>Contact No</Form.Label>
//                             <Form.Control value={patientPhoneNumber}
//                             onChange={(e) => setPatientPhoneNumber(e.target.value)} />
//                         </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group>
//                             <Form.Label>Query Category</Form.Label>
//                             <Form.Control value={newTcpQueryCategory} onChange={(e)=> setNewTcpQueryCategory(e.target.value)} as='select'>
//                                 <option value='' disabled>--Select--</option>
//                                 <option value='Gynec'>Gynec</option>
//                                 <option value='Fertility'>Fertility</option>
//                                 <option value='Obs'>Obs</option>
//                             </Form.Control>
//                         </Form.Group>
//                         </Col>
//                     </Row>
//                     <Row className='pt-3'>
//                         <Col>
//                         <Form.Group>
//                             <Form.Label>Query Reason</Form.Label>
//                             <Form.Control value={newTcpQueryReason} onChange={(e)=> setNewTcpQueryReason(e.target.value) } type='text' />
//                         </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group>
//                             <Form.Label>Resolution status</Form.Label>
//                             <Form.Control value={newTcpResolutionstatus} onChange={(e)=> setNewTcpResolutionstatus(e.target.value)}  as='select'>
//                                 <option value='' disabled>--Select--</option>
//                                 <option value='pending'>pending</option>
//                                 <option value='Resolved'>Resolved</option>
//                                 {/* <option value='Forwarded'>Forwarded</option> */}
//                             </Form.Control>
//                         </Form.Group>
//                         </Col>
//                     </Row>

//                     <Row className='py-3'>
//                       <Col xs={12} md={6}>
//                       <Form.Group controlId="formBasicEmail">
//                           <Form.Label>Select Branch :</Form.Label>
//                           <Select
//                             options={options}
//                             value={newBranch}
//                             onChange={handleBranchChange}/>
//                         </Form.Group>
//                         </Col>
//                       <Col xs={12} md={6}>
//                       <Form.Group controlId="formBasicEmail">
//                           <Form.Label>Remark</Form.Label>
//                            <Form.Control value={newTcpRemark} onChange={(e)=> setNewTcpRemark(e.target.value)} type='text' />
//                         </Form.Group>
//                         </Col>
//                     </Row>
//                     <div className='text-center pt-4'>
//                         <Button onClick={createAllForm} className='bg-success'><MdFileDownloadDone className='mr-2'/>Submit</Button>
//                     </div>
//                 </Form>
//             </div>

//               <div className='container mb-5' style={{border:'1px solid #000', borderRadius:'10px'}}>
//                 <div className='px-4 py-4'>
//               <div className='pb-3'>
//                 <h3> <IoPersonAdd  className='mr-2'/>Create Patient</h3>
//               </div>
//               <Form>
//                 <Row>
//                   <Col xs={12} md={6}>
//                     <Form.Group controlId="formBasicEmail">
//                             <Form.Label>Patient Name</Form.Label>
//                             <Form.Control value={newPatientName} onChange={(e)=> setNewPatientName(e.target.value)} type='text' />
//                     </Form.Group>
//                     </Col>
//                     <Col xs={12} md={6}>
//                     <Form.Group controlId="formBasicEmail">
//                             <Form.Label>Patient Contact no</Form.Label>
//                             <Form.Control value={newPatientContact} onChange={(e)=> setNewPatientContact(e.target.value)} type='number' />
//                     </Form.Group>
//                   </Col>
//                   <Col xs={12} md={6} className='pt-3'>
//                         <Form.Group controlId="formBasicEmail">
//                             <Form.Label>Select Branch :</Form.Label>
//                             <Select
//                               options={optionsNewPatient}
//                               value={newBranchNewPatient}
//                               onChange={handleBranchNewPatient}/>
//                           </Form.Group>
//                           </Col>
//                   <Col xs={12} md={6} className='pt-3' style={{marginTop:'32px'}}>
//                     <Button onClick={createNewPatient} style={{backgroundColor:'#6D5DA8'}}><IoPersonAdd className='mr-2' />Add Patient</Button>
//                   </Col>
//                 </Row>
//               </Form>
//               </div>
//             </div>

//          </div>
//        </div>
//       </div>
//     </div>
//   )
// }

// export default TelecallForm































