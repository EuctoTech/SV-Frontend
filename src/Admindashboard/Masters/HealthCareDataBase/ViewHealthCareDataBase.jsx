import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { AiFillPrinter } from "react-icons/ai";
import { Spin } from "antd";
import { Button, Col, Container, Row } from "react-bootstrap";
import Img from "../../../images/newlogo.jpg";
import { useReactToPrint } from "react-to-print";

export default function ViewHealthCareDataBase() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();

  const { id } = location.state || {};

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Health Care Details",
    // onAfterPrint:()=> Swal.fire({
    //   position: 'center',
    //   icon: 'success',
    //   title: 'File Download Successfully',
    //   showConfirmButton: false,
    //   timer: 1700
    // })
  });

  const getStudentHelathData = () => {
    setLoading(true);
    axios
      .get(
        `https://www.santhoshavidhyalaya.com/SVSTEST/api/healthcare/view/${id}`
      )
      .then((res) => {
        const data = res?.data?.healthcare_record;
        setData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getStudentHelathData();
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
                  <h1 className="title-txt">Health Details</h1>
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

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Standard</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.class}</Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Student Name</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.studentName}</Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Admission No</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.admissionNo}</Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Mobile No</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.contactNo}</Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Father Name</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.fatherName}</Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Mother Name</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.motherName}</Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">From Date</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.from_date}</Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">To Date</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.to_date}</Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Treatment Type</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.treatment_type}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Nature of Sickness</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.nature_of_sickness}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                </Container>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
