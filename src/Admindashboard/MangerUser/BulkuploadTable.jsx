import React, { Component } from "react";
import { Table, Button, Popconfirm, Row, Col, Upload, Progress  } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import { EditableFormRow, EditableCell } from '../StudentProfile/editable';
import {AiFillDelete} from 'react-icons/ai';
import {MdUpload} from 'react-icons/md';
import { read, utils } from 'xlsx';
import axios from 'axios';
import Sample_Excel from '../MangerUser/SVS-Sample-profile.xlsx';
import Swal from 'sweetalert2';

export default class BulkuploadTable extends Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.state = {
      cols: [],
      rows: [],
      errorMessage: null,
      uploading: false, // Indicates if the file is being uploaded
      uploadProgress: 0, // Tracks the progress of file upload
      // Rest of your state properties
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          editable: true
        },
        {
          title: "Admission No",
          dataIndex: "admission_no",
          editable: true
        },
        {
          title: "Roll No",
          dataIndex: "roll_no",
          editable: true
        },
        {
          title: "Student Name",
          dataIndex: "STUDENT_NAME",
          editable: true
        },
        {
          title: "Date Form",
          dataIndex: "date_form",
          editable: true
        },
        {
          title: "Mother Tongue",
          dataIndex: "MOTHERTONGUE",
          editable: true
        },
        {
          title: "State",
          dataIndex: "STATE",
          editable: true
        },
        {
          title: "Date of Birth (DD-MM-YYYY)",
          dataIndex: "DOB_DD_MM_YYYY",
          editable: true
        },
        {
          title: "Sex",
          dataIndex: "SEX",
          editable: true
        },
        {
          title: "Blood Group",
          dataIndex: "BLOOD_GROUP",
          editable: true
        },
        {
          title: "Nationality",
          dataIndex: "NATIONALITY",
          editable: true
        },
        {
          title: "Religion",
          dataIndex: "RELIGION",
          editable: true
        },
        {
          title: "Denomination",
          dataIndex: "DENOMINATION",
          editable: true
        },
        {
          title: "Caste",
          dataIndex: "CASTE",
          editable: true
        },
        {
          title: "Caste Classification",
          dataIndex: "CASTE_CLASSIFICATION",
          editable: true
        },
        {
          title: "Aadhaar Card No",
          dataIndex: "AADHAAR_CARD_NO",
          editable: true
        },
        {
          title: "Ration Card No",
          dataIndex: "RATIONCARDNO",
          editable: true
        },
        {
          title: "EMIS No",
          dataIndex: "EMIS_NO",
          editable: true
        },
        {
          title: "Food",
          dataIndex: "FOOD",
          editable: true
        },
        {
          title: "Chronic Disease",
          dataIndex: "chronic_des",
          editable: true
        },
        {
          title: "Medicine Taken",
          dataIndex: "medicine_taken",
          editable: true
        },
        {
          title: "Father",
          dataIndex: "FATHER",
          editable: true
        },
        {
          title: "Father's Occupation",
          dataIndex: "OCCUPATION",
          editable: true
        },
        {
          title: "Mother",
          dataIndex: "MOTHER",
          editable: true
        },
        {
          title: "Mother's Occupation",
          dataIndex: "mother_occupation",
          editable: true
        },
        {
          title: "Guardian",
          dataIndex: "GUARDIAN",
          editable: true
        },
        {
          title: "Guardian's Occupation",
          dataIndex: "guardian_occupation",
          editable: true
        },
        {
          title: "Mobile Number",
          dataIndex: "MOBILE_NUMBER",
          editable: true
        },
        {
          title: "Email ID",
          dataIndex: "EMAIL_ID",
          editable: true
        },
        {
          title: "WhatsApp No",
          dataIndex: "WHATS_APP_NO",
          editable: true
        },
        {
          title: "Mother's Email ID",
          dataIndex: "mother_email_id",
          editable: true
        },
        {
          title: "Guardian's Contact No",
          dataIndex: "guardian_contact_no",
          editable: true
        },
        {
          title: "Guardian's Email ID",
          dataIndex: "guardian_email_id",
          editable: true
        },
        {
          title: "Monthly Income",
          dataIndex: "MONTHLY_INCOME",
          editable: true
        },
        {
          title: "Mother's Income",
          dataIndex: "mother_income",
          editable: true
        },
        {
          title: "Guardian's Income",
          dataIndex: "guardian_income",
          editable: true
        },
        {
          title: "Permanent House Number",
          dataIndex: "PERMANENT_HOUSENUMBER",
          editable: true
        },
        {
          title: "Permanent Street Name",
          dataIndex: "P_STREETNAME",
          editable: true
        },
        {
          title: "Permanent Village/Town Name",
          dataIndex: "P_VILLAGE_TOWN_NAME",
          editable: true
        },
        {
          title: "Permanent District",
          dataIndex: "P_DISTRICT",
          editable: true
        },
        {
          title: "Permanent State",
          dataIndex: "P_STATE",
          editable: true
        },
        {
          title: "Permanent Pincode",
          dataIndex: "P_PINCODE",
          editable: true
        },
        {
          title: "Communication House Number",
          dataIndex: "COMMUNICATION_HOUSE_NO",
          editable: true
        },
        {
          title: "Communication Street Name",
          dataIndex: "C_STREET_NAME",
          editable: true
        },
        {
          title: "Communication Village/Town Name",
          dataIndex: "C_VILLAGE_TOWN_NAME",
          editable: true
        },
        {
          title: "Communication District",
          dataIndex: "C_DISTRICT",
          editable: true
        },
        {
          title: "Communication State",
          dataIndex: "C_STATE",
          editable: true
        },
        {
          title: "Communication Pincode",
          dataIndex: "C_PINCODE",
          editable: true
        },
        {
          title: "Class Last Studied",
          dataIndex: "CLASS_LAST_STUDIED",
          editable: true
        },
        {
          title: "Name of School",
          dataIndex: "NAME_OF_SCHOOL",
          editable: true
        },
        {
          title: "Sought Standard",
          dataIndex: "SOUGHT_STD",
          editable: true
        },
        {
          title: "Section",
          dataIndex: "sec",
          editable: true
        },
        {
          title: "Syllabus",
          dataIndex: "syllabus",
          editable: true
        },
        {
          title: "Group 12",
          dataIndex: "GROUP_12",
          editable: true
        },
        {
          title: "Second Group No",
          dataIndex: "second_group_no",
          editable: true
        },
        {
          title: "Language Part I",
          dataIndex: "LANG_PART_I",
          editable: true
        },
        {
          title: "Profile Photo",
          dataIndex: "profile_photo",
          editable: true
        },
        {
          title: "Birth Certificate Photo",
          dataIndex: "birth_certificate_photo",
          editable: true
        },
        {
          title: "Aadhaar Card Photo",
          dataIndex: "aadhar_card_photo",
          editable: true
        },
        {
          title: "Ration Card Photo",
          dataIndex: "ration_card_photo",
          editable: true
        },
        {
          title: "Community Certificate",
          dataIndex: "community_certificate",
          editable: true
        },
        {
          title: "Slip Photo",
          dataIndex: "slip_photo",
          editable: true
        },
        {
          title: "Medical Certificate Photo",
          dataIndex: "medical_certificate_photo",
          editable: true
        },
        {
          title: "Reference Letter Photo",
          dataIndex: "reference_letter_photo",
          editable: true
        },
        {
          title: "Church Certificate Photo",
          dataIndex: "church_certificate_photo",
          editable: true
        },
        {
          title: "Transfer Certificate Photo",
          dataIndex: "transfer_certificate_photo",
          editable: true
        },
        {
          title: "Admission Photo",
          dataIndex: "admission_photo",
          editable: true
        },
        {
          title: "Payment Order ID",
          dataIndex: "payment_order_id",
          editable: true
        },
        {
          title: "Brother 1",
          dataIndex: "brother_1",
          editable: true
        },
        {
          title: "Brother 2",
          dataIndex: "brother_2",
          editable: true
        },
        {
          title: "Gender 1",
          dataIndex: "gender_1",
          editable: true
        },
        {
          title: "Gender 2",
          dataIndex: "gender_2",
          editable: true
        },
        {
          title: "Class 1",
          dataIndex: "class_1",
          editable: true
        },
        {
          title: "Class 2",
          dataIndex: "class_2",
          editable: true
        },
        {
          title: "Brother 3",
          dataIndex: "brother_3",
          editable: true
        },
        {
          title: "Gender 3",
          dataIndex: "gender_3",
          editable: true
        },
        {
          title: "Class 3",
          dataIndex: "class_3",
          editable: true
        },
        {
          title: "Last School State",
          dataIndex: "last_school_state",
          editable: true
        },
        {
          title: "Second Language School",
          dataIndex: "second_language_school",
          editable: true
        },
        {
          title: "Reference Name 1",
          dataIndex: "reference_name_1",
          editable: true
        },
        {
          title: "Reference Name 2",
          dataIndex: "reference_name_2",
          editable: true
        },
        {
          title: "Reference Phone 1",
          dataIndex: "reference_phone_1",
          editable: true
        },
        {
          title: "Reference Phone 2",
          dataIndex: "reference_phone_2",
          editable: true
        },
        {
          title: "Organisation",
          dataIndex: "ORGANISATION",
          editable: true
        },
        {
          title: "Mother's Organisation",
          dataIndex: "mother_organization",
          editable: true
        },
        {
          title: "Guardian's Organisation",
          dataIndex: "guardian_organization",
          editable: true
        },
        {
          title: "Created At",
          dataIndex: "created_at",
          editable: true
        },
        {
          title: "Updated At",
          dataIndex: "updated_at",
          editable: true
        },
        {
          title: "Documents",
          dataIndex: "documents",
          editable: true
        },
      ]
    };
  }

  handleSave = row => {
    const newData = [...this.state.rows];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ rows: newData });
  };

  checkFile(file) {
    let errorMessage = "";
    if (!file || !file[0]) {
      return;
    }
    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!";
    }
    console.log("file", file[0].type);
    const isLt2M = file[0].size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 2MB!";
    }
    console.log("errorMessage", errorMessage);
    return errorMessage;
  }

  fileHandler = fileList => {
    console.log("fileList", fileList);
    this.file = fileList;
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!"
      });
      return false;
    }
    console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!"
      });
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          if (row && row[2] !== null && row[2] !== undefined){
          //  let dobDate = new Date((row[4] - 1) * 24 * 60 * 60 * 1000 + Date.UTC(1899, 11, 30));
            // let formattedDob = `${dobDate.getDate()}-${dobDate.getMonth() + 1}-${dobDate.getFullYear()}`;
           let dobDate = new Date((row[6]) * 24 * 60 * 60 * 1000 + Date.UTC(1899, 11, 30));
            let formattedDob = `${dobDate.getDate()}-${dobDate.getMonth() + 1}-${dobDate.getFullYear()}`;
            let date_formDate = new Date((row[3]) * 24 * 60 * 60 * 1000 + Date.UTC(1899, 11, 30));
            let formatteddate_form = `${date_formDate.getDate()}-${date_formDate.getMonth() + 1}-${date_formDate.getFullYear()}`;
            let cDate = new Date((row[85]) * 24 * 60 * 60 * 1000 + Date.UTC(1899, 11, 30));
            let formattedc = `${cDate.getDate()}-${cDate.getMonth() + 1}-${cDate.getFullYear()}`;
            let uDate = new Date((row[86]) * 24 * 60 * 60 * 1000 + Date.UTC(1899, 11, 30));
            let formattedu = `${uDate.getDate()}-${uDate.getMonth() + 1}-${uDate.getFullYear()}`;
            
            newRows.push({
              key: index,
              roll_no: row[0],
              admission_no: row[1],
              STUDENT_NAME: row[2],
              date_form: formatteddate_form,
              MOTHERTONGUE: row[4],
              STATE: row[5],
              DOB_DD_MM_YYYY: formattedDob,
              SEX: row[7],
              BLOOD_GROUP: row[8],
              NATIONALITY: row[9],
              RELIGION: row[10],
              DENOMINATION: row[11],
              CASTE: row[12],
              CASTE_CLASSIFICATION: row[13],
              AADHAAR_CARD_NO: row[14],
              RATIONCARDNO: row[15],
              EMIS_NO: row[16],
              FOOD: row[17],
              chronic_des: row[18],
              medicine_taken: row[19],
              FATHER: row[20],
              OCCUPATION: row[21],
              MOTHER: row[22],
              mother_occupation: row[23],
              GUARDIAN: row[24],
              guardian_occupation: row[25],
              MOBILE_NUMBER: row[26],
              EMAIL_ID: row[27],
              WHATS_APP_NO: row[28],
              mother_email_id: row[29],
              guardian_contact_no: row[30],
              guardian_email_id: row[31],
              MONTHLY_INCOME: row[32],
              mother_income: row[33],
              guardian_income: row[34],
              PERMANENT_HOUSENUMBER: row[35],
              P_STREETNAME: row[36],
              P_VILLAGE_TOWN_NAME: row[37],
              P_DISTRICT: row[38],
              P_STATE: row[39],
              P_PINCODE: row[40],
              COMMUNICATION_HOUSE_NO: row[41],
              C_STREET_NAME: row[42],
              C_VILLAGE_TOWN_NAME: row[43],
              C_DISTRICT: row[44],
              C_STATE: row[45],
              C_PINCODE: row[46],
              CLASS_LAST_STUDIED: row[47],
              NAME_OF_SCHOOL: row[48],
              SOUGHT_STD: row[49],
              sec: row[50],
              syllabus: row[51],
              GROUP_12: row[52],
              second_group_no: row[53],
              LANG_PART_I: row[54],
              profile_photo: row[55],
              birth_certificate_photo: row[56],
              aadhar_card_photo: row[57],
              ration_card_photo: row[58],
              community_certificate: row[59],
              slip_photo: row[60],
              medical_certificate_photo: row[61],
              reference_letter_photo: row[62],
              church_certificate_photo: row[63],
              transfer_certificate_photo: row[64],
              admission_photo: row[65],
              payment_order_id: row[66],
              brother_1: row[67],
              brother_2: row[68],
              gender_1: row[69],
              gender_2: row[70],
              class_1: row[71],
              class_2: row[72],
              brother_3: row[73],
              gender_3: row[74],
              class_3: row[75],
              last_school_state: row[76],
              second_language_school: row[77],
              reference_name_1: row[78],
              reference_name_2: row[79],
              reference_phone_1: row[80],
              reference_phone_2: row[81],
              ORGANISATION: row[82],
              mother_organization: row[83],
              guardian_organization: row[84],
              created_at: formattedc,
              updated_at: formattedu,
              documents: row[87],
            });
            
          }
        });
        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!"
          });
          return false;
        } else {
          this.setState({
            cols: resp.cols,
            rows: newRows,
            errorMessage: null
          });
        }
      }
    });
    return false;
  };

  handleSubmit = async () => {
    this.setState({ rows: [] });
    this.setState({ uploading: true });

    const reader = new FileReader();

    reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

        const chunkSize = 100;
        const totalRows = jsonData.length;

        // Define an async function for uploading a chunk of data
        const uploadChunkData = async (chunkData) => {
          try {
                 Swal.fire({
      title: "Please wait",
      text: "Uploading data... Please do not click any button.",
      icon: "info",
      buttons: false,
      closeOnClickOutside: false,
      closeOnEsc: false,
    });
                const data = {
                    data: chunkData
                };
                console.log('Processing chunk:', chunkData);
                console.log("uploadProgress", this.state.uploadProgress);
                const response = await axios.post('https://www.santhoshavidhyalaya.com/SVSTEST/api/upload-student', data);
                   Swal.close();

            return response.data; // Return the entire response
            } catch (error) {
                console.error('Error uploading chunk:', error);
                throw error;
            }
        };

        try {
            const allResponses = []; // Accumulate all responses

            for (let i = 1; i < totalRows; i += chunkSize) {
                const chunkData = jsonData.slice(i, i + chunkSize);
                if (i === totalRows - chunkSize) {
                    // Set uploading to false and uploadProgress to 100 when processing the last chunk
                    this.setState({ uploading: false, uploadProgress: 100 });
                }

                let response;

                try {
                    response = await uploadChunkData(chunkData);
                    allResponses.push(response); // Store the response in the accumulator
                } catch (error) {
                    console.error('Error in chunk upload:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong during data upload!',
                        footer: 'Please try again',
                        customClass: {
                            popup: 'error-popup',
                        },
                    });
                    return;
                }
                this.setState({ uploading: false, uploadProgress: 100 });

                console.log('Processing chunk:', chunkData);
            }

            // After all chunks are uploaded, process accumulated responses
            const uploadedData = allResponses.flatMap(response => response.uploaded);
            const duplicatesData = allResponses.flatMap(response => response.duplicates);
            
            // Display the Swal alert with the accumulated data
            const uploadedCount = uploadedData.length;
            const duplicatesCount = duplicatesData.length;

 
// Build a plain text response
const responseText = `
Modified Existing Data [${duplicatesCount}]:
${duplicatesData.map(row => `Email: ${row.email}, Admission No: ${row.admission_no}, Message: ${row.message}`).join("\n")}

Uploaded Data [${uploadedCount}]:
${uploadedData.map(row => `Email: ${row.email}, Admission No: ${row.admission_no}, Message: ${row.message}`).join("\n")}
`;


// Create a table for uploaded data
const uploadedTable = uploadedData.map(row => `
    <tr>
        <td>${row.email}</td>
        <td>${row.admission_no}</td>
        <td>${row.message}</td>
    </tr>`).join("");

// Create a table for duplicates data
const duplicatesTable = duplicatesData.map(row => `
    <tr>
        <td>${row.email}</td>
        <td>${row.admission_no}</td>
        <td>${row.message}</td>
    </tr>`).join("");

// Create the Swal alert with the tables and "Copy" buttons
if (duplicatesCount === 0 && uploadedCount === 0) {
  Swal.fire({
      icon: 'error',
      title: 'Record Already Exists',
      text: 'Record already exists, so it was not uploaded.',
      showConfirmButton: false,
      showCloseButton: true,
      customClass: {
          popup: 'uploaded-data-popup',
          closeButton: 'uploaded-data-close-button',
      },
      footer: 'No data was uploaded.',
  });
} else {Swal.fire({
    icon: 'success',
    title: 'Data Upload Successful',
    html: `
        <div style="max-width: 800px; margin: 0 auto;">
            <h2>Modified Existing Data (${duplicatesCount}):</h2>
            <table class="table table-bordered">
            <thead class="thead-dark">
                    <tr>
                        <th style="border: 1px solid #ccc; padding: 10px;">Email</th>
                        <th style="border: 1px solid #ccc; padding: 10px;">Admission No</th>
                        <th style="border: 1px solid #ccc; padding: 10px;">Message</th>
                    </tr>
                </thead>
                <tbody>
                    ${duplicatesTable}
                </tbody>
            </table>
            
            <h2>Uploaded Data (${uploadedCount}):</h2>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #ccc; padding: 10px;">Email</th>
                        <th style="border: 1px solid #ccc; padding: 10px;">Admission No</th>
                        <th style="border: 1px solid #ccc; padding: 10px;">Message</th>
                    </tr>
                </thead>
                <tbody>
                    ${uploadedTable}
                </tbody>
            </table>
            
            <div style="text-align: center; margin-top: 20px;">
                <button id="copyButton" style="padding: 10px 20px; background-color: #007bff; color: white; border: none; cursor: pointer;">
                    Copy Response
                </button>
            </div>
        </div>
    `,
    showConfirmButton: false,
    showCloseButton: true,
    customClass: {
        popup: 'uploaded-data-popup',
        closeButton: 'uploaded-data-close-button',
    },
    footer: 'Data uploaded successfully.',
}).then(result => {
    if (result.isConfirmed) {
        // Handle close button clicked
    }
    
    const copyButton = document.getElementById('copyButton');
    copyButton.addEventListener('click', () => {
        const responseText = `
Uploaded Data:
${uploadedData.map(row => `Email: ${row.email}, Admission No: ${row.admission_no}, Message: ${row.message}`).join("\n")}

Modified Existing Data:
${duplicatesData.map(row => `Email: ${row.email}, Admission No: ${row.admission_no}, Message: ${row.message}`).join("\n")}
`;

        navigator.clipboard.writeText(responseText)
            .then(() => {
                Swal.fire('Response Copied', 'Response copied to clipboard!', 'success');
            })
            .catch(error => {
                Swal.fire('Error', 'Copying response failed.', 'error');
                console.error(error);
            });
    });
});
}





        } catch (error) {
            console.error('Error during data upload:', error);
        }
                this.setState({ rows: [], file: null });

    };

    reader.readAsArrayBuffer(this.file);
};

//   handleSubmit = async () => {
//     this.setState({ rows: [] });
//     this.setState({ uploading: true });
  
//     const reader = new FileReader();
  
//     reader.onload = async (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = read(data, { type: 'array' });
  
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
  
//       const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
  
//       const chunkSize = 100;
//       const totalRows = jsonData.length;
  
//       // Define an async function for uploading a chunk of data
//       const uploadChunkData = async (chunkData) => {
//         try {
//           const data = {
//             data: chunkData
//           };
//           console.log('Processing chunk:', chunkData);
//           console.log("uploadProgress", this.state.uploadProgress);
//           const response = await axios.post('https://www.santhoshavidhyalaya.com/SVSTEST/api/upload-student', data);
//           return response;
//         } catch (error) {
//           console.error('Error uploading chunk:', error);
//           throw error;
//         }
//       };
  
//       try {
//         for (let i = 1; i < totalRows; i += chunkSize) {
//           const chunkData = jsonData.slice(i, i + chunkSize);
//           if (i === totalRows - chunkSize) {
//             // Set uploading to false and uploadProgress to 100 when processing the last chunk
//             this.setState({ uploading: false, uploadProgress: 100 });
//           }
  
//           let response;
  
//           try {
//             response = await uploadChunkData(chunkData);
//             console.log('response ++++++++++++', response.data);
//             const newRows = response.data.uploaded.map(row => ({
//               admission_no: row.admission_no,
//               roll_no: row.roll_no,
//               name: row.name,
//             }));
//             console.log(newRows);
//             const updatedRows = [...this.state.rows, ...newRows];
//             this.setState({ rows: updatedRows });
//             const progress = Math.round(((i + chunkSize) / totalRows) * 100);
//             this.setState({ uploadProgress: progress });
        
//             // Display success alert with uploaded data
//             const uploadedData = response.data.uploaded.map(row => `Email: ${row.email}, Admission No: ${row.admission_no}`).join("<br/>");
//             const duplicatesData = response.data.duplicates.map(row => `Email: ${row.email}, Admission No: ${row.admission_no}`).join("<br/>");
  
            
//             const duplicatesCount =response.data.duplicates.length;
//             const uploadedCount = response.data.uploaded.length;
         
// Swal.fire({
//   icon: 'success',
//   title: 'Data Upload Successful',
//   html: `
//     <div style="font-weight: bold; margin-bottom: 10px;">Modified Existing Data [${duplicatesCount}]:</div>
//     <div style="margin-bottom: 20px; color: red;">${JSON.stringify(duplicatesData, null, 2)}</div>
//     <div style="font-weight: bold; margin-bottom: 10px;">Uploaded Data  [${uploadedCount}]:</div>
//     <div>${uploadedData}</div>
//   `,
//   footer: 'Data uploaded successfully.',
//   showConfirmButton: false,
//   showCloseButton: true,
//   customClass: {
//     popup: 'uploaded-data-popup',
//     closeButton: 'uploaded-data-close-button',
//   },
// });
//           } catch (error) {
//             console.error('Error in chunk upload:', error);
//             Swal.fire({
//               icon: 'error',
//               title: 'Oops...',
//               text: 'Something went wrong during data upload!',
//               footer: 'Please try again',
//               customClass: {
//                 popup: 'error-popup',
//               },
//             });
//             return;
//           }
//           this.setState({ uploading: false, uploadProgress: 100 });

//           console.log('Processing chunk:', chunkData);
//         }
//       } catch (error) {
//         console.error('Error during data upload:', error);
//       }
//     };
  
//     reader.readAsArrayBuffer(this.file);
//   };
  
  
  
  handleDelete = key => {
    const rows = [...this.state.rows];
    this.setState({ rows: rows.filter(item => item.key !== key) });
  };
  // handleAdd = () => {
  //   const { count, rows } = this.state;
  //   const newData = {
  //     key: count,
  //     name: "Student's name",
  //     gender: "Enter Gender"
  //   };
  //   this.setState({
  //     rows: [newData, ...rows],
  //     count: count + 1
  //   });
  // };

  render() {
    const {rows, uploadProgress, uploading } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <>
        <Row gutter={16}>
          <Col xs={6}
            span={8}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5%"
            }} >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="page-title"><h5>Upload Student Data</h5></div>
            </div>
          </Col>
          <Col span={8}>
            <a href={Sample_Excel} target="_blank" rel="noopener noreferrer" download>
              <Button className="bg-success text-light">Download Sample excel sheet</Button>{' '}
            </a>
          </Col>
        </Row>
        <div>
          <Row>
            <Col>
            <Upload
              name="file"
              beforeUpload={this.fileHandler}
              onRemove={() => this.setState({ rows: [] })}
              multiple={false} >
              <Button>
                {/* <Icon type="upload" />  */}
              <MdUpload size={25} className="pe-1" />  Click to Upload Excel File
              </Button>
            </Upload>
            </Col>


            
            <Col
              span={8}
              align="right"
              style={{ display: "flex", justifyContent: "space-between", textAlign: 'end' }}>
              {this.state.rows.length > 0 && (
                <>
                  <div className="text-end">
                    <Button
                      className="button-61"
                      onClick={this.handleSubmit}
                      size="large"
                      type="primary"
                      style={{ marginBottom: 16, marginLeft: 10, height: '50%' }}
                      disabled={uploading}>
                      Submit Data
                    </Button>
                  </div>
                  {uploading && uploadProgress < 100 && (
  <Progress percent={uploadProgress} size="small" style={{ marginTop: 10 }} />
)}

                </>
              )}
            </Col>
        </Row>
        </div>
        <div style={{ overflowX: 'auto' , paddingTop:'10px'}}>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={rows}
        columns={columns} />
    </div>

        <div style={{ marginTop: 20 }}>
          {/* <Table
            components={components}
            rowClassName={() => "editable-row"}
            dataSource={this.state.rows}
            columns={columns}
          /> */}
        </div>
      </>
    );
  }
}










































// import React, { Component } from "react";
// import { Table, Button, Popconfirm, Row, Col, Upload, Progress  } from "antd";
// import { ExcelRenderer } from "react-excel-renderer";
// import { EditableFormRow, EditableCell } from '../StudentProfile/editable';
// import {AiFillDelete} from 'react-icons/ai';
// import {MdUpload} from 'react-icons/md';
// import { read, utils } from 'xlsx';
// import axios from 'axios';
// import Sample_Excel from '../MangerUser/SVS-Sample-profile.xlsx';

// export default class BulkuploadTable extends Component {
//   constructor(props) {
//     super(props);
//     this.file = null;
//     this.state = {
//       cols: [],
//       rows: [],
//       errorMessage: null,
//       uploading: false, // Indicates if the file is being uploaded
//       uploadProgress: 0, // Tracks the progress of file upload
//       // Rest of your state properties
//       columns: [
//         {
//           title: "admission No",
//           dataIndex: "admission_no",
//           editable: true
//         },
//         {
//           title: "Roll no",
//           dataIndex: "roll_no",
//           editable: true
//         },
//         {
//           title: "Name",
//           dataIndex: "name",
//           editable: true
//         }
//       ]
//     };
//   }

//   handleSave = row => {
//     const newData = [...this.state.rows];
//     const index = newData.findIndex(item => row.key === item.key);
//     const item = newData[index];
//     newData.splice(index, 1, {
//       ...item,
//       ...row
//     });
//     this.setState({ rows: newData });
//   };

//   checkFile(file) {
//     let errorMessage = "";
//     if (!file || !file[0]) {
//       return;
//     }
//     const isExcel =
//       file[0].type === "application/vnd.ms-excel" ||
//       file[0].type ===
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
//     if (!isExcel) {
//       errorMessage = "You can only upload Excel file!";
//     }
//     console.log("file", file[0].type);
//     const isLt2M = file[0].size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       errorMessage = "File must be smaller than 2MB!";
//     }
//     console.log("errorMessage", errorMessage);
//     return errorMessage;
//   }

//   fileHandler = fileList => {
//     console.log("fileList", fileList);
//     this.file = fileList;
//     let fileObj = fileList;
//     if (!fileObj) {
//       this.setState({
//         errorMessage: "No file uploaded!"
//       });
//       return false;
//     }
//     console.log("fileObj.type:", fileObj.type);
//     if (
//       !(
//         fileObj.type === "application/vnd.ms-excel" ||
//         fileObj.type ===
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//       )
//     ) {
//       this.setState({
//         errorMessage: "Unknown file format. Only Excel files are uploaded!"
//       });
//       return false;
//     }
//     //just pass the fileObj as parameter
//     ExcelRenderer(fileObj, (err, resp) => {
//       if (err) {
//         console.log(err);
//       } else {
//         let newRows = [];
//         resp.rows.slice(1).map((row, index) => {
//           if (row && row !== "undefined") {
//             newRows.push({
//               key: index,
//               admission_no: row[0],
//               roll_no: row[1],
//               name: row[2]

//             });
//           }
//         });
//         if (newRows.length === 0) {
//           this.setState({
//             errorMessage: "No data found in file!"
//           });
//           return false;
//         } else {
//           this.setState({
//             cols: resp.cols,
//             rows: newRows,
//             errorMessage: null
//           });
//         }
//       }
//     });
//     return false;
//   };

//   handleSubmit = async () => {
//     this.setState({ rows: []});

//     this.setState({uploading:true})
//     console.log("submitting: ", this.state.rows);
//     const reader = new FileReader();

//     reader.onload = async  (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = read(data, { type: 'array' });

//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];

//       const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

//       const chunkSize = 10;
//       const totalRows = jsonData.length;

//           // Define an async function for uploading a chunk of data
//         const uploadChunkData = async (chunkData) => {
//           try {
//             const data = {
//               data: chunkData
//             };
//             console.log('Processing chunk:', chunkData);
//             console.log("uploadProgress",this.state.uploadProgress);
//             const response = await axios.post('http://127.0.0.1:8000/api/upload-student', data);
//             return response;
//             console.log('Chunk uploaded successfully:', response.data);
//           } catch (error) {
//             console.error('Error uploading chunk:', error);
//           }
//         };

//       for (let i = 1; i < totalRows; i += chunkSize) {
//         const chunkData = jsonData.slice(i, i + chunkSize);
//         if (i === totalRows - chunkSize) {
//           // Set uploading to false and uploadProgress to 100 when processing the last chunk
//           this.setState({ uploading: false, uploadProgress: 100 });
//         }
//         try {
//           const response =  await uploadChunkData(chunkData);
//           console.log("response ++++++++++++>",response.data);
//           const newRows = response.data.data.map(row => ({
//             admission_no: row.admission_no,
//             roll_no: row.roll_no,
//             name: row.name,
//           }));
//           console.log(newRows);
//           const updatedRows = [...this.state.rows, ...newRows];
//           this.setState({ rows: updatedRows});

//           const progress = Math.round((i / totalRows) * 100);
//            this.setState({ uploadProgress: progress });

//         } catch (error) {
//           console.error('Error in chunk upload:', error);
//         }
//         console.log('Processing chunk:', chunkData);
//       }
//     };

//     reader.readAsArrayBuffer(this.file);
//     // this.setState({ rows: [] })
//   };

//   handleDelete = key => {
//     const rows = [...this.state.rows];
//     this.setState({ rows: rows.filter(item => item.key !== key) });
//   };
//   // handleAdd = () => {
//   //   const { count, rows } = this.state;
//   //   const newData = {
//   //     key: count,
//   //     name: "Student's name",
//   //     gender: "Enter Gender"
//   //   };
//   //   this.setState({
//   //     rows: [newData, ...rows],
//   //     count: count + 1
//   //   });
//   // };

//   render() {
//     const {rows, uploadProgress, uploading } = this.state;
//     const components = {
//       body: {
//         row: EditableFormRow,
//         cell: EditableCell
//       }
//     };
//     const columns = this.state.columns.map(col => {
//       if (!col.editable) {
//         return col;
//       }
//       return {
//         ...col,
//         onCell: record => ({
//           record,
//           editable: col.editable,
//           dataIndex: col.dataIndex,
//           title: col.title,
//           handleSave: this.handleSave
//         })
//       };
//     });
//     return (
//       <>
//         <Row gutter={16}>
//           <Col xs={6}
//             span={8}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "5%"
//             }} >
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <div className="page-title"><h5>Upload Student Data</h5></div>
//             </div>
//           </Col>
//           <Col span={8}>
//             <a href={Sample_Excel} target="_blank" rel="noopener noreferrer" download>
//               <Button className="bg-success text-light">Download Sample excel sheet</Button>{' '}
//             </a>
//           </Col>
//         </Row>
//         <div>
//           <Row>
//             <Col>
//             <Upload
//               name="file"
//               beforeUpload={this.fileHandler}
//               onRemove={() => this.setState({ rows: [] })}
//               multiple={false} >
//               <Button>
//                 {/* <Icon type="upload" />  */}
//               <MdUpload size={25} className="pe-1" />  Click to Upload Excel File
//               </Button>
//             </Upload>
//             </Col>


            
//             <Col
//               span={8}
//               align="right"
//               style={{ display: "flex", justifyContent: "space-between", textAlign: 'end' }}
//             >
//               {this.state.rows.length > 0 && (
//                 <>
//                   <div className="text-end">
//                     <Button
//                       className="button-61"
//                       onClick={this.handleSubmit}
//                       size="large"
//                       type="primary"
//                       style={{ marginBottom: 16, marginLeft: 10, height: '50%' }}
//                       disabled={uploading} // Disable the button while uploading
//                     >
//                       Submit Data
//                     </Button>
//                   </div>
//                   {/* Display the progress bar if uploading is in progress */}
//                   {uploading && (
//                     <Progress percent={uploadProgress} size="small" style={{ marginTop: 10 }} />
//                   )}
//                 </>
//               )}
//             </Col>
//         </Row>
//         </div>
//         <div style={{ marginTop: 20 }}>
//           <Table
//             components={components}
//             rowClassName={() => "editable-row"}
//             dataSource={rows}
//             columns={columns}
//           />
//         </div>

//         <div style={{ marginTop: 20 }}>
//           {/* <Table
//             components={components}
//             rowClassName={() => "editable-row"}
//             dataSource={this.state.rows}
//             columns={columns}
//           /> */}
//         </div>
//       </>
//     );
//   }
// }