// ///////////////////////Student fees////////////////////////////////////////

import React,{useRef,useEffect,useState} from 'react';
// import Sidebar from '../Sidebar';
// // import './dashboard.css'
// import Header from '../Header';
// import Footer from '../Footer';
import SvsInvoice from './Svs-invoice.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useReactToPrint} from 'react-to-print';
// import Swal from 'sweetalert2';
import {AiFillPrinter} from 'react-icons/ai';
import Button from '@mui/material/Button';
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { VscTextSize } from 'react-icons/vsc';



const PaymentReceipt = () => {
  let sno = 0; 
  const { paymentTransactionId } = useParams();
  const[invoiceData, setinvoiceData] = useState({})


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle:'Student Invoice',
      // onAfterPrint:()=> Swal.fire({
      //   position: 'center',
      //   icon: 'success',
      //   title: 'File Download Successfully',
      //   showConfirmButton: false,
      //   timer: 1700
      // })
  })

  const innvoiceDetails = () => {
   
      axios.get(`https://santhoshavidhyalaya.com/SVSTEST/api/payment-receipt`,{
        params: {
          transactionNo: paymentTransactionId,
        }
      })
      .then(res => {
        const response = res.data;
        setinvoiceData(response.data);   
        console.log(response.data)
      })
      .catch(error=>  console.error(`Error : ${error}`));
  }

  
useEffect(() => {
if(paymentTransactionId){
  innvoiceDetails();
}
  
}, []);



  return (
    <div>
        <div>
       
       {/* <Sidebar/> */}
    <div style={{width:'82.5%',float:'right'}} >
      {/* <Header/> */}
      <section className='text-end p-4' >
            <Button onClick={handlePrint}  style={{color :'#E91E63'}} role="button"><AiFillPrinter className='pe-2' size={35}/>Print</Button>
          </section>  
       <div ref={componentRef} className='pt-4' >
         <section className='px-5 pb-4' >
            <div style={{border:'1px solid black'}}>
                <div className='d-flex'>
                  <Row>
                    <Col xs={9} className='pt-4'>
                        <h5  style={{
                          backgroundColor: '#0C83DC',
                          width: '40%',
                          borderRadius: '0 6px 6px 0px',
                          textAlign: 'center',
                          padding: '8px 0',
                          textTransform: 'uppercase',
                          color: 'aliceblue',
                      }}>Payment Receipt</h5>
                      <div className='pt-3 px-3'>
                      <h3 style={{fontFamily:'sans-serif'}}>Santhosha Vidhyalaya</h3>
                      <h6 style={{fontFamily:'sans-serif'}}>Dohnavur – 627102, </h6>
                      <h6 style={{fontFamily:'sans-serif'}}>Tirunelveli Tamilnadu</h6>
                      <h6 style={{fontFamily:'sans-serif'}}>+91 8012512100 / 8012512143</h6>
                      </div>
                      </Col>
                    <Col xs={3} className='text-center pt-3' >
                       <img style={{width:'60%'}} src={SvsInvoice} />
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col>
                      <h3>Santhosha Vidhyalaya</h3>
                      <h6></h6>
                    </Col>
                  </Row> */}
                </div>
                <Row className='p-4'>
                    
      
                  <Col xs={4}>
                    {/* <h4>Student Details</h4>
                       <h6 className='mb-0'>Name: Mohammed Fareestha</h6>
                       <h6 className='mb-0'>Grade: XII</h6>
                       <h6 className='mb-0'>Section: B</h6>
                       <h6 className='mb-0'>Group : Biology, Maths</h6> */}
                    <Row>
                    <h6  className='mb-0 pt-1'>Transaction-No :</h6>
                      {invoiceData.transactionDetails && invoiceData.transactionDetails.modeOfPayment && (
                          <h6 className='mb-0 pt-1'>Payment Mode:</h6>)}
                 
                      
                   {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.name && 
                     
                        <h6 className='mb-0 pt-1'>Sponsor Name:</h6>}
                        {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.company_name && 
                        <h6 className='mb-0 pt-1'>Sponsor Comapany Name:</h6>} 
                         {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.gst && 
                          <h6 className='mb-0 pt-1'>Sponsor GST No:</h6>}
                         {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.pan && 
                          <h6 className='mb-0 pt-1'>Sponsor PAN No:</h6>}
                         {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.phone && 
                          <h6 className='mb-0 pt-1'>Sponsor Mobile No:</h6>}
                         {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.address1 && 
                          <h6 className='mb-0 pt-1'>Sponsor Address:</h6>}
                                             </Row>
  </Col>
                      <Col xs={5}>
                      <p className='mb-0'> {invoiceData.transactionDetails && invoiceData.transactionDetails.transactionNo}</p>

{invoiceData.transactionDetails && invoiceData.transactionDetails.modeOfPayment && (
  <p className='mb-0'>{invoiceData.transactionDetails.modeOfPayment}</p>
)} 
  {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.name && (
                          <p className='mb-0'>{invoiceData.sponserorstudentDetails.sponsor_info.name}</p>
                        )}
 
                        {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.company_name && (
                          <p className='mb-0'>{invoiceData.sponserorstudentDetails.sponsor_info.company_name}</p>
                        )}
 {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.gst && (
                          <p className='mb-0'>{invoiceData.sponserorstudentDetails.sponsor_info.gst}</p>
                        )}
                         {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.pan && (
                          <p className='mb-0'>{invoiceData.sponserorstudentDetails.sponsor_info.pan}</p>
                        )}
                         {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.phone && (
                          <p className='mb-0'>{invoiceData.sponserorstudentDetails.sponsor_info.phone}</p>
                        )}
{invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.address1 && (
  <p className='mb-0'>
  {invoiceData.sponserorstudentDetails.sponsor_info.address1}<br />
</p>
                        )}
                        {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.address2 && (
  <p className='mb-0'>
   {invoiceData.sponserorstudentDetails.sponsor_info.address2}<br />
 </p>
                        )}
                        {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && invoiceData.sponserorstudentDetails.sponsor_info.city && (
  <p className='mb-0'> 
  {invoiceData.sponserorstudentDetails.sponsor_info.city}
</p>
                          )}
                    <h6></h6>
                    </Col>

                    <Col xs={2}>

                        <h6><b>Date:</b>{invoiceData.transactionDetails && invoiceData.transactionDetails.date}</h6>
                      <h6><b>Time:</b>{invoiceData.transactionDetails && invoiceData.transactionDetails.time}</h6>
                    </Col>
                  </Row>
                  
                  <div className='container pt-5' >
                  <Table striped bordered hover >
                      <thead>
                        <tr>
                          <th>No</th>
                        <th>Invoice No.</th>
                        <th>Roll no - Name</th>
                        <th>Standard</th>
                          <th className='text-center'>Overall<br></br>Payment Status</th>
                          <th className='text-center'>Invoice Amount</th>
                          <th className='text-center'>Invoice Pending <br></br> Amount</th>
                          <th className='text-center'>Paid Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                      {invoiceData.paidinvoiceDetails && invoiceData.paidinvoiceDetails.map((item) => {
                      
                      sno++; // Increment the sno counter
                      
                            return (
                              
                              <tr>
                                <td>{sno}</td>
                                <td>{item.invoiceNo}</td>
                                <td>{item.roll_no}-{item.name}</td>
                                <td>{item.standard}</td>
                                <td className='text-center'>  {item.status === 'Paid' ? 'Fully Paid' : item.status}
</td>
                                {/* <td className='text-end'>{item.amount}</td>
                                // <td className='text-end'>{item.amount}</td> */}
                                <td className='text-end'>{item.amount}</td>
                               <td className='text-end'>{item.pending_amount}</td>
                                
                                {/* <td className='text-end'>{item.paidAmount}</td> */}
                                <td className='text-end'>{invoiceData.transactionDetails && invoiceData.transactionDetails.paymentAmount}</td>

                              </tr>
                            )})}
                      </tbody>
                    </Table>
                    <div className='row'>
                      <Col xs={4}>
                      {/* <Table striped bordered hover size="sm" style={{width:'60%'}}>
                          <thead>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{textAlign:'center',paddingTop:'6px',backgroundColor:'#0C83DC',color:'aliceblue',width:'45%'}}>Due Amount</td>
                              <td><h5 className='text-end'>₹ 3240.00</h5></td>
                            </tr>
                          </tbody>
                      </Table> */}
                        
                      </Col>
                      <Col xs={4} className='text-end' style={{marginLeft:'-10px'}}>
                        <h6>Total :</h6>
                        {/* <h6>Paid Total :</h6>
                        <h6>Balance:</h6>
                        <h6>Total Payment :</h6> */}
                      </Col>
                      <Col xs={4} className='ps-5' style={{textAlign:'right'}}>
                        <h6>₹{invoiceData.transactionDetails && invoiceData.transactionDetails.paymentAmount}</h6>
                        {/* <h6>₹{invoiceData.invoiceDetails && invoiceData.invoiceDetails.previousDues}</h6>
                        <h6>{invoiceData.invoiceDetails ? '₹ '+invoiceData.invoiceDetails.discount : '-'}</h6>
                        <h6>₹{invoiceData.invoiceDetails && invoiceData.invoiceDetails.totalPayment}</h6> */}
                      </Col>
                    </div>
                      <p className='text-danger text-center py-5' style={{fontSize:'12px'}}>*Please review the details of this invoice prior to payment if you find discrepancies, Please contact the accounting department</p>
                    <div className='row py-4'>
                      <Col xs={8}>
                         <h6>Print date: {invoiceData.transactionDetails && invoiceData.transactionDetails.date}</h6>
                      </Col>
                      <Col xs={4}>
                          <hr className='mb-1'/>
                         <h5 style={{fontSize:'15px',textAlign:'center'}}>Signature</h5>
                      </Col>
                    </div>  

                  </div>
                  {/* <footer style={{backgroundColor:'#D6D8D6'}}>
                      <p className='text-center' style={{fontSize:'12px'}}>The Principal, Santhosha Vidhyalaya, Dohnavur – 627102 Tirunelveli Dist. Tamilnadu</p>
                    </footer> */}

                </div>
         </section>
         
      </div>
      
    </div>
    </div>
    </div>
  )
}

export default PaymentReceipt





// ///////////////////////Sponsor fees////////////////////////////////////////

// import React,{useRef} from 'react';
// import Sidebar from '../Sidebar';
// // import './dashboard.css'
// import Header from '../Header';
// import Footer from '../Footer';
// import SvsInvoice from './Svs-invoice.jpg'
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import {useReactToPrint} from 'react-to-print';
// import Swal from 'sweetalert2';
// import {AiFillPrinter} from 'react-icons/ai';
// import Button from '@mui/material/Button';
// import Table from 'react-bootstrap/Table';

// const Invoice = () => {


//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//       content: () => componentRef.current,
//       documentTitle:'Sponsor Invoice',
//       onAfterPrint:()=> Swal.fire({
//         position: 'center',
//         icon: 'success',
//         title: 'Invoice Download Successfully',
//         showConfirmButton: false,
//         timer: 1700
//       })
//   })




//   return (
//     <div>
//         <div>
       
//        <Sidebar/>
//     <div style={{width:'82.5%',float:'right'}} >
//       <Header/>
//       <section className='text-end p-4' >
//             <Button onClick={handlePrint}  style={{color :'#E91E63'}} role="button"><AiFillPrinter className='pe-2' size={35}/>Print</Button>
//           </section>  
//        <div ref={componentRef} className='pt-4' >
//          <section className='px-5 pb-4' >
//             <div style={{border:'1px solid black'}}>
//                 <div className='d-flex'>
//                   <Row>
//                     <Col xs={9} className='pt-4'>
//                         <h5  style={{
//                           backgroundColor: '#F29001',
//                           width: '40%',
//                           borderRadius: '0 6px 6px 0px',
//                           textAlign: 'center',
//                           padding: '8px 0',
//                           textTransform: 'uppercase',
//                           color: 'aliceblue',
//                           }}>INVOICE</h5>
//                            <div className='pt-3 ps-4'style={{textTransform: 'uppercase'}}>
//                       <h6>Invoice Date: 31/8/2023</h6>
//                       <h6>Invoice NO: SVS-021</h6>
//                     </div>
//                       </Col>
//                     <Col xs={3} className='text-center pt-3' >
//                        <img style={{width:'60%'}} src={SvsInvoice} />
//                     </Col>
//                   </Row>
//                 </div>
//                 <Row className='p-4'>
//                     <Col xs={8}>
//                        <Row>
//                        <h4 style={{textTransform: 'uppercase',paddingBottom:'7px'}}>Sponsor details</h4>
//                         <Col xs={3} style={{textTransform: 'uppercase',}}>
//                           <h6  className='pt-1'>Name</h6>
//                           <h6 className='pt-1'>Number</h6>
//                           <h6 className='pt-1'>Occupation</h6>
//                           <h6 className='pt-1'>ADDRESS</h6>
//                         </Col>
//                         <Col xs={9}>
//                           <p className='mb-0'>: Abu Sufiyan.R</p>
//                           <p className='mb-0 pt-2'>: 9840723098</p>
//                           <p className='mb-0  pt-2'>: Steel business</p>
//                           <p className='mb-0  pt-2'>:7/12,Kalayani Joniya Street,Mini Colon,Chennai-600021</p>
//                         </Col>
//                        </Row>
//                     </Col>
//                     <Col xs={4}>
//                        <h4 style={{textTransform: 'uppercase',paddingBottom:'7px'}}>LOCATION</h4>
//                        <p>ADDRESS: The Principal, Santhosha Vidhyalaya, Dohnavur – 627102 Tirunelveli Dist. Tamilnadu</p>
//                     </Col>
//                   </Row>
                  
//                   <div className='container' >
//                   <Table striped bordered hover >
//                       <thead>
//                           <tr style={{backgroundColor:'#C0C8C6'}}>
//                             <th>11236</th>
//                             <th className='text-center' colSpan={2}>Arun Kumar</th>
//                             <th className='text-center'>VI</th>
//                             <th className='text-center'>B</th>
//                           </tr>
//                           <tr style={{backgroundColor:'#C2BBBF'}}>
//                             <th>No</th>
//                             <th>Fees Description</th>
//                             <th className='text-center'>Quantity</th>
//                             <th className='text-center'>Amount</th>
//                             <th className='text-center'>Total Amount</th>
//                           </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>1</td>
//                           <td>ID Card</td>
//                           <td className='text-center'>1</td>
//                           <td className='text-end'>165.00</td>
//                           <td className='text-end'>165.00</td>
//                         </tr>
//                         <tr>
//                           <td>2</td>
//                           <td>Digital Education</td>
//                           <td className='text-center'>1</td>
//                           <td className='text-end'>2000.00</td>
//                           <td className='text-end'>2000.00</td>
//                         </tr>
//                         <tr>
//                           <td>3</td>
//                           <td>Hostel Fees</td>
//                           <td className='text-center'>1</td>
//                           <td className='text-end'>26000.00</td>
//                           <td className='text-end'>26000.00</td>
//                         </tr>
//                         <tr>
//                           <td>4</td>
//                           <td>Mess</td>
//                           <td className='text-center'>1</td>
//                           <td className='text-end'>2700.00</td>
//                           <td className='text-end'>27000.00</td>
//                         </tr>
//                         <tr>
//                           <td>5</td>
//                           <td>School Uniform dress</td>
//                           <td className='text-center'>4</td>
//                           <td className='text-end'>1200.00</td>
//                           <td className='text-end'>4800.00</td>
//                         </tr>
//                         <tr>
//                           <td>6</td>
//                           <td>Uniform shoe Uniform socks</td>
//                           <td className='text-center'>6</td>
//                           <td className='text-end'>130.00</td>
//                           <td className='text-end'>780.00</td>
//                         </tr>
//                       </tbody>
//                     </Table>
//                   <Table striped bordered hover >
//                       <thead>
//                           <tr style={{backgroundColor:'#C0C8C6'}}>
//                             <th>90121</th>
//                             <th className='text-center' colSpan={2}>Nasreen Alfiyan</th>
//                             <th className='text-center'>XI</th>
//                             <th className='text-center'>C</th>
//                           </tr>
//                           <tr style={{backgroundColor:'#C2BBBF'}}>
//                             <th>No</th>
//                             <th>Fees Description</th>
//                             <th className='text-center'>Quantity</th>
//                             <th className='text-center'>Amount</th>
//                             <th className='text-center'>Total Amount</th>
//                           </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>1</td>
//                           <td>ID Card</td>
//                           <td className='text-center'>1</td>
//                           <td className='text-end'>165.00</td>
//                           <td className='text-end'>165.00</td>
//                         </tr>
//                         <tr>
//                           <td>2</td>
//                           <td>Digital Education</td>
//                           <td className='text-center'>1</td>
//                           <td className='text-end'>2000.00</td>
//                           <td className='text-end'>2000.00</td>
//                         </tr>
//                         <tr>
//                           <td>3</td>
//                           <td>Hostel Fees</td>
//                           <td className='text-center'>1</td>
//                           <td className='text-end'>26000.00</td>
//                           <td className='text-end'>26000.00</td>
//                         </tr>
//                         <tr>
//                           <td>4</td>
//                           <td>Mess</td>
//                           <td className='text-center'>1</td>
//                           <td className='text-end'>2700.00</td>
//                           <td className='text-end'>27000.00</td>
//                         </tr>
//                         <tr>
//                           <td>5</td>
//                           <td>School Uniform dress</td>
//                           <td className='text-center'>4</td>
//                           <td className='text-end'>1200.00</td>
//                           <td className='text-end'>4800.00</td>
//                         </tr>
//                         <tr>
//                           <td>6</td>
//                           <td>Uniform shoe Uniform socks</td>
//                           <td className='text-center'>6</td>
//                           <td className='text-end'>130.00</td>
//                           <td className='text-end'>780.00</td>
//                         </tr>
//                       </tbody>
//                     </Table>
//                   <Table striped bordered hover >
//                       <thead>
//                           <tr style={{backgroundColor:'#C0C8C6'}}>
//                             <th>50236</th>
//                             <th className='text-center' colSpan={2}>Velu Mani.K</th>
//                             <th className='text-center'>V</th>
//                             <th className='text-center'>A</th>
//                           </tr>
//                           <tr style={{backgroundColor:'#C2BBBF'}}>
//                             <th>No</th>
//                             <th>Fees Description</th>
//                             <th className='text-center'>Quantity</th>
//                             <th className='text-center'>Amount</th>
//                             <th className='text-center'>Total Amount</th>
//                           </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>1</td>
//                           <td>ID Card</td>
//                           <td className='text-center'>1</td>
//                           <td className='text-end'>165.00</td>
//                           <td className='text-end'>165.00</td>
//                         </tr>
//                         <tr>
//                           <td>2</td>
//                           <td>Digital Education</td>
//                           <td className='text-center'>1</td>
//                           <td className='text-end'>2000.00</td>
//                           <td className='text-end'>2000.00</td>
//                         </tr>
//                         <tr>
//                           <td>3</td>
//                           <td>Hostel Fees</td>
//                           <td className='text-center'>1</td>
//                           <td className='text-end'>26000.00</td>
//                           <td className='text-end'>26000.00</td>
//                         </tr>
//                         <tr>
//                           <td>4</td>
//                           <td>Mess</td>
//                           <td className='text-center'>1</td>
//                           <td className='text-end'>2700.00</td>
//                           <td className='text-end'>27000.00</td>
//                         </tr>
//                         <tr>
//                           <td>5</td>
//                           <td>School Uniform dress</td>
//                           <td className='text-center'>4</td>
//                           <td className='text-end'>1200.00</td>
//                           <td className='text-end'>4800.00</td>
//                         </tr>
//                         <tr>
//                           <td>6</td>
//                           <td>Uniform shoe Uniform socks</td>
//                           <td className='text-center'>6</td>
//                           <td className='text-end'>130.00</td>
//                           <td className='text-end'>780.00</td>
//                         </tr>
//                       </tbody>
//                     </Table>


//                     <div className='row'>
//                       <Col xs={7}>                      
//                       </Col>
//                       <Col xs={3} className='text-end' style={{marginLeft:'-60px'}}>
//                         <h6>Subtotal :</h6>
//                       </Col>
//                       <Col xs={2} className='ps-5' >
//                         <h6 style={{paddingLeft:'40px'}}>₹45,543.00</h6>
//                       </Col>
//                     </div>

                   
//                       <p className='text-danger py-2' style={{fontSize:'12px'}}>*Please review the details of this invoice prior to payment if you find discrepancies, Please contact the accounting department</p>

//                     <div className='row py-4'>
//                       <Col xs={8}>
//                          <h6>Issued date:</h6>
//                       </Col>
//                       <Col xs={4}>
//                           <hr className='mb-1'/>
//                          <h5 style={{fontSize:'15px',textAlign:'center'}}>Signature</h5>
//                       </Col>
//                     </div>  

//                   </div>
//                   {/* <footer style={{backgroundColor:'#D6D8D6'}}>
//                       <p className='text-center' style={{fontSize:'12px'}}>The Principal, Santhosha Vidhyalaya, Dohnavur – 627102 Tirunelveli Dist. Tamilnadu</p>
//                     </footer> */}

//                 </div>
//          </section>
         
//       </div>
      
//     </div>
//     </div>
//     </div>
//   )
// }

// export default Invoice

