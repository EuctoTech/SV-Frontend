import React,{useState, useEffect} from 'react'
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import {CiDiscount1} from 'react-icons/ci'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Select from 'react-select';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import Modal from 'react-bootstrap/modal';
import Swal from 'sweetalert2'

 
const Discountfees = () => {

  const [initialAmount, setInitialAmount] = useState();
  const [partialAmount, setPartialAmount] = useState();
  const [invoice , setInvoice] = useState([]);
  const [newInvoiceClass, setNewInvoiceClass] = useState('');
  const [disCat, setdisCat] = useState('');
  const [selectedDate, setSelectedDate] = useState("");
  const [show, setShow] = useState(false);
  const [newInvoiceFeeCa, setNewInvoiceFeeCa] = useState('');
  const [selectedOptionsStudent, setSelectedOptionsStudent] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    ////////////// Data LIST ////////////////////
    const fetchDiscountInvoice = async () => {
      try {
        const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/readDiscount');
        const data = await response.json();
        setInvoice(data.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchDiscountInvoice();
    }, []);


        /////////// Delete//////////////
const deleteDiscountFee = async (id) => {
  try {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Add code here to delete the input
        try {
          await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/deleteDiscount`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              id: id 
            })
          });

          setInvoice(invoice.filter((res) => res.id !== id));
          Swal.fire(
            'Deleted!',
            'Your input has been deleted.',
            'success'
          );
        } catch (error) {
          console.log(error);
          Swal.fire(
            'Error',
            'An error occurred while deleting the input.',
            'error'
          );
        }
      } else {
        // Code to execute if the user clicks "Cancel"
        Swal.fire(
          'Cancelled',
          'Your input is safe.',
          'info'
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const customStyles = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#8BDDBB',
    color: 'black',
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999, // Ensure the menu appears on top of other elements
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: '#8BDDBB',
    border: '1px solid black', // Optional: add a border to differentiate the control
    color: 'black',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'gray' : '#8BDDBB',
    color: 'black',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
};



  /////////////////// For Multi Selector////////////////////////
  
  const [options, setOptions] = useState([]);
  const [discountoptions, setDiscountOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [discount, setDiscount] = useState([]);

  useEffect(() => {

  setPartialAmount(discount.value);
  setResult(initialAmount - discount.value);
  // if (initialAmount) {
  // setResult(initialAmount - discount.value);
  // } else {
  //   setResult(0);
  // }
}, [discount]);
  useEffect(() => {
    // Fetch data from the API and update the options state
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        // setOptions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
   
  };
  

  const [result, setResult] = useState(0);

  // const handleInitialAmountChange = (event) => {
  //   setInitialAmount(Number(event.target.value));
  // };

  const createInvoiceamount = async () => {
    const newInvoiceFeeCa = 'school fees';
    if (newInvoiceClass && newInvoiceFeeCa) {
       console.log(newInvoiceClass);
      console.log(newInvoiceFeeCa);
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
        setInitialAmount(data.data[0].total); // Set the total value from the API response
         //setformattedGlance(data.data[0].glance.replace(/<br>/g, '\n'));

        //console.log(totalAmount);

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
  const handlePartialAmountChange = (event) => {
    const partial = Number(event.target.value);
    setPartialAmount(partial);
    setResult(initialAmount - partial);
  };
//getStudents
   const getStudents = async () => {
    if (newInvoiceClass) {
       console.log(newInvoiceClass);
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
           console.log(options);
           setOptions(options);
         }

        // setTotalAmount(data.data[0].total); // Set the total value from the API response
        //  setformattedGlance(data.data[0].glance.replace(/<br>/g, '\n'));

        // console.log(totalAmount);

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

  //getStudents
  const getDiscount = async () => {
    if (newInvoiceFeeCa) {
      try {
        let response;
        if (newInvoiceFeeCa === 'school fees') {
          response = await axios.get('https://santhoshavidhyalaya.com/SVSTEST/api/SchoolDiscountCategory-read');
        } else if (newInvoiceFeeCa === 'Hostel Bill') {
          response = await axios.get('https://santhoshavidhyalaya.com/SVSTEST/api/HostelDiscountCategory-read');
        } else {
          console.log('error');
          return;
        }
  
        const data = response.data;  // Axios automatically parses JSON
        if (data) {
          const options = data.map(item => ({
            value: item.amount,
            label: item.discount_name,
          }));
          console.log(options);
          setDiscountOptions(options);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //////createInvoice///////////////////
  const createInvoice = async (event) => {
    event.preventDefault(); // Prevent page reloading

    try {
      const studentIds = selectedOptions.map(option => option.value); 
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/discountTotalAmount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          std: newInvoiceClass,
          student_id:studentIds,
          // roll_no:newInvoiceDate,
          discount_cat: discount.label,
          year: selectedDate, 
          dis_amount: partialAmount,
          invoicefeescat: newInvoiceFeeCa
          // dis_amount:result,
        //  created_by: sessionStorage.getItem('user_id')
         }),
      });
      const data = await response.json();
      setInvoice([...invoice, data]);
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Created successfully !',
        showConfirmButton: false,
        timer: 1800
      })
      window.location.reload();
      
    } catch (error) {
      console.log(error);
    }

    
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
    const handleInputChange = (e) => {
    setdisCat(e.target.value);
  };
 ///////////////
    //  setNewInvoiceClass('');
    useEffect(() => {
      getStudents();
    }, [newInvoiceClass]);

    useEffect(() => {
      // Define an async function to fetch fees and students
      const fetchData = async () => {
          try {
              await Promise.all([getDiscount()]); // Wait for both functions to complete
          } catch (error) {
              console.error('An error occurred:', error);
          }
      };
    
      // Check if newInvoiceClass is set and then fetch data
      if (newInvoiceFeeCa !== null) {
          fetchData(); // Call fetchData function after newInvoiceClass is set 
      }
    }, [newInvoiceFeeCa]);
  

  return (
    <div>
       <div>
       
       <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
      <Header/>
      <div className='container'>
          <h2 className='p-4' style={{fontFamily:'auto'}}><CiDiscount1 className="pe-1 pb-1" size={35} />Fees Discount</h2>
          <div className='py-1'>
          <Paper elevation={2} className="pb-5">
               <div className='p-4'>
                <h4>Fees Discount</h4><hr className='hrAdminDashboard'/>
                </div>
               <div>
                <Form>
                    <Container>
                    <Row className='pb-3'>
                    <Col>
                      <FloatingLabel controlId="floatingSelect" label="Select Class">
                            <Form.Select aria-label="Floating label select example" value={newInvoiceClass} 
                            onChange={(e) => setNewInvoiceClass(e.target.value)} onClick={createInvoiceamount} >
                            <option>Select Class</option>
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
                        <Col>
                        <Form.Select required
                        value={newInvoiceFeeCa}
                        onChange={(e) => setNewInvoiceFeeCa(e.target.value)} onClick={createInvoiceamount} aria-label="Default select example" style={{width:'100%',height:'55px'}}>
                            <option value='' disabled>Select Fee Category</option>
                            <option value="school fees">School Fees</option>
                            <option value="Hostel Bill">Hostel Bill & Others</option>
                          </Form.Select>
                        </Col>
                    <Col>
                    {/* <input
        type="text"
        id="discountType"
        placeholder="Enter Discount Type"
        onChange={handleInputChange}
        value={disCat}
        style={{ width: '100%', height: '55px' }}
        list="suggestions"
      />                         */}
      {/* <Select
    options={discountoptions}
    value={disCat}  // Rename to reflect single selection
    onChange={handleInputChange}
    menuPortalTarget={document.body} // Render the menu outside of its parent container
    styles={{
        control: (provided) => ({
            ...provided,
            minHeight: '60px',
            overflowY: 'auto',
        }),
        menu: (provided) => ({
            ...provided,
            height: '50px',
            position: 'absolute',
            zIndex: 9999,
        }),
    }}
/> */}
        <Select
      options={discountoptions}  // Ensure discountoptions is an array of objects { value, label }
      value={discount}  // Ensure discount is an object { value, label }
      onChange={(selectedOption) => setDiscount(selectedOption)}  // Updates the state on change
      menuPortalTarget={document.body}  // Renders the menu outside the parent container
      styles={{
        control: (provided) => ({
          ...provided,
          minHeight: '50px',
          overflowY: 'auto',
        }),
        menu: (provided) => ({
          ...provided,
          height: '40px',
          position: 'absolute',
          zIndex: 9999,
          backgroundColor: '#f5f5f5',  // Set your desired background color
        }),
        menuList: (provided) => ({
          ...provided,
          padding: 0,  // Remove any default padding
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#bde4ff' : 'white', // Background color for selected and unselected options
          color: state.isSelected ? '#000' : '#333', // Text color for selected and unselected options
          ':hover': {
            backgroundColor: '#bde4ff', // Background color on hover
          },
        }),
      }}
    />
      <datalist id="suggestions">
        <option value="Scholarship for Merit Students" />
        <option value="Sibling Discount" />
        <option value="Financial Aid for Economically Weaker Sections" />
                            <option value="Sports Quota Discount" />
                            <option value="Staff child Discount" />

        <option value="Government Employee Discount" />
         <option value="Special Child" />
      </datalist>
                        </Col>
     

                      {/* <Col >
                      <Form.Group className="mb-3">
                          <Form.Control type='date'style={{height:'56px'}} />
                        </Form.Group>
                      </Col> */}
                    </Row>

                    <Row>
                      <Col className='pt-4'>
                      <Select
    isMulti
    options={options}
    value={selectedOptions}
    onChange={handleSelectChange}
    styles={customStyles}
    menuPortalTarget={document.body}
  />
                     </Col>
                    </Row>

{/*-----------------------  Discount Section ----------------------------------*/}
                    <Row className='pt-3'>
                      {/* <Col className='pt-4'>
                      <Form.Group>
                             <div className="input-group">
                          <span className="input-group-text" style={{ backgroundColor: '#E9EDEE' }}>
                          <span style={{ color: 'red', fontSize: '1.5rem', fontWeight: 500 }}>₹</span>
                          </span>
                          <Form.Control
                            type="text"
                            placeholder="Enter amount"
                            value={initialAmount}
                            disabled
                            style={{ backgroundColor: '#E9EDEE', height: '58px' }}
                          />
                        </div>
                          </Form.Group>
                      </Col> */}
                      <Col className='pt-4'>
                      <FloatingLabel controlId="floatingPassword" label="Discount ₹ (in amount)">
                        <Form.Control value={partialAmount} onChange={handlePartialAmountChange}  type="text" placeholder="Discount ₹ (in amount)" autoComplete='off'/>
                      </FloatingLabel>
                      </Col>
                      {/* <Col xs={2} className='pt-2 text-center'>
                        <Button  className='py-2' style={{backgroundColor:'green'}}>% Apply Discount</Button>
                      </Col> */}
                      <Col className='pt-4'>
                          <Table striped bordered size="sm" style={{width:'10q0%'}}>
                          <tbody>
                            <tr>
                              <td  style={{textAlign:'center',paddingTop:'10px',backgroundColor:'#0C83DC',color:'aliceblue',width:'45%'}}>Discounted Fee Amount</td>
                              <td><h5 className='text-center pt-2'>₹  {result}</h5></td>
                            </tr>
                          </tbody>
                      </Table>
                       </Col>
                       {/*   <Col>
                          <Form.Group className="mb-3">
                          <Form.Label>Expiry Date</Form.Label>

    <Form.Control
      type="date"
      value={selectedDate}
      onChange={handleDateChange}
      style={{ height: "56px" }}
    />
                       </Form.Group>
                        </Col> */}

                    </Row>
                      <div className='pt-3'>
                      <Button className='bg-success ' onClick={createInvoice}>Apply Discount</Button>
                      </div>
                    </Container>
                </Form>
               </div>
          </Paper>

              
          <div className='container pt-4'>
       <div >

       </div>
       <div className='p-3'>
                <h4>Concession Student List </h4><hr className='hrAdminDashboard'/>
                </div>
            <Table striped bordered hover size="sm">
                <thead style={{textAlign:'center'}}>
                  <tr>
                    <th>Reg No</th>
                    <th>Name</th>
                    <th>Grade</th>
                    <th>Discount <br></br>Category</th>
                    {/* <th>Total Amount</th> */}
                    <th>Discount<br></br> Applied</th>
                    <th>Invoice <br></br>Status</th>
                    {/* <th>Discounted Fee Amount</th> */}
                    <th className='text-center'>Action</th>
                  </tr>
                </thead>

                <tbody style={{ textAlign: 'center' }}>
                    {invoice.map((res) => (
                      <tr key={res.id}>
                        <td>{res.roll_no ?? ''}</td>
                        <td>{res.student_id}</td>
                        <td>{res.standard}</td>
                        <td>{res.discount_cat}</td>
                        {/* <td></td> */}
                        <td>₹ {res.dis_amount}</td>
                        <td>{res.status}</td>
                        {/* <td></td> */}
                        <td className='text-center'>
                          {/* <FaRegEdit onClick={handleShow} style={{ cursor: 'pointer' }} className="text-success pb-1 pe-1" size={28} title="Edit user"/> */}
                          <MdDelete  onClick={() => deleteDiscountFee(res.id)} style={{ cursor: 'pointer' }} className="text-danger pb-1 ps-2" size={35} title="Delete user"/>
                     </td>
                      </tr>
                    ))}
                  </tbody>
                
              </Table>
          </div>
          </div>
        </div>
    
    </div>
    </div>
    </div>
  )
}


export default Discountfees










// import React,{useState, useEffect} from 'react'
// import Sidebar from '../Sidebar';
// import Header from '../Header';
// import Footer from '../Footer';
// import Paper from '@mui/material/Paper'; 
// import {CiDiscount1} from 'react-icons/ci'
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { Container } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import axios from 'axios';
// import Select from 'react-select';
// import { MdDelete } from 'react-icons/md';
// import { FaRegEdit } from 'react-icons/fa';
// import Modal from 'react-bootstrap/modal';
// import Swal from 'sweetalert2'

 
// const Discountfees = () => {

//   const [initialAmount, setInitialAmount] = useState();
//   const [partialAmount, setPartialAmount] = useState();
//   const [invoice , setInvoice] = useState([]);
//   const [newInvoiceClass, setNewInvoiceClass] = useState('');
//   const [disCat, setdisCat] = useState('');
//   const [selectedDate, setSelectedDate] = useState("");
//   const [show, setShow] = useState(false);
//   const [newInvoiceFeeCa, setNewInvoiceFeeCa] = useState('');

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//     ////////////// Data LIST ////////////////////
//     const fetchDiscountInvoice = async () => {
//       try {
//         const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/readDiscount');
//         const data = await response.json();
//         setInvoice(data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
  
//     useEffect(() => {
//       fetchDiscountInvoice();
//     }, []);


//         /////////// Delete//////////////
// const deleteDiscountFee = async (id) => {
//   try {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         // Add code here to delete the input
//         try {
//           await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/deleteDiscount`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ 
//               id: id 
//             })
//           });

//           setInvoice(invoice.filter((res) => res.id !== id));
//           Swal.fire(
//             'Deleted!',
//             'Your input has been deleted.',
//             'success'
//           );
//         } catch (error) {
//           console.log(error);
//           Swal.fire(
//             'Error',
//             'An error occurred while deleting the input.',
//             'error'
//           );
//         }
//       } else {
//         // Code to execute if the user clicks "Cancel"
//         Swal.fire(
//           'Cancelled',
//           'Your input is safe.',
//           'info'
//         );
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// const customStyles = {
//   menu: (provided) => ({
//     ...provided,
//     backgroundColor: '#8BDDBB',
//     color: 'black',
//   }),
//   menuPortal: (provided) => ({
//     ...provided,
//     zIndex: 9999, // Ensure the menu appears on top of other elements
//   }),
//   control: (provided) => ({
//     ...provided,
//     backgroundColor: '#8BDDBB',
//     border: '1px solid black', // Optional: add a border to differentiate the control
//     color: 'black',
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: state.isSelected ? 'gray' : '#8BDDBB',
//     color: 'black',
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     color: 'black',
//   }),
// };



//   /////////////////// For Multi Selector////////////////////////

//   const [options, setOptions] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   useEffect(() => {
//     // Fetch data from the API and update the options state
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
//         // setOptions(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSelectChange = (selectedOptions) => {
//     setSelectedOptions(selectedOptions);
//   };
  

//   const [result, setResult] = useState(0);

//   // const handleInitialAmountChange = (event) => {
//   //   setInitialAmount(Number(event.target.value));
//   // };

//   const createInvoiceamount = async () => {
//     const newInvoiceFeeCa = 'school fees';
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
//         setInitialAmount(data.data[0].total); // Set the total value from the API response
//          //setformattedGlance(data.data[0].glance.replace(/<br>/g, '\n'));

//         //console.log(totalAmount);

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
//   const handlePartialAmountChange = (event) => {
//     const partial = Number(event.target.value);
//     setPartialAmount(partial);
//     setResult(initialAmount - partial);
//   };
// //getStudents
//    const getStudents = async () => {
//     if (newInvoiceClass) {
//        console.log(newInvoiceClass);
//        try {
//         const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/studentByGrades/${newInvoiceClass}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           } 
//         });
//         const data = await response.json();
//          if (data) {
//            const options = data.map(item => ({
//              value: item.id,
//              label: item.concordinate_string
//            }));
//            console.log(options);
//            setOptions(options);
//          }

//         // setTotalAmount(data.data[0].total); // Set the total value from the API response
//         //  setformattedGlance(data.data[0].glance.replace(/<br>/g, '\n'));

//         // console.log(totalAmount);

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

//   //////createInvoice///////////////////
//   const createInvoice = async (event) => {
//     event.preventDefault(); // Prevent page reloading

//     try {
//       const studentIds = selectedOptions.map(option => option.value); 
//       const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/discountTotalAmount', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           std: newInvoiceClass,
//           student_id:studentIds,
//           // roll_no:newInvoiceDate,
//           discount_cat: disCat,
//           year: selectedDate, 
//           dis_amount: partialAmount,
//           invoicefeescat: newInvoiceFeeCa
//           // dis_amount:result,
//         //  created_by: sessionStorage.getItem('user_id')
//          }),
//       });
//       const data = await response.json();
//       setInvoice([...invoice, data]);
//       console.log(data);
//       Swal.fire({
//         icon: 'success',
//         title: 'Created successfully !',
//         showConfirmButton: false,
//         timer: 1800
//       })
//       window.location.reload();
      
//     } catch (error) {
//       console.log(error);
//     }

    
//   };
//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };
//     const handleInputChange = (e) => {
//     setdisCat(e.target.value);
//   };
//  ///////////////
//     //  setNewInvoiceClass('');
//     useEffect(() => {
//       getStudents();
//     }, [newInvoiceClass]);
  

//   return (
//     <div>
//        <div>
       
//        <Sidebar/>
//     <div style={{width:'82.5%',float:'right'}} >
//       <Header/>
//       <div className='container'>
//           <h2 className='p-4' style={{fontFamily:'auto'}}><CiDiscount1 className="pe-1 pb-1" size={35} />Fees Discount</h2>
//           <div className='py-1'>
//           <Paper elevation={2} className="pb-5">
//                <div className='p-4'>
//                 <h4>Fees Discount</h4><hr className='hrAdminDashboard'/>
//                 </div>
//                <div>
//                 <Form>
//                     <Container>
//                     <Row className='pb-3'>
//                     <Col>
//                       <FloatingLabel controlId="floatingSelect" label="Select Class">
//                             <Form.Select aria-label="Floating label select example" value={newInvoiceClass} 
//                             onChange={(e) => setNewInvoiceClass(e.target.value)} onClick={createInvoiceamount} >
//                             <option>Select Class</option>
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
//                         </Col>
//                         <Col>
//                         <Form.Select required
//                         value={newInvoiceFeeCa}
//                         onChange={(e) => setNewInvoiceFeeCa(e.target.value)} onClick={createInvoiceamount} aria-label="Default select example" style={{width:'100%',height:'55px'}}>
//                             <option value='' disabled>Select Fee Category</option>
//                             <option value="school fees">School Fees</option>
//                             <option value="Hostel Bill">Hostel Bill & Others</option>
//                           </Form.Select>
//                         </Col>
//                     <Col>
//                     <input
//         type="text"
//         id="discountType"
//         placeholder="Enter Discount Type"
//         onChange={handleInputChange}
//         value={disCat}
//         style={{ width: '100%', height: '55px' }}
//         list="suggestions"
//       />                        <datalist id="suggestions">
//         <option value="Scholarship for Merit Students" />
//         <option value="Sibling Discount" />
//         <option value="Financial Aid for Economically Weaker Sections" />
//                             <option value="Sports Quota Discount" />
//                             <option value="Staff child Discount" />

//         <option value="Government Employee Discount" />
//          <option value="Special Child" />
//       </datalist>
//                         </Col>
     

//                       {/* <Col >
//                       <Form.Group className="mb-3">
//                           <Form.Control type='date'style={{height:'56px'}} />
//                         </Form.Group>
//                       </Col> */}
//                     </Row>

//                     <Row>
//                       <Col className='pt-4'>
//                       <Select
//     isMulti
//     options={options}
//     value={selectedOptions}
//     onChange={handleSelectChange}
//     styles={customStyles}
//     menuPortalTarget={document.body}
//   />
//                      </Col>
//                     </Row>

// {/*-----------------------  Discount Section ----------------------------------*/}
//                     <Row className='pt-3'>
//                       {/* <Col className='pt-4'>
//                       <Form.Group>
//                              <div className="input-group">
//                           <span className="input-group-text" style={{ backgroundColor: '#E9EDEE' }}>
//                           <span style={{ color: 'red', fontSize: '1.5rem', fontWeight: 500 }}>₹</span>
//                           </span>
//                           <Form.Control
//                             type="text"
//                             placeholder="Enter amount"
//                             value={initialAmount}
//                             disabled
//                             style={{ backgroundColor: '#E9EDEE', height: '58px' }}
//                           />
//                         </div>
//                           </Form.Group>
//                       </Col> */}
//                       <Col className='pt-4'>
//                       <FloatingLabel controlId="floatingPassword" label="Discount ₹ (in amount)">
//                         <Form.Control value={partialAmount} onChange={handlePartialAmountChange}  type="text" placeholder="Discount ₹ (in amount)" autoComplete='off'/>
//                       </FloatingLabel>
//                       </Col>
//                       {/* <Col xs={2} className='pt-2 text-center'>
//                         <Button  className='py-2' style={{backgroundColor:'green'}}>% Apply Discount</Button>
//                       </Col> */}
//                       <Col className='pt-4'>
//                           <Table striped bordered size="sm" style={{width:'10q0%'}}>
//                           <tbody>
//                             <tr>
//                               <td  style={{textAlign:'center',paddingTop:'10px',backgroundColor:'#0C83DC',color:'aliceblue',width:'45%'}}>Discounted Fee Amount</td>
//                               <td><h5 className='text-center pt-2'>₹  {result}</h5></td>
//                             </tr>
//                           </tbody>
//                       </Table>
//                        </Col>
//                        {/*   <Col>
//                           <Form.Group className="mb-3">
//                           <Form.Label>Expiry Date</Form.Label>

//     <Form.Control
//       type="date"
//       value={selectedDate}
//       onChange={handleDateChange}
//       style={{ height: "56px" }}
//     />
//                        </Form.Group>
//                         </Col> */}

//                     </Row>
//                       <div className='pt-3'>
//                       <Button className='bg-success ' onClick={createInvoice}>Apply Discount</Button>
//                       </div>
//                     </Container>
//                 </Form>
//                </div>
//           </Paper>

              
//           <div className='container pt-4'>
//        <div >

//        </div>
//        <div className='p-3'>
//                 <h4>Concession Student List </h4><hr className='hrAdminDashboard'/>
//                 </div>
//             <Table striped bordered hover size="sm">
//                 <thead style={{textAlign:'center'}}>
//                   <tr>
//                     <th>Reg No</th>
//                     <th>Name</th>
//                     <th>Grade</th>
//                     <th>Discount <br></br>Category</th>
//                     {/* <th>Total Amount</th> */}
//                     <th>Discount<br></br> Applied</th>
//                     <th>Invoice <br></br>Status</th>
//                     {/* <th>Discounted Fee Amount</th> */}
//                     <th className='text-center'>Action</th>
//                   </tr>
//                 </thead>

//                 <tbody style={{ textAlign: 'center' }}>
//                     {invoice.map((res) => (
//                       <tr key={res.id}>
//                         <td>{res.roll_no ?? ''}</td>
//                         <td>{res.student_id}</td>
//                         <td>{res.standard}</td>
//                         <td>{res.discount_cat}</td>
//                         {/* <td></td> */}
//                         <td>₹ {res.dis_amount}</td>
//                         <td>{res.status}</td>
//                         {/* <td></td> */}
//                         <td className='text-center'>
//                           {/* <FaRegEdit onClick={handleShow} style={{ cursor: 'pointer' }} className="text-success pb-1 pe-1" size={28} title="Edit user"/> */}
//                           <MdDelete  onClick={() => deleteDiscountFee(res.id)} style={{ cursor: 'pointer' }} className="text-danger pb-1 ps-2" size={35} title="Delete user"/>
//                      </td>
//                       </tr>
//                     ))}
//                   </tbody>
                
//               </Table>
//           </div>
//           </div>
//         </div>
    
//     </div>
//     </div>
//     </div>
//   )
// }


// export default Discountfees

