import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import { Edit, Add } from "@mui/icons-material";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { handleStudentMarkValidation } from "../../../Validators/YupValidators";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import axios from "axios";
import { Spin } from "antd";

export default function StudentMarkList() {
  const [years, setYears] = useState([]);
  const [data, setData] = useState([])
  const [isSubjects, setSubjects] = useState()
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isSelectedValue, setSelectedValue] = useState({ isTerm: "", isAcademicYear: "", isStandard: "", isSection: "", isGroup: "" })
  const [formValues, setFormValues] = useState({
    term: "",
    academicYear: "",
    standard: "",
    section: "",
    group: "",
  });

  // const exportToExcel = () => {
  //     const fileName = `Student_Report_${new Date()
  //       .toLocaleDateString("en-GB")
  //       .replace(/\//g, "-")}.xlsx`;
  //     const ws = XLSX.utils.json_to_sheet([], {
  //       header: [
  //         "Photo",
  //         "Admission No",
  //         "Roll No",
  //         "Student Name",
  //         "DOB",
  //         "EMIS No",
  //         "Mobile No",
  //         "Email ID",
  //         "Address",
  //         "STD",
  //         "Blood Group",
  //         "Guardian No",
  //         "Guardian Name",
  //       ],
  //     });
  //     const wb = XLSX.utils.book_new();

  //     const data = [];

  //     // Fetch student data from the API
  //     fetch("https://www.santhoshavidhyalaya.com/SVSTEST/api/read-student")
  //       .then((response) => response.json())
  //       .then((res) => {
  //         res.data.forEach((student) => {
  //           data.push({
  //             original_id: student.original_id,
  //             roll_no: student.roll_no,
  //             admission_no: student.admission_no,
  //             STUDENT_NAME: student.STUDENT_NAME,
  //             date_form: student.date_form,
  //             MOTHERTONGUE: student.MOTHERTONGUE,
  //             STATE: student.STATE,
  //             DOB_DD_MM_YYYY: student.DOB_DD_MM_YYYY,
  //             SEX: student.SEX,
  //             BLOOD_GROUP: student.BLOOD_GROUP,
  //             NATIONALITY: student.NATIONALITY,
  //             RELIGION: student.RELIGION,
  //             DENOMINATION: student.DENOMINATION,
  //             CASTE: student.CASTE,
  //             CASTE_CLASSIFICATION: student.CASTE_CLASSIFICATION,
  //             AADHAAR_CARD_NO: student.AADHAAR_CARD_NO,
  //             RATIONCARDNO: student.RATIONCARDNO,
  //             EMIS_NO: student.EMIS_NO,
  //             FOOD: student.FOOD,
  //             FATHER: student.FATHER,
  //             OCCUPATION: student.OCCUPATION,
  //             MOTHER: student.MOTHER,
  //             mother_occupation: student.mother_occupation,
  //             GUARDIAN: student.GUARDIAN,
  //             guardian_occupation: student.guardian_occupation,
  //             MOBILE_NUMBER: student.MOBILE_NUMBER,
  //             EMAIL_ID: student.EMAIL_ID,
  //             WHATS_APP_NO: student.WHATS_APP_NO,
  //             mother_email_id: student.mother_email_id,
  //             guardian_contact_no: student.guardian_contact_no,
  //             guardian_email_id: student.guardian_email_id,
  //             MONTHLY_INCOME: student.MONTHLY_INCOME,
  //             mother_income: student.mother_income,
  //             guardian_income: student.guardian_income,
  //             PERMANENT_HOUSENUMBER: student.PERMANENT_HOUSENUMBER,
  //             P_STREETNAME: student.P_STREETNAME,
  //             P_VILLAGE_TOWN_NAME: student.P_VILLAGE_TOWN_NAME,
  //             P_DISTRICT: student.P_DISTRICT,
  //             P_STATE: student.P_STATE,
  //             P_PINCODE: student.P_PINCODE,
  //             COMMUNICATION_HOUSE_NO: student.COMMUNICATION_HOUSE_NO,
  //             C_STREET_NAME: student.C_STREET_NAME,
  //             C_VILLAGE_TOWN_NAME: student.C_VILLAGE_TOWN_NAME,
  //             C_DISTRICT: student.C_DISTRICT,
  //             C_STATE: student.C_STATE,
  //             C_PINCODE: student.C_PINCODE,
  //             CLASS_LAST_STUDIED: student.CLASS_LAST_STUDIED,
  //             NAME_OF_SCHOOL: student.NAME_OF_SCHOOL,
  //             SOUGHT_STD: student.SOUGHT_STD,
  //             sec: student.sec,
  //             syllabus: student.syllabus,
  //             GROUP_12: student.GROUP_12,
  //             second_group_no: student.second_group_no,
  //             LANG_PART_I: student.LANG_PART_I,
  //             brother_1: student.brother_1,
  //             brother_2: student.brother_2,
  //             gender_1: student.gender_1,
  //             gender_2: student.gender_2,
  //             class_1: student.class_1,
  //             class_2: student.class_2,
  //             gender_3: student.gender_3,
  //             class_3: student.class_3,
  //             last_school_state: student.last_school_state,
  //             second_language_school: student.second_language_school,
  //             reference_name_1: student.reference_name_1,
  //             ORGANISATION: student.ORGANISATION,
  //             mother_organization: student.mother_organization,
  //             guardian_organization: student.guardian_organization,
  //             created_at: student.created_at,
  //             updated_at: student.updated_at,
  //           });
  //         });

  //         // Convert to sheet
  //         const ws = XLSX.utils.json_to_sheet(data);
  //         XLSX.utils.book_append_sheet(wb, ws, "Students");
  //         XLSX.writeFile(wb, fileName);
  //       })
  //       .catch((error) => console.error("Error fetching student data:", error));
  //   };

  const standardOptions = [
    { value: "", label: "Select Standard" },
    { value: "LKG", label: "LKG" },
    { value: "UKG", label: "UKG" },
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

  const columns = [
    {
      accessorKey: "name",
      header: "Student",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    // Ensure subjects are placed before total and percentage
    ...(Array.isArray(isSubjects) ? isSubjects.map(({ subject, mark }) => ({
      accessorKey: subject.toLowerCase(),
      header: `${subject} (${mark})`,
      size: 40,
      Cell: ({ row }) => row.original[subject.toLowerCase()] || "-",
    })) : []), 

    ...(isSubjects?.length > 0 ? [ // Wrap inside an array and spread it
      {
        accessorKey: "total",
        header: `Total (${isSubjects.reduce((sum, sub) => sum + parseInt(sub.mark), 0)})`,
        size: 40,
        Cell: ({ row }) => {
          const total = isSubjects.reduce(
            (sum, sub) => sum + (parseInt(row.original[sub.subject.toLowerCase()]) || 0),
            0
          );
          return <h5 className="mb-0">{total}</h5>;
        },
      },
      {
        accessorKey: "percentage",
        header: "Percentage(%)",
        size: 40,
        Cell: ({ row }) => {
          const total = isSubjects.reduce(
            (sum, sub) => sum + (parseInt(row.original[sub.subject.toLowerCase()]) || 0),
            0
          );
          const totalOutOf = isSubjects.reduce((sum, sub) => sum + parseInt(sub.mark), 0);
          const percentage = totalOutOf > 0 ? (total / totalOutOf) * 100 : 0;
          return <h5 className="mb-0">{percentage.toFixed(2)}%</h5>;
        },
      },
    ] : []), // Return an empty array if isSubjects is empty
  ];




  const filterStudent = (values) => {
    setLoading(true)
    axios
      .get(
        [11, 12].includes(values.standard)
          ? `https://www.santhoshavidhyalaya.com/SVSTEST/api/class-subjects/${values.standard}?sec=${values.section}&group_no=${values.group}&term=${values.term}`
          : `https://www.santhoshavidhyalaya.com/SVSTEST/api/class-subjects/${values.standard}?sec=${values.section}&term=${values.term}`
      )
      .then((res) => {
        console.log('subjects', res?.data?.subjects)
        const data = res?.data?.subjects
        setSubjects(data || []);
      }).catch(() => setLoading(false));

    axios.post([11, 12].includes(values.standard)
      ? `https://www.santhoshavidhyalaya.com/SVSTEST/api/StudentMark-view?term=${values.term}&standard=${values.standard}&section=${values.section}&academic_year=${values.academicYear}` :
      `https://www.santhoshavidhyalaya.com/SVSTEST/api/StudentMark-view?term=${values.term}&standard=${values.standard}&section=${values.section}&group_no=${values.group}&academic_year=${values.academicYear}`).then((res) => {
        console.log('data value', res?.data)
        const data = res?.data
        setData(data || [])
        setLoading(false)
      }).catch(() => setLoading(false));
  }

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 19; // 20 years in the past
    const endYear = currentYear + 1; // One year into the future

    const yearRange = Array.from({ length: endYear - startYear }, (_, i) => ({
      label: `${startYear + i} - ${startYear + i + 1}`,
      value: `${startYear + i}-${startYear + i + 1}`,
    })).reverse(); // Reverse the array to get descending order

    setYears(yearRange);
  }, []);

  return (
    <div>
      <Sidebar />
      <div style={{ width: "82.5%", float: "right" }}>
        <Header />
        <section className="p-4">
          <div className="d-flex justify-content-end py-4">
            <Button
              variant="primary"
              onClick={() =>
                navigate("/create/student/marks", {
                  state: {
                    type: "add",
                  },
                })
              }
            >
              Add <Add />
            </Button>
          </div>
          <Container className="edit-container shadow-sm">

            <div className="d-flex justify-content-between align-items-center py-3">
              <div className="flex-grow-1 text-center title-txt">
                <h4 className="pb-0 m-0">Students Mark list </h4>
              </div>
            </div>

            <Formik
              initialValues={formValues} // Set initial values from formValues state
              enableReinitialize={false} // Do not reinitialize on each render
              onSubmit={(values) => {
                filterStudent(values);

              }}
              validationSchema={handleStudentMarkValidation}
            >
              {(formik) => {
                const { handleSubmit, values, handleBlur, handleChange } =
                  formik;
                return (
                  <div>
                    <Form onSubmit={handleSubmit}>
                      <Row className="row-style px-2 pt-4">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Select Term
                            <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="term"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.term}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                handleChange(e); setSelectedValue(prevState => ({ ...prevState, isTerm: e.target.value }));
                              }}
                            >
                              <option value="">Select Term</option>
                              <option value="1">1st Term</option>
                              <option value="2">2nd Term</option>
                              <option value="3">3rd Term</option>
                              <option value="4">4th Term</option>
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage name={"term"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Academic Year
                            <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="academicYear"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.academicYear}
                              onChange={(e) => {
                                handleChange(e); setSelectedValue(prevState => ({ ...prevState, isAcademicYear: e.target.value }));
                              }}
                            >
                              <option value="">Select Academic Year</option>
                              {years.map((year, index) => (
                                <option key={index} value={year.value}>
                                  {year.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage name={"academicYear"} />
                        </Col>
                      </Row>

                      <Row className="row-style px-2">
                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Standard <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>

                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="standard"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.standard}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                handleChange(e); setSelectedValue(prevState => ({ ...prevState, isStandard: e.target.value }));
                              }}
                            >
                              {standardOptions?.map((option) => (
                                <option
                                  key={option?.value}
                                  value={option?.value}
                                >
                                  {option?.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage name={"standard"} />
                        </Col>

                        <Col xs={12} md={2} className="label-col-style">
                          <Form.Label className="common-font-family mb-0">
                            Section
                            <span className="text-danger"> *</span>
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={4} className="mb-4">
                          <Form.Group>
                            <Form.Select
                              name="section"
                              className="form-ctrl-style dropdown-font-style"
                              value={values.section}
                              onChange={(e) => {
                                handleChange(e); setSelectedValue(prevState => ({ ...prevState, isSection: e.target.value }));
                              }}
                            >
                              <option value="">Select Section</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                            </Form.Select>
                          </Form.Group>
                          <CustomErrorMessage name={"section"} />
                        </Col>
                      </Row>

                      {["11", "12"].includes(values.standard) &&
                        <Row className="row-style px-2">
                          <Col xs={12} md={2} className="label-col-style">
                            <Form.Label className="common-font-family mb-0">
                              Group
                              <span className="text-danger"> *</span>
                            </Form.Label>
                          </Col>
                          <Col xs={12} md={4} className="mb-4">
                            <Form.Group>
                              <Form.Select
                                name="group"
                                className="form-ctrl-style dropdown-font-style"
                                value={values.group}
                                onChange={(e) => {
                                  handleChange(e); setSelectedValue(prevState => ({ ...prevState, isGroup: e.target.value }));
                                }}
                              >
                                <option value="">Select Group</option>
                                <option value="1">I</option>
                                <option value="2">II</option>
                                <option value="3">III</option>
                                <option value="4">IV</option>
                                <option value="5">V</option>

                              </Form.Select>
                            </Form.Group>
                            <CustomErrorMessage name={"group"} />
                          </Col>
                          <Col xs={12} md={6} />
                        </Row>
                      }

                      <Row className="p-2 py-3 d-flex justify-content-end">
                        <Col xs={12} md={4}>
                          <Button
                            type="submit"
                            className="common-font-family w-100"
                            variant="primary"
                          >
                            Select
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                );
              }}
            </Formik>
            {isLoading ? (
              <div className="spin-style py-5">
                <Spin size="large" />
              </div>
            ) : (
              <div>

                {data?.length > 0 ? (
                  <MaterialReactTable
                    columns={columns}
                    data={Array.isArray(data) ? data : []}
                    paginationDisplayMode="pages"
                    enableStickyHeader={true}
                    enableFullScreenToggle={false}
                    enableHiding={false}
                    initialState={{
                      showGlobalFilter: true,
                      showColumnFilters: true,
                      pagination: {
                        pageSize: 100,
                      },
                      columnOrder: ["mrt-row-actions", ...columns.map((col) => col.accessorKey)],
                    }}
                    displayColumnDefOptions={{
                      "mrt-row-actions": {
                        visibleInShowHideMenu: false,
                      },
                    }}
                    muiTableBodyCellProps={({ cell }) => ({
                      children: cell.getValue() || "-",
                    })}
                    renderTopToolbarCustomActions={() => (
                      <Box sx={{ display: "flex", gap: "16px", padding: "8px", flexWrap: "wrap" }}>
                        <Button variant="primary">Export to Excel</Button>
                      </Box>
                    )}
                    renderRowActions={({ row }) => (
                      <div style={{ display: "flex", gap: "8px" }}>
                        {/* Edit Action */}
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() =>
                              navigate("/student/edit/tabs", {
                                state: {
                                  admission_id: row?.original?.admission_id,
                                  profile_id: row?.original?.profile_id,
                                },
                              })
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        {/* View Action */}
                        <Tooltip title="View">
                          <IconButton
                            color="success"
                            onClick={() =>
                              navigate("/MangerUser/Viewprofile", { state: { id: row?.original?.profile_id } })
                            }
                          >
                            <RemoveRedEyeOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    )}
                  />
                ) : (
                  <div className="py-5">
                    <p className="text-center">No records to display!</p>
                  </div>
                )}
              </div>
            )}

          </Container>
        </section>
      </div>
    </div>
  );
}
