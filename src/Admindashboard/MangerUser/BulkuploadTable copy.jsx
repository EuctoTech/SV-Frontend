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
          title: "id",
          dataIndex: "id",
          editable: true
        },
        {
          title: "admission No",
          dataIndex: "admission_no",
          editable: true
        },
        {
          title: "Roll no",
          dataIndex: "roll_no",
          editable: true
        },
        {
          title: "Name",
          dataIndex: "name",
          editable: true
        },
        {
          title: "sex",
          dataIndex: "sex",
          editable: true
        },
        {
          title: "dob",
          dataIndex: "dob",
          editable: true
        },
        {
          title: "blood group",
          dataIndex: "blood_group",
          editable: true
        },
        {
          title: "emis_no",
          dataIndex: "emis_no",
          editable: true
        },
        {
          title: "Nationality",
          dataIndex: "Nationality",
          editable: true
        },
        {
          title: "State",
          dataIndex: "State",
          editable: true
        },
        {
          title: "Religion",
          dataIndex: "Religion",
          editable: true
        },
        {
          title: "Denomination",
          dataIndex: "Denomination",
          editable: true
        },
        {
          title: "Caste",
          dataIndex: "Caste",
          editable: true
        },
        {
          title: "CasteClassification",
          dataIndex: "CasteClassification",
          editable: true
        },
        {
          title: "AadhaarCardNo",
          dataIndex: "AadhaarCardNo",
          editable: true
        },
        {
          title: "RationCard",
          dataIndex: "RationCard",
          editable: true
        },
        {
          title: "Mothertongue",
          dataIndex: "Mothertongue",
          editable: true
        },
        {
          title: "Father",
          dataIndex: "Father",
          editable: true
        },
        {
          title: "Mother",
          dataIndex: "Mother",
          editable: true
        },
        {
          title: "Guardian",
          dataIndex: "Guardian",
          editable: true
        },
        {
          title: "Occupation",
          dataIndex: "Occupation",
          editable: true
        },
        {
          title: "Organisation",
          dataIndex: "Organisation",
          editable: true
        },
        {
          title: "Monthlyincome",
          dataIndex: "Monthlyincome",
          editable: true
        },
        {
          title: "p_housenumber",
          dataIndex: "p_housenumber",
          editable: true
        },
        {
          title: "p_Streetname",
          dataIndex: "p_Streetname",
          editable: true
        },
        {
          title: "p_VillagetownName",
          dataIndex: "p_VillagetownName",
          editable: true
        },
        {
          title: "p_Postoffice",
          dataIndex: "p_Postoffice",
          editable: true
        },
        {
          title: "p_Taluk",
          dataIndex: "p_Taluk",
          editable: true
        },
        {
          title: "p_District",
          dataIndex: "p_District",
          editable: true
        },
        {
          title: "p_State",
          dataIndex: "p_State",
          editable: true
        },
        {
          title: "p_Pincode",
          dataIndex: "p_Pincode",
          editable: true
        },
        {
          title: "c_HouseNumber",
          dataIndex: "c_HouseNumber",
          editable: true
        },
        {
          title: "c_StreetName",
          dataIndex: "c_StreetName",
          editable: true
        },
        {
          title: "c_VillageTownName",
          dataIndex: "c_VillageTownName",
          editable: true
        },
        {
          title: "c_Postoffice",
          dataIndex: "c_Postoffice",
          editable: true
        },
        {
          title: "c_Taluk",
          dataIndex: "c_Taluk",
          editable: true
        },
        {
          title: "c_District",
          dataIndex: "c_District",
          editable: true
        },
        {
          title: "c_State",
          dataIndex: "c_State",
          editable: true
        },
        {
          title: "c_Pincode",
          dataIndex: "c_Pincode",
          editable: true
        },
        {
          title: "Mobilenumber",
          dataIndex: "Mobilenumber",
          editable: true
        },
        {
          title: "WhatsAppNo",
          dataIndex: "WhatsAppNo",
          editable: true
        },
        {
          title: "EmailID",
          dataIndex: "EmailID",
          editable: true
        },
        {
          title: "ClasslastStudied",
          dataIndex: "ClasslastStudied",
          editable: true
        },
        {
          title: "Nameofschool",
          dataIndex: "Nameofschool",
          editable: true
        },
        {
          title: "File",
          dataIndex: "File",
          editable: true
        },
        {
          title: "sought_Std",
          dataIndex: "sought_Std",
          editable: true
        },
        {
          title: "Part_I",
          dataIndex: "Part_I",
          editable: true
        },
        {
          title: "Group",
          dataIndex: "Group",
          editable: true
        },
        {
          title: "FOOD",
          dataIndex: "FOOD",
          editable: true
        },
        {
          title: "special_information",
          dataIndex: "special_information",
          editable: true
        },
        {
          title: "Declare_not_attended",
          dataIndex: "Declare_not_attended",
          editable: true
        },
        {
          title: "Declare_dues",
          dataIndex: "Declare_dues",
          editable: true
        },
        {
          title: "Declare_dob",
          dataIndex: "Declare_dob",
          editable: true
        },
        {
          title: "Declare_Date",
          dataIndex: "Declare_Date",
          editable: true
        },
        {
          title: "Declare_Place",
          dataIndex: "Declare_Place",
          editable: true
        },
        {
          title: "Measles",
          dataIndex: "Measles",
          editable: true
        },
        {
          title: "Chickenpox",
          dataIndex: "Chickenpox",
          editable: true
        },
        {
          title: "Fits",
          dataIndex: "Fits",
          editable: true
        },
        {
          title: "Rheumaticfever",
          dataIndex: "Rheumaticfever",
          editable: true
        },
        {
          title: "Mumps",
          dataIndex: "Mumps",
          editable: true
        },
        {
          title: "Jaundice",
          dataIndex: "Jaundice",
          editable: true
        },
        {
          title: "Asthma",
          dataIndex: "Asthma",
          editable: true
        },
        {
          title: "Nephritis",
          dataIndex: "Nephritis",
          editable: true
        },
        {
          title: "Whoopingcough",
          dataIndex: "Whoopingcough",
          editable: true
        },
        {
          title: "Tuberculosis",
          dataIndex: "Tuberculosis",
          editable: true
        },
        {
          title: "Hayfever",
          dataIndex: "Hayfever",
          editable: true
        },
        {
          title: "CongenitalHeartDisease",
          dataIndex: "CongenitalHeartDisease",
          editable: true
        },
        {
          title: "P_Bronchial",
          dataIndex: "P_Bronchial",
          editable: true
        },
        {
          title: "P_Tuberculosis",
          dataIndex: "P_Tuberculosis",
          editable: true
        },
        {
          title: "BCG",
          dataIndex: "BCG",
          editable: true
        },
        {
          title: "Triple_Vaccine",
          dataIndex: "Triple_Vaccine",
          editable: true
        },
        {
          title: "Polio_Drops",
          dataIndex: "Polio_Drops",
          editable: true
        },
        {
          title: "Measles_given",
          dataIndex: "Measles_given",
          editable: true
        },
        {
          title: "MMR",
          dataIndex: "MMR",
          editable: true
        },
        {
          title: "Dual_Vaccine",
          dataIndex: "Dual_Vaccine",
          editable: true
        },
        {
          title: "Typhoid",
          dataIndex: "Typhoid",
          editable: true
        },
        {
          title: "Cholera",
          dataIndex: "Cholera",
          editable: true
        },
        {
          title: "permission_to_principal",
          dataIndex: "permission_to_principal",
          editable: true
        },
        {
          title: "administration_of_anaesthetic",
          dataIndex: "administration_of_anaesthetic",
          editable: true
        }
        
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
          if (row && row !== "undefined") {
            newRows.push({
              key: index,
              admission_no: row[0],
                roll_no: row[1],
                name: row[2],
                sex: row[3],
                dob: row[4],
                blood_group: row[5],
                emis_no: row[6],
                Nationality: row[7],
                State: row[8],
                Religion: row[9],
                Denomination: row[10],
                Caste: row[11],
                CasteClassification: row[12],
                AadhaarCardNo: row[13],
                RationCard: row[14],
                Mothertongue: row[15],
                Father: row[16],
                Mother: row[17],
                Guardian: row[18],
                Occupation: row[19],
                Organisation: row[20],
                Monthlyincome: row[21],
                p_housenumber: row[22],
                p_Streetname: row[23],
                p_VillagetownName: row[24],
                p_Postoffice: row[25],
                p_Taluk: row[26],
                p_District: row[27],
                p_State: row[28],
                p_Pincode: row[29],
                c_HouseNumber: row[30],
                c_StreetName: row[31],
                c_VillageTownName: row[32],
                c_Postoffice: row[33],
                c_Taluk: row[34],
                c_District: row[35],
                c_State: row[36],
                c_Pincode: row[37],
                Mobilenumber: row[38],
                WhatsAppNo: row[39],
                EmailID: row[40],
                ClasslastStudied: row[41],
                Nameofschool: row[42],
                File: row[43],
                sought_Std: row[44],
                Part_I: row[45],
                Group: row[46],
                FOOD: row[47],
                special_information: row[48],
                Declare_not_attended: row[49],
                Declare_dues: row[50],
                Declare_dob: row[51],
                Declare_Date: row[52],
                Declare_Place: row[53],
                Measles: row[54],
                Chickenpox: row[55],
                Fits: row[56],
                Rheumaticfever: row[57],
                Mumps: row[58],
                Jaundice: row[59],
                Asthma: row[60],
                Nephritis: row[61],
                Whoopingcough: row[62],
                Tuberculosis: row[63],
                Hayfever: row[64],
                CongenitalHeartDisease: row[65],
                P_Bronchial: row[66],
                P_Tuberculosis: row[67],
                BCG: row[68],
                Triple_Vaccine: row[69],
                Polio_Drops: row[70],
                Measles_given: row[71],
                MMR: row[72],
                Dual_Vaccine: row[73],
                Typhoid: row[74],
                Cholera: row[75],
                permission_to_principal: row[76],
                administration_of_anaesthetic: row[77],

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
                const data = {
                    data: chunkData
                };
                console.log('Processing chunk:', chunkData);
                console.log("uploadProgress", this.state.uploadProgress);
                const response = await axios.post('https://www.santhoshavidhyalaya.com/SVSTEST/api/upload-student', data);
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
Swal.fire({
  icon: 'success',
  title: 'Data Upload Successful',
  html: `
      <div style="max-width: 800px; margin: 0 auto;">
          <h2>Modified Existing Data (${duplicatesCount}):</h2>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc;">
              <thead>
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






        } catch (error) {
            console.error('Error during data upload:', error);
        }
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