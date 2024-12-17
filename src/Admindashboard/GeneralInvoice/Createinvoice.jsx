import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import {RiBillFill} from 'react-icons/ri'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';
import * as XLSX from 'xlsx';
import Select from 'react-select';
 import {Typography} from '@mui/material';


 
const Createinvoice = () => {
  const [invoice, setInvoice] = useState([]);
  const [newInvoiceClass, setNewInvoiceClass] = useState('');
  const [newInvoiceFeeCa, setNewInvoiceFeeCa] = useState('');
  const [newInvoiceDate, setNewInvoiceDate] = useState('');
  // const [newOriginalAmount, setNewOriginalAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [formattedGlance, setformattedGlance] = useState('');
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOptionsStudent, setSelectedOptionsStudent] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    // Define an async function to fetch fees and students
    const fetchData = async () => {
        try {
            await Promise.all([getStudents()]); // Wait for both functions to complete
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
  
    // Check if newInvoiceClass is set and then fetch data
    if (newInvoiceClass !== null) {
        fetchData(); // Call fetchData function after newInvoiceClass is set 
    }
  }, [newInvoiceClass]);


  const createInvoiceamount = async () => {
    if (newInvoiceClass && newInvoiceFeeCa) {
      
       console.log(newInvoiceClass);
       
      try {
        const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/genschoolInvoiceView', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            std: newInvoiceClass,
            cat: newInvoiceFeeCa,
            }),
        });
        const data = await response.json();
        console.log(data);
        setTotalAmount(data.data[0].total); // Set the total value from the API response
         setformattedGlance(data.data[0].glance.replace(/<br>/g, '\n'));

        console.log(totalAmount);

        // Handle the response from the new API
      } catch (error) {
        console.log(error);
      }
    }
    // else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Please select both Class and Fee Category',
    //     showConfirmButton: false,
    //     timer: 1800,
    //   });
    // }
  }
  /////////  Create Input data ///////////////////
  const createInvoice = async () => {
    Swal.fire({
      icon: 'info',
      title: 'Please wait',
      text: 'Generating invoices for all students...',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    let selectedValuesStudentID = null;
    if (selectedOptionsStudent.length > 0) {
        selectedValuesStudentID = selectedOptionsStudent.map(option => option.value);
    }
    console.log(selectedValuesStudentID); 
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/geneachStdInvoiceView', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          std: newInvoiceClass,
          cat:newInvoiceFeeCa,
          due_date: newInvoiceDate,
          stdid: selectedValuesStudentID,
          created_by: sessionStorage.getItem('user_id')
         }),
      });
      const data = await response.json();
      setInvoice([...invoice, data[0]]);
      console.log(data[0]);
      if (response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'You are not authorized to perform this action.',
          confirmButtonText: 'OK'
        });
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Created successfully!',
        showConfirmButton: false,
        timer: 1800
      });
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'info', // Set to 'info' for an "alert" icon
    title: 'Alert',
        text: 'One or more Mails or SMS didnt send might be invalid data or generating invoices had issues.',
        confirmButtonText: 'OK'
      }); 
    }

    
  };

    const getStudents = async () => {
      if (newInvoiceClass) {
        setSelectedOptionsStudent([]);
      try {
        const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/studentByGrades/${newInvoiceClass}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          } 
        });
        const data = await response.json();
         if (data) {
           const options = data.map(item => ({
             value: item.id,
             label: item.concordinate_string
           }));
           setOptions(options);
         }
      } catch (error) {
        console.log(error);
      }
    }
    }
    const handleSelectChangeStudent = (selectedOptions) => {
      setSelectedOptionsStudent(selectedOptions);
    };
   
 
    const generateExcel = (invoiceData) => {
      // Define static headers
      const headers = [
          "Student ID", "Invoice No", "Roll No", "Name", "Standard", "Section", "Hostel/Day",
          "Email", "Fees Category", "Actual Amount", "Amount",
          "Sponsor Name", "Total Invoice Amount", "Date", "Academic Year", "Due Date",
          "Payment Status", "Created By"
      ];
  
      // Sets to hold all unique discount categories
      const uniqueDiscountCats = new Set();
      
      // Process invoice data to collect unique discount categories
      invoiceData.forEach(item => {
          const discountItems = item.discount_items_details_org || [];
          discountItems.forEach(discount => {
              uniqueDiscountCats.add(discount.discount_cat);
          });
      });
  
      // Convert Sets to arrays for ordered dynamic columns
      const dynamicDiscountCats = Array.from(uniqueDiscountCats);
  
      // Add dynamic discount category columns to headers
      headers.push(...dynamicDiscountCats);
  
      // Map the data to rows
      const rows = invoiceData.map(item => {
          const discountItems = item.discount_items_details_org || [];
          
          // Create a map for easier lookup of discount amounts by category
          const discountMap = discountItems.reduce((acc, discount) => {
              const { discount_cat, dis_amount } = discount;
              acc[discount_cat] = parseFloat(dis_amount) || 0;
              return acc;
          }, {});
  
          // Build the row data with the static fields first
          const rowData = [
              item.student_id,
              item.invoice_no,
              item.roll_no,
              item.name,
              item.standard,
              item.sec,
              item.hostelOrDay,
              item.email,
              item.fees_cat,
              item.actual_amount,
              item.amount,
              item.sponser_name,
              item.total_invoice_amount,
              item.date,
              item.acad_year,
              item.due_date,
              item.payment_status,
              item.created_by
          ];
  
          // Add the dynamic discount amounts based on the discount categories
          dynamicDiscountCats.forEach(discountCat => {
              rowData.push(discountMap[discountCat] || 0); // Fill with 0 if no value exists for that discount category
          });
  
          return rowData;
      });
  
      // Combine headers and rows
      const worksheetData = [headers, ...rows];
  
      // Create a new worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
      // Set column widths (adjust as necessary)
      const wscols = [
          { wpx: 100 }, // Student ID
          { wpx: 150 }, // Invoice No
          { wpx: 100 }, // Roll No
          { wpx: 150 }, // Name
          { wpx: 100 }, // Standard
          { wpx: 50 },  // Section
          { wpx: 100 }, // Hostel/Day
          { wpx: 200 }, // Email
          { wpx: 150 }, // Fees Category
          { wpx: 120 }, // Actual Amount
          { wpx: 120 }, // Amount
          { wpx: 150 }, // Sponsor Name
          { wpx: 150 }, // Total Invoice Amount
          { wpx: 100 }, // Date
          { wpx: 100 }, // Academic Year
          { wpx: 100 }, // Due Date
          { wpx: 100 }, // Payment Status
          { wpx: 100 }, // Created By
          ...Array.from({ length: dynamicDiscountCats.length }, () => ({ wpx: 150 })) // Dynamic Discount columns
      ];
  
      worksheet['!cols'] = wscols;
  
      // Set row heights (default height, adjust as necessary)
      const rowHeights = [
          { hpx: 30 }, // Height for header row
          ...rows.map(() => ({ hpx: 60 })) // Default height for data rows
      ];
      worksheet['!rows'] = rowHeights;
  
      // Apply text wrapping to each cell
      for (let R = 0; R < worksheetData.length; R++) {
          for (let C = 0; C < worksheetData[R].length; C++) {
              const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
              if (!worksheet[cellAddress]) worksheet[cellAddress] = {};
              worksheet[cellAddress].s = {
                  alignment: { wrapText: true } // Enable text wrapping
              };
          }
      }
  
      // Create a new workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");
  
      // Generate Excel file and trigger download
      XLSX.writeFile(workbook, `Create_Invoice_Report_${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}.xlsx`);
  };
  
    
    
    
    
    

    
    
    
    
  const sampleexcel = async () => {
    if (!newInvoiceClass || !newInvoiceFeeCa || !newInvoiceDate) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please ensure all required fields are filled in before generating the document.',
        confirmButtonText: 'OK'
      });
      return; // Exit the function if any required value is missing
    }
  
    Swal.fire({
      icon: 'info',
      title: 'Please wait',
      text: 'Generating Document for invoices tp all students...',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    let selectedValuesStudentID = null;
    if (selectedOptionsStudent.length > 0) {
        selectedValuesStudentID = selectedOptionsStudent.map(option => option.value);
    }
    console.log(selectedValuesStudentID); 
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/docGenerate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          std: newInvoiceClass,
          cat:newInvoiceFeeCa,
          due_date: newInvoiceDate,
          stdid: selectedValuesStudentID,
          created_by: sessionStorage.getItem('user_id')
         }),
      });
      const data = await response.json();
      console.log(data);
      generateExcel(data.invoicedata); // Generate and download the Excel file
      setIsVisible(true);
       
     
      if (response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'You are not authorized to perform this action.',
          confirmButtonText: 'OK'
        });
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Created successfully!',
        showConfirmButton: false,
        timer: 1800
      });
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'info', // Set to 'info' for an "alert" icon
    title: 'Alert',
        text: 'Unable to perform the action',
        confirmButtonText: 'OK'
      }); 
    }
 
    
  };
  return (
    <div>
       <div>
       
       <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
      <Header/>
      <div className='container'>
          <h2 className='p-4' style={{fontFamily:'auto'}}><RiBillFill className="pe-1 pb-1" size={35} />Create Invoice</h2>
          <div className='py-1'>
          <Paper elevation={2} className="pb-5">
               <div className='p-4'>
                <h4>Create Invoice</h4><hr className='hrAdminDashboard'/>
                </div>
               <div>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Container>
                    <Row>
                      <Col>
                      <FloatingLabel controlId="floatingSelect" label="Select Class">
                        <Form.Select required
                          value={newInvoiceClass} onClick={createInvoiceamount}
                          onChange={(e) => setNewInvoiceClass(e.target.value)} aria-label="Floating label select example">
                            <option value='' disabled>Select Class</option>
                            <option value="lkg">LKG</option>
                            <option value="ukg">UKG</option>
                            <option value="1">I</option>
                            <option value="2">II</option>
                            <option value="3">III</option>
                            <option value="4">IV</option>
                            <option value="5">V</option>
                            <option value="6">VI</option>
                            <option value="7">VII</option>
                            <option value="8">VIII</option>
                            <option value="9">IX</option>
                            <option value="10">X</option>
                            <option value="11">XI</option>
                            <option value="12">XII</option>
                        </Form.Select>
                        </FloatingLabel>
                        </Col>
                        <Col className="col-6">  
      
      {/* <Typography className=""> Select Student : </Typography> */}

    <Select
            isMulti
    options={options}
    value={selectedOptionsStudent}
            onChange={handleSelectChangeStudent}
            menuPortalTarget={document.body} // Render the menu outside of its parent container
    styles={{
      control: (provided) => ({
        ...provided,
        minHeight:'60px',
        overflowY: 'auto'  ,           // Adjust width as needed
        menu: (provided) => ({
          ...provided,
          height: '50px', //
          position: 'absolute', // Set position to fixed
          zIndex: 9999, // Set a high zIndex to overlay other elements
        }),
      }),
     }}
          />
    </Col>
                     <Col>
                        <Form.Select required
                        value={newInvoiceFeeCa}
                        onChange={(e) => setNewInvoiceFeeCa(e.target.value)} onClick={createInvoiceamount} aria-label="Default select example" style={{width:'100%',height:'55px'}}>
                            <option value='' disabled>Select Fee Category</option>
                            <option value="school fees">School Fees</option>
                            <option value="Hostel Bill">Hostel Bill & Others</option>
                          </Form.Select>
                        </Col>
                    </Row>
                    
                    <Row className='pt-3'>
                      <Col xs={6} >
                        <Form.Label>Due Date</Form.Label>
                      <Form.Group className="mb-3">
                          <Form.Control value={newInvoiceDate} required 
                        onChange={(e) => setNewInvoiceDate(e.target.value)} type='date'style={{height:'56px'}} />
                        
                        </Form.Group>
                      </Col>
                      <Col>
                      {/* <Form.Group>
                        <div className="input-group">
                          <span className="input-group-text" style={{ backgroundColor: '#E9EDEE' }}>
                          <span style={{ color: 'red', fontSize: '1.5rem', fontWeight: 500 }}>₹</span>
                          </span>
                          <Form.Control
                            type="number"
                            placeholder="Enter amount"
                            value={totalAmount}
                            disabled
                            style={{ backgroundColor: '#E9EDEE', height: '58px' }}
                          />
                        </div>
                   </Form.Group> */}


                      </Col>
                    </Row>
                      {/* <Col>
                        <Row className='pb-3'>
                        <Form.Group>
                          <Form.Label>Total Amount Splitup:</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={formattedGlance}
                            readOnly />
                          </Form.Group>
                        </Row>
                        </Col> */}
                    {/* <Row className='pt-3'>
                      <Col>
                      <Form.Group>
                            <Form.Control  type="number" placeholder="Enter amount" value={originalAmount} onChange={handleOriginalAmountChange} style={{backgroundColor:'#E9EDEE',height:'58px'}} />
                          </Form.Group>
                      </Col>
                      <Col>
                      <FloatingLabel controlId="floatingPassword" label="Discount % (in percentage)">
                        <Form.Control value={discountPercentage} onChange={handleDiscountPercentageChange}  type="number" placeholder="Discount % (in percentage)" autoComplete='off'/>
                      </FloatingLabel>
                      </Col>
                      <Col xs={2} className='pt-2 text-center'>
                        <Button  className='py-2' style={{backgroundColor:'green'}}>% Apply Discount</Button>
                      </Col> 
                      <Col className='pt-2 '>
                          <Table striped bordered size="sm" style={{width:'10q0%'}}>
                          <tbody>
                            <tr>
                              <td  style={{textAlign:'center',paddingTop:'10px',backgroundColor:'#0C83DC',color:'aliceblue',width:'45%'}}>Discount Amount</td>
                              <td><h5 className='text-center pt-2'>₹  {discountedAmount}</h5></td>
                            </tr>
                          </tbody>
                      </Table>
                      </Col>
                    </Row> */}
                      {/* <div className="flex items-center space-x-4"> Use flexbox and space-x for horizontal spacing */}
                      <div className="flex items-center">
  {isVisible && (
   <span> <Button
      type="submit"
      onClick={createInvoice}
      className="bg-success mr-4" // Adds space to the right
    >
      Submit
    </Button></span>
  )}
  
  <span className="ml-3">  <Button
    type="submit"
    onClick={sampleexcel}
    className="bg-warning text-black"
  >
    Download Document
  </Button></span>
</div>



                    </Container>
                </Form>
               </div>
          </Paper>

      
          </div>
        </div>
    
    </div>
    </div>
    </div>
  )
}



export default Createinvoice



// import React from 'react';
// import { useState, useEffect } from 'react';
// import Sidebar from '../Sidebar';
// import Header from '../Header';
// import Footer from '../Footer';
// import Paper from '@mui/material/Paper'; 
// import {RiBillFill} from 'react-icons/ri'
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { Container } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Swal from 'sweetalert2';
// import Table from 'react-bootstrap/Table';


// // const Createinvoice = (event) => {
// //   event.preventDefault();
// const Createinvoice = () => {

//   const [invoice, setInvoice] = useState([]);
//   const [newInvoiceClass, setNewInvoiceClass] = useState('');
//   const [newInvoiceFeeCa, setNewInvoiceFeeCa] = useState('');
//   const [newInvoiceDate, setNewInvoiceDate] = useState('');
//   // const [newOriginalAmount, setNewOriginalAmount] = useState('');
//   const [totalAmount, setTotalAmount] = useState('');
//   const [formattedGlance, setformattedGlance] = useState('');
//   const [show, setShow] = useState(false);
//   const [validated, setValidated] = useState(false);

//   const handleSubmit = (event) => {
//       event.preventDefault();

//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     setValidated(true);
//   };


//   const createInvoiceamount = async () => {
//     if (newInvoiceClass && newInvoiceFeeCa) {
//        console.log(newInvoiceClass);
//       console.log(newInvoiceFeeCa);
//       try {
//         const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/genschoolInvoiceView', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             std: newInvoiceClass,
//             cat: newInvoiceFeeCa,
//            }),
//         });
//         const data = await response.json();
//         console.log(data);
//         setTotalAmount(data.data[0].total); // Set the total value from the API response
//          setformattedGlance(data.data[0].glance.replace(/<br>/g, '\n'));

//         console.log(totalAmount);

//         // Handle the response from the new API
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     // else {
//     //   Swal.fire({
//     //     icon: 'error',
//     //     title: 'Please select both Class and Fee Category',
//     //     showConfirmButton: false,
//     //     timer: 1800,
//     //   });
//     // }
//   }
//   /////////  Create Input data ///////////////////
//   const createInvoice = async () => {
//     try {
//       const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/geneachStdInvoiceView', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           std: newInvoiceClass,
//           cat:newInvoiceFeeCa,
//           due_date:newInvoiceDate,
//           created_by: sessionStorage.getItem('user_id')
//          }),
//       });
//       const data = await response.json();
//       setInvoice([...invoice, data[0]]);
//       console.log(data[0]);
//       // Swal.fire({
//       //   icon: 'success',
//       //   title: 'Created successfully !',
//       //   showConfirmButton: false,
//       //   timer: 1800
//       // })
//       setNewInvoiceClass('');
//       setNewInvoiceFeeCa('');
//       setNewInvoiceDate('');
//     } catch (error) {
//       console.log(error);
//     }

    
//   };
 

//   return (
//     <div>
//        <div>
       
//        <Sidebar/>
//     <div style={{width:'82.5%',float:'right'}} >
//       <Header/>
//       <div className='container'>
//           <h2 className='p-4' style={{fontFamily:'auto'}}><RiBillFill className="pe-1 pb-1" size={35} />Create Invoice</h2>
//           <div className='py-1'>
//           <Paper elevation={2} className="pb-5">
//                <div className='p-4'>
//                 <h4>Create Invoice</h4><hr className='hrAdminDashboard'/>
//                 </div>
//                <div>

//                 <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                     <Container>
//                     <Row>
//                       <Col>
//                       <FloatingLabel controlId="floatingSelect" label="Select Class">
//                         <Form.Select required
//                           value={newInvoiceClass} onClick={createInvoiceamount}
//                           onChange={(e) => setNewInvoiceClass(e.target.value)} aria-label="Floating label select example">
//                             <option value='' disabled>Select Class</option>
//                             <option value="lkg">LKG</option>
//                             <option value="ukg">UKG</option>
//                             <option value="1">I</option>
//                             <option value="2">II</option>
//                             <option value="3">III</option>
//                             <option value="4">IV</option>
//                             <option value="5">V</option>
//                             <option value="6">VI</option>
//                             <option value="7">VII</option>
//                             <option value="8">VIII</option>
//                             <option value="9">IX</option>
//                             <option value="10">X</option>
//                             <option value="11">XI</option>
//                             <option value="12">XII</option>
//                         </Form.Select>
//                         </FloatingLabel>
//                      </Col>
//                      <Col>
//                         <Form.Select required
//                         value={newInvoiceFeeCa}
//                         onChange={(e) => setNewInvoiceFeeCa(e.target.value)} onClick={createInvoiceamount} aria-label="Default select example" style={{width:'100%',height:'55px'}}>
//                             <option value='' disabled>Select Fee Category</option>
//                             <option value="school fees">School Fees</option>
//                             <option value="Hostel Bill">Hostel Bill</option>
//                           </Form.Select>
//                         </Col>
//                     </Row>
                    
//                     <Row className='pt-3'>
//                       <Col xs={6} >
//                       <Form.Group className="mb-3">
//                           <Form.Control value={newInvoiceDate} required 
//                         onChange={(e) => setNewInvoiceDate(e.target.value)} type='date'style={{height:'56px'}} />
                        
//                         </Form.Group>
//                       </Col>
//                       <Col>
//                       <Form.Group>
//                         <div className="input-group">
//                           <span className="input-group-text" style={{ backgroundColor: '#E9EDEE' }}>
//                           <span style={{ color: 'red', fontSize: '1.5rem', fontWeight: 500 }}>₹</span>
//                           </span>
//                           <Form.Control
//                             type="number"
//                             placeholder="Enter amount"
//                             value={totalAmount}
//                             disabled
//                             style={{ backgroundColor: '#E9EDEE', height: '58px' }}
//                           />
//                         </div>
//                    </Form.Group>


//                       </Col>
//                     </Row>
//                       <Col>
//                         <Row className='pb-3'>
//                         <Form.Group>
//                           <Form.Label>Total Amount Splitup:</Form.Label>
//                           <Form.Control
//                             as="textarea"
//                             rows={5}
//                             value={formattedGlance}
//                             readOnly />
//                           </Form.Group>
//                         </Row>
//                         </Col>
//                     {/* <Row className='pt-3'>
//                       <Col>
//                       <Form.Group>
//                             <Form.Control  type="number" placeholder="Enter amount" value={originalAmount} onChange={handleOriginalAmountChange} style={{backgroundColor:'#E9EDEE',height:'58px'}} />
//                           </Form.Group>
//                       </Col>
//                       <Col>
//                       <FloatingLabel controlId="floatingPassword" label="Discount % (in percentage)">
//                         <Form.Control value={discountPercentage} onChange={handleDiscountPercentageChange}  type="number" placeholder="Discount % (in percentage)" autoComplete='off'/>
//                       </FloatingLabel>
//                       </Col>
//                       <Col xs={2} className='pt-2 text-center'>
//                         <Button  className='py-2' style={{backgroundColor:'green'}}>% Apply Discount</Button>
//                       </Col> 
//                       <Col className='pt-2 '>
//                           <Table striped bordered size="sm" style={{width:'10q0%'}}>
//                           <tbody>
//                             <tr>
//                               <td  style={{textAlign:'center',paddingTop:'10px',backgroundColor:'#0C83DC',color:'aliceblue',width:'45%'}}>Discount Amount</td>
//                               <td><h5 className='text-center pt-2'>₹  {discountedAmount}</h5></td>
//                             </tr>
//                           </tbody>
//                       </Table>
//                       </Col>
//                     </Row> */}

//                     <Button type="submit" onClick={createInvoice} className='bg-success'>Submit</Button>
//                     </Container>
//                 </Form>
//                </div>
//           </Paper>

      
//           </div>
//         </div>
    
//     </div>
//     </div>
//     </div>
//   )
// }



// export default Createinvoice