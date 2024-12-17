// import React, { useState, useEffect, useRef } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import $ from 'jquery';
// import { FaFileInvoiceDollar } from 'react-icons/fa';
// import { MdPayments } from 'react-icons/md';
// import Swal from 'sweetalert2';
// import ReactDOM from 'react-dom';
// import Table from 'react-bootstrap/Table';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import FilledInput from '@mui/material/FilledInput';
// import InputAdornment from '@mui/material/InputAdornment';
// import axios from 'axios';


// const DiscountTable = () => {
//   const [show, setShow] = useState(false);
//   const [tableData, setTableData] = useState([]);

//   const fromDateRef = useRef(null);
//   const toDateRef = useRef(null);


// // 
//   const handleClose = () => {
//     setShow(false);
//   };

//   const handleShow = () => {
//     setShow(true);
//   };

//   const handleFilter = async () => {
//     const fromDate = fromDateRef.current.value;
//     const toDate = toDateRef.current.value;

//     try {
//       const response = await axios.post('https://www.santhoshavidhyalaya.com/SVSTEST/api/listgenratefilter', {
//         fromDate: fromDate,
//         toDate: toDate
//       });

//       setTableData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     $(document).ready(function () {
//       $('#DiscountTable').DataTable({
//         dom: 'Bfrtip',
//         buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
//         destroy: true,
//         processing: true,
//         serverSide: false,
//         ajax: {
//           url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/listgenrate',
//           type: 'GET',
//         },
//         dom: 'Plfrtip',
//         columnDefs: [
//           {
//             data: 'action',
//             defaultContent: "<button>Edit</button>",
//             targets: [18, 19],
//           },
//         ],
//         columns: [
//           { data: 'slno' }, // Hidden column
//           { data: 'invoice_no' },
//           { data: 'roll_no' },
//           { data: 'name' },
//           { data: 'standard' },
//           { data: 'twe_group' },
//           { data: 'sec' },
//           { data: 'hostelOrDay' },
//           { data: 'sponser_id' },
//           { data: 'email' },
//           { data: 'actual_amount' },
//           { data: 'discount_percent' },
//           { data: 'amount' },
//           { data: 'date' },
//           { data: 'acad_year' },
//           { data: 'due_date' },
//           { data: 'payment_status' },
//           { data: 'created_by' },
//           {
//             data: 'action',
//             targets: 18,
//             createdCell: (td, cellData, rowData, row, col) =>
//               ReactDOM.render(
//                 [
//                   <MdPayments
//                     style={{ color: '#F07600', cursor: 'pointer', textAlign: 'center' }}
//                     size={25}
//                     onClick={handleShow}
//                   />,
//                   // onClick={() => {handleShow(); content.getById(rowData.slno);}}
//                 ],
//                 td
//               ),
//           },
//           {
//             data: 'action',
//             targets: 19,
//             createdCell: (td, cellData, rowData, row, col) =>
//               ReactDOM.render(
//                 [
//                   <a target='_blank' href={`/GeneralInvoice/StudentInvoice/${rowData.invoice_no}`}>
//                     <FaFileInvoiceDollar
//                       style={{ color: 'green', cursor: 'pointer', textAlign: 'center' }}
//                       size={25}
//                     />
//                   </a>,
//                 ],
//                 td
//               ),
//           },
//         ], order: [[0, 'desc']]
//       });
//     });
//   }, []);

//   return (
//     <div className="MainDiv">
//       {/* Model popup for payablefee */}
//       <Modal className="pt-5" show={show} onHide={handleClose}>
//         <Modal.Header style={{ backgroundColor: '#3488FF', color: '#fff' }} closeButton>
//           <Modal.Title>Enter Payable Amount</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Table striped bordered hover>
//             <tbody>
//               <tr>
//                 <td>Name</td>
//                 <td>
//                   <h6>Mohammed</h6>
//                 </td>
//               </tr>
//               <tr>
//                 <td>Actual Amount</td>
//                 <td>
//                   <h6>₹ 34000</h6>{' '}
//                 </td>
//               </tr>
//               <tr>
//                 <td>Discount Amount</td>
//                 <td>
//                   <h6>₹ 10000</h6>
//                 </td>
//               </tr>
//               <tr>
//                 <td>Discounted Amount</td>
//                 <td>
//                   <h6>₹ 24000</h6>
//                 </td>
//               </tr>
//               <tr>
//                 <td>Due Amount</td>
//                 <td>
//                   <h6>₹ :-</h6>
//                 </td>
//               </tr>
//               <tr>
//                 <td>Payable Amount</td>
//                 <td>
//                   <FormControl fullWidth sx={{ m: 1 }} variant="filled">
//                     <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
//                     <FilledInput
//                       id="filled-adornment-amount"
//                       startAdornment={<InputAdornment position="start">₹</InputAdornment>}
//                     />
//                   </FormControl>
//                 </td>
//               </tr>
//             </tbody>
//           </Table>
//         </Modal.Body>
//         <Modal.Footer style={{ backgroundColor: '#E2E3E3' }}>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="success" onClick={handleClose}>
//             Enter
//           </Button>
//         </Modal.Footer>
//       </Modal>


//       {/* <div className="filter-section">
//         <label>From Date:</label>
//         <input type="date" ref={fromDateRef} />
//         <label>To Date:</label>
//         <input type="date" ref={toDateRef} />
//         <button onClick={handleFilter}>Filter</button>
//       </div> */}


//       <div className="container">
//         <div className="table-responsive">
//           <table responsive id="DiscountTable" className="display">
//             <thead>
//               <tr>
//                <th>Slno</th>
//                 <th>Invoice no</th>
//                 <th>Roll No</th>
//                 <th>Student Name</th>
//                 <th>Standard</th>
//                 <th>Group</th>
//                 <th>Section</th>
//                 <th>Hostel/Day</th>
//                 <th>Sponsor Name</th>
//                 <th>Email</th>
//                 <th>Actual Amount</th>
//                 <th>Discount Amount</th>
//                 <th>Discounted Amount</th>
//                 <th>Date</th>
//                 <th>year</th>
//                 <th>Due Date</th>
//                 <th>Payment Status</th>
//                 <th>Created By</th>
//                 <th>Payable Fee</th>
//                 <th>View Invoice</th>
//               </tr>
//             </thead>
//           </table>
//         </div>
//       </div>

 
//     </div>
//   );
// };

// export default DiscountTable;




















// // import React, { useState, useEffect, useRef } from 'react';
// // import Button from 'react-bootstrap/Button';
// // import Modal from 'react-bootstrap/Modal';
// // import $ from 'jquery';
// // import { FaFileInvoiceDollar } from 'react-icons/fa';
// // import { MdPayments } from 'react-icons/md';
// // import Swal from 'sweetalert2';
// // import ReactDOM from 'react-dom';
// // import Table from 'react-bootstrap/Table';
// // import FormControl from '@mui/material/FormControl';
// // import InputLabel from '@mui/material/InputLabel';
// // import FilledInput from '@mui/material/FilledInput';
// // import InputAdornment from '@mui/material/InputAdornment';
// // import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // import axios from 'axios';

// // class DiscountTable extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       show: false,
// //       fromDate: null,
// //       toDate: null,
// //       tableData: [],
// //     };
// //   }

// //   handleClose = () => {
// //     this.setState({ show: false });
// //   };

// //   handleShow = () => {
// //     this.setState({ show: true });
// //   };

// //   handleFilterClick = () => {

// //     // const { fromDate, toDate } = this.state;
// //     console.log(this, this.state.fromDate, this.state.toDate);
// //     if (this.state.fromDate && this.state.toDate) {
// //       // Call the API with the selected date range
// //       this.fetchTableData(this.state.fromDate, this.state.toDate);
// //     }
// //   };

// //   fetchTableData = async (fromDate, toDate) => {
// //     try {
// //       const response = await axios.post('https://www.santhoshavidhyalaya.com/SVSTEST/api/listgenratefilter', {
// //         from: fromDate,
// //         to: toDate,
// //       });
// //       // Process the response data and update the tableData state
// //       this.setState({ tableData: response.data });
// //     } catch (error) {
// //       console.error('Error fetching table data:', error);
// //     }
// //   };

// //   componentDidMount() {
// //     var handleShow = this.handleShow;
// //     var content = this;

// //     $(document).ready(function () {
// //       $('#DiscountTable').DataTable({
// //         dom: 'Bfrtip',
// //         buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
// //         destroy: true,
// //         processing: true,
// //         serverSide: false,
// //         ajax: {
// //           url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/listgenrate',
// //           type: 'GET',
// //         },
// //         dom: 'Plfrtip',
// //         columnDefs: [
// //           {
// //             data: 'action',
// //             defaultContent: '<button>Edit</button>',
// //             targets: [17, 18],
// //           },
// //         ],
// //         columns: [
// //           { data: 'invoice_no' },
// //           { data: 'roll_no' },
// //           { data: 'name' },
// //           { data: 'standard' },
// //           { data: 'twe_group' },
// //           { data: 'sec' },
// //           { data: 'hostelOrDay' },
// //           { data: 'sponser_id' },
// //           { data: 'email' },
// //           { data: 'actual_amount' },
// //           { data: 'discount_percent' },
// //           { data: 'amount' },
// //           { data: 'date' },
// //           { data: 'acad_year' },
// //           { data: 'due_date' },
// //           { data: 'payment_status' },
// //           { data: 'created_by' },
// //           {
// //             data: 'action',
// //             targets: 17,
// //             createdCell: (td, cellData, rowData, row, col) =>
// //               ReactDOM.render(
// //                 [
// //                   <MdPayments
// //                     style={{ color: '#F07600', cursor: 'pointer', textAlign: 'center' }}
// //                     size={25}
// //                     onClick={() => {
// //                       handleShow();
// //                     }}
// //                   />,
// //                 ],
// //                 td
// //               ),
// //           },

// //           {
// //             data: 'action',
// //             targets: 18,
// //             createdCell: (td, cellData, rowData, row, col) =>
// //               ReactDOM.render(
// //                 [
// //                   <a href={`/GeneralInvoice/StudentInvoice?invoiceNo=${rowData.invoiceNo}`} target="_blank">
// //                     <FaFileInvoiceDollar
// //                       style={{ color: 'green', cursor: 'pointer', textAlign: 'center' }}
// //                       size={25}
// //                     />
// //                   </a>,
// //                 ],
// //                 td
// //               ),
// //           },
// //         ],
// //       });
// //     });
// //   }

// //   render() {
// //     const { show, tableData } = this.state;
// //     return (
// //       <div className="MainDiv">
// //         {/* Model popup for payablefee */}
// //          <Modal className='pt-5' show={show} onHide={this.handleClose}>
// //              <Modal.Header style={{backgroundColor:'#3488FF', color:'#fff'}} closeButton>
// //                <Modal.Title>Enter Payable Amount</Modal.Title>
// //              </Modal.Header>
// //              <Modal.Body>
// //              <Table striped bordered hover>
// //                <tbody>
// //                  <tr>
// //                    <td>Name</td>
// //                    <td><h6>Mohammed</h6></td>
// //                  </tr>
// //                  <tr>
// //                    <td>Actual Amount</td>
// //                    <td><h6>₹ 34000</h6> </td>
// //                  </tr>
// //                  <tr>
// //                     <td>Discount Amount</td>
// //                     <td><h6>₹ 10000</h6></td>
// //                  </tr>
// //                  <tr>
// //                     <td>Discounted Amount</td>
// //                     <td><h6>₹ 24000</h6></td>
// //                  </tr>
// //                  <tr>
// //                     <td>Due Amount</td>
// //                     <td><h6>₹ :-</h6></td>
// //                  </tr>
// //                  <tr>
// //                    <td>Payable Amount</td>
// //                    <td>
// //                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
// //                      <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
// //                      <FilledInput
// //                        id="filled-adornment-amount"
// //                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}/>
// //                    </FormControl>
// //                    </td>
// //                  </tr>
// //                </tbody>   
// //              </Table>
// //              </Modal.Body>
// //              <Modal.Footer style={{backgroundColor:'#E2E3E3'}}>
// //                <Button variant="secondary" onClick={this.handleClose}>
// //                  Close
// //                </Button>
// //                <Button variant="success" onClick={this.handleClose}>
// //                  Enter
// //                </Button>
// //              </Modal.Footer>
// //            </Modal>
// //         <div className="container">
// //           <div className="pt-5 d-flex" style={{ marginLeft: '156px' }}>
// //             <div className="d-flex">
// //               <h5 className="p-4">From</h5>
// //               {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
// //                 <DemoContainer components={['DatePicker']}>
// //                   <DatePicker
// //                     format="DD/MM/YYYY"
// //                     value={this.state.fromDate}
// //                     onChange={(date) => this.setState({ fromDate: new Date(date).toLocaleDateString('fr-FR') })}
// //                   />
// //                 </DemoContainer>
// //               </LocalizationProvider> */}
// //               <input type='date' value={this.state.fromDate} onChange={(date) => this.setState({ fromDate: date.value })}  />
// //             </div>

// //             <div className="d-flex">
// //               <h5 className="p-4">To</h5>
// //               {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
// //                 <DemoContainer components={['DatePicker']}>
// //                   <DatePicker
// //                     format="DD/MM/YYYY"
// //                     value={this.state.toDate}
// //                     onChange={(date) => this.setState({ toDate: date })}
// //                   />
// //                 </DemoContainer>
// //               </LocalizationProvider> */}
// //               <input type='date' value={this.state.toDate} onChange={(date) => this.setState({ toDate: date.value })} />
// //             </div>

// //             <div className="pt-2 ps-4">
// //               <button className="button-18" role="button" onClick={this.handleFilterClick}>
// //                 <h6 className="mb-0">Filter</h6>
// //               </button>
// //             </div>
// //           </div>

// //           <div className="table-responsive">
// //             <table responsive id="DiscountTable" className="display">
// //               <thead>
// //                 <tr>
// //                   <th>Invoice no</th>
// //                   <th>Roll No</th>
// //                   <th>Student Name</th>
// //                   <th>Standard</th>
// //                   <th>Group</th>
// //                   <th>Section</th>
// //                   <th>Hostel/Day</th>
// //                   <th>Sponsor Name</th>
// //                   <th>Email</th>
// //                   <th>Actual Amount</th>
// //                   <th>Discount Amount</th>
// //                   <th>Discounted Amount</th>
// //                   <th>Date</th>
// //                   <th>year</th>
// //                   <th>Due Date</th>
// //                   <th>Payment Status</th>
// //                   <th>Created By</th>
// //                   <th>Payable Fee</th>
// //                   <th>View Invoice</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {tableData.map((row) => (
// //                   <tr key={row.invoice_no}>
// //                     <td>{row.invoice_no}</td>
// //                     <td>{row.roll_no}</td>
// //                     <td>{row.name}</td>
// //                     <td>{row.standard}</td>
// //                     <td>{row.twe_group}</td>
// //                     <td>{row.sec}</td>
// //                     <td>{row.hostelOrDay}</td>
// //                     <td>{row.sponser_id}</td>
// //                     <td>{row.email}</td>
// //                     <td>{row.actual_amount}</td>
// //                     <td>{row.discount_percent}</td>
// //                     <td>{row.amount}</td>
// //                     <td>{row.date}</td>
// //                     <td>{row.acad_year}</td>
// //                     <td>{row.due_date}</td>
// //                     <td>{row.payment_status}</td>
// //                     <td>{row.created_by}</td>
// //                     <td>
// //                       <MdPayments
// //                         style={{ color: '#F07600', cursor: 'pointer', textAlign: 'center' }}
// //                         size={25}
// //                         onClick={() => {
// //                           this.handleShow();
// //                         }}
// //                       />
// //                     </td>
// //                     <td>
// //                       <a href={`/GeneralInvoice/StudentInvoice?invoiceNo=${row.invoiceNo}`} target="_blank">
// //                         <FaFileInvoiceDollar
// //                           style={{ color: 'green', cursor: 'pointer', textAlign: 'center' }}
// //                           size={25}
// //                         />
// //                       </a>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }
// // }

// // export default DiscountTable;