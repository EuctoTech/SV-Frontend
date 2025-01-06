import React, { useState } from "react";
import "./dashboard.css";
import logo from "../Assets/logo.jpeg";
import { FaPeopleCarry } from "react-icons/fa";
import { AiFillSetting, AiOutlineDashboard } from "react-icons/ai";
import { BiChevronDown, BiSitemap } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { GiNailedHead, GiTakeMyMoney } from "react-icons/gi";
import { AiOutlineMenu } from "react-icons/ai";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { SiGoogletagmanager } from "react-icons/si";
import { CgCalendarDue, CgTemplate } from "react-icons/cg";
import { CgEditBlackPoint, CgPaypal } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { MdOutlinePayments } from "react-icons/md";

import newLogo from "../images/newlogo.jpg";
import { useNavigate } from "react-router-dom";

const userId = sessionStorage.getItem("token_id");
const accessToken = sessionStorage.getItem("accessToken");

const handleLogout = async () => {
  try {
    const payload = {
      id: userId,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.post(
      "https://www.santhoshavidhyalaya.com/SVSTEST/api/logout",
      payload,
      config
    );

    // const response = await axios.post('http://127.0.0.1:8000/api/logout', payload, config);
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("token_id");

    // setIsLoggedIn(false);

    // Store the response data in session storage
    console.log("logout");
    window.location.href = "/svsportaladmintest/";
  } catch (error) {
    console.error(error);
  }
};

const Test = () => {
  const navigate = useNavigate();

  const notify = () => toast.error("Toggle will not close !");
  return (
    <div>
      <div className="sidebar">
        {" "}
        <div className="damDiv">
          <div className="row">
            <div
              style={{ backgroundColor: "#192F59", borderRight: "1px solid" }}
              className="col-auto col-sm-12  d-flex flex-column justify-content-between min-vh-100 p-0"
            >
              <div className="" style={{}}>
                <p
                  className="bg-white text-center p-1"
                  style={{ width: "100%", margin: "40px ,14px" }}
                >
                  <img
                    style={{
                      width: "45%",
                      margin: "0px 0px",
                      borderRadius: "50%", // Makes the image round
                      border: "4px solid white", // Adds a white border around the image
                      boxShadow: "0px 4px 7px rgba(0, 0, 0, 0.5)", // Adds a soft shadow
                      objectFit: "cover", // Ensures the image fills the round container correctly
                    }}
                    src={newLogo}
                    alt="logo"
                  />
                  {/* <AiOutlineMenu onClick={notify} className='navmenuside'/> */}
                </p>

                <div className="damIt">
                  <div>
                    <ul
                      class="nav nav-pills flex-column mt-2 mt-sm-0"
                      id="parentM"
                    >
                      {/*-------------------- DASHBOARD -----------------------------------------------*/}
                      <li class="nav-item my-1 py-2 py-sm-0">
                        <a
                          href="/svsportaladmintest/dashboard "
                          className="nav-link text-white text-center text-sm-start menuText"
                          aria-current="page"
                        >
                          <AiOutlineDashboard size={25} />
                          <span
                            style={{ fontSize: "20px" }}
                            className="ms-2 d-none d-sm-inline menuSpanText"
                          >
                            Dashboard
                          </span>
                        </a>
                      </li>
                      {/*-------------------- Management User -----------------------------------------------*/}
                      <li class="nav-item my-1 py-2 py-sm-0">
                        <a
                          href="#submenu"
                          class="nav-link text-white text-center text-sm-start menuText"
                          data-bs-toggle="collapse"
                          aria-current="page"
                        >
                          <SiGoogletagmanager size={25} />
                          <span
                            style={{ fontSize: "20px" }}
                            className="ms-2 d-none d-sm-inline"
                          >
                            Manage user
                          </span>
                          <BiChevronDown
                            size={25}
                            className="ms-0 ms-sm-3 d-none d-sm-inline"
                            style={{ float: "right" }}
                          />
                        </a>

                        <ul
                          class="nav collapse ms-1"
                          id="submenu"
                          data-bs-parent="parentM"
                        >
                          <li class="nav-item" style={{ marginLeft: "30px" }}>
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/MangerUser/User"
                              aria-current="page"
                            >
                              <CgEditBlackPoint className="pe-1 pt-1" />
                              <span className="d-none d-sm-inline menuSpanText">
                                User
                              </span>
                            </a>
                          </li>
                          {/* <li class="nav-item" style={{marginLeft:'30px'}}>
                            <a class="nav-link text-white" href="/svsportaladmintest/MangerUser/Role" aria-current="page" ><CgEditBlackPoint className='pe-1 pt-1'/><span className='d-none d-sm-inline menuSpanText'>Role</span></a>
                        </li> */}
                          <li class="nav-item" style={{ marginLeft: "30px" }}>
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/MangerUser/StudentUser"
                              aria-current="page"
                            >
                              <CgEditBlackPoint className="pe-1 pt-1" />
                              <span className="d-none d-sm-inline menuSpanText">
                                Student user
                              </span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      {/*-------------------- MASTERS -----------------------------------------------*/}
                      <li class="nav-item my-1 py-2 py-sm-0">
                        <a
                          href="#submenu1"
                          class="nav-link text-white text-center text-sm-start menuText"
                          data-bs-toggle="collapse"
                          aria-current="page"
                        >
                          <GiNailedHead size={29} />
                          <span
                            style={{ fontSize: "20px" }}
                            className="ms-2 d-none d-sm-inline"
                          >
                            Masters
                          </span>
                          <BiChevronDown
                            size={25}
                            className="ms-0 ms-sm-3 d-none d-sm-inline"
                            style={{ float: "right" }}
                          />
                        </a>
                        <ul
                          class="nav collapse ms-1"
                          id="submenu1"
                          data-bs-parent="parentM"
                        >
                          {/* <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmintest/Masters/AddStudentlist" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Add student</span></a>
                        </li> */}
                          <li style={{ marginLeft: "30px" }} class="nav-item">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/Masters/UploadPic"
                              aria-current="page"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline">
                                Upload Photo
                              </span>
                            </a>
                          </li>
                          <li style={{ marginLeft: "30px" }} class="nav-item ">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/Masters/Mfees"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline">
                                Fees Category
                              </span>
                            </a>
                          </li>
                          <li style={{ marginLeft: "30px" }} class="nav-item ">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/Masters/DiscountMaster"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline">
                                Discounts Master
                              </span>
                            </a>
                          </li>
                          <li style={{ marginLeft: "30px" }} class="nav-item ">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/Masters/AddSponsorlist"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline">
                                Sponsor
                              </span>
                            </a>
                          </li>
                          {/* <li style={{marginLeft:'30px'}} class="nav-item ">
                            <a class="nav-link text-white" href="/svsportaladmintest/Masters/SectionMaster"><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Section</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}} class="nav-item ">
                            <a class="nav-link text-white" href="/svsportaladmintest/Masters/ClassMaster"><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Class</span></a>
                        </li> */}
                          {/* <li style={{marginLeft:'30px'}} class="nav-item ">
                            <a class="nav-link text-white" href="/svsportaladmintest/Masters/GroupMaster"><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Group</span></a>
                        </li> */}
                          <li style={{ marginLeft: "30px" }} class="nav-item ">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/Masters/ModeofpaymentMaster"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline">
                                Mode of payment
                              </span>
                            </a>
                          </li>
                          <li
                            style={{ marginLeft: "30px" }}
                            class="nav-item pointer"
                            onClick={() => navigate("/staff/database")}
                          >
                            <a class="nav-link text-white">
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline">
                                Staff Database
                              </span>
                            </a>
                          </li>
                          <li
                            style={{ marginLeft: "30px" }}
                            class="nav-item pointer"
                            onClick={() => navigate("/healthCare/database")}
                          >
                            <a class="nav-link text-white">
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline">
                                Health Care Database
                              </span>
                            </a>
                          </li>
                        </ul>
                      </li>

                      {/*-------------------- STUDENT FEES -----------------------------------------------*/}
                      {/* <li class="nav-item my-1 py-2 py-sm-0">
                    <a href="#submenu2" class="nav-link text-white text-center text-sm-start menuText" data-bs-toggle = "collapse" aria-current="page">
                      <GiTakeMyMoney size={29}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline'>Student Fees</span>
                      <BiChevronDown size={25} className='ms-0 ms-sm-3 d-none d-sm-inline' style={{float:'right'}}/>
                    </a>

                    <ul class="nav collapse ms-1" id='submenu2' data-bs-parent = "parentM">
                        <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="#student_profile" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>Tuition Fees</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="#student_profile" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>Bus Fees</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}} class="nav-item ">
                            <a class="nav-link text-white" href="#SponserProfile"><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Hostal Fees</span></a>
                        </li>
                    </ul>
                  </li> */}

                      {/*-------------------- Mapping System -----------------------------------------------*/}
                      <li class="nav-item my-1 py-2 py-sm-0">
                        <a
                          href="#submenu4"
                          class="nav-link text-white text-center text-sm-start menuText"
                          data-bs-toggle="collapse"
                          aria-current="page"
                        >
                          <BiSitemap size={29} />
                          <span
                            style={{ fontSize: "20px" }}
                            className="ms-2 d-none d-sm-inline"
                          >
                            Mapping System
                          </span>
                          <BiChevronDown
                            size={25}
                            className="ms-0 ms-sm-3 d-none d-sm-inline"
                            style={{ float: "right" }}
                          />
                        </a>

                        <ul
                          class="nav collapse ms-1"
                          id="submenu4"
                          data-bs-parent="parentM"
                        >
                          <li style={{ marginLeft: "30px" }} class="nav-item">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/MappingStystem/Feesmaping"
                              aria-current="page"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline menuSpanText">
                                Fees Mapping
                              </span>
                            </a>
                          </li>
                          <li style={{ marginLeft: "30px" }} class="nav-item">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/MappingStystem/ViewMapping"
                              aria-current="page"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline menuSpanText">
                                View Mapping
                              </span>
                            </a>
                          </li>
                          <li style={{ marginLeft: "30px" }} class="nav-item">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/MappingStystem/Sponsormaping"
                              aria-current="page"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline menuSpanText">
                                Sponsor Mapping
                              </span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      {/*-------------------- Genrate Invoice -----------------------------------------------*/}
                      <li class="nav-item my-1 py-2 py-sm-0">
                        <a
                          href="#submenu3"
                          class="nav-link text-white text-center text-sm-start menuText"
                          data-bs-toggle="collapse"
                          aria-current="page"
                        >
                          <FaFileInvoiceDollar size={25} />
                          <span
                            style={{ fontSize: "20px" }}
                            className="ms-2 d-none d-sm-inline"
                          >
                            Generate Invoice
                          </span>
                          <BiChevronDown
                            size={25}
                            className="ms-0 ms-sm-3 d-none d-sm-inline"
                            style={{ float: "right" }}
                          />
                        </a>

                        <ul
                          class="nav collapse ms-1"
                          id="submenu3"
                          data-bs-parent="parentM"
                        >
                          <li style={{ marginLeft: "30px" }} class="nav-item">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/GeneralInvoice/Discountfees"
                              aria-current="page"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline menuSpanText">
                                Discount fees
                              </span>
                            </a>
                          </li>
                          <li style={{ marginLeft: "30px" }} class="nav-item">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/GeneralInvoice/Createinvoice"
                              aria-current="page"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline menuSpanText">
                                Create Invoice
                              </span>
                            </a>
                          </li>

                          {/* <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmintest/GeneralInvoice/Payfee" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>Pay Fees</span></a>
                        </li> */}
                        </ul>
                      </li>

                      {/*--------------------------------offline payment---------------------------------------------------------*/}
                      <li class="nav-item my-1 py-2 py-sm-0">
                        <a
                          href="#submenu90"
                          class="nav-link text-white text-center text-sm-start menuText"
                          data-bs-toggle="collapse"
                          aria-current="page"
                        >
                          <MdOutlinePayments size={29} />
                          <span
                            style={{ fontSize: "20px" }}
                            className="ms-2 d-none d-sm-inline"
                          >
                            Offline Payment
                          </span>
                          <BiChevronDown
                            size={25}
                            className="ms-0 ms-sm-3 d-none d-sm-inline"
                            style={{ float: "right" }}
                          />
                        </a>

                        <ul
                          class="nav collapse ms-1"
                          id="submenu90"
                          data-bs-parent="parentM"
                        >
                          <li style={{ marginLeft: "30px" }} class="nav-item">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/GeneralInvoice/InvoiceTable"
                              aria-current="page"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline menuSpanText">
                                Invoice Table
                              </span>
                            </a>
                          </li>

                          <li style={{ marginLeft: "30px" }} class="nav-item">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/ExcessAmount/ExcessAmountTable"
                              aria-current="page"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline menuSpanText">
                                Excess Amount
                              </span>
                            </a>
                          </li>
                          <li style={{ marginLeft: "30px" }} class="nav-item">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/Admindashboard/SponsorPayment/SponsorBulkpayment"
                              aria-current="page"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline menuSpanText">
                                Sponsor Payment
                              </span>
                            </a>
                          </li>
                          {/* <li class="nav-item text-white my-1 py-2 py-sm-0 ">
                    <a href="/svsportaladmintest/ExcessAmount/ExcessAmountTable" class="nav-link text-white text-center text-sm-start menuText" aria-current="page">
                      <PiMicrosoftExcelLogo className='text-white' size={25}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline menuSpanText'>Excess Amount</span>
                    </a>
               </li> */}
                        </ul>
                      </li>

                      {/*-------------------- Reports-----------------------------------------------*/}
                      <li class="nav-item my-1 py-2 py-sm-0">
                        <a
                          href="#submenu31"
                          class="nav-link text-white text-center text-sm-start menuText"
                          data-bs-toggle="collapse"
                          aria-current="page"
                        >
                          <CgTemplate size={25} />
                          <span
                            style={{ fontSize: "20px" }}
                            className="ms-2 d-none d-sm-inline"
                          >
                            Reports
                          </span>
                          <BiChevronDown
                            size={25}
                            className="ms-0 ms-sm-3 d-none d-sm-inline"
                            style={{ float: "right" }}
                          />
                        </a>

                        <ul
                          class="nav collapse ms-1"
                          id="submenu31"
                          data-bs-parent="parentM"
                        >
                          <li style={{ marginLeft: "30px" }} class="nav-item">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/Admindashboard/Reports/StudentLedger"
                              aria-current="page"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline menuSpanText">
                                Student Ledger
                              </span>
                            </a>
                          </li>
                          {/* <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmintest/Admindashboard/Reports/OrganizationLedger" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>Organization Ledger</span></a>
                        </li> */}
                          <li style={{ marginLeft: "30px" }} class="nav-item ">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/Admindashboard/Reports/LedgerSummary"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline">
                                Ledger Summary
                              </span>
                            </a>
                          </li>
                          {/* <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmintest/Admindashboard/Reports/Payfee" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>Pay Fees</span></a>
                        </li> */}
                          <li style={{ marginLeft: "30px" }} class="nav-item">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/Admindashboard/Reports/MasterReport"
                              aria-current="page"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline menuSpanText">
                                Master Report
                              </span>
                            </a>
                          </li>
                          <li style={{ marginLeft: "30px" }} class="nav-item ">
                            <a
                              class="nav-link text-white"
                              href="/svsportaladmintest/GeneralInvoice/SponsorReport"
                            >
                              <CgEditBlackPoint className="pe-1" />
                              <span className="d-none d-sm-inline">
                                Sponsor report
                              </span>
                            </a>
                          </li>
                        </ul>
                      </li>

                      {/*-------------------- History -----------------------------------------------*/}
                      {/* <li class="nav-item my-1 py-2 py-sm-0">
                    <a href="#submenu5" class="nav-link text-white text-center text-sm-start menuText" data-bs-toggle = "collapse" aria-current="page">
                      <MdManageHistory size={29}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline'>History</span>
                      <BiChevronDown size={25} className='ms-0 ms-sm-3 d-none d-sm-inline' style={{float:'right'}}/>
                    </a>
                    <ul  class="nav collapse ms-1" id='submenu5' data-bs-parent = "parentM">
                        <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmintest/Masters/AddStudentlist" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Fees History</span></a>
                        </li>
                    </ul>
                  </li> */}

                      {/*-------------------- SPONSOR Payment -----------------------------------------------*/}
                      {/* <li class="nav-item text-white my-1 py-2 py-sm-0 ">
                    <a href="/svsportaladmintest/Admindashboard/SponsorPayment/SponsorBulkpayment" class="nav-link text-white text-center text-sm-start menuText" aria-current="page">
                      <FaPeopleCarry className='text-white' size={25}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline menuSpanText'>Sponsor Payment </span>
                    </a>
                  </li>  */}
                      {/*-------------------- No due Form -----------------------------------------------*/}
                      <li class="nav-item text-white my-1 py-2 py-sm-0 ">
                        <a
                          href="/svsportaladmintest/Admindashboard/NoDueForm/NodueTable"
                          class="nav-link text-white text-center text-sm-start menuText"
                          aria-current="page"
                        >
                          <CgCalendarDue className="text-white" size={25} />
                          <span
                            style={{ fontSize: "20px" }}
                            className="ms-2 d-none d-sm-inline menuSpanText"
                          >
                            No Due Form
                          </span>
                        </a>
                      </li>
                      {/*-------------------- No due Form -----------------------------------------------*/}

                      {/*-------------------- SETTING-----------------------------------------------*/}
                      <li class="nav-item text-white my-1 py-2 py-sm-0 ">
                        <a
                          href="/svsportaladmintest/Setting"
                          class="nav-link text-white text-center text-sm-start menuText"
                          aria-current="page"
                        >
                          <AiFillSetting className="text-white" size={25} />
                          <span
                            style={{ fontSize: "20px" }}
                            className="ms-2 d-none d-sm-inline menuSpanText"
                          >
                            Setting
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/*----------------- Login ----------------------------*/}
              </div>

              {/* LOGOUT SECTION */}
              {/* <div>
            <hr className='text-white'/>
                <div className='pb-2 ps-4 ' >
                  <a class="dropdown-item" href="#"><h6 className='text-danger ' style={{fontSize:'20px'}}><FiLogOut size={30} className='pe-2'/>Logout</h6></a>
                </div>
            </div> */}
              {/* LOGOUT SECTION */}
            </div>
          </div>
        </div>
      </div>
      <div
        className="pb-2 ps-4 "
        style={{
          position: "fixed",
          top: "90%",
          width: "17%",
          background: "#192f59",
          zIndex: "9999",
        }}
      >
        <div>
          <hr className="text-white" />
        </div>
        <h6
          onClick={handleLogout}
          className="text-danger"
          style={{ fontSize: "20px", cursor: "pointer" }}
        >
          <FiLogOut size={30} className="pe-2" />
          Logout
        </h6>
      </div>
    </div>
  );
};

export default Test;
