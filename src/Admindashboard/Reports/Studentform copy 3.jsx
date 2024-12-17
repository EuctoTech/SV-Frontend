import React, { useRef, useState, useEffect } from "react";
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import { TbWorldUpload } from 'react-icons/tb'
import { IoSearchOutline ,IoCloseSharp} from "react-icons/io5";
import './table.css'
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
import { Button, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Typography  } from '@mui/material';
import { Print } from '@mui/icons-material';



import ReactDOM from 'react-dom';
//Datatable Modules
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
const   LedgerSummary = () => {
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
const [Tabledata, setTabledata] = useState([]);
 
const [Studentinfo, setStudentinfo] = useState([]);

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
 
 
  
  
  


  const handleClear = () => {
    setSelectedOptionsStudent([]);
    setSelectedOptionsInvoice([]);
    setSelectedOptionsReciepts([]);
    setSelectedOptionsAdmission([]);
    setSelectedOptionsReciptInvoice([]);
    setFromDate(null);
    setToDate(null); 
    setTabledata([]);
    setStudentinfo([]);
    setOptionsReciepts([]);
    setOptionsInvoice([]);
    setOptionsAdmission([]);  };

async function handleFilter() {
  try {
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

      const response = await axios.post(
          "https://santhoshavidhyalaya.com/SVSTEST/api/StudentLedger",
          {
              ReceiptorInvoice: selectedOptionsReciptInvoice,
              FromDate: fromDate,
              ToDate: toDate,
              AdmissionNo: admissionNo,
              Invoiceid: selectedOptionsInvoice.label,
              Recieptsid: selectedOptionsReciepts.label
          }
      );

 // Extracting the data from the response
    const responseData = response.data;
    if (responseData.data.length === 0) {
        Swal.fire({
        icon: "warning",
        title: "No Data Found",
        text:  "No data was found for the given criteria.",
        });
      return;
    }
 console.log(responseData);

 // Modifying the format of the response data
 const modifiedResponse = [];
 

responseData.data.forEach(dataItem => {
    if (dataItem.invoice && dataItem.invoice.slno) {

  modifiedResponse.push({
    no: dataItem.invoice.slno,
    invoice_no: dataItem.invoice.invoice_no,
    date: dataItem.invoice.date,
    Iamount: dataItem.invoice.amount,
    Ramount: "-",
    invoice_pending_amount: dataItem.invoice.invoice_pending_amount,
    payment_status: dataItem.invoice.payment_status,
    desc: "Invoice"
  });
}
  // modifiedResponse.push({  invoiceData }); // Push invoice data to modifiedResponse

  // Push each receipt corresponding to this invoice into modifiedResponse
  dataItem.receipts.forEach(receiptItem => {
    const dateObj = new Date(receiptItem.created_at);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // January is 0, so we add 1 to get correct month number
    const year = dateObj.getFullYear();
  
    // Adding leading zero for single-digit day
    const formattedDay = day < 10 ? '0' + day : day;
    // Adding leading zero for single-digit month
    const formattedMonth = month < 10 ? '0' + month : month;
  
    // Creating the formatted date string in the format "MM/DD/YYYY"
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  
    modifiedResponse.push({
      no: receiptItem.invoice_id, // Use the same slno as the invoice
      invoice_no: receiptItem.transactionId,
      date: formattedDate,
      Iamount: "-",
      Ramount: receiptItem.amount,
      invoice_pending_amount: "",
      payment_status: "",
      desc: "Receipt"
    });
    // modifiedResponse.push({ receiptData }); // Push receipt data to modifiedResponse
  });
});
console.log(modifiedResponse);
    // console.log("user",responseData.data[0].student);
    setStudentinfo(responseData.data[0].student);

 


    
  initializeDataTable(modifiedResponse);
  } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to process request!',
        footer: 'No Data found on this date filter.'
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
      { data: 'no', title: 'No.', className: 'text-dark' },
      { data: 'date', title: 'Date of<br>Invoice/<br>Receipt', className: 'text-dark' },
      { data: 'invoice_no',style: 'font-size: 10px;,font-weight:bold;', title: 'Invoice/<br>Receipt No', className: 'text-dark' },
      { data: 'desc', title: 'Invoice/<br>Receipt', className: 'text-dark' },
      { data: 'Iamount', title: 'Invoice<br>Amount', className: 'text-dark' },
      { data: 'Ramount', title: 'Receipt<br>Amount', className: 'text-dark' },
{
    data: 'invoice_pending_amount',
    title: 'Dues',
    className: 'text-dark',
    render: function(data, type, row) {
        return data ? data : '-';
    }
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
    if (val && val !== '-') {
        // Remove non-numeric characters and convert commas to periods (for locales where commas are used as decimal separators)
        var sanitizedVal = val.replace(/[^\d.]/g, '').replace(',', '.');
        return acc + parseFloat(sanitizedVal);
    } else {
        return acc;
    }
}, 0);





      // Add totals to footer
      $(this.api().column(4).footer()).html('<span  style="font-size: 10px;  font-weight: 800;">Total Invoice:</span> <br><span  style="font-size: 15px; font-family: revert-layer; font-weight: 600; "> ' + iAmountTotal + '</span>');
      $(this.api().column(5).footer()).html('<span  style="font-size: 10px;font-weight: 800;">Total Receipt:</span> <br><span  style="font-size: 15px; font-family: revert-layer; font-weight: 600;"> ' + rAmountTotal + '</span>');
      $(this.api().column(6).footer()).html('<span  style="font-size: 10px;font-weight: 800;">Total Due:</span> <br><span  style="font-size: 15px; font-family: revert-layer; font-weight: 600;"> ' + dAmountTotal + '</span>');
  }

       });
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
    // alert(selectedOptions.value);
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
            </Form.Select></div>
            <Typography className="ps-2 pe-2 pt-2">Receipt/Invoice<span style={{ color: 'red' }}>*</span> :</Typography>
            <div className="pt-1" style={{ width: '20%' }}><Form.Select name='RecInv'
            value={selectedOptionsReciptInvoice} onChange={(e) => setSelectedOptionsReciptInvoice(e.target.value)}
            menuPortalTarget={document.body} // Render the menu outside of its parent container

            >
                            <option>Select </option>
                            <option value="receipt">Receipt</option>
                            <option value="invoice">Invoice</option>
                        </Form.Select></div>
    <Typography className="pe-2 pt-2 px-3">From Date<span style={{ color: 'red' }}>*</span>:</Typography>
    <input type="date" onChange={(e) => setFromDate(e.target.value)} />
    <Typography className="ps-2 pe-2 pt-2 px-3">To Date<span style={{ color: 'red' }}>*</span>:</Typography>
    <input type="date" onChange={(e) => setToDate(e.target.value)} />
  </div>
 
      <Col>
      <div style={{ display: "flex", height:"10vh" }}className="pt-3 ,px-3"
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
        }}>Student Ledger</Typography>
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
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Class:</Typography>
        <Typography variant="body2"> {Studentinfo.name ? ` ${Studentinfo.standard}` : null}</Typography>
      </Col>
      <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Student Name:</Typography>
        <Typography variant="body2">      {Studentinfo.name ? ` ${Studentinfo.name}` : null}
</Typography>
      </Col>
      <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Admission No:</Typography>
        <Typography variant="body2"> {Studentinfo.name ? ` ${Studentinfo.admission_no}` : null}</Typography>
      </Col>
                      </Row>
                      <Row>
                         <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Excess Amount:</Typography>
        <Typography variant="body2"> {Studentinfo.name ? ` ${Studentinfo.excess_amount}` : null}</Typography>
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
          <TableCell style={{ fontWeight: 'bold',Width:'7px'}}>S.No</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Date of Invoice / Receipt</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Invoice No / Receipt No</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Invoice<br></br>/Receipt</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Invoice Amount</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Receipt Amount</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Dues</TableCell>
         </TableRow>
                  </TableHead>
                  
                  {/* <TableFooter></TableFooter> */}
<TableFooter>
    <TableRow>
      <TableCell colSpan="4" style={{ textAlign: 'center', fontWeight: 'bold'}}></TableCell>
       <TableCell style={{ fontWeight: 'bold'}}></TableCell>
      <TableCell style={{ fontWeight: 'bold'}}>00</TableCell>
      <TableCell style={{ fontWeight: 'bold'}}></TableCell>
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

export default LedgerSummary 