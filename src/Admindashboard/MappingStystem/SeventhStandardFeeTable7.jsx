import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import $ from 'jquery'; 
import {MdDelete} from 'react-icons/md'
import {FaRegEdit} from 'react-icons/fa'
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom'
//Datatable Modules
import 'jquery/dist/jquery.min.js';
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"


class SeventhStandardFeeTable7 extends React.Component {



  constructor(props) {
    super(props);

    this.state = {
      subCategory:[],
      editStudentName: '',
      editRollNumber: '',
      editAcademic: '',
      editFeecategory: '',
      editSubcategory: '',
      editTotalamount: '',
      editDueDate:'',
      created_by:'',
      editId: '',
      showModal: false,
    };
  }

  openModal = () => {
    this.setState({
      showModal: true
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    var openModal = this.openModal;
    var content = this;
    var $fileName = 'FeesMap' + new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
    $(document).ready(function () {
      $('#SeventhStandardFeeTable7').DataTable({
        destroy: true,
        processing: true,
        serverSide: true,
        lengthMenu: [50, 100, 200, 300, 500,1000],
        ajax: {
          url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/studentsMaps/7',
          type: 'POST',
        },
        dom: 'lfBrtip',
        buttons: [
          {
            extend: 'copy',
            className: 'btn btn-success',
            filename: $fileName,
          },
          {
            extend: 'csv',
            className: 'btn btn-danger',
            filename: $fileName,
          },
          {
            extend: 'print',
            className: 'btn btn-warning',
            filename: $fileName,
          }
        ],
        columnDefs: [
          {
            "data": 'action',
            "defaultContent": "<button>Edit</button>",
            "targets": 8
          }],
        columns: [
            { data: 'name' },
            { data: 'roll_no' },
            { data: 'acad_year' },
            { data: 'fee_heading' },
            { data: 'fee_sub_heading' },
            { data: 'amount' },
            { data: 'date' },
            // { data: 'standard' },
            // { data: 'status' },
            { data: 'created_by'},
            { data: 'action', "targets": 8, createdCell: (td, cellData, rowData, row, col) =>
            ReactDOM.render(
              [<FaRegEdit style={{color:'green', cursor:'pointer'}} size={25}
              onClick={() => {openModal(); content.getById(rowData.slno);}}/>
               ,
              <MdDelete style={{color:'red', cursor:'pointer'}} size={28}
              onClick={() => {content.deleteLKG(rowData.slno)}}
            />], td)},
        ],
      });
    });
   }
  // Get By Edit
  getById = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/view/studentsMaps/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      this.setState((prevState) => ({
        editId : data[0].slno,
        editStudentName : data[0].name,
        editRollNumber : data[0].roll_no,
        editAcademic : data[0].acad_year,
        editFeecategory : data[0].fee_heading,
        editSubcategory : data[0].fee_sub_heading,
        editTotalamount : data[0].amount,
        editDueDate : data[0].date,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  editLKG = async () => {
    try {
      const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/feesmap-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.editId,
          name: this.state.editStudent,
          roll_no: this.state.editRollNumber,
          acad_year: this.state.editAcademic,
          fee_heading: this.state.editFeecategory,
          fee_sub_heading: this.state.editSubcategory,
          amount: this.state.editTotalamount,
          created_by: sessionStorage.getItem('user_id'),
          status: 1,
        }),
      });
      const data = await response.json();
      $('#SeventhStandardFeeTable7').DataTable().ajax.reload();
      Swal.fire({
        icon: 'success',
        title: 'Update successfully !',
        showConfirmButton: false,
        timer: 1800
      })
      this.handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  deleteLKG= async (id) => {
    try {
      await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/del/studentsMaps/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   id: id,
        // }),
      });

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Add code here to delete the input
          try {
            await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/sponser-master-delete`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: id,
              }),
            });

            $('#SeventhStandardFeeTable7').DataTable().ajax.reload();
            Swal.fire('Deleted!', 'Your input has been deleted.', 'success');
          } catch (error) {
            console.log(error);
            Swal.fire('Error', 'An error occurred while deleting the input.', 'error');
          }
        } else {
          // Code to execute if the user clicks "Cancel"
          Swal.fire('Cancelled', 'Your input is safe.', 'info');
        }
      });
      
    } catch (error) {
      console.log(error);
    }
  };

    //Model POPUP feecat follow by Subcat
    fetchSections = async (url) => {
      console.log(url);
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.data);
        this.setState({subCategory: data.data});
      } catch (error) {
        console.log(error);
      }
    };
  
    handleEditFeecategoryChange =(e)=>{
      this.setState({editFeecategory:e.target.value})
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
  
      this.fetchSections(url);
    }

  render(){

    const { 
      editStudentName,
      editRollNumber,
      editAcademic,
      editFeecategory,
      editSubcategory,
      editTotalamount,
      subCategory,
      editId,
    } = this.state;



    
  return (

    <div className="MainDiv">

<div className='pt-5' >
    <Modal className='mt-5' show={this.state.showModal} onHide={this.closeModal}>
       <Modal.Header closeButton>
         <Modal.Title>7th Standard</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <Form>
         <Form.Control 
           autoComplete="off"
                     value={editId}
                     type="hidden"  />

           <Form.Group className='pt-2' controlId="name">
             <Form.Label className='d-flex'>Student Name <p className='ps-1 text-danger mb-0'>(View Only)</p></Form.Label>
             <Form.Control readOnly style={{backgroundColor:'#e0e0e0'}}
                autoComplete="off"
                     value={editStudentName}
                     onChange={(e) => this.setState({ editStudentName: e.target.value })}
                     type="text"  />
           </Form.Group>
           <Form.Group className='pt-2' controlId="name">
             <Form.Label className='d-flex'>Roll Number <p className='ps-1 text-danger mb-0'>(View Only)</p></Form.Label>
             <Form.Control readOnly style={{backgroundColor:'#e0e0e0'}}
                autoComplete="off"
                     value={editRollNumber}
                     onChange={(e) => this.setState({ editRollNumber: e.target.value })}
                     type="text"  />
           </Form.Group>
           <Form.Group className='pt-2' controlId="name">
             <Form.Label className='d-flex'>Academic Year <p className='ps-1 text-danger mb-0'>(View Only)</p></Form.Label>
             <Form.Control readOnly style={{backgroundColor:'#e0e0e0'}}
                autoComplete="off"
                     value={editAcademic}
                     onChange={(e) => this.setState({ editAcademic: e.target.value })}
                     type="text"  />
           </Form.Group>

            <Form.Group className='pt-2' controlId="feeCategory">
                <Form.Label className='d-flex'>Fee Category <p className='ps-1 text-danger mb-0'>(View Only)</p></Form.Label>
                
             <Form.Select  required value={editFeecategory}  name="fees_heading" onChange={this.handleEditFeecategoryChange} style={{width:'100%',height:'55px'}} disabled>
            <option>Select Fee Category</option>
                <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="School miscellaneous bill" id="SM">School miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other hostel and Educational Expenditure" id="O">Other hostel and Educational Expenditure</option> */}
            </Form.Select>
           </Form.Group>
           {/* <Form.Group className='pt-2' controlId="subCategory">
             <Form.Label>Sub Category</Form.Label>
             <Form.Select required  name="fees_sub_heading" style={{width:'100%',height:'55px'}} value={editSubcategory} onChange={(e) => this.setState({ editSubcategory: e.target.value })}>
              <option value="" disabled>--Select Sub Category--</option>
              {subCategory.map((res) => (
                <option value={res.sub_heading}>{res.sub_heading ?? ''}</option>
                ))}
            </Form.Select>
           </Form.Group>*/}
           
           <Form.Group className='pt-2' controlId="message">
             <Form.Label className='d-flex'>Total Amount<p className='ps-1 text-success mb-0'>(Editable)</p></Form.Label>        
             <Form.Control
               autoComplete="off"
               value={editTotalamount}
               onChange={(e) => this.setState({ editTotalamount: e.target.value })}
               type="number"  />
           </Form.Group>
       </Form>
        

       </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={this.closeModal}>
           Close
         </Button>
         <Button  variant="success" onClick={this.editLKG}>
                 Update
             </Button>
         </Modal.Footer>
     </Modal>
    </div>
 
      
     <div className="container">
       
       <table id="SeventhStandardFeeTable7" class="display">
         <thead>
         <tr>              
           <th>Student Name</th>
           <th>Roll No</th>
           <th>Academic Year</th>
           <th>Fee Category</th>
           <th>Sub Category</th>
           <th>₹ Total Amount</th>
           <th>Date</th>
           <th>Created By</th>
           <th>Action</th>
          </tr>
         </thead>
     </table>
       
     </div>
      </div>
  );
}

}

export default SeventhStandardFeeTable7



