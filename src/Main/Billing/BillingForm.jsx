import React, { useState, useEffect } from 'react';
import Navbar from '../Navbarall';
import { Row, Col, Form, Table, Button } from 'react-bootstrap';
import { RiBillLine } from 'react-icons/ri';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import DatePicker from 'react-datepicker';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import { MdFileDownloadDone } from 'react-icons/md';
import { FaSearchengin } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Swal from 'sweetalert2';
import { RiFileAddLine, RiMoneyDollarCircleLine ,RiAddLine} from 'react-icons/ri';
import 'select2';
import 'select2/dist/css/select2.min.css';
import $ from 'jquery';

 const BillingForm = () => {
  const [billingDate, setBillingDate] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [rows, setRows] = useState([]);
   const [showInput, setShowInput] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectBill, setSelectBill] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [patientOptions, setPatientOptions] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null); 

  const [newPatientName, setNewPatientName] = useState('');
  const [newDate, setNewDate] = useState('')
  const [newOPIP, setNewOPIP] = useState('')
  const [newAdvance, setNewAdvance] = useState('')
  const [newNote, setNewNote] = useState('')
  const [newDoctorID, setNewDoctorID] = useState('')
  const [newRefDoctorID, setNewRefDoctorID] = useState('')
  const [newServices, setNewServices] = useState('')
  const [newAmount, setNewAmount] = useState('')
  const [newDiscountPercentage, setNewDiscountPercentage] = useState('')
  const [newDiscount, setNewDiscount] = useState('')
  const [newRemark, setNewRemark] = useState('')
  const [selectedId, setSelectedId] = useState('');

  const [doctorOptions, setDoctorOptions] = useState([]);
  const [refIdOptions, setRefIdOptions] = useState([]);
  
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [refIdSearchQuery, setRefIdSearchQuery] = useState('');
  const [formData, setFormData] = useState(new FormData());

  const [serviceOptions, setServiceOptions] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const [BillId, setBillId] = useState('');

  const [opOrIp, setOpOrIp] = useState('OP'); // Default value is 'OP'
  const [selectedServices, setSelectedServices] = useState([]);
  const [overallDiscount, setOverallDiscount] = useState(0); // Add this line

  const [paymentInputsVisible, setPaymentInputsVisible] = useState(true);
  const [paymentModeInput, setPaymentModeInput] = useState('');
  const [paymentAmountInput, setPaymentAmountInput] = useState('');
  const [RemaingpaymentAmountInput, setRemaingpaymentAmountInput] = useState('');
  
  const [remarksInput, setRemarksInput] = useState('');
  const [createdByInput, setCreatedByInput] = useState('');
  const [billCreated, setBillCreated] = useState(false); // Track if bill is created

  const [TotalremaingAmount, setTotalAmount] = useState(false); // Track if bill is created
  const [Updr, setUpdr] = useState('');
  const [UpRefdr, setUpRefdr] = useState('');

   
   /////////////////////////////////////////////

   const [selectedOption, setSelectedOption] = useState(null);
    
   ///////////////////////
  
  const initialInputValues = [
    { service_id: null, rate: null, DiscountPercent: null, Discount: null, Remark: null },
    { service_id: null, rate: null, DiscountPercent: null, Discount: null, Remark: null },
    { service_id: null, rate: null, DiscountPercent: null, Discount: null, Remark: null },
    { service_id: null, rate: null, DiscountPercent: null, Discount: null, Remark: null }
  ];
  
  const [inputValues, setInputValues] = useState(initialInputValues);
  
  const [fetchedBillData, setFetchedBillData] = useState(null);

  const handleOpOrIpChange = event => {
    setOpOrIp(event.target.value);
   };
   
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const totalAmount = inputValues.reduce((total, inputValue) => {
    const rate = inputValue.rate || 0;
    return total + parseFloat(rate);
  }, 0);
  // const totalAmount = inputValues.reduce((total, inputValue) => {
  //   const rate = inputValue.rate || 0;
    
  //   if (!TotalremaingAmount) {
  //     return total + parseFloat(rate);
  //   } else {
  //     return TotalremaingAmount; // Use TotalremaingAmount for each inputValue
  //   }
  // }, 0);
   console.log('RemaingpaymentAmountInput',RemaingpaymentAmountInput);
     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///Fetch Start///
// const fetchPatientData = async (id) => {
//   try {
//     const response = await fetch(`https://euctostaging.com/prolife/api/bills`);
//     const data = await response.json();
//     console.log(data);
//     setSelectBill(data.bill_no);
//     setSelectedPatient(data.patient_id);
//     // setPatientOptions(data.patient_id);
//     setNewDate(data.date);
//     setNewOPIP(data.opOrIp);
//     setNewAdvance(data.advance);
//     setNewNote(data.note);
//     setNewDoctorID(data.doctor);
//     setNewRefDoctorID(data.rfdoctor);
//     setNewServices(data.services);
//     setNewAmount(data.amount);
//     setNewDiscountPercentage(data.discount_amount);
//     setNewDiscount(data.discount_amount);
//     setNewRemark(data.remarks);
 
   
//     const formData = new FormData();
//      formData.append('bill_no', data.bill_no);
//      formData.append('patient_id', data.patient_id);
//      formData.append('date', data.date);
//      formData.append('op_ip', data.op_ip);
//      formData.append('advance', data.advance);
//      formData.append('note', data.note);
//      formData.append('doctor', data.doctor);
//      formData.append('rfdoctor', data.rfdoctor);
//      formData.append('services', data.services);
//      formData.append('discount_amount', data.discount_amount);
//      formData.append('remarks', data.remarks);
//      setFormData(formData);

//   } catch (error) {
//     console.error('Error fetching patient data:', error);
//   }
//   };
//   // useEffect(() => {
//   //   if (selectedId) {
//   //     fetchPatientData(selectedId);
//   //   }
//   // }, [selectedId]);
const clearAllInputs = () => {
  setBillingDate('');
  setIsChecked(false);
  setInputValue('');
  setRows([]);
  setShowInput(false);
  // setOptions([]);
   setSearchQuery('');
  setPatientOptions([]);
  setSelectedPatient(null);
  setNewPatientName('');
  setNewDate('');
  setNewOPIP('');
  setNewAdvance('');
  setNewNote('');
  setNewDoctorID('');
  setNewRefDoctorID('');
  setNewServices('');
  setNewAmount('');
  setNewDiscountPercentage('');
  setNewDiscount('');
  setNewRemark('');
  // setSelectedId('');
  setDoctorOptions([]);
  setRefIdOptions([]);
  setDoctorSearchQuery('');
  setRefIdSearchQuery('');
  setFormData(new FormData());
  setServiceOptions([]);
  setServicesData([]);
  setServiceSearchQuery('');
  setBillId('');
  setOpOrIp('OP');
  setSelectedServices([]);
  setOverallDiscount(0);
  setPaymentInputsVisible(true);
  setPaymentModeInput('');
  setPaymentAmountInput('');
  setRemaingpaymentAmountInput('');
  setRemarksInput('');
  setUpdr('');
  setUpRefdr('');
  setCreatedByInput('');
  setBillCreated(false);
  setTotalAmount(false);
  setInputValues(initialInputValues);
  setFetchedBillData(null);
};

// Call clearAllInputs to reset all inputs


// ///Fetch End///

useEffect(() => {
  if (selectBill) {
    // Fetch bill details based on selected bill number
    clearAllInputs();

    fetch(`https://euctostaging.com/prolife/api/bills/${selectBill.value}/billno`)
      .then(response => response.json())
      .then(billData => {

        setFetchedBillData(billData);

        // Extract relevant data from the response and set states
        setBillingDate(new Date(billData.date)); // Convert date string to Date object
        setSelectedPatient({
          value: billData.patient_id,
          label: `${billData.patient.uhid} - ${billData.patient.patient_name}`
        });
        setOpOrIp(billData.op_ip);
        //remaining_amount
        // setNewDoctorID(billData.doctor_id);
        // setNewRefDoctorID(billData.ref_doctor_id);
        // setPaymentMode(billData.payment_mode);
        setRemaingpaymentAmountInput(parseFloat(billData.remaining_amount).toFixed(2));
         // setAdvance(parseFloat(billData.advance).toFixed(2));
      //    "doctor": {
      //     "id": 5,
      //     "name": "Raja Selvam"
      // }
        const parsedOverallDiscount = billData.overall_discount !== null ? parseFloat(billData.overall_discount) : 0;
        console.log('Parsed Overall Discount:', parsedOverallDiscount); // Log the parsed value
  
        setOverallDiscount(parsedOverallDiscount.toFixed(2));
        // const serviceOptionsFromAPI = billData.services.map(service => ({
        //   value: service.service_id,
        //   label: `${service.service_id} - ${service.service_master.service_name}`
        // }));
        const dr = billData.doctor.name;
        const Refdr = billData.doctor.name;
        setUpdr(dr);
        setUpRefdr(Refdr);
        console.log('dr', dr);
        // setServiceOptions(serviceOptionsFromAPI);
        // const options = billData.map(doctor => ({
        //   value: doctor.id, // Don't use `${doctor.id}` here
        //   label: `Dr. ${doctor.name}`
        // }));
        // setDoctorOptions(options);
        // console.log(options);
        // setNewDoctorID({
        //   value: billData.doctor.id,
        //   label: `DR. ${billData.doctor.name}`
        // });
        // setNewRefDoctorID({
        //   value: billData.rfdoctor.id,
        //   label: `DR. ${billData.rfdoctor.name}`
        // });
        const serviceOptions = billData.services.map(service => ({
          value: service.service_id,
          label: `${service.service_id}-${service.service_master.service_name}`
        }));
        setServiceOptions(serviceOptions);
        console.log('serviceOptions:', serviceOptions);

        setNewDoctorID(billData.doctor.id);
        setNewRefDoctorID(billData.rfdoctor.id);
       // console.log(doctorOptionsFromAPI);
       // setNewDoctorID(doctorOptionsFromAPI);
        setBillCreated(true); // Mark bill as created
        // setPaymentInputsVisible(true);
        setBillId(billData.id); // Set the bill_id in state


        ////////////////////////////////////////////////patient
        // Iterate over service data and set service values in inputValues state
        const updatedInputValues = billData.services.map(service => ({
          service_id: service.service_id,
          rate: service.service_master.rate,
          Discount: parseFloat(service.discount_amount).toFixed(2),
          DiscountPercent: null,
          Remark: service.remarks
        }));
        setInputValues(updatedInputValues);
        console.log(updatedInputValues);
       
        
      })
      .catch(error => console.error('Error fetching bill details:', error));
  }
}, [selectBill]);




  // Fetch initial data when the component mounts
  useEffect(() => {
    // Fetch branch data and all bill numbers from the API
    fetch('https://euctostaging.com/prolife/api/bills/newBill', {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        // Extract the data for the selected bill
        const selectedBill = {
          value: data.billno,
          label: data.billno
        };

        // Fetch all bill numbers
        fetch('https://euctostaging.com/prolife/api/bills/all')
          .then(response => response.json())
          .then(allData => {
            console.log(allData);

            // Create an array of all bill options
            const allBillOptions = allData.map(bill => ({
              value: bill.bill_no,
              label: bill.bill_no
            }));

            // Set the options state including the selected bill
            setOptions([selectedBill, ...allBillOptions]);
            setSelectBill(selectedBill); // Set the selected bill
            clearAllInputs();

          })
          .catch(error => console.error('Error fetching all bill numbers:', error));
      })
      .catch(error => console.error('Error fetching branch data:', error));
  }, []);

  const handleBillChange = selectedOption => {
    setSelectBill(selectedOption);
  };

  // Fetch patient options based on search query
  useEffect(() => {
    // console.log('searchQuery:', searchQuery);

    if (searchQuery.length >= 2) {
      console.log('Fetching patient options...');
      fetch(`https://euctostaging.com/prolife/api/masters/patients/search/${searchQuery}`)
        .then(response => response.json())
        .then(data => {
          console.log('API response:', data);
          const options = data.map(patient => ({
            value: patient.id,
            label: `${patient.uhid_patient_name}`
          }));
          setPatientOptions(options);
        })
        .catch(error => console.error('Error fetching patient options:', error));
    } else {
      setPatientOptions([]);
    }
  }, [searchQuery]);

  const handleSearchChange = newValue => {
    setSearchQuery(newValue);
  };

  const handleSelectChange = selectedOption => {
    setSelectedPatient(selectedOption);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = async () => {
    // Create a new patient using API request
    try {
      const formData = new FormData();
      formData.append('patient_name', newPatientName);

      const response = await fetch('https://euctostaging.com/prolife/api/masters/patient', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data', // Change this to 'multipart/form-data'
        // },
        body: formData,
      });
      const responseData = await response.json(); // Parse response as JSON

      if (response.ok) {
        // Handle successful response
        console.log('New patient created successfully');
        setSelectedPatient({
          value: responseData.uhid, // Assuming 'uhid' is the identifier for the patient
          label: `${responseData.uhid} - ${responseData.patient_name}`,
        });
  
        console.log(responseData);
       } else {
        // Handle error response
        console.error('Error creating new patient');
        // Handle error state or show error message
      }
    } catch (error) {
      console.error('Error creating new patient:', error);
      // Handle error state or show error message
    }
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////
// Handle doctor search change
const handleSearchChangedr = newValue => {
  setDoctorSearchQuery(newValue);

  // Fetch doctor options based on search query
  if (newValue.length >= 2) {
    fetch(`https://euctostaging.com/prolife/api/masters/doctors/search/${newValue}`)
      .then(response => response.json())
      .then(data => {
        const options = data.map(doctor => ({
          value: `${doctor.id}`,
          label: `Dr. ${doctor.name}`
        }));
        setDoctorOptions(options);
      })
      .catch(error => console.error('Error fetching doctor options:', error));
  } else {
    setDoctorOptions([]);
  }
}

// Handle reference ID search change
const handleSearchChangerefdr = newValue => {
  setRefIdSearchQuery(newValue);

  // Fetch reference ID options based on search query
  if (newValue.length >= 2) {
    fetch(`https://euctostaging.com/prolife/api/masters/doctors/search/${newValue}`)
      .then(response => response.json())
      .then(data => {
        const options = data.map(doctor => ({
          value: `${doctor.id}`,
          label: `Dr. ${doctor.name}`
        }));
        setRefIdOptions(options);
      })
      .catch(error => console.error('Error fetching reference ID options:', error));
  } else {
    setRefIdOptions([]);
  }
}
  //////////////////////////////////////////////////////////////////////////////////////////////
  $(document).ready(function () {
    $(".servicesearch").select2({
      minimumInputLength: 1,
      formatInputTooShort: function () {
        return "Enter 1 Character";
      },
      ajax: {
        transport: function (params, success, failure) {
          console.log(params.data.term );

          const url = `https://euctostaging.com/prolife/api/masters/services/search/${params.data.term}`;
   
          fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            
          })
            .then(response => response.json())
       .then(data => {
            const options = data.map(service => ({
              id: service.id,
              text: `${service.id} - ${service.service_name}`
            }));
            success({ results: options });
          })
          .catch(error => failure(error));
        }
      }
    });
  });
  
  
  
  

  // $(".servicesearch").on('select2:select', function (e) {
  //   var selectedOption = e.params.data;
  //   var serviceId = selectedOption.id; // Assuming the service ID is in the "id" field
  //   // Your custom logic with the selected service ID
  //   // For example, update the rate based on the selected service ID
  //   var rate = fetchServiceRate(serviceId);
  //   console.log('rate' , rate)
  //   // Handle other operations as needed
  // });
/////////////////////
  
// const getServiceRate = async (selectedServiceId) => {
//   try {
//     const response = await fetch(`https://euctostaging.com/prolife/api/masters/service/${selectedServiceId}`);
//     const data = await response.json();
//     return data.rate || '';
//   } catch (error) {
//     console.error('Error fetching service rate:', error);
//     return '';
//   }
//   await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second

// };

const fetchServiceRate = async (serviceId) => {
  try {
    const response = await fetch(`https://euctostaging.com/prolife/api/masters/service/${serviceId}`);
    const data = await response.json();
    console.log(data.rate);
    return data.rate;
  } catch (error) {
    console.error('Error fetching service rate:', error);
    return null;
  }
};
   const handleServiceChange = (selectedOption) => {
     console.log('gfkgfugughj');
  setSelectedOption(selectedOption);

  if (selectedOption) {
    const serviceId = selectedOption.value;

    setInputValue({
      ...inputValue,
      service_id: serviceId
    });

    fetchServiceRate(serviceId)
      .then((rate) => {
        setInputValue({
          ...inputValue,
          rate: rate
        });
      })
      .catch((error) => {
        console.error("Error fetching service rate:", error);
      });
  } else {
    setInputValue({
      ...inputValue,
      service_id: null,
      rate: null
    });
  }
};


  //////////////////////////////////////////////////////////////////
    const handleAddRow = () => {
      setShowInput(true);
      setInputValues([...inputValues, {}, {}]); // Add 4 empty objects
    };
  ////////////////////////////////
    const handleInputChanges = (index, field, value) => {
      const newInputValues = [...inputValues];
      newInputValues[index][field] = value;
      setInputValues(newInputValues);
    
      if (field === 'service_id') {
        const selectedService = serviceOptions.find(option => option.value === value);
        setSelectedServices(prevSelected => [
          ...prevSelected,
          { service: selectedService, amount: inputValue.rate }
        ]);
      }
    };
    
  
    const handleRemoveRow = (index) => {
      const newInputValues = [...inputValues];
      newInputValues.splice(index, 1);
      setInputValues(newInputValues);
    };
  
    const handleConfirmInput = () => {
      if (inputValues.length > 0) {
        setRows([...rows, ...inputValues]);
      }
      setInputValues([]);
      setShowInput(false);
    };
   const handleBothActions = (event) => {
      event.preventDefault()
      // handleConfirmInput();
      handleAddBill();
    };
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
      if (!isChecked) {
        setInputValue('');
      }
    };

    const handleBillingDate = (date)=>{
        setBillingDate(date)
    }

  ///////////////////////////////////////
   const handleAddBill = async ( ) => {
     let doctorIDValue;
    let doctorrefIDValue;

    if (typeof newDoctorID === 'object' && newDoctorID !== null) {
      doctorIDValue = newDoctorID.value;
    } else {
      doctorIDValue = newDoctorID;
    }
    if (typeof newRefDoctorID === 'object' && newRefDoctorID !== null) {
      doctorrefIDValue = newRefDoctorID.value;
    } else {
      doctorrefIDValue = newRefDoctorID;
    }
    const newBill = {
      bill_no: selectBill.value,
       date: newDate || null,
      // date: billingDate.toISOString().split('T')[0],
      // overall_discount: overallDiscount,  // not used

      patient_id: selectedPatient.value,
      op_ip: opOrIp,
      doctor_id: doctorIDValue, // Use ?. to safely access value
      ref_doctor_id: doctorrefIDValue,
      payment_mode: 'Cash', // Provide a valid payment mode
      // bill_amount: parseFloat(newAmount) + totalAmount,
      advance: newAdvance || null,
      note: newNote || null,
      // services: servicesData.length > 0 ? servicesData : [], // Make sure servicesData is an array
      services: servicesPayload,
      bill_amount: totalAmount.toFixed(2), // Set bill_amount to the calculated total amount
      overall_discount: overallDiscount || null,

      // discount_amount: newDiscount || null,
     };
     
    try {
      const response = await fetch('https://euctostaging.com/prolife/api/bills', {
        method: 'POST',
        body: JSON.stringify(newBill),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      Swal.fire({
        icon: 'success',
        title: 'Created bill successfully !',
        showConfirmButton: false,
        timer: 1800
      })
      console.log('New bill added:', data);
      setPaymentInputsVisible(true);
      setBillCreated(true); // Mark bill as created

      // Reset form fields here if needed
    } catch (error) {
      Swal.fire('Error', 'Failed to update bill Patient.', 'error');

      console.error('Error adding new bill:', error);
    }
  };

  const servicesPayload = inputValues.map(inputValue => ({
    service_id: inputValue.service_id,
    discount_amount: inputValue.Discount || 0,
    remarks: inputValue.Remark || "",
  }));
   const handleAddPayment = async () => {
    if (!billCreated) {
      Swal.fire('Info', 'Please create a bill first by clicking "Create Bill".', 'info');
      return;
    }
    try {
      // Construct the payment data
      const newPayment = {
        payment_mode: paymentModeInput,
        payment_amount: parseFloat(paymentAmountInput),
        remarks: remarksInput,
        created_by: createdByInput || null // Set to null if createdByInput is falsy
      };
      
      // Send the payment data to the server
      const response = await fetch(`https://euctostaging.com/prolife/api/bills/${BillId}/payments`, {
        method: 'POST',
        body: JSON.stringify(newPayment),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        Swal.fire('Error', 'Failed to add payment.', 'error');
        console.error('Error adding payment:', response);
        return;
      }
  
      const data = await response.json();
  
      // Handle success
      Swal.fire({
        icon: 'success',
        title: 'Payment added successfully!',
        showConfirmButton: false,
        timer: 1800
      });
      setBillId(data.bill_id); // Set the bill_id in state

      // Update your bill state or fetch updated data as needed
  
    } catch (error) {
      Swal.fire('Error', 'Failed to add payment.', 'error');
      console.error('Error adding payment:', error);
    }
  };
  
  return (
    <div>
      <Navbar/>
      <div className='py-4 px-4'>
        <div style={{border:'1px solid #000', backgroundColor:'white', borderRadius:'10px'}} className='py-3 px-3' >
            <div className='row pt-3 px-3'>
            <Col><h4> <RiBillLine className='mr-1'/>Generate Billing</h4></Col>
            <Col style={{textAlign:'right'}}>
              <NavLink to='/Main/Billing/BillingTable'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
            </Col>
          </div><hr/>
 {/*------------ Billing Filter ----------- */}
 <Form>
              <Row>
                <Col>
                <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>Bill Number</Form.Label>
                        <Select options={options} value={selectBill} onChange={handleBillChange} />
                      </Form.Group>
                </Col>
                <Col className='pt-4'>
                 <Button variant="outline-success"><FaSearchengin className='mr-2'  />Search</Button>
                </Col>
              </Row><hr/>
{/*---------------- Patient Filter -------------------- */}
              <Row>
                <Col>
                <Form.Group className="mb-2">
                <div>
                <Form.Group controlId="patientSearch">
          <Form.Label>Patient ID and Name</Form.Label>
          <CreatableSelect
            isClearable
            options={patientOptions}
            value={selectedPatient}
            onInputChange={handleSearchChange}
            onChange={handleSelectChange}/>
        </Form.Group>
    </div>
                      </Form.Group>
                </Col>
             <Col>
              <Form.Group className="mb-2">
                <Form.Label className='mb-0'>Create Patient</Form.Label>
                <Form.Control
                  type="text"
                  value={newPatientName}
                  onChange={event => setNewPatientName(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Col className='pt-4'>
              <Button variant="outline-success" onClick={handleSubmit}>
                <MdFileDownloadDone className='mr-2' />Add patient
              </Button>
            </Col>
          </Row><hr/>
              <Row>
                <Col>
                <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>Gender</Form.Label>
                        <Form.Control as="select" value={fetchedBillData?.patient?.gender || ''}>
                          <option value='' >--Select--</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Form.Control>
                      </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-2">
                  <Form.Label className='mb-0'>DOB</Form.Label>
                        <DatePicker
                        placeholderText="DD/MM/YYYY"
                        selected={billingDate}
                        onChange={handleBillingDate}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        showMonthDropdown
                        scrollableMonthYearDropdown
                        customInput={
                          <input type="text" id="txtDate" name="SelectedDate"   style={{ cursor: 'pointer', width:'100%', height:'35px' }}/>}/>
                  </Form.Group>
                </Col>
              </Row>
         
              <Form.Group>
                    <RadioGroup  row className='ml-2' value={opOrIp} onChange={handleOpOrIpChange}>
                      <FormControlLabel value="OP" control={<Radio />} label="OP" />
                      <FormControlLabel value="IP" control={<Radio />} label="IP" />
                    </RadioGroup>
                  </Form.Group>
           {/* ---------- Doctor Filter ------------------------------ */}
 
<Row>
  <Col>
    <Form.Group className="mb-2">
                  <Form.Label className='mb-0'>Doctor ID/Name</Form.Label>
                  {Updr !== '' && newRefDoctorID === '' && (
  <div className="text-danger mt-2 h6">Dr. {Updr}</div>
)}

      <CreatableSelect
  isClearable
  options={doctorOptions}
  onInputChange={handleSearchChangedr}
  onChange={selectedOption => setNewDoctorID(selectedOption ? selectedOption.value : null)}
  value={doctorOptions.find(option => option.value === newDoctorID)} // Use find to match the selected value to an option
                  />
          


    </Form.Group>
  </Col>
  <Col>
    <Form.Group className="mb-2">
                  <Form.Label className='mb-0'>Reference ID</Form.Label>
                  {UpRefdr !== '' && (
  <div className="text-danger mt-2 h6">Dr. {UpRefdr}</div>
)}
      <CreatableSelect
  isClearable
  options={refIdOptions}
  onInputChange={handleSearchChangerefdr}
  onChange={selectedOption => setNewRefDoctorID(selectedOption ? selectedOption.value : null)}
  value={refIdOptions.find(option => option.value === newRefDoctorID)} // Match the selected value to an option
/>

    </Form.Group>
  </Col>
</Row>
<hr />
            <div>
          
                <Form.Check
                    type="checkbox"
                    label="Advance Amount"
                    checked={isChecked}
                    onChange={handleCheckboxChange}/>    
                   <Row>
                    <Col>
                    <div style={{ marginTop: '10px' }}>
                    <input type="text" placeholder="Enter Payable Amount / Adv Amount" style={{ width: '100%', padding: '5px' }} />
                    </div>
                    </Col>
                    <Col style={{paddingTop:'8px'}}>
                       <input type="text" placeholder="Note" style={{ width: '100%', padding: '5px' }} />
                    </Col>
                  </Row>
              </div><hr/>
 
          
    <div className="d-flex justify-content-between">
      <div className="w-50 pr-3">
        <Form.Group className="mb-3">
          <Form.Label className="mb-0">Total Amount</Form.Label>
          <Form.Control
            type="text"
            value={totalAmount.toFixed(2)}
            readOnly
            className="form-control"
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label className="mb-0">Overall Discount</Form.Label>
          <Form.Control
            type="text"
            value={overallDiscount}
            onChange={(event) =>
              setOverallDiscount(parseFloat(event.target.value))
            }
            className="form-control"
          />
        </Form.Group>
      </div>
      
      <div className="w-50 pl-3">
        <Form.Group className="mb-3">
          <Form.Label className="mb-0">Final Bill Amount</Form.Label>
          <Form.Control
            type="text"
            value={(totalAmount - overallDiscount).toFixed(2)}
            readOnly
            className="form-control"
          />
        </Form.Group>
      </div>
    </div>      

<hr className="my-4" />

{/* ---------- Table------------------------------               */}
{!fetchedBillData && (
                <Button variant="primary" className="mb-2" onClick={handleAddRow}>
                    Add Row
                </Button>
            )}
              
              <Table striped bordered hover responsive style={{ minWidth: '65%' }}>
  <thead>
    <tr className='bg-dark text-light'>
      <th style={{ fontFamily: 'math' }}>No</th>
      <th style={{ fontFamily: 'math' , width: '40%' }}>Service ID-Name</th>
      <th style={{ fontFamily: 'math' }}>Amount</th>
      <th style={{ fontFamily: 'math' }}>Discount %</th>
      <th style={{ fontFamily: 'math' }}>Discount</th>
      <th style={{ fontFamily: 'math' }}>Remark</th>
      <th style={{ fontFamily: 'math' }}>Remove</th>
    </tr>
  </thead>
  <tbody>
  {inputValues.map((inputValue, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td style={{width: '40%'}}>
       <div className="servicesearch-container">
  <select
    className="servicesearch form-control"
            placeholder="Search for a service..."
            onChange={handleServiceChange}/>
          
</div>
      </td>
      <td>
        <input
          type="text"
          value={inputValue.rate || ''}
          readOnly
        />
      </td>
      <td>
        <input
          type="text"
          value={inputValue.DiscountPercent || ''}
          onChange={event => {
            const discountPercent = event.target.value;
            const rate = inputValue.rate || 0;
            const discountAmount = (rate * discountPercent) / 100;
            handleInputChanges(index, 'DiscountPercent', discountPercent);
            handleInputChanges(index, 'Discount', discountAmount);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          value={inputValue.Discount || ''}
          onChange={event => {
            const discountAmount = event.target.value;
            const rate = inputValue.rate || 0;
            const discountPercent = (discountAmount / rate) * 100;
            handleInputChanges(index, 'Discount', discountAmount);
            handleInputChanges(index, 'DiscountPercent', discountPercent);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          value={inputValue.Remark || ''}
          onChange={event => handleInputChanges(index, 'Remark', event.target.value)}
        />
      </td>
      <td className='text-center'>
        <IoIosRemoveCircleOutline size={30} style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleRemoveRow(index)} />
      </td>
    </tr>
  ))}
</tbody>

</Table>


              
                {/* <Table striped bordered hover responsive>
                  <thead>
                    <tr className='bg-dark text-light'>
                      <th style={{fontFamily: 'math'}}>No</th>
                      <th style={{fontFamily: 'math'}}>Code</th>
                      <th style={{fontFamily: 'math'}}>Amount</th>
                      <th style={{fontFamily: 'math'}}>Discount %</th>
                      <th style={{fontFamily: 'math'}}>Discount</th>
                      <th style={{fontFamily: 'math'}}>Remark</th>
                      <th style={{fontFamily: 'math'}}>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((rowData, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{rowData.Code}</td>
                        <td>{rowData.Amount}</td>
                        <td>{rowData.DiscountPercent}</td>
                        <td>{rowData.Discount}</td>
                        <td>{rowData.Remark}</td>
                        <td>{rowData.Remove}</td>
                      </tr>
                    ))}
                    {showInput && (
                      inputValues.map((inputValue, index) => (
                        <tr key={index}>
                          <td>{rows.length + index + 1}</td>
                          <td> {/* value={inputValue.Code} onChange={(event) => handleInputChanges(index, 'Code', event.target.value)}  */}
                              {/* <Form.Control as="select"    > 
                                  <option value=''>---Select---</option>
                                  <option value='Test-2'>Test-2</option>
                                  <option value='Test-3'>Test-4</option>
                                  <option value='Test-4'>Test-5</option>
                              </Form.Control>
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              value={inputValue.Amount}
                              onChange={(event) => handleInputChanges(index, 'Amount', event.target.value)} />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              value={inputValue.DiscountPercent}
                              onChange={(event) => handleInputChanges(index, 'DiscountPercent', event.target.value)} />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              value={inputValue.Discount}
                              onChange={(event) => handleInputChanges(index, 'Discount', event.target.value)}/>
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              value={inputValue.Remark}
                              onChange={(event) => handleInputChanges(index, 'Remark', event.target.value)}/>
                          </td>
                          <td className='text-center'>
                            <IoIosRemoveCircleOutline size={30} style={{color:'red', cursor:'pointer'}}  onClick={() => handleRemoveRow(index)} />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table> */}  
                   {/* <Button variant="success" onClick={handleBothActions}
            >Create Bill</Button> */}
            {!fetchedBillData && (
                                       <button className="btn btn-success" onClick={handleBothActions}> <RiFileAddLine className="payment-icon" /> Create Bill</button>

            )}

          </Form>
          {billCreated ? null : (
              <p className="text-danger mt-2">*Please create a bill first by clicking "Create Bill" then make payments.</p>
            )}
          {paymentInputsVisible && (
       <div className="col-md-12">
       <div className="card p-3">
              <h5 className="mb-3">  <RiBillLine className='mr-1'/> Payment Information</h5>
                {fetchedBillData && fetchedBillData.payments ? (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Payment Mode</th>
        <th>Payment Amount</th>
        <th>Remarks</th>
        {/* Add more headers if needed */}
      </tr>
    </thead>
    <tbody>
      {fetchedBillData.payments.map(payment => (
        <tr key={payment.id}>
          <td>{payment.id}</td>
          <td>{payment.payment_mode}</td>
          <td>{payment.payment_amount}</td>
          <td>{payment.remarks}</td>
          {/* Add more table data cells if needed */}
        </tr>
      ))}
    </tbody>
  </Table>
) : (
  <p>No past payments available</p>
)}
                <p className='text-success'><u><strong> <RiAddLine className="icon-spacing" />Make New Payment</strong></u></p>
                <div className="d-flex">

  <div className="w-50 pr-3">

         <Form.Group className="mb-3">
           <Form.Label className="mb-0">Final Bill Amount</Form.Label>
           <Form.Control
             type="text"
             value={(totalAmount - overallDiscount).toFixed(2)}
             readOnly
           />
                  </Form.Group></div>
                <div className="w-50 pl-3">
                  
                {RemaingpaymentAmountInput !== undefined &&
 RemaingpaymentAmountInput !== null &&
 !isNaN(RemaingpaymentAmountInput) &&
 RemaingpaymentAmountInput !== '' && (  <>
           
                             <Form.Label className="mb-0 text-danger fw-bold text-decoration-underline">Remaing Payment Amount</Form.Label>

                    <Form.Control
                        type="number"
                        className='text-danger fw-bolder bg-warning '
              step="0.01"
             value={RemaingpaymentAmountInput}
            //  onChange={(e) => setPaymentAmountInput(e.target.value)}
                      />
                           </>
                      )}
            {fetchedBillData &&fetchedBillData.is_paid_fully === 1 && (
  <div className="text-success mt-2">Fully Paid</div>
)}
                  </div>
                  </div>
    
         <Form.Group className="mb-3">
           <Form.Label className="mb-0">Payment Mode</Form.Label>
           <CreatableSelect
                  isClearable
                  options={[
                    { value: 'cash', label: 'Cash' },
                    { value: 'credit_card', label: 'Credit Card' },
                    { value: 'debit_card', label: 'Debit Card' },
                    { value: 'upi', label: 'UPI' },
                    { value: 'GPAY', label: 'GPAY' },
                    { value: 'PHONEPAY', label: 'PHONEPAY' },
                    { value: 'PAYTM', label: 'PAYTM' },
                    // Add more Indian payment modes here
                  ]}
                  onChange={(selectedOption) => setPaymentModeInput(selectedOption ? selectedOption.value : '')}
                  value={{ value: paymentModeInput, label: paymentModeInput }}
                />
         </Form.Group>
        
          <Form.Group className="mb-3">
           <Form.Label className="mb-0">Payment Amount</Form.Label>
           <Form.Control
             type="number"
             step="0.01"
             value={paymentAmountInput}
             onChange={(e) => setPaymentAmountInput(e.target.value)}
                  />

                    </Form.Group>
               
         <Form.Group className="mb-3">
           <Form.Label className="mb-0">Remarks</Form.Label>
           <Form.Control
             as="textarea"
             rows="3"
             value={remarksInput}
             onChange={(e) => setRemarksInput(e.target.value)}
           />
         </Form.Group>
              </div>
              <button className="btn btn-success" onClick={handleAddPayment}>    <RiMoneyDollarCircleLine className="icon-spacing" /> Add Payment</button>

     </div>
      )}
    </div>
   
      </div>
    </div>
   )
   
}

export default BillingForm






// import Navbar from '../Navbarall';
// import { Row, Col, Form, Table, Button } from 'react-bootstrap';
// import { RiBillLine } from 'react-icons/ri';
// import { IoChevronBackCircleOutline } from 'react-icons/io5';
// import DatePicker from 'react-datepicker';
// import { IoIosRemoveCircleOutline } from 'react-icons/io';
// import { RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
// import { MdFileDownloadDone } from 'react-icons/md';
// import { FaSearchengin } from 'react-icons/fa';
// import { NavLink } from 'react-router-dom';
// import Select from 'react-select';
// import CreatableSelect from 'react-select/creatable';
// import Swal from 'sweetalert2';
// import { RiFileAddLine, RiMoneyDollarCircleLine ,RiAddLine} from 'react-icons/ri';
// import 'select2';
// import 'select2/dist/css/select2.min.css';
// import $ from 'jquery';

//  const BillingForm = () => {
//   const [billingDate, setBillingDate] = useState('');
//   const [isChecked, setIsChecked] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [rows, setRows] = useState([]);
//    const [showInput, setShowInput] = useState(false);
//   const [options, setOptions] = useState([]);
//   const [selectBill, setSelectBill] = useState(null);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [patientOptions, setPatientOptions] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null); 

//   const [newPatientName, setNewPatientName] = useState('');
//   const [newDate, setNewDate] = useState('')
//   const [newOPIP, setNewOPIP] = useState('')
//   const [newAdvance, setNewAdvance] = useState('')
//   const [newNote, setNewNote] = useState('')
//   const [newDoctorID, setNewDoctorID] = useState('')
//   const [newRefDoctorID, setNewRefDoctorID] = useState('')
//   const [newServices, setNewServices] = useState('')
//   const [newAmount, setNewAmount] = useState('')
//   const [newDiscountPercentage, setNewDiscountPercentage] = useState('')
//   const [newDiscount, setNewDiscount] = useState('')
//   const [newRemark, setNewRemark] = useState('')
//   const [selectedId, setSelectedId] = useState('');

//   const [doctorOptions, setDoctorOptions] = useState([]);
//   const [refIdOptions, setRefIdOptions] = useState([]);
  
//   const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
//   const [refIdSearchQuery, setRefIdSearchQuery] = useState('');
//   const [formData, setFormData] = useState(new FormData());

//   const [serviceOptions, setServiceOptions] = useState([]);
//   const [servicesData, setServicesData] = useState([]);
//   const [serviceSearchQuery, setServiceSearchQuery] = useState('');
//   const [BillId, setBillId] = useState('');

//   const [opOrIp, setOpOrIp] = useState('OP'); // Default value is 'OP'
//   const [selectedServices, setSelectedServices] = useState([]);
//   const [overallDiscount, setOverallDiscount] = useState(0); // Add this line

//   const [paymentInputsVisible, setPaymentInputsVisible] = useState(true);
//   const [paymentModeInput, setPaymentModeInput] = useState('');
//   const [paymentAmountInput, setPaymentAmountInput] = useState('');
//   const [RemaingpaymentAmountInput, setRemaingpaymentAmountInput] = useState('');
  
//   const [remarksInput, setRemarksInput] = useState('');
//   const [createdByInput, setCreatedByInput] = useState('');
//   const [billCreated, setBillCreated] = useState(false); // Track if bill is created

//   const [TotalremaingAmount, setTotalAmount] = useState(false); // Track if bill is created
//   const [Updr, setUpdr] = useState('');
//   const [UpRefdr, setUpRefdr] = useState('');

   
//    /////////////////////////////////////////////

//    const [selectedOption, setSelectedOption] = useState(null);
    
//    ///////////////////////
  
//   const initialInputValues = [
//     { service_id: null, rate: null, DiscountPercent: null, Discount: null, Remark: null },
//     { service_id: null, rate: null, DiscountPercent: null, Discount: null, Remark: null },
//     { service_id: null, rate: null, DiscountPercent: null, Discount: null, Remark: null },
//     { service_id: null, rate: null, DiscountPercent: null, Discount: null, Remark: null }
//   ];
  
//   const [inputValues, setInputValues] = useState(initialInputValues);
  
//   const [fetchedBillData, setFetchedBillData] = useState(null);

//   const handleOpOrIpChange = event => {
//     setOpOrIp(event.target.value);
//    };
   
//    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   const totalAmount = inputValues.reduce((total, inputValue) => {
//     const rate = inputValue.rate || 0;
//     return total + parseFloat(rate);
//   }, 0);
//   // const totalAmount = inputValues.reduce((total, inputValue) => {
//   //   const rate = inputValue.rate || 0;
    
//   //   if (!TotalremaingAmount) {
//   //     return total + parseFloat(rate);
//   //   } else {
//   //     return TotalremaingAmount; // Use TotalremaingAmount for each inputValue
//   //   }
//   // }, 0);
//    console.log('RemaingpaymentAmountInput',RemaingpaymentAmountInput);
//      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ///Fetch Start///
// // const fetchPatientData = async (id) => {
// //   try {
// //     const response = await fetch(`https://euctostaging.com/prolife/api/bills`);
// //     const data = await response.json();
// //     console.log(data);
// //     setSelectBill(data.bill_no);
// //     setSelectedPatient(data.patient_id);
// //     // setPatientOptions(data.patient_id);
// //     setNewDate(data.date);
// //     setNewOPIP(data.opOrIp);
// //     setNewAdvance(data.advance);
// //     setNewNote(data.note);
// //     setNewDoctorID(data.doctor);
// //     setNewRefDoctorID(data.rfdoctor);
// //     setNewServices(data.services);
// //     setNewAmount(data.amount);
// //     setNewDiscountPercentage(data.discount_amount);
// //     setNewDiscount(data.discount_amount);
// //     setNewRemark(data.remarks);
 
   
// //     const formData = new FormData();
// //      formData.append('bill_no', data.bill_no);
// //      formData.append('patient_id', data.patient_id);
// //      formData.append('date', data.date);
// //      formData.append('op_ip', data.op_ip);
// //      formData.append('advance', data.advance);
// //      formData.append('note', data.note);
// //      formData.append('doctor', data.doctor);
// //      formData.append('rfdoctor', data.rfdoctor);
// //      formData.append('services', data.services);
// //      formData.append('discount_amount', data.discount_amount);
// //      formData.append('remarks', data.remarks);
// //      setFormData(formData);

// //   } catch (error) {
// //     console.error('Error fetching patient data:', error);
// //   }
// //   };
// //   // useEffect(() => {
// //   //   if (selectedId) {
// //   //     fetchPatientData(selectedId);
// //   //   }
// //   // }, [selectedId]);
// const clearAllInputs = () => {
//   setBillingDate('');
//   setIsChecked(false);
//   setInputValue('');
//   setRows([]);
//   setShowInput(false);
//   // setOptions([]);
//    setSearchQuery('');
//   setPatientOptions([]);
//   setSelectedPatient(null);
//   setNewPatientName('');
//   setNewDate('');
//   setNewOPIP('');
//   setNewAdvance('');
//   setNewNote('');
//   setNewDoctorID('');
//   setNewRefDoctorID('');
//   setNewServices('');
//   setNewAmount('');
//   setNewDiscountPercentage('');
//   setNewDiscount('');
//   setNewRemark('');
//   // setSelectedId('');
//   setDoctorOptions([]);
//   setRefIdOptions([]);
//   setDoctorSearchQuery('');
//   setRefIdSearchQuery('');
//   setFormData(new FormData());
//   setServiceOptions([]);
//   setServicesData([]);
//   setServiceSearchQuery('');
//   setBillId('');
//   setOpOrIp('OP');
//   setSelectedServices([]);
//   setOverallDiscount(0);
//   setPaymentInputsVisible(true);
//   setPaymentModeInput('');
//   setPaymentAmountInput('');
//   setRemaingpaymentAmountInput('');
//   setRemarksInput('');
//   setUpdr('');
//   setUpRefdr('');
//   setCreatedByInput('');
//   setBillCreated(false);
//   setTotalAmount(false);
//   setInputValues(initialInputValues);
//   setFetchedBillData(null);
// };

// // Call clearAllInputs to reset all inputs


// // ///Fetch End///

// useEffect(() => {
//   if (selectBill) {
//     // Fetch bill details based on selected bill number
//     clearAllInputs();

//     fetch(`https://euctostaging.com/prolife/api/bills/${selectBill.value}/billno`)
//       .then(response => response.json())
//       .then(billData => {

//         setFetchedBillData(billData);

//         // Extract relevant data from the response and set states
//         setBillingDate(new Date(billData.date)); // Convert date string to Date object
//         setSelectedPatient({
//           value: billData.patient_id,
//           label: `${billData.patient.uhid} - ${billData.patient.patient_name}`
//         });
//         setOpOrIp(billData.op_ip);
//         //remaining_amount
//         // setNewDoctorID(billData.doctor_id);
//         // setNewRefDoctorID(billData.ref_doctor_id);
//         // setPaymentMode(billData.payment_mode);
//         setRemaingpaymentAmountInput(parseFloat(billData.remaining_amount).toFixed(2));
//          // setAdvance(parseFloat(billData.advance).toFixed(2));
//       //    "doctor": {
//       //     "id": 5,
//       //     "name": "Raja Selvam"
//       // }
//         const parsedOverallDiscount = billData.overall_discount !== null ? parseFloat(billData.overall_discount) : 0;
//         console.log('Parsed Overall Discount:', parsedOverallDiscount); // Log the parsed value
  
//         setOverallDiscount(parsedOverallDiscount.toFixed(2));
//         // const serviceOptionsFromAPI = billData.services.map(service => ({
//         //   value: service.service_id,
//         //   label: `${service.service_id} - ${service.service_master.service_name}`
//         // }));
//         const dr = billData.doctor.name;
//         const Refdr = billData.doctor.name;
//         setUpdr(dr);
//         setUpRefdr(Refdr);
//         console.log('dr', dr);
//         // setServiceOptions(serviceOptionsFromAPI);
//         // const options = billData.map(doctor => ({
//         //   value: doctor.id, // Don't use `${doctor.id}` here
//         //   label: `Dr. ${doctor.name}`
//         // }));
//         // setDoctorOptions(options);
//         // console.log(options);
//         // setNewDoctorID({
//         //   value: billData.doctor.id,
//         //   label: `DR. ${billData.doctor.name}`
//         // });
//         // setNewRefDoctorID({
//         //   value: billData.rfdoctor.id,
//         //   label: `DR. ${billData.rfdoctor.name}`
//         // });
//         const serviceOptions = billData.services.map(service => ({
//           value: service.service_id,
//           label: `${service.service_id}-${service.service_master.service_name}`
//         }));
//         setServiceOptions(serviceOptions);
//         console.log('serviceOptions:', serviceOptions);

//         setNewDoctorID(billData.doctor.id);
//         setNewRefDoctorID(billData.rfdoctor.id);
//        // console.log(doctorOptionsFromAPI);
//        // setNewDoctorID(doctorOptionsFromAPI);
//         setBillCreated(true); // Mark bill as created
//         // setPaymentInputsVisible(true);
//         setBillId(billData.id); // Set the bill_id in state


//         ////////////////////////////////////////////////patient
//         // Iterate over service data and set service values in inputValues state
//         const updatedInputValues = billData.services.map(service => ({
//           service_id: service.service_id,
//           rate: service.service_master.rate,
//           Discount: parseFloat(service.discount_amount).toFixed(2),
//           DiscountPercent: null,
//           Remark: service.remarks
//         }));
//         setInputValues(updatedInputValues);
//         console.log(updatedInputValues);
       
        
//       })
//       .catch(error => console.error('Error fetching bill details:', error));
//   }
// }, [selectBill]);




//   // Fetch initial data when the component mounts
//   useEffect(() => {
//     // Fetch branch data and all bill numbers from the API
//     fetch('https://euctostaging.com/prolife/api/bills/newBill', {
//       method: 'POST'
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Extract the data for the selected bill
//         const selectedBill = {
//           value: data.billno,
//           label: data.billno
//         };

//         // Fetch all bill numbers
//         fetch('https://euctostaging.com/prolife/api/bills/all')
//           .then(response => response.json())
//           .then(allData => {
//             console.log(allData);

//             // Create an array of all bill options
//             const allBillOptions = allData.map(bill => ({
//               value: bill.bill_no,
//               label: bill.bill_no
//             }));

//             // Set the options state including the selected bill
//             setOptions([selectedBill, ...allBillOptions]);
//             setSelectBill(selectedBill); // Set the selected bill
//             clearAllInputs();

//           })
//           .catch(error => console.error('Error fetching all bill numbers:', error));
//       })
//       .catch(error => console.error('Error fetching branch data:', error));
//   }, []);

//   const handleBillChange = selectedOption => {
//     setSelectBill(selectedOption);
//   };

//   // Fetch patient options based on search query
//   useEffect(() => {
//     // console.log('searchQuery:', searchQuery);

//     if (searchQuery.length >= 2) {
//       console.log('Fetching patient options...');
//       fetch(`https://euctostaging.com/prolife/api/masters/patients/search/${searchQuery}`)
//         .then(response => response.json())
//         .then(data => {
//           console.log('API response:', data);
//           const options = data.map(patient => ({
//             value: patient.id,
//             label: `${patient.uhid_patient_name}`
//           }));
//           setPatientOptions(options);
//         })
//         .catch(error => console.error('Error fetching patient options:', error));
//     } else {
//       setPatientOptions([]);
//     }
//   }, [searchQuery]);

//   const handleSearchChange = newValue => {
//     setSearchQuery(newValue);
//   };

//   const handleSelectChange = selectedOption => {
//     setSelectedPatient(selectedOption);
//   };

//   ////////////////////////////////////////////////////////////////////////////////////////////////

//   const handleSubmit = async () => {
//     // Create a new patient using API request
//     try {
//       const formData = new FormData();
//       formData.append('patient_name', newPatientName);

//       const response = await fetch('https://euctostaging.com/prolife/api/masters/patient', {
//         method: 'POST',
//         // headers: {
//         //   'Content-Type': 'multipart/form-data', // Change this to 'multipart/form-data'
//         // },
//         body: formData,
//       });
//       const responseData = await response.json(); // Parse response as JSON

//       if (response.ok) {
//         // Handle successful response
//         console.log('New patient created successfully');
//         setSelectedPatient({
//           value: responseData.uhid, // Assuming 'uhid' is the identifier for the patient
//           label: `${responseData.uhid} - ${responseData.patient_name}`,
//         });
  
//         console.log(responseData);
//        } else {
//         // Handle error response
//         console.error('Error creating new patient');
//         // Handle error state or show error message
//       }
//     } catch (error) {
//       console.error('Error creating new patient:', error);
//       // Handle error state or show error message
//     }
//   };


//   ///////////////////////////////////////////////////////////////////////////////////////////////////////
// // Handle doctor search change
// const handleSearchChangedr = newValue => {
//   setDoctorSearchQuery(newValue);

//   // Fetch doctor options based on search query
//   if (newValue.length >= 2) {
//     fetch(`https://euctostaging.com/prolife/api/masters/doctors/search/${newValue}`)
//       .then(response => response.json())
//       .then(data => {
//         const options = data.map(doctor => ({
//           value: `${doctor.id}`,
//           label: `Dr. ${doctor.name}`
//         }));
//         setDoctorOptions(options);
//       })
//       .catch(error => console.error('Error fetching doctor options:', error));
//   } else {
//     setDoctorOptions([]);
//   }
// }

// // Handle reference ID search change
// const handleSearchChangerefdr = newValue => {
//   setRefIdSearchQuery(newValue);

//   // Fetch reference ID options based on search query
//   if (newValue.length >= 2) {
//     fetch(`https://euctostaging.com/prolife/api/masters/doctors/search/${newValue}`)
//       .then(response => response.json())
//       .then(data => {
//         const options = data.map(doctor => ({
//           value: `${doctor.id}`,
//           label: `Dr. ${doctor.name}`
//         }));
//         setRefIdOptions(options);
//       })
//       .catch(error => console.error('Error fetching reference ID options:', error));
//   } else {
//     setRefIdOptions([]);
//   }
// }
//   //////////////////////////////////////////////////////////////////////////////////////////////
//   $(document).ready(function () {
//     $(".servicesearch").select2({
//       minimumInputLength: 1,
//       formatInputTooShort: function () {
//         return "Enter 1 Character";
//       },
//       ajax: {
//         transport: function (params, success, failure) {
//           console.log(params.data.term );

//           const url = `https://euctostaging.com/prolife/api/masters/services/search/${params.data.term}`;
   
//           fetch(url, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json'
//             },
            
//           })
//             .then(response => response.json())
//        .then(data => {
//             const options = data.map(service => ({
//               id: service.id,
//               text: `${service.id} - ${service.service_name}`
//             }));
//             success({ results: options });
//           })
//           .catch(error => failure(error));
//         }
//       }
//     });
//   });
  
  
  
  

//   // $(".servicesearch").on('select2:select', function (e) {
//   //   var selectedOption = e.params.data;
//   //   var serviceId = selectedOption.id; // Assuming the service ID is in the "id" field
//   //   // Your custom logic with the selected service ID
//   //   // For example, update the rate based on the selected service ID
//   //   var rate = fetchServiceRate(serviceId);
//   //   console.log('rate' , rate)
//   //   // Handle other operations as needed
//   // });
// /////////////////////
  
// // const getServiceRate = async (selectedServiceId) => {
// //   try {
// //     const response = await fetch(`https://euctostaging.com/prolife/api/masters/service/${selectedServiceId}`);
// //     const data = await response.json();
// //     return data.rate || '';
// //   } catch (error) {
// //     console.error('Error fetching service rate:', error);
// //     return '';
// //   }
// //   await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second

// // };

// const fetchServiceRate = async (serviceId) => {
//   try {
//     const response = await fetch(`https://euctostaging.com/prolife/api/masters/service/${serviceId}`);
//     const data = await response.json();
//     console.log(data.rate);
//     return data.rate;
//   } catch (error) {
//     console.error('Error fetching service rate:', error);
//     return null;
//   }
// };
//    const handleServiceChange = (selectedOption) => {
//      console.log('gfkgfugughj');
//   setSelectedOption(selectedOption);

//   if (selectedOption) {
//     const serviceId = selectedOption.value;

//     setInputValue({
//       ...inputValue,
//       service_id: serviceId
//     });

//     fetchServiceRate(serviceId)
//       .then((rate) => {
//         setInputValue({
//           ...inputValue,
//           rate: rate
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching service rate:", error);
//       });
//   } else {
//     setInputValue({
//       ...inputValue,
//       service_id: null,
//       rate: null
//     });
//   }
// };


//   //////////////////////////////////////////////////////////////////
//     const handleAddRow = () => {
//       setShowInput(true);
//       setInputValues([...inputValues, {}, {}]); // Add 4 empty objects
//     };
//   ////////////////////////////////
//     const handleInputChanges = (index, field, value) => {
//       const newInputValues = [...inputValues];
//       newInputValues[index][field] = value;
//       setInputValues(newInputValues);
    
//       if (field === 'service_id') {
//         const selectedService = serviceOptions.find(option => option.value === value);
//         setSelectedServices(prevSelected => [
//           ...prevSelected,
//           { service: selectedService, amount: inputValue.rate }
//         ]);
//       }
//     };
    
  
//     const handleRemoveRow = (index) => {
//       const newInputValues = [...inputValues];
//       newInputValues.splice(index, 1);
//       setInputValues(newInputValues);
//     };
  
//     const handleConfirmInput = () => {
//       if (inputValues.length > 0) {
//         setRows([...rows, ...inputValues]);
//       }
//       setInputValues([]);
//       setShowInput(false);
//     };
//    const handleBothActions = (event) => {
//       event.preventDefault()
//       // handleConfirmInput();
//       handleAddBill();
//     };
//     const handleCheckboxChange = () => {
//       setIsChecked(!isChecked);
//       if (!isChecked) {
//         setInputValue('');
//       }
//     };

//     const handleBillingDate = (date)=>{
//         setBillingDate(date)
//     }

//   ///////////////////////////////////////
//    const handleAddBill = async ( ) => {
//      let doctorIDValue;
//     let doctorrefIDValue;

//     if (typeof newDoctorID === 'object' && newDoctorID !== null) {
//       doctorIDValue = newDoctorID.value;
//     } else {
//       doctorIDValue = newDoctorID;
//     }
//     if (typeof newRefDoctorID === 'object' && newRefDoctorID !== null) {
//       doctorrefIDValue = newRefDoctorID.value;
//     } else {
//       doctorrefIDValue = newRefDoctorID;
//     }
//     const newBill = {
//       bill_no: selectBill.value,
//        date: newDate || null,
//       // date: billingDate.toISOString().split('T')[0],
//       // overall_discount: overallDiscount,  // not used

//       patient_id: selectedPatient.value,
//       op_ip: opOrIp,
//       doctor_id: doctorIDValue, // Use ?. to safely access value
//       ref_doctor_id: doctorrefIDValue,
//       payment_mode: 'Cash', // Provide a valid payment mode
//       // bill_amount: parseFloat(newAmount) + totalAmount,
//       advance: newAdvance || null,
//       note: newNote || null,
//       // services: servicesData.length > 0 ? servicesData : [], // Make sure servicesData is an array
//       services: servicesPayload,
//       bill_amount: totalAmount.toFixed(2), // Set bill_amount to the calculated total amount
//       overall_discount: overallDiscount || null,

//       // discount_amount: newDiscount || null,
//      };
     
//     try {
//       const response = await fetch('https://euctostaging.com/prolife/api/bills', {
//         method: 'POST',
//         body: JSON.stringify(newBill),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       Swal.fire({
//         icon: 'success',
//         title: 'Created bill successfully !',
//         showConfirmButton: false,
//         timer: 1800
//       })
//       console.log('New bill added:', data);
//       setPaymentInputsVisible(true);
//       setBillCreated(true); // Mark bill as created

//       // Reset form fields here if needed
//     } catch (error) {
//       Swal.fire('Error', 'Failed to update bill Patient.', 'error');

//       console.error('Error adding new bill:', error);
//     }
//   };

//   const servicesPayload = inputValues.map(inputValue => ({
//     service_id: inputValue.service_id,
//     discount_amount: inputValue.Discount || 0,
//     remarks: inputValue.Remark || "",
//   }));
//    const handleAddPayment = async () => {
//     if (!billCreated) {
//       Swal.fire('Info', 'Please create a bill first by clicking "Create Bill".', 'info');
//       return;
//     }
//     try {
//       // Construct the payment data
//       const newPayment = {
//         payment_mode: paymentModeInput,
//         payment_amount: parseFloat(paymentAmountInput),
//         remarks: remarksInput,
//         created_by: createdByInput || null // Set to null if createdByInput is falsy
//       };
      
//       // Send the payment data to the server
//       const response = await fetch(`https://euctostaging.com/prolife/api/bills/${BillId}/payments`, {
//         method: 'POST',
//         body: JSON.stringify(newPayment),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         Swal.fire('Error', 'Failed to add payment.', 'error');
//         console.error('Error adding payment:', response);
//         return;
//       }
  
//       const data = await response.json();
  
//       // Handle success
//       Swal.fire({
//         icon: 'success',
//         title: 'Payment added successfully!',
//         showConfirmButton: false,
//         timer: 1800
//       });
//       setBillId(data.bill_id); // Set the bill_id in state

//       // Update your bill state or fetch updated data as needed
  
//     } catch (error) {
//       Swal.fire('Error', 'Failed to add payment.', 'error');
//       console.error('Error adding payment:', error);
//     }
//   };
  
//   return (
//     <div>
//       <Navbar/>
//       <div className='py-4 px-4'>
//         <div style={{border:'1px solid #000', backgroundColor:'white', borderRadius:'10px'}} className='py-3 px-3' >
//             <div className='row pt-3 px-3'>
//             <Col><h4> <RiBillLine className='mr-1'/>Generate Billing</h4></Col>
//             <Col style={{textAlign:'right'}}>
//               <NavLink to='/Main/Billing/BillingTable'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
//             </Col>
//           </div><hr/>
//  {/*------------ Billing Filter ----------- */}
//  <Form>
//               <Row>
//                 <Col>
//                 <Form.Group className="mb-2">
//                         <Form.Label className='mb-0'>Bill Number</Form.Label>
//                         <Select options={options} value={selectBill} onChange={handleBillChange} />
//                       </Form.Group>
//                 </Col>
//                 <Col className='pt-4'>
//                  <Button variant="outline-success"><FaSearchengin className='mr-2'  />Search</Button>
//                 </Col>
//               </Row><hr/>
// {/*---------------- Patient Filter -------------------- */}
//               <Row>
//                 <Col>
//                 <Form.Group className="mb-2">
//                 <div>
//                 <Form.Group controlId="patientSearch">
//           <Form.Label>Patient ID and Name</Form.Label>
//           <CreatableSelect
//             isClearable
//             options={patientOptions}
//             value={selectedPatient}
//             onInputChange={handleSearchChange}
//             onChange={handleSelectChange}/>
//         </Form.Group>
//     </div>
//                       </Form.Group>
//                 </Col>
//              <Col>
//               <Form.Group className="mb-2">
//                 <Form.Label className='mb-0'>Create Patient</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={newPatientName}
//                   onChange={event => setNewPatientName(event.target.value)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col className='pt-4'>
//               <Button variant="outline-success" onClick={handleSubmit}>
//                 <MdFileDownloadDone className='mr-2' />Add patient
//               </Button>
//             </Col>
//           </Row><hr/>
//               <Row>
//                 <Col>
//                 <Form.Group className="mb-2">
//                         <Form.Label className='mb-0'>Gender</Form.Label>
//                         <Form.Control as="select" value={fetchedBillData?.patient?.gender || ''}>
//                           <option value='' >--Select--</option>
//                           <option value="Male">Male</option>
//                           <option value="Female">Female</option>
//                         </Form.Control>
//                       </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group className="mb-2">
//                   <Form.Label className='mb-0'>DOB</Form.Label>
//                         <DatePicker
//                         placeholderText="DD/MM/YYYY"
//                         selected={billingDate}
//                         onChange={handleBillingDate}
//                         dateFormat="dd/MM/yyyy"
//                         showYearDropdown
//                         scrollableYearDropdown
//                         showMonthDropdown
//                         scrollableMonthYearDropdown
//                         customInput={
//                           <input type="text" id="txtDate" name="SelectedDate"   style={{ cursor: 'pointer', width:'100%', height:'35px' }}/>}/>
//                   </Form.Group>
//                 </Col>
//               </Row>
         
//               <Form.Group>
//                     <RadioGroup  row className='ml-2' value={opOrIp} onChange={handleOpOrIpChange}>
//                       <FormControlLabel value="OP" control={<Radio />} label="OP" />
//                       <FormControlLabel value="IP" control={<Radio />} label="IP" />
//                     </RadioGroup>
//                   </Form.Group>
//            {/* ---------- Doctor Filter ------------------------------ */}
 
// <Row>
//   <Col>
//     <Form.Group className="mb-2">
//                   <Form.Label className='mb-0'>Doctor ID/Name</Form.Label>
//                   {Updr !== '' && newRefDoctorID === '' && (
//   <div className="text-danger mt-2 h6">Dr. {Updr}</div>
// )}

//       <CreatableSelect
//   isClearable
//   options={doctorOptions}
//   onInputChange={handleSearchChangedr}
//   onChange={selectedOption => setNewDoctorID(selectedOption ? selectedOption.value : null)}
//   value={doctorOptions.find(option => option.value === newDoctorID)} // Use find to match the selected value to an option
//                   />
          


//     </Form.Group>
//   </Col>
//   <Col>
//     <Form.Group className="mb-2">
//                   <Form.Label className='mb-0'>Reference ID</Form.Label>
//                   {UpRefdr !== '' && (
//   <div className="text-danger mt-2 h6">Dr. {UpRefdr}</div>
// )}
//       <CreatableSelect
//   isClearable
//   options={refIdOptions}
//   onInputChange={handleSearchChangerefdr}
//   onChange={selectedOption => setNewRefDoctorID(selectedOption ? selectedOption.value : null)}
//   value={refIdOptions.find(option => option.value === newRefDoctorID)} // Match the selected value to an option
// />

//     </Form.Group>
//   </Col>
// </Row>
// <hr />
//             <div>
          
//                 <Form.Check
//                     type="checkbox"
//                     label="Advance Amount"
//                     checked={isChecked}
//                     onChange={handleCheckboxChange}/>    
//                    <Row>
//                     <Col>
//                     <div style={{ marginTop: '10px' }}>
//                     <input type="text" placeholder="Enter Payable Amount / Adv Amount" style={{ width: '100%', padding: '5px' }} />
//                     </div>
//                     </Col>
//                     <Col style={{paddingTop:'8px'}}>
//                        <input type="text" placeholder="Note" style={{ width: '100%', padding: '5px' }} />
//                     </Col>
//                   </Row>
//               </div><hr/>
 
          
//     <div className="d-flex justify-content-between">
//       <div className="w-50 pr-3">
//         <Form.Group className="mb-3">
//           <Form.Label className="mb-0">Total Amount</Form.Label>
//           <Form.Control
//             type="text"
//             value={totalAmount.toFixed(2)}
//             readOnly
//             className="form-control"
//           />
//         </Form.Group>
        
//         <Form.Group className="mb-3">
//           <Form.Label className="mb-0">Overall Discount</Form.Label>
//           <Form.Control
//             type="text"
//             value={overallDiscount}
//             onChange={(event) =>
//               setOverallDiscount(parseFloat(event.target.value))
//             }
//             className="form-control"
//           />
//         </Form.Group>
//       </div>
      
//       <div className="w-50 pl-3">
//         <Form.Group className="mb-3">
//           <Form.Label className="mb-0">Final Bill Amount</Form.Label>
//           <Form.Control
//             type="text"
//             value={(totalAmount - overallDiscount).toFixed(2)}
//             readOnly
//             className="form-control"
//           />
//         </Form.Group>
//       </div>
//     </div>      

// <hr className="my-4" />

// {/* ---------- Table------------------------------               */}
// {!fetchedBillData && (
//                 <Button variant="primary" className="mb-2" onClick={handleAddRow}>
//                     Add Row
//                 </Button>
//             )}
              
//               <Table striped bordered hover responsive style={{ minWidth: '65%' }}>
//   <thead>
//     <tr className='bg-dark text-light'>
//       <th style={{ fontFamily: 'math' }}>No</th>
//       <th style={{ fontFamily: 'math' , width: '40%' }}>Service ID-Name</th>
//       <th style={{ fontFamily: 'math' }}>Amount</th>
//       <th style={{ fontFamily: 'math' }}>Discount %</th>
//       <th style={{ fontFamily: 'math' }}>Discount</th>
//       <th style={{ fontFamily: 'math' }}>Remark</th>
//       <th style={{ fontFamily: 'math' }}>Remove</th>
//     </tr>
//   </thead>
//   <tbody>
//   {inputValues.map((inputValue, index) => (
//     <tr key={index}>
//       <td>{index + 1}</td>
//       <td style={{width: '40%'}}>
//        <div className="servicesearch-container">
//   <select
//     className="servicesearch form-control"
//             placeholder="Search for a service..."
//             onChange={handleServiceChange}/>
          
// </div>
//       </td>
//       <td>
//         <input
//           type="text"
//           value={inputValue.rate || ''}
//           readOnly
//         />
//       </td>
//       <td>
//         <input
//           type="text"
//           value={inputValue.DiscountPercent || ''}
//           onChange={event => {
//             const discountPercent = event.target.value;
//             const rate = inputValue.rate || 0;
//             const discountAmount = (rate * discountPercent) / 100;
//             handleInputChanges(index, 'DiscountPercent', discountPercent);
//             handleInputChanges(index, 'Discount', discountAmount);
//           }}
//         />
//       </td>
//       <td>
//         <input
//           type="text"
//           value={inputValue.Discount || ''}
//           onChange={event => {
//             const discountAmount = event.target.value;
//             const rate = inputValue.rate || 0;
//             const discountPercent = (discountAmount / rate) * 100;
//             handleInputChanges(index, 'Discount', discountAmount);
//             handleInputChanges(index, 'DiscountPercent', discountPercent);
//           }}
//         />
//       </td>
//       <td>
//         <input
//           type="text"
//           value={inputValue.Remark || ''}
//           onChange={event => handleInputChanges(index, 'Remark', event.target.value)}
//         />
//       </td>
//       <td className='text-center'>
//         <IoIosRemoveCircleOutline size={30} style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleRemoveRow(index)} />
//       </td>
//     </tr>
//   ))}
// </tbody>

// </Table>


              
//                 {/* <Table striped bordered hover responsive>
//                   <thead>
//                     <tr className='bg-dark text-light'>
//                       <th style={{fontFamily: 'math'}}>No</th>
//                       <th style={{fontFamily: 'math'}}>Code</th>
//                       <th style={{fontFamily: 'math'}}>Amount</th>
//                       <th style={{fontFamily: 'math'}}>Discount %</th>
//                       <th style={{fontFamily: 'math'}}>Discount</th>
//                       <th style={{fontFamily: 'math'}}>Remark</th>
//                       <th style={{fontFamily: 'math'}}>Remove</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rows.map((rowData, index) => (
//                       <tr key={index}>
//                         <td>{index + 1}</td>
//                         <td>{rowData.Code}</td>
//                         <td>{rowData.Amount}</td>
//                         <td>{rowData.DiscountPercent}</td>
//                         <td>{rowData.Discount}</td>
//                         <td>{rowData.Remark}</td>
//                         <td>{rowData.Remove}</td>
//                       </tr>
//                     ))}
//                     {showInput && (
//                       inputValues.map((inputValue, index) => (
//                         <tr key={index}>
//                           <td>{rows.length + index + 1}</td>
//                           <td> {/* value={inputValue.Code} onChange={(event) => handleInputChanges(index, 'Code', event.target.value)}  */}
//                               {/* <Form.Control as="select"    > 
//                                   <option value=''>---Select---</option>
//                                   <option value='Test-2'>Test-2</option>
//                                   <option value='Test-3'>Test-4</option>
//                                   <option value='Test-4'>Test-5</option>
//                               </Form.Control>
//                           </td>
//                           <td>
//                             <Form.Control
//                               type="text"
//                               value={inputValue.Amount}
//                               onChange={(event) => handleInputChanges(index, 'Amount', event.target.value)} />
//                           </td>
//                           <td>
//                             <Form.Control
//                               type="text"
//                               value={inputValue.DiscountPercent}
//                               onChange={(event) => handleInputChanges(index, 'DiscountPercent', event.target.value)} />
//                           </td>
//                           <td>
//                             <Form.Control
//                               type="text"
//                               value={inputValue.Discount}
//                               onChange={(event) => handleInputChanges(index, 'Discount', event.target.value)}/>
//                           </td>
//                           <td>
//                             <Form.Control
//                               type="text"
//                               value={inputValue.Remark}
//                               onChange={(event) => handleInputChanges(index, 'Remark', event.target.value)}/>
//                           </td>
//                           <td className='text-center'>
//                             <IoIosRemoveCircleOutline size={30} style={{color:'red', cursor:'pointer'}}  onClick={() => handleRemoveRow(index)} />
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </Table> */}  
//                    {/* <Button variant="success" onClick={handleBothActions}
//             >Create Bill</Button> */}
//             {!fetchedBillData && (
//                                        <button className="btn btn-success" onClick={handleBothActions}> <RiFileAddLine className="payment-icon" /> Create Bill</button>

//             )}

//           </Form>
//           {billCreated ? null : (
//               <p className="text-danger mt-2">*Please create a bill first by clicking "Create Bill" then make payments.</p>
//             )}
//           {paymentInputsVisible && (
//        <div className="col-md-12">
//        <div className="card p-3">
//               <h5 className="mb-3">  <RiBillLine className='mr-1'/> Payment Information</h5>
//                 {fetchedBillData && fetchedBillData.payments ? (
//   <Table striped bordered hover>
//     <thead>
//       <tr>
//         <th>ID</th>
//         <th>Payment Mode</th>
//         <th>Payment Amount</th>
//         <th>Remarks</th>
//         {/* Add more headers if needed */}
//       </tr>
//     </thead>
//     <tbody>
//       {fetchedBillData.payments.map(payment => (
//         <tr key={payment.id}>
//           <td>{payment.id}</td>
//           <td>{payment.payment_mode}</td>
//           <td>{payment.payment_amount}</td>
//           <td>{payment.remarks}</td>
//           {/* Add more table data cells if needed */}
//         </tr>
//       ))}
//     </tbody>
//   </Table>
// ) : (
//   <p>No past payments available</p>
// )}
//                 <p className='text-success'><u><strong> <RiAddLine className="icon-spacing" />Make New Payment</strong></u></p>
//                 <div className="d-flex">

//   <div className="w-50 pr-3">

//          <Form.Group className="mb-3">
//            <Form.Label className="mb-0">Final Bill Amount</Form.Label>
//            <Form.Control
//              type="text"
//              value={(totalAmount - overallDiscount).toFixed(2)}
//              readOnly
//            />
//                   </Form.Group></div>
//                 <div className="w-50 pl-3">
                  
//                 {RemaingpaymentAmountInput !== undefined &&
//  RemaingpaymentAmountInput !== null &&
//  !isNaN(RemaingpaymentAmountInput) &&
//  RemaingpaymentAmountInput !== '' && (  <>
           
//                              <Form.Label className="mb-0 text-danger fw-bold text-decoration-underline">Remaing Payment Amount</Form.Label>

//                     <Form.Control
//                         type="number"
//                         className='text-danger fw-bolder bg-warning '
//               step="0.01"
//              value={RemaingpaymentAmountInput}
//             //  onChange={(e) => setPaymentAmountInput(e.target.value)}
//                       />
//                            </>
//                       )}
//             {fetchedBillData &&fetchedBillData.is_paid_fully === 1 && (
//   <div className="text-success mt-2">Fully Paid</div>
// )}
//                   </div>
//                   </div>
    
//          <Form.Group className="mb-3">
//            <Form.Label className="mb-0">Payment Mode</Form.Label>
//            <CreatableSelect
//                   isClearable
//                   options={[
//                     { value: 'cash', label: 'Cash' },
//                     { value: 'credit_card', label: 'Credit Card' },
//                     { value: 'debit_card', label: 'Debit Card' },
//                     { value: 'upi', label: 'UPI' },
//                     { value: 'GPAY', label: 'GPAY' },
//                     { value: 'PHONEPAY', label: 'PHONEPAY' },
//                     { value: 'PAYTM', label: 'PAYTM' },
//                     // Add more Indian payment modes here
//                   ]}
//                   onChange={(selectedOption) => setPaymentModeInput(selectedOption ? selectedOption.value : '')}
//                   value={{ value: paymentModeInput, label: paymentModeInput }}
//                 />
//          </Form.Group>
        
//           <Form.Group className="mb-3">
//            <Form.Label className="mb-0">Payment Amount</Form.Label>
//            <Form.Control
//              type="number"
//              step="0.01"
//              value={paymentAmountInput}
//              onChange={(e) => setPaymentAmountInput(e.target.value)}
//                   />

//                     </Form.Group>
               
//          <Form.Group className="mb-3">
//            <Form.Label className="mb-0">Remarks</Form.Label>
//            <Form.Control
//              as="textarea"
//              rows="3"
//              value={remarksInput}
//              onChange={(e) => setRemarksInput(e.target.value)}
//            />
//          </Form.Group>
//               </div>
//               <button className="btn btn-success" onClick={handleAddPayment}>    <RiMoneyDollarCircleLine className="icon-spacing" /> Add Payment</button>

//      </div>
//       )}
//     </div>
   
//       </div>
//     </div>
//    )
   
// }

// export default BillingForm






















// import Navbar from '../Navbarall';
// import { Row, Col, Form, Table, Button } from 'react-bootstrap';
// import { RiBillLine } from 'react-icons/ri';
// import { IoChevronBackCircleOutline } from 'react-icons/io5';
// import DatePicker from 'react-datepicker';
// import { IoIosRemoveCircleOutline } from 'react-icons/io';
// import { RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
// import { MdFileDownloadDone } from 'react-icons/md';
// import { FaSearchengin } from 'react-icons/fa';
// import { NavLink } from 'react-router-dom';
// import Select from 'react-select';
// import CreatableSelect from 'react-select/creatable';
// import Swal from 'sweetalert2';
// import { RiFileAddLine, RiMoneyDollarCircleLine ,RiAddLine} from 'react-icons/ri';


//  const BillingForm = () => {
  
//   const [billingDate, setBillingDate] = useState('');
//   const [isChecked, setIsChecked] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [rows, setRows] = useState([]);
//    const [showInput, setShowInput] = useState(false);
//   const [options, setOptions] = useState([]);
//   const [selectBill, setSelectBill] = useState(null);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [patientOptions, setPatientOptions] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null); 

//   const [newPatientName, setNewPatientName] = useState('');
//   const [newDate, setNewDate] = useState('')
//   const [newOPIP, setNewOPIP] = useState('')
//   const [newAdvance, setNewAdvance] = useState('')
//   const [newNote, setNewNote] = useState('')
//   const [newDoctorID, setNewDoctorID] = useState('')
//   const [newRefDoctorID, setNewRefDoctorID] = useState('')
//   const [newServices, setNewServices] = useState('')
//   const [newAmount, setNewAmount] = useState('')
//   const [newDiscountPercentage, setNewDiscountPercentage] = useState('')
//   const [newDiscount, setNewDiscount] = useState('')
//   const [newRemark, setNewRemark] = useState('')
//   const [selectedId, setSelectedId] = useState('');

//   const [doctorOptions, setDoctorOptions] = useState([]);
//   const [refIdOptions, setRefIdOptions] = useState([]);
  
//   const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
//   const [refIdSearchQuery, setRefIdSearchQuery] = useState('');
//   const [formData, setFormData] = useState(new FormData());

//   const [serviceOptions, setServiceOptions] = useState([]);
//   const [servicesData, setServicesData] = useState([]);
//   const [serviceSearchQuery, setServiceSearchQuery] = useState('');
//   const [BillId, setBillId] = useState('');

//   const [opOrIp, setOpOrIp] = useState('OP'); // Default value is 'OP'
//   const [selectedServices, setSelectedServices] = useState([]);
//   const [overallDiscount, setOverallDiscount] = useState(0); // Add this line

//   const [paymentInputsVisible, setPaymentInputsVisible] = useState(true);
//   const [paymentModeInput, setPaymentModeInput] = useState('');
//   const [paymentAmountInput, setPaymentAmountInput] = useState('');
//   const [RemaingpaymentAmountInput, setRemaingpaymentAmountInput] = useState('');
  
//   const [remarksInput, setRemarksInput] = useState('');
//   const [createdByInput, setCreatedByInput] = useState('');
//   const [billCreated, setBillCreated] = useState(false); // Track if bill is created

//   const [TotalremaingAmount, setTotalAmount] = useState(false); // Track if bill is created
//   const [Updr, setUpdr] = useState('');
//   const [UpRefdr, setUpRefdr] = useState('');

  
//   const initialInputValues = [
//     { service_id: null, rate: null, DiscountPercent: null, Discount: null, Remark: null },
//     { service_id: null, rate: null, DiscountPercent: null, Discount: null, Remark: null },
//     { service_id: null, rate: null, DiscountPercent: null, Discount: null, Remark: null },
//     { service_id: null, rate: null, DiscountPercent: null, Discount: null, Remark: null }
//   ];
  
//   const [inputValues, setInputValues] = useState(initialInputValues);
  
//   const [fetchedBillData, setFetchedBillData] = useState(null);

//   const handleOpOrIpChange = event => {
//     setOpOrIp(event.target.value);
//    };
   
//    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   const totalAmount = inputValues.reduce((total, inputValue) => {
//     const rate = inputValue.rate || 0;
//     return total + parseFloat(rate);
//   }, 0);
//   // const totalAmount = inputValues.reduce((total, inputValue) => {
//   //   const rate = inputValue.rate || 0;
    
//   //   if (!TotalremaingAmount) {
//   //     return total + parseFloat(rate);
//   //   } else {
//   //     return TotalremaingAmount; // Use TotalremaingAmount for each inputValue
//   //   }
//   // }, 0);
//    console.log('RemaingpaymentAmountInput',RemaingpaymentAmountInput);
//      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ///Fetch Start///
// // const fetchPatientData = async (id) => {
// //   try {
// //     const response = await fetch(`https://euctostaging.com/prolife/api/bills`);
// //     const data = await response.json();
// //     console.log(data);
// //     setSelectBill(data.bill_no);
// //     setSelectedPatient(data.patient_id);
// //     // setPatientOptions(data.patient_id);
// //     setNewDate(data.date);
// //     setNewOPIP(data.opOrIp);
// //     setNewAdvance(data.advance);
// //     setNewNote(data.note);
// //     setNewDoctorID(data.doctor);
// //     setNewRefDoctorID(data.rfdoctor);
// //     setNewServices(data.services);
// //     setNewAmount(data.amount);
// //     setNewDiscountPercentage(data.discount_amount);
// //     setNewDiscount(data.discount_amount);
// //     setNewRemark(data.remarks);
 
   
// //     const formData = new FormData();
// //      formData.append('bill_no', data.bill_no);
// //      formData.append('patient_id', data.patient_id);
// //      formData.append('date', data.date);
// //      formData.append('op_ip', data.op_ip);
// //      formData.append('advance', data.advance);
// //      formData.append('note', data.note);
// //      formData.append('doctor', data.doctor);
// //      formData.append('rfdoctor', data.rfdoctor);
// //      formData.append('services', data.services);
// //      formData.append('discount_amount', data.discount_amount);
// //      formData.append('remarks', data.remarks);
// //      setFormData(formData);

// //   } catch (error) {
// //     console.error('Error fetching patient data:', error);
// //   }
// //   };
// //   // useEffect(() => {
// //   //   if (selectedId) {
// //   //     fetchPatientData(selectedId);
// //   //   }
// //   // }, [selectedId]);
// const clearAllInputs = () => {
//   setBillingDate('');
//   setIsChecked(false);
//   setInputValue('');
//   setRows([]);
//   setShowInput(false);
//   // setOptions([]);
//    setSearchQuery('');
//   setPatientOptions([]);
//   setSelectedPatient(null);
//   setNewPatientName('');
//   setNewDate('');
//   setNewOPIP('');
//   setNewAdvance('');
//   setNewNote('');
//   setNewDoctorID('');
//   setNewRefDoctorID('');
//   setNewServices('');
//   setNewAmount('');
//   setNewDiscountPercentage('');
//   setNewDiscount('');
//   setNewRemark('');
//   // setSelectedId('');
//   setDoctorOptions([]);
//   setRefIdOptions([]);
//   setDoctorSearchQuery('');
//   setRefIdSearchQuery('');
//   setFormData(new FormData());
//   setServiceOptions([]);
//   setServicesData([]);
//   setServiceSearchQuery('');
//   setBillId('');
//   setOpOrIp('OP');
//   setSelectedServices([]);
//   setOverallDiscount(0);
//   setPaymentInputsVisible(true);
//   setPaymentModeInput('');
//   setPaymentAmountInput('');
//   setRemaingpaymentAmountInput('');
//   setRemarksInput('');
//   setUpdr('');
//   setUpRefdr('');
//   setCreatedByInput('');
//   setBillCreated(false);
//   setTotalAmount(false);
//   setInputValues(initialInputValues);
//   setFetchedBillData(null);
// };

// // Call clearAllInputs to reset all inputs


// // ///Fetch End///

// useEffect(() => {
//   if (selectBill) {
//     clearAllInputs();

//     fetch(`https://euctostaging.com/prolife/api/bills/${selectBill.value}/billno`)
//       .then(response => response.json())
//       .then(billData => {

//         setFetchedBillData(billData);

//         // Extract relevant data from the response and set states
//         setBillingDate(new Date(billData.date)); // Convert date string to Date object
//         setSelectedPatient({
//           value: billData.patient_id,
//           label: `${billData.patient.uhid} - ${billData.patient.patient_name}`
//         });
//         setOpOrIp(billData.op_ip);
//         //remaining_amount
//         // setNewDoctorID(billData.doctor_id);
//         // setNewRefDoctorID(billData.ref_doctor_id);
//         // setPaymentMode(billData.payment_mode);
//         setRemaingpaymentAmountInput(parseFloat(billData.remaining_amount).toFixed(2));
//          // setAdvance(parseFloat(billData.advance).toFixed(2));
//       //    "doctor": {
//       //     "id": 5,
//       //     "name": "Raja Selvam"
//       // }
//         const parsedOverallDiscount = billData.overall_discount !== null ? parseFloat(billData.overall_discount) : 0;
//         console.log('Parsed Overall Discount:', parsedOverallDiscount); // Log the parsed value
  
//         setOverallDiscount(parsedOverallDiscount.toFixed(2));
//         const serviceOptionsFromAPI = billData.services.map(service => ({
//           value: service.service_id,
//           label: `${service.service_id} - ${service.service_master.service_name}`
//         }));
//         const dr = billData.doctor.name;
//         const Refdr = billData.doctor.name;
//         setUpdr(dr);
//         setUpRefdr(Refdr);
//         console.log('dr', dr);
//         setServiceOptions(serviceOptionsFromAPI);
//         const options = billData.map(doctor => ({
//           value: doctor.id, // Don't use `${doctor.id}` here
//           label: `Dr. ${doctor.name}`
//         }));
//         setDoctorOptions(options);
//         console.log(options);
//         // setNewDoctorID({
//         //   value: billData.doctor.id,
//         //   label: `DR. ${billData.doctor.name}`
//         // });
//         // setNewRefDoctorID({
//         //   value: billData.rfdoctor.id,
//         //   label: `DR. ${billData.rfdoctor.name}`
//         // }); 
//         setNewDoctorID(billData.doctor.id);
//         setNewRefDoctorID(billData.rfdoctor.id);
//        // console.log(doctorOptionsFromAPI);
//        // setNewDoctorID(doctorOptionsFromAPI);
//         setBillCreated(true); // Mark bill as created
//         // setPaymentInputsVisible(true);
//         setBillId(billData.id); // Set the bill_id in state


//         ////////////////////////////////////////////////patient
//         // Iterate over service data and set service values in inputValues state
//         const updatedInputValues = billData.services.map(service => ({
//           service_id: service.service_id,
//           rate: service.service_master.rate, // You need to fetch rate separately if needed
//           Discount: parseFloat(service.discount_amount).toFixed(2),
//           DiscountPercent: null, // You can calculate this based on DiscountPercent if needed
//           Remark: service.remarks
//         }));
//         setInputValues(updatedInputValues);
        
//       })
//       .catch(error => console.error('Error fetching bill details:', error));
//   }
// }, [selectBill]);




//   // Fetch initial data when the component mounts
//   useEffect(() => {
//     // Fetch branch data and all bill numbers from the API
//     fetch('https://euctostaging.com/prolife/api/bills/newBill', {
//       method: 'POST'
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Extract the data for the selected bill
//         const selectedBill = {
//           value: data.billno,
//           label: data.billno
//         };

//         // Fetch all bill numbers
//         fetch('https://euctostaging.com/prolife/api/bills/all')
//           .then(response => response.json())
//           .then(allData => {
//             console.log(allData);

//             // Create an array of all bill options
//             const allBillOptions = allData.map(bill => ({
//               value: bill.bill_no,
//               label: bill.bill_no
//             }));

//             // Set the options state including the selected bill
//             setOptions([selectedBill, ...allBillOptions]);
//             setSelectBill(selectedBill); // Set the selected bill
//             clearAllInputs();

//           })
//           .catch(error => console.error('Error fetching all bill numbers:', error));
//       })
//       .catch(error => console.error('Error fetching branch data:', error));
//   }, []);

//   const handleBillChange = selectedOption => {
//     setSelectBill(selectedOption);
//   };

//   // Fetch patient options based on search query
//   useEffect(() => {
//     // console.log('searchQuery:', searchQuery);

//     if (searchQuery.length >= 2) {
//       console.log('Fetching patient options...');
//       fetch(`https://euctostaging.com/prolife/api/masters/patients/search/${searchQuery}`)
//         .then(response => response.json())
//         .then(data => {
//           console.log('API response:', data);
//           const options = data.map(patient => ({
//             value: patient.id,
//             label: `${patient.uhid_patient_name}`
//           }));
//           setPatientOptions(options);
//         })
//         .catch(error => console.error('Error fetching patient options:', error));
//     } else {
//       setPatientOptions([]);
//     }
//   }, [searchQuery]);

//   const handleSearchChange = newValue => {
//     setSearchQuery(newValue);
//   };

//   const handleSelectChange = selectedOption => {
//     setSelectedPatient(selectedOption);
//   };

//   ////////////////////////////////////////////////////////////////////////////////////////////////

//   const handleSubmit = async () => {
//     // Create a new patient using API request
//     try {
//       const formData = new FormData();
//       formData.append('patient_name', newPatientName);

//       const response = await fetch('https://euctostaging.com/prolife/api/masters/patient', {
//         method: 'POST',
//         // headers: {
//         //   'Content-Type': 'multipart/form-data', // Change this to 'multipart/form-data'
//         // },
//         body: formData,
//       });
//       const responseData = await response.json(); // Parse response as JSON

//       if (response.ok) {
//         // Handle successful response
//         console.log('New patient created successfully');
//         setSelectedPatient({
//           value: responseData.uhid, // Assuming 'uhid' is the identifier for the patient
//           label: `${responseData.uhid} - ${responseData.patient_name}`,
//         });
  
//         console.log(responseData);
//        } else {
//         // Handle error response
//         console.error('Error creating new patient');
//         // Handle error state or show error message
//       }
//     } catch (error) {
//       console.error('Error creating new patient:', error);
//       // Handle error state or show error message
//     }
//   };


//   ///////////////////////////////////////////////////////////////////////////////////////////////////////
// // Handle doctor search change
// const handleSearchChangedr = newValue => {
//   setDoctorSearchQuery(newValue);

//   // Fetch doctor options based on search query
//   if (newValue.length >= 2) {
//     fetch(`https://euctostaging.com/prolife/api/masters/doctors/search/${newValue}`)
//       .then(response => response.json())
//       .then(data => {
//         const options = data.map(doctor => ({
//           value: `${doctor.id}`,
//           label: `Dr. ${doctor.name}`
//         }));
//         setDoctorOptions(options);
//       })
//       .catch(error => console.error('Error fetching doctor options:', error));
//   } else {
//     setDoctorOptions([]);
//   }
// }

// // Handle reference ID search change
// const handleSearchChangerefdr = newValue => {
//   setRefIdSearchQuery(newValue);

//   // Fetch reference ID options based on search query
//   if (newValue.length >= 2) {
//     fetch(`https://euctostaging.com/prolife/api/masters/doctors/search/${newValue}`)
//       .then(response => response.json())
//       .then(data => {
//         const options = data.map(doctor => ({
//           value: `${doctor.id}`,
//           label: `Dr. ${doctor.name}`
//         }));
//         setRefIdOptions(options);
//       })
//       .catch(error => console.error('Error fetching reference ID options:', error));
//   } else {
//     setRefIdOptions([]);
//   }
// }
//   //////////////////////////////////////////////////////////////////////////////////////////////

//   const handleServiceSearchChange = newValue => {
//     setServiceSearchQuery(newValue);

//     // Fetch service options based on search query
//     if (newValue.length >= 2) {
//       fetch(`https://euctostaging.com/prolife/api/masters/services/search/${newValue}`)
//         .then(response => response.json())
//         .then(data => {
//           console.log(data);
//           const options = data.map(service => ({
//             value: service.id,
//             label: `${service.id} - ${service.service_name}`
//           }));
//           setServiceOptions(options);
//         })
//         .catch(error => console.error('Error fetching service options:', error));
//     } else {
//       setServiceOptions([]);
//     }
//   };
// /////////////////////
  
// // const getServiceRate = async (selectedServiceId) => {
// //   try {
// //     const response = await fetch(`https://euctostaging.com/prolife/api/masters/service/${selectedServiceId}`);
// //     const data = await response.json();
// //     return data.rate || '';
// //   } catch (error) {
// //     console.error('Error fetching service rate:', error);
// //     return '';
// //   }
// //   await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second

// // };

// const fetchServiceRate = async (serviceId) => {
//   try {
//     const response = await fetch(`https://euctostaging.com/prolife/api/masters/service/${serviceId}`);
//     const data = await response.json();
//     return data.rate;
//   } catch (error) {
//     console.error('Error fetching service rate:', error);
//     return null;
//   }
// };

//   //////////////////////////////////////////////////////////////////
//     const handleAddRow = () => {
//       setShowInput(true);
//       setInputValues([...inputValues, {}, {}]); // Add 4 empty objects
//     };
  
//     const handleInputChanges = (index, field, value) => {
//       const newInputValues = [...inputValues];
//       newInputValues[index][field] = value;
//       setInputValues(newInputValues);
    
//       if (field === 'service_id') {
//         const selectedService = serviceOptions.find(option => option.value === value);
//         setSelectedServices(prevSelected => [
//           ...prevSelected,
//           { service: selectedService, amount: inputValue.rate }
//         ]);
//       }
//     };
    
  
//     const handleRemoveRow = (index) => {
//       const newInputValues = [...inputValues];
//       newInputValues.splice(index, 1);
//       setInputValues(newInputValues);
//     };
  
//     const handleConfirmInput = () => {
//       if (inputValues.length > 0) {
//         setRows([...rows, ...inputValues]);
//       }
//       setInputValues([]);
//       setShowInput(false);
//     };
//    const handleBothActions = (event) => {
//       event.preventDefault()
//       // handleConfirmInput();
//       handleAddBill();
//     };
//     const handleCheckboxChange = () => {
//       setIsChecked(!isChecked);
//       if (!isChecked) {
//         setInputValue('');
//       }
//     };

//     const handleBillingDate = (date)=>{
//         setBillingDate(date)
//     }

//   ///////////////////////////////////////
//    const handleAddBill = async ( ) => {
//      let doctorIDValue;
//     let doctorrefIDValue;

//     if (typeof newDoctorID === 'object' && newDoctorID !== null) {
//       doctorIDValue = newDoctorID.value;
//     } else {
//       doctorIDValue = newDoctorID;
//     }
//     if (typeof newRefDoctorID === 'object' && newRefDoctorID !== null) {
//       doctorrefIDValue = newRefDoctorID.value;
//     } else {
//       doctorrefIDValue = newRefDoctorID;
//     }
//     const newBill = {
//       bill_no: selectBill.value,
//        date: newDate || null,
//       // date: billingDate.toISOString().split('T')[0],
//       // overall_discount: overallDiscount,  // not used

//       patient_id: selectedPatient.value,
//       op_ip: opOrIp,
//       doctor_id: doctorIDValue, // Use ?. to safely access value
//       ref_doctor_id: doctorrefIDValue,
//       payment_mode: 'Cash', // Provide a valid payment mode
//       // bill_amount: parseFloat(newAmount) + totalAmount,
//       advance: newAdvance || null,
//       note: newNote || null,
//       // services: servicesData.length > 0 ? servicesData : [], // Make sure servicesData is an array
//       services: servicesPayload,
//       bill_amount: totalAmount.toFixed(2), // Set bill_amount to the calculated total amount
//       overall_discount: overallDiscount || null,

//       // discount_amount: newDiscount || null,
//      };
     
//     try {
//       const response = await fetch('https://euctostaging.com/prolife/api/bills', {
//         method: 'POST',
//         body: JSON.stringify(newBill),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       Swal.fire({
//         icon: 'success',
//         title: 'Created bill successfully !',
//         showConfirmButton: false,
//         timer: 1800
//       })
//       console.log('New bill added:', data);
//       setPaymentInputsVisible(true);
//       setBillCreated(true); // Mark bill as created

//       // Reset form fields here if needed
//     } catch (error) {
//       Swal.fire('Error', 'Failed to update bill Patient.', 'error');

//       console.error('Error adding new bill:', error);
//     }
//   };

//   const servicesPayload = inputValues.map(inputValue => ({
//     service_id: inputValue.service_id,
//     discount_amount: inputValue.Discount || 0,
//     remarks: inputValue.Remark || "",
//   }));
//    const handleAddPayment = async () => {
//     if (!billCreated) {
//       Swal.fire('Info', 'Please create a bill first by clicking "Create Bill".', 'info');
//       return;
//     }
//     try {
//       // Construct the payment data
//       const newPayment = {
//         payment_mode: paymentModeInput,
//         payment_amount: parseFloat(paymentAmountInput),
//         remarks: remarksInput,
//         created_by: createdByInput || null // Set to null if createdByInput is falsy
//       };
      
//       // Send the payment data to the server
//       const response = await fetch(`https://euctostaging.com/prolife/api/bills/${BillId}/payments`, {
//         method: 'POST',
//         body: JSON.stringify(newPayment),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         Swal.fire('Error', 'Failed to add payment.', 'error');
//         console.error('Error adding payment:', response);
//         return;
//       }
  
//       const data = await response.json();
  
//       // Handle success
//       Swal.fire({
//         icon: 'success',
//         title: 'Payment added successfully!',
//         showConfirmButton: false,
//         timer: 1800
//       });
//       setBillId(data.bill_id); // Set the bill_id in state

//       // Update your bill state or fetch updated data as needed
  
//     } catch (error) {
//       Swal.fire('Error', 'Failed to add payment.', 'error');
//       console.error('Error adding payment:', error);
//     }
//   };
  
//   return (
//     <div>
//       <Navbar/>
//       <div className='py-4 px-4'>
//         <div style={{border:'1px solid #000', backgroundColor:'white', borderRadius:'10px'}} className='py-3 px-3' >
//             <div className='row pt-3 px-3'>
//             <Col><h4> <RiBillLine className='mr-1'/>Generate Billing</h4></Col>
//             <Col style={{textAlign:'right'}}>
//               <NavLink to='/Main/Billing/BillingTable'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
//             </Col>
//           </div><hr/>
//  {/*------------ Billing Filter ----------- */}
//  <Form>
//               <Row>
//                 <Col>
//                 <Form.Group className="mb-2">
//                         <Form.Label className='mb-0'>Bill Number</Form.Label>
//                         <Select options={options} value={selectBill} onChange={handleBillChange} />
//                       </Form.Group>
//                 </Col>
//                 <Col className='pt-4'>
//                  <Button variant="outline-success"><FaSearchengin className='mr-2'  />Search</Button>
//                 </Col>
//               </Row><hr/>
// {/*---------------- Patient Filter -------------------- */}
//               <Row>
//                 <Col>
//                 <Form.Group className="mb-2">
//                 <div>
//                 <Form.Group controlId="patientSearch">
//           <Form.Label>Patient ID and Name</Form.Label>
//           <CreatableSelect
//             isClearable
//             options={patientOptions}
//             value={selectedPatient}
//             onInputChange={handleSearchChange}
//             onChange={handleSelectChange}
//           />
//         </Form.Group>
//     </div>
//                       </Form.Group>
//                 </Col>
//              <Col>
//               <Form.Group className="mb-2">
//                 <Form.Label className='mb-0'>Create Patient</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={newPatientName}
//                   onChange={event => setNewPatientName(event.target.value)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col className='pt-4'>
//               <Button variant="outline-success" onClick={handleSubmit}>
//                 <MdFileDownloadDone className='mr-2' />Add patient
//               </Button>
//             </Col>
//           </Row><hr/>
//               <Row>
//                 <Col>
//                 <Form.Group className="mb-2">
//                         <Form.Label className='mb-0'>Gender</Form.Label>
//                         <Form.Control as="select" value={fetchedBillData?.patient?.gender || ''}>
//                           <option value='' >--Select--</option>
//                           <option value="Male">Male</option>
//                           <option value="Female">Female</option>
//                         </Form.Control>
//                       </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group className="mb-2">
//                   <Form.Label className='mb-0'>DOB</Form.Label>
//                         <DatePicker
//                         placeholderText="DD/MM/YYYY"
//                         selected={billingDate}
//                         onChange={handleBillingDate}
//                         dateFormat="dd/MM/yyyy"
//                         showYearDropdown
//                         scrollableYearDropdown
//                         showMonthDropdown
//                         scrollableMonthYearDropdown
//                         customInput={
//                           <input type="text" id="txtDate" name="SelectedDate"   style={{ cursor: 'pointer', width:'100%', height:'35px' }}/>}/>
//                   </Form.Group>
//                 </Col>
//               </Row>
         
//               <Form.Group>
//                     <RadioGroup  row className='ml-2' value={opOrIp} onChange={handleOpOrIpChange}>
//                       <FormControlLabel value="OP" control={<Radio />} label="OP" />
//                       <FormControlLabel value="IP" control={<Radio />} label="IP" />
//                     </RadioGroup>
//                   </Form.Group>
//            {/* ---------- Doctor Filter ------------------------------ */}
 
// <Row>
//   <Col>
//     <Form.Group className="mb-2">
//                   <Form.Label className='mb-0'>Doctor ID/Name</Form.Label>
//                   {Updr !== '' && newRefDoctorID === '' && (
//   <div className="text-danger mt-2 h6">Dr. {Updr}</div>
// )}

//       <CreatableSelect
//   isClearable
//   options={doctorOptions}
//   onInputChange={handleSearchChangedr}
//   onChange={selectedOption => setNewDoctorID(selectedOption ? selectedOption.value : null)}
//   value={doctorOptions.find(option => option.value === newDoctorID)} // Use find to match the selected value to an option
//                   />
          


//     </Form.Group>
//   </Col>
//   <Col>
//     <Form.Group className="mb-2">
//                   <Form.Label className='mb-0'>Reference ID</Form.Label>
//                   {UpRefdr !== '' && (
//   <div className="text-danger mt-2 h6">Dr. {UpRefdr}</div>
// )}
//       <CreatableSelect
//   isClearable
//   options={refIdOptions}
//   onInputChange={handleSearchChangerefdr}
//   onChange={selectedOption => setNewRefDoctorID(selectedOption ? selectedOption.value : null)}
//   value={refIdOptions.find(option => option.value === newRefDoctorID)} // Match the selected value to an option
// />

//     </Form.Group>
//   </Col>
// </Row>
// <hr />
//             <div>
          
//                 <Form.Check
//                     type="checkbox"
//                     label="Advance Amount"
//                     checked={isChecked}
//                     onChange={handleCheckboxChange}/>    
//                    <Row>
//                     <Col>
//                     <div style={{ marginTop: '10px' }}>
//                     <input type="text" placeholder="Enter Payable Amount / Adv Amount" style={{ width: '100%', padding: '5px' }} />
//                     </div>
//                     </Col>
//                     <Col style={{paddingTop:'8px'}}>
//                        <input type="text" placeholder="Note" style={{ width: '100%', padding: '5px' }} />
//                     </Col>
//                   </Row>
//               </div><hr/>
 
          
//     <div className="d-flex justify-content-between">
//       <div className="w-50 pr-3">
//         <Form.Group className="mb-3">
//           <Form.Label className="mb-0">Total Amount</Form.Label>
//           <Form.Control
//             type="text"
//             value={totalAmount.toFixed(2)}
//             readOnly
//             className="form-control"
//           />
//         </Form.Group>
        
//         <Form.Group className="mb-3">
//           <Form.Label className="mb-0">Overall Discount</Form.Label>
//           <Form.Control
//             type="text"
//             value={overallDiscount}
//             onChange={(event) =>
//               setOverallDiscount(parseFloat(event.target.value))
//             }
//             className="form-control"
//           />
//         </Form.Group>
//       </div>
      
//       <div className="w-50 pl-3">
//         <Form.Group className="mb-3">
//           <Form.Label className="mb-0">Final Bill Amount</Form.Label>
//           <Form.Control
//             type="text"
//             value={(totalAmount - overallDiscount).toFixed(2)}
//             readOnly
//             className="form-control"
//           />
//         </Form.Group>
//       </div>
//     </div>      

// <hr className="my-4" />

// {/* ---------- Table------------------------------               */}
//                  <Button variant="primary" className="mb-2" onClick={handleAddRow}>
//                   Add Row
//               </Button>
              
//               <Table striped bordered hover responsive style={{ minWidth: '65%' }}>
//   <thead>
//     <tr className='bg-dark text-light'>
//       <th style={{ fontFamily: 'math' }}>No</th>
//       <th style={{ fontFamily: 'math' , width: '40%' }}>Service ID-Name</th>
//       <th style={{ fontFamily: 'math' }}>Amount</th>
//       <th style={{ fontFamily: 'math' }}>Discount %</th>
//       <th style={{ fontFamily: 'math' }}>Discount</th>
//       <th style={{ fontFamily: 'math' }}>Remark</th>
//       <th style={{ fontFamily: 'math' }}>Remove</th>
//     </tr>
//   </thead>
//   <tbody>
//     {inputValues.map((inputValue, index) => (
//       <tr key={index}>
//         <td>{index + 1}</td>
//         <td>
//         <CreatableSelect
//   isClearable
//   options={serviceOptions}
//   onInputChange={handleServiceSearchChange}
//   value={inputValue.service_id ? serviceOptions.find(option => option.value === inputValue.service_id) : null}
//   onChange={async selectedOption => {
//     if (selectedOption) {
//       const serviceId = selectedOption.value;
//       handleInputChanges(index, 'service_id', serviceId);
//       const rate = await fetchServiceRate(serviceId);
//       handleInputChanges(index, 'rate', rate);
//     } else {
//       handleInputChanges(index, 'service_id', null);
//       handleInputChanges(index, 'rate', null);
//     }
//   }}
// />

//         </td>
//         <td>
//   <input
//     type="text"
//     value={inputValue.rate || ''}
//     readOnly
//   />
// </td>
// <td>
//   <input
//     type="text"
//     value={inputValue.DiscountPercent || ''}
//     onChange={event => {
//       const discountPercent = event.target.value;
//       const rate = inputValue.rate || 0;
//       const discountAmount = (rate * discountPercent) / 100;
//       handleInputChanges(index, 'DiscountPercent', discountPercent);
//       handleInputChanges(index, 'Discount', discountAmount);
//     }}
//   />
// </td>
// <td>
//   <input
//     type="text"
//     value={inputValue.Discount || ''}
//     onChange={event => {
//       const discountAmount = event.target.value;
//       const rate = inputValue.rate || 0;
//       const discountPercent = (discountAmount / rate) * 100;
//       handleInputChanges(index, 'Discount', discountAmount);
//       handleInputChanges(index, 'DiscountPercent', discountPercent);
//     }}
//   />
// </td>

//         <td>
//           <input
//             type="text"
//             value={inputValue.Remark || ''}
//             onChange={event => handleInputChanges(index, 'Remark', event.target.value)}
//           />
//         </td>
//         <td className='text-center'>
//           <IoIosRemoveCircleOutline size={30} style={{color:'red', cursor:'pointer'}}  onClick={() => handleRemoveRow(index)} />
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </Table>


              
//                 {/* <Table striped bordered hover responsive>
//                   <thead>
//                     <tr className='bg-dark text-light'>
//                       <th style={{fontFamily: 'math'}}>No</th>
//                       <th style={{fontFamily: 'math'}}>Code</th>
//                       <th style={{fontFamily: 'math'}}>Amount</th>
//                       <th style={{fontFamily: 'math'}}>Discount %</th>
//                       <th style={{fontFamily: 'math'}}>Discount</th>
//                       <th style={{fontFamily: 'math'}}>Remark</th>
//                       <th style={{fontFamily: 'math'}}>Remove</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rows.map((rowData, index) => (
//                       <tr key={index}>
//                         <td>{index + 1}</td>
//                         <td>{rowData.Code}</td>
//                         <td>{rowData.Amount}</td>
//                         <td>{rowData.DiscountPercent}</td>
//                         <td>{rowData.Discount}</td>
//                         <td>{rowData.Remark}</td>
//                         <td>{rowData.Remove}</td>
//                       </tr>
//                     ))}
//                     {showInput && (
//                       inputValues.map((inputValue, index) => (
//                         <tr key={index}>
//                           <td>{rows.length + index + 1}</td>
//                           <td> {/* value={inputValue.Code} onChange={(event) => handleInputChanges(index, 'Code', event.target.value)}  */}
//                               {/* <Form.Control as="select"    > 
//                                   <option value=''>---Select---</option>
//                                   <option value='Test-2'>Test-2</option>
//                                   <option value='Test-3'>Test-4</option>
//                                   <option value='Test-4'>Test-5</option>
//                               </Form.Control>
//                           </td>
//                           <td>
//                             <Form.Control
//                               type="text"
//                               value={inputValue.Amount}
//                               onChange={(event) => handleInputChanges(index, 'Amount', event.target.value)} />
//                           </td>
//                           <td>
//                             <Form.Control
//                               type="text"
//                               value={inputValue.DiscountPercent}
//                               onChange={(event) => handleInputChanges(index, 'DiscountPercent', event.target.value)} />
//                           </td>
//                           <td>
//                             <Form.Control
//                               type="text"
//                               value={inputValue.Discount}
//                               onChange={(event) => handleInputChanges(index, 'Discount', event.target.value)}/>
//                           </td>
//                           <td>
//                             <Form.Control
//                               type="text"
//                               value={inputValue.Remark}
//                               onChange={(event) => handleInputChanges(index, 'Remark', event.target.value)}/>
//                           </td>
//                           <td className='text-center'>
//                             <IoIosRemoveCircleOutline size={30} style={{color:'red', cursor:'pointer'}}  onClick={() => handleRemoveRow(index)} />
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </Table> */}  
//                    {/* <Button variant="success" onClick={handleBothActions}
//             >Create Bill</Button> */}
//                           <button className="btn btn-success" onClick={handleBothActions}> <RiFileAddLine className="payment-icon" /> Create Bill</button>

//           </Form>
//           {billCreated ? null : (
//               <p className="text-danger mt-2">*Please create a bill first by clicking "Create Bill" then make payments.</p>
//             )}
//           {paymentInputsVisible && (
//        <div className="col-md-12">
//        <div className="card p-3">
//               <h5 className="mb-3">  <RiBillLine className='mr-1'/> Payment Information</h5>
//                 {fetchedBillData && fetchedBillData.payments ? (
//   <Table striped bordered hover>
//     <thead>
//       <tr>
//         <th>ID</th>
//         <th>Payment Mode</th>
//         <th>Payment Amount</th>
//         <th>Remarks</th>
//         {/* Add more headers if needed */}
//       </tr>
//     </thead>
//     <tbody>
//       {fetchedBillData.payments.map(payment => (
//         <tr key={payment.id}>
//           <td>{payment.id}</td>
//           <td>{payment.payment_mode}</td>
//           <td>{payment.payment_amount}</td>
//           <td>{payment.remarks}</td>
//           {/* Add more table data cells if needed */}
//         </tr>
//       ))}
//     </tbody>
//   </Table>
// ) : (
//   <p>No past payments available</p>
// )}
//                 <p className='text-success'><u><strong> <RiAddLine className="icon-spacing" />Make New Payment</strong></u></p>
//                 <div className="d-flex">

//   <div className="w-50 pr-3">

//          <Form.Group className="mb-3">
//            <Form.Label className="mb-0">Final Bill Amount</Form.Label>
//            <Form.Control
//              type="text"
//              value={(totalAmount - overallDiscount).toFixed(2)}
//              readOnly
//            />
//                   </Form.Group></div>
//                 <div className="w-50 pl-3">
                  
//                 {RemaingpaymentAmountInput !== undefined &&
//                     RemaingpaymentAmountInput !== null &&
//                     !isNaN(RemaingpaymentAmountInput) &&
//                     RemaingpaymentAmountInput !== '' && (  <>
           
//                              <Form.Label className="mb-0 text-danger fw-bold text-decoration-underline">Remaing Payment Amount</Form.Label>

//                     <Form.Control
//                         type="number"
//                         className='text-danger fw-bolder bg-warning '
//               step="0.01"
//              value={RemaingpaymentAmountInput}
//             //  onChange={(e) => setPaymentAmountInput(e.target.value)}
//                       />
//                            </>
//                       )}
//             {fetchedBillData &&fetchedBillData.is_paid_fully === 1 && (
//   <div className="text-success mt-2">Fully Paid</div>
// )}
//                   </div>
//                   </div>
    
//          <Form.Group className="mb-3">
//            <Form.Label className="mb-0">Payment Mode</Form.Label>
//            <CreatableSelect
//                   isClearable
//                   options={[
//                     { value: 'cash', label: 'Cash' },
//                     { value: 'credit_card', label: 'Credit Card' },
//                     { value: 'debit_card', label: 'Debit Card' },
//                     { value: 'upi', label: 'UPI' },
//                     { value: 'GPAY', label: 'GPAY' },
//                     { value: 'PHONEPAY', label: 'PHONEPAY' },
//                     { value: 'PAYTM', label: 'PAYTM' },
//                     // Add more Indian payment modes here
//                   ]}
//                   onChange={(selectedOption) => setPaymentModeInput(selectedOption ? selectedOption.value : '')}
//                   value={{ value: paymentModeInput, label: paymentModeInput }}
//                 />
//          </Form.Group>
        
//           <Form.Group className="mb-3">
//            <Form.Label className="mb-0">Payment Amount</Form.Label>
//            <Form.Control
//              type="number"
//              step="0.01"
//              value={paymentAmountInput}
//              onChange={(e) => setPaymentAmountInput(e.target.value)}
//                   />

//                     </Form.Group>
               
//          <Form.Group className="mb-3">
//            <Form.Label className="mb-0">Remarks</Form.Label>
//            <Form.Control
//              as="textarea"
//              rows="3"
//              value={remarksInput}
//              onChange={(e) => setRemarksInput(e.target.value)}
//            />
//          </Form.Group>
//               </div>
//               <button className="btn btn-success" onClick={handleAddPayment}>    <RiMoneyDollarCircleLine className="icon-spacing" /> Add Payment</button>

//      </div>
//       )}
//     </div>
   
//       </div>
//     </div>
//    )
   
// }

// export default BillingForm