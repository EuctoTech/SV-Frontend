import React, { useEffect, useState } from "react";
import "./signin.css";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../Assets/backgroundImg.png";
import { BiError } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import Logo from "../Assets/newlogo.jpg";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { Row, Col, Modal } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //   const setSessionExpiration = () => {
  //     // const sessionDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
  //     const sessionDuration = 1 * 60 * 1000; // 1 minute in milliseconds

  //     const sessionExpiration = new Date().getTime() + sessionDuration;

  //     localStorage.setItem('sessionExpiration', sessionExpiration);
  // };

  const handleShow = async (e) => {
    e.preventDefault();
    if (username) {
      try {
        const response = await fetch(
          `https://santhoshavidhyalaya.com/SVSTEST/api/sendotp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
          }
        );
        if (response.ok) {
          const data = await response.json();

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "OTP sent successfully",
          }).then(() => {
            // Swal.fire({
            //     title: 'Enter OTP',
            //     html: `
            //         <div style="display: flex; justify-content: center;">
            //             <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
            //             <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
            //             <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
            //             <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
            //             <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
            //         </div>
            //     `,
            //     showCancelButton: true,
            //     confirmButtonText: 'Submit',
            //     cancelButtonText: 'Cancel',
            //     preConfirm: () => {
            //         const otpBoxes = document.querySelectorAll('.otp-box');
            //         let otpValue = '';
            //         otpBoxes.forEach(box => {
            //             otpValue += box.value;
            //         });
            //         return otpValue;
            //     },
            //     onOpen: () => {
            //         const otpBoxes = document.querySelectorAll('.otp-box');
            //         otpBoxes.forEach((box, index) => {
            //             box.addEventListener('input', () => {
            //                 if (box.value.length === 1) {
            //                     // Move to the next box
            //                     if (index < otpBoxes.length - 1) {
            //                         otpBoxes[index + 1].focus();
            //                     }
            //                 }
            //             });
            //             box.addEventListener('keydown', (e) => {
            //                 if (e.key === 'Backspace' && box.value.length === 0 && index > 0) {
            //                     // Move to the previous box
            //                     otpBoxes[index - 1].focus();
            //                 }
            //             });
            //         });
            //     }
            // })
            Swal.fire({
              title: "Enter OTP",
              html: `
                  <div style="display: flex; justify-content: center;">
                      <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
                      <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
                      <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
                      <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
                      <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
                  </div>
              `,
              showCancelButton: true,
              confirmButtonText: "Submit",
              cancelButtonText: "Cancel",
              preConfirm: () => {
                const otpBoxes = document.querySelectorAll(".otp-box");
                let otpValue = "";
                otpBoxes.forEach((box) => {
                  otpValue += box.value;
                });
                return otpValue;
              },
              didOpen: () => {
                // Use didOpen instead of onOpen for better compatibility
                const otpBoxes = document.querySelectorAll(".otp-box");
                otpBoxes.forEach((box, index) => {
                  box.addEventListener("input", () => {
                    if (box.value.length === 1 && index < otpBoxes.length - 1) {
                      // Move to the next box automatically
                      otpBoxes[index + 1].focus();
                    }
                  });

                  box.addEventListener("keydown", (e) => {
                    if (
                      e.key === "Backspace" &&
                      box.value.length === 0 &&
                      index > 0
                    ) {
                      // Move to the previous box on Backspace
                      otpBoxes[index - 1].focus();
                    }
                  });
                });

                // Auto-focus on the first box when the modal opens
                otpBoxes[0].focus();
              },
            }).then(async (result) => {
              if (result.isConfirmed) {
                const otpValue = result.value;
                // POST request to validate OTP
                try {
                  const otpValidationResponse = await fetch(
                    "https://santhoshavidhyalaya.com/SVSTEST/api/verifyotp",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: username, // Assuming you have user_id from the first response
                        otp_code: otpValue,
                      }),
                    }
                  );
                  if (otpValidationResponse.ok) {
                    const validationData = await otpValidationResponse.json();
                    Swal.fire({
                      icon: "success",
                      title: "OTP Validated",
                      text: "Your OTP is valid!",
                    }).then(() => {
                      if (otpValidationResponse.user_type !== "admin") {
                        // Store the response data in session storage
                        sessionStorage.setItem("user_id", validationData.id);
                        sessionStorage.setItem("email", validationData.email);
                        sessionStorage.setItem("name", validationData.name);
                        sessionStorage.setItem(
                          "user_type",
                          validationData.user_type
                        );
                        sessionStorage.setItem(
                          "accessToken",
                          validationData.token.accessToken
                        );
                        sessionStorage.setItem(
                          "token_id",
                          validationData.token.token.id
                        );
                        // Assuming response.data.student_info contains the student information object
                        const studentInfo = validationData.student_info;

                        // Convert the object to a JSON string and store it in session storage
                        sessionStorage.setItem(
                          "student_info",
                          JSON.stringify(studentInfo)
                        );
                        ///////////////////////////////////   console.log(  sessionStorage.getItem('token_id'));///////////////////////////////////////////////////
                        // setSessionExpiration();
                        window.location.href = "/svsportaladmintest/student/dashboard";

                        //  console.log( response.data.token);
                        //  console.log( response);
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "Unauthorized user type Alert",
                          text: "The email or password you entered is incorrect,user type undefined",
                          confirmButtonText: "Try Again",
                        });
                      }
                    });
                  } else {
                    const errorData = await otpValidationResponse.json();
                    Swal.fire({
                      icon: "error",
                      title: "Invalid OTP",
                      text:
                        errorData.message || "The OTP is invalid or expired.",
                    });
                  }
                } catch (error) {
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while validating the OTP.",
                  });
                  console.error("Error:", error);
                }
              }
            });
          });
        } else {
          const errorData = await response.json();
          Swal.fire({
            icon: "info",
            title: "Please try another method",
            text:
              errorData.error ||
              "An error occurred might has multiple email for this student , Please login with roll number",
          });
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };
  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.emailSvs,
        password: data.passSvs,
      };
      const response = await axios.post(
        "https://www.santhoshavidhyalaya.com/SVSTEST/api/login",
        payload
      );

      // Store the response data in session storage
      sessionStorage.setItem("user_id", response.data.id);
      sessionStorage.setItem("email", response.data.email);
      sessionStorage.setItem("name", response.data.name);
      sessionStorage.setItem("user_type", response.data.user_type);
      sessionStorage.setItem("accessToken", response.data.token.accessToken);
      sessionStorage.setItem("token_id", response.data.token.token.id);
      // Assuming response.data.student_info contains the student information object
      const studentInfo = response.data.student_info;

      // Convert the object to a JSON string and store it in session storage
      sessionStorage.setItem("student_info", JSON.stringify(studentInfo));
      ///////////////////////////////////   console.log(  sessionStorage.getItem('token_id'));///////////////////////////////////////////////////
      // setSessionExpiration();

      console.log(response.data.token);
      console.log(response);

      if (response.data.user_type !== "admin") {
        window.location.href = "/svsportaladmintest/student/dashboard";
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized Alert",
          text: "The email or password you entered is incorrect",
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  console.log(errors);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          height: "100vh",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container pt-5">
          <div className="row">
            <div
              className="col-md-6 offset-1"
              style={{
                display: "block", // Show by default on small screens (mobile)
                "@media (min-width: 992px)": { display: "none" }, // Hide on screens 992px and larger (desktop)
              }}
            >
              <h1 className="welcomeTxt">Welcome</h1>
              {/* <p className='welcomeQurts'> “Education is the most powerful weapon you can use to change the world.”</p> */}
            </div>
            <div className="col-md-5">
              <div
                className="py-4"
                style={{
                  border: "1px solid white",
                  background: "#fff",
                  borderRadius: "10px",
                }}
              >
                {/* <Form method='post' onSubmit={handleSubmit((data)=>{
               navigate('/dashboard');
            })}> */}
                <Form method="post" onSubmit={handleSubmit(onSubmit)}>
                  <div
                    className="logo-img pb-1"
                    style={{ textAlign: "center" }}
                  >
                    <img src={Logo} alt="logo" style={{ width: "35%" }} />
                  </div>
                  <Form.Group
                    className="mb-3"
                    style={{ padding: "0 50px" }}
                    controlId="formBasicEmail"
                  >
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                      }}
                    >
                      <TextField
                        {...register("emailSvs", {
                          required: "ID is required",
                        })}
                        type={"text"}
                        fullWidth
                        id="outlined-basic"
                        label="Enter Email/Roll No"
                        onChange={(e) => setUsername(e.target.value)}
                        variant="outlined"
                      />
                      {errors?.emailSvs && (
                        <p style={{ fontSize: "17px" }} className="text-danger">
                          <BiError className="error-icon" />
                          {errors.emailSvs.message}
                        </p>
                      )}
                    </Box>
                  </Form.Group>
                  {/*------------------------------------------- Password --------------------------------------------*/}
                  <Form.Group
                    style={{ padding: "0px 98px 0px 0px" }}
                    className="mb-3"
                    controlId="formBasicPassword"
                  >
                    <FormControl
                      style={{ width: "100%" }}
                      variant="outlined"
                      className="mb-3 mx-5 w-100"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        fullWidth
                        {...register("passSvs", {
                          required: "Password is required",
                        })}
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                      {errors?.passSvs && (
                        <p style={{ fontSize: "17px" }} className="text-danger">
                          <BiError className="error-icon" />
                          {errors.passSvs.message}
                        </p>
                      )}
                      {/* <p className='text-danger'>{errors.password?.message}</p> */}
                    </FormControl>
                  </Form.Group>

                  {/*------------------------------------------- Password --------------------------------------------*/}
                  {/* <div style={{textAlign:'center'}}>
       <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Before Sign In Select preference ID</FormLabel>
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="">
                <FormControlLabel value="female" control={<Radio />} label="Email" />
                <FormControlLabel value="male" control={<Radio />} label="User Name" />
                <FormControlLabel value="other" control={<Radio />} label="Register Number" />
              </RadioGroup>
            </FormControl>
       </div> */}

                  <div
                    className="logo-button pt-3"
                    style={{ textAlign: "center" }}
                  >
                    <button
                      type="submit"
                      style={{ width: "80%" }}
                      className="button-5"
                      role="button"
                    >
                      <h5>Sign In</h5>
                    </button>
                  </div>
                </Form>
                <Row className="justify-content-between align-items-center px-5">
                  <Col md="6" sm="12" className="text-start">
                    <span
                      onClick={handleShow}
                      style={{
                        fontSize: "smaller",
                        color: "#007bff",
                        cursor: "pointer",
                      }}
                    >
                      Login with OTP!
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useEffect ,useState} from 'react';
// import './signin.css';
// import { useNavigate } from "react-router-dom";
// import backgroundImg from '../Assets/backgroundImg.png';
// import {BiError} from 'react-icons/bi';
// import Form from 'react-bootstrap/Form';
// import Logo from '../Assets/newlogo.jpg';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import {useForm} from 'react-hook-form';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Row, Col,Modal } from "react-bootstrap";

// const Login = () => {

//   const navigate = useNavigate();

//     const {register, handleSubmit, formState:{errors}} = useForm('')

//     const [showPassword, setShowPassword] = React.useState(false);
//     const [username, setUsername] = React.useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const handleMouseDownPassword = (event) => {
//       event.preventDefault();
//   };

//   //   const setSessionExpiration = () => {
//   //     // const sessionDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
//   //     const sessionDuration = 1 * 60 * 1000; // 1 minute in milliseconds

//   //     const sessionExpiration = new Date().getTime() + sessionDuration;

//   //     localStorage.setItem('sessionExpiration', sessionExpiration);
//   // };

//   const handleShow = async (e) => {
//     e.preventDefault();
//     if (username){
//     try {
//       const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/sendotp`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({username: username }),
//       });
//       if (response.ok) {
//         const data = await response.json();

//         Swal.fire({
//             icon: 'success',
//             title: 'Success',
//             text: 'OTP sent successfully',
//         }).then(() => {
//             // Swal.fire({
//             //     title: 'Enter OTP',
//             //     html: `
//             //         <div style="display: flex; justify-content: center;">
//             //             <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
//             //             <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
//             //             <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
//             //             <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
//             //             <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
//             //         </div>
//             //     `,
//             //     showCancelButton: true,
//             //     confirmButtonText: 'Submit',
//             //     cancelButtonText: 'Cancel',
//             //     preConfirm: () => {
//             //         const otpBoxes = document.querySelectorAll('.otp-box');
//             //         let otpValue = '';
//             //         otpBoxes.forEach(box => {
//             //             otpValue += box.value;
//             //         });
//             //         return otpValue;
//             //     },
//             //     onOpen: () => {
//             //         const otpBoxes = document.querySelectorAll('.otp-box');
//             //         otpBoxes.forEach((box, index) => {
//             //             box.addEventListener('input', () => {
//             //                 if (box.value.length === 1) {
//             //                     // Move to the next box
//             //                     if (index < otpBoxes.length - 1) {
//             //                         otpBoxes[index + 1].focus();
//             //                     }
//             //                 }
//             //             });
//             //             box.addEventListener('keydown', (e) => {
//             //                 if (e.key === 'Backspace' && box.value.length === 0 && index > 0) {
//             //                     // Move to the previous box
//             //                     otpBoxes[index - 1].focus();
//             //                 }
//             //             });
//             //         });
//             //     }
//             // })
//             Swal.fire({
//               title: 'Enter OTP',
//               html: `
//                   <div style="display: flex; justify-content: center;">
//                       <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
//                       <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
//                       <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
//                       <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
//                       <input type="text" maxlength="1" class="otp-box" style="width: 40px; height: 40px; text-align: center; font-size: 24px; margin: 0 5px;" />
//                   </div>
//               `,
//               showCancelButton: true,
//               confirmButtonText: 'Submit',
//               cancelButtonText: 'Cancel',
//               preConfirm: () => {
//                   const otpBoxes = document.querySelectorAll('.otp-box');
//                   let otpValue = '';
//                   otpBoxes.forEach(box => {
//                       otpValue += box.value;
//                   });
//                   return otpValue;
//               },
//               didOpen: () => { // Use didOpen instead of onOpen for better compatibility
//                   const otpBoxes = document.querySelectorAll('.otp-box');
//                   otpBoxes.forEach((box, index) => {
//                       box.addEventListener('input', () => {
//                           if (box.value.length === 1 && index < otpBoxes.length - 1) {
//                               // Move to the next box automatically
//                               otpBoxes[index + 1].focus();
//                           }
//                       });

//                       box.addEventListener('keydown', (e) => {
//                           if (e.key === 'Backspace' && box.value.length === 0 && index > 0) {
//                               // Move to the previous box on Backspace
//                               otpBoxes[index - 1].focus();
//                           }
//                       });
//                   });

//                   // Auto-focus on the first box when the modal opens
//                   otpBoxes[0].focus();
//               }
//           }).then(async (result) => {
//                 if (result.isConfirmed) {
//                     const otpValue = result.value;
//                     // POST request to validate OTP
//                     try {
//                         const otpValidationResponse = await fetch('https://santhoshavidhyalaya.com/SVSTEST/api/verifyotp', {
//                           method: "POST",
//                           headers: {
//                             "Content-Type": "application/json",
//                           },
//                             body: JSON.stringify({
//                                 username: username, // Assuming you have user_id from the first response
//                                 otp_code: otpValue
//                             })
//                         });
//                         if (otpValidationResponse.ok) {
//                             const validationData = await otpValidationResponse.json();
//                             Swal.fire({
//                                 icon: 'success',
//                                 title: 'OTP Validated',
//                                 text: 'Your OTP is valid!',
//                             }).then(() => {
//                               if (otpValidationResponse.user_type !== 'admin') {
//     // Store the response data in session storage
//     sessionStorage.setItem('user_id', response.data.id);
//     sessionStorage.setItem('email', response.data.email);
//     sessionStorage.setItem('name', response.data.name);
//     sessionStorage.setItem('user_type', response.data.user_type);
//     sessionStorage.setItem('accessToken', response.data.token.accessToken);
//     sessionStorage.setItem('token_id', response.data.token.token.id);
// // Assuming response.data.student_info contains the student information object
// const studentInfo = response.data.student_info;

// // Convert the object to a JSON string and store it in session storage
// sessionStorage.setItem('student_info', JSON.stringify(studentInfo));
//   ///////////////////////////////////   console.log(  sessionStorage.getItem('token_id'));///////////////////////////////////////////////////
//   // setSessionExpiration();
//   window.location.href = '/svsportaladmintest/Dashboard';

//      console.log( response.data.token);
//      console.log( response);

//                               } else{
//                                 Swal.fire({
//                                   icon: 'error',
//                                   title: 'Unauthorized user type Alert',
//                                   text: 'The email or password you entered is incorrect,user type undefined',
//                                   confirmButtonText: 'Try Again'
//                                 });
//                               }
//                             });
//                         } else {
//                             const errorData = await otpValidationResponse.json();
//                             Swal.fire({
//                                 icon: 'error',
//                                 title: 'Invalid OTP',
//                                 text: errorData.message || 'The OTP is invalid or expired.',
//                             });
//                         }
//                     } catch (error) {
//                         Swal.fire({
//                             icon: 'error',
//                             title: 'Error',
//                             text: 'An error occurred while validating the OTP.',
//                         });
//                         console.error('Error:', error);
//                     }
//                 }
//             });
//         });
//     }
//      else {
//         const errorData = await response.json();
//         Swal.fire({
//           icon: 'info',
//           title: 'Please try another method',
//           text: errorData.error || 'An error occurred might has multiple email for this student , Please login with roll number',
//         });
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }}
//   };
//     const onSubmit = async (data) => {
//       try{
//         const payload = {
//           email: data.emailSvs,
//           password:data.passSvs
//         };
//         const response = await axios.post('https://www.santhoshavidhyalaya.com/SVSTEST/api/login', payload);

//       // Store the response data in session storage
//         sessionStorage.setItem('user_id', response.data.id);
//         sessionStorage.setItem('email', response.data.email);
//         sessionStorage.setItem('name', response.data.name);
//         sessionStorage.setItem('user_type', response.data.user_type);
//         sessionStorage.setItem('accessToken', response.data.token.accessToken);
//         sessionStorage.setItem('token_id', response.data.token.token.id);
// // Assuming response.data.student_info contains the student information object
// const studentInfo = response.data.student_info;

// // Convert the object to a JSON string and store it in session storage
// sessionStorage.setItem('student_info', JSON.stringify(studentInfo));
//       ///////////////////////////////////   console.log(  sessionStorage.getItem('token_id'));///////////////////////////////////////////////////
//       // setSessionExpiration();

//          console.log( response.data.token);
//          console.log( response);

//          if (response.data.user_type !== 'admin') {
//           window.location.href = '/svsportaladmintest/Dashboard';
//         }
//       } catch (error) {
//         console.log(error);
//         if (error.response && error.response.status === 401) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Unauthorized Alert',
//             text: 'The email or password you entered is incorrect',
//             confirmButtonText: 'Try Again'
//           });
//         }
//       }
//     };

// console.log(errors)

//   return (
//     <div>
//       <div style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', height: '100vh',backgroundRepeat:'no-repeat' }}>
//            <div className='container pt-5'>
//            <div className='row'>
//             <div className='col-md-6 offset-1'>
//                 <h1 className='welcomeTxt'>Welcome</h1>
//                 {/* <p className='welcomeQurts'> “Education is the most powerful weapon you can use to change the world.”</p> */}
//             </div>
//             <div className='col-md-5'>
//                 <div className='py-4' style={{border:'1px solid white',background:'#fff',borderRadius:'10px'}}>
//             {/* <Form method='post' onSubmit={handleSubmit((data)=>{
//                navigate('/dashboard');
//             })}> */}
//                 <Form method='post' onSubmit={handleSubmit(onSubmit)}>

//               <div className='logo-img pb-1' style={{textAlign:'center'}}>
//                 <img src={Logo} alt="logo" style={{width:'35%'}} />
//                </div>
//             <Form.Group className="mb-3" style={{padding:'0 50px'}} controlId="formBasicEmail">
//             <Box
//                 sx={{
//                     width: 500,
//                     maxWidth: '100%',
//                 }}>
//               <TextField {...register('emailSvs', {required:'ID is required'})} type={'text'} fullWidth id="outlined-basic" label="Enter Email/Roll No" onChange={(e) => setUsername(e.target.value)} variant="outlined" />
//               {errors?.emailSvs && <p style={{fontSize: '17px'}} className='text-danger'><BiError className='error-icon'/>{errors.emailSvs.message}</p>}
//             </Box>
//             </Form.Group>
// {/*------------------------------------------- Password --------------------------------------------*/}
//                 <Form.Group style={{padding:'0px 98px 0px 0px'}} className="mb-3" controlId="formBasicPassword">
//                 <FormControl style={{width:'100%'}} variant="outlined" className='mb-3 mx-5 w-100'>
//               <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//               <OutlinedInput fullWidth {...register('passSvs',
//               {required:'Password is required'})}
//             id="outlined-adornment-password"
//             type={showPassword ? 'text' : 'password'}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   edge="end">

//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"/>
//             {errors?.passSvs && <p style={{fontSize: '17px'}} className='text-danger'><BiError className='error-icon'/>{errors.passSvs.message}</p>}
//             {/* <p className='text-danger'>{errors.password?.message}</p> */}
//             </FormControl>
//                 </Form.Group>

// {/*------------------------------------------- Password --------------------------------------------*/}
//        {/* <div style={{textAlign:'center'}}>
//        <FormControl>
//               <FormLabel id="demo-row-radio-buttons-group-label">Before Sign In Select preference ID</FormLabel>
//               <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="">
//                 <FormControlLabel value="female" control={<Radio />} label="Email" />
//                 <FormControlLabel value="male" control={<Radio />} label="User Name" />
//                 <FormControlLabel value="other" control={<Radio />} label="Register Number" />
//               </RadioGroup>
//             </FormControl>
//        </div> */}

//                 <div className='logo-button pt-3' style={{textAlign:'center'}}>
//                  <button type='submit' style={{width:'80%'}} className="button-5" role="button"><h5>Sign In</h5></button>
//                 </div>
//                 </Form>
//                 <Row className="justify-content-between align-items-center px-5">
//     <Col md="6" className="text-start">
//       <span onClick={handleShow} style={{ fontSize: 'smaller', color: '#007bff', cursor: 'pointer' }}>
//         Login with OTP!
//       </span>
//     </Col>
//   </Row>
//     </div>

//             </div>
//            </div>

//            </div>
//        </div>
//     </div>
//   )
// }

// export default Login
