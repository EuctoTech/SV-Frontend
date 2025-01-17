import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { handleStaffValidation } from "../../../Validators/YupValidators";
import axios from "axios";
import ImageModal from "../../MangerUser/ModalPopup/ImageModal";
import { Spin } from "antd";
import Swal from "sweetalert2";

export default function CreateAndEditStaff() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState({
    image: "",
    type: "",
    modalOpen: false,
    title: "",
  });
  const location = useLocation();
  const { type, id } = location.state || {}; // Access passed state safely

  const navigate = useNavigate();

  const CustomErrorMessage = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        component="div"
        className="common-font-family text-danger"
      />
    );
  };

  const successMessage = () => {
    Swal.fire({
      title:
        type === "add"
          ? "Staff Created Successfully!"
          : "Staff Updated Successfully!",
      icon: "success",
      timer: 2000, // Auto-close after 2 seconds
      showConfirmButton: false,
    }).then(() => {
      navigate("/staff/database"); // Navigate to the previous page
    });
  };

  const updateStaff = (values) => {
    console.log('values', values)
    setLoading(true);
    const payload = {
      staffName: values?.staff_name,
      staffId: values?.staff_id,
      designation: values?.designation,
      mobileNo: values?.mobile_no,
      email: values?.email,
      status: values?.status,
      staff_photo: values?.staff_photo?.base64,
      date_of_joining: values?.date_of_joining,
      permanentAddress: {
        addressLine1: values?.p_addressLine1,
        addressLine2: values?.p_addressLine2,
        city: values?.p_city,
        state: values?.p_state,
        pincode: values?.p_pincode,
        country: values?.p_country,
      },
      communicationAddress: {
        addressLine1: values?.c_addressLine1,
        addressLine2: values?.c_addressLine2,
        city: values?.c_city,
        state: values?.c_state,
        pincode: values?.c_pincode,
        country: values?.c_country,
        spouseName: values?.spouse_name,
        spouseWorking: values?.spouse_working,
        spouseMobileNo: values?.spouse_mobile_no,
        spouseMail: values?.spouse_mail,
      },
    };
    axios
      .post(
        type === "add"
          ? "https://www.santhoshavidhyalaya.com/SVSTEST/api/staff/add"
          : `https://www.santhoshavidhyalaya.com/SVSTEST/api/staff/edit/${id}`,
        payload
      )
      .then((res) => {
        successMessage();
        // Optionally handle success, such as navigating to another page or showing a success message
      })
      .catch((error) => {
        alert("Error updating staff:", error);
        // Optionally handle error, such as showing an error message
      });
  };

  const getStaffData = () => {
    setLoading(true);
    axios
      .get(`https://www.santhoshavidhyalaya.com/SVSTEST/api/staff/view/${id}`)
      .then((res) => {
        const data = res?.data?.staff;
        setData(data);
        setLoading(false);
      });
  };

  // Select Image from file
  const handleImageFile = async (
    event,
    fieldName,
    { setFieldValue, setTouched }
  ) => {
    const file = event.target.files[0];
    const type = file?.type?.split("/")[0];
    const base64 = await convertBase64(file);
    // setImagePreview({ imagePreview: base64, imageType: type });
    setFieldValue(fieldName, { base64, type });
    setTouched({ [fieldName]: true });
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

  useEffect(() => {
    if (type === "edit") {
      getStaffData();
    }
  }, []);

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
            <Container className="edit-container shadow-sm">
              <div className="title-col-txt">
                <h1 className="title-txt">Staff Database</h1>
              </div>

              <Formik
                enableReinitialize={true}
                initialValues={{
                  staff_id: data?.staffId || "",
                  status: data?.status || "",
                  staff_name: data?.staffName || "",
                  mobile_no: data?.mobileNo || "",
                  email: data?.email || "",
                  designation: data?.designation || "",
                  p_addressLine1: data?.permanentAddress?.addressLine1 || "",
                  p_addressLine2: data?.permanentAddress?.addressLine2 || "",
                  p_city: data?.permanentAddress?.city || "",
                  p_state: data?.permanentAddress?.state || "",
                  p_country: data?.permanentAddress?.country || "",
                  p_pincode: data?.permanentAddress?.pincode || "",
                  c_addressLine1:
                    data?.communicationAddress?.addressLine1 || "",
                  c_addressLine2:
                    data?.communicationAddress?.addressLine2 || "",
                  c_city: data?.communicationAddress?.city || "",
                  c_state: data?.communicationAddress?.state || "",
                  c_country: data?.communicationAddress?.country || "",
                  c_pincode: data?.communicationAddress?.pincode || "",
                  spouse_name: data?.communicationAddress?.spouseName || "",
                  spouse_working:
                    data?.communicationAddress?.spouseWorking || "",
                  spouse_mobile_no:
                    data?.communicationAddress?.spouseMobileNo || "",
                  spouse_mail: data?.communicationAddress?.spouseMail || "",
                  date_of_joining: data?.date_of_joining || "",
                  staff_photo: data?.staff_photo || "",
                }}
                onSubmit={(values) => {
                  updateStaff(values);
                }}
                validationSchema={handleStaffValidation}
              >
                {(formik) => {
                  const {
                    handleSubmit,
                    values,
                    error,
                    handleBlur,
                    handleChange,
                    setFieldValue,
                    setTouched,
                  } = formik;
                  return (
                    <div>
                      <Form onSubmit={handleSubmit}>
                        <Row className="py-3 px-2 pt-0 mb-3">
                          <Col className="student-title py-3">
                            <h3 className="title-txt text-white">
                              Staff Details
                            </h3>
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Staff Id <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="staff_id"
                                className="form-ctrl-style"
                                placeholder="Enter Staff Id"
                                type="text"
                                value={values.staff_id}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"staff_id"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Status <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Select
                                name="status"
                                className="form-ctrl-style dropdown-font-style"
                                value={values.status}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </Form.Select>
                            </Form.Group>
                            <CustomErrorMessage name={"status"} />
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
                                name="staff_name"
                                className="form-ctrl-style"
                                placeholder="Enter Staff Name"
                                type="text"
                                value={values.staff_name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"staff_name"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Mobile No <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="mobile_no"
                                className="form-ctrl-style"
                                placeholder="Enter Mobile No"
                                type="text"
                                value={values.mobile_no}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"mobile_no"} />
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Email Id <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="email"
                                className="form-ctrl-style"
                                placeholder="Enter Staff Email Id"
                                type="text"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"email"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Designation{" "}
                              <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="designation"
                                className="form-ctrl-style"
                                placeholder="Enter Staff Designation"
                                type="text"
                                value={values.designation}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"designation"} />
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Date of Joining{" "}
                              <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="date_of_joining"
                                className="form-ctrl-style text-black"
                                placeholder="Enter Date of Joining"
                                type="date" // Use date input type for DOB
                                value={values.date_of_joining}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"date_of_joining"} />
                          </Col>

                          <Col xs={12} md={2} className="px-0 pt-0 pb-2">
                            <Button
                              className="link-style"
                              onClick={() =>
                                setModalOpen({
                                  image: values.staff_photo.type
                                    ? values.staff_photo.base64
                                    : values.staff_photo,
                                  type: values.staff_photo.type,
                                  modalOpen: true,
                                  title: "Staff Photo",
                                  studentName: values.staff_name,
                                })
                              }
                            >
                              View Staff Photo{" "}
                            </Button>
                            <span className="text-danger"> *</span>
                          </Col>
                          <Col xs={12} md={4} className="px-0 pt-0 pb-2">
                            <Form.Control
                              type="file"
                              name="staff_photo"
                              accept="image/*"
                              onChange={(event) => {
                                handleImageFile(event, "staff_photo", {
                                  setFieldValue,
                                  setTouched,
                                });
                              }}
                              onBlur={handleBlur}
                              className="form-ctrl-style link-style"
                            />
                            <CustomErrorMessage name={"staff_photo"} />
                          </Col>
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
                              Address Line 1{" "}
                              <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="p_addressLine1"
                                className="form-ctrl-style"
                                placeholder="Enter Address Line 1"
                                type="text"
                                value={values.p_addressLine1}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"p_addressLine1"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Address Line 2{" "}
                              <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="p_addressLine2"
                                className="form-ctrl-style"
                                placeholder="Enter Address Line 2"
                                type="text"
                                value={values.p_addressLine2}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"p_addressLine2"} />
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              City<span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="p_city"
                                className="form-ctrl-style"
                                placeholder="Enter City"
                                type="text"
                                value={values.p_city}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"p_city"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              State <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="p_state"
                                className="form-ctrl-style"
                                placeholder="Enter State"
                                type="text"
                                value={values.p_state}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"p_state"} />
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Country <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="p_country"
                                className="form-ctrl-style"
                                placeholder="Enter Country"
                                type="text"
                                value={values.p_country}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"p_country"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Pincode<span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="p_pincode"
                                className="form-ctrl-style"
                                placeholder="Enter Pincode"
                                type="text"
                                value={values.p_pincode}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"p_pincode"} />
                          </Col>
                        </Row>

                        <Row className="py-3 px-2 mb-3">
                          <Col className="student-title py-3">
                            <h3 className="title-txt text-white">
                              Communication Address
                            </h3>
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Address Line 1{" "}
                              <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="c_addressLine1"
                                className="form-ctrl-style"
                                placeholder="Enter Address Line 1"
                                type="text"
                                value={values.c_addressLine1}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"c_addressLine1"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Address Line 2{" "}
                              <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="c_addressLine2"
                                className="form-ctrl-style"
                                placeholder="Enter Address Line 2"
                                type="text"
                                value={values.c_addressLine2}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"c_addressLine2"} />
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              City<span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="c_city"
                                className="form-ctrl-style"
                                placeholder="Enter City"
                                type="text"
                                value={values.c_city}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"c_city"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              State <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="c_state"
                                className="form-ctrl-style"
                                placeholder="Enter State"
                                type="text"
                                value={values.c_state}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"c_state"} />
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Country <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="c_country"
                                className="form-ctrl-style"
                                placeholder="Enter Country"
                                type="text"
                                value={values.c_country}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"c_country"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Pincode<span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="c_pincode"
                                className="form-ctrl-style"
                                placeholder="Enter Pincode"
                                type="text"
                                value={values.c_pincode}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"c_pincode"} />
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Spouse Name
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="spouse_name"
                                className="form-ctrl-style"
                                placeholder="Enter Spouse Name"
                                type="text"
                                value={values.spouse_name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            {/* <CustomErrorMessage name={"spouse_name"} /> */}
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Spouse Working{" "}
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                               <Form.Select
                                name="spouse_working"
                                className="form-ctrl-style dropdown-font-style"
                                value={values.spouse_working}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              >
                                <option value="">Select Spouse Working</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </Form.Select>
                            </Form.Group>
                            {/* <CustomErrorMessage name={"spouse_working"} /> */}
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Spouse Mobile No
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="spouse_mobile_no"
                                className="form-ctrl-style"
                                placeholder="Enter Spouse Mobile No"
                                type="text"
                                value={values.spouse_mobile_no}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            {/* <CustomErrorMessage name={"spouse_mobile_no"} /> */}
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Spouse Mail{" "}
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="spouse_mail"
                                className="form-ctrl-style"
                                placeholder="Enter Spouse Mail Id"
                                type="text"
                                value={values.spouse_mail}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            {/* <CustomErrorMessage name={"spouse_mail"} /> */}
                          </Col>
                        </Row>

                        <Row className="p-2 py-3 d-flex justify-content-end">
                          <Col xs={12} md={4}>
                            <Button
                              type="submit"
                              className="common-font-family w-100"
                              variant="success"
                            >
                              {type === "add" ? "Create" : "Save Changes"}
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  );
                }}
              </Formik>
            </Container>
          )}
        </section>
      </div>
      <ImageModal modalStatus={isModalOpen} handleModal={setModalOpen} />
    </div>
  );
}
