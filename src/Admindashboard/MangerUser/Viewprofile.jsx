import React, { useRef, useEffect, useState } from "react";
// import './dashboard.css';
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../MangerUser/logo.jpeg";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { AiFillPrinter } from "react-icons/ai";
import Button from "@mui/material/Button";
import AvatarStudentImg from "./avatarStudent.svg";
import SvsInvoice from "../Svs-invoice.jpg";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Viewprofile = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const admission_no = queryParameters.get("admission_no"); //GET URL param  Value

  const [viewProfiles, setViewProfiles] = useState([]);

  const location = useLocation();
  const { invoiceNo } = location.state || {}; // Access passed state safely

  console.log("invoiceNo", invoiceNo);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Leave Data",
    // onAfterPrint:()=> Swal.fire({
    //   position: 'center',
    //   icon: 'success',
    //   title: 'File Download Successfully',
    //   showConfirmButton: false,
    //   timer: 1700
    // })
  });

  const viewProfile = async () => {
    try {
      const response = await fetch(
        `https://www.santhoshavidhyalaya.com/SVSTEST/api/view/studentinfo/${invoiceNo}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);

      setViewProfiles(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    viewProfile();
  }, []);

  return (
    <div>
      <Sidebar />
      <div style={{ width: "82.5%", float: "right" }}>
        <Header />
        <div className="row">
          <section className="p-4 col-6"></section>
          <section className="col-6 text-end px-5 py-4">
            <Button
              onClick={handlePrint}
              style={{ color: "#E91E63" }}
              role="button"
            >
              <AiFillPrinter className="pe-2" size={35} />
              Print
            </Button>
          </section>
        </div>
        <div ref={componentRef} className="pt-3">
          <section className="px-5 pb-4">
            <div style={{ border: "1px solid black" }} className="ps-2 pt-1">
              <div className="d-flex">
                <Row>
                  <Col xs={9} className="pt-4">
                    <Typography
                      style={{
                        backgroundColor: "#0C83DC",
                        width: "40%",
                        borderRadius: "0 6px 6px 0px",
                        textAlign: "center",
                        padding: "8px 0",
                        textTransform: "uppercase",
                        color: "aliceblue",
                      }}
                    >
                      Student Profile
                    </Typography>
                    <div className="pt-3 px-3">
                      <h2 style={{ fontFamily: "sans-serif" }}>
                        Santhosha Vidhyalaya
                      </h2>
                      <p style={{ fontFamily: "sans-serif" }}>
                        Dohnavur Fellowship,
                        <br />
                        Dohnavur – 627102,
                        <br />
                        Tirunelveli District, Tamil Nadu
                        <br />
                        Mobile – +91 80125 12145,
                        <br />
                        Email – finance@santhoshavidhayalaya.com{" "}
                      </p>
                    </div>
                  </Col>
                  <Col xs={3} className="text-center pt-3">
                    <img style={{ width: "60%" }} src={SvsInvoice} />
                  </Col>
                </Row>
              </div>
              <hr />
              <div className="container" style={{ fontFamily: "serif" }}>
                {viewProfiles.map((res) => (
                  <div className="row">
                    <div className="col-4">
                      <p>Admission No</p>
                      <p>Full Name</p>
                      <p>Register no</p>
                      <p>Standard</p>
                      <p>Section</p>
                      <p>Gender</p>
                      <p>Official Email</p>
                      <p>Contact Number</p>
                      <p>What's app Number</p>
                    </div>
                    <div className="col-4">
                      <p>: {invoiceNo}</p>
                      <p>: {res.STUDENT_NAME}</p>
                      <p>: {res.roll_no}</p>
                      <p>: {res.SOUGHT_STD}</p>
                      <p>: {res.sec}</p>
                      <p>: {res.SEX}</p>
                      <p>: {res.EMAIL_ID}</p>
                      <p>: {res.MOBILE_NUMBER}</p>
                      <p>: {res.WHATS_APP_NO}</p>
                    </div>

                    {/*---------------- Student Image --------------------------------------------- */}
                    <div className="col-4">
                      <img
                        className="imageSizeHrtable"
                        // src={res.File ? res.File : AvatarStudentImg}
                        src={
                          res.File
                            ? `data:image/jpg;base64,${res.File}`
                            : AvatarStudentImg
                        }
                        alt="student imager"
                      />
                    </div>
                  </div>
                ))}
                <hr />

                {viewProfiles.map((res) => (
                  <div>
                    <div className="row">
                      <div className="col-4">
                        <p>Group</p>
                        <p>DOB |YYYY-MM-DD|</p>
                        <p>Blood Group</p>
                        <p>Emis No</p>
                        <p>Nationality</p>
                        <p>State</p>
                        <p>Religion</p>
                      </div>
                      <div className="col-4">
                        <p>: {res.GROUP_12}</p>
                        <p>: {res.DOB_DD_MM_YYYY}</p>
                        <p>: {res.BLOOD_GROUP}</p>
                        <p>: {res.EMIS_NO}</p>
                        <p>: {res.NATIONALITY}</p>
                        <p>: {res.STATE}</p>
                        <p>: {res.RELIGION}</p>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-4">
                        <p>Denomination</p>
                        <p>Caste</p>
                        <p>Caste Classification</p>
                        <p>Aadhaar Card No</p>
                        <p>Ration Card No</p>
                      </div>
                      <div className="col-4">
                        <p>: {res.DENOMINATION}</p>
                        <p>: {res.CASTE}</p>
                        <p>: {res.CASTE_CLASSIFICATION}</p>
                        <p>: {res.AADHAAR_CARD_NO}</p>
                        <p>: {res.RATIONCARDNO}</p>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <h4 className="pb-2">Parents Details</h4>

                      <div className="col-4">
                        <p>Mother Tongue </p>
                        <p>Father Name</p>
                        <p>Mother Name</p>
                        <p>Father Occupation </p>
                        <p>Mother Occupation </p>
                        <p>Organisation </p>
                        <p>Guardian </p>
                        <p>Monthly income </p>
                      </div>
                      <div className="col-8">
                        <p>: {res.MOTHERTONGUE}</p>
                        <p>: {res.FATHER}</p>
                        <p>: {res.MOTHER}</p>
                        <p>: {res.OCCUPATION}</p>
                        <p>: {res.mother_occupation}</p>
                        <p>: {res.ORGANISATION}</p>
                        <p>: {res.GUARDIAN}</p>
                        <p>: {res.MONTHLY_INCOME}</p>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <h4 className="p-2">Address</h4>
                      <div className="col-4">
                        <p>Permanent House Number</p>
                        <p>Permanent Streetname</p>
                        <p>Permanent VillagetownName</p>
                        <p>Permanent District</p>
                        <p>Permanent State</p>
                        <p>Permanent Pincode</p>
                      </div>
                      <div className="col-8">
                        <p>: {res.PERMANENT_HOUSENUMBER}</p>
                        <p>: {res.P_STREETNAME}</p>
                        <p>: {res.P_VILLAGE_TOWN_NAME}</p>
                        <p>: {res.P_DISTRICT}</p>
                        <p>: {res.P_STATE}</p>
                        <p>: {res.P_PINCODE}</p>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-4">
                        <p>Communication House_no</p>
                        <p>Communication Streetname</p>
                        <p>Communication town </p>
                        <p>Communication District</p>
                        <p>Communication State</p>
                        <p>Communication Pincode</p>
                      </div>
                      <div className="col-8">
                        <p>: {res.COMMUNICATION_HOUSE_NO}</p>
                        <p>: {res.C_STREET_NAME}</p>
                        <p>: {res.C_VILLAGE_TOWN_NAME}</p>
                        <p>: {res.C_DISTRICT}</p>
                        <p>: {res.C_STATE}</p>
                        <p>: {res.C_PINCODE}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}

                <footer style={{ backgroundColor: "#D6D8D6" }}>
                  <p className="text-center" style={{ fontSize: "12px" }}>
                    The Principal, Santhosha Vidhyalaya, Dohnavur – 627102
                    Tirunelveli Dist. Tamilnadu
                  </p>
                </footer>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Viewprofile;

// import React,{useRef,useEffect, useState} from 'react';
// // import './dashboard.css';
// import Header from '../Header';
// import Sidebar from '../Sidebar';
// import Footer from '../Footer';
// import Breadcrumb from 'react-bootstrap/Breadcrumb';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import logo from '../MangerUser/logo.jpeg'
// import {useReactToPrint} from 'react-to-print';
// import Swal from 'sweetalert2';
// import {AiFillPrinter} from 'react-icons/ai';
// import Button from '@mui/material/Button';
// import AvatarStudentImg from './avatarStudent.svg'

// const Viewprofile = () => {
//   const queryParameters = new URLSearchParams(window.location.search)
//   const admission_no = queryParameters.get("admission_no") //GET URL param  Value

//   const [viewProfiles, setViewProfiles] = useState([]);

//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//       content: () => componentRef.current,
//       documentTitle:'Leave Data',
//       onAfterPrint:()=> Swal.fire({
//         position: 'center',
//         icon: 'success',
//         title: 'File Download Successfully',
//         showConfirmButton: false,
//         timer: 1700
//       })
//   })

//   const viewProfile = async () => {
//     try {
//       const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/view/studentinfo/${admission_no}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       setViewProfiles(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     viewProfile();
//   }, []);

//   return (
//     <div>
//       <Sidebar/>
//        <div style={{width:'82.5%',float:'right'}} >
//          <Header/>
//          <div className='row'>
//           <section className='p-4 col-6'>
//               <Breadcrumb>
//                   <Breadcrumb.Item href="/MangerUser/StudentUser">Student_Profile</Breadcrumb.Item>
//                   <Breadcrumb.Item active>View_Detail</Breadcrumb.Item>
//               </Breadcrumb>
//           </section>
//           <section className='col-6 text-end px-5 py-4' >
//             <Button onClick={handlePrint}  style={{color :'#E91E63'}} role="button"><AiFillPrinter className='pe-2' size={35}/>Print</Button>
//           </section>
//          </div>
//             <div ref={componentRef} className='pt-3' >
//         <section className='px-5 pb-4' >
//             <div style={{border:'1px solid black'}} className='ps-2 pt-1'>
//                 <div className='d-flex'>
//                     <img style={{width:'12%'}} src={logo} />
//                     <h4 className='pt-4 ps-3'>Santhosha Vidhyalaya Higher secondary school, Dohnavur campus</h4>
//                 </div><hr/>
//            <div className='container' style={{fontFamily: 'serif'}}>
//                 {viewProfiles.map((res, index) => (
//           <div key={index} className="row">
//             <div className="col-4">
//               <p>Admission No</p>
//               <p>Full Name</p>
//               <p>Register no</p>
//               <p>Standard</p>
//               <p>Section</p>
//               <p>Gender</p>
//               <p>Official Email</p>
//               <p>Contact Number</p>
//               <p>What's app Number</p>
//             </div>
//             <div className="col-4">
//               <p>: {res.admission_no}</p>
//               <p>: {res.student_name}</p>
//               <p>: {res.roll_no}</p>
//               <p>: {res.sought_Std}</p>
//               <p>: {res.sec}</p>
//               <p>: {res.sex}</p>
//               <p>: {res.EmailID}</p>
//               <p>: {res.Mobilenumber}</p>
//               <p>: {res.WhatsAppNo}</p>
//             </div>

//             {/*---------------- Student Image --------------------------------------------- */}
//             {/* <div className="col-4">
//               <img
//                 className="imageSizeHrtable"
//                 src={res.File ? res.File : AvatarStudentImg}
//                 alt="student imager"/>
//             </div>
//           </div>
//         ))} */}
//                    <div className="col-4">
//               <img
//                 className="imageSizeHrtable"
//                 // src={res.File ? res.File : AvatarStudentImg}
//                 src={res.File ? "data:image/jpg;base64,${res.File}" : AvatarStudentImg} alt="student imager"/>
//             </div>
//           </div>
//         ))}
//         <hr />

//         {viewProfiles.map((res) => (
//           <div>
//             <div className="row">
//               <div className="col-4">
//                 <p>Group</p>
//                 <p>DOB</p>
//                 <p>Blood Group</p>
//                 <p>Emis No</p>
//                 <p>Nationality</p>
//                 <p>State</p>
//                 <p>Religion</p>
//               </div>
//               <div className="col-4">
//                 <p>: {res.blood_group}</p>
//                 <p>: {res.dob}</p>
//                 <p>: {res.blood_group}</p>
//                 <p>: {res.emis_no}</p>
//                 <p>: {res.Nationality}</p>
//                 <p>: {res.State}</p>
//                 <p>: {res.Religion}</p>
//               </div>
//             </div>
//             <hr />

//             <div className="row">
//               <div className="col-4">
//                 <p>Denomination</p>
//                 <p>Caste</p>
//                 <p>Caste Classification</p>
//                 <p>Aadhaar Card No</p>
//                 <p>Ration Card No</p>
//               </div>
//               <div className="col-4">
//                 <p>: {res.Denomination}</p>
//                 <p>: {res.Caste}</p>
//                 <p>: {res.CasteClassification}</p>
//                 <p>: {res.AadhaarCardNo}</p>
//                 <p>: {res.RationCard}</p>
//               </div>
//             </div>
//             <hr />

//             <div className="row">
//               <h4 className="pb-2">Parents Details</h4>

//               <div className="col-4">
//                 <p>Mother Tongue </p>
//                 <p>Father Name</p>
//                 <p>Mother Name</p>
//                 <p>occupation </p>
//                 <p>Organisation </p>
//                 <p>Guardian </p>
//                 <p>Monthly income </p>
//               </div>
//               <div className="col-8">
//                 <p>: {res.Mothertongue}</p>
//                 <p>: {res.Father}</p>
//                 <p>: {res.Mother}</p>
//                 <p>: {res.Occupation}</p>
//                 <p>: {res.Organisation}</p>
//                 <p>: {res.Guardian}</p>
//                 <p>: {res.Monthlyincome}</p>
//               </div>
//             </div>
//             <hr />

//             <div className="row">
//               <h4 className="p-2">Address</h4>
//               <div className="col-4">
//                 <p>Permanent House Number</p>
//                 <p>Permanent Streetname</p>
//                 <p>Permanent VillagetownName</p>
//                 <p>Permanent Postoffice</p>
//                 <p>Permanent Taluk</p>
//                 <p>Permanent District</p>
//                 <p>Permanent State</p>
//                 <p>Permanent Pincode</p>
//               </div>
//               <div className="col-8">
//                 <p>: {res.p_housenumber}</p>
//                 <p>: {res.p_Streetname}</p>
//                 <p>: {res.p_VillagetownName}</p>
//                 <p>: {res.p_Postoffice}</p>
//                 <p>: {res.p_Taluk}</p>
//                 <p>: {res.p_District}</p>
//                 <p>: {res.p_State}</p>
//                 <p>: {res.p_Pincode}</p>
//               </div>
//             </div>
//             <hr />

//             <div className="row">
//               <div className="col-4">
//                 <p>Communication House_no</p>
//                 <p>Communication Streetname</p>
//                 <p>Communication town </p>
//                 <p>Communication Postoffice</p>
//                 <p>Communication Taluk</p>
//                 <p>Communication District</p>
//                 <p>Communication State</p>
//                 <p>Communication Pincode</p>
//               </div>
//               <div className="col-8">
//                 <p>: {res.c_HouseNumber}</p>
//                 <p>: {res.c_StreetName}</p>
//                 <p>: {res.c_VillageTownName}</p>
//                 <p>: {res.c_Postoffice}</p>
//                 <p>: {res.c_Taluk}</p>
//                 <p>: {res.c_District}</p>
//                 <p>: {res.c_State}</p>
//                 <p>: {res.c_Pincode}</p>
//               </div>
//             </div>
//             <hr />
//           </div>
//         ))}

//                  <footer style={{backgroundColor:'#D6D8D6'}}>
//                        <p className='text-center' style={{fontSize:'12px'}}>The Principal, Santhosha Vidhyalaya, Dohnavur – 627102 Tirunelveli Dist. Tamilnadu</p>
//                      </footer>
//                      </div>
//                      </div>
//          </section>
//          </div>
//        </div>
//    </div>
//   )
// }

// export default Viewprofile
