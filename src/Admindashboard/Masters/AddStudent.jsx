import React, { useState } from 'react';
import {MdSchool} from 'react-icons/md'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Paper from '@mui/material/Paper'; 
import {ImBackward} from 'react-icons/im';

const AddStudent = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <div>
       
    <Sidebar/>
     <div style={{width:'82.5%',float:'right'}} >
   <Header/>
   <div className='container pt-5'>
     <Paper elevation={2} className="pb-5">
      <Row>
        <Col><h4 className='p-4'><MdSchool className='pb-1 pe-2' size={45}/>Admission</h4></Col>
        <Col className='text-end p-4'><a href='/Masters/AddStudentlist'><ImBackward size={40} style={{color:'red',cursor:'pointer'}} /></a></Col>
      </Row>
      
     <Form className='container pt-4' noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>1. NAME OF THE PUPIL *</Form.Label>
          <Form.Control name='student_name'
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>3.SEX*</Form.Label>
          <Form.Control name='sex'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>3.Date Of Birth *</Form.Label>
          <Form.Control
            required name='dob'
            type="date"    />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>4.Blood Group*</Form.Label>
          <Form.Control name="blood_group"
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>5.EMIS NO (If the child studied in the state of TN)</Form.Label>
          <Form.Control name="emis_no"
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>6.Nationality *</Form.Label>
          <Form.Control name='Nationality'
            required
            type="text"    />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>7.state*</Form.Label>
          <Form.Control name="State"
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>8.Religion</Form.Label>
          <Form.Control name='Religion'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>9.Denomination *</Form.Label>
          <Form.Control name='Denomination'
            required
            type="text"    />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>10.Caste*</Form.Label>
          <Form.Control name='Caste'
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>a.CasteClassification*</Form.Label>
          <Form.Control name='CasteClassification'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>11.AadhaarCardNo*</Form.Label>
          <Form.Control name='AadhaarCardNo'
            required
            type="text"    />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>11.AadhaarCardNo*</Form.Label>
          <Form.Control name='AadhaarCardNo'
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>12.RationCard No *</Form.Label>
          <Form.Control name='RationCard'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>13.Mothertongue of the pupil*</Form.Label>
          <Form.Control name='Mothertongue'
            required
            type="text"    />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

  <h4 className='py-3'>NAME OF THE PARENTS / GUARDIAN:</h4>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Father Name</Form.Label>
          <Form.Control name="Father"
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Mother Name</Form.Label>
          <Form.Control name='Mother'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Guardian Name</Form.Label>
          <Form.Control name='Guardian'
            required
            type="text"    />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Occupation:</Form.Label>
          <Form.Control name='Occupation'
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Organisation </Form.Label>
          <Form.Control name='Organisation'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Monthlyincome</Form.Label>
          <Form.Control name='Monthlyincome'
            required
            type="text"    />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

  <h4 className='py-3'>Permanent Address</h4>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Housenumber:</Form.Label>
          <Form.Control name='p_housenumber'
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Streetname:</Form.Label>
          <Form.Control name='p_Streetname'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>VillagetownName:</Form.Label>
          <Form.Control name='p_VillagetownName'
            required
            type="text"    />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Postoffice:</Form.Label>
          <Form.Control name='p_Postoffice'
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Taluk:</Form.Label>
          <Form.Control name='p_Taluk'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>District:</Form.Label>
          <Form.Control name='p_District'
            required
            type="text"    />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>State:</Form.Label>
          <Form.Control name='p_State'
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Pincode:</Form.Label>
          <Form.Control name='p_Pincode'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

  <h4 className='py-3'>ADDRESS FOR COMMUNICATION</h4>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>HouseNumber:</Form.Label>
          <Form.Control
            required name='c_HouseNumber'
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Streetname:</Form.Label>
          <Form.Control
            required name='c_StreetName'
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>VillagetownName:</Form.Label>
          <Form.Control name='c_VillageTownName'
            required
            type="text"    />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Postoffice:</Form.Label>
          <Form.Control
            required name='c_Postoffice'
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Taluk:</Form.Label>
          <Form.Control
            required name='c_Taluk'
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>District:</Form.Label>
          <Form.Control name='c_District'
            required
            type="text"    />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>State:</Form.Label>
          <Form.Control name='c_State'
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Pincode:</Form.Label>
          <Form.Control name='c_Pincode'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Mobilenumber:</Form.Label>
          <Form.Control name='Mobilenumber'
            required
            type="number"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>WhatsAppNo:</Form.Label>
          <Form.Control name='WhatsAppNo'
            required
            type="number"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>EmailID:</Form.Label>
          <Form.Control name='EmailID'
            required
            type="email"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

  <h4 className='py-3'>Class last Studied & Name of school</h4>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Class last Studied:</Form.Label>
          <Form.Control
            required name='ClasslastStudied'
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Name of school:</Form.Label>
          <Form.Control
            required name='Nameofschool'
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <p className='py-3'>File should be attached * ( 1. Community Certificate, 2. Aadhaar Card, 3. Ration Card, 4.Birth Certificate) Other board Transfer Certificate must have the counter sign from the Educational Officer.</p>

        <Form.Group className="position-relative mb-3">
            <Form.Label>Upload File Here</Form.Label>
            <Form.Control 
              type="file"name="File"
              required />
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Class for which admission is sought Std :</Form.Label>
       
          <Form.Select name='sought_Std' required aria-label="Default select example">
              <option></option>
              <option value="1">I</option>
              <option value="2">II</option>
              <option value="3">III</option>
              <option value="3">IV</option>
              <option value="3">V</option>
              <option value="3">VI</option>
              <option value="3">VII</option>
              <option value="3">IX</option>
              <option value="3">X</option>
              <option value="3">XI</option>
            </Form.Select>
        
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Part I ( for std . XI only)</Form.Label>
          <Form.Select name='Part_I' required aria-label="Default select example">
              <option></option>
              <option value="1">Tamil</option>
              <option value="2">English</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Please choose first preference:</Form.Label>
          <Form.Select name='Group' required aria-label="Default select example">
              <option></option>
              <option value="1">Group-I</option>
              <option value="2">Group-II</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>


      </Row>

  <h4 className='py-3'>FOOD</h4>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Vegetarian Or Non-Vegetarian:</Form.Label>
          <Form.Select name='FOOD' required aria-label="Default select example">
              <option></option>
              <option value="1">Vegetarian</option>
              <option value="2">Non-Vegetarian</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Any special information the parent would like to Give about the child:</Form.Label>
          <Form.Control name='special_information'
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>


      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>I Declare that the information given above is correct and that pupil has not attended any other school besides those mentioned above</Form.Label>
          <Form.Select name='Declare_not_attended' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>I declare that I will not ask for a change in dateofbirth in the future</Form.Label>
          <Form.Select name='Declare_not_attended' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>I agree to pay the School dues regularly *:</Form.Label>
          <Form.Select name='Declare_dob' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Date:</Form.Label>
            <Form.Control name='Declare_Date'
            required
            type="date"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Place:</Form.Label>
          <Form.Control name='Declare_Place'
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>


      </Row>

  <h3 className='py-3 text-center'>MEDICAL FORM</h3>
  <h4 className='py-3'>Please, tick if your child has had:</h4>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Measles</Form.Label>
          <Form.Select name='Measles' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Chickenpox</Form.Label>
          <Form.Select name='Chickenpox' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Fits</Form.Label>
          <Form.Select name='Fits' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Rheumaticfever</Form.Label>
          <Form.Select name='Rheumaticfever' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Mumps</Form.Label>
          <Form.Select name='Mumps' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Jaundice</Form.Label>
          <Form.Select name='Jaundice' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Asthma</Form.Label>
          <Form.Select name='Asthma' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Nephritis</Form.Label>
          <Form.Select name='Nephritis' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Whoopingcough</Form.Label>
          <Form.Select name='Whoopingcough' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Tuberculosis</Form.Label>
          <Form.Select name='Tuberculosis' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Hayfever</Form.Label>
          <Form.Select name='Hayfever' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>CongenitalHeartDisease</Form.Label>
          <Form.Select name='CongenitalHeartDisease' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

  <h4 className='py-3'>Family ( Parents )</h4>
  <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Tuberculosis:</Form.Label>
          <Form.Control name='P_Tuberculosis'
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Bronchial Asthma:</Form.Label>
          <Form.Control
            required name='P_Bronchial'
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <h4 className='py-3'>What inoculations has your child had? Please, Specify age at which given and how many.</h4>
       <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>BCG (against T.B):</Form.Label>
          <Form.Control
            required name='BCG'
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Triple Vaccine ( Diphtheria, Whooping cough, Tetanus):</Form.Label>
          <Form.Control
            required name='Triple_Vaccine'
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Polio Drops:</Form.Label>
          <Form.Control name='Polio_Drops'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
       </Row>
       <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Measles:</Form.Label>
          <Form.Control
            required name='Measles_given'
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>MMR:</Form.Label>
          <Form.Control name='MMR'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Dual Vaccine ( Diptheria , Tetanus)</Form.Label>
          <Form.Control name='Dual_Vaccine'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
       </Row>
       <Row className="mb-5">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Typhoid:</Form.Label>
          <Form.Control name='Typhoid'
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Cholera Number given and ages at which they are given</Form.Label>
          <Form.Control name='Cholera'
            required
            type="text"  />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
       </Row>

       <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>If none, please, state if you give permission to the Principal to arrange for the immunization of your child against polio ( oral vaccine ) and against diphtheria and tetanus ( injection).</Form.Label>
          <Form.Select name='permission_to_principal' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label className='pb-4'>In case of emergency I authorize the Principal of Santhosha Vidhyalaya, to give permission for operation or administration of anaesthetic to my child.</Form.Label>
          <Form.Select name='administration_of_anaesthetic' required aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>



      <Button className='bg-success' type="submit">Submit form</Button>
     </Form>
    </Paper>
    </div>
   <div>
     
   </div>
 </div>
 </div>
  )
}

export default AddStudent
