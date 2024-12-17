// ///////////////////////Student fees////////////////////////////////////////

import React,{useRef,useEffect,useState} from 'react';
import SvsInvoice from './Svs-invoice.jpg';
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
  console.log(invoiceNo);
  const[invoiceData, setinvoiceData] = useState({})


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle:'Student Invoice',
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
        console.log(response.data)
      })
      .catch(error=>  console.error(`Error : ${error}`));
  }

  
useEffect(() => {
if(invoiceNo){
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
                          }}>INVOICE</h5>
                      </Col>
                    <Col xs={3} className='text-center pt-3' >
                       <img style={{width:'60%'}} src={SvsInvoice} />
                    </Col>
                  </Row>
                </div>
                <Row className='p-4'>
                    <Col xs={8}>
                    {/* <h4>Student Details</h4>
                       <h6 className='mb-0'>Name: Mohammed Fareestha</h6>
                       <h6 className='mb-0'>Grade: XII</h6>
                       <h6 className='mb-0'>Section: B</h6>
                       <h6 className='mb-0'>Group : Biology, Maths</h6> */}
                       <Row>
                       <h4 style={{textTransform: 'uppercase',paddingBottom:'7px'}}>Student Details</h4>
                        <Col xs={2} style={{textTransform: 'uppercase',}}>
                          <h6  className='pt-1'>Name</h6>
                          <h6 className='pt-1'>Grade</h6>
                          <h6 className='pt-1'>Section</h6>
                          <h6 className='pt-1'>RollNo</h6>
                          <h6 className='pt-1'>Group</h6>
                        </Col>
                        <Col xs={10}>
                          <p className='mb-0'>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.studentName}</p>
                          <p className='mb-0 pt-2'>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.grade}</p>
                          <p className='mb-0  pt-2'>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.section}</p>
                          <p className='mb-0 pt-2'>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.rollNo}</p>
                          <p className='mb-0 pt-2'>: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.group}</p>
                        </Col>
                       </Row>
                    </Col>
                    <Col className='text-end pt-3'style={{textTransform: 'uppercase',}} xs={4}>
                      <h6>Invoice Date: <b>{invoiceData.invoiceDetails && invoiceData.invoiceDetails.invoiceDate}</b></h6>
                      <h6>Invoice NO: <b>{invoiceData.invoiceDetails && invoiceData.invoiceDetails.invoiceNo}</b></h6>
                    </Col>
                  </Row>
                  
                  <div className='container' >
                   {/* <p className='py-2' >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet quam, labore perferendis reiciendis eaque</p>  */}
                    <div className='container' >
                   <p className='py-2' > For any questions or concerns regarding this invoice, please contact us in Office</p> 
                  <Table striped bordered hover >
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Fees Description</th>
                          {/* <th className='text-center'>Quantity</th> */}
                          <th className='text-center'>Amount</th>
                          {/* <th className='text-center'>Total Amount</th> */}
                        </tr>
                      </thead>
                      <tbody>
                      {invoiceData.paymentDetails && invoiceData.paymentDetails.map((item) => {
                      
                      sno++; // Increment the sno counter
                      
                            return (
                              
                              <tr>
                                <td>{sno}</td>
                                <td>{item.fees_heading +' - '+ item.fees_sub_heading  }</td>
                                {/* <td className='text-center'>1</td> */}
                                <td className='text-end'>{item.amount ? item.amount :  " "}</td>
                                {/* <td className='text-end'>{item.amount ? item.amount :  " "}  </td> */}
                              </tr>
                            )})}
                      </tbody>
                    </Table>
                    <div className='row'>
                      <Col xs={6}>
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
                      <Col xs={3} className='text-end' style={{marginLeft:'-10px'}}>
                        <h6>Total :</h6>
                      <h6>Previous Dues :</h6>
                      {invoiceData.discount_list && invoiceData.discount_list.map((item) => { sno++; // Increment the sno counter
                      
                      return (
                            <h6>{item.discount_cat} :</h6>
                      ) })}
                        <h6>Total Discount :</h6>
                        <h6>Total Payable :</h6>
                      </Col>
                      <Col xs={3} className='ps-5' style={{textAlign:'right'}}>
                      <h6>₹{invoiceData.invoiceDetails && invoiceData.invoiceDetails.total}</h6>
                      <h6>(+) {invoiceData.invoiceDetails && invoiceData.invoiceDetails.previousDues ? '₹'+invoiceData.invoiceDetails.previousDues : '--'}</h6>
                        {invoiceData.discount_list && invoiceData.discount_list.map((item) => { sno++; // Increment the sno counter
                      
                      return (
                            <h6>(-) ₹{item.dis_amount}</h6>
                      ) })}
                        <h6>{invoiceData.invoiceDetails && invoiceData.invoiceDetails.discount ? '₹' + invoiceData.invoiceDetails.discount : '--'}</h6>
                        <h6>₹{invoiceData.invoiceDetails && invoiceData.invoiceDetails.totalPayment}</h6>
                      </Col>
                    </div>
                

                  </div>
                      <p className='text-danger py-2' style={{fontSize:'12px'}}>*Please review the details of this invoice prior to payment if you find discrepancies, Please contact the accounting department</p>
                    <div className='row py-4'>
                      <Col xs={8}>
                         <h6>Issued date: {invoiceData.invoiceDetails && invoiceData.invoiceDetails.invoiceDate}</h6>
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

export default StudentInvoice




