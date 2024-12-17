import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios'
import Header from '../Header';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { FaPeopleCarry } from 'react-icons/fa';
import { BiDonateHeart } from 'react-icons/bi';
import Select from 'react-select';
import Swal from 'sweetalert2';


const SponsorBulkpayment = () => {

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [typeselectedOption, setTypeSelectedOption] = useState(null);
  const [sponsorOptions, setSponsorOptions] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([Array(studentData.length).fill(false)]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [additionalDetails, setAdditionalDetails] = useState('');
  // const [enteredAmount, setEnteredAmount] = useState('');
  const [excessiveAmount, setExcessiveAmount] = useState('')
  const [invoiceData, setInvoiceData] = useState([]);

  // const [showAll, setShowAll] = useState(false);
  const [excessAmount, setExcessAmount] = useState(null);
  const [givenAmount, setGivenAmount] = useState(null);
  const [enteredAmount, setEnteredAmount] = useState(null);
  const initialRowCount = 15;
  const [showAll, setShowAll] = useState(true); // Make sure it's set to true

  const [initialStudentData, setInitialStudentData] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  console.log(invoiceData, "invoiceData");
  
  useEffect(() => {
    getSponsor();
    
  }, []);
  const getSponsor = () => {
    axios
      .get('https://santhoshavidhyalaya.com/SVSTEST/api/sponsor/select')
      .then((response) => {
        setSponsorOptions(response.data.sponsorOptions);
      })
      .catch((error) => {
        console.error('Error fetching sponsor options:', error);
      });
  };
  useEffect(() => {
    if (selectedOption) {
      setStudentData([]);
    setInitialStudentData([]);
    setSelectedCheckboxes([]);
    setInputValue({});
      axios
      .get(`https://santhoshavidhyalaya.com/SVSTEST/api/sponsortwo/${selectedOption.value}/students`, {
        params: {
          sponsortype: typeselectedOption.value,
        },
      })
        .then((response) => {
         
          const studentsWithSampleName = response.data.studentsInvoice.map((student) => ({
            ...student,
            pendingAmountwithconditonone: student.pendingAmountwithconditon,
          }));
          setStudentData(studentsWithSampleName);
          console.log('response.data.studentsInvoice:', response.data.studentsInvoice);
          setInitialStudentData(response.data.studentsInvoice);
          setSelectedCheckboxes(Array(response.data.studentsInvoice.length).fill(false));
          const initialValues = {};
          response.data.studentsInvoice.forEach((student, index) => {
            initialValues[index] = student.pendingAmountwithconditon;
          });
          setInputValue(initialValues);
        })
        .catch((error) => {
          console.error('Error fetching student data:', error);
        });
    } else {
      setStudentData([]);
      setInitialStudentData([]);
      setSelectedCheckboxes([]);
    }
  }, [typeselectedOption]);



  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '60px',
    }),
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setTotalAmount(0);
    setInvoiceData([]);
    setSelectedCheckboxes(Array(studentData.length).fill(false));
    setStudentData([...initialStudentData]);

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

  const handleTypeSelectChange = (typeselectedOption) => {
    setTypeSelectedOption(typeselectedOption);
    setTotalAmount(0);
    // setInvoiceData([]);
    // setSelectedCheckboxes(Array(studentData.length).fill(false));
    // setStudentData([...initialStudentData]);

    // // Find the selectedOption sponsor by its ID
    // const selectedSponsor = sponsorOptions.find((option) => option.id === selectedOption.value);

    // // Set the excess amount for the selected sponsor as a number
    // if (selectedSponsor) {
    //   setExcessAmount(parseFloat(selectedSponsor.excess_amount));
    // } else {
    //   // If no sponsor is selected, clear the excess amount
    //   setExcessAmount(null);
    // }
  };


  const handleCheckboxClick = () => {
    // console.log(invoiceData);

    // Check if enteredAmount is a valid number and not empty
    // if (!isNaN(enteredAmount) && enteredAmount !== '') {
    // Construct the JSON payload
    const payload = {
      sponsorId: selectedOption.value, // Replace with the actual sponsor ID
      sponsortype: typeselectedOption.value,
      totalAmount: totalAmount,
      invoiceData: invoiceData,
      additionalDetails: additionalDetails,
      mode: "Cash",
    };
    // console.log(payload);
    // Make an HTTP POST request to the API using fetch
    fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/sponsor/processCashPayment', {
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
          // handleTypeSelectChange();
    setSelectedOption(selectedOption);
          setTypeSelectedOption('');getSponsor();  setSelectedOption('');
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful',
            text: 'Payment processed successfully',
          });
          if (typeselectedOption) {
            axios
              .get(`https://santhoshavidhyalaya.com/SVSTEST/api/sponsortwo/${selectedOption.value}/students`)
              .then((response) => {
                const studentsWithSampleName = response.data.studentsInvoice.map((student) => ({
                  ...student,
                  pendingAmountwithconditonone: student.pendingAmountwithconditon,
                }));
                setStudentData(studentsWithSampleName);
                // console.log('response.data.studentsInvoice:', response.data.studentsInvoice);
                setInitialStudentData(response.data.studentsInvoice);
                setSelectedCheckboxes(Array(response.data.studentsInvoice.length).fill(false));
                const initialValues = {};
                response.data.studentsInvoice.forEach((student, index) => {
                  initialValues[index] = student.pendingAmountwithconditon;
                });
                setInputValue(initialValues);
              })
              .catch((error) => {
                console.error('Error fetching student data:', error);
              });
          } else {
            setStudentData([]);
            setInitialStudentData([]);
            setSelectedCheckboxes([]);
          }
        } else if (data.status === "amountFalse") {
          // Display an error SweetAlert with the response message
          Swal.fire({
              icon: 'error',
              title: 'Payment Failed',
              text: data.message, // Use the response message from the server
          });
      } else if (data.status === "NoAmount") {
        // Display an error SweetAlert with the response message
        Swal.fire({
            icon: 'error',
            title: 'Total amount is greater than sponsor excess amount',
            text: data.message, // Use the response message from the server
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
  ///////////////////////////////////////////          start here        //////////////////////


  const handleRowSelection = (rowIndex) => {
    const updatedSelectedCheckboxes = [...selectedCheckboxes]; // Create a copy of the selectedCheckboxes array
    updatedSelectedCheckboxes[rowIndex] = !updatedSelectedCheckboxes[rowIndex];

    // Calculate the Total Amount based on selected checkboxes
    const selectedInvoices = studentData
      .filter((_, index) => updatedSelectedCheckboxes[index] && parseFloat(studentData[index].pendingAmountwithconditonone))
      .map((student) => parseFloat(student.pendingAmountwithconditonone || 0));

    const newTotalAmount = selectedInvoices.reduce((acc, amount) => acc + amount, 0);

    // Update invoiceData with the selected invoices
    const newInvoiceData = studentData
      .filter((_, index) => updatedSelectedCheckboxes[index])
      .map((student) => ({
        invoice_no: student.invoice_no,
        id: student.slno,
        amount: student.pendingAmountwithconditonone,
        inv_amount: student.amount,
      }));

    setTotalAmount(newTotalAmount);
    setInvoiceData(newInvoiceData);
    setSelectedCheckboxes(updatedSelectedCheckboxes);
  };

  const handleAmountChange = (event, rowIndex) => {
    const newValue = parseFloat(event.target.value);
    setInputValue({
      ...inputValue,
      [rowIndex]: newValue,
    });
    const updatedStudentData = studentData.map((student, index) => {
      if (index === rowIndex) {
        return {
          ...student,
          pendingAmountwithconditonone: newValue,
        };
      }
      return student;
    });

    setStudentData(updatedStudentData);

    const selectedInvoices = updatedStudentData
      .filter((student, index) => selectedCheckboxes[index] && parseFloat(student.pendingAmountwithconditonone))
      .map((student) => parseFloat(student.pendingAmountwithconditonone || 0));

    const newTotalAmount = selectedInvoices.reduce((acc, amount) => acc + amount, 0);

    setTotalAmount(newTotalAmount);

    const newInvoiceData = updatedStudentData
      .filter((_, rowIndex) => selectedCheckboxes[rowIndex])
      .map((student) => ({
        invoice_no: student.invoice_no,
        id: student.slno,
        amount: student.pendingAmountwithconditonone,
        inv_amount: student.amount,
      }));

    setInvoiceData(newInvoiceData);
  };

  ////////////////////////////////////////////end        ////////////////////////////////////////////////////////////
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
      const remainingAmount = calculatedGivenAmount - totalAmount;
      setExcessiveAmount(remainingAmount.toFixed(2));
    } else {
      // If the entered value is not a valid number, set "Entered Amount" and "Given Amount" to null, and reset the "Excessive / Remaining Amount" to the total amount
      setEnteredAmount(null);
      setGivenAmount(null);
      setExcessiveAmount(totalAmount.toFixed(2));
    }
  };

  const handleInput = (event) => {
    // Remove non-numeric characters and update the input value
    const numericValue = event.target.value.replace(/\D/g, '');
    event.target.value = numericValue;
    setEnteredAmount(numericValue);
  };
  const statictypeOptions = [
    // { value: '', label: 'Select' },
    { value: 'school', label: 'School' },
    { value: 'other', label: 'Hostel' }
  ]; // Example static options
  return (
    <div>
      <Sidebar />
      <div style={{ width: '82.5%', float: 'right' }} >
        <Header />
        <div className='py-4 px-3'>
          <div style={{ borderRadius: '10px', border: '1px solid #000', backgroundColor: '#ffff' }} >
            <h3 style={{ fontFamily: 'sans-serif', marginTop: '20px', marginLeft: '20px' }}><FaPeopleCarry className='mr-3' /> Sponsor Payment</h3><hr />
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
                  <Select
                      styles={customStyles}
                      value={typeselectedOption} // Pre-select values
                      onChange={handleTypeSelectChange}
                      options={statictypeOptions} // Use the static options here
                      isClearable={true}
                      
                      placeholder='Select Type'
                    />
                  </Col>
                  {/* <Col>
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
                  </Col> */}
                </Row>
                {/* <Row className='pt-4'>
                  <Col>
                  <div style={{ borderColor: '#000', display: 'flex', alignItems: 'center' }}>
        <HiOutlineCurrencyRupee size={35} />
        <input
          style={{ flex: 1, border: '1px solid #000', padding: '10px' }}
          type="text"
          placeholder="Enter Given Amount"
          value={enteredAmount}
                        onChange={handleEnteredAmountChange}
                        onInput={handleInput}/>
      </div>
                  </Col>
                  <Col>
                    <TextField
                      style={{ borderColor: '#000' }}
                      type='number'
                      label='Enter Amount'
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
                </Row> */}
              </Form>
            </div>

            <div className='container' style={{ position: 'relative' }}>
              <Table striped bordered hover responsive style={{ width: 'max-content' }}>
                <thead>
                  <tr style={{ height: '65px' }}>
                    <th style={{ width: '65px', backgroundColor: '#E6E6E6', textAlign: 'center' }}>
                      <div class="checkbox-wrapper-40">
                        <label>
                          <input
                            type='checkbox'
                            checked={Object.values(selectedCheckboxes).every((value) => value)}
                            onChange={() =>
                              setSelectedCheckboxes((prevState) => {
                                const allChecked = !Object.values(prevState).every((value) => value);
                                const newState = [];
                                for (const rowIndex in prevState) {
                                  // if (!studentData[rowIndex].payment_status || studentData[rowIndex].payment_status !== "Paid" && studentData[rowIndex].payment_status !== "Partial Paid") {
                                    if (studentData[rowIndex].disable !== 1 && studentData[rowIndex].payment_status !== "Paid") {
                                      newState[rowIndex] = allChecked;
                                  } else {
                                    newState[rowIndex] = false;
                                  }
                                }

                                const selectedInvoices = studentData
                                  .filter((student, index) => newState[index] && student.disable !== 1 && student.payment_status !== "Paid"  && parseFloat(student.pendingAmountwithconditonone))
                                  .map((student) => parseFloat(student.pendingAmountwithconditonone || 0));

                                const newTotalAmount = selectedInvoices.reduce((acc, amount) => acc + amount, 0);

                                const newInvoiceData = studentData
                                  .filter((student, rowIndex) => newState[rowIndex] && student.payment_status !== "Paid" && student.payment_status !== "Partial Paid")
                                  .map((student) => ({
                                    invoice_no: student.invoice_no,
                                    id: student.slno,
                                    amount: student.pendingAmountwithconditonone,
                                    inv_amount: student.amount,
                                  }));

                                console.log("selectedInvoices", selectedInvoices, newTotalAmount, newInvoiceData);

                                setInvoiceData(newInvoiceData);
                                setTotalAmount(newTotalAmount);

                                return newState;
                              })} />
                          <span class="checkbox"></span>
                        </label>
                      </div>
                    </th>
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Enter Amt.</th>
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Invoice Amt. <br></br>+ Dues</th>
                    {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Paid Amount</th> */}

                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Invoice No</th>
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Name</th>
                    {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Slno</th> */}
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Roll No</th>
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Section</th>
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Standard</th>
                    {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Hostel/Day</th> */}
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Payment Status</th>
                    {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Invoice Pending Amount</th> */}
                    {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Actual Amount</th>
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Amount</th> */}
                    {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Previous Pending Amount</th> */}
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Discount Amt.</th>
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Total Invoice Amt.</th>
                    {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Fees Glance</th> */}
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Fees Category</th>
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Fees Items Details</th>
                    {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Date</th> */}
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Acad year</th>
                    <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {studentData.map((studentInvoice, index) => ( */}
                  {/* {studentData.slice(0, showAll ? studentData.length : initialRowCount).map((studentInvoice, index) => ( */}
                  {studentData.map((studentInvoice, index) => (

                    <tr key={index}
                      style={{
                        backgroundColor: selectedRows.includes(index) ? 'lightblue' : 'white',
                        // opacity: studentInvoice?.payment_status === 'Paid' || studentInvoice?.payment_status === 'Partial Paid' ? 0.5 : 1,
                        opacity: studentInvoice?.disable  === 1 || studentInvoice?.payment_status === "Paid" ? 0.5 : 1,
                          backgroundColor: studentInvoice?.payment_status === 'Partial Paid' ? 'red' : (selectedRows.includes(index) ? 'lightblue' : 'white'),
                                              }}>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <div class="checkbox-wrapper-40">
                          <label>
                            <input
                              type='checkbox'
                              checked={selectedCheckboxes[index] || false}
                              onChange={() => handleRowSelection(index)}
                              // disabled={studentInvoice?.payment_status === "Paid" || studentInvoice?.payment_status === "Partial Paid"}
                              disabled={studentInvoice?.disable === 1  }
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
                          type='text'
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
                          value={inputValue[index] !== undefined ? inputValue[index] : '0.00'}
                          onChange={(event) => handleAmountChange(event, index)}
                          style={{ scrollBehavior: 'none' }} // Prevent scroll wheel behavior

                        />
                      </td>



                      <td style={{ verticalAlign: 'middle', backgroundColor: studentInvoice?.pendingAmountwithconditon === "0.00" ? '#D4FFC2' : '#F8BFB8' }}>{studentInvoice?.pendingAmountwithconditon}</td>
                      {/* <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.paid_amount}</td> */}

                      <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.invoice_no}</td>
                      <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.name}</td>
                      {/* <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.slno}</td> */}
                      <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.roll_no}</td>
                      <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.sec}</td>
                      <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.standard}</td>
                      {/* <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.hostelOrDay}</td> */}
                      <td style={{ verticalAlign: 'middle' }}>
                        <h5 style={{ fontFamily: 'emoji', color: studentInvoice?.payment_status === "Paid" ? '#004D00'  : 
           studentInvoice?.payment_status === "Partial Paid" ? '#FFA111' : 'inherit' }}>
                          {studentInvoice?.payment_status}
                        </h5>
                      </td>
                      {/* <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.invoice_pending_amount}</td> */}
                      {/* <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.actual_amount}</td>
                      <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.amount}</td> */}
                      {/* <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.previous_pending_amount}</td> */}
                                            <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.discount_percent}</td>
                      <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.total_invoice_amount}</td>
                      {/* <td style={{verticalAlign: 'middle'}} dangerouslySetInnerHTML={{ __html: studentInvoice?.fees_glance }} /> */}
                      <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.fees_cat}</td>
                      <td dangerouslySetInnerHTML={{
                        __html: JSON.parse(studentInvoice?.fees_items_details)
                          .map((item) => (
                            `<p style="font-size: 16px; color: red; font-weight:800;">
      ${item.fees_heading} - ${item.fees_sub_heading}: Rs. ${item.amount}
    </p>`    ))
                          .join('')
                      }} />

                      {/* <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.date}</td> */}
                      <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.acad_year}</td>
                      <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.due_date}</td>
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
                      <Form.Control onChange={(e) => setAdditionalDetails(e.target.value)} value={additionalDetails} as="textarea" rows={3} style={{ borderColor: '#000' }} />
                    </Form.Group>
                  </Col>
                </Row>
                <div className='pt-5 text-center'>
                  <Button onClick={handleCheckboxClick} style={{ background: '#4A6497', color: '#ffff' }}><BiDonateHeart size={35} className='px-2' />Pay now</Button>
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











// import React, { useState, useEffect } from 'react';
// import Sidebar from '../Sidebar';
// import axios from 'axios'
// import Header from '../Header';
// import { Form, Row, Col, Button, Table } from 'react-bootstrap';
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// import { HiOutlineCurrencyRupee } from 'react-icons/hi';
// import { FaPeopleCarry } from 'react-icons/fa';
// import { BiDonateHeart } from 'react-icons/bi';
// import Select from 'react-select';
// import Swal from 'sweetalert2';


// const SponsorBulkpayment = () => {

//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [sponsorOptions, setSponsorOptions] = useState([]);
//   const [studentData, setStudentData] = useState([]);
//   const [selectedCheckboxes, setSelectedCheckboxes] = useState([Array(studentData.length).fill(false)]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [additionalDetails, setAdditionalDetails] = useState('');
//   // const [enteredAmount, setEnteredAmount] = useState('');
//   const [excessiveAmount, setExcessiveAmount] = useState('')
//   const [invoiceData, setInvoiceData] = useState([]);

//   // const [showAll, setShowAll] = useState(false);
//   const [excessAmount, setExcessAmount] = useState(null);
//   const [givenAmount, setGivenAmount] = useState(null);
//   const [enteredAmount, setEnteredAmount] = useState(null);
//   const initialRowCount = 15;
//   const [showAll, setShowAll] = useState(true); // Make sure it's set to true

//   const [initialStudentData, setInitialStudentData] = useState([]);
//   const [inputValue, setInputValue] = useState([]);
//   console.log(invoiceData, "invoiceData");

//   useEffect(() => {
    
//     axios
//       .get('https://santhoshavidhyalaya.com/SVSTEST/api/sponsor/select')
//       .then((response) => {
//         setSponsorOptions(response.data.sponsorOptions);
//       })
//       .catch((error) => {
//         console.error('Error fetching sponsor options:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedOption) {
//       setStudentData([]);
//     setInitialStudentData([]);
//     setSelectedCheckboxes([]);
//     setInputValue({});
//       axios
//         .get(`https://santhoshavidhyalaya.com/SVSTEST/api/sponsortwo/${selectedOption.value}/students`)
//         .then((response) => {
         
//           const studentsWithSampleName = response.data.studentsInvoice.map((student) => ({
//             ...student,
//             pendingAmountwithconditonone: student.pendingAmountwithconditon,
//           }));
//           setStudentData(studentsWithSampleName);
//           console.log('response.data.studentsInvoice:', response.data.studentsInvoice);
//           setInitialStudentData(response.data.studentsInvoice);
//           setSelectedCheckboxes(Array(response.data.studentsInvoice.length).fill(false));
//           const initialValues = {};
//           response.data.studentsInvoice.forEach((student, index) => {
//             initialValues[index] = student.pendingAmountwithconditon;
//           });
//           setInputValue(initialValues);
//         })
//         .catch((error) => {
//           console.error('Error fetching student data:', error);
//         });
//     } else {
//       setStudentData([]);
//       setInitialStudentData([]);
//       setSelectedCheckboxes([]);
//     }
//   }, [selectedOption]);



//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       minHeight: '60px',
//     }),
//   };

//   const handleSelectChange = (selectedOption) => {
//     setSelectedOption(selectedOption);
//     setTotalAmount(0);
//     setInvoiceData([]);
//     setSelectedCheckboxes(Array(studentData.length).fill(false));
//     setStudentData([...initialStudentData]);

//     // Find the selectedOption sponsor by its ID
//     const selectedSponsor = sponsorOptions.find((option) => option.id === selectedOption.value);

//     // Set the excess amount for the selected sponsor as a number
//     if (selectedSponsor) {
//       setExcessAmount(parseFloat(selectedSponsor.excess_amount));
//     } else {
//       // If no sponsor is selected, clear the excess amount
//       setExcessAmount(null);
//     }
//   };


//   const handleCheckboxClick = () => {
//     console.log(invoiceData);

//     // Check if enteredAmount is a valid number and not empty
//     // if (!isNaN(enteredAmount) && enteredAmount !== '') {
//     // Construct the JSON payload
//     const payload = {
//       sponsorId: selectedOption.value, // Replace with the actual sponsor ID
//       totalAmount: enteredAmount,
//       invoiceData: invoiceData,
//       additionalDetails: additionalDetails,
//       mode: "Cash",
//     };
//     console.log(payload);
//     // Make an HTTP POST request to the API using fetch
//     fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/sponsor/processCashPayment', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status === "Success") {
//           // Display a success SweetAlert
//           Swal.fire({
//             icon: 'success',
//             title: 'Payment Successful',
//             text: 'Payment processed successfully',
//           });
//           if (selectedOption) {
//             axios
//               .get(`https://santhoshavidhyalaya.com/SVSTEST/api/sponsortwo/${selectedOption.value}/students`)
//               .then((response) => {
//                 const studentsWithSampleName = response.data.studentsInvoice.map((student) => ({
//                   ...student,
//                   pendingAmountwithconditonone: student.pendingAmountwithconditon,
//                 }));
//                 setStudentData(studentsWithSampleName);
//                 console.log('response.data.studentsInvoice:', response.data.studentsInvoice);
//                 setInitialStudentData(response.data.studentsInvoice);
//                 setSelectedCheckboxes(Array(response.data.studentsInvoice.length).fill(false));
//                 const initialValues = {};
//                 response.data.studentsInvoice.forEach((student, index) => {
//                   initialValues[index] = student.pendingAmountwithconditon;
//                 });
//                 setInputValue(initialValues);
//               })
//               .catch((error) => {
//                 console.error('Error fetching student data:', error);
//               });
//           } else {
//             setStudentData([]);
//             setInitialStudentData([]);
//             setSelectedCheckboxes([]);
//           }
//         } else if (data.status === "amountFalse") {
//           // Display an error SweetAlert with the response message
//           Swal.fire({
//               icon: 'error',
//               title: 'Payment Failed',
//               text: data.message, // Use the response message from the server
//           });
//       }
      
//         else {
//           // Handle other status values if needed
//           console.error('Payment failed:', data.message);
//         }
//         // Handle the response from the API (e.g., show a success message)
//         console.log('Payment data sent successfully:', data);
//       }
//       )
//       .catch((error) => {
//         // Handle errors (e.g., display an error message)
//         console.error('Error sending payment data:', error);
//       });
//     // } else {
//     //   // Handle the case where enteredAmount is not a valid number or empty
//     //   console.error('Invalid enteredAmount:', enteredAmount);
//     // }

//   };
//   ///////////////////////////////////////////          start here        //////////////////////


//   const handleRowSelection = (rowIndex) => {
//     const updatedSelectedCheckboxes = [...selectedCheckboxes]; // Create a copy of the selectedCheckboxes array
//     updatedSelectedCheckboxes[rowIndex] = !updatedSelectedCheckboxes[rowIndex];

//     // Calculate the Total Amount based on selected checkboxes
//     const selectedInvoices = studentData
//       .filter((_, index) => updatedSelectedCheckboxes[index] && parseFloat(studentData[index].pendingAmountwithconditonone))
//       .map((student) => parseFloat(student.pendingAmountwithconditonone || 0));

//     const newTotalAmount = selectedInvoices.reduce((acc, amount) => acc + amount, 0);

//     // Update invoiceData with the selected invoices
//     const newInvoiceData = studentData
//       .filter((_, index) => updatedSelectedCheckboxes[index])
//       .map((student) => ({
//         invoice_no: student.invoice_no,
//         id: student.slno,
//         amount: student.pendingAmountwithconditonone,
//       }));

//     setTotalAmount(newTotalAmount);
//     setInvoiceData(newInvoiceData);
//     setSelectedCheckboxes(updatedSelectedCheckboxes);
//   };

//   const handleAmountChange = (event, rowIndex) => {
//     const newValue = parseFloat(event.target.value);
//     setInputValue({
//       ...inputValue,
//       [rowIndex]: newValue,
//     });
//     const updatedStudentData = studentData.map((student, index) => {
//       if (index === rowIndex) {
//         return {
//           ...student,
//           pendingAmountwithconditonone: newValue,
//         };
//       }
//       return student;
//     });

//     setStudentData(updatedStudentData);

//     const selectedInvoices = updatedStudentData
//       .filter((student, index) => selectedCheckboxes[index] && parseFloat(student.pendingAmountwithconditonone))
//       .map((student) => parseFloat(student.pendingAmountwithconditonone || 0));

//     const newTotalAmount = selectedInvoices.reduce((acc, amount) => acc + amount, 0);

//     setTotalAmount(newTotalAmount);

//     const newInvoiceData = updatedStudentData
//       .filter((_, rowIndex) => selectedCheckboxes[rowIndex])
//       .map((student) => ({
//         invoice_no: student.invoice_no,
//         id: student.slno,
//         amount: student.pendingAmountwithconditonone,
//       }));

//     setInvoiceData(newInvoiceData);
//   };

//   ////////////////////////////////////////////end        ////////////////////////////////////////////////////////////
//   // const newValue = parseFloat(event.target.value);
//   // setEnteredAmount(newValue);
//   // const remainingAmount =  newValue - totalAmount;
//   // setExcessiveAmount(remainingAmount.toFixed(2)); 
//   // };

//   const handleEnteredAmountChange = (event) => {
    
//     const newValue = parseFloat(event.target.value);

//     if (!isNaN(newValue)) {
//       // Calculate the "Given Amount" as a number by adding "Excess Amount" and "Entered Amount"
//       const calculatedGivenAmount = (excessAmount || 0) + newValue;
//       setEnteredAmount(newValue);
//       setGivenAmount(calculatedGivenAmount.toFixed(2));

//       // Calculate the "Excessive / Remaining Amount" by subtracting the calculated given amount from the total amount
//       const remainingAmount = calculatedGivenAmount - totalAmount;
//       setExcessiveAmount(remainingAmount.toFixed(2));
//     } else {
//       // If the entered value is not a valid number, set "Entered Amount" and "Given Amount" to null, and reset the "Excessive / Remaining Amount" to the total amount
//       setEnteredAmount(null);
//       setGivenAmount(null);
//       setExcessiveAmount(totalAmount.toFixed(2));
//     }
//   };

//   const handleInput = (event) => {
//     // Remove non-numeric characters and update the input value
//     const numericValue = event.target.value.replace(/\D/g, '');
//     event.target.value = numericValue;
//     setEnteredAmount(numericValue);
//   };
//   return (
//     <div>
//       <Sidebar />
//       <div style={{ width: '82.5%', float: 'right' }} >
//         <Header />
//         <div className='py-4 px-3'>
//           <div style={{ borderRadius: '10px', border: '1px solid #000', backgroundColor: '#ffff' }} >
//             <h3 style={{ fontFamily: 'sans-serif', marginTop: '20px', marginLeft: '20px' }}><FaPeopleCarry className='mr-3' /> Sponsor Payment</h3><hr />
//             <div className='py-5 px-3'>
//               <Form>
//                 <Row>
//                   <Col>
//                     <Select
//                       styles={customStyles}
//                       value={selectedOption}
//                       onChange={handleSelectChange}
//                       options={sponsorOptions.map((option) => ({
//                         value: option.id,
//                         label: option.name,
//                       }))}
//                       isClearable={true}
//                       placeholder='Select a Sponsor' />
//                   </Col>
//                   <Col>
//                     <TextField
//                       style={{ borderColor: '#000' }}
//                       type='number'
//                       label='Excess Amount'
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position='start'>
//                             <HiOutlineCurrencyRupee size={35} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       fullWidth
//                       variant='outlined'
//                       value={excessAmount !== null ? excessAmount : ''}
//                       disabled={excessAmount === null}
//                     />
//                   </Col>
//                 </Row>
//                 <Row className='pt-4'>
//                   <Col>
//                   <div style={{ borderColor: '#000', display: 'flex', alignItems: 'center' }}>
//         <HiOutlineCurrencyRupee size={35} />
//         <input
//           style={{ flex: 1, border: '1px solid #000', padding: '10px' }}
//           type="text"
//           placeholder="Enter Given Amount"
//           value={enteredAmount}
//                         onChange={handleEnteredAmountChange}
//                         onInput={handleInput}/>
//       </div>
//                   </Col>
//                   {/* <Col>
//                     <TextField value={enteredAmount} onChange={handleEnteredAmountChange}  style={{borderColor:'#000'}} type='number' label="Enter Amount" InputProps={{ startAdornment: (
//                       <InputAdornment position="start">
//                       <HiOutlineCurrencyRupee size={35} />
//                     </InputAdornment> ),}} fullWidth variant="outlined" />
//                    </Col> */}
//                   <Col>
//                     <TextField
//                       style={{ borderColor: '#000' }}
//                       type='number'
//                       label='Enter Amount'
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position='start'>
//                             <HiOutlineCurrencyRupee size={35} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       fullWidth
//                       variant='outlined'
//                       value={givenAmount !== null ? givenAmount : ''}
//                       disabled
//                     />
//                   </Col>
//                 </Row>
//               </Form>
//             </div>

//             <div className='container' style={{ position: 'relative' }}>
//               <Table striped bordered hover responsive style={{ width: 'max-content' }}>
//                 <thead>
//                   <tr style={{ height: '65px' }}>
//                     <th style={{ width: '65px', backgroundColor: '#E6E6E6', textAlign: 'center' }}>
//                       <div class="checkbox-wrapper-40">
//                         <label>
//                           <input
//                             type='checkbox'
//                             checked={Object.values(selectedCheckboxes).every((value) => value)}
//                             onChange={() =>
//                               setSelectedCheckboxes((prevState) => {
//                                 const allChecked = !Object.values(prevState).every((value) => value);
//                                 const newState = [];
//                                 for (const rowIndex in prevState) {
//                                   if (!studentData[rowIndex].payment_status || studentData[rowIndex].payment_status !== "Paid" && studentData[rowIndex].payment_status !== "Partial Paid") {
//                                     newState[rowIndex] = allChecked;
//                                   } else {
//                                     newState[rowIndex] = false;
//                                   }
//                                 }

//                                 const selectedInvoices = studentData
//                                   .filter((student, index) => newState[index] && student.payment_status !== "Paid" && student.payment_status !== "Partial Paid" && parseFloat(student.pendingAmountwithconditonone))
//                                   .map((student) => parseFloat(student.pendingAmountwithconditonone || 0));

//                                 const newTotalAmount = selectedInvoices.reduce((acc, amount) => acc + amount, 0);

//                                 const newInvoiceData = studentData
//                                   .filter((student, rowIndex) => newState[rowIndex] && student.payment_status !== "Paid" && student.payment_status !== "Partial Paid")
//                                   .map((student) => ({
//                                     invoice_no: student.invoice_no,
//                                     id: student.slno,
//                                     amount: student.pendingAmountwithconditonone,
//                                   }));

//                                 console.log("selectedInvoices", selectedInvoices, newTotalAmount, newInvoiceData);

//                                 setInvoiceData(newInvoiceData);
//                                 setTotalAmount(newTotalAmount);

//                                 return newState;
//                               })} />
//                           <span class="checkbox"></span>
//                         </label>
//                       </div>
//                     </th>
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Enter Amount</th>
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Invoice Amount</th>
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Paid Amount</th>

//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Invoice No</th>
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Name</th>
//                     {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Slno</th> */}
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Roll No</th>
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Section</th>
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Standard</th>
//                     {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Hostel/Day</th> */}
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Payment Status</th>
//                     {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Invoice Pending Amount</th> */}
//                     {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Actual Amount</th>
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Amount</th> */}
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Previous Pending Amount</th>
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Total Invoice Amount</th>
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Discount Percent</th>
//                     {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Fees Glance</th> */}
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Fees Category</th>
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Fees Items Details</th>
//                     {/* <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Date</th> */}
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Acad year</th>
//                     <th style={{ backgroundColor: '#E6E6E6', color: '#000' }}>Due Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* {studentData.map((studentInvoice, index) => ( */}
//                   {/* {studentData.slice(0, showAll ? studentData.length : initialRowCount).map((studentInvoice, index) => ( */}
//                   {studentData.map((studentInvoice, index) => (

//                     <tr key={index}
//                       style={{
//                         backgroundColor: selectedRows.includes(index) ? 'lightblue' : 'white',
//                         opacity: studentInvoice?.payment_status === 'Paid' || studentInvoice?.payment_status === 'Partial Paid' ? 0.5 : 1,
//                           backgroundColor: studentInvoice?.payment_status === 'Partial Paid' ? 'red' : (selectedRows.includes(index) ? 'lightblue' : 'white'),
//                                               }}>
//                       <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
//                         <div class="checkbox-wrapper-40">
//                           <label>
//                             <input
//                               type='checkbox'
//                               checked={selectedCheckboxes[index] || false}
//                               onChange={() => handleRowSelection(index)}
//                               disabled={studentInvoice?.payment_status === "Paid" || studentInvoice?.payment_status === "Partial Paid"}
//                             />
//                             <span class="checkbox"></span>
//                           </label>
//                         </div>
//                       </td>

//                       <td style={{ verticalAlign: 'middle' }}>
//                         <TextField
//                           style={{
//                             borderColor: '#000',
//                             backgroundColor:
//                               studentInvoice?.pendingAmountwithconditon === '0.00'
//                                 ? '#D4FFC2'
//                                 : '#F8BFB8',
//                           }}
//                           type='text'
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position='start'>
//                                 <HiOutlineCurrencyRupee size={35} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           fullWidth
//                           variant='outlined'
//                           // Use the amount property from studentData as the initial value
//                           value={inputValue[index] !== undefined ? inputValue[index] : '0.00'}
//                           onChange={(event) => handleAmountChange(event, index)}
//                           style={{ scrollBehavior: 'none' }} // Prevent scroll wheel behavior

//                         />
//                       </td>



//                       <td style={{ verticalAlign: 'middle', backgroundColor: studentInvoice?.pendingAmountwithconditon === "0.00" ? '#D4FFC2' : '#F8BFB8' }}>{studentInvoice?.pendingAmountwithconditon}</td>
//                       <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.paid_amount}</td>

//                       <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.invoice_no}</td>
//                       <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.name}</td>
//                       {/* <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.slno}</td> */}
//                       <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.roll_no}</td>
//                       <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.sec}</td>
//                       <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.standard}</td>
//                       {/* <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.hostelOrDay}</td> */}
//                       <td style={{ verticalAlign: 'middle' }}>
//                         <h5 style={{ fontFamily: 'emoji', color: studentInvoice?.payment_status === "Paid" ? '#004D00'  : 
//            studentInvoice?.payment_status === "Partial Paid" ? '#FFA500' : 'inherit' }}>
//                           {studentInvoice?.payment_status}
//                         </h5>
//                       </td>
//                       {/* <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.invoice_pending_amount}</td> */}
//                       {/* <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.actual_amount}</td>
//                       <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.amount}</td> */}
//                       <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.previous_pending_amount}</td>
//                       <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.total_invoice_amount}</td>
//                       <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.discount_percent}</td>
//                       {/* <td style={{verticalAlign: 'middle'}} dangerouslySetInnerHTML={{ __html: studentInvoice?.fees_glance }} /> */}
//                       <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.fees_cat}</td>
//                       <td dangerouslySetInnerHTML={{
//                         __html: JSON.parse(studentInvoice?.fees_items_details)
//                           .map((item) => (
//                             `<p style="font-size: 16px; color: red; font-weight:800;">
//       ${item.fees_heading} - ${item.fees_sub_heading}: Rs. ${item.amount}
//     </p>`    ))
//                           .join('')
//                       }} />

//                       {/* <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.date}</td> */}
//                       <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.acad_year}</td>
//                       <td style={{ verticalAlign: 'middle' }}>{studentInvoice?.due_date}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//               {/* <div className='pt-2'>
//               {studentData.length > initialRowCount && (
//               <Button onClick={() => setShowAll(!showAll)} style={{backgroundColor:'#DEF9FB',color:'#000'}}>
//                 {showAll ? 'Show Less' : 'Show More'}
//               </Button>
//               )}
//               </div> */}
//             </div>
//             <div className='py-5 px-4'>
//               <Form>
//                 <Row>
//                   <Col>
//                     <Form.Group >
//                       <Form.Label>Total Amount</Form.Label>
//                       <Form.Control
//                         type='number'
//                         style={{ borderColor: '#000' }}
//                         value={totalAmount} />
//                     </Form.Group>
//                   </Col>
//                   {/* <Col>
//                 <Form.Group>
//                   <Form.Label>Excessive / Remaining Amount</Form.Label>
//                   <Form.Control type='number' style={{borderColor:'#000'}}
//                     value={excessiveAmount} />
//                 </Form.Group>
//               </Col> */}
//                 </Row>
//                 <Row className='pt-3'>
//                   <Col>
//                     <Form.Group className="mb-3" >
//                       <Form.Label>Enter Remark</Form.Label>
//                       <Form.Control onChange={(e) => setAdditionalDetails(e.target.value)} value={additionalDetails} as="textarea" rows={3} style={{ borderColor: '#000' }} />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <div className='pt-5 text-center'>
//                   <Button onClick={handleCheckboxClick} style={{ background: '#4A6497', color: '#ffff' }}><BiDonateHeart size={35} className='px-2' />Pay now</Button>
//                 </div>
//               </Form>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SponsorBulkpayment