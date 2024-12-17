import React,{useRef,useEffect,useState} from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import SvsInvoice from './Svs-invoice.jpg';
import schoolImage from './school 1.jpg';
import hostelImage from './hostel 1.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useReactToPrint} from 'react-to-print';
import {AiFillPrinter} from 'react-icons/ai';
import Button from '@mui/material/Button';
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';
import axios from 'axios';



const StudentInvoice = () => {
  let sno = 0; 
  const { invoiceNo } = useParams();
  const [invoiceData, setinvoiceData] = useState({})
  const [invoiceDataall, setinvoiceDataall] = useState({})
  const [disable, setdisable] = useState({})

  console.log(invoiceNo);
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
   
      axios.get(`https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list`,{
        params: {
          invoiceId: invoiceNo,
        }
      })
      .then(res => {
        const response = res.data;
        setinvoiceData(response.data);   
        setinvoiceDataall(res.data);   
        console.log(response.data);
        console.log(res.data);
        setdisable(res.data.invoiceDetails.disable);   

      

      })
      .catch(error=>  console.error(`Error : ${error}`));
  }
  // const totalAmount = invoiceData.paymentDetails.reduce((acc, item) => acc + (item.amount || 0), 0);
 
  let totalAmount = 0;

  if (invoiceData.paymentDetails) {
    for (const item of invoiceData.paymentDetails) {
      if (item.amount) {
        totalAmount += parseFloat(item.amount);
      }
    }
  }
  
  

useEffect(() => {
if(invoiceNo){
  innvoiceDetails();
}
  
}, []);


  return (
    <div>
        <div>
{/*        
       <Sidebar/> */}
    <div style={{width:'82.5%',float:'right'}} >
      {/* <Header/> */}
        <section className='text-end p-4'>
            <Button onClick={handlePrint}  style={{color :'#E91E63'}} role="button"><AiFillPrinter className='pe-2' size={35}/>Print</Button>
          </section>  
       <div ref={componentRef} className='pt-1' >
         <section className='px-5 pb-1 pt-2 m-2' >
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
    </div>
    </div>
    </div>
  )
}

export default StudentInvoice ;


// import React,{useRef,useEffect,useState} from 'react';
// import Sidebar from '../Sidebar';
// import Header from '../Header';
// import SvsInvoice from './Svs-invoice.jpg';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import {useReactToPrint} from 'react-to-print';
// import {AiFillPrinter} from 'react-icons/ai';
// import Button from '@mui/material/Button';
// import Table from 'react-bootstrap/Table';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';



// const StudentInvoice = () => {
//   let sno = 0; 
//   const { invoiceNo } = useParams();
//   const [invoiceData, setinvoiceData] = useState({})

//   console.log(invoiceNo);
//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//       content: () => componentRef.current,
//       documentTitle:'Student Invoice',
//       // onAfterPrint:()=> Swal.fire({
//       //   position: 'center',
//       //   icon: 'success',
//       //   title: 'File Download Successfully',
//       //   showConfirmButton: false,
//       //   timer: 1700
//       // })
//   })

//   const innvoiceDetails = () => {
   
//       axios.get(`https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list`,{
//         params: {
//           invoiceId: invoiceNo,
//         }
//       })
//       .then(res => {
//         const response = res.data;
//         setinvoiceData(response.data);   
//         console.log(response.data)
//       })
//       .catch(error=>  console.error(`Error : ${error}`));
//   }

  
// useEffect(() => {
// if(invoiceNo){
//   innvoiceDetails();
// }
  
// }, []);



//   return (
//     <div>
//         <div>
       
//        <Sidebar/>
//     <div style={{width:'82.5%',float:'right'}} >
//       <Header/>
//         <section className='text-end p-4'>
//             <Button onClick={handlePrint}  style={{color :'#E91E63'}} role="button"><AiFillPrinter className='pe-2' size={35}/>Print</Button>
//           </section>  
//        <div ref={componentRef} className='pt-4' >
//          <section className='px-5 pb-4' >
//             <div style={{border:'1px solid black'}}>
//                 <div className='d-flex'>
//                   <Row>
//                     <Col xs={9} className='pt-4'>
//                         <h5  style={{
//                           backgroundColor: '#0C83DC',
//                           width: '40%',
//                           borderRadius: '0 6px 6px 0px',
//                           textAlign: 'center',
//                           padding: '8px 0',
//                           textTransform: 'uppercase',
//                           color: 'aliceblue',
//                           }}>INVOICE</h5>
//                       </Col>
//                     <Col xs={3} className='text-center pt-3' >
//                        <img style={{width:'60%'}} src={SvsInvoice} />
//                     </Col>
//                   </Row>
//                 </div>
//                 <Row className='p-4'>
//                     <Col xs={8}>
//                     {/* <h4>Student Details</h4>
//                        <h6 className='mb-0'>Name: Mohammed Fareestha</h6>
//                        <h6 className='mb-0'>Grade: XII</h6>
//                        <h6 className='mb-0'>Section: B</h6>
//                        <h6 className='mb-0'>Group : Biology, Maths</h6> */}
//                        <Row>
//                        <h4 style={{textTransform: 'uppercase',paddingBottom:'7px'}}>Student Details</h4>
//                         <Col xs={2} style={{textTransform: 'uppercase',}}>
//                           <h6  className='pt-1'>Name</h6>
//                           <h6 className='pt-1'>Grade</h6>
//                           <h6 className='pt-1'>Section</h6>
//                           <h6 className='pt-1'>RollNo</h6>
//                           <h6 className='pt-1'>Group</h6>
//                         </Col>
//                         <Col xs={10}>
//                           <p className='mb-0'>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.studentName}</p>
//                           <p className='mb-0 pt-2'>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.grade}</p>
//                           <p className='mb-0  pt-2'>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.section}</p>
//                           <p className='mb-0 pt-2'>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.rollNo}</p>
//                           <p className='mb-0 pt-2'>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.group}</p>
//                         </Col>
//                        </Row>
//                     </Col>
//                     <Col className='text-end pt-3'style={{textTransform: 'uppercase',}} xs={4}>
//                       <h6>Invoice Date: <b>{invoiceData.invoiceDetails && invoiceData.invoiceDetails.invoiceDate}</b></h6>
//                       <h6>Invoice NO: <b>{invoiceData.invoiceDetails && invoiceData.invoiceDetails.invoiceNo}</b></h6>
//                     </Col>
//                   </Row>
                  
//                   <div className='container' >
//                    <p className='py-2' >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet quam, labore perferendis reiciendis eaque</p> 
//                   <Table striped bordered hover >
//                       <thead>
//                         <tr>
//                           <th>No</th>
//                           <th>Fees Description</th>
//                           {/* <th className='text-center'>Quantity</th> */}
//                           <th className='text-center'>Amount</th>
//                           {/* <th className='text-center'>Total Amount</th> */}
//                         </tr>
//                       </thead>
//                       <tbody>
//                       {invoiceData.paymentDetails && invoiceData.paymentDetails.map((item) => {
                      
//                       sno++; // Increment the sno counter
                      
//                             return (
                              
//                               <tr>
//                                 <td>{sno}</td>
//                                 <td>{item.fees_heading +' - '+ item.fees_sub_heading  }</td>
//                                 {/* <td className='text-center'>1</td> */}
//                                 <td className='text-end'>{item.amount ? item.amount :  " "}</td>
//                                 {/* <td className='text-end'>{item.amount ? item.amount :  " "}  </td> */}
//                               </tr>
//                             )})}
//                       </tbody>
//                     </Table>
//                     <div className='row'>
//                       <Col xs={6}>
//                       {/* <Table striped bordered hover size="sm" style={{width:'60%'}}>
//                           <thead>
//                           </thead>
//                           <tbody>
//                             <tr>
//                               <td style={{textAlign:'center',paddingTop:'6px',backgroundColor:'#0C83DC',color:'aliceblue',width:'45%'}}>Due Amount</td>
//                               <td><h5 className='text-end'>₹ 3240.00</h5></td>
//                             </tr>
//                           </tbody>
//                       </Table> */}
                        
//                       </Col>
//                       <Col xs={3} className='text-end' style={{marginLeft:'-10px'}}>
//                         <h6>Total :</h6>
//                         <h6>Previous Dues :</h6>
//                         <h6>Discount :</h6>
//                         <h6>Total Payable :</h6>
//                       </Col>
//                       <Col xs={3} className='ps-5' style={{textAlign:'right'}}>
//                         <h6>₹{invoiceData.invoiceDetails && invoiceData.invoiceDetails.total}</h6>
//                         <h6>{invoiceData.invoiceDetails && invoiceData.invoiceDetails.previousDues ? '₹'+invoiceData.invoiceDetails.previousDues : '--'}</h6>
//                         <h6>{invoiceData.invoiceDetails && invoiceData.invoiceDetails.discount ? '₹'+invoiceData.invoiceDetails.discount : '--'}</h6>
//                         <h6>₹{invoiceData.invoiceDetails && invoiceData.invoiceDetails.totalPayment}</h6>
//                       </Col>
//                     </div>
//                       <p className='text-danger py-2' style={{fontSize:'12px'}}>*Please review the details of this invoice prior to payment if you find discrepancies, Please contact the accounting department</p>
//                     <div className='row py-4'>
//                       <Col xs={8}>
//                          <h6>Issued date: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.invoiceDate}</h6>
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

// export default StudentInvoice ;