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
import {Row,Col,Table,Button,Modal,Form} from 'react-bootstrap';
import {PiTargetDuotone} from 'react-icons/pi'
import { MdDelete } from 'react-icons/md';
import { FaRegEdit,} from 'react-icons/fa';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker';
import { FaRotate } from 'react-icons/fa6';
import dayjs from 'dayjs';
import Select from 'react-select';


const dummyData = [
  { value: 'Cash', label: 'Cash' },
  { value: 'Card', label: 'Card' },
  { value: 'UPI', label: 'UPI' },
  { value: 'Neft', label: 'Neft' },
  { value: 'Opissue', label: 'Opissue' },
  { value: 'Cheque', label: 'Cheque' },
  { value: 'Credit Return', label: 'Credit Return' },
  { value: 'Adjust with amount', label: 'Adjust with amount' },
  { value: 'Ajust with credit', label: 'Ajust with credit' },
  { value: 'Due', label: 'Due' },
];



const SalesTable = () => {

  const [tableData, setTableData] = useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState(null)
  const [selectedDateTo, setSelectedDateTo] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showReturn, setShowReturn] = useState(false);

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

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseReturn = () => setShowReturn(false);
  const handleShowReturn = () => setShowReturn(true);

  const handleDateChangeFrom = (date) => {
    setSelectedDateFrom(date);
    setEditBlockDateFrom(date.toLocaleDateString())
  };
  const handleDateChangeTo = (date) => {
    setSelectedDateTo(date);
    setEditBlockDateTo(date.toLocaleDateString())
  };

//Insert View Table
  useEffect(() => {
    fetch('https://euctostaging.com/prolife/api/masters/doctor')
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
          targets: 22
        }
      ],
      columns: [
        { data: 'doctor_code',defaultContent: '-' },
        { data: 'designation',defaultContent: '-' },
        { data: 'name',defaultContent: '-' },
        { data: 'email',defaultContent: '-' },
        { data: 'mobile',defaultContent: '-' },
        { data: 'whatsapp_no',defaultContent: '-' },
        { data: 'a4_doctor',defaultContent: '-' },
        { data: 'referral_doctor',defaultContent: '-' },
        { data: 'on_call_consultant',defaultContent: '-' },
        { data: 'city' ,defaultContent: -'' },
        { data: 'state',defaultContent: '-' },
        { data: 'qualification',defaultContent: '-' },
        { data: 'registration_no',defaultContent: '-' },
        { data: 'block_days_from',defaultContent: '-' },
        { data: 'block_days_to',defaultContent: '-' },
        { data: 'block_days_from_time',defaultContent: '-' },
        { data: 'block_days_to_time',defaultContent: '-' },
        { data: 'branch',defaultContent: '-' },
        { data: 'fee',defaultContent: '-' },
        { data: 'block_days',defaultContent: '-' },
        { data: 'status',defaultContent: '-' },
        { data: 'created_by',defaultContent: '-' },
        {
          data: 'action',
          "targets": 22,
          createdCell: (td, cellData, rowData, row, col) =>
            ReactDOM.render(
              [
                <div className='d-flex'>
                    <button onClick={()=> {handleShow(); getDataID(rowData.id);setEditId(rowData.id);}} style={{ backgroundColor:'#1CE5E5',color:'#000', borderColor:'#1CE5E5',fontFamily:'math',cursor:'pointer', marginRight:'5px' }} size={25}>View</button>
                    <button onClick={()=> {handleShowReturn(); getDataID(rowData.id);setEditId(rowData.id);}} style={{ backgroundColor:'#FFF002',color:'#000', borderColor:'#FFF002',fontFamily:'math',cursor:'pointer', marginRight:'5px' }} size={25}>Return</button>
                    <FaRegEdit onClick={()=> {handleShow(); getDataID(rowData.id);setEditId(rowData.id);}} style={{ color: 'green', cursor: 'pointer' }} size={25} />
                    <MdDelete onClick={()=> {deleteDocterMaster(rowData.id)}} style={{ color: 'red', cursor: 'pointer' }} size={28} />
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


  const deleteDocterMaster = async (id) => {
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
          try {
            await fetch(`https://euctostaging.com/prolife/api/masters/doctor/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                id: id 
              })
            });
  
            setTableData(tableData.filter((res) => res.id !== id));
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
            <div style={{textAlign:'end', marginBottom:'20px'}}>
              <NavLink to='/Main/Pharmacy/SalesTableForm'>
              <Button style={{backgroundColor:'#CCA047', color:'white'}}><PiTargetDuotone className='mr-2'/>Create Bill</Button></NavLink><hr/>
            </div>
 {/*-------------------------------- Model for Return ------------------------------- */}
    <Modal show={showReturn} onHide={handleCloseReturn} size="xl">
        <Modal.Header style={{fontFamily:'sans-serif', color:'white', backgroundColor:'#000'}}>
          <Modal.Title style={{fontFamily:'sans-serif'}}><FaRotate className='mr-2 mb-1'/>Return Pharmacy Sales</Modal.Title>
        </Modal.Header>
        <Form> 
        <Modal.Body>
        <Form>
          <Row>
            <Col>
                <Form.Group>
                  <Form.Label>Mode Of Payment</Form.Label>
                  <Select
                  isMulti
                  name="colors"
                  options={dummyData}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleSelectChange} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                  <Form.Label>Bill Number</Form.Label>
                  <Form.Control type='text'  />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                  <Form.Label>Total Amount</Form.Label>
                  <Form.Control type='number'  />
                </Form.Group>
            </Col>
          </Row>

 {/* Select Box Open Input */}
 {/* <div style={{ borderRadius: '10px', border: '1px solid #000', marginTop: '10px' }} className='container'> */}
      {selectedOption && selectedOption.some((option) => option.value === 'Cash') && (
        <div className='py-3'>
          <Form.Label style={{fontFamily:'sans-serif'}}>Cash Amount</Form.Label>
          <Form.Control type="number" placeholder="Enter cash amount" style={{width:'30%'}} />
        </div>
      )}

      {selectedOption && selectedOption.some((option) => option.value === 'Card') && (
        <div className='py-3'>
          <Row>
        <Col>
          <Form.Label style={{fontFamily:'sans-serif'}}>Card Number</Form.Label>
          <Form.Control type="text" placeholder="Enter card number" />
        </Col>
        <Col>
          <Form.Label style={{fontFamily:'sans-serif'}}>Bank Name</Form.Label>
          <Form.Control type="text" placeholder="Enter bank name" />
        </Col>
        <Col>
          <Form.Label style={{fontFamily:'sans-serif'}}>Card Amount</Form.Label>
          <Form.Control type="number" placeholder="Enter card amount" />
        </Col>
        </Row>
        </div>
      )}

      {selectedOption && selectedOption.some((option) => option.value === 'UPI') && (
        <div className='py-3'>
          <Row>
        <Col>
          <Form.Label style={{fontFamily:'sans-serif'}}>Transaction ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Transaction ID" />
        </Col>
        <Col>
          <Form.Label style={{fontFamily:'sans-serif'}}>UPI Amount</Form.Label>
          <Form.Control type="text" placeholder="Enter UPI Amount" />
        </Col>
        </Row>
        </div>
      )}

      {selectedOption && selectedOption.some((option) => option.value === 'Neft') && (
        <div className='py-3'>
          <Row>
        <Col>
          <Form.Label style={{fontFamily:'sans-serif'}}>Transaction ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Transaction ID" />
        </Col>
        <Col>
          <Form.Label style={{fontFamily:'sans-serif'}}>Neft Amount</Form.Label>
          <Form.Control type="text" placeholder="Enter Neft Amount" />
        </Col>
        </Row>
        </div>
      )}

      {/* </div> */}

{/* ------------- Table ------------------------ */}
 <hr/><div className='pt-2'>
 <Table striped bordered hover responsive>
      <thead style={{backgroundColor:'#4E4E4D', color:'#ffff'}}>
        <tr>
          <th>S.NO</th>
          <th>PRODUCT</th>
          <th>RT</th>
          <th>DAMT</th>
          <th>RETURN Qty</th>
          <th>RETURN DAMT</th>
          <th>MFG</th>
          <th>EXP DATE</th>
          <th>BATCH NUMBER</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><input type='text' /></td>
          <td><input type='text' /></td>
          <td><input type='text' /></td>
          <td><input type='text' /></td>
          <td><input type='text' /></td>
          <td><input type='text' /></td>
          <td><input type='text' /></td>
          <td><input type='text' /></td>
        </tr>
      </tbody>
    </Table>
 </div>

{/* ------------- Table ------------------------ */}
          </Form>
        </Modal.Body>
        </Form> 
        <Modal.Footer  style={{justifyContent: 'center' }}>
          <Button variant="secondary" onClick={handleCloseReturn}>
            Close
          </Button>
          <Button variant="success" onClick={editDoctor}>
          Return Now
          </Button>
        </Modal.Footer>
           </Modal>

 {/*-------------------------------- Model for Return ------------------------------- */}
            {/* Model for Edit */}
            <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Doctor Details</Modal.Title>
        </Modal.Header>
        <Form> 
        <Modal.Body>
          <div>
          <Form.Control  value={editId} type="hidden"  />
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Designation</Form.Label>
              <Form.Control value={editDesignation} onChange={(e)=> setEditDesignation(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Name</Form.Label>
              <Form.Control value={editName} onChange={(e)=> setEditName(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Email</Form.Label>
              <Form.Control value={editEmail} onChange={(e)=> setEditEmail(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Mobile</Form.Label>
              <Form.Control value={editMobile} onChange={(e)=> setEditMobile(e.target.value)} type="number" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>What's App Number</Form.Label>
              <Form.Control value={editWhatappNum} onChange={(e)=> setEditWhatappNum(e.target.value) } type="number" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Prolife Doctor</Form.Label>
              <Form.Control value={editProlifeDoctor} onChange={(e)=> setEditProlifeDoctor(e.target.value)} as="select">
               <option value='' >--Select--</option>
               <option value="Yes">YES</option>
               <option value="No">NO</option>
               </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Referral Doctor</Form.Label>
              <Form.Control value={editReferral} onChange={(e)=> setEditReferral(e.target.value)} as="select">
               <option value='' >--Select--</option>
               <option value="Yes">YES</option>
               <option value="No">NO</option>
               </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>On Call Consultant</Form.Label>
              <Form.Control value={editOnConsultant} onChange={(e)=> setEditOnConsultant(e.target.value)} as="select">
              <option value='' >--Select--</option>
               <option value="Yes">YES</option>
               <option value="No">NO</option>
               </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>City</Form.Label>
              <Form.Control value={editCity} onChange={(e)=> setEditCity(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>State</Form.Label>
              <Form.Control value={editState} onChange={(e)=> setEditState(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Qualification</Form.Label>
              <Form.Control value={editQualification} onChange={(e)=> setEditQualification(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Registration no</Form.Label>
              <Form.Control value={editRegistration} onChange={(e)=> setEditRegistration(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Block Date From</Form.Label>
              <DatePicker
                      placeholderText="DD/MM/YYYY"
                      selected={selectedDateFrom}
                      onChange={handleDateChangeFrom}
                      value={editBlockDateFrom}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                      showMonthDropdown
                      scrollableMonthYearDropdown
                      customInput={
                        <input type="text" id="txtDate" placeholderText="Select a date" name="SelectedDate" readOnly  style={{ cursor: 'pointer',height: '40px', width: '100%'}}/>}/>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Block Date To</Form.Label>
              <DatePicker
                      placeholderText="DD/MM/YYYY"
                      selected={selectedDateTo}
                      onChange={handleDateChangeTo}
                      value={editBlockDateTo}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                      showMonthDropdown
                      scrollableMonthYearDropdown
                      customInput={
                        <input type="text" id="txtDate" placeholderText="Select a date" name="SelectedDate" readOnly  style={{ cursor: 'pointer',height: '40px', width: '100%'}}/>}/>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Block Time From</Form.Label>
               <Form.Control value={editBlockTimeFrom} onChange={(e)=> setEditBlockTimeFrom(e.target.value)} type='text' />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Block Time To</Form.Label>
              <Form.Control value={editBlockTimeTo} onChange={(e)=> setEditBlockTimeFrom(e.target.value)} type='text' />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Branch</Form.Label>
              <Form.Control value={editBranch} onChange={(e)=> setEditBlockTimeTo(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Fee</Form.Label>
              <Form.Control value={editFee} onChange={(e)=> setEditFee(e.target.value)} type="number" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Block Days</Form.Label>
              <Form.Control value={editBlockDays} onChange={(e)=> setEditBlockDays(e.target.value) } type="text" />
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
            {/* Model for Edit */}
            {/* Table  */}
            <div>
              <div className="MainDiv">
                {isLoading ? (
                  <div className='text-center'><h5>Loading... Thank you for your patience </h5></div>
                ) : (
                  <Table striped bordered hover responsive id="registaion" className="display">
                    <thead>
                    <tr>
                        <th>Doctor Code</th>
                        <th>Designation</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Whatsapp no</th>
                        <th>Prolife Doctor</th>
                        <th>Referral Doctor</th>
                        <th>On_call Consultant</th>
                        <th>city</th>
                        <th>State</th>
                        <th>Qualification</th>
                        <th>Registration No</th>
                        <th>Block Date From</th>
                        <th>Block Date To</th>
                        <th>Block Time From</th>
                        <th>Block Time To</th>
                        <th>Branch</th>
                        <th>Fee</th>
                        <th>Block Days</th>
                        <th>Status</th>
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

export default SalesTable


