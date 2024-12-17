import React, { useRef, useState, useEffect } from "react";
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import { TbWorldUpload } from 'react-icons/tb'
import { IoSearchOutline } from "react-icons/io5";

import Swal from 'sweetalert2';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import $  from 'jquery'; 

import SvsInvoice from '../Svs-invoice.jpg';
import ReactToPrint from 'react-to-print';
import {Box, Divider, Grid, Card, CardContent,  Button, Table, TableHead, TableRow, TableCell, TableBody, Typography ,TableFooter } from '@mui/material';
import { Print } from '@mui/icons-material';
import ReactDOM from 'react-dom';
 import 'jquery/dist/jquery.min.js';
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"

const MasterReportForm = () => {
  const componentRef = useRef();

  
const [newInvoiceClass, setNewInvoiceClass] = useState('');

const [options, setOptions] = useState([]);
const [selectedOptionsStudent, setSelectedOptionsStudent] = useState([]);
const [selectedOptionsInvoice, setSelectedOptionsInvoice] = useState([]);
const [selectedOptionsReciepts, setSelectedOptionsReciepts] = useState([]);
const [selectedOptionsAdmission, setSelectedOptionsAdmission] = useState([]);
const [selectedOptionsReciptInvoice, setSelectedOptionsReciptInvoice] = useState([]);
const [fromDate, setFromDate] = useState(null);
const [toDate, setToDate] = useState(null); 
const [Studentinfo, setStudentinfo] = useState([]);
const [StudentinfoM, setStudentinfoM] = useState([]);


  const [optionsreciepts, setOptionsReciepts] = useState([]);
const [optionsinvoice, setOptionsInvoice] = useState([]);
const [optionsAdmission, setOptionsAdmission] = useState([]);

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
  useEffect(() => {

// const Invoice = async () => {
//   try {
//     // https://santhoshavidhyalaya.com/SVSTEST/api/invoiceSearch?invoice_no=SVS22JAN244071
//       const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/invoiceSearch`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         } 
//       });
//       const data = await response.json();
//        if (data) {
//          const options = data.map(item => ({
//            value: item.slno,
//            label: item.invoice_no
//          }));
//          console.log(options);
//          setOptionsInvoice(options);
//        }
//     } catch (error) {
//       console.log(error);
//     } 
//     }
    const Admission = async () => {
      try {
        // https://santhoshavidhyalaya.com/SVSTEST/api/invoiceSearch?invoice_no=SVS22JAN244071
          const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/admissionSearch`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            } 
          });
          const data = await response.json();
           if (data) {
             const options = data.map(item => ({
               value: item.id,
               label: item.admission_no 
             }));
             console.log(options);
             setOptionsAdmission(options);
           }
        } catch (error) {
          console.log(error);
        } 
      }
  // const Recipt = async () => {
  //   try {
  //    const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/ReciptSearch`, {
  //      method: 'POST',
  //      headers: {
  //        'Content-Type': 'application/json',
  //      } 
  //    });
  //    const data = await response.json();
  //     if (data) {
  //       const options = data.map(item => ({
  //         value: item.id,
  //         label: item.transactionId
  //       }));
  //       console.log(options);
  //       setOptionsReciepts(options);
  //     }
  //  } catch (error) {
  //    console.log(error);
  //  } 
  //   }
    // Invoice(); Recipt();
    Admission();
  }, []); // Empty dependency array to ensure it runs only once when the component mounts

const handleFilter = async () => {
  
  
  console.log(fromDate, toDate, selectedOptionsStudent.value, selectedOptionsAdmission.value );
  let admissionNo;
  if (selectedOptionsStudent.value !== undefined && selectedOptionsStudent.value !== null) {
      admissionNo = selectedOptionsStudent.value;
  } else if (selectedOptionsAdmission.value !== undefined && selectedOptionsAdmission.value !== null) {
      admissionNo = selectedOptionsAdmission.value;
  } else {
    Swal.fire({
      icon: "warning",
      title: "No Student/Admission no. Selected",
      text:  "Please Select anyone.",
    });
  }
  try {
    const response = await axios.post(
      "https://santhoshavidhyalaya.com/SVSTEST/api/StudentLedger",
      {
        FromDate: fromDate,
        ToDate: toDate,
        StudentID: admissionNo
      }
    );
  
    // Extracting the data from the response
    const responseData = response.data;
    
    // Further processing with responseData if needed

      console.log('---->>>>',responseData);
    setStudentinfo(responseData);
  } catch (error) {
    // Error handling
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Failed to process request!',
      footer: 'Please try again later.'
    });
    console.error('Error:', error);
    return;
  }
// if (responseData.data.length === 0) {
  // Swal.fire({
  // icon: "warning",
  // title: "No Data Found",
  // text:  "No data was found for the given criteria.",
  // });
// return;
// }
 
  }
  const handleSelectChangeInvoice = (selectedOptions) => {
    setSelectedOptionsInvoice(selectedOptions);
  };
  const handleSelectChangeStudent = (selectedOptions) => {
    setSelectedOptionsStudent(selectedOptions);
  };
  const handleSelectChangeReciepts = (selectedOptions) => {
    setSelectedOptionsReciepts(selectedOptions);
  };
  const handleSelectChangeAdmission = (selectedOptions) => {
    setSelectedOptionsAdmission(selectedOptions);
  };
  //
  
 
  return (
    
    <div className="pt-4">
   
     <Row>
  {/* <div className="pt-5 d-flex" style={{ margin: "auto", width: "100%", border: "5px solid #dfdfdf", padding: "52px", backgroundColor: "#e6e6e6" }}>
  
  </div> */}
          <div style={{ display: "flex", height:"5vh" }} >
          <Typography className="ps-2 pe-1 pt-2">Select Class<span style={{ color: 'red' }}>*</span>:</Typography>
          <div className="pt-1" style={{width:'20%'}}><Form.Select  name='standard'  value={newInvoiceClass}  onChange={(e) => setNewInvoiceClass(e.target.value)} onClick={getStudents} >
                            <option>Select Class</option>
                            <option value="lkg">LKG</option>
                            <option value="ukg">UKG</option>
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
            </Form.Select></div>
        
    <Typography className="pe-2 pt-2 px-3">From Date<span style={{ color: 'red' }}>*</span>:</Typography>
    <input type="date" onChange={(e) => setFromDate(e.target.value)} />
    <Typography className="ps-2 pe-2 pt-2 px-3">To Date<span style={{ color: 'red' }}>*</span>:</Typography>
    <input type="date" onChange={(e) => setToDate(e.target.value)} />
  </div>
 
      <Col>
      <div style={{ display: "flex", height:"10vh" }}className="pt-1 ,px-3"
 style={{ display: "flex" }}>
          <Typography className="pt-3 px-2"><u>Select Student</u><span style={{ color: 'red' }}>*</span>: </Typography>
          <div className="pt-2 ,px-1" style={{width:'700px'}}>

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
              </div>
        </div>
      </Col>
     
  

      </Row>
      <Row>
      <Col>
      <div className="pt-0 ,px-3"
         style={{ display: "flex" }}>
          <Typography className="pt-3 px-2">Select Admission No: </Typography>
          <div className="pt-2 ,px-5" style={{width:'300px'}}>

        <Select
              // isMulti
        options={optionsAdmission}
        value={selectedOptionsAdmission}
        onChange={handleSelectChangeAdmission}
        menuPortalTarget={document.body} // Render the menu outside of its parent container

        styles={{
          control: (provided) => ({
            ...provided,
            maxHeight:'800px',
            overflowY: 'auto'  ,           // Adjust width as needed
            menu: (provided) => ({
              ...provided,
              position: 'absolute', // Position the menu absolutely
              top: 'initial', // Remove the top position to make it dynamic
              bottom: '100%', // Position the menu above the component
              zIndex: 9999, // Set a high zIndex to overlay other elements
            }),
          }),
         }}
              />
            </div>
             

          </div>
       
      </Col>

    </Row>
    <Row>
      <div className="ps-4 px-4 py-1">
        <button className="btn btn-warning" type="submit" onClick={handleFilter}>
          <h6 className="mb-0 text-danger" onClick={handleFilter}><IoSearchOutline size={25} /> Filter</h6>
         </button>
      </div>
      </Row>
      <div>
        <div>
        <div className="container">
        <hr className='mb-1'/>
{/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
            <Paper sx={{ margin: '20px', padding: '50px' }}>   
            <div  ref={componentRef} className="container" sx={{ backgroundColor: 'white'}} >
           

  {/* <table id="ThirdStandardFeeTable3" className="display">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Roll No</th>
        <th>Academic Year</th>
        <th>Fee Category</th>
        <th>Sub Category</th>
        <th>₹ Total Amount</th>
        <th>Date</th>
        
      </tr>
    </thead>
                </table> */}
                <div style={{ padding: '14px' }}> <ReactToPrint 
    trigger={() => <Button 
      startIcon={<Print style={{ fontSize: 30, color: 'textPrimary' }} />} 
      variant="contained" 
      color="primary" 
      className="printcustom" 
      style={{ padding: '14px' }}
    >
    </Button>
    }
    content={() => {
        const component = componentRef.current;
        $ (component)
        .find("table")
        .addClass("compact")
        .css({
          'font-size': 'inherit',
          'font-color':'red',
          'color':'red',
          'table-layout': 'fixed',
          'width': '100%', // Ensure the table fills its container
          'border-collapse': 'collapse',
          'margin': '0', // Remove any margins
          'padding': '0', // Remove any padding
          'overflow': 'auto' // Allow horizontal scrolling if necessary
      });
        return component;
    }}
/></div> 
 
   <div className="print-wrapper" style={{style : 'block'}}>
  <div className='print-content'>
                <div className='d-flex'>
    <Row>
       <Col xs={9} className='pt-4'>
        <Typography style={{
          backgroundColor: '#0C83DC',
          width: '40%',
          borderRadius: '0 6px 6px 0px',
          textAlign: 'left',
          padding: '8px 0',
          textTransform: 'uppercase',
          color: 'aliceblue',
        }}>Master Report</Typography>
        <div className='pt-3 px-3'>
          <h3 style={{fontFamily:'sans-serif'}}>Santhosha Vidhyalaya</h3>
          <h6 style={{fontFamily:'sans-serif'}}>Dohnavur Fellowship, </h6>
          <h6 style={{fontFamily:'sans-serif'}}>Dohnavur – 627102, </h6>
          <h6 style={{fontFamily:'sans-serif'}}>Tirunelveli District, Tamil Nadu</h6>
          <h6 style={{fontFamily:'sans-serif'}}>Mobile – +91 80125 12145, </h6>
          <h6 style={{fontFamily:'sans-serif'}}>Email – finance@santhoshavidhayalaya.com </h6>
        </div>
      </Col>
      <Col xs={3} className='text-left pt-3'>
        <img style={{width:'60%'}} src={SvsInvoice} />
      </Col>
    </Row>
                    </div>
                    {/* <Box border={1} borderRadius={10} padding={2}> */}

                    {/* <Card sx={{ paddingX: '142px' }} variant="outlined"> */}
                    <Card sx={{ paddingX: '142px' }}border={1} borderRadius={10} >
        <CardContent>
          {/* <Typography variant="h6">Student Information</Typography> */}
          <Divider />
          <Table>
                          {Studentinfo && Studentinfo.userDataMaster &&

                            <TableBody style={{ fontFamily: 'sans-serif' }}>
                              {/* <TableRow>
            <TableCell align="center"><Typography >S.No</Typography></TableCell>
            <TableCell align="left"><Typography >1 </Typography></TableCell>
          </TableRow> */}
                              <TableRow>
                                <TableCell align="center"><Typography >Name of the Child</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.userDataMaster.STUDENT_NAME ? ` ${Studentinfo.userDataMaster.STUDENT_NAME}` : null} </Typography></TableCell>
 
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >Father Name</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.userDataMaster.FATHER ? ` ${Studentinfo.userDataMaster.FATHER}` : null} </Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >Mobile No (Father)</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.userDataMaster.MOBILE_NUMBER ? ` ${Studentinfo.userDataMaster.MOBILE_NUMBER}` : null} </Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >Mother Name</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.userDataMaster.MOTHER ? ` ${Studentinfo.userDataMaster.MOTHER}` : null} </Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >Mobile No (Mother)</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.userDataMaster.WHATS_APP_NO ? ` ${Studentinfo.userDataMaster.WHATS_APP_NO}` : null} </Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >Class</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.userDataMaster.SOUGHT_STD ? ` ${Studentinfo.userDataMaster.SOUGHT_STD}` : null} th Grade</Typography></TableCell>
                              </TableRow>
                              {/* <TableRow>
                                <TableCell align="center"><Typography >Total Invoice</Typography></TableCell>
                                <TableCell align="left"><Typography >Rs. {Studentinfo.totalInvoiceAmount ? ` ${Studentinfo.totalInvoiceAmount}` : null}</Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >Total Receipt</Typography></TableCell>
                                <TableCell align="left"><Typography >Rs. {Studentinfo.totalByPayAmount ? ` ${Studentinfo.totalByPayAmount}` : null}</Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >Due</Typography></TableCell>
                                <TableCell align="left"> <Typography>Rs. {Studentinfo.totalInvoiceAmount && Studentinfo.totalByPayAmount ? `${Studentinfo.totalInvoiceAmount - Studentinfo.totalByPayAmount}` : null}</Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >Excess</Typography></TableCell>
                                <TableCell align="left"><Typography >Rs. {Studentinfo.userData.excess_amount ? ` ${Studentinfo.userData.excess_amount}` : null}</Typography></TableCell>
                              </TableRow> */}
                             
                              {/* <TableRow>
                                <TableCell align="center"><Typography >School Total Fees</Typography></TableCell>
                                <TableCell align="left"><Typography ></Typography></TableCell>
                              </TableRow> */}
                               <TableRow>
                                <TableCell colspan="2" align="center"><Typography sx={{ fontSize: '14px' }} >School Fees Breakup </Typography></TableCell>
                               </TableRow> 
                              {Studentinfo?.schooltotals?.invoice?.["School Fees"] && 
 Object.entries(Studentinfo.schooltotals.invoice["School Fees"]).map(([feeType, feeAmount], index) => (
    <TableRow key={feeType}>
    <TableCell align="center">
      <Typography>{index + 1}.School Fees: {feeType}</Typography>
    </TableCell>
    <TableCell align="left">
      <Typography>{feeAmount}</Typography>
    </TableCell>
  </TableRow>
 ))}
                                <TableRow>
                <TableCell colspan="2" align="center"><Typography >****</Typography></TableCell>
               </TableRow>

                              <TableRow>
                                <TableCell align="center"><Typography >School Total Discount</Typography></TableCell>
                                <TableCell align="left"><Typography ></Typography>{Studentinfo.schooltotaDiscountAmount ? ` ${Studentinfo.schooltotaDiscountAmount}` : 0}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colspan="2" align="center"><Typography sx={{ fontSize: '14px' }}>School Discount Breakup </Typography></TableCell>
                               </TableRow>  
                              {Studentinfo?.distotals?.schooldiscount && 
                    Object.entries(Studentinfo.distotals.schooldiscount).map(([discountType, discountAmount], index) => (
                        <TableRow key={`school-discount-${discountType}`}>
                            <TableCell align="center">
                                <Typography>{index + 1}.school-discount {discountType}</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography>{discountAmount}</Typography>
                            </TableCell>
                        </TableRow>
                    ))
                              }
                                          <TableRow>
                <TableCell colspan="2" align="center"><Typography >****</Typography></TableCell>
               </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >School Total Invoice Amount</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.schooltotalInvoiceAmount ? ` ${Studentinfo.schooltotalInvoiceAmount}` : 0}</Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >School Total Paid Amount</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.schooltotalByPayAmount ? ` ${Studentinfo.schooltotalByPayAmount}` : 0}</Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >School Total Dues Amount</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.schooltotaldues ? ` ${Studentinfo.schooltotaldues}` : 0}</Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >School Total Excess Amount</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.schooltotalexcess ? ` ${Studentinfo.schooltotalexcess}` : 0}</Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colspan="2" align="center"><Typography sx={{ fontSize: '14px' }}>Hostel Fees Breakup </Typography></TableCell>
                               </TableRow>    
                               {
  Studentinfo?.hosteltotals?.invoice?.["Hostel Bill"] &&
  Object.entries(Studentinfo.hosteltotals.invoice["Hostel Bill"]).map(([feeType, feeAmount], index) => (
    <TableRow key={`recpt-${feeType}`}>
      <TableCell align="center">
        <Typography>{index + 1}. Hostel Fees {feeType}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>{feeAmount}</Typography>
      </TableCell>
    </TableRow>
  ))
}

                              <TableRow>
                <TableCell colspan="2" align="center"><Typography >****</Typography></TableCell>
               </TableRow>
          
                              {/* <TableRow>
                                <TableCell align="center"><Typography >Hostel Total Fees</Typography></TableCell>
                                <TableCell align="left"><Typography ></Typography></TableCell>
                              </TableRow> */}
                              <TableRow>
                                <TableCell colspan="2" align="center"><Typography sx={{ fontSize: '14px' }}>Hostel Total Breakup of Discounts</Typography></TableCell>
                               </TableRow>
                               {
  Studentinfo?.distotals?.hosteldiscount &&
  Object.entries(Studentinfo.distotals.hosteldiscount).map(([discountType, discountAmount], index) => (
    <TableRow key={`school-discount-${discountType}`}>
      <TableCell align="center">
        <Typography>{index + 1}. Other Discount {discountType}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>{discountAmount}</Typography>
      </TableCell>
    </TableRow>
  ))
}

                              <TableRow>
                                <TableCell colspan="2" align="center"><Typography >****</Typography></TableCell>
                               </TableRow>
                               <TableRow>
                                <TableCell align="center"><Typography >Hostel Total Discount</Typography></TableCell>
                                <TableCell align="left"><Typography ></Typography>{Studentinfo.hosteltotaDiscountAmount ? ` ${Studentinfo.hosteltotaDiscountAmount}` : 0}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >Hostel Total Invoice Amount</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.hosteltotalInvoiceAmount ? ` ${Studentinfo.hosteltotalInvoiceAmount}` : 0}</Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >Hostel Total Paid Amount</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.hosteltotalByPayAmount ? ` ${Studentinfo.hosteltotalByPayAmount}` : 0}</Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >Hostel Total Dues Amount</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.hosteltotaldues ? ` ${Studentinfo.hosteltotaldues}` : 0}</Typography></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center"><Typography >Hostel Total Excess Amount</Typography></TableCell>
                                <TableCell align="left"><Typography >{Studentinfo.hosteltotalexcess ? ` ${Studentinfo.hosteltotalexcess}` : 0}</Typography></TableCell>
                              </TableRow>
                            </TableBody>
                          }     
                        </Table>
 
         </CardContent>
                    </Card>
                  {/* </Box> */}
    </div>
                  </div>
</div>

</Paper >        
         </div>      


  {/* ****************print view************************* */}
        <div style={{ width: '210mm', height: '297mm', margin: 'auto' }}>
  <section className='text-end p-4'>
  {/* <button onClick={() => printDiv('receipt-details')} style={{ backgroundColor: '#0C83DC', color: 'white', padding: '14px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Print</button> */}
           

           
            </section> 
       

  
</div>

 {/*************** end ********* of ********* print ********* view *********************/}
          </div>
      </div>
  </div>
  
     
    
  )
}
function printDiv(divId) {
  var content = document.getElementById(divId);
  var printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head><title>Receipt Details</title>');
  printWindow.document.write('</head><body>');
  printWindow.document.write(content.innerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}

export default MasterReportForm


































// import React, { useRef, useState, useEffect } from "react";
// import Sidebar from '../Sidebar';
// import Header from '../Header';
// import Footer from '../Footer';
// import Paper from '@mui/material/Paper'; 
// import { TbWorldUpload } from 'react-icons/tb'
// import { IoSearchOutline } from "react-icons/io5";

// import Swal from 'sweetalert2';
// import axios from "axios";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Form from 'react-bootstrap/Form';
// import Select from 'react-select';
// import $  from 'jquery'; 

// import SvsInvoice from '../Svs-invoice.jpg';
// import ReactToPrint from 'react-to-print';
// import {Box, Divider, Grid, Card, CardContent,  Button, Table, TableHead, TableRow, TableCell, TableBody, Typography ,TableFooter } from '@mui/material';
// import { Print } from '@mui/icons-material';
// import ReactDOM from 'react-dom';
//  import 'jquery/dist/jquery.min.js';
// import "datatables.net/js/jquery.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
// import "datatables.net-buttons/js/dataTables.buttons.js"
// import "datatables.net-buttons/js/buttons.colVis.js"
// import "datatables.net-buttons/js/buttons.flash.js"
// import "datatables.net-buttons/js/buttons.html5.js"
// import "datatables.net-buttons/js/buttons.print.js"
// import "datatables.net-dt/css/jquery.dataTables.min.css"

// const MasterReportForm = () => {
//   const componentRef = useRef();

  
// const [newInvoiceClass, setNewInvoiceClass] = useState('');

// const [options, setOptions] = useState([]);
// const [selectedOptionsStudent, setSelectedOptionsStudent] = useState([]);
// const [selectedOptionsInvoice, setSelectedOptionsInvoice] = useState([]);
// const [selectedOptionsReciepts, setSelectedOptionsReciepts] = useState([]);
// const [selectedOptionsAdmission, setSelectedOptionsAdmission] = useState([]);
// const [selectedOptionsReciptInvoice, setSelectedOptionsReciptInvoice] = useState([]);
// const [fromDate, setFromDate] = useState(null);
// const [toDate, setToDate] = useState(null); 
// const [Studentinfo, setStudentinfo] = useState([]);
// const [StudentinfoM, setStudentinfoM] = useState([]);


//   const [optionsreciepts, setOptionsReciepts] = useState([]);
// const [optionsinvoice, setOptionsInvoice] = useState([]);
// const [optionsAdmission, setOptionsAdmission] = useState([]);

// const getStudents = async () => {
//   if (newInvoiceClass ) {
//      console.log(newInvoiceClass);
//      try {
//       const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/studentByGrades/${newInvoiceClass}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         } 
//       });
//       const data = await response.json();
//        if (data) {
//          const options = data.map(item => ({
//            value: item.id,
//            label: item.concordinate_string
//          }));
//          console.log(options);
//          setOptions(options);
//        }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   }
//   useEffect(() => {

// // const Invoice = async () => {
// //   try {
// //     // https://santhoshavidhyalaya.com/SVSTEST/api/invoiceSearch?invoice_no=SVS22JAN244071
// //       const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/invoiceSearch`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         } 
// //       });
// //       const data = await response.json();
// //        if (data) {
// //          const options = data.map(item => ({
// //            value: item.slno,
// //            label: item.invoice_no
// //          }));
// //          console.log(options);
// //          setOptionsInvoice(options);
// //        }
// //     } catch (error) {
// //       console.log(error);
// //     } 
// //     }
//     const Admission = async () => {
//       try {
//         // https://santhoshavidhyalaya.com/SVSTEST/api/invoiceSearch?invoice_no=SVS22JAN244071
//           const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/admissionSearch`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             } 
//           });
//           const data = await response.json();
//            if (data) {
//              const options = data.map(item => ({
//                value: item.id,
//                label: item.admission_no 
//              }));
//              console.log(options);
//              setOptionsAdmission(options);
//            }
//         } catch (error) {
//           console.log(error);
//         } 
//       }
//   // const Recipt = async () => {
//   //   try {
//   //    const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/ReciptSearch`, {
//   //      method: 'POST',
//   //      headers: {
//   //        'Content-Type': 'application/json',
//   //      } 
//   //    });
//   //    const data = await response.json();
//   //     if (data) {
//   //       const options = data.map(item => ({
//   //         value: item.id,
//   //         label: item.transactionId
//   //       }));
//   //       console.log(options);
//   //       setOptionsReciepts(options);
//   //     }
//   //  } catch (error) {
//   //    console.log(error);
//   //  } 
//   //   }
//     // Invoice(); Recipt();
//     Admission();
//   }, []); // Empty dependency array to ensure it runs only once when the component mounts

// const handleFilter = async () => {
  
  
//   console.log(fromDate, toDate, selectedOptionsStudent.value, selectedOptionsAdmission.value );
//   let admissionNo;
//   if (selectedOptionsStudent.value !== undefined && selectedOptionsStudent.value !== null) {
//       admissionNo = selectedOptionsStudent.value;
//   } else if (selectedOptionsAdmission.value !== undefined && selectedOptionsAdmission.value !== null) {
//       admissionNo = selectedOptionsAdmission.value;
//   } else {
//     Swal.fire({
//       icon: "warning",
//       title: "No Student/Admission no. Selected",
//       text:  "Please Select anyone.",
//     });
//   }
//   try {
//     const response = await axios.post(
//       "https://santhoshavidhyalaya.com/SVSTEST/api/StudentLedger",
//       {
//         FromDate: fromDate,
//         ToDate: toDate,
//         StudentID: admissionNo
//       }
//     );
  
//     // Extracting the data from the response
//     const responseData = response.data;
    
//     // Further processing with responseData if needed

//     console.log(responseData);
//     setStudentinfo(responseData);
//   } catch (error) {
//     // Error handling
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: 'Failed to process request!',
//       footer: 'Please try again later.'
//     });
//     console.error('Error:', error);
//     return;
//   }
// // if (responseData.data.length === 0) {
//   // Swal.fire({
//   // icon: "warning",
//   // title: "No Data Found",
//   // text:  "No data was found for the given criteria.",
//   // });
// // return;
// // }
 
//   }
//   const handleSelectChangeInvoice = (selectedOptions) => {
//     setSelectedOptionsInvoice(selectedOptions);
//   };
//   const handleSelectChangeStudent = (selectedOptions) => {
//     setSelectedOptionsStudent(selectedOptions);
//   };
//   const handleSelectChangeReciepts = (selectedOptions) => {
//     setSelectedOptionsReciepts(selectedOptions);
//   };
//   const handleSelectChangeAdmission = (selectedOptions) => {
//     setSelectedOptionsAdmission(selectedOptions);
//   };
//   //
  
 
//   return (
    
//     <div className="pt-4">
   
//      <Row>
//   {/* <div className="pt-5 d-flex" style={{ margin: "auto", width: "100%", border: "5px solid #dfdfdf", padding: "52px", backgroundColor: "#e6e6e6" }}>
  
//   </div> */}
//           <div style={{ display: "flex", height:"5vh" }} >
//           <Typography className="ps-2 pe-1 pt-2">Select Class<span style={{ color: 'red' }}>*</span>:</Typography>
//           <div className="pt-1" style={{width:'20%'}}><Form.Select  name='standard'  value={newInvoiceClass}  onChange={(e) => setNewInvoiceClass(e.target.value)} onClick={getStudents} >
//                             <option>Select Class</option>
//                             <option value="lkg">LKG</option>
//                             <option value="ukg">UKG</option>
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
//             </Form.Select></div>
        
//     <Typography className="pe-2 pt-2 px-3">From Date<span style={{ color: 'red' }}>*</span>:</Typography>
//     <input type="date" onChange={(e) => setFromDate(e.target.value)} />
//     <Typography className="ps-2 pe-2 pt-2 px-3">To Date<span style={{ color: 'red' }}>*</span>:</Typography>
//     <input type="date" onChange={(e) => setToDate(e.target.value)} />
//   </div>
 
//       <Col>
//       <div style={{ display: "flex", height:"10vh" }}className="pt-1 ,px-3"
//  style={{ display: "flex" }}>
//           <Typography className="pt-3 px-2"><u>Select Student</u><span style={{ color: 'red' }}>*</span>: </Typography>
//           <div className="pt-2 ,px-1" style={{width:'700px'}}>

//         <Select
//               // isMulti
//         options={options}
//         value={selectedOptionsStudent}
//                 onChange={handleSelectChangeStudent}
//                 menuPortalTarget={document.body} // Render the menu outside of its parent container
//         styles={{
//           control: (provided) => ({
//             ...provided,
//             maxHeight:'800px',
//             overflowY: 'auto'  ,           // Adjust width as needed
//             menu: (provided) => ({
//               ...provided,
//               height: '50px', //
//               position: 'absolute', // Set position to fixed
//               zIndex: 9999, // Set a high zIndex to overlay other elements
//             }),
//           }),
//          }}
//               />
//               </div>
//         </div>
//       </Col>
     
  

//       </Row>
//       <Row>
//       <Col>
//       <div className="pt-0 ,px-3"
//          style={{ display: "flex" }}>
//           <Typography className="pt-3 px-2">Select Admission No: </Typography>
//           <div className="pt-2 ,px-5" style={{width:'300px'}}>

//         <Select
//               // isMulti
//         options={optionsAdmission}
//         value={selectedOptionsAdmission}
//         onChange={handleSelectChangeAdmission}
//         menuPortalTarget={document.body} // Render the menu outside of its parent container

//         styles={{
//           control: (provided) => ({
//             ...provided,
//             maxHeight:'800px',
//             overflowY: 'auto'  ,           // Adjust width as needed
//             menu: (provided) => ({
//               ...provided,
//               position: 'absolute', // Position the menu absolutely
//               top: 'initial', // Remove the top position to make it dynamic
//               bottom: '100%', // Position the menu above the component
//               zIndex: 9999, // Set a high zIndex to overlay other elements
//             }),
//           }),
//          }}
//               />
//             </div>
             

//           </div>
       
//       </Col>

//     </Row>
//     <Row>
//       <div className="ps-4 px-4 py-1">
//         <button className="btn btn-warning" type="submit" onClick={handleFilter}>
//           <h6 className="mb-0 text-danger" onClick={handleFilter}><IoSearchOutline size={25} /> Filter</h6>
//          </button>
//       </div>
//       </Row>
//       <div>
//         <div>
//         <div className="container">
//         <hr className='mb-1'/>
// {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
//             <Paper sx={{ margin: '20px', padding: '50px' }}>   
//             <div  ref={componentRef} className="container" sx={{ backgroundColor: 'white'}} >
           

//   {/* <table id="ThirdStandardFeeTable3" className="display">
//     <thead>
//       <tr>
//         <th>S.No</th>
//         <th>Roll No</th>
//         <th>Academic Year</th>
//         <th>Fee Category</th>
//         <th>Sub Category</th>
//         <th>₹ Total Amount</th>
//         <th>Date</th>
        
//       </tr>
//     </thead>
//                 </table> */}
//                 <div style={{ padding: '14px' }}> <ReactToPrint 
//     trigger={() => <Button 
//       startIcon={<Print style={{ fontSize: 30, color: 'textPrimary' }} />} 
//       variant="contained" 
//       color="primary" 
//       className="printcustom" 
//       style={{ padding: '14px' }}
//     >
//     </Button>
//     }
//     content={() => {
//         const component = componentRef.current;
//         $ (component)
//         .find("table")
//         .addClass("compact")
//         .css({
//           'font-size': 'inherit',
//           'font-color':'red',
//           'color':'red',
//           'table-layout': 'fixed',
//           'width': '100%', // Ensure the table fills its container
//           'border-collapse': 'collapse',
//           'margin': '0', // Remove any margins
//           'padding': '0', // Remove any padding
//           'overflow': 'auto' // Allow horizontal scrolling if necessary
//       });
//         return component;
//     }}
// /></div> 
 
//    <div className="print-wrapper" style={{style : 'block'}}>
//   <div className='print-content'>
//                 <div className='d-flex'>
//     <Row>
//        <Col xs={9} className='pt-4'>
//         <Typography style={{
//           backgroundColor: '#0C83DC',
//           width: '40%',
//           borderRadius: '0 6px 6px 0px',
//           textAlign: 'left',
//           padding: '8px 0',
//           textTransform: 'uppercase',
//           color: 'aliceblue',
//         }}>Master Report</Typography>
//         <div className='pt-3 px-3'>
//           <h3 style={{fontFamily:'sans-serif'}}>Santhosha Vidhyalaya</h3>
//           <h6 style={{fontFamily:'sans-serif'}}>Dohnavur Fellowship, </h6>
//           <h6 style={{fontFamily:'sans-serif'}}>Dohnavur – 627102, </h6>
//           <h6 style={{fontFamily:'sans-serif'}}>Tirunelveli District, Tamil Nadu</h6>
//           <h6 style={{fontFamily:'sans-serif'}}>Mobile – +91 80125 12145, </h6>
//           <h6 style={{fontFamily:'sans-serif'}}>Email – finance@santhoshavidhayalaya.com </h6>
//         </div>
//       </Col>
//       <Col xs={3} className='text-left pt-3'>
//         <img style={{width:'60%'}} src={SvsInvoice} />
//       </Col>
//     </Row>
//                     </div>
//                     {/* <Box border={1} borderRadius={10} padding={2}> */}

//                     {/* <Card sx={{ paddingX: '142px' }} variant="outlined"> */}
//                     <Card sx={{ paddingX: '142px' }}border={1} borderRadius={10} >
//         <CardContent>
//           {/* <Typography variant="h6">Student Information</Typography> */}
//           <Divider />
//           <Table>
//                           {Studentinfo && Studentinfo.userDataMaster &&

//                             <TableBody style={{ fontFamily: 'sans-serif' }}>
//                               {/* <TableRow>
//             <TableCell align="center"><Typography >S.No</Typography></TableCell>
//             <TableCell align="left"><Typography >1 </Typography></TableCell>
//           </TableRow> */}
//                               <TableRow>
//                                 <TableCell align="center"><Typography >Name of the Child</Typography></TableCell>
//                                 <TableCell align="left"><Typography >{Studentinfo.userDataMaster.STUDENT_NAME ? ` ${Studentinfo.userDataMaster.STUDENT_NAME}` : null} </Typography></TableCell>
 
//                               </TableRow>
//                               <TableRow>
//                                 <TableCell align="center"><Typography >Father Name</Typography></TableCell>
//                                 <TableCell align="left"><Typography >{Studentinfo.userDataMaster.FATHER ? ` ${Studentinfo.userDataMaster.FATHER}` : null} </Typography></TableCell>
//                               </TableRow>
//                               <TableRow>
//                                 <TableCell align="center"><Typography >Mobile No (Father)</Typography></TableCell>
//                                 <TableCell align="left"><Typography >{Studentinfo.userDataMaster.MOBILE_NUMBER ? ` ${Studentinfo.userDataMaster.MOBILE_NUMBER}` : null} </Typography></TableCell>
//                               </TableRow>
//                               <TableRow>
//                                 <TableCell align="center"><Typography >Mother Name</Typography></TableCell>
//                                 <TableCell align="left"><Typography >{Studentinfo.userDataMaster.MOTHER ? ` ${Studentinfo.userDataMaster.MOTHER}` : null} </Typography></TableCell>
//                               </TableRow>
//                               <TableRow>
//                                 <TableCell align="center"><Typography >Mobile No (Mother)</Typography></TableCell>
//                                 <TableCell align="left"><Typography >{Studentinfo.userDataMaster.WHATS_APP_NO ? ` ${Studentinfo.userDataMaster.WHATS_APP_NO}` : null} </Typography></TableCell>
//                               </TableRow>
//                               <TableRow>
//                                 <TableCell align="center"><Typography >Class</Typography></TableCell>
//                                 <TableCell align="left"><Typography >{Studentinfo.userDataMaster.SOUGHT_STD ? ` ${Studentinfo.userDataMaster.SOUGHT_STD}` : null} th Grade</Typography></TableCell>
//                               </TableRow>
//                               <TableRow>
//                                 <TableCell align="center"><Typography >Total Invoice</Typography></TableCell>
//                                 <TableCell align="left"><Typography >Rs. {Studentinfo.totalInvoiceAmount ? ` ${Studentinfo.totalInvoiceAmount}` : null}</Typography></TableCell>
//                               </TableRow>
//                               <TableRow>
//                                 <TableCell align="center"><Typography >Total Receipt</Typography></TableCell>
//                                 <TableCell align="left"><Typography >Rs. {Studentinfo.totalByPayAmount ? ` ${Studentinfo.totalByPayAmount}` : null}</Typography></TableCell>
//                               </TableRow>
//                               <TableRow>
//                                 <TableCell align="center"><Typography >Due</Typography></TableCell>
//                                 <TableCell align="left"> <Typography>Rs. {Studentinfo.totalInvoiceAmount && Studentinfo.totalByPayAmount ? `${Studentinfo.totalInvoiceAmount - Studentinfo.totalByPayAmount}` : null}</Typography></TableCell>
//                               </TableRow>
//                               <TableRow>
//                                 <TableCell align="center"><Typography >Excess</Typography></TableCell>
//                                 <TableCell align="left"><Typography >Rs. {Studentinfo.userData.excess_amount ? ` ${Studentinfo.userData.excess_amount}` : null}</Typography></TableCell>
//                               </TableRow>
//                             </TableBody>
//                           }     
//                         </Table>
 
//          </CardContent>
//                     </Card>
//                   {/* </Box> */}
//     </div>
//                   </div>
// </div>

// </Paper >        
//          </div>      


//   {/* ****************print view************************* */}
//         <div style={{ width: '210mm', height: '297mm', margin: 'auto' }}>
//   <section className='text-end p-4'>
//   {/* <button onClick={() => printDiv('receipt-details')} style={{ backgroundColor: '#0C83DC', color: 'white', padding: '14px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Print</button> */}
           

           
//             </section> 
       

  
// </div>

//  {/*************** end ********* of ********* print ********* view *********************/}
//           </div>
//       </div>
//   </div>
  
     
    
//   )
// }
// function printDiv(divId) {
//   var content = document.getElementById(divId);
//   var printWindow = window.open('', '_blank');
//   printWindow.document.write('<html><head><title>Receipt Details</title>');
//   printWindow.document.write('</head><body>');
//   printWindow.document.write(content.innerHTML);
//   printWindow.document.write('</body></html>');
//   printWindow.document.close();
//   printWindow.print();
// }

// export default MasterReportForm
