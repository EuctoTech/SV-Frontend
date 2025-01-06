import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AiFillPrinter } from "react-icons/ai";
import { Spin } from "antd";
import { useReactToPrint } from "react-to-print";
import Img from "../../../images/newlogo.jpg";
import NoImg from "../../MangerUser/avatarStudent.svg";

export default function ViewStaffDetails() {
  const [data, setData] = useState([]);
  console.log("data", data);
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();

  const { id } = location.state || {};

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

  const getStaffData = () => {
    axios
      .get(`https://www.santhoshavidhyalaya.com/SVSTEST/api/staff/view/${id}`)
      .then((res) => {
        const data = res?.data?.staff;
        setData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getStaffData();
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
                <Button className='px-4' onClick={handlePrint} variant="primary">
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
                          <Col className="staff-label">Staff Id</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.staffId}</Col>
                      </Row>
                      <Row className="py-4 pb-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Name</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.staffName}</Col>
                      </Row>
                    </Col>
                    <Col className="d-flex p-0" xs={3}>
                      <img
                        src={data?.staff_photo ?? NoImg}
                        height={120}
                        width={120}
                        alt="No profile"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Email</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.email}</Col>
                      </Row>
                      <Row className="py-4 pb-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Mobile Number</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.mobileNo}</Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Designation</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">{data?.designation}</Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Date of Joining</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.date_of_joining}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <hr />

                  <Row className="px-2 py-3">
                    <h2>Permanent Address</h2>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Address Line 1</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.permanentAddress?.addressLine1}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Address Line 2</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.permanentAddress?.addressLine2}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">City</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.permanentAddress?.city}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">State</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.permanentAddress?.state}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Country</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.permanentAddress?.country}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Pincode</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.permanentAddress?.pincode}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <hr />

                  <Row className="px-2 py-3">
                    <h2>Communication Address</h2>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Address Line 1</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.communicationAddress?.addressLine1}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Address Line 2</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.communicationAddress?.addressLine2}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">City</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.communicationAddress?.city}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">State</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.communicationAddress?.state}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Country</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.communicationAddress?.country}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Pincode</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.communicationAddress?.pincode}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Spouse Name</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.communicationAddress?.spouseName ?? "-"}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">
                            Spouse Mobile Number
                          </Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.communicationAddress?.spouseMobileNo ?? "-"}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Spouse Email</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.communicationAddress?.spouseMail ?? "-"}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={9}>
                      <Row className="py-4 pt-0">
                        <Col className="d-flex ">
                          <Col className="staff-label">Spouse Working</Col>
                          <Col className="staff-label">:</Col>
                        </Col>
                        <Col className="staff-value">
                          {data?.communicationAddress?.spouseWorking ?? "-"}
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
