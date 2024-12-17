import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import HostelTable from '../Hostel/HostelTable'
import axios from 'axios'
import SiderbarHotel from '../Hostel/SiderbarHotel'
import HeaderHostel from '../HeaderHostel';
import {Row,Col,Button,Form,Modal} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';

const HostelFeeMap = () => {

  const [newInvoiceClass, setNewInvoiceClass] = useState('');
  const [newAmount, setnewAmount] = useState('');
  const [newFeesHeading, setnewFeesHeading] = useState('');
  const [newFeesSubHeading, setNewFeesSubHeading] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newAcadYear, setNewAcadYear] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [subCategory, setSubCategory] = useState([]);


  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  useEffect(() => {
    // Fetch data from the API and update the options state
    const fetchData = async () => {
      try {
        const response = await axios.get('');
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  
  const [initialAmount, setInitialAmount] = useState();
  const [partialAmount, setPartialAmount] = useState();
  const [result, setResult] = useState(0);

  const handleInitialAmountChange = (event) => {
    setInitialAmount(Number(event.target.value));
  };

  const handlePartialAmountChange = (event) => {
    const partial = Number(event.target.value);
    setPartialAmount(partial);
    setResult(initialAmount - partial);
  };


  ////////////// Date and Time /////////////////////
  const [validated, setValidated] = useState(false);
  const [Cdate, setDate] = useState(new Date().toLocaleDateString('fr-FR'));
  
  const getStudents = async () => {
    if (newInvoiceClass ) {
       console.log(newInvoiceClass);
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
           console.log(options);
           setOptions(options);
         }
      } catch (error) {
        console.log(error);
      }
    }
  }

//  /////////  Fee Map for LKG to 12 ////////////////

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(event.target);

      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      data['due_date'] = Cdate;
      try {
        const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/feesmap-insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          // API call successful
          const responseData = await response.json();
          console.log(responseData); // Do something with the response data
          Swal.fire({
            icon: 'success',
            title: 'Created successfully !',
            showConfirmButton: false,
            timer: 1800
          })
        } else {
          // API call failed
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }

    setValidated(true);
  };

  // Individual Student
  const handleSubmit2 = async (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(event.target);
      try {
        const studentIds = selectedOptions.map(option => option.value);
        const created_by = sessionStorage.getItem('user_id');
        console.log(newDueDate); 

        const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/feesmap-insertByID', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_id: studentIds[0].toString(),
            standard: newInvoiceClass.toString(),
            amount: newAmount.toString(),
            fees_heading: newFeesHeading,
            fees_sub_heading: newFeesSubHeading,
            due_date: Cdate,
            acad_year: newAcadYear.toString(),
            created_by: created_by.toString()
          }),
          
          
        });
        if (response.ok) {
          // API call successful
          const responseData = await response.json();
          console.log(responseData); // Do something with the response data
          Swal.fire({
            icon: 'success',
            title: 'Created successfully !',
            showConfirmButton: false,
            timer: 1800
          })
        } else {
          // API call failed
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }

    setValidated(true);
  };
  
////////////// LKG /////////////////////
  const [year, setYear] = React.useState('');

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const feeCategoryChange = (e) => {
    const selectedValue = e.target.value;

    setnewFeesHeading(selectedValue);

    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('id');
  // console.log(option);
  let url = '';
    if(option == 'SM')
      url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolmiscelfees-master-read';
    else if(option == 'HB')
      url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/hostelfee-master-read';
    else if(option == 'SF')
      url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolfees-master-read';
    else if(option == 'O')
      url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/otherfees-master-read';

    fetchSections(url);

  }

  const fetchSections = async (url) => {
    console.log(url);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.data);
      setSubCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    <SiderbarHotel/>
      <div style={{width:'82.5%',float:'right'}} >
   <HeaderHostel/>

   <div className='p-4' >
    <div style={{borderRadius:'10px', border:'1px solid #000',backgroundColor:'#ffff'}}>
      <div className='container py-3'>
        <h3 style={{fontFamily:'sans-serif'}}>Individual student fee map</h3><hr/>
      </div>

      <div className='container pb-4'>
        <Form onSubmit={handleSubmit2}>
          <Row>
          <Col>
               <Form.Label>Grade</Form.Label>
                  <Form.Select style={{height:'60%', borderColor:'#000'}} name='standard' 
                  value={newInvoiceClass}  onChange={(e) => setNewInvoiceClass(e.target.value)} onClick={getStudents}>
                  <option>Select Class</option>
                  <option value="lkg">LKG</option>
                  <option value="ukg">UKG</option>
                  <option value="1">I</option>
                  <option value="2">II</option>
                  <option value="3">III</option>
                  <option value="4">IV</option>
                  <option value="5">V</option>
                  <option value="6">VI</option>
                  <option value="7">VII</option>
                  <option value="8">VIII</option>
                  <option value="9">IX</option>
                  <option value="10">X</option>
                  <option value="11">XI</option>
                  <option value="12">XII</option>
                </Form.Select>
          </Col>
          <Col style={{paddingBottom:'11px'}} >
            <Form.Label>Student</Form.Label>
            <Select className='selectStudent'
              isMulti
              options={options}
              value={selectedOptions}
              onChange={handleSelectChange}
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: '60px',
                }),
              }} />

            </Col>
          </Row>
          <Row>
          <Col>
            <Form.Group controlId="feeCategory">
              <Form.Label className='ps-2'>Fee Category</Form.Label>
              <Form.Select required value={newFeesHeading}   className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'55px',borderColor:'#000'}} >
            <option>Select Fee Category</option>
                {/* <option value="School Fees" id="SF">School Fees</option> */}
                {/* <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
            </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="feeCategory">
              <Form.Label className='ps-2'>Sub Category</Form.Label>
              <Form.Select required value={newFeesSubHeading} onChange={(e)=> setNewFeesSubHeading (e.target.value)} className='custom-input' name="fees_sub_heading" style={{width:'100%',height:'55px',borderColor:'#000'}}>
              <option value="">Select Sub Category</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
             
            </Form.Select>
            </Form.Group>
          </Col>
          </Row>

          <Row className='mt-3'>
            <Col className='pt-2'>
            <Form.Group controlId="year">
            <Form.Label>Academic year</Form.Label>
              <Form.Control value={newAcadYear} onChange={(e)=> setNewAcadYear(e.target.value)} placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px',borderColor:'#000'}} required/>
            </Form.Group>
            </Col>
          <Col className='pt-2'>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control style={{width:'100%',height:'55px', borderColor:'#000'}}
                onChange={(e)=>setnewAmount(e.target.value)} value={newAmount}
                required 
                type="number"
                name="amount"
                className="custom-input"
                placeholder="₹ Amount"/>
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="date">
          <Form.Label>Enter Date</Form.Label>
              <div className='pt-2'>
                  <DatePicker className='datepicker-wrapper' 
                      dateFormat="dd/MM/yyyy" style={{width: '200%'}}
                      value={Cdate}
                      onChange={(date) => {
                        const d = new Date(date).toLocaleDateString('fr-FR');
                        console.log(d);
                        setDate(d)
                         }}/>
                  </div>
          </Form.Group>      
          </Col>
      </Row>
        <div className='py-4'>
          <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
        </div>
        </Form>
      </div>
      </div>

      <div style={{borderRadius:'10px', border:'1px solid #000',backgroundColor:'#ffff',marginTop:'20px'}}>
      <div className='container py-3'>
        <HostelTable/>
      </div>
      </div>

  
</div>
 </div>
 </div>
  )
}

export default HostelFeeMap




////////////////////////////////////////////






// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import axios from 'axios'
// import SiderbarHotel from '../Hostel/SiderbarHotel'
// import HeaderHostel from '../HeaderHostel';
// import {Row,Col,Button,Form,Modal} from 'react-bootstrap';
// import DatePicker from "react-datepicker";
// import $ from 'jquery';
// import { MdDelete } from 'react-icons/md';
// import { FaRegEdit } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import ReactDOM from 'react-dom';

// import 'jquery/dist/jquery.min.js';
// import 'datatables.net/js/jquery.dataTables';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';
// import 'datatables.net-buttons/js/dataTables.buttons.js';
// import 'datatables.net-buttons/js/buttons.colVis.js';
// import 'datatables.net-buttons/js/buttons.flash.js';
// import 'datatables.net-buttons/js/buttons.html5.js';
// import 'datatables.net-buttons/js/buttons.print.js';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';


// const HostelFeeMap = () => {

//   const [options, setOptions] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [validated, setValidated] = useState(false);
//   const [Cdate, setDate] = useState(new Date().toLocaleDateString('fr-FR'));
//   const [subCategory, setSubCategory] = useState([]);
//   const [editStudentName, setEditStudentName] = useState('');
//   const [editRollNumber, setEditRollNumber] = useState('');
//   const [editAcademic, setEditAcademic] = useState('');
//   const [editFeecategory, setEditFeecategory] = useState('');
//   const [editSubcategory, setEditSubcategory] = useState('');
//   const [editTotalamount, setEditTotalamount] = useState('');
//   const [editDueDate, setEditDueDate] = useState('');
//   const [created_by, setCreated_by] = useState('');
//   const [editId, setEditId] = useState('');
//   const [showModal, setShowModal] = useState(false);



//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     switch (name) {
//       case 'editStudentName':
//         setEditStudentName(value);
//         break;
//       case 'editRollNumber':
//         setEditRollNumber(value);
//         break;
//       case 'editAcademic':
//         setEditAcademic(value);
//         break;
//       case 'editFeecategory':
//         setEditFeecategory(value);
//         break;
//       case 'editSubcategory':
//         setEditSubcategory(value);
//         break;
//       case 'editTotalamount':
//         setEditTotalamount(value);
//         break;
//       case 'editDueDate':
//         setEditDueDate(value);
//         break;
//       case 'created_by':
//         setCreated_by(value);
//         break;
//       default:
//         break;
//     }
//   };

//   useEffect(() => {
//     var openModal = openModal;
//     var content = this;

//     $(document).ready(function () {
//       $('#FirstStandardFeeTable').DataTable({
//         destroy: true,
//         processing: true,
//         serverSide: false,
//         ajax: {
//           url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/studentsMaps/1',
//           type: 'POST',
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
//             targets: 8,
//           },
//         ],
//         columns: [
//           { data: 'name' },
//           { data: 'roll_no' },
//           { data: 'acad_year' },
//           { data: 'fee_heading' },
//           { data: 'fee_sub_heading' },
//           { data: 'amount' },
//           { data: 'date' },
//           { data: 'created_by' },
//           {
//             data: 'action',
//             targets: 8,
//             createdCell: (td, cellData, rowData, row, col) =>
//               ReactDOM.render(
//                 [
//                   <FaRegEdit
//                     style={{ color: 'green', cursor: 'pointer' }}
//                     size={25}
//                     onClick={() => {
//                       openModal();
//                       content.getById(rowData.slno);
//                     }}
//                   />,
//                   <MdDelete
//                     style={{ color: 'red', cursor: 'pointer' }}
//                     size={28}
//                     onClick={() => {
//                       content.deleteLKG(rowData.slno);
//                     }}
//                   />,
//                 ],
//                 td
//               ),
//           },
//         ],
//       });
//     });
//   }, []);

//   const editLKG = async () => {
//     try {
//       const response = await fetch(
//         'https://www.santhoshavidhyalaya.com/SVSTEST/api/feesmap-update',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             id: editId,
//             name: editStudentName,
//             roll_no: editRollNumber,
//             acad_year: editAcademic,
//             fee_heading: editFeecategory,
//             fee_sub_heading: editSubcategory,
//             amount: editTotalamount,
//             created_by: sessionStorage.getItem('user_id'),
//             status: 1,
//           }),
//         }
//       );
//       const data = await response.json();
//       $('#FirstStandardFeeTable').DataTable().ajax.reload();
//       Swal.fire({
//         icon: 'success',
//         title: 'Update successfully !',
//         showConfirmButton: false,
//         timer: 1800,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchSections = async (url) => {
//     console.log(url);
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log(data.data);
//       setSubCategory(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleEditFeecategoryChange = (e) => {
//     setEditFeecategory(e.target.value);
//     const index = e.target.selectedIndex;
//     const el = e.target.childNodes[index];
//     const option = el.getAttribute('id');
//     let url = '';
//     if (option == 'SM')
//       url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolmiscelfees-master-read';
//     else if (option == 'HB')
//       url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/hostelfee-master-read';
//     else if (option == 'SF')
//       url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolfees-master-read';
//     else if (option == 'O')
//       url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/otherfees-master-read';

//     fetchSections(url);
//   };



//   const handleSelectChange = (selectedOptions) => {
//     setSelectedOptions(selectedOptions);
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('');
//         setOptions(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);


//   return (
//     <div>
//     <SiderbarHotel/>
//       <div style={{width:'82.5%',float:'right'}} >
//    <HeaderHostel/>

//    <div className='p-4' >
//     <div style={{borderRadius:'10px', border:'1px solid #000',backgroundColor:'#ffff'}}>
//       <div className='container py-3'>
//         <h3 style={{fontFamily:'sans-serif'}}>Individual student fee map</h3><hr/>
//       </div>

//       <div className='container pb-4'>
//         <Form>
//           <Row>
//           <Col>
//                <Form.Label>Grade</Form.Label>
//                   <Form.Select style={{height:'60%', borderColor:'#000'}} name='standard' >
//                   <option>Select Class</option>
//                   <option value="ukg">LKG</option>
//                   <option value="lkg">UKG</option>
//                   <option value="1">I</option>
//                   <option value="2">II</option>
//                   <option value="3">III</option>
//                   <option value="4">IV</option>
//                   <option value="5">V</option>
//                   <option value="6">VI</option>
//                   <option value="7">VII</option>
//                   <option value="8">VIII</option>
//                   <option value="9">IX</option>
//                   <option value="10">X</option>
//                   <option value="11">XI</option>
//                   <option value="12">XII</option>
//                 </Form.Select>
//           </Col>
//           <Col style={{paddingBottom:'11px'}} >
//             <Form.Label>Student</Form.Label>
//             <Select className='selectStudent'
//               isMulti
//               options={options}
//               value={selectedOptions}
//               onChange={handleSelectChange}
//               styles={{
//                 control: (provided) => ({
//                   ...provided,
//                   height: '60px',
//                 }),
//               }} />

//             </Col>
//           </Row>
//           <Row>
//           <Col>
//             <Form.Group controlId="feeCategory">
//               <Form.Label className='ps-2'>Fee Category</Form.Label>
//               <Form.Select className='custom-input' name="fees_heading" style={{width:'100%',height:'55px', borderColor:'#000'}}>
//                 <option>Select Fee Category</option>
//                   <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                   <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                   <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group controlId="feeCategory">
//               <Form.Label className='ps-2'>Sub Category</Form.Label>
//               <Form.Select required className='custom-input' name="fees_heading" style={{width:'100%',height:'55px', borderColor:'#000'}}>
//                 <option>Select Fee Category</option>
//                   <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                   <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                   <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           </Row>

//           <Row className='mt-3'>
//             <Col className='pt-2'>
//             <Form.Group controlId="year">
//             <Form.Label>Amount</Form.Label>
//               <Form.Control placeholder='Enter Academic year' type='text' name="acad_year" style={{width:'100%',height:'55px',borderColor:'#000'}} required/>
//             </Form.Group>
//             </Col>
//           <Col className='pt-2'>
//             <Form.Group controlId="amount">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control style={{width:'100%',height:'55px', borderColor:'#000'}}
//                 required 
//                 type="number"
//                 name="amount"
//                 className="custom-input"
//                 placeholder="₹ Amount"/>
//             </Form.Group>
//           </Col>
//           <Col>
//           <Form.Group controlId="date">
//           <Form.Label>Enter Date</Form.Label>
//               <div className='pt-2'>
//                   <DatePicker className='datepicker-wrapper' 
//                       dateFormat="dd/MM/yyyy" style={{width: '200%'}}
//                       value={Cdate}
//                       onChange={(date) => {
//                         const d = new Date(date).toLocaleDateString('fr-FR');
//                         console.log(d);
//                         setDate(d) }}/>
//                   </div>
//           </Form.Group>      
//           </Col>
//       </Row>
//         <div className='py-4'>
//           <Button type='submit' style={{width:'11%'}} variant="success">Submit</Button>{' '}
//         </div>
//         </Form>
//       </div>
//       </div>

//       <div style={{borderRadius:'10px', border:'1px solid #000',backgroundColor:'#ffff',marginTop:'20px'}}>
//       <div className='container'>
//       <div className="MainDiv">
//       <div className='pt-5' >
//         <Modal className='mt-5' show={showModal} onHide={closeModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>1st Standard</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Control
//                 autoComplete="off"
//                 value={editId}
//                 type="hidden"/>
//               <Form.Group className='pt-2' controlId="name">
//                 <Form.Label className='d-flex'>Student Name <p className='ps-1 text-danger mb-0'>(View Only)</p></Form.Label>
//                 <Form.Control
//                   readOnly style={{ backgroundColor: '#e0e0e0' }}
//                   autoComplete="off"
//                   value={editStudentName}
//                   onChange={(e) => handleChange({ name: 'editStudentName', value: e.target.value })}
//                   type="text" />
//               </Form.Group>
//               <Form.Group className='pt-2' controlId="name">
//                 <Form.Label className='d-flex'>Roll Number <p className='ps-1 text-danger mb-0'>(View Only)</p></Form.Label>
//                 <Form.Control
//                   readOnly style={{ backgroundColor: '#e0e0e0' }}
//                   autoComplete="off"
//                   value={editRollNumber}
//                   onChange={(e) => handleChange({ name: 'editRollNumber', value: e.target.value })}
//                   type="text" />
//               </Form.Group>
//               <Form.Group className='pt-2' controlId="name">
//                 <Form.Label className='d-flex'>Academic Year <p className='ps-1 text-danger mb-0'>(View Only)</p></Form.Label>
//                 <Form.Control
//                   readOnly style={{ backgroundColor: '#e0e0e0' }}
//                   autoComplete="off"
//                   value={editAcademic}
//                   onChange={(e) => handleChange({ name: 'editAcademic', value: e.target.value })}
//                   type="text" />
//               </Form.Group>

//               <Form.Group className='pt-2' controlId="feeCategory">
//                 <Form.Label className='d-flex'>Fee Category <p className='ps-1 text-danger mb-0'>(View Only)</p></Form.Label>

//                 <Form.Select required value={editFeecategory} name="fees_heading" onChange={handleEditFeecategoryChange} style={{ width: '100%', height: '55px' }}>
//                   <option>Select Fee Category</option>
//                   <option value="School Fees" id="SF">School Fees</option>
//                   <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option>
//                   <option value="Hostel Bill" id="HB">Hostel Bill</option>
//                   <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option>
//                 </Form.Select>
//               </Form.Group>

//               <Form.Group className='pt-2' controlId="message">
//                 <Form.Label className='d-flex'>Total Amount<p className='ps-1 text-success mb-0'>(Editable)</p></Form.Label>
//                 <Form.Control
//                   autoComplete="off"
//                   value={editTotalamount}
//                   onChange={(e) => handleChange({ name: 'editTotalamount', value: e.target.value })}
//                   type="number" />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={closeModal}>
//               Close
//             </Button>
//             <Button variant="success" onClick={editLKG}>
//               Update
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>

//       <div className="container">
//         <table id="FirstStandardFeeTable" className="display">
//           <thead>
//             <tr>
//               <th>Student Name</th>
//               <th>Roll No</th>
//               <th>Academic Year</th>
//               <th>Fee Category</th>
//               <th>Sub Category</th>
//               <th>₹ Total Amount</th>
//               <th>Date</th>
//               <th>Created By</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//     </div>
//       </div>
//       </div>

  
// </div>
//  </div>
//  </div>
//   )
// }

// export default HostelFeeMap
