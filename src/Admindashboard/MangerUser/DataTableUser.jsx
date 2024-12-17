import React, { Component } from 'react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import { MdDelete } from 'react-icons/md';
import {RiLockPasswordLine} from 'react-icons/ri'
import { FaRegEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"




class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editId:'',
      editName: '',
      editGender: '',
      editEmail: '',
      editUserType: '',
      editGrade: '',
      editSection: '',
      editGroup:'',
      editRollNo:'',
      edithostelOrDay :'',
      created_by:'',
      checkboxChecked: false,
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

  handleCheckboxChange = () => {
    this.setState((prevState) => ({
      checkboxChecked: !prevState.checkboxChecked
    }));
  };



  userPassreset = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to Reset the password!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Reset Password!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Add code here to delete the input
          try {
            await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/resetsvsUser`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: id,
              }),
            });

            $('#user-table').DataTable().ajax.reload();
            Swal.fire('Reseted!', 'Password Reset Successfully!', 'success');
          } catch (error) {
            console.log(error);
            Swal.fire('Error', 'An error occurred while Reset the Password.', 'error');
          }
        } else {
          // Code to execute if the user clicks "Cancel"
          Swal.fire('Cancelled', 'Your Old Password is safe.', 'info');
        }
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    var openModal = this.openModal;
    var content = this;
    //initialize datatable

    $(document).ready(function () {
      var $fileName = 'SV User Details' + new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

      function getFormattedDate() {
        var today = new Date();
        var day = ('0' + today.getDate()).slice(-2);
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var year = today.getFullYear();
    
        return day + '-' + month + '-' + year;
    }
    
      $('#user-table').DataTable({
        destroy: true,
        processing: true,
        serverSide: false,
        dom: 'lfBrtip',
        lengthMenu: [50, 100, 200, 300, 500,1000],
        buttons: [
          {
            extend: 'copy',
            className: 'btn btn-success',
             filename: $fileName,
          },
          {
            extend: 'csv',
            className: 'btn btn-success',
            filename: $fileName,
          },
          {
            extend: 'print',
            className: 'btn btn-success',
            filename: $fileName,
          }
        ],
        searching: true,
        ajax: {
          url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/listSVSUser',
          type: 'GET',
        },
        columnDefs: [
          {
            "data": 'action',
            "defaultContent": "<button>Edit</button>",
            "targets": 9
          }],
        columns: [
            { data: 'name' },
            { data: 'gender' },
            { data: 'email' },
            { data: 'user_type',
            render: function (data, type, row) {
              return data === 'sponser' ? 'Sponsor' : data;
            }
          },
            { data: 'roll_no' },
            { data: 'standard' },
            { data: 'sec' },
            { data: 'twe_group' },
            { data: 'hostelOrDay' },
            // { data: 'created_by'},
            { data: 'action', "targets": 9, createdCell: (td, cellData, rowData, row, col) =>
            ReactDOM.render(
              [  rowData.user_type === 'sponser' ? (
                
                <FaRegEdit
                  style={{
                    color: 'grey',  // Disabled color
                    cursor: 'not-allowed',
                    opacity: 0.5,
                  }}
                  title='Edit (Disabled for Sponsor)'
                  size={25}
                />
              ) : (
                <FaRegEdit
                  style={{
                    color: 'green',
                    cursor: 'pointer',
                  }}
                  title='Edit'
                  size={25}
                  onClick={() => {
                    openModal();
                    content.getById(rowData.id);
                  }}
                />
              ),
              
              <RiLockPasswordLine style={{color:'#EF8F49', cursor:'pointer'}} title='change password' size={28}
              onClick={()=> {content.userPassreset(rowData.id)}}/>,

            <MdDelete style={{color:'red', cursor:'pointer'}} title='Delete' size={28}
            onClick={() => {content.deleteUser(rowData.slno)}}
          />], td)},
        ],
        createdRow: function (row, data, dataIndex) {
          if (data.name === 'admin') {
            // Disable the row by adding a red background and graying out the text
            $(row).css({
                'background-color': 'red',
                'color': 'lightgray',
                'pointer-events': 'none'
            });

            // Make all cells in the row unselectable and non-interactive
            $(row).find('td').css({
                'pointer-events': 'none',
                'user-select': 'none'
            });
        }
      }
      });
    });
   }


   editUser = async () => {
    try {
      const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/EditSVSUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.editId,
          name: this.state.editName,
          gender: this.state.editGender,
          email: this.state.editEmail,
          user_type: this.state.editUserType,
          standard: this.state.editGrade,
          sec: this.state.editSection,
          twe_group: this.state.editGroup,
          roll_no: this.state.editRollNo,
          hostelOrDay: this.state.edithostelOrDay,
          created_by: sessionStorage.getItem('user_id'),
          status: 1,
        }),
      });
      const data = await response.json();
      $('#user-table').DataTable().ajax.reload();
      Swal.fire({
        icon: 'success',
        title: 'Update successfully !',
        showConfirmButton: false,
        timer: 1800
      })
      this.setState({
        showModal: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  deleteUser = async (id) => {
    try {
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
            await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/userdelByid`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: id,
              }),
            });

            $('#user-table').DataTable().ajax.reload();
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

  // GetByEdit
  getById = async (id) => {
    try {
      const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/IdUserDetails`, {
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
        editGender : data.data.gender,
        editEmail : data.data.email,
        editUserType : data.data.user_type,
        editGrade : data.data.standard,
        editSection : data.data.sec,
        editGroup : data.data.twe_group,
        editRollNo : data.data.roll_no,
        edithostelOrDay : data.data.hostelOrDay,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { checkboxChecked } = this.state;
    const actionButtonDisabled = !checkboxChecked;
    const statusText = checkboxChecked ? 'Action is ACTIVE😍' : 'Action is IN-ACTIVE';
    const {
            editId,
            editName,
            editGender,
            editEmail,
            editUserType,
            editGrade,
            editSection,
            editGroup,
            created_by,
          } = this.state;

    return (
      <div className="MainDiv">
        <div className="container">
        <div className="py-4">
          </div>

          <div>
            <Modal className='pt-5' show={this.state.showModal} onHide={this.closeModal} centered>
              <Modal.Header style={{ backgroundColor: '#F4FFF9' }} closeButton>
                <Modal.Title>Edit User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                <Form.Control  autoComplete="off" value={editId} type="hidden"  />
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" placeholder="Enter user name" 
                    value={editName}
                    onChange={(e) => this.setState({ editName: e.target.value })} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select value={editGender} onChange={(e) => this.setState({ editGender: e.target.value })}  aria-label="Default select example">
                      <option value=""  >--Select--</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={editEmail} onChange={(e)=> this.setState({editEmail: e.target.value})} type="text" placeholder="name@example.com" />
                  </Form.Group>

                  {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>User Type</Form.Label>
                    <Form.Select value={editUserType} onChange={(e)=> this.setState({editUserType: e.target.value})} >
                    <option value=""  >--Select--</option>
                      <option value="student">Student</option>
                      <option value="sponser">Sponsor</option>
                      <option value="admin">Admin</option>
                    </Form.Select>
                  </Form.Group> */}

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Grade</Form.Label>
                    <Form.Select value={editGrade} onChange={(e)=> this.setState({editGrade : e.target.value})} >
                    <option value=""  >--Select--</option>
                    <option value="ukg">ukg</option>
                      <option value="lkg">lkg</option>
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
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Section</Form.Label>
                    <Form.Select value={editSection} onChange={(e)=> this.setState({editSection : e.target.value})}>
                      <option value=""  >--Select--</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                      <option value="G">G</option>
                      <option value="H">H</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Group</Form.Label>
                    <Form.Select value={editGroup} onChange={(e)=> this.setState({editGroup: e.target.value})} aria-label="Default select example">
                      <option value=""  >--Select--</option>
                      <option value="Group-I">Group-I</option>
                      <option value="Group-II">Group-II</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.editUser}>
                  Update
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          <table id="user-table" className="display">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Roll No</th>
                <th>Grade</th>
                <th>Section</th>
                <th>Group</th>
                <th>Hostel/Day </th>
                <th>Action</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }
}

export default DataTable;

// import React, { Component } from 'react';
// import $ from 'jquery';
// import Button from 'react-bootstrap/Button';
// import { MdDelete } from 'react-icons/md';
// import {RiLockPasswordLine} from 'react-icons/ri'
// import { FaRegEdit } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.min.js';

// //Datatable Modules
// import "datatables.net/js/jquery.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
// import "datatables.net-buttons/js/dataTables.buttons.js"
// import "datatables.net-buttons/js/buttons.colVis.js"
// import "datatables.net-buttons/js/buttons.flash.js"
// import "datatables.net-buttons/js/buttons.html5.js"
// import "datatables.net-buttons/js/buttons.print.js"
// import "datatables.net-dt/css/jquery.dataTables.min.css"




// class DataTable extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editId:'',
//       editName: '',
//       editGender: '',
//       editEmail: '',
//       editUserType: '',
//       editGrade: '',
//       editSection: '',
//       editGroup:'',
//       editRollNo:'',
//       edithostelOrDay :'',
//       created_by:'',
//       checkboxChecked: false,
//       showModal: false,
//     };
//   }

//   openModal = () => {
//     this.setState({
//       showModal: true
//     });
//   }

//   closeModal = () => {
//     this.setState({
//       showModal: false
//     });
//   }

//   handleCheckboxChange = () => {
//     this.setState((prevState) => ({
//       checkboxChecked: !prevState.checkboxChecked
//     }));
//   };



//   userPassreset = async (id) => {
//     try {
//       Swal.fire({
//         title: 'Are you sure?',
//         text: "You want to Reset the password!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, Reset Password!',
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           // Add code here to delete the input
//           try {
//             await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/resetsvsUser`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 id: id,
//               }),
//             });

//             $('#user-table').DataTable().ajax.reload();
//             Swal.fire('Reseted!', 'Password Reset Successfully!', 'success');
//           } catch (error) {
//             console.log(error);
//             Swal.fire('Error', 'An error occurred while Reset the Password.', 'error');
//           }
//         } else {
//           // Code to execute if the user clicks "Cancel"
//           Swal.fire('Cancelled', 'Your Old Password is safe.', 'info');
//         }
//       });
      
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   componentDidMount() {
//     var openModal = this.openModal;
//     var content = this;
//     //initialize datatable

//     $(document).ready(function () {
//       var $fileName = 'SV User Details' + new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

//       function getFormattedDate() {
//         var today = new Date();
//         var day = ('0' + today.getDate()).slice(-2);
//         var month = ('0' + (today.getMonth() + 1)).slice(-2);
//         var year = today.getFullYear();
    
//         return day + '-' + month + '-' + year;
//     }
    
//       $('#user-table').DataTable({
//         destroy: true,
//         processing: true,
//         serverSide: false,
//         dom: 'lfBrtip',
//         lengthMenu: [50, 100, 200, 300, 500,1000],
//         buttons: [
//           {
//             extend: 'copy',
//             className: 'btn btn-success',
//              filename: $fileName,
//           },
//           {
//             extend: 'csv',
//             className: 'btn btn-success',
//             filename: $fileName,
//           },
//           {
//             extend: 'print',
//             className: 'btn btn-success',
//             filename: $fileName,
//           }
//         ],
//         searching: true,
//         ajax: {
//           url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/listSVSUser',
//           type: 'GET',
//         },
//         columnDefs: [
//           {
//             "data": 'action',
//             "defaultContent": "<button>Edit</button>",
//             "targets": 9
//           }],
//         columns: [
//             { data: 'name' },
//             { data: 'gender' },
//             { data: 'email' },
//             { data: 'user_type',
//             render: function (data, type, row) {
//               return data === 'sponser' ? 'Sponsor' : data;
//             }
//           },
//             { data: 'roll_no' },
//             { data: 'standard' },
//             { data: 'sec' },
//             { data: 'twe_group' },
//             { data: 'hostelOrDay' },
//             // { data: 'created_by'},
//             { data: 'action', "targets": 9, createdCell: (td, cellData, rowData, row, col) =>
//             ReactDOM.render(
//               [  rowData.user_type === 'sponser' ? (
                
//                 <FaRegEdit
//                   style={{
//                     color: 'grey',  // Disabled color
//                     cursor: 'not-allowed',
//                     opacity: 0.5,
//                   }}
//                   title='Edit (Disabled for Sponsor)'
//                   size={25}
//                 />
//               ) : (
//                 <FaRegEdit
//                   style={{
//                     color: 'green',
//                     cursor: 'pointer',
//                   }}
//                   title='Edit'
//                   size={25}
//                   onClick={() => {
//                     openModal();
//                     content.getById(rowData.id);
//                   }}
//                 />
//               ),
              
//               <RiLockPasswordLine style={{color:'#EF8F49', cursor:'pointer'}} title='change password' size={28}
//               onClick={()=> {content.userPassreset(rowData.id)}}/>,

//             <MdDelete style={{color:'red', cursor:'pointer'}} title='Delete' size={28}
//             onClick={() => {content.deleteUser(rowData.slno)}}
//           />], td)},
//         ],
//         createdRow: function (row, data, dataIndex) {
//           if (data.name === 'admin') {
//             // Disable the row by adding a red background and graying out the text
//             $(row).css({
//                 'background-color': 'red',
//                 'color': 'lightgray',
//                 'pointer-events': 'none'
//             });

//             // Make all cells in the row unselectable and non-interactive
//             $(row).find('td').css({
//                 'pointer-events': 'none',
//                 'user-select': 'none'
//             });
//         }
//       }
//       });
//     });
//    }


//    editUser = async () => {
//     try {
//       const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/EditSVSUser`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: this.state.editId,
//           name: this.state.editName,
//           gender: this.state.editGender,
//           email: this.state.editEmail,
//           user_type: this.state.editUserType,
//           standard: this.state.editGrade,
//           sec: this.state.editSection,
//           twe_group: this.state.editGroup,
//           roll_no: this.state.editRollNo,
//           hostelOrDay: this.state.edithostelOrDay,
//           created_by: sessionStorage.getItem('user_id'),
//           status: 1,
//         }),
//       });
//       const data = await response.json();
//       $('#user-table').DataTable().ajax.reload();
//       Swal.fire({
//         icon: 'success',
//         title: 'Update successfully !',
//         showConfirmButton: false,
//         timer: 1800
//       })
//       this.handleClose();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Delete
//   deleteUser = async (id) => {
//     try {
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
//             await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/userdelByid`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 id: id,
//               }),
//             });

//             $('#user-table').DataTable().ajax.reload();
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

//   // GetByEdit
//   getById = async (id) => {
//     try {
//       const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/IdUserDetails`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: id
//         }),
//       });
//       const data = await response.json();
//       this.setState((prevState) => ({
//         editId : data.data.id,
//         editName : data.data.name,
//         editGender : data.data.gender,
//         editEmail : data.data.email,
//         editUserType : data.data.user_type,
//         editGrade : data.data.standard,
//         editSection : data.data.sec,
//         editGroup : data.data.twe_group,
//         editRollNo : data.data.roll_no,
//         edithostelOrDay : data.data.hostelOrDay,
//       }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   render() {
//     const { checkboxChecked } = this.state;
//     const actionButtonDisabled = !checkboxChecked;
//     const statusText = checkboxChecked ? 'Action is ACTIVE😍' : 'Action is IN-ACTIVE';
//     const {
//             editId,
//             editName,
//             editGender,
//             editEmail,
//             editUserType,
//             editGrade,
//             editSection,
//             editGrou,
//             created_by,
//           } = this.state;

//     return (
//       <div className="MainDiv">
//         <div className="container">
//         <div className="py-4">
//           </div>

//           <div>
//             <Modal className='pt-5' show={this.state.showModal} onHide={this.closeModal} centered>
//               <Modal.Header style={{ backgroundColor: '#F4FFF9' }} closeButton>
//                 <Modal.Title>Edit User</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <Form>
//                 <Form.Control  autoComplete="off" value={editId} type="hidden"  />
//                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                     <Form.Label>User name</Form.Label>
//                     <Form.Control type="text" placeholder="Enter user name" 
//                     value={editName}
//                     onChange={(e) => this.setState({ editName: e.target.value })} />
//                   </Form.Group>

//                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                     <Form.Label>Gender</Form.Label>
//                     <Form.Select value={editGender} onChange={(e) => this.setState({ editGender: e.target.value })}  aria-label="Default select example">
//                       <option value=""  >--Select--</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                     </Form.Select>
//                   </Form.Group>

//                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control value={editEmail} onChange={(e)=> this.setState({editEmail: e.target.value})} type="text" placeholder="name@example.com" />
//                   </Form.Group>

//                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                     <Form.Label>User Type</Form.Label>
//                     <Form.Select value={editUserType} onChange={(e)=> this.setState({editUserType: e.target.value})} >
//                     <option value=""  >--Select--</option>
//                       <option value="student">Student</option>
//                       <option value="sponser">Sponsor</option>
//                       <option value="admin">Admin</option>
//                     </Form.Select>
//                   </Form.Group>

//                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                     <Form.Label>Grade</Form.Label>
//                     <Form.Select value={editGrade} onChange={(e)=> this.setState({editGrade : e.target.value})} >
//                     <option value=""  >--Select--</option>
//                     <option value="ukg">ukg</option>
//                       <option value="lkg">lkg</option>
//                       <option value="1">I</option>
//                       <option value="2">II</option>
//                       <option value="3">III</option>
//                       <option value="4">IV</option>
//                       <option value="5">V</option>
//                       <option value="6">VI</option>
//                       <option value="7">VII</option>
//                       <option value="8">VIII</option>
//                       <option value="9">IX</option>
//                       <option value="10">X</option>
//                       <option value="11">XI</option>
//                       <option value="12">XII</option>
//                     </Form.Select>
//                   </Form.Group>

//                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                     <Form.Label>Section</Form.Label>
//                     <Form.Select value={editSection} onChange={(e)=> this.setState({editSection : e.target.value})}>
//                       <option value=""  >--Select--</option>
//                       <option value="A">A</option>
//                       <option value="B">B</option>
//                       <option value="C">C</option>
//                       <option value="D">D</option>
//                       <option value="E">E</option>
//                       <option value="F">F</option>
//                       <option value="G">G</option>
//                       <option value="H">H</option>
//                     </Form.Select>
//                   </Form.Group>

//                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                     <Form.Label>Group</Form.Label>
//                     <Form.Select value={editGrou} onChange={(e)=> this.setState({editGrou: e.target.value})} aria-label="Default select example">
//                       <option value=""  >--Select--</option>
//                       <option value="Group-I">Group-I</option>
//                       <option value="Group-II">Group-II</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Form>
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button variant="secondary" onClick={this.closeModal}>
//                   Close
//                 </Button>
//                 <Button variant="primary" onClick={this.editUser}>
//                   Update
//                 </Button>
//               </Modal.Footer>
//             </Modal>
//           </div>

//           <table id="user-table" className="display">
//             <thead>
//               <tr>
//                 <th>User Name</th>
//                 <th>Gender</th>
//                 <th>Email</th>
//                 <th>User Type</th>
//                 <th>Roll No</th>
//                 <th>Grade</th>
//                 <th>Section</th>
//                 <th>Group</th>
//                 <th>Hostel/Day </th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//           </table>
//         </div>
//       </div>
//     );
//   }
// }

// export default DataTable;

