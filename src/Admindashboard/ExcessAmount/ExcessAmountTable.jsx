import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import $ from 'jquery';
import { FaRegEdit } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';
import 'jquery/dist/jquery.min.js';
import 'datatables.net/js/jquery.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Table from 'react-bootstrap/Table';

import { LiaSortAmountUpAltSolid } from 'react-icons/lia';
// import ClassMaster from '../Masters/History'
const ExcessAmountTable = () => {
  const [sponsorOptions, setSponsorOptions] = useState([]);
  const [editExcessAmount, setEditExcessAmount] = useState('');
  const [heditExcessAmount, sethEditExcessAmount] = useState('');
  const [editExcessAmountadd, setEditExcessAmountadd] = useState('');
  const [hoseditExcessAmountadd, setHosEditExcessAmountadd] = useState('');
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [classMaster, setClass] = useState([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openViewModal = () => setShowViewModal(true);
  const closeViewModal = () => setShowViewModal(false);
  const resetState = () => {
    setEditExcessAmount('');
    sethEditExcessAmount('');
    setEditExcessAmountadd('');
    setEditExcessAmountadd('');
    setHosEditExcessAmountadd('');
    setEditId('');
    setEditName('');
    setSelectedOption(null);
    fetchSponsorOptions();
   };
  const fetchSponsorOptions = async () => {
    try {
      const response = await fetch('https://santhoshavidhyalaya.com/SVSTEST/api/sponsor/select');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSponsorOptions(data.sponsorOptions);
    } catch (error) {
      console.error('Error fetching sponsor options:', error);
    }
  };

  const getById = async (id, event) => {
    event.preventDefault();
    console.log(id);
    try {
      const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/viewExcessAmount/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setEditId(data[0].id);
      setEditName(data[0].name);
      setEditExcessAmount(data[0].excess_amount);
      sethEditExcessAmount(data[0].h_excess_amount);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
 
  };
  const fetchclass = async (id, event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/viewpreExcessAmount/${id}`);
      const data = await response.json();
      console.log(data);
      setClass(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const editExcessAmounts = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/updateExcessAmount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editId,
          name: editName,
          new_excess_amount: editExcessAmount,
          hnew_excess_amount:heditExcessAmount
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        $('#excessAmount').DataTable().ajax.reload();
        Swal.fire({
          icon: 'success',
          title: 'Update successfully!',
          showConfirmButton: false,
          timer: 1800,
        });
        closeModal();
        resetState(); // Reset the state after successful update
      } else {
        // Handle error if needed
        console.log('Error updating excess amount');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const editExcessAmountsadd = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/updateExcessAmount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedOption.value,
          name: selectedOption.name,
          new_excess_amount: editExcessAmountadd,
          hnew_excess_amount:hoseditExcessAmountadd
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        $('#excessAmount').DataTable().ajax.reload();
        Swal.fire({
          icon: 'success',
          title: 'Update successfully!',
          showConfirmButton: false,
          timer: 1800,
        });
        closeModal();
        resetState(); // Reset the state after successful update
      } else {
        // Handle error if needed
        console.log('Error updating excess amount');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSponsorOptions();

    $(document).ready(() => {
      $('#excessAmount').DataTable({
        destroy: true,
        processing: true,
        serverSide: false,
        ajax: {
          url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/getUserDetailsWithExcessAmount',
          type: 'GET',
          dataSrc: 'userDetails',
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
        columnDefs: [
          {
            data: 'action',
            defaultContent: "<button>Edit</button>",
            targets: 7,
          },
        ],
        columns: [
          {
            data: 'user_type',
            render: function (data, type, row) {
              // Check if user_type is 'sponser' and change to 'Sponsor'
              return data === 'sponser' ? 'Sponsor' : data;
            }
          },
          { data: 'name', defaultContent: '-' },
          { data: 'gender', defaultContent: '-' },
          { data: 'standard', defaultContent: '-' },
          { data: 'sec', defaultContent: '-' },
          { data: 'excess_amount', defaultContent: '-' },
          { data: 'h_excess_amount', defaultContent: '-' },
          {
            data: 'action',
            targets: 7,
            createdCell: (td, cellData, rowData, row, col) =>
              ReactDOM.render(
                [
                  <div className='text-center'>
                    <FaRegEdit
                      style={{ color: 'green', cursor: 'pointer' }}
                      size={25}
                      onClick={(event) => {
                        openModal();
                        getById(rowData.id, event);
                      }}
                    />
                     <FaEye
    style={{ color: 'blue', cursor: 'pointer' }}
    size={25}
    onClick={(event) => {
      openViewModal();
      fetchclass(rowData.id, event);
      getById(rowData.id, event); // Define this function to handle the "view" action
    }}
  />
                  </div>,
                ],
                td
              ),
          },
        ],
      });
    });
  }, []);

    
  return (
    <div>
    <Sidebar/>
      <div style={{width:'82.5%',float:'right'}} >
        <Header/>

        <div className='py-1 px-3'>
        <h3><LiaSortAmountUpAltSolid  size={45} className='pe-2 pb-1'/>Add Excess Amount</h3>  

          <Form className="pb-3">

            <Form.Group className='mb-4 mt-1'>
            <Form.Label>Select a Sponsor Option</Form.Label>

                    <Select
       value={selectedOption}
      onChange={handleSelectChange}
      options={[
        { value: null, label: 'Select a Sponsor Option' },
        ...sponsorOptions
         // .filter(option => option.excess_amount !== 0 && option.excess_amount !== null)
          .map((option) => ({
            value: option.id,
            label: option.name,
            name: option.sponsername,
          })),
      ]}
      isClearable={true}
    />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>School Excess Amount</Form.Label>
                      <Form.Control type='text'
                       value={editExcessAmountadd}
                       onChange={(e) => setEditExcessAmountadd(e.target.value)} />
            </Form.Group>
            <Form.Group>
                      <Form.Label>Hostel Excess Amount</Form.Label>
                      <Form.Control type='text'
                       value={hoseditExcessAmountadd}
                       onChange={(e) => setHosEditExcessAmountadd(e.target.value)} />
                    </Form.Group>
          </Form>
          <Button variant="primary" onClick={editExcessAmountsadd}>
                    Add Amount
                  </Button>
</div>
          <div className='p-4'>
              <div className='pt-5' >
            <Modal className='mt-5' show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                  <Modal.Title>Edit Excess Amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                  <Form.Control value={editId} type="hidden"  />
                    <Form.Group className='mb-4 mt-1'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control type='text' readOnly disabled 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>School Excess Amount</Form.Label>
                      <Form.Control type='text'
                       value={editExcessAmount}
                       onChange={(e) => setEditExcessAmount(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Hostel Excess Amount</Form.Label>
                      <Form.Control type='text'
                       value={heditExcessAmount}
                       onChange={(e) => sethEditExcessAmount(e.target.value)} />
                    </Form.Group>
                </Form>
                
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={editExcessAmounts}>
                    Save Changes
                  </Button>
                </Modal.Footer>
            </Modal>
            </div>
            <div className='pt-5' >
            <Modal className='mt-5' show={showViewModal} onHide={closeViewModal}>
            <Modal.Header closeButton>
                  <Modal.Title>Excess History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Table striped bordered hover size="sm">
        <thead>
          <tr style={{background:'#535455',color:'#fff',textAlign:'center'}}>
            <th>School Excess</th>
            <th>Hostel Excess</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
                    {classMaster.map((res) => (
                      <tr key={res.id} style={{ textAlign: 'center' }}>
                        <td>{res.excess_amount}</td>
                        <td>{res.h_excess_amount}</td>
                        <td>{res.created_by}</td>
                        <td>{res.created_at}</td>
                      
                      </tr>
                    ))}
                  </tbody>
          </Table>
                
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeViewModal}>
                    Close
                  </Button>
                  {/* <Button variant="primary" onClick={editExcessAmounts}>
                    Save Changes
                  </Button> */}
                </Modal.Footer>
            </Modal>
            </div>
          
          
                   <h3><LiaSortAmountUpAltSolid  size={45} className='pe-2 pb-1'/>Excess Amount Table</h3>  
                   <hr className='settingHr'/>
                </div>  
                <div className="MainDiv container py-3">
                <div className="container">
                <table id="excessAmount" class="display">
                  <thead>
                  <tr>       
                  <th>User Type</th>       
                    <th>Name</th>
                    {/* <th>Roll No</th> */}
                    <th>Gender</th>
                    <th>Standard</th>
                    <th>Section</th>
                    <th>School Excess Amt</th>
                    <th>Hostel Excess Amt</th>
                    <th className='text-center'>Edit</th>
                    </tr>
                  </thead>
              </table>
              </div>
              </div>
           
          </div>
     </div>
   );
}
 

export default ExcessAmountTable;




















// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import Select from 'react-select';
// import $ from 'jquery';
// import { FaRegEdit } from 'react-icons/fa';
// import Paper from '@mui/material/Paper';
// import Swal from 'sweetalert2';
// import ReactDOM from 'react-dom';
// import 'jquery/dist/jquery.min.js';
// import 'datatables.net/js/jquery.dataTables';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';
// import Sidebar from '../Sidebar';
// import Header from '../Header';
// import { LiaSortAmountUpAltSolid } from 'react-icons/lia';

// const ExcessAmountTable = () => {
//   const [sponsorOptions, setSponsorOptions] = useState([]);
//   const [editExcessAmount, setEditExcessAmount] = useState('');
//   const [heditExcessAmount, sethEditExcessAmount] = useState('');
//   const [editExcessAmountadd, setEditExcessAmountadd] = useState('');
//   const [hoseditExcessAmountadd, setHosEditExcessAmountadd] = useState('');
//   const [editId, setEditId] = useState('');
//   const [editName, setEditName] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);

//   const openModal = () => setShowModal(true);
//   const closeModal = () => setShowModal(false);
//   const resetState = () => {
//     setEditExcessAmount('');
//     sethEditExcessAmount('');
//     setEditExcessAmountadd('');
//     setEditExcessAmountadd('');
//     setHosEditExcessAmountadd('');
//     setEditId('');
//     setEditName('');
//     setSelectedOption(null);
//     fetchSponsorOptions();
//    };
//   const fetchSponsorOptions = async () => {
//     try {
//       const response = await fetch('https://santhoshavidhyalaya.com/SVSTEST/api/sponsor/select');

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       setSponsorOptions(data.sponsorOptions);
//     } catch (error) {
//       console.error('Error fetching sponsor options:', error);
//     }
//   };

//   const getById = async (id, event) => {
//     event.preventDefault();
//     console.log(id);
//     try {
//       const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/viewExcessAmount/${id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       setEditId(data[0].id);
//       setEditName(data[0].name);
//       setEditExcessAmount(data[0].excess_amount);
//       sethEditExcessAmount(data[0].h_excess_amount);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleSelectChange = (selectedOption) => {
//     alert(selectedOption.name);
//     setSelectedOption(selectedOption);
 
//   };
  
//   const editExcessAmounts = async () => {
//     try {
//       const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/updateExcessAmount', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: editId,
//           name: editName,
//           new_excess_amount: editExcessAmount,
//           hnew_excess_amount:heditExcessAmount
//         }),
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         $('#excessAmount').DataTable().ajax.reload();
//         Swal.fire({
//           icon: 'success',
//           title: 'Update successfully!',
//           showConfirmButton: false,
//           timer: 1800,
//         });
//         closeModal();
//         resetState(); // Reset the state after successful update
//       } else {
//         // Handle error if needed
//         console.log('Error updating excess amount');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   const editExcessAmountsadd = async () => {
//     try {
//       const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/updateExcessAmount', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: selectedOption.value,
//           name: selectedOption.name,
//           new_excess_amount: editExcessAmountadd,
//           hnew_excess_amount:hoseditExcessAmountadd
//         }),
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         $('#excessAmount').DataTable().ajax.reload();
//         Swal.fire({
//           icon: 'success',
//           title: 'Update successfully!',
//           showConfirmButton: false,
//           timer: 1800,
//         });
//         closeModal();
//         resetState(); // Reset the state after successful update
//       } else {
//         // Handle error if needed
//         console.log('Error updating excess amount');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchSponsorOptions();

//     $(document).ready(() => {
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
//             defaultContent: "<button>Edit</button>",
//             targets: 7,
//           },
//         ],
//         columns: [
//           {
//             data: 'user_type',
//             render: function (data, type, row) {
//               // Check if user_type is 'sponser' and change to 'Sponsor'
//               return data === 'sponser' ? 'Sponsor' : data;
//             }
//           },
//           { data: 'name', defaultContent: '-' },
//           { data: 'gender', defaultContent: '-' },
//           { data: 'standard', defaultContent: '-' },
//           { data: 'sec', defaultContent: '-' },
//           { data: 'excess_amount', defaultContent: '-' },
//           { data: 'h_excess_amount', defaultContent: '-' },
//           {
//             data: 'action',
//             targets: 7,
//             createdCell: (td, cellData, rowData, row, col) =>
//               ReactDOM.render(
//                 [
//                   <div className='text-center'>
//                     <FaRegEdit
//                       style={{ color: 'green', cursor: 'pointer' }}
//                       size={25}
//                       onClick={(event) => {
//                         openModal();
//                         getById(rowData.id, event);
//                       }}
//                     />
//                   </div>,
//                 ],
//                 td
//               ),
//           },
//         ],
//       });
//     });
//   }, []);

    
//   return (
//     <div>
//     <Sidebar/>
//       <div style={{width:'82.5%',float:'right'}} >
//         <Header/>

//         <div className='py-1 px-3'>
//         <h3><LiaSortAmountUpAltSolid  size={45} className='pe-2 pb-1'/>Add Excess Amount</h3>  

//           <Form className="pb-3">

//             <Form.Group className='mb-4 mt-1'>
//             <Form.Label>Select a Sponsor Option</Form.Label>

//                     <Select
//        value={selectedOption}
//       onChange={handleSelectChange}
//       options={[
//         { value: null, label: 'Select a Sponsor Option' },
//         ...sponsorOptions
//          // .filter(option => option.excess_amount !== 0 && option.excess_amount !== null)
//           .map((option) => ({
//             value: option.id,
//             label: option.name,
//             name: option.sponsername,
//           })),
//       ]}
//       isClearable={true}
//     />
//                     </Form.Group>
//                     <Form.Group>
//                       <Form.Label>School Excess Amount</Form.Label>
//                       <Form.Control type='text'
//                        value={editExcessAmountadd}
//                        onChange={(e) => setEditExcessAmountadd(e.target.value)} />
//             </Form.Group>
//             <Form.Group>
//                       <Form.Label>Hostel Excess Amount</Form.Label>
//                       <Form.Control type='text'
//                        value={hoseditExcessAmountadd}
//                        onChange={(e) => setHosEditExcessAmountadd(e.target.value)} />
//                     </Form.Group>
//           </Form>
//           <Button variant="primary" onClick={editExcessAmountsadd}>
//                     Add Amount
//                   </Button>
// </div>
//           <div className='p-4'>
//               <div className='pt-5' >
//             <Modal className='mt-5' show={showModal} onHide={closeModal}>
//             <Modal.Header closeButton>
//                   <Modal.Title>Edit Excess Amount</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   <Form>
//                   <Form.Control value={editId} type="hidden"  />
//                     <Form.Group className='mb-4 mt-1'>
//                       <Form.Label>Name</Form.Label>
//                       <Form.Control type='text' readOnly disabled 
//                         value={editName}
//                         onChange={(e) => setEditName(e.target.value)}
//                       />
//                     </Form.Group>
//                     <Form.Group>
//                       <Form.Label>School Excess Amount</Form.Label>
//                       <Form.Control type='text'
//                        value={editExcessAmount}
//                        onChange={(e) => setEditExcessAmount(e.target.value)} />
//                   </Form.Group>
//                   <Form.Group>
//                       <Form.Label>Hostel Excess Amount</Form.Label>
//                       <Form.Control type='text'
//                        value={heditExcessAmount}
//                        onChange={(e) => sethEditExcessAmount(e.target.value)} />
//                     </Form.Group>
//                 </Form>
                
//                 </Modal.Body>
//                 <Modal.Footer>
//                   <Button variant="secondary" onClick={closeModal}>
//                     Close
//                   </Button>
//                   <Button variant="primary" onClick={editExcessAmounts}>
//                     Save Changes
//                   </Button>
//                 </Modal.Footer>
//             </Modal>
//             </div>
          
          
//                    <h3><LiaSortAmountUpAltSolid  size={45} className='pe-2 pb-1'/>Excess Amount Table</h3>  
//                    <hr className='settingHr'/>
//                 </div>  
//                 <div className="MainDiv container py-3">
//                 <div className="container">
//                 <table id="excessAmount" class="display">
//                   <thead>
//                   <tr>       
//                   <th>User Type</th>       
//                     <th>Name</th>
//                     {/* <th>Roll No</th> */}
//                     <th>Gender</th>
//                     <th>Standard</th>
//                     <th>Section</th>
//                     <th>School Excess Amt</th>
//                     <th>Hostel Excess Amt</th>
//                     <th className='text-center'>Edit</th>
//                     </tr>
//                   </thead>
//               </table>
//               </div>
//               </div>
           
//           </div>
//      </div>
//    );
// }
 

// export default ExcessAmountTable;


























// // import React,{useState,useEffect} from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Header from '../Header';
// // import Sidebar from '../Sidebar';
// // import { Modal, Button, Form } from 'react-bootstrap';
// // import $ from 'jquery';
// // import { LiaSortAmountUpAltSolid } from 'react-icons/lia';
// // import { FaRegEdit } from 'react-icons/fa';
// // import Paper from '@mui/material/Paper';
// // import ReactDOM from 'react-dom';
// // import 'jquery/dist/jquery.min.js';
// // import "datatables.net/js/jquery.dataTables"
// // import "datatables.net-dt/css/jquery.dataTables.min.css"
// // import "datatables.net-buttons/js/dataTables.buttons.js"
// // import "datatables.net-buttons/js/buttons.colVis.js"
// // import "datatables.net-buttons/js/buttons.flash.js"
// // import "datatables.net-buttons/js/buttons.html5.js"
// // import "datatables.net-buttons/js/buttons.print.js"
// // import "datatables.net-dt/css/jquery.dataTables.min.css"


// // const ExcessAmountTable = () => {

// //   const [show, setShow] = useState(false);
// //   const handleClose = () => setShow(false);
// //   const handleShow = () => setShow(true);
// //   const [tableData, setTableData] = useState([]);
// //   const [editId,setEditId] = useState('')
// //   const [editExcessAmount,setEditExcessAmount] = useState('')
// //   const [editName,setEditName] = useState('')


// //   useEffect(() => {
// //     $(document).ready(function () {
// //       $('#excessAmount').DataTable({
// //         destroy: true,
// //         processing: true,
// //         serverSide: false,
// //         ajax: {
// //           url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/getUserDetailsWithExcessAmount',
// //           type: 'GET',
// //           dataSrc: 'userDetails',
// //         },
// //         dom: 'lfBrtip',
// //         buttons: [
// //           {
// //             extend: 'copy',
// //             className: 'btn btn-success',
// //           },
// //           {
// //             extend: 'csv',
// //             className: 'btn btn-danger',
// //           },
// //           {
// //             extend: 'print',
// //             className: 'btn btn-warning',
// //           },
// //         ],
// //         columnDefs: [
// //           {
// //             data: 'action',
// //             defaultContent: '<button>Edit</button>',
// //             targets: 7,
// //           },
// //         ],
// //         columns: [
// //           { data: 'name',defaultContent: '-'  },
// //           { data: 'roll_no',defaultContent: '-'  },
// //           { data: 'gender',defaultContent: '-'  },
// //           { data: 'standard',defaultContent: '-' },
// //           { data: 'sec' ,defaultContent: '-' },
// //           { data: 'excess_amount',defaultContent: '-'  },
// //           { data: 'user_type',defaultContent: '-'  },
// //           {
// //             data: 'action',
// //             targets: 7,
// //             createdCell: (td, cellData, rowData, row, col) =>
// //               ReactDOM.render(
// //                 [
// //                   <div className='text-center'>
// //                     <FaRegEdit style={{color:'green', cursor:'pointer'}} size={25}
// //                     onClick={()=> {handleShow(); getDataID(rowData.id);setEditId(rowData.id);}}/>
// //                   </div>
// //                 ],
// //                 td
// //               ),
// //           },
// //         ],
// //       });
// //     });
// //   }, []);

// //   const getDataID = async (id) => {
// //     console.log(id);
// //     try {
// //       const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/viewExcessAmount/${id}`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       });
// //       const data = await response.json();
// //       this.setState((prevState) => ({
// //         editId : data[0].slno,
// //         editExcessAmount: data[0].excess_amount,
// //         editName: data[0].name,
// //       }));
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   return (
// //     <div>
// //     <Sidebar/>
// //       <div style={{width:'82.5%',float:'right'}} >
// //         <Header/>
// //           <div className='p-4'>

// //             <div >
// //               <Modal style={{marginTop:'100px'}} show={show} onHide={handleClose}>
// //                 <Modal.Header closeButton>
// //                   <Modal.Title>Edit Excess Amount</Modal.Title>
// //                 </Modal.Header>
// //                 <Modal.Body>
// //                   <Form>
// //                     <Form.Group className='mb-4 mt-1'>
// //                       <Form.Label>Name</Form.Label>
// //                       <Form.Control type='text' readOnly disabled />
// //                     </Form.Group>
// //                     <Form.Group>
// //                       <Form.Label>Excess Amount</Form.Label>
// //                       <Form.Control type='number' />
// //                     </Form.Group>
// //                   </Form>
// //                 </Modal.Body>
// //                 <Modal.Footer>
// //                   <Button variant="secondary" onClick={handleClose}>
// //                     Close
// //                   </Button>
// //                   <Button variant="primary" onClick={handleClose}>
// //                     Save Changes
// //                   </Button>
// //                 </Modal.Footer>
// //               </Modal>
// //             </div>

// //             <Paper elevation={24} >
// //                 <div className='pt-4 px-3'>
// //                    <h3><LiaSortAmountUpAltSolid  size={45} className='pe-2 pb-1'/>Excess Amount Table</h3>  
// //                    <hr className='settingHr'/>
// //                 </div>
// //              <div className="MainDiv container py-5">
// //                 <div className="container">
// //                     <table id="excessAmount" className="display">
// //                     <thead>
// //                         <tr>
// //                           <th>Name</th>
// //                           <th>Roll No</th>
// //                           <th>Gender</th>
// //                           <th>Standard</th>
// //                           <th>Section</th>
// //                           <th>Excess Amount</th>
// //                           <th>User Type</th>
// //                           <th className='text-center'>Edit</th>
// //                         </tr>
// //                     </thead>
// //                     </table>
// //                 </div>
// //              </div>
// //            </Paper>                    
// //           </div>
// //       </div>
// //  </div>
// //   )
// // }

// // export default ExcessAmountTable

