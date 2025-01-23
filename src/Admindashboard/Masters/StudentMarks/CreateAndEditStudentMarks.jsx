import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { handleStudentMarkValidation } from "../../../Validators/YupValidators";
import MaterialReactTable from "material-react-table";
import axios from "axios";
import { Spin } from "antd";
import Swal from "sweetalert2";

export default function CreateAndEditStudentMarks() {
  const [years, setYears] = useState([]);
  const [data, setData] = useState([]);
  const [checkedRows, setCheckedRows] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isSubjects, setSubjects] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  console.log('osFormValid', isFormValid)
  const [isSelectedValue, setSelectedValue] = useState({
    isTerm: "",
    isAcademicYear: "",
    isStandard: "",
    isSection: "",
    isGroup: "",
  });
  const [formValues, setFormValues] = useState({
    term: "",
    academicYear: "",
    standard: "",
    section: "",
    group: "",
  });

  const navigate = useNavigate();

  const filterStudent = (values) => {
    setLoading(true);
    axios
      .get(
        [11, 12].includes(values.standard)
          ? `https://www.santhoshavidhyalaya.com/SVSTEST/api/class-subjects/${values.standard}?sec=${values.section}&group_no=${values.group}&term=${values.term}`
          : `https://www.santhoshavidhyalaya.com/SVSTEST/api/class-subjects/${values.standard}?sec=${values.section}&term=${values.term}`
      )
      .then((res) => {
        setData(res?.data?.students);
        setSubjects(res?.data?.subjects);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Handle input changes
  const handleInputChange = (e, rowId, field) => {
    const { value } = e.target;

    setData((prevData) =>
      prevData.map((row) => {
        if (row.id === rowId) {
          // Update the specific subject mark
          const updatedRow = { ...row, [field]: value };

          // Calculate total marks
          const totalMarks = isSubjects.reduce((sum, sub) => {
            return sum + (parseInt(updatedRow[sub.subject.toLowerCase()]) || 0);
          }, 0);

          // Calculate percentage
          const totalOutOf = isSubjects.reduce(
            (sum, sub) => sum + parseInt(sub.mark),
            0
          );
          const percentage =
            totalOutOf > 0 ? (totalMarks / totalOutOf) * 100 : 0;

          return {
            ...updatedRow,
            total: totalMarks,
            percentage: percentage.toFixed(2),
            term: isSelectedValue.isTerm,
            academicYear: isSelectedValue.isAcademicYear,
            standard: isSelectedValue.isStandard,
            section: isSelectedValue.isSection,
            group: isSelectedValue.isGroup,
          };
        }
        return row;
      })
    );

    setInputValues((prev) => ({
      ...prev,
      [`${rowId}-${field}`]: value,
    }));
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (rowId, subject, type) => {
    // Calculate newCheckedState before updating the state
    const isCurrentlyChecked =
      checkedRows[`${rowId}-${subject}-${type}`] || false;
    const newCheckedState = !isCurrentlyChecked; // Toggle the state (check/uncheck)

    // Update checkedRows state
    setCheckedRows((prevState) => ({
      ...prevState,
      [`${rowId}-${subject}-absent`]:
        type === "absent" ? newCheckedState : false,
      [`${rowId}-${subject}-n/a`]: type === "n/a" ? newCheckedState : false,
    }));

    // Update data state
    setData((prevData) =>
      prevData.map((item) =>
        item.id === rowId
          ? {
            ...item,
            [subject]: newCheckedState ? type : "", // If unchecked, set to empty
            term: isSelectedValue.isTerm,
            academicYear: isSelectedValue.isAcademicYear,
            standard: isSelectedValue.isStandard,
            section: isSelectedValue.isSection,
            group: isSelectedValue.isGroup,
          }
          : item
      )
    );

    // Update inputValues state
    setInputValues((prevValues) => ({
      ...prevValues,
      [`${rowId}-${subject}`]: newCheckedState
        ? ""
        : prevValues[`${rowId}-${subject}`], // Clear input only when checked
    }));
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Student",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    ...isSubjects.map(({ subject, mark }) => ({
      accessorKey: subject.toLowerCase(), // Ensure accessor key is lowercase
      header: `${subject} (${mark})`,
      size: 40,
      Cell: ({ row }) => {
        const isAbsentChecked =
          checkedRows[`${row.id}-${subject.toLowerCase()}-absent`] || false;
        const isNAChecked =
          checkedRows[`${row.id}-${subject.toLowerCase()}-n/a`] || false;

        const storedValue =
          inputValues[`${row.id}-${subject.toLowerCase()}`] || "";

        return (
          <div>
            <Form.Group>
              <Form.Control
                name={subject.toLowerCase()}
                className="form-ctrl-style"
                placeholder="Enter Mark"
                type="text"
                value={storedValue}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const maxMark = mark; // Get the max mark from the subject object

                  if (inputValue !== "" && parseInt(inputValue) > maxMark) {
                    Swal.fire({
                      icon: "warning",
                      title: `You entered more than the allowed mark (${maxMark}).`,
                    });
                    return;
                  }

                  handleInputChange(e, row.id, subject.toLowerCase());
                }}
                disabled={isAbsentChecked || isNAChecked}
              />
            </Form.Group>

            {/* Checkbox for "Absent" */}
            <div className="d-flex mt-2">
              <input
                type="checkbox"
                checked={isAbsentChecked}
                onChange={() =>
                  handleCheckboxChange(row.id, subject.toLowerCase(), "absent")
                }
              />
              <p className="common-font-family mx-2 mb-0">Absent</p>
            </div>

            <div className="d-flex mt-2">
              <input
                type="checkbox"
                checked={isNAChecked}
                onChange={() =>
                  handleCheckboxChange(row.id, subject.toLowerCase(), "n/a")
                }
              />
              <p className="common-font-family mx-2 mb-0">N/A</p>
            </div>
          </div>
        );
      },
    })),
    {
      accessorKey: "total",
      header: `Total (${isSubjects.reduce(
        (sum, sub) => sum + parseInt(sub.mark),
        0
      )})`,
      size: 40,
      Cell: ({ row }) => {
        const total = isSubjects.reduce(
          (sum, sub) =>
            sum + (parseInt(row.original[sub.subject.toLowerCase()]) || 0),
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
          (sum, sub) =>
            sum + (parseInt(row.original[sub.subject.toLowerCase()]) || 0),
          0
        );
        const totalOutOf = isSubjects.reduce(
          (sum, sub) => sum + parseInt(sub.mark),
          0
        );
        const percentage = (total / totalOutOf) * 100;
        return <h5 className="mb-0">{percentage.toFixed(2)}%</h5>;
      },
    },
  ];

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

  const successMessage = (type) => {
    Swal.fire({
      title:
        type === "submit"
          ? "Marks Submitted Successfully!"
          : "Marks Saved Successfully!",
      icon: "success",
      timer: 2000, // Auto-close after 2 seconds
      showConfirmButton: false,
    })
      .then(() => {
        navigate("/view/student/marks/list"); // Navigate to the previous page
      });
  };

  const submitStudentMarks = () => {
    console.log("data", data);
    setLoading(true)
    axios
      .post(
        "https://www.santhoshavidhyalaya.com/SVSTEST/api/StudentMark-Upload",
        data,
      )
      .then((res) => {
        console.log("res", res);
        successMessage("submit")
        setLoading(false)

      }).catch(() => setLoading(false))
  };

  const saveMarks = () => {
    console.log("data", data);
    setLoading(true)
    axios
      .post(
        "https://www.santhoshavidhyalaya.com/SVSTEST/api/marks/save-temporary",
        data,
      )
      .then((res) => {
        console.log("res", res);
        successMessage("save")
        setLoading(false)

      }).catch(() => setLoading(false))
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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? Your entered data will be lost.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const isAllMarksEntered = data.every((student) =>
      isSubjects.every((subject) => {
        const subjectKey = subject.subject.toLowerCase();
        const isAbsentChecked = checkedRows[`${student.id}-${subjectKey}-absent`];
        const isNAChecked = checkedRows[`${student.id}-${subjectKey}-n/a`];

        if (isAbsentChecked || isNAChecked) return true; // Ignore validation for absent/N/A students

        return student[subjectKey] !== undefined && student[subjectKey] !== "";
      })
    );

    setIsFormValid(isAllMarksEntered);
  }, [data, checkedRows, isSubjects]);

  return (
    <div>
      <Sidebar />
      <div style={{ width: "82.5%", float: "right" }}>
        <Header />
        <section className="p-4">
          <Container className="edit-container shadow-sm">
            <div className="title-col-txt">
              <h1 className="title-txt">Student Marks Upload</h1>
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
                                handleChange(e);
                                setSelectedValue((prevState) => ({
                                  ...prevState,
                                  isTerm: e.target.value,
                                }));
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
                                handleChange(e);
                                setSelectedValue((prevState) => ({
                                  ...prevState,
                                  isAcademicYear: e.target.value,
                                }));
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
                                handleChange(e);
                                setSelectedValue((prevState) => ({
                                  ...prevState,
                                  isStandard: e.target.value,
                                }));
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
                                handleChange(e);
                                setSelectedValue((prevState) => ({
                                  ...prevState,
                                  isSection: e.target.value,
                                }));
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

                      {["11", "12"].includes(values.standard) && (
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
                                  handleChange(e);
                                  setSelectedValue((prevState) => ({
                                    ...prevState,
                                    isGroup: e.target.value,
                                  }));
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
                      )}

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
                  <div>
                    <MaterialReactTable
                      columns={columns}
                      data={data}
                      paginationDisplayMode="pages"
                      enableStickyHeader={true}
                      enableFullScreenToggle={false}
                      getRowId={(row) => row.id}
                      enableHiding={false}
                      initialState={{
                        showGlobalFilter: true, // Show the global search by default
                        showColumnFilters: true, // Ensure column filters are hidden by default
                        pagination: {
                          pageSize: 100,
                        },
                      }}
                    />
                    <div >
                      <Row className="d-flex justify-content-end">
                        <Col xs={0} md={6} />
                        <Col xs={12} md={3}>
                          <Button
                            onClick={() => saveMarks()}
                            className="common-font-family mt-4 w-100"
                            variant="primary"
                          >
                            Save
                          </Button>
                        </Col>
                        <Col xs={12} sm="auto" md={3}>
                          <Button
                            onClick={() => submitStudentMarks()}
                            className="common-font-family mt-4 w-100 "
                            variant={!isFormValid ? "secondary" : "success"}
                            disabled={!isFormValid} // Disable button if not all marks are entered
                          >
                            Submit
                          </Button>
                        </Col>
                      </Row>

                    </div>
                  </div>
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
