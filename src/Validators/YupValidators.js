import * as Yup from "yup";

export const studentEditValidator = (edit_type) =>
  Yup.object().shape({
    admission_no:
      edit_type === "student_profile"
        ? Yup.string().required("Admission number is required")
        : Yup.string().nullable(),

    roll_no:
      edit_type === "student_profile"
        ? Yup.string().required("Roll Number number is required")
        : Yup.string().nullable(),
    student_name: Yup.string().required("Student name is required"),
    student_status:
      edit_type === "student_profile"
        ? Yup.string().required("Student Status is required")
        : Yup.string().nullable(), // Not required for student_application
    date_application:
      edit_type === "student_application"
        ? Yup.date().required("Date of Application is required")
        : Yup.date().nullable(),
    state: Yup.string().required("State is required"),
    dob: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    blood_group: Yup.string()
      .required("Blood group is required")
      .notOneOf([""], "Please select a valid Blood group"),
    nationality: Yup.string()
      .required("Nationality is required")
      .notOneOf([""], "Please select a Nationality"),
    food_choice: Yup.string()
      .required("Food Choice is required")
      .notOneOf([""], "Please select a Food choice"),
    medicine_taken: Yup.string()
      .required("Medicine taken is required")
      .notOneOf([""], "Please select a Medicine taken"),
    father_title: Yup.string().required("Father's Title is required"),
    fa_name: Yup.string().when("father_title", {
      is: (title) => ["Mr.", "Late."].includes(title),
      then: (schema) => schema.required("Father's Name is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    fa_profession: Yup.string().when("father_title", {
      is: (title) => ["Mr."].includes(title),
      then: (schema) => schema.required("Father's Profession is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    fa_mobileNo: Yup.string().when("father_title", {
      is: (title) => ["Mr."].includes(title),
      then: (schema) => schema.required("Father's Mobile number is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    fa_emailId: Yup.string()
      .email("Enter valid email")
      .typeError("Enter valid Email Address")
      .when("father_title", {
        is: (title) => ["Mr."].includes(title),
        then: (schema) => schema.required("Father's Email is required"),
        otherwise: (schema) => schema.nullable(), // Use nullable for when it's not required
      }),
    fa_monthlyIncome: Yup.string().when("father_title", {
      is: (title) => ["Mr."].includes(title),
      then: (schema) => schema.required("Father's Monthly income is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    fa_organizationEmployed: Yup.string().when("father_title", {
      is: (title) => ["Mr."].includes(title),
      then: (schema) =>
        schema.required("Father's Organization Employed is required"),
      otherwise: (schema) => schema.nullable(),
    }),

    mother_title: Yup.string().required("Mother's Title is required"),
    mo_name: Yup.string().when("mother_title", {
      is: (title) => ["Mrs.", "Late."].includes(title),
      then: (schema) => schema.required("Mother's Name is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    mo_profession: Yup.string().when("mother_title", {
      is: (title) => ["Mrs."].includes(title),
      then: (schema) => schema.required("Mother's Profession is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    mo_mobileNo: Yup.string().when("mother_title", {
      is: (title) => ["Mrs."].includes(title),
      then: (schema) => schema.required("Mother's Mobile number is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    mo_emailId: Yup.string()
      .email("Enter valid email")
      .typeError("Enter valid Email Address")
      .when("mother_title", {
        is: (title) => ["Mrs."].includes(title),
        then: (schema) => schema.required("Mother's Email is required"),
        otherwise: (schema) => schema.nullable(), // Use nullable for when it's not required
      }),
    mo_monthlyIncome: Yup.string().when("mother_title", {
      is: (title) => ["Mrs."].includes(title),
      then: (schema) => schema.required("Mother's Monthly income is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    mo_organizationEmployed: Yup.string().when("mother_title", {
      is: (title) => ["Mrs."].includes(title),
      then: (schema) =>
        schema.required("Mother's Organization Employed is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    ga_emailId: Yup.string()
      .email("Enter valid email")
      .typeError("Enter valid Email Address")
      .nullable(),
    siblings: Yup.string()
      .required("This field is required")
      .notOneOf(
        [""],
        "Please select if any other sibling(s) studying in Santhosha Vidhyalaya "
      ),
    pa_houseNo: Yup.string().required("House number is required"),
    pa_street: Yup.string().required("Street is required"),
    pa_town_city: Yup.string().required("Town / City is required"),
    pa_district: Yup.string().required("District is required"),
    pa_state: Yup.string().required("State is required"),
    pa_postalCode: Yup.string().required("Postal Code is required"),
    co_houseNo: Yup.string().required("House number is required"),
    co_street: Yup.string().required("Street is required"),
    co_town_city: Yup.string().required("Town / City is required"),
    co_district: Yup.string().required("District is required"),
    co_state: Yup.string().required("State is required"),
    co_postalCode: Yup.string().required("Postal Code is required"),
    class_last_studied: Yup.string()
      .required("Class Last Studied is required")
      .notOneOf([""], "Please select Class Last Studied "),
    class_admission_sought: Yup.string()
      .required("Class Admission Sought is required")
      .notOneOf([""], "Please select Class Admission Sought "),
    child_tamil_second_lang: Yup.string()
      .required("This field is required")
      .notOneOf([""], "Please select anyone of the value"),
    ref_name1: Yup.string().required("Reference Name is required"),
    ref_mobileNo1: Yup.string().required("Reference Mobile number is required"),
    ref_name2: Yup.string().required("Reference Name is required"),
    ref_mobileNo2: Yup.string().required("Reference Mobile number is required"),
  });

export const handleStaffValidation = Yup.object().shape({
  staff_id: Yup.string().required("Staff Id is required"),
  status: Yup.string().required("Status is required"),
  staff_name: Yup.string().required("Name is required"),
  mobile_no: Yup.string().required("Mobile Number is required"),
  email: Yup.string()
    .email("Enter valid mail id")
    .required("Email Id is required"),
  designation: Yup.string().required("Designation is required"),
  p_addressLine1: Yup.string().required("Permanent address line 1 is required"),
  p_addressLine2: Yup.string().required("Permanent address line 2 is required"),
  p_city: Yup.string().required("Permanent City is required"),
  p_state: Yup.string().required("Permanent State is required"),
  p_pincode: Yup.string().required("Permanent Pincode is required"),
  p_country: Yup.string().required("Permanent Country is required"),
  c_addressLine1: Yup.string().required(
    "Communication address line 1 is required"
  ),
  c_addressLine2: Yup.string().required(
    "Communication address line 2 is required"
  ),
  c_city: Yup.string().required("Communication City is required"),
  c_state: Yup.string().required("Communication State is required"),
  c_pincode: Yup.string().required("Communication Pincode is required"),
  c_country: Yup.string().required("Communication Country is required"),
  // spouse_name: Yup.string().required("Spouse Name is required"),
  // spouse_working: Yup.string().required("Spouse Working is required"),
  // spouse_mobile_no: Yup.string().required("Spouse Mobile No is required"),
  // spouse_mail: Yup.string().required("Spouse Mail Id is required"),
  date_of_joining: Yup.string().required("Date of Joining is required"),
  staff_photo: Yup.string().typeError().required("Staff Image is required"),
});

export const handleHealthCareValidation = (edit_type) =>
  Yup.object().shape({
    class: Yup.string().required("Standard is required"),
    student_name: Yup.string().when("class", {
      is: (value) => value && value.trim() !== "", // Check if class is not empty
      then: (schema) => schema.required("Student is required"),
      otherwise: (schema) => schema.nullable(),
    }),

    from_date: Yup.string().when("class", {
      is: (value) => value && value.trim() !== "", // Check if class is not empty
      then: (schema) => schema.required("From Date is required"),
      otherwise: (schema) => schema.nullable(),
    }),

    to_date: Yup.string().when("class", {
      is: (value) => value && value.trim() !== "", // Check if class is not empty
      then: (schema) => schema.required("To Date is required"),
      otherwise: (schema) => schema.nullable(),
    }),

    treatment_type: Yup.string().when("class", {
      is: (value) => value && value.trim() !== "", // Check if class is not empty
      then: (schema) => schema.required("Treatment Type is required"),
      otherwise: (schema) => schema.nullable(),
    }),

    nature_of_sickness: Yup.string().when("class", {
      is: (value) => value && value.trim() !== "", // Check if class is not empty
      then: (schema) => schema.required("Nature of Sickness is required"),
      otherwise: (schema) => schema.nullable(),
    }),

    // status: Yup.string().when("class", {
    //   is: (value) => value && value.trim() !== "", // Check if class is not empty
    //   then: (schema) => schema.required("Status is required"),
    //   otherwise: (schema) => schema.nullable(),
    // }),
  });

export const handleContactValidation = Yup.object().shape({
  contact_id: Yup.string().required("Contact Id is required"),
  name: Yup.string().required("Name is required"),
  mobileNo: Yup.string().required("Mobile Number is required"),
  email: Yup.string().required("Email Id is required"),
  addressLine1: Yup.string().required("Address Line 1 is required"),
  addressLine2: Yup.string().required("Address Line 2 is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  // country: Yup.string().required("Country is required"),
  countryCode: Yup.string().required("Country Code is required"),
  pincode: Yup.string().required("Pincode is required"),
  contactType: Yup.string().required("Contact Type is required"),
});

export const handleStudentMarkValidation = Yup.object().shape({
  term: Yup.string().required("Term is required"),
  academicYear: Yup.string().required("Academic Year is required"),
  standard: Yup.string().required("Standard is required"),
  section: Yup.string().required("Section is required"),
});
