import React, { useState, useEffect } from 'react';
import Select from 'react-select';
// import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import {CgComponents} from 'react-icons/cg';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {SiSololearn} from 'react-icons/si';
import Swal from 'sweetalert2'
import axios from 'axios'
import DatePicker from "react-datepicker";



const Feesmaping = () => {

  const [newInvoiceClass, setNewInvoiceClass] = useState('');
  const [newAmount, setnewAmount] = useState('');
  const [newFeesHeading, setnewFeesHeading] = useState('');
  const [newFeesSubHeading, setNewFeesSubHeading] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newAcadYear, setNewAcadYear] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [subCategory, setSubCategory] = useState([]);


  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  useEffect(() => {
    // Fetch data from the API and update the options state
    const fetchData = async () => {
      try {
        const response = await axios.get('');
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  
  const [initialAmount, setInitialAmount] = useState();
  const [partialAmount, setPartialAmount] = useState();
  const [result, setResult] = useState(0);

  const handleInitialAmountChange = (event) => {
    setInitialAmount(Number(event.target.value));
  };

  const handlePartialAmountChange = (event) => {
    const partial = Number(event.target.value);
    setPartialAmount(partial);
    setResult(initialAmount - partial);
  };


  ////////////// Date and Time /////////////////////
  const [validated, setValidated] = useState(false);
  const [Cdate, setDate] = useState(new Date().toLocaleDateString('fr-FR'));
  
  const getStudents = async () => {
    if (newInvoiceClass ) {
       console.log(newInvoiceClass);
       try {
        const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/studentByGrades/${newInvoiceClass}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          } 
        });
        const data = await response.json();
         if (data) {
           const options = data.map(item => ({
             value: item.id,
             label: item.concordinate_string
           }));
           console.log(options);
           setOptions(options);
         }
      } catch (error) {
        console.log(error);
      }
    }
  }

//  /////////  Fee Map for LKG to 12 ////////////////

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
      data['due_date'] = Cdate;
      try {
        const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/feesmap-insert', {
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

  // Individual Student
  const handleSubmit2 = async (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(event.target);

      // const data = {};
      // for (let [key, value] of formData.entries()) {
      //   data[key] = value;
      // }
      // data['due_date'] = Cdate;
      try {
        const studentIds =  selectedOptions ? selectedOptions.map(option => option.value) : [];
        const created_by = sessionStorage.getItem('user_id');
        console.log(newDueDate); 

        const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/feesmap-insertByID', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_id: studentIds,
            standard: newInvoiceClass.toString(),
            amount: newAmount.toString(),
            fees_heading: newFeesHeading,
            fees_sub_heading: newFeesSubHeading,
            due_date: Cdate,
            acad_year: newAcadYear.toString(),
            created_by: created_by.toString()
          }),
          
          
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
  
////////////// LKG /////////////////////
  const [year, setYear] = React.useState('');

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const feeCategoryChange = (e) => {
    const selectedValue = e.target.value;

    setnewFeesHeading(selectedValue);

    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('id');
  // console.log(option);
  let url = '';
    if(option == 'SM')
      url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolmiscelfees-master-read';
    else if(option == 'HB')
      url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/hostelfee-master-read';
    else if(option == 'SF')
      url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolfees-master-read';
    else if(option == 'O')
      url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/otherfees-master-read';

    fetchSections(url);

  }

  const fetchSections = async (url) => {
    console.log(url);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.data);
      setSubCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
       
        <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
    <Header/>
      <div className='p-4' style={{backgroundColor:'#F7F7F7'}}>
        <div className='px-2 py-1'>
        <h4>Fee Mapping</h4>
        <hr className='feeMapping'/>
        </div>
      <Accordion>
 {/*-------------------------- LKG-Standard--------------------------------------------- */}
      <Accordion.Item eventKey="14">
        <Accordion.Header>
          <CgComponents size={40} className='pe-2'/><h5>LKG Standard</h5>
        </Accordion.Header>
        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h4 style={{ fontWeight: '400' }}>Total Annual fees</h4>
      <Row>
        <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <hr className='py-3' />

      <Row>
        <Col className='pt-2'>
        <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
        </Col>
        <Col className='pt-2'>
          <Form.Group controlId="amount">
            <Form.Control style={{width:'100%',height:'55px'}}
              required
              type="number"
              name="amount"
              className="custom-input"
              placeholder="₹ Amount"
            />
            <Form.Control.Feedback type="invalid">
              Please provide an Amount.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="date">
            <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
                <Form.Control.Feedback type="invalid">
              Please provide an Date.
            </Form.Control.Feedback>
        </Form.Group>      
        </Col>
      </Row>

      {/* Hidden fields */}
      <Form.Control type="hidden" name="group" defaultValue="" />
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="lkg" />
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')} />

      <div className='py-4'>
        <Button style={{ width: '11%' }} variant="success" type="submit">
          Submit
        </Button>{' '}
      </div>
    </Form>

          <div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
 {/*-------------------------- UKG-Standard--------------------------------------------- */}
      <Accordion.Item eventKey="15">
        <Accordion.Header>
          <CgComponents size={40} className='pe-2'/><h5>UKG Standard</h5>
        </Accordion.Header>
        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
        <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
          <hr className='py-3'/>
          
            <Row>
            <Col className='pt-2'>
          
              <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
                
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      <Form.Control type="hidden" name="group" defaultValue="" />
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="ukg" />
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')}
      />
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>

          <div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
 {/*-------------------------- 1-Standard--------------------------------------------- */}
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <CgComponents size={40} className='pe-2'/><h5>1th Standard</h5>
        </Accordion.Header>
        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
        <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
          <hr className='py-3'/>

            <Row>
            <Col className='pt-2'>
            <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      <Form.Control type="hidden" name="group" defaultValue="" />
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="1" />
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')}
      />
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
{/*-------------------------- 2-Standard--------------------------------------------- */}
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          <CgComponents size={40} className='pe-2'/><h5>2th Standard</h5>
        </Accordion.Header>
        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
        <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
          <hr className='py-3'/>

            <Row>
            <Col className='pt-2'>
            <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs} style={{paddingTop:'0px'}}>
                      <DemoContainer components={['DatePicker className='datepicker-wrapper'']}>
                        <DatePicker className='datepicker-wrapper' label="Select Date" format='DD/MM/YYYY' />
                      </DemoContainer>
                </LocalizationProvider> */}
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      <Form.Control type="hidden" name="group" defaultValue="" />
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="2" />
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')}/>
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
{/*-------------------------- 3-Standard--------------------------------------------- */}      
      <Accordion.Item eventKey="3">
        <Accordion.Header>
          <CgComponents size={40} className='pe-2'/><h5>3th Standard</h5>
        </Accordion.Header>
       <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
       <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
        <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
          <hr className='py-3'/>

            <Row>
            <Col className='pt-2'>
            <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      <Form.Control type="hidden" name="group" defaultValue="" />
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="3" />
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')}
      />
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
{/*-------------------------- 4-Standard--------------------------------------------- */}      
      <Accordion.Item eventKey="4">
        <Accordion.Header>
          <CgComponents size={40} className='pe-2'/><h5>4th Standard</h5>
        </Accordion.Header>
       <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
       <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
        <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
          <hr className='py-3'/>

            <Row>
            <Col className='pt-2'>
            <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs} style={{paddingTop:'0px'}}>
                      <DemoContainer components={['DatePicker className='datepicker-wrapper'']}>
                        <DatePicker className='datepicker-wrapper' label="Select Date" format='DD/MM/YYYY' />
                      </DemoContainer>
                </LocalizationProvider> */}
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      <Form.Control type="hidden" name="group" defaultValue="" />
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="4" />
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')}
      />
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
{/*-------------------------- 5-Standard--------------------------------------------- */}      
      <Accordion.Item eventKey="5">
        <Accordion.Header>
          <CgComponents size={40} className='pe-2'/><h5>5th Standard</h5>
        </Accordion.Header>
       <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
       <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
        <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
          <hr className='py-3'/>

            <Row>
            <Col className='pt-2'>
            <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      <Form.Control type="hidden" name="group" defaultValue="" />
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="5" />
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')}
      />
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
{/*-------------------------- 6-Standard--------------------------------------------- */}      
      <Accordion.Item eventKey="6">
        <Accordion.Header>
         <CgComponents size={40} className='pe-2'/><h5>6th Standard</h5>
        </Accordion.Header>
       <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
       <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
        <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
          <hr className='py-3'/>

            <Row>
            <Col className='pt-2'>
            <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      <Form.Control type="hidden" name="group" defaultValue="" />
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="6" />
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')}
      />
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
{/*-------------------------- 7-Standard--------------------------------------------- */}      
      <Accordion.Item eventKey="7">
        <Accordion.Header>
         <CgComponents size={40} className='pe-2'/><h5>7th Standard</h5>
        </Accordion.Header>
       <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
       <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
        <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
          <hr className='py-3'/>

            <Row>
            <Col className='pt-2'>
            <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      <Form.Control type="hidden" name="group" defaultValue="" />
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="7" />
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')}/>
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>
          <div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
{/*-------------------------- 8-Standard--------------------------------------------- */}      
      <Accordion.Item eventKey="8">
        <Accordion.Header>
         <CgComponents size={40} className='pe-2'/><h5>8th Standard</h5>
        </Accordion.Header>
       <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
       <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
        <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
          <hr className='py-3'/>

            <Row>
            <Col className='pt-2'>
            <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      <Form.Control type="hidden" name="group" defaultValue="" />
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="8" />
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')}
      />
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
{/*-------------------------- 9-Standard--------------------------------------------- */}      
      <Accordion.Item eventKey="9">
        <Accordion.Header>
         <CgComponents size={40} className='pe-2'/><h5>9th Standard</h5>
        </Accordion.Header>
       <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
       <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
        <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
          <hr className='py-3'/>

            <Row>
            <Col className='pt-2'>
            <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      <Form.Control type="hidden" name="group" defaultValue="" />
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="9" />
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')}
      />
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
{/*-------------------------- 10-Standard--------------------------------------------- */}      
      <Accordion.Item eventKey="10">
        <Accordion.Header>
         <CgComponents size={40} className='pe-2'/><h5>10th Standard</h5>
        </Accordion.Header>
       <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
       <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
        <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
          <hr className='py-3'/>

            <Row>
            <Col className='pt-2'>
            <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      <Form.Control type="hidden" name="group" defaultValue="" />
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="10" />
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')}
      />
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>

        </Accordion.Body>
      </Accordion.Item>
{/*-------------------------- 11-Standard--------------------------------------------- */}      
      <Accordion.Item eventKey="11">
        <Accordion.Header>
         <CgComponents size={40} className='pe-2'/><h5>11th Standard</h5>
        </Accordion.Header>
       <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
       <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
          <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
            {/* <Col className=''>
             <label className='pb-3 ps-2'>Groups</label>
             <Form.Select className='custom-input' name='group' aria-label="Default select example" style={{width:'70%',height:'55px'}}>
                <option>Open this select menu</option>
                <option value="Group-I">Group-I</option>
                <option value="Group-II">Group-II</option>
              </Form.Select>
            </Col> */}
           
          </Row><hr className='py-3'/>

            <Row>
            <Col className='pt-2'>
            <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="11" />
      <Form.Control type="hidden" name="created_by" defaultValue={sessionStorage.getItem('user_id')}/>
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>

        </Accordion.Body>
      </Accordion.Item>
 {/*------------------ 12th Standard ------------------------------------ */}
      <Accordion.Item eventKey="13">
        <Accordion.Header>
         <CgComponents size={40} className='pe-2'/><h5>12th Standard</h5>
        </Accordion.Header>
        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
          <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
             <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
             </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
            {/* <Col className=''>
             <label className='pb-3 ps-2'>Groups</label>
             <Form.Select className='custom-input' name='group' aria-label="Default select example" style={{width:'70%',height:'55px'}}>
                <option>Open this select menu</option>
                <option value="Group-I">Group-I</option>
                <option value="Group-II">Group-II</option>
              </Form.Select>
            </Col> */}
           
          </Row><hr className='py-3'/>

            <Row>
            <Col className='pt-2'>
            <Form.Group controlId="year">
                      <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px'}} required/>
                      <Form.Control.Feedback type="invalid">
              Please select a Year.
            </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => {
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="12" />
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')}/>
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>
        </Accordion.Body>
      </Accordion.Item>

 {/*------------------ individual student ------------------------------------ */}
      <Accordion.Item eventKey="16">
        <Accordion.Header>
         <SiSololearn size={30} className='pe-2'/><h5>Individual student</h5>
        </Accordion.Header>
        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
        <Form noValidate validated={validated} onSubmit={handleSubmit2}>
          <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
          <Row>
            <Col>
               <Form.Label>Grade</Form.Label>
                            <Form.Select style={{height:'60%'}} name='standard'  value={newInvoiceClass}  onChange={(e) => setNewInvoiceClass(e.target.value)} onClick={getStudents} >
                            <option>Select Class</option>
                            <option value="ukg">LKG</option>
                            <option value="lkg">UKG</option>
                            <option value="1">I</option>
                            <option value="2">II</option>
                            <option value="3">III</option>
                            <option value="4">IV</option>
                            <option value="5">V</option>
                            <option value="6">VI</option>
                            <option value="7">VII</option>
                            <option value="8">VIII</option>
                            <option value="9">IX</option>
                            <option value="10">X</option>
                            <option value="11">XI</option>
                            <option value="12">XII</option>
                        </Form.Select>
                    </Col>

            
           
                  </Row>
                  <Row className='pt-3'>
      <Col style={{ paddingBottom: '11px' }}>
            <Form.Label>Student</Form.Label>
            {/* <Select 
              isMulti
              options={options}
              value={selectedOptions}
              onChange={handleSelectChange}
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: '60px',
                }),
              }} /> */}
        <div style={{ position: 'relative' }}>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleSelectChange}
        styles={{
          control: (provided) => ({
            ...provided,
            maxHeight:'400px',
            overflowY: 'auto'  ,           // Adjust width as needed
       
            menu: (provided) => ({
              ...provided,
              position: 'fixed', // Set position to fixed
              zIndex: 9999, // Set a high zIndex to overlay other elements
            }),
          }),
         }}
      />
    </div>

            </Col>
</Row>
          <Row className='pt-3'>
          <Col>
          <Form.Group as={Col} controlId="feeCategory">
            <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
            <Form.Select required value={newFeesHeading}   className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
            <option>Select Fee Category</option>
                <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Fee Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="subCategory">
            <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
            <Form.Select required value={newFeesSubHeading} onChange={(e)=> setNewFeesSubHeading (e.target.value)} className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a Sub Category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
           
          </Row><hr className='py-3'/>
            <Row>
            <Col className='pt-2'>
              <FormControl fullWidth>
                      <Form.Control placeholder='Enter Academic year' value={newAcadYear} onChange={(e)=> setNewAcadYear (e.target.value)} name="acad_year" style={{width:'100%',height:'55px'}} />
                   </FormControl>
              </Col>
              <Col className='pt-2'> 
                 <FloatingLabel controlId="floatingPassword" label="₹ Amount">
                   <Form.Control  value={newAmount} onChange={(e)=> setnewAmount (e.target.value)} className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
                </FloatingLabel>
              </Col>
              <Col>
              <div className='pt-2'>
                <DatePicker className='datepicker-wrapper'
                    dateFormat="dd/MM/yyyy"
                    value={Cdate}
                    onChange={(date) => { 
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setNewDueDate(d);
                    }}/>
                </div>
              </Col>
            </Row>
             {/* Hidden fields */}
      {/* <Form.Control type="hidden" name="status" defaultValue="1" />
      <Form.Control type="hidden" name="standard" defaultValue="12" /> */}
      <Form.Control
        type="hidden"
        name="created_by"
        defaultValue={sessionStorage.getItem('user_id')}/>
            <div className='py-4'>
             <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
            </div>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
      </div>
    </div>
    </div>
  )
}

export default Feesmaping









// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// // import axios from 'axios';
// import Modal from 'react-bootstrap/Modal';
// import Sidebar from '../Sidebar';
// import Header from '../Header';
// import Footer from '../Footer';
// import Button from 'react-bootstrap/Button';
// import Accordion from 'react-bootstrap/Accordion';
// import {CgComponents} from 'react-icons/cg';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import {SiSololearn} from 'react-icons/si';
// import Swal from 'sweetalert2'
// import axios from 'axios'
// import DatePicker from "react-datepicker";



// const Feesmaping = () => {

//   const [newInvoiceClass, setNewInvoiceClass] = useState('');
//   const [newAmount, setnewAmount] = useState('');
//   const [newFeesHeading, setnewFeesHeading] = useState('');
//   const [newFeesSubHeading, setNewFeesSubHeading] = useState('');
//   const [newDueDate, setNewDueDate] = useState('');
//   const [newAcadYear, setNewAcadYear] = useState('');
//   const [show1, setShow1] = useState(false);
//   const [show2, setShow2] = useState(false);
//   const [show, setShow] = useState(false);
//   const handleClose2 = () => setShow2(false);
//   const handleShow2 = () => setShow2(true);
//   const handleClose1 = () => setShow1(false);
//   const handleShow1 = () => setShow1(true);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [subCategory, setSubCategory] = useState([]);


//   const [options, setOptions] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleSelectChange = (selectedOptions) => {
//     setSelectedOptions(selectedOptions);
//   };
//   useEffect(() => {
//     // Fetch data from the API and update the options state
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('');
//         setOptions(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);


  
//   const [initialAmount, setInitialAmount] = useState();
//   const [partialAmount, setPartialAmount] = useState();
//   const [result, setResult] = useState(0);

//   const handleInitialAmountChange = (event) => {
//     setInitialAmount(Number(event.target.value));
//   };

//   const handlePartialAmountChange = (event) => {
//     const partial = Number(event.target.value);
//     setPartialAmount(partial);
//     setResult(initialAmount - partial);
//   };


//   ////////////// Date and Time /////////////////////
//   const [validated, setValidated] = useState(false);
//   const [Cdate, setDate] = useState(new Date().toLocaleDateString('fr-FR'));
  
//   const getStudents = async () => {
//     if (newInvoiceClass ) {
//        console.log(newInvoiceClass);
//        try {
//         const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/studentByGrades/${newInvoiceClass}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           } 
//         });
//         const data = await response.json();
//          if (data) {
//            const options = data.map(item => ({
//              value: item.id,
//              label: item.concordinate_string
//            }));
//            console.log(options);
//            setOptions(options);
//          }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }

// //  /////////  Fee Map for LKG to 12 ////////////////

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (event.currentTarget.checkValidity() === false) {
//       event.stopPropagation();
//     } else {
//       const formData = new FormData(event.target);

//       const data = {};
//       for (let [key, value] of formData.entries()) {
//         data[key] = value;
//       }
//       data['due_date'] = Cdate;
//       try {
//         const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/feesmap-insert', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         });
//         if (response.ok) {
//           // API call successful
//           const responseData = await response.json();
//           console.log(responseData); // Do something with the response data
//           Swal.fire({
//             icon: 'success',
//             title: 'Created successfully !',
//             showConfirmButton: false,
//             timer: 1800
//           })
//         } else {
//           // API call failed
//           console.log('Error:', response.status);
//         }
//       } catch (error) {
//         console.log('Error:', error);
//       }
//     }

//     setValidated(true);
//   };

//   // Individual Student
//   const handleSubmit2 = async (event) => {
//     event.preventDefault();

//     if (event.currentTarget.checkValidity() === false) {
//       event.stopPropagation();
//     } else {
//       const formData = new FormData(event.target);

//       // const data = {};
//       // for (let [key, value] of formData.entries()) {
//       //   data[key] = value;
//       // }
//       // data['due_date'] = Cdate;
//       try {
//         const studentIds = selectedOptions.map(option => option.value);
//         const created_by = sessionStorage.getItem('user_id');
//         console.log(newDueDate); 

//         const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/feesmap-insertByID', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             student_id: studentIds[0].toString(),
//             standard: newInvoiceClass.toString(),
//             amount: newAmount.toString(),
//             fees_heading: newFeesHeading,
//             fees_sub_heading: newFeesSubHeading,
//             due_date: Cdate,
//             acad_year: newAcadYear.toString(),
//             created_by: created_by.toString()
//           }),
          
          
//         });
//         if (response.ok) {
//           // API call successful
//           const responseData = await response.json();
//           console.log(responseData); // Do something with the response data
//           Swal.fire({
//             icon: 'success',
//             title: 'Created successfully !',
//             showConfirmButton: false,
//             timer: 1800
//           })
//         } else {
//           // API call failed
//           console.log('Error:', response.status);
//         }
//       } catch (error) {
//         console.log('Error:', error);
//       }
//     }

//     setValidated(true);
//   };
  
// ////////////// LKG /////////////////////
//   const [year, setYear] = React.useState('');

//   const handleChange = (event) => {
//     setYear(event.target.value);
//   };

//   const feeCategoryChange = (e) => {
//     const selectedValue = e.target.value;

//     setnewFeesHeading(selectedValue);

//     const index = e.target.selectedIndex;
//     const el = e.target.childNodes[index]
//     const option =  el.getAttribute('id');
//   // console.log(option);
//   let url = '';
//     if(option == 'SM')
//       url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolmiscelfees-master-read';
//     else if(option == 'HB')
//       url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/hostelfee-master-read';
//     else if(option == 'SF')
//       url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolfees-master-read';
//     else if(option == 'O')
//       url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/otherfees-master-read';

//     fetchSections(url);

//   }

//   const fetchSections = async (url) => {
//     console.log(url);
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log(data.data);
//       setSubCategory(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   return (
//     <div>
       
//         <Sidebar/>
//     <div style={{width:'82.5%',float:'right'}} >
//     <Header/>
//       <div className='p-4' style={{backgroundColor:'#F7F7F7'}}>
//         <div className='px-2 py-1'>
//         <h4>Fee Mapping</h4>
//         <hr className='feeMapping'/>
//         </div>
//       <Accordion>
//  {/*-------------------------- LKG-Standard--------------------------------------------- */}
//       <Accordion.Item eventKey="14">
//         <Accordion.Header>
//           <CgComponents size={40} className='pe-2'/><h5>LKG Standard</h5>
//         </Accordion.Header>
//         <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>

//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//       <h4 style={{ fontWeight: '400' }}>Total Annual fees</h4>
//       <Row>
//         <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//       <hr className='py-3' />

//       <Row>
//         <Col className='pt-2'>
//           <Form.Group controlId="year">
//             <Form.Select required name="acad_year" style={{ width: '100%', height: '55px' }}>
//               <option value="">Select Year</option>
//               <option value="2023">2023</option>
//               <option value="2024">2024</option>
//               <option value="2025">2025</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Year.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col className='pt-2'>
//           <Form.Group controlId="amount">
//             <Form.Control style={{width:'100%',height:'55px'}}
//               required
//               type="number"
//               name="amount"
//               className="custom-input"
//               placeholder="₹ Amount"
//             />
//             <Form.Control.Feedback type="invalid">
//               Please provide an Amount.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//         <Form.Group controlId="date">
//             <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//                 <Form.Control.Feedback type="invalid">
//               Please provide an Date.
//             </Form.Control.Feedback>
//         </Form.Group>      
//         </Col>
//       </Row>

//       {/* Hidden fields */}
//       <Form.Control type="hidden" name="group" defaultValue="" />
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="lkg" />
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')} />

//       <div className='py-4'>
//         <Button style={{ width: '11%' }} variant="success" type="submit">
//           Submit
//         </Button>{' '}
//       </div>
//     </Form>

//           <div>
//           </div>
//         </Accordion.Body>
//       </Accordion.Item>
//  {/*-------------------------- UKG-Standard--------------------------------------------- */}
//       <Accordion.Item eventKey="15">
//         <Accordion.Header>
//           <CgComponents size={40} className='pe-2'/><h5>UKG Standard</h5>
//         </Accordion.Header>
//         <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//           <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//         <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//           <hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                 <Form.Label>Select Year</Form.Label>
//                       <Form.Control type='text' name="acad_year" style={{width:'100%',height:'55px'}}/>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       <Form.Control type="hidden" name="group" defaultValue="" />
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="ukg" />
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')}
//       />
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>

//           <div>
//           </div>
//         </Accordion.Body>
//       </Accordion.Item>
//  {/*-------------------------- 1-Standard--------------------------------------------- */}
//       <Accordion.Item eventKey="0">
//         <Accordion.Header>
//           <CgComponents size={40} className='pe-2'/><h5>1th Standard</h5>
//         </Accordion.Header>
//         <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//         <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//           <hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                       <Form.Select name="acad_year" style={{width:'100%',height:'55px'}}>
//                           <option>select year</option>
//                           <option value="2023">2023</option>
//                           <option value="2024">2024</option>
//                           <option value="2025">2025</option>
//                         </Form.Select>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       <Form.Control type="hidden" name="group" defaultValue="" />
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="1" />
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')}
//       />
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>
//         </Accordion.Body>
//       </Accordion.Item>
// {/*-------------------------- 2-Standard--------------------------------------------- */}
//       <Accordion.Item eventKey="2">
//         <Accordion.Header>
//           <CgComponents size={40} className='pe-2'/><h5>2th Standard</h5>
//         </Accordion.Header>
//         <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//         <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//           <hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                       <Form.Select name="acad_year" style={{width:'100%',height:'55px'}}>
//                           <option>select year</option>
//                           <option value="2023">2023</option>
//                           <option value="2024">2024</option>
//                           <option value="2025">2025</option>
//                         </Form.Select>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//                 {/* <LocalizationProvider dateAdapter={AdapterDayjs} style={{paddingTop:'0px'}}>
//                       <DemoContainer components={['DatePicker className='datepicker-wrapper'']}>
//                         <DatePicker className='datepicker-wrapper' label="Select Date" format='DD/MM/YYYY' />
//                       </DemoContainer>
//                 </LocalizationProvider> */}
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       <Form.Control type="hidden" name="group" defaultValue="" />
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="2" />
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')}
//       />
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>
//         </Accordion.Body>
//       </Accordion.Item>
// {/*-------------------------- 3-Standard--------------------------------------------- */}      
//       <Accordion.Item eventKey="3">
//         <Accordion.Header>
//           <CgComponents size={40} className='pe-2'/><h5>3th Standard</h5>
//         </Accordion.Header>
//        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//        <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//         <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//           <hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                       <Form.Select name="acad_year" style={{width:'100%',height:'55px'}}>
//                           <option>select year</option>
//                           <option value="2023">2023</option>
//                           <option value="2024">2024</option>
//                           <option value="2025">2025</option>
//                         </Form.Select>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       <Form.Control type="hidden" name="group" defaultValue="" />
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="3" />
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')}
//       />
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>
//         </Accordion.Body>
//       </Accordion.Item>
// {/*-------------------------- 4-Standard--------------------------------------------- */}      
//       <Accordion.Item eventKey="4">
//         <Accordion.Header>
//           <CgComponents size={40} className='pe-2'/><h5>4th Standard</h5>
//         </Accordion.Header>
//        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//        <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//         <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//           <hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                       <Form.Select name="acad_year" style={{width:'100%',height:'55px'}}>
//                           <option>select year</option>
//                           <option value="2023">2023</option>
//                           <option value="2024">2024</option>
//                           <option value="2025">2025</option>
//                         </Form.Select>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//                 {/* <LocalizationProvider dateAdapter={AdapterDayjs} style={{paddingTop:'0px'}}>
//                       <DemoContainer components={['DatePicker className='datepicker-wrapper'']}>
//                         <DatePicker className='datepicker-wrapper' label="Select Date" format='DD/MM/YYYY' />
//                       </DemoContainer>
//                 </LocalizationProvider> */}
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       <Form.Control type="hidden" name="group" defaultValue="" />
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="4" />
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')}
//       />
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>
//         </Accordion.Body>
//       </Accordion.Item>
// {/*-------------------------- 5-Standard--------------------------------------------- */}      
//       <Accordion.Item eventKey="5">
//         <Accordion.Header>
//           <CgComponents size={40} className='pe-2'/><h5>5th Standard</h5>
//         </Accordion.Header>
//        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//        <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//         <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//           <hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                       <Form.Select name="acad_year" style={{width:'100%',height:'55px'}}>
//                           <option>select year</option>
//                           <option value="2023">2023</option>
//                           <option value="2024">2024</option>
//                           <option value="2025">2025</option>
//                         </Form.Select>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       <Form.Control type="hidden" name="group" defaultValue="" />
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="5" />
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')}
//       />
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>
//         </Accordion.Body>
//       </Accordion.Item>
// {/*-------------------------- 6-Standard--------------------------------------------- */}      
//       <Accordion.Item eventKey="6">
//         <Accordion.Header>
//          <CgComponents size={40} className='pe-2'/><h5>6th Standard</h5>
//         </Accordion.Header>
//        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//        <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//         <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//           <hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                       <Form.Select name="acad_year" style={{width:'100%',height:'55px'}}>
//                           <option>select year</option>
//                           <option value="2023">2023</option>
//                           <option value="2024">2024</option>
//                           <option value="2025">2025</option>
//                         </Form.Select>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       <Form.Control type="hidden" name="group" defaultValue="" />
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="6" />
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')}
//       />
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>
//         </Accordion.Body>
//       </Accordion.Item>
// {/*-------------------------- 7-Standard--------------------------------------------- */}      
//       <Accordion.Item eventKey="7">
//         <Accordion.Header>
//          <CgComponents size={40} className='pe-2'/><h5>7th Standard</h5>
//         </Accordion.Header>
//        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//        <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//         <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//           <hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                       <Form.Select name="acad_year" style={{width:'100%',height:'55px'}}>
//                           <option>select year</option>
//                           <option value="2023">2023</option>
//                           <option value="2024">2024</option>
//                           <option value="2025">2025</option>
//                         </Form.Select>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       <Form.Control type="hidden" name="group" defaultValue="" />
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="7" />
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')}/>
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>
//           <div>
//           </div>
//         </Accordion.Body>
//       </Accordion.Item>
// {/*-------------------------- 8-Standard--------------------------------------------- */}      
//       <Accordion.Item eventKey="8">
//         <Accordion.Header>
//          <CgComponents size={40} className='pe-2'/><h5>8th Standard</h5>
//         </Accordion.Header>
//        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//        <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//         <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//           <hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                       <Form.Select name="acad_year" style={{width:'100%',height:'55px'}}>
//                           <option>select year</option>
//                           <option value="2023">2023</option>
//                           <option value="2024">2024</option>
//                           <option value="2025">2025</option>
//                         </Form.Select>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       <Form.Control type="hidden" name="group" defaultValue="" />
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="8" />
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')}
//       />
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>
//         </Accordion.Body>
//       </Accordion.Item>
// {/*-------------------------- 9-Standard--------------------------------------------- */}      
//       <Accordion.Item eventKey="9">
//         <Accordion.Header>
//          <CgComponents size={40} className='pe-2'/><h5>9th Standard</h5>
//         </Accordion.Header>
//        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//        <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//         <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//           <hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                       <Form.Select name="acad_year" style={{width:'100%',height:'55px'}}>
//                           <option>select year</option>
//                           <option value="2023">2023</option>
//                           <option value="2024">2024</option>
//                           <option value="2025">2025</option>
//                         </Form.Select>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       <Form.Control type="hidden" name="group" defaultValue="" />
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="9" />
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')}
//       />
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>
//         </Accordion.Body>
//       </Accordion.Item>
// {/*-------------------------- 10-Standard--------------------------------------------- */}      
//       <Accordion.Item eventKey="10">
//         <Accordion.Header>
//          <CgComponents size={40} className='pe-2'/><h5>10th Standard</h5>
//         </Accordion.Header>
//        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//        <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//         <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//       </Row>
//           <hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                       <Form.Select name="acad_year" style={{width:'100%',height:'55px'}}>
//                           <option>select year</option>
//                           <option value="2023">2023</option>
//                           <option value="2024">2024</option>
//                           <option value="2025">2025</option>
//                         </Form.Select>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       <Form.Control type="hidden" name="group" defaultValue="" />
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="10" />
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')}
//       />
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>

//         </Accordion.Body>
//       </Accordion.Item>
// {/*-------------------------- 11-Standard--------------------------------------------- */}      
//       <Accordion.Item eventKey="11">
//         <Accordion.Header>
//          <CgComponents size={40} className='pe-2'/><h5>11th Standard</h5>
//         </Accordion.Header>
//        <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//        <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//           <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//             {/* <Col className=''>
//              <label className='pb-3 ps-2'>Groups</label>
//              <Form.Select className='custom-input' name='group' aria-label="Default select example" style={{width:'70%',height:'55px'}}>
//                 <option>Open this select menu</option>
//                 <option value="Group-I">Group-I</option>
//                 <option value="Group-II">Group-II</option>
//               </Form.Select>
//             </Col> */}
           
//           </Row><hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                       <Form.Select name="acad_year" style={{width:'100%',height:'55px'}}>
//                           <option>select year</option>
//                           <option value="2023">2023</option>
//                           <option value="2024">2024</option>
//                           <option value="2025">2025</option>
//                         </Form.Select>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="11" />
//       <Form.Control type="hidden" name="created_by" defaultValue={sessionStorage.getItem('user_id')}/>
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>

//         </Accordion.Body>
//       </Accordion.Item>
//  {/*------------------ 12th Standard ------------------------------------ */}
//       <Accordion.Item eventKey="13">
//         <Accordion.Header>
//          <CgComponents size={40} className='pe-2'/><h5>12th Standard</h5>
//         </Accordion.Header>
//         <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//           <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//             {/* <Col className=''>
//              <label className='pb-3 ps-2'>Groups</label>
//              <Form.Select className='custom-input' name='group' aria-label="Default select example" style={{width:'70%',height:'55px'}}>
//                 <option>Open this select menu</option>
//                 <option value="Group-I">Group-I</option>
//                 <option value="Group-II">Group-II</option>
//               </Form.Select>
//             </Col> */}
           
//           </Row><hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                       <Form.Select name="acad_year" style={{width:'100%',height:'55px'}}>
//                           <option>select year</option>
//                           <option value="2023">2023</option>
//                           <option value="2024">2024</option>
//                           <option value="2025">2025</option>
//                         </Form.Select>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => {
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="12" />
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')}/>
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>
//         </Accordion.Body>
//       </Accordion.Item>

//  {/*------------------ individual student ------------------------------------ */}
//       <Accordion.Item eventKey="16">
//         <Accordion.Header>
//          <SiSololearn size={30} className='pe-2'/><h5>Individual student</h5>
//         </Accordion.Header>
//         <Accordion.Body style={{backgroundColor:'#f3f3f3'}}>
//         <Form noValidate validated={validated} onSubmit={handleSubmit2}>
//           <h4 style={{fontWeight:'400'}}>Total Annual fees</h4>
//           <Row>
//             <Col>
//                <Form.Label>Grade</Form.Label>
//                             <Form.Select style={{height:'60%'}} name='standard' aria-label="Floating label select example" value={newInvoiceClass} 
//                             onChange={(e) => setNewInvoiceClass(e.target.value)} onClick={getStudents} >
//                             <option>Select Class</option>
//                             <option value="ukg">LKG</option>
//                             <option value="lkg">UKG</option>
//                             <option value="1">I</option>
//                             <option value="2">II</option>
//                             <option value="3">III</option>
//                             <option value="4">IV</option>
//                             <option value="5">V</option>
//                             <option value="6">VI</option>
//                             <option value="7">VII</option>
//                             <option value="8">VIII</option>
//                             <option value="9">IX</option>
//                             <option value="10">X</option>
//                             <option value="11">XI</option>
//                             <option value="12">XII</option>
//                         </Form.Select>
//                    </Col>
//             {/* <Col>
//               <Form.Label>Section</Form.Label>
//               <Form.Select  style={{height: '60px'}}>
//                 <option value="A">A</option>
//                 <option value="B">B</option>
//                 <option value="C">C</option>
//               </Form.Select>
//             </Col> */}

            
//             <Col style={{paddingBottom:'11px'}} >
//             <Form.Label>Student</Form.Label>
//             <Select 
//               isMulti
//               options={options}
//               value={selectedOptions}
//               onChange={handleSelectChange}
//               styles={{
//                 control: (provided) => ({
//                   ...provided,
//                   height: '60px',
//                 }),
//               }} />

//             </Col>
//           </Row>


//           <Row className='pt-3'>
//           <Col>
//           <Form.Group as={Col} controlId="feeCategory">
//             <Form.Label className='pb-3 ps-2'>Fee Category</Form.Label>
//             <Form.Select required value={newFeesHeading}   className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px'}}>
//             <option>Select Fee Category</option>
//                 <option value="School Fees" id="SF">School Fees</option>
//                 <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                 <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                 <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Fee Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group as={Col} controlId="subCategory">
//             <Form.Label className='pb-3 ps-2'>Sub Category</Form.Label>
//             <Form.Select required value={newFeesSubHeading} onChange={(e)=> setNewFeesSubHeading (e.target.value)} className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px'}}>
//               <option value="">Select Sub Category</option>
//               {subCategory.map((res) => (
//                 <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
//                 ))}
             
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               Please select a Sub Category.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Col>
           
//           </Row><hr className='py-3'/>

//             <Row>
//             <Col className='pt-2'>
//               <FormControl fullWidth>
//                       <Form.Select value={newAcadYear} onChange={(e)=> setNewAcadYear (e.target.value)} name="acad_year" style={{width:'100%',height:'55px'}}>
//                           <option value="" disabled>select year</option>
//                           <option value="2023">2023</option>
//                           <option value="2024">2024</option>
//                           <option value="2025">2025</option>
//                           <option value="2024">2026</option>
//                           <option value="2025">2027</option>
//                           <option value="2024">2028</option>
//                           <option value="2025">2029</option>
//                         </Form.Select>
//                    </FormControl>
//               </Col>
//               <Col className='pt-2'> 
//                  <FloatingLabel controlId="floatingPassword" label="₹ Amount">
//                    <Form.Control value={newAmount} onChange={(e)=> setnewAmount (e.target.value)} className="custom-input" name="amount" type="number" placeholder="₹ Amount" />
//                 </FloatingLabel>
//               </Col>
//               <Col>
//               <div className='pt-2'>
//                 <DatePicker className='datepicker-wrapper'
//                     dateFormat="dd/MM/yyyy"
//                     value={Cdate}
//                     onChange={(date) => { 
//                       const d = new Date(date).toLocaleDateString('fr-FR');
//                       console.log(d);
//                       setNewDueDate(d);
//                     }}/>
//                 </div>
//               </Col>
//             </Row>
//              {/* Hidden fields */}
//       {/* <Form.Control type="hidden" name="status" defaultValue="1" />
//       <Form.Control type="hidden" name="standard" defaultValue="12" /> */}
//       <Form.Control
//         type="hidden"
//         name="created_by"
//         defaultValue={sessionStorage.getItem('user_id')}/>
//             <div className='py-4'>
//              <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//             </div>
//           </Form>
//         </Accordion.Body>
//       </Accordion.Item>
//     </Accordion>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default Feesmaping
