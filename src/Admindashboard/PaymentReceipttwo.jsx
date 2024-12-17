import React, { useRef, useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap';
import SvsInvoice from './Svs-invoice.jpg';

const PaymentReceipt = () => {
  const { paymentTransactionId } = useParams();
  const [invoiceData, setInvoiceData] = useState({});
  const componentRef = useRef();

  // Fetch invoice details
  const fetchInvoiceDetails = () => {
    axios.get(`https://santhoshavidhyalaya.com/SVSTEST/api/payment-receipt`, {
      params: { transactionNo: paymentTransactionId }
    })
    .then(res => {
      setInvoiceData(res.data.data);
    })
    .catch(error => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    if (paymentTransactionId) {
      fetchInvoiceDetails();
    }
  }, [paymentTransactionId]);

  // Generate and automatically download PDF
  const generateAndDownloadPdf = async () => {
    const input = componentRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    const fileName = `Receipt_${paymentTransactionId}_${formattedDate}.pdf`;
    
    // Automatically download the PDF
    pdf.save(fileName);

    window.close();
  };

  // Trigger PDF generation once data is loaded
  useEffect(() => {
    if (Object.keys(invoiceData).length > 0) {
      generateAndDownloadPdf();
    }
  }, [invoiceData]);

  return (
    <div>
     <div ref={componentRef} className='pt-4' >
         <section className='px-1 pb-1' >
            <div style={{border:'1px solid black'}}>
                <div className='d-flex'>
                  <Row>
                    <Col xs={9} className='pt-1'>
                        <h6  style={{
                          backgroundColor: '#0C83DC',
                          width: '40%',
                          borderRadius: '0 6px 6px 0px',
                          textAlign: 'center',
                          padding: '8px 0',
                          textTransform: 'uppercase',
                          color: 'aliceblue',
                      }}>Payment Receipt</h6>
                      <div className='pt-1 px-3'>
                      <h3 style={{fontFamily:'sans-serif' ,lineHeight:'0.8'}}>Santhosha Vidhyalaya</h3>
          <h6 style={{fontFamily:'sans-serif' ,lineHeight:'0.8'}}>Dohnavur Fellowship, </h6>
          <h6 style={{fontFamily:'sans-serif' ,lineHeight:'0.8'}}>Dohnavur – 627102, </h6>
          <h6 style={{ fontFamily: 'sans-serif' ,lineHeight:'0.8' }}>Tirunelveli District, Tamil Nadu</h6>
          <h6 style={{fontFamily:'sans-serif' ,lineHeight:'0.8'}}>Email – finance@santhoshavidhayalaya.com </h6>
          <h6 style={{fontFamily:'sans-serif' ,lineHeight:'0.8'}}>Mobile – +91 80125 12145, </h6>
                      </div>
                      </Col>
                    <Col xs={3} className='text-center pt-1' >
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
                <Container>
      <Row>
        {/* Left Table */}
        <Col xs={6}>
          <Table className='mb-1' style={{ style: 'none' }}>
            <tbody>
              <tr>
                <th style={{fontSize:'12px'}}>Transaction-No/Receipt No :</th>
                <td style={{fontSize:'12px'}}>{invoiceData.transactionDetails && invoiceData.transactionDetails.transactionNo}</td>
              </tr>
              {
  invoiceData?.transactionDetails?.ByPayInformation?.created_at && (
    <tr>
      <th  style={{fontSize: '12px'}}>Date/Time of Receipt:</th>
      <td  style={{fontSize: '12px'}}>
        {new Date(invoiceData.transactionDetails.ByPayInformation.created_at).toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        })}
      </td>
    </tr>
  )
}




              {/* Add more rows as needed */}
              {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && (
                <tr>
                  <th style={{fontSize:'12px'}}>Sponsor Name:</th>
                  <td  style={{fontSize:'12px'}}>{invoiceData.sponserorstudentDetails.sponsor_info.name}</td>
                </tr>
              )}
              {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && (
                <tr>
                  <th style={{fontSize:'12px'}}>Sponsor Company Name:</th>
                  <td  style={{fontSize:'12px'}}>{invoiceData.sponserorstudentDetails.sponsor_info.company_name}</td>
                </tr>
              )}
              {/* Add more rows as needed */}
            </tbody>
          </Table>
        </Col>
        {/* Right Table */}
        <Col xs={6}>
        <Table className='mb-1' style={{ style: 'none' }}>
                      <tbody>
            {invoiceData.transactionDetails &&  invoiceData.transactionDetails.time && (
                   <tr>
                   <th style={{fontSize:'12px'}}>Time:</th>
                   <td  style={{fontSize:'12px'}}>{ invoiceData.transactionDetails.time}</td>
                 </tr>          
              )}      
              {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && (
                <tr>
                  <th style={{fontSize:'12px'}}>Sponsor GST No:</th>
                  <td  style={{fontSize:'12px'}}>{invoiceData.sponserorstudentDetails.sponsor_info.gst}</td>
                </tr>
                          )}
                            
              {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && (
                <tr>
                  <th style={{fontSize:'12px'}}>Sponsor PAN No:</th>
                  <td  style={{fontSize:'12px'}}>{invoiceData.sponserorstudentDetails.sponsor_info.pan}</td>
                </tr>
              )}
              {/* Add more rows as needed */}
              {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && (
                <tr>
                  <th style={{fontSize:'12px'}}>Sponsor Mobile No:</th>
                  <td  style={{fontSize:'12px'}}>{invoiceData.sponserorstudentDetails.sponsor_info.phone}</td>
                </tr>
              )}
              {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && (
                <tr>
                  <th style={{fontSize:'12px'}}>Sponsor Address:</th>
                  <td  style={{fontSize:'12px'}}>{invoiceData.sponserorstudentDetails.sponsor_info.address1},{invoiceData.sponserorstudentDetails.sponsor_info.address2}<br></br>{invoiceData.sponserorstudentDetails.sponsor_info.city}</td>
                </tr>
              )}
            
            </tbody>
          </Table>
        </Col>
                  </Row>
                     <table style={{ borderCollapse: 'collapse', width: '100%', borderTop: 'null' }}>
                    <tbody>
                    {invoiceData.transactionDetails?.ByPayInformation?.amount && (
         <tr>
          <td style={{ padding: '4px', fontWeight: 'bold', fontSize: '13px' }}>Payment Mode: <span style={{paddingLeft:'220px',fontWeight:'450'}}>{invoiceData.transactionDetails.ByPayInformation.mode ?? 'Offline'}</span></td>
         
             </tr>
      
     )}
  </tbody>
</table>             
                  <table style={{ borderCollapse: 'collapse', width: '100%', borderTop: '1px solid lightgray' }}>
                    <tbody>
                  {/* {invoiceData?.transactionDetails?.invoice?.map((invoice[0], index) => ( */}
                  {invoiceData?.transactionDetails?.invoice[0] && (
 <>
         {/* First Line */}
        <tr>
          <td style={{ padding: '4px', fontWeight: 'bold', fontSize: '13px' }}>Student Name:</td>
          <td style={{ padding: '4px', fontSize: '13px' }}>{invoiceData?.transactionDetails?.invoice[0].name}</td>
          <td style={{ padding: '4px', fontWeight: 'bold', fontSize: '13px' }}>Roll No:</td>
          <td style={{ padding: '4px', fontSize: '13px' }}>{invoiceData?.transactionDetails?.invoice[0].roll_no}</td>
          <td style={{ padding: '4px', fontWeight: 'bold', fontSize: '13px' }}>Class:</td>
          <td style={{ padding: '4px', fontSize: '13px' }}>{invoiceData?.transactionDetails?.invoice[0].standard}</td>
        </tr>
        {/* Second Line */}
        <tr>
          <td style={{ padding: '4px', fontWeight: 'bold', fontSize: '13px' }}>Father Name:</td>
          <td style={{ padding: '4px', fontSize: '13px' }}>{invoiceData?.transactionDetails?.Student?.FATHER || 'N/A'}</td>
          <td style={{ padding: '4px', fontWeight: 'bold', fontSize: '13px' }}>Mother Name:</td>
          <td style={{ padding: '4px', fontSize: '13px' }}>{invoiceData?.transactionDetails?.Student?.MOTHER || 'N/A'}</td>
          {/* Empty cells to maintain alignment */}
          <td style={{ padding: '4px' }}></td>
          <td style={{ padding: '4px' }}></td>
        </tr>
                         </>
    )}
  </tbody>
</table>

    </Container>

                  
                  <div className='container pt-1'  >
                  <Table striped bordered hover  >
                      <thead style={{fontSize: '12px'}}>
                        <tr>
                          <th>No</th>
                        <th>Invoice No.</th>
                        {/* <th className='w-60'>Roll no - Name</th>
                        <th>class</th> */}
                          {/* <th className='text-center'>Overall<br></br>Payment Status</th>
                          <th className='text-center'>Invoice Amount</th>
                          <th className='text-center'>Invoice Pending <br></br> Amount</th> */}
                          <th className='text-center'>Paid Amount</th>
                        </tr>
                      </thead>
                      <tbody style={{fontSize: '13px'}}>
                   
          {invoiceData.transactionDetails?.ByPayInformation?.amount && (
  <tr>
    <td>1</td>
    <td><strong>{invoiceData.transactionDetails.ByPayInformation.transactionId}</strong></td>
    <td className='text-end'>{invoiceData.transactionDetails.ByPayInformation.amount}</td>
  </tr>
)}


                            {/* )})} */}
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
                        <h6 style={{fontSize: '11px'}}>Total :</h6>
                        {/* <h6>Paid Total :</h6>
                        <h6>Balance:</h6>
                        <h6>Total Payment :</h6> */}
                      </Col>
                      <Col xs={4} className='ps-5' style={{textAlign:'right'}}>
                        <h6 style={{fontSize: '11px'}}>₹ {invoiceData.transactionDetails?.ByPayInformation?.amount}.00</h6>
                        {/* <h6>₹{invoiceData.invoiceDetails && invoiceData.invoiceDetails.previousDues}</h6>
                        <h6>{invoiceData.invoiceDetails ? '₹ '+invoiceData.invoiceDetails.discount : '-'}</h6>
                        <h6>₹{invoiceData.invoiceDetails && invoiceData.invoiceDetails.totalPayment}</h6> */}
                      </Col>
                    </div>
                      {/* <p className='text-dark text-center py-1' style={{fontSize:'12px'}}>*Please review the details of this invoice prior to payment if you find discrepancies, Please contact the accounting department</p> */}
                    <div className='row py-4'>
                    <Row>
        <Col xs={8} style={{ fontSize: '11px' }}>
          <h6 className='pl-3' style={{ fontSize: '11px', paddingLeft:'20px'}}>Print date: {invoiceData.transactionDetails && invoiceData.transactionDetails.date}</h6>
                      </Col>
                      <Col xs={4}>
                          <hr className='mb-1'/>
                         <h5 style={{fontSize:'11px',textAlign:'center'}}>Accounts Assistant / Coordinator </h5>
                      </Col>
      </Row>
                      
                    </div>  

                  </div>
                  {/* <footer style={{backgroundColor:'#D6D8D6'}}>
                      <p className='text-center' style={{fontSize:'12px'}}>The Principal, Santhosha Vidhyalaya, Dohnavur – 627102 Tirunelveli Dist. Tamilnadu</p>
                    </footer> */}

                </div>
         </section>
         <p className='text-center' style={{fontSize:'12px'}}> THIS IS COMPUTER-GENERATED RECIEPT. NO SIGNATURE IS REQUIRED</p>

      </div>
    </div>
  );
};

export default PaymentReceipt;
