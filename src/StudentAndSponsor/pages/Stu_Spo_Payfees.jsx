import React, { useEffect,useState } from 'react'
import Navbar from '../../Navbar'
import DataTable from 'react-data-table-component';
import {BiMailSend} from 'react-icons/bi';
import {FaFileInvoice,FaReceipt} from 'react-icons/fa'
import axios from 'axios';
import admin_data from './worldline_AdminData.json'
import { useParams } from 'react-router-dom';
import {RiSecurePaymentFill} from 'react-icons/ri';
import {Row, Col} from 'react-bootstrap';
import $ from 'jquery';
import './payment.css';
import Flip from 'react-reveal/Flip';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
 

 
function handleResponse(res) {
  if (typeof res != "undefined" && typeof res.paymentMethod != "undefined" && typeof res.paymentMethod.paymentTransaction != "undefined" && typeof res.paymentMethod.paymentTransaction.statusCode != "undefined" && res.paymentMethod.paymentTransaction.statusCode == "0300") {
      // success block
  } else if (typeof res != "undefined" && typeof res.paymentMethod != "undefined" && typeof res.paymentMethod.paymentTransaction != "undefined" && typeof res.paymentMethod.paymentTransaction.statusCode != "undefined" && res.paymentMethod.paymentTransaction.statusCode == "0398") {
      // initiated block
  } else {
      // error block
  }
};


const handleDownload = (id) => {
  console.log(id);
  const data = {
  'id' : id, 
  }
const personJSON = JSON.stringify(data);

window.location.href = 'https://www.santhoshavidhyalaya.com/SVSTEST/intiate-payment/'+personJSON;

};
const printInvoice = (invoiceNo) => {
  // Create a new window or tab for the print view
  const printWindow = window.open(`/svsportaladmintest/StudentInvoice/${invoiceNo}`, '_blank');
};
const printRecp = (invoiceNo) => {
  // Create a new window or tab for the print view /svsportaladmintest/PaymentReceipt/
  const printWindow = window.open(`/svsportaladmintest/student/PaymentReceipt/${invoiceNo}`, '_blank');
};
const Stu_Spo_Payfees = () => {
  const { userData } = useParams();
  const [invoices, getInvoice] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalPR, setShowModalPR] = useState(false);
  const [paymentReceiptsList, setPaymentReceiptsList] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [activeTab, setActiveTab] = useState('school');
  const [isPartialPayment, setIsPartialPayment] = useState(false);
  const [partialAmount, setPartialAmount] = useState('');
  const [payAmount, setPayamount] = useState(0);
  const userId = sessionStorage.getItem('user_id');
  const userType = sessionStorage.getItem('user_type');
   const [userSessionData, setUserSessionData] = useState({
    userId: '',
    email: '',
    name: '',
    userType: '',
    accessToken: '',
    tokenId: ''
  });

  const openModal = (invoiceNo) => {
    setPaymentReceiptsList([]);
    setShowModalPR(true);
    receiptDetails(invoiceNo);
  };

  const receiptDetails = (invoiceNo) => {
   
    axios.get(`https://www.santhoshavidhyalaya.com/SVSTEST/api/payment-receipt-list`,{
      params: {
        slno: invoiceNo,
      }
    })
    .then(res => {
      const response = res.data;
      setPaymentReceiptsList(response.data);
    })
    .catch(error=>  console.error(`Error : ${error}`));
}

  const closeModal = () => {
    setShowModalPR(false);
  };
 
  const columns = [
    {
      name: <div>Select</div>,
      cell: row => (
        <input
          type="checkbox"
         // disabled={row.dwonloadReceipt}
         disabled={row.payStatus === 'Paid'}
         onChange={(event) => handleCheckboxChange(event, row.id,row.payableAmount,row.paid,row.payStatus)} />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: <div>Invoice <br />No</div>,
      selector: row => row.invoiceNo,
      width: '150px',
      whiteSpace: 'normal', // Adjust the width as needed

    },
    {
      name: <div>Student <br />Name</div>,
      selector: row => row.studentName,
      width: '100px', // Adjust the width as needed
      wrap: true, // Allow text to wrap to the next line
      style: {
        fontSize: '14px', // Adjust the font size as needed
        fontWeight: 'bold', // Adjust the font weight as needed
        color: 'brown', // Adjust the color as needed
        whiteSpace: 'normal', // Allow text to wrap to the next line
        // Add any other CSS properties you want to customize
      },
    },
    
    
    {
      name: <div>Reg. No</div>,
      selector: row => row.studentRegNo,
      wrap: true, // Allow text to wrap to the next line
      style: {
        whiteSpace: 'normal', // Allow text to wrap to the next line
       },
    },
    {
      name: <div>Academic <br />Year</div>,
      selector: row => row.academicYear,
      wrap: true, // Allow text to wrap to the next line
      style: {
        whiteSpace: 'normal', // Allow text to wrap to the next line
       },
    },
    {
      name: <div>Fees <br />Category</div>,
      selector: row => row.feesCat,
    },
    {
      name: <div>Due <br />date</div>,
      selector: row => row.due_date,
      width: '150px', // Adjust the width as needed
      wrap: true, // Allow text to wrap to the next line
      style: {
        whiteSpace: 'normal', // Allow text to wrap to the next line
       },

    },
    {
      name: <div>Amt.</div>,
      selector: row => `${row.amount}.00`,
    },
    
    // {
    //   name: <div>Previous <br />Pending</div>,
    //   selector: row => row.previous_pending_amount,
    // },
    {
      name: <div>Payable <br />Amt.(with Dues)</div>,
      // selector: row => row.payableAmount,
      selector: row => row.payableAmount,
      style: {
        fontSize: '14px', // Adjust the font size as needed
        fontWeight: 'bold', // Adjust the font weight as needed
        color: 'red', // Adjust the color as needed
        // Add any other CSS properties you want to customize
      },
    },
    {
      name: <div>Pay <br />Status</div>,
      selector: row => row.payStatus,
      cell: row => (
        <div>
          {row.payStatus === 'Invoice generated' ? 'Not paid' : row.payStatus}
        </div>
      ),    },
    // {
    //   name: <div>
    //   Paid
    //   <br />
    //   Amount
    // </div>,
    //   selector: row => row.paid,
    //   sortable: true,
    //       wrap: true,
    //   width: '80px',
    //  },
    // {
    //   name: <div>Invoice pending</div>,
    //   selector: row => row.invoice_pending,
    // },
    {
      name: <div>Print <br />Invoice</div>,
      cell: (row) => (
           <div>
          <FaFileInvoice  onClick={() => printInvoice(row.invoiceNo)} size={20} style={{color:'#4E0172',cursor:'pointer',paddingRight:'5px'}}/>
            </div>
        
      ),    },
    {
      name:<div>Print <br />Receipt</div>,
      cell: (row) => (
        // row.dwonloadReceipt  ? (
          <div>
            <FaReceipt  onClick={() => openModal(row.id)} size={20} style={{color:'#4E0172',cursor:'pointer',paddingRight:'5px'}}/>
         {/* <FaReceipt  onClick={() => printRecp(row.paymentTransactionId)}size={20} style={{color:'#4E0172',cursor:'pointer',paddingRight:'5px'}}/>  */}
          {/* <BiMailSend size={30} style={{color:'#F9215F',cursor:'pointer'}}/> */}
          </div>
        // ):(
        //   <span>-</span>
        // ) 
      ),
    },
  ];
  // Apply conditional row styles for the entire row

  const customStyles = {
    rows: {
      style: {
        minHeight: '60px',
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold',
        backgroundColor: '#f2f2f2', // Light gray background for header cells
      },
    },
    cells: {
      style: {
        whiteSpace: 'nowrap', // Prevent text from wrapping
        overflow: 'hidden',
        textOverflow: 'unset', // Disable ellipsis (...) in rows
        fontSize: '14px', // Adjust font size as needed
        color: '#333', // Dark gray text color
        borderColor: '#ccc', // Light gray cell borders
      },
    },
    pagination: {
      style: {
        backgroundColor: '#f2f2f2', // Light gray background for pagination
        borderTop: '1px solid #ccc', // Top border for pagination
      },
    },
  }
  const conditionalRowStyles = [
    {
      when: row => row.payStatus === 'Paid',
      style: {
        background: 'lightgreen',
      },
    },
    {
      when: row => row.payStatus === 'Partial Paid',
      style: {
        background: 'lightblue',
      },
    },
    {
      when: row => row.disable === 1,
      style: {
        pointerEvents: 'none',           // Disable interactivity
        opacity: 0.6,                    // Slight transparency for a professional look
        backgroundColor: '#f0f0f0',      // Light gray background for disabled cells
        color: '#999999',                // Muted text color
        cursor: 'not-allowed',           // Change cursor to indicate disabled state
        transition: 'all 0.3s ease',     // Smooth transition for better UX
      }
    }
  ];
  
  

if(userData){
 // const urlDecodeReturnData = decodeURIComponent(userData);
  // const  retrunData = JSON.parse(urlDecodeReturnData)
  // console.log("Return Data ********:**", retrunData);
  
  // if (retrunData.status === 401) {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Payment Failed',
  //     text: retrunData.msg
  //   });
  // } else if (retrunData.status === 200) {
  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Payment Successful',
  //     text: 'Payment has been processed successfully.'
  //   });
  // }
  const decodedUrl = decodeURIComponent(userData);

// Extract the status and return_data from the URL
const match = decodedUrl.match(/"status":(\d+),"msg":"([^"]*)"/);
const status = match ? parseInt(match[1], 10) : null;
const msg = match ? match[2] : null;

// Check the status and show Swal alert
if (status === 401) {
  Swal.fire({
      icon: 'error',
      title: 'Payment Failed',
      text: msg || 'Payment failed for an unknown reason.',
  }).then(() => {
      // Change the URL after the Swal alert is closed
      window.location.href = 'https://santhoshavidhyalaya.com/svsportaladmintest/student/dashboard/';
  });
} else if (status === 200) {
  Swal.fire({
      icon: 'success',
      title: 'Payment Successful',
      text: 'Payment has been processed successfully.',
  }).then(() => {
      // Change the URL after the Swal alert is closed
      window.location.href = 'http://santhoshavidhyalaya.com/svsportaladmintest/student/dashboard/';
  });
}
}



// const handleCheckboxChange = (event, id) => {
//   if (event.target.checked) {
//     setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
//   } else {
//     setSelectedIds((prevSelectedIds) =>
//       prevSelectedIds.filter((selectedId) => selectedId !== id)
//     );
//   }
// };

// const handleCheckboxChange = (event, id, amount) => {
//   console.log(id, parseFloat(amount));
//   if (event.target.checked) {
//     setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
//     setTotalAmount((prevTotalAmount) => prevTotalAmount + parseFloat(amount));
//   } else {
//     setSelectedIds((prevSelectedIds) =>
//       prevSelectedIds.filter((selectedId) => selectedId !== id)
//     );
//     setTotalAmount((prevTotalAmount) => prevTotalAmount - parseFloat(amount));
//   }
//   setShowModal(true);
// };
const handleCheckboxChange = (event, id, amount, paid, payStatus) => {
  console.log(id, parseFloat(amount));
  let adjustedAmount = parseFloat(amount);

  // if (payStatus === 'Partial Paid') {
  //   // If payStatus is 'Partial Paid', adjust the amount based on the paid amount
  //   adjustedAmount -= parseFloat(paid);
  // }

  if (event.target.checked) {
    setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
    setTotalAmount((prevTotalAmount) => prevTotalAmount + adjustedAmount);
  } else {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.filter((selectedId) => selectedId !== id)
    );
    setTotalAmount((prevTotalAmount) => prevTotalAmount - adjustedAmount);
  }

  setShowModal(true);
};


const handleModalAction = () => {
  setShowTable(true);
  setShowModal(false);
};

useEffect(() => {
  const userId = sessionStorage.getItem('user_id');
  const email = sessionStorage.getItem('email');
  const name = sessionStorage.getItem('name');
  const userType = sessionStorage.getItem('user_type');
  const accessToken = sessionStorage.getItem('accessToken');
  const tokenId = sessionStorage.getItem('token_id');

  setUserSessionData({ userId, email, name, userType, accessToken, tokenId });

  // Check if userId exists and is not empty
  if (!userId || userId.trim() === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Sorry Timeout...',
      text: 'Session got expired! Please login again.',
      timer: 8000,
      showConfirmButton: false,
    }).then(() => {
      // Redirect to the specified location after 4 seconds
      window.location.href = '/svsportaladmintest/';
    });
  }
}, []);


let reData = '';
const handleClick = () => {
  // var currentUrl = window.location.href;
console.log("setSelectedIds", selectedIds);
var currentUrl = window.location.href;
  var lastIndex = currentUrl.lastIndexOf('/');
  var returnUrl = currentUrl.substring(0, lastIndex + 1);

  const data = {
    'invoiceIds' : selectedIds,
    'inoviceTypes': activeTab,
    'partPayment': isPartialPayment,
    'payAmount': getPayAmount(),
    'returnUrl':window.location.origin + '/svsportaladmintest/student/dashboard/',
     'reqData': userSessionData,
  }

  const jsonString = JSON.stringify(data);
  const urlEncodedJson = encodeURIComponent(jsonString);
  console.log("********",data);

  const redirectUrl = `https://www.santhoshavidhyalaya.com/SVSTEST/intiate-payment/?data=${urlEncodedJson}`;
  if (userSessionData.userId) {
    console.log(window.location.href,redirectUrl);
    
      window.location.href = redirectUrl;
  } else
  {
    Swal.fire({
      icon: 'warning',
      title: 'Sorry Timeout...',
      text: 'Session got expired !  Please login again.',
      timer: 8000,
      showConfirmButton: false
    }).then(() => {
      // Redirect to the specified location after 4 seconds
      window.location.href = '/svsportaladmintest/';
    });

   }
 

};

const getPayAmount = () =>{
  if (isPartialPayment) {
    return payAmount;
  } else {
    return totalAmount;
  }
}

    const innvoiceList = () => {
      const params = {
        'inoviceTypes': activeTab,
        'userId': userId,
        'userType':userType        
      }
      console.log("********",params);
      const url = `https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list`;
      // const url = `https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list`;
      axios.get(url,{ params })
        .then(res => {
          const response = res.data;
          console.log(response.data)
          getInvoice(response.data);
        })
        .catch(error=>  console.error(`Error : ${error}`));
    }

    
  useEffect(() => {
    innvoiceList();
    setSelectedIds([])
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedIds([])
    innvoiceList();
  };
  useEffect(() => {
    // const script = document.createElement('script');
    // script.src = 'https://www.paynimo.com/paynimocheckout/client/lib/jquery.min.js';
    // script.async = true;
    // document.body.appendChild(script);
    // script.onload = () => {
    //   // jQuery is now loaded, you can use it
    //   if(reData){
    //     jquery.pnCheckout(reqData);
    //   }
      
    // };
   
  });

    const handleCheckboxChangePayamount = () => {
    setIsPartialPayment(!isPartialPayment);
    if(!isPartialPayment)
    {
      setPayamount('');
      setPartialAmount('');
    }
    else{
      setPayamount(partialAmount);
    }
    
  };

  const handlePartialAmountChange = (event) => {
    setPartialAmount(event.target.value);
    setPayamount(event.target.value)
  };

  const isPayButtonDisabled = () => {
    if (isPartialPayment) {
      return partialAmount === '' || parseFloat(partialAmount) <= 0 || parseFloat(partialAmount) > totalAmount ;
    }
    return selectedIds.length === 0 || totalAmount <= 0;
  };



  return (
    
    <div className="App">
      <Navbar />

      <div className='container pb-5'>
{/*---------------- Button -------------------------- */}
      {/* <div className="tabs-container py-3">
        <button 
          className={`button-42 tab ${activeTab === 'school' ? 'active' : ''}`}
          onClick={() => handleTabChange('school')}>
          School Fees
        </button>{' '}
        <button
          className={`button-41 tab ${activeTab === 'other' ? 'active' : ''}`}
          onClick={() => handleTabChange('other')}>
          Other Fees
        </button>
      </div> */}
{/*---------------- Button -------------------------- */}      
        <div className="flex-container pt-5" >
     
     
     
        <div className="row">
  {/* Single Service */}
  <div className="single-service">
              <a href="./Allinvoices" className=" ">
                <div className="content">
      <span className="icon">
        {/* <i className="fab fa-battle-net"></i> */}
      </span>
      <h3 className="title">Invoices</h3>
      click here
    </div></a>
    <span className="circle-before"></span>
  </div>
  {/* Single Service */}
            <div className="single-service">
            <a href="./Allreceipts" className="learn-more">
    <div className="content">
      <span className="icon">
        {/* <i className="fab fa-asymmetrik"></i> */}
      </span>
      <h3 className="title">Receipts</h3>
     click here
    </div></a>
    <span className="circle-before"></span>
  </div>
</div>

 
            

        <div style={{ padding: '10px', borderRadius: '5px', color: 'white', marginBottom: '10px', display: 'inline-block' }}>
        <div style={{ backgroundColor: 'lightgreen', width: '15px', height: '15px', display: 'inline-block', marginRight: '5px', borderRadius: '50%' }}></div>
        <span className="text-secondary">-<b> Paid</b></span>
        <div style={{ backgroundColor: 'lightblue', width: '15px', height: '15px', display: 'inline-block', marginLeft: '20px', borderRadius: '50%' }}></div>
        <span className="text-secondary">-  <b>Partial Paid</b></span><br></br>
        <p className="text-danger badge" style={{fontFamily: 'paynimo-icons'}}>*Select or tick the row to make make payment</p>

          </div>
          <div >
           

        <DataTable
          columns={columns}
          data={invoices}
          responsive={true}
              pagination={true}
              conditionalRowStyles={conditionalRowStyles}
              highlightOnHover={true} 
              customStyles={customStyles}

              />
          
        </div>

{/*---------- Ready for payment process POPUP ----------------*/}
<div className="pt-3">
      {selectedIds.length > 0 && (
        <div style={{
          border: '2px solid #86CB92',
          // backgroundColor: '#8984E7',
          backgroundColor: '#517391',
          padding: '20px',
          color:'#ffff',
          display: 'inlineBlock',
          borderRadius: '10px',
        }}>
      <Row>
        <Col className='col-12 col-md-6 pb-3'>
  {/*----------------------- Selected Rows ----------------------------------- */}
          <h2 style={{fontFamily: 'uiMonospace'}}><RiSecurePaymentFill className='pe-1' size={40}/> Ready for payment process</h2>
          {selectedIds.map((id) => (
            <div key={id} style={{ display: 'flex', flexDirection: 'row' }} >
              {/* <p>Row ID: {id}</p> */}
            </div>
          ))}

          <h5 className='pb-2' style={{fontFamily: 'paynimo-icons'}}>Total Amount : Rs. {totalAmount}</h5>
          <div className='d-flex pb-2'>
            <h5 className='pe-3' style={{fontFamily: 'paynimo-icons'}} htmlFor="partialPaymentCheckbox">Click here for Partial Payment :</h5>

          <div className="checkbox-wrapper-12">
                <div className="cbx">
                  <input id="partialPaymentCheckbox" type="checkbox"
                  checked={isPartialPayment}
                  onChange={handleCheckboxChangePayamount}/>
                  <label htmlFor="partialPaymentCheckbox"></label>
                  <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                    <path d="M2 8.36364L6.23077 12L13 2"></path>
                  </svg>
                </div>
                {/* Gooey */}
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <defs>
                    <filter id="goo-12">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></feColorMatrix>
                      <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                    </filter>
                  </defs>
                </svg>
              </div>




          </div>
          {isPartialPayment && (
            <div className='d-flex'>
              <h5 className='pe-3' style={{fontFamily: 'paynimo-icons'}} htmlFor="partialAmountInput"> Enter Input Amount:</h5>
              <input style={{borderRadius: "8px"}} autoComplete='off'
                type="text" placeholder='Enter Paying Amount/Partial Amount'
                id="partialAmountInput"
                value={partialAmount}
                onChange={handlePartialAmountChange}
              />
            </div>
            )}
          <div className='pt-3'>
          <button class="button-32" onClick={handleClick} disabled={isPayButtonDisabled()}>
            Pay Now
          </button>
          </div>
          </Col>
          
              <Col className='col-md-6 pt-2'>
              <Flip top>
              <h5 style={{fontFamily: 'paynimo-icons',fontWeight: 'bold',color:'rgb(255 243 97)'}}>Instructions for Payment Process</h5></Flip>
              <div style={{fontFamily: 'fangsong'}}>
                <li>Welcome to the School Online Fee Management portal! </li>
                <li>In the payment section, view your outstanding fees summary.</li>
                <li>Review the list of fees displayed, including tuition, Hotel, and any other applicable charges.</li>
                <li>Choose your preferred payment method from the options provided. Common methods include credit/debit card, bank transfer, or online payment platforms</li>
                <li>Click on the corresponding payment method to proceed.</li>
                <li>If you encounter any issues during the payment process, such as errors or unsuccessful transactions, please contact the School Finance Office or the technical support team for assistance</li>
                <li>After a successful payment, you will receive a confirmation message on the portal, indicating that your payment has been processed.</li>
                <li>You can also download or print a receipt for your records. The receipt will contain transaction details, including the payment amount, date, and reference number.</li>
              </div>
              </Col>
      </Row>
        </div>
      )}
    </div>
 
      </div>
    </div>

    {showModalPR && (
        <Modal show={showModalPR} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {paymentReceiptsList.map((data, index) => (
          <>
          <p style={{cursor: 'pointer',color: 'blue'}} onClick={() => printRecp(data.payment_transaction_id)}>Receipt {index + 1}</p>
          </>
        ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {/* Additional buttons can go here */}
        </Modal.Footer>
      </Modal>
      )}

    </div>
  );
  


}

const PrintComponent = () => {
  const [feesData, setFeesData] = useState([]);

  useEffect(() => {
    // Fetch data using Axios
    axios.get('https://example.com/fees-data')
      .then(response => {
        // Set the fetched data to the state
        setFeesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching fees data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Fees Description</h2>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {feesData.map((fees, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{fees.description}</td>
              <td>{fees.quantity}</td>
              <td>{fees.amount}</td>
              <td>{fees.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stu_Spo_Payfees
















// import React, { useEffect,useState } from 'react'
// import Navbar from '../Navbar'
// import DataTable from 'react-data-table-component';
// import {BiMailSend} from 'react-icons/bi';
// import {FaFileInvoice,FaReceipt} from 'react-icons/fa'
// import axios from 'axios';
// import admin_data from './worldline_AdminData.json'
// import { useParams } from 'react-router-dom';
// import {RiSecurePaymentFill} from 'react-icons/ri'
// import $ from 'jquery';
// import './payment.css'

// function handleResponse(res) {
//   if (typeof res != "undefined" && typeof res.paymentMethod != "undefined" && typeof res.paymentMethod.paymentTransaction != "undefined" && typeof res.paymentMethod.paymentTransaction.statusCode != "undefined" && res.paymentMethod.paymentTransaction.statusCode == "0300") {
//       // success block
//   } else if (typeof res != "undefined" && typeof res.paymentMethod != "undefined" && typeof res.paymentMethod.paymentTransaction != "undefined" && typeof res.paymentMethod.paymentTransaction.statusCode != "undefined" && res.paymentMethod.paymentTransaction.statusCode == "0398") {
//       // initiated block
//   } else {
//       // error block
//   }
// };





// const handleDownload = (id) => {
//   console.log(id);
//   const data = {
//   'id' : id, 
//   }
// const personJSON = JSON.stringify(data);

// window.location.href = 'https://www.santhoshavidhyalaya.com/SVSTEST/intiate-payment/'+personJSON;

// };

// const Payfees = () => {
//   const { userData } = useParams();
//   const [invoices, getInvoice] = useState('');
//   const [reqData, setreqData] = useState('')
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [activeTab, setActiveTab] = useState('school');
//   const [isPartialPayment, setIsPartialPayment] = useState(false);
//   const [partialAmount, setPartialAmount] = useState('');
//   const [payAmount, setPayamount] = useState(0);
//   const userId = sessionStorage.getItem('user_id');
//   const userType = sessionStorage.getItem('user_type');

//   console.log("selectedIds :",selectedIds);
//   const columns = [
//     {
//       name: 'Select',
//       cell: row => (
//         <input
//           type="checkbox"
//           disabled={row.dwonloadReceipt}
//           onChange={(event) => handleCheckboxChange(event, row.id,row.payableAmount)}
//         />
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//     {
//       name: 'Invoice No',
//       selector: row => row.invoiceNo,
//       sortable: true,
//     },
//     {
//       name: 'Student Name',
//       selector: row => row.studentName,
//       sortable: true,
//     },
//     {
//       name: 'Reg. No',
//       selector: row => row.studentRegNo,
//       sortable: true,
//     },
//     {
//       name: 'Academic Year',
//       selector: row => row.academicYear,
//       sortable: true,
//     },
//     {
//       name: 'Fees Category',
//       selector: row => row.feesCat,
//       sortable: true,
//     },
//     {
//       name: 'Due date',
//       selector: row => row.due_date,
//       sortable: true,
//     },
//     {
//       name: 'Actual Amount',
//       selector: row => row.amount,
//       sortable: true,
//     },
//     {
//       name: 'Previous Pending',
//       selector: row => row.previous_pending_amount,
//       sortable: true,
//     },
//     {
//       name: 'Payable Amount',
//       selector: row => row.payableAmount,
//       sortable: true,
//     },
//     {
//       name: 'Pay Status',
//       selector: row => row.payStatus,
//       sortable: true,
//     },
//     {
//       name: 'Paid Amount',
//       selector: row => row.paid,
//       sortable: true,
//     },
//     {
//       name: 'Invoice pending',
//       selector: row => row.invoice_pending,
//       sortable: true,
//     },
//     {
//       name: 'Action',
//       sortable: true,
//       cell: (row) => (
//         row.dwonloadReceipt  ? (
//           <div>
//           <a href={`/StudentInvoice/${row.invoiceNo}`} target="_blank"> <FaFileInvoice size={20} style={{color:'#4E0172',cursor:'pointer',paddingRight:'5px'}}/></a>
//           <a href={`/PaymentReceipt/${row.paymentTransactionId}`} target="_blank"> <FaReceipt size={20} style={{color:'#4E0172',cursor:'pointer',paddingRight:'5px'}}/></a> 
//           <BiMailSend size={30} style={{color:'#F9215F',cursor:'pointer'}}/>
//           </div>
//         ):(
//           <span>-</span>
//         ) 
//       ),
//     },
//   ];




// if(userData){
//   const urlDecodeReturnData = decodeURIComponent(userData);
//   const  retrunData = JSON.parse(urlDecodeReturnData)
//   console.log("Return Data ********:**",retrunData);
// }



// // const handleCheckboxChange = (event, id) => {
// //   if (event.target.checked) {
// //     setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
// //   } else {
// //     setSelectedIds((prevSelectedIds) =>
// //       prevSelectedIds.filter((selectedId) => selectedId !== id)
// //     );
// //   }
// // };

// const handleCheckboxChange = (event, id, amount) => {
//   console.log(id, parseFloat(amount));
//   if (event.target.checked) {
//     setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
//     setTotalAmount((prevTotalAmount) => prevTotalAmount + parseFloat(amount));
//   } else {
//     setSelectedIds((prevSelectedIds) =>
//       prevSelectedIds.filter((selectedId) => selectedId !== id)
//     );
//     setTotalAmount((prevTotalAmount) => prevTotalAmount - parseFloat(amount));
//   }
// };

// let reData = '';
// const handleClick = () => {
//   console.log("setSelectedIds",selectedIds);
//   const data = {
//     'invoiceIds' : selectedIds,
//     'inoviceTypes': activeTab,
//     'partPayment': isPartialPayment,
//     'payAmount': payAmount,
//     // 'retunUrl':'http://localhost:3000/Payfees/',
//     'returnUrl': window.location.href + '/',
//     'reqData':{
//       "id": "e9dc7b9a9187c3800f3fe8184c1a8439f202eeab982697be5fab409342a771f5d593c599f0a37b03",
//       "user_id": 12,
//       "client_id": 1,
//       "name": "Myapp",
//       "scopes": [],
//       "revoked": false,
//       "created_at": "2023-05-21 14:39:23",
//       "updated_at": "2023-05-21 14:39:23",
//       "expires_at": "2024-05-21T14:39:23.000000Z"
//   },
//   "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTlkYzdiOWE5MTg3YzM4MDBmM2ZlODE4NGMxYTg0MzlmMjAyZWVhYjk4MjY5N2JlNWZhYjQwOTM0MmE3NzFmNWQ1OTNjNTk5ZjBhMzdiMDMiLCJpYXQiOjE2ODQ2Nzk5NjMsIm5iZiI6MTY4NDY3OTk2MywiZXhwIjoxNzE2MzAyMzYzLCJzdWIiOiIyMyIsInNjb3BlcyI6W119.YFIFSOFz7uqtWJAnLFGbKLEjLx2jGYg3h90LZbau3PZCX88IX7JxEmFCy4wgw3rkOP2P2yJxlQsJCfx5dVtgn0FxAVnryVTjxXgyJieu37fwGjnp8mR35dSr7M_9DjZVdHSrBRT9l085irPv3uLrr9ahJ9Egf-zUbGbk955nUJvPQMtZ8oxdrQvZPDeIrYKEzmGJAQQYBog6lJvVLikl-D-h7y_96pxliM0h6dgjIvLJeEx9XoG5iA2-uEYm-7rxUpJj41089cE8pQL69oWK-6hA3gulMdS1z8r6AALGNo-M5sHy8cFwMFEk5xBpyJlp_mY4EfNdDWqEvy7wFtnHWw_NJtDe_NFxs-76_YDQ9OseZPyDweGRyebcxfzRPXA5Mx-xlFmyfkR1L83EtUpKLnsrLwm1-n5z-zl0fLQseg0ESyTF4Xufy3s15533mF1O3pw7hmBWqkYRVqqxGMUKgZd_0qF3ExifM_AsB0NNagXBbthQ_BxPEsmNvfx0TPZ5F05W5wottrZhy5lO6CeqDSDyYQ9xStLCMiDjiNFkT5j_5HD5jlfvEIvvwq0hnbxE0RHLC0a30NnMguXsoL_OtO0Cyjg9eaRad6yyxuRQ_8TmiKCuykqueZrTMnX7GS1mUh15dB8V3nkhHf3xEKf3mhCzpd4PdxXEYpdscBvstp0",
//   }

//   const jsonString = JSON.stringify(data);
//   const urlEncodedJson = encodeURIComponent(jsonString);
//   console.log("********",data);

//   const redirectUrl = `https://www.santhoshavidhyalaya.com/SVSTEST/intiate-payment/?data=${urlEncodedJson}`;

//   window.location.href = redirectUrl;

// };



//     const innvoiceList = () => {
//       const params = {
//         'inoviceTypes': activeTab,
//         'userId': userId,
//         'userType':userType        
//       }
//       console.log("********",params);
//       const url = `https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list`;
//       // const url = `https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list`;
//       axios.get(url,{ params })
//         .then(res => {
//           const response = res.data;
//           console.log(response.data)
//           getInvoice(response.data);
//         })
//         .catch(error=>  console.error(`Error : ${error}`));
//     }

    
//   useEffect(() => {
//     innvoiceList();
//     setSelectedIds([])
//   }, []);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setSelectedIds([])
//     innvoiceList();
//   };
//   useEffect(() => {
//     // const script = document.createElement('script');
//     // script.src = 'https://www.paynimo.com/paynimocheckout/client/lib/jquery.min.js';
//     // script.async = true;
//     // document.body.appendChild(script);
//     // script.onload = () => {
//     //   // jQuery is now loaded, you can use it
//     //   if(reData){
//     //     jquery.pnCheckout(reqData);
//     //   }
      
//     // };
   
//   });


  

//   const handleCheckboxChangePayamount = () => {
//     setIsPartialPayment(!isPartialPayment);
//     if(!isPartialPayment)
//     {
//       setPayamount(0);
//     }
//     else{
//       setPayamount(partialAmount);
//     }
    
    
//   };

//   const handlePartialAmountChange = (event) => {
//     setPartialAmount(event.target.value);
//     setPayamount(event.target.value)
//   };

//   const isPayButtonDisabled = () => {
//     if (isPartialPayment) {
//       return partialAmount === '' || parseFloat(partialAmount) <= 0 || parseFloat(partialAmount) > totalAmount ;
//     }
//     return selectedIds.length === 0 || totalAmount <= 0;
//   };



//   return (
    
//     <div className="App">
//       <Navbar />
//       <div className='container pb-5'>
//       {/* <h2 className='my-3'>Payfees</h2> */}
//       {/* Button */}
//       <div className="tabs-container py-3">
//         <button 
//           className={`button-42 tab ${activeTab === 'school' ? 'active' : ''}`}
//           onClick={() => handleTabChange('school')}>
//           School Fees
//         </button>{' '}
//         <button
//           className={`button-41 tab ${activeTab === 'other' ? 'active' : ''}`}
//           onClick={() => handleTabChange('other')}>
//           Other Fees
//         </button>
//       </div>
//       <div className="flex-container" >
//       <div className="left-container">
//           <DataTable
//             columns={columns}
//             data={invoices}
//             responsive={true}
//             pagination={true}
//           />
//         </div>
//         <div className="pt-3">
//       {selectedIds.length > 0 && (
//         <div style={{
//           border: '2px solid #86CB92',
//           backgroundColor: 'rgb(230 255 234)',
//           padding: '20px',
//           display: 'inlineBlock',
//         }}>
//   {/*----------------------- Selected Rows ----------------------------------- */}
//           <h2 style={{fontFamily: 'uiMonospace'}}><RiSecurePaymentFill className='pe-1' size={40}/> Ready for payment process</h2>
//           {selectedIds.map((id) => (
//             <div key={id} style={{ display: 'flex', flexDirection: 'row' }} >
//               {/* <p>Row ID: {id}</p> */}
//             </div>
//           ))}

//           <h5 className='pb-2'>Total Amount : {totalAmount}</h5>
//           <div className='d-flex pb-2'>
//             <h5 className='pe-3' htmlFor="partialPaymentCheckbox">Partial Payment :</h5>
//             {/* <input 
//               type="checkbox"
//               id="partialPaymentCheckbox"
//               checked={isPartialPayment}
//               onChange={handleCheckboxChangePayamount}
//             /> */}

//           <div className="checkbox-wrapper-12">
//                 <div className="cbx">
//                   <input id="partialPaymentCheckbox" type="checkbox"
//                   checked={isPartialPayment}
//                   onChange={handleCheckboxChangePayamount}/>
//                   <label htmlFor="partialPaymentCheckbox"></label>
//                   <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
//                     <path d="M2 8.36364L6.23077 12L13 2"></path>
//                   </svg>
//                 </div>
//                 {/* Gooey */}
//                 <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
//                   <defs>
//                     <filter id="goo-12">
//                       <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
//                       <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></feColorMatrix>
//                       <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
//                     </filter>
//                   </defs>
//                 </svg>
//               </div>




//           </div>
//           {isPartialPayment && (
//             <div className='d-flex'>
//               <h5 className='pe-3' htmlFor="partialAmountInput">Partial Amount:</h5>
//               <input style={{borderRadius: "8px"}} autoComplete='off'
//                 type="text"
//                 id="partialAmountInput"
//                 value={partialAmount}
//                 onChange={handlePartialAmountChange}
//               />
//             </div>
//           )}
//           <div className='pt-3'>
//           <button class="button-32" onClick={handleClick} disabled={isPayButtonDisabled()}>
//             Pay Now
//           </button>
//           </div>
//         </div>
//       )}
//     </div>
        
//       </div>
//     </div>
//     </div>
//   );
  


// }

// const PrintComponent = () => {
//   const [feesData, setFeesData] = useState([]);

//   useEffect(() => {
//     // Fetch data using Axios
//     axios.get('https://example.com/fees-data')
//       .then(response => {
//         // Set the fetched data to the state
//         setFeesData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching fees data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Fees Description</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>No.</th>
//             <th>Description</th>
//             <th>Quantity</th>
//             <th>Amount</th>
//             <th>Total Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {feesData.map((fees, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{fees.description}</td>
//               <td>{fees.quantity}</td>
//               <td>{fees.amount}</td>
//               <td>{fees.totalAmount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Payfees



















// import React, { useEffect,useState } from 'react'
// import Navbar from '../Navbar'
// import DataTable from 'react-data-table-component';
// import {BiMailSend} from 'react-icons/bi';
// import {FaFileInvoice,FaReceipt} from 'react-icons/fa'
// import axios from 'axios';
// import admin_data from './worldline_AdminData.json'
// import { useParams } from 'react-router-dom';
// import {RiSecurePaymentFill} from 'react-icons/ri';
// import {Row, Col} from 'react-bootstrap';
// import $ from 'jquery';
// import './payment.css';
// import Flip from 'react-reveal/Flip';
// import { Modal, Button } from 'react-bootstrap';

// function handleResponse(res) {
//   if (typeof res != "undefined" && typeof res.paymentMethod != "undefined" && typeof res.paymentMethod.paymentTransaction != "undefined" && typeof res.paymentMethod.paymentTransaction.statusCode != "undefined" && res.paymentMethod.paymentTransaction.statusCode == "0300") {
//       // success block
//   } else if (typeof res != "undefined" && typeof res.paymentMethod != "undefined" && typeof res.paymentMethod.paymentTransaction != "undefined" && typeof res.paymentMethod.paymentTransaction.statusCode != "undefined" && res.paymentMethod.paymentTransaction.statusCode == "0398") {
//       // initiated block
//   } else {
//       // error block
//   }
// };
// const handleDownload = (id) => {
//   console.log(id);
//   const data = {
//   'id' : id, 
//   }
// const personJSON = JSON.stringify(data);

// window.location.href = 'https://www.santhoshavidhyalaya.com/SVSTEST/intiate-payment/'+personJSON;

// };
// const printInvoice = (invoiceNo) => {
//   // Create a new window or tab for the print view
//   const printWindow = window.open(`/svsportaladmintest/StudentInvoice/${invoiceNo}`, '_blank');
// };
// const printRecp = (invoiceNo) => {
//   // Create a new window or tab for the print view /svsportaladmintest/PaymentReceipt/
//   const printWindow = window.open(`/svsportaladmintest/PaymentReceipt/${invoiceNo}`, '_blank');
// };
// const Payfees = () => {
//   const { userData } = useParams();
//   const [invoices, getInvoice] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [showTable, setShowTable] = useState(false);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [activeTab, setActiveTab] = useState('school');
//   const [isPartialPayment, setIsPartialPayment] = useState(false);
//   const [partialAmount, setPartialAmount] = useState('');
//   const [payAmount, setPayamount] = useState(0);
//   const userId = sessionStorage.getItem('user_id');
//   const userType = sessionStorage.getItem('user_type');

 
//   const columns = [
//     {
//       name: <div>Select</div>,
//       cell: row => (
//         <input
//           type="checkbox"
//           disabled={row.dwonloadReceipt}
//           onChange={(event) => handleCheckboxChange(event, row.id,row.payableAmount)} />
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//     {
//       name: <div>Invoice <br />No</div>,
//       selector: row => row.invoiceNo,
//     },
//     {
//       name: <div>Student <br />Name</div>,
//       selector: row => row.studentName,
//     },
//     {
//       name: <div>Reg. No</div>,
//       selector: row => row.studentRegNo,
//     },
//     {
//       name: <div>Academic <br />Year</div>,
//       selector: row => row.academicYear,
//     },
//     {
//       name: <div>Fees <br />Category</div>,
//       selector: row => row.feesCat,
//     },
//     {
//       name: <div>Due <br />date</div>,
//       selector: row => row.due_date,
//     },
//     {
//       name: <div>Actual <br />Amount</div>,
//       selector: row => row.amount,
//     },
//     {
//       name: <div>Previous <br />Pending</div>,
//       selector: row => row.previous_pending_amount,
//     },
//     {
//       name: <div>Payable <br />Amount</div>,
//       selector: row => row.payableAmount,
//     },
//     {
//       name: <div>Pay <br />Status</div>,
//       selector: row => row.payStatus,
//       cell: row => <div>{row.payStatus}</div>,
//     },
//     {
//       name: <div>
//       Paid
//       <br />
//       Amount
//     </div>,
//       selector: row => row.paid,
//       sortable: true,
//           wrap: true,
//       width: '80px',
//      },
//     {
//       name: <div>Invoice pending</div>,
//       selector: row => row.invoice_pending,
//     },
//     {
//       name: <div>Print <br />Invoice</div>,
//       cell: (row) => (
//            <div>
//           <FaFileInvoice  onClick={() => printInvoice(row.invoiceNo)} size={20} style={{color:'#4E0172',cursor:'pointer',paddingRight:'5px'}}/>
//             </div>
        
//       ),    },
//     {
//       name: 'Action',
//       cell: (row) => (
//         row.dwonloadReceipt  ? (
//           <div>
//          <FaReceipt  onClick={() => printRecp(row.paymentTransactionId)}size={20} style={{color:'#4E0172',cursor:'pointer',paddingRight:'5px'}}/> 
//           {/* <BiMailSend size={30} style={{color:'#F9215F',cursor:'pointer'}}/> */}
//           </div>
//         ):(
//           <span>-</span>
//         ) 
//       ),
//     },
//   ];
 
//   const conditionalRowStyles = [
//     {
//       when: row => row.payStatus === 'Paid',
//       style: {
//         background: 'lightgreen',
//       },
//     },
//     {
//       when: row => row.payStatus === 'Partial Paid',
//       style: {
//         background: 'lightblue',
//       },
//     },
//   ];

// if(userData){
//   const urlDecodeReturnData = decodeURIComponent(userData);
//   const  retrunData = JSON.parse(urlDecodeReturnData)
//   console.log("Return Data ********:**",retrunData);
// }



// // const handleCheckboxChange = (event, id) => {
// //   if (event.target.checked) {
// //     setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
// //   } else {
// //     setSelectedIds((prevSelectedIds) =>
// //       prevSelectedIds.filter((selectedId) => selectedId !== id)
// //     );
// //   }
// // };

// const handleCheckboxChange = (event, id, amount) => {
//   console.log(id, parseFloat(amount));
//   if (event.target.checked) {
//     setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
//     setTotalAmount((prevTotalAmount) => prevTotalAmount + parseFloat(amount));
//   } else {
//     setSelectedIds((prevSelectedIds) =>
//       prevSelectedIds.filter((selectedId) => selectedId !== id)
//     );
//     setTotalAmount((prevTotalAmount) => prevTotalAmount - parseFloat(amount));
//   }
//   setShowModal(true);
// };

// const handleModalAction = () => {
//   setShowTable(true);
//   setShowModal(false);
// };


// let reData = '';
// const handleClick = () => {
//   // var currentUrl = window.location.href;
// console.log("setSelectedIds", selectedIds);
// var currentUrl = window.location.href;
//   var lastIndex = currentUrl.lastIndexOf('/');
//   var returnUrl = currentUrl.substring(0, lastIndex + 1);

//   const data = {
//     'invoiceIds' : selectedIds,
//     'inoviceTypes': activeTab,
//     'partPayment': isPartialPayment,
//     'payAmount': payAmount?payAmount:totalAmount,
//     'returnUrl':window.location.origin + '/svsportaladmintest/payfees/',
//       //'returnUrl':returnUrl,
//       'reqData': {
//       "id": "e9dc7b9a9187c3800f3fe8184c1a8439f202eeab982697be5fab409342a771f5d593c599f0a37b03",
//       "user_id": 12,
//       "client_id": 1,
//       "name": "Myapp",
//       "scopes": [],
//       "revoked": false,
//       "created_at": "2023-05-21 14:39:23",
//       "updated_at": "2023-05-21 14:39:23",
//       "expires_at": "2024-05-21T14:39:23.000000Z"
//   },
//   "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTlkYzdiOWE5MTg3YzM4MDBmM2ZlODE4NGMxYTg0MzlmMjAyZWVhYjk4MjY5N2JlNWZhYjQwOTM0MmE3NzFmNWQ1OTNjNTk5ZjBhMzdiMDMiLCJpYXQiOjE2ODQ2Nzk5NjMsIm5iZiI6MTY4NDY3OTk2MywiZXhwIjoxNzE2MzAyMzYzLCJzdWIiOiIyMyIsInNjb3BlcyI6W119.YFIFSOFz7uqtWJAnLFGbKLEjLx2jGYg3h90LZbau3PZCX88IX7JxEmFCy4wgw3rkOP2P2yJxlQsJCfx5dVtgn0FxAVnryVTjxXgyJieu37fwGjnp8mR35dSr7M_9DjZVdHSrBRT9l085irPv3uLrr9ahJ9Egf-zUbGbk955nUJvPQMtZ8oxdrQvZPDeIrYKEzmGJAQQYBog6lJvVLikl-D-h7y_96pxliM0h6dgjIvLJeEx9XoG5iA2-uEYm-7rxUpJj41089cE8pQL69oWK-6hA3gulMdS1z8r6AALGNo-M5sHy8cFwMFEk5xBpyJlp_mY4EfNdDWqEvy7wFtnHWw_NJtDe_NFxs-76_YDQ9OseZPyDweGRyebcxfzRPXA5Mx-xlFmyfkR1L83EtUpKLnsrLwm1-n5z-zl0fLQseg0ESyTF4Xufy3s15533mF1O3pw7hmBWqkYRVqqxGMUKgZd_0qF3ExifM_AsB0NNagXBbthQ_BxPEsmNvfx0TPZ5F05W5wottrZhy5lO6CeqDSDyYQ9xStLCMiDjiNFkT5j_5HD5jlfvEIvvwq0hnbxE0RHLC0a30NnMguXsoL_OtO0Cyjg9eaRad6yyxuRQ_8TmiKCuykqueZrTMnX7GS1mUh15dB8V3nkhHf3xEKf3mhCzpd4PdxXEYpdscBvstp0",
//   }

//   const jsonString = JSON.stringify(data);
//   const urlEncodedJson = encodeURIComponent(jsonString);
//   console.log("********",data);

//   const redirectUrl = `https://www.santhoshavidhyalaya.com/SVSTEST/intiate-payment/?data=${urlEncodedJson}`;

//   window.location.href = redirectUrl;

// };



//     const innvoiceList = () => {
//       const params = {
//         'inoviceTypes': activeTab,
//         'userId': userId,
//         'userType':userType        
//       }
//       console.log("********",params);
//       const url = `https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list`;
//       // const url = `https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list`;
//       axios.get(url,{ params })
//         .then(res => {
//           const response = res.data;
//           console.log(response.data)
//           getInvoice(response.data);
//         })
//         .catch(error=>  console.error(`Error : ${error}`));
//     }

    
//   useEffect(() => {
//     innvoiceList();
//     setSelectedIds([])
//   }, []);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setSelectedIds([])
//     innvoiceList();
//   };
//   useEffect(() => {
//     // const script = document.createElement('script');
//     // script.src = 'https://www.paynimo.com/paynimocheckout/client/lib/jquery.min.js';
//     // script.async = true;
//     // document.body.appendChild(script);
//     // script.onload = () => {
//     //   // jQuery is now loaded, you can use it
//     //   if(reData){
//     //     jquery.pnCheckout(reqData);
//     //   }
      
//     // };
   
//   });

//   const handleCheckboxChangePayamount = () => {
//     setIsPartialPayment(!isPartialPayment);
//     if(!isPartialPayment)
//     {
//       setPayamount(0);
//     }
//     else{
//       setPayamount(partialAmount);
//     }
    
    
//   };

//   const handlePartialAmountChange = (event) => {
//     setPartialAmount(event.target.value);
//     setPayamount(event.target.value)
//   };

//   const isPayButtonDisabled = () => {
//     if (isPartialPayment) {
//       return partialAmount === '' || parseFloat(partialAmount) <= 0 || parseFloat(partialAmount) > totalAmount ;
//     }
//     return selectedIds.length === 0 || totalAmount <= 0;
//   };



//   return (
    
//     <div className="App">
//       <Navbar />

//       <div className='container pb-5'>
// {/*---------------- Button -------------------------- */}
//       {/* <div className="tabs-container py-3">
//         <button 
//           className={`button-42 tab ${activeTab === 'school' ? 'active' : ''}`}
//           onClick={() => handleTabChange('school')}>
//           School Fees
//         </button>{' '}
//         <button
//           className={`button-41 tab ${activeTab === 'other' ? 'active' : ''}`}
//           onClick={() => handleTabChange('other')}>
//           Other Fees
//         </button>
//       </div> */}
// {/*---------------- Button -------------------------- */}      
//         <div className="flex-container pt-5" >
//         <div style={{ padding: '10px', borderRadius: '5px', color: 'white', marginBottom: '10px', display: 'inline-block' }}>
//         <div style={{ backgroundColor: 'lightgreen', width: '15px', height: '15px', display: 'inline-block', marginRight: '5px', borderRadius: '50%' }}></div>
//         <span className="text-secondary">-<b> Paid</b></span>
//         <div style={{ backgroundColor: 'lightblue', width: '15px', height: '15px', display: 'inline-block', marginLeft: '20px', borderRadius: '50%' }}></div>
//         <span className="text-secondary">-  <b>Partial Paid</b></span><br></br>
//         <p className="text-danger badge" style={{fontFamily: 'paynimo-icons'}}>*Select or tick the row to make make payment</p>

//           </div>
//           <div >
           

//         <DataTable
//           columns={columns}
//           data={invoices}
//           responsive={true}
//               pagination={true}
//               conditionalRowStyles={conditionalRowStyles}
//               />
//         </div>

// {/*---------- Ready for payment process POPUP ----------------*/}
// <div className="pt-3">
//       {selectedIds.length > 0 && (
//         <div style={{
//           border: '2px solid #86CB92',
//           // backgroundColor: '#8984E7',
//           backgroundColor: '#517391',
//           padding: '20px',
//           color:'#ffff',
//           display: 'inlineBlock',
//           borderRadius: '10px',
//         }}>
//       <Row>
//         <Col className='col-12 col-md-6 pb-3'>
//   {/*----------------------- Selected Rows ----------------------------------- */}
//           <h2 style={{fontFamily: 'uiMonospace'}}><RiSecurePaymentFill className='pe-1' size={40}/> Ready for payment process</h2>
//           {selectedIds.map((id) => (
//             <div key={id} style={{ display: 'flex', flexDirection: 'row' }} >
//               {/* <p>Row ID: {id}</p> */}
//             </div>
//           ))}

//           <h5 className='pb-2' style={{fontFamily: 'paynimo-icons'}}>Total Amount : {totalAmount}</h5>
//           <div className='d-flex pb-2'>
//             <h5 className='pe-3' style={{fontFamily: 'paynimo-icons'}} htmlFor="partialPaymentCheckbox">Check here if Partial Payment :</h5>

//           <div className="checkbox-wrapper-12">
//                 <div className="cbx">
//                   <input id="partialPaymentCheckbox" type="checkbox"
//                   checked={isPartialPayment}
//                   onChange={handleCheckboxChangePayamount}/>
//                   <label htmlFor="partialPaymentCheckbox"></label>
//                   <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
//                     <path d="M2 8.36364L6.23077 12L13 2"></path>
//                   </svg>
//                 </div>
//                 {/* Gooey */}
//                 <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
//                   <defs>
//                     <filter id="goo-12">
//                       <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
//                       <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></feColorMatrix>
//                       <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
//                     </filter>
//                   </defs>
//                 </svg>
//               </div>




//           </div>
           
//             <div className='d-flex'>
//               <h5 className='pe-3' style={{fontFamily: 'paynimo-icons'}} htmlFor="partialAmountInput"> Enter Paying Amount/Partial Amount:</h5>
//               <input style={{borderRadius: "8px"}} autoComplete='off'
//                 type="text" placeholder='Enter Paying Amount/Partial Amount'
//                 id="partialAmountInput"
//                 value={partialAmount}
//                 onChange={handlePartialAmountChange}
//               />
//             </div>
         
//           <div className='pt-3'>
//           <button class="button-32" onClick={handleClick} disabled={isPayButtonDisabled()}>
//             Pay Now
//           </button>
//           </div>
//           </Col>
          
//               <Col className='col-md-6 pt-2'>
//               <Flip top>
//               <h5 style={{fontFamily: 'paynimo-icons',fontWeight: 'bold',color:'rgb(255 243 97)'}}>Instructions for Payment Process</h5></Flip>
//               <div style={{fontFamily: 'fangsong'}}>
//                 <li>Welcome to the School Online Fee Management portal! </li>
//                 <li>In the payment section, view your outstanding fees summary.</li>
//                 <li>Review the list of fees displayed, including tuition, Hotel, and any other applicable charges.</li>
//                 <li>Choose your preferred payment method from the options provided. Common methods include credit/debit card, bank transfer, or online payment platforms</li>
//                 <li>Click on the corresponding payment method to proceed.</li>
//                 <li>If you encounter any issues during the payment process, such as errors or unsuccessful transactions, please contact the School Finance Office or the technical support team for assistance</li>
//                 <li>After a successful payment, you will receive a confirmation message on the portal, indicating that your payment has been processed.</li>
//                 <li>You can also download or print a receipt for your records. The receipt will contain transaction details, including the payment amount, date, and reference number.</li>
//               </div>
//               </Col>
//       </Row>
//         </div>
//       )}
//     </div>
 
//       </div>
//     </div>
//     </div>
//   );
  


// }

// const PrintComponent = () => {
//   const [feesData, setFeesData] = useState([]);

//   useEffect(() => {
//     // Fetch data using Axios
//     axios.get('https://example.com/fees-data')
//       .then(response => {
//         // Set the fetched data to the state
//         setFeesData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching fees data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Fees Description</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>No.</th>
//             <th>Description</th>
//             <th>Quantity</th>
//             <th>Amount</th>
//             <th>Total Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {feesData.map((fees, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{fees.description}</td>
//               <td>{fees.quantity}</td>
//               <td>{fees.amount}</td>
//               <td>{fees.totalAmount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Payfees
















// // import React, { useEffect,useState } from 'react'
// // import Navbar from '../Navbar'
// // import DataTable from 'react-data-table-component';
// // import {BiMailSend} from 'react-icons/bi';
// // import {FaFileInvoice,FaReceipt} from 'react-icons/fa'
// // import axios from 'axios';
// // import admin_data from './worldline_AdminData.json'
// // import { useParams } from 'react-router-dom';
// // import {RiSecurePaymentFill} from 'react-icons/ri'
// // import $ from 'jquery';
// // import './payment.css'

// // function handleResponse(res) {
// //   if (typeof res != "undefined" && typeof res.paymentMethod != "undefined" && typeof res.paymentMethod.paymentTransaction != "undefined" && typeof res.paymentMethod.paymentTransaction.statusCode != "undefined" && res.paymentMethod.paymentTransaction.statusCode == "0300") {
// //       // success block
// //   } else if (typeof res != "undefined" && typeof res.paymentMethod != "undefined" && typeof res.paymentMethod.paymentTransaction != "undefined" && typeof res.paymentMethod.paymentTransaction.statusCode != "undefined" && res.paymentMethod.paymentTransaction.statusCode == "0398") {
// //       // initiated block
// //   } else {
// //       // error block
// //   }
// // };





// // const handleDownload = (id) => {
// //   console.log(id);
// //   const data = {
// //   'id' : id, 
// //   }
// // const personJSON = JSON.stringify(data);

// // window.location.href = 'https://www.santhoshavidhyalaya.com/SVSTEST/intiate-payment/'+personJSON;

// // };

// // const Payfees = () => {
// //   const { userData } = useParams();
// //   const [invoices, getInvoice] = useState('');
// //   const [reqData, setreqData] = useState('')
// //   const [selectedIds, setSelectedIds] = useState([]);
// //   const [totalAmount, setTotalAmount] = useState(0);
// //   const [activeTab, setActiveTab] = useState('school');
// //   const [isPartialPayment, setIsPartialPayment] = useState(false);
// //   const [partialAmount, setPartialAmount] = useState('');
// //   const [payAmount, setPayamount] = useState(0);
// //   const userId = sessionStorage.getItem('user_id');
// //   const userType = sessionStorage.getItem('user_type');

// //   console.log("selectedIds :",selectedIds);
// //   const columns = [
// //     {
// //       name: 'Select',
// //       cell: row => (
// //         <input
// //           type="checkbox"
// //           disabled={row.dwonloadReceipt}
// //           onChange={(event) => handleCheckboxChange(event, row.id,row.payableAmount)}
// //         />
// //       ),
// //       ignoreRowClick: true,
// //       allowOverflow: true,
// //       button: true,
// //     },
// //     {
// //       name: 'Invoice No',
// //       selector: row => row.invoiceNo,
// //       sortable: true,
// //     },
// //     {
// //       name: 'Student Name',
// //       selector: row => row.studentName,
// //       sortable: true,
// //     },
// //     {
// //       name: 'Reg. No',
// //       selector: row => row.studentRegNo,
// //       sortable: true,
// //     },
// //     {
// //       name: 'Academic Year',
// //       selector: row => row.academicYear,
// //       sortable: true,
// //     },
// //     {
// //       name: 'Fees Category',
// //       selector: row => row.feesCat,
// //       sortable: true,
// //     },
// //     {
// //       name: 'Due date',
// //       selector: row => row.due_date,
// //       sortable: true,
// //     },
// //     {
// //       name: 'Actual Amount',
// //       selector: row => row.amount,
// //       sortable: true,
// //     },
// //     {
// //       name: 'Previous Pending',
// //       selector: row => row.previous_pending_amount,
// //       sortable: true,
// //     },
// //     {
// //       name: 'Payable Amount',
// //       selector: row => row.payableAmount,
// //       sortable: true,
// //     },
// //     {
// //       name: 'Pay Status',
// //       selector: row => row.payStatus,
// //       sortable: true,
// //     },
// //     {
// //       name: 'Paid Amount',
// //       selector: row => row.paid,
// //       sortable: true,
// //     },
// //     {
// //       name: 'Invoice pending',
// //       selector: row => row.invoice_pending,
// //       sortable: true,
// //     },
// //     {
// //       name: 'Action',
// //       sortable: true,
// //       cell: (row) => (
// //         row.dwonloadReceipt  ? (
// //           <div>
// //           <a href={`/StudentInvoice/${row.invoiceNo}`} target="_blank"> <FaFileInvoice size={20} style={{color:'#4E0172',cursor:'pointer',paddingRight:'5px'}}/></a>
// //           <a href={`/PaymentReceipt/${row.paymentTransactionId}`} target="_blank"> <FaReceipt size={20} style={{color:'#4E0172',cursor:'pointer',paddingRight:'5px'}}/></a> 
// //           <BiMailSend size={30} style={{color:'#F9215F',cursor:'pointer'}}/>
// //           </div>
// //         ):(
// //           <span>-</span>
// //         ) 
// //       ),
// //     },
// //   ];




// // if(userData){
// //   const urlDecodeReturnData = decodeURIComponent(userData);
// //   const  retrunData = JSON.parse(urlDecodeReturnData)
// //   console.log("Return Data ********:**",retrunData);
// // }



// // // const handleCheckboxChange = (event, id) => {
// // //   if (event.target.checked) {
// // //     setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
// // //   } else {
// // //     setSelectedIds((prevSelectedIds) =>
// // //       prevSelectedIds.filter((selectedId) => selectedId !== id)
// // //     );
// // //   }
// // // };

// // const handleCheckboxChange = (event, id, amount) => {
// //   console.log(id, parseFloat(amount));
// //   if (event.target.checked) {
// //     setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
// //     setTotalAmount((prevTotalAmount) => prevTotalAmount + parseFloat(amount));
// //   } else {
// //     setSelectedIds((prevSelectedIds) =>
// //       prevSelectedIds.filter((selectedId) => selectedId !== id)
// //     );
// //     setTotalAmount((prevTotalAmount) => prevTotalAmount - parseFloat(amount));
// //   }
// // };

// // let reData = '';
// // const handleClick = () => {
// //   console.log("setSelectedIds",selectedIds);
// //   const data = {
// //     'invoiceIds' : selectedIds,
// //     'inoviceTypes': activeTab,
// //     'partPayment': isPartialPayment,
// //     'payAmount': payAmount,
// //     // 'retunUrl':'http://localhost:3000/Payfees/',
// //     'returnUrl': window.location.href + '/',
// //     'reqData':{
// //       "id": "e9dc7b9a9187c3800f3fe8184c1a8439f202eeab982697be5fab409342a771f5d593c599f0a37b03",
// //       "user_id": 12,
// //       "client_id": 1,
// //       "name": "Myapp",
// //       "scopes": [],
// //       "revoked": false,
// //       "created_at": "2023-05-21 14:39:23",
// //       "updated_at": "2023-05-21 14:39:23",
// //       "expires_at": "2024-05-21T14:39:23.000000Z"
// //   },
// //   "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTlkYzdiOWE5MTg3YzM4MDBmM2ZlODE4NGMxYTg0MzlmMjAyZWVhYjk4MjY5N2JlNWZhYjQwOTM0MmE3NzFmNWQ1OTNjNTk5ZjBhMzdiMDMiLCJpYXQiOjE2ODQ2Nzk5NjMsIm5iZiI6MTY4NDY3OTk2MywiZXhwIjoxNzE2MzAyMzYzLCJzdWIiOiIyMyIsInNjb3BlcyI6W119.YFIFSOFz7uqtWJAnLFGbKLEjLx2jGYg3h90LZbau3PZCX88IX7JxEmFCy4wgw3rkOP2P2yJxlQsJCfx5dVtgn0FxAVnryVTjxXgyJieu37fwGjnp8mR35dSr7M_9DjZVdHSrBRT9l085irPv3uLrr9ahJ9Egf-zUbGbk955nUJvPQMtZ8oxdrQvZPDeIrYKEzmGJAQQYBog6lJvVLikl-D-h7y_96pxliM0h6dgjIvLJeEx9XoG5iA2-uEYm-7rxUpJj41089cE8pQL69oWK-6hA3gulMdS1z8r6AALGNo-M5sHy8cFwMFEk5xBpyJlp_mY4EfNdDWqEvy7wFtnHWw_NJtDe_NFxs-76_YDQ9OseZPyDweGRyebcxfzRPXA5Mx-xlFmyfkR1L83EtUpKLnsrLwm1-n5z-zl0fLQseg0ESyTF4Xufy3s15533mF1O3pw7hmBWqkYRVqqxGMUKgZd_0qF3ExifM_AsB0NNagXBbthQ_BxPEsmNvfx0TPZ5F05W5wottrZhy5lO6CeqDSDyYQ9xStLCMiDjiNFkT5j_5HD5jlfvEIvvwq0hnbxE0RHLC0a30NnMguXsoL_OtO0Cyjg9eaRad6yyxuRQ_8TmiKCuykqueZrTMnX7GS1mUh15dB8V3nkhHf3xEKf3mhCzpd4PdxXEYpdscBvstp0",
// //   }

// //   const jsonString = JSON.stringify(data);
// //   const urlEncodedJson = encodeURIComponent(jsonString);
// //   console.log("********",data);

// //   const redirectUrl = `https://www.santhoshavidhyalaya.com/SVSTEST/intiate-payment/?data=${urlEncodedJson}`;

// //   window.location.href = redirectUrl;

// // };



// //     const innvoiceList = () => {
// //       const params = {
// //         'inoviceTypes': activeTab,
// //         'userId': userId,
// //         'userType':userType        
// //       }
// //       console.log("********",params);
// //       const url = `https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list`;
// //       // const url = `https://www.santhoshavidhyalaya.com/SVSTEST/api/invoice-list`;
// //       axios.get(url,{ params })
// //         .then(res => {
// //           const response = res.data;
// //           console.log(response.data)
// //           getInvoice(response.data);
// //         })
// //         .catch(error=>  console.error(`Error : ${error}`));
// //     }

    
// //   useEffect(() => {
// //     innvoiceList();
// //     setSelectedIds([])
// //   }, []);

// //   const handleTabChange = (tab) => {
// //     setActiveTab(tab);
// //     setSelectedIds([])
// //     innvoiceList();
// //   };
// //   useEffect(() => {
// //     // const script = document.createElement('script');
// //     // script.src = 'https://www.paynimo.com/paynimocheckout/client/lib/jquery.min.js';
// //     // script.async = true;
// //     // document.body.appendChild(script);
// //     // script.onload = () => {
// //     //   // jQuery is now loaded, you can use it
// //     //   if(reData){
// //     //     jquery.pnCheckout(reqData);
// //     //   }
      
// //     // };
   
// //   });


  

// //   const handleCheckboxChangePayamount = () => {
// //     setIsPartialPayment(!isPartialPayment);
// //     if(!isPartialPayment)
// //     {
// //       setPayamount(0);
// //     }
// //     else{
// //       setPayamount(partialAmount);
// //     }
    
    
// //   };

// //   const handlePartialAmountChange = (event) => {
// //     setPartialAmount(event.target.value);
// //     setPayamount(event.target.value)
// //   };

// //   const isPayButtonDisabled = () => {
// //     if (isPartialPayment) {
// //       return partialAmount === '' || parseFloat(partialAmount) <= 0 || parseFloat(partialAmount) > totalAmount ;
// //     }
// //     return selectedIds.length === 0 || totalAmount <= 0;
// //   };



// //   return (
    
// //     <div className="App">
// //       <Navbar />
// //       <div className='container pb-5'>
// //       {/* <h2 className='my-3'>Payfees</h2> */}
// //       {/* Button */}
// //       <div className="tabs-container py-3">
// //         <button 
// //           className={`button-42 tab ${activeTab === 'school' ? 'active' : ''}`}
// //           onClick={() => handleTabChange('school')}>
// //           School Fees
// //         </button>{' '}
// //         <button
// //           className={`button-41 tab ${activeTab === 'other' ? 'active' : ''}`}
// //           onClick={() => handleTabChange('other')}>
// //           Other Fees
// //         </button>
// //       </div>
// //       <div className="flex-container" >
// //       <div className="left-container">
// //           <DataTable
// //             columns={columns}
// //             data={invoices}
// //             responsive={true}
// //             pagination={true}
// //           />
// //         </div>
// //         <div className="pt-3">
// //       {selectedIds.length > 0 && (
// //         <div style={{
// //           border: '2px solid #86CB92',
// //           backgroundColor: 'rgb(230 255 234)',
// //           padding: '20px',
// //           display: 'inlineBlock',
// //         }}>
// //   {/*----------------------- Selected Rows ----------------------------------- */}
// //           <h2 style={{fontFamily: 'uiMonospace'}}><RiSecurePaymentFill className='pe-1' size={40}/> Ready for payment process</h2>
// //           {selectedIds.map((id) => (
// //             <div key={id} style={{ display: 'flex', flexDirection: 'row' }} >
// //               {/* <p>Row ID: {id}</p> */}
// //             </div>
// //           ))}

// //           <h5 className='pb-2'>Total Amount : {totalAmount}</h5>
// //           <div className='d-flex pb-2'>
// //             <h5 className='pe-3' htmlFor="partialPaymentCheckbox">Partial Payment :</h5>
// //             {/* <input 
// //               type="checkbox"
// //               id="partialPaymentCheckbox"
// //               checked={isPartialPayment}
// //               onChange={handleCheckboxChangePayamount}
// //             /> */}

// //           <div className="checkbox-wrapper-12">
// //                 <div className="cbx">
// //                   <input id="partialPaymentCheckbox" type="checkbox"
// //                   checked={isPartialPayment}
// //                   onChange={handleCheckboxChangePayamount}/>
// //                   <label htmlFor="partialPaymentCheckbox"></label>
// //                   <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
// //                     <path d="M2 8.36364L6.23077 12L13 2"></path>
// //                   </svg>
// //                 </div>
// //                 {/* Gooey */}
// //                 <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
// //                   <defs>
// //                     <filter id="goo-12">
// //                       <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
// //                       <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></feColorMatrix>
// //                       <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
// //                     </filter>
// //                   </defs>
// //                 </svg>
// //               </div>




// //           </div>
// //           {isPartialPayment && (
// //             <div className='d-flex'>
// //               <h5 className='pe-3' htmlFor="partialAmountInput">Partial Amount:</h5>
// //               <input style={{borderRadius: "8px"}} autoComplete='off'
// //                 type="text"
// //                 id="partialAmountInput"
// //                 value={partialAmount}
// //                 onChange={handlePartialAmountChange}
// //               />
// //             </div>
// //           )}
// //           <div className='pt-3'>
// //           <button class="button-32" onClick={handleClick} disabled={isPayButtonDisabled()}>
// //             Pay Now
// //           </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
        
// //       </div>
// //     </div>
// //     </div>
// //   );
  


// // }

// // const PrintComponent = () => {
// //   const [feesData, setFeesData] = useState([]);

// //   useEffect(() => {
// //     // Fetch data using Axios
// //     axios.get('https://example.com/fees-data')
// //       .then(response => {
// //         // Set the fetched data to the state
// //         setFeesData(response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching fees data:', error);
// //       });
// //   }, []);

// //   return (
// //     <div>
// //       <h2>Fees Description</h2>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>No.</th>
// //             <th>Description</th>
// //             <th>Quantity</th>
// //             <th>Amount</th>
// //             <th>Total Amount</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {feesData.map((fees, index) => (
// //             <tr key={index}>
// //               <td>{index + 1}</td>
// //               <td>{fees.description}</td>
// //               <td>{fees.quantity}</td>
// //               <td>{fees.amount}</td>
// //               <td>{fees.totalAmount}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default Payfees