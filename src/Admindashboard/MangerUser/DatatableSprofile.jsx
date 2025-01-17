import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; // or any CSV library
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Admindashboard/MangerUser/UsersStyles.css";
import { Spin } from "antd";

const columns = [
  {
    accessorKey: "status",
    header: "Status",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "admission_no",
    header: "Admission No",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "roll_no",
    header: "Roll No",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "STUDENT_NAME",
    header: "Name",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "DOB_DD_MM_YYYY",
    header: "DOB",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "SEX",
    header: "GENDER",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "FATHER",
    header: "Father Name",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "MOBILE_NUMBER",
    header: "Father Mobile",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "EMAIL_ID",
    header: "Father Email",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "MOTHER",
    header: "Mother Name",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "WHATS_APP_NO",
    header: "Mother Mobile",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "mother_email_id",
    header: "Mother Email",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "EMIS_NO",
    header: "EMIS No",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "address",
    header: "Address",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "standard",
    header: "Class",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "sec",
    header: "Sec",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "BLOOD_GROUP",
    header: "Blood Group",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "guardian_contact_no",
    header: "Guardian No",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "GUARDIAN",
    header: "Guardian Name",
    size: 40,
    Cell: ({ cell }) => cell.getValue() || "-",
  },
];

const DatatableSprofile = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isSelectedStatus, setSelectedStatus] = useState("");

  const exportToExcel = () => {
    const fileName = `Student_Report_${new Date()
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-")}.xlsx`;
    const ws = XLSX.utils.json_to_sheet([], {
      header: [
        "Photo",
        "Admission No",
        "Roll No",
        "Student Name",
        "DOB",
        "EMIS No",
        "Mobile No",
        "Email ID",
        "Address",
        "STD",
        "Blood Group",
        "Guardian No",
        "Guardian Name",
      ],
    });
    const wb = XLSX.utils.book_new();

    const data = [];

    // Fetch student data from the API
    fetch("https://www.santhoshavidhyalaya.com/SVSTEST/api/read-student")
      .then((response) => response.json())
      .then((res) => {
        res.data.forEach((student) => {
          data.push({
            original_id: student.original_id,
            roll_no: student.roll_no,
            admission_no: student.admission_no,
            STUDENT_NAME: student.STUDENT_NAME,
            date_form: student.date_form,
            MOTHERTONGUE: student.MOTHERTONGUE,
            STATE: student.STATE,
            DOB_DD_MM_YYYY: student.DOB_DD_MM_YYYY,
            SEX: student.SEX,
            BLOOD_GROUP: student.BLOOD_GROUP,
            NATIONALITY: student.NATIONALITY,
            RELIGION: student.RELIGION,
            DENOMINATION: student.DENOMINATION,
            CASTE: student.CASTE,
            CASTE_CLASSIFICATION: student.CASTE_CLASSIFICATION,
            AADHAAR_CARD_NO: student.AADHAAR_CARD_NO,
            RATIONCARDNO: student.RATIONCARDNO,
            EMIS_NO: student.EMIS_NO,
            FOOD: student.FOOD,
            FATHER: student.FATHER,
            OCCUPATION: student.OCCUPATION,
            MOTHER: student.MOTHER,
            mother_occupation: student.mother_occupation,
            GUARDIAN: student.GUARDIAN,
            guardian_occupation: student.guardian_occupation,
            MOBILE_NUMBER: student.MOBILE_NUMBER,
            EMAIL_ID: student.EMAIL_ID,
            WHATS_APP_NO: student.WHATS_APP_NO,
            mother_email_id: student.mother_email_id,
            guardian_contact_no: student.guardian_contact_no,
            guardian_email_id: student.guardian_email_id,
            MONTHLY_INCOME: student.MONTHLY_INCOME,
            mother_income: student.mother_income,
            guardian_income: student.guardian_income,
            PERMANENT_HOUSENUMBER: student.PERMANENT_HOUSENUMBER,
            P_STREETNAME: student.P_STREETNAME,
            P_VILLAGE_TOWN_NAME: student.P_VILLAGE_TOWN_NAME,
            P_DISTRICT: student.P_DISTRICT,
            P_STATE: student.P_STATE,
            P_PINCODE: student.P_PINCODE,
            COMMUNICATION_HOUSE_NO: student.COMMUNICATION_HOUSE_NO,
            C_STREET_NAME: student.C_STREET_NAME,
            C_VILLAGE_TOWN_NAME: student.C_VILLAGE_TOWN_NAME,
            C_DISTRICT: student.C_DISTRICT,
            C_STATE: student.C_STATE,
            C_PINCODE: student.C_PINCODE,
            CLASS_LAST_STUDIED: student.CLASS_LAST_STUDIED,
            NAME_OF_SCHOOL: student.NAME_OF_SCHOOL,
            SOUGHT_STD: student.SOUGHT_STD,
            sec: student.sec,
            syllabus: student.syllabus,
            GROUP_12: student.GROUP_12,
            second_group_no: student.second_group_no,
            LANG_PART_I: student.LANG_PART_I,
            brother_1: student.brother_1,
            brother_2: student.brother_2,
            gender_1: student.gender_1,
            gender_2: student.gender_2,
            class_1: student.class_1,
            class_2: student.class_2,
            gender_3: student.gender_3,
            class_3: student.class_3,
            last_school_state: student.last_school_state,
            second_language_school: student.second_language_school,
            reference_name_1: student.reference_name_1,
            ORGANISATION: student.ORGANISATION,
            mother_organization: student.mother_organization,
            guardian_organization: student.guardian_organization,
            created_at: student.created_at,
            updated_at: student.updated_at,
          });
        });

        // Convert to sheet
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Students");
        XLSX.writeFile(wb, fileName);
      })
      .catch((error) => console.error("Error fetching student data:", error));
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
      actions: "swal2-buttons-spacing",
    },
    buttonsStyling: false,
  });

  const navigate = useNavigate();

  const dropdownOptions = [
    { name: "Select Status", value: "" },
    { name: "Applied", value: "Applied" },
    { name: "Approved", value: "Approved" },
    { name: "Active", value: "Active" },
    { name: "Confirmed", value: "Confirmed" },
    { name: "Incomplete", value: "Incomplete" },
    { name: "Rejected", value: "Rejected" },
  ];

  const getStudentDatas = () => {
    axios
      .get("https://www.santhoshavidhyalaya.com/SVSTEST/api/read-student")
      .then((res) => {
        const updatedData = res?.data?.students?.map((student) => ({
          ...student,
          address: `${student.COMMUNICATION_HOUSE_NO || ""}, ${
            student.C_STREET_NAME || ""
          }, ${student.C_VILLAGE_TOWN_NAME || ""}, ${
            student.C_DISTRICT || ""
          }, ${student.C_STATE || ""},
          ${student.C_PINCODE || ""}`, // Combine street name and district
        }));

        setData(updatedData);
        setLoading(false);
      });
  };

  const handleUpdateUser = (ids, value) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `You want to change the status to ${value}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, change it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              "https://www.santhoshavidhyalaya.com/SVSTEST/api/bulk-status/profile",
              {
                ids: ids,
                status: value,
              }
            )
            .then((res) => {
              if (res?.status === 200) {
                swalWithBootstrapButtons
                  .fire({
                    title: "Updated!",
                    text: "Your status has been updated.",
                    icon: "success",
                  })
                  .then((res) => {
                    if (res.isConfirmed) {
                      setLoading(true);
                      setSelectedStatus("");
                      getStudentDatas();
                    }
                  });
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          setSelectedStatus("");
        }
      });
  };

  const handleNoUserSelect = () => {
    setSelectedStatus("");
    Swal.fire({
      icon: "error",
      title: "No users selected!",
      text: "Please select students before choosing status!",
      confirmButtonText: "Try Again",
    });
  };

  useEffect(() => {
    getStudentDatas();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="spin-style vh-100">
          <Spin size="large" />
        </div>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data}
          paginationDisplayMode="pages"
          enableStickyHeader={true}
          enableFullScreenToggle={false}
          getRowId={(row) => row.id}
          enableGlobalFilter={true} // Enables the "Show/Hide Search" option
          enableColumnFilters={true} // Disables the "Show/Hide Filter" option
          enableHiding={false}
          enableRowActions={true}
          enableRowSelection={true} // Dynamically disable checkbox for "Nepal" rows
          initialState={{
            showGlobalFilter: true, // Show the global search by default
            showColumnFilters: true, // Ensure column filters are hidden by default
            pagination: {
              pageSize: 100,
            },
            columnOrder: [
              "mrt-row-select", // Ensure the checkbox column is displayed first
              "mrt-row-actions", // Ensure the actions column is displayed next
              ...columns.map((col) => col.accessorKey || col.id), // Other columns in their default order
            ],
          }}
          displayColumnDefOptions={{
            "mrt-row-actions": {
              visibleInShowHideMenu: false, // Hide row actions column from the show/hide menu
            },
          }}
          muiTableBodyCellProps={({ cell, column }) => ({
            children: cell.getValue() || "-",
          })}
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                padding: "8px",
                flexWrap: "wrap",
              }}
            >
              <Button variant="primary" onClick={exportToExcel}>
                Export to Excel
              </Button>
              <select
                className="status-dropdown"
                name="status"
                // onChange={(res) => updateUser(table, res.target.value)}
                onChange={(res) => {
                  const selectedRows = table.getSelectedRowModel().rows; // Get selected rows
                  const selectedData = selectedRows.map((row) => row.original); // Map to row data
                  const ids = selectedData.map((item) => item.id);
                  if (selectedData && selectedData.length > 0) {
                    handleUpdateUser(ids, res.target.value);
                  } else {
                    handleNoUserSelect();
                  }
                }}
                value={isSelectedStatus}
              >
                {dropdownOptions.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Box>
          )}
          renderRowActions={({ row }) => (
            <div style={{ display: "flex", gap: "8px" }}>
              {/* Edit Action */}
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={() =>
                    navigate("/student/edit/tabs", {
                      state: {
                        admission_id: row?.original?.admission_id,
                        profile_id: row?.original?.profile_id,
                      },
                    })
                  }
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              {/* View Action */}
              <Tooltip title="View">
                <IconButton
                  color="success"
                  onClick={() => {
                    navigate("/MangerUser/Viewprofile", {
                      state: { id: row?.original?.profile_id },
                    });
                  }}
                >
                  <RemoveRedEyeOutlinedIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default DatatableSprofile;

// import React, { Component } from 'react';
// import $ from 'jquery';
// import Button from 'react-bootstrap/Button';
// import { FaRegEye } from 'react-icons/fa';
// import ReactDOM from 'react-dom';
// import * as XLSX from 'xlsx';
// import 'jquery/dist/jquery.min.js';
// import MaterialReactTable from 'material-react-table';

// // Datatable Modules
// import "datatables.net/js/jquery.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
// import "datatables.net-buttons/js/dataTables.buttons.js"
// import "datatables.net-buttons/js/buttons.colVis.js"
// import "datatables.net-buttons/js/buttons.flash.js"
// import "datatables.net-buttons/js/buttons.html5.js"
// import "datatables.net-buttons/js/buttons.print.js"

// const printRecp = (invoiceNo) => {
//   // Create a new window or tab for the print view
//   window.open(`/svsportaladmintest/MangerUser/Viewprofile?admission_no=${invoiceNo}`, '_blank');
// };

// class DatatableSprofile extends Component {

//   componentDidMount() {
//     // Initialize datatable
//     $(document).ready(function () {
//       var $fileName = 'SV Master Data' + new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

//       $('#example').DataTable({
//         destroy: true,
//         processing: true,
//         serverSide: false,
//         lengthMenu: [50, 100, 200, 300, 500, 1000],
//         ajax: {
//           url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/read-student',
//           type: 'GET',
//         },
//         dom: 'lfBrtip',
//         buttons: [
//           {
//             extend: 'copy',
//             className: 'btn btn-success',
//             filename: $fileName,
//           },
//           {
//             extend: 'csv',
//             className: 'btn btn-danger',
//             filename: $fileName,
//           },
//           {
//             extend: 'excel',
//             className: 'btn btn-primary',
//             title: 'Student Data',
//             exportOptions: {
//               format: {
//                 body: function (data, row, column, node) {
//                   // Modify the data if necessary for Excel export
//                   return data;
//                 }
//               }
//             },
//           },
//           {
//             extend: 'print',
//             className: 'btn btn-warning',
//             filename: $fileName,
//           }
//         ],
//         searching: true,
//         columnDefs: [
//           {
//             "data": 'action',
//             "defaultContent": "<button>Edit</button>",
//             "targets": 13
//           }
//         ],
//         columns: [
//           { data: 'admission_no' },
//           { data: 'roll_no' },
//           { data: 'STUDENT_NAME' },
//           { data: 'DOB_DD_MM_YYYY' },
//           { data: 'SEX' },
//           { data: 'FATHER' },
//           { data: 'MOBILE_NUMBER' },
//           { data: 'EMAIL_ID' },
//           { data: 'MOTHER' },
//           { data: 'WHATS_APP_NO' },
//           { data: 'mother_email_id' },
//           { data: 'EMIS_NO' },
//           {
//             render: function (data, type, row) {
//               return `${row.COMMUNICATION_HOUSE_NO} ${row.C_STREET_NAME}<br>${row.C_VILLAGE_TOWN_NAME}<br> ${row.C_DISTRICT}, ${row.C_STATE}, ${row.C_PINCODE}`;
//             }
//           },
//           {
//             data: 'action',
//             "targets": 13,
//             createdCell: (td, cellData, rowData) => {
//               ReactDOM.render(
//                 <div className='text-center'>
//                   <FaRegEye
//                     onClick={() => printRecp(rowData.admission_no)}
//                     size={35}
//                     style={{ color: '#4E0172', cursor: 'pointer', paddingRight: '5px' }}
//                   />
//                 </div>,
//                 td
//               );
//             }
//           },
//           { data: 'standard' },
//           { data: 'sec' },
//           { data: 'BLOOD_GROUP' },
//           { data: 'guardian_contact_no' },
//           { data: 'GUARDIAN' },
//         ],
//       });
//     });
//   }

//   exportToExcel = () => {
//     const fileName = `Student_Report_${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}.xlsx`;
//     const ws = XLSX.utils.json_to_sheet([], { header: ["Photo", "Admission No", "Roll No", "Student Name", "DOB", "EMIS No", "Mobile No", "Email ID", "Address", "STD", "Blood Group", "Guardian No", "Guardian Name"] });
//     const wb = XLSX.utils.book_new();

//     const data = [];

//     // Fetch student data from the API
//     fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/read-student')
//       .then(response => response.json())
//       .then(res => {
//         res.data.forEach(student => {
//           data.push({
//          original_id: student.original_id,
//           roll_no: student.roll_no,
//           admission_no: student.admission_no,
//           STUDENT_NAME: student.STUDENT_NAME,
//           date_form: student.date_form,
//           MOTHERTONGUE: student.MOTHERTONGUE,
//           STATE: student.STATE,
//           DOB_DD_MM_YYYY: student.DOB_DD_MM_YYYY,
//           SEX: student.SEX,
//           BLOOD_GROUP: student.BLOOD_GROUP,
//           NATIONALITY: student.NATIONALITY,
//           RELIGION: student.RELIGION,
//           DENOMINATION: student.DENOMINATION,
//           CASTE: student.CASTE,
//           CASTE_CLASSIFICATION: student.CASTE_CLASSIFICATION,
//           AADHAAR_CARD_NO: student.AADHAAR_CARD_NO,
//           RATIONCARDNO: student.RATIONCARDNO,
//           EMIS_NO: student.EMIS_NO,
//           FOOD: student.FOOD,
//           FATHER: student.FATHER,
//           OCCUPATION: student.OCCUPATION,
//           MOTHER: student.MOTHER,
//           mother_occupation: student.mother_occupation,
//           GUARDIAN: student.GUARDIAN,
//           guardian_occupation: student.guardian_occupation,
//           MOBILE_NUMBER: student.MOBILE_NUMBER,
//           EMAIL_ID: student.EMAIL_ID,
//           WHATS_APP_NO: student.WHATS_APP_NO,
//           mother_email_id: student.mother_email_id,
//           guardian_contact_no: student.guardian_contact_no,
//           guardian_email_id: student.guardian_email_id,
//           MONTHLY_INCOME: student.MONTHLY_INCOME,
//           mother_income: student.mother_income,
//           guardian_income: student.guardian_income,
//           PERMANENT_HOUSENUMBER: student.PERMANENT_HOUSENUMBER,
//           P_STREETNAME: student.P_STREETNAME,
//           P_VILLAGE_TOWN_NAME: student.P_VILLAGE_TOWN_NAME,
//           P_DISTRICT: student.P_DISTRICT,
//           P_STATE: student.P_STATE,
//           P_PINCODE: student.P_PINCODE,
//           COMMUNICATION_HOUSE_NO: student.COMMUNICATION_HOUSE_NO,
//           C_STREET_NAME: student.C_STREET_NAME,
//           C_VILLAGE_TOWN_NAME: student.C_VILLAGE_TOWN_NAME,
//           C_DISTRICT: student.C_DISTRICT,
//           C_STATE: student.C_STATE,
//           C_PINCODE: student.C_PINCODE,
//           CLASS_LAST_STUDIED: student.CLASS_LAST_STUDIED,
//           NAME_OF_SCHOOL: student.NAME_OF_SCHOOL,
//           SOUGHT_STD: student.SOUGHT_STD,
//           sec: student.sec,
//           syllabus: student.syllabus,
//           GROUP_12: student.GROUP_12,
//           second_group_no: student.second_group_no,
//           LANG_PART_I: student.LANG_PART_I,
//           brother_1: student.brother_1,
//           brother_2: student.brother_2,
//           gender_1: student.gender_1,
//           gender_2: student.gender_2,
//           class_1: student.class_1,
//           class_2: student.class_2,
//           gender_3: student.gender_3,
//           class_3: student.class_3,
//           last_school_state: student.last_school_state,
//           second_language_school: student.second_language_school,
//           reference_name_1: student.reference_name_1,
//           ORGANISATION: student.ORGANISATION,
//           mother_organization: student.mother_organization,
//           guardian_organization: student.guardian_organization,
//           created_at: student.created_at,
//           updated_at: student.updated_at,
//           });
//         });

//         // Convert to sheet
//         const ws = XLSX.utils.json_to_sheet(data);
//         XLSX.utils.book_append_sheet(wb, ws, 'Students');
//         XLSX.writeFile(wb, fileName);
//       })
//       .catch(error => console.error('Error fetching student data:', error));
//   };

//   render() {
//     return (
//       <div className="MainDiv">
//         <div className="container">
//           <Button variant="primary" onClick={this.exportToExcel}>
//             Export to Excel
//           </Button>
//           <table id="example" className="display">
//             <thead>
//               <tr>
//                 <th>Admission No</th>
//                 <th>Roll No</th>
//                 <th>Name</th>
//                 <th>DOB</th>
//                 <th>GENDER</th>
//                 <th>Father Name</th>
//                 <th>Father Mobile</th>
//                 <th>Father Email</th>
//                 <th>Mother Name</th>
//                 <th>Mother Mobile</th>
//                 <th>Mother Email</th>
//                 <th>EMIS No</th>
//                 <th className='text-center'>Address</th>
//                 <th className='text-center'>Action</th>
//                 <th>Class</th>
//                 <th>Sec</th>
//                 <th>Blood Group</th>
//                 <th>Guardian No</th>
//                 <th>Guardian Name</th>
//               </tr>
//             </thead>
//           </table>
//         </div>
//       </div>
//     );
//   }
// }

// export default DatatableSprofile;
