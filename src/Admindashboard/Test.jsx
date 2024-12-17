import React, {useState,useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios'
import Header from './Header';
import {Form,Row,Col,Button,Table} from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {HiOutlineCurrencyRupee} from 'react-icons/hi';
import {FaPeopleCarry} from 'react-icons/fa';
import {BiDonateHeart} from 'react-icons/bi';
import Select from 'react-select';
import Swal from 'sweetalert2'; // Import SweetAlert2


const SponsorBulkpayment = () => {

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sponsorOptions, setSponsorOptions] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [enteredAmount, setEnteredAmount] = useState('');
  const [excessiveAmount , setExcessiveAmount] = useState('')
  const [invoiceData, setInvoiceData] = useState([]);


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
  };

  const handleRowSelection = (rowIndex) => {
    setSelectedCheckboxes((prevState) => {
      const newState = { ...prevState };
      newState[rowIndex] = !newState[rowIndex];
      
      // If the checkbox is unchecked, clear the input value
      if (!newState[rowIndex]) {
        const updatedStudentData = [...studentData];
        updatedStudentData[rowIndex].amount = ''; // Clear the input value
        setStudentData(updatedStudentData);
      }
      
      return newState;
    });
  };

  const handleCheckboxClick = () => {
      console.log(invoiceData);
  if (!isNaN(enteredAmount) && enteredAmount !== '') {
    const payload = {
      sponsorId: selectedOption.value, // Replace with the actual sponsor ID
      totalAmount: totalAmount,
      invoiceData: invoiceData,
      additionalDetails: "Payment for multiple invoices",
      mode: "Cash",
    };
console.log(payload);
    fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/sponsor/processCashPaymenthghgh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Success") {
          // Display a success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful',
            text: 'Payment processed successfully',
          });
        } else {
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
  } else {
    // Handle the case where enteredAmount is not a valid number or empty
    console.error('Invalid enteredAmount:', enteredAmount);
  }
    
  };
  
const handleAmountChange = (event, index) => {
  const newValue = parseFloat(event.target.value);
  const updatedStudentData = [...studentData];

  // Update the amount property for the selected student
  updatedStudentData[index].amount = newValue;

  // Filter the selected invoices based on checked checkboxes and non-empty input values
  const selectedInvoices = updatedStudentData
    .filter((_, rowIndex) => selectedCheckboxes[rowIndex] && !isNaN(newValue) && newValue !== '')
    .map((studentInvoice) => ({
      invoice_no: studentInvoice[0]?.invoice_no,
      id: studentInvoice[0]?.slno,
      amount: studentInvoice.amount,
    }));

  const newTotalAmount = selectedInvoices
    .map((invoice) => invoice.amount || 0)
    .reduce((acc, amount) => acc + amount, 0);

  // Update invoiceData with the selected invoices
  setInvoiceData(selectedInvoices);

  setTotalAmount(newTotalAmount);
  setStudentData(updatedStudentData);
};

  

    const handleEnteredAmountChange = (event) => {
      const newValue = parseFloat(event.target.value);
      setEnteredAmount(newValue);
      const remainingAmount =  newValue - totalAmount;
      setExcessiveAmount(remainingAmount.toFixed(2)); 
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
                    <TextField value={enteredAmount} onChange={handleEnteredAmountChange}  style={{borderColor:'#000'}} type='number' label="Enter Amount" InputProps={{ startAdornment: (
                      <InputAdornment position="start">
                      <HiOutlineCurrencyRupee size={35} />
                    </InputAdornment> ),}} fullWidth variant="outlined" />
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
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Name</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Invoice No</th>
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
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Fees Glance</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Fees Category</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Fees Items Details</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Date</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Acad year</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Due Date</th>
                    <th style={{ backgroundColor: '#000', color: '#ffff' }}>Paid Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((studentInvoice, index) => (
                        <tr key={index}
                          style={{
                            backgroundColor: selectedRows.includes(index) ? 'lightblue' : 'white',
                            // Add a conditional style to disable rows where payment_status is "Paid"
                            opacity: studentInvoice[0]?.payment_status === "Paid" ? 0.5 : 1,}}>

                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                          <div class="checkbox-wrapper-40">
                            <label>
                              <input
                                type='checkbox'
                                checked={selectedCheckboxes[index] || false}
                                onChange={() => handleRowSelection(index)}
                                // Disable the input if payment_status is "Paid"
                                disabled={studentInvoice[0]?.payment_status === "Paid"}
                              />
                              <span class="checkbox"></span>
                            </label>
                          </div>
                            </td>

                        <td style={{ verticalAlign: 'middle' }}>
                          <TextField
                            style={{ borderColor: '#000' }}
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
                            // Disable the input if the corresponding checkbox is unchecked or payment_status is "Paid"
                            disabled={!selectedCheckboxes[index] || studentInvoice[0]?.payment_status === 'Paid'}
                            // Use the amount property from studentData
                            value={studentInvoice.amount !== null ? studentInvoice.amount : ''}
                            onChange={(event) => handleAmountChange(event, index)}
                          />
                        </td>

                      <td style={{verticalAlign: 'middle', backgroundColor: studentInvoice[0]?.pendingAmountwithconditon === "0.00" ? '#D4FFC2' : '#F8BFB8'}}>{studentInvoice[0]?.pendingAmountwithconditon}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.invoice_no}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.name}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.slno}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.roll_no}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.sec}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.standard}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.hostelOrDay}</td>
                      <td style={{verticalAlign: 'middle'}}>
                        <h5 style={{ fontFamily: 'emoji', color: studentInvoice[0]?.payment_status === "Paid" ? '#004D00' : 'inherit' }}>
                          {studentInvoice[0]?.payment_status}
                        </h5>
                      </td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.invoice_pending_amount}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.actual_amount}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.amount}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.previous_pending_amount}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.total_invoice_amount}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.discount_percent}</td>
                      <td style={{verticalAlign: 'middle'}} dangerouslySetInnerHTML={{ __html: studentInvoice[0]?.fees_glance }} />
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.fees_cat}</td>
                      <td dangerouslySetInnerHTML={{ __html: studentInvoice[0]?.fees_items_details
                      .split(' ')
                      .map((word, index, array) => (index === array.length - 1 ? word : `${word}<br/>`))
                      .join(' ') }} />
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.date}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.acad_year}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.due_date}</td>
                      <td style={{verticalAlign: 'middle'}}>{studentInvoice[0]?.paid_amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
              <Col>
                <Form.Group>
                  <Form.Label>Excessive / Remaining Amount</Form.Label>
                  <Form.Control type='number' style={{borderColor:'#000'}}
                    value={excessiveAmount} />
                </Form.Group>
              </Col>
            </Row>
            <Row className='pt-3'>
              <Col>
              <Form.Group className="mb-3" >
                <Form.Label>Enter Remark</Form.Label>
                <Form.Control as="textarea" rows={3}  style={{borderColor:'#000'}}/>
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