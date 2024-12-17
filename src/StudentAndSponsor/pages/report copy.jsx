import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Typography, Button, Grid,Paper } from '@mui/material';
import { MdDownload } from 'react-icons/md';
import Navbar from '../../Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SvsInvoice from './Svs-invoice.jpg';
import schoolImage from './school 1.jpg';
import hostelImage from './hostel 1.jpg';
 import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../pages/allinvoice.css'

 
import { TbWorldUpload } from 'react-icons/tb'
import { IoSearchOutline ,IoCloseSharp} from "react-icons/io5";
import './table.css'
import Swal from 'sweetalert2';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
 import ReactToPrint from 'react-to-print';
import { Table, TableHead, TableRow, TableCell, TableBody, TableFooter  } from '@mui/material';
import { Print } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { Snackbar } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';



import ReactDOM from 'react-dom';
//Datatable Modules
import $ from 'jquery'; 

import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import 'datatables.net';

import 'jquery/dist/jquery.min.js';
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
 

const InvoiceComponent = () => {
  const componentRef = useRef();

const [newInvoiceClass, setNewInvoiceClass] = useState('');

const [options, setOptions] = useState([]);
const [selectedOptionsStudent, setSelectedOptionsStudent] = useState([]);
const [selectedOptionsInvoice, setSelectedOptionsInvoice] = useState([]);
const [selectedOptionsReciepts, setSelectedOptionsReciepts] = useState([]);
const [selectedOptionsAdmission, setSelectedOptionsAdmission] = useState([]);
const [selectedOptionsReciptInvoice, setSelectedOptionsReciptInvoice] = useState([]);
const [totalAmountsArray, setTotalAmountsArray] = useState([]);
const [fromDate, setFromDate] = useState(null);
const [toDate, setToDate] = useState(null); 
const [Tabledata, setTabledata] = useState([]);
const [open, setOpen] = useState(false); // State for Snackbar visibility
const [snackMessage, setSnackMessage] = useState(''); // State for Snackbar message

const [Studentinfo, setStudentinfo] = useState([]);
const [Studentinfomas, setStudentinfomas] = useState([]);

  const [optionsreciepts, setOptionsReciepts] = useState([]);
const [optionsinvoice, setOptionsInvoice] = useState([]);
const [optionsAdmission, setOptionsAdmission] = useState([]);
const [selectedOptionsSponsor, setSelectedOptionsSponsor] = useState([]);
  const [optionsSponsor, setOptionsSponsor] = useState([]);
const [filteredHostelResultsd, setfilteredHostelResultsd] = useState([]);
const [filteredSchoolResultsd, setfilteredSchoolResultsd] = useState([]);
const datefInputRef = useRef(null);
  const datetInputRef = useRef(null);
  

  const userId = sessionStorage.getItem('user_id');
  const userType = sessionStorage.getItem('user_type');
  let dataTable;
  const handleClear = () => {
    setSelectedOptionsStudent([]);
    setSelectedOptionsInvoice([]);
    setSelectedOptionsReciepts([]);
    setSelectedOptionsAdmission([]);
    setSelectedOptionsReciptInvoice([]);
    setNewInvoiceClass([]);
    setFromDate(null);
    setToDate(null); 
    setTabledata([]);
    setStudentinfo([]);
    setStudentinfomas([]);
    setOptionsReciepts([]);
    setOptionsInvoice([]);
    setOptionsAdmission([]);
    setfilteredHostelResultsd([]);  // Reset hostel results
    setfilteredSchoolResultsd([]);
    $('#ThirdStandardFeeTable3H').DataTable().clear().destroy();
    $('#ThirdStandardFeeTable3').DataTable().clear().destroy();
    setSelectedOptionsSponsor([]);
    datefInputRef.current.value = ""; 
    datetInputRef.current.value = ""; 
    

  };

  const handleFilter = async () => {
   
    console.log(userId, typeof userId);
    console.log(userType, typeof userType );
  
    try {
         // Reset state
    setfilteredHostelResultsd([]);  // Reset hostel results
    setfilteredSchoolResultsd([]);  // Reset school results
          let admissionNo;
          // if (selectedOptionsStudent.value !== undefined && selectedOptionsStudent.value !== null) {
              admissionNo = selectedOptionsStudent.value ?? null;
          // } else if (selectedOptionsAdmission.value !== undefined && selectedOptionsAdmission.value !== null) {
          //     admissionNo = selectedOptionsAdmission.value;
          // } else {
          //   Swal.fire({
          //     icon: "warning",
          //     title: "No Student/Admission no. Selected",
          //     text:  "Please Select anyone.",
          //   });
          // }
      if (selectedOptionsReciptInvoice.value == undefined || selectedOptionsReciptInvoice.value == null) {
        Swal.fire({
              icon: "warning",
              title: "Select Invoice / Receipt or Both",
              text:  "Please Select anyone.",
            });
      }
      const userIdAssignment = userType === 'student' ? 
  { AdmissionNo: userId } : 
  { SponsorID: userId };
          const response = await axios.post(
              "https://santhoshavidhyalaya.com/SVSTEST/api/StudentLedger",
              {
                ReceiptorInvoice: selectedOptionsReciptInvoice.value,
                  FromDate: fromDate,
                  ToDate: toDate,
                ...userIdAssignment,
  
                }
          );
    
          const responseDataH = Array.isArray(response.data.data.H) ? response.data.data.H : [response.data.data.H];
        const responseDataS = Array.isArray(response.data.data.S) ? response.data.data.S : [response.data.data.S];
        console.log('1111',responseDataS ,typeof responseDataS);
        console.log('2222',responseDataH,typeof responseDataH);
        let studentName;
     
 let formattedHostelResults = [];
let formattedSchoolResults = [];
// if (responseDataH && responseDataH.length > 0) {
//   studentName = responseDataH[0].student.name;
// } 
// // If not, check responseDataS
// else if (responseDataS && responseDataS.length > 0) {
//   studentName = responseDataS[0].student.name;
// } 
// // If neither are available, handle the case (e.g., set studentName to null or an empty string)
// else {
//   studentName = null; // or ''
// }
// Function to format receipt data
function formatReceiptData(receiptItem, student_id, isHostel) {
    const dateObj = new Date(receiptItem.created_at);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;

    return {
        student_id: student_id,
        date: formattedDate,
        invoice_no: receiptItem.transactionId,
        type: receiptItem.inv_amt && receiptItem.inv_amt !== '' ? 'Invoice' : 'Receipt',
        invoice_amount: receiptItem.inv_amt && receiptItem.inv_amt !== '' ? receiptItem.inv_amt : '',
        receipt_amount: receiptItem.inv_amt && receiptItem.inv_amt === '' || receiptItem.inv_amt === null? receiptItem.amount : '',
        dues: receiptItem.due_amount,
        excess: isHostel ? receiptItem.h_excess_amount : receiptItem.s_excess_amount, // Check if it's hostel or school
        sponsor_or_parent: receiptItem.sponsor && receiptItem.sponsor !== '' || receiptItem.sponsor !== null 
        ? (receiptItem.sponsor_info ? receiptItem.sponsor_info.name : 'N/A') 
        : 'parent',
          };
}

// Check if responseDataH is a valid array and process it
if (Array.isArray(responseDataH) && responseDataH.length > 0) {
    responseDataH.forEach(dataItem => {
        // Process all items in receipts for hostel
        if (Array.isArray(dataItem.receipts)) {
          dataItem.receipts.forEach(receiptItem => {
            console.log('receiptItem',receiptItem);
            let name = [
              dataItem.invoice.name,
              dataItem.invoice.standard,
              dataItem.invoice.roll_no
          ]
          .filter(Boolean) // Remove any undefined or empty values
          .join(' | '); // Join with ' | ' as the separator
                      const formattedReceipt = formatReceiptData(receiptItem, name, true); // true for hostel
                formattedHostelResults.push(formattedReceipt);
            });
        }
    });
}

// Check if responseDataS is a valid array and process it
      if (Array.isArray(responseDataS) && responseDataS.length > 0) {
    responseDataS.forEach(dataItem => {
      console.log('responseDataS',responseDataS);
      if (Array.isArray(dataItem.receipts)) {
        console.log('receiptItem',dataItem);

        console.log('receiptItem',dataItem.invoice.name | dataItem.invoice.standard | dataItem.invoice.roll_no);

        dataItem.receipts.forEach(receiptItem => {

              console.log( receiptItem.student?.name ?? studentName);
              let name = [
                receiptItem.student?.name ?? dataItem.invoice.name ,
                receiptItem.student?.standard ?? dataItem.invoice.standard,
                receiptItem.student?.roll_no ?? dataItem.invoice.roll_no
            ]
            .filter(Boolean) // Remove any undefined or empty values
            .join(' | '); // Join with ' | ' as the separator
            
               const formattedReceipt = formatReceiptData(receiptItem, name , false); // true for hostel

                formattedSchoolResults.push(formattedReceipt);
            });
        }
    });
}
console.log('formattedSchoolResults' ,formattedSchoolResults);

// Function to filter results based on type
function filterResults() {
  const type = selectedOptionsReciptInvoice.show; // Get the current selected filter type
  let filteredHostelResults = [];
  let filteredSchoolResults = [];

  // Filter hostel results based on selected type
  if (type === 'invoice') {
      filteredHostelResults = formattedHostelResults.filter(item => item.type === 'Invoice');
  } else if (type === 'receipt') {
      filteredHostelResults = formattedHostelResults.filter(item => item.type === 'Receipt');
  } else { // both or any other case
      filteredHostelResults = formattedHostelResults;
  }

  // Filter school results based on selected type
  if (type === 'invoice') {
      filteredSchoolResults = formattedSchoolResults.filter(item => item.type === 'Invoice');
  } else if (type === 'receipt') {
      filteredSchoolResults = formattedSchoolResults.filter(item => item.type === 'Receipt');
  } else { // both or any other case
      filteredSchoolResults = formattedSchoolResults;
  }

  return { filteredHostelResults, filteredSchoolResults };
}

// Example usage: Call filterResults whenever the selected option changes
const { filteredHostelResults, filteredSchoolResults } = filterResults();

// Log the filtered results
console.log('Filtered Hostel Results:', filteredHostelResults);
console.log('Filtered School Results:', filteredSchoolResults);
setfilteredHostelResultsd(filteredHostelResults);
setfilteredSchoolResultsd(filteredSchoolResults);
// Optional: Display results in a table format
console.table(filteredHostelResults);
        console.table(filteredSchoolResults); 
if (Array.isArray(responseDataS) && responseDataS.length > 0  && responseDataS[0] != undefined  && responseDataS[0] != null) {
 
  initializeDataTable(filteredSchoolResults);
  setStudentinfo(responseDataS[0].student);
  setStudentinfomas(responseDataS[0].studentmaster);

} else {
  initializeDataTable();

}

// Conditionally call initializeDataTableH if responseDataH is a non-empty array
if (Array.isArray(responseDataH) && responseDataH.length > 0 && responseDataH[0] != undefined  && responseDataH[0] != null) {
  initializeDataTableH(filteredHostelResults);
 
  setStudentinfo(responseDataH[0].student);
  setStudentinfomas(responseDataH[0].studentmaster);
} else {
  initializeDataTableH();
}
     
        // console.log("user",responseData.data[0].student);
      
//         setTotalAmountsArray(totalAmountsArray);
//     // Conditionally call initializeDataTable if responseDataS is a non-empty array
// if (Array.isArray(responseDataS) && responseDataS.length > 0  && responseDataS[0] != undefined  && responseDataS[0] != null) {
 
//   initializeDataTable(modifiedResponseS);
//   setStudentinfo(responseDataS[0].student);
//   setStudentinfomas(responseDataS[0].studentmaster);

// } else {
//   initializeDataTable();

// }

// // Conditionally call initializeDataTableH if responseDataH is a non-empty array
// if (Array.isArray(responseDataH) && responseDataH.length > 0 && responseDataH[0] != undefined  && responseDataH[0] != null) {
//   initializeDataTableH(modifiedResponseH);
//   setStudentinfo(responseDataH[0].student);
//   setStudentinfomas(responseDataH[0].studentmaster);
// } else {
//   initializeDataTableH();
// }

      } catch (error) {
          console.error(error);
      }
    }
    
    function initializeDataTable(data) {
      if ($.fn.DataTable.isDataTable('#ThirdStandardFeeTable3')) {
        $('#ThirdStandardFeeTable3').DataTable().clear().destroy();
      }
      var table = $('#ThirdStandardFeeTable3').DataTable({
          destroy: true,
          processing: true,
          serverSide: false,
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
             {
    data: null,         // Use `null` since there's no data property for index
    className: 'text-dark',
    render: function (data, type, row, meta) {
      return meta.row + 1;   // meta.row gives the row index (zero-based), so add 1 for 1-based indexing
    }
  },
            { data: 'student_id', className: 'text-dark' },
            { data: 'date', className: 'text-dark' },
            { data: 'invoice_no', className: 'text-dark' },
            { data: 'type', className: 'text-dark' },
            { data: 'invoice_amount', className: 'text-dark' },
            { data: 'receipt_amount', className: 'text-dark' },
            { data: 'dues', className: 'text-dark' },
            { data: 'excess', className: 'text-dark' },
            { data: 'sponsor_or_parent', className: 'text-dark' },
            
              ],
        order: [[1, 'desc']],
        footerCallback: function (row, data, start, end, display) {
          var api = this.api();
  
          // Helper function to sum a column
          var intVal = function (i) {
              return typeof i === 'string' ?
                  i.replace(/[\$,]/g, '') * 1 :
                  typeof i === 'number' ?
                      i : 0;
          };
  
          // Calculate totals for each column
         
  
          var totalIamount = api
              .column(5, { page: 'current' })
              .data()
              .reduce(function (a, b) {
                  return intVal(a) + intVal(b);
              }, 0);
  
          var totalRamount = api
              .column(6, { page: 'current' })
              .data()
              .reduce(function (a, b) {
                  return intVal(a) + intVal(b);
              }, 0);
              // var totalDamount = api
              // .column(7, { page: 'current' })
              // .data()
              // .reduce(function (a, b) {
              //     return intVal(a) + intVal(b);
              // }, 0);
              // var totalEamount = api
              // .column(8, { page: 'current' })
              // .data()
              // .reduce(function (a, b) {
              //     return intVal(a) + intVal(b);
              // }, 0);
          // Update the footer with the totals
          $(api.column(0).footer()).html('<span>-</span>');
          $(api.column(1).footer()).html('<span>-</span>');
          $(api.column(2).footer()).html('<span>-</span>');
          $(api.column(3).footer()).html('<span>-</span>');
          $(api.column(4).footer()).html('<span>-</span>');
          $(api.column(5).footer()).html(totalIamount.toFixed(2));
          $(api.column(6).footer()).html(totalRamount.toFixed(2));
          $(api.column(7).footer()).html('<span>-</span>');
          $(api.column(8).footer()).html('<span>-</span>');
      }
    
           });
    }
    
    function initializeDataTableH(data) {
      if ($.fn.DataTable.isDataTable('#ThirdStandardFeeTable3H')) {
        $('#ThirdStandardFeeTable3H').DataTable().clear().destroy();
      }
      var table = $('#ThirdStandardFeeTable3H').DataTable({
          destroy: true,
          processing: true,
          serverSide: false,
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
           {
    data: null,         // Use `null` since there's no data property for index
    className: 'text-dark',
    render: function (data, type, row, meta) {
      return meta.row + 1;   // meta.row gives the row index (zero-based), so add 1 for 1-based indexing
    }
  },
          { data: 'student_id', className: 'text-dark' },
          { data: 'date', className: 'text-dark' },
          { data: 'invoice_no', className: 'text-dark' },
          { data: 'type', className: 'text-dark' },
          { data: 'invoice_amount', className: 'text-dark' },
          { data: 'receipt_amount', className: 'text-dark' },
          { data: 'dues', className: 'text-dark' },
          { data: 'excess', className: 'text-dark' },
          { data: 'sponsor_or_parent', className: 'text-dark' },
          
            ],
        order: [[1, 'desc']],
        footerCallback: function (row, data, start, end, display) {
          var api = this.api();
  
          // Helper function to sum a column
          var intVal = function (i) {
              return typeof i === 'string' ?
                  i.replace(/[\$,]/g, '') * 1 :
                  typeof i === 'number' ?
                      i : 0;
          };
  
          // Calculate totals for each column
         
          var totalIamount = api
              .column(5, { page: 'current' })
              .data()
              .reduce(function (a, b) {
                  return intVal(a) + intVal(b);
              }, 0);
  
          var totalRamount = api
              .column(6, { page: 'current' })
              .data()
              .reduce(function (a, b) {
                  return intVal(a) + intVal(b);
              }, 0);
              // var totalDamount = api
              // .column(7, { page: 'current' })
              // .data()
              // .reduce(function (a, b) {
              //     return intVal(a) + intVal(b);
              // }, 0);
              // var totalEamount = api
              // .column(8, { page: 'current' })
              // .data()
              // .reduce(function (a, b) {
              //     return intVal(a) + intVal(b);
              // }, 0);
              $(api.column(0).footer()).html('<span>-</span>');
              $(api.column(1).footer()).html('<span>-</span>');
              $(api.column(2).footer()).html('<span>-</span>');
              $(api.column(3).footer()).html('<span>-</span>');
              $(api.column(4).footer()).html('<span>-</span>');
              $(api.column(5).footer()).html(totalIamount.toFixed(2));
              $(api.column(6).footer()).html(totalRamount.toFixed(2));
              $(api.column(7).footer()).html('<span>-</span>');
              $(api.column(8).footer()).html('<span>-</span>');
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
  const handleSelectChangeSponsor = (selectedOptions) => {
    setSelectedOptionsSponsor(selectedOptions);
  }; 
  
 
  const handleToastOpen = (message) => {
      setSnackMessage(message); // Set the message
      setOpen(true); // Open the Snackbar
  };

  const handleToastClose = () => {
      setOpen(false); // Close the Snackbar
  };
  const handleDownloadExcel = () => {
    // Ensure the data is defined before proceeding
    if (!filteredHostelResultsd || !Array.isArray(filteredHostelResultsd) || filteredHostelResultsd.length === 0 || 
    !filteredSchoolResultsd || !Array.isArray(filteredSchoolResultsd) || filteredSchoolResultsd.length === 0) {
    
      handleToastOpen("Data is not available"); // Show a toast notification
      return;
}

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Define custom headers for both sections
    const hostelTitle = [['Hostel Results']];
    const hostelHeaders = [['Student ID', 'Date', 'Invoice No', 'Type', 'Invoice Amount', 'Receipt Amount', 'Dues', 'Excess', 'Sponsor/ Parent']];
    const schoolHeaders = [['Student ID', 'Date', 'Invoice No', 'Type', 'Invoice Amount', 'Receipt Amount', 'Dues', 'Excess', 'Sponsor/ Parent']];
    const schoolTitle = [['School Results']];

    // Convert hostel data to a format compatible with Excel and include custom headers
    const hostelData = filteredHostelResultsd.map(item => [
        item.student_id,
        item.date,
        item.invoice_no,
        item.type,
        item.invoice_amount,
        item.receipt_amount,
        item.dues,
        item.excess,
        item.sponsor_or_parent
    ]);

    // Convert school data to a format compatible with Excel and include custom headers
    const schoolData = filteredSchoolResultsd.map(item => [
        item.student_id,
        item.date,
        item.invoice_no,
        item.type,
        item.invoice_amount,
        item.receipt_amount,
        item.dues,
        item.excess,
        item.sponsor_or_parent
    ]);

    const combinedData = [
      ...hostelTitle,   // Add hostel title
      [],               // Add an empty row for spacing
      ...hostelHeaders, // Add hostel headers
      ...hostelData,    // Add hostel data
      [],               // Add an empty row for spacing
      ...schoolTitle,   // Add school title
      [],               // Add an empty row for spacing
      ...schoolHeaders, // Add school headers
      ...schoolData     // Add school data
  ];


    // Convert the combined data back to a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(combinedData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');

    // Download the workbook
    XLSX.writeFile(workbook, 'Hostel_and_Other_Results.xlsx');
};



  return (
    <div>
    <div className="App">
      <Navbar />
      <Grid container justifyContent="center" spacing={5} sx={{ padding: '10px' }}>
        <Grid item xs={12}>
          <Typography
            variant="h5" // Choose a variant that suits your design
            component="h1"
            align="center"
            sx={{
              fontWeight: 'bold',
              color: '#fffff', // Use your preferred color for headings
              marginBottom: '20px',
              textTransform: 'uppercase', // Optional: make it all uppercase
            }}
          >
            Student Ledger
          </Typography>
        </Grid>
      </Grid>
  
      <Grid container justifyContent="center" spacing={2}>
        <div className="pt-4">
          <Row>
            <div style={{ display: "flex", height: "5vh" }}>
              <Typography className="ps-2 pe-2 pt-2">
                Receipt/Invoice<span style={{ color: 'red' }}>*</span> :
              </Typography>
              <div className="pt-1" style={{ width: '20%' }}>
                <Form.Select
                  name='RecInv'
                  show={selectedOptionsReciptInvoice.show}
                  onChange={(e) => setSelectedOptionsReciptInvoice({ value: e.target.value, show: e.target.options[e.target.selectedIndex].getAttribute('show') })}
                  menuPortalTarget={document.body} // Render the menu outside of its parent container
                >
                  <option>Select</option>
                  <option value="receipt" show="receipt">Receipt</option>
                  <option value="invoice" show="invoice">Invoice</option>
                  <option value="invoice" show="both">Both</option>
                </Form.Select>
              </div>
              <Typography className="pe-2 pt-2 px-3">
                From Date<span style={{ color: 'red' }}>*</span>:
              </Typography>
              <input ref={datefInputRef} type="date" onChange={(e) => setFromDate(e.target.value)} />
              <Typography className="ps-2 pe-2 pt-2 px-3">
                To Date<span style={{ color: 'red' }}>*</span>:
              </Typography>
              <input ref={datetInputRef} type="date" onChange={(e) => setToDate(e.target.value)} />
            </div>
          </Row>
  
          <Row>
            <div className="ps-4 px-4 py-1">
              <button className="btn btn-warning" type="submit" onClick={handleFilter}>
                <h6 className="mb-0 text-danger"><IoSearchOutline size={25} /> Filter</h6>
              </button>
              <button className="btn btn-danger pl-4" onClick={handleClear}>
                <h6 className="mb-0 text-white"><IoCloseSharp size={25} /> Clear</h6>
              </button>
              <br />
              <div className="d-flex justify-content-end ps-4 px-0 py-1">
                <button className="btn btn-primary pl-4" onClick={handleDownloadExcel}>
                  Download Excel
                </button>
              </div>
            </div>
          </Row>
          
          <Snackbar
            open={open}
            autoHideDuration={3000} // Duration before the toast hides
            onClose={handleToastClose}
            message={snackMessage}
            action={
              <Button color="inherit" onClick={handleToastClose}>
                Close
              </Button>
            }
            className="mt-5"
            anchorOrigin={{
              marginTop: '30px',
              vertical: 'top', // Can still use 'top' or 'bottom' here for default behavior
              horizontal: 'center', // Center horizontally
            }}
          />
          
          <div className="container">
            <hr className='mb-1' />
            {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
            <Paper sx={{ margin: '20px', padding: '50px' }}>
              <div ref={componentRef} className="container" sx={{ backgroundColor: 'white' }}>
                <div className="print-wrapper" style={{ display: 'block' }}>
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
                            <h2 style={{ fontFamily: 'sans-serif' }}>Santhosha Vidhyalaya</h2>
                            <p style={{ fontFamily: 'sans-serif' }}>
                              Dohnavur Fellowship,<br />
                              Dohnavur – 627102,<br />
                              Tirunelveli District, Tamil Nadu<br />
                              Mobile – +91 80125 12145,<br />
                              Email – finance@santhoshavidhayalaya.com
                            </p>
                          </div>
                        </Col>
                        <Col xs={3} className='text-center pt-3'>
                          <img style={{ width: '60%' }} src={SvsInvoice} alt="Svs Invoice" />
                        </Col>
                      </Row>
                    </div>
                    <div style={{ padding: '10px' }}>
                      <ReactToPrint
                        trigger={() => (
                          <Button
                            startIcon={<Print style={{ fontSize: 30 }} />}
                            variant="contained"
                            color="primary"
                            className="printcustom"
                            style={{ padding: '10px' }}
                          >
                            Print
                          </Button>
                        )}
                        content={() => componentRef.current}
                        onBeforePrint={() => {
                          const component = componentRef.current;
                          // Apply compact class and styles only to the second table
                          $(component)
                            .find('#ThirdStandardFeeTable3H')
                            .addClass('compact')
                            .css({
                              'font-size': 'inherit',
                              'color': 'red', // Correct color property
                              'table-layout': 'fixed',
                              'width': '100%',
                              'border-collapse': 'collapse',
                              'margin': '0',
                              'padding': '0',
                              'overflow': 'auto',
                            });
                          $(component)
                            .find('#body1')
                            .addClass('compact')
                            .css({
                              'font-size': 'inherit',
                              'color': 'red', // Correct color property
                              'width': '100%',
                              'margin': '0',
                              'padding': '0',
                              'overflow': 'auto',
                            });
                        }}
                      />
                    </div>
                    <Typography
                      variant="h6" // Use h1, h2, h3, h4, etc. based on your needs
                      component="h6" // HTML element to render
                      style={{ marginBottom: '1px', color: '#333' }} // Customize styles if needed
                    >
                      School Invoice / Receipt Table
                    </Typography>
                    <Table id="ThirdStandardFeeTable3" style={{ borderCollapse: 'collapse', padding: '18px', border: 'none', backgroundColor: '#ffff', borderRadius: '8px', width: 'auto' }}>
                      <TableHead style={{ backgroundColor: '#E6E6E6' }}>
                        <TableRow>
                          <TableCell style={{ fontWeight: 'bold', Width: '7px' }}>S.No</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Student Name</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Invoice/Receipt No:</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Type</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Invoice<br /> /Amt.</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Receipt<br /> /Amt.</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Dues Amt.</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Excess Amt.</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Sponsor/Parent</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableFooter>
                        <TableRow>
                          <TableCell style={{ fontWeight: 'bold', Width: '7px' }}>S.No</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Student Name</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Invoice/Receipt No:</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Type</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Invoice<br /> /Amt.</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Receipt<br /> /Amt.</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Dues Amt.</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Excess Amt.</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Sponsor/Parent</TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </div>
                </div>
              </div>
            </Paper>
            <div style={{ height: '50px' }}></div>
          </div>
        </div>
      </Grid>
    </div>
  </div>
  

   );
};

export default InvoiceComponent;

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
 