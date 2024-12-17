import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import $ from 'jquery';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';
import ReactDOM from 'react-dom';
import {FaRegEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"


class AddSponsorDatatable extends React.Component {

  state = {
    editName:'',
    editOccupation:'',
    editCompany_name:'',
    editLocation:'',
    editEmail_id:'',
    editPhone:'',
    editAddress1:'',
    editAddress2:'',
    editCity:'',
    editState:'',
    editPincode:'',
    editPan:'',
    editGst:'',
    created_by:'',
    editId: '',
    showModal: false,
  };


  handleClose = () => {
    this.setState({
      showModal: false
    });
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };
  

  componentDidMount() {
    var toggleModal = this.toggleModal;
    var content = this;
    //initialize datatable
    var $fileName = 'Master Sponsor List' + new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

    $(document).ready(function () {
      $('#add-sponsor').DataTable({
        destroy: true,
        ajax: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/sponser-master-read',
        serverSide: false,
        lengthMenu: [50, 100, 200, 300, 500],
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
        searching: true,
        columnDefs: [
          {
            "data": 'action',
            "defaultContent": "<button>Edit</button>",
            "targets": 15,
          }],
        columns: [
            { data: 'name' },
            { data: 'occupation' },
            { data: 'company_name' },
            { data: 'location' },
            { data: 'email_id' },
            { data: 'phone' },
            { data: 'address1' },
            { data: 'address2' },
            { data: 'city' },
            { data: 'state' },
            { data: 'pincode' },
            { data: 'pan' },
            { data: 'gst' },
            { data: 'created_by'},
            { data: 'status'},
            { data: 'action', "targets": 15, createdCell: (td, cellData, rowData, row, col) =>
            ReactDOM.render(
              [
              <div className='text-center' ><FaRegEdit style={{color:'green', cursor:'pointer', textAlign:'center'}} size={25}
              onClick={() => {toggleModal(); content.getById(rowData.id);}}/></div>
            //   <MdDelete style={{color:'red', cursor:'pointer'}} size={28}
            //   onClick={() => {content.deleteSponsormaster(rowData.id)}}
            // />
          ], td)},
        ],
        order:[]
      });
    });
  }

  // Get By Edit
  getById = async (id) => {
    try {
      const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/ViewSponserID`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id
        }),
      });
      const data = await response.json();
      this.setState((prevState) => ({
        editId : data.data.id,
        editName : data.data.name,
        editOccupation : data.data.occupation,
        editCompany_name : data.data.company_name,
        editLocation : data.data.location,
        editEmail_id : data.data.email_id,
        editPhone : data.data.phone,
        editAddress1 : data.data.address1,
        editAddress2 : data.data.address2,
        editCity : data.data.city,
        editState : data.data.state,
        editPincode : data.data.pincode,
        editPan : data.data.pan,
        editGst : data.data.gst,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // Edit
  editSponsorMaster = async () => {
    try {
      const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/sponser-master-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.editId,
          name: this.state.editName,
          occupation: this.state.editOccupation,
          company_name: this.state.editCompany_name,
          location: this.state.editLocation,
          email_id: this.state.editEmail_id,
          phone: this.state.editPhone,
          address1: this.state.editAddress1,
          address2: this.state.editAddress2,
          city: this.state.editCity,
          state: this.state.editState,
          pincode: this.state.editPincode,
          pan: this.state.editPan,
          gst: this.state.editGst,
          created_by: sessionStorage.getItem('user_id'),
          status: 1,
        }),
      });
      const data = await response.json();
      $('#add-sponsor').DataTable().ajax.reload();
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
  // deleteSponsormaster = async (id) => {
  //   try {
  //     await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/sponser-master-delete`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         id: id,
  //       }),
  //     });

  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!',
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         // Add code here to delete the input
  //         try {
  //           await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/sponser-master-delete`, {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //               id: id,
  //             }),
  //           });

  //           $('#add-sponsor').DataTable().ajax.reload();
  //           Swal.fire('Deleted!', 'Your input has been deleted.', 'success');
  //         } catch (error) {
  //           console.log(error);
  //           Swal.fire('Error', 'An error occurred while deleting the input.', 'error');
  //         }
  //       } else {
  //         // Code to execute if the user clicks "Cancel"
  //         Swal.fire('Cancelled', 'Your input is safe.', 'info');
  //       }
  //     });
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  

  render(){
    const { 
      editName,
      editOccupation,
      editCompany_name,
      editLocation,
      editEmail_id,
      editPhone,
      editAddress1,
      editAddress2,
      editCity,
      editState,
      editPincode,
      editPan,
      editGst,
      editId,
    } = this.state;

  return (
    <div className="MainDiv">
      
    <div className="container">
       
       <div>
        <Modal className='pt-5' show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Sponsor  Master</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <Form.Control 
              autoComplete="off"
                        value={editId}
                        type="hidden"  />
            <FloatingLabel className='pb-2' controlId="floatingPassword" label="Full Name">
              <Form.Control 
              autoComplete="off"
                        value={editName}
                        onChange={(e) => this.setState({ editName: e.target.value })}
                        type="text"  />
            </FloatingLabel>
            <FloatingLabel className='pb-2' controlId="floatingPassword" label="Occupation">
              <Form.Control 
              autoComplete="off"
                        value={editOccupation}
                        onChange={(e) => this.setState({ editOccupation: e.target.value })}
                        type="text"  />
            </FloatingLabel>
            <FloatingLabel className='pb-2' controlId="floatingPassword" label="Company's Name">
              <Form.Control 
              autoComplete="off"
                        value={editCompany_name}
                        onChange={(e) => this.setState({ editCompany_name: e.target.value })}
                        type="text"  />
            </FloatingLabel>
            <FloatingLabel className='pb-2' controlId="floatingPassword" label="Location">
              <Form.Control 
              autoComplete="off"
                        value={editLocation}
                        onChange={(e) => this.setState({ editLocation: e.target.value })}
                        type="text"  />
            </FloatingLabel>
            <FloatingLabel className='pb-2' controlId="floatingPassword" label="Email ID">
              <Form.Control 
              autoComplete="off"
                        value={editEmail_id}
                        onChange={(e) => this.setState({ editEmail_id: e.target.value })}
                        type="text"  />
            </FloatingLabel>
            <FloatingLabel className='pb-2' controlId="floatingPassword" label="Phone Number">
              <Form.Control 
              autoComplete="off"
                        value={editPhone}
                        onChange={(e) => this.setState({ editPhone: e.target.value })}
                        type="text"  />
            </FloatingLabel>
            <FloatingLabel className='pb-2' controlId="floatingPassword" label="Address1">
              <Form.Control 
              autoComplete="off"
                        value={editAddress1}
                        onChange={(e) => this.setState({ editAddress1: e.target.value })}
                        type="text"  />
            </FloatingLabel>
            <FloatingLabel className='pb-2' controlId="floatingPassword" label="Address2">
              <Form.Control 
              autoComplete="off"
                        value={editAddress2}
                        onChange={(e) => this.setState({ editAddress2: e.target.value })}
                        type="text"  />
            </FloatingLabel>
            <FloatingLabel className='pb-2' controlId="floatingPassword" label="city">
              <Form.Control 
              autoComplete="off"
                        value={editCity}
                        onChange={(e) => this.setState({ editCity: e.target.value })}
                        type="text"  />
            </FloatingLabel>
            <FloatingLabel className='pb-2' controlId="floatingPassword" label="state">
              <Form.Control 
              autoComplete="off"
                        value={editState}
                        onChange={(e) => this.setState({ editState: e.target.value })}
                        type="text"  />
            </FloatingLabel>
            <FloatingLabel className='pb-2' controlId="floatingPassword" label="Pincode">
              <Form.Control 
                        autoComplete="off"
                        value={editPincode}
                        onChange={(e) => this.setState({ editPincode: e.target.value })}
                        type="text"  />
            </FloatingLabel>
            <FloatingLabel className='pb-2' controlId="floatingPassword" label="Pan Card">
              <Form.Control 
              autoComplete="off"
                        value={editPan}
                        onChange={(e) => this.setState({ editPan: e.target.value })}
                        type="text"  />
            </FloatingLabel>
            <FloatingLabel className='pb-2' controlId="floatingPassword" label="GST">
              <Form.Control 
              autoComplete="off"
                        value={editGst}
                        onChange={(e) => this.setState({ editGst: e.target.value })}
                        type="text"  />
            </FloatingLabel>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleModal}>
              Close
            </Button>
            <Button variant="success" onClick={this.editSponsorMaster}>
              Save changes
            </Button>
          </Modal.Footer>
         </Modal>
       </div>
        
        <Table responsive id="add-sponsor" class="display">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Occupation</th>
                  <th>Company's</th>
                  <th>Location</th>  
                  <th>Email</th>  
                  <th>Number</th>  
                  <th>Address1</th>
                  <th>Address2</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Pincode</th>
                  <th>Pan</th>
                  <th>GST</th>
                  <th>Created by</th>
                  <th>Status</th>
                  <th>Action</th>  
              </tr>
          </thead>
      </Table>
        
      </div>
    </div>
  )
}
}


export default AddSponsorDatatable




// import React, { Component } from 'react';
// import { Button, Modal } from 'react-bootstrap';
// import $ from 'jquery'; 
// import {MdDelete} from 'react-icons/md'
// import {FaRegEdit} from 'react-icons/fa'
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import Swal from 'sweetalert2';
// import Table from 'react-bootstrap/Table';



// class AddSponsorDatatable extends React.Component {

//   state = {
//     sponsorMaster:[],
//     newName:'',
//     newOccupation:'',
//     newCompany_name:'',
//     newLocation:'',
//     newEmail_id:'',
//     newPhone:'',
//     newAddress1:'',
//     newAddress2:'',
//     newCity:'',
//     newState:'',
//     newPincode:'',
//     ///Edit//////
//     editName:'',
//     editOccupation:'',
//     editCompany_name:'',
//     editLocation:'',
//     editEmail_id:'',
//     editPhone:'',
//     editAddress1:'',
//     editAddress2:'',
//     editCity:'',
//     editState:'',
//     editPincode:'',
//     created_by:'',
//     editId: '',
//     showModal: false,
//   };


//   handleClose = () => {
//     this.setState({
//       show: false,
//       editSection: '',
//       editId: '',
//     });
//   };

//   // handleShow = () => {
//   //   this.setState({
//   //     show: true,
//   //   });
//   // };


//   toggleModal = () => {
//     this.setState({
//       showModal: !this.state.showModal,
//     });
//   };
  

//   // Data LIST
//   fetchSponsorMaster = async () => {
//     try {
//       const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/sponser-master-read');
//       const data = await response.json();
//       this.setState({ sponsorMaster: data.data });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   componentDidMount() {
//     this.fetchSponsorMaster();
//     //initialize datatable
//     $(document).ready(function () {
//       $('#add-sponsor').DataTable();
//     });
    
//   }

//     // Create Input data
//     // createSection = async () => {
//     //   try {
//     //     const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/class-master-insert', {
//     //       method: 'POST',
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //       },
//     //       body: JSON.stringify({
//     //         name: this.state.newName,
//     //         occupation: this.state.newOccupation,
//     //         company_name: this.state.newCompany_name,
//     //         location: this.state.newLocation,
//     //         email_id: this.state.newEmail_id,
//     //         phone: this.state.newPhone,
//     //         address1: this.state.newAddress1,
//     //         address2: this.state.newAddress2,
//     //         city: this.state.newCity,
//     //         state: this.state.newState,
//     //         pincode: this.state.newPincode,
//     //         created_by: sessionStorage.getItem('user_id'),
//     //       }),
//     //     });
//     //     const data = await response.json();
//     //     this.setState((prevState) => ({
//     //       classMaster: [...prevState.classMaster, data[0]],
//     //       newClass: '',
//     //     }));
//     //     console.log(data[0]);
//     //     Swal.fire({
//     //       icon: 'success',
//     //       title: 'Created successfully !',
//     //       showConfirmButton: false,
//     //       timer: 1800,
//     //     });
//     //   } catch (error) {
//     //     console.log(error);
//     //   }
//     // };

//      // Edit
//   getById = async (id) => {
//     try {
//       const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/ViewSponserID`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: id
//         }),
//       });
//       const data = await response.json();
//       console.log(data, data.data.id);
//       this.setState((prevState) => ({
//         editId : data.data[0].id,
//         editName : data.data[0].name,
//         editOccupation : data.data[0].occupation,
//         editCompany_name : data.data[0].company_name,
//         editLocation : data.data[0].location,
//         editEmail_id : data.data[0].email_id,
//         editPhone : data.data[0].phone,
//         editAddress1 : data.data[0].address1,
//         editAddress2 : data.data[0].address2,
//         editCity : data.data[0].city,
//         editState : data.data[0].state,
//         editPincode : data.data[0].pincode,
//       }));
      
      
//       this.handleClose();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Edit
//   editSponsorMaster = async () => {
//     try {
//       const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/sponser-master-update`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: this.state.editId,
//           name: this.state.editName,
//           occupation: this.state.editOccupation,
//           company_name: this.state.editCompany_name,
//           location: this.state.editLocation,
//           email_id: this.state.editEmail_id,
//           phone: this.state.editPhone,
//           address1: this.state.editAddress1,
//           address2: this.state.editAddress2,
//           city: this.state.editCity,
//           state: this.state.editState,
//           pincode: this.state.editPincode,
//           created_by: sessionStorage.getItem('user_id'),
//         }),
//       });
//       const data = await response.json();
//       this.setState((prevState) => ({
//         sponsorMaster: prevState.sponsorMaster.map((res) => (res.id === this.state.editId ? data.data : res)),
//       }));
//       alert('Update Successfully !');
//       this.handleClose();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // Delete
//   deleteSponsormaster = async (id) => {
//     try {
//       await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/class-master-delete`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: id,
//         }),
//       });

//       Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!',
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           // Add code here to delete the input
//           try {
//             await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/sponser-master-delete`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 id: id,
//               }),
//             });

//             this.setState((prevState) => ({
//               sponsorMaster: prevState.sponsorMaster.filter((res) => res.id !== id),
//             }));

//             Swal.fire('Deleted!', 'Your input has been deleted.', 'success');
//           } catch (error) {
//             console.log(error);
//             Swal.fire('Error', 'An error occurred while deleting the input.', 'error');
//           }
//         } else {
//           // Code to execute if the user clicks "Cancel"
//           Swal.fire('Cancelled', 'Your input is safe.', 'info');
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

  

//   render(){
//     const { 
//       sponsorMaster,
//       newName,
//       newOccupation,
//       newCompany_name,
//       newLocation,
//       newEmail_id,
//       newPhone,
//       newAddress1,
//       newAddress2,
//       newCity,
//       newState,
//       newPincode,
//       ///Edit//////
//       editName,
//       editOccupation,
//       editCompany_name,
//       editLocation,
//       editEmail_id,
//       editPhone,
//       editAddress1,
//       editAddress2,
//       editCity,
//       editState,
//       editPincode,
//       created_by,
//       editId,
//       showModal,
//     } = this.state;

//   return (
//     <div className="MainDiv">
      
//     <div className="container">
       
//        <div >
//         <Modal className='pt-5' show={this.state.showModal} onHide={this.toggleModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Sponsor  Master</Modal.Title>
//           </Modal.Header>

//           <Modal.Body>
//           <Form.Control 
//               autoComplete="off"
//                         value={editId}
//                         onChange={(e) => this.setState({ editId: e.target.value })}
//                         type="text"  />
//             <FloatingLabel className='pb-2' controlId="floatingPassword" label="Full Name">
//               <Form.Control 
//               autoComplete="off"
//                         value={editName}
//                         onChange={(e) => this.setState({ editName: e.target.value })}
//                         type="text"  />
//             </FloatingLabel>
//             <FloatingLabel className='pb-2' controlId="floatingPassword" label="Occupation">
//               <Form.Control 
//               autoComplete="off"
//                         value={editOccupation}
//                         onChange={(e) => this.setState({ editOccupation: e.target.value })}
//                         type="text"  />
//             </FloatingLabel>
//             <FloatingLabel className='pb-2' controlId="floatingPassword" label="Company's Name">
//               <Form.Control 
//               autoComplete="off"
//                         value={editCompany_name}
//                         onChange={(e) => this.setState({ editCompany_name: e.target.value })}
//                         type="text"  />
//             </FloatingLabel>
//             <FloatingLabel className='pb-2' controlId="floatingPassword" label="Location">
//               <Form.Control 
//               autoComplete="off"
//                         value={editLocation}
//                         onChange={(e) => this.setState({ editLocation: e.target.value })}
//                         type="text"  />
//             </FloatingLabel>
//             <FloatingLabel className='pb-2' controlId="floatingPassword" label="Email ID">
//               <Form.Control 
//               autoComplete="off"
//                         value={editEmail_id}
//                         onChange={(e) => this.setState({ editEmail_id: e.target.value })}
//                         type="text"  />
//             </FloatingLabel>
//             <FloatingLabel className='pb-2' controlId="floatingPassword" label="Phone Number">
//               <Form.Control 
//               autoComplete="off"
//                         value={editPhone}
//                         onChange={(e) => this.setState({ editPhone: e.target.value })}
//                         type="text"  />
//             </FloatingLabel>
//             <FloatingLabel className='pb-2' controlId="floatingPassword" label="Address1">
//               <Form.Control 
//               autoComplete="off"
//                         value={editAddress1}
//                         onChange={(e) => this.setState({ editAddress1: e.target.value })}
//                         type="text"  />
//             </FloatingLabel>
//             <FloatingLabel className='pb-2' controlId="floatingPassword" label="Address2">
//               <Form.Control 
//               autoComplete="off"
//                         value={editAddress2}
//                         onChange={(e) => this.setState({ editAddress2: e.target.value })}
//                         type="text"  />
//             </FloatingLabel>
//             <FloatingLabel className='pb-2' controlId="floatingPassword" label="city">
//               <Form.Control 
//               autoComplete="off"
//                         value={editCity}
//                         onChange={(e) => this.setState({ editCity: e.target.value })}
//                         type="text"  />
//             </FloatingLabel>
//             <FloatingLabel className='pb-2' controlId="floatingPassword" label="state">
//               <Form.Control 
//               autoComplete="off"
//                         value={editState}
//                         onChange={(e) => this.setState({ editState: e.target.value })}
//                         type="text"  />
//             </FloatingLabel>
//             <FloatingLabel className='pb-2' controlId="floatingPassword" label="Pincode">
//               <Form.Control 
//               autoComplete="off"
//                         value={editPincode}
//                         onChange={(e) => this.setState({ editPincode: e.target.value })}
//                         type="text"  />
//             </FloatingLabel>
//           </Modal.Body>

//           <Modal.Footer>
//             <Button variant="secondary" onClick={this.toggleModal}>
//               Close
//             </Button>
//             <Button variant="success" onClick={this.editSponsorMaster}>
//               Save changes
//             </Button>
//           </Modal.Footer>
//          </Modal>
//        </div>

//         <Table responsive id="add-sponsor" class="display">
//           <thead>
//               <tr>
//                   <th>Name</th>
//                   <th>Occupation</th>
//                   <th>Company's</th>
//                   <th>Location</th>  
//                   <th>Email</th>  
//                   <th>Number</th>  
//                   <th>Address1</th>
//                   <th>Address2</th>
//                   <th>City</th>
//                   <th>State</th>
//                   <th>Pincode</th>
//                   <th>Created</th>
//                   <th>Action</th>  
//               </tr>
//           </thead>
//           {sponsorMaster.map((res) => (
//                         <tr key={res.id} style={{ textAlign: 'center' }}>
//                           <td>{res.name}</td>
//                           <td>{res.occupation}</td>
//                           <td>{res.company_name}</td>
//                           <td>{res.location}</td>
//                           <td>{res.email_id}</td>
//                           <td>{res.phone}</td>
//                           <td>{res.address1}</td>
//                           <td>{res.address2}</td>
//                           <td>{res.city}</td>
//                           <td>{res.state}</td>
//                           <td>{res.pincode}</td>
//                           <td>{res.created_by}</td>
//                           <td className='d-flex'>
//                             <FaRegEdit
//                               onClick={() => {
//                                 this.toggleModal();
//                                 this.getById(res.id);
//                               }}
//                               style={{ cursor: 'pointer', marginTop:'3px' }}
//                               className="text-success pt-2 pe-1"
//                               size={36}
//                               title="Edit user"
//                             />
//                             <MdDelete
//                               onClick={() => this.deleteSponsormaster(res.id)}
//                               style={{ cursor: 'pointer' }}
//                               className="text-danger pb-1 ps-2"
//                               size={40}
//                               title="Delete user"
//                             />
//                           </td>
//                         </tr>
//                       ))}
//         </Table>
  
//       </div>
//     </div>
//   )
// }
// }


// export default AddSponsorDatatable
