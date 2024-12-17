import React from 'react'
import Navbar from '../../Navbar';
import Button from 'react-bootstrap/Button'
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import './button.css'
import { FaCheckCircle } from 'react-icons/fa'; // Import the check circle icon from react-icons library


const Stu_Spo_Dashboard = () => {
  const sessionExpiration = localStorage.getItem('sessionExpiration');
 
  
  console.log(sessionExpiration);
  const [studentName , setStudentName] = useState('')

  useEffect(()=>{
    const hellostudentName  = sessionStorage.getItem('name')
    setStudentName(hellostudentName)
  }, [sessionStorage.getItem('name')]);


  return (
    <div>
     <Navbar/>
      <div className='container pt-5 pb-5'>
        <div className='py-2'>
          <h3 style={{fontFamily: 'paynimo-icons'}}>Hello, {studentName}  </h3>
          <p style={{fontFamily: 'sans-serif'}}>Please take a deep breath and carefully read the Terms and Conditions before making any payment.</p>
        </div>
      <Paper elevation={24} variant="outlined" className='container py-5'>
        <h3>Terms & Conditions</h3><hr/>
        <h4 style={{fontFamily: 'auto'}}>Following Terms and Conditions apply specifically to Santhosha Vidhyalaya.</h4>
        <p>By using the services provided by Santhosha Vidhyalaya, you agree to abide by the following terms and conditions. Please read them carefully. Santhosha Vidhyalaya reserves the right to modify these terms and conditions at any time without prior notice. It is your responsibility to review these terms and conditions periodically.</p>
        <div>
          <h4 style={{fontFamily: 'paynimo-icons'}}>1. School Services:</h4>
          <p style={{fontFamily: 'sans-serif'}} className='px-4'>Santhosha Vidhyalaya provides residential and co-educational schooling services. The services include academic instruction, extracurricular activities, and other facilities offered by the school.</p>
          <h4  style={{fontFamily: 'paynimo-icons'}}>2. Online Fee Payment:</h4>
          <p style={{fontFamily: 'sans-serif'}} className='px-4'>Santhosha Vidhyalaya offers an online fee payment service through its ERP portal. This service allows students/parents to pay fees securely using various payment methods available on the website. By authorizing a payment through the online payment service, you accept these terms and conditions.</p>
          <h4 style={{fontFamily: 'paynimo-icons'}}>3. Payment Gateway:</h4>
          <p style={{fontFamily: 'sans-serif'}} className='px-4'>The online fee payment service utilizes a payment gateway provided by a third-party service provider. The credit card information provided during the payment process is processed by the payment gateway and is not supplied to the school. The school only receives the payer's name, bill number, and payment amount. It is your responsibility to ensure that the entered information is accurate.</p>
          <h4 style={{fontFamily: 'paynimo-icons'}}>4. Fee Payment Processing:</h4>
          <p style={{fontFamily: 'sans-serif'}} className='px-4'>The availability of the online fee payment system may vary. Santhosha Vidhyalaya does not guarantee uninterrupted availability. It is recommended to submit fees through offline or online payment systems before the due date to avoid any issues.</p>
          <h4 style={{fontFamily: 'paynimo-icons'}}>5. Fee Rules</h4>
          <p style={{fontFamily: 'sans-serif'}} className='px-4'>All fee rules mentioned in the Fee Card provided by Santhosha Vidhyalaya shall remain applicable.</p>
          <h4 style={{fontFamily: 'paynimo-icons'}}>6. Transaction Charges</h4>
          <p style={{fontFamily: 'sans-serif'}} className='px-4'>Online transaction charges are not included in the fee amount. The payment page provided by the service provider will specify the fees to be paid by students/parents/sponsers, including any transaction charges.</p>
          <h4 style={{fontFamily: 'paynimo-icons'}}>7. Fee Payment Availability</h4>
          <p style={{fontFamily: 'sans-serif'}} className='px-4'>The availability of the online fee payment system may vary. Santhosha Vidhyalaya does not guarantee uninterrupted availability. It is recommended to submit fees through offline or online payment systems before the due date to avoid any issues.</p>
          <h4 style={{fontFamily: 'paynimo-icons'}}>8. Failed Transactions:</h4>
          <p style={{fontFamily: 'sans-serif'}} className='px-4'>In the case of failed transactions, any transaction failure charges imposed by the participating banks will be charged additionally. Santhosha Vidhyalaya will not be responsible for any loss or damage arising from declined transactions due to various reasons, including lack of authorization, exceeding preset limits, or other payment issues.</p>
          <h4 style={{fontFamily: 'paynimo-icons'}}>9. Processing Charges</h4>
          <p style={{fontFamily: 'sans-serif'}} className='px-4'>Santhosha Vidhyalaya does not charge any processing fee or service charges from students for online payments. However, students are required to pay the transaction processing charges as applicable by the payment gateway service provider.</p>
          <h4 style={{fontFamily: 'paynimo-icons'}}>10. Taxes:</h4>
          <p style={{fontFamily: 'sans-serif'}} className='px-4'>GST and other applicable taxes will be charged in addition to the fee amount, and it is the customer's responsibility to bear these charges.</p>
          <hr/>
<h3 style={{ fontFamily: 'paynimo-icons' }}>Refund/Cancellation Policy:</h3>
<li style={{ fontFamily: 'sans-serif' }} className='px-4'>Technical Issue: In case of a technical issue where payment is deducted from the payer's account but not reflected in the official ERP of Santhosha Vidhyalaya, the payment will be manually submitted in the ERP within 7-10 working days.</li>
<li style={{ fontFamily: 'sans-serif' }} className='px-4'>Multiple Payments: If a double payment occurs and is confirmed by the payment gateway service, the school will refund the payment or adjust the amount towards the next semester fee as per the payer's request, within 7-10 working days.</li>
<li style={{ fontFamily: 'sans-serif' }} className='px-4'>Other Payments: For any other fee discrepancies, parents/students must directly contact the school, and the school's decision will be final.</li>
<li style={{ fontFamily: 'sans-serif' }} className='px-4'>There is no cancellation option for the end users after fees payment is made.</li>
<li style={{ fontFamily: 'sans-serif' }} className='px-4'>No chargeback or no refund will be permitted for fees paid through the online payment system.</li>

          <hr/>
          <h6>By using the services of Santhosha Vidhyalaya, you acknowledge and agree to the above terms and conditions.</h6>

          <div className='text-center pt-3'>
          <a href="/svsportaladmintest/student/dashboard"  class="custom-button">
     <span class="button-text">I accept all the terms and conditions and proceed to make the payment.</span>
    <svg class="button-icon" viewBox="0 0 24 24">
      <path class="icon-path" d="M9.25 16.59L5.41 12.75L4 14.16L9.25 19.41L20 8.66L18.59 7.25L9.25 16.59Z" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
 </a>  </div>

        </div>
      </Paper>
      </div>
    </div>
  )
}

export default Stu_Spo_Dashboard
