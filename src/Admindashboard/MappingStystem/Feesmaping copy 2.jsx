import React, { useState, useEffect } from 'react';
import Select from 'react-select';
// import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
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
import { Button, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper'; 



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
  const [selectedOptionsStudent, setSelectedOptionsStudent] = useState([]);
  const[count,setCount]=useState(0);
  

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

  const handleSelectChangeStudent = (selectedOptions) => {
    setSelectedOptionsStudent(selectedOptions);
  };


  const inc=()=>{
    setCount(count+1);
  }
  const dec=()=>{
    setCount(count-1);
  }


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
          
          <Row>
            <Col className="col-3 pb-3">
           <Typography className="" >Fee Category<span style={{ color: 'red' }}>*</span>:</Typography>
            <Form.Select required value={newFeesHeading}   className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'35px'}}>
            <option>Select Fee Category</option>
                <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
            </Form.Select>
            </Col>
            <Col className='col-3 pt-0'>
              <FormControl fullWidth>
              <Typography className="" >Acad Year:</Typography>
                      <Form.Control placeholder='Enter Academic year' value={newAcadYear} onChange={(e)=> setNewAcadYear (e.target.value)} name="acad_year" style={{width:'100%',height:'35px'}} />
                   </FormControl>
            </Col>
            <Col className='col-3 pt-0'>
            <Typography className="" >Date:</Typography>
              <DatePicker className=''
                dateFormat="dd/MM/yyyy"
                style={{width:'100%',height:'35px'}}
                    value={Cdate}
                    onChange={(date) => { 
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setNewDueDate(d);
                    }}/>
                     </Col>
            
          </Row>
       <Row>
  {/* <div className="pt-5 d-flex" style={{ margin: "auto", width: "100%", border: "5px solid #dfdfdf", padding: "52px", backgroundColor: "#e6e6e6" }}>
  
  </div> */}

<Col className="col-3">  
           <Typography className="" >Select Class:</Typography>
           <Form.Select  name='standard'  value={newInvoiceClass}  onChange={(e) => setNewInvoiceClass(e.target.value)} onClick={getStudents} >
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
   <Col className="col-6">  
      
          <Typography className=""> Select Student : </Typography>
 
        <Select
              // isMulti
        options={options}
        value={selectedOptionsStudent}
                onChange={handleSelectChangeStudent}
                menuPortalTarget={document.body} // Render the menu outside of its parent container
        styles={{
          control: (provided) => ({
            ...provided,
            maxHeight:'800px',
            overflowY: 'auto'  ,           // Adjust width as needed
            menu: (provided) => ({
              ...provided,
              height: '50px', //
              position: 'absolute', // Set position to fixed
              zIndex: 9999, // Set a high zIndex to overlay other elements
            }),
          }),
         }}
              />
        </Col>
    </Row>
          





        </div>
        <Paper elevation={2} className='px-4 py-4'>
        <Table id="ThirdStandardFeeTable3" style={{ borderCollapse: 'collapse', margin: '28px', border: 'none', backgroundColor: '#ffff', borderRadius: '8px', width: '80%' }}>
  <TableHead style={{ backgroundColor: '#E6E6E6' }}>
    <TableRow>
      <TableCell style={{ fontWeight: 'bold' ,width:'40px'}}>S.No</TableCell>
      <TableCell style={{ fontWeight: 'bold' ,width:'80px'}}>Checkbox</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>Sub Fees</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}> Amount</TableCell> 
      <TableCell style={{ fontWeight: 'bold' }}> Priority</TableCell> 
    </TableRow>
  </TableHead>
  <TableBody>
    {/* Sample data rows */}
    {subCategory.map((item, index) => (
      <TableRow key={item.id}>
        <TableCell>{index + 1}</TableCell>
        {/* Add your other table cells here */}
        {/* Add checkboxes column */}
        <TableCell>
  <input
    type="checkbox"
    name={`subHeading${index}`}
    value={item.sub_heading}
     style={{
      transform: 'scale(1.2)',
      width: '35%',
      backgroundColor: '#E6E6E6',
      color: '#000000',
      borderRadius: '50%',
   
     }}  />
</TableCell>

        <TableCell>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item.sub_heading}</Typography>
        </TableCell>
        <TableCell>
         <Form.Control
            type="text"
            style={{ width: '200px', paddingLeft: '25px', backgroundColor: '#aa656545' }}
   />
 
      </TableCell>
        <TableCell>
        <div style={{ display: 'flex', justifyContent: 'left'}}>
        <Button
        variant="contained"
        style={{
          minWidth: '4px',
          minHeight: '4px',
          borderRadius: '50%',
          fontWeight: 'bold',
          backgroundColor: '#7bb5ff78',
          color: '#000000',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: '#2C3035',
          },
        }}
        onClick={inc}
      >
        +
      </Button>
     <TextField
        value={count}
        size="small"
        style={{
          width: '19%',
          backgroundColor: '#E6E6E6',
          color: '#000000',
          // borderRadius: '50%',
          border: 'none',
          textAlign: 'center',
          fontWeight: 'bold',
         }}
      />     <Button
        variant="contained"
        style={{
          minWidth: '4px',
          minHeight: '4px',
          borderRadius: '50%',
          fontWeight: 'bold',
          backgroundColor: '#7bb5ff78',
          color: '#000000',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: '#2C3035',
          },
        }}
        onClick={dec}
      >
        -
      </Button>
    </div>
        </TableCell>
      </TableRow>
    ))}
              <TableRow>
               <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
  <Typography variant="body1" style={{ fontSize: '1.2rem', color: 'red',fontWeight:'300' }}>
    <u>TOTAL</u>
  </Typography>
</TableCell>
              <TableCell>  <Form.Control
            type="text"
            style={{ width: '200px', paddingLeft: '25px', backgroundColor: 'rgb(194 30 30 / 27%)' }}
                /></TableCell>
                </TableRow>
            </TableBody>
         
</Table> 
<div style={{ display: 'flex', justifyContent: 'left'}} className='ml-4'>
 <div style={{ paddingRight:'40px', paddingLeft:'140px'}} >  <button className="btn btn-warning py-2 px-7 " type="submit">
    <h6 className="mb-0 text-danger">Submit</h6>
            </button>
            </div>
            <div style={{ paddingRight:'70px'}} > <button className="btn btn-primary py-2 px-4" type="submit">
    <h6 className="mb-0 text-white">Save Record</h6>
            </button>
            </div>
</div>
<hr className='mb-8 my-8'/>

        </Paper>

    </div>
    </div>
  )
}

export default Feesmaping
