import React,{useEffect,useState} from 'react';
import Navbarall from '../Navbarall'
import {AiOutlineDeliveredProcedure} from 'react-icons/ai'
import {Col,Row,Button,Table} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
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
import { IoIosEye } from 'react-icons/io';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import ReactDOM from 'react-dom';
import LinearProgress from '@mui/material/LinearProgress';

const BillingTable = () => {

  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  //////////// For Table Loading  //////////////
  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });
  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
//////////// For Table Loading  //////////////

/////// Table View  ///
useEffect(() => {
  fetch('https://euctostaging.com/prolife/api/bills/all')
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
        targets: 21,
      }
    ],
    columns: [
      { data: 'bill_no'  ,defaultContent: '-'},
      { data: 'date'  ,defaultContent: '-'},
      { data: 'patient_id'  ,defaultContent: '-'},
      { data: 'op_ip'  ,defaultContent: '-'},
      { data: 'dob'  ,defaultContent: '-'},
      { data: 'doctor_id'  ,defaultContent: '-'},
      { data: 'payment_mode' ,defaultContent: '-'},
      { data: 'bill_amount' ,defaultContent: '-'},
      { data: 'advance' ,defaultContent: '-'},
      { data:'bill_amount_after_advance' ,defaultContent: '-'},
      { data:'overall_discount' ,defaultContent: '-'},
      // { data:'discount_approved_overall' ,defaultContent: '-'},
      // { data:'discount_approved_by' ,defaultContent: '-'},
      { data:'remaining_amount' ,defaultContent: '-'},
      { data:'note',defaultContent: '-'},
      { data:'is_paid_fully',defaultContent: '-'},
      { data:'is_partial_paid',defaultContent: '-'},
      // { data:'services.bill_no',defaultContent: '-'},   
      // { data:'services.service_id',defaultContent: '-'},   
      // { data:'services.discount_amount',defaultContent: '-'},   
      // { data:'services.remarks',defaultContent: '-'},   
      // { data:'services.discount_approved',defaultContent: '-'},   
      // { data:'services.discount_approved_by',defaultContent: '-'},   
      { data:'patient.patient_name',defaultContent: '-'},   
      // { data:'patient.discount_approved',defaultContent: '-'},   
      { data:'patient.uhid',defaultContent: '-'},   
      { data:'patient.age',defaultContent: '-'},   
      { data:'patient.gender',defaultContent: '-'},   
      // { data:'doctor.id',defaultContent: '-'},   
      { data:'doctor.name',defaultContent: '-'},   
      { data:'rfdoctor.name',defaultContent: '-'},  
      {
        data: "action",
        targets: 21,
        createdCell: (td, cellData, rowData, row, col) =>
          ReactDOM.render(
            [
              <a  href={`/Bill/${rowData.bill_no}`}>
                <Button style={{width: '130px'}} variant="outline-success"><IoIosEye size={24} className='mr-2'/>View Bill</Button> </a>,
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





  return (
    <div>
    <div>
      <Navbarall/>
      <div className='py-4 px-5'>
        <div style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
          <div className='px-5 py-3'>
            <div style={{textAlign:'end', marginBottom:'20px'}}>
              <NavLink to='/Main/Billing/BillingForm'>
              <Button style={{backgroundColor:'#CCA047', color:'white'}}><AiOutlineDeliveredProcedure className='mr-2'/>Create Bill</Button></NavLink><hr/>
            </div>

       {/* Table  */}
           <div>
              <div className="MainDiv">
                {isLoading ? (
                  <div className='text-center'><h5>Loading... Thank you for your patience </h5><LinearProgress  variant="buffer" value={progress} valueBuffer={buffer} /></div>
                ) : (
                  <Table striped bordered hover responsive id="registaion" className="display">
              <thead>
                  <tr>
                    <th colSpan="6" style={{backgroundColor:'#CCA047'}}>Bill Details</th>
                    <th colSpan="9" style={{backgroundColor:'rgb(222 195 141)'}}>Amount</th>
                    <th colSpan="4" style={{backgroundColor:'#CCA047'}}>Patient</th>
                    <th colSpan="2" style={{backgroundColor:'rgb(222 195 141)'}}>Doctor & Ref Doctor</th>
                    <th className='text-center' style={{backgroundColor:'#CCA047'}}>View Bill</th>
                  </tr>
                  <tr>
                    <th>Bill No</th>
                    <th>Date</th>
                    <th>Patient ID</th>
                    <th>Op/Ip</th>
                    <th>DOB</th>
                    <th>Doctor ID</th>
                    <th>Payment Mode</th>
                    <th>Bill Amount</th>
                    <th>Advance</th>
                    <th>After Advance Amount</th>
                    <th>Overall Discount</th>
                    <th>Remaining Amount</th>
                    <th>Note</th>
                    <th>Payment Completed</th>
                    <th>Partial paid</th>
                    <th>Patient Name</th>
                    <th>uhid</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Doctor Name</th>
                    <th>Ref doctor</th>
                    <th className='text-center'>View</th>
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
    </div>
  )
}

export default BillingTable



