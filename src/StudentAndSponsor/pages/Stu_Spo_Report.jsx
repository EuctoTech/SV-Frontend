import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { 
  Typography, Button, Paper, Box, Snackbar,
  Table, TableHead, TableRow, TableCell, TableBody, TableFooter
} from '@mui/material'
import { Row, Col, Form } from 'react-bootstrap'
import { IoSearchOutline, IoCloseSharp } from "react-icons/io5"
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font,Image } from '@react-pdf/renderer'
import $ from 'jquery'
import 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2';
import SvsInvoice from './Svs-invoice.jpg';
import Navbar from '../../Navbar';

// Register custom fonts for PDF
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
})

// Define styles for PDF
const styles = StyleSheet.create({
  logo: {
    width: 50, // Adjust width as needed
    height: 50, // Adjust height as needed
    marginBottom: 10,
    justifyContent: 'center',  // Vertically center
    alignItems: 'center',      // Horizontally center
    margin: 0,             // Remove any margin around the container
    padding: 0,
  },
  centeredContainer: {
    flex: 1,                // Take up full available space
    display: 'flex',        // Use flexbox
    justifyContent: 'center',  // Vertically center
    alignItems: 'center',      // Horizontally center
    margin: 0,             // Remove any margin around the container
    padding: 0,    // Horizontally centers content
  },
  page: {
    fontFamily: 'Roboto',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'left',
    color: 'rgb(44, 62, 80)',
  },
  subHeader: {
    fontSize: 14,
    marginTop: 3,
    marginBottom: 3,
    textAlign: 'left',
    color: 'rgb(52, 73, 94)',
  },
  schoolInfo: {
    fontSize: 10,
    marginBottom: 20,
    textAlign: 'left',
    color: 'rgb(52, 73, 94)',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(189, 195, 199)',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: 'rgb(41, 128, 185)',
  },
  tableHeaderCell: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  total: {
    fontSize: 8,
  },
  tableCell: {
    margin: 5,
    fontSize: 6,

  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'rgb(41, 128, 185)',
  },
})

// Define table columns
const columns = [
  { label: 'Student', property: 'student_id', width: '10%' },
  { label: 'Date', property: 'date', width: '10%' },
  { label: 'Invoice No', property: 'invoice_no', width: '15%' },
  { label: 'Type', property: 'type', width: '10%' },
  { label: 'Invoice Amount', property: 'invoice_amount', width: '12%' },
  { label: 'Receipt Amount', property: 'receipt_amount', width: '12%' },
  { label: 'Dues', property: 'dues', width: '8%' },
  { label: 'Excess', property: 'excess', width: '8%' },
  { label: 'Sponsor/ Parent', property: 'sponsor_or_parent', width: '15%' },
]

// Create PDF Document component
const MyDocument = ({ filteredHostelResultsd, filteredSchoolResultsd }) => {
  const hostelInvoiceTotal = filteredHostelResultsd?.reduce(
    (sum, item) => sum + (parseFloat(item.invoice_amount) || 0),
    0
  );
  const hostelReceiptTotal = filteredHostelResultsd?.reduce(
    (sum, item) => sum + (parseFloat(item.receipt_amount) || 0),
    0
  );
  // Calculate totals for filteredSchoolResultsd
  const schoolInvoiceTotal = filteredSchoolResultsd?.reduce(
    (sum, item) => sum + (parseFloat(item.invoice_amount) || 0),
    0
  );
  const schoolReceiptTotal = filteredSchoolResultsd?.reduce(
    (sum, item) => sum + (parseFloat(item.receipt_amount) || 0),
    0
  );
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image source={SvsInvoice} style={styles.logo} />
      <Text style={styles.subHeader}>Santhosha Vidhyalaya</Text>
      <Text style={styles.schoolInfo}>
        Dohnavur Fellowship, Dohnavur – 627102, Tirunelveli District, Tamil Nadu{'\n'}
        Mobile – +91 80125 12145, Email – finance@santhoshavidhayalaya.com
      </Text>
      <Text style={styles.header}>Student Ledger</Text>

      {filteredHostelResultsd && filteredHostelResultsd.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Hostel Ledger</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              {columns.map((column) => (
                <View key={column.property} style={{ width: column.width }}>
                  <Text style={styles.tableHeaderCell}>{column.label}</Text>
                </View>
              ))}
            </View>
            {filteredHostelResultsd.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                {columns.map((column) => (
                  <View key={column.property} style={{ width: column.width }}>
                    <Text style={styles.tableCell}>{item[column.property]}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
          <Text style={styles.total}>
            Total Invoice Amount: Rs. {hostelInvoiceTotal.toFixed(2)}{'\n'}
            Total Receipt Amount: Rs. {hostelReceiptTotal.toFixed(2)}
          </Text>
        </>
      )}

      {filteredSchoolResultsd && filteredSchoolResultsd.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>School Ledger</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              {columns.map((column) => (
                <View key={column.property} style={{ width: column.width }}>
                  <Text style={styles.tableHeaderCell}>{column.label}</Text>
                </View>
              ))}
            </View>
            {filteredSchoolResultsd.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                {columns.map((column) => (
                  <View key={column.property} style={{ width: column.width }}>
                    <Text style={styles.tableCell}>{item[column.property]}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
          <Text style={styles.total}>
            Total Invoice Amount: Rs. {schoolInvoiceTotal.toFixed(2)}{'\n'}
            Total Receipt Amount: Rs. {schoolReceiptTotal.toFixed(2)}
          </Text>
        </>
      )}
    </Page>
  </Document>
  );
};

const Stu_Spo_Report = () => {
  // const [filteredHostelResultsd, setFilteredHostelResultsd] = useState([])
  // const [filteredSchoolResultsd, setFilteredSchoolResultsd] = useState([])
  // const [fromDate, setFromDate] = useState(null)
  // const [toDate, setToDate] = useState(null)
  // const [selectedOptionsReciptInvoice, setSelectedOptionsReciptInvoice] = useState({})
  // const [open, setOpen] = useState(false)
  // const [snackMessage, setSnackMessage] = useState('')
  const componentRef = useRef()
  // const datefInputRef = useRef(null)
  // const datetInputRef = useRef(null)


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
const [filteredHostelResultsd, setFilteredHostelResultsd] = useState([]);
const [filteredSchoolResultsd, setFilteredSchoolResultsd] = useState([]);
const datefInputRef = useRef(null);
  const datetInputRef = useRef(null);
  

  const userId = sessionStorage.getItem('user_id')
  const userType = sessionStorage.getItem('user_type')

  useEffect(() => {
    // Initialize DataTables
    if ($.fn.DataTable.isDataTable('#ThirdStandardFeeTable3')) {
      $('#ThirdStandardFeeTable3').DataTable().destroy()
    }
    if ($.fn.DataTable.isDataTable('#ThirdStandardFeeTable3H')) {
      $('#ThirdStandardFeeTable3H').DataTable().destroy()
    }
  }, [])

  const handleClear = () => {
    setFilteredHostelResultsd([])
    setFilteredSchoolResultsd([])
    setFromDate(null)
    setToDate(null)
    setSelectedOptionsReciptInvoice({})
    if (datefInputRef.current) datefInputRef.current.value = ""
    if (datetInputRef.current) datetInputRef.current.value = ""
    $('#ThirdStandardFeeTable3').DataTable().clear().destroy()
    $('#ThirdStandardFeeTable3H').DataTable().clear().destroy()
  }

  const handleFilter = async () => {
   
        console.log(userId, typeof userId);
        console.log(userType, typeof userType );
      
        try {
             // Reset state
             setFilteredHostelResultsd([]);  // Reset hostel results
             setFilteredSchoolResultsd([]);  // Reset school results
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
                  // dataItem.invoice.roll_no
              ]
              .filter(Boolean) // Remove any undefined or empty values
              .join(', '); // Join with ' | ' as the separator
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
                    // receiptItem.student?.roll_no ?? dataItem.invoice.roll_no
                ]
                .filter(Boolean) // Remove any undefined or empty values
                .join(', '); // Join with ' | ' as the separator
                
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
    setFilteredHostelResultsd(filteredHostelResults);
    setFilteredSchoolResultsd(filteredSchoolResults);
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
            paging: false, 
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
                  data: null,  // Use `null` since there's no data property for index
                  className: 'text-dark',
                  render: function (data, type, row, meta) {
                    return meta.row + 1; // Row index starts at 1
                  },
                  createdCell: function (td) {
                    $(td).css({
                      'font-family': '"Roboto", sans-serif',  // Use a professional font (Roboto)
                      'font-size': '14px',  // Standard font size
                      'font-weight': '400',  // Normal font weight
                      'white-space': 'normal',  // Ensure wrapping of long text
                      'word-wrap': 'break-word',  // Break words properly
                      'overflow-wrap': 'break-word',  // Break long words if necessary
                      'text-align': 'center',  // Center text for consistency
                      'padding': '12px 20px',  // Add consistent padding for readability
                    });
                  },
                },
                {
                  data: 'student_id',
                  className: 'text-dark',
                  createdCell: function (td) {
                    $(td).css({
                      'font-family': '"Roboto", sans-serif',  // Use a professional font (Roboto)
                      'font-size': '14px',
                      'font-weight': '400',
                      'white-space': 'normal',
                      'word-wrap': 'break-word',
                      'overflow-wrap': 'break-word',
                      'padding': '12px 20px',
                    });
                  },
                },
                {
                  data: 'date',
                  className: 'text-dark',
                  createdCell: function (td) {
                    $(td).css({
                      'font-family': '"Roboto", sans-serif',
                      'font-size': '14px',
                      'font-weight': '400',
                      'white-space': 'normal',
                      'word-wrap': 'break-word',
                      'overflow-wrap': 'break-word',
                      'padding': '12px 20px',
                    });
                  },
                },
                {
                  data: 'invoice_no',
                  className: 'text-dark',
                  createdCell: function (td) {
                    $(td).css({
                      'font-family': '"Roboto", sans-serif',
                      'font-size': '12px',  // Slightly smaller font for invoice number
                      'font-weight': '500',  // Slightly bold for invoice number
                      'white-space': 'normal',
                      'word-wrap': 'break-word',
                      'overflow-wrap': 'break-word',
                      'padding': '12px 20px',
                    });
                  },
                },
                {
                  data: 'type',
                  className: 'text-dark',
                  createdCell: function (td) {
                    $(td).css({
                      'font-family': '"Roboto", sans-serif',
                      'font-size': '14px',
                      'font-weight': '400',
                      'white-space': 'normal',
                      'word-wrap': 'break-word',
                      'overflow-wrap': 'break-word',
                      'padding': '12px 20px',
                    });
                  },
                },
                {
                  data: 'invoice_amount',
                  className: 'text-dark',
                  createdCell: function (td) {
                    $(td).css({
                      'font-family': '"Roboto", sans-serif',
                      'font-size': '14px',
                      'font-weight': '500',  // Slightly bold for important numbers
                      'white-space': 'normal',
                      'word-wrap': 'break-word',
                      'overflow-wrap': 'break-word',
                      'padding': '12px 20px',
                      'text-align': 'right',  // Align numbers to the right for readability
                    });
                  },
                },
                {
                  data: 'receipt_amount',
                  className: 'text-dark',
                  createdCell: function (td) {
                    $(td).css({
                      'font-family': '"Roboto", sans-serif',
                      'font-size': '14px',
                      'font-weight': '500',
                      'white-space': 'normal',
                      'word-wrap': 'break-word',
                      'overflow-wrap': 'break-word',
                      'padding': '12px 20px',
                      'text-align': 'right',  // Right align receipt amounts
                    });
                  },
                },
                {
                  data: 'dues',
                  className: 'text-dark',
                  createdCell: function (td) {
                    $(td).css({
                      'font-family': '"Roboto", sans-serif',
                      'font-size': '14px',
                      'font-weight': '400',
                      'white-space': 'normal',
                      'word-wrap': 'break-word',
                      'overflow-wrap': 'break-word',
                      'padding': '12px 20px',
                      'text-align': 'right',  // Align dues to the right for consistency
                    });
                  },
                },
                {
                  data: 'excess',
                  className: 'text-dark',
                  createdCell: function (td) {
                    $(td).css({
                      'font-family': '"Roboto", sans-serif',
                      'font-size': '14px',
                      'font-weight': '400',
                      'white-space': 'normal',
                      'word-wrap': 'break-word',
                      'overflow-wrap': 'break-word',
                      'padding': '12px 20px',
                      'text-align': 'right',
                    });
                  },
                },
                {
                  data: 'sponsor_or_parent',
                  className: 'text-dark',
                  createdCell: function (td) {
                    $(td).css({
                      'font-family': '"Roboto", sans-serif',
                      'font-size': '14px',
                      'font-weight': '400',
                      'white-space': 'normal',
                      'word-wrap': 'break-word',
                      'overflow-wrap': 'break-word',
                      'padding': '12px 20px',
                      'text-align': 'center',  // Center-align sponsor/parent details
                    });
                  },
                },
                
                  ],
            order: [[1, 'asc']],
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
              paging: false, 
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
                data: null,  // Use `null` since there's no data property for index
                className: 'text-dark',
                render: function (data, type, row, meta) {
                  return meta.row + 1; // Row index starts at 1
                },
                createdCell: function (td) {
                  $(td).css({
                    'font-family': '"Roboto", sans-serif',  // Use a professional font (Roboto)
                    'font-size': '14px',  // Standard font size
                    'font-weight': '400',  // Normal font weight
                    'white-space': 'normal',  // Ensure wrapping of long text
                    'word-wrap': 'break-word',  // Break words properly
                    'overflow-wrap': 'break-word',  // Break long words if necessary
                    'text-align': 'center',  // Center text for consistency
                    'padding': '12px 20px',  // Add consistent padding for readability
                  });
                },
              },
              {
                data: 'student_id',
                className: 'text-dark',
                createdCell: function (td) {
                  $(td).css({
                    'font-family': '"Roboto", sans-serif',  // Use a professional font (Roboto)
                    'font-size': '14px',
                    'font-weight': '400',
                    'white-space': 'normal',
                    'word-wrap': 'break-word',
                    'overflow-wrap': 'break-word',
                    'padding': '12px 20px',
                  });
                },
              },
              {
                data: 'date',
                className: 'text-dark',
                createdCell: function (td) {
                  $(td).css({
                    'font-family': '"Roboto", sans-serif',
                    'font-size': '14px',
                    'font-weight': '400',
                    'white-space': 'normal',
                    'word-wrap': 'break-word',
                    'overflow-wrap': 'break-word',
                    'padding': '12px 20px',
                  });
                },
              },
              {
                data: 'invoice_no',
                className: 'text-dark',
                createdCell: function (td) {
                  $(td).css({
                    'font-family': '"Roboto", sans-serif',
                    'font-size': '12px',  // Slightly smaller font for invoice number
                    'font-weight': '500',  // Slightly bold for invoice number
                    'white-space': 'normal',
                    'word-wrap': 'break-word',
                    'overflow-wrap': 'break-word',
                    'padding': '12px 20px',
                  });
                },
              },
              {
                data: 'type',
                className: 'text-dark',
                createdCell: function (td) {
                  $(td).css({
                    'font-family': '"Roboto", sans-serif',
                    'font-size': '14px',
                    'font-weight': '400',
                    'white-space': 'normal',
                    'word-wrap': 'break-word',
                    'overflow-wrap': 'break-word',
                    'padding': '12px 20px',
                  });
                },
              },
              {
                data: 'invoice_amount',
                className: 'text-dark',
                createdCell: function (td) {
                  $(td).css({
                    'font-family': '"Roboto", sans-serif',
                    'font-size': '14px',
                    'font-weight': '500',  // Slightly bold for important numbers
                    'white-space': 'normal',
                    'word-wrap': 'break-word',
                    'overflow-wrap': 'break-word',
                    'padding': '12px 20px',
                    'text-align': 'right',  // Align numbers to the right for readability
                  });
                },
              },
              {
                data: 'receipt_amount',
                className: 'text-dark',
                createdCell: function (td) {
                  $(td).css({
                    'font-family': '"Roboto", sans-serif',
                    'font-size': '14px',
                    'font-weight': '500',
                    'white-space': 'normal',
                    'word-wrap': 'break-word',
                    'overflow-wrap': 'break-word',
                    'padding': '12px 20px',
                    'text-align': 'right',  // Right align receipt amounts
                  });
                },
              },
              {
                data: 'dues',
                className: 'text-dark',
                createdCell: function (td) {
                  $(td).css({
                    'font-family': '"Roboto", sans-serif',
                    'font-size': '14px',
                    'font-weight': '400',
                    'white-space': 'normal',
                    'word-wrap': 'break-word',
                    'overflow-wrap': 'break-word',
                    'padding': '12px 20px',
                    'text-align': 'right',  // Align dues to the right for consistency
                  });
                },
              },
              {
                data: 'excess',
                className: 'text-dark',
                createdCell: function (td) {
                  $(td).css({
                    'font-family': '"Roboto", sans-serif',
                    'font-size': '14px',
                    'font-weight': '400',
                    'white-space': 'normal',
                    'word-wrap': 'break-word',
                    'overflow-wrap': 'break-word',
                    'padding': '12px 20px',
                    'text-align': 'right',
                  });
                },
              },
              {
                data: 'sponsor_or_parent',
                className: 'text-dark',
                createdCell: function (td) {
                  $(td).css({
                    'font-family': '"Roboto", sans-serif',
                    'font-size': '14px',
                    'font-weight': '400',
                    'white-space': 'normal',
                    'word-wrap': 'break-word',
                    'overflow-wrap': 'break-word',
                    'padding': '12px 20px',
                    'text-align': 'center',  // Center-align sponsor/parent details
                  });
                },
              },
              
              
                ],
            order: [[1, 'asc']],
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
    setSnackMessage(message)
    setOpen(true)
  }

  const handleToastClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: '100vw' }}>
          <Paper>
            <Typography variant="h5" component="h1" align="center" sx={{ fontWeight: 'bold', color: '#000000', textTransform: 'uppercase', py: 2 }}>
              Student Ledger
            </Typography>
          </Paper>

          <Paper sx={{ mt: 3, p: 3 }}>
            <Row className="align-items-center my-3">
              <Col xs={12} sm={12} md={4} className="d-flex mb-2 mb-md-0">
                <Typography className="pe-2">
                  Receipt/Invoice<span style={{ color: 'red' }}>*</span> 
                </Typography>
                <Form.Select
                  name="RecInv"
                  show={selectedOptionsReciptInvoice.show}
                  onChange={(e) =>
                    setSelectedOptionsReciptInvoice({
                      value: e.target.value,
                      show: e.target.options[e.target.selectedIndex].getAttribute('show'),
                    })
                  }
                  style={{ width: '100%' }}
                >
                  <option value="">Select</option>
                  <option value="receipt" show="receipt">Receipt</option>
            <option value="invoice" show="invoice">Invoice</option>
            <option value="invoice" show="both">Both</option>
                </Form.Select>
              </Col>

              <Col xs={12} sm={12} md={4} className="d-flex mb-2 mb-md-0">
                <Typography className="pe-2">From Date<span style={{ color: 'red' }}>*</span></Typography>
                <Form.Control
                  type="date"
                  onChange={(e) => setFromDate(e.target.value)}
                  ref={datefInputRef}
                  style={{ width: '100%' }}
                />
              </Col>

              <Col xs={12} sm={12} md={4} className="d-flex">
                <Typography className="pe-2">To Date<span style={{ color: 'red' }}>*</span></Typography>
                <Form.Control
                  type="date"
                  onChange={(e) => setToDate(e.target.value)}
                  ref={datetInputRef}
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>

            <Row className="my-3">
              <Col xs={12} md={4} className="d-flex justify-content-center justify-content-md-start mb-2 mb-md-0">
                <PDFDownloadLink
                  document={<MyDocument filteredHostelResultsd={filteredHostelResultsd} filteredSchoolResultsd={filteredSchoolResultsd} />}
                  fileName="Student_Ledger.pdf"
                >
                  {({ blob, url, loading, error }) => (
                    <Button variant="contained" disabled={loading}>
                      {loading ? 'Loading document...' : 'Download Ledger'}
                    </Button>
                  )}
                </PDFDownloadLink>
              </Col>

              <Col xs={12} md={4} className="d-flex justify-content-center mb-2 mb-md-0">
                <Button
                  variant="contained"
                  onClick={handleClear}
                  startIcon={<IoCloseSharp />}
                >
                  Clear
                </Button>
              </Col>

              <Col xs={12} md={4} className="d-flex justify-content-center justify-content-md-end">
                <Button
                  variant="contained"
                  onClick={handleFilter}
                  startIcon={<IoSearchOutline />}
                >
                  Submit
                </Button>
              </Col>
            </Row>

            <Paper sx={{
  margin: '20px', 
  padding: '50px',
  display: { xs: 'none', sm: 'block' } // Hide on extra small (mobile) screens, show on small and larger
            }}>
              <div className="container" sx={{ backgroundColor: 'white' }}>
                <div ref={componentRef} className="print-wrapper" style={{ display: 'block', margin: '20px' }}>
                  <div className='-contprintent'>
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
                   
                    <Typography
                      variant="h6" // Use h1, h2, h3, h4, etc. based on your needs
                      component="h6" // HTML element to render
                      style={{ marginBottom: '1px', color: '#333' }} // Customize styles if needed
                    >
                      School Invoice / Receipt Table
                    </Typography>
                    <Table id="ThirdStandardFeeTable3" style={{ borderCollapse: 'collapse', padding: '18px', border: 'none', backgroundColor: '#ffff', borderRadius: '8px', width: 'auto' ,tableLayout: 'auto'  }}>
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

                    <Typography
                      variant="h6" // Use h1, h2, h3, h4, etc. based on your needs
                      component="h6" // HTML element to render
                      style={{ marginBottom: '1px', color: '#333' }} // Customize styles if needed
                    >
                      Hostel Invoice / Receipt Table
                    </Typography>
                    <Table id="ThirdStandardFeeTable3H" style={{ borderCollapse: 'collapse', padding: '18px', border: 'none', backgroundColor: '#ffff', borderRadius: '8px', width: 'auto',tableLayout: 'auto'  }}>
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
          </Paper>
        </Box>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleToastClose}
        message={snackMessage}
        action={
          <Button color="inherit" size="small" onClick={handleToastClose}>
            Close
          </Button>
        }
      />
    </div>
  )
}

export default Stu_Spo_Report








// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { Card, CardContent, CardActions, Typography, Button, Grid,Paper } from '@mui/material';
// import { MdDownload } from 'react-icons/md';
// import Navbar from '../Navbar';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import SvsInvoice from './Svs-invoice.jpg';
// import schoolImage from './school 1.jpg';
// import hostelImage from './hostel 1.jpg';
//  import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import '../pages/allinvoice.css'
// import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer'

 
// import { TbWorldUpload } from 'react-icons/tb'
// import { IoSearchOutline ,IoCloseSharp} from "react-icons/io5";
// import './table.css'
// import Swal from 'sweetalert2';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Form from 'react-bootstrap/Form';
// import Select from 'react-select';
//  import ReactToPrint from 'react-to-print';
// import { Table, TableHead, TableRow, TableCell, TableBody, TableFooter,Box } from '@mui/material';
// import { Print } from '@mui/icons-material';
// import * as XLSX from 'xlsx';
// import { Snackbar } from '@mui/material';
// import 'react-toastify/dist/ReactToastify.css';


// import './table-styles.css' // Import the custom CSS file
// import ReactDOM from 'react-dom';
// import $ from 'jquery';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'datatables.net-bs5';
// import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
 


// // Register custom fonts
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
//     { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
//     { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
//     { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
//   ],
// })

// // Define styles
// const styles = StyleSheet.create({
//   page: {
//     fontFamily: 'Roboto',
//     fontSize: 11,
//     paddingTop: 30,
//     paddingLeft: 60,
//     paddingRight: 60,
//     paddingBottom: 30,
//   },
//   header: {
//     fontSize: 20,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: 'rgb(44, 62, 80)',
//   },
//   subHeader: {
//     fontSize: 14,
//     marginBottom: 10,
//     textAlign: 'center',
//     color: 'rgb(52, 73, 94)',
//   },
//   schoolInfo: {
//     fontSize: 10,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: 'rgb(52, 73, 94)',
//   },
//   table: {
//     display: 'table',
//     width: 'auto',
//     marginBottom: 10,
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderColor: 'rgb(189, 195, 199)',
//   },
//   tableRow: {
//     margin: 'auto',
//     flexDirection: 'row',
//   },
//   tableHeader: {
//     backgroundColor: 'rgb(41, 128, 185)',
//   },
//   tableHeaderCell: {
//     margin: 5,
//     fontSize: 10,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   tableCell: {
//     margin: 5,
//     fontSize: 9,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     marginTop: 15,
//     marginBottom: 10,
//     fontWeight: 'bold',
//     color: 'rgb(41, 128, 185)',
//   },
// })

// // Define table columns
// const columns = [
//   { label: 'Student ID', property: 'student_id', width: '10%' },
//   { label: 'Date', property: 'date', width: '10%' },
//   { label: 'Invoice No', property: 'invoice_no', width: '15%' },
//   { label: 'Type', property: 'type', width: '10%' },
//   { label: 'Invoice Amount', property: 'invoice_amount', width: '12%' },
//   { label: 'Receipt Amount', property: 'receipt_amount', width: '12%' },
//   { label: 'Dues', property: 'dues', width: '8%' },
//   { label: 'Excess', property: 'excess', width: '8%' },
//   { label: 'Sponsor/ Parent', property: 'sponsor_or_parent', width: '15%' },
// ]

// // Create PDF Document component
// const MyDocument = ({ filteredHostelResultsd, filteredSchoolResultsd }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <Text style={styles.header}>Student Ledger</Text>
//       <Text style={styles.subHeader}>Santhosha Vidhyalaya</Text>
//       <Text style={styles.schoolInfo}>
//         Dohnavur Fellowship, Dohnavur – 627102, Tirunelveli District, Tamil Nadu{'\n'}
//         Mobile – +91 80125 12145, Email – finance@santhoshavidhayalaya.com
//       </Text>

//       {filteredHostelResultsd && filteredHostelResultsd.length > 0 && (
//         <>
//           <Text style={styles.sectionTitle}>Hostel Results</Text>
//           <View style={styles.table}>
//             <View style={[styles.tableRow, styles.tableHeader]}>
//               {columns.map((column) => (
//                 <View key={column.property} style={{ width: column.width }}>
//                   <Text style={styles.tableHeaderCell}>{column.label}</Text>
//                 </View>
//               ))}
//             </View>
//             {filteredHostelResultsd.map((item, index) => (
//               <View key={index} style={styles.tableRow}>
//                 {columns.map((column) => (
//                   <View key={column.property} style={{ width: column.width }}>
//                     <Text style={styles.tableCell}>{item[column.property]}</Text>
//                   </View>
//                 ))}
//               </View>
//             ))}
//           </View>
//         </>
//       )}

//       {filteredSchoolResultsd && filteredSchoolResultsd.length > 0 && (
//         <>
//           <Text style={styles.sectionTitle}>School Results</Text>
//           <View style={styles.table}>
//             <View style={[styles.tableRow, styles.tableHeader]}>
//               {columns.map((column) => (
//                 <View key={column.property} style={{ width: column.width }}>
//                   <Text style={styles.tableHeaderCell}>{column.label}</Text>
//                 </View>
//               ))}
//             </View>
//             {filteredSchoolResultsd.map((item, index) => (
//               <View key={index} style={styles.tableRow}>
//                 {columns.map((column) => (
//                   <View key={column.property} style={{ width: column.width }}>
//                     <Text style={styles.tableCell}>{item[column.property]}</Text>
//                   </View>
//                 ))}
//               </View>
//             ))}
//           </View>
//         </>
//       )}
//     </Page>
//   </Document>
// )


// const InvoiceComponent = () => {
//   const componentRef = useRef();

// const [newInvoiceClass, setNewInvoiceClass] = useState('');

// const [options, setOptions] = useState([]);
// const [selectedOptionsStudent, setSelectedOptionsStudent] = useState([]);
// const [selectedOptionsInvoice, setSelectedOptionsInvoice] = useState([]);
// const [selectedOptionsReciepts, setSelectedOptionsReciepts] = useState([]);
// const [selectedOptionsAdmission, setSelectedOptionsAdmission] = useState([]);
// const [selectedOptionsReciptInvoice, setSelectedOptionsReciptInvoice] = useState([]);
// const [totalAmountsArray, setTotalAmountsArray] = useState([]);
// const [fromDate, setFromDate] = useState(null);
// const [toDate, setToDate] = useState(null); 
// const [Tabledata, setTabledata] = useState([]);
// const [open, setOpen] = useState(false); // State for Snackbar visibility
// const [snackMessage, setSnackMessage] = useState(''); // State for Snackbar message

// const [Studentinfo, setStudentinfo] = useState([]);
// const [Studentinfomas, setStudentinfomas] = useState([]);

//   const [optionsreciepts, setOptionsReciepts] = useState([]);
// const [optionsinvoice, setOptionsInvoice] = useState([]);
// const [optionsAdmission, setOptionsAdmission] = useState([]);
// const [selectedOptionsSponsor, setSelectedOptionsSponsor] = useState([]);
//   const [optionsSponsor, setOptionsSponsor] = useState([]);
// const [filteredHostelResultsd, setfilteredHostelResultsd] = useState([]);
// const [filteredSchoolResultsd, setfilteredSchoolResultsd] = useState([]);
// const datefInputRef = useRef(null);
//   const datetInputRef = useRef(null);
  

//   const userId = sessionStorage.getItem('user_id');
//   const userType = sessionStorage.getItem('user_type');
//   let dataTable;
//   const handleClear = () => {
//     setSelectedOptionsStudent([]);
//     setSelectedOptionsInvoice([]);
//     setSelectedOptionsReciepts([]);
//     setSelectedOptionsAdmission([]);
//     setSelectedOptionsReciptInvoice([]);
//     setNewInvoiceClass([]);
//     setFromDate(null);
//     setToDate(null); 
//     setTabledata([]);
//     setStudentinfo([]);
//     setStudentinfomas([]);
//     setOptionsReciepts([]);
//     setOptionsInvoice([]);
//     setOptionsAdmission([]);
//     setfilteredHostelResultsd([]);  // Reset hostel results
//     setfilteredSchoolResultsd([]);
//     $('#ThirdStandardFeeTable3H').DataTable().clear().destroy();
//     $('#ThirdStandardFeeTable3').DataTable().clear().destroy();
//     setSelectedOptionsSponsor([]);
//     datefInputRef.current.value = ""; 
//     datetInputRef.current.value = ""; 
    

//   };

//   const handleFilter = async () => {
   
//     console.log(userId, typeof userId);
//     console.log(userType, typeof userType );
  
//     try {
//          // Reset state
//     setfilteredHostelResultsd([]);  // Reset hostel results
//     setfilteredSchoolResultsd([]);  // Reset school results
//           let admissionNo;
//           // if (selectedOptionsStudent.value !== undefined && selectedOptionsStudent.value !== null) {
//               admissionNo = selectedOptionsStudent.value ?? null;
//           // } else if (selectedOptionsAdmission.value !== undefined && selectedOptionsAdmission.value !== null) {
//           //     admissionNo = selectedOptionsAdmission.value;
//           // } else {
//           //   Swal.fire({
//           //     icon: "warning",
//           //     title: "No Student/Admission no. Selected",
//           //     text:  "Please Select anyone.",
//           //   });
//           // }
//       if (selectedOptionsReciptInvoice.value == undefined || selectedOptionsReciptInvoice.value == null) {
//         Swal.fire({
//               icon: "warning",
//               title: "Select Invoice / Receipt or Both",
//               text:  "Please Select anyone.",
//             });
//       }
//       const userIdAssignment = userType === 'student' ? 
//   { AdmissionNo: userId } : 
//   { SponsorID: userId };
//           const response = await axios.post(
//               "https://santhoshavidhyalaya.com/SVSTEST/api/StudentLedger",
//               {
//                 ReceiptorInvoice: selectedOptionsReciptInvoice.value,
//                   FromDate: fromDate,
//                   ToDate: toDate,
//                 ...userIdAssignment,
  
//                 }
//           );
    
//           const responseDataH = Array.isArray(response.data.data.H) ? response.data.data.H : [response.data.data.H];
//         const responseDataS = Array.isArray(response.data.data.S) ? response.data.data.S : [response.data.data.S];
//         console.log('1111',responseDataS ,typeof responseDataS);
//         console.log('2222',responseDataH,typeof responseDataH);
//         let studentName;
     
//  let formattedHostelResults = [];
// let formattedSchoolResults = [];
// // if (responseDataH && responseDataH.length > 0) {
// //   studentName = responseDataH[0].student.name;
// // } 
// // // If not, check responseDataS
// // else if (responseDataS && responseDataS.length > 0) {
// //   studentName = responseDataS[0].student.name;
// // } 
// // // If neither are available, handle the case (e.g., set studentName to null or an empty string)
// // else {
// //   studentName = null; // or ''
// // }
// // Function to format receipt data
// function formatReceiptData(receiptItem, student_id, isHostel) {
//     const dateObj = new Date(receiptItem.created_at);
//     const day = dateObj.getDate();
//     const month = dateObj.getMonth() + 1;
//     const year = dateObj.getFullYear();
//     const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;

//     return {
//         student_id: student_id,
//         date: formattedDate,
//         invoice_no: receiptItem.transactionId,
//         type: receiptItem.inv_amt && receiptItem.inv_amt !== '' ? 'Invoice' : 'Receipt',
//         invoice_amount: receiptItem.inv_amt && receiptItem.inv_amt !== '' ? receiptItem.inv_amt : '',
//         receipt_amount: receiptItem.inv_amt && receiptItem.inv_amt === '' || receiptItem.inv_amt === null? receiptItem.amount : '',
//         dues: receiptItem.due_amount,
//         excess: isHostel ? receiptItem.h_excess_amount : receiptItem.s_excess_amount, // Check if it's hostel or school
//         sponsor_or_parent: receiptItem.sponsor && receiptItem.sponsor !== '' || receiptItem.sponsor !== null 
//         ? (receiptItem.sponsor_info ? receiptItem.sponsor_info.name : 'N/A') 
//         : 'parent',
//           };
// }

// // Check if responseDataH is a valid array and process it
// if (Array.isArray(responseDataH) && responseDataH.length > 0) {
//     responseDataH.forEach(dataItem => {
//         // Process all items in receipts for hostel
//         if (Array.isArray(dataItem.receipts)) {
//           dataItem.receipts.forEach(receiptItem => {
//             console.log('receiptItem',receiptItem);
//             let name = [
//               dataItem.invoice.name,
//               dataItem.invoice.standard,
//               // dataItem.invoice.roll_no
//           ]
//           .filter(Boolean) // Remove any undefined or empty values
//           .join('<br></br>'); // Join with ' | ' as the separator
//                       const formattedReceipt = formatReceiptData(receiptItem, name, true); // true for hostel
//                 formattedHostelResults.push(formattedReceipt);
//             });
//         }
//     });
// }

// // Check if responseDataS is a valid array and process it
//       if (Array.isArray(responseDataS) && responseDataS.length > 0) {
//     responseDataS.forEach(dataItem => {
//       console.log('responseDataS',responseDataS);
//       if (Array.isArray(dataItem.receipts)) {
//         console.log('receiptItem',dataItem);

//         console.log('receiptItem',dataItem.invoice.name | dataItem.invoice.standard | dataItem.invoice.roll_no);

//         dataItem.receipts.forEach(receiptItem => {

//               console.log( receiptItem.student?.name ?? studentName);
//               let name = [
//                 receiptItem.student?.name ?? dataItem.invoice.name ,
//                 receiptItem.student?.standard ?? dataItem.invoice.standard,
//                 // receiptItem.student?.roll_no ?? dataItem.invoice.roll_no
//             ]
//             .filter(Boolean) // Remove any undefined or empty values
//             .join('<br></br>'); // Join with ' | ' as the separator
            
//                const formattedReceipt = formatReceiptData(receiptItem, name , false); // true for hostel

//                 formattedSchoolResults.push(formattedReceipt);
//             });
//         }
//     });
// }
// console.log('formattedSchoolResults' ,formattedSchoolResults);

// // Function to filter results based on type
// function filterResults() {
//   const type = selectedOptionsReciptInvoice.show; // Get the current selected filter type
//   let filteredHostelResults = [];
//   let filteredSchoolResults = [];

//   // Filter hostel results based on selected type
//   if (type === 'invoice') {
//       filteredHostelResults = formattedHostelResults.filter(item => item.type === 'Invoice');
//   } else if (type === 'receipt') {
//       filteredHostelResults = formattedHostelResults.filter(item => item.type === 'Receipt');
//   } else { // both or any other case
//       filteredHostelResults = formattedHostelResults;
//   }

//   // Filter school results based on selected type
//   if (type === 'invoice') {
//       filteredSchoolResults = formattedSchoolResults.filter(item => item.type === 'Invoice');
//   } else if (type === 'receipt') {
//       filteredSchoolResults = formattedSchoolResults.filter(item => item.type === 'Receipt');
//   } else { // both or any other case
//       filteredSchoolResults = formattedSchoolResults;
//   }

//   return { filteredHostelResults, filteredSchoolResults };
// }

// // Example usage: Call filterResults whenever the selected option changes
// const { filteredHostelResults, filteredSchoolResults } = filterResults();

// // Log the filtered results
// console.log('Filtered Hostel Results:', filteredHostelResults);
// console.log('Filtered School Results:', filteredSchoolResults);
// setfilteredHostelResultsd(filteredHostelResults);
// setfilteredSchoolResultsd(filteredSchoolResults);
// // Optional: Display results in a table format
// console.table(filteredHostelResults);
//         console.table(filteredSchoolResults); 
// if (Array.isArray(responseDataS) && responseDataS.length > 0  && responseDataS[0] != undefined  && responseDataS[0] != null) {
 
//   initializeDataTable(filteredSchoolResults);
//   setStudentinfo(responseDataS[0].student);
//   setStudentinfomas(responseDataS[0].studentmaster);

// } else {
//   initializeDataTable();

// }

// // Conditionally call initializeDataTableH if responseDataH is a non-empty array
// if (Array.isArray(responseDataH) && responseDataH.length > 0 && responseDataH[0] != undefined  && responseDataH[0] != null) {
//   initializeDataTableH(filteredHostelResults);
 
//   setStudentinfo(responseDataH[0].student);
//   setStudentinfomas(responseDataH[0].studentmaster);
// } else {
//   initializeDataTableH();
// }
     
//         // console.log("user",responseData.data[0].student);
      
// //         setTotalAmountsArray(totalAmountsArray);
// //     // Conditionally call initializeDataTable if responseDataS is a non-empty array
// // if (Array.isArray(responseDataS) && responseDataS.length > 0  && responseDataS[0] != undefined  && responseDataS[0] != null) {
 
// //   initializeDataTable(modifiedResponseS);
// //   setStudentinfo(responseDataS[0].student);
// //   setStudentinfomas(responseDataS[0].studentmaster);

// // } else {
// //   initializeDataTable();

// // }

// // // Conditionally call initializeDataTableH if responseDataH is a non-empty array
// // if (Array.isArray(responseDataH) && responseDataH.length > 0 && responseDataH[0] != undefined  && responseDataH[0] != null) {
// //   initializeDataTableH(modifiedResponseH);
// //   setStudentinfo(responseDataH[0].student);
// //   setStudentinfomas(responseDataH[0].studentmaster);
// // } else {
// //   initializeDataTableH();
// // }

//       } catch (error) {
//           console.error(error);
//       }
//     }
    
//     function initializeDataTable(data) {
//       if ($.fn.DataTable.isDataTable('#ThirdStandardFeeTable3')) {
//         $('#ThirdStandardFeeTable3').DataTable().clear().destroy();
//       }
//       var table = $('#ThirdStandardFeeTable3').DataTable({
//           destroy: true,
//           processing: true,
//           serverSide: false,
//         dom: 'lfBrtip',
//         paging: false, 
//           buttons: [
//               {
//                   extend: 'copy',
//                   className: 'btn btn-success',
//               },
//               {
//                   extend: 'csv',
//                   className: 'btn btn-danger',
//               },
//         ],
//         data: data,
//            columns: [
//              {
//     data: null,         // Use `null` since there's no data property for index
//     className: 'text-dark',
//     render: function (data, type, row, meta) {
//       return meta.row + 1;   // meta.row gives the row index (zero-based), so add 1 for 1-based indexing
//     },createdCell: function (td) {
//       $(td).css({
//           'white-space': 'normal',
//           'word-wrap': 'break-word',
//           'overflow-wrap': 'break-word'
//       });
//   }
//   },
//             { data: 'student_id', className: 'text-dark',createdCell: function (td) {
//               $(td).css({
//                   'white-space': 'normal',
//                   'word-wrap': 'break-word',
//                   'overflow-wrap': 'break-word'
//               });
//           } },
//             { data: 'date', className: 'text-dark' ,createdCell: function (td) {
//               $(td).css({
//                   'white-space': 'normal',
//                   'word-wrap': 'break-word',
//                   'overflow-wrap': 'break-word'
//               });
//           }},
//             { data: 'invoice_no', className: 'text-dark',createdCell: function (td) {
//               $(td).css({
//                   'white-space': 'normal',
//                   'word-wrap': 'break-word',
//                   'overflow-wrap': 'break-word'
//               });
//           } },
//             { data: 'type', className: 'text-dark' },
//             { data: 'invoice_amount', className: 'text-dark',createdCell: function (td) {
//               $(td).css({
//                   'white-space': 'normal',
//                   'word-wrap': 'break-word',
//                   'overflow-wrap': 'break-word'
//               });
//           } },
//             { data: 'receipt_amount', className: 'text-dark',createdCell: function (td) {
//               $(td).css({
//                   'white-space': 'normal',
//                   'word-wrap': 'break-word',
//                   'overflow-wrap': 'break-word'
//               });
//           } },
//             { data: 'dues', className: 'text-dark' ,createdCell: function (td) {
//               $(td).css({
//                   'white-space': 'normal',
//                   'word-wrap': 'break-word',
//                   'overflow-wrap': 'break-word'
//               });
//           }},
//             { data: 'excess', className: 'text-dark' ,createdCell: function (td) {
//               $(td).css({
//                   'white-space': 'normal',
//                   'word-wrap': 'break-word',
//                   'overflow-wrap': 'break-word'
//               });
//           }},
//             { data: 'sponsor_or_parent', className: 'text-dark',createdCell: function (td) {
//               $(td).css({
//                   'white-space': 'normal',
//                   'word-wrap': 'break-word',
//                   'overflow-wrap': 'break-word'
//               });
//           } },
            
//               ],
//         order: [[1, 'asc']],
//         footerCallback: function (row, data, start, end, display) {
//           var api = this.api();
  
//           // Helper function to sum a column
//           var intVal = function (i) {
//               return typeof i === 'string' ?
//                   i.replace(/[\$,]/g, '') * 1 :
//                   typeof i === 'number' ?
//                       i : 0;
//           };
  
//           // Calculate totals for each column
         
  
//           var totalIamount = api
//               .column(5, { page: 'current' })
//               .data()
//               .reduce(function (a, b) {
//                   return intVal(a) + intVal(b);
//               }, 0);
  
//           var totalRamount = api
//               .column(6, { page: 'current' })
//               .data()
//               .reduce(function (a, b) {
//                   return intVal(a) + intVal(b);
//               }, 0);
//               // var totalDamount = api
//               // .column(7, { page: 'current' })
//               // .data()
//               // .reduce(function (a, b) {
//               //     return intVal(a) + intVal(b);
//               // }, 0);
//               // var totalEamount = api
//               // .column(8, { page: 'current' })
//               // .data()
//               // .reduce(function (a, b) {
//               //     return intVal(a) + intVal(b);
//               // }, 0);
//           // Update the footer with the totals
//           $(api.column(0).footer()).html('<span>-</span>');
//           $(api.column(1).footer()).html('<span>-</span>');
//           $(api.column(2).footer()).html('<span>-</span>');
//           $(api.column(3).footer()).html('<span>-</span>');
//           $(api.column(4).footer()).html('<span>-</span>');
//           $(api.column(5).footer()).html(totalIamount.toFixed(2));
//           $(api.column(6).footer()).html(totalRamount.toFixed(2));
//           $(api.column(7).footer()).html('<span>-</span>');
//           $(api.column(8).footer()).html('<span>-</span>');
//       }
    
//            });
//     }
    
//     function initializeDataTableH(data) {
//       if ($.fn.DataTable.isDataTable('#ThirdStandardFeeTable3H')) {
//         $('#ThirdStandardFeeTable3H').DataTable().clear().destroy();
//       }
//       var table = $('#ThirdStandardFeeTable3H').DataTable({
//           destroy: true,
//           processing: true,
//           serverSide: false,
//           dom: 'lfBrtip',
//           paging: false, 
//           buttons: [
//               {
//                   extend: 'copy',
//                   className: 'btn btn-success',
//               },
//               {
//                   extend: 'csv',
//                   className: 'btn btn-danger',
//               },
//         ],
//         data: data,
//         columns: [
//            {
//     data: null,         // Use `null` since there's no data property for index
//     className: 'text-dark',
//     render: function (data, type, row, meta) {
//       return meta.row + 1;   // meta.row gives the row index (zero-based), so add 1 for 1-based indexing
//             },
//             createdCell: function (td) {
//               $(td).css({
//                   'white-space': 'normal',
//                   'word-wrap': 'break-word',
//                   'overflow-wrap': 'break-word'
//               });
//           }
//   },
//           { data: 'student_id', className: 'text-dark',createdCell: function (td) {
//             $(td).css({
//                 'white-space': 'normal',
//                 'word-wrap': 'break-word',
//                 'overflow-wrap': 'break-word'
//             });
//         } },
//           { data: 'date', className: 'text-dark',createdCell: function (td) {
//             $(td).css({
//                 'white-space': 'normal',
//                 'word-wrap': 'break-word',
//                 'overflow-wrap': 'break-word'
//             });
//         } },
//           { data: 'invoice_no', className: 'text-dark',createdCell: function (td) {
//             $(td).css({
//                 'white-space': 'normal',
//                 'word-wrap': 'break-word',
//                 'overflow-wrap': 'break-word'
//             });
//         } },
//           { data: 'type', className: 'text-dark',createdCell: function (td) {
//             $(td).css({
//                 'white-space': 'normal',
//                 'word-wrap': 'break-word',
//                 'overflow-wrap': 'break-word'
//             });
//         } },
//           { data: 'invoice_amount', className: 'text-dark',createdCell: function (td) {
//             $(td).css({
//                 'white-space': 'normal',
//                 'word-wrap': 'break-word',
//                 'overflow-wrap': 'break-word'
//             });
//         } },
//           { data: 'receipt_amount', className: 'text-dark',createdCell: function (td) {
//             $(td).css({
//                 'white-space': 'normal',
//                 'word-wrap': 'break-word',
//                 'overflow-wrap': 'break-word'
//             });
//         } },
//           { data: 'dues', className: 'text-dark',createdCell: function (td) {
//             $(td).css({
//                 'white-space': 'normal',
//                 'word-wrap': 'break-word',
//                 'overflow-wrap': 'break-word'
//             });
//         } },
//           { data: 'excess', className: 'text-dark',createdCell: function (td) {
//             $(td).css({
//                 'white-space': 'normal',
//                 'word-wrap': 'break-word',
//                 'overflow-wrap': 'break-word'
//             });
//         } },
//           { data: 'sponsor_or_parent', className: 'text-dark' ,createdCell: function (td) {
//             $(td).css({
//                 'white-space': 'normal',
//                 'word-wrap': 'break-word',
//                 'overflow-wrap': 'break-word'
//             });
//         }},
          
//             ],
//         order: [[1, 'asc']],
//         footerCallback: function (row, data, start, end, display) {
//           var api = this.api();
  
//           // Helper function to sum a column
//           var intVal = function (i) {
//               return typeof i === 'string' ?
//                   i.replace(/[\$,]/g, '') * 1 :
//                   typeof i === 'number' ?
//                       i : 0;
//           };
  
//           // Calculate totals for each column
         
//           var totalIamount = api
//               .column(5, { page: 'current' })
//               .data()
//               .reduce(function (a, b) {
//                   return intVal(a) + intVal(b);
//               }, 0);
  
//           var totalRamount = api
//               .column(6, { page: 'current' })
//               .data()
//               .reduce(function (a, b) {
//                   return intVal(a) + intVal(b);
//               }, 0);
//               // var totalDamount = api
//               // .column(7, { page: 'current' })
//               // .data()
//               // .reduce(function (a, b) {
//               //     return intVal(a) + intVal(b);
//               // }, 0);
//               // var totalEamount = api
//               // .column(8, { page: 'current' })
//               // .data()
//               // .reduce(function (a, b) {
//               //     return intVal(a) + intVal(b);
//               // }, 0);
//               $(api.column(0).footer()).html('<span>-</span>');
//               $(api.column(1).footer()).html('<span>-</span>');
//               $(api.column(2).footer()).html('<span>-</span>');
//               $(api.column(3).footer()).html('<span>-</span>');
//               $(api.column(4).footer()).html('<span>-</span>');
//               $(api.column(5).footer()).html(totalIamount.toFixed(2));
//               $(api.column(6).footer()).html(totalRamount.toFixed(2));
//               $(api.column(7).footer()).html('<span>-</span>');
//               $(api.column(8).footer()).html('<span>-</span>');
//       }
    
//            });
//     }

  
  
  
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
//     // alert(selectedOptions.value);
//     setSelectedOptionsAdmission(selectedOptions);

//   };
//   //
//   const handleSelectChangeSponsor = (selectedOptions) => {
//     setSelectedOptionsSponsor(selectedOptions);
//   }; 
  
 
//   const handleToastOpen = (message) => {
//       setSnackMessage(message); // Set the message
//       setOpen(true); // Open the Snackbar
//   };

//   const handleToastClose = () => {
//       setOpen(false); // Close the Snackbar
//   };
// //   const handleDownloadExcel = () => {
// //     // Ensure the data is defined before proceeding
// //     if (!filteredHostelResultsd || !Array.isArray(filteredHostelResultsd) || filteredHostelResultsd.length === 0 || 
// //     !filteredSchoolResultsd || !Array.isArray(filteredSchoolResultsd) || filteredSchoolResultsd.length === 0) {
    
// //       handleToastOpen("Data is not available"); // Show a toast notification
// //       return;
// // }

// //     // Create a new workbook
// //     const workbook = XLSX.utils.book_new();

// //     // Define custom headers for both sections
// //     const hostelTitle = [['Hostel Results']];
// //     const hostelHeaders = [['Student ID', 'Date', 'Invoice No', 'Type', 'Invoice Amount', 'Receipt Amount', 'Dues', 'Excess', 'Sponsor/ Parent']];
// //     const schoolHeaders = [['Student ID', 'Date', 'Invoice No', 'Type', 'Invoice Amount', 'Receipt Amount', 'Dues', 'Excess', 'Sponsor/ Parent']];
// //     const schoolTitle = [['School Results']];

// //     // Convert hostel data to a format compatible with Excel and include custom headers
// //     const hostelData = filteredHostelResultsd.map(item => [
// //         item.student_id,
// //         item.date,
// //         item.invoice_no,
// //         item.type,
// //         item.invoice_amount,
// //         item.receipt_amount,
// //         item.dues,
// //         item.excess,
// //         item.sponsor_or_parent
// //     ]);

// //     // Convert school data to a format compatible with Excel and include custom headers
// //     const schoolData = filteredSchoolResultsd.map(item => [
// //         item.student_id,
// //         item.date,
// //         item.invoice_no,
// //         item.type,
// //         item.invoice_amount,
// //         item.receipt_amount,
// //         item.dues,
// //         item.excess,
// //         item.sponsor_or_parent
// //     ]);

// //     const combinedData = [
// //       ...hostelTitle,   // Add hostel title
// //       [],               // Add an empty row for spacing
// //       ...hostelHeaders, // Add hostel headers
// //       ...hostelData,    // Add hostel data
// //       [],               // Add an empty row for spacing
// //       ...schoolTitle,   // Add school title
// //       [],               // Add an empty row for spacing
// //       ...schoolHeaders, // Add school headers
// //       ...schoolData     // Add school data
// //   ];


// //     // Convert the combined data back to a worksheet
// //     const worksheet = XLSX.utils.aoa_to_sheet(combinedData);

// //     // Append the worksheet to the workbook
// //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');

// //     // Download the workbook
// //     XLSX.writeFile(workbook, 'Hostel_and_Other_Results.xlsx');
// // };




//   // const handleDownloadExcel = () => {
//   //   if (
//   //     (!filteredHostelResultsd || filteredHostelResultsd.length === 0) &&
//   //     (!filteredSchoolResultsd || filteredSchoolResultsd.length === 0)
//   //   ) {
//   //     handleToastOpen("Data is not available")
//   //     return
//   //   }

//   //   const doc = new jsPDF()

//   //   // Add logo and header to each page
//   //   const addHeader = (doc) => {
//   //     // doc.addImage(logoUrl, 'PNG', 10, 10, 20, 20)
//   //     doc.setFont('helvetica', 'bold')
//   //     doc.setFontSize(20)
//   //     doc.setTextColor(44, 62, 80) // Dark blue color
//   //     doc.text('Student Ledger', 105, 20, null, null, 'center')
//   //     doc.setFont('helvetica', 'normal')
//   //     doc.setFontSize(10)
//   //     doc.setTextColor(52, 73, 94) // Slightly lighter blue
//   //     doc.text('Santhosha Vidhyalaya', 105, 28, null, null, 'center')
//   //     doc.setFontSize(8)
//   //     doc.text('Dohnavur Fellowship, Dohnavur – 627102, Tirunelveli District, Tamil Nadu', 105, 33, null, null, 'center')
//   //     doc.text('Mobile – +91 80125 12145, Email – finance@santhoshavidhayalaya.com', 105, 38, null, null, 'center')
//   //     doc.setDrawColor(52, 152, 219) // Blue line color
//   //     doc.setLineWidth(0.5)
//   //     doc.line(10, 42, 200, 42) // Horizontal line below header
//   //   }

//   //   // Add header to the first page
//   //   addHeader(doc)

//   //   // Table headers
//   //   const headers = [
//   //     'Student ID', 'Date', 'Invoice No', 'Type', 'Invoice Amount',
//   //     'Receipt Amount', 'Dues', 'Excess', 'Sponsor/ Parent'
//   //   ]

//   //   // Options for autoTable
//   //   const options = {
//   //     startY: 50,
//   //     head: [headers],
//   //     body: [],
//   //     didDrawPage: function (data) {
//   //       // Add header to each new page
//   //       if (data.pageCount > 1) {
//   //         doc.setPage(data.pageCount)
//   //         addHeader(doc)
//   //         data.settings.startY = 50 // Adjust startY for content after header
//   //       }
//   //     },
//   //     columnStyles: {
//   //       0: { cellWidth: 20 },
//   //       1: { cellWidth: 20 },
//   //       2: { cellWidth: 25 },
//   //       3: { cellWidth: 15 },
//   //       4: { cellWidth: 20 },
//   //       5: { cellWidth: 20 },
//   //       6: { cellWidth: 15 },
//   //       7: { cellWidth: 15 },
//   //       8: { cellWidth: 30 }
//   //     },
//   //     styles: {
//   //       cellPadding: 2,
//   //       fontSize: 8,
//   //       lineColor: [189, 195, 199], // Light gray for cell borders
//   //       lineWidth: 0.1,
//   //     },
//   //     headStyles: {
//   //       fillColor: [41, 128, 185], // Blue header background
//   //       textColor: 255, // White text for header
//   //       fontStyle: 'bold',
//   //       halign: 'center',
//   //     },
//   //     alternateRowStyles: {
//   //       fillColor: [240, 248, 255], // Light blue for alternate rows
//   //     },
//   //     bodyStyles: {
//   //       textColor: 44, // Dark text for body
//   //     }
//   //   }

//   //   // Function to add a table for a specific dataset
//   //   const addTable = (data, title) => {
//   //     if (data && data.length > 0) {
//   //       doc.setFont('helvetica', 'bold')
//   //       doc.setFontSize(14)
//   //       doc.setTextColor(41, 128, 185) // Blue color for section titles
//   //       doc.text(title, 105, options.startY - 8, null, null, 'center')
//   //       doc.autoTable({
//   //         ...options,
//   //         body: data.map(item => [
//   //           item.student_id,
//   //           item.date,
//   //           item.invoice_no,
//   //           item.type,
//   //           item.invoice_amount,
//   //           item.receipt_amount,
//   //           item.dues,
//   //           item.excess,
//   //           item.sponsor_or_parent
//   //         ])
//   //       })
//   //       options.startY = doc.lastAutoTable.finalY + 15
//   //     }
//   //   }

//   //   // Add Hostel Results table
//   //   addTable(filteredHostelResultsd, 'Hostel Results')

//   //   // Add School Results table
//   //   addTable(filteredSchoolResultsd, 'School Results')

//   //   // Add footer
//   //   const pageCount = doc.internal.getNumberOfPages()
//   //   for (let i = 1; i <= pageCount; i++) {
//   //     doc.setPage(i)
//   //     doc.setFontSize(8)
//   //     doc.setTextColor(128)
//   //     doc.text(`Page ${i} of ${pageCount}`, 105, 290, null, null, 'center')
//   //   }

//   //   // Save the PDF
//   //   doc.save('Student_Ledger.pdf')
//   // }
//   const handleGeneratePDF = () => {
//     if (
//       (!filteredHostelResultsd || filteredHostelResultsd.length === 0) &&
//       (!filteredSchoolResultsd || filteredSchoolResultsd.length === 0)
//     ) {
//       // You can replace this with your own toast/notification system
//       console.error("Data is not available")
//       return
//     }

//   return (
//     <div>
//     <Navbar />
//     <Box height={30} />
//     <Box sx={{ display: 'flex' }}>
//          <Box component="main" sx={{ flexGrow: 1, p: 3 , maxWidth: '100vw'}}>
//       <Paper>
        
//           <Typography
//             variant="h5" // Choose a variant that suits your design
//             component="h1"
//             align="center"
//             sx={{
//               fontWeight: 'bold',
//               color: '#fffff', // Use your preferred color for headings
//               // marginBottom: '20px',
//               textTransform: 'uppercase', // Optional: make it all uppercase
//             }}
//           >
//             Student Ledger
//           </Typography>
//        </Paper>
  
//       <Paper>
//         <div className="pt-4">
//         <Box component="main" sx={{ flexGrow: 1, p: 3 , maxWidth: '100vw'}}>

//               <>
//               <Row className="align-items-center my-3">
//   <Col xs={12} sm={12} md={4} className="d-flex mb-2 mb-md-0">
//     <Typography className="pe-2">
//       Receipt<br />/Invoice<span style={{ color: 'red' }}>*</span> 
//     </Typography>
//     <Form.Select
//       name="RecInv"
//       show={selectedOptionsReciptInvoice.show}
//       onChange={(e) =>
//         setSelectedOptionsReciptInvoice({
//           value: e.target.value,
//           show: e.target.options[e.target.selectedIndex].getAttribute('show'),
//         })
//       }
//       menuPortalTarget={document.body}
//       style={{ width: '100%' }}
//     >
//       <option>Select</option>
//       <option value="receipt" show="receipt">Receipt</option>
//       <option value="invoice" show="invoice">Invoice</option>
//       <option value="invoice" show="both">Both</option>
//     </Form.Select>
//   </Col>

//   <Col xs={12} sm={12} md={4} className="d-flex mb-2 mb-md-0">
//     <Typography className="pe-2">From Date<span style={{ color: 'red' }}>*</span></Typography>
//     <Form.Control
//       type="date"
//       onChange={(e) => setFromDate(e.target.value)}
//       ref={datefInputRef}
//       style={{ width: '100%' }}
//     />
//   </Col>

//   <Col xs={12} sm={12} md={4} className="d-flex">
//     <Typography className="pe-2">To Date<span style={{ color: 'red' }}>*</span></Typography>
//     <Form.Control
//       type="date"
//       onChange={(e) => setToDate(e.target.value)}
//       ref={datetInputRef}
//       style={{ width: '100%' }}
//     />
//   </Col>
// </Row>


// <Row className="my-3">
//   {/* Filter Button */}
//   <Col xs={6} sm={6} md={4} className="d-flex justify-content-center justify-content-md-start mb-2 mb-md-0">
//   <Button variant="contained" onClick={handleDownloadExcel}>
//       Download Ledger
//                       </Button>
//   </Col>

//   {/* Clear Button */}
//   <Col xs={6} sm={6} md={4} className="d-flex justify-content-center mb-2 mb-md-0">
//     <Button
//       variant="contained"
//       className="d-flex align-items-center"
//       style={{
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         border: '1px solid rgba(255, 255, 255, 0.3)',
//         borderRadius: '5px',
//         color: 'black',
//         padding: '10px 20px',
//         transition: 'background-color 0.3s, transform 0.3s',
//         backdropFilter: 'blur(5px)',
//         display: 'flex',
//         alignItems: 'center',
//       }}
//       onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
//       onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
//       onClick={handleClear}
//     >
//       <IoCloseSharp size={20} className="me-2" />
//       <span>Clear</span>
//     </Button>
//   </Col>

//   {/* Download Excel Button */}
//   <Col xs={12} md={4} className="d-flex justify-content-center justify-content-md-end">
   
//                       <Button
//       variant="contained"
//       className="d-flex align-items-center"
//       style={{
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         border: '1px solid rgba(255, 255, 255, 0.3)',
//         borderRadius: '5px',
//         color: 'black',
//         padding: '10px 20px',
//         transition: 'background-color 0.3s, transform 0.3s',
//         backdropFilter: 'blur(5px)',
//         display: 'flex',
//         alignItems: 'center',
//       }}
//       onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
//       onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
//       onClick={handleFilter}
//     >
//       <IoSearchOutline size={20} className="me-2" />
//       <span>Submit</span>
//     </Button>
//   </Col>
// </Row>

//       </>
//         </Box>  
//           <Snackbar
//             open={open}
//             autoHideDuration={3000} // Duration before the toast hides
//             onClose={handleToastClose}
//             message={snackMessage}
//             action={
//               <Button color="inherit" onClick={handleToastClose}>
//                 Close
//               </Button>
//             }
//             className="mt-5"
//             anchorOrigin={{
//               marginTop: '30px',
//               vertical: 'top', // Can still use 'top' or 'bottom' here for default behavior
//               horizontal: 'center', // Center horizontally
//             }}
//           />
//          <div className="container" style={{ width: '100%', maxWidth: '100vw' }}>
//   <div
//     style={{
//       overflowX: 'auto',
//       whiteSpace: 'nowrap',
//       // maxHeight: 'auto', // Adjust height to fit your needs
//       padding: '10px',
//       border: '1px solid #ddd',
//       borderRadius: '8px'
//     }}
//   >
//           {/* <hr className='mb-1' /> */}
//             {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
//             <Paper sx={{ margin: '20px', padding: '50px' }}>
//               <div  className="container" sx={{ backgroundColor: 'white' }}>
//                 <div ref={componentRef} className="print-wrapper" style={{ display: 'block', margin: '20px' }}>
//                   <div className='-contprintent'>
//                     <div className='d-flex'>
//                       <Row>
//                         <Col xs={9} className='pt-4'>
//                           <Typography style={{
//                             backgroundColor: '#0C83DC',
//                             width: '40%',
//                             borderRadius: '0 6px 6px 0px',
//                             textAlign: 'center',
//                             padding: '8px 0',
//                             textTransform: 'uppercase',
//                             color: 'aliceblue',
//                           }}>Student Ledger</Typography>
//                           <div className='pt-3 px-3'>
//                             <h2 style={{ fontFamily: 'sans-serif' }}>Santhosha Vidhyalaya</h2>
//                             <p style={{ fontFamily: 'sans-serif' }}>
//                               Dohnavur Fellowship,<br />
//                               Dohnavur – 627102,<br />
//                               Tirunelveli District, Tamil Nadu<br />
//                               Mobile – +91 80125 12145,<br />
//                               Email – finance@santhoshavidhayalaya.com
//                             </p>
//                           </div>
//                         </Col>
//                         <Col xs={3} className='text-center pt-3'>
//                           <img style={{ width: '60%' }} src={SvsInvoice} alt="Svs Invoice" />
//                         </Col>
//                       </Row>
//                     </div>
//                     <div style={{ padding: '10px' }}>
//                       {/* <ReactToPrint
//                         trigger={() => (
//                           <Button
//                             startIcon={<Print style={{ fontSize: 30 }} />}
//                             variant="contained"
//                             color="primary"
//                             className="printcustom"
//                             style={{ padding: '10px' }}
//                           >
//                             Print
//                           </Button>
//                         )}
//                         content={() => componentRef.current}
//                         onBeforePrint={() => {
//                           const component = componentRef.current;
                        
//                           // Apply styles to the table header and body for wrapping and shrinking
//                           $(component)
//                             .find('#ThirdStandardFeeTable3H')  // Table header
//                             .addClass('compact')
//                             .css({
//                               'font-size': '10px',  // Shrink font size
//                               'color': '#333',      // Set readable text color
//                               'table-layout': 'auto', // Let the table auto-adjust based on content
//                               'width': '100%',      // Ensure the table takes up full width
//                               'border-collapse': 'collapse',  // Collapse borders for neatness
//                               'margin': '0',
//                               'padding': '0',
//                               'overflow': 'hidden',  // Hide overflow outside the page
//                             })
//                             .find('th')  // Apply styles to table headers
//                             .css({
//                               'white-space': 'normal',  // Allow text wrapping
//                               'word-wrap': 'break-word', // Break long words to fit the cell
//                               'overflow-wrap': 'break-word', // Ensure words break when too long
//                             });
                        
//                           $(component)
//                             .find('#ThirdStandardFeeTable3')  // Main table body
//                             .addClass('compact')
//                             .css({
//                               'font-size': '10px',  // Shrink font size
//                               'color': '#333',      // Set readable text color
//                               'table-layout': 'auto', // Auto-adjust based on content
//                               'width': '100%',      // Ensure full width usage
//                               'border-collapse': 'collapse',  // Collapse borders for neatness
//                               'margin': '0',
//                               'padding': '0',
//                               'overflow': 'hidden',  // Hide overflow outside the page
//                             })
//                             .find('td')  // Apply styles to table body cells
//                             .css({
//                               'white-space': 'normal',  // Allow text to wrap within cells
//                               'word-wrap': 'break-word', // Break long words to fit the cell
//                               'overflow-wrap': 'break-word', // Ensure words break when too long
//                             });
                        
//                           $(component)
//                             .find('td, th')  // Apply wrapping to all table cells and headers
//                             .css({
//                               'word-wrap': 'break-word',  // Enable word wrapping
//                               'white-space': 'normal',    // Allow text to wrap inside the cell
//                               'overflow-wrap': 'break-word', // Break long words properly
//                             });
//                         }}
                        
                        
                        
//                       /> */}
//                              <PDFDownloadLink
//         document={<MyDocument filteredHostelResultsd={filteredHostelResultsd} filteredSchoolResultsd={filteredSchoolResultsd} />}
//         fileName="Student_Ledger.pdf"
//       >
//         {({ blob, url, loading, error }) =>
//           loading ? 'Loading document...' : 'Download PDF'
//         }
//       </PDFDownloadLink>
//                     </div>
//                     <Typography
//                       variant="h6" // Use h1, h2, h3, h4, etc. based on your needs
//                       component="h6" // HTML element to render
//                       style={{ marginBottom: '1px', color: '#333' }} // Customize styles if needed
//                     >
//                       School Invoice / Receipt Table
//                     </Typography>
//                     <Table id="ThirdStandardFeeTable3" style={{ borderCollapse: 'collapse', padding: '18px', border: 'none', backgroundColor: '#ffff', borderRadius: '8px', width: 'auto' ,tableLayout: 'auto'  }}>
//                       <TableHead style={{ backgroundColor: '#E6E6E6' }}>
//                         <TableRow>
//                           <TableCell style={{ fontWeight: 'bold', Width: '7px' }}>S.No</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Student Name</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Invoice/Receipt No:</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Type</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Invoice<br /> /Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Receipt<br /> /Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Dues Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Excess Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Sponsor/Parent</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableFooter>
//                         <TableRow>
//                           <TableCell style={{ fontWeight: 'bold', Width: '7px' }}>S.No</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Student Name</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Invoice/Receipt No:</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Type</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Invoice<br /> /Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Receipt<br /> /Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Dues Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Excess Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Sponsor/Parent</TableCell>
//                         </TableRow>
//                       </TableFooter>
//                     </Table>

//                     <Typography
//                       variant="h6" // Use h1, h2, h3, h4, etc. based on your needs
//                       component="h6" // HTML element to render
//                       style={{ marginBottom: '1px', color: '#333' }} // Customize styles if needed
//                     >
//                       Hostel Invoice / Receipt Table
//                     </Typography>
//                     <Table id="ThirdStandardFeeTable3H" style={{ borderCollapse: 'collapse', padding: '18px', border: 'none', backgroundColor: '#ffff', borderRadius: '8px', width: 'auto',tableLayout: 'auto'  }}>
//                       <TableHead style={{ backgroundColor: '#E6E6E6' }}>
//                         <TableRow>
//                           <TableCell style={{ fontWeight: 'bold', Width: '7px' }}>S.No</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Student Name</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Invoice/Receipt No:</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Type</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Invoice<br /> /Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Receipt<br /> /Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Dues Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Excess Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Sponsor/Parent</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableFooter>
//                         <TableRow>
//                           <TableCell style={{ fontWeight: 'bold', Width: '7px' }}>S.No</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Student Name</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Invoice/Receipt No:</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Type</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Invoice<br /> /Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Receipt<br /> /Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Dues Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Excess Amt.</TableCell>
//                           <TableCell style={{ fontWeight: 'bold' }}>Sponsor/Parent</TableCell>
//                         </TableRow>
//                       </TableFooter>
//                     </Table>
//                   </div>
//                 </div>
//               </div>
//                   </Paper>
//                   </div>
//                   </div>     
//             <div style={{ height: '50px' }}></div>
           

//               </div>
//               </Paper>     
//        </Box>
//       </Box>
//       </div>

//    );
// };

// export default InvoiceComponent;

// // function printDiv(divId) {
// //   var content = document.getElementById(divId);
// //   var printWindow = window.open('', '_blank');
// //   printWindow.document.write('<html><head><title>Receipt Details</title>');
// //   printWindow.document.write('</head><body>');
// //   printWindow.document.write(content.innerHTML);
// //   printWindow.document.write('</body></html>');
// //   printWindow.document.close();
// //   printWindow.print();
// // }
 