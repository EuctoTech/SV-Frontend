import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { handleHealthCareValidation } from "../../../Validators/YupValidators";
import axios from "axios";
import { Spin } from "antd";
import Swal from "sweetalert2";

export default function CreateAndEditHealthCareDataBase() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();
  const { type, id } = location.state || {}; // Access passed state safely

  const navigate = useNavigate();

  const standardOptions = [
    { value: "", label: "Select Standard" },
    { value: "lkg", label: "LKG" },
    { value: "ukg", label: "UKG" },
    { value: "1", label: "I" },
    { value: "2", label: "II" },
    { value: "3", label: "III" },
    { value: "4", label: "IV" },
    { value: "5", label: "V" },
    { value: "6", label: "VI" },
    { value: "7", label: "VII" },
    { value: "8", label: "VIII" },
    { value: "9", label: "IX" },
    { value: "10", label: "X" },
    { value: "11", label: "XI" },
    { value: "12", label: "XII" },
  ];

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
          ? "Health Care Created Successfully!"
          : "Health Care Updated Successfully!",
      icon: "success",
      timer: 2000, // Auto-close after 2 seconds
      showConfirmButton: false,
    }).then(() => {
      navigate("/healthCare/database"); // Navigate to the previous page
    });
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const selected = selectedData.find((item) => item.value === selectedValue);
    setSelectedItem(selected ? selected.items : null); // Store the selected item
  };

  const updateHealth = (values) => {
    setLoading(true);

    axios
      .post(
        type === "add"
          ? "https://www.santhoshavidhyalaya.com/SVSTEST/api/healthcare/add"
          : `https://www.santhoshavidhyalaya.com/SVSTEST/api/healthcare/edit/${id}`,
        {
          studentId: selectedItem?.id ?? data?.student_id,
          class: values.class,
          treatmentType: values.treatment_type,
          natureOfSkiness: values.nature_of_sickness,
          contact_no: values.contact_no,
          father_name: values.father_name,
          mother_name: values.mother_name,
          toDate: values.to_date,
          fromDate: values.from_date,
        }
      )
      .then((res) => {
        successMessage();
        // Optionally handle success, such as navigating to another page or showing a success message
      })
      .catch((error) => {
        alert("Error updating Health Care:", error);
        // Optionally handle error, such as showing an error message
      });
  };

  const getStandardDetails = (value) => {
    axios
      .get(
        `https://www.santhoshavidhyalaya.com/SVSTEST/api/get-admissionddstudents/${value}`
      )
      .then((res) => {
        const data = res?.data?.standards || [];
        const options = data.map((item) => ({
          value: item.STUDENT_NAME, // or any unique value
          label: item.STUDENT_NAME, // Combine rollNo and studentName
          items: item,
        }));
        setSelectedData(options);
      });
  };

  const getStudentHelathData = () => {
    setLoading(true);
    axios
      .get(
        `https://www.santhoshavidhyalaya.com/SVSTEST/api/healthcare/view/${id}`
      )
      .then((res) => {
        const data = res?.data?.healthcare_record;
        setData(data);
        getStandardDetails(data?.class);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (type === "edit") {
      getStudentHelathData();
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
                <h1 className="title-txt">Health Care Database</h1>
              </div>

              <Formik
                enableReinitialize={true}
                initialValues={{
                  class: data?.class ?? "",
                  student_name:
                    selectedItem?.STUDENT_NAME ?? data?.studentName ?? "",
                  admission_no:
                    selectedItem?.admission_no ?? data?.admissionNo ?? "",
                  contact_no:
                    selectedItem?.MOBILE_NUMBER ?? data?.contactNo ?? "",
                  father_name: selectedItem?.FATHER ?? data?.fatherName ?? "",
                  mother_name: selectedItem?.MOTHER ?? data?.motherName ?? "",
                  from_date: data?.from_date ?? "",
                  to_date: data?.to_date ?? "",
                  treatment_type:
                    selectedItem?.treatment_type ?? data?.treatment_type ?? "",
                  nature_of_sickness:
                    selectedItem?.nature_of_sickness ??
                    data?.nature_of_sickness ??
                    "",
                }}
                onSubmit={(values) => {
                  updateHealth(values);
                }}
                validationSchema={handleHealthCareValidation}
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
                              Health Care Details
                            </h3>
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Select Standard{" "}
                              <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Select
                                name="class"
                                className="form-ctrl-style dropdown-font-style"
                                value={values.class}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                  const selectedValue = e.target.value;

                                  handleChange(e);
                                  if (selectedValue) {
                                    getStandardDetails(selectedValue);
                                    setData((prevData) => ({
                                      ...prevData,
                                      student_name: "",
                                      admission_no: "",
                                      contact_no: "",
                                      father_name: "",
                                      mother_name: "",
                                      from_date: "",
                                      to_date: "",
                                      treatment_type: "",
                                      nature_of_sickness: "",
                                    }));
                                    setSelectedItem([]);
                                  } else {
                                    setSelectedData([]);
                                    // Reset all fields except class
                                    setData([]);
                                    setSelectedItem([]);
                                  }
                                }} // Custom onChange to handle id
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
                            <CustomErrorMessage name={"class"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Student Name
                              {values.class && <span className="text-danger"> *</span>}
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Select
                                disabled={!values.class}
                                name="student_name"
                                className="form-ctrl-style dropdown-font-style"
                                value={values.student_name}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                  handleChange(e);
                                  handleSelectChange(e); // Call to capture selected item
                                  setData((prevData) => ({
                                    ...prevData,
                                    class: values.class,
                                  }));
                                }}
                              >
                                <option value="">Select Student</option>
                                {selectedData?.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                            <CustomErrorMessage name={"student_name"} />
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Admission No
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                disabled={true}
                                name="admission_no"
                                className="form-ctrl-style"
                                placeholder="Admission No"
                                type="text"
                                value={values.admission_no}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Contact No
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                disabled={true}
                                name="contact_no"
                                className="form-ctrl-style"
                                placeholder="Contact No"
                                type="text"
                                value={values.contact_no}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Father Name
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                disabled={true}
                                name="father_name"
                                className="form-ctrl-style"
                                placeholder="Father Name"
                                type="text"
                                value={values.father_name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Mother Name
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                disabled={true}
                                name="mother_name"
                                className="form-ctrl-style"
                                placeholder="Mother Name"
                                type="text"
                                value={values.mother_name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              From Date {values.class && <span className="text-danger"> *</span>}
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                disabled={!values.class}
                                name="from_date"
                                className="form-ctrl-style text-black"
                                placeholder="Enter From Date"
                                type="date" // Use date input type for DOB
                                value={values.from_date}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"from_date"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              To Date {values.class && <span className="text-danger"> *</span>}
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                disabled={!values.class}
                                name="to_date"
                                className="form-ctrl-style text-black"
                                placeholder="Enter To Date"
                                type="date" // Use date input type for DOB
                                value={values.to_date}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"to_date"} />
                          </Col>
                        </Row>

                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Treatment Type{" "}
                              {values.class && <span className="text-danger"> *</span>}
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Select
                                disabled={!values.class}
                                name="treatment_type"
                                className="form-ctrl-style dropdown-font-style"
                                value={values.treatment_type}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              >
                                <option value="">Select Treatment Type</option>
                                <option value="Self">Self</option>
                                <option value="OP">OP</option>
                                <option value="IP">IP</option>
                               
                              </Form.Select>
                            <CustomErrorMessage name={"treatment_type"} />
                          </Col>

                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Nature of Sickness{" "}
                              {values.class && <span className="text-danger"> *</span>}
                            </Form.Label>
                          </Col>

                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Control
                                disabled={!values.class}
                                name="nature_of_sickness"
                                className="form-ctrl-style"
                                placeholder="Enter Nature of Sickness"
                                type="text"
                                value={values.nature_of_sickness}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <CustomErrorMessage name={"nature_of_sickness"} />
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
    </div>
  );
}
