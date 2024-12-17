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
import * as XLSX from 'xlsx';
import { Snackbar } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';



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
    }, []); 
  


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
          const response = await axios.post(
              "https://santhoshavidhyalaya.com/SVSTEST/api/StudentLedger",
              {
                  ReceiptorInvoice: selectedOptionsReciptInvoice.value,
                  FromDate: fromDate,
                  ToDate: toDate,
                  AdmissionNo: admissionNo,
                  Invoiceid: selectedOptionsInvoice.label,
                  Recieptsid: selectedOptionsReciepts.label,
                SponsorID: selectedOptionsSponsor.value,
                Std: newInvoiceClass,

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
    
    <div className="pt-4">
   
     <Row>
  {/* <div className="pt-5 d-flex" style={{ margin: "auto", width: "100%", border: "5px solid #dfdfdf", padding: "52px", backgroundColor: "#e6e6e6" }}>
  
  </div> */}
          <div style={{ display: "flex", height:"5vh" }} >
          <Typography className="ps-2 pe-1 pt-2">Select Class<span style={{ color: 'red' }}>*</span>:</Typography>
          <div className="pt-1" style={{width:'20%'}}><Form.Select  name='standard'  value={newInvoiceClass}  onChange={(e) => setNewInvoiceClass(e.target.value)} onClick={getStudents} >
                            <option>Select Class</option>
                            {/* <option value="all">ALL</option> */}
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
            <Typography className="ps-2 pe-2 pt-2">Receipt/Invoice<span style={{ color: 'red' }}>*</span> :</Typography>
          <div className="pt-1" style={{ width: '20%' }}>
            <Form.Select name='RecInv'
            // value={selectedOptionsReciptInvoice} onChange={(e) => setSelectedOptionsReciptInvoice(e)}
            show={selectedOptionsReciptInvoice.show}
            onChange={(e) => setSelectedOptionsReciptInvoice({ value: e.target.value, show: e.target.options[e.target.selectedIndex].getAttribute('show') })}
            menuPortalTarget={document.body} // Render the menu outside of its parent container

            >
                            <option>Select </option>
                            <option value="receipt"  show="receipt">Receipt</option>
                            <option value="invoice"  show="invoice">Invoice</option>
                            <option value="invoice"  show="both">Both</option>
            </Form.Select>
          </div>
    <Typography className="pe-2 pt-2 px-3">From Date<span style={{ color: 'red' }}>*</span>:</Typography>
    <input ref={datefInputRef} type="date" onChange={(e) => setFromDate(e.target.value)} />
    <Typography className="ps-2 pe-2 pt-2 px-3">To Date<span style={{ color: 'red' }}>*</span>:</Typography>
    <input ref={datetInputRef} type="date" onChange={(e) => setToDate(e.target.value)} />
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
          <div className="pt-0 ,px-3"
         style={{ display: "flex" }}>
          <Typography className="pt-3 px-2">Select Sponsor<span style={{ color: 'red' }}></span>: </Typography>
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
      <Row>
 
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
          </button><br />
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
        className="mt-5 "
        anchorOrigin={{
          marginTop:'30px',
           vertical: 'top', // Can still use 'top' or 'bottom' here for default behavior
           horizontal: 'center', // Center horizontally
       }}
   />
      <div>
        <div>
        <div className="container">
        <hr className='mb-1'/>
{/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
            <Paper sx={{ margin: '20px', padding: '50px' }}>   
            <div  ref={componentRef} className="container" sx={{ backgroundColor: 'white'}} >
            <div className="print-wrapper" style={{display : 'block'}}>
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
          <h2 style={{fontFamily:'sans-serif'}}>Santhosha Vidhyalaya</h2>
          <p style={{fontFamily:'sans-serif'}}>Dohnavur Fellowship,<br/>
          Dohnavur – 627102,<br/>
          Tirunelveli District, Tamil Nadu<br/>
          Mobile – +91 80125 12145,<br/>
          Email – finance@santhoshavidhayalaya.com </p>
        </div>
      </Col>
      <Col xs={3} className='text-center pt-3'>
        <img style={{width:'60%'}} src={SvsInvoice} />
      </Col>
    </Row>
  </div>
  {/* <div className='pt-3 px-3'>
    <Row>
      <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>Class:</Typography>
        <Typography variant="body2"> {Studentinfo.name ? ` ${Studentinfo.standard}` : null}</Typography>
      </Col>
      <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>Student Name:</Typography>
        <Typography variant="body2">      {Studentinfo.name ? ` ${Studentinfo.name}` : null}
</Typography>
      </Col>
      <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>Admission No:</Typography>
        <Typography variant="body2"> {Studentinfo.name ? ` ${Studentinfo.admission_no}` : null}</Typography>
      </Col>
                      </Row>
                      <Row>
                         <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>Excess Amount:</Typography>
        <Typography variant="body2"> {Studentinfo.name ? ` ${Studentinfo.excess_amount}` : null}</Typography>
                        </Col>
                        <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>Roll No:</Typography>
        <Typography variant="body2"> {Studentinfomas.roll_no ? ` ${Studentinfomas.roll_no}` : null}</Typography>
                        </Col>
                        <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>Gender:</Typography>
        <Typography variant="body2"> {Studentinfomas.SEX ? ` ${Studentinfomas.SEX}` : null}</Typography>
      </Col>
                      </Row>
                      <Row>
                         <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>DOB:</Typography>
        <Typography variant="body2"> {Studentinfomas.DOB_DD_MM_YYYY ? ` ${Studentinfomas.DOB_DD_MM_YYYY}` : null}</Typography>
                        </Col>
                        <Col xs={4}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>Father Name:</Typography>
        <Typography variant="body2"> {Studentinfomas.FATHER ? ` ${Studentinfomas.FATHER}` : null}</Typography>
                        </Col>
                        <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>Mother Name:</Typography>
        <Typography variant="body2"> {Studentinfomas.MOTHER ? ` ${Studentinfomas.MOTHER}` : null}</Typography>
      </Col>
                      </Row>
                      <Row>
                         <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>Father Email:</Typography>
        <Typography variant="body2"> {Studentinfomas.EMAIL_ID ? ` ${Studentinfomas.EMAIL_ID}` : null}</Typography>
                        </Col>
                        <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>Mother Email:</Typography>
        <Typography variant="body2"> {Studentinfomas.mother_email_id ? ` ${Studentinfomas.mother_email_id}` : null}</Typography>
                        </Col>
                        <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>Father Mobile:</Typography>
        <Typography variant="body2"> {Studentinfomas.MOBILE_NUMBER ? ` ${Studentinfomas.MOBILE_NUMBER}` : null}</Typography>
      </Col>
                      </Row>
                      <Row>
                        <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}> Mother Mobile:</Typography>
        <Typography variant="body2"> {Studentinfomas.WHATS_APP_NO ? ` ${Studentinfomas.WHATS_APP_NO}` : null}</Typography>
                        </Col>
                     
                        {/* <Col xs={4}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Mother Name:</Typography>
        <Typography variant="body2"> {Studentinfomas.MOTHER ? ` ${Studentinfomas.MOTHER}` : null}</Typography>
      </Col> */}
                     {/* </Row>
 
                  <div style={{ height: '20px' }} />
<div style={{ height: '20px' }} />
  

                  </div> */}
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
                
       <Table id="ThirdStandardFeeTable3" style={{borderCollapse: 'collapse', padding: '18px', border: 'none', backgroundColor: '#ffff', borderRadius: '8px', width: 'auto'}}>
                <TableHead style={{backgroundColor:'#E6E6E6'}}>
        <TableRow>
        <TableCell style={{ fontWeight: 'bold',Width:'7px'}}>S.No</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Student Name</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Date</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Invoice/Receipt No:</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Type</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Invoice<br></br>/Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Receipt<br></br>/Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Dues Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Excess Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Sponsor/Parent</TableCell>
         </TableRow>
                  </TableHead>
                  
                  {/* <TableFooter></TableFooter> */}
<TableFooter>
    <TableRow>
    <TableCell style={{ fontWeight: 'bold',Width:'7px'}}>S.No</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Student Name</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Date</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Invoice/Receipt No:</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Type</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Invoice<br></br>/Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Receipt<br></br>/Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Dues Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Excess Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Sponsor/Parent</TableCell>
     </TableRow>
  </TableFooter>
                </Table>
                <Row>
                        {/* <Col xs={4}>
        <Typography id ="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>School Dues: {totalAmountsArray && totalAmountsArray[0] && totalAmountsArray[0].totalPendingAmountS ? ` ${totalAmountsArray[0].totalPendingAmountS}` : null}</Typography>
                         </Col>
                        <Col xs={4}>
        <Typography id ="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>School Excess:</Typography>
                         </Col> */}
                        {/* <Col xs={4}>
        <Typography id ="body1" sx={{ fontWeight: 'bold' }}>Mother Name:</Typography>
        <Typography variant="body2"> {Studentinfomas.MOTHER ? ` ${Studentinfomas.MOTHER}` : null}</Typography>
      </Col> */}
                      </Row>
                {/* <button className="btn btn-warning" onClick="printTable()" >Print</button> */}
          
                <hr className='mb-1' />
                <Typography
                variant="h6" // Use h1, h2, h3, h4, etc. based on your needs
                component="h6" // HTML element to render
                style={{ marginBottom: '1px', color: '#333' }} // Customize styles if needed
                >
                  Hostel Invoice / Receipt Table </Typography>
                <Table id="ThirdStandardFeeTable3H" style={{borderCollapse: 'collapse', padding: '18px', border: 'none', backgroundColor: '#ffff', borderRadius: '8px', width: 'auto'}}>
                <TableHead style={{backgroundColor:'#E6E6E6'}}>
        <TableRow>
        <TableCell style={{ fontWeight: 'bold',Width:'7px'}}>S.No</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Student Name</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Date</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Invoice/Receipt No:</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Type</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Invoice<br></br>/Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Receipt<br></br>/Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Dues Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Excess Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Sponsor/Parent</TableCell>
         </TableRow>
                  </TableHead>
                  
                  {/* <TableFooter></TableFooter> */}
<TableFooter>
    <TableRow>
    <TableCell style={{ fontWeight: 'bold',Width:'7px'}}>S.No</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Student Name</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Date</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Invoice/Receipt No:</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Type</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Invoice<br></br>/Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Receipt<br></br>/Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Dues Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Excess Amt.</TableCell>
          <TableCell style={{ fontWeight: 'bold'}}>Sponsor/Parent</TableCell>
     </TableRow>
  </TableFooter>
                </Table>
                <Row>
                        {/* <Col xs={4}>
        <Typography id ="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>Hostel Dues:  {totalAmountsArray && totalAmountsArray[0] &&  totalAmountsArray[0].totalPendingAmountH ? ` ${totalAmountsArray[0].totalPendingAmountH}` : null}</Typography>
                        </Col>
                        <Col xs={4}>
        <Typography id ="body1" sx={{ fontWeight: 'bold',fontSize: '11px' }}>Hostel Excess:</Typography>
                         </Col> */}
                        {/* <Col xs={4}>
        <Typography id ="body1" sx={{ fontWeight: 'bold' }}>Mother Name:</Typography>
        <Typography variant="body2"> {Studentinfomas.MOTHER ? ` ${Studentinfomas.MOTHER}` : null}</Typography>
      </Col> */}
                      </Row>       
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