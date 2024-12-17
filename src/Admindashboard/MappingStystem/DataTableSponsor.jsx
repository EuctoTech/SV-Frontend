import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'jquery/dist/jquery.min.js';
import 'datatables.net/js/jquery.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/dataTables.buttons';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import Swal from 'sweetalert2';
import { MdDelete } from 'react-icons/md';

function DataTableSponsor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTableapi();
  }, []);
  const fetchTableapi = () => {
   // Fetch data from API
   fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/readmapstudents')
   .then(response => response.json())
   .then(responseData => {
     // Update the data state with API response
     setData(responseData.data);
   })
   .catch(error => {
     console.error('Error fetching data:', error);
   });
   };
     const fetchTable = () => {

    if (data.length === 0) return; // Wait until data is loaded

    const $fileName = 'SV Sponsor Mapped Details' + new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

    $('#sponsor-table').DataTable({
      destroy: true,
      processing: true,
      serverSide: false,
      dom: 'lfBrtip',
      lengthMenu: [50, 100, 200, 300, 500, 1000],
      buttons: [
        {
          extend: 'copy',
          className: 'btn btn-success',
          filename: $fileName,
          exportOptions: {
            columns: ':visible:not(:last-child)' // Exclude last column in export
          }
        },
        {
          extend: 'csv',
          className: 'btn btn-success',
          filename: $fileName,
          exportOptions: {
            columns: ':visible:not(:last-child)' // Exclude last column in export
          }
        },
        {
          extend: 'print',
          className: 'btn btn-success',
          filename: $fileName,
          exportOptions: {
            columns: ':visible:not(:last-child)' // Exclude last column in export
          }
        }
      ],
      searching: true,
    });
}
  useEffect(() => {
    fetchTable();
  }, [data]); // Reinitialize DataTable when data changes

  const handleClickDelete = (slno) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        // Send DELETE request to API
        fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/removemapstudents?slno=${slno}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(responseData => {
            // Handle success response
            Swal.fire('Deleted!', 'User has been deleted', 'success');
            // Update the data state by removing the deleted row
            // setData(prevData => prevData.filter(row => row.slno !== slno));
            fetchTableapi();
            window.location.reload();

          })
          .catch(error => {
            console.error('Error deleting user:', error);
            // Handle error response
            Swal.fire('Error!', 'Failed to delete user', 'error');
            fetchTableapi();
          });
      }
    });
  };

  return (
    <div className="MainDiv">
      <div className="container">
        <table id="sponsor-table" className="table table-bordered">
          <thead>
            <tr>
              <th>Sponsor Name</th>
              <th>Grade</th>
              <th>Section</th>
              <th>Student Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.Sponsername}</td>
                <td>{row.grade}</td>
                <td>{row.sec}</td>
                <td>{row.Studentname}</td>
                <td>
                  <MdDelete
                    onClick={() => handleClickDelete(row.slno)}
                    style={{ cursor: 'pointer' }}
                    className="text-danger pb-1 ps-2"
                    size={25}
                    title="Delete user"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTableSponsor;
