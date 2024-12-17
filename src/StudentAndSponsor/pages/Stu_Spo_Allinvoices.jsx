import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Typography, Button, Grid,Paper } from '@mui/material';
import { MdDownload } from 'react-icons/md';
import Navbar from '../../Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SvsInvoice from './Svs-invoice.jpg';
import dummy from './image.png';
import schoolImage from './school 1.jpg';
import hostelImage from './hostel 1.jpg';
import Table from 'react-bootstrap/Table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { Snackbar, CircularProgress } from '@mui/material';

import '../pages/allinvoice.css'
const InvoiceCard = ({ invoice, fetchInvoiceDetails }) => {
  return (
    <Card sx={{ maxWidth: 300, margin: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="body3" component="div" color="primary">
          Invoice No: {invoice.invoiceNo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Student Name: {invoice.studentName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Due Date : {invoice.due_date}
        </Typography>
      </CardContent>
      <CardActions sx={{ backgroundColor: '#f5f5f5', padding: '8px' }}>
        <Button size="small" color="primary" onClick={() => fetchInvoiceDetails(invoice.invoiceNo)}>
          <MdDownload style={{ marginRight: 4 }} />
          Download
        </Button>
      </CardActions>
    </Card>
  );
};

const Stu_Spo_Allinvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [disable, setdisable] = useState({});
  const [invoiceDataall, setinvoiceDataall] = useState({});
  const userId = sessionStorage.getItem('user_id');
  const userType = sessionStorage.getItem('user_type');
  const componentRef = useRef();
  const [open, setOpen] = useState(false);

  let sno = 0;  

  const fetchInvoiceDetails = async (invoiceNo) => {
    setLoading(true);
    try {
      const res = await axios.get('https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list', {
        params: { invoiceId: invoiceNo },
      });
      const response = res.data;
      setInvoiceData(response.data);
    } catch (error) {
      console.error("Error fetching invoice details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      const params = {
        'inoviceTypes': 'school',
        'userId': userId,
        'userType': userType,
      };

      const response = await axios.get('https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list-short', { params });
      setInvoices(response.data.data);
      setinvoiceDataall(response.data);   
      setdisable(response.data.invoiceDetails.disable);   
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const generatePDF = () => {
    if (invoiceData) {
      const element = componentRef.current;
      const opt = {
        margin: 0,
        filename: `invoice_${invoiceData.invoiceDetails.invoiceNo}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight + 45, // Ensure it captures the entire height
        },
        jsPDF: { 
          unit: 'pt', 
          format: 'a4', 
          orientation: 'portrait',
        }
      };
    
      html2pdf().from(element).set(opt).save();
    }
    
    
  };

  useEffect(() => {
    if (loading) {
      setOpen(true);  // Show Snackbar when loading starts
    } else {
      setOpen(false); // Hide Snackbar when loading finishes
    }
  }, [loading]);

  useEffect(() => {
    if (invoiceData) {
      generatePDF();
    }
  }, [invoiceData]);

  return (
    <div>
       <div className="App">
        <Navbar />
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
          All Invoices
        </Typography>
      </Grid>

        {/* {loading && <p>Loading invoice details...</p>} */}
        <Snackbar
        open={open}
        message="Loading invoice details..."
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Center the Snackbar
        autoHideDuration={null} // Snackbar will not automatically close until loading finishes
      >
        {/* Optional: Adding a loading spinner inside the Snackbar */}
        <CircularProgress size={24} style={{ marginLeft: 10 }} />
      </Snackbar>
        <Grid container justifyContent="center" spacing={2}>
          {invoices.map((invoice) => (
            <Grid item key={invoice.id}>
              <InvoiceCard invoice={invoice} fetchInvoiceDetails={fetchInvoiceDetails} />
            </Grid>
          ))}
      </Grid>
      <Grid container justifyContent="center" spacing={5}  sx={{padding: '10px' }}>

        <div className="a4-paper">

        <Paper sx={{ margin: '130px', padding: '50px' }}>   

{invoiceData && invoiceData ? (
   <div ref={componentRef} className='pt-1 invoice-section'  >
   <section className='px-5 pb-1 pt-2 m-2 no-page-break' >
      <div style={{border:'1px solid black'}}>
          <div className='d-flex'>
            <Row>
              <Col xs={9} className='pt-1'>
                  <h5  style={{
                    backgroundColor: '#0C83DC',
                    width: '40%',
                    borderRadius: '0 6px 6px 0px',
                    textAlign: 'center',
                    padding: '8px 0',
                    textTransform: 'uppercase',
                    color: 'aliceblue',
                }}>INVOICE</h5>
                       <div className='pt-1 px-3'>
                       <h3 style={{fontFamily:'sans-serif'}}>Santhosha Vidhyalaya</h3>
    <h6 style={{fontFamily:'sans-serif', lineHeight: '0.8'}}>Dohnavur Fellowship, </h6>
    <h6 style={{fontFamily:'sans-serif', lineHeight: '0.8'}}>Dohnavur – 627102, </h6>
    <h6 style={{fontFamily:'sans-serif', lineHeight: '0.8'}}>Tirunelveli District, Tamil Nadu</h6>
    <h6 style={{fontFamily:'sans-serif', lineHeight: '0.8'}}>Mobile – +91 80125 12145, </h6>
    <h6 style={{fontFamily:'sans-serif', lineHeight: '0.8'}}>Email – finance@santhoshavidhayalaya.com </h6>
                </div>
                </Col>
              <Col xs={3} className='text-center pt-1' >
                 <img style={{width:'60%'}} src={SvsInvoice} />
              </Col>
            </Row>
          </div>
          <div className='text-center mb-6'>
            <u><h2>
            {invoiceData.paymentDetails && invoiceData.paymentDetails[0].fees_heading === 'School Fees' ? 'SCHOOL FEES' : 'FEES'}
            </h2></u>
          </div>
          <Row className='px-3'>
              <Col xs={8}>
                 <Row>
                 <h4 style={{textTransform: 'uppercase',paddingBottom:'7px'}}>Student Details</h4>
                  <Col xs={2} style={{textTransform: 'uppercase',}}>
                    <p  className='mb-0 'style={{fontWeight: '400', lineHeight: '1.2'}}>Name</p>
                    <p className='mb-0'style={{fontWeight: '400', lineHeight: '1.2'}}>Grade</p>
                    <p className='mb-0'style={{fontWeight: '400', lineHeight: '1.2'}}>Section</p>
                    <p className='mb-0'style={{fontWeight: '400', lineHeight: '1.2'}}>RollNo</p>
                    <p className='mb-0'style={{fontWeight: '400', lineHeight: '1.2'}}>Group</p>
                  </Col>
                  <Col xs={10}>
                    <p className='mb-0'style={{ lineHeight: '1.2'}}>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.studentName}</p>
                    <p className='mb-0 'style={{ lineHeight: '1.2'}}>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.grade}</p>
                    <p className='mb-0  'style={{ lineHeight: '1.2'}}>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.section}</p>
                    <p className='mb-0 'style={{ lineHeight: '1.2'}}>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.rollNo}</p>
                    <p className='mb-0 'style={{ lineHeight: '1.2'}}>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.group}</p>
                  </Col>
                 </Row>
              </Col>
              <Col className='text-end pt-3'style={{textTransform: 'uppercase',}} xs={4}>
                <h6>Invoice Date: <b>{invoiceData.invoiceDetails && invoiceData.invoiceDetails.invoiceDate}</b></h6>
                <h6>Invoice NO: <b>{invoiceData.invoiceDetails && invoiceData.invoiceDetails.invoiceNo}</b></h6>
              </Col>
            </Row>
<div className='m-1'>                 <Table striped bordered hover >
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Fees Description</th>
                    {/* <th className='text-center'>Quantity</th> */}
                    <th className='text-center'>Amount</th>
                    {/* <th className='text-center'>Total Amount</th> */}
                  </tr>
                </thead>
                <tbody  className='m-5'>
                {invoiceData.paymentDetails && invoiceData.paymentDetails.map((item) => {
                
                sno++; // Increment the sno counter
                
                      return (
                        
                        <tr>
                          <td>{sno}</td>
                          {/* <td>{item.fees_heading +' - '+ item.fees_sub_heading  }</td> */}
                          <td>{item.fees_sub_heading  }</td>
                          {/* <td className='text-center'>1</td> */}
                          <td className='text-end'>{item.amount ? item.amount :  " "}</td>
                          {/* <td className='text-end'>{item.amount ? item.amount :  " "}  </td> */}
                        </tr>
                      )})}
                </tbody>
              </Table>
              </div>

              <div className='row justify-content-center'>
            <Col xs={6} className='text-start'>
            {invoiceData.paymentDetails && invoiceData.paymentDetails[0].fees_heading === 'School Fees' ? (
<div>
<Table striped bordered hover size="sm" className="w-120" style={{ maxWidth: '100%' }}>
<thead></thead>
<tbody>
  <tr>
    <td colSpan={6} style={{ wordWrap: 'break-word', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      You can make the payment through bank transfer to the below mention account, or scan the QR Code or use the UPI ID.
    </td>
  </tr>
  <tr>
    <td colSpan={4} style={{ wordWrap: 'break-word', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <strong>SCHOOL BANK DETAILS</strong><br />
                          Account Name:<b style={{ fontSize: '9px' }}>SANTHOSHA VIDHYALAYA</b> <br />
      Account No.: 1379 0200 0000 273<br />
      IFSC Code: IOBA0001379<br />
      Bank: Indian Overseas Bank<br />
      Branch: Dohnavur
    </td>
    <td colSpan={2}>
      <img style={{ height: '130px' }} src={schoolImage} />
    </td>
  </tr>

</tbody>
</Table>
</div> ) :( <Table striped bordered hover size="sm" className="w-auto" style={{ maxWidth: '100%' }}>
  <thead></thead>
                  <tbody>
                  <tr>
    <td colSpan={6} style={{ wordWrap: 'break-word', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      You can make the payment through bank transfer to the below mention account, or scan the QR Code or use the UPI ID.
    </td>
  </tr>
    <tr>
      <td colSpan={4} style={{ wordWrap: 'break-word', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <strong>  BANK DETAILS</strong><br />
        Account Name:<b style={{ fontSize: '9px' }}>SANTHOSHA VIDHYALAYA - HOSTEL</b><br />
        Account No.:1379 0200 0000 272<br />
        IFSC Code: IOBA0001379<br />
        Bank: Indian Overseas Bank<br />
        Branch: Dohnavur
                      </td>
                      <td colSpan={2}>
      <img style={{ height: '130px' }} src={hostelImage} />
    </td>
    </tr>
    {/* <tr>
      <td colSpan={6} style={{ wordWrap: 'break-word', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
        After making the payment, please ensure to notify us so that we may acknowledge receipt of your payment. Kindly send your transaction details, along with your child's full name and the class of study, to either the school's WhatsApp number or the email ID provided below:<br />
        Mobile / WhatsApp: +91 801 251 2145<br />
        Email: finance@santhoshavidhyalaya.com
      </td>
    </tr> */}
  </tbody>
</Table>)}
</Col>
<Col xs={3} className='text-end' style={{ marginLeft: '-10px' }}>
<h6>Total :</h6>
{invoiceData.discount_list && invoiceData.discount_list.map((item) => {
sno++; // Increment the sno counter
return (
  <h6>{item.discount_cat} :</h6>
);
})}
<h6>Total Discount :</h6>
<h6>Total Payable :</h6>
</Col>
<Col xs={3} className='ps-5' style={{ textAlign: 'right' }}>
<h6>{totalAmount}</h6>
{invoiceData.discount_list && invoiceData.discount_list.map((item) => {
sno++; // Increment the sno counter
return (
  <h6>(-) ₹{item.dis_amount}</h6>
);
})}
<h6>{invoiceData.invoiceDetails && invoiceData.invoiceDetails.discount ? '₹' + invoiceData.invoiceDetails.discount : '--'}</h6>
<h6 style={{}}>₹{invoiceData.invoiceDetails && invoiceData.invoiceDetails.totalPayment}</h6>
            </Col>

            <Col style={{}} >
            <p className='pl-2'style={{  fontFamily: 'Arial, sans-serif',paddingLeft:'10px',wordWrap: 'break-word', fontSize: '11px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#333' ,marginTop:'-10px'}}>
After making the payment, please ensure to notify us so that we may acknowledge receipt of your payment. Kindly send your transaction details, along with your child's full name and the class of study,to either the school's WhatsApp number or the email ID provided below:
<br />
Mobile / WhatsApp: +91 801 251 2145
<br />
Email: finance@santhoshavidhyalaya.com
</p>
              <p style={{ textAlign: 'right', paddingRight: '20px' }}>Accounts Coordinator/Assistant</p></Col>
</div>
{invoiceDataall.latestbypayDetails &&disable === 1 ? (
              <div className='text-center'  style={{fontSize:'12px',fontWeight:'bold', padding:'15px'}}>
                  <p>Please find dues in latest Invoice</p>
                   
              </div>
          ) : (
            <div className='text-left' style={{ fontSize: '12px', fontWeight: 'bold', paddingLeft: '7px',paddingTop: '-17px' }}>
<p>Previous Month Due: ₹{invoiceDataall.latestbypayDetails && invoiceDataall.latestbypayDetails.due_amount !== undefined ? invoiceDataall.latestbypayDetails.due_amount : '0.00'}</p>
{invoiceData.paymentDetails && invoiceData.paymentDetails[0].fees_heading === 'School Fees' ? (
  <p>
      Excess Amount: ₹{invoiceDataall.latestbypayDetails && invoiceDataall.latestbypayDetails.s_excess_amount !== undefined ? invoiceDataall.latestbypayDetails.s_excess_amount : '0.00'}
  </p>
) : (
  <p>
      Excess Amount: ₹{invoiceDataall.latestbypayDetails && invoiceDataall.latestbypayDetails.h_excess_amount !== undefined ? invoiceDataall.latestbypayDetails.h_excess_amount : '0.00'}
  </p>
)}
</div>

          )}

          {/* <div className='row'>

  </div> */}
            {/* <footer style={{backgroundColor:'#D6D8D6'}}>
                <p className='text-center' style={{fontSize:'12px'}}>The Principal, Santhosha Vidhyalaya, Dohnavur – 627102 Tirunelveli Dist. Tamilnadu</p>
              </footer> */}

          </div>
   </section>
   <p className='text-center' style={{fontSize:'10px'}}> THIS IS COMPUTER-GENERATED INVOICE. NO SIGNATURE IS REQUIRED</p>

</div>
):( <Typography>Select any one invoice to display here</Typography>
)}
  </Paper>
</div>
</Grid>
  
      </div>
    </div>
  );
};

export default Stu_Spo_Allinvoices;



// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import Navbar from '../Navbar'
// import { Card, CardContent, CardActions, Typography, Button, Grid } from '@mui/material';
// import { MdDownload } from 'react-icons/md';
// import SvsInvoice from './Svs-invoice.jpg';
// import schoolImage from './school 1.jpg';
// import hostelImage from './hostel 1.jpg';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Table from 'react-bootstrap/Table';
// const [selectedInvoice, setSelectedInvoice] = useState(null);
// const [invoiceData, setInvoiceData] = useState(null);
// const [loading, setLoading] = useState(false);

// const fetchInvoiceDetails = async (invoiceNo) => {
//   setLoading(true);
//   try {
// axios.get(`https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list`,{
//       params: {
//         invoiceId: invoiceNo,
//       }
//     })
//     .then(res => {
//       const response = res.data;
//       setInvoiceData(response.data);
//       setSelectedInvoice(invoiceNo); 
//     })
//   } catch (error) {
//     console.error("Error fetching invoice details:", error);
//   } finally {
//     setLoading(false);
//   }
// };

// const InvoiceCard = ({ invoice }) => {
//   const handleDownload = () => {
//     const url = `https://santhoshavidhyalaya.com/svsportaladmintest/GeneralInvoice/StudentInvoice/${invoice.invoiceNo}`;
//     window.open(url, '_blank');
//   };

//   return (
   
//     <Card sx={{ maxWidth: 300, margin: 2, boxShadow: 3, borderRadius: 2 }}>
//       <CardContent >
//         <Typography variant="body3" component="div" color="primary">
//           Invoice No: {invoice.invoiceNo}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Student Name: {invoice.studentName}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Fees Category: {invoice.feesCat}
//         </Typography>
//         {/* <Typography variant="body2" color="text.secondary">
//           Amount: ₹{invoice.amount}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Due Date: {new Date(invoice.due_date).toLocaleDateString()}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Status: {invoice.payStatus}
//         </Typography> */}
//       </CardContent>
//       <CardActions sx={{ backgroundColor: '#f5f5f5', padding: '8px' }}>
//   <Button size="small" color="primary"onClick={() => fetchInvoiceDetails(invoice.invoiceNo)}>
//     <MdDownload style={{ marginRight: 4 }} />
//     Download
//   </Button>
// </CardActions>
//       </Card>
//    );
// };







//  const InvoiceComponent = () => {
//   const [invoices, setInvoices] = useState([]);
 
//    const userId = sessionStorage.getItem('user_id');
//    const userType = sessionStorage.getItem('user_type');
//    const [invoiceDataall, setinvoiceDataall] = useState({})
//    const componentRef = useRef();
//   let sno = 0;   let totalAmount = 0;

//   const [disable, setdisable] = useState({})

   
   
//   // Fetch all invoices on component mount
//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {

//         const params = {
//           'inoviceTypes': 'school',
//           'userId': userId,
//           'userType': userType
//         };

//           const response = await axios.get('https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list', { params });
//           setInvoices(response.data.data);
//         setinvoiceDataall(response.data);   
//        setdisable(response.data.invoiceDetails.disable);   

//       }catch (error) {
//         console.error("Error fetching invoices:", error);
//       }
//       fetchInvoices();
//     }
//   }, []);

 
  
  

//    useEffect(() => {
//      if (invoiceData.paymentDetails) {
//        for (const item of invoiceData.paymentDetails) {
//          if (item.amount) {
//            totalAmount += parseFloat(item.amount);
//          }
//        }
//      }
//    }, [invoiceData.paymentDetails]);

//   // Fetch selected invoice data


//   return (
//     <div>
//       <h2>Invoices</h2>
//       <div className="App">
//       <Navbar />
//     <Grid container justifyContent="center" spacing={2}>
//       {invoices.map((invoice) => (
//         <Grid item key={invoice.id}>
//           <InvoiceCard invoice={invoice} />
//         </Grid>
//       ))}
//       </Grid>
//       </div>
//       {loading && <p>Loading invoice details...</p>}
      
//       {invoiceData && (
//        <div ref={componentRef} className='pt-1' >
//        <section className='px-5 pb-1 pt-2 m-2' >
//           <div style={{border:'1px solid black'}}>
//               <div className='d-flex'>
//                 <Row>
//                   <Col xs={9} className='pt-1'>
//                       <h5  style={{
//                         backgroundColor: '#0C83DC',
//                         width: '40%',
//                         borderRadius: '0 6px 6px 0px',
//                         textAlign: 'center',
//                         padding: '8px 0',
//                         textTransform: 'uppercase',
//                         color: 'aliceblue',
//                     }}>INVOICE</h5>
//                            <div className='pt-1 px-3'>
//                            <h3 style={{fontFamily:'sans-serif'}}>Santhosha Vidhyalaya</h3>
//         <h6 style={{fontFamily:'sans-serif', lineHeight: '0.8'}}>Dohnavur Fellowship, </h6>
//         <h6 style={{fontFamily:'sans-serif', lineHeight: '0.8'}}>Dohnavur – 627102, </h6>
//         <h6 style={{fontFamily:'sans-serif', lineHeight: '0.8'}}>Tirunelveli District, Tamil Nadu</h6>
//         <h6 style={{fontFamily:'sans-serif', lineHeight: '0.8'}}>Mobile – +91 80125 12145, </h6>
//         <h6 style={{fontFamily:'sans-serif', lineHeight: '0.8'}}>Email – finance@santhoshavidhayalaya.com </h6>
//                     </div>
//                     </Col>
//                   <Col xs={3} className='text-center pt-1' >
//                      <img style={{width:'60%'}} src={SvsInvoice} />
//                   </Col>
//                 </Row>
//               </div>
//               <div className='text-center mb-6'>
//                 <u><h2>
//                 {invoiceData.paymentDetails && invoiceData.paymentDetails[0].fees_heading === 'School Fees' ? 'SCHOOL FEES' : 'FEES'}
//                 </h2></u>
//               </div>
//               <Row className='px-3'>
//                   <Col xs={8}>
//                      <Row>
//                      <h4 style={{textTransform: 'uppercase',paddingBottom:'7px'}}>Student Details</h4>
//                       <Col xs={2} style={{textTransform: 'uppercase',}}>
//                         <p  className='mb-0 'style={{fontWeight: '400', lineHeight: '1.2'}}>Name</p>
//                         <p className='mb-0'style={{fontWeight: '400', lineHeight: '1.2'}}>Grade</p>
//                         <p className='mb-0'style={{fontWeight: '400', lineHeight: '1.2'}}>Section</p>
//                         <p className='mb-0'style={{fontWeight: '400', lineHeight: '1.2'}}>RollNo</p>
//                         <p className='mb-0'style={{fontWeight: '400', lineHeight: '1.2'}}>Group</p>
//                       </Col>
//                       <Col xs={10}>
//                         <p className='mb-0'style={{ lineHeight: '1.2'}}>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.studentName}</p>
//                         <p className='mb-0 'style={{ lineHeight: '1.2'}}>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.grade}</p>
//                         <p className='mb-0  'style={{ lineHeight: '1.2'}}>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.section}</p>
//                         <p className='mb-0 'style={{ lineHeight: '1.2'}}>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.rollNo}</p>
//                         <p className='mb-0 'style={{ lineHeight: '1.2'}}>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.group}</p>
//                       </Col>
//                      </Row>
//                   </Col>
//                   <Col className='text-end pt-3'style={{textTransform: 'uppercase',}} xs={4}>
//                     <h6>Invoice Date: <b>{invoiceData.invoiceDetails && invoiceData.invoiceDetails.invoiceDate}</b></h6>
//                     <h6>Invoice NO: <b>{invoiceData.invoiceDetails && invoiceData.invoiceDetails.invoiceNo}</b></h6>
//                   </Col>
//                 </Row>
// <div className='m-1'>                 <Table striped bordered hover >
//                     <thead>
//                       <tr>
//                         <th>No</th>
//                         <th>Fees Description</th>
//                         {/* <th className='text-center'>Quantity</th> */}
//                         <th className='text-center'>Amount</th>
//                         {/* <th className='text-center'>Total Amount</th> */}
//                       </tr>
//                     </thead>
//                     <tbody  className='m-5'>
//                     {invoiceData.paymentDetails && invoiceData.paymentDetails.map((item) => {
                    
//                     sno++; // Increment the sno counter
                    
//                           return (
                            
//                             <tr>
//                               <td>{sno}</td>
//                               {/* <td>{item.fees_heading +' - '+ item.fees_sub_heading  }</td> */}
//                               <td>{item.fees_sub_heading  }</td>
//                               {/* <td className='text-center'>1</td> */}
//                               <td className='text-end'>{item.amount ? item.amount :  " "}</td>
//                               {/* <td className='text-end'>{item.amount ? item.amount :  " "}  </td> */}
//                             </tr>
//                           )})}
//                     </tbody>
//                   </Table>
//                   </div>

//                   <div className='row justify-content-center'>
//                 <Col xs={6} className='text-start'>
//                 {invoiceData.paymentDetails && invoiceData.paymentDetails[0].fees_heading === 'School Fees' ? (
// <div>
//   <Table striped bordered hover size="sm" className="w-120" style={{ maxWidth: '100%' }}>
//     <thead></thead>
//     <tbody>
//       <tr>
//         <td colSpan={6} style={{ wordWrap: 'break-word', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
//           You can make the payment through bank transfer to the below mention account, or scan the QR Code or use the UPI ID.
//         </td>
//       </tr>
//       <tr>
//         <td colSpan={4} style={{ wordWrap: 'break-word', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
//           <strong>SCHOOL BANK DETAILS</strong><br />
//                               Account Name:<b style={{ fontSize: '9px' }}>SANTHOSHA VIDHYALAYA</b> <br />
//           Account No.: 1379 0200 0000 273<br />
//           IFSC Code: IOBA0001379<br />
//           Bank: Indian Overseas Bank<br />
//           Branch: Dohnavur
//         </td>
//         <td colSpan={2}>
//           <img style={{ height: '130px' }} src={schoolImage} />
//         </td>
//       </tr>
    
//     </tbody>
//   </Table>
// </div> ) :( <Table striped bordered hover size="sm" className="w-auto" style={{ maxWidth: '100%' }}>
//       <thead></thead>
//                       <tbody>
//                       <tr>
//         <td colSpan={6} style={{ wordWrap: 'break-word', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
//           You can make the payment through bank transfer to the below mention account, or scan the QR Code or use the UPI ID.
//         </td>
//       </tr>
//         <tr>
//           <td colSpan={4} style={{ wordWrap: 'break-word', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
//           <strong>  BANK DETAILS</strong><br />
//             Account Name:<b style={{ fontSize: '9px' }}>SANTHOSHA VIDHYALAYA - HOSTEL</b><br />
//             Account No.:1379 0200 0000 272<br />
//             IFSC Code: IOBA0001379<br />
//             Bank: Indian Overseas Bank<br />
//             Branch: Dohnavur
//                           </td>
//                           <td colSpan={2}>
//           <img style={{ height: '130px' }} src={hostelImage} />
//         </td>
//         </tr>
//         {/* <tr>
//           <td colSpan={6} style={{ wordWrap: 'break-word', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
//             After making the payment, please ensure to notify us so that we may acknowledge receipt of your payment. Kindly send your transaction details, along with your child's full name and the class of study, to either the school's WhatsApp number or the email ID provided below:<br />
//             Mobile / WhatsApp: +91 801 251 2145<br />
//             Email: finance@santhoshavidhyalaya.com
//           </td>
//         </tr> */}
//       </tbody>
//     </Table>)}
// </Col>
// <Col xs={3} className='text-end' style={{ marginLeft: '-10px' }}>
//   <h6>Total :</h6>
//   {invoiceData.discount_list && invoiceData.discount_list.map((item) => {
//     sno++; // Increment the sno counter
//     return (
//       <h6>{item.discount_cat} :</h6>
//     );
//   })}
//   <h6>Total Discount :</h6>
//   <h6>Total Payable :</h6>
// </Col>
// <Col xs={3} className='ps-5' style={{ textAlign: 'right' }}>
//   <h6>{totalAmount}</h6>
//   {invoiceData.discount_list && invoiceData.discount_list.map((item) => {
//     sno++; // Increment the sno counter
//     return (
//       <h6>(-) ₹{item.dis_amount}</h6>
//     );
//   })}
//   <h6>{invoiceData.invoiceDetails && invoiceData.invoiceDetails.discount ? '₹' + invoiceData.invoiceDetails.discount : '--'}</h6>
//   <h6 style={{}}>₹{invoiceData.invoiceDetails && invoiceData.invoiceDetails.totalPayment}</h6>
//                 </Col>

//                 <Col style={{}} >
//                 <p className='pl-2'style={{  fontFamily: 'Arial, sans-serif',paddingLeft:'10px',wordWrap: 'break-word', fontSize: '11px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#333' ,marginTop:'-10px'}}>
//     After making the payment, please ensure to notify us so that we may acknowledge receipt of your payment. Kindly send your transaction details, along with your child's full name and the class of study,to either the school's WhatsApp number or the email ID provided below:
//     <br />
//     Mobile / WhatsApp: +91 801 251 2145
//     <br />
//     Email: finance@santhoshavidhyalaya.com
//   </p>
//                   <p style={{ textAlign: 'right', paddingRight: '20px' }}>Accounts Coordinator/Assistant</p></Col>
// </div>
// {invoiceDataall.latestbypayDetails &&disable === 1 ? (
//                   <div className='text-center'  style={{fontSize:'12px',fontWeight:'bold', padding:'15px'}}>
//                       <p>Please find dues in latest Invoice</p>
                       
//                   </div>
//               ) : (
//                 <div className='text-left' style={{ fontSize: '12px', fontWeight: 'bold', paddingLeft: '7px',paddingTop: '-17px' }}>
//   <p>Previous Month Due: ₹{invoiceDataall.latestbypayDetails && invoiceDataall.latestbypayDetails.due_amount !== undefined ? invoiceDataall.latestbypayDetails.due_amount : '0.00'}</p>
//   {invoiceData.paymentDetails && invoiceData.paymentDetails[0].fees_heading === 'School Fees' ? (
//       <p>
//           Excess Amount: ₹{invoiceDataall.latestbypayDetails && invoiceDataall.latestbypayDetails.s_excess_amount !== undefined ? invoiceDataall.latestbypayDetails.s_excess_amount : '0.00'}
//       </p>
//   ) : (
//       <p>
//           Excess Amount: ₹{invoiceDataall.latestbypayDetails && invoiceDataall.latestbypayDetails.h_excess_amount !== undefined ? invoiceDataall.latestbypayDetails.h_excess_amount : '0.00'}
//       </p>
//   )}
// </div>

//               )}

//               {/* <div className='row'>

//       </div> */}
//                 {/* <footer style={{backgroundColor:'#D6D8D6'}}>
//                     <p className='text-center' style={{fontSize:'12px'}}>The Principal, Santhosha Vidhyalaya, Dohnavur – 627102 Tirunelveli Dist. Tamilnadu</p>
//                   </footer> */}

//               </div>
//        </section>
//        <p className='text-center' style={{fontSize:'10px'}}> THIS IS COMPUTER-GENERATED INVOICE. NO SIGNATURE IS REQUIRED</p>

//     </div>
//       )}
//     </div>
//   );
// };

// export default InvoiceComponent;
