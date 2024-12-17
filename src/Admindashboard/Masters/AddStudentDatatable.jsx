import React,{useState} from 'react';
import $ from 'jquery'; 
import Button from 'react-bootstrap/Button'

class AddStudentDatatable extends React.Component {

  componentDidMount() {
    //initialize datatable
    $(document).ready(function () {
        $('#add-Student').DataTable();
        
    });
 }

  render(){
    // function handleClickDelete() {
    //     Swal.fire({
    //       title: 'Are you sure?',
    //       text: "You won't be able to revert this!",
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonColor: '#3085d6',
    //       cancelButtonColor: '#d33',
    //       confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         Swal.fire(
    //           'Deleted!',
    //           'User has been deleted',
    //           'success'
    //         )
    //       }
    //     })
    //   }
    
  return (
    <div className="MainDiv">

      
    <div className="container">
        
        <table id="add-Student" class="display">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Email</th>
                  <th>Mobile Number</th>  
                  <th>Student Details</th>  
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Mohammed Fareestha</td>
                  <td>XI</td>
                  <td>mf722@gmail.com</td>
                  <td>984028291</td>
                  <td>
                    <a href="/Masters/Viewstudentdata"> <Button style={{backgroundColor:'#7e86e0c8',color:''}}>View details</Button></a>
                  </td>
              </tr>

   
         
          </tbody>
      </table>
        
      </div>
    </div>
  )
}
}


export default AddStudentDatatable
