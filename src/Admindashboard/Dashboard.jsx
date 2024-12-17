import { useState, useEffect } from 'react';
import './dashboard.css';
import Footer from './Footer';
import Header from './Header';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import studentVec from '../Assets/studentVec.png'
import sponorVec from '../Assets/sponorVec.jpg';
import incomevec from '../Assets/incomevec.jpg'
import Sidebar from '../Admindashboard/Sidebar';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import { BsFillCalendar2PlusFill } from 'react-icons/bs'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MdOutlineEventAvailable } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { ToastContainer, toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Paper from '@mui/material/Paper';
import Chat from './Chat';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';






const locales = {
  "en-IN": require("date-fns/locale/en-IN"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
  views: {
    month: true
  }
},
);

const Dashboard = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [studentCount, setStudentCount] = useState(0);
  const [sponsorCount, setSponsorCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [reminder, setReminder] = useState([])
  const [newDate, setNewDate] = useState('')
  const [newTitle, setnewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newColor, setNewColor] = useState('')

  const [newSendTo, setNewSendTo] = useState('')

  const handleDateChange = (date) => {
    setNewDate(date);
  };

  useEffect(() => {
    fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/count')
      .then(response => response.json())
      .then(data => {
        setStudentCount(data.countstudent);
        setSponsorCount(data.countsponser);
        setStaffCount(data.countstaff);
      })
      .catch(error => console.error('Error fetching API:', error));
  }, []);

  /////////////////////// Reminder///////////////////////////////

  const fetchreminder = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/reminder-read')
      const data = await response.json()
      setReminder(data.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchreminder()
  }, []);


  const createReminder = async () => {
    const date = new Date(newDate);

    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'Asia/Kolkata' // Set the desired time zone, such as 'Asia/Kolkata' for Indian time
    };

    //const indianTimeString = date.toLocaleDateString('en-IN', options);
    const indianTimeString = date.toLocaleString('en-IN', options).replace(/\//g, '-');


    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/reminder-insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: indianTimeString,
          title: newTitle,
          description: newDescription,
          color: newColor,
          send_to: newSendTo,
          user_id: sessionStorage.getItem('user_id')
        }),
      })
      const data = await response.json();
      setReminder([...reminder, data[0]]);
      console.log(data[0]);
      toast.success('Reminder setup successfully', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

      setNewDate('');
      setnewTitle('');
      setNewDescription('');
      setNewColor('');
      setNewSendTo('');
    } catch (error) {
      console.log(error);
    }
  }


  const deleteReminder = async (id) => {
    try {

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            // Add code here to delete the input
            try {
              await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/reminder-delete`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: id
                })
              });

              setReminder(reminder.filter((res) => res.id !== id));
              Swal.fire(
                'Deleted!',
                'Your Event Reminder has been deleted.',
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
              'Your Event Reminder is safe.',
              'info'
            );
          }
        });
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div>
      <Sidebar />
      <div style={{ width: '82.5%', float:'right' }} >

        <Header />
        <ToastContainer style={{ paddingTop: '50px' }}
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="dark" />

        <div className='container pt-4'>

          {/*------------------ Heading------------------------------------ */}
          <section>
            <h4>Admin Dashboard</h4>
            <hr className='hrAdminDashboard' />
            <p>HOME</p>
          </section>
          {/*------------------ Cards------------------------------------ */}

          <section>
            <div className='row'>

              {/*--------------- Card-1----------------------------------- */}
              <div className='col-4'>
                <Card>
                  <Card.Body className='card1' style={{ backgroundColor: '#f0f3f5' }}>
                    <Row>
                      <Col xs={4}>
                        <img style={{ width: '110%' }} src={studentVec} alt="vector-img" />
                      </Col>
                      <Col xs={1}>
                        <div className="vertical"></div>
                      </Col>
                      <Col xs={7}>
                        <h4 style={{ fontFamily: 'auto', fontSize: 'x-large' }}>Total Students</h4>
                        <h3 className='pt-2 ps-4'>Count: {studentCount}</h3>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>

              {/*--------------- Card-2----------------------------------- */}
              <div className='col-4'>
                <Card>
                  <Card.Body className='card1' style={{ backgroundColor: '#f0f3f5' }}>
                    <Row>
                      <Col xs={4}>
                        <img style={{ width: '110%' }} src={sponorVec} alt="vector-img" />
                      </Col>
                      <Col xs={1}>
                        <div className="vertical"></div>
                      </Col>
                      <Col xs={7}>
                        <h4 style={{ fontFamily: 'auto', fontSize: 'x-large' }}>Total Sponsor</h4>
                        <h3 className='pt-2 ps-4'>Count: {sponsorCount}</h3>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>

              {/*--------------- Card-3----------------------------------- */}
              <div className='col-4'>
                <Card>
                  <Card.Body className='card1' style={{ backgroundColor: '#f0f3f5' }}>
                    <Row>
                      <Col xs={4}>
                        <img style={{ width: '110%' }} src={incomevec} alt="vector-img" />
                      </Col>
                      <Col xs={1}>
                        <div className="vertical"></div>
                      </Col>
                      <Col xs={7}>
                        <h4 style={{ fontFamily: 'auto', fontSize: 'x-large' }}>Total Staff</h4>
                        <h3 className='pt-2 ps-4'>Count: {staffCount}</h3>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>

            </div>
          </section>

          {/*-------------------- Chat Section--------------------------- */}
          <section className='pt-5'>
            <h4>Payment</h4>
            <hr className='earnAdminDashboard' />
            <div className='container pt-3 chartDashboard'>
              <Chat />
            </div>
          </section>

          {/*------------------------- Calander---------------------------- */}

          {/* <section className='pt-5'>
        <h4>Event Calendar</h4>
         <hr className='calAdminDashboard'/>
        <div className='container pt-3'>

        <div className='pb-3'>
          <button onClick={handleShow} class="button-37" role="button"><BsFillCalendar2PlusFill size={30} className="pe-2"/>Add Reminder </button>
       <div>
          <Modal show={show} onHide={handleClose} centered>
        <Modal.Header style={{backgroundColor:'#E6E6E6'}}>
          <Modal.Title>Reminder Setup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
             <Form.Select value={newSendTo} onChange={(e)=> setNewSendTo(e.target.value)}>
                <option value="" disabled>--Select--</option>
                <option value="Self">Self</option>
              </Form.Select>

             <Form.Group className="mb-3 mt-3">
                  <DatePicker className='reminderDate'
                    placeholderText='Enter Date'
                    selected={newDate}
                    onChange={handleDateChange}
                    dateFormat='dd-MM-yyyy'/>
              </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <FloatingLabel controlId="floatingInput" label="Title"className="mb-3" >
                <Form.Control value={newTitle} onChange={(e)=> setnewTitle(e.target.value)} type="text" />
              </FloatingLabel>
            </Form.Group>
    
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea2" label="Description">
        <Form.Control value={newDescription} onChange={(e)=> setNewDescription(e.target.value)} as="textarea" placeholder="Description" style={{ height: '100px' }}/>
      </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3 d-flex" controlId="exampleForm.ControlInput1">
              <h6 className='pe-3 pt-2'>Pick your reminder color : </h6>
              <Form.Control type="color" value={newColor} onChange={(e)=> setNewColor(e.target.value) }  style={{width:'50%'}} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:'#E6E6E6'}}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={createReminder}>
            Setup Now
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
        </div>

        <div className='pb-5'>
        <Row>
            <Col xs={8}>
              
              <Calendar localizer={localizer} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "10px" }} views={[ "month"]}/>
            </Col>
            <Col xs={4}>
            <Navbar  className='p-1'  style={{backgroundColor:'#586572',margin:'56px 0 0 0',borderRadius: '10px 10px 0 0'}}>
            <Container>
              <Navbar.Brand>
                 <h4 style={{color:'#fff', marginBottom:'0px',fontFamily: 'sans-serif'}}><MdOutlineEventAvailable className='pe-2 mb-1' size={35}/>Event Reminders</h4>
              </Navbar.Brand>
            </Container>
         </Navbar>
         <Paper style={{maxHeight: 450, overflow: 'auto'}} className='scroll' >
            
         {reminder.map((res) => (
              <Card key={res.id} style={{ width: '100%' }}>
                <ListGroup variant="flush">
                  <ListGroup.Item style={{ width: '100%' }}>
                  <div className='d-flex align-items-center'>
                    <p className='mb-0' style={{ backgroundColor: res.color, color: '#fff', width: 'max-content', padding: '2px 6px', borderRadius: '6px' }}>{res.date}</p>{' '}
                    <div style={{ marginLeft: 'auto' }}>
                      <TiDelete onClick={()=> deleteReminder(res.id)} size={23} style={{color:"red"}} />
                    </div>
                  </div>
                    <h4 className='py-2' style={{fontFamily: 'fangsong',fontWeight: '700'}}>{res.title}</h4>
                    <span>{res.description}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            ))}
 
        </Paper>
        <Navbar  className='p-1'  style={{backgroundColor:'#E5E3DA',borderRadius: '0 0 10px 10px '}}>
            <Container> 
               <div style={{width:'110%',textAlign:'end'}}>
                  <a href='/svsportaladmintest/reminders' style={{textDecoration:'none'}}>All Reminders...</a>
                </div>
            </Container>
         </Navbar>
          
       
            </Col>
          </Row> 
        </div>

  
        </div>
      </section> */}

        </div>
        <Footer />
      </div>

    </div>
  )
}

export default Dashboard



















