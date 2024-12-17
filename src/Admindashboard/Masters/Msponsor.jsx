import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper';
import { GrAddCircle } from 'react-icons/gr';
import { BsBackspace } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2';

const Msponsor = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(event.target);

      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }

      try {
        const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/sponser-master-insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          
        });

        if (response.ok) {
          // API call successful
          const responseData = await response.json();
          console.log(responseData); // Do something with the response data
          Swal.fire({
            icon: 'success',
            title: 'Created successfully !',
            showConfirmButton: false,
            timer: 1800
          })
        } else {
          // API call failed
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }

    setValidated(true);
  };

  return (
    <div>
      <Sidebar />
      <div style={{ width: '82.5%', float: 'right' }}>
        <Header />
        <div className="p-4">
          <Paper elevation={2} className="pb-5">
            <div className="row">
              <div className="col-6">
                <h3 className="p-4">
                  <GrAddCircle size={35} className="pe-2 pb-1" />
                  Sponsor Details form
                </h3>
              </div>
              <div className="col-6 text-end">
                <a href="/svsportaladmintest/Masters/AddSponsorlist">
                  <BsBackspace
                    size={60}
                    style={{ paddingTop: '20px', cursor: 'pointer', color: 'red' }}
                  />
                </a>
              </div>
            </div>
            <div className='pt-3'>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className='container'>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required autoComplete='off'
            type="text"
            name="name"
            placeholder="First name"
            defaultValue=""/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            required
            type="text"
            name="occupation"
            placeholder="Business or working professional"
            defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Company's Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="company_name"
            placeholder="example company"
            defaultValue=""/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="text"
            name="location"
            placeholder="Ex: Chennai"
            defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Email ID</Form.Label>
          <Form.Control
            required
            type="text"
            name="email_id"
            placeholder="example@gmail.com"
            defaultValue=""/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required
            type="number"
            name="phone"
            placeholder="9840xxxxx5"
            defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Address Line1</Form.Label>
          <Form.Control
            required
            type="text"
            name="address1"
            placeholder=""
            defaultValue=""/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Address Line2</Form.Label>
          <Form.Control
            required
            type="text"
            name="address2"
            placeholder=""
            defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            name="city"
            placeholder=""
            defaultValue=""/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>State</Form.Label>
          <Form.Control
            required
            type="text"
            name="state"
            placeholder=""
            defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            required
            type="number"
            name="pincode"
            placeholder=""
            defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        </Row>
{/* -------------------PAn------------------------------------------ */}
        <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>PAN Card Number</Form.Label>
          <Form.Control autoComplete='off'
            required
            type="text"
            name="pan"
            placeholder="XXXXXXXXXX"
            defaultValue=""/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>GST Number</Form.Label>
          <Form.Control autoComplete='off'
            required
            type="text"
            name="gst"
            placeholder="XXXXXXXXXX"
            defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        </Row>


        <Form.Control
            required
            type="hidden"
            name="status"
            defaultValue="1" />
          <Form.Control
            required
            type="hidden"
            name="created_by"
            defaultValue={sessionStorage.getItem('user_id')} />
      <div className='pt-3'>
       <Button  type="submit">Submit</Button>
      </div>
    </Form>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Msponsor;




// import React,{useState} from 'react';
// // import './dashboard.css';
// import Sidebar from '../Sidebar';
// import Header from '../Header';
// import Footer from '../Footer';
// import Paper from '@mui/material/Paper'; 
// import {GrAddCircle} from 'react-icons/gr';
// import {BsBackspace} from 'react-icons/bs';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';

// const Msponsor = () => {
//     const [validated, setValidated] = useState(false);

//     const handleSubmit = (event) => {
//       const form = event.currentTarget;
//       if (form.checkValidity() === false) {
//         event.preventDefault();
//         event.stopPropagation();
//       }
  
//       setValidated(true);
//     };
//   return (
//     <div>
       
//     <Sidebar/>
//  <div style={{width:'82.5%',float:'right'}} >
//    <Header/>
//     <div className='p-4'>
//     <Paper elevation={2} className="pb-5">
//             <div className='row'>
//               <div className='col-6'>
//                <h3 className='p-4'><GrAddCircle size={35} className='pe-2 pb-1'/>Sponsor Details form</h3>
//               </div>
//               <div className='col-6 text-end'>
//                <a href="/Masters/AddSponsorlist"><BsBackspace size={60} style={{paddingTop:'20px',cursor:'pointer',color:'red'}}/></a>
//               </div>
//             </div>
//             <div className='pt-3'>
//             <Form noValidate validated={validated} onSubmit={handleSubmit} className='container'>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="6" controlId="validationCustom01">
//           <Form.Label>Full Name</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="First name"
//             defaultValue=""/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="6" controlId="validationCustom02">
//           <Form.Label>Occupation</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Business or working proposition"
//             defaultValue="" />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>

//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="6" controlId="validationCustom01">
//           <Form.Label>Company's Name</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="example company"
//             defaultValue=""/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="6" controlId="validationCustom02">
//           <Form.Label>Location</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Ex: Chennai"
//             defaultValue="" />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>

//       <Row className="mb-3">
//         <Form.Group as={Col} md="6" controlId="validationCustom01">
//           <Form.Label>Email ID</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="example@gmail.com"
//             defaultValue=""/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="6" controlId="validationCustom02">
//           <Form.Label>Phone Number</Form.Label>
//           <Form.Control
//             required
//             type="number"
//             placeholder="9840xxxxx5"
//             defaultValue="" />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         </Row>

//       <Row className="mb-3">
//         <Form.Group as={Col} md="6" controlId="validationCustom01">
//           <Form.Label>Address Line1</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder=""
//             defaultValue=""/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="6" controlId="validationCustom02">
//           <Form.Label>Address Line2</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder=""
//             defaultValue="" />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         </Row>

//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>City</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder=""
//             defaultValue=""/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>State</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder=""
//             defaultValue="" />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Pincode</Form.Label>
//           <Form.Control
//             required
//             type="number"
//             placeholder=""
//             defaultValue="" />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         </Row>

//       <div className='pt-3'>
//        <Button  type="submit">Submit form</Button>
//       </div>
//     </Form>
//             </div>
//           </Paper>
//     </div>
//  </div>
//  </div>
//   )
// }

// export default Msponsor