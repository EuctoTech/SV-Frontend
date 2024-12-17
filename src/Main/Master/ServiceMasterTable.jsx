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
import {Table,Button,Modal,Form} from 'react-bootstrap';
import {MdMedicalServices} from 'react-icons/md'
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';



const ServiceMasterTable = () => {
  const [service, setService] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [editId, setEditId] = useState('');
  const [editServiceCategoryName, setEditServiceCategoryName] = useState('')
  const [editServiceCategoryNCode, setEditServiceCategoryNCode] = useState('')
  const [editServiceSubCategoryName, setEditServiceSubCategoryName] = useState('')
  const [editServiceSubCategoryNCode, setEditServiceSubCategoryNCode] = useState('')
  const [editOPIP, seteditOPIP] = useState('')
  const [editRate, setEditRate] = useState('')
  const [editDoctorShare, setEditDoctorShare] = useState('')
  const [editHospitalShare, setEditHospitalShare] = useState('')
  const [editServiceName,setEditServiceName] = useState('')



//Insert View Table
  useEffect(() => {
    fetch('https://euctostaging.com/prolife/api/masters/service')
      .then((response) => response.json())
      .then((data) => {
        setService(data);
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
      data: service, 
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
          targets: 13,
        }
      ],
      columns: [
        { data: 'service_code',defaultContent: '-' },
        { data: 'service_category',defaultContent: '-' },
        { data: 'service_category_code',defaultContent: '-' },
        // { data: 'service_category',defaultContent: '-' },
        { data: 'service_sub_category',defaultContent: '-' },
        { data: 'service_sub_category_code',defaultContent: '-' },
        // { data: 'service_category',defaultContent: '-' },
        { data: 'op_ip',defaultContent: '-' },
        { data: 'rate',defaultContent: '-' },
        { data: 'branch',defaultContent: '-' },
        { data: 'dr_share',defaultContent: '-' },
        { data: 'hr_share',defaultContent: '-' },
        { data: 'service_name',defaultContent: '-' },
        { data: 'status',defaultContent: '-' },
        { data: 'created_by',defaultContent: '-' },
        {
          data: 'action',
          "targets": 13,
          createdCell: (td, cellData, rowData, row, col) =>
            ReactDOM.render(
              [ 
                <FaRegEdit onClick={()=> {handleShow(); getDataID(rowData.id);setEditId(rowData.id);}} style={{color:'green', cursor:'pointer'}} size={25} />,
                <MdDelete onClick={()=> {deleteServiceMaster(rowData.id)}} style={{color:'red', cursor:'pointer'}}  size={28} />,
              ],
              td
            ),
        },
      ],
    });
  };

  useEffect(() => {
    if (!isLoading && service.length > 0) {
      initDataTable();
    }
    
  }, [isLoading, service]);

  const deleteServiceMaster = async (id) => {
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
            await fetch(`https://euctostaging.com/prolife/api/masters/service/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                id: id 
              })
            });
  
            setService(service.filter((res) => res.id !== id));
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

  const getDataID = async (datid)=>{
    try{
      const response = await fetch(`https://euctostaging.com/prolife/api/masters/service/${datid}`,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      const {
        id,
        service_category,
        service_category_code,
        service_sub_category,
        service_sub_category_code,
        op_ip,
        rate,
        dr_share,
        hr_share,
        service_name,
      } = data;
  
      setEditId(id);
      setEditServiceCategoryName(service_category);
      setEditServiceCategoryNCode(service_category_code);
      setEditServiceSubCategoryName(service_sub_category);
      setEditServiceSubCategoryNCode(service_sub_category_code);
      seteditOPIP(op_ip);
      setEditRate(rate);
      setEditDoctorShare(dr_share);
      setEditHospitalShare(hr_share);
      setEditServiceName(service_name);
  
    }catch(error){
      console.log('Error fetching data for id:', datid, error);
    }
   }  

    //Edit Table  
const editService = async () => {
  try {
    const response = await fetch(`https://euctostaging.com/prolife/api/masters/service/update/${editId} `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: editId,
        service_category:editServiceCategoryName,
        service_category_code:editServiceCategoryNCode,
        service_sub_category:editServiceSubCategoryName,
        service_sub_category_code:editServiceSubCategoryNCode,
        op_ip: editOPIP,
        rate:editRate, 
        dr_share: editDoctorShare,
        hr_share: editHospitalShare,
        service_name: editServiceName,
      }),
    });
    const data = await response.json();
    console.log(data);
    handleClose();
    //  $('#registaion').DataTable().ajax.reload(null, false);
    if (response.ok) {
      // Successfully updated, reload the table
     await initDataTable(); 
      Swal.fire({
        icon: 'success',
        title: 'Service updated successfully !',
        showConfirmButton: false,
        timer: 1800,
      })
      .then(() => {
        window.location.reload(); 
           });

    } else {
      Swal.fire('Error', 'Failed to update the Service.', 'error');
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
              <NavLink to='/Main/Master/ServiceMaster'>
              <Button style={{backgroundColor:'#CCA047', color:'white'}}><MdMedicalServices className='mr-2'/>Add Service</Button></NavLink><hr/>
            </div>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Service Details</Modal.Title>
        </Modal.Header>
        <Form> 
        <Modal.Body>
          <div>
          <Form.Control value={editId}  type="hidden"  />
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>New Service Category Name</Form.Label>
              <Form.Control value={editServiceCategoryName} onChange={(e)=> setEditServiceCategoryName(e.target.value)}  type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>New Service Category Code</Form.Label>
              <Form.Control value={editServiceCategoryNCode} onChange={(e)=> setEditServiceCategoryNCode(e.target.value)}  type="text" />
            </Form.Group>
            {/* <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Service Category</Form.Label>
              <Form.Control  as="select">
               <option value='' >--Select--</option>
               <option value="Yes">YES</option>
               <option value="No">NO</option>
               </Form.Control>
            </Form.Group> */}
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>New Service Sub Category Name</Form.Label>
              <Form.Control value={editServiceSubCategoryName} onChange={(e)=> setEditServiceSubCategoryName(e.target.value) }  type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>New Service Sub Category Code</Form.Label>
              <Form.Control value={editServiceSubCategoryNCode} onChange={(e)=>setEditServiceSubCategoryNCode(e.target.value)} type="text" />
            </Form.Group>
            {/* <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Service Sub Category</Form.Label>
              <Form.Control as="select">
               <option value='' >--Select--</option>
               <option value="Yes">YES</option>
               <option value="No">NO</option>
               </Form.Control>
            </Form.Group> */}
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>OP/IP</Form.Label>
              <Form.Control value={editOPIP} onChange={(e)=> seteditOPIP(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Rate</Form.Label>
              <Form.Control value={editRate} onChange={(e)=> setEditRate(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Branch</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Doctor Share Amount</Form.Label>
              <Form.Control  value={editDoctorShare} onChange={(e)=>setEditDoctorShare(e.target.value) }type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Hospital Share amount</Form.Label>
              <Form.Control  value={editHospitalShare} onChange={(e)=>setEditHospitalShare(e.target.value) } type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Service Name</Form.Label>
              <Form.Control  value={editServiceName} onChange={(e)=>setEditServiceName(e.target.value) }  type="text" />
            </Form.Group>
          </div>
           
        </Modal.Body>
        </Form> 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editService}>
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
                        <th>Service Code</th>
                        <th>Service Category Name</th>
                        <th>Service Category Code</th>
                        {/* <th>Service Category</th> */}
                        <th>Service Sub Category Name</th>
                        <th>Service Sub Category Code</th>
                        {/* <th>Service Sub Category</th>*/}
                        <th>OP/IP</th> 
                        <th>Rate</th>
                        <th>Branch</th>
                        <th>Doctor Share Amount</th>
                        <th>Hospital Share amount</th>
                        <th>Service Name</th>
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

export default ServiceMasterTable


