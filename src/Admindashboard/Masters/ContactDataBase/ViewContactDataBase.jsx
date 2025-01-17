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

export default function ViewContactDataBase() {
  const [data, setData] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const location = useLocation();

  const { id } = location.state || {};

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Contact Details",
    // onAfterPrint:()=> Swal.fire({
    //   position: 'center',
    //   icon: 'success',
    //   title: 'File Download Successfully',
    //   showConfirmButton: false,
    //   timer: 1700
    // })
  });

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

  const getStudentHelathData = () => {
    setLoading(true);
    axios
      .get(`https://www.santhoshavidhyalaya.com/SVSTEST/api/contact/view/${id}`)
      .then((res) => {
        const data = res?.data?.contact;
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
                  <h1 className="title-txt">Contact Details</h1>
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

                  <CustomInputs label={"Id"} value={data?.id} />

                  <CustomInputs label={"Name"} value={data?.name} />

                  <CustomInputs label={"Email Id"} value={data?.email} />

                  <CustomInputs label={"Mobile No"} value={data?.mobileNo} />

                  <CustomInputs
                    label={"Address Line 1"}
                    value={data?.addressLine1}
                  />

                  <CustomInputs
                    label={"Address Line 2"}
                    value={data?.addressLine2}
                  />

                  <CustomInputs label={"City"} value={data?.city} />

                  <CustomInputs label={"State"} value={data?.state} />

                  <CustomInputs
                    label={"Country"}
                    value={data?.countryCode}
                  />

                  <CustomInputs label={"Pincode"} value={data?.pincode} />

                  <CustomInputs
                    label={"Contact Type"}
                    value={data?.contactType}
                  />
                </Container>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
