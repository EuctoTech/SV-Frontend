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
 

import SvsInvoice from '../Svs-invoice.jpg';
import ReactToPrint from 'react-to-print';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Typography ,TableFooter } from '@mui/material';
import { Print } from '@mui/icons-material';
import ReactDOM from 'react-dom';
import $ from 'jquery'; 
import 'jquery/dist/jquery.min.js';
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
const LedgerSummaryForm = () => {
  const componentRef = useRef();

  const [newInvoiceClass, setNewInvoiceClass] = useState('');

  const [options, setOptions] = useState([]);
  const [selectedOptionsStudent, setSelectedOptionsStudent] = useState([]);
  const [selectedOptionsSponsor, setSelectedOptionsSponsor] = useState([]);
  const [selectedOptionsReciepts, setSelectedOptionsReciepts] = useState([]);
  const [selectedOptionsAdmission, setSelectedOptionsAdmission] = useState([]);
  const [selectedOptionsReciptInvoice, setSelectedOptionsReciptInvoice] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  

  const [optionsreciepts, setOptionsReciepts] = useState([]);
  const [optionsSponsor, setOptionsSponsor] = useState([]);
  const [optionsAdmission, setOptionsAdmission] = useState([]);
  const [responseData, setresponseData] = useState([]);  
  const [resultArray, setresultArray] = useState([]);  

  const [schoolDue, setschoolDue] = useState('');
  const [hostelDue, sethostelDue] = useState('');
  const [schoolExcess, setschoolExcess] = useState('');
  const [hostelExcess, sethostelExcess] = useState('');
  
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
 
  useEffect(() => {
    const fetchSponsorData = async () => {
      try {
        const response = await fetch('https://santhoshavidhyalaya.com/SVSTEST/api/sponsor/select', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log('Sponsor', data);

        if (data) {
          const options = [
              { value: '', label: '-Select Sponsor-' }, // Add empty value as the first option
              ...data.sponsorOptions.map(item => ({
                  value: item.id,
                  label: item.name
              }))
          ];
          setOptionsSponsor(options);
      }
      
      } catch (error) {
        console.log(error);
      }
    };

    fetchSponsorData();
  }, []);
// Function to flatten nested objects
const flattenObject = (obj, parentKey = '') => {
  let flattened = {};
  for (let key in obj) {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      const nested = flattenObject(obj[key], `${parentKey}${key}_`);
      flattened = { ...flattened, ...nested };
    } else {
      flattened[`${parentKey}${key}`] = obj[key];
    }
  }
  return flattened;
};

 const handleFilter = async () => {
  setresponseData([]);
   setresultArray([]);
  
  console.log(fromDate, toDate, newInvoiceClass,selectedOptionsReciptInvoice,selectedOptionsSponsor.value);
  try {
    const response = await axios.post(
      "https://santhoshavidhyalaya.com/SVSTEST/api/LedgerSummary",
      {
        FromDate: fromDate,
        ToDate: toDate,
        Std: newInvoiceClass,
        SponsorID: selectedOptionsSponsor.value,
        // ReceiptorInvoice:selectedOptionsReciptInvoice
         
      }
    );
    const responseData = response.data;
    console.log(responseData);
    setresponseData(responseData);
    setschoolDue(responseData.schoolTotals['school_due_amount']);
    sethostelDue(responseData.hostelTotals['hostel_due_amount']);
    setschoolExcess(responseData.schoolTotals['school_excess_amount']);
    sethostelExcess(responseData.hostelTotals['hostel_excess_amount']);
    const flattenedArray = Object.entries(flattenObject(responseData)).map(([key, value]) => ({ key, value }));

    // Check if 'totals' and 'invoice' properties exist in responseData
    if (responseData && responseData.totals && responseData.totals.invoice) {
      const hostelBillFeeNames = Object.keys(responseData.totals.invoice['Hostel Bill'] || {});
      const schoolFeesNames = Object.keys(responseData.totals.invoice['School Fees'] || {});
      const schoolDiscount = Object.keys(responseData.distotals['schooldiscount'] || {});
      const hostelDiscount = Object.keys(responseData.distotals['hosteldiscount'] || {});
      const resultArray = [];
  
      // Add 'Hostel Bill' as heading with empty values
      resultArray.push({ 'Fee Name': '<b><u>Hostel Bill</u></b>', 'Invoice Amount': '-', 'Receipt Amount': '-' });
  
      // Iterate over fee names for 'Hostel Bill'
      hostelBillFeeNames.forEach(feeName => {
          const invoiceAmount = responseData.totals.invoice['Hostel Bill'][feeName] || '-';
          const receiptAmount = responseData.totals.recpt['Hostel Bill'][feeName] || '-';
          resultArray.push({ 'Fee Name': feeName, 'Invoice Amount': invoiceAmount, 'Receipt Amount': receiptAmount });
      });
       // Add 'Hostel Bill' as heading with empty values
       resultArray.push({ 'Hostel Discount Name': '<b><u>Hostel Discount</u></b>' });

       // Iterate over fee names for 'Hostel Bill'
       hostelDiscount.forEach(feeName => {
         const discountAmount = responseData.distotals['hosteldiscount'][feeName] || '-';
         resultArray.push({ 'Hostel Discount Name': feeName, 'Discount Amount': discountAmount });
     });
      // Add 'School Fees' as heading with empty values
      resultArray.push({ 'Fee Name': '<b><u>School Fees</u></b>', 'Invoice Amount': '-', 'Receipt Amount': '-' });
  
      // Iterate over fee names for 'School Fees'
      schoolFeesNames.forEach(feeName => {
          const invoiceAmount = responseData.totals.invoice['School Fees'][feeName] || '-';
          const receiptAmount = responseData.totals.recpt['School Fees'][feeName] || '-';
          resultArray.push({ 'Fee Name': feeName, 'Invoice Amount': invoiceAmount, 'Receipt Amount': receiptAmount });
      });
      resultArray.push({ 'School Discount Name': '<b><u>School Discount</u></b>', 'Discount Amount': '-' });

      // Iterate over fee names for 'Hostel Bill'
      schoolDiscount.forEach(feeName => {
        const discountAmount = responseData.distotals['schooldiscount'][feeName] || '-';
        console.log(discountAmount);
        resultArray.push({ 'School Discount Name': feeName, 'Discount Amount': discountAmount });
    });
      console.log('resultArray', resultArray);
      setresultArray(resultArray);
  }
  else {
      console.log('totals or invoice properties not found in responseData');
      Swal.fire({
        icon: "warning",
        title: "No Invoice/Receipt Found",
        text:  "Please try again with different date.",
      });
    }
    
    
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "warning",
      title: "No Invoice/Receipt Found",
      text:  "Please try again with different date.",
    });
  }
  }
  const handleSelectChangeSponsor = (selectedOptions) => {
    setSelectedOptionsSponsor(selectedOptions);
  };
  const handleSelectChangeStudent = (selectedOptions) => {
    setSelectedOptionsStudent(selectedOptions);
  };
  // const handleSelectChangeReciepts = (selectedOptions) => {
  //   setSelectedOptionsReciepts(selectedOptions);
  // };
  const handleSelectChangeAdmission = (selectedOptions) => {
    setSelectedOptionsAdmission(selectedOptions);
  };
  // useEffect(() => {
  //   $(document).ready(() => {
  //     $('#ThirdStandardFeeTable3').DataTable(); // Initialize DataTables on the table element
  //   });
  // })
  //
  // useEffect(() => {

  //   $(document).ready(function () {
  //     var table = $('#ThirdStandardFeeTable3').DataTable({
  //       destroy: true,
  //       processing: true,
  //       serverSide: true,
  //       ajax: {
  //         url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/studentsMaps/12',
  //         type: 'POST',
  //       },
  //       dom: 'lfBrtip',
  //       buttons: [
  //         {
  //           extend: 'copy',
  //           className: 'btn btn-success',
  //         },
  //         {
  //           extend: 'csv',
  //           className: 'btn btn-danger',
  //         },
  //         // {
  //         //   extend: 'print',
  //         //   className: 'btn btn-warning',
  //         // },
     

  //       ],
  //       columns: [
  //         { data: 'slno', title: 'Serial-Number', className: 'text-dark' },
  //         { data: 'roll_no', title: 'Roll-Number', className: 'Fees Type' },
  //         // { data: 'acad_year', title: 'Academic Year', className: 'text-dark' },
  //         { data: 'amount', className: 'text-dark' },
  //         { data: 'amount', className: 'text-dark' },
  //         // { data: 'amount', title: 'Amount 3', className: 'text-dark' },
  //         // { data: 'amount', title: 'Amount 4', className: 'text-dark' }
  //       ],
        
    
  //     });
  //   });
  // }, []);

  const totalInvoiceAmount = resultArray.reduce((acc, row) => {
    const invoiceAmount = parseFloat(row['Invoice Amount']);
    return isNaN(invoiceAmount) ? acc : acc + invoiceAmount;
  }, 0);
  
  // Calculate total receipt amount
  const totalReceiptAmount = resultArray.reduce((acc, row) => {
    const receiptAmount = parseFloat(row['Receipt Amount']);
    return isNaN(receiptAmount) ? acc : acc + receiptAmount;
  }, 0);
  return (
    
    <div className="pt-4">
   
     <Row>
  {/* <div className="pt-5 d-flex" style={{ margin: "auto", width: "100%", border: "5px solid #dfdfdf", padding: "52px", backgroundColor: "#e6e6e6" }}>
  
  </div> */}
          <div style={{ display: "flex", height:"7vh" }} >
          <Typography className="ps-1 pe-1 pt-2">Select Class<span style={{ color: 'red' }}>*</span>:</Typography>
          <div className="pt-1" style={{ width: '20%' }}><Form.Select name='standard' value={newInvoiceClass} onChange={(e) => setNewInvoiceClass(e.target.value)}
            // onClick={getStudents}
          >
                            <option>Select Class</option>
                            <option value="All">All</option>
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
            {/* <Typography className="ps-2 pe-2 pt-2">Receipt/Invoice<span style={{ color: 'red' }}>*</span> :</Typography>
            <div className="pt-1" style={{ width: '8%' }}><Form.Select name='RecInv'
            value={selectedOptionsReciptInvoice} onChange={(e) => setSelectedOptionsReciptInvoice(e.target.value)}
            menuPortalTarget={document.body} // Render the menu outside of its parent container

            >
                            <option>Select </option>
                            <option  value="receipt"selected>Receipt</option>
                            <option value="invoice">Invoice</option>
                        </Form.Select></div> */}
    <Typography className="pe-0 pt-2 px-1">From Date<span style={{ color: 'red' }}>*</span>:</Typography>
<input type="date" style={{ height: '40px' }} onChange={(e) => setFromDate(e.target.value)} />
    <Typography className="ps-0 pe-0 pt-2 pr-1">To Date<span style={{ color: 'red' }}>*</span>:</Typography>
    <input type="date" style={{ height: '40px' }} onChange={(e) => setToDate(e.target.value)} />
  </div>
{/*  
      <Col>
      <div style={{ display: "flex", height:"8vh" }}className="pt-0 ,px-3"
 style={{ display: "flex" }}>
          <Typography className="pt-1 px-2">Select Student<span style={{ color: 'red' }}>*</span>: </Typography>
          <div className="pt-0 ,px-1" style={{width:'700px'}}>

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
      </Col> */}
    </Row>
      <Row>
      <Col>
      <div className="pt-0 ,px-3"
         style={{ display: "flex" }}>
          <Typography className="pt-3 px-2"><u>Select Sponsor<span style={{ color: 'red' }}>*</span>: </u></Typography>
          <div className="pt-2 ,px-5" style={{width:'700px'}}>

        <Select
              // isMulti
        options={optionsSponsor}
        value={selectedOptionsSponsor}
                onChange={handleSelectChangeSponsor}
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
      {/* <Row>
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

    </Row> */}
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
            <div className="print-wrapper" style={{style : 'block'}}>
  <div className='print-content'>
                <div className='d-flex'>
    <Row>
      <Col xs={9} className='pt-4'>
        <Typography style={{
          backgroundColor: '#0C83DC',
          width: '40%',
          borderRadius: '0 6px 6px 0px',
          textAlign: 'center',
          padding: '8px 0',
          textTransform: 'uppercase',
          color: 'aliceblue',
        }}>Ledger Summary</Typography>
                          <div className='pt-3 px-3'>
                         
          <h3 style={{fontFamily:'sans-serif'}}>Santhosha Vidhyalaya</h3>
          <h6 style={{fontFamily:'sans-serif'}}>Dohnavur Fellowship, </h6>
          <h6 style={{fontFamily:'sans-serif'}}>Dohnavur – 627102, </h6>
          <h6 style={{fontFamily:'sans-serif'}}>Tirunelveli District, Tamil Nadu</h6>
          <h6 style={{fontFamily:'sans-serif'}}>Mobile – +91 80125 12145, </h6>
          <h6 style={{fontFamily:'sans-serif'}}>Email – finance@santhoshavidhayalaya.com </h6>
        </div>
      </Col>
      <Col xs={3} className='text-center pt-3'>
        <img style={{width:'60%'}} src={SvsInvoice} />
      </Col>
    </Row>
  </div>
  <div className='pt-3 px-3'>
    <Row>
    <Col xs={4}>
  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Total Discount:</Typography>
  <Typography variant="body2">{responseData.discountTotal ? `${responseData.discountTotal}` : 'null'}</Typography>
</Col>
<Col xs={4}>
  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Sponsor Name:</Typography>
  <Typography variant="body2">{selectedOptionsSponsor.value ? `${selectedOptionsSponsor.label}` : 'null'}</Typography>
</Col>

      {/* <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Student Name:</Typography>
        <Typography variant="body2">Your Student Name</Typography>
      </Col>
      <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Admission No:</Typography>
        <Typography variant="body2">Your Admission No</Typography>
      </Col> */}
                  </Row>
                  <div style={{ height: '20px' }} />
<div style={{ height: '20px' }} />
  

                  </div>
                  </div>
                  </div>

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
                <div style={{ padding: '10px' }}> <ReactToPrint 
    trigger={() => <Button 
      startIcon={<Print style={{ fontSize: 30, color: 'textPrimary' }} />} 
      variant="contained" 
      color="primary" 
      className="printcustom" 
      style={{ padding: '10px' }}
    >
    </Button>
    }
    content={() => {
        const component = componentRef.current;
        $(component)
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
<Table id="ThirdStandardFeeTable3" style={{ borderCollapse: 'collapse', padding: '18px', paddingLeft: '18px', border: 'none', backgroundColor: '#ffff', borderRadius: '8px', width: '100%', margin: 'auto' }}>
      <TableHead style={{backgroundColor:"#E6E6E6"}}>
        <TableRow>
          {/* <TableCell style={{ fontWeight: 'bold'}}>S.No</TableCell> */}
          {/* <TableCell style={{ fontWeight: 'bold'}}>Fees Type</TableCell> */}
          <TableCell style={{ fontWeight: 'bold' }}>Fees/Discount Type</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Total Invoice Amount</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Total Receipt Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
   {/* Sample data rows */}
  {resultArray && resultArray.map((row, index) => (
    <TableRow key={index}>
{/* <TableCell dangerouslySetInnerHTML={{ __html: row['Fee Name'] }}></TableCell>
     <TableCell >{row['Invoice Amount']}</TableCell>
     <TableCell >{row['Receipt Amount']}</TableCell> */}
     <TableCell dangerouslySetInnerHTML={{ __html: row['Fee Name'] || row['Hostel Discount Name'] || row['School Discount Name'] }}></TableCell>
        <TableCell>{row['Invoice Amount'] || '-'}</TableCell>
        <TableCell>{row['Receipt Amount'] || row['Discount Amount'] || '-'}</TableCell>
    </TableRow>
  ))}
</TableBody>

<TableFooter style={{backgroundColor:"#E6E6E6"}}>
        <TableRow>
          <TableCell style={{ fontWeight: 'bold' ,fontSize: 16}}>Total:</TableCell>
          <TableCell style={{ fontWeight: 'bold' ,fontSize: 16}}>{totalInvoiceAmount}</TableCell>
          <TableCell style={{ fontWeight: 'bold', fontSize: 16}}>{totalReceiptAmount}</TableCell>
        </TableRow>
                    <TableRow style={{borderTop: "9%"}}>
          <TableCell  style={{ fontWeight: 'bold',textAlign:'left', fontSize: 16}} colSpan={1}>Total Balance:  </TableCell>
          <TableCell colSpan={2}style={{ fontWeight: 'bold', fontSize: 16}}>{totalInvoiceAmount -totalReceiptAmount}</TableCell>
          {/* <TableCell style={{ fontWeight: 'bold' ,fontSize: 16}}>{totalInvoiceAmount}</TableCell> */}
          {/* <TableCell style={{ fontWeight: 'bold', fontSize: 16}}>{totalReceiptAmount}</TableCell> */}
        </TableRow>
        <TableRow style={{borderTop: "9%"}}>
            <TableCell  style={{ fontWeight: 'bold',textAlign:'left', fontSize: 16}} colSpan={1}>Total School Dues:  </TableCell>
            <TableCell colSpan={2}style={{ fontWeight: 'bold', fontSize: 16}}>{schoolDue}</TableCell>
        </TableRow>
        <TableRow style={{borderTop: "9%"}}>
            <TableCell  style={{ fontWeight: 'bold',textAlign:'left', fontSize: 16}} colSpan={1}>Total Hostel Dues:  </TableCell>
            <TableCell colSpan={2}style={{ fontWeight: 'bold', fontSize: 16}}>{hostelDue}</TableCell>
        </TableRow>
        <TableRow style={{borderTop: "9%"}}>
            <TableCell  style={{ fontWeight: 'bold',textAlign:'left', fontSize: 16}} colSpan={1}>Total School Excess:  </TableCell>
            <TableCell colSpan={2}style={{ fontWeight: 'bold', fontSize: 16}}>{schoolExcess}</TableCell>
        </TableRow>
        <TableRow style={{borderTop: "9%"}}>
            <TableCell  style={{ fontWeight: 'bold',textAlign:'left', fontSize: 16}} colSpan={1}>Total Hostel Excess:  </TableCell>
            <TableCell colSpan={2}style={{ fontWeight: 'bold', fontSize: 16}}>{hostelExcess}</TableCell>
        </TableRow>
      </TableFooter>

                  </Table>
                {/* <button className="btn btn-warning" onClick="printTable()" >Print</button> */}

  
</div>

</Paper >        
         </div>      


  {/* ****************print view************************* */}
        <div style={{ width: '210mm', height: '297mm', margin: 'auto' }}>
  <section className='text-end p-4'>
  {/* <button onClick={() => printDiv('receipt-details')} style={{ backgroundColor: '#0C83DC', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Print</button> */}
           

           
            </section> 
       

   
</div>

 {/***********************  end of print view **************************/}
          </div>
      </div>
  </div>
  
     
    
  )
}
function printDiv(divId) {
  var content = document.getElementById(divId);
  var printWindow = window.open('', '_blank');
  
  // Open a new window and write the content
  printWindow.document.write('<html><head><title>Receipt Details</title></head><body>');
  printWindow.document.write('<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">');
  
  // Write the content of the specified div
  printWindow.document.write('<div style="text-align: center;">');
  printWindow.document.write('<Table id="ThirdStandardFeeTable3" style="border-collapse: collapse; padding: 18px;margin-left: 28px; border: none; background-color: #ffff; border-radius: 8px; width: 100%;">');
  // Add table content here
  printWindow.document.write('</Table>');
  printWindow.document.write('</div>');
  printWindow.document.write('</div>');
  
  // Close the HTML document
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  
  // Print the content
  printWindow.print();
  
}


export default LedgerSummaryForm



















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
 

// import SvsInvoice from '../Svs-invoice.jpg';
// import ReactToPrint from 'react-to-print';
// import { Button, Table, TableHead, TableRow, TableCell, TableBody, Typography ,TableFooter } from '@mui/material';
// import { Print } from '@mui/icons-material';
// import ReactDOM from 'react-dom';
// import $ from 'jquery'; 
// import 'jquery/dist/jquery.min.js';
// import "datatables.net/js/jquery.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
// import "datatables.net-buttons/js/dataTables.buttons.js"
// import "datatables.net-buttons/js/buttons.colVis.js"
// import "datatables.net-buttons/js/buttons.flash.js"
// import "datatables.net-buttons/js/buttons.html5.js"
// import "datatables.net-buttons/js/buttons.print.js"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
// const LedgerSummaryForm = () => {
//   const componentRef = useRef();

//   const [newInvoiceClass, setNewInvoiceClass] = useState('');

//   const [options, setOptions] = useState([]);
//   const [selectedOptionsStudent, setSelectedOptionsStudent] = useState([]);
//   const [selectedOptionsSponsor, setSelectedOptionsSponsor] = useState([]);
//   const [selectedOptionsReciepts, setSelectedOptionsReciepts] = useState([]);
//   const [selectedOptionsAdmission, setSelectedOptionsAdmission] = useState([]);
//   const [selectedOptionsReciptInvoice, setSelectedOptionsReciptInvoice] = useState([]);
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
  

//   const [optionsreciepts, setOptionsReciepts] = useState([]);
//   const [optionsSponsor, setOptionsSponsor] = useState([]);
//   const [optionsAdmission, setOptionsAdmission] = useState([]);
//   const [responseData, setresponseData] = useState([]);  
//   const [resultArray, setresultArray] = useState([]);  

//   const [schoolDue, setschoolDue] = useState('');
//   const [hostelDue, sethostelDue] = useState('');
//   const [schoolExcess, setschoolExcess] = useState('');
//   const [hostelExcess, sethostelExcess] = useState('');
  
//    // const getStudents = async () => {  
//   //   if (newInvoiceClass ) {
//   //      console.log(newInvoiceClass);
//   //      try {
//   //       const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/studentByGrades/${newInvoiceClass}`, {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         } 
//   //       });
//   //       const data = await response.json();
//   //        if (data) {
//   //          const options = data.map(item => ({
//   //            value: item.id,
//   //            label: item.concordinate_string
//   //          }));
//   //          console.log(options);
//   //          setOptions(options);
//   //        }
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   }
//   //   }
 
//   useEffect(() => {
//     const fetchSponsorData = async () => {
//       try {
//         const response = await fetch('https://santhoshavidhyalaya.com/SVSTEST/api/sponsor/select', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });
//         const data = await response.json();
//         console.log('Sponsor', data);

//         if (data) {
//           const options = [
//               { value: '', label: '-Select Sponsor-' }, // Add empty value as the first option
//               ...data.sponsorOptions.map(item => ({
//                   value: item.id,
//                   label: item.name
//               }))
//           ];
//           setOptionsSponsor(options);
//       }
      
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchSponsorData();
//   }, []);
// // Function to flatten nested objects
// const flattenObject = (obj, parentKey = '') => {
//   let flattened = {};
//   for (let key in obj) {
//     if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
//       const nested = flattenObject(obj[key], `${parentKey}${key}_`);
//       flattened = { ...flattened, ...nested };
//     } else {
//       flattened[`${parentKey}${key}`] = obj[key];
//     }
//   }
//   return flattened;
// };

//  const handleFilter = async () => {
//   setresponseData([]);
//    setresultArray([]);
  
//   console.log(fromDate, toDate, newInvoiceClass,selectedOptionsReciptInvoice,selectedOptionsSponsor.value);
//   try {
//     const response = await axios.post(
//       "https://santhoshavidhyalaya.com/SVSTEST/api/LedgerSummary",
//       {
//         FromDate: fromDate,
//         ToDate: toDate,
//         Std: newInvoiceClass,
//         SponsorID: selectedOptionsSponsor.value,
//         // ReceiptorInvoice:selectedOptionsReciptInvoice
         
//       }
//     );
//     const responseData = response.data;
//     console.log(responseData);
//     setresponseData(responseData);
//     setschoolDue(responseData.schoolTotals['school_due_amount']);
//     sethostelDue(responseData.hostelTotals['hostel_due_amount']);
//     setschoolExcess(responseData.schoolTotals['school_excess_amount']);
//     sethostelExcess(responseData.hostelTotals['hostel_excess_amount']);
//     const flattenedArray = Object.entries(flattenObject(responseData)).map(([key, value]) => ({ key, value }));

//     // Check if 'totals' and 'invoice' properties exist in responseData
//     if (responseData && responseData.totals && responseData.totals.invoice) {
//       const hostelBillFeeNames = Object.keys(responseData.totals.invoice['Hostel Bill'] || {});
//       const schoolFeesNames = Object.keys(responseData.totals.invoice['School Fees'] || {});
//       const schoolDiscount = Object.keys(responseData.distotals['schooldiscount'] || {});
//       const hostelDiscount = Object.keys(responseData.distotals['hosteldiscount'] || {});
//       const resultArray = [];
  
//       // Add 'Hostel Bill' as heading with empty values
//       resultArray.push({ 'Fee Name': '<b><u>Hostel Bill</u></b>', 'Invoice Amount': '-', 'Receipt Amount': '-' });
  
//       // Iterate over fee names for 'Hostel Bill'
//       hostelBillFeeNames.forEach(feeName => {
//           const invoiceAmount = responseData.totals.invoice['Hostel Bill'][feeName] || '-';
//           const receiptAmount = responseData.totals.recpt['Hostel Bill'][feeName] || '-';
//           resultArray.push({ 'Fee Name': feeName, 'Invoice Amount': invoiceAmount, 'Receipt Amount': receiptAmount });
//       });
//        // Add 'Hostel Bill' as heading with empty values
//        resultArray.push({ 'Hostel Discount Name': '<b><u> Discount</u></b>' });

//        // Iterate over fee names for 'Hostel Bill'
//        hostelDiscount.forEach(feeName => {
//          const discountAmount = responseData.distotals['hosteldiscount'][feeName] || '-';
//          resultArray.push({ 'Hostel Discount Name': feeName, 'Discount Amount': discountAmount });
//      });
//       // Add 'School Fees' as heading with empty values
//       resultArray.push({ 'Fee Name': '<b><u>School Fees</u></b>', 'Invoice Amount': '-', 'Receipt Amount': '-' });
  
//       // Iterate over fee names for 'School Fees'
//       schoolFeesNames.forEach(feeName => {
//           const invoiceAmount = responseData.totals.invoice['School Fees'][feeName] || '-';
//           const receiptAmount = responseData.totals.recpt['School Fees'][feeName] || '-';
//           resultArray.push({ 'Fee Name': feeName, 'Invoice Amount': invoiceAmount, 'Receipt Amount': receiptAmount });
//       });
//     //   resultArray.push({ 'School Discount Name': '<b><u>School Discount</u></b>', 'Discount Amount': '-' });

//     //   // Iterate over fee names for 'Hostel Bill'
//     //   schoolDiscount.forEach(feeName => {
//     //     const discountAmount = responseData.distotals['schooldiscount'][feeName] || '-';
//     //     console.log(discountAmount);
//     //     resultArray.push({ 'School Discount Name': feeName, 'Discount Amount': discountAmount });
//     // });
//       console.log('resultArray', resultArray);
//       setresultArray(resultArray);
//   }
//   else {
//       console.log('totals or invoice properties not found in responseData');
//       Swal.fire({
//         icon: "warning",
//         title: "No Invoice/Receipt Found",
//         text:  "Please try again with different date.",
//       });
//     }
    
    
//   } catch (error) {
//     console.error(error);
//     Swal.fire({
//       icon: "warning",
//       title: "No Invoice/Receipt Found",
//       text:  "Please try again with different date.",
//     });
//   }
//   }
//   const handleSelectChangeSponsor = (selectedOptions) => {
//     setSelectedOptionsSponsor(selectedOptions);
//   };
//   const handleSelectChangeStudent = (selectedOptions) => {
//     setSelectedOptionsStudent(selectedOptions);
//   };
//   // const handleSelectChangeReciepts = (selectedOptions) => {
//   //   setSelectedOptionsReciepts(selectedOptions);
//   // };
//   const handleSelectChangeAdmission = (selectedOptions) => {
//     setSelectedOptionsAdmission(selectedOptions);
//   };
//   // useEffect(() => {
//   //   $(document).ready(() => {
//   //     $('#ThirdStandardFeeTable3').DataTable(); // Initialize DataTables on the table element
//   //   });
//   // })
//   //
//   // useEffect(() => {

//   //   $(document).ready(function () {
//   //     var table = $('#ThirdStandardFeeTable3').DataTable({
//   //       destroy: true,
//   //       processing: true,
//   //       serverSide: true,
//   //       ajax: {
//   //         url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/studentsMaps/12',
//   //         type: 'POST',
//   //       },
//   //       dom: 'lfBrtip',
//   //       buttons: [
//   //         {
//   //           extend: 'copy',
//   //           className: 'btn btn-success',
//   //         },
//   //         {
//   //           extend: 'csv',
//   //           className: 'btn btn-danger',
//   //         },
//   //         // {
//   //         //   extend: 'print',
//   //         //   className: 'btn btn-warning',
//   //         // },
     

//   //       ],
//   //       columns: [
//   //         { data: 'slno', title: 'Serial-Number', className: 'text-dark' },
//   //         { data: 'roll_no', title: 'Roll-Number', className: 'Fees Type' },
//   //         // { data: 'acad_year', title: 'Academic Year', className: 'text-dark' },
//   //         { data: 'amount', className: 'text-dark' },
//   //         { data: 'amount', className: 'text-dark' },
//   //         // { data: 'amount', title: 'Amount 3', className: 'text-dark' },
//   //         // { data: 'amount', title: 'Amount 4', className: 'text-dark' }
//   //       ],
        
    
//   //     });
//   //   });
//   // }, []);

//   const totalInvoiceAmount = resultArray.reduce((acc, row) => {
//     const invoiceAmount = parseFloat(row['Invoice Amount']);
//     return isNaN(invoiceAmount) ? acc : acc + invoiceAmount;
//   }, 0);
  
//   // Calculate total receipt amount
//   const totalReceiptAmount = resultArray.reduce((acc, row) => {
//     const receiptAmount = parseFloat(row['Receipt Amount']);
//     return isNaN(receiptAmount) ? acc : acc + receiptAmount;
//   }, 0);
//   return (
    
//     <div className="pt-4">
   
//      <Row>
//   {/* <div className="pt-5 d-flex" style={{ margin: "auto", width: "100%", border: "5px solid #dfdfdf", padding: "52px", backgroundColor: "#e6e6e6" }}>
  
//   </div> */}
//           <div style={{ display: "flex", height:"7vh" }} >
//           <Typography className="ps-1 pe-1 pt-2">Select Class<span style={{ color: 'red' }}>*</span>:</Typography>
//           <div className="pt-1" style={{ width: '20%' }}><Form.Select name='standard' value={newInvoiceClass} onChange={(e) => setNewInvoiceClass(e.target.value)}
//             // onClick={getStudents}
//           >
//                             <option>Select Class</option>
//                             <option value="All">All</option>
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
//             {/* <Typography className="ps-2 pe-2 pt-2">Receipt/Invoice<span style={{ color: 'red' }}>*</span> :</Typography>
//             <div className="pt-1" style={{ width: '8%' }}><Form.Select name='RecInv'
//             value={selectedOptionsReciptInvoice} onChange={(e) => setSelectedOptionsReciptInvoice(e.target.value)}
//             menuPortalTarget={document.body} // Render the menu outside of its parent container

//             >
//                             <option>Select </option>
//                             <option  value="receipt"selected>Receipt</option>
//                             <option value="invoice">Invoice</option>
//                         </Form.Select></div> */}
//     <Typography className="pe-0 pt-2 px-1">From Date<span style={{ color: 'red' }}>*</span>:</Typography>
// <input type="date" style={{ height: '40px' }} onChange={(e) => setFromDate(e.target.value)} />
//     <Typography className="ps-0 pe-0 pt-2 pr-1">To Date<span style={{ color: 'red' }}>*</span>:</Typography>
//     <input type="date" style={{ height: '40px' }} onChange={(e) => setToDate(e.target.value)} />
//   </div>
// {/*  
//       <Col>
//       <div style={{ display: "flex", height:"8vh" }}className="pt-0 ,px-3"
//  style={{ display: "flex" }}>
//           <Typography className="pt-1 px-2">Select Student<span style={{ color: 'red' }}>*</span>: </Typography>
//           <div className="pt-0 ,px-1" style={{width:'700px'}}>

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
//       </Col> */}
//     </Row>
//       <Row>
//       <Col>
//       <div className="pt-0 ,px-3"
//          style={{ display: "flex" }}>
//           <Typography className="pt-3 px-2"><u>Select Sponsor<span style={{ color: 'red' }}>*</span>: </u></Typography>
//           <div className="pt-2 ,px-5" style={{width:'700px'}}>

//         <Select
//               // isMulti
//         options={optionsSponsor}
//         value={selectedOptionsSponsor}
//                 onChange={handleSelectChangeSponsor}
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
//             </div>
             

//           </div>
       
//       </Col>

//       </Row>
//       {/* <Row>
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

//     </Row> */}
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
//             <div className="print-wrapper" style={{style : 'block'}}>
//   <div className='print-content'>
//                 <div className='d-flex'>
//     <Row>
//       <Col xs={9} className='pt-4'>
//         <Typography style={{
//           backgroundColor: '#0C83DC',
//           width: '40%',
//           borderRadius: '0 6px 6px 0px',
//           textAlign: 'center',
//           padding: '8px 0',
//           textTransform: 'uppercase',
//           color: 'aliceblue',
//         }}>Ledger Summary</Typography>
//                           <div className='pt-3 px-3'>
                         
//           <h3 style={{fontFamily:'sans-serif'}}>Santhosha Vidhyalaya</h3>
//           <h6 style={{fontFamily:'sans-serif'}}>Dohnavur Fellowship, </h6>
//           <h6 style={{fontFamily:'sans-serif'}}>Dohnavur – 627102, </h6>
//           <h6 style={{fontFamily:'sans-serif'}}>Tirunelveli District, Tamil Nadu</h6>
//           <h6 style={{fontFamily:'sans-serif'}}>Mobile – +91 80125 12145, </h6>
//           <h6 style={{fontFamily:'sans-serif'}}>Email – finance@santhoshavidhayalaya.com </h6>
//         </div>
//       </Col>
//       <Col xs={3} className='text-center pt-3'>
//         <img style={{width:'60%'}} src={SvsInvoice} />
//       </Col>
//     </Row>
//   </div>
//   <div className='pt-3 px-3'>
//     <Row>
//     <Col xs={4}>
//   <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Total Discount:</Typography>
//   <Typography variant="body2">{responseData.discountTotal ? `${responseData.discountTotal}` : 'null'}</Typography>
// </Col>
// <Col xs={4}>
//   <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Sponsor Name:</Typography>
//   <Typography variant="body2">{selectedOptionsSponsor.value ? `${selectedOptionsSponsor.label}` : 'null'}</Typography>
// </Col>

//       {/* <Col xs={4}>
//         <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Student Name:</Typography>
//         <Typography variant="body2">Your Student Name</Typography>
//       </Col>
//       <Col xs={4}>
//         <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Admission No:</Typography>
//         <Typography variant="body2">Your Admission No</Typography>
//       </Col> */}
//                   </Row>
//                   <div style={{ height: '20px' }} />
// <div style={{ height: '20px' }} />
  

//                   </div>
//                   </div>
//                   </div>

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
//                 <div style={{ padding: '10px' }}> <ReactToPrint 
//     trigger={() => <Button 
//       startIcon={<Print style={{ fontSize: 30, color: 'textPrimary' }} />} 
//       variant="contained" 
//       color="primary" 
//       className="printcustom" 
//       style={{ padding: '10px' }}
//     >
//     </Button>
//     }
//     content={() => {
//         const component = componentRef.current;
//         $(component)
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
// <Table id="ThirdStandardFeeTable3" style={{ borderCollapse: 'collapse', padding: '18px', paddingLeft: '18px', border: 'none', backgroundColor: '#ffff', borderRadius: '8px', width: '100%', margin: 'auto' }}>
//       <TableHead style={{backgroundColor:"#E6E6E6"}}>
//         <TableRow>
//           {/* <TableCell style={{ fontWeight: 'bold'}}>S.No</TableCell> */}
//           {/* <TableCell style={{ fontWeight: 'bold'}}>Fees Type</TableCell> */}
//           <TableCell style={{ fontWeight: 'bold' }}>Fees/Discount Type</TableCell>
//           <TableCell style={{ fontWeight: 'bold'}}>Total Invoice Amount</TableCell>
//           <TableCell style={{ fontWeight: 'bold'}}>Total Receipt Amount</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//    {/* Sample data rows */}
//   {resultArray && resultArray.map((row, index) => (
//     <TableRow key={index}>
// {/* <TableCell dangerouslySetInnerHTML={{ __html: row['Fee Name'] }}></TableCell>
//      <TableCell >{row['Invoice Amount']}</TableCell>
//      <TableCell >{row['Receipt Amount']}</TableCell> */}
//      <TableCell dangerouslySetInnerHTML={{ __html: row['Fee Name'] || row['Hostel Discount Name'] || row['School Discount Name'] }}></TableCell>
//         <TableCell>{row['Invoice Amount'] || '-'}</TableCell>
//         <TableCell>{row['Receipt Amount'] || row['Discount Amount'] || '-'}</TableCell>
//     </TableRow>
//   ))}
// </TableBody>

// <TableFooter style={{backgroundColor:"#E6E6E6"}}>
//         <TableRow>
//           <TableCell style={{ fontWeight: 'bold' ,fontSize: 16}}>Total:</TableCell>
//           <TableCell style={{ fontWeight: 'bold' ,fontSize: 16}}>{totalInvoiceAmount}</TableCell>
//           <TableCell style={{ fontWeight: 'bold', fontSize: 16}}>{totalReceiptAmount}</TableCell>
//         </TableRow>
//                     <TableRow style={{borderTop: "9%"}}>
//           <TableCell  style={{ fontWeight: 'bold',textAlign:'left', fontSize: 16}} colSpan={1}>Total Balance:  </TableCell>
//           <TableCell colSpan={2}style={{ fontWeight: 'bold', fontSize: 16}}>{totalInvoiceAmount -totalReceiptAmount}</TableCell>
//           {/* <TableCell style={{ fontWeight: 'bold' ,fontSize: 16}}>{totalInvoiceAmount}</TableCell> */}
//           {/* <TableCell style={{ fontWeight: 'bold', fontSize: 16}}>{totalReceiptAmount}</TableCell> */}
//         </TableRow>
//         <TableRow style={{borderTop: "9%"}}>
//             <TableCell  style={{ fontWeight: 'bold',textAlign:'left', fontSize: 16}} colSpan={1}>Total School Dues:  </TableCell>
//             <TableCell colSpan={2}style={{ fontWeight: 'bold', fontSize: 16}}>{schoolDue}</TableCell>
//         </TableRow>
//         <TableRow style={{borderTop: "9%"}}>
//             <TableCell  style={{ fontWeight: 'bold',textAlign:'left', fontSize: 16}} colSpan={1}>Total Hostel Dues:  </TableCell>
//             <TableCell colSpan={2}style={{ fontWeight: 'bold', fontSize: 16}}>{hostelDue}</TableCell>
//         </TableRow>
//         <TableRow style={{borderTop: "9%"}}>
//             <TableCell  style={{ fontWeight: 'bold',textAlign:'left', fontSize: 16}} colSpan={1}>Total School Excess:  </TableCell>
//             <TableCell colSpan={2}style={{ fontWeight: 'bold', fontSize: 16}}>{schoolExcess}</TableCell>
//         </TableRow>
//         <TableRow style={{borderTop: "9%"}}>
//             <TableCell  style={{ fontWeight: 'bold',textAlign:'left', fontSize: 16}} colSpan={1}>Total Hostel Excess:  </TableCell>
//             <TableCell colSpan={2}style={{ fontWeight: 'bold', fontSize: 16}}>{hostelExcess}</TableCell>
//         </TableRow>
//       </TableFooter>

//                   </Table>
//                 {/* <button className="btn btn-warning" onClick="printTable()" >Print</button> */}

  
// </div>

// </Paper >        
//          </div>      


//   {/* ****************print view************************* */}
//         <div style={{ width: '210mm', height: '297mm', margin: 'auto' }}>
//   <section className='text-end p-4'>
//   {/* <button onClick={() => printDiv('receipt-details')} style={{ backgroundColor: '#0C83DC', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Print</button> */}
           

           
//             </section> 
       

   
// </div>

//  {/***********************  end of print view **************************/}
//           </div>
//       </div>
//   </div>
  
     
    
//   )
// }
// function printDiv(divId) {
//   var content = document.getElementById(divId);
//   var printWindow = window.open('', '_blank');
  
//   // Open a new window and write the content
//   printWindow.document.write('<html><head><title>Receipt Details</title></head><body>');
//   printWindow.document.write('<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">');
  
//   // Write the content of the specified div
//   printWindow.document.write('<div style="text-align: center;">');
//   printWindow.document.write('<Table id="ThirdStandardFeeTable3" style="border-collapse: collapse; padding: 18px;margin-left: 28px; border: none; background-color: #ffff; border-radius: 8px; width: 100%;">');
//   // Add table content here
//   printWindow.document.write('</Table>');
//   printWindow.document.write('</div>');
//   printWindow.document.write('</div>');
  
//   // Close the HTML document
//   printWindow.document.write('</body></html>');
//   printWindow.document.close();
  
//   // Print the content
//   printWindow.print();
  
// }


// export default LedgerSummaryForm



























// // import React, { useRef, useState, useEffect } from "react";
// // import Sidebar from '../Sidebar';
// // import Header from '../Header';
// // import Footer from '../Footer';
// // import Paper from '@mui/material/Paper'; 
// // import { TbWorldUpload } from 'react-icons/tb'
// // import { IoSearchOutline } from "react-icons/io5";

// // import Swal from 'sweetalert2';
// // import axios from "axios";
// // import Row from 'react-bootstrap/Row';
// // import Col from 'react-bootstrap/Col';
// // import FormControl from '@mui/material/FormControl';
// // import FormLabel from '@mui/material/FormLabel';
// // import Form from 'react-bootstrap/Form';
// // import Select from 'react-select';
 

// // import SvsInvoice from '../Svs-invoice.jpg';
// // import ReactToPrint from 'react-to-print';
// // import { Button, Table, TableHead, TableRow, TableCell, TableBody, Typography ,TableFooter } from '@mui/material';
// // import { Print } from '@mui/icons-material';
// // import ReactDOM from 'react-dom';
// // import $ from 'jquery'; 
// // import 'jquery/dist/jquery.min.js';
// // import "datatables.net/js/jquery.dataTables"
// // import "datatables.net-dt/css/jquery.dataTables.min.css"
// // import "datatables.net-buttons/js/dataTables.buttons.js"
// // import "datatables.net-buttons/js/buttons.colVis.js"
// // import "datatables.net-buttons/js/buttons.flash.js"
// // import "datatables.net-buttons/js/buttons.html5.js"
// // import "datatables.net-buttons/js/buttons.print.js"
// // import "datatables.net-dt/css/jquery.dataTables.min.css"
// // const LedgerSummaryForm = () => {
// //   const componentRef = useRef();

// //   const [newInvoiceClass, setNewInvoiceClass] = useState('');

// //   const [options, setOptions] = useState([]);
// //   const [selectedOptionsStudent, setSelectedOptionsStudent] = useState([]);
// //   const [selectedOptionsSponsor, setSelectedOptionsSponsor] = useState([]);
// //   const [selectedOptionsReciepts, setSelectedOptionsReciepts] = useState([]);
// //   const [selectedOptionsAdmission, setSelectedOptionsAdmission] = useState([]);
// //   const [selectedOptionsReciptInvoice, setSelectedOptionsReciptInvoice] = useState([]);
// //   const [fromDate, setFromDate] = useState(null);
// //   const [toDate, setToDate] = useState(null);
  

// //   const [optionsreciepts, setOptionsReciepts] = useState([]);
// //   const [optionsSponsor, setOptionsSponsor] = useState([]);
// //   const [optionsAdmission, setOptionsAdmission] = useState([]);
// //   const [responseData, setresponseData] = useState([]);  
// //   const [resultArray, setresultArray] = useState([]);  
// //    // const getStudents = async () => {  
// //   //   if (newInvoiceClass ) {
// //   //      console.log(newInvoiceClass);
// //   //      try {
// //   //       const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/studentByGrades/${newInvoiceClass}`, {
// //   //         method: 'POST',
// //   //         headers: {
// //   //           'Content-Type': 'application/json',
// //   //         } 
// //   //       });
// //   //       const data = await response.json();
// //   //        if (data) {
// //   //          const options = data.map(item => ({
// //   //            value: item.id,
// //   //            label: item.concordinate_string
// //   //          }));
// //   //          console.log(options);
// //   //          setOptions(options);
// //   //        }
// //   //     } catch (error) {
// //   //       console.log(error);
// //   //     }
// //   //   }
// //   //   }
 
// //   useEffect(() => {
// //     const fetchSponsorData = async () => {
// //       try {
// //         const response = await fetch('https://santhoshavidhyalaya.com/SVSTEST/api/sponsor/select', {
// //           method: 'GET',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           }
// //         });
// //         const data = await response.json();
// //         console.log('Sponsor', data);

// //         if (data) {
// //           const options = [
// //               { value: '', label: '-Select Sponsor-' }, // Add empty value as the first option
// //               ...data.sponsorOptions.map(item => ({
// //                   value: item.id,
// //                   label: item.name
// //               }))
// //           ];
// //           setOptionsSponsor(options);
// //       }
      
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };

// //     fetchSponsorData();
// //   }, []);
// // // Function to flatten nested objects
// // const flattenObject = (obj, parentKey = '') => {
// //   let flattened = {};
// //   for (let key in obj) {
// //     if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
// //       const nested = flattenObject(obj[key], `${parentKey}${key}_`);
// //       flattened = { ...flattened, ...nested };
// //     } else {
// //       flattened[`${parentKey}${key}`] = obj[key];
// //     }
// //   }
// //   return flattened;
// // };

// //  const handleFilter = async () => {
// //   setresponseData([]);
// //    setresultArray([]);
  
// //   console.log(fromDate, toDate, newInvoiceClass,selectedOptionsReciptInvoice,selectedOptionsSponsor.value);
// //   try {
// //     const response = await axios.post(
// //       "https://santhoshavidhyalaya.com/SVSTEST/api/LedgerSummary",
// //       {
// //         FromDate: fromDate,
// //         ToDate: toDate,
// //         Std: newInvoiceClass,
// //         SponsorID: selectedOptionsSponsor.value,
// //         // ReceiptorInvoice:selectedOptionsReciptInvoice
         
// //       }
// //     );
// //     const responseData = response.data;
// //     console.log(responseData);
// //     setresponseData(responseData);
// //     const flattenedArray = Object.entries(flattenObject(responseData)).map(([key, value]) => ({ key, value }));

// //     // Check if 'totals' and 'invoice' properties exist in responseData
// //     if (responseData && responseData.totals && responseData.totals.invoice) {
// //       const hostelBillFeeNames = Object.keys(responseData.totals.invoice['Hostel Bill'] || {});
// //       const schoolFeesNames = Object.keys(responseData.totals.invoice['School Fees'] || {});
  
// //       const resultArray = [];
  
// //       // Add 'Hostel Bill' as heading with empty values
// //       resultArray.push({ 'Fee Name': '<b><u>Hostel Bill</u></b>', 'Invoice Amount': '-', 'Receipt Amount': '-' });
  
// //       // Iterate over fee names for 'Hostel Bill'
// //       hostelBillFeeNames.forEach(feeName => {
// //           const invoiceAmount = responseData.totals.invoice['Hostel Bill'][feeName] || '-';
// //           const receiptAmount = responseData.totals.recpt['Hostel Bill'][feeName] || '-';
// //           resultArray.push({ 'Fee Name': feeName, 'Invoice Amount': invoiceAmount, 'Receipt Amount': receiptAmount });
// //       });
  
// //       // Add 'School Fees' as heading with empty values
// //       resultArray.push({ 'Fee Name': '<b><u>School Fees</u></b>', 'Invoice Amount': '-', 'Receipt Amount': '-' });
  
// //       // Iterate over fee names for 'School Fees'
// //       schoolFeesNames.forEach(feeName => {
// //           const invoiceAmount = responseData.totals.invoice['School Fees'][feeName] || '-';
// //           const receiptAmount = responseData.totals.recpt['School Fees'][feeName] || '-';
// //           resultArray.push({ 'Fee Name': feeName, 'Invoice Amount': invoiceAmount, 'Receipt Amount': receiptAmount });
// //       });
  
// //       console.log('resultArray', resultArray);
// //       setresultArray(resultArray);
// //   }
// //   else {
// //       console.log('totals or invoice properties not found in responseData');
// //       Swal.fire({
// //         icon: "warning",
// //         title: "No Invoice/Receipt Found",
// //         text:  "Please try again with different date.",
// //       });
// //     }
    
    
// //   } catch (error) {
// //     console.error(error);
// //     Swal.fire({
// //       icon: "warning",
// //       title: "No Invoice/Receipt Found",
// //       text:  "Please try again with different date.",
// //     });
// //   }
// //   }
// //   const handleSelectChangeSponsor = (selectedOptions) => {
// //     setSelectedOptionsSponsor(selectedOptions);
// //   };
// //   const handleSelectChangeStudent = (selectedOptions) => {
// //     setSelectedOptionsStudent(selectedOptions);
// //   };
// //   // const handleSelectChangeReciepts = (selectedOptions) => {
// //   //   setSelectedOptionsReciepts(selectedOptions);
// //   // };
// //   const handleSelectChangeAdmission = (selectedOptions) => {
// //     setSelectedOptionsAdmission(selectedOptions);
// //   };
// //   // useEffect(() => {
// //   //   $(document).ready(() => {
// //   //     $('#ThirdStandardFeeTable3').DataTable(); // Initialize DataTables on the table element
// //   //   });
// //   // })
// //   //
// //   // useEffect(() => {

// //   //   $(document).ready(function () {
// //   //     var table = $('#ThirdStandardFeeTable3').DataTable({
// //   //       destroy: true,
// //   //       processing: true,
// //   //       serverSide: true,
// //   //       ajax: {
// //   //         url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/studentsMaps/12',
// //   //         type: 'POST',
// //   //       },
// //   //       dom: 'lfBrtip',
// //   //       buttons: [
// //   //         {
// //   //           extend: 'copy',
// //   //           className: 'btn btn-success',
// //   //         },
// //   //         {
// //   //           extend: 'csv',
// //   //           className: 'btn btn-danger',
// //   //         },
// //   //         // {
// //   //         //   extend: 'print',
// //   //         //   className: 'btn btn-warning',
// //   //         // },
     

// //   //       ],
// //   //       columns: [
// //   //         { data: 'slno', title: 'Serial-Number', className: 'text-dark' },
// //   //         { data: 'roll_no', title: 'Roll-Number', className: 'Fees Type' },
// //   //         // { data: 'acad_year', title: 'Academic Year', className: 'text-dark' },
// //   //         { data: 'amount', className: 'text-dark' },
// //   //         { data: 'amount', className: 'text-dark' },
// //   //         // { data: 'amount', title: 'Amount 3', className: 'text-dark' },
// //   //         // { data: 'amount', title: 'Amount 4', className: 'text-dark' }
// //   //       ],
        
    
// //   //     });
// //   //   });
// //   // }, []);

// //   const totalInvoiceAmount = resultArray.reduce((acc, row) => {
// //     const invoiceAmount = parseFloat(row['Invoice Amount']);
// //     return isNaN(invoiceAmount) ? acc : acc + invoiceAmount;
// //   }, 0);
  
// //   // Calculate total receipt amount
// //   const totalReceiptAmount = resultArray.reduce((acc, row) => {
// //     const receiptAmount = parseFloat(row['Receipt Amount']);
// //     return isNaN(receiptAmount) ? acc : acc + receiptAmount;
// //   }, 0);
// //   return (
    
// //     <div className="pt-4">
   
// //      <Row>
// //   {/* <div className="pt-5 d-flex" style={{ margin: "auto", width: "100%", border: "5px solid #dfdfdf", padding: "52px", backgroundColor: "#e6e6e6" }}>
  
// //   </div> */}
// //           <div style={{ display: "flex", height:"7vh" }} >
// //           <Typography className="ps-1 pe-1 pt-2">Select Class<span style={{ color: 'red' }}>*</span>:</Typography>
// //           <div className="pt-1" style={{ width: '20%' }}><Form.Select name='standard' value={newInvoiceClass} onChange={(e) => setNewInvoiceClass(e.target.value)}
// //             // onClick={getStudents}
// //           >
// //                             <option>Select Class</option>
// //                             <option value="lkg">LKG</option>
// //                             <option value="ukg">UKG</option>
// //                             <option value="1">I</option>
// //                             <option value="2">II</option>
// //                             <option value="3">III</option>
// //                             <option value="4">IV</option>
// //                             <option value="5">V</option>
// //                             <option value="6">VI</option>
// //                             <option value="7">VII</option>
// //                             <option value="8">VIII</option>
// //                             <option value="9">IX</option>
// //                             <option value="10">X</option>
// //                             <option value="11">XI</option>
// //                             <option value="12">XII</option>
// //             </Form.Select></div>  
// //             {/* <Typography className="ps-2 pe-2 pt-2">Receipt/Invoice<span style={{ color: 'red' }}>*</span> :</Typography>
// //             <div className="pt-1" style={{ width: '8%' }}><Form.Select name='RecInv'
// //             value={selectedOptionsReciptInvoice} onChange={(e) => setSelectedOptionsReciptInvoice(e.target.value)}
// //             menuPortalTarget={document.body} // Render the menu outside of its parent container

// //             >
// //                             <option>Select </option>
// //                             <option  value="receipt"selected>Receipt</option>
// //                             <option value="invoice">Invoice</option>
// //                         </Form.Select></div> */}
// //     <Typography className="pe-0 pt-2 px-1">From Date<span style={{ color: 'red' }}>*</span>:</Typography>
// // <input type="date" style={{ height: '40px' }} onChange={(e) => setFromDate(e.target.value)} />
// //     <Typography className="ps-0 pe-0 pt-2 pr-1">To Date<span style={{ color: 'red' }}>*</span>:</Typography>
// //     <input type="date" style={{ height: '40px' }} onChange={(e) => setToDate(e.target.value)} />
// //   </div>
// // {/*  
// //       <Col>
// //       <div style={{ display: "flex", height:"8vh" }}className="pt-0 ,px-3"
// //  style={{ display: "flex" }}>
// //           <Typography className="pt-1 px-2">Select Student<span style={{ color: 'red' }}>*</span>: </Typography>
// //           <div className="pt-0 ,px-1" style={{width:'700px'}}>

// //         <Select
// //               // isMulti
// //         options={options}
// //         value={selectedOptionsStudent}
// //                 onChange={handleSelectChangeStudent}
// //                 menuPortalTarget={document.body} // Render the menu outside of its parent container
// //         styles={{
// //           control: (provided) => ({
// //             ...provided,
// //             maxHeight:'800px',
// //             overflowY: 'auto'  ,           // Adjust width as needed
// //             menu: (provided) => ({
// //               ...provided,
// //               height: '50px', //
// //               position: 'absolute', // Set position to fixed
// //               zIndex: 9999, // Set a high zIndex to overlay other elements
// //             }),
// //           }),
// //          }}
// //               />
// //               </div>
// //         </div>
// //       </Col> */}
// //     </Row>
// //       <Row>
// //       <Col>
// //       <div className="pt-0 ,px-3"
// //          style={{ display: "flex" }}>
// //           <Typography className="pt-3 px-2"><u>Select Sponsor<span style={{ color: 'red' }}>*</span>: </u></Typography>
// //           <div className="pt-2 ,px-5" style={{width:'700px'}}>

// //         <Select
// //               // isMulti
// //         options={optionsSponsor}
// //         value={selectedOptionsSponsor}
// //                 onChange={handleSelectChangeSponsor}
// //                 menuPortalTarget={document.body} // Render the menu outside of its parent container
// //         styles={{
// //           control: (provided) => ({
// //             ...provided,
// //             maxHeight:'800px',
// //             overflowY: 'auto'  ,           // Adjust width as needed
// //             menu: (provided) => ({
// //               ...provided,
// //               height: '50px', //
// //               position: 'absolute', // Set position to fixed
// //               zIndex: 9999, // Set a high zIndex to overlay other elements
// //             }),
// //           }),
// //          }}
// //               />
// //             </div>
             

// //           </div>
       
// //       </Col>

// //       </Row>
// //       {/* <Row>
// //       <Col>
// //       <div className="pt-0 ,px-3"
// //          style={{ display: "flex" }}>
// //           <Typography className="pt-3 px-2">Select Admission No: </Typography>
// //           <div className="pt-2 ,px-5" style={{width:'300px'}}>

// //         <Select
// //               // isMulti
// //         options={optionsAdmission}
// //         value={selectedOptionsAdmission}
// //         onChange={handleSelectChangeAdmission}
// //         menuPortalTarget={document.body} // Render the menu outside of its parent container

// //         styles={{
// //           control: (provided) => ({
// //             ...provided,
// //             maxHeight:'800px',
// //             overflowY: 'auto'  ,           // Adjust width as needed
// //             menu: (provided) => ({
// //               ...provided,
// //               position: 'absolute', // Position the menu absolutely
// //               top: 'initial', // Remove the top position to make it dynamic
// //               bottom: '100%', // Position the menu above the component
// //               zIndex: 9999, // Set a high zIndex to overlay other elements
// //             }),
// //           }),
// //          }}
// //               />
// //             </div>
             

// //           </div>
       
// //       </Col>

// //     </Row> */}
// //     <Row>
// //       <div className="ps-4 px-4 py-1">
// //         <button className="btn btn-warning" type="submit" onClick={handleFilter}>
// //           <h6 className="mb-0 text-danger" onClick={handleFilter}><IoSearchOutline size={25} /> Filter</h6>
// //          </button>
// //       </div>
// //       </Row>
// //       <div>
// //         <div>
// //         <div className="container">
// //         <hr className='mb-1'/>
// // {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
// //             <Paper sx={{ margin: '20px', padding: '50px' }}>   
// //             <div  ref={componentRef} className="container" sx={{ backgroundColor: 'white'}} >
// //             <div className="print-wrapper" style={{style : 'block'}}>
// //   <div className='print-content'>
// //                 <div className='d-flex'>
// //     <Row>
// //       <Col xs={9} className='pt-4'>
// //         <Typography style={{
// //           backgroundColor: '#0C83DC',
// //           width: '40%',
// //           borderRadius: '0 6px 6px 0px',
// //           textAlign: 'center',
// //           padding: '8px 0',
// //           textTransform: 'uppercase',
// //           color: 'aliceblue',
// //         }}>Ledger Summary</Typography>
// //                           <div className='pt-3 px-3'>
                         
// //           <h3 style={{fontFamily:'sans-serif'}}>Santhosha Vidhyalaya</h3>
// //           <h6 style={{fontFamily:'sans-serif'}}>Dohnavur Fellowship, </h6>
// //           <h6 style={{fontFamily:'sans-serif'}}>Dohnavur – 627102, </h6>
// //           <h6 style={{fontFamily:'sans-serif'}}>Tirunelveli District, Tamil Nadu</h6>
// //           <h6 style={{fontFamily:'sans-serif'}}>Mobile – +91 80125 12145, </h6>
// //           <h6 style={{fontFamily:'sans-serif'}}>Email – finance@santhoshavidhayalaya.com </h6>
// //         </div>
// //       </Col>
// //       <Col xs={3} className='text-center pt-3'>
// //         <img style={{width:'60%'}} src={SvsInvoice} />
// //       </Col>
// //     </Row>
// //   </div>
// //   <div className='pt-3 px-3'>
// //     <Row>
// //     <Col xs={4}>
// //   <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Total Discount:</Typography>
// //   <Typography variant="body2">{responseData.discountTotal ? `${responseData.discountTotal}` : 'null'}</Typography>
// // </Col>
// // <Col xs={4}>
// //   <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Sponsor Name:</Typography>
// //   <Typography variant="body2">{selectedOptionsSponsor.value ? `${selectedOptionsSponsor.label}` : 'null'}</Typography>
// // </Col>

// //       {/* <Col xs={4}>
// //         <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Student Name:</Typography>
// //         <Typography variant="body2">Your Student Name</Typography>
// //       </Col>
// //       <Col xs={4}>
// //         <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Admission No:</Typography>
// //         <Typography variant="body2">Your Admission No</Typography>
// //       </Col> */}
// //                   </Row>
// //                   <div style={{ height: '20px' }} />
// // <div style={{ height: '20px' }} />
  

// //                   </div>
// //                   </div>
// //                   </div>

// //   {/* <table id="ThirdStandardFeeTable3" className="display">
// //     <thead>
// //       <tr>
// //         <th>S.No</th>
// //         <th>Roll No</th>
// //         <th>Academic Year</th>
// //         <th>Fee Category</th>
// //         <th>Sub Category</th>
// //         <th>₹ Total Amount</th>
// //         <th>Date</th>
        
// //       </tr>
// //     </thead>
// //                 </table> */}
// //                 <div style={{ padding: '10px' }}> <ReactToPrint 
// //     trigger={() => <Button 
// //       startIcon={<Print style={{ fontSize: 30, color: 'textPrimary' }} />} 
// //       variant="contained" 
// //       color="primary" 
// //       className="printcustom" 
// //       style={{ padding: '10px' }}
// //     >
// //     </Button>
// //     }
// //     content={() => {
// //         const component = componentRef.current;
// //         $(component)
// //         .find("table")
// //         .addClass("compact")
// //         .css({
// //           'font-size': 'inherit',
// //           'font-color':'red',
// //           'color':'red',
// //           'table-layout': 'fixed',
// //           'width': '100%', // Ensure the table fills its container
// //           'border-collapse': 'collapse',
// //           'margin': '0', // Remove any margins
// //           'padding': '0', // Remove any padding
// //           'overflow': 'auto' // Allow horizontal scrolling if necessary
// //       });
// //         return component;
// //     }}
// // /></div> 
// // <Table id="ThirdStandardFeeTable3" style={{ borderCollapse: 'collapse', padding: '18px', paddingLeft: '18px', border: 'none', backgroundColor: '#ffff', borderRadius: '8px', width: '100%', margin: 'auto' }}>
// //       <TableHead style={{backgroundColor:"#E6E6E6"}}>
// //         <TableRow>
// //           {/* <TableCell style={{ fontWeight: 'bold'}}>S.No</TableCell> */}
// //           <TableCell style={{ fontWeight: 'bold'}}>Fees Type</TableCell>
// //           <TableCell style={{ fontWeight: 'bold'}}>Total Invoice Amount</TableCell>
// //           <TableCell style={{ fontWeight: 'bold'}}>Total Receipt Amount</TableCell>
// //         </TableRow>
// //       </TableHead>
// //       <TableBody>
// //    {/* Sample data rows */}
// //   {resultArray && resultArray.map((row, index) => (
// //     <TableRow key={index}>
// // <TableCell dangerouslySetInnerHTML={{ __html: row['Fee Name'] }}></TableCell>
// //      <TableCell >{row['Invoice Amount']}</TableCell>
// //      <TableCell >{row['Receipt Amount']}</TableCell>
// //     </TableRow>
// //   ))}
// // </TableBody>

// // <TableFooter style={{backgroundColor:"#E6E6E6"}}>
// //         <TableRow>
// //           <TableCell style={{ fontWeight: 'bold' ,fontSize: 16}}>Total:</TableCell>
// //           <TableCell style={{ fontWeight: 'bold' ,fontSize: 16}}>{totalInvoiceAmount}</TableCell>
// //           <TableCell style={{ fontWeight: 'bold', fontSize: 16}}>{totalReceiptAmount}</TableCell>
// //         </TableRow>
// //                     <TableRow style={{borderTop: "9%"}}>
// //           <TableCell  style={{ fontWeight: 'bold',textAlign:'left', fontSize: 16}} colSpan={1}>Total Balance:  </TableCell>
// //           <TableCell colSpan={2}style={{ fontWeight: 'bold', fontSize: 16}}>{totalInvoiceAmount -totalReceiptAmount}</TableCell>
// //           {/* <TableCell style={{ fontWeight: 'bold' ,fontSize: 16}}>{totalInvoiceAmount}</TableCell> */}
// //           {/* <TableCell style={{ fontWeight: 'bold', fontSize: 16}}>{totalReceiptAmount}</TableCell> */}
// //         </TableRow>
// //       </TableFooter>

// //                   </Table>
// //                 {/* <button className="btn btn-warning" onClick="printTable()" >Print</button> */}

  
// // </div>

// // </Paper >        
// //          </div>      


// //   {/* ****************print view************************* */}
// //         <div style={{ width: '210mm', height: '297mm', margin: 'auto' }}>
// //   <section className='text-end p-4'>
// //   {/* <button onClick={() => printDiv('receipt-details')} style={{ backgroundColor: '#0C83DC', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Print</button> */}
           

           
// //             </section> 
       

   
// // </div>

// //  {/***********************  end of print view **************************/}
// //           </div>
// //       </div>
// //   </div>
  
     
    
// //   )
// // }
// // function printDiv(divId) {
// //   var content = document.getElementById(divId);
// //   var printWindow = window.open('', '_blank');
  
// //   // Open a new window and write the content
// //   printWindow.document.write('<html><head><title>Receipt Details</title></head><body>');
// //   printWindow.document.write('<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">');
  
// //   // Write the content of the specified div
// //   printWindow.document.write('<div style="text-align: center;">');
// //   printWindow.document.write('<Table id="ThirdStandardFeeTable3" style="border-collapse: collapse; padding: 18px;margin-left: 28px; border: none; background-color: #ffff; border-radius: 8px; width: 100%;">');
// //   // Add table content here
// //   printWindow.document.write('</Table>');
// //   printWindow.document.write('</div>');
// //   printWindow.document.write('</div>');
  
// //   // Close the HTML document
// //   printWindow.document.write('</body></html>');
// //   printWindow.document.close();
  
// //   // Print the content
// //   printWindow.print();
  
// // }


// // export default LedgerSummaryForm
