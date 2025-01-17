import React, { useRef, useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useReactToPrint } from "react-to-print";
import { AiFillPrinter } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";
import { Button, Col, Container, Row } from "react-bootstrap";
import Img from "../../images/newlogo.jpg";
import NoImg from "../MangerUser/avatarStudent.svg";
import ImageModal from "./ModalPopup/ImageModal";

const Viewprofile = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState({
    image: "",
    type: "",
    modalOpen: false,
    title: "",
  });
  console.log("data", data);
  const [isLoading, setLoading] = useState(true);

  const location = useLocation();

  const { id } = location.state || {}; // Access passed state safely

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Student Data",
    // onAfterPrint:()=> Swal.fire({
    //   position: 'center',
    //   icon: 'success',
    //   title: 'File Download Successfully',
    //   showConfirmButton: false,
    //   timer: 1700
    // })
  });

  const urls = [
    data?.profile_picture,
    data?.birth_certificate,
    data?.aadhar_copy,
    data?.ration_card,
    data?.community_certificate,
    data?.salary_certificate,
    data?.medical_certificate,
    data?.reference_letter,
    data?.transfer_certificate,
    data?.migration_certificate,
    data?.church_certificate,
  ];

  const getFileExtension = (url) => {
    if (!url || typeof url !== "string") {
      return null; // Return null if the URL is invalid
    }
    const match = url.match(/\.\w+$/); // Matches the last ".something"
    return match ? match[0] : null; // Returns the matched extension or null
  };

  // Get extensions for all URLs
  const fileExtensions = urls.map((url) => getFileExtension(url));

  console.log("fileExtensions", fileExtensions);

  const getStudentProfile = () => {
    axios
      .get(
        `https://www.santhoshavidhyalaya.com/SVSTEST/api/studentadmitted/${id}`
      )
      .then((res) => {
        const data = res?.data?.data;
        setData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getStudentProfile();
  }, []);

  const CustomInputs = ({ label, value }) => {
    return (
      <Row>
        <Col xs={9}>
          <Row className="py-4 pt-0">
            <Col className="d-flex ">
              <Col className="staff-label"> {label}</Col>
              <Col className="staff-label">:</Col>
            </Col>
            <Col className="staff-value">{value ?? "-"}</Col>
          </Row>
        </Col>
      </Row>
    );
  };

  const CustomLinkInputs = ({ label, value, onClick }) => {
    return (
      <Row>
        <Col xs={12} md={6}>
          <label className="staff-label">{label}</label>
          <p onClick={onClick} className="photo-link-style">{value}</p>
        </Col>
      </Row>
    );
  };

  return (
    <div>
      <Sidebar />
      <div style={{ width: "82.5%", float: "right" }}>
        <Header />
        <section className="p-4">
          {isLoading ? (
            <div className="spin-style vh-100">
              <Spin size="large" />
            </div>
          ) : (
            <div>
              <div className="text-end">
                <Button
                  className="px-4"
                  onClick={handlePrint}
                  variant="primary"
                >
                  <AiFillPrinter className="pe-2" size={35} />
                  Print
                </Button>
              </div>
              <div className="py-3 pt-0" ref={componentRef}>
                <div className="title-col-txt pt-0">
                  <h1 className="title-txt">Staff Details</h1>
                </div>
                <Container className="edit-container shadow-sm">
                  <Row>
                    <Col xs={9} className="pt-4">
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
                    <Col
                      xs={3}
                      className="text-center d-flex justify-content-center align-items-center"
                    >
                      <img
                        src={Img}
                        height={150}
                        width={150}
                        alt="No profile"
                      />
                    </Col>
                  </Row>

                  <hr />

                  <Row className="py-3 pb-0">
                    <Col xs={9}>
                      <Row className="py-4">
                        <Col className="d-flex ">
                          <Col className="staff-label">Admission No</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.admission_no}</Col>
                      </Row>
                      <Row className="py-4 pb-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Roll No</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.roll_no}</Col>
                      </Row>
                    </Col>
                    <Col className="d-flex p-0" xs={3}>
                      <img
                        src={data?.profile_picture ?? NoImg}
                        height={120}
                        width={120}
                        alt="No profile"
                      />
                    </Col>
                  </Row>

                  <CustomInputs
                    label={"Student Name"}
                    value={data?.STUDENT_NAME}
                  />

                  <CustomInputs label={"Status"} value={data?.status} />

                  <CustomInputs
                    label={"Mother Tongue"}
                    value={data?.MOTHERTONGUE}
                  />

                  <CustomInputs label={"State"} value={data?.STATE} />

                  <CustomInputs
                    label={"Date of Birth"}
                    value={data?.DOB_DD_MM_YYYY}
                  />

                  <CustomInputs label={"Gender"} value={data?.SEX} />

                  <CustomInputs
                    label={"Blood Group"}
                    value={data?.BLOOD_GROUP}
                  />

                  <CustomInputs
                    label={"Nationality"}
                    value={data?.NATIONALITY}
                  />

                  <hr />

                  <CustomInputs label={"Religion"} value={data?.RELIGION} />

                  <CustomInputs
                    label={"Chruch Denomination"}
                    value={data?.DENOMINATION}
                  />

                  <CustomInputs label={"Caste"} value={data?.CASTE} />

                  <CustomInputs
                    label={"Catse Classification"}
                    value={data?.CASTE_CLASSIFICATION}
                  />

                  <CustomInputs
                    label={"Aadhar Card No"}
                    value={data?.AADHAAR_CARD_NO}
                  />

                  <CustomInputs
                    label={"Ration Card No"}
                    value={data?.RATIONCARDNO}
                  />

                  <CustomInputs label={"EMIS No"} value={data?.EMIS_NO} />

                  <CustomInputs label={"Food Choice"} value={data?.FOOD} />

                  <CustomInputs
                    label={"Chronic Disease"}
                    value={data?.chronic_des}
                  />

                  <CustomInputs
                    label={"Medicine Taken"}
                    value={data?.medicine_taken}
                  />

                  <hr />
                  <Row className="px-2 py-3">
                    <h2>Family details</h2>
                  </Row>

                  <CustomInputs
                    label={"Father's Title"}
                    value={data?.father_title}
                  />

                  <CustomInputs label={"Father Name"} value={data?.FATHER} />

                  <CustomInputs
                    label={"Father Profession"}
                    value={data?.OCCUPATION}
                  />

                  <CustomInputs
                    label={"Father Mobile No"}
                    value={data?.MOBILE_NUMBER}
                  />

                  <CustomInputs
                    label={"Father Email Id"}
                    value={data?.EMAIL_ID}
                  />

                  <CustomInputs
                    label={"Father Monthly Income"}
                    value={data?.MONTHLY_INCOME}
                  />

                  <CustomInputs
                    label={"Father Organization Employed "}
                    value={data?.ORGANISATION}
                  />

                  <hr />

                  <CustomInputs
                    label={"Mother's Title"}
                    value={data?.mother_title}
                  />

                  <CustomInputs label={"Mother Name"} value={data?.MOTHER} />

                  <CustomInputs
                    label={"Mother Profession"}
                    value={data?.mother_occupation}
                  />

                  <CustomInputs
                    label={"Mother Mobile No"}
                    value={data?.WHATS_APP_NO}
                  />

                  <CustomInputs
                    label={"Mother Email Id"}
                    value={data?.mother_email_id}
                  />

                  <CustomInputs
                    label={"Mother Monthly Income"}
                    value={data?.mother_income}
                  />

                  <CustomInputs
                    label={"Mother Organization Employed "}
                    value={data?.mother_organization}
                  />

                  <hr />

                  <CustomInputs
                    label={"Guardian Name"}
                    value={data?.GUARDIAN}
                  />

                  <CustomInputs
                    label={"Guardian Profession"}
                    value={data?.guardian_occupation}
                  />

                  <CustomInputs
                    label={"Guardian Mobile No"}
                    value={data?.guardian_contact_no}
                  />

                  <CustomInputs
                    label={"Guardian Email Id"}
                    value={data?.guardian_email_id}
                  />

                  <CustomInputs
                    label={"Guardian Monthly Income"}
                    value={data?.guardian_income}
                  />

                  <CustomInputs
                    label={"Guardian Organization Employed "}
                    value={data?.guardian_organization}
                  />

                  <hr />
                  <CustomInputs
                    label={"Sibling(s) Studying in Santhosha Vidhyalaya"}
                    value={data?.sibling}
                  />
                  <Row className="px-2 py-3">
                    <h3>Sibling 1</h3>
                  </Row>

                  <CustomInputs label={"Name"} value={data?.brother_1} />

                  <CustomInputs label={"Gender"} value={data?.gender_1} />

                  <CustomInputs label={"Class"} value={data?.class_1} />

                  <Row className="px-2 py-3">
                    <h3>Sibling 2</h3>
                  </Row>

                  <CustomInputs label={"Name"} value={data?.brother_2} />

                  <CustomInputs label={"Gender"} value={data?.gender_2} />

                  <CustomInputs label={"Class"} value={data?.class_2} />

                  <Row className="px-2 py-3">
                    <h3>Sibling 3</h3>
                  </Row>

                  <CustomInputs label={"Name"} value={data?.brother_3} />

                  <CustomInputs label={"Gender"} value={data?.gender_3} />

                  <CustomInputs label={"Class"} value={data?.class_3} />

                  <hr />

                  <Row className="px-2 py-3">
                    <h2>Permanent Address</h2>
                  </Row>

                  <CustomInputs
                    label={"House No"}
                    value={data?.PERMANENT_HOUSENUMBER}
                  />

                  <CustomInputs label={"Street"} value={data?.P_STREETNAME} />

                  <CustomInputs
                    label={"Town/City"}
                    value={data?.P_VILLAGE_TOWN_NAME}
                  />

                  <CustomInputs label={"District"} value={data?.P_DISTRICT} />

                  <CustomInputs label={"State"} value={data?.P_STATE} />

                  <CustomInputs label={"Postal Code"} value={data?.P_PINCODE} />

                  <hr />

                  <Row className="px-2 py-3">
                    <h2>Communication Address</h2>
                  </Row>

                  <CustomInputs
                    label={"House No"}
                    value={data?.COMMUNICATION_HOUSE_NO}
                  />

                  <CustomInputs label={"Street"} value={data?.C_STREET_NAME} />

                  <CustomInputs
                    label={"Town/City"}
                    value={data?.C_VILLAGE_TOWN_NAME}
                  />

                  <CustomInputs label={"District"} value={data?.C_DISTRICT} />

                  <CustomInputs label={"State"} value={data?.C_STATE} />

                  <CustomInputs label={"Postal Code"} value={data?.C_PINCODE} />

                  <hr />

                  <Row className="px-2 py-3">
                    <h2>Group and Language Choice</h2>
                  </Row>

                  <CustomInputs
                    label={"Class Last Studied"}
                    value={data?.CLASS_LAST_STUDIED}
                  />

                  <CustomInputs
                    label={"Name of Last School Studied"}
                    value={data?.NAME_OF_SCHOOL}
                  />

                  <CustomInputs
                    label={"Location of Last School"}
                    value={data?.last_school_state}
                  />

                  <CustomInputs
                    label={"Last Studied Syllabus"}
                    value={data?.syllabus}
                  />

                  <CustomInputs
                    label={"Admission Sought"}
                    value={data?.SOUGHT_STD}
                  />

                  <CustomInputs
                    label={"Tamil as Second Language"}
                    value={data?.second_language_school}
                  />

                  <CustomInputs label={"Section"} value={data?.sec} />

                  <hr />

                  <CustomInputs
                    label={
                      "Group Preference  - First Choice (Only for class XI)"
                    }
                    value={data?.group_no}
                  />

                  <CustomInputs
                    label={
                      "Group Preference  - Second Choice (Only for class XI)"
                    }
                    value={data?.second_group_no}
                  />

                  <CustomInputs
                    label={"Language (Only for class XI)"}
                    value={data?.second_language}
                  />

                  <hr />

                  <Row className="px-2 py-3">
                    <h2>References</h2>
                  </Row>

                  <CustomInputs
                    label={"Reference Name 1"}
                    value={data?.reference_name_1}
                  />

                  <CustomInputs
                    label={"Reference Mobile No 1"}
                    value={data?.reference_phone_1}
                  />

                  <CustomInputs
                    label={"Reference Name 2"}
                    value={data?.reference_name_2}
                  />

                  <CustomInputs
                    label={"Reference Mobile No 2"}
                    value={data?.reference_phone_2}
                  />
                  <hr />

                  <Row className="px-2 py-3">
                    <h2>For All Applicants</h2>
                  </Row>

                  <div className="px-4">
                    <Row>
                      <Col xs={12} md={6}>
                        <CustomLinkInputs
                          label={"Child Passport Size Photo :"}
                          value={`${data?.STUDENT_NAME}_passport_size_photo${
                            fileExtensions[0] || ""
                          }`}
                          onClick={() =>
                            setModalOpen({
                              image: urls[0] ,
                              type: '',
                              modalOpen: true,
                              title: "Profile Picture",
                              studentName: data?.STUDENT_NAME,
                            })
                          }
                        />
                      </Col>

                      <Col xs={12} md={6}>
                        <CustomLinkInputs
                          label={"Birth Certificate :"}
                          value={`${data?.STUDENT_NAME}_birth_certificate${
                            fileExtensions[1] || ""
                          }`}
                          onClick={() =>
                            setModalOpen({
                              image: urls[1] ,
                              type: '',
                              modalOpen: true,
                              title: "Birth Certificate",
                              studentName: data?.STUDENT_NAME,
                            })
                          }
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} md={6}>
                        <CustomLinkInputs
                          label={"Aadhaar Copy / UID :"}
                          value={`${data?.STUDENT_NAME}_aadhar_copy${
                            fileExtensions[2] || ""
                          }`}
                          onClick={() =>
                            setModalOpen({
                              image: urls[2] ,
                              type: '',
                              modalOpen: true,
                              title: "Aadhar Copy",
                              studentName: data?.STUDENT_NAME,
                            })
                          }
                        />
                      </Col>

                      <Col xs={12} md={6}>
                        <CustomLinkInputs
                          label={"Ration Card :"}
                          value={`${data?.STUDENT_NAME}_ration_card${
                            fileExtensions[3] || ""
                          }`}
                          onClick={() =>
                            setModalOpen({
                              image: urls[3] ,
                              type: '',
                              modalOpen: true,
                              title: "Ration Card",
                              studentName: data?.STUDENT_NAME,
                            })
                          }
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} md={6}>
                        <CustomLinkInputs
                          label={"Community Certificate :"}
                          value={`${data?.STUDENT_NAME}_community_certificate${
                            fileExtensions[4] || ""
                          }`}
                          onClick={() =>
                            setModalOpen({
                              image: urls[4] ,
                              type: '',
                              modalOpen: true,
                              title: "Community Certificate",
                              studentName: data?.STUDENT_NAME,
                            })
                          }
                        />
                      </Col>

                      <Col xs={12} md={6}>
                        <CustomLinkInputs
                          label={
                            "Salary Certificate / Slip or Self Declaration of Income :"
                          }
                          value={`${data?.STUDENT_NAME}_salary_certificate${
                            fileExtensions[5] || ""
                          }`}
                          onClick={() =>
                            setModalOpen({
                              image: urls[5] ,
                              type: '',
                              modalOpen: true,
                              title: "Salary Certificate",
                              studentName: data?.STUDENT_NAME,
                            })
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} md={6}>
                        <CustomLinkInputs
                          label={"Medical Certificate :"}
                          value={`${data?.STUDENT_NAME}_medical_certificate${
                            fileExtensions[6] || ""
                          }`}
                          onClick={() =>
                            setModalOpen({
                              image: urls[6] ,
                              type: '',
                              modalOpen: true,
                              title: "Medical Certificate",
                              studentName: data?.STUDENT_NAME,
                            })
                          }
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <CustomLinkInputs
                          label={
                            "Organization Endorsement or Reference Letter :"
                          }
                          value={`${data?.STUDENT_NAME}_reference_letter${
                            fileExtensions[7] || ""
                          }`}
                          onClick={() =>
                            setModalOpen({
                              image: urls[7] ,
                              type: '',
                              modalOpen: true,
                              title: "Reference Letter",
                              studentName: data?.STUDENT_NAME,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  </div>
                  <hr />
                  <Row className="px-2 py-3">
                    <h2>Original Documents</h2>
                  </Row>

                  <div className="px-4">
                    <Row>
                      <Col xs={12} md={6}>
                        <CustomLinkInputs
                          label={"Transfer Certificate :"}
                          value={`${data?.STUDENT_NAME}_transfer_certificate${
                            fileExtensions[8] || ""
                          }`}
                          onClick={() =>
                            setModalOpen({
                              image: urls[8] ,
                              type: '',
                              modalOpen: true,
                              title: "Transfer Certificate",
                              studentName: data?.STUDENT_NAME,
                            })
                          }
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <CustomLinkInputs
                          label={"Migration Certificate :"}
                          value={`${data?.STUDENT_NAME}_migration_certificate${
                            fileExtensions[9] || ""
                          }`}
                          onClick={() =>
                            setModalOpen({
                              image: urls[9] ,
                              type: '',
                              modalOpen: true,
                              title: "Migration Certificate",
                              studentName: data?.STUDENT_NAME,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  </div>

                  <hr />

                  <Row className="px-2 py-3">
                    <h2>Church Endorsement</h2>
                  </Row>

                  <div className="px-4">
                    <Row>
                      <Col xs={12} md={6}>
                        <CustomLinkInputs
                          label={
                            "Church Certificate or a Letter from the Pastor :"
                          }
                          value={`${data?.STUDENT_NAME}_church_certificate${
                            fileExtensions[10] || ""
                          }`}
                          onClick={() =>
                            setModalOpen({
                              image: urls[10] ,
                              type: '',
                              modalOpen: true,
                              title: "Church Certificate",
                              studentName: data?.STUDENT_NAME,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  </div>
                </Container>
              </div>
            </div>
          )}
        </section>
      </div>

      <ImageModal modalStatus={isModalOpen} handleModal={setModalOpen} />
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
