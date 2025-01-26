import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ReportCard() {
  const name = "dinesh";
  const roll_no = "111";
  const standard = "1";
  const admissionNo = "3";
  const logo = "";
  const father = "dinesh";
  const mother = "dinu";
  const dob = "11-12-2025";
  const subjects = "engkish";
  const marksRow = "100";
  const grade = "A";
  const totalMarks = "500";
  const percentage = "100%";
  const attendance = "100";

  const handleChange = () =>
    `<div style="padding: 10px;">
        <div style="display: flex; justify-content: center; padding: 50px;">
          <div style="width: 10%; height: 100%; border-radius: 20%;">
            <img src="" alt="School Logo" />
          </div>
          <h1 style="padding-left: 10px;"><strong>SANTHOSHA VIDHYALAYA</strong></h1>
        </div>
        <div style="text-align: center;">
          <p style="margin-bottom: 0px;"><b>1st Term Report Report Card 2024-2025</b></p>
          <p style="color: red;"><b>${name}</b></p>
        </div>
        <div style="border-collapse: collapse; border: 1px solid black; width: 100%; margin-bottom: 20px; padding: 10px; display: flex; justify-content: space-between;">
          <div>
            <p style="margin-bottom: 0px;"><strong style="color: red;">Roll Number:</strong> <strong>${roll_no}</strong></p>
            <p style="margin-bottom: 0px;"><strong style="color: red;">Class:</strong> <strong>${standard}</strong></p>
            <p style="margin-bottom: 0px;"><strong style="color: red;">Admission No:</strong> <strong>${admissionNo}</strong></p>
          </div>
          <div style="width: 100%; height: 100%; border-radius: 20%;">
            <img src=${logo} alt="no image" />
          </div>
          <div>
            <p style="margin-bottom: 0px;"><strong style="color: red;">Father's Name:</strong> <strong>${father}</strong></p>
            <p style="margin-bottom: 0px;"><strong style="color: red;">Mother's Name:</strong> <strong>${mother}</strong></p>
            <p style="margin-bottom: 0px;"><strong style="color: red;">Date of Birth:</strong> <strong>${dob}</strong></p>
          </div>
        </div>
        <div style="text-align: center;">
          <p style="margin-bottom: 0px; color: red;"><b>SCHOLASTIC AREAS</b></p>
        </div>
        <table border="1" cellpadding="8" cellspacing="0" width="100%">
  <thead>
    <tr>
      <th border="1" cellpadding="8">Subject</th>
      <th border="1" cellpadding="8">Term</th>
      <th border="1" cellpadding="8">Grade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td border="1" cellpadding="8">${subjects}</td>
      <td border="1" cellpadding="8">${marksRow}</td>
      <td border="1" cellpadding="8">${grade}</td>
    </tr>
  </tbody>
</table>

<div>
  <table border="1" cellpadding="8" cellspacing="0" width="28%">
    <thead>
      <tr>
        <th border="1" cellpadding="8" style="border-color: red;">Total Marks</th>
        <th border="1" cellpadding="8" style="border-color: red;">${totalMarks}</th>
      </tr>
    </thead>
  </table>
  <table border="1" cellpadding="8" cellspacing="0" width="28%">
    <thead>
      <tr>
        <th border="1" cellpadding="8" style="border-color: red;">Percentage</th>
        <th border="1" cellpadding="8" style="border-color: red;">${percentage}</th>
      </tr>
    </thead>
  </table>
  <table border="1" cellpadding="8" cellspacing="0" width="28%">
    <thead>
      <tr>
        <th border="1" cellpadding="8" style="border-color: red;">Attendance</th>
        <th border="1" cellpadding="8" style="border-color: red;">${attendance}</th>
      </tr>
    </thead>
  </table>
</div>
      <div style="padding-top: 20px;">
          <p><strong>REMARKS :</strong></p>
        </div>
      </div>`;

  const [text, setText] = useState(handleChange());

  console.log('text', text)

  const check = () => {
    axios.post("https://www.santhoshavidhyalaya.com/SVSTEST/api/templates");
  };

  return (
    <>
      {/* <div style={{ padding: "10px" }}>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "50px" }}
        >
          <div style={{ width: "10%", height: "100%", borderRadius: "20%" }}>
            <img src="" alt="no image" />
          </div>
          <h1 style={{ paddingLeft: "10px" }}>
            <strong>SANTHOSHA VIDHYALAYA</strong>
          </h1>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: "0px" }}>
            <b>1st Term Report Report Card 2024-2025</b>
          </p>
          <p style={{ color: "red" }}>
            <b>{"studentName"}</b>
          </p>
        </div>
        <div
          style={{
            borderCollapse: "collapse",
            border: "1px solid black",
            width: "100%",
            marginBottom: "20px",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ marginBottom: "0px" }}>
              <strong style={{ color: "red" }}>Roll Number:</strong>{" "}
              <strong>{"roll_no"}</strong>
            </p>
            <p style={{ marginBottom: "0px" }}>
              <strong style={{ color: "red" }}>Class:</strong>{" "}
              <strong>{"class"}</strong>
            </p>
            <p style={{ marginBottom: "0px" }}>
              <strong style={{ color: "red" }}>Admission No:</strong>{" "}
              <strong>{"admissionNo"}</strong>
            </p>
          </div>

          <div>
            <div style={{ width: "100%", height: "100%", borderRadius: "20%" }}>
              <img src="" alt="no image" />
            </div>
          </div>

          <div>
            <p style={{ marginBottom: "0px" }}>
              <strong style={{ color: "red" }}>Father's Name:</strong>{" "}
              <strong>{"fatherName"}</strong>
            </p>
            <p style={{ marginBottom: "0px" }}>
              <strong style={{ color: "red" }}>Mother's Name:</strong>{" "}
              <strong>{"motherName"}</strong>
            </p>
            <p style={{ marginBottom: "0px" }}>
              <strong style={{ color: "red" }}>Date of Birth</strong>{" "}
              <strong>{"dob"}</strong>
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: "0px", color: "red" }}>
            <b>SCHOLASTIC AREAS</b>
          </p>
        </div>

        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Subject
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                {"term"}
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                {"Grade"}
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((res, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {res.subject}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {res.mark}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {"Grade"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <table style={{ borderCollapse: "collapse", width: "28%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid red", padding: "8px" }}>
                  Total Marks
                </th>
                <th style={{ border: "1px solid red", padding: "8px" }}>
                  {"totalMarks"}
                </th>
              </tr>
            </thead>
          </table>

          <table style={{ borderCollapse: "collapse", width: "28%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid red", padding: "8px" }}>
                  Percentage
                </th>
                <th style={{ border: "1px solid red", padding: "8px" }}>
                  {"percentage"}
                </th>
              </tr>
            </thead>
          </table>

          <table style={{ borderCollapse: "collapse", width: "28%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid red", padding: "8px" }}>
                  Attendance
                </th>
                <th style={{ border: "1px solid red", padding: "8px" }}>
                  {"attendance"}
                </th>
              </tr>
            </thead>
          </table>
        </div>

        <div style={{paddingTop:'20px'}}>
          <p><strong>REMARKS :</strong></p>
        </div>
      </div> */}

      <ReactQuill theme="snow" value={text} onChange={setText} />

      <p>{text}</p>

      <button onClick={() => check()}>press me</button>
    </>
  );
}

export default ReportCard;
