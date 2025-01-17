import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { handleContactValidation } from "../../../Validators/YupValidators";
import axios from "axios";
import { Spin } from "antd";
import Swal from "sweetalert2";

export default function CreateAndEditContactDataBase() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const location = useLocation();
  const { type, id } = location.state || {}; // Access passed state safely

  const navigate = useNavigate();

  const successMessage = () => {
    Swal.fire({
      title:
        type === "add"
          ? "Contact Created Successfully!"
          : "Contact Updated Successfully!",
      icon: "success",
      timer: 2000, // Auto-close after 2 seconds
      showConfirmButton: false,
    }).then(() => {
      navigate("/contact/database"); // Navigate to the previous page
    });
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

  const updateContact = (values) => {
    console.log("values", values);
    setLoading(true);
    axios
      .post(
        type === "add"
          ? "https://www.santhoshavidhyalaya.com/SVSTEST/api/contact/add"
          : `https://www.santhoshavidhyalaya.com/SVSTEST/api/contact/edit/${id}`,
        {
          id: values.contact_id,
          name: values.name,
          mobileNo: values.mobileNo,
          email: values.email,
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2,
          city: values.city,
          state: values.state,
          // country:values.country,
          countryCode: values.countryCode,
          pincode: values.pincode,
          contactType: values.contactType,
        }
      )
      .then((res) => {
        successMessage();
        // Optionally handle success, such as navigating to another page or showing a success message
      })
      .catch((error) => {
        alert("Error updating contact:", error);
        // Optionally handle error, such as showing an error message
      });
  };

  const getContactData = () => {
    setLoading(true);
    axios
      .get(`https://www.santhoshavidhyalaya.com/SVSTEST/api/contact/view/${id}`)
      .then((res) => {
        console.log("res?.data", res?.data);
        const data = res?.data?.contact;
        setData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (type === "edit") {
      getContactData();
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
                <h1 className="title-txt">Contact Database</h1>
              </div>

              <Formik
                enableReinitialize={true}
                initialValues={{
                  contact_id: data.id || "",
                  name: data.name || "",
                  mobileNo: data.mobileNo || "",
                  email: data.email || "",
                  addressLine1: data.addressLine1 || "",
                  addressLine2: data.addressLine2 || "",
                  city: data.city || "",
                  state: data.state || "",
                  // country:data.country || "",
                  countryCode: data.countryCode || "",
                  pincode: data.pincode || "",
                  contactType: data.contactType || "",
                }}
                onSubmit={(values) => {
                  updateContact(values);
                }}
                validationSchema={handleContactValidation}
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
                              Contact Details
                            </h3>
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Contact Id <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="contact_id"
                                className="form-ctrl-style"
                                placeholder="Enter Contact Id"
                                type="text"
                                value={values.contact_id}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"contact_id"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Name <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="name"
                                className="form-ctrl-style"
                                placeholder="Enter Contact Name"
                                type="text"
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"name"} />
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Email <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="email"
                                className="form-ctrl-style"
                                placeholder="Enter Email"
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
                              Mobile No <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="mobileNo"
                                className="form-ctrl-style"
                                placeholder="Enter mobile Number"
                                type="text"
                                value={values.mobileNo}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"mobileNo"} />
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
                                name="addressLine1"
                                className="form-ctrl-style"
                                placeholder="Enter Address Line 1"
                                type="text"
                                value={values.addressLine1}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"addressLine1"} />
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
                                name="addressLine2"
                                className="form-ctrl-style"
                                placeholder="Enter Address Line 2"
                                type="text"
                                value={values.addressLine2}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"addressLine2"} />
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              City <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="city"
                                className="form-ctrl-style"
                                placeholder="Enter City"
                                type="text"
                                value={values.city}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"city"} />
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
                              Country{" "}
                              <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="countryCode"
                                className="form-ctrl-style"
                                placeholder="Enter Country"
                                type="text"
                                value={values.countryCode}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"countryCode"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Pincode <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                name="pincode"
                                className="form-ctrl-style"
                                placeholder="Enter Pincode"
                                type="text"
                                value={values.pincode}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"pincode"} />
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Contact Type{" "}
                              <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Select
                                name="contactType"
                                className="form-ctrl-style dropdown-font-style"
                                value={values.contactType}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              >
                                <option value="">Select Contact Type</option>
                                <option value="Donor">Donor</option>
                                <option value="Alumni">Alumni</option>
                                <option value="Parent">Parent</option>
                                <option value="Well Wisher">Well Wisher</option>
                                <option value="Former Teachers">Former Teachers</option>
                                <option value="Others">Others</option>
                              </Form.Select>
                            </Form.Group>
                            <CustomErrorMessage name={"contactType"} />
                          </Col>

                          <Col xs={12} md={6} />
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
    </div>
  );
}
