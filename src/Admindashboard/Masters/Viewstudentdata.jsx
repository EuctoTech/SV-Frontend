import React, { useState } from 'react';
import {MdSchool,MdEditNote} from 'react-icons/md'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Paper from '@mui/material/Paper'; 
import {ImBackward} from 'react-icons/im';
import {SiCodereview} from 'react-icons/si';

const Viewstudentdata = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    student_name: "",
    sex: "",
    dob: "",
    blood_group: "",
    emis_no: "",
    Nationality: "",
    State: "",
    Religion: "",
    Denomination: "",
    Caste: "",
    CasteClassification: "",
    AadhaarCardNo: "",
    // AadhaarCardNo: "",
    RationCard: "",
    Mothertongue: "",
    Father: "",
    Mother: "",
    Guardian: "",
    Occupation: "",
    Organisation: "",
    Monthlyincome: "",
    p_Streetname: "",
    p_housenumber: "",
    p_VillagetownName: "",
    p_Postoffice: "",
    p_Taluk: "",
    p_District: "",
    p_State: "",
    p_Pincode: "",
    c_HouseNumber: "",
    c_StreetName: "",
    c_VillageTownName: "",
    c_Postoffice: "",
    c_Taluk: "",
    c_District: "",
    c_State: "",
    c_Pincode: "",
    Mobilenumber: "",
    WhatsAppNo: "",
    EmailID: "",
    ClasslastStudied: "",
    Nameofschool: "",
    Part_I: "",
    Group: "",
    sought_Std: "",
    FOOD: "",
    special_information: "",
    Declare_not_attended: "",
    Declare_attended: "",
    Declare_Place: "",
    Declare_Date: "",
    Measles: "",
    Chickenpox: "",
    Fits: "",
    Rheumaticfever: "",
    Mumps: "",
    Jaundice: "",
    Asthma: "",
    Nephritis: "",
    Whoopingcough: "",
    Tuberculosis: "",
    Hayfever: "",
    CongenitalHeartDisease: "",
    P_Tuberculosis: "",
    P_Bronchial: "",
    BCG: "",
    Polio_Drops: "",
    Triple_Vaccine: "",
    Measles_given: "",
    MMR: "",
    Dual_Vaccine: "",
    Cholera: "",
    Typhoid: "",
    permission_to_principal: "",
    administration_of_anaesthetic: "",
    
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // handle form submission
  //   setEditMode(false);
  // };
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      setEditMode(false);
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
     <Form className='container ' noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Col><h4 className='p-4'><SiCodereview className='pb-1 pe-2' size={40}/>View Details</h4></Col>
        {/* <Col className='text-end p-4'><a href='/Masters/AddStudentlist'><ImBackward size={40} style={{color:'red',cursor:'pointer'}} /></a></Col> */}
        <Col className='text-end p-4'>
          {/* <Button className='bg-info' ><MdEditNote size={30}/>EDIT</Button>{' '}
          <Button className='bg-success' >SUBMIT</Button> */}
             <Button
          variant={editMode ? "secondary" : "primary"}
          onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit"}
        </Button>{" "}
        {editMode && (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
        </Col>
      </Row>
      
     {/*--------------- Row-1-------------------------- */}
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="student_name">
          <Form.Label>1. NAME OF THE PUPIL *</Form.Label>
          <Form.Control name='student_name'
            value={formData.student_name}
            onChange={handleInputChange}
            disabled={!editMode}
            required
            type="text"/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="sex">
          <Form.Label>3.SEX*</Form.Label>
          <Form.Control name='sex'
            value={formData.sex}
            onChange={handleInputChange}
            disabled={!editMode}
            required
            type="text" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="dob">
          <Form.Label>3.Date Of Birth *</Form.Label>
          <Form.Control
            required name='dob'
            value={formData.dob}
            onChange={handleInputChange}
            disabled={!editMode}
            type="date"    />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

      </Row>
      {/*--------------- Row-2-------------------------- */}
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="blood_group">
          <Form.Label>4.Blood Group*</Form.Label>
          <Form.Control name="blood_group"
          type="text"
          value={formData.blood_group}
          onChange={handleInputChange}
          disabled={!editMode} />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="emis_no">
          <Form.Label>5.EMIS NO (If the child studied in the state of TN)</Form.Label>
          <Form.Control name="emis_no"
           type="text"
           value={formData.emis_no}
           onChange={handleInputChange}
           disabled={!editMode}
            required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="Nationality">
          <Form.Label>6.Nationality *</Form.Label>
          <Form.Control name='Nationality'
            type="text"
            value={formData.Nationality}
            onChange={handleInputChange}
            disabled={!editMode}
             required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      {/*--------------- Row-3-------------------------- */}
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="State">
          <Form.Label>7.state*</Form.Label>
          <Form.Control name="State"
               type='text'
               value={formData.State}
               onChange={handleInputChange}
               disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="Religion">
          <Form.Label>8.Religion</Form.Label>
          <Form.Control name='Religion'
             type='text'
             value={formData.Religion}
             onChange={handleInputChange}
             disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>9.Denomination *</Form.Label>
          <Form.Control name='Denomination'
            type='text'
            value={formData.Denomination}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      {/*--------------- Row-4-------------------------- */}
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="Caste">
          <Form.Label>10.Caste*</Form.Label>
          <Form.Control name='Caste'
            type='text'
            value={formData.Caste}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="CasteClassification">
          <Form.Label>a.CasteClassification*</Form.Label>
          <Form.Control name='CasteClassification'
            type='text'
            value={formData.CasteClassification}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>11.AadhaarCardNo*</Form.Label>
          <Form.Control name='AadhaarCardNo'
            type='text'
            value={formData.AadhaarCardNo}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      {/*--------------- Row-5-------------------------- */}
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>11.AadhaarCardNo*</Form.Label>
          <Form.Control name='AadhaarCardNo'
              type='text'
              value={formData.AadhaarCardNo}
              onChange={handleInputChange}
              disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>12.RationCard No *</Form.Label>
          <Form.Control name='RationCard'
            type='text'
            value={formData.RationCard}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>13.Mothertongue of the pupil*</Form.Label>
          <Form.Control name='Mothertongue'
            type='text'
            value={formData.Mothertongue}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

  <h4 className='py-3'>NAME OF THE PARENTS / GUARDIAN:</h4>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Father Name</Form.Label>
          <Form.Control name="Father"
              type='text'
              value={formData.Father}
              onChange={handleInputChange}
              disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Mother Name</Form.Label>
          <Form.Control name='Mother'
              type='text'
            value={formData.Mother}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="Guardian">
          <Form.Label>Guardian Name</Form.Label>
          <Form.Control name='Guardian'
              type='text'
              value={formData.Guardian}
              onChange={handleInputChange}
              disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="Occupation">
          <Form.Label>Occupation:</Form.Label>
          <Form.Control name='Occupation'
             type='text'
             value={formData.Occupation}
             onChange={handleInputChange}
             disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="Organisation">
          <Form.Label>Organisation </Form.Label>
          <Form.Control name='Organisation'
              type='text'
            value={formData.Organisation}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="Monthlyincome">
          <Form.Label>Monthlyincome</Form.Label>
          <Form.Control name='Monthlyincome'
            type='text'
            value={formData.Monthlyincome}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

  <h4 className='py-3'>Permanent Address</h4>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="p_housenumber">
          <Form.Label>Housenumber:</Form.Label>
          <Form.Control name='p_housenumber'
            type='text'
            value={formData.p_housenumber}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="p_Streetname">
          <Form.Label>Streetname:</Form.Label>
          <Form.Control name='p_Streetname'
           type='text'
           value={formData.p_Streetname}
           onChange={handleInputChange}
           disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="p_VillagetownName">
          <Form.Label>VillagetownName:</Form.Label>
          <Form.Control name='p_VillagetownName'
            type='text'
            value={formData.p_VillagetownName}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="p_Postoffice">
          <Form.Label>Postoffice:</Form.Label>
          <Form.Control name='p_Postoffice'
            type='text'
            value={formData.p_Postoffice}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="p_Taluk">
          <Form.Label>Taluk:</Form.Label>
          <Form.Control name='p_Taluk'
            type='text'
            value={formData.p_Taluk}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="p_District">
          <Form.Label>District:</Form.Label>
          <Form.Control name='p_District'
            type='text'
            value={formData.p_District}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="p_State">
          <Form.Label>State:</Form.Label>
          <Form.Control name='p_State'
           type='text'
           value={formData.p_State}
           onChange={handleInputChange}
           disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="p_Pincode">
          <Form.Label>Pincode:</Form.Label>
          <Form.Control name='p_Pincode'
            type='number'
            value={formData.p_Pincode}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

  <h4 className='py-3'>ADDRESS FOR COMMUNICATION</h4>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="c_HouseNumber">
          <Form.Label>HouseNumber:</Form.Label>
          <Form.Control name='c_HouseNumber'
           type='text'
           value={formData.c_HouseNumber}
           onChange={handleInputChange}
           disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Streetname:</Form.Label>
          <Form.Control name='c_StreetName'
           type='text'
           value={formData.c_StreetName}
           onChange={handleInputChange}
           disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="c_VillageTownName">
          <Form.Label>VillagetownName:</Form.Label>
          <Form.Control name='c_VillageTownName'
            type='text'
            value={formData.c_VillageTownName}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="c_Postoffice">
          <Form.Label>Postoffice:</Form.Label>
          <Form.Control name='c_Postoffice'
             type='text'
             value={formData.c_Postoffice}
             onChange={handleInputChange}
             disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="c_Taluk">
          <Form.Label>Taluk:</Form.Label>
          <Form.Control name='c_Taluk'
              type='text'
              value={formData.c_Taluk}
              onChange={handleInputChange}
              disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="c_District">
          <Form.Label>District:</Form.Label>
          <Form.Control name='c_District'
              type='text'
              value={formData.c_District}
              onChange={handleInputChange}
              disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="c_State">
          <Form.Label>State:</Form.Label>
          <Form.Control name='c_State'
            type='text'
            value={formData.c_State}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="c_Pincode">
          <Form.Label>Pincode:</Form.Label>
          <Form.Control name='c_Pincode'
           type='text'
           value={formData.c_Pincode}
           onChange={handleInputChange}
           disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="Mobilenumber">
          <Form.Label>Mobilenumber:</Form.Label>
          <Form.Control name='Mobilenumber'
            type='text'
            value={formData.Mobilenumber}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="WhatsAppNo">
          <Form.Label>WhatsAppNo:</Form.Label>
          <Form.Control name='WhatsAppNo'
            type='number'
            value={formData.WhatsAppNo}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="EmailID">
          <Form.Label>EmailID:</Form.Label>
          <Form.Control name='EmailID'
             type='email'
             value={formData.EmailID}
             onChange={handleInputChange}
             disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

  <h4 className='py-3'>Class last Studied & Name of school</h4>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="ClasslastStudied">
          <Form.Label>Class last Studied:</Form.Label>
          <Form.Control name='ClasslastStudied'
             type='text'
             value={formData.ClasslastStudied}
             onChange={handleInputChange}
             disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Name of school:</Form.Label>
          <Form.Control name='Nameofschool'
            type='text'
            value={formData.Nameofschool}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <p className='py-3'>File should be attached * ( 1. Community Certificate, 2. Aadhaar Card, 3. Ration Card, 4.Birth Certificate) Other board Transfer Certificate must have the counter sign from the Educational Officer.</p>

        {/* <Form.Group className="position-relative mb-3">
            <Form.Label>Upload File Here</Form.Label>
            <Form.Control 
              type="file"name="File"
              required />
          </Form.Group> */}

          <Form.Group as={Col} md="4" controlId="sought_Std">
          <Form.Label>Class for which admission is sought Std :</Form.Label>
       
          <Form.Select name='sought_Std' 
          value={formData.sought_Std}
          onChange={handleInputChange}
          disabled={!editMode} required >
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
        <Form.Group as={Col} md="6" controlId="Part_I">
          <Form.Label>Part I ( for std . XI only)</Form.Label>
          <Form.Select name='Part_I' aria-label="Default select example"
          type='text'
          value={formData.Part_I}
          onChange={handleInputChange}
          disabled={!editMode} required >
              <option></option>
              <option value="1">Tamil</option>
              <option value="2">English</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="Group">
          <Form.Label>Please choose first preference:</Form.Label>
          <Form.Select name='Group'
           type='text'
           value={formData.Group}
           onChange={handleInputChange}
           disabled={!editMode} required >
              <option></option>
              <option value="1">Group-I</option>
              <option value="2">Group-II</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>


      </Row>

  <h4 className='py-3'>FOOD</h4>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="FOOD">
          <Form.Label>Vegetarian Or Non-Vegetarian:</Form.Label>
          <Form.Select name='FOOD'
           value={formData.FOOD}
           onChange={handleInputChange}
           disabled={!editMode} required >
              <option></option>
              <option value="1">Vegetarian</option>
              <option value="2">Non-Vegetarian</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="special_information">
          <Form.Label>Any special information the parent would like to Give about the child:</Form.Label>
          <Form.Control name='special_information'
          type='text'
            value={formData.special_information}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>


      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>I Declare that the information given above is correct and that pupil has not attended any other school besides those mentioned above</Form.Label>
          <Form.Select name='Declare_attended'  aria-label="Default select example"
          value={formData.Declare_attended}
          onChange={handleInputChange}
          disabled={!editMode} required >
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>I declare that I will not ask for a change in dateofbirth in the future</Form.Label>
          <Form.Select name='Declare_not_attended' required aria-label="Default select example"
          value={formData.Declare_not_attended}
          onChange={handleInputChange}
          disabled={!editMode} >
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>I agree to pay the School dues regularly *:</Form.Label>
          <Form.Select name='Declare_dob' aria-label="Default select example">
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="Declare_Date">
          <Form.Label>Date:</Form.Label>
            <Form.Control name='Declare_Date' type='date'
             value={formData.Declare_Date}
             onChange={handleInputChange}
             disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Place:</Form.Label>
          <Form.Control name='Declare_Place'
            type="text"
            value={formData.Declare_Place}
            onChange={handleInputChange}
            disabled={!editMode} required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>


      </Row>

  <h3 className='py-3 text-center'>MEDICAL FORM</h3>
  <h4 className='py-3'>Please, tick if your child has had:</h4>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="Measles">
          <Form.Label>Measles</Form.Label>
          <Form.Select name='Measles'aria-label="Default select example"
           value={formData.Measles}
           onChange={handleInputChange}
           disabled={!editMode} required>
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Chickenpox</Form.Label>
          <Form.Select name='Chickenpox' aria-label="Default select example"
          value={formData.Chickenpox}
          onChange={handleInputChange}
          disabled={!editMode} required>
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Fits</Form.Label>
          <Form.Select name='Fits'  aria-label="Default select example"
          value={formData.Fits}
          onChange={handleInputChange}
          disabled={!editMode} required>
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="Rheumaticfever">
          <Form.Label>Rheumaticfever</Form.Label>
          <Form.Select name='Rheumaticfever' aria-label="Default select example"
          value={formData.Rheumaticfever}
          onChange={handleInputChange}
          disabled={!editMode} required>
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="Mumps">
          <Form.Label>Mumps</Form.Label>
          <Form.Select name='Mumps'  aria-label="Default select example"
          value={formData.Mumps}
          onChange={handleInputChange}
          disabled={!editMode} required>
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Jaundice</Form.Label>
          <Form.Select name='Jaundice'  aria-label="Default select example"
          value={formData.Jaundice}
          onChange={handleInputChange}
          disabled={!editMode} required>
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="Asthma">
          <Form.Label>Asthma</Form.Label>
          <Form.Select name='Asthma'  aria-label="Default select example"
          value={formData.Asthma}
          onChange={handleInputChange}
          disabled={!editMode} required>
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="Nephritis">
          <Form.Label>Nephritis</Form.Label>
          <Form.Select name='Nephritis'  aria-label="Default select example"
          value={formData.Nephritis}
          onChange={handleInputChange}
          disabled={!editMode} required>
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="Whoopingcough">
          <Form.Label>Whoopingcough</Form.Label>
          <Form.Select name='Whoopingcough'  aria-label="Default select example"
          value={formData.Whoopingcough}
          onChange={handleInputChange}
          disabled={!editMode} required>
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="Tuberculosis">
          <Form.Label>Tuberculosis</Form.Label>
          <Form.Select name='Tuberculosis'
           aria-label="Default select example"
           value={formData.Tuberculosis}
           onChange={handleInputChange}
           disabled={!editMode} required>
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="Hayfever">
          <Form.Label>Hayfever</Form.Label>
          <Form.Select name='Hayfever'
           aria-label="Default select example"
           value={formData.Hayfever}
           onChange={handleInputChange}
           disabled={!editMode} required>
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="CongenitalHeartDisease">
          <Form.Label>CongenitalHeartDisease</Form.Label>
          <Form.Select name='CongenitalHeartDisease'
           aria-label="Default select example"
           value={formData.CongenitalHeartDisease}
           onChange={handleInputChange}
           disabled={!editMode} required>
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

  <h4 className='py-3'>Family ( Parents )</h4>
  <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="P_Tuberculosis">
          <Form.Label>Tuberculosis:</Form.Label>
          <Form.Control name='P_Tuberculosis'
            type='text'
            value={formData.P_Tuberculosis}
            onChange={handleInputChange}
            disabled={!editMode} required/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Bronchial Asthma:</Form.Label>
          <Form.Control name='P_Bronchial'
            type='text'
            value={formData.P_Bronchial}
            onChange={handleInputChange}
            disabled={!editMode} required/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <h4 className='py-3'>What inoculations has your child had? Please, Specify age at which given and how many.</h4>
       <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>BCG (against T.B):</Form.Label>
          <Form.Control name='BCG'
            type='text'
            value={formData.BCG}
            onChange={handleInputChange}
            disabled={!editMode} required/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Triple Vaccine ( Diphtheria, Whooping cough, Tetanus):</Form.Label>
          <Form.Control name='Triple_Vaccine'
             type='text'
             value={formData.Triple_Vaccine}
             onChange={handleInputChange}
             disabled={!editMode} required/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="Polio_Drops">
          <Form.Label>Polio Drops:</Form.Label>
          <Form.Control name='Polio_Drops'
             type='text'
             value={formData.Polio_Drops}
             onChange={handleInputChange}
             disabled={!editMode} required/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
       </Row>
       <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="Measles_given">
          <Form.Label>Measles:</Form.Label>
          <Form.Control required name='Measles_given'
             type='text'
             value={formData.Measles_given}
             onChange={handleInputChange}
             disabled={!editMode} />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>MMR:</Form.Label>
          <Form.Control name='MMR'
             type='text'
             value={formData.MMR}
             onChange={handleInputChange}
             disabled={!editMode} required/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Dual Vaccine ( Diptheria , Tetanus)</Form.Label>
          <Form.Control name='Dual_Vaccine'
             type='text'
             value={formData.Dual_Vaccine}
             onChange={handleInputChange}
             disabled={!editMode} required/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
       </Row>
       <Row className="mb-5">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Typhoid:</Form.Label>
          <Form.Control name='Typhoid'
            type='text'
            value={formData.Typhoid}
            onChange={handleInputChange}
            disabled={!editMode} />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Cholera Number given and ages at which they are given</Form.Label>
          <Form.Control name='Cholera'
             type='text'
             value={formData.Cholera}
             onChange={handleInputChange}
             disabled={!editMode} />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
       </Row>

       <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>If none, please, state if you give permission to the Principal to arrange for the immunization of your child against polio ( oral vaccine ) and against diphtheria and tetanus ( injection).</Form.Label>
          <Form.Select name='permission_to_principal' required aria-label="Default select example"
          value={formData.permission_to_principal}
          onChange={handleInputChange}
          disabled={!editMode} >
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="administration_of_anaesthetic">
          <Form.Label className='pb-4'>In case of emergency I authorize the Principal of Santhosha Vidhyalaya, to give permission for operation or administration of anaesthetic to my child.</Form.Label>
          <Form.Select name='administration_of_anaesthetic' required aria-label="Default select example"
          value={formData.administration_of_anaesthetic}
          onChange={handleInputChange}
          disabled={!editMode} >
              <option></option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>



      {/* <Button className='bg-success' type="submit">Submit form</Button> */}
     </Form>
    </Paper>
    </div>
   <div>
     
   </div>
 </div>
 </div>
  )
}


export default Viewstudentdata









































// import React, { useState } from 'react';
// import {MdSchool,MdEditNote} from 'react-icons/md'
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';
// import Sidebar from '../Sidebar';
// import Header from '../Header';
// import Paper from '@mui/material/Paper'; 
// import {ImBackward} from 'react-icons/im';
// import {SiCodereview} from 'react-icons/si';

// const Viewstudentdata = () => {
//   const [validated, setValidated] = useState(false);

//   const handleSubmit = (event) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     setValidated(true);
//   };
//   return (
//     <div>
       
//     <Sidebar/>
//      <div style={{width:'82.5%',float:'right'}} >
//    <Header/>
//    <div className='container pt-5'>
//      <Paper elevation={2} className="pb-5">
//       <Row>
//         <Col><h4 className='p-4'><SiCodereview className='pb-1 pe-2' size={40}/>View Details</h4></Col>
//         {/* <Col className='text-end p-4'><a href='/Masters/AddStudentlist'><ImBackward size={40} style={{color:'red',cursor:'pointer'}} /></a></Col> */}
//         <Col className='text-end p-4'>
//           <Button className='bg-info' ><MdEditNote size={30}/>EDIT</Button>{' '}
//           <Button className='bg-success' >SUBMIT</Button>
//         </Col>
//       </Row>
      
//      <Form className='container pt-4' noValidate validated={validated} onSubmit={handleSubmit}>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>1. NAME OF THE PUPIL *</Form.Label>
//           <Form.Control name='student_name'
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>3.SEX*</Form.Label>
//           <Form.Control name='sex'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>3.Date Of Birth *</Form.Label>
//           <Form.Control
//             required name='dob'
//             type="date"    />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>4.Blood Group*</Form.Label>
//           <Form.Control name="blood_group"
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>5.EMIS NO (If the child studied in the state of TN)</Form.Label>
//           <Form.Control name="emis_no"
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>6.Nationality *</Form.Label>
//           <Form.Control name='Nationality'
//             required
//             type="text"    />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>7.state*</Form.Label>
//           <Form.Control name="State"
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>8.Religion</Form.Label>
//           <Form.Control name='Religion'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>9.Denomination *</Form.Label>
//           <Form.Control name='Denomination'
//             required
//             type="text"    />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>10.Caste*</Form.Label>
//           <Form.Control name='Caste'
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>a.CasteClassification*</Form.Label>
//           <Form.Control name='CasteClassification'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>11.AadhaarCardNo*</Form.Label>
//           <Form.Control name='AadhaarCardNo'
//             required
//             type="text"    />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>11.AadhaarCardNo*</Form.Label>
//           <Form.Control name='AadhaarCardNo'
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>12.RationCard No *</Form.Label>
//           <Form.Control name='RationCard'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>13.Mothertongue of the pupil*</Form.Label>
//           <Form.Control name='Mothertongue'
//             required
//             type="text"    />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>

//   <h4 className='py-3'>NAME OF THE PARENTS / GUARDIAN:</h4>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>Father Name</Form.Label>
//           <Form.Control name="Father"
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Mother Name</Form.Label>
//           <Form.Control name='Mother'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Guardian Name</Form.Label>
//           <Form.Control name='Guardian'
//             required
//             type="text"    />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>Occupation:</Form.Label>
//           <Form.Control name='Occupation'
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Organisation </Form.Label>
//           <Form.Control name='Organisation'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Monthlyincome</Form.Label>
//           <Form.Control name='Monthlyincome'
//             required
//             type="text"    />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>

//   <h4 className='py-3'>Permanent Address</h4>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>Housenumber:</Form.Label>
//           <Form.Control name='p_housenumber'
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Streetname:</Form.Label>
//           <Form.Control name='p_Streetname'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>VillagetownName:</Form.Label>
//           <Form.Control name='p_VillagetownName'
//             required
//             type="text"    />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>Postoffice:</Form.Label>
//           <Form.Control name='p_Postoffice'
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Taluk:</Form.Label>
//           <Form.Control name='p_Taluk'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>District:</Form.Label>
//           <Form.Control name='p_District'
//             required
//             type="text"    />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>State:</Form.Label>
//           <Form.Control name='p_State'
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Pincode:</Form.Label>
//           <Form.Control name='p_Pincode'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>

//   <h4 className='py-3'>ADDRESS FOR COMMUNICATION</h4>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>HouseNumber:</Form.Label>
//           <Form.Control
//             required name='c_HouseNumber'
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Streetname:</Form.Label>
//           <Form.Control
//             required name='c_StreetName'
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>VillagetownName:</Form.Label>
//           <Form.Control name='c_VillageTownName'
//             required
//             type="text"    />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>Postoffice:</Form.Label>
//           <Form.Control
//             required name='c_Postoffice'
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Taluk:</Form.Label>
//           <Form.Control
//             required name='c_Taluk'
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>District:</Form.Label>
//           <Form.Control name='c_District'
//             required
//             type="text"    />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>State:</Form.Label>
//           <Form.Control name='c_State'
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Pincode:</Form.Label>
//           <Form.Control name='c_Pincode'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Mobilenumber:</Form.Label>
//           <Form.Control name='Mobilenumber'
//             required
//             type="number"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>WhatsAppNo:</Form.Label>
//           <Form.Control name='WhatsAppNo'
//             required
//             type="number"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>EmailID:</Form.Label>
//           <Form.Control name='EmailID'
//             required
//             type="email"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>

//   <h4 className='py-3'>Class last Studied & Name of school</h4>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="6" controlId="validationCustom01">
//           <Form.Label>Class last Studied:</Form.Label>
//           <Form.Control
//             required name='ClasslastStudied'
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="6" controlId="validationCustom02">
//           <Form.Label>Name of school:</Form.Label>
//           <Form.Control
//             required name='Nameofschool'
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>

//         <p className='py-3'>File should be attached * ( 1. Community Certificate, 2. Aadhaar Card, 3. Ration Card, 4.Birth Certificate) Other board Transfer Certificate must have the counter sign from the Educational Officer.</p>

//         <Form.Group className="position-relative mb-3">
//             <Form.Label>Upload File Here</Form.Label>
//             <Form.Control 
//               type="file"name="File"
//               required />
//           </Form.Group>

//           <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Class for which admission is sought Std :</Form.Label>
       
//           <Form.Select name='sought_Std' required aria-label="Default select example">
//               <option></option>
//               <option value="1">I</option>
//               <option value="2">II</option>
//               <option value="3">III</option>
//               <option value="3">IV</option>
//               <option value="3">V</option>
//               <option value="3">VI</option>
//               <option value="3">VII</option>
//               <option value="3">IX</option>
//               <option value="3">X</option>
//               <option value="3">XI</option>
//             </Form.Select>
        
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="6" controlId="validationCustom01">
//           <Form.Label>Part I ( for std . XI only)</Form.Label>
//           <Form.Select name='Part_I' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Tamil</option>
//               <option value="2">English</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="6" controlId="validationCustom02">
//           <Form.Label>Please choose first preference:</Form.Label>
//           <Form.Select name='Group' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Group-I</option>
//               <option value="2">Group-II</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>


//       </Row>

//   <h4 className='py-3'>FOOD</h4>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="6" controlId="validationCustom01">
//           <Form.Label>Vegetarian Or Non-Vegetarian:</Form.Label>
//           <Form.Select name='FOOD' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Vegetarian</option>
//               <option value="2">Non-Vegetarian</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="6" controlId="validationCustom02">
//           <Form.Label>Any special information the parent would like to Give about the child:</Form.Label>
//           <Form.Control name='special_information'
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>


//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>I Declare that the information given above is correct and that pupil has not attended any other school besides those mentioned above</Form.Label>
//           <Form.Select name='Declare_not_attended' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>I declare that I will not ask for a change in dateofbirth in the future</Form.Label>
//           <Form.Select name='Declare_not_attended' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>I agree to pay the School dues regularly *:</Form.Label>
//           <Form.Select name='Declare_dob' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="6" controlId="validationCustom01">
//           <Form.Label>Date:</Form.Label>
//             <Form.Control name='Declare_Date'
//             required
//             type="date"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="6" controlId="validationCustom02">
//           <Form.Label>Place:</Form.Label>
//           <Form.Control name='Declare_Place'
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>


//       </Row>

//   <h3 className='py-3 text-center'>MEDICAL FORM</h3>
//   <h4 className='py-3'>Please, tick if your child has had:</h4>

//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>Measles</Form.Label>
//           <Form.Select name='Measles' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Chickenpox</Form.Label>
//           <Form.Select name='Chickenpox' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Fits</Form.Label>
//           <Form.Select name='Fits' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>Rheumaticfever</Form.Label>
//           <Form.Select name='Rheumaticfever' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Mumps</Form.Label>
//           <Form.Select name='Mumps' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Jaundice</Form.Label>
//           <Form.Select name='Jaundice' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>Asthma</Form.Label>
//           <Form.Select name='Asthma' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Nephritis</Form.Label>
//           <Form.Select name='Nephritis' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Whoopingcough</Form.Label>
//           <Form.Select name='Whoopingcough' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>Tuberculosis</Form.Label>
//           <Form.Select name='Tuberculosis' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Hayfever</Form.Label>
//           <Form.Select name='Hayfever' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>CongenitalHeartDisease</Form.Label>
//           <Form.Select name='CongenitalHeartDisease' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>

//   <h4 className='py-3'>Family ( Parents )</h4>
//   <Row className="mb-3">
//         <Form.Group as={Col} md="6" controlId="validationCustom01">
//           <Form.Label>Tuberculosis:</Form.Label>
//           <Form.Control name='P_Tuberculosis'
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="6" controlId="validationCustom02">
//           <Form.Label>Bronchial Asthma:</Form.Label>
//           <Form.Control
//             required name='P_Bronchial'
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>

//       <h4 className='py-3'>What inoculations has your child had? Please, Specify age at which given and how many.</h4>
//        <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>BCG (against T.B):</Form.Label>
//           <Form.Control
//             required name='BCG'
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Triple Vaccine ( Diphtheria, Whooping cough, Tetanus):</Form.Label>
//           <Form.Control
//             required name='Triple_Vaccine'
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Polio Drops:</Form.Label>
//           <Form.Control name='Polio_Drops'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//        </Row>
//        <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>Measles:</Form.Label>
//           <Form.Control
//             required name='Measles_given'
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>MMR:</Form.Label>
//           <Form.Control name='MMR'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Dual Vaccine ( Diptheria , Tetanus)</Form.Label>
//           <Form.Control name='Dual_Vaccine'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//        </Row>
//        <Row className="mb-5">
//         <Form.Group as={Col} md="6" controlId="validationCustom01">
//           <Form.Label>Typhoid:</Form.Label>
//           <Form.Control name='Typhoid'
//             required
//             type="text"/>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="6" controlId="validationCustom02">
//           <Form.Label>Cholera Number given and ages at which they are given</Form.Label>
//           <Form.Control name='Cholera'
//             required
//             type="text"  />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//        </Row>

//        <Row className="mb-3">
//         <Form.Group as={Col} md="6" controlId="validationCustom01">
//           <Form.Label>If none, please, state if you give permission to the Principal to arrange for the immunization of your child against polio ( oral vaccine ) and against diphtheria and tetanus ( injection).</Form.Label>
//           <Form.Select name='permission_to_principal' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="6" controlId="validationCustom02">
//           <Form.Label className='pb-4'>In case of emergency I authorize the Principal of Santhosha Vidhyalaya, to give permission for operation or administration of anaesthetic to my child.</Form.Label>
//           <Form.Select name='administration_of_anaesthetic' required aria-label="Default select example">
//               <option></option>
//               <option value="1">Yes</option>
//               <option value="2">No</option>
//             </Form.Select>
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//       </Row>



//       <Button className='bg-success' type="submit">Submit form</Button>
//      </Form>
//     </Paper>
//     </div>
//    <div>
     
//    </div>
//  </div>
//  </div>
//   )
// }


// export default Viewstudentdata