import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Access/Login";
import Dashboard from "./Admindashboard/Dashboard";
import Reminders from "./Admindashboard/Reminders";
import Test from "./Admindashboard/Test";
import User from "./Admindashboard/MangerUser/User";
import EditUser from "./Admindashboard/MangerUser/EditUser";
import StudentUser from "./Admindashboard/MangerUser/StudentUser";
import Mfees from "./Admindashboard/Masters/Mfees";
import Setting from "./Admindashboard/Setting";
import Profile from "./Admindashboard/StudentProfile/Profile";
import Viewprofile from "./Admindashboard/MangerUser/Viewprofile";
import Bulkupload from "./Admindashboard/MangerUser/Bulkupload";
import AddSponsoruser from "./Admindashboard/MappingStystem/AddSponsoruser";
import Sponsormaping from "./Admindashboard/MappingStystem/Sponsormaping";
import Feesmaping from "./Admindashboard/MappingStystem/Feesmaping";
import ViewMapping from "./Admindashboard/MappingStystem/ViewMapping";
import Role from "./Admindashboard/MangerUser/Role";
import Msponsor from "./Admindashboard/Masters/Msponsor";
import AddSponsorlist from "./Admindashboard/Masters/AddSponsorlist";
import AddStudent from "./Admindashboard/Masters/AddStudent";
import AddStudentlist from "./Admindashboard/Masters/AddStudentlist";
import StudentInvoice from "./Admindashboard/GeneralInvoice/StudentInvoice";
import Discountfees from "./Admindashboard/GeneralInvoice/Discountfees";
import InvoiceTable from "./Admindashboard/GeneralInvoice/InvoiceTable";
import CreateInvoiceList from "./Admindashboard/GeneralInvoice/CreateInvoiceList";
import Createinvoice from "./Admindashboard/GeneralInvoice/Createinvoice";
import Viewstudentdata from "./Admindashboard/Masters/Viewstudentdata";
import GroupMaster from "./Admindashboard/Masters/GroupMaster";
import ClassMaster from "./Admindashboard/Masters/ClassMaster";
import SectionMaster from "./Admindashboard/Masters/SectionMaster";
import ModeofpaymentMaster from "./Admindashboard/Masters/ModeofpaymentMaster";
import Payfee from "./Admindashboard/GeneralInvoice/Payfee";
import ErrorPage from "./Admindashboard/ErrorPage";
import Main from "./Admindashboard/Main";
import UploadPic from "./Admindashboard/Masters/UploadPic";
import DiscountMaster from "./Admindashboard/Masters/DiscountMaster";

import PaymentReceipt from "./Admindashboard/PaymentReceipt";
import PaymentReceipttwo from "./Admindashboard/PaymentReceipttwo";
import SponsorBulkpayment from "./Admindashboard/SponsorPayment/SponsorBulkpayment";
import HostelFeeMap from "./Admindashboard/Hostel/HostelFeeMap";
import HotelChangePass from "./Admindashboard/Hostel/HotelChangePass";
import NodueTable from "./Admindashboard/NoDueForm/NodueTable";
import NodueForm from "./Admindashboard/NoDueForm/NodueForm";
import ExcessAmountTable from "./Admindashboard/ExcessAmount/ExcessAmountTable";
import LogoutComponent from "./Access/LogoutComponent"; // Import the LogoutComponent

import LedgerSummary from "./Admindashboard/Reports/LedgerSummary";
import MasterReport from "./Admindashboard/Reports/MasterReport";
import OrganizationLedger from "./Admindashboard/Reports/OrganizationLedger";
import StudentLedger from "./Admindashboard/Reports/StudentLedger";

import SponsorReport from "./Admindashboard/GeneralInvoice/SponsorReport";
import Stu_Spo_Dashboard from "./StudentAndSponsor/pages/Stu_Spo_Dashboard";
import Stu_Spo_Payfees from "./StudentAndSponsor/pages/Stu_Spo_Payfees";
import Stu_Spo_Allinvoices from "./StudentAndSponsor/pages/Stu_Spo_Allinvoices";
import Stu_Spo_PaymentReceipt from "./StudentAndSponsor/pages/Stu_Spo_PaymentReceipt";
import Stu_Spo_StudentInvoice from "./StudentAndSponsor/pages/Stu_Spo_StudentInvoice";
import Myprofile from "./StudentAndSponsor/pages/Myprofile";
import Stu_Spo_Report from "./StudentAndSponsor/pages/Stu_Spo_Report";
import Allreceipts from "./StudentAndSponsor/pages/Allreceipts";
import EditStudentProfile from "./Admindashboard/MangerUser/EditStudentProfile";

export default function RoutesScreen() {
  const user_type = sessionStorage.getItem("user_type");
  return (
    <div>
      {/* {user_type === "admin" ? ( */}
        <Router basename="/svsportaladmintest">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/LoginAdmin" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/MangerUser/User" element={<User />} />
            <Route path="/MangerUser/StudentUser" element={<StudentUser />} />
            <Route path="/StudentProfile/Profile" element={<Profile />} />
            <Route path="/MangerUser/Bulkupload" element={<Bulkupload />} />
            <Route path="/Masters/Mfees" element={<Mfees />} />
            <Route path="/Setting" element={<Setting />} />
            <Route path="/MangerUser/EditUser" element={<EditUser />} />
            <Route path="/MangerUser/Viewprofile" element={<Viewprofile />} />
            <Route
              path="/MappingStystem/AddSponsoruser"
              element={<AddSponsoruser />}
            />
            <Route
              path="/MappingStystem/Sponsormaping"
              element={<Sponsormaping />}
            />
            <Route
              path="/MappingStystem/ViewMapping"
              element={<ViewMapping />}
            />
            <Route path="/MappingStystem/Feesmaping" element={<Feesmaping />} />
            <Route path="/MangerUser/Role" element={<Role />} />
            <Route path="/Masters/Msponsor" element={<Msponsor />} />
            <Route
              path="/Masters/AddSponsorlist"
              element={<AddSponsorlist />}
            />
            <Route
              path="/Masters/Viewstudentdata"
              element={<Viewstudentdata />}
            />
            <Route path="/Masters/AddStudent" element={<AddStudent />} />
            <Route
              path="/Masters/AddStudentlist"
              element={<AddStudentlist />}
            />
            <Route path="/Masters/GroupMaster" element={<GroupMaster />} />
            <Route path="/Masters/ClassMaster" element={<ClassMaster />} />
            <Route path="/Masters/SectionMaster" element={<SectionMaster />} />
            <Route
              path="/Masters/DiscountMaster"
              element={<DiscountMaster />}
            />
            <Route
              path="/Masters/ModeofpaymentMaster"
              element={<ModeofpaymentMaster />}
            />
            <Route
              path="/Admindashboard/SponsorPayment/SponsorBulkpayment"
              element={<SponsorBulkpayment />}
            />
            <Route path="/Test" element={<Test />} />
            <Route
              path="/GeneralInvoice/StudentInvoice/:invoiceNo"
              element={<StudentInvoice />}
            />
            <Route
              path="/GeneralInvoice/Discountfees"
              element={<Discountfees />}
            />
            <Route
              path="/GeneralInvoice/CreateInvoiceList"
              element={<CreateInvoiceList />}
            />
            <Route
              path="/GeneralInvoice/Createinvoice"
              element={<Createinvoice />}
            />
            <Route
              path="/GeneralInvoice/InvoiceTable"
              element={<InvoiceTable />}
            />
            <Route path="/GeneralInvoice/Payfee" element={<Payfee />} />
            <Route
              path="/GeneralInvoice/SponsorReport"
              element={<SponsorReport />}
            />
            <Route path="/Masters/UploadPic" element={<UploadPic />} />
            <Route
              path="/ExcessAmount/ExcessAmountTable"
              element={<ExcessAmountTable />}
            />
            {/*Reports*/}

            <Route
              path="/Admindashboard/Reports/StudentLedger"
              element={<StudentLedger />}
            />
            <Route
              path="/Admindashboard/Reports/MasterReport"
              element={<MasterReport />}
            />
            <Route
              path="/Admindashboard/Reports/OrganizationLedger"
              element={<OrganizationLedger />}
            />
            <Route
              path="/Admindashboard/Reports/LedgerSummary"
              element={<LedgerSummary />}
            />
            {/* Hotel Fee Map */}
            <Route
              path="/Admindashboard/Hostel/HostelFeeMap"
              element={<HostelFeeMap />}
            />
            <Route
              path="/Admindashboard/Hostel/HotelChangePass"
              element={<HotelChangePass />}
            />
            <Route
              path="/Admindashboard/NoDueForm/NodueTable"
              element={<NodueTable />}
            />
            <Route
              path="/Admindashboard/NoDueForm/NodueForm/:id"
              element={<NodueForm />}
            />
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/PaymentReceipt/:paymentTransactionId"
              element={<PaymentReceipt />}
            />
            <Route
              path="/PaymentReceipt12345678912345678/:paymentTransactionId"
              element={<PaymentReceipttwo />}
            />
             <Route
              path="/edit/student/profile"
              element={<EditStudentProfile />}
            />
          </Routes>
          <LogoutComponent /> {/* Add the LogoutComponent here */}
        </Router>
     
    </div>
  );
}
