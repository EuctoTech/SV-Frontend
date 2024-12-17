import React, { useRef, useState, useEffect } from "react";
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import { TbWorldUpload } from 'react-icons/tb'
import { IoSearchOutline } from "react-icons/io5";
import './table.css'
import Swal from 'sweetalert2';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import SvsInvoice from '../Svs-invoice.jpg';
import ReactToPrint from 'react-to-print';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Typography  } from '@mui/material';
import { Print } from '@mui/icons-material';
import ReactDOM from 'react-dom';
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

const LedgerSummary = () => {
  const componentRef = useRef();

  const [newInvoiceClass, setNewInvoiceClass] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOptionsStudent, setSelectedOptionsStudent] = useState([]);
  const [selectedOptionsInvoice, setSelectedOptionsInvoice] = useState([]);
  const [selectedOptionsReciepts, setSelectedOptionsReciepts] = useState([]);
  const [selectedOptionsAdmission, setSelectedOptionsAdmission] = useState([]);
  const [selectedOptionsReciptInvoice, setSelectedOptionsReciptInvoice] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null); 
  const [optionsreciepts, setOptionsReciepts] = useState([]);
  const [optionsinvoice, setOptionsInvoice] = useState([]);
  const [optionsAdmission, setOptionsAdmission] = useState([]);

  const getStudents = async () => {
    if (newInvoiceClass) {
      try {
        const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/studentByGrades/${newInvoiceClass}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          } 
        });
        const data = await response.json();
        if (data) {
          const options = data.map(item => ({
            value: item.id,
            label: item.concordinate_string
          }));
          setOptions(options);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const Invoice = async () => {
      try {
        const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/invoiceSearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          } 
        });
        const data = await response.json();
        if (data) {
          const options = data.map(item => ({
            value: item.slno,
            label: item.invoice_no
          }));
          setOptionsInvoice(options);
        }
      } catch (error) {
        console.log(error);
      } 
    }

    const Admission = async () => {
      try {
        const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/admissionSearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          } 
        });
        const data = await response.json();
        if (data) {
          const options = data.map(item => ({
            value: item.id,
            label: item.admission_no 
          }));
          setOptionsAdmission(options);
        }
      } catch (error) {
        console.log(error);
      } 
    }

    const Recipt = async () => {
      try {
        const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/ReciptSearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          } 
        });
        const data = await response.json();
        if (data) {
          const options = data.map(item => ({
            value: item.id,
            label: item.transactionId
          }));
          setOptionsReciepts(options);
        }
      } catch (error) {
        console.log(error);
      } 
    }
    Invoice(); Recipt(); Admission();
  }, []);

  const handleFilter = async () => {
    try {
      const response = await axios.post(
        "https://www.santhoshavidhyalaya.com/SVSTEST/api/listgenratefilter",
        {
          from: fromDate,
          to: toDate,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectChangeInvoice = (selectedOptions) => {
    setSelectedOptionsInvoice(selectedOptions);
  };

  const handleSelectChangeStudent = (selectedOptions) => {
    setSelectedOptionsStudent(selectedOptions);
  };

  const handleSelectChangeReciepts = (selectedOptions) => {
    setSelectedOptionsReciepts(selectedOptions);
  };

  const handleSelectChangeAdmission = (selectedOptions) => {
    setSelectedOptionsAdmission(selectedOptions);
  };

  $(document).ready(function () {
    $('#ThirdStandardFeeTable3').DataTable({
      destroy: true,
      processing: true,
      serverSide: true,
      ajax: {
        url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/studentsMaps/3',
        type: 'POST',
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
        }
      ],
      columns: [
        { data: 'slno', title: 'Serial Number', className: 'text-dark' },
        { data: 'roll_no', title: 'Roll Number', className: 'text-dark' },
        { data: 'acad_year', title: 'Academic Year', className: 'text-dark' },
        { data: 'amount', title: 'Amount 1', className: 'text-dark' },
        { data: 'amount', title: 'Amount 2', className: 'text-dark' },
        { data: 'amount', title: 'Amount 3', className: 'text-dark' },
        { data: 'amount', title: 'Amount 4', className: 'text-dark' }
      ],
      initComplete: function () {
        var api = this.api();
  
        // Convert to array
        var intVal = function (i) {
          return typeof i === 'string' ?
            i.replace(/[\$,]/g, '') * 1 :
            typeof i === 'number' ?
            i : 0;
        };
  
        // Total over all pages
        var total1 = api
          .column(3, { search: 'applied' })
          .data()
          .reduce(function (a, b) {
            return intVal(a) + intVal(b);
          }, 0);
  
        var total2 = api
          .column(4, { search: 'applied' })
          .data()
          .reduce(function (a, b) {
            return intVal(a) + intVal(b);
          }, 0);
  
        var total3 = api
          .column(5, { search: 'applied' })
          .data()
          .reduce(function (a, b) {
            return intVal(a) + intVal(b);
          }, 0);
  
        var total4 = api
          .column(6, { search: 'applied' })
          .data()
          .reduce(function (a, b) {
            return intVal(a) + intVal(b);
          }, 0);
  
        // Update footer
        $(api.column(3).footer()).html(total1.toFixed(2));
        $(api.column(4).footer()).html(total2.toFixed(2));
        $(api.column(5).footer()).html(total3.toFixed(2));
        $(api.column(6).footer()).html(total4.toFixed(2));
      }
    });
  });
  
  return (
    <div className="pt-5">
      <Header />
      <Sidebar />
      <div className="col-lg-12" ref={componentRef}>
        <Paper className="p-4">
          <Row className="align-items-center">
            <Col lg={2}>
              <h5 className="mb-3">Student Roll No</h5>
              <Select
                options={options}
                onChange={handleSelectChangeStudent}
                isMulti
              />
            </Col>
            <Col lg={2}>
              <h5 className="mb-3">Invoice Number</h5>
              <Select
                options={optionsinvoice}
                onChange={handleSelectChangeInvoice}
                isMulti
              />
            </Col>
            <Col lg={2}>
              <h5 className="mb-3">Receipts Number</h5>
              <Select
                options={optionsreciepts}
                onChange={handleSelectChangeReciepts}
                isMulti
              />
            </Col>
            <Col lg={2}>
              <h5 className="mb-3">Admission Number</h5>
              <Select
                options={optionsAdmission}
                onChange={handleSelectChangeAdmission}
                isMulti
              />
            </Col>
            <Col lg={2}>
              <h5 className="mb-3">From Date</h5>
              <Form.Control
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Col>
            <Col lg={2}>
              <h5 className="mb-3">To Date</h5>
              <Form.Control
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Col>
            <Col lg={12}>
              <div className="d-grid">
                <Button variant="contained" color="success" onClick={handleFilter}>
                  Search
                </Button>
              </div>
            </Col>
          </Row>
          <div className="table-responsive">
            <table id="ThirdStandardFeeTable3" className="table table-bordered">
              <thead className="text-center bg-primary text-white">
                <tr>
                  <th>Slno</th>
                  <th>Roll No</th>
                  <th>Academic Year</th>
                  <th>Amount 1</th>
                  <th>Amount 2</th>
                  <th>Amount 3</th>
                  <th>Amount 4</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </Paper>
      </div>
      <Footer />
    </div>
  );
}

export default LedgerSummary;
