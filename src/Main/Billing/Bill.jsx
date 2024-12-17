import React,{useRef,useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Row,Col,Table,Button} from 'react-bootstrap';
import LogoProlife from '../Billing/prolife-logo.png'
import {useReactToPrint} from 'react-to-print';
import {AiFillPrinter} from 'react-icons/ai';
import axios from 'axios'

const Bill = () => {
  let sno = 0; 
  const { bill_no } = useParams();
  const [invoiceData, setinvoiceData] = useState({})
 
  console.log(bill_no);
 
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle:'Patient Invoice',
  })
  
  
  const innvoiceDetails = (bill_no) => {
    console.log('fffffffffffffff');
    console.log(bill_no);
    axios.get(`https://euctostaging.com/prolife/api/bills/${bill_no}/billno`,{
      // params: {
      //   invoiceId: invoiceNo,
      // }
    })
    .then(res => {
      const response = res.data;
      console.log("API Response:", response);
 
      setinvoiceData(response);   
     })
    .catch(error=>  console.error(`Error : ${error}`));
}


useEffect(() => {
if(bill_no){
  console.log("useEffect triggered with bill_no:", bill_no);
  innvoiceDetails(bill_no);
}
}, [bill_no]);



  return (
    <div className='py-5'>
<div className='container' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h4 className='text-light'>Patient Bill</h4>
  <div>
    <Button onClick={handlePrint} variant="outline-warning" role="button"><AiFillPrinter className='mr-2' size={25} />Print Now</Button>
  </div>
</div><hr/>
{/*--- Bill Design ---*/}
<div >
    <div className='container pt-4' ref={componentRef}>
       <div style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'5px'}} className='py-3 px-2'>
         <Row>
            <Col xs={2}>
              <img style={{width:'100%'}} src={LogoProlife} alt='logo'/>
            </Col>
            <Col xs={10} className='text-center'>
              <h3>PROLIFE OG HOSPITAL</h3>
              <h5 style={{fontFamily: 'sans-serif'}}>No:1, IAS/IPS colony, River view Enclave, Manapakkam, Chennai 600125</h5>
              <h5 style={{fontFamily: 'sans-serif'}}>Dr.Thamarai Ram, MBBS, DGO</h5>
              <h5 style={{fontFamily: 'sans-serif'}}>Timings: 07.30 am - 1.00pm / 04.30 pm - 09.00 pm</h5>
              <h5 style={{fontFamily: 'sans-serif'}}>Email ID: prolifeogclinic@gmail.com</h5>
              <h5 style={{fontFamily: 'sans-serif'}}>Website: www.prolifeogclinic.com</h5>
            </Col>
         </Row><hr/>
         <div className='text-center'><h2 style={{fontFamily:'sans-serif'}}>Cash Bill</h2></div>

         <Row className='px-3 pt-3'>
            <Col xs={8}>
                <Row>
                    <Col xs={4}>
                      <h5 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>Patient Name</h5>
                      <h5 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>Sex / Age</h5>
                      <h5 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>Address</h5>
                    </Col>
                    <Col xs={8}>
                      <h5 style={{fontFamily: 'sans-serif'}}>:  {invoiceData.patient?.patient_name}</h5>
                      <h5 style={{fontFamily: 'sans-serif'}}>:  {invoiceData.patient?.gender}</h5>
                      <h5 style={{fontFamily: 'sans-serif'}}>: {invoiceData.patient?.address}</h5>
                      <h5 style={{fontFamily: 'sans-serif'}}>  {invoiceData.patient?.address2}</h5>
                    </Col>
                </Row>
            </Col>
            <Col xs={4}>
                <Row>
                    <Col xs={4}>
                      <h5 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>UHID</h5>
                      <h5 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>OP No</h5>
                      <h5 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>Bill No</h5>
                      <h5 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>Bill Date</h5>
                    </Col>
                    <Col xs={8}>
                      <h5 style={{fontFamily: 'sans-serif'}}>: {invoiceData.patient?.uhid}</h5>
                      <h5 style={{fontFamily: 'sans-serif'}}>: {invoiceData.patient?.op_number}</h5>
                      <h5 style={{fontFamily: 'sans-serif'}}>: {invoiceData.bill_no}</h5>
                      <h5 style={{fontFamily: 'sans-serif'}}>: {invoiceData.date}</h5>
                    </Col>
                </Row>
            </Col>
         </Row><hr/>
         <Row>
            <Col style={{textAlign: 'center'}}>
              <h5 style={{fontWeight: '600',fontFamily: 'sans-serif'}}>Consultant : {invoiceData.doctor?.name}</h5>
            </Col>
            <Col style={{textAlign: 'center'}}>
              <h5 style={{fontWeight: '600',fontFamily: 'sans-serif'}}>Ref Dr : {invoiceData.rfdoctor?.name}</h5>
            </Col>
         </Row><hr/>
         <div>
         <Table>
         <thead>
            <tr style={{backgroundColor:'#e0e0e0'}}>
                <th>S.No</th>
                <th>Particulars</th>
                <th style={{textAlign:'end'}}>Amount</th>
            </tr>
            </thead>
            <tbody>
            {invoiceData.services && Array.isArray(invoiceData.services) && invoiceData.services.map((item) => {
                    sno++; // Increment the sno counter
                return (
                    <tr>
                        <td>{sno}</td>
                        <td>{item.service_master?.service_name}</td>
                        {/* <td>XRAY Apparatus 5</td> */}
                        <td style={{ textAlign: 'end' }}>{invoiceData.bill_amount}</td>
                    </tr>
                );
            })}

            </tbody>
            </Table><hr/>
            <div>
                <Row>
                    <Col>
                       {/* <h5 style={{fontFamily:'sans-serif'}}>*Rupees Four Hundred Only</h5> */}
                    </Col>
                    <Col>
                       <Row>
                         <Col style={{textAlign:'end'}}>
                           <h6 style={{fontWeight: '600',fontFamily: 'sans-serif'}}>Total Bill Amount :</h6>
                           <h6 style={{fontWeight: '600',fontFamily: 'sans-serif'}}>Credit Card Charges :</h6>
                           <h6 style={{fontWeight: '600',fontFamily: 'sans-serif'}}>Net Amount : </h6>
                           <h6 style={{fontWeight: '600',fontFamily: 'sans-serif'}}>Received Amount :</h6>
                         </Col>
                         <Col style={{textAlign:'end'}}>
                           <h6>{invoiceData.bill_amount}</h6>
                           <h6>0.00</h6>
                           <h6>{invoiceData.bill_amount}</h6>
                           <h6>{invoiceData.bill_amount}</h6>
                         </Col>
                       </Row>
                    </Col>
                </Row>
            </div>
         </div>

         <div className='pt-3'>
         <Table striped bordered>
         <thead>
            <tr style={{backgroundColor:'#e0e0e0'}}>
                <th>S.No</th>
                <th>Receipt Date</th>
                <th>Receipt No</th>
                <th>PayMode</th>
                <th style={{textAlign:'end'}}>Amount</th>
            </tr>
          </thead>   
          <tbody>
            <tr>
                <td>1</td>
                <td>{invoiceData.date}</td>
                <td>{invoiceData.bill_no}</td>
                <td>{invoiceData.payment_mode}</td>
                <td style={{textAlign:'end'}}>{invoiceData.bill_amount}</td>
            </tr>
            </tbody>
            </Table><hr/>
         </div>
         <div className='pt-5'>
            <Row>
                <Col>
                  <h5 style={{fontFamily:'sans-serif'}}>Bill Created By : </h5>
                </Col>
                <Col>
                   <hr style={{width:'50%',border:'none',height: '1px',backgroundColor: '#000'}}/><h5 style={{fontFamily:'sans-serif', textAlign:'center'}}>Seal & Signature</h5>
                </Col>
            </Row>
         </div>
       </div>
    </div>
    </div>
    </div>
  )
}

export default Bill
















// import React from 'react';
// import {Row,Col,Table} from 'react-bootstrap';
// import LogoProlife from '../Billing/prolife-logo.png'

// const Bill = () => {
//   return (
//     <div className='py-5'>
//       <div className='container'>
//         <h4>Patient Service Bill</h4><hr/>
//       </div>
// {/*--- Bill Design ---*/}
//     <div className='container'>
//        <div style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'5px'}} className='py-3 px-2'>
//          <Row>
//             <Col xs={2}>
//               <img style={{width:'100%'}} src={LogoProlife} alt='logo'/>
//             </Col>
//             <Col xs={10} className='text-center'>
//               <h3>PROLIFE OG CLINIC</h3>
//               <h5 style={{fontFamily: 'sans-serif'}}>No:1, IAS/IPS colony, River view Enclave, Manapakkam, Chennai 600125</h5>
//               <h5 style={{fontFamily: 'sans-serif'}}>Dr.Thamarai Ram, MBBS, DGO</h5>
//               <h5 style={{fontFamily: 'sans-serif'}}>Timings: 07.30 am - 1.00pm / 04.30 pm - 09.00 pm</h5>
//               <h5 style={{fontFamily: 'sans-serif'}}>Email ID: prolifeogclinic@gmail.com</h5>
//               <h5 style={{fontFamily: 'sans-serif'}}>Website: www.prolifeogclinic.com</h5>
//             </Col>
//          </Row><hr/>
//          <div className='text-center'><h2 style={{fontFamily:'sans-serif'}}>Cash Bill</h2></div>

//          <Row className='px-3 pt-3'>
//             <Col xs={8}>
//                 <Row>
//                     <Col xs={4}>
//                       <h6 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>Patient Name</h6>
//                       <h6 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>Sex / Age</h6>
//                       <h6 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>Address</h6>
//                     </Col>
//                     <Col xs={8}>
//                       <h6 style={{fontFamily: 'sans-serif'}}>: Kareena Kapoor</h6>
//                       <h6 style={{fontFamily: 'sans-serif'}}>: Female / 42</h6>
//                       <h6 style={{fontFamily: 'sans-serif'}}>: Mumbai, Maharashtra, India</h6>
//                     </Col>
//                 </Row>
//             </Col>
//             <Col xs={4}>
//                 <Row>
//                     <Col xs={4}>
//                       <h6 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>UHID</h6>
//                       <h6 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>OP No</h6>
//                       <h6 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>Bill No</h6>
//                       <h6 style={{fontFamily: 'sans-serif',fontWeight: '600'}}>Bill Date</h6>
//                     </Col>
//                     <Col xs={8}>
//                       <h6 style={{fontFamily: 'sans-serif'}}>: P1001</h6>
//                       <h6 style={{fontFamily: 'sans-serif'}}>: YES</h6>
//                       <h6 style={{fontFamily: 'sans-serif'}}>: PB16614</h6>
//                       <h6 style={{fontFamily: 'sans-serif'}}>: 17-07-2023 01:50PM</h6>
//                     </Col>
//                 </Row>
//             </Col>
//          </Row><hr/>
//          <Row>
//             <Col style={{textAlign: 'center'}}>
//               <h5 style={{fontWeight: '600',fontFamily: 'sans-serif'}}>Consultant : Abu Sufiyan</h5>
//             </Col>
//             <Col style={{textAlign: 'center'}}>
//               <h5 style={{fontWeight: '600',fontFamily: 'sans-serif'}}>Ref Dr : Sam Raja</h5>
//             </Col>
//          </Row><hr/>
//          <div>
//          <Table>
//             <tr style={{backgroundColor:'#e0e0e0'}}>
//                 <th>S.No</th>
//                 <th>Particulars</th>
//                 <th style={{textAlign:'end'}}>Amount</th>
//             </tr>
//             <tr>
//                 <td>1</td>
//                 <td>CONSULTATION</td>
//                 <td style={{textAlign:'end'}}>400.00</td>
//             </tr>
//             </Table><hr/>
//             <div>
//                 <Row>
//                     <Col>
//                        <h5 style={{fontFamily:'sans-serif'}}>*Rupees Four Hundred Only</h5>
//                     </Col>
//                     <Col>
//                        <Row>
//                          <Col style={{textAlign:'end'}}>
//                            <h6 style={{fontWeight: '600',fontFamily: 'sans-serif'}}>Total Bill Amount :</h6>
//                            <h6 style={{fontWeight: '600',fontFamily: 'sans-serif'}}>Credit Card Charges :</h6>
//                            <h6 style={{fontWeight: '600',fontFamily: 'sans-serif'}}>Net Amount : </h6>
//                            <h6 style={{fontWeight: '600',fontFamily: 'sans-serif'}}>Received Amount :</h6>
//                          </Col>
//                          <Col style={{textAlign:'end'}}>
//                            <h6>400.00</h6>
//                            <h6>0.00</h6>
//                            <h6>400.00</h6>
//                            <h6>400.00</h6>
//                          </Col>
//                        </Row>
//                     </Col>
//                 </Row>
//             </div>
//          </div>

//          <div className='pt-3'>
//          <Table striped bordered>
//             <tr style={{backgroundColor:'#e0e0e0'}}>
//                 <th>S.No</th>
//                 <th>Receipt Date</th>
//                 <th>Receipt No</th>
//                 <th>PayMode</th>
//                 <th style={{textAlign:'end'}}>Amount</th>
//             </tr>
//             <tr>
//                 <td>1</td>
//                 <td>17-07-2023</td>
//                 <td>RP32874</td>
//                 <td>Cash</td>
//                 <td style={{textAlign:'end'}}>400.00</td>
//             </tr>
//             </Table><hr/>
//          </div>
//          <div className='pt-5'>
//             <Row>
//                 <Col>
//                   <h5 style={{fontFamily:'sans-serif'}}>Bill Created By : Ramachandran</h5>
//                 </Col>
//                 <Col>
//                    <hr style={{width:'50%',border:'none',height: '1px',backgroundColor: '#000'}}/><h5 style={{fontFamily:'sans-serif', textAlign:'center'}}>Seal & Signature</h5>
//                 </Col>
//             </Row>
//          </div>
//        </div>
//     </div>
//     </div>
//   )
// }

// export default Bill
