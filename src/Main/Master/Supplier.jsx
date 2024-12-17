import React, { useEffect, useState } from 'react';
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
import ReactDOM from 'react-dom';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import Navbarall from '../Navbarall';
import { NavLink } from 'react-router-dom';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { MdMedicalServices } from 'react-icons/md';

const Supplier = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [supplier, setSupplier] = useState([]);
  const [editId, setEditId] = useState('')
  const [editCode, setEditCode] = useState('')
  const [editSupplierName, setEditSupplierName] = useState('')
  const [editSupplierNumber, setEditSupplierNumber] = useState('')
  const [editSupplierAddress, setEditSupplierAddress] = useState('')
  const [editSupplierEmailID , setEditSupplierEmailID ] = useState('')
  const [editSupplierPostalID , setEditSupplierPostalID ] = useState('')
  const [editContactPerson , setEditContactPerson ] = useState('')
  const [editMobile , setEditMobile] = useState('')
  const [editSupplierTINNumber , setEditSupplierTINNumber ] = useState('')
  const [editSupplierCST , setEditSupplierCST ] = useState('')
  const [editSupplierDLNO , setEditSupplierDLNO ] = useState('')
  const [editSupplierGSTINNumber , setEditSupplierGSTINNumber ] = useState('')
  const [editSupplierStateCode , setEditSupplierStateCode ] = useState('')
  const [editSupplierStateName , setEditSupplierStateName ] = useState('')
  const [editSupplierPaymentAfter , setEditSupplierPaymentAfter ] = useState('')


//Insert View Table
  useEffect(() => {
    fetch('https://euctostaging.com/prolife/api/masters/supplier')
      .then((response) => response.json())
      .then((data) => {
        setSupplier(data);
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
      data: supplier, 
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
          targets: 15,
        }
      ],
      columns: [
        { data: 'sup_code',defaultContent: '-' },
        { data: 'sup_name',defaultContent: '-' },
        { data: 'sup_phone',defaultContent: '-' },
        { data: 'sup_email',defaultContent: '-' },
        { data: 'sup_pin',defaultContent: '-' },
        { data: 'contact_person',defaultContent: '-' },
        { data: 'TIN_no',defaultContent: '-' },
        { data: 'CST',defaultContent: '-' },
        { data: 'DL_no',defaultContent: '-' },
        { data: 'GSTIN_num',defaultContent: '-' },
        { data: 'state_code',defaultContent: '-' },
        { data: 'state_name',defaultContent: '-' },
        { data: 'payment_after',defaultContent: '-' },
        { data: 'status',defaultContent: '-' },
        { data: 'created_by',defaultContent: '-' },
        {
          data: 'action',
          "targets": 15,
          createdCell: (td, cellData, rowData, row, col) =>
            ReactDOM.render(
              [ 
                <FaRegEdit onClick={()=> {handleShow(); getDataID(rowData.id);setEditId(rowData.id);}} style={{color:'green', cursor:'pointer'}} size={25} />,
                <MdDelete onClick={()=> {deleteSupplierMaster(rowData.id)}} style={{color:'red', cursor:'pointer'}}  size={28} />,
              ],
              td
            ),
        },
      ],
    });
  };

  useEffect(() => {
    if (!isLoading && supplier.length > 0) {
      initDataTable();
    }
    
  }, [isLoading, supplier]);

  const getDataID = async (datid)=>{
    try{
      const response = await fetch(`https://euctostaging.com/prolife/api/masters/supplier/${datid}`,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      const {
        id ,
        sup_code ,
        sup_name ,
        sup_address ,
        sup_phone ,
        sup_email, 
        sup_pin ,
        contact_person, 
        mobile, 
        TIN_no, 
        CST ,
        DL_no ,
        GSTIN_num, 
        state_code, 
        state_name ,
        payment_after ,
      } = data;
  
      setEditId(id);
      setEditCode(sup_code);
      setEditSupplierName(sup_name);
      setEditSupplierNumber(sup_address);
      setEditSupplierAddress(sup_phone);
      setEditSupplierEmailID(sup_email); 
      setEditSupplierPostalID (sup_pin);
      setEditContactPerson (contact_person);
      setEditMobile(mobile);
      setEditSupplierTINNumber(TIN_no); 
      setEditSupplierCST (CST);
      setEditSupplierDLNO(DL_no); 
      setEditSupplierGSTINNumber(GSTIN_num); 
      setEditSupplierStateCode (state_code);
      setEditSupplierStateName (state_name);
      setEditSupplierPaymentAfter (payment_after);
  
    }catch(error){
      console.log('Error fetching data for id:', datid, error);
    }
   }  

   const deleteSupplierMaster = async (id) => {
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
            await fetch(`https://euctostaging.com/prolife/api/masters/supplier/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                id: id 
              })
            }); 
            setSupplier(supplier.filter((res) => res.id !== id));
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

  const editDoctor = async () => {
    try {
      const response = await fetch(`https://euctostaging.com/prolife/api/masters/supplier/update/${editId}    `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editId,
          sup_code:editCode  ,
          sup_name: editSupplierName ,
          sup_address: editSupplierNumber ,
          sup_phone: editSupplierAddress ,
          sup_email:editSupplierEmailID , 
          sup_pin:editSupplierPostalID  ,
          contact_person: editContactPerson, 
          mobile: editMobile, 
          TIN_no: editSupplierTINNumber, 
          CST: editSupplierCST ,
          DL_no : editSupplierDLNO,
          GSTIN_num: editSupplierGSTINNumber, 
          state_code:editSupplierStateCode , 
          state_name:  editSupplierStateName,
          payment_after : editSupplierPaymentAfter,
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
          title: 'Supplier updated successfully !',
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

  return (
    <div>
      <Navbarall/>
      <div className='py-4 px-5'>
        <div style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
          <div className='px-5 py-3'>
            <div style={{textAlign:'end', marginBottom:'20px'}}>
              <NavLink to='/Main/Master/SupplierForm'>
              <Button style={{backgroundColor:'#CCA047', color:'white'}}><MdMedicalServices className='mr-2'/>Add Supplier</Button></NavLink><hr/>
            </div>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Supplier Details</Modal.Title>
        </Modal.Header>
        <Form> 
        <Modal.Body>
          <div>
          <Form.Control  value={editId} type="hidden"  />
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Supplier Code</Form.Label>
              <Form.Control value={editCode} onChange={(e)=> setEditCode(e.target.value)} type="text" readOnly />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Supplier Name</Form.Label>
              <Form.Control value={editSupplierName} onChange={(e)=> setEditSupplierName(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Supplier Phone Number</Form.Label>
              <Form.Control value={editSupplierNumber} onChange={(e)=> setEditSupplierNumber(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Supplier Address Line 1</Form.Label>
              <Form.Control value={editSupplierAddress} onChange={(e)=> setEditSupplierAddress(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Supplier Address Line 2</Form.Label>
              <Form.Control value={editSupplierAddress} onChange={(e)=> setEditSupplierAddress(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Email ID</Form.Label>
              <Form.Control value={editSupplierEmailID} onChange={(e)=> setEditSupplierEmailID(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Postal ID</Form.Label>
              <Form.Control value={editSupplierPostalID} onChange={(e)=> setEditSupplierPostalID(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Contact Person</Form.Label>
              <Form.Control value={editContactPerson} onChange={(e)=> setEditContactPerson(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Mobile Number</Form.Label>
              <Form.Control value={editMobile} onChange={(e)=> setEditMobile(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>TIN Number</Form.Label>
              <Form.Control value={editSupplierTINNumber} onChange={(e)=> setEditSupplierTINNumber(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>CST</Form.Label>
              <Form.Control value={editSupplierCST} onChange={(e)=> setEditSupplierCST(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>DL NO</Form.Label>
              <Form.Control value={editSupplierDLNO} onChange={(e)=> setEditSupplierDLNO(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>GSTIN Number</Form.Label>
              <Form.Control value={editSupplierGSTINNumber} onChange={(e)=> setEditSupplierGSTINNumber(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'> State Code</Form.Label>
              <Form.Control value={editSupplierStateCode} onChange={(e)=> setEditSupplierStateCode(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>State Name</Form.Label>
              <Form.Control value={editSupplierStateName} onChange={(e)=> setEditSupplierStateName(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Payment After</Form.Label>
              <Form.Control value={editSupplierPaymentAfter} onChange={(e)=> setEditSupplierPaymentAfter(e.target.value)} type="text" />
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
                        <th>Supplier Code</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email ID</th>
                        <th>Postal ID</th>
                        <th>Contact Person</th>
                        <th>TIN Number</th>
                        <th>CST</th>
                        <th>DL NO</th>
                        <th>GSTIN Number</th>
                        <th>State Code</th>
                        <th>State Name</th>
                        <th>Payment After</th>
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

export default Supplier



