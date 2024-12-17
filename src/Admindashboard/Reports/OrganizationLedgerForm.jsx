import React, { useRef, useState, useEffect } from "react";
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import { TbWorldUpload } from 'react-icons/tb'
import { IoSearchOutline ,IoCloseSharp} from "react-icons/io5";

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

const OrganizationLedgerForm = () => {
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
const [Studentinfo, setStudentinfo] = useState([]);
 

  const [optionsreciepts, setOptionsReciepts] = useState([]);
const [optionsSponsor, setOptionsSponsor] = useState([]);
const [optionsAdmission, setOptionsAdmission] = useState([]);

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

const Sponsor = async () => {
  try {
    // https://santhoshavidhyalaya.com/SVSTEST/api/invoiceSearch?invoice_no=SVS22JAN244071
      const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/sponsor/select`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        } 
      });
    const data = await response.json();
    console.log('Sponsor',data);

       if (data) {
         const options = data.sponsorOptions.map(item => ({
           value: item.id,
           label: item.name
         }));
         setOptionsSponsor(options);
       }
    } catch (error) {
      console.log(error);
    } 
    }
    // const Admission = async () => {
    //   try {
    //     // https://santhoshavidhyalaya.com/SVSTEST/api/invoiceSearch?invoice_no=SVS22JAN244071
    //       const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/admissionSearch`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         } 
    //       });
    //       const data = await response.json();
    //        if (data) {
    //          const options = data.map(item => ({
    //            value: item.id,
    //            label: item.admission_no 
    //          }));
    //          console.log(options);
    //          setOptionsAdmission(options);
    //        }
    //     } catch (error) {
    //       console.log(error);
    //     } 
    //   }
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
    Sponsor();
    // Admission();
  }, []); // Empty dependency array to ensure it runs only once when the component mounts
  const handleClear = () => {
    setSelectedOptionsReciptInvoice([]); setSelectedOptionsSponsor([]); setFromDate(null); setToDate(null);
  }
  const handleFilter = async () => {
    console.log(fromDate, toDate, selectedOptionsReciptInvoice, selectedOptionsSponsor.value);
    try {
      const response = await axios.post(
        "https://santhoshavidhyalaya.com/SVSTEST/api/StudentLedger",
        {
          ReceiptorInvoice: selectedOptionsReciptInvoice,
          FromDate: fromDate,
          ToDate: toDate,
          SponsorID: selectedOptionsSponsor.value
        }
      );
  
      // Extracting the data from the response
      const responseData = response.data;
      if (responseData.data.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "No Data Found",
          text: "No data was found for the given criteria.",
        });
        return;
      }
      console.log(responseData);
      const modifiedResponse = [];
      
      responseData.data.forEach(dataItem => {
        if (dataItem.invoice && dataItem.invoice.slno) {
          modifiedResponse.push({
            no: dataItem.invoice.slno,
            invoice_no: '<span style="font-size:13px; color: #666;"><strong>' + dataItem.invoice.invoice_no + '</strong></span>',
            date: dataItem.invoice.date,
            Iamount: dataItem.invoice.amount,
            Ramount: "-",
            invoice_pending_amount: dataItem.invoice.invoice_pending_amount,
            payment_status: dataItem.invoice.payment_status,
            desc: '<span style="font-size:14px; color: #666;">Invoice</span>',
            name: '<span style="font-size:12px; color: #666; text-decoration: underline; word-wrap: break-word;">' + dataItem.invoice.name + " | " + dataItem.invoice.standard + '</span>',

          });
        }
        dataItem.receipts.forEach(receiptItem => {
          const dateObj = new Date(receiptItem.created_at);
          const day = dateObj.getDate();
          const month = dateObj.getMonth() + 1;
          const year = dateObj.getFullYear();
          const formattedDay = day < 10 ? '0' + day : day;
          const formattedMonth = month < 10 ? '0' + month : month;
          const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
          
          modifiedResponse.push({
            no: receiptItem.invoice_id,
            invoice_no: '<span  style="font-size:12px; color: #666;"><strong><u>' + receiptItem.transactionId+ '</u></strong></span>',
            date: formattedDate,
            Iamount: "-",
            Ramount: receiptItem.amount,
            invoice_pending_amount: "",
            payment_status: "",
            desc: '<span style="font-size:14px; color: #666;">Receipt</span>',
            name:""
          });
        });
      });
      
      console.log(modifiedResponse);
      setStudentinfo(responseData.data[0].receipts[0].sponsor_info);
      initializeDataTable(modifiedResponse);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: "Failed to process request. Please try again later.",
      });
    }
  }
  

function initializeDataTable(data) {

var table = $('#ThirdStandardFeeTable3').DataTable({
    destroy: true,
    processing: true,
  serverSide: false,
  pageLength: 100,
    dom: 'lfBrtip',
    buttons: [
        {
            extend: 'copy',
            className: 'btn btn-success',
        },
        {
            extend: 'csv',
            className: 'btn btn-danger',
        },
  ],
  data: data,
  columns: [
    { data: 'no', title: 'No.', className: 'text-dark' ,style:"width=3%"},
    { data: 'date', title: 'Date of<br>Invoice/<br>Receipt', className: 'text-dark' ,style:"width=3%"},
    { data: 'invoice_no', title: 'Invoice/<br>Receipt No', className: 'text-dark',    style: "font-weight: bold; font-size: 8px;" 
  },
    { data: 'desc', title: 'Invoice/<br>Receipt', className: 'text-dark' , style: "font-weight: bold; font-size: 8px;"  },
    { data: 'Iamount', title: 'Invoice<br>Amount', className: 'text-dark' },
    { data: 'Ramount', title: 'Receipt<br>Amount', className: 'text-dark' },
    { data: 'invoice_pending_amount', title: 'Dues', className: 'text-dark' },
    { 
      data: 'name', 
      title: 'Name|<br>Standard', 
      className: 'text-dark', 
      style: "white-space: normal; word-wrap: break-word;" 
  }
      
      ],
  order: [[0, 'desc']],
  initComplete: function () {
    var api = this.api();

    // Sum the values for 'Iamount' and 'Ramount' columns
       // Sum the values for 'Iamount' and 'Ramount' columns
       var iAmountTotal = api.column(4).data().reduce(function (acc, val) {
        return val !== '-' ? acc + parseFloat(val) : acc; // Skip values that are '-'
    }, 0);

    var rAmountTotal = api.column(5).data().reduce(function (acc, val) {
        return val !== '-' ? acc + parseFloat(val) : acc; // Skip values that are '-'
    }, 0);
    var dAmountTotal = api.column(6).data().reduce(function (acc, val) {
      if (val !== '') {
          // Parse the value as float, considering decimal values
          var parsedVal = parseFloat(val);
          return acc + (isNaN(parsedVal) ? 0 : parsedVal); // Add parsed value to accumulator if it's a valid number, otherwise add 0
      } else {
          return acc; // Skip empty values
      }
  }, 0);
  



    // Add totals to footer
    $(this.api().column(4).footer()).html('<span  style="font-size: 10px;  font-weight: 800;">Total Invoice:</span> <br><span  style="font-size: 15px; font-family: revert-layer; font-weight: 600; "> ' + iAmountTotal + '</span>');
    $(this.api().column(5).footer()).html('<span  style="font-size: 10px;font-weight: 800;">Total Receipt:</span> <br><span  style="font-size: 15px; font-family: revert-layer; font-weight: 600;"> ' + rAmountTotal + '</span>');
    $(this.api().column(6).footer()).html('<span  style="font-size: 10px;font-weight: 800;">Total Due:</span> <br><span  style="font-size: 15px; font-family: revert-layer; font-weight: 600;"> ' + dAmountTotal + '</span>');
}

     });
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







  // $(document).ready(function () {
  //   var table = $('#ThirdStandardFeeTable3').DataTable({
  //     destroy: true,
  //     processing: true,
  //     serverSide: true,
  //     ajax: {
  //       url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/studentsMaps/3',
  //       type: 'POST',
  //     },
  //     dom: 'lfBrtip',
  //     buttons: [
  //       {
  //         extend: 'copy',
  //         className: 'btn btn-success',
  //       },
  //       {
  //         extend: 'csv',
  //         className: 'btn btn-danger',
  //       },
  //       // {
  //       //   extend: 'print',
  //       //   className: 'btn btn-warning',
  //       // },   

  //     ],
  //     columns: [
  //       { data: 'slno', title: 'S.No', className: 'text-dark' },
  //       { data: 'roll_no', title: 'Date of<br>Invoice/Receipt', className: 'text-dark' },
  //       { data: 'roll_no', title: 'Invoice/<br>Receipt No', className: 'text-dark' },
  //       { data: 'amount', title: 'Invoice<br>Amount', className: 'text-dark' },
  //       { data: 'amount', title: 'Receipt<br>Amount', className: 'text-dark' },
  //       { data: 'amount', title: 'Dues', className: 'text-dark' },
  //       { data: 'amount', title: 'Excess', className: 'text-dark' }
  //     ],
  //     footerCallback: function (row, data, start, end, display) {
  //       var api = this.api();
    
  //       // Convert to array
  //       var intVal = function (i) {
  //         return typeof i === 'string' ?
  //           i.replace(/[\$,]/g, '') * 1 :
  //           typeof i === 'number' ?
  //           i : 0;
  //       };
    
  //       // Total over all pages
  //       var total1 = api
  //         .column(3, { search: 'applied' })
  //         .data()
  //         .reduce(function (a, b) {
  //           return intVal(a) + intVal(b);
  //         }, 0);
    
  //       var total2 = api
  //         .column(4, { search: 'applied' })
  //         .data()
  //         .reduce(function (a, b) {
  //           return intVal(a) + intVal(b);
  //         }, 0);
    
  //       var total3 = api
  //         .column(5, { search: 'applied' })
  //         .data()
  //         .reduce(function (a, b) {
  //           return intVal(a) + intVal(b);
  //         }, 0);
    
  //       // var total4 = api
  //       //   .column(6, { search: 'applied' })
  //       //   .data()
  //       //   .reduce(function (a, b) {
  //       //     return intVal(a) + intVal(b);
  //       //   }, 0);
    
  //      // Update footer
  //      $(api.column(3).footer()).html(total1.toFixed(2));
  //      $(api.column(4).footer()).html(total2.toFixed(2));
  //      $(api.column(5).footer()).html(total3.toFixed(2));
  //     //  $(api.column(6).footer()).html(total4.toFixed(2));
  
  //       // Append new row for sums
  //       var footerRow = $(table.table().footer()).find('tr');
  //       if (!footerRow.length) {
  //         footerRow = $('<tr>').appendTo($(table.table().footer()));
  //       }
  //       footerRow.empty();
  //       $('<th>').appendTo(footerRow).text('Sum:');
  //       $('<th>').appendTo(footerRow); // Leave blank for Roll Number
  //       $('<th>').appendTo(footerRow); // Leave blank for Academic Year
  //       $('<th>').appendTo(footerRow).text(total1.toFixed(2));
  //       $('<th>').appendTo(footerRow).text(total2.toFixed(2));
  //       $('<th>').appendTo(footerRow).text(total3.toFixed(2));
  //       // $('<th>').appendTo(footerRow).text(total4.toFixed(2));
  //     }
  //   });
  // });
  //  
  return (
    
    <div className="pt-4">
   
     <Row>
  {/* <div className="pt-5 d-flex" style={{ margin: "auto", width: "100%", border: "5px solid #dfdfdf", padding: "52px", backgroundColor: "#e6e6e6" }}>
  
  </div> */}
          <div style={{ display: "flex", height:"7vh" }} >
          {/* <Typography className="ps-1 pe-1 pt-2">Select Class<span style={{ color: 'red' }}>*</span>:</Typography> */}
          {/* <div className="pt-1" style={{width:'20%'}}><Form.Select  name='standard'  value={newInvoiceClass}  onChange={(e) => setNewInvoiceClass(e.target.value)} onClick={getStudents} >
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
            </Form.Select></div> */}
            {/* <Typography className="ps-2 pe-2 pt-2">Receipt/Invoice<span style={{ color: 'red' }}>*</span> :</Typography> */}
            {/* <div className="pt-1" style={{ width: '8%' }}><Form.Select name='RecInv'
            value={selectedOptionsReciptInvoice} onChange={(e) => setSelectedOptionsReciptInvoice(e.target.value)}
            menuPortalTarget={document.body} // Render the menu outside of its parent container

            >
                            <option >Select </option>
                            <option  value="receipt">Receipt</option> */}
                            {/* <option value="invoice">Invoice</option> */}
                        {/* </Form.Select></div> */}
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
          <button className="btn btn-danger pl-4"  onClick={handleClear}>
          <h6 className="mb-0 text-white" ><IoCloseSharp size={25} /> Clear</h6>
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
  }}>Organization Ledger
</Typography>
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
  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Excess Amount:</Typography>
  <Typography variant="body2"> {Studentinfo.excess_amount ? ` ${Studentinfo.excess_amount}` : null}</Typography>

</Col>
<Col xs={4}>
  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Sponsor Name:</Typography>
  <Typography variant="body2"> {Studentinfo.name ? ` ${Studentinfo.name}` : null}</Typography>
</Col>
<Col xs={4}>
  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Email:</Typography>
  <Typography variant="body2"> {Studentinfo.email ? ` ${Studentinfo.email}` : null}</Typography>
</Col>
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
<Table id="ThirdStandardFeeTable3" style={{borderCollapse: 'collapse', padding: '18px', border: 'none', backgroundColor: '#ffff', borderRadius: '8px', width: '100%'}}>
<TableHead style={{backgroundColor:'#E6E6E6'}}>
  <TableRow>
    <TableCell style={{ fontWeight: 'bold'}}>S.No</TableCell>
    <TableCell style={{ fontWeight: 'bold'}}>Date of Invoice / Receipt</TableCell>
    <TableCell style={{ fontWeight: 'bold'}} >Invoice No / Receipt No</TableCell>
    <TableCell style={{ fontWeight: 'bold'}}>Invoice Amount</TableCell>
    <TableCell style={{ fontWeight: 'bold'}}>Invoice Amount</TableCell>
    <TableCell style={{ fontWeight: 'bold'}}>Receipt Amount</TableCell>
    <TableCell style={{ fontWeight: 'bold'}}>Dues</TableCell>
    <TableCell style={{ fontWeight: 'bold'}}>Excess</TableCell>
  </TableRow>
</TableHead>
<TableBody>
{/* Sample data rows */}
{/* <TableRow>
<TableCell style={{border: '1px solid black'}}>1</TableCell>
<TableCell style={{border: '1px solid black'}}>2024-02-19</TableCell>
<TableCell style={{border: '1px solid black'}}>INV-001</TableCell>
<TableCell style={{border: '1px solid black'}}>100.00</TableCell>
<TableCell style={{border: '1px solid black'}}>50.00</TableCell>
<TableCell style={{border: '1px solid black'}}>50.00</TableCell>
<TableCell style={{border: '1px solid black'}}>0.00</TableCell>
</TableRow>
<TableRow>
<TableCell style={{border: '1px solid black'}}>2</TableCell>
<TableCell style={{border: '1px solid black'}}>2024-02-20</TableCell>
<TableCell style={{border: '1px solid black'}}>INV-002</TableCell>
<TableCell style={{border: '1px solid black'}}>150.00</TableCell>
<TableCell style={{border: '1px solid black'}}>100.00</TableCell>
<TableCell style={{border: '1px solid black'}}>50.00</TableCell>
<TableCell style={{border: '1px solid black'}}>0.00</TableCell>
</TableRow> */}
{/* Add more rows with sample data as needed */}
{/* Total row */}
{/* <TableRow>
<TableCell colSpan="3" style={{border: '1px solid black', textAlign: 'center', fontWeight: 'bold'}}>Total</TableCell>
<TableCell style={{border: '1px solid black', fontWeight: 'bold'}}>250.00</TableCell>
<TableCell style={{border: '1px solid black', fontWeight: 'bold'}}>150.00</TableCell>
<TableCell style={{border: '1px solid black', fontWeight: 'bold'}}>100.00</TableCell>
<TableCell style={{border: '1px solid black', fontWeight: 'bold'}}>0.00</TableCell>
</TableRow> */}
</TableBody>
<TableFooter>
<TableRow>
<TableCell colSpan="4" style={{ textAlign: 'center', fontWeight: 'bold'}}>-     -    -      -     -     -    -     -      -     -    -      -     -     -    -     -</TableCell>
<TableCell style={{ fontWeight: 'bold'}}>150.00</TableCell>
<TableCell style={{ fontWeight: 'bold'}}>100.00</TableCell>
<TableCell style={{ fontWeight: 'bold'}}>100.00</TableCell>
<TableCell colSpan="1" style={{ fontWeight: 'bold'}}>-     -    -      -     -     -    -     -      -     -    -      -     -     -    -     -</TableCell>
</TableRow>
</TableFooter>

            </Table>
          {/* <button className="btn btn-warning" onClick="printTable()" >Print</button> */}

          <hr className='mb-1'/>

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
function printDiv(divId) {
  var content = document.getElementById(divId);
  var printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head><title>Receipt Details</title>');
  // Add CSS for text wrapping
  printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } table td { word-wrap: break-word; }</style>');
  printWindow.document.write('</head><body style="font-size: 10px;">'); // Adjust text size here
  printWindow.document.write(content.innerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}



 

export default OrganizationLedgerForm
