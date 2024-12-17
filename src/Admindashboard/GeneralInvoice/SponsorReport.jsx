import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import $ from 'jquery';
import { FaRegEdit } from 'react-icons/fa';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';
import 'jquery/dist/jquery.min.js';
import 'datatables.net/js/jquery.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { LiaSortAmountUpAltSolid } from 'react-icons/lia';
import { LiaWpforms } from 'react-icons/lia';

const SponsorReport = () => {
  const [sponsorOptions, setSponsorOptions] = useState([]);
  const [editExcessAmount, setEditExcessAmount] = useState('');
  const [editExcessAmountadd, setEditExcessAmountadd] = useState('');
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    $(document).ready(() => {
      $('#excessAmount').DataTable({
        destroy: true,
        processing: true,
        serverSide: false,
        ajax: {
          url: 'https://santhoshavidhyalaya.com/SVSTEST/api/getsponinfo',
          type: 'GET',
          dataSrc: 'sponserorstudentDetail',
          error: function (xhr, error, thrown) {
            console.log('DataTables error:', error);
          },
        },
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
        columns: [
          { data: 'name', defaultContent: '-' },
          { data: 'amount', defaultContent: '-' },
          { data: 'stu_user', defaultContent: '-' },
          {
            data: 'transactionId',
            render: function (data, type, row) {
              // Customize the display of transactionId
              return `<span class="badge bg-secondary text-white"><h6>${data}</h6></span>`;
            },
            },
            { data: 'std', defaultContent: '-' },
            { data: 'rollNo', defaultContent: '-' },
            { data: 'created_at', render: function (data, type, row) {
              if (type === 'display' || type === 'filter') {
                // Format date for display
                const formattedDate = new Date(data).toLocaleString();
                return formattedDate;
              }
              return data;
            }},          ],
      });
    });
  }, []);
  
      

    
  return (
    <div>
    <Sidebar/>
      <div style={{width:'82.5%',float:'right'}} >
        <Header/>

       <h3 className=' py-4'><LiaWpforms  size={34} className='pe-2 pb-1'/>Sponsor Report</h3>  

                <div className="MainDiv container py-5">
                <div className="container">
                <table id="excessAmount" class="display">
                  <thead>
                  <tr>       
                  <th>Sponsor Name</th>       
                    <th>Paid Amount</th>
                    {/* <th>Roll No</th> */}
                    <th>Student name</th>
                    <th>Reciept No</th>
                    <th>Standard</th>
                    <th>Roll no</th>
                    <th>Created at</th>
                      </tr>
                  </thead>
              </table>
              </div>
              </div>
           
          </div>
     </div>
   );
}
 

export default SponsorReport;


























// import React,{useState,useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../Header';
// import Sidebar from '../Sidebar';
// import { Modal, Button, Form } from 'react-bootstrap';
// import $ from 'jquery';
// import { LiaSortAmountUpAltSolid } from 'react-icons/lia';
// import { FaRegEdit } from 'react-icons/fa';
// import Paper from '@mui/material/Paper';
// import ReactDOM from 'react-dom';
// import 'jquery/dist/jquery.min.js';
// import "datatables.net/js/jquery.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
// import "datatables.net-buttons/js/dataTables.buttons.js"
// import "datatables.net-buttons/js/buttons.colVis.js"
// import "datatables.net-buttons/js/buttons.flash.js"
// import "datatables.net-buttons/js/buttons.html5.js"
// import "datatables.net-buttons/js/buttons.print.js"
// import "datatables.net-dt/css/jquery.dataTables.min.css"


// const SponsorReport = () => {

//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [tableData, setTableData] = useState([]);
//   const [editId,setEditId] = useState('')
//   const [editExcessAmount,setEditExcessAmount] = useState('')
//   const [editName,setEditName] = useState('')


//   useEffect(() => {
//     $(document).ready(function () {
//       $('#excessAmount').DataTable({
//         destroy: true,
//         processing: true,
//         serverSide: false,
//         ajax: {
//           url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/getUserDetailsWithExcessAmount',
//           type: 'GET',
//           dataSrc: 'userDetails',
//         },
//         dom: 'lfBrtip',
//         buttons: [
//           {
//             extend: 'copy',
//             className: 'btn btn-success',
//           },
//           {
//             extend: 'csv',
//             className: 'btn btn-danger',
//           },
//           {
//             extend: 'print',
//             className: 'btn btn-warning',
//           },
//         ],
//         columnDefs: [
//           {
//             data: 'action',
//             defaultContent: '<button>Edit</button>',
//             targets: 7,
//           },
//         ],
//         columns: [
//           { data: 'name',defaultContent: '-'  },
//           { data: 'roll_no',defaultContent: '-'  },
//           { data: 'gender',defaultContent: '-'  },
//           { data: 'standard',defaultContent: '-' },
//           { data: 'sec' ,defaultContent: '-' },
//           { data: 'excess_amount',defaultContent: '-'  },
//           { data: 'user_type',defaultContent: '-'  },
//           {
//             data: 'action',
//             targets: 7,
//             createdCell: (td, cellData, rowData, row, col) =>
//               ReactDOM.render(
//                 [
//                   <div className='text-center'>
//                     <FaRegEdit style={{color:'green', cursor:'pointer'}} size={25}
//                     onClick={()=> {handleShow(); getDataID(rowData.id);setEditId(rowData.id);}}/>
//                   </div>
//                 ],
//                 td
//               ),
//           },
//         ],
//       });
//     });
//   }, []);

//   const getDataID = async (id) => {
//     console.log(id);
//     try {
//       const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/viewExcessAmount/${id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       this.setState((prevState) => ({
//         editId : data[0].slno,
//         editExcessAmount: data[0].excess_amount,
//         editName: data[0].name,
//       }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//     <Sidebar/>
//       <div style={{width:'82.5%',float:'right'}} >
//         <Header/>
//           <div className='p-4'>

//             <div >
//               <Modal style={{marginTop:'100px'}} show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                   <Modal.Title>Edit Excess Amount</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   <Form>
//                     <Form.Group className='mb-4 mt-1'>
//                       <Form.Label>Name</Form.Label>
//                       <Form.Control type='text' readOnly disabled />
//                     </Form.Group>
//                     <Form.Group>
//                       <Form.Label>Excess Amount</Form.Label>
//                       <Form.Control type='number' />
//                     </Form.Group>
//                   </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                   <Button variant="secondary" onClick={handleClose}>
//                     Close
//                   </Button>
//                   <Button variant="primary" onClick={handleClose}>
//                     Save Changes
//                   </Button>
//                 </Modal.Footer>
//               </Modal>
//             </div>

//             <Paper elevation={24} >
//                 <div className='pt-4 px-3'>
//                    <h3><LiaSortAmountUpAltSolid  size={45} className='pe-2 pb-1'/>Excess Amount Table</h3>  
//                    <hr className='settingHr'/>
//                 </div>
//              <div className="MainDiv container py-5">
//                 <div className="container">
//                     <table id="excessAmount" className="display">
//                     <thead>
//                         <tr>
//                           <th>Name</th>
//                           <th>Roll No</th>
//                           <th>Gender</th>
//                           <th>Standard</th>
//                           <th>Section</th>
//                           <th>Excess Amount</th>
//                           <th>User Type</th>
//                           <th className='text-center'>Edit</th>
//                         </tr>
//                     </thead>
//                     </table>
//                 </div>
//              </div>
//            </Paper>                    
//           </div>
//       </div>
//  </div>
//   )
// }

// export default SponsorReport

