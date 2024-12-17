import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {BsBook} from 'react-icons/bs';
import {FaRegEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import {MdMiscellaneousServices,MdOutlineCastForEducation} from 'react-icons/md';
import {RiHomeSmileLine} from 'react-icons/ri';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

const Mfees = () => {

  ///////////////////////// Start-table-1 //////////////////////////////////////////////////
  const [schoolFee, setSchoolFee] = useState([]);
  const [newSection, setNewSection] = useState('');
  const [editSection, setEditSection] = useState('');
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleClose = () => {
    setShow(false);
    setEditSection('');
    setEditId(null);
    setEditMiscellBill('');
    setEditMiscellId(null);
  };

  const handleShow = () => setShow(true);


  ////////////// Data LIST - SchoolFees////////////////////
  const fetchSections = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolfees-master-read');
      const data = await response.json();
      setSchoolFee(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSections();
  }, []);

  ////////////  Create Input data ///////////////////
  const createSection = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolfees-master-insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          sub_heading: newSection,
          created_by: sessionStorage.getItem('user_id')
         }),
      });
      const data = await response.json();
      setSchoolFee([...schoolFee, data[0]]);
      console.log(data[0]);
      Swal.fire({
        icon: 'success',
        title: 'Created successfully !',
        showConfirmButton: false,
        timer: 1800
      })
      setNewSection('');
    } catch (error) {
      console.log(error);
    }
  };

////////////////// Edit//////////////////////////
const editSectionSubmit = async () => {
  try {
    const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolfees-master-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: editId, 
        sub_heading: editSection, 
        created_by: sessionStorage.getItem('user_id'), 
      }),
    });
    const data = await response.json();
    setSchoolFee(schoolFee.map((section) => (section.id === editId ? data.data : section)));
    Swal.fire({
      icon: 'success',
      title: 'Update successfully !',
      showConfirmButton: false,
      timer: 1800
    })
    handleClose();
  } catch (error) {
    console.log(error);
  }
};  

  /////////// Delete//////////////
const deleteSection = async (id) => {
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
          await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolfees-master-delete`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              id: id 
            })
          });

          setSchoolFee(schoolFee.filter((section) => section.id !== id));
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

///////////////////////// End-table-1 //////////////////////////////////////////////////


///////////////////////// Start-table-2 School Miscelfees //////////////////////////////////////////////////
const [miscellBill, setMiscellBill] = useState([]);
const [newMiscellBill, setNewMiscellBill] = useState('');
const [editMiscellBill, setEditMiscellBill] = useState('');
const [editMiscellId, setEditMiscellId] = useState(null);


//   ////////////// Data LIST  ////////////////////
//   const fetchMiscellBill = async () => {
//     try {
//       const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolmiscelfees-master-read');
//       const data = await response.json();
//       setMiscellBill(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchMiscellBill();
//   }, []);


//   // //////  Create Input data ///////////////////
//   const createMiscellBill = async () => {
//     try {
//       const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolmiscelfees-master-insert', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           sub_heading: newMiscellBill,
//           created_by: sessionStorage.getItem('user_id')
//          }),
//       });
//       const data = await response.json();
//       setMiscellBill([...miscellBill, data[0]]);
//       console.log(data[0]);
//       Swal.fire({
//         icon: 'success',
//         title: 'Created successfully !',
//         showConfirmButton: false,
//         timer: 1800
//       })
//       setNewMiscellBill('');
//     } catch (error) {
//       console.log(error);
//     }
//   };

// //////// Edit//////////////////////////
// const editMiscellBillSubmit = async () => {
//   try {
//     const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolmiscelfees-master-update`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ 
//         id: editMiscellId, 
//         sub_heading: editMiscellBill, 
//         created_by: sessionStorage.getItem('user_id'), 
//       }),
//     });
//     const data = await response.json();
//     setMiscellBill(miscellBill.map((res) => (res.id === editMiscellId ? data.data : res)));
//     Swal.fire({
//       icon: 'success',
//       title: 'Update successfully !',
//       showConfirmButton: false,
//       timer: 1800
//     })
//     handleClose();
//   } catch (error) {
//     console.log(error);
//   }
// };    

//   /////////// Delete//////////////
//   const deleteMiscellBill = async (id) => {
//     try {
//       Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           // Add code here to delete the input
//           try {
//             await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolmiscelfees-master-delete`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ 
//                 id: id 
//               })
//             });
  
//             setMiscellBill(miscellBill.filter((res) => res.id !== id));
//             Swal.fire(
//               'Deleted!',
//               'Your input has been deleted.',
//               'success'
//             );
//           } catch (error) {
//             console.log(error);
//             Swal.fire(
//               'Error',
//               'An error occurred while deleting the input.',
//               'error'
//             );
//           }
//         } else {
//           // Code to execute if the user clicks "Cancel"
//           Swal.fire(
//             'Cancelled',
//             'Your input is safe.',
//             'info'
//           );
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
///////////////////////// End-table-2 //////////////////////////////////////////////////


///////////////////////// Start-table-3-Hostelfee//////////////////////////////////////////////////

const [hostelBill, setHostelBill] = useState([])
const [newHostelBill, setNewHostelBill] = useState('');
const [editHostelBill, setEditHostelBill] = useState('');
const [editHostelID, setEditHostelID] = useState('');


///////////////////////////// Data LIST /////////////////////////////////////////
const fetchHostelBill = async () =>{
  try{
    const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/hostelfee-master-read');
    const data = await response.json();
    setHostelBill(data.data);
  }catch(error){
    console.log(error);
  }
};

useEffect(() =>{
  fetchHostelBill()
}, []);

  //////////  Create Input data ///////////////////
  const createHostelBill = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/hostelfee-master-insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          sub_heading: newHostelBill,
          created_by: sessionStorage.getItem('user_id')
         }),
      });
      const data = await response.json();
      setHostelBill([...hostelBill, data[0]]);
      console.log(data[0]);
      Swal.fire({
        icon: 'success',
        title: 'Created successfully !',
        showConfirmButton: false,
        timer: 1800
      })
      setNewHostelBill('');
    } catch (error) {
      console.log(error);
    }
  };

  //////// Edit//////////////////////////
const editHostelBills = async () => {
  try {
    const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/hostelfee-master-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: editHostelID, 
        sub_heading: editHostelBill, 
        created_by: sessionStorage.getItem('user_id'), 
      }),
    });
    const data = await response.json();
    setHostelBill(hostelBill.map((res) => (res.id === editHostelID ? data.data : res)));
    Swal.fire({
      icon: 'success',
      title: 'Update successfully !',
      showConfirmButton: false,
      timer: 1800
    })
    handleClose();
  } catch (error) {
    console.log(error);
  }
};    

  /////////// Delete//////////////
  const deleteHostelBill = async (id) => {
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
            await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/hostelfee-master-delete`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                id: id 
              })
            });
  
            setHostelBill(hostelBill.filter((res) => res.id !== id));
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

///////////////////////// End-table-3 //////////////////////////////////////////////////



///////////////////////// Start-Table-4 /////////////////////////////////////////////////
const [otherFees, setOtherFees] = useState([])
const [newOtherFees, setNewOtherFees] = useState('');
const [editOtherFees, setEditOtherFees] = useState('');
const [editOtherFeesId, setEditOtherFeesId] = useState('');


// ///////////////////////////// Data LIST /////////////////////////////////////////
// const fetchOtherFees = async () =>{
//   try{
//     const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/otherfees-master-read');
//     const data = await response.json();
//     setOtherFees(data.data);
//   }catch(error){
//     console.log(error);
//   }
// };
// useEffect(() =>{
//   fetchOtherFees()
// }, []);

//   //////////  Create Input data ///////////////////
//   const createOtherFees = async () => {
//     try {
//       const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/otherfees-master-insert', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           sub_heading: newOtherFees,
//           created_by: sessionStorage.getItem('user_id')
//          }),
//       });
//       const data = await response.json();
//       setOtherFees([...otherFees, data[0]]);
//       console.log(data[0]);
//       Swal.fire({
//         icon: 'success',
//         title: 'Created successfully !',
//         showConfirmButton: false,
//         timer: 1800
//       })
//       setNewOtherFees('');
//     } catch (error) {
//       console.log(error);
//     }
//   };
//     //////// Edit//////////////////////////
// const editOtherFeess = async () => {
//   try {
//     const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/otherfees-master-update`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ 
//         id: editOtherFeesId, 
//         sub_heading: editOtherFees, 
//         created_by: sessionStorage.getItem('user_id'), 
//       }),
//     });
//     const data = await response.json();
//     setOtherFees(otherFees.map((res) => (res.id === editOtherFeesId ? data.data : res)));
//     Swal.fire({
//       icon: 'success',
//       title: 'Update successfully !',
//       showConfirmButton: false,
//       timer: 1800
//     })
//     handleClose();
//   } catch (error) {
//     console.log(error);
//   }
// }; 

//   /////////// Delete//////////////
//   const deleteOtherBill = async (id) => {
//     try {
//       Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           // Add code here to delete the input
//           try {
//             await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/otherfees-master-delete`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ 
//                 id: id 
//               })
//             });
  
//             setOtherFees(otherFees.filter((res) => res.id !== id));
//             Swal.fire(
//               'Deleted!',
//               'Your input has been deleted.',
//               'success'
//             );
//           } catch (error) {
//             console.log(error);
//             Swal.fire(
//               'Error',
//               'An error occurred while deleting the input.',
//               'error'
//             );
//           }
//         } else {
//           // Code to execute if the user clicks "Cancel"
//           Swal.fire(
//             'Cancelled',
//             'Your input is safe.',
//             'info'
//           );
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

// ///////////////////////// End-Table-4 /////////////////////////////////////////////////



/////////////// trap ////////////////////////////
    const [value, setValue] = React.useState(0);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [data, setData] = useState([]);

     const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  
  return (
    <div>
       
       <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
      <Header/>

      <div>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered style={{backgroundColor:'#F3EDE2'}}>
          <Tab label="School Fees" {...a11yProps(0)} />
          {/* <Tab label="Other Miscellaneous bill" {...a11yProps(1)} /> */}
          <Tab label="Hostel Bill" {...a11yProps(2)} />
          {/* <Tab label="Other Fees" {...a11yProps(3)} /> */}
        </Tabs>
      </Box>
{/*-------------------------------------------- Tab-1------------------------------------------------ */}
      <TabPanel value={value} index={0} >
        <Form>
         <Card style={{ width: '50%' }}>
            <Card.Body>
                <Card.Title><BsBook size={27} className="pe-2"/>School Fees</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Enter the Sub-heading</Card.Subtitle>
                <Card.Text>
                {/* value={name} onChange={handleNameChange}  */}
                <FloatingLabel controlId="floatingInput" label="Type" className="mb-3" >
                    <Form.Control  autoComplete='off'
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)} type="text" placeholder='Type' required="required"  />
                </FloatingLabel>
                </Card.Text>
            </Card.Body>
            <div style={{padding:'10px'}}>
             <Button onClick={createSection}  style={{width:'45%'}} variant="success">Submit</Button>{' '}
            </div>
         </Card> 
      </Form>  
   {/*--------------------------- Table-1 -----------------------------*/}
         <div className='pt-5'>
            <Table striped bordered hover size="sm">
            <div>
       <Modal className='pt-5' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit School Fees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <FloatingLabel className='pb-2' controlId="floatingPassword" label="Sub-heading">
              <Form.Control type="text" autoComplete='off'
              value={editSection}
              onChange={(e) => setEditSection(e.target.value)}/>
            </FloatingLabel>
            {/* <FloatingLabel controlId="floatingSelect" label="Action Section">
                <Form.Select >
                  <option value="1">Active</option>
                  <option value="2">InActive</option>
                </Form.Select>
              </FloatingLabel> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={editSectionSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
           </div>
        <thead>
          <tr style={{background:'#535455',color:'#fff',textAlign:'center'}}>
            <th>Sub-heading</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
                    {schoolFee.map((res) => (
                      <tr key={res.id} style={{ textAlign: 'center' }} >
                        <td>{res.sub_heading}</td>
                        <td>{res.created_by}</td>
                        <td>
                          <FaRegEdit
                            onClick={() => {
                              handleShow();
                              setEditSection(res.sub_heading);
                              setEditId(res.id);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="text-success pb-1 pe-1"
                            size={28}
                            title="Edit user"
                          />
                          <MdDelete
                            onClick={() => deleteSection(res.id)}
                            style={{ cursor: 'pointer' }}
                            className="text-danger pb-1 ps-2"
                            size={35}
                            title="Delete user"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
      </Table>
  
          </div>

      </TabPanel>
{/*-------------------------------------------- Tab-2------------------------------------------------ */}      
      {/* <TabPanel value={value} index={1}>
      <Form>
      <Card style={{ width: '50%' }}>
            <Card.Body>
                <Card.Title><MdMiscellaneousServices size={30} className="pe-2 "/>Other Miscellaneous bill</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Enter the type</Card.Subtitle>
                <Card.Text>
                <FloatingLabel controlId="floatingInput" label="Type" className="mb-3" >
                    <Form.Control autoComplete='off'
                    value={newMiscellBill}
                    onChange={(e) => setNewMiscellBill(e.target.value)} type="text" placeholder='Type' required="required"   />
                </FloatingLabel>
                </Card.Text>
            </Card.Body>
            <div style={{padding:'10px'}}>
             <Button style={{width:'45%'}} onClick={createMiscellBill} variant="success">Submit</Button>{' '}
            </div>
         </Card>
      </Form>*/}

       {/*--------------------------- Table-2 -----------------------------*/}
       {/* <div className='pt-5'>

       <div>
       <Modal className='pt-5' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Other Miscellaneous bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <FloatingLabel className='pb-2' controlId="floatingPassword" label="Sub-heading">
              <Form.Control autoComplete='off'
              value={editMiscellBill} type='text'
              onChange={(e) => setEditMiscellBill(e.target.value)} />
            </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={editMiscellBillSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
       </div>
            <Table striped bordered hover size="sm">
        <thead>
          <tr style={{background:'#535455',color:'#fff',textAlign:'center'}}>
            <th>Sub-heading</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
                    {miscellBill.map((res) => (
                      <tr key={res.id} style={{ textAlign: 'center' }} >
                        <td>{res.sub_heading}</td>
                        <td>{res.created_by}</td>
                        <td>
                          <FaRegEdit
                            onClick={() => {
                              handleShow();
                              setEditMiscellBill(res.sub_heading);
                              setEditMiscellId(res.id);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="text-success pb-1 pe-1"
                            size={28}
                            title="Edit user"
                          />
                          <MdDelete
                            onClick={() => deleteMiscellBill(res.id)}
                            style={{ cursor: 'pointer' }}
                            className="text-danger pb-1 ps-2"
                            size={35}
                            title="Delete user"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
      </Table>
          </div>

      </TabPanel>  */}
{/*-------------------------------------------- Tab-3------------------------------------------------ */}      
      <TabPanel value={value} index={1}>
        <Form>
           <Card style={{ width: '50%' }}>
            <Card.Body>
                <Card.Title><RiHomeSmileLine size={30} className="pe-2 pb-1"/>Hostel Bill</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Enter the type</Card.Subtitle>
                <Card.Text>
                <FloatingLabel controlId="floatingInput" label="Type" className="mb-3" >
                    <Form.Control 
                    autoComplete='off'
                    value={newHostelBill}
                    onChange={(e) => setNewHostelBill(e.target.value)} type="text" placeholder='Type' required="required"   />
                </FloatingLabel>
                </Card.Text>
            </Card.Body>
            <div style={{padding:'10px'}}>
             <Button style={{width:'45%'}} onClick={createHostelBill} variant="success">Submit</Button>{' '}
            </div>
          </Card>
         </Form>
                {/*--------------------------- Table-3 -----------------------------*/}
       <div className='pt-5'>

       <div>
       <Modal className='pt-5' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Hostel Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <FloatingLabel className='pb-2' controlId="floatingPassword" label="Sub-heading">
              <Form.Control
               autoComplete='off'
               value={editHostelBill} type='text'
               onChange={(e) => setEditHostelBill(e.target.value)} />
            </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={editHostelBills}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
       </div>
            <Table striped bordered hover size="sm">
        <thead>
          <tr style={{background:'#535455',color:'#fff',textAlign:'center'}}>
            <th>Sub-heading</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
                    {hostelBill.map((res) => (
                      <tr key={res.id} style={{ textAlign: 'center' }} >
                        <td>{res.sub_heading}</td>
                        <td>{res.created_by}</td>
                        <td>
                          <FaRegEdit
                            onClick={() => {
                              handleShow();
                              setEditHostelBill(res.sub_heading);
                              setEditHostelID(res.id);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="text-success pb-1 pe-1"
                            size={28}
                            title="Edit user"
                          />
                          <MdDelete
                            onClick={() => deleteHostelBill(res.id)}
                            style={{ cursor: 'pointer' }}
                            className="text-danger pb-1 ps-2"
                            size={35}
                            title="Delete user"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
      </Table>
          </div>
      </TabPanel>
{/*-------------------------------------------- Tab-4------------------------------------------------ */}       
      {/* <TabPanel value={value} index={3}>
        <Form >
         <Card style={{ width: '50%' }}>
            <Card.Body>
                <Card.Title><MdOutlineCastForEducation size={30} className="pe-2 pb-1"/>Other hostel and Educational Expenditure</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Enter the type</Card.Subtitle>
                <Card.Text>
                <FloatingLabel controlId="floatingInput" label="Type" className="mb-3" >
                    <Form.Control autoComplete='off'
                    value={newOtherFees}
                    onChange={(e) => setNewOtherFees(e.target.value)} type="text" placeholder='Type' required="required"    />
                </FloatingLabel>
                </Card.Text>
            </Card.Body>
            <div style={{padding:'10px'}}>
             <Button style={{width:'45%'}} onClick={createOtherFees} variant="success">Submit</Button>{' '}
            </div>
         </Card>
         </Form> */}

                {/*--------------------------- Table-4 -----------------------------*/}
       {/* <div className='pt-5'>
       <div>
       <Modal className='pt-5' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Other Fee Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <FloatingLabel className='pb-2' controlId="floatingPassword" label="Sub-heading">
              <Form.Control 
               autoComplete='off'
               value={editOtherFees} type='text'
               onChange={(e) => setEditOtherFees(e.target.value)}  />
            </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={editOtherFeess}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
       </div>

            <Table striped bordered hover size="sm">
        <thead>
          <tr style={{background:'#535455',color:'#fff',textAlign:'center'}}>
            <th>Sub-heading</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
                    {otherFees.map((res) => (
                      <tr key={res.id} style={{ textAlign: 'center' }} >
                        <td>{res.sub_heading}</td>
                        <td>{res.created_by}</td>
                        <td>
                          <FaRegEdit
                            onClick={() => {
                              handleShow();
                              setEditOtherFees(res.sub_heading);
                              setEditOtherFeesId(res.id);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="text-success pb-1 pe-1"
                            size={28}
                            title="Edit user"
                          />
                          <MdDelete
                            onClick={() => deleteOtherBill(res.id)}
                            style={{ cursor: 'pointer' }}
                            className="text-danger pb-1 ps-2"
                            size={35}
                            title="Delete user"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
      </Table>
          </div>
      </TabPanel> */}
    </Box>
      </div>
      {/* <Footer/> */}
    </div>
    </div>
  )
}

export default Mfees