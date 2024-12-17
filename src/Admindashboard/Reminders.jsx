import {useEffect, useState} from 'react'
import Header from './Header';
import Sidebar from '../Admindashboard/Sidebar';
import Footer from './Footer';
import Paper from '@mui/material/Paper';
import {  Container, Row,Col } from 'react-bootstrap';
import {MdOutlineDashboardCustomize} from 'react-icons/md'
import {AiOutlineDoubleRight} from 'react-icons/ai'
import {BsCalendarWeek,BsCalendarMonth} from 'react-icons/bs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';
import {TiDelete} from 'react-icons/ti';


const Reminders = () => {
  const [showComponent1, setShowComponent1] = useState(false);
  const [showComponent2, setShowComponent2] = useState(false);
  const [showComponent3, setShowComponent3] = useState(false);
  const [reminder, setReminder] = useState([])

  const handleButtonClick1 = () => {
    setShowComponent1(true);
    setShowComponent2(false);
    setShowComponent3(false);
  };

  const handleButtonClick2 = () => {
    setShowComponent1(false);
    setShowComponent2(true);
    setShowComponent3(false);
  };

  const handleButtonClick3 = () => {
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(true);
  };


  //reminder Fetch

  const fetchReminder  = async ()=>{
    try{
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/reminder-read')
      const data = await response.json()
      setReminder(data.data)
    }catch (error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchReminder()
  },[])
  const deleteReminder = async (id)=>{
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
      <Sidebar/>
         <div style={{width:'82.5%',float:'right'}} >
      <Header/>

      <div className='py-3'>
        <Container>
          <Paper elevation={6} className="pb-5">

          <div className='py-2' style={{left:'84%',position:'absolute'}}>
          <Breadcrumb>
            <Breadcrumb.Item href="/svsportaladmintest/Dashboard">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active >Reminder</Breadcrumb.Item>
          </Breadcrumb>
          </div>

            <div style={{padding:'30px',textAlign:'center'}}>
              <h2 >Reminder</h2>
              <p>Never miss an important event again with our reminder features</p>
            </div>

            {/* <div style={{textAlign:'center'}}>
                <button onClick={handleButtonClick1} style={{marginRight: "12px"}} class="button-17" role="button"><BsCalendarWeek size={26} className='pe-2'/><h6 className='mb-0'>Week</h6></button>
                <button onClick={handleButtonClick2} style={{marginRight: "12px"}} class="button-17" role="button"><BsCalendarMonth size={26} className='pe-2'/><h6 className='mb-0'>Month</h6></button>
                <button onClick={handleButtonClick3} style={{marginRight: "12px"}} class="button-17" role="button"><MdOutlineDashboardCustomize size={26} className='pe-2'/><h6 className='mb-0'>Custom</h6></button>
            </div>
             */}
            
            <div style={{textAlign:'center'}}>{showComponent3 && <Component3 />}</div>

{/* ----------------------Reminder List---------------------------------------- */}
            <section className='container'>
              <Navbar  className='p-1'  style={{backgroundColor:'#586572',margin:'56px 0 0 0',borderRadius: '10px 10px 0 0'}}>
              
                <Navbar.Brand  href="#home">
                  <h5 style={{color:'#fff', padding:'0 0px'}}>
                  <div style={{textAlign:'start'}}>{showComponent1 && <Component1 />}</div>
                  <div style={{textAlign:'start'}}>{showComponent2 && <Component2 />}</div>
                  </h5>
                </Navbar.Brand>
            
         </Navbar>
         <Paper style={{maxHeight: 500, overflow: 'auto',backgroundColor:'#F3ECEC'}} className='scroll container' >


         {reminder.map((res)=>(
          <div className='py-3'>
          <div className='py-2'>
          <Card key={res.id} style={{borderLeft: "15px solid",borderColor: res.color}}>
              <Card.Body>
                  <div className='row'>
                    <div className='col-2' style={{marginTop:'20px'}}>
                      <h6>{res.date}</h6>
                    </div>
                    <div className='col-1'>
                       <div className="verticalReminder"></div>
                    </div>
                    <div className='col-9'>
                       <h5>{res.title}</h5>
                       <p className="text">{res.description}</p>
                    </div>
                  </div>
                </Card.Body>
            </Card>
          </div>

       </div>
         ))}

         </Paper>
            </section>
          </Paper>
      </Container>
 </div>
      </div>
      
    </div>
  )
}
function Component1() {
  return (
    <div className='ps-2'>
      <h4>“These are reminders for the week”</h4>
    </div>
  );
}

function Component2() {
  return (
    <div className='ps-2'>
      <h4>“These are reminders for the month”</h4>
    </div>
  );
}

function Component3() {
  return(
     <div className='pt-4 d-flex' style={{marginLeft:'156px'}}>

    {/* //    <div className='d-flex'>
    //     <h5 className='p-4'>From</h5>
    //     <LocalizationProvider dateAdapter={AdapterDayjs} >
    //           <DemoContainer components={['DatePicker']}>
    //             <DatePicker  format='DD/MM/YYYY' />
    //           </DemoContainer>
    //         </LocalizationProvider>
    //    </div>

    //    <div className='d-flex'>
    //     <h5 className='p-4' >To</h5>
    //     <LocalizationProvider dateAdapter={AdapterDayjs} >
    //           <DemoContainer components={['DatePicker']}>
    //             <DatePicker format='DD/MM/YYYY'  />
    //           </DemoContainer>
    //         </LocalizationProvider>
    //    </div>
    //    <div className='pt-2 ps-4'>
    //      <button  class="button-18" role="button"><h6 className='mb-0'>Sumbit</h6></button>
    //    </div> */}


     </div>
  );
}

export default Reminders




