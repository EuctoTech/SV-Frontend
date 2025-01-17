import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { handleStudentMarkValidation } from "../../../Validators/YupValidators";
import MaterialReactTable from "material-react-table";

export default function CreateAndEditStudentMarks() {
  const [years, setYears] = useState([]);
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedRows, setCheckedRows] = useState({});
  console.log("checkedRows", checkedRows);
  const [inputValues, setInputValues] = useState({});

  console.log("data", data);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  console.log("data", data);
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e, rowId, field) => {
    const { value } = e.target;
    setData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
    setInputValues((prev) => ({
      ...prev,
      [`${rowId}-${field}`]: value, // Preserve the value
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

  const subOutOf = 100;

  const totalOutOf = 300;

  const columns = [
    {
      accessorKey: "studentName",
      header: "Student",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "english",
      header: `English (${subOutOf})`,
      size: 40,
      Cell: ({ row }) => {
        const isAbsentChecked =
          checkedRows[`${row.id}-english-absent`] || false;
        const isNAChecked = checkedRows[`${row.id}-english-n/a`] || false;

        const storedValue = inputValues[`${row.id}-english`] || "";

        return (
          <div>
            <Form.Group>
              <Form.Control
                name="english"
                className="form-ctrl-style"
                placeholder="Enter Mark"
                type="text"
                value={storedValue}
                onChange={(e) => handleInputChange(e, row.id, "english")}
                disabled={isAbsentChecked || isNAChecked} // Disable input if checkbox is checked
              />
            </Form.Group>

            {/* Checkbox for "Absent" */}
            <div className="d-flex mt-2">
              <input
                type="checkbox"
                checked={checkedRows[`${row.id}-english-absent`] || false}
                onChange={() =>
                  handleCheckboxChange(row.id, "english", "absent")
                }
              />
              <p className="common-font-family mx-2 mb-0">Absent</p>
            </div>

            <div className="d-flex mt-2">
              <input
                type="checkbox"
                checked={checkedRows[`${row.id}-english-n/a`] || false}
                onChange={() => handleCheckboxChange(row.id, "english", "n/a")}
              />
              <p className="common-font-family mx-2 mb-0">N/A</p>
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "tamil",
      header: `Tamil (${subOutOf})`,
      size: 40,
      Cell: ({ row }) => {
        const isAbsentChecked = checkedRows[`${row.id}-tamil-absent`] || false;
        const isNAChecked = checkedRows[`${row.id}-tamil-n/a`] || false;

        const storedValue = inputValues[`${row.id}-tamil`] || "";

        return (
          <div>
            <Form.Group>
              <Form.Control
                name="tamil"
                className="form-ctrl-style"
                placeholder="Enter Mark"
                type="text"
                value={storedValue}
                onChange={(e) => handleInputChange(e, row.id, "tamil")}
                disabled={isAbsentChecked || isNAChecked} // Disable input if checkbox is checked
              />
            </Form.Group>

            {/* Checkbox for "Absent" */}
            <div className="d-flex mt-2">
              <input
                type="checkbox"
                checked={checkedRows[`${row.id}-tamil-absent`] || false}
                onChange={() => handleCheckboxChange(row.id, "tamil", "absent")}
              />
              <p className="common-font-family mx-2 mb-0">Absent</p>
            </div>

            <div className="d-flex mt-2">
              <input
                type="checkbox"
                checked={checkedRows[`${row.id}-tamil-n/a`] || false}
                onChange={() => handleCheckboxChange(row.id, "tamil", "n/a")}
              />
              <p className="common-font-family mx-2 mb-0">N/A</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "maths",
      header: `Maths (${subOutOf})`,
      size: 40,
      Cell: ({ row }) => {
        const isAbsentChecked = checkedRows[`${row.id}-maths-absent`] || false;
        const isNAChecked = checkedRows[`${row.id}-maths-n/a`] || false;

        const storedValue = inputValues[`${row.id}-maths`] || "";

        return (
          <div>
            <Form.Group>
              <Form.Control
                name="maths"
                className="form-ctrl-style"
                placeholder="Enter Mark"
                type="text"
                value={storedValue}
                onChange={(e) => handleInputChange(e, row.id, "maths")}
                disabled={isAbsentChecked || isNAChecked} // Disable input if checkbox is checked
              />
            </Form.Group>

            {/* Checkbox for "Absent" */}
            <div className="d-flex mt-2">
              <input
                type="checkbox"
                checked={checkedRows[`${row.id}-maths-absent`] || false}
                onChange={() => handleCheckboxChange(row.id, "maths", "absent")}
              />
              <p className="common-font-family mx-2 mb-0">Absent</p>
            </div>

            <div className="d-flex mt-2">
              <input
                type="checkbox"
                checked={checkedRows[`${row.id}-maths-n/a`] || false}
                onChange={() => handleCheckboxChange(row.id, "maths", "n/a")}
              />
              <p className="common-font-family mx-2 mb-0">N/A</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "total",
      header: `Total (${totalOutOf})`,
      size: 40,
      Cell: ({ row }) => {
        const total =
          (parseInt(row.original.english) || 0) +
          (parseInt(row.original.tamil) || 0) +
          (parseInt(row.original.maths) || 0);
        return <h5 className="mb-0">{total}</h5>;
      },
    },

    {
      accessorKey: "percentage",
      header: "Percentage(%)",
      size: 40,
      Cell: ({ row }) => {
        const total =
          (parseInt(row.original.english) || 0) +
          (parseInt(row.original.tamil) || 0) +
          (parseInt(row.original.maths) || 0);
        const percentage = (total / totalOutOf) * 100; // Calculate percentage
        return <h5 className="mb-0">{percentage.toFixed(2)}%</h5>; // Display percentage with two decimal places
      },
    },
  ];

  const standardOptions = [
    { value: "", label: "Select Standard" },
    { value: "LKG", label: "LKG" },
    { value: "UKG", label: "UKG" },
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
    { value: "IV", label: "IV" },
    { value: "V", label: "V" },
    { value: "VI", label: "VI" },
    { value: "VII", label: "VII" },
    { value: "VIII", label: "VIII" },
    { value: "IX", label: "IX" },
    { value: "X", label: "X" },
    { value: "XI", label: "XI" },
    { value: "XII", label: "XII" },
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

  const updateMarks = (values) => {
    console.log("values", values);
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearRange = Array.from({ length: 20 }, (_, i) => ({
      label: `${currentYear + 1 - i} - ${currentYear - i}`,
      value: `${currentYear + 1 - i}-${currentYear - i}`,
    }));
    setYears(yearRange);
  }, []);

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
              enableReinitialize={true}
              initialValues={{
                term: "",
                academicYear: "",
                standard: "",
                section: "",
              }}
              onSubmit={(values) => {
                updateMarks(values);
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
                              onChange={handleChange}
                            >
                              <option value="">Select Term</option>
                              <option value="1st Term">1st Term</option>
                              <option value="2nd Term">2nd Term</option>
                              <option value="3rd Term">3rd Term</option>
                              <option value="4th Term">4th Term</option>
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
                              onChange={handleChange}
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
                              onChange={handleChange}
                            >
                              {standardOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
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
                              onChange={handleChange}
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

            {/* <Button
              type="submit"
              className="common-font-family w-100"
              variant="primary"
              onClick={() =>
                setData([
                  { id: 0, studentName: "dinesh" },
                  { id: 1, studentName: "vibin" },
                ])
              }
            >
              Select
            </Button> */}
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
            <div className="d-flex justify-content-end py-4">
              <Button
                type="submit"
                className="common-font-family w-25"
                variant="success"
                onClick={() =>
                  setData([
                    {
                      id: 0,
                      studentName: "dinesh",
                      english: "",
                      tamil: "",
                      maths: "",
                    },
                    {
                      id: 1,
                      studentName: "vibin",
                      english: "",
                      tamil: "",
                      maths: "",
                    },
                  ])
                }
              >
                Submit
              </Button>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}
