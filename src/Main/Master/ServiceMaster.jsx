import React, { useState } from 'react';
import Navbarall from '../Navbarall'
import {MdMedicalServices} from 'react-icons/md';
import {IoChevronBackCircleOutline} from 'react-icons/io5'
import {Col,Row,Form,Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
import { RadioGroup, FormControlLabel, Radio,TextField  } from '@mui/material';
import Swal from 'sweetalert2'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


const ServiceMaster = () => {

  const [serviceMaster, setServiceMaster] = useState([])
  const [newServiceCategory, setNewServiceCategory] = useState('')
  const [newServiceCategoryCode, setNewServiceCategoryCode] = useState('')
  const [newServiceSubCategory, setnewServiceSubCategory] = useState('')
  const [newServiceSubCategoryCode, setNewServiceSubCategoryCode] = useState('')
  const [newOpIp,setNewOpIp] = useState('');
  const [newRate, setNewRate] = useState('');
  const [newDoctorShareAmount, setNewDoctorShareAmount] =useState('')
  const [newHospitalShareAmount, setNewHospitalShareAmount]  = useState('')
  const [newServiceName, setNewServiceName]  = useState('')

  const handleCodeChangeCat = (e) => {
    const input = e.target.value;
    if (/^[A-Z]{0,2}$/.test(input)) {
      setNewServiceCategoryCode(input);
    } else {
        Swal.fire({
        icon: 'error',
        title: 'Wrong Service Category Code!',
        text: 'Invalid input! Please enter 0 to 2 UPPERCASE letters only!',
        confirmButtonText: 'Got It'
      })
    }
  };
  const handleCodeChangeSubCat = (e) => {
    const input = e.target.value;
    if (/^[A-Z]{0,2}$/.test(input)) {
      setNewServiceSubCategoryCode(input);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Wrong Service Sub Category Code!',
        text: 'Invalid input! Please enter 0 to 2 UPPERCASE letters only!',
        confirmButtonText: 'Got It'
      })
    }
  };

  const createDoctor = async (event) => {
    event.preventDefault();
    const databody = {
      service_category: newServiceCategory,
      service_category_code: newServiceCategoryCode,
      service_sub_category:newServiceSubCategory,
      service_sub_category_code:newServiceSubCategoryCode,
      op_ip:newOpIp,
      rate:newRate,
      dr_share:newDoctorShareAmount,
      hr_share:newHospitalShareAmount,
      service_name:newServiceName,

    };
    
    try {
      const response = await fetch('https://euctostaging.com/prolife/api/masters/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(databody),

      });
      const data = await response.json();
      setServiceMaster([...serviceMaster, data[0]]);
      Swal.fire({
        icon: 'success',
        title: 'Doctor Created successfully !',
        showConfirmButton: false,
        timer: 1800
      })
      setNewServiceCategory('');
      setNewServiceCategoryCode('');
      setnewServiceSubCategory('');
      setNewServiceSubCategoryCode('');
      setNewRate('')
      setNewOpIp('')
      setNewDoctorShareAmount('')
      setNewHospitalShareAmount('')
      setNewServiceName('')
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div>
       <Navbarall/>
       <div className='pt-5 px-4 py-4'>
         <div  style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
          <div className='row pt-3 px-3'>
            <Col><h3> <MdMedicalServices size={35} className='mr-3'/>Service Master</h3></Col>
            <Col style={{textAlign:'right'}}>
              <NavLink to='/Main/Master/ServiceMasterTable'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
            </Col>
          </div><hr/>
          <div className='container'>
            <Form>
              {/* <div>
                <Form.Group className="mb-3" style={{width: 'fit-content'}}>
                    <TextField id="filled-basic" label="Service Code" variant="filled" />
                  </Form.Group>
              </div> */}
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>New Service Category Name</Form.Label>
                    <Form.Control value={newServiceCategory} onChange={(e)=>setNewServiceCategory(e.target.value) } type="text" />
                  </Form.Group>
                </Col>
                <Col >
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>New Service Category Code</Form.Label>
                    <Form.Control value={newServiceCategoryCode} onChange={handleCodeChangeCat} type="text" />
                  </Form.Group>
                </Col>
                {/* <Col xs={12} md={4}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Service Category </Form.Label>
                    <Form.Control as="select">
                    <option>--Select--</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Control>
                  </Form.Group>
                </Col> */}
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>New Service Sub Category Name</Form.Label>
                    <Form.Control value={newServiceSubCategory} onChange={(e)=>setnewServiceSubCategory(e.target.value) } type="text" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>New Service Sub Category Code</Form.Label>
                     <Form.Control value={newServiceSubCategoryCode} onChange={handleCodeChangeSubCat} type="text" /> 
                  </Form.Group>
                </Col>
               {/* <Col xs={12} md={4}>
                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Service Sub Category</Form.Label>
                    <Form.Control as="select">
                    <option>--Select--</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Control>
                  </Form.Group> 
                </Col>*/}
              </Row>
              <Row>
                <Col xs={12} md={4}>
                <Form.Group>
                      <Form.Label  className=''>OP/IP</Form.Label>
                      <RadioGroup value={newOpIp} onChange={(e)=> setNewOpIp(e.target.value)} row className='ml-2'>
                        <FormControlLabel value="OP" control={<Radio />} label="OP" />
                        <FormControlLabel value="IP" control={<Radio />} label="IP" />
                      </RadioGroup>
                    </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>Rate</Form.Label>
                  <Form.Group className="mb-3">
                    <Form.Control value={newRate} onChange={(e)=> setNewRate(e.target.value)} type="number" />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  {/* <Form.Label>Branch</Form.Label>
                  <Form.Group className="mb-3">
                    <Select options={options} isMulti />
                  </Form.Group> */}
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={4}>
                <Form.Label>Doctor Share Amount</Form.Label>
                  <Form.Group className="mb-3">
                    <Form.Control value={newDoctorShareAmount} onChange={(e)=> setNewDoctorShareAmount(e.target.value)} type="number" />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                <Form.Label>Hospital Share amount</Form.Label>
                  <Form.Group className="mb-3">
                    <Form.Control value={newHospitalShareAmount} onChange={(e)=> setNewHospitalShareAmount(e.target.value)} type="number" />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                <Form.Label>Service Name</Form.Label>
                  <Form.Group className="mb-3">
                    <Form.Control value={newServiceName} onChange={(e)=> setNewServiceName(e.target.value)} type="text" />
                  </Form.Group>
                </Col>
              </Row>
              <div className='py-3'>
                <Button onClick={createDoctor} variant="success">Submit</Button>{' '}
              </div>
            </Form>
          </div>
         </div>
       </div>
    </div>
  )
}

export default ServiceMaster
