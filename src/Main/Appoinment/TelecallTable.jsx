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
import {FaSearchengin} from 'react-icons/fa'
import { MdDelete ,MdWifiCalling} from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import PieChatTeleCall from '../Appoinment/PieChatTeleCall'


const TelecallTable = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState(null)
  const [selectedDateTo, setSelectedDateTo] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const [editId, setEditId] = useState('');
  const [editPatientName, setEditPatientName] = useState('')
  const [editContact, setEditContact] = useState('')
  const [editRemarks, setEditRemarks] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [editQueryReason, setEditQueryReason] = useState('')
  const [editQueryresponse, setEditQueryresponse] = useState('')
  const [editResolutionStatus, setEditResolutionStatus] = useState('')
  const [editPatientId, setEditPatientId] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  
  const handleDateChangeFrom = (date) => {
    setSelectedDateFrom(date);
    // setNewDob(date.toLocaleDateString())
  };
  const handleDateChangeTO = (date) => {
    setSelectedDateTo(date);
    // setNewDob(date.toLocaleDateString())
  };


  const handleFilter = async () => {
    try {
      let apiUrl = 'https://euctostaging.com/prolife/api/telecall';
  
      // Check if from and to dates are available
      const IselectedDateFrom =selectedDateFrom; // Default fromDate
      const IselectedDateTo =selectedDateTo;
       if (IselectedDateFrom && IselectedDateTo) {
        const fromDate = formatDateToYYYYMMDD(selectedDateFrom); // Default fromDate
        const toDate = formatDateToYYYYMMDD(selectedDateTo);   // Default toDate
        apiUrl = `${apiUrl}?fromDate=${fromDate}&toDate=${toDate}`;
      }
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setTableData(data);
          setIsLoading(false);
  
          // Use the DataTables API to clear and redraw the table
          const table = $("#registaion").DataTable();
          table.clear().rows.add(data).draw();
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Error fetching data:', error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  

  
  function formatDateToYYYYMMDD(inputDate) {
    // Parse the input date string
    const parsedDate = new Date(inputDate);
  
    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      // Invalid date, return null or handle the error as needed
      return null;
    }
  
    // Get year, month, and day components
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
    const day = String(parsedDate.getDate()).padStart(2, '0');
  
    // Create the formatted date string in 'YYYY-MM-DD' format
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }
  
  useEffect(() => {
    initDataTable();
  }, [isLoading, tableData]);
 

  const initDataTable = () => {
    // handleFilter();
    try {
      const table = $('#registaion').DataTable({
      destroy: true,
      processing: false,
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
        {
          extend: 'excel',
          className: 'btn btn-warning',
        },
        
      ],
      searching: true,
        columnDefs: [
          {
            data: 'resolution_status',
            defaultContent: '-',
            targets: 6, // Assuming 'resolution_status' is in the 5th column
            createdCell: function (td, cellData, rowData, row, col) {
              if (cellData === 'pending') {
                $(td).css('background-color', 'lightcoral');
              } else if (cellData === 'resolved') {
                $(td).css('background-color', 'lightgreen');
              }
            },
          },
        {
          data: 'action',
          defaultContent: "<button>Edit</button>",
          targets: 10
        }
      ],
      columns: [
        { data: 'Patient_name',defaultContent: '-' },
        { data: 'contact',defaultContent: '-' },
        { data: 'remarks',defaultContent: '-' },
        { data: 'Category',defaultContent: '-' },
        { data: 'query_reason',defaultContent: '-' },
        { data: 'branch',defaultContent: '-' },
        { data: 'resolution_status',defaultContent: '-' },
        { data: 'created_by',defaultContent: '-' },
        {
          data: 'created_at',
          defaultContent: '-',

        render: function(data, type, full, meta) {
          if (type === 'display') {
            const date = new Date(data);
            return date.toLocaleString(); 
          }
          return data;
          }
        
        },
        {
          data: 'updated_at',
          defaultContent: '-',
          render: function (data, type, full, meta) {
          if (type === 'display') {
            const date = new Date(data);
            return date.toLocaleString(); 
          }
          return data;
          }
        
      },
        {
          data: 'action',
          "targets": 10,
          createdCell: (td, cellData, rowData, row, col) =>
            ReactDOM.render(
              [
                <div className='text-center'>
                  <FaRegEdit onClick={()=> {handleShow(); getDataID(rowData.id);setEditId(rowData.id);}} style={{ color: 'green', cursor: 'pointer' }} size={25} />
                </div>,
              ],
              td
            ),
        },
        ],
      
    }); table.clear().rows.add(tableData).draw();
  } catch (error) {
    console.error('Error initializing DataTable:', error);
  }
  };

  // useEffect(() => {
  //   // if (!isLoading && tableData.length > 0) {
  //     initDataTable();
  //   // }
    
  // }, [isLoading, tableData]);




 //Edit Table
 const editDoctor = async (event) => {
   event.preventDefault();
   try { 
    const response = await fetch(`https://euctostaging.com/prolife/api/telecall/update/${editId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: editId,
        Patient_id: editPatientId,
        Patient_name:editPatientName,
        contact:editContact,
        remarks:editRemarks,
        Category:editCategory,
        query_reason:editQueryReason,
        resolution_status: editResolutionStatus,
        response:editQueryresponse,

      }),
    });
    const data = await response.json();
    console.log(data);
    handleClose();
    if (response.ok) {
      await initDataTable(); 

      // table.ajax.reload();
      Swal.fire({
        icon: 'success',
        title: 'Telecall updated successfully!',
        showConfirmButton: false,
        timer: 1800,
      })
      .then(() => {
        // window.location.reload(); 
           });

    } else {
      Swal.fire('Error', 'Failed to update the Telecall.', 'error');
    }
  } catch (error) {
    console.error('Error updating item:', error);
    Swal.fire('Error', 'An error occurred while updating the item.', 'error');
  }
} 

 const getDataID = async (datid)=>{
  try{
    const responseq = await fetch(`https://euctostaging.com/prolife/api/telecall/${datid}`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
      },
    });
    const data = await responseq.json();

    const {
      id,
      Patient_name,
      Patient_id,
      contact,
      remarks,
      Category,
      query_reason,
      resolution_status,
      response
    } = data;

    setEditId(id);
    setEditPatientId(Patient_id);
    setEditPatientName(Patient_name);
    setEditContact(contact);
    setEditRemarks(remarks);
    setEditCategory(Category);
    setEditQueryReason(query_reason);
    setEditQueryresponse(response);

    setEditResolutionStatus(resolution_status);

  }catch(error){
    console.log('Error fetching data for id:', datid, error);
  }
 }  
 useEffect(() => {
  // Fetch initial data when the component mounts
  handleFilter();
  // fetchCountData();
}, []);

  return (
    <div>
      <Navbarall/>
      <div className='py-4 px-5'>
        <div style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
          <div className='px-5 py-3'>
            <div style={{textAlign:'end', marginBottom:'20px'}}>
              <NavLink to='/Main/Appoinment/TelecallForm'>
              <Button style={{backgroundColor:'#CCA047', color:'white'}}><MdWifiCalling className='mr-2'/>Add Telecalls</Button></NavLink><hr/>
            </div>

      {/* ---------- Filter and Pie chat ---------------- */}
      <div >
        <div style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
          <Row className='py-4 px-5'>
            <Col style={{borderRight: '1px solid #000'}}>
              <Form>
               <Form.Group className='d-grid'>
                  <Form.Label style={{width: '100%'}}>From</Form.Label>
                  <DatePicker
                      placeholderText="DD/MM/YYYY"
                      selected={selectedDateFrom}
                      onChange={handleDateChangeFrom}
                      // value={newDob}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                      showMonthDropdown
                      scrollableMonthYearDropdown
                      customInput={
                        <input
                         type="text" id="txtDate" name="SelectedDate"   style={{ cursor: 'pointer', width:'100%', height:'35px' }}/>
                      }/>
                </Form.Group>
               <Form.Group className='d-grid pt-4'>
                  <Form.Label style={{width: '100%'}}>To</Form.Label>
                  <DatePicker
                      placeholderText="DD/MM/YYYY"
                      selected={selectedDateTo}
                      onChange={handleDateChangeTO}
                      // value={newDob}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                      showMonthDropdown
                      scrollableMonthYearDropdown
                      customInput={
                        <input
                         type="text" id="txtDate" name="SelectedDate"   style={{ cursor: 'pointer', width:'100%', height:'35px' }}/>
                      }/>
                </Form.Group>
                <div className='pt-3 text-center'>
                  <Button style={{backgroundColor:'#6D5DA8'}} onClick={handleFilter}><FaSearchengin className='mr-2' />Search</Button>
                </div>
              </Form>
            </Col>
            <Col>
            <div className='py-3'>
                        <PieChatTeleCall style={{height:'250px'}}/>
                    </div>
            </Col>
          </Row>
        </div>
      </div><hr/>
      {/* ---------- Filter and Pie chat ---------------- */}
      {/* ---------- Model ------------------------*/}
            <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Telecalls Details</Modal.Title>
        </Modal.Header>
        <Form> 
        <Modal.Body>
{/* ---------- Model ------------------------*/}
          <div>
          <Form.Control  value={editId} type="hidden"  />
          <div className='py-2 px-2' style={{ borderRadius: '10px', border: '1px solid #000', backgroundColor: editResolutionStatus === 'pending' ? '#F9AEAE' : editResolutionStatus === 'resolved' ? '#DFEEBE' : 'inherit' }}>
            <Form.Group className="mb-2">
                <h5 style={{fontFamily: "math"}} className='mb-2'>Resolution Status</h5>
                <Form.Control value={editResolutionStatus} onChange={(e)=>setEditResolutionStatus(e.target.value) } as='select'>
                  {/* <option value='' disabled>--select--</option> */}
                  <option value='pending'>pending</option>
                  <option value='resolved'>resolved </option>
                </Form.Control>
              </Form.Group>
          </div>
            <Form.Group className="mb-2 mt-3">
              <Form.Label className='mb-0' >Patient ID</Form.Label>
              <Form.Control  disabled readOnly value={editPatientId} onChange={(e)=> setEditPatientId(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2 mt-3">
              <Form.Label className='mb-0'>Patient Name</Form.Label>
              <Form.Control value={editPatientName} onChange={(e)=> setEditPatientName(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Contact No</Form.Label>
              <Form.Control value={editContact} onChange={(e)=> setEditContact(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Query Category</Form.Label>
              <Form.Control value={editCategory}
               onChange={(e)=>setEditCategory(e.target.value)} as='select'>
                <option value='' disabled>--select--</option>
                <option value='Gynec'>Gynec</option>
                <option value='Fertility'>Fertility</option>
                <option value='Obs'>Obs</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Query Reason</Form.Label>
                      <Form.Control
                        value={editQueryReason} onChange={(e) => setEditQueryReason(e.target.value)} type="text" />
                    </Form.Group>
                    <Form.Group className="mb-2 mt-4">
  <Form.Label className='mb-2'>Record the patient's response</Form.Label>
  <textarea
     value={editQueryresponse}
    onChange={(e) => setEditQueryresponse(e.target.value)}
    className="form-control"
    style={{backgroundColor:'#ECECEC',width:'100%', height: '120px'}}></textarea>
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
                        <th>Patient Name</th>
                        <th>Contact</th>
                        <th>Remarks</th>
                        <th>Category</th>
                        <th>Query Reason</th>
                        <th>Branch</th>
                        <th>Resolution Status</th>
                        <th>Created By</th>
                        <th>Created Date</th>
                        <th>Updated Date</th>
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


export default TelecallTable

















// import React,{useEffect,useState} from 'react';
// import Navbarall from '../Navbarall';
// //Datatable Modules
// import $ from 'jquery'; 
// import 'jquery/dist/jquery.min.js';
// import "datatables.net/js/jquery.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
// import "datatables.net-buttons/js/dataTables.buttons.js"
// import "datatables.net-buttons/js/buttons.colVis.js"
// import "datatables.net-buttons/js/buttons.flash.js"
// import "datatables.net-buttons/js/buttons.html5.js"
// import "datatables.net-buttons/js/buttons.print.js"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
// import {NavLink} from 'react-router-dom'
// import {Table,Button,Modal,Form,Row,Col} from 'react-bootstrap';
// import {FaSearchengin} from 'react-icons/fa'
// import { MdDelete ,MdWifiCalling} from 'react-icons/md';
// import { FaRegEdit } from 'react-icons/fa';
// import ReactDOM from 'react-dom';
// import Swal from 'sweetalert2'
// import DatePicker from 'react-datepicker';
// import { TimePicker } from 'antd';
// import dayjs from 'dayjs';
// import PieChatTeleCall from '../Appoinment/PieChatTeleCall'


// const TelecallTable = () => {
//   const [tableData, setTableData] = useState([]);
//   const [selectedDateFrom, setSelectedDateFrom] = useState(null)
//   const [selectedDateTo, setSelectedDateTo] = useState(null)
//   const [isLoading, setIsLoading] = useState(true);
//   const [show, setShow] = useState(false);

//   const [editId, setEditId] = useState('');
//   const [editPatientName, setEditPatientName] = useState('')
//   const [editContact, setEditContact] = useState('')
//   const [editRemarks, setEditRemarks] = useState('')
//   const [editCategory, setEditCategory] = useState('')
//   const [editQueryReason, setEditQueryReason] = useState('')
//   const [editResolutionStatus, setEditResolutionStatus] = useState('')
//   const [editPatientId, setEditPatientId] = useState('')
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);


  
//   const handleDateChangeFrom = (date) => {
//     setSelectedDateFrom(date);
//     // setNewDob(date.toLocaleDateString())
//   };
//   const handleDateChangeTO = (date) => {
//     setSelectedDateTo(date);
//     // setNewDob(date.toLocaleDateString())
//   };

// //Insert View Table
//   useEffect(() => {
//     fetch('https://euctostaging.com/prolife/api/telecall')
//       .then((response) => response.json())
//       .then((data) => {
//         setTableData(data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const initDataTable = () => {
//     $('#registaion').DataTable({
//       destroy: true,
//       processing: false,
//       serverSide: false,
//       data: tableData, 
//       dom: 'lfBrtip',
//       buttons: [
//         {
//           extend: 'copy',
//           className: 'btn btn-success',
//         },
//         {
//           extend: 'csv',
//           className: 'btn btn-danger',
//         },
//         {
//           extend: 'print',
//           className: 'btn btn-warning',
//         },
        
//       ],
//       searching: true,
//       columnDefs: [
//         {
//           data: 'action',
//           defaultContent: "<button>Edit</button>",
//           targets: 9
//         }
//       ],
//       columns: [
//         { data: 'Patient_name',defaultContent: '-' },
//         { data: 'contact',defaultContent: '-' },
//         { data: 'remarks',defaultContent: '-' },
//         { data: 'Category',defaultContent: '-' },
//         { data: 'query_reason',defaultContent: '-' },
//         { data: 'resolution_status',defaultContent: '-' },
//         { data: 'branch',defaultContent: '-' },
//         { data: 'created_by',defaultContent: '-' },
//         { data: 'created_at', 
//         defaultContent: '-',
//         render: function(data, type, full, meta) {
//           if (type === 'display') {
//             const date = new Date(data);
//             return date.toLocaleString(); 
//           }
//           return data;
//         }
//       },
//         {
//           data: 'action',
//           "targets": 9,
//           createdCell: (td, cellData, rowData, row, col) =>
//             ReactDOM.render(
//               [
//                 <div className='text-center'>
//                   <FaRegEdit onClick={()=> {handleShow(); getDataID(rowData.id);setEditId(rowData.id);}} style={{ color: 'green', cursor: 'pointer' }} size={25} />
//                 </div>,
//               ],
//               td
//             ),
//         },
//       ],
//     });
//   };

//   useEffect(() => {
//     if (!isLoading && tableData.length > 0) {
//       initDataTable();
//     }
    
//   }, [isLoading, tableData]);




//  //Edit Table
// const editDoctor = async () => {
//   try { 
//     const response = await fetch(`https://euctostaging.com/prolife/api/telecall/update/${editId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id: editId,
//         Patient_id: editPatientId,
//         Patient_name:editPatientName,
//         contact:editContact,
//         remarks:editRemarks,
//         Category:editCategory,
//         query_reason:editQueryReason,
//         resolution_status:editResolutionStatus,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     handleClose();
//     if (response.ok) {
//       await initDataTable(); 

//       // table.ajax.reload();
//       Swal.fire({
//         icon: 'success',
//         title: 'Telecall updated successfully!',
//         showConfirmButton: false,
//         timer: 1800,
//       })
//       .then(() => {
//         window.location.reload(); 
//            });

//     } else {
//       Swal.fire('Error', 'Failed to update the Telecall.', 'error');
//     }
//   } catch (error) {
//     console.error('Error updating item:', error);
//     Swal.fire('Error', 'An error occurred while updating the item.', 'error');
//   }
// } 

//  const getDataID = async (datid)=>{
//   try{
//     const response = await fetch(`https://euctostaging.com/prolife/api/telecall/${datid}`,{
//       method:'GET',
//       headers:{
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await response.json();

//     const {
//       id,
//       Patient_name,
//       Patient_id,
//       contact,
//       remarks,
//       Category,
//       query_reason,
//       resolution_status,
//     } = data;

//     setEditId(id);
//     setEditPatientId(Patient_id);
//     setEditPatientName(Patient_name);
//     setEditContact(contact);
//     setEditRemarks(remarks);
//     setEditCategory(Category);
//     setEditQueryReason(query_reason);
//     setEditResolutionStatus(resolution_status);

//   }catch(error){
//     console.log('Error fetching data for id:', datid, error);
//   }
//  }  


//   return (
//     <div>
//       <Navbarall/>
//       <div className='py-4 px-5'>
//         <div style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
//           <div className='px-5 py-3'>
//             <div style={{textAlign:'end', marginBottom:'20px'}}>
//               <NavLink to='/Main/Appoinment/TelecallForm'>
//               <Button style={{backgroundColor:'#CCA047', color:'white'}}><MdWifiCalling className='mr-2'/>Add Telecalls</Button></NavLink><hr/>
//             </div>

//       {/* ---------- Filter and Pie chat ---------------- */}
//       <div >
//         <div style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
//           <Row className='py-4 px-5'>
//             <Col style={{borderRight: '1px solid #000'}}>
//               <Form>
//                <Form.Group className='d-grid'>
//                   <Form.Label style={{width: '100%'}}>From</Form.Label>
//                   <DatePicker
//                       placeholderText="DD/MM/YYYY"
//                       selected={selectedDateFrom}
//                       onChange={handleDateChangeFrom}
//                       // value={newDob}
//                       dateFormat="dd/MM/yyyy"
//                       showYearDropdown
//                       scrollableYearDropdown
//                       showMonthDropdown
//                       scrollableMonthYearDropdown
//                       customInput={
//                         <input
//                          type="text" id="txtDate" name="SelectedDate"   style={{ cursor: 'pointer', width:'100%', height:'35px' }}/>
//                       }/>
//                 </Form.Group>
//                <Form.Group className='d-grid pt-4'>
//                   <Form.Label style={{width: '100%'}}>To</Form.Label>
//                   <DatePicker
//                       placeholderText="DD/MM/YYYY"
//                       selected={selectedDateTo}
//                       onChange={handleDateChangeTO}
//                       // value={newDob}
//                       dateFormat="dd/MM/yyyy"
//                       showYearDropdown
//                       scrollableYearDropdown
//                       showMonthDropdown
//                       scrollableMonthYearDropdown
//                       customInput={
//                         <input
//                          type="text" id="txtDate" name="SelectedDate"   style={{ cursor: 'pointer', width:'100%', height:'35px' }}/>
//                       }/>
//                 </Form.Group>
//                 <div className='pt-3 text-center'>
//                   <Button style={{backgroundColor:'#6D5DA8'}}><FaSearchengin className='mr-2' />Search</Button>
//                 </div>
//               </Form>
//             </Col>
//             <Col>
//             <div className='py-3'>
//                         <PieChatTeleCall style={{height:'250px'}}/>
//                     </div>
//             </Col>
//           </Row>
//         </div>
//       </div><hr/>
//       {/* ---------- Filter and Pie chat ---------------- */}
//       {/* ---------- Model ------------------------*/}
//             <Modal show={show} onHide={handleClose}>
//         <Modal.Header>
//           <Modal.Title>Edit Telecalls Details</Modal.Title>
//         </Modal.Header>
//         <Form> 
//         <Modal.Body>
// {/* ---------- Model ------------------------*/}
//           <div>
//           <Form.Control  value={editId} type="hidden"  />
//           <div className='py-2 px-2' style={{ borderRadius: '10px', border: '1px solid #000', backgroundColor: editResolutionStatus === 'pending' ? '#F9AEAE' : editResolutionStatus === 'resolved' ? '#DFEEBE' : 'inherit' }}>
//             <Form.Group className="mb-2">
//                 <h5 style={{fontFamily: "math"}} className='mb-2'>Resolution Status</h5>
//                 <Form.Control value={editResolutionStatus} onChange={(e)=>setEditResolutionStatus(e.target.value) } as='select'>
//                   {/* <option value='' disabled>--select--</option> */}
//                   <option value='pending'>pending</option>
//                   <option value='resolved'>resolved </option>
//                 </Form.Control>
//               </Form.Group>
//           </div>
//             <Form.Group className="mb-2 mt-3">
//               <Form.Label className='mb-0' >Patient ID</Form.Label>
//               <Form.Control  disabled readOnly value={editPatientId} onChange={(e)=> setEditPatientId(e.target.value)} type="text" />
//             </Form.Group>
//             <Form.Group className="mb-2 mt-3">
//               <Form.Label className='mb-0'>Patient Name</Form.Label>
//               <Form.Control value={editPatientName} onChange={(e)=> setEditPatientName(e.target.value)} type="text" />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label className='mb-0'>Contact No</Form.Label>
//               <Form.Control value={editContact} onChange={(e)=> setEditContact(e.target.value)} type="text" />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label className='mb-0'>Query Category</Form.Label>
//               <Form.Control value={editCategory} onChange={(e)=>setEditCategory(e.target.value)} as='select'>
//                 <option value='' disabled>--select--</option>
//                 <option value='Gynec'>Gynec</option>
//                 <option value='Fertility'>Fertility</option>
//                 <option value='Obs'>Obs</option>
//               </Form.Control>
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label className='mb-0'>Query Reason</Form.Label>
//               <Form.Control value={editQueryReason} onChange={(e)=> setEditQueryReason(e.target.value)} type="text" />
//             </Form.Group>
//           </div>
           
//         </Modal.Body>
//         </Form> 
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={editDoctor}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
          
//            </Modal>
//             {/* Table  */}
//             <div>
//               <div className="MainDiv">
//                 {isLoading ? (
//                   <div className='text-center'><h5>Loading... Thank you for your patience </h5></div>
//                 ) : (
//                   <Table striped bordered hover responsive id="registaion" className="display">
//                     <thead>
//                     <tr>
//                         <th>Patient Name</th>
//                         <th>Contact</th>
//                         <th>Remarks</th>
//                         <th>Category</th>
//                         <th>Query Reason</th>
//                         <th>Resolution Status</th>
//                         <th>Branch</th>
//                         <th>Created By</th>
//                         <th>Created Date</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                   </Table>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// export default TelecallTable
