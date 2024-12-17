import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Footer from "../Footer";
import { MdSchool } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Paper from "@mui/material/Paper";
import DatatableSprofile from "./DatatableSprofile";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const StudentUser = () => {
  return (
    <div>
      <Sidebar />
      <div style={{ width: "82.5%", float: "right" }}>
        <Header />
        <section className="p-4">
          <h4>
            <MdSchool className="pb-1 pe-2" size={35} />
            Student Profile
          </h4>
          <hr className="settingHr" />

          <div className="py-1">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "10px",
              }}
            >
              <div className="">
                <h4 className="pb-0 m-0">Student Bio-Data</h4>
              </div>
              <div className="">
                {/* <button  style={{width:'25%'}} className='button-42 ' role='button'>Add user</button> */}
                <a href="/svsportaladmintest/MangerUser/Bulkupload">
                  <Button style={{ backgroundColor: "#FE8C00" }}>
                    <AiOutlineCloudUpload className="pe-2" size={30} />
                    Bulk Upload
                  </Button>
                </a>{" "}
              </div>
            </div>

            <DatatableSprofile />
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentUser;
