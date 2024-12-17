import React, {useState,useEffect } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios'
import Header from '../Header';
import {Form,Row,Col,Button,Table} from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {HiOutlineCurrencyRupee} from 'react-icons/hi';
import {FaPeopleCarry} from 'react-icons/fa';
import {BiDonateHeart} from 'react-icons/bi';
import Select from 'react-select';
import Swal from 'sweetalert2'; 


const SponsorBulkpayment = () => {

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sponsorOptions, setSponsorOptions] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [additionalDetails, setAdditionalDetails] = useState('');
  // const [enteredAmount, setEnteredAmount] = useState('');
  const [excessiveAmount , setExcessiveAmount] = useState('')
  const [invoiceData, setInvoiceData] = useState([]);
  // const [showAll, setShowAll] = useState(false);
  const [excessAmount, setExcessAmount] = useState(null);
  const [givenAmount, setGivenAmount] = useState(null);
  const [enteredAmount, setEnteredAmount] = useState(null);
  const initialRowCount = 15;
  const [showAll, setShowAll] = useState(true); // Make sure it's set to true
  const [studentsInvoice, setStudentsInvoice] = useState([]);


  useEffect(() => {
    axios
      .get('https://santhoshavidhyalaya.com/SVSTEST/api/sponsor/select')
      .then((response) => {
        setSponsorOptions(response.data.sponsorOptions);
      })
      .catch((error) => {
        console.error('Error fetching sponsor options:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedOption) {
      axios
        .get(`https://santhoshavidhyalaya.com/SVSTEST/api/sponsor/${selectedOption.value}/students`)
        .then((response) => {
          setSelectedCheckboxes({});
          setStudentData(studentsInvoice.map((student) => ({ ...student, amount: '' })));
          setTotalAmount(0);
          setInvoiceData([]);
          console.log('response.data.studentsInvoice:', response.data.studentsInvoice);
          setStudentData(response.data.studentsInvoice);

        })
        .catch((error) => {
          console.error('Error fetching student data:', error);
        });
    } else {
      setStudentData([]);
    }
  }, [selectedOption]);



  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '60px',
    }),
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    // Find the selectedOption sponsor by its ID
    const selectedSponsor = sponsorOptions.find((option) => option.id === selectedOption.value);

    // Set the excess amount for the selected sponsor as a number
    if (selectedSponsor) {
      setExcessAmount(parseFloat(selectedSponsor.excess_amount));
    } else {
      // If no sponsor is selected, clear the excess amount
      setExcessAmount(null);
    }
  };



  const handleRowSelection = (rowIndex) => {
    setSelectedCheckboxes((prevState) => {
      const newState = { ...prevState };
      newState[rowIndex] = !newState[rowIndex];
  
      // If the checkbox is unchecked, clear the input value
      if (!newState[rowIndex]) {
        console.log('Checkbox is unchecked for rowIndex:', rowIndex);
        const updatedStudentData = [...studentData];
        updatedStudentData[rowIndex].amount = ''; // This should clear the amount
        console.log('Updated studentData:', updatedStudentData); // Check if the amount is cleared
        setStudentData(updatedStudentData);
      }
  
      // Calculate the Total Amount based on selected checkboxes
      const selectedInvoices = studentData
        .filter((_, rowIndex) => newState[rowIndex])
        .map((studentInvoice) => parseFloat(studentInvoice?.pendingAmountwithconditon || 0));
  
      const newTotalAmount = selectedInvoices.reduce((acc, amount) => acc + amount, 0);
      setTotalAmount(newTotalAmount);
  
      // Update invoiceData with the selected invoices
      const newInvoiceData = studentData
        .filter((_, rowIndex) => newState[rowIndex])
        .map((studentInvoice) => ({
          invoice_no: studentInvoice?.invoice_no,
          id: studentInvoice?.slno,
          amount: studentInvoice.amount,
        }));
  
      setInvoiceData(newInvoiceData);
  
      return newState;
    });
  };
  
  
  
  

  const handleCheckboxClick = () => {
      console.log(invoiceData);

  // Check if enteredAmount is a valid number and not empty
  // if (!isNaN(enteredAmount) && enteredAmount !== '') {
    // Construct the JSON payload
    const payload = {
      sponsorId: selectedOption.value, // Replace with the actual sponsor ID
      totalAmount: totalAmount,
      invoiceData: invoiceData,
      additionalDetails: additionalDetails,
      mode: "Cash",
    };
    console.log(payload);
    // Make an HTTP POST request to the API using fetch
    fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/sponsor/processCashPaymentdd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Success" ) {
          // Display a success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful',
            text: 'Payment processed successfully',
          });
        } else if (data.status === "amountFalse" ) {
          // Display a success SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Payment Failed',
            text: 'Total amount plus excess amount is less than the sum of the individual invoice amount',
          });
          
        } 
         else {
          // Handle other status values if needed
          console.error('Payment failed:', data.message);
        }
        // Handle the response from the API (e.g., show a success message)
        console.log('Payment data sent successfully:', data);
      }
      )
      .catch((error) => {
        // Handle errors (e.g., display an error message)
        console.error('Error sending payment data:', error);
      });
  // } else {
  //   // Handle the case where enteredAmount is not a valid number or empty
  //   console.error('Invalid enteredAmount:', enteredAmount);
  // }
    
  };
  
  const handleAmountChange = (event, rowIndex) => {
    const newValue = parseFloat(event.target.value);
  
    // Update the amount in the studentData array
    const updatedStudentData = [...studentData];
    updatedStudentData[rowIndex].mpendingAmountwithconditon = newValue.toFixed(2);
    setStudentData(updatedStudentData);
  
    // Calculate the Total Amount based on selected checkboxes
    const selectedInvoices = updatedStudentData
      .filter((_, index) => selectedCheckboxes[index])
      .map((studentInvoice) => parseFloat(studentInvoice.mpendingAmountwithconditon || 0));
  
    const newTotalAmount = selectedInvoices.reduce((acc, amount) => acc + amount, 0);
    setTotalAmount(newTotalAmount);
  
    // Update invoiceData with the selected invoices
    const newInvoiceData = updatedStudentData
      .filter((_, index) => selectedCheckboxes[index])
      .map((studentInvoice) => ({
        invoice_no: studentInvoice.invoice_no,
        id: studentInvoice.slno,
        amount: studentInvoice.mpendingAmountwithconditon,
      }));
  
    setInvoiceData(newInvoiceData);
  };
  


      // const newValue = parseFloat(event.target.value);
      // setEnteredAmount(newValue);
      // const remainingAmount =  newValue - totalAmount;
      // setExcessiveAmount(remainingAmount.toFixed(2)); 
    // };

    const handleEnteredAmountChange = (event) => {
      const newValue = parseFloat(event.target.value);
    
      if (!isNaN(newValue)) {
        // Calculate the "Given Amount" as a number by adding "Excess Amount" and "Entered Amount"
        const calculatedGivenAmount = (excessAmount || 0) + newValue;
        setEnteredAmount(newValue);
        setGivenAmount(calculatedGivenAmount.toFixed(2));
    
        // Calculate the "Excessive / Remaining Amount" by subtracting the calculated given amount from the total amount
        const remainingAmount = calculatedGivenAmount - totalAmount ;
        setExcessiveAmount(remainingAmount.toFixed(2));
      } else {
        // If the entered value is not a valid number, set "Entered Amount" and "Given Amount" to null, and reset the "Excessive / Remaining Amount" to the total amount
        setEnteredAmount(null);
        setGivenAmount(null);
        setExcessiveAmount(totalAmount.toFixed(2));
      }
    };
    

  return (
    <div>
       <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
      <Header/>
      <div className='py-4 px-3'>
        <div style={{borderRadius:'10px', border:'1px solid #000',backgroundColor:'#ffff'}} >
            <h3 style={{fontFamily:'sans-serif', marginTop:'20px',marginLeft:'20px'}}><FaPeopleCarry className='mr-3'/> Sponsor Payment</h3><hr/>
            <div className='py-5 px-3'>
                <Form>
                <Row>
                <Col>
                 <Select
                  styles={customStyles}
                  value={selectedOption}
                  onChange={handleSelectChange}
                  options={sponsorOptions.map((option) => ({
                    value: option.id,
                    label: option.name,
                  }))}
                  isClearable={true}
                  placeholder='Select a Sponsor' />
              </Col>
                  <Col>
                  <TextField
                      style={{ borderColor: '#000' }}
                      type='number'
                      label='Excess Amount'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <HiOutlineCurrencyRupee size={35} />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      variant='outlined'
                      value={excessAmount !== null ? excessAmount : ''}
                      disabled={excessAmount === null}
                    />
                   </Col>
                   </Row>
                   <Row className='pt-4'>
                  <Col>
                  <TextField
                      style={{ borderColor: '#000' }}
                      type='number'
                      placeholder='Enter Given Amount'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <HiOutlineCurrencyRupee size={35} />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      variant='outlined'
                      value={enteredAmount !== null ? enteredAmount : ''}
                      onChange={handleEnteredAmountChange}
                    />
                   </Col>
                  {/* <Col>
                    <TextField value={enteredAmount} onChange={handleEnteredAmountChange}  style={{borderColor:'#000'}} type='number' label="Enter Amount" InputProps={{ startAdornment: (
                      <InputAdornment position="start">
                      <HiOutlineCurrencyRupee size={35} />
                    </InputAdornment> ),}} fullWidth variant="outlined" />
                   </Col> */}
                  <Col>
                  <TextField
                      style={{ borderColor: '#000' }}
                      type='number'
                      label='Entered Amount + Excess Amount'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <HiOutlineCurrencyRupee size={35} />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      variant='outlined'
                      value={givenAmount !== null ? givenAmount : ''}
                      disabled
                    />
                   </Col>
                   </Row>
                </Form>
            </div>

            <div className='container' style={{ position: 'relative' }}>
              <Table striped bordered hover responsive style={{ width: 'max-content' }}>
                <thead>
                  <tr style={{ height: '65px' }}>
                    <th style={{ width: '65px', backgroundColor: '#000', textAlign: 'center' }}>
                    <div class="checkbox-wrapper-40">
                  <label>
                    <input
                        type='checkbox'
                        checked={Object.values(selectedCheckboxes).every((value) => value)}
                        onChange={() =>
                          setSelectedCheckboxes((prevState) => {
                            const allChecked = !Object.values(prevState).every((value) => value);
                            const newState = {};
                            for (const rowIndex in prevState) {
                              newState[rowIndex] = allChecked;
                            }
                            return newState;
                          })}/>
                             <span class="checkbox"></span>
                      </label>
                      </div>
                    </th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Enter Amount</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Amount Alert</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Invoice No</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Name</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Slno</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Roll No</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Section</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Standard</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Hostel/Day</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Payment Status</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Invoice Pending Amount</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Actual Amount</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Amount</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Previous Pending Amount</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Total Invoice Amount</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Discount Percent</th>
                    {/* <th style={{ backgroundColor: '#000', color: '#ffff' }}>Fees Glance</th> */}
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Fees Category</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Fees Items Details</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Date</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Acad year</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Due Date</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Paid Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {studentData.map((studentInvoice, index) => ( */}
                  {/* {studentData.slice(0, showAll ? studentData.length : initialRowCount).map((studentInvoice, index) => ( */}
  {studentData.map((studentInvoice, index) => (

                        <tr key={index}
                          style={{
                            backgroundColor: selectedRows.includes(index) ? 'lightblue' : 'white',
                            opacity: studentInvoice?.payment_status === "Paid" ? 0.5 : 1,}}>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                          <div class="checkbox-wrapper-40">
                            <label>
                              <input
                                type='checkbox'
                                checked={selectedCheckboxes[index] || false}
                                onChange={() => handleRowSelection(index)}
                                // Disable the input if payment_status is "Paid"
              disabled={studentInvoice?.payment_status === "Paid"}
            />
                              <span class="checkbox"></span>
                            </label>
                          </div>
                        </td>

                        <td style={{ verticalAlign: 'middle' }}>
  <TextField
    style={{
      borderColor: '#000',
      backgroundColor:
        studentInvoice?.pendingAmountwithconditon === '0.00'
          ? '#D4FFC2'
          : '#F8BFB8',
    }}
    type='number'
    InputProps={{
      startAdornment: (
        <InputAdornment position='start'>
          <HiOutlineCurrencyRupee size={35} />
        </InputAdornment>
      ),
    }}
    fullWidth
    variant='outlined'
    // Use the amount property from studentData as the initial value
    defaultValue={studentInvoice?.pendingAmountwithconditon}
    onChange={(event) => handleAmountChange(event, index)}
  />
</td>

<td style={{ verticalAlign: 'middle', backgroundColor: studentInvoice?.pendingAmountwithconditon === "0.00" ? '#D4FFC2' : '#F8BFB8' }}>
  {studentInvoice?.pendingAmountwithconditon}
</td>

                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.invoice_no}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.name}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.slno}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.roll_no}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.sec}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.standard}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.hostelOrDay}</td>
                      <td style={{verticalAlign: 'middle'}}>
                        <h5 style={{ fontFamily: 'emoji', color: studentInvoice?.payment_status === "Paid" ? '#004D00' : 'inherit' }}>
                          {studentInvoice?.payment_status}
                        </h5>
                      </td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.invoice_pending_amount}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.actual_amount}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.amount}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.previous_pending_amount}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.total_invoice_amount}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.discount_percent}</td>
                      {/* <td style={{verticalAlign: 'middle'}} dangerouslySetInnerHTML={{ __html: studentInvoice?.fees_glance }} /> */}
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.fees_cat}</td>
                      <td dangerouslySetInnerHTML={{
  __html: JSON.parse(studentInvoice?.fees_items_details)
    .map((item) => (
      `<p style="font-size: 16px; color: red; font-weight:800;">
      ${item.fees_heading} - ${item.fees_sub_heading}: Rs. ${item.amount}
    </p>`    ))
    .join('')
}} />

                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.date}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.acad_year}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.due_date}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice?.paid_amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* <div className='pt-2'>
              {studentData.length > initialRowCount && (
              <Button onClick={() => setShowAll(!showAll)} style={{backgroundColor:'#DEF9FB',color:'#000'}}>
                {showAll ? 'Show Less' : 'Show More'}
              </Button>
              )}
              </div> */}
            </div>
            <div className='py-5 px-4'>
             <Form>
            <Row>
              <Col>
                <Form.Group >
                  <Form.Label>Total Amount</Form.Label>
                  <Form.Control
                        type='number'
                        style={{ borderColor: '#000' }}
                        value={totalAmount} />
                </Form.Group>
              </Col>
              {/* <Col>
                <Form.Group>
                  <Form.Label>Excessive / Remaining Amount</Form.Label>
                  <Form.Control type='number' style={{borderColor:'#000'}}
                    value={excessiveAmount} />
                </Form.Group>
              </Col> */}
            </Row>
            <Row className='pt-3'>
              <Col>
              <Form.Group className="mb-3" >
                <Form.Label>Enter Remark</Form.Label>
                <Form.Control onChange={(e)=> setAdditionalDetails(e.target.value)} value={additionalDetails} as="textarea" rows={3}  style={{borderColor:'#000'}}/>
              </Form.Group>
              </Col>
            </Row>
            <div className='pt-5 text-center'>
                <Button onClick={handleCheckboxClick} style={{background:'#4A6497', color:'#ffff'}}><BiDonateHeart size={35} className='px-2'/>Pay now</Button>
            </div>
             </Form>
           </div>

        </div>
      </div>
   </div>
    </div>
  )
}

export default SponsorBulkpayment