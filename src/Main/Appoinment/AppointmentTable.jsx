import React,{useEffect,useState} from 'react';
import Navbarall from '../Navbarall';
//Datatable Modules
import $ from 'jquery'; 
import 'jquery/dist/jquery.min.js';
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import {NavLink} from 'react-router-dom'
import {Table,Button,Modal,Form,Row,Col} from 'react-bootstrap';
import {BsCalendar2PlusFill} from 'react-icons/bs'
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';



const AppointmentTable = () => {

  const [tableData, setTableData] = useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState(null)
  const [selectedDateTo, setSelectedDateTo] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const [editId, setEditId] = useState('');
  const [editDesignation, setEditDesignation] = useState('')
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editMobile, setEditMobile] = useState('')
  const [editWhatappNum, setEditWhatappNum] = useState('')
  const [editProlifeDoctor, setEditProlifeDoctor] = useState('')
  const [editReferral, setEditReferral] = useState('')
  const [editOnConsultant, setEditOnConsultant] = useState('')
  const [editCity, setEditCity] = useState('');
  const [editState, setEditState] = useState('');
  const [editQualification, setEditQualification ] = useState('')
  const [editRegistration, setEditRegistration] = useState('')
  const [editBlockDateFrom, setEditBlockDateFrom] = useState('');
  const [editBlockDateTo, setEditBlockDateTo] = useState('');
  // const [editBlockTimeFrom, setEditBlockTimeFrom] = useState('');
  const [editBlockTimeFrom, setEditBlockTimeFrom] = useState(dayjs('00:00', 'HH:mm')); // Initialize with dayjs object
  const [editBlockTimeTo, setEditBlockTimeTo] = useState('');
  const [editBranch, setEditBranch] = useState('');
  const [editFee, setEditFee] = useState('');
  const [editBlockDays, setEditBlockDays] = useState('')




  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDateChangeFrom = (date) => {
    setSelectedDateFrom(date);
    setEditBlockDateFrom(date.toLocaleDateString())
  };
  const handleDateChangeTo = (date) => {
    setSelectedDateTo(date);
    setEditBlockDateTo(date.toLocaleDateString())
  };


  
  useEffect(() => {
    const requestData = {
    };

    fetch('https://euctostaging.com/prolife/api/appointment_list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
        setIsLoading(false);
       })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  

  const initDataTable = () => {
    $('#registaion').DataTable({
      destroy: true,
      processing: true,
      serverSide: false,
      data: tableData,
      dom: 'lfBrtip',
      buttons: [
        {
          extend: 'copy',
          className: 'btn btn-success',
        },
        {
          extend: 'csv',
          className: 'btn btn-danger',
        },
        {
          extend: 'print',
          className: 'btn btn-warning',
        },
      ],
      searching: true,
      columnDefs: [
        {
          data: 'action',
          defaultContent: "<button>Edit</button>",
          targets: 16,
        },
      ],
      columns: [
        { data: 'booked_time_slot', defaultContent: '-' },
        { data: 'appointment_date', defaultContent: '-' },
        { data: 'token_id', defaultContent: '-' },
        { data: 'patient_name', defaultContent: '-' },
        { data: 'visit_type', defaultContent: '-' },
        { data: 'consultation_type', defaultContent: '-' },
        { data: 'uhid', defaultContent: '-' },
        { data: 'category_type', defaultContent: '-' },
        { data: 'phone_number', defaultContent: '-' },
        { data: 'e_mail', defaultContent: '-' },
        { data: 'doctor_name', defaultContent: '-' },
        { data: 'referral_doctor_name', defaultContent: '-' },
        { data: 'purpose', defaultContent: '-' },
        // { data: 'in_time_slot', defaultContent: '-' },
        { data: 'appointment_status', defaultContent: '-' },
        { data: 'source_of_referral', defaultContent: '-' },
        { data: 'created_by', defaultContent: '-' },
        {
          data: 'action',
          targets: 16,
          createdCell: (td, cellData, rowData, row, col) =>
            ReactDOM.render(
              [
                <div className='text-center'>
                  <FaRegEdit onClick={() => {handleShow();getDataID(rowData.id);setEditId(rowData.id);}}style={{ color: 'green', cursor: 'pointer' }}size={25}/>
                </div>
              ],
              td
            ),
        },
      ],
    });
  };
  useEffect(() => {
    if (!isLoading && tableData.length > 0) {
      initDataTable();
    }
  }, [isLoading, tableData]);


 //Edit Table
const editDoctor = async () => {
  try {
    const response = await fetch(`https://euctostaging.com/prolife/api/masters/doctor/update/${editId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: editId,
        designation:editDesignation,
        name: editName,
        email: editEmail,
        mobile: editMobile,
        whatsapp_no: editWhatappNum,
        a4_doctor: editProlifeDoctor,
        referral_doctor: editReferral,
        on_call_consultant:editOnConsultant ,
        city: editCity,
        state:editState,
        qualification: editQualification,
        registration_no:editRegistration ,
        block_days_from: editBlockDateFrom,
        block_days_to: editBlockDateTo,
        block_days_from_time: editBlockTimeFrom,
        block_days_to_time: editBlockTimeTo,
        branch: editBranch,
        fee: editFee,
        block_days: editBlockDays,
      }),
    });
    const data = await response.json();
    console.log(data);
    handleClose();
    //  $('#registaion').DataTable().ajax.reload(null, false);
    if (response.ok) {
      // Successfully updated, reload the table
      await initDataTable(); 

      // table.ajax.reload();
      Swal.fire({
        icon: 'success',
        title: 'Doctor updated successfully !',
        showConfirmButton: false,
        timer: 1800,
      })
      .then(() => {
        window.location.reload(); 
           });

    } else {
      Swal.fire('Error', 'Failed to update the Patient.', 'error');
    }
  } catch (error) {
    console.error('Error updating item:', error);
    Swal.fire('Error', 'An error occurred while updating the item.', 'error');
  }
} 

 const getDataID = async (datid)=>{
  try{
    const response = await fetch(`https://euctostaging.com/prolife/api/masters/doctor/${datid}`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    const {
      id,
      designation,
      name,
      email,
      mobile,
      whatsapp_no,
      a4_doctor,
      referral_doctor,
      on_call_consultant,
      city,
      state,
      qualification,
      registration_no,
      block_days_from,
      block_days_to,
      block_days_from_time,
      block_days_to_time,
      branch,
      fee,
      block_days
    } = data;

    setEditId(id);
    setEditDesignation(designation);
    setEditName(name);
    setEditEmail(email);
    setEditMobile(mobile);
    setEditWhatappNum(whatsapp_no);
    setEditProlifeDoctor(a4_doctor);
    setEditReferral(referral_doctor);
    setEditOnConsultant(on_call_consultant);
    setEditCity(city);
    setEditState(state);
    setEditQualification(qualification);
    setEditRegistration(registration_no);
    setEditBlockDateFrom(block_days_from);
    setEditBlockDateTo(block_days_to);
    setEditBlockTimeFrom(block_days_from_time);
    setEditBlockTimeTo(block_days_to_time);
    setEditBranch(branch);
    setEditFee(fee);
    setEditBlockDays(block_days);

  }catch(error){
    console.log('Error fetching data for id:', datid, error);
  }
 }  

  return (
    <div>
      <Navbarall/>
      <div className='py-4 px-5'>
        <div style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
          <div className='px-5 py-3'>
            <div>
                <Row>
                  <Col>
                   <NavLink to='/Main/Appoinment/AppoinmentForm'>
                   <Button style={{backgroundColor:'#CCA047', color:'white'}}><BsCalendar2PlusFill className='mr-2'/>Add Appointment</Button></NavLink>
                  </Col>
                  <Col style={{textAlign:'end', marginBottom:'20px'}}>
                  <NavLink to='/Main/Appoinment/Appoinment'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
                  </Col>
                </Row>
            </div><hr/>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Doctor Details</Modal.Title>
        </Modal.Header>
        <Form> 
        <Modal.Body>
          <div>
          <Form.Control  value={editId} type="hidden"  />
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Booked Time</Form.Label>
              <Form.Control value={editDesignation} onChange={(e)=> setEditDesignation(e.target.value)} type="time" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Appointment Date</Form.Label>
              <Form.Control value={editName} onChange={(e)=> setEditName(e.target.value)} type="date" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Token ID</Form.Label>
              <Form.Control value={editEmail} onChange={(e)=> setEditEmail(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Patient Name</Form.Label>
              <Form.Control value={editMobile} onChange={(e)=> setEditMobile(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Visit Type</Form.Label>
              <Form.Control value={editProlifeDoctor} onChange={(e)=> setEditProlifeDoctor(e.target.value)} as="select">
               <option value='' >--Select--</option>
               <option value="Yes">YES</option>
               <option value="No">NO</option>
               </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Consultation Type</Form.Label>
              <Form.Control value={editProlifeDoctor} onChange={(e)=> setEditProlifeDoctor(e.target.value)} as="select">
               <option value='' >--Select--</option>
               <option value="Yes">YES</option>
               <option value="No">NO</option>
               </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>UHID</Form.Label>
              <Form.Control readOnly value={editWhatappNum} onChange={(e)=> setEditWhatappNum(e.target.value) } type="number" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Category Type</Form.Label>
              <Form.Control value={editOnConsultant} onChange={(e)=> setEditOnConsultant(e.target.value)} as="select">
              <option value='' >--Select--</option>
               <option value="Yes">YES</option>
               <option value="No">NO</option>
               </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Phone Number</Form.Label>
              <Form.Control readOnly value={editCity} onChange={(e)=> setEditCity(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Email</Form.Label>
              <Form.Control readOnly value={editState} onChange={(e)=> setEditState(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Doctor Name</Form.Label>
              <Form.Control value={editQualification} onChange={(e)=> setEditQualification(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Purpose</Form.Label>
              <Form.Control value={editRegistration} onChange={(e)=> setEditRegistration(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Appointment Status</Form.Label>
              <Form.Control value={editOnConsultant} onChange={(e)=> setEditOnConsultant(e.target.value)} as="select">
                     <option value='' disabled >--Select--</option>
                        <option value='Pending'>Pending</option>
                        <option value='Scheduled'>Scheduled</option>
                        <option value='Cancelled'>Cancelled</option>
               </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Source of referral</Form.Label>
              <Form.Control value={editBlockTimeTo} onChange={(e)=> setEditBlockTimeFrom(e.target.value)} type='text' />
            </Form.Group>
          </div>
           
        </Modal.Body>
        </Form> 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editDoctor}>
            Save Changes
          </Button>
        </Modal.Footer>
          
           </Modal>
            {/* Table  */}
            <div>
              <div className="MainDiv">
                {isLoading ? (
                  <div className='text-center'><h5>Loading... Thank you for your patience </h5></div>
                ) : (
                  <Table striped bordered hover responsive id="registaion" className="display">
                    <thead>
                    <tr>
                        <th>Booked Time</th>
                        <th>Appointment Date</th>
                        <th>Token ID</th>
                        <th>Patient Name</th>
                        <th>Visit Type</th>
                        <th>Consultation Type</th>
                        <th>UHID</th>
                        <th>Category Type</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Doctor Name</th>
                        <th>Referral Doctor</th>
                        <th>Purpose</th>
                        {/* <th>In Time slot</th> */}
                        <th>Appointment Status</th>
                        <th>Source of referral</th>
                        <th>Created By</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentTable


