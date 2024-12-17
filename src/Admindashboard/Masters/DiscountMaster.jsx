import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { Button, Modal, Row, Col } from 'react-bootstrap';
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
  

const DiscountcategoryMaster = () => {

  ///////////////////////// Start-table-1 //////////////////////////////////////////////////
  // State Hooks
  const [show, setShow] = useState(false);
  const [editSchoolID, setEditSchoolID] = useState('');
  const [editSchoolDiscountName, setEditSchoolDiscountName] = useState('');
  const [editSchoolDiscountAmount, setEditSchoolDiscountAmount] = useState('');
  const [editSchoolDiscountDate, setEditSchoolDiscountDate] = useState('');
  
  const [discountSchoolBill, setDiscountSchoolBill] = useState([]);
  const [newSchoolDiscountName, setNewSchoolDiscountName] = useState('');
  const [newSchoolDiscountAmount, setNewSchoolDiscountAmount] = useState('');
  const [newSchoolDiscountDate, setNewSchoolDiscountDate] = useState('');

  // Handle Show/Close Modal
  const handleClose = () => {
    setShow(false);
    // setEditSection('');
  };

  const handleShow = () => setShow(true);

  // Fetch Data
  const fetchSections = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/SchoolDiscountCategory-read');
      const data = await response.json();
      console.log(data);
    setDiscountSchoolBill(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // Create New Discount
  const schoolCreateSection = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/DiscountCategory-master-insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          discount_name: newSchoolDiscountName,
          amount: newSchoolDiscountAmount,
          date: newSchoolDiscountDate,
          feestype: 'school',
        }),
      });
      const data = await response.json();
      setDiscountSchoolBill([...discountSchoolBill, data[0]]);
      console.log(data[0]);
      Swal.fire({
        icon: 'success',
        title: 'Created successfully!',
        showConfirmButton: false,
        timer: 1800,
      });
      setNewSchoolDiscountName('');
      setNewSchoolDiscountAmount('');
      setNewSchoolDiscountDate('');
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Discount
  const editSectionSubmit = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/DiscountCategory-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: editSchoolID, 
          discount_name: editSchoolDiscountName, 
          amount: editSchoolDiscountAmount, 
          date: editSchoolDiscountDate,
        }),
      });
      const data = await response.json();
      setDiscountSchoolBill(discountSchoolBill.map((res) => (res.id === editSchoolID ? data.data : res)));
      Swal.fire({
        icon: 'success',
        title: 'Updated successfully!',
        showConfirmButton: false,
        timer: 1800,
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Discount
  const deleteSection = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/DiscountCategory-delete', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id }),
            });
            setDiscountSchoolBill(discountSchoolBill.filter((res) => res.id !== id));
            Swal.fire('Deleted!', 'Your input has been deleted.', 'success');
          } catch (error) {
            console.log(error);
            Swal.fire('Error', 'An error occurred while deleting the input.', 'error');
          }
        } else {
          Swal.fire('Cancelled', 'Your input is safe.', 'info');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  
// State Hooks
const [discountHostelBill, setDiscountHostelBill] = useState([]);
const [newHostelDiscountName, setNewHostelDiscountName] = useState('');
const [newHostelDiscountAmount, setNewHostelDiscountAmount] = useState('');
const [newHostelDiscountDate, setNewHostelDiscountDate] = useState('');
const [editHostelID, setEditHostelID] = useState('');
const [editHostelDiscountName, setEditHostelDiscountName] = useState('');
const [editHostelDiscountAmount, setEditHostelDiscountAmount] = useState('');
const [editHostelDiscountDate, setEditHostelDiscountDate] = useState('');
useEffect(() => {
  fetchHostelBill();
}, []);
// Fetch Hostel Bill Data
const fetchHostelBill = async () => {
  try {
    const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/HostelDiscountCategory-read');
    const data = await response.json();
    console.log(data.data);
    setDiscountHostelBill(data);
  } catch (error) {
    console.log(error);
  }
};

// Fetch Data on Component Mount


// Create New Hostel Discount
const createHostelBill = async () => {
  try {
    const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/DiscountCategory-master-insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        discount_name: newHostelDiscountName,
        amount: newHostelDiscountAmount,
        date: newHostelDiscountDate,
        feestype: 'hostel',
      }),
    });
    const data = await response.json();
    setDiscountHostelBill([...discountHostelBill, data[0]]);
    console.log(data[0]);
    Swal.fire({
      icon: 'success',
      title: 'Created successfully!',
      showConfirmButton: false,
      timer: 1800,
    });
    setNewHostelDiscountName('');
    setNewHostelDiscountAmount('');
    setNewHostelDiscountDate('');
  } catch (error) {
    console.log(error);
  }
};

// Edit Hostel Discount
const editHostelBills = async () => {
  try {
    const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/DiscountCategory-update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: editHostelID, 
        discount_name: editHostelDiscountName, 
        amount: editHostelDiscountAmount, 
        date: editHostelDiscountDate, 
      }),
    });
    const data = await response.json();
    setDiscountHostelBill(discountHostelBill.map((res) => (res.id === editHostelID ? data.data : res)));
    Swal.fire({
      icon: 'success',
      title: 'Updated successfully!',
      showConfirmButton: false,
      timer: 1800,
    });
    handleClose(); // Ensure this function is defined or remove it if not used
  } catch (error) {
    console.log(error);
  }
};

// Delete Hostel Discount
const deleteHostelBill = async (id) => {
  try {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/DiscountCategory-delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
          });
          setDiscountHostelBill(discountHostelBill.filter((res) => res.id !== id));
          Swal.fire('Deleted!', 'Your input has been deleted.', 'success');
        } catch (error) {
          console.log(error);
          Swal.fire('Error', 'An error occurred while deleting the input.', 'error');
        }
      } else {
        Swal.fire('Cancelled', 'Your input is safe.', 'info');
      }
    });
  } catch (error) {
    console.log(error);
  }
};

    const [value, setValue] = React.useState(0);
     const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <div>
      {/* Sidebar Component */}
      <Sidebar />
  
      {/* Main Content Area */}
      <div style={{ width: '82.5%', float: 'right' }}>
        {/* Header Component */}
        <Header />
  
        <div>
          <Box sx={{ width: '100%' }}>
            {/* Tabs for navigating between different sections */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                centered
                style={{ backgroundColor: '#F3EDE2' }}
              >
                <Tab label="School Fees" {...a11yProps(0)} />
                {/* <Tab label="Other Miscellaneous bill" {...a11yProps(1)} /> */}
                <Tab label="Hostel Bill" {...a11yProps(2)} />
                {/* <Tab label="Other Fees" {...a11yProps(3)} /> */}
              </Tabs>
            </Box>
  
            {/* School Fees Tab */}
            <TabPanel value={value} index={0}>
              <Form>
                <Card style={{ width: '50%' }}>
                  <Card.Body>
                    <Card.Title>
                      <BsBook size={27} className="pe-2" />
                      Discount For School Fees
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Enter the School Discount
                    </Card.Subtitle>
                    <Card.Text>
                      <Row>
                        <Col xs={12} sm={12}>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Discount Name"
                            className="mb-3"
                          >
                            <Form.Control
                              autoComplete='off'
                              value={newSchoolDiscountName}
                              onChange={(e) => setNewSchoolDiscountName(e.target.value)}
                              type="text"
                              placeholder='Discount Name'
                              required
                            />
                          </FloatingLabel>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} sm={6}>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Amount"
                            className="mb-3"
                          >
                            <Form.Control
                              autoComplete='off'
                              value={newSchoolDiscountAmount}
                              onChange={(e) => setNewSchoolDiscountAmount(e.target.value)}
                              type="text"
                              placeholder='Amount'
                              required
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xs={12} sm={6}>
                          <FloatingLabel
                            controlId="floatingDate"
                            label="Date"
                            className="mb-3"
                          >
                            <Form.Control
                              autoComplete='off'
                              value={newSchoolDiscountDate}
                              onChange={(e) => setNewSchoolDiscountDate(e.target.value)}
                              type="date"
                              placeholder='Select Date'
                              required
                            />
                          </FloatingLabel>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                  <div style={{ padding: '10px' }}>
                    <Button onClick={schoolCreateSection} style={{ width: '45%' }} variant="success">
                      Submit
                    </Button>
                  </div>
                </Card>
              </Form>
  
              {/* Table displaying School Fees Discounts */}
              <div className='pt-5'>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr style={{ background: '#535455', color: '#fff', textAlign: 'center' }}>
                      <th>Discount Name</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discountSchoolBill.map((res) => (
                      <tr key={res.id} style={{ textAlign: 'center' }}>
                        <td>{res.discount_name}</td>
                        <td>{res.amount}</td>
                        <td>{res.date}</td>
                        <td>
                          <FaRegEdit
                            onClick={() => {
                              handleShow();
                              setEditSchoolDiscountName(res.discount_name);
                              setEditSchoolDiscountAmount(res.amount);
                              setEditSchoolDiscountDate(res.date);
                              setEditSchoolID(res.id);
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
  
                {/* Modal for editing School Discounts */}
                <Modal className='pt-5' show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Discount For School Discount</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      <Col xs={12} sm={12}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Discount Name"
                          className="mb-3"
                        >
                          <Form.Control
                            autoComplete='off'
                            value={editSchoolDiscountName}
                            onChange={(e) => setEditSchoolDiscountName(e.target.value)}
                            type="text"
                            placeholder='Discount Name'
                            required
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={6}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Amount"
                          className="mb-3"
                        >
                          <Form.Control
                            autoComplete='off'
                            value={editSchoolDiscountAmount}
                            onChange={(e) => setEditSchoolDiscountAmount(e.target.value)}
                            type="text"
                            placeholder='Amount'
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} sm={6}>
                        <FloatingLabel
                          controlId="floatingDate"
                          label="Date"
                          className="mb-3"
                        >
                          <Form.Control
                            autoComplete='off'
                            value={editSchoolDiscountDate}
                            onChange={(e) => setEditSchoolDiscountDate(e.target.value)}
                            type="date"
                            placeholder='Select Date'
                            required
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
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
            </TabPanel>
  
            {/* Hostel Bill Tab */}
            <TabPanel value={value} index={1}>
              <Form>
                <Card style={{ width: '50%' }}>
                  <Card.Body>
                    <Card.Title>
                      <RiHomeSmileLine size={30} className="pe-2 pb-1" />
                      Discount For Hostel Fees
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Enter the Hostel Discount
                    </Card.Subtitle>
                    <Card.Text>
                      <Row>
                        <Col xs={12} sm={12}>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Discount Name"
                            className="mb-3"
                          >
                            <Form.Control
                              autoComplete='off'
                              value={newHostelDiscountName}
                              onChange={(e) => setNewHostelDiscountName(e.target.value)}
                              type="text"
                              placeholder='Discount Name'
                              required
                            />
                          </FloatingLabel>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} sm={6}>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Amount"
                            className="mb-3"
                          >
                            <Form.Control
                              autoComplete='off'
                              value={newHostelDiscountAmount}
                              onChange={(e) => setNewHostelDiscountAmount(e.target.value)}
                              type="text"
                              placeholder='Amount'
                              required
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xs={12} sm={6}>
                          <FloatingLabel
                            controlId="floatingDate"
                            label="Date"
                            className="mb-3"
                          >
                            <Form.Control
                              autoComplete='off'
                              value={newHostelDiscountDate}
                              onChange={(e) => setNewHostelDiscountDate(e.target.value)}
                              type="date"
                              placeholder='Select Date'
                              required
                            />
                          </FloatingLabel>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                  <div style={{ padding: '10px' }}>
                    <Button style={{ width: '45%' }} onClick={createHostelBill} variant="success">
                      Submit
                    </Button>
                  </div>
                </Card>
              </Form>
  
              {/* Table displaying Hostel Fees Discounts */}
              <div className='pt-5'>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr style={{ background: '#535455', color: '#fff', textAlign: 'center' }}>
                      <th>Discount Name</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {Array.isArray(discountHostelBill) && discountHostelBill.length > 0 ? (
        discountHostelBill.map((res) => (
          <tr key={res.id} style={{ textAlign: 'center' }}>
            <td>{res.discount_name}</td>
            <td>{res.amount}</td>
            <td>{res.date}</td>
            <td>
              <FaRegEdit
                onClick={() => {
                  handleShow();
                  setEditHostelDiscountName(res.discount_name);
                  setEditHostelDiscountAmount(res.amount);
                  setEditHostelDiscountDate(res.date);
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
        ))
      ) : (
        <tr>
          <td colSpan="4" style={{ textAlign: 'center' }}>No discounts available</td>
        </tr>
      )}
                  </tbody>
                </Table>
  
                {/* Modal for editing Hostel Discounts */}
                <Modal className='pt-5' show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Discount For Hostel Bill</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      <Col xs={12} sm={12}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Discount Name"
                          className="mb-3"
                        >
                          <Form.Control
                            autoComplete='off'
                            value={editHostelDiscountName}
                            onChange={(e) => setEditHostelDiscountName(e.target.value)}
                            type="text"
                            placeholder='Discount Name'
                            required
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={6}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Amount"
                          className="mb-3"
                        >
                          <Form.Control
                            autoComplete='off'
                            value={editHostelDiscountAmount}
                            onChange={(e) => setEditHostelDiscountAmount(e.target.value)}
                            type="text"
                            placeholder='Amount'
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} sm={6}>
                        <FloatingLabel
                          controlId="floatingDate"
                          label="Date"
                          className="mb-3"
                        >
                          <Form.Control
                            autoComplete='off'
                            value={editHostelDiscountDate}
                            onChange={(e) => setEditHostelDiscountDate(e.target.value)}
                            type="date"
                            placeholder='Select Date'
                            required
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
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
            </TabPanel>
          </Box>
        </div>
        {/* <Footer/> */}
      </div>
    </div>
  );    
}

export default DiscountcategoryMaster