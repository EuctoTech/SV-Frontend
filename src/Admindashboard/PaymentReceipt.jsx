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
import { VscTextSize } from 'react-icons/vsc';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

const PaymentReceipt = () => {
  let sno = 0; 
  const { paymentTransactionId } = useParams();
  const [invoiceData, setinvoiceData] = useState({});
  const [delData, setDeldata] = useState([]); 
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
     documentTitle: `PAYMENT_RECEIPT_${paymentTransactionId}_${new Date().toLocaleDateString('en-GB').replace(/\//g, '_')}`, // Format: ddmmyyyy
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
  const PaymentDelReceipt = async() => {
    try {
      const willDelete = await Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this receipt!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });
      if (willDelete.isConfirmed) {
        // Proceed with the API call if the user confirms
        const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/deleterecipt`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transactionId: paymentTransactionId, // Ensure this variable is defined
          }),
        });
        const result = await response.json();
        // Store the result in a variable
        const receiptData = result.receipt;
        setDeldata(receiptData);
      // If the response is successful, show the success alert
      Swal.fire("Success!", "The receipt has been deleted successfully.", "success");
    } else {
      // User canceled the action
      Swal.fire("Cancelled", "Your receipt is safe!", "info");
    }
  } catch (error) {
    console.log(error);
    Swal.fire("Error!", "An error occurred while deleting the receipt.", "error");
  }
}
  const cancelRep = async (id) => {                      
};
useEffect(() => {
if(paymentTransactionId){
  innvoiceDetails(); 
}
}, []);
  return (
    <div>
      <div>
        {/* <Sidebar/> */}
        <div style={{width:'100%',float:'right',fontSize:'150%',backgroundColor:'white'}} >
          {/* <Header/> */}
          <section className='text-end p-4' >
            {invoiceData && !invoiceData.disable_delete && (
            <Button onClick={PaymentDelReceipt} style={{color: 'red', border: '1px solid red'}} role="button">
                Delete Receipt
            </Button>
            )}
            {invoiceData && invoiceData.disable_delete && (
              <Button disabled style={{color: 'grey', border: '1px solid grey'}} role="button">
                  Delete Receipt (Disabled)
              </Button>
            )}
            <Button onClick={handlePrint}  style={{color :'#E91E63' ,paddingLeft:'90px'}} role="button"><AiFillPrinter className='pe-2' size={35}/>Print</Button>
          </section>  
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
                        <h3 style={{fontFamily:'sans-serif'}}>Santhosha Vidhyalaya</h3>
                        <h6 style={{fontFamily:'sans-serif'}}>Dohnavur Fellowship, </h6>
                        <h6 style={{fontFamily:'sans-serif'}}>Dohnavur – 627102, </h6>
                        <h6 style={{fontFamily:'sans-serif'}}>Tirunelveli District, Tamil Nadu</h6>
                        <h6 style={{fontFamily:'sans-serif'}}>Mobile – +91 80125 12145, </h6>
                        <h6 style={{fontFamily:'sans-serif'}}>Email – finance@santhoshavidhayalaya.com </h6>
                      </div>
                    </Col>
                    <Col xs={3} className='text-center pt-1' >
                      <img style={{width:'60%'}} src={SvsInvoice} />
                    </Col>
                  </Row>
                </div>
                {/* <Container> */}
                <Row style={{padding:'20px'}}>
                {/* Left Table */}
                <Col xs={6}>
                  <Table responsive style={{ style: 'none' }}>
                    <tbody>
                      <tr>
                        <th className='mb-0'style={{fontSize:'10px'}}>Transaction-No/Receipt No :</th>
                        <td className='mb-0'style={{fontSize:'10px'}}>{invoiceData.transactionDetails && invoiceData.transactionDetails.transactionNo}</td>
                      </tr>
                      {invoiceData.transactionDetails && invoiceData.transactionDetails.date && (
                      <tr>
                        <th className='mb-0 'style={{fontSize:'10px'}}>Date:</th>
                        <td className='mb-0'style={{fontSize:'10px'}}>{invoiceData.transactionDetails.date}</td>
                      </tr>          
                      )}
                      {invoiceData.transactionDetails && invoiceData.transactionDetails.modeOfPayment && (
                      <tr>
                        <th className='mb-0 pt-1'style={{fontSize:'10px'}}>Payment Mode:</th>
                        <td className='mb-0'style={{fontSize:'10px'}}>{invoiceData.transactionDetails.modeOfPayment}</td>
                      </tr>
                      )}
                      {/* Add more rows as needed */}
                      {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && (
                      <tr>
                        <th className='mb-0'style={{fontSize:'10px'}}>Sponsor Name:</th>
                        <td className='mb-0' style={{fontSize:'10px'}}>{invoiceData.sponserorstudentDetails.sponsor_info.name}</td>
                      </tr>
                      )}
                      {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && (
                      <tr>
                        <th className='mb-0'style={{fontSize:'10px'}}>Sponsor Company Name:</th>
                        <td className='mb-0' style={{fontSize:'10px'}}>{invoiceData.sponserorstudentDetails.sponsor_info.company_name}</td>
                      </tr>
                      )}
                      {/* Add more rows as needed */}
                    </tbody>
                  </Table>
                </Col>
                {/* Right Table */}
                <Col xs={6}>
                  <Table responsive style={{ style: 'none' }}>
                    <tbody>
                    {invoiceData.transactionDetails &&  invoiceData.transactionDetails.time && (
                          <tr>
                          <th className='mb-0'style={{fontSize:'10px'}}>Time:</th>
                          <td className='mb-0' style={{fontSize:'10px'}}>{ invoiceData.transactionDetails.time}</td>
                        </tr>          
                      )}      
                      {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && (
                        <tr>
                          <th className='mb-0'style={{fontSize:'10px'}}>Sponsor GST No:</th>
                          <td className='mb-0' style={{fontSize:'10px'}}>{invoiceData.sponserorstudentDetails.sponsor_info.gst}</td>
                        </tr>
                      )}          
                      {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && (
                        <tr>
                          <th className='mb-0'style={{fontSize:'10px'}}>Sponsor PAN No:</th>
                          <td className='mb-0' style={{fontSize:'10px'}}>{invoiceData.sponserorstudentDetails.sponsor_info.pan}</td>
                        </tr>
                      )}
                      {/* Add more rows as needed */}
                      {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && (
                        <tr>
                          <th className='mb-0'style={{fontSize:'10px'}}>Sponsor Mobile No:</th>
                          <td className='mb-0' style={{fontSize:'10px'}}>{invoiceData.sponserorstudentDetails.sponsor_info.phone}</td>
                        </tr>
                      )}
                      {invoiceData.sponserorstudentDetails && invoiceData.sponserorstudentDetails.sponsor_info && (
                        <tr>
                          <th className='mb-0'style={{fontSize:'10px'}}>Sponsor Address:</th>
                          <td className='mb-0' style={{fontSize:'10px'}}>{invoiceData.sponserorstudentDetails.sponsor_info.address1},{invoiceData.sponserorstudentDetails.sponsor_info.address2}<br></br>{invoiceData.sponserorstudentDetails.sponsor_info.city}</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  </Col>
                </Row>
                {/* </Container> */}
                <div className='pt-1' style={{width:'100%',padding:'20px'}}>
                  <Table striped bordered hover  >
                    <thead style={{fontSize: '8px'}}>
                      <tr>
                        <th>No</th>
                      <th>Invoice No.</th>
                      <th className='w-60'>Roll no - Name</th>
                      <th>class</th>
                        <th className='text-center'>Paid Amount</th>
                      </tr>
                    </thead>
                    <tbody style={{fontSize: '13px'}}>
                      {invoiceData.paidinvoiceDetails && invoiceData.paidinvoiceDetails.map((item) => {
                      sno++; // Increment the sno counter
                          return (
                            <tr>
                              <td>{sno}</td>
                              <td><strong>{item.invoiceNo}</strong></td>
                              <td>{item.roll_no}-{item.name}</td>
                              <td>{item.standard}</td>
                              <td className='text-end'>{invoiceData.transactionDetails && invoiceData.transactionDetails.paymentAmount}</td>
                            </tr>
                          )})}
                    </tbody>
                  </Table>
                  <div className='row'>
                  <Col xs={4} className='text-end' style={{marginLeft:'-10px'}}>
                     </Col>
                    <Col xs={4} className='text-end' style={{marginLeft:'0px'}}>
                      <h6 style={{fontSize: '11px'}}>Total :</h6>
                    </Col>
                    <Col xs={4} className='ps-5' style={{textAlign:'right'}}>
                      <h6 style={{fontSize: '11px'}}>₹{invoiceData.transactionDetails && invoiceData.transactionDetails.paymentAmount}</h6>
                    </Col>
                  </div>
                    <p className='text-dark text-center py-1' style={{fontSize:'8px'}}>*Please review the details of this invoice prior to payment if you find discrepancies, Please contact the accounting department</p>
                  <div className='row py-4'>
                  <Row>
                    <Col xs={8} style={{ fontSize: '11px' }}>
                      <h6 className='pl-3' style={{ fontSize: '11px', paddingLeft:'20px'}}>Print date: {invoiceData.transactionDetails && invoiceData.transactionDetails.date}</h6>
                    </Col>
                    <Col xs={4}>
                        <hr className='mb-1'/>
                      <h5 style={{fontSize:'11px',textAlign:'center'}}>Accounts Assistant / Coordinator                          </h5>
                    </Col>
                  </Row>
                  </div>  
                </div>
              </div>
            </section>
            <p className='text-center' style={{fontSize:'8px'}}> THIS IS COMPUTER-GENERATED RECIEPT. NO SIGNATURE IS REQUIRED</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PaymentReceipt