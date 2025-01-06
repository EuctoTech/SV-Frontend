import React, { useEffect, useState } from "react";
import "../../Admindashboard/MangerUser/UsersStyles.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { studentEditValidator } from "../../Validators/YupValidators";
import axios from "axios";
import { Spin } from "antd";
import ImageModal from "./ModalPopup/ImageModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function EditStudentProfile({ type, admission_id, profile_id }) {
  const edit_type = type;

  const [isStudentData, setStudentData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState({
    image: "",
    type: "",
    modalOpen: false,
    title: "",
  });

  const navigate = useNavigate();

  // Select Image from file
  const handleImageFile = async (event, fieldName, { setFieldValue }) => {
    const file = event.target.files[0];
    const type = file?.type?.split("/")[0];
    const base64 = await convertBase64(file);
    // setImagePreview({ imagePreview: base64, imageType: type });
    setFieldValue(fieldName, { base64, type });
  };

  // Convert Image to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const successMessage = () => {
    Swal.fire({
      title:
        edit_type === "student_profile"
          ? "Profile Updated Successfully!"
          : "Application Updated Successfully!",
      icon: "success",
      timer: 2000, // Auto-close after 2 seconds
      showConfirmButton: false,
    }).then(() => {
      navigate(-1); // Navigate to the previous page
    });
  };

  const updateValues = (values) => {
    const pro_id = profile_id;
    const ad_id = admission_id;
    setLoading(true);
    axios
      .post(
        edit_type === "student_profile"
          ? `https://www.santhoshavidhyalaya.com/SVSTEST/api/studentadmitted-update/${pro_id}`
          : `https://www.santhoshavidhyalaya.com/SVSTEST/api/Admission-update/${ad_id}`,
        {
          date_form: values?.date_application,
          admission_no: values?.admission_no,
          roll_no: values?.roll_no,
          STUDENT_NAME: values?.student_name,
          status: values.student_status,
          MOTHERTONGUE: values?.mother_tongue,
          STATE: values?.state,
          DOB_DD_MM_YYYY: values?.dob,
          SEX: values?.gender,
          BLOOD_GROUP: values?.blood_group,
          NATIONALITY: values?.nationality,
          RELIGION: values?.religion,
          DENOMINATION: values?.church_denomination,
          CASTE: values?.caste,
          CASTE_CLASSIFICATION: values?.caste_classification,
          AADHAAR_CARD_NO: values?.aadhar_card_no,
          RATIONCARDNO: values?.ration_card_no,
          EMIS_NO: values?.emis_no,
          FOOD: values?.food_choice,
          chronic_des: values?.chronic_diseases,
          medicine_taken: values?.medicine_taken,
          FATHER: values?.fa_name,
          OCCUPATION: values?.fa_profession,
          MOBILE_NUMBER: values?.fa_mobileNo,
          EMAIL_ID: values?.fa_emailId,
          MONTHLY_INCOME: values?.fa_monthlyIncome,
          ORGANISATION: values?.fa_organizationEmployed,
          MOTHER: values?.mo_name,
          mother_occupation: values?.mo_profession,
          WHATS_APP_NO: values?.mo_mobileNo,
          mother_email_id: values?.mo_emailId,
          mother_income: values?.mo_monthlyIncome,
          mother_organization: values?.mo_organizationEmployed,
          GUARDIAN: values?.ga_name,
          guardian_occupation: values?.ga_profession,
          guardian_contact_no: values?.ga_mobileNo,
          guardian_email_id: values?.ga_emailId,
          guardian_income: values?.ga_monthlyIncome,
          guardian_organization: values?.ga_organizationEmployed,
          sibiling: values?.siblings,
          brother_1: values?.sibling1_name,
          gender_1: values?.sibling1_gender,
          class_1: values?.sibling1_class,
          brother_2: values?.sibling2_name,
          gender_2: values?.sibling2_gender,
          class_2: values?.sibling2_class,
          brother_3: values?.sibling3_name,
          gender_3: values?.sibling3_gender,
          class_3: values?.sibling3_class,
          PERMANENT_HOUSENUMBER: values?.pa_houseNo,
          P_STREETNAME: values?.pa_street,
          P_VILLAGE_TOWN_NAME: values?.pa_town_city,
          P_DISTRICT: values?.pa_district,
          P_STATE: values?.pa_state,
          P_PINCODE: values?.pa_postalCode,
          COMMUNICATION_HOUSE_NO: values?.co_houseNo,
          C_STREET_NAME: values?.co_street,
          C_VILLAGE_TOWN_NAME: values?.co_town_city,
          C_DISTRICT: values?.co_district,
          C_STATE: values?.co_state,
          C_PINCODE: values?.co_postalCode,
          CLASS_LAST_STUDIED: values?.class_last_studied,
          NAME_OF_SCHOOL: values?.school_last_studied,
          SOUGHT_STD: values?.class_admission_sought,
          sec: values?.student_section,
          last_school_state: values?.location_school_last_studied,
          second_language_school: values?.child_tamil_second_lang,
          syllabus: values?.last_studied_syllabus,
          group_no: values?.group_pre_first_choice,
          second_group_no: values?.group_pre_second_choice,
          second_language: values?.pre_second_lang,
          reference_name_1: values?.ref_name1,
          reference_phone_1: values?.ref_mobileNo1,
          reference_name_2: values?.ref_name2,
          reference_phone_2: values?.ref_mobileNo2,
          profile_photo: values?.child_photo?.base64,
          birth_certificate: values?.birth_certificate?.base64,
          aadhar_copy: values?.aadhar_copy?.base64,
          ration_card: values?.ration_card?.base64,
          community_certificate: values?.community_certificate?.base64,
          salary_certificate: values?.salary_certificate?.base64,
          medical_certificate: values?.medical_certificate?.base64,
          reference_letter: values?.reference_letter?.base64,
          transfer_certificate: values?.transfer_certificate?.base64,
          migration_certificate: values?.migration_certificate?.base64,
          church_certificate: values?.church_certificate?.base64,
          father_title: values.father_title,
          mother_title: values.mother_title,
        }
      )
      .then((res) => {
        getStudentData();
        successMessage();
      });
  };

  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const preferredLanguageOptions = [
    { value: "", label: "Select Preferred Second Language" },
    { value: "Tamil", label: "Tamil" },
    { value: "Hindi", label: "Hindi" },
    { value: "French", label: "French" },
  ];

  const standardOptions = [
    { value: "", label: "Select Class" },
    { value: "LKG", label: "LKG" },
    { value: "UKG", label: "UKG" },
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
    { value: "IV", label: "IV" },
    { value: "V", label: "V" },
    { value: "VI", label: "VI" },
    { value: "VII", label: "VII" },
    { value: "VIII", label: "VIII" },
    { value: "IX", label: "IX" },
    { value: "X", label: "X" },
    { value: "XI", label: "XI" },
    { value: "XII", label: "XII" },
  ];

  const syllabusOptions = [
    { value: "", label: "Select Syllabus" },
    { value: "State", label: "State" },
    { value: "CBSE", label: "CBSE" },
    { value: "CISCE", label: "CISCE" },
    { value: "IGCSE", label: "IGCSE" },
    { value: "Other", label: "Other" },
  ];

  const groupOptions = [
    { value: "", label: "Select Group" },
    {
      value: "Group I - English, Maths, Physics, Chemistry, Biology",
      label: "Group I - English, Maths, Physics, Chemistry, Biology",
    },
    {
      value:
        "Group II - English, Computer Science, Physics, Chemistry, Biology",
      label:
        "Group II - English, Computer Science, Physics, Chemistry, Biology",
    },
    {
      value: "Group III - English, Maths, Physics, Chemistry, Computer Science",
      label: "Group III - English, Maths, Physics, Chemistry, Computer Science",
    },
    {
      value:
        "Group IV - English, Accountancy, Computer Application, Commerce, Economics",
      label:
        "Group IV - English, Accountancy, Computer Application, Commerce, Economics",
    },
    {
      value:
        "Group V - English, Accountancy, Business Maths, Commerce, Economics",
      label:
        "Group V - English, Accountancy, Business Maths, Commerce, Economics",
    },
  ];

  const studentStatusOption = [
    { value: "", label: "Select Student Status" },
    { value: "Applied", label: "Applied" },
    { value: "Approved", label: "Approved" },
    { value: "Active", label: "Active" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Incomplete", label: "Incomplete" },
    { value: "Rejected", label: "Rejected" },
  ];

  const parentsTitle = [
    { value: "Mr.", label: "Mr." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Ms.", label: "Ms." },
    { value: "Late.", label: "Late." },
    { value: "Rev.", label: "Rev." },
    { value: "Pr.", label: "Pr." },
    { value: "Bishop", label: "Bishop" },
    { value: "Evangelist", label: "Evangelist" },
    { value: "Missionary", label: "Missionary" },
  ];

  // Filter titles based on the parent type
  const filterTitles = (type) => {
    if (type === "father") {
      return parentsTitle.filter(
        (option) => option.value !== "Mrs." && option.value !== "Ms."
      );
    } else if (type === "mother") {
      return parentsTitle.filter((option) => option.value !== "Mr.");
    }
    return parentsTitle;
  };

  const tableContents = () => {
    return (
      <table>
        <tbody>
          <tr className="content-back-style">
            <td className="common-font-family">Group I</td>
            <td className="common-font-family">
              English, Maths, Physics, Chemistry, Biology
            </td>
          </tr>
          <tr>
            <td className="common-font-family">Group II</td>
            <td className="common-font-family">
              English, Computer Science, Physics, Chemistry, Biology
            </td>
          </tr>
          <tr className="content-back-style">
            <td className="common-font-family">Group III</td>
            <td className="common-font-family">
              English, Maths, Physics, Chemistry, Computer Science
            </td>
          </tr>
          <tr>
            <td className="common-font-family">Group IV</td>
            <td className="common-font-family">
              English, Accountancy, Computer Application, Commerce, Economics
            </td>
          </tr>
          <tr className="content-back-style">
            <td className="common-font-family">Group V</td>
            <td className="common-font-family">
              English, Accountancy, Business Maths, Commerce, Economics
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const CustomErrorMessage = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        component="div"
        className="common-font-family text-danger"
      />
    );
  };

  const getStudentData = () => {
    const pro_id = profile_id;
    const ad_id = admission_id;
    axios
      .get(
        edit_type === "student_profile"
          ? `https://www.santhoshavidhyalaya.com/SVSTEST/api/studentadmitted/${pro_id}`
          : `https://www.santhoshavidhyalaya.com/SVSTEST/api/viewbyidadmission/${ad_id}`
      )
      .then((res) => {
        console.log("res?.data", res?.data);
        setStudentData(res?.data?.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <div className="main-content">
      {isLoading ? (
        <div className="spin-style vh-100">
          <Spin size="large" />
        </div>
      ) : (
        <Container className="edit-container shadow-sm">
          <div className="title-col-txt">
            <h1 className="title-txt">
              {edit_type === "student_profile"
                ? "Student Profile"
                : "Student Application"}
            </h1>
          </div>

          <Formik
            enableReinitialize={true}
            initialValues={{
              date_application: isStudentData?.date_form,
              admission_no: isStudentData?.admission_no,
              roll_no: isStudentData?.roll_no,
              student_name: isStudentData?.STUDENT_NAME,
              student_status: isStudentData?.status,
              mother_tongue: isStudentData?.MOTHERTONGUE,
              state: isStudentData?.STATE,
              dob: isStudentData?.DOB_DD_MM_YYYY,
              gender: isStudentData?.SEX,
              blood_group: isStudentData?.BLOOD_GROUP,
              nationality: isStudentData?.NATIONALITY,
              religion: isStudentData?.RELIGION,
              church_denomination: isStudentData?.DENOMINATION,
              caste: isStudentData?.CASTE,
              caste_classification: isStudentData?.CASTE_CLASSIFICATION,
              aadhar_card_no: isStudentData?.AADHAAR_CARD_NO,
              ration_card_no: isStudentData?.RATIONCARDNO,
              emis_no: isStudentData?.EMIS_NO,
              food_choice:
                isStudentData?.FOOD === "Non Vegetarian"
                  ? "Non_Vegetarian"
                  : isStudentData?.FOOD,
              chronic_diseases: isStudentData?.chronic_des,
              medicine_taken: isStudentData?.medicine_taken,
              fa_name: isStudentData?.FATHER,
              fa_profession: isStudentData?.OCCUPATION,
              fa_mobileNo: isStudentData?.MOBILE_NUMBER,
              fa_emailId: isStudentData?.EMAIL_ID,
              fa_monthlyIncome: isStudentData?.MONTHLY_INCOME,
              fa_organizationEmployed: isStudentData?.ORGANISATION,
              mo_name: isStudentData?.MOTHER,
              mo_profession: isStudentData?.mother_occupation,
              mo_mobileNo: isStudentData?.WHATS_APP_NO,
              mo_emailId: isStudentData?.mother_email_id,
              mo_monthlyIncome: isStudentData?.mother_income,
              mo_organizationEmployed: isStudentData?.mother_organization,
              ga_name: isStudentData?.GUARDIAN,
              ga_profession: isStudentData?.guardian_occupation,
              ga_mobileNo: isStudentData?.guardian_contact_no,
              ga_emailId: isStudentData?.guardian_email_id,
              ga_monthlyIncome: isStudentData?.guardian_income,
              ga_organizationEmployed: isStudentData?.guardian_organization,
              siblings: isStudentData?.sibling,
              sibling1_name: isStudentData?.brother_1,
              sibling1_gender: isStudentData?.gender_1,
              sibling1_class: isStudentData?.class_1,
              sibling2_name: isStudentData?.brother_2,
              sibling2_gender: isStudentData?.gender_2,
              sibling2_class: isStudentData?.class_2,
              sibling3_name: isStudentData?.brother_3,
              sibling3_gender: isStudentData?.gender_3,
              sibling3_class: isStudentData?.class_3,
              pa_houseNo: isStudentData?.PERMANENT_HOUSENUMBER,
              pa_street: isStudentData?.P_STREETNAME,
              pa_town_city: isStudentData?.P_VILLAGE_TOWN_NAME,
              pa_district: isStudentData?.P_DISTRICT,
              pa_state: isStudentData?.P_STATE,
              pa_postalCode: isStudentData?.P_PINCODE,
              co_houseNo: isStudentData?.COMMUNICATION_HOUSE_NO,
              co_street: isStudentData?.C_STREET_NAME,
              co_town_city: isStudentData?.C_VILLAGE_TOWN_NAME,
              co_district: isStudentData?.C_DISTRICT,
              co_state: isStudentData?.C_STATE,
              co_postalCode: isStudentData?.C_PINCODE,
              class_last_studied: isStudentData?.CLASS_LAST_STUDIED,
              school_last_studied: isStudentData?.NAME_OF_SCHOOL,
              class_admission_sought: isStudentData?.SOUGHT_STD,
              student_section: isStudentData?.sec,
              location_school_last_studied: isStudentData?.last_school_state,
              child_tamil_second_lang: isStudentData?.second_language_school,
              last_studied_syllabus: isStudentData?.syllabus,
              group_pre_first_choice: isStudentData?.group_no,
              group_pre_second_choice: isStudentData?.second_group_no,
              pre_second_lang: isStudentData?.second_language,
              ref_name1: isStudentData?.reference_name_1,
              ref_mobileNo1: isStudentData?.reference_phone_1,
              ref_name2: isStudentData?.reference_name_2,
              ref_mobileNo2: isStudentData?.reference_phone_2,
              child_photo: isStudentData?.profile_picture,
              birth_certificate: isStudentData?.birth_certificate,
              aadhar_copy: isStudentData?.aadhar_copy,
              ration_card: isStudentData?.ration_card,
              community_certificate: isStudentData?.community_certificate,
              salary_certificate: isStudentData?.salary_certificate,
              medical_certificate: isStudentData?.medical_certificate,
              reference_letter: isStudentData?.reference_letter,
              transfer_certificate: isStudentData?.transfer_certificate,
              migration_certificate: isStudentData?.migration_certificate,
              church_certificate: isStudentData?.church_certificate,
              father_title: isStudentData?.father_title,
              mother_title: isStudentData?.mother_title,
            }}
            onSubmit={(values) => updateValues(values)}
            validationSchema={studentEditValidator(edit_type)}
          >
            {(formik) => {
              const {
                handleSubmit,
                values,
                error,
                handleBlur,
                handleChange,
                setFieldValue,
              } = formik;
              return (
                <div>
                  <Row className="pb-0">
                    <p className="common-font-family text-danger pb-0">
                      {edit_type === "student_profile"
                        ? "*Note: Editing the student profile is only enabled when the student's status is set to Active"
                        : "*Note: Editing the student application is disabled because the student status is Active"}
                    </p>
                  </Row>
                  <Form onSubmit={handleSubmit}>
                    <fieldset
                      disabled={
                        edit_type === "student_profile" &&
                        isStudentData?.status === "Active"
                          ? false
                          : true
                      }
                    >
                      <Row className="py-3 px-2 pt-0 mb-3">
                        <Col className="student-title py-3">
                          <h3 className="title-txt text-white">
                            Student Details
                          </h3>
                        </Col>
                      </Row>
                      {edit_type === "student_profile" && (
                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Admission No{" "}
                              <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="admission_no"
                                className="form-ctrl-style"
                                placeholder="Enter Admission No"
                                type="text"
                                value={values.admission_no}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"admission_no"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Roll No <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="roll_no"
                                className="form-ctrl-style"
                                placeholder="Enter Roll No"
                                type="text"
                                value={values.roll_no}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"roll_no"} />
                          </Col>
                        </Row>
                      )}

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Student Name <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="student_name"
                              className="form-ctrl-style"
                              placeholder="Enter Student Name"
                              type="text"
                              value={values.student_name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"student_name"} />
                        </Col>
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            {edit_type === "student_profile"
                              ? "Status"
                              : "Date of Application"}
                            <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>
                        {edit_type === "student_profile" ? (
                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Select
                                name="student_status"
                                className="form-ctrl-style dropdown-font-style"
                                value={values.student_status}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              >
                                {studentStatusOption.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                            <CustomErrorMessage name={"student_status"} />
                          </Col>
                        ) : (
                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="date_application"
                                className="form-ctrl-style"
                                placeholder="Enter Date of Application"
                                type="date" // Use date input type for DOB
                                value={values.date_application}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>

                            <CustomErrorMessage name={"date_application"} />
                          </Col>
                        )}
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Mother tongue of the pupil
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="mother_tongue"
                              className="form-ctrl-style"
                              placeholder="Enter Mother Tounge"
                              type="text"
                              value={values.mother_tongue}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            State <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="state"
                              className="form-ctrl-style"
                              placeholder="Enter State"
                              type="text"
                              value={values.state}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"state"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Date of Birth{" "}
                            <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="dob"
                              className="form-ctrl-style"
                              placeholder="Enter Date of Birth"
                              type="date" // Use date input type for DOB
                              value={values.dob}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"dob"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Gender <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={4} className="mb-4 align-items-center">
                          <Form.Group className="d-flex">
                            <Form.Check
                              className="common-font-family mb-0"
                              type="radio"
                              label="Male"
                              name="gender"
                              value="Male"
                              checked={values.gender === "Male"}
                              onChange={handleChange}
                            />
                            <Form.Check
                              className="common-font-family mb-0 mx-4"
                              type="radio"
                              label="Female"
                              name="gender"
                              value="Female"
                              checked={values.gender === "Female"}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"gender"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Blood Group <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="blood_group"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.blood_group}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              <option value="">Select Blood Group</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage name={"blood_group"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Nationality <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="nationality"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.nationality}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              <option value="">Select Nationality</option>
                              <option value="indian">Indian</option>
                              <option value="other">Other</option>
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage name={"nationality"} />
                        </Col>
                      </Row>

                      <hr className="custom-dotted-hr" />

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Religion
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="religion"
                              className="form-ctrl-style"
                              placeholder="Enter Religion"
                              type="text"
                              value={values.religion}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Church Denomination
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="church_denomination"
                              className="form-ctrl-style"
                              placeholder="For Chirstian Applicants"
                              type="text"
                              value={values.church_denomination}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Catse
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="caste"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.caste}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              <option value="">Select Caste</option>
                              <option value="SC">SC</option>
                              <option value="ST">ST</option>
                              <option value="MBC">MBC</option>
                              <option value="BC">BC</option>
                              <option value="OC+">OC</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Caste Classification
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="caste_classification"
                              className="form-ctrl-style"
                              placeholder="Enter Caste"
                              type="text"
                              value={values.caste_classification}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Aadhar Card No
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="aadhar_card_no"
                              className="form-ctrl-style"
                              placeholder="Enter Aadhar Card No"
                              type="number"
                              value={values.aadhar_card_no}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Ration Card No
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="ration_card_no"
                              className="form-ctrl-style"
                              placeholder="Enter Ration Card No"
                              type="text"
                              value={values.ration_card_no}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            EMIS NO (If the child studied in the state of
                            TamilNadu)
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="emis_no"
                              className="form-ctrl-style"
                              placeholder="Enter EMIS No"
                              type="text"
                              value={values.emis_no}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Food Choice <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="food_choice"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.food_choice}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              <option value="">Select Food</option>
                              <option value="Vegetarian">Vegetarian</option>
                              <option value="Non_Vegetarian">
                                Non-Vegetarian
                              </option>
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage name={"food_choice"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Details of Chronic Diseases, if any
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="chronic_diseases"
                              className="form-ctrl-style"
                              placeholder="Enter Details of Chronic Diseases"
                              type="text"
                              value={values.chronic_diseases}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Are you taking any medicine or treatment at present?
                            <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="medicine_taken"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.medicine_taken}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              <option value="">Select Medicine Taken</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage name={"medicine_taken"} />
                        </Col>
                      </Row>

                      <Row className="py-3 px-2 mb-3">
                        <Col className="student-title py-3">
                          <h3 className="title-txt text-white">
                            Family Details
                          </h3>
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Father's Title{" "}
                            <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="father_title"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.father_title}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              <option value="">Select Father's Title</option>
                              {filterTitles("father").map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage name={"father_title"} />
                        </Col>
                        <Col xs={0} md={6}></Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Father's Name{" "}
                            {values.father_title != "" && (
                              <span className="text-danger ">*</span>
                            )}
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              disabled={values.father_title === ""}
                              name="fa_name"
                              className="form-ctrl-style"
                              placeholder="Enter Father's Name"
                              type="text"
                              value={values.fa_name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"fa_name"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Father's Profession{" "}
                            {!["", "Late."].includes(values.father_title) && (
                              <span className="text-danger">*</span>
                            )}
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              disabled={["", "Late."].includes(
                                values.father_title
                              )}
                              name="fa_profession"
                              className={`form-ctrl-style ${
                                values.father_title === "Mr."
                                  ? "text-black"
                                  : values.father_title === "Late."
                                  ? "text-light-gray"
                                  : ""
                              }`}
                              placeholder="Enter Father's Profession"
                              type="text"
                              value={values.fa_profession}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"fa_profession"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Father's Mobile No{" "}
                            {!["", "Late."].includes(values.father_title) && (
                              <span className="text-danger">*</span>
                            )}
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              disabled={["", "Late."].includes(
                                values.father_title
                              )}
                              name="fa_mobileNo"
                              className={`form-ctrl-style ${
                                values.father_title === "Mr."
                                  ? "text-black"
                                  : values.father_title === "Late."
                                  ? "text-light-gray"
                                  : ""
                              }`}
                              placeholder="Enter Father's Mobile No"
                              type="number"
                              value={values.fa_mobileNo}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"fa_mobileNo"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Father's Email Id{" "}
                            {!["", "Late."].includes(values.father_title) && (
                              <span className="text-danger">*</span>
                            )}
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              disabled={["", "Late."].includes(
                                values.father_title
                              )}
                              name="fa_emailId"
                              className={`form-ctrl-style ${
                                values.father_title === "Mr."
                                  ? "text-black"
                                  : values.father_title === "Late."
                                  ? "text-light-gray"
                                  : ""
                              }`}
                              placeholder="Enter Father's Email Id"
                              type="email"
                              value={values.fa_emailId}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"fa_emailId"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Father's Monthly Income{" "}
                            {!["", "Late."].includes(values.father_title) && (
                              <span className="text-danger">*</span>
                            )}
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              disabled={["", "Late."].includes(
                                values.father_title
                              )}
                              name="fa_monthlyIncome"
                              className={`form-ctrl-style ${
                                values.father_title === "Mr."
                                  ? "text-black"
                                  : values.father_title === "Late."
                                  ? "text-light-gray"
                                  : ""
                              }`}
                              placeholder="Enter Father's Monthly Income"
                              type="text"
                              value={values.fa_monthlyIncome}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"fa_monthlyIncome"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Organization Employed{" "}
                            {!["", "Late."].includes(values.father_title) && (
                              <span className="text-danger">*</span>
                            )}
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              disabled={["", "Late."].includes(
                                values.father_title
                              )}
                              name="fa_organizationEmployed"
                              className={`form-ctrl-style ${
                                values.father_title === "Mr."
                                  ? "text-black"
                                  : values.father_title === "Late."
                                  ? "text-light-gray"
                                  : ""
                              }`}
                              placeholder="Enter Father's Organization Employed"
                              type="text"
                              value={values.fa_organizationEmployed}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage
                            name={"fa_organizationEmployed"}
                          />
                        </Col>
                      </Row>

                      <hr className="custom-dotted-hr" />

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Mother's Title{" "}
                            <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="mother_title"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.mother_title}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              <option value="">Select Mother's Title</option>
                              {filterTitles("mother").map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage name={"mother_title"} />
                        </Col>
                        <Col xs={0} md={6}></Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Mother's Name{" "}
                            {values.mother_title != "" && (
                              <span className="text-danger ">*</span>
                            )}
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              disabled={values.mother_title === ""}
                              name="mo_name"
                              className={`form-ctrl-style ${
                                values.mother_title === "Mr."
                                  ? "text-black"
                                  : values.mother_title === "Late."
                                  ? "text-light-gray"
                                  : ""
                              }`}
                              placeholder="Enter Mother's Name"
                              type="text"
                              value={values.mo_name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"mo_name"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Mother's Profession{" "}
                            {!["", "Late."].includes(values.mother_title) && (
                              <span className="text-danger">*</span>
                            )}
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              disabled={["", "Late."].includes(
                                values.mother_title
                              )}
                              name="mo_profession"
                              className={`form-ctrl-style ${
                                values.mother_title === "Mr."
                                  ? "text-black"
                                  : values.mother_title === "Late."
                                  ? "text-light-gray"
                                  : ""
                              }`}
                              placeholder="Enter Mother's Profession"
                              type="text"
                              value={values.mo_profession}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"mo_profession"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Mother's Mobile No{" "}
                            {!["", "Late."].includes(values.mother_title) && (
                              <span className="text-danger">*</span>
                            )}
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              disabled={["", "Late."].includes(
                                values.mother_title
                              )}
                              name="mo_mobileNo"
                              className={`form-ctrl-style ${
                                values.mother_title === "Mr."
                                  ? "text-black"
                                  : values.mother_title === "Late."
                                  ? "text-light-gray"
                                  : ""
                              }`}
                              placeholder="Enter Mother's Mobile No"
                              type="number"
                              value={values.mo_mobileNo}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"mo_mobileNo"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Mother's Email Id{" "}
                            {!["", "Late."].includes(values.mother_title) && (
                              <span className="text-danger">*</span>
                            )}
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              disabled={["", "Late."].includes(
                                values.mother_title
                              )}
                              name="mo_emailId"
                              className={`form-ctrl-style ${
                                values.mother_title === "Mr."
                                  ? "text-black"
                                  : values.mother_title === "Late."
                                  ? "text-light-gray"
                                  : ""
                              }`}
                              placeholder="Enter Mother's Email Id"
                              type="email"
                              value={values.mo_emailId}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"mo_emailId"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Mother's Monthly Income{" "}
                            {!["", "Late."].includes(values.mother_title) && (
                              <span className="text-danger">*</span>
                            )}
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              disabled={["", "Late."].includes(
                                values.mother_title
                              )}
                              name="mo_monthlyIncome"
                              className={`form-ctrl-style ${
                                values.mother_title === "Mr."
                                  ? "text-black"
                                  : values.mother_title === "Late."
                                  ? "text-light-gray"
                                  : ""
                              }`}
                              placeholder="Enter Mother's Monthly Income"
                              type="text"
                              value={values.mo_monthlyIncome}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"mo_monthlyIncome"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Organization Employed{" "}
                            {!["", "Late."].includes(values.mother_title) && (
                              <span className="text-danger">*</span>
                            )}
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              disabled={["", "Late."].includes(
                                values.mother_title
                              )}
                              name="mo_organizationEmployed"
                              className={`form-ctrl-style ${
                                values.mother_title === "Mr."
                                  ? "text-black"
                                  : values.mother_title === "Late."
                                  ? "text-light-gray"
                                  : ""
                              }`}
                              placeholder="Enter Mother's Organization Employed"
                              type="text"
                              value={values.mo_organizationEmployed}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage
                            name={"mo_organizationEmployed"}
                          />
                        </Col>
                      </Row>

                      <hr className="custom-dotted-hr" />

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Guardian's Name
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="ga_name"
                              className="form-ctrl-style"
                              placeholder="Enter Guardian's Name"
                              type="text"
                              value={values.ga_name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Guardian's Profession
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="ga_profession"
                              className="form-ctrl-style"
                              placeholder="Enter Guardian's Profession"
                              type="text"
                              value={values.ga_profession}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Guardian's Mobile No
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="ga_mobileNo"
                              className="form-ctrl-style"
                              placeholder="Enter Guardian's Mobile No"
                              type="number"
                              value={values.ga_mobileNo}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Guardian's Email Id
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="ga_emailId"
                              className="form-ctrl-style"
                              placeholder="Enter Guardian's Email Id"
                              type="email"
                              value={values.ga_emailId}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"ga_emailId"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Guardian's Monthly Income
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="ga_monthlyIncome"
                              className="form-ctrl-style"
                              placeholder="Enter Guardian's Monthly Income"
                              type="text"
                              value={values.ga_monthlyIncome}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Organization Employed
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="ga_organizationEmployed"
                              className="form-ctrl-style"
                              placeholder="Enter Guardian's Organization Employed"
                              type="text"
                              value={values.ga_organizationEmployed}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={3} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Does the child have any other sibling(s) studying in
                            Santhosha Vidhyalaya
                            <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={5} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="siblings"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.siblings}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage name={"siblings"} />
                        </Col>
                        <Col xs={0} md={4}></Col>
                      </Row>

                      <Row className="px-2 py-3">
                        <p className="common-font-family mb-0 mb-0 p-0">
                          Information of your brother (s) & sister (s) (If
                          studying in school)
                        </p>
                        <table className="student-edit-table">
                          <thead>
                            <tr className="text-white">
                              <th>S.No</th>
                              <th>Name</th>
                              <th>Gender</th>
                              <th>Class</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-white">
                                <span className="cell-header">S.No</span>1
                              </td>
                              <td className="text-white">
                                <span className="cell-header">Name</span>
                                <Form.Group>
                                  <Form.Control
                                    name="sibling1_name"
                                    className="form-ctrl-style"
                                    placeholder="Enter Name"
                                    type="text"
                                    value={values.sibling1_name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </td>
                              <td className="text-white">
                                <span className="cell-header">Gender</span>
                                <Form.Group>
                                  <Form.Select
                                    name="sibling1_gender"
                                    className="form-ctrl-style dropdown-font-style"
                                    value={values.sibling1_gender}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  >
                                    {genderOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </td>
                              <td className="text-white">
                                <span className="cell-header">Class</span>
                                <Form.Group>
                                  <Form.Select
                                    name="sibling1_class"
                                    className="form-ctrl-style dropdown-font-style"
                                    value={values.sibling1_class}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  >
                                    {standardOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </td>
                            </tr>

                            <tr>
                              <td className="text-white">
                                <span className="cell-header ">S.No</span>2
                              </td>
                              <td className="text-white">
                                <span className="cell-header">Name</span>
                                <Form.Group>
                                  <Form.Control
                                    name="sibling2_name"
                                    className="form-ctrl-style"
                                    placeholder="Enter Name"
                                    type="text"
                                    value={values.sibling2_name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </td>
                              <td className="text-white">
                                <span className="cell-header">Gender</span>
                                <Form.Group>
                                  <Form.Select
                                    name="sibling2_gender"
                                    className="form-ctrl-style dropdown-font-style"
                                    value={values.sibling2_gender}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  >
                                    {genderOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </td>
                              <td className="text-white">
                                <span className="cell-header">Class</span>
                                <Form.Group>
                                  <Form.Select
                                    name="sibling2_class"
                                    className="form-ctrl-style dropdown-font-style"
                                    value={values.sibling2_class}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  >
                                    {standardOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </td>
                            </tr>

                            <tr className="border-edit-style">
                              <td className="text-white">
                                <span className="cell-header">S.No</span>3
                              </td>
                              <td className="text-white">
                                <span className="cell-header">Name</span>
                                <Form.Group>
                                  <Form.Control
                                    name="sibling3_name"
                                    className="form-ctrl-style"
                                    placeholder="Enter Name"
                                    type="text"
                                    value={values.sibling3_name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </td>
                              <td className="text-white">
                                <span className="cell-header">Gender</span>
                                <Form.Group>
                                  <Form.Select
                                    name="sibling3_gender"
                                    className="form-ctrl-style dropdown-font-style"
                                    value={values.sibling3_gender}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  >
                                    {genderOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </td>
                              <td className="text-white">
                                <span className="cell-header">Class</span>
                                <Form.Group>
                                  <Form.Select
                                    name="sibling3_class"
                                    className="form-ctrl-style dropdown-font-style"
                                    value={values.sibling3_class}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  >
                                    {standardOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Row>

                      <Row className="py-3 px-2 mb-3">
                        <Col className="student-title py-3">
                          <h3 className="title-txt text-white">
                            Permanent Address
                          </h3>
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            House No <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="pa_houseNo"
                              className="form-ctrl-style"
                              placeholder="Enter House No"
                              type="text"
                              value={values.pa_houseNo}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"pa_houseNo"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Street <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="pa_street"
                              className="form-ctrl-style"
                              placeholder="Enter Street"
                              type="text"
                              value={values.pa_street}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"pa_street"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Town / City <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="pa_town_city"
                              className="form-ctrl-style"
                              placeholder="Enter Town / City"
                              type="text"
                              value={values.pa_town_city}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"pa_town_city"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            District <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="pa_district"
                              className="form-ctrl-style"
                              placeholder="Enter District"
                              type="text"
                              value={values.pa_district}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"pa_district"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            State <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="pa_state"
                              className="form-ctrl-style"
                              placeholder="Enter State"
                              type="text"
                              value={values.pa_state}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"pa_state"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Postal Code <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="pa_postalCode"
                              className="form-ctrl-style"
                              placeholder="Enter Postal Code"
                              type="text"
                              value={values.pa_postalCode}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <CustomErrorMessage name={"pa_postalCode"} />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="py-3 px-2 mb-3">
                        <Col className="student-title py-3">
                          <h3 className="title-txt text-white">
                            Address For Communication
                          </h3>
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            House No <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="co_houseNo"
                              className="form-ctrl-style"
                              placeholder="Enter House No"
                              type="text"
                              value={values.co_houseNo}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"co_houseNo"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Street <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="co_street"
                              className="form-ctrl-style"
                              placeholder="Enter Street"
                              type="text"
                              value={values.co_street}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"co_street"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Town / City <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="co_town_city"
                              className="form-ctrl-style"
                              placeholder="Enter Town / City"
                              type="text"
                              value={values.co_town_city}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"co_town_city"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            District <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="co_district"
                              className="form-ctrl-style"
                              placeholder="Enter District"
                              type="text"
                              value={values.co_district}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"co_district"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            State <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="co_state"
                              className="form-ctrl-style"
                              placeholder="Enter State"
                              type="text"
                              value={values.co_state}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"co_state"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Postal Code <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="co_postalCode"
                              className="form-ctrl-style"
                              placeholder="Enter Postal Code"
                              type="text"
                              value={values.co_postalCode}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"co_postalCode"} />
                        </Col>
                      </Row>

                      <Row className="py-3 px-2 mb-3">
                        <Col className="student-title py-3">
                          <h3 className="title-txt text-white">
                            Group & Language Choice
                          </h3>
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Class Last Studied
                            <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="class_last_studied"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.class_last_studied}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              {standardOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage name={"class_last_studied"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Name of School Last Studied
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="school_last_studied"
                              className="form-ctrl-style"
                              placeholder="Enter Name of School Last Studied"
                              type="text"
                              value={values.school_last_studied}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Class for which admission is sought
                            <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="class_admission_sought"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.class_admission_sought}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              {standardOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage name={"class_admission_sought"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Location of School last studied (Mention District &
                            State)
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="location_school_last_studied"
                              className="form-ctrl-style"
                              placeholder="Enter District & State"
                              type="text"
                              value={values.location_school_last_studied}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Did the child study Tamil as Second Language
                            <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="child_tamil_second_lang"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.child_tamil_second_lang}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage
                            name={"child_tamil_second_lang"}
                          />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Last Studied Syllabus
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="last_studied_syllabus"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.last_studied_syllabus}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              {syllabusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      {edit_type === "student_profile" && (
                        <Row className="row-style px-2 py-3">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Section
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="student_section"
                                className="form-ctrl-style"
                                placeholder="Enter Section"
                                type="text"
                                value={values.student_section}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={0} md={6}></Col>
                        </Row>
                      )}

                      <Row className="px-2 py-3 pb-4">{tableContents()}</Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Group Preference - First Choice (Only for Class XI)
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="group_pre_first_choice"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.group_pre_first_choice}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              {groupOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Group Preference - Second Choice (Only for Class XI)
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="group_pre_second_choice"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.group_pre_second_choice}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              {groupOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="py-3">
                        <p className="common-font-family text-danger pb-0">
                          *Note: If any of the above groups has less than 15
                          candidates, then the second option of the student will
                          be considered.
                        </p>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Language (Only for Class XI)
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="pre_second_lang"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.pre_second_lang}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              {preferredLanguageOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col xs={0} md={6} className="mb-4"></Col>
                      </Row>

                      <Row className="py-3">
                        <p className="common-font-family text-danger pb-0">
                          *Note: Tamil and English are mandatory for Class 1 to
                          X.
                        </p>
                      </Row>

                      <Row className="py-3 px-2 mb-3">
                        <Col className="student-title py-3">
                          <h3 className="title-txt text-white">
                            References (The administration will contact the
                            references given)
                          </h3>
                        </Col>
                        <hr />
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Name <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="ref_name1"
                              className="form-ctrl-style"
                              placeholder="Enter Name"
                              type="text"
                              value={values.ref_name1}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"ref_name1"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Mobile No <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="ref_mobileNo1"
                              className="form-ctrl-style"
                              placeholder="Enter Mobile No"
                              type="number"
                              value={values.ref_mobileNo1}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"ref_mobileNo1"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Name <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="ref_name2"
                              className="form-ctrl-style"
                              placeholder="Enter Name"
                              type="text"
                              value={values.ref_name2}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"ref_name2"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Mobile No <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Control
                              name="ref_mobileNo2"
                              className="form-ctrl-style"
                              placeholder="Enter Mobile No"
                              type="number"
                              value={values.ref_mobileNo2}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <CustomErrorMessage name={"ref_mobileNo2"} />
                        </Col>
                      </Row>

                      <Row className="py-3 px-2">
                        <Col className=" p-0">
                          <h2 className="title-txt text-black">
                            Documents to be submitted along with Application :
                          </h2>
                        </Col>
                      </Row>

                      <Row className="py-1 px-2 mb-3">
                        <Col className="student-title py-3">
                          <h3 className="title-txt text-white">
                            For All Applicants
                          </h3>
                        </Col>
                      </Row>

                      <Row className="row-style p-2">
                        <Col xs={12} md={6}>
                          <Form.Label className="common-font-family mb-0">
                            Child Passport Size Photo
                          </Form.Label>
                          <Row>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Button
                                className="link-style"
                                onClick={() =>
                                  setModalOpen({
                                    image: values.child_photo.type
                                      ? values.child_photo.base64
                                      : values.child_photo,
                                    type: values.child_photo.type,
                                    modalOpen: true,
                                    title: "Profile Picture",
                                    studentName: values.student_name,
                                  })
                                }
                              >
                                View Photo
                              </Button>
                            </Col>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Form.Control
                                type="file"
                                name="child_photo"
                                accept="image/*"
                                onChange={(event) => {
                                  handleImageFile(event, "child_photo", {
                                    setFieldValue,
                                  });
                                }}
                                onBlur={handleBlur}
                                className="form-ctrl-style link-style"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Label className="common-font-family mb-0">
                            Birth Certificate
                          </Form.Label>
                          <Row>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Button
                                className="link-style"
                                onClick={() =>
                                  setModalOpen({
                                    image: values.birth_certificate.type
                                      ? values.birth_certificate.base64
                                      : values.birth_certificate,
                                    type: values.birth_certificate.type,
                                    modalOpen: true,
                                    title: "Birth Certificate",
                                    studentName: values.student_name,
                                  })
                                }
                              >
                                View Birth Certificate
                              </Button>
                            </Col>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Form.Control
                                type="file"
                                name="birth_certificate"
                                accept="image/*"
                                onChange={(event) => {
                                  handleImageFile(event, "birth_certificate", {
                                    setFieldValue,
                                  });
                                }}
                                onBlur={handleBlur}
                                className="form-ctrl-style link-style"
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Row className="row-style p-2">
                        <Col xs={12} md={6}>
                          <Form.Label className="common-font-family mb-0">
                            Aadhaar Copy / UID
                          </Form.Label>
                          <Row>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Button
                                className="link-style"
                                onClick={() =>
                                  setModalOpen({
                                    image: values.aadhar_copy.type
                                      ? values.aadhar_copy.base64
                                      : values.aadhar_copy,
                                    type: values.aadhar_copy.type,
                                    modalOpen: true,
                                    title: "Aadhaar Copy / UID",
                                    studentName: values.student_name,
                                  })
                                }
                              >
                                View Aadhaar Copy / UID
                              </Button>
                            </Col>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Form.Control
                                type="file"
                                name="aadhar_copy"
                                accept="image/*"
                                onChange={(event) => {
                                  handleImageFile(event, "aadhar_copy", {
                                    setFieldValue,
                                  });
                                }}
                                onBlur={handleBlur}
                                className="form-ctrl-style link-style"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Label className="common-font-family mb-0">
                            Ration Card
                          </Form.Label>
                          <Row>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Button
                                className="link-style"
                                onClick={() =>
                                  setModalOpen({
                                    image: values.ration_card.type
                                      ? values.ration_card.base64
                                      : values.ration_card,
                                    type: values.ration_card.type,
                                    modalOpen: true,
                                    title: "Ration Card",
                                    studentName: values.student_name,
                                  })
                                }
                              >
                                View Ration Card
                              </Button>
                            </Col>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Form.Control
                                type="file"
                                name="ration_card"
                                accept="image/*"
                                onChange={(event) => {
                                  handleImageFile(event, "ration_card", {
                                    setFieldValue,
                                  });
                                }}
                                onBlur={handleBlur}
                                className="form-ctrl-style link-style"
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Row className="row-style p-2">
                        <Col xs={12} md={6}>
                          <Form.Label className="common-font-family mb-0">
                            Community Certificate
                          </Form.Label>
                          <Row>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Button
                                className="link-style"
                                onClick={() =>
                                  setModalOpen({
                                    image: values.community_certificate.type
                                      ? values.community_certificate.base64
                                      : values.community_certificate,
                                    type: values.community_certificate.type,
                                    modalOpen: true,
                                    title: "Community Certificate",
                                    studentName: values.student_name,
                                  })
                                }
                              >
                                View Community Certificate
                              </Button>
                            </Col>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Form.Control
                                type="file"
                                name="community_certificate"
                                accept="image/*"
                                onChange={(event) => {
                                  handleImageFile(
                                    event,
                                    "community_certificate",
                                    { setFieldValue }
                                  );
                                }}
                                onBlur={handleBlur}
                                className="form-ctrl-style link-style"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Label className="common-font-family mb-0">
                            Salary Certificate / Slip or Self Declaration of
                            Income
                          </Form.Label>
                          <Row>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Button
                                className="link-style"
                                onClick={() =>
                                  setModalOpen({
                                    image: values.salary_certificate.type
                                      ? values.salary_certificate.base64
                                      : values.salary_certificate,
                                    type: values.salary_certificate.type,
                                    modalOpen: true,
                                    title: "Salary Certificate",
                                    studentName: values.student_name,
                                  })
                                }
                              >
                                View Salary Certificate
                              </Button>
                            </Col>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Form.Control
                                type="file"
                                name="salary_certificate"
                                accept="image/*"
                                onChange={(event) => {
                                  handleImageFile(event, "salary_certificate", {
                                    setFieldValue,
                                  });
                                }}
                                onBlur={handleBlur}
                                className="form-ctrl-style link-style"
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Row className="row-style p-2">
                        <Col xs={12} md={6}>
                          <Form.Label className="common-font-family mb-0">
                            Medical Certificate
                          </Form.Label>
                          <Row>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Button
                                className="link-style"
                                onClick={() =>
                                  setModalOpen({
                                    image: values.medical_certificate.type
                                      ? values.medical_certificate.base64
                                      : values.medical_certificate,
                                    type: values.medical_certificate.type,
                                    modalOpen: true,
                                    title: "Medical Certificate",
                                    studentName: values.student_name,
                                  })
                                }
                              >
                                View Medical Certificate
                              </Button>
                            </Col>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Form.Control
                                type="file"
                                name="medical_certificate"
                                accept="image/*"
                                onChange={(event) => {
                                  handleImageFile(
                                    event,
                                    "medical_certificate",
                                    {
                                      setFieldValue,
                                    }
                                  );
                                }}
                                onBlur={handleBlur}
                                className="form-ctrl-style link-style"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Label className="common-font-family mb-0">
                            Organization Endorsement or Reference Letter
                          </Form.Label>
                          <Row>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Button
                                className="link-style"
                                onClick={() =>
                                  setModalOpen({
                                    image: values.reference_letter.type
                                      ? values.reference_letter.base64
                                      : values.reference_letter,
                                    type: values.reference_letter.type,
                                    modalOpen: true,
                                    title: "Reference Letter",
                                    studentName: values.student_name,
                                  })
                                }
                              >
                                View Reference Letter
                              </Button>
                            </Col>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Form.Control
                                type="file"
                                name="reference_letter"
                                accept="image/*"
                                onChange={(event) => {
                                  handleImageFile(event, "reference_letter", {
                                    setFieldValue,
                                  });
                                }}
                                onBlur={handleBlur}
                                className="form-ctrl-style link-style"
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Row className="py-3 px-2 mb-3">
                        <Col className="student-title py-3">
                          <h3 className="title-txt text-white">
                            Original Documents
                          </h3>
                        </Col>
                      </Row>

                      <Row className="row-style p-2">
                        <Col xs={12} md={6}>
                          <Form.Label className="common-font-family mb-0">
                            Transfer Certificate
                          </Form.Label>
                          <Row>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Button
                                className="link-style"
                                onClick={() =>
                                  setModalOpen({
                                    image: values.transfer_certificate.type
                                      ? values.transfer_certificate.base64
                                      : values.transfer_certificate,
                                    type: values.transfer_certificate.type,
                                    modalOpen: true,
                                    title: "Transfer Certificate",
                                    studentName: values.student_name,
                                  })
                                }
                              >
                                View Transfer Certificate
                              </Button>
                            </Col>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Form.Control
                                type="file"
                                name="transfer_certificate"
                                accept="image/*"
                                onChange={(event) => {
                                  handleImageFile(
                                    event,
                                    "transfer_certificate",
                                    {
                                      setFieldValue,
                                    }
                                  );
                                }}
                                onBlur={handleBlur}
                                className="form-ctrl-style link-style"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Label className="common-font-family mb-0">
                            Migration Certificate
                          </Form.Label>
                          <Row>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Button
                                className="link-style"
                                onClick={() =>
                                  setModalOpen({
                                    image: values.migration_certificate.type
                                      ? values.migration_certificate.base64
                                      : values.migration_certificate,
                                    type: values.migration_certificate.type,
                                    modalOpen: true,
                                    title: "Migration Certificate",
                                    studentName: values.student_name,
                                  })
                                }
                              >
                                View Migration Certificate
                              </Button>
                            </Col>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Form.Control
                                type="file"
                                name="migration_certificate"
                                accept="image/*"
                                onChange={(event) => {
                                  handleImageFile(
                                    event,
                                    "migration_certificate",
                                    { setFieldValue }
                                  );
                                }}
                                onBlur={handleBlur}
                                className="form-ctrl-style link-style"
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Row className="py-3 px-2 mb-3">
                        <Col className="student-title py-3">
                          <h3 className="title-txt text-white">
                            Church Endorsement
                          </h3>
                        </Col>
                      </Row>

                      <Row className="row-style p-2">
                        <Col xs={12} md={12}>
                          <Form.Label className="common-font-family mb-0">
                            Church Certificate or a Letter from the Pastor
                          </Form.Label>
                          <Row>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Button
                                className="link-style"
                                onClick={() =>
                                  setModalOpen({
                                    image: values.church_certificate.type
                                      ? values.church_certificate.base64
                                      : values.church_certificate,
                                    type: values.church_certificate.type,
                                    modalOpen: true,
                                    title: "Church Certificate",
                                    studentName: values.student_name,
                                  })
                                }
                              >
                                View Church Certificate{" "}
                              </Button>
                            </Col>
                            <Col xs={12} md={6} className="px-0 pt-0 pb-2">
                              <Form.Control
                                type="file"
                                name="church_certificate"
                                accept="image/*"
                                onChange={(event) => {
                                  handleImageFile(event, "church_certificate", {
                                    setFieldValue,
                                  });
                                }}
                                onBlur={handleBlur}
                                className="form-ctrl-style link-style"
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Row className="p-2 py-3 d-flex justify-content-end">
                        <Col xs={12} md={4}>
                          <Button
                            type="submit"
                            className="common-font-family w-100"
                            variant="success"
                          >
                            Save Changes
                          </Button>
                        </Col>
                      </Row>
                    </fieldset>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </Container>
      )}
      <ImageModal modalStatus={isModalOpen} handleModal={setModalOpen} />
    </div>
  );
}
