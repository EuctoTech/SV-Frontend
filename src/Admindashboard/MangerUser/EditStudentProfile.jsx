import React from "react";
import "../../Admindashboard/MangerUser/EditStudentProfile.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Formik } from "formik";

export default function EditStudentProfile() {
  const updateValues = (values) => {
    console.log("values", values);
  };
  return (
    <div className="main-content">
      <Container className="container shadow-sm">
        <div className="title-col-txt">
          <h1 className="title-txt">Student Profile</h1>
        </div>

        <Formik
          initialValues={{
            admissionNo: "",
            rollNo: "",
            studentName: "",
            status: "",
            motherTongue: "",
            state: "",
            dob: "",
            gender: "",
            bloodGroup: "",
            nationality: "",
          }}
          onSubmit={(values) => updateValues(values)}
        >
          {(formik) => {
            const { handleSubmit, values, error, handleBlur, handleChange } =
              formik;
            return (
              <div>
                <Form onSubmit={handleSubmit}>
                  <Row className="py-3">
                    <Col xs={12} md={4} className="student-title p-0">
                      <h5 className="title-txt text-black">STUDENT DETAILS</h5>
                    </Col>
                    <hr />
                  </Row>
                  <Row className="row-style">
                    <Col xs={12} md={2} className="label-col-style">
                      <Form.Label className="label-style">
                        Admission No
                      </Form.Label>
                    </Col>

                    <Col xs={12} md={4} className="mb-4">
                      <Form.Group>
                        <Form.Control
                          name="admissionNo"
                          className="form-ctrl-style"
                          placeholder="Enter Admission No"
                          type="text"
                          value={values.admissionNo}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={2} className="label-col-style">
                      <Form.Label className="label-style">Roll No</Form.Label>
                    </Col>

                    <Col xs={12} md={4} className="mb-4">
                      <Form.Group>
                        <Form.Control
                          name="rollNo"
                          className="form-ctrl-style"
                          placeholder="Enter Roll No"
                          type="text"
                          value={values.rollNo}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="row-style">
                    <Col xs={12} md={2} className="label-col-style">
                      <Form.Label className="label-style">
                        Student Name
                      </Form.Label>
                    </Col>

                    <Col xs={12} md={4} className="mb-4">
                      <Form.Group>
                        <Form.Control
                          name="studentName"
                          className="form-ctrl-style"
                          placeholder="Enter Student Name"
                          type="text"
                          value={values.studentName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={2} className="label-col-style">
                      <Form.Label className="label-style">Status</Form.Label>
                    </Col>

                    <Col xs={12} md={4} className="mb-4">
                      <Form.Group>
                        <Form.Control
                          name="status"
                          className="form-ctrl-style"
                          placeholder="Status"
                          type="text"
                          value={values.status}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                 <Row className="row-style">
                    <Col xs={12} md={2} className="label-col-style">
                      <Form.Label className="label-style">
                        Mother tongue of the pupil
                      </Form.Label>
                    </Col>

                    <Col xs={12} md={4} className="mb-4">
                      <Form.Group>
                        <Form.Control
                          name="motherTongue"
                          className="form-ctrl-style"
                          placeholder="Enter Student Name"
                          type="text"
                          value={values.motherTongue}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={2} className="label-col-style">
                      <Form.Label className="label-style">State</Form.Label>
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
                    </Col>
                  </Row>

                 <Row className="row-style">
                    <Col xs={12} md={2} className="label-col-style">
                      <Form.Label className="label-style">
                        Date of Birth
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
                    </Col>

                    <Col xs={12} md={2} className="label-col-style">
                      <Form.Label className="label-style">Gender</Form.Label>
                    </Col>
                    <Col
                      xs={12}
                      md={4}
                      className="mb-4 d-flex align-items-center"
                    >
                      <Form.Group className="d-flex">
                        <Form.Check
                          className="label-style"
                          type="radio"
                          label="Male"
                          name="gender"
                          value="male"
                          checked={values.gender === "male"}
                          onChange={handleChange}
                        />
                        <Form.Check
                          className="label-style mx-4"
                          type="radio"
                          label="Female"
                          name="gender"
                          value="female"
                          checked={values.gender === "female"}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                 <Row className="row-style">
                    <Col xs={12} md={2} className="label-col-style">
                      <Form.Label className="label-style">
                        Blood Group
                      </Form.Label>
                    </Col>
                    <Col xs={12} md={4} className="mb-4">
                      <Form.Group>
                        <Form.Select
                          name="bloodGroup"
                          className="form-ctrl-style dropdown-font-style"
                          value={values.bloodGroup}
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
                    </Col>

                    <Col xs={12} md={2} className="label-col-style">
                      <Form.Label className="label-style">
                        Nationality
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
                    </Col>
                  </Row>
                </Form>
              </div>
            );
          }}
        </Formik>
      </Container>
    </div>
  );
}
