import React,{useState,useEffect} from 'react';
import Navbar from '../../Navbar';
import Paper from '@mui/material/Paper';
import Form from 'react-bootstrap/Form';
import {Row,Col,Button,Table} from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import Swal from 'sweetalert2'
import { RiCheckboxCircleLine } from 'react-icons/ri'; // Import a beautiful success icon

  
 
const Myprofile = () => {
  const [pan, setpan] = useState('');
  const [gst, setgst] = useState('');
  const [padd, setpadd] = useState('');
  const [add, setadd] = useState('');
  const [mobile, setmobile] = useState('');
  const [WhatsAppNo, setWhatsAppNo] = useState('');
  const [combinedAddress, setCombinedAddress] = useState(null); // Initialize with null



  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [username, setUsername] = useState('');
  // const [add, setadd] = useState('');
  // const [padd, setpadd] = useState('');
  // const [gst, setgst] = useState('');
  // const [pan, setpan] = useState('');
  const [email, setEmail] = useState('');
  // const [mobile, setmobile] = useState('');
  // const [WhatsAppNo, setWhatsAppNo] = useState('');
  // const [combinedAddress, setCombinedAddress] = useState(null);

  const setStatesFromCombinedAddress = (addressObj) => {
    if (addressObj) {
      for (const property in addressObj) {
        if (addressObj.hasOwnProperty(property)) {
          switch (property) {
            case 'pan':
              setpan(addressObj[property]);
              break;
            case 'gst':
              setgst(addressObj[property]);
              break;
            case 'permanent_address':
              setpadd(addressObj[property]);
              break;
            case 'current_address':
              setadd(addressObj[property]);
              break;
            case 'mobile':
              setmobile(addressObj[property]);
              break;
            case 'WhatsAppNo':
              setWhatsAppNo(addressObj[property]);
              break;
            default:
              break;
          }
        }
      }
    }
  };
  
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('name');
    const storeEmail = sessionStorage.getItem('email');
    const combinedAddressString = sessionStorage.getItem('student_info');
    console.log(combinedAddressString);
  
    if (combinedAddressString) {
      const parsedCombinedAddress = JSON.parse(combinedAddressString);
  
      if (parsedCombinedAddress) {
        setCombinedAddress(parsedCombinedAddress);
        setStatesFromCombinedAddress(parsedCombinedAddress);
      }
    }
  
    setUsername(storedUsername);
    setEmail(storeEmail);
  }, []);
  



      //Change Password Intergation
      const handleSubmit = async (e) => {
        e.preventDefault();
  
         // Validation: Check if form fields are filled
      if (!oldPassword || !newPassword || !confirmPassword) {
        setValidationError(`Please fill in all fields, Don't leave Empty `);
        return;
      }
     
    
        // Validation: Check if New Password and Confirm Password match
        if (newPassword !== confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'New Password and Confirm Password do not match',
          confirmButtonText: 'Check Again'
        })
          return;
        }
        setValidationError('');
        const payload = {
          id: sessionStorage.getItem('user_id'),
          old_password: oldPassword,
          new_password: newPassword,
        };
    
        try {
          // Make the API call using Axios
          const response = await axios.post('https://www.santhoshavidhyalaya.com/SVSTEST/api/changesUserpsd', payload);
          console.log(response.data); 
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
          Swal.fire({
            icon: 'success',
            title: 'Password changed successfully!',
            text: 'Your password has been updated.',
            showConfirmButton: false,
            timer: 2000, // The alert will automatically close after 2 seconds
           });
        } catch (error) {
          if (error.response && error.response.status === 401) {
            setValidationError('Old Password is incorrect');
            Swal.fire({
              icon: 'error',
              title: 'Unauthorized Alert',
              text: 'Old Password is Incorrect',
              confirmButtonText: 'Try Again'
            });
          }else{
          console.error(error);
        }
      }
    };
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };





  return (
    <div>
    <Navbar/>

      <div className='container py-5'>
      <Paper elevation={3}>
        <div className='container pt-3'>
          <div className='pb-2'>
            <Row>
              <Col xs={6} className='col-12 col-md-6'>
                 <h4  style={{fontFamily: 'paynimo-icons'}} > Name: {username}</h4>
              </Col>
              <Col xs={6}>
                 <h4 className='col-12 col-md-6' style={{fontFamily: 'paynimo-icons'}}>Email: {email}</h4>
              </Col>
              </Row>
              <div className='py-5'>
              {combinedAddress && (
                        <>
                <Table  bordered responsive >
                
                <tbody>
                   
                            {combinedAddress.pan && (
                                <tr>
                                    <td>PAN No</td>
                                    <td>{pan}</td>
                                </tr>
                            )}

                            {combinedAddress.gst && (
                                <tr>
                                    <td>GST No</td>
                                    <td>{gst}</td>
                                </tr>
                            )}

                            {combinedAddress.permanent_address && (
                                <tr>
                                    <td>Permanent Address</td>
                                    <td>{padd}</td>
                                </tr>
                            )}

                            {combinedAddress.current_address && (
                                <tr>
                                    <td>Current Address</td>
                                    <td>{add}</td>
                                </tr>
                            )}

                            {combinedAddress.mobile && (
                                <tr>
                                    <td>Mobile</td>
                                    <td>{mobile}</td>
                                </tr>
                            )}

                            {combinedAddress.WhatsAppNo && (
                                <tr>
                                    <td>WhatsApp Number</td>
                                    <td>{WhatsAppNo}</td>
                                </tr>
                            )}
                       
                </tbody>
                    </Table>
                    </>
                    )}
</div>

             
          </div><hr/>

          <strong className='text-danger h4 '>Change password</strong>

        <div className='container pb-4 pt-2'>
          <li>Strong password required. Enter 8-18 characters. Do not include common words or name</li>
          <li>Combine uppercase letters, lowercase letter, number and symbols</li>
          <li>Example : Userstudent@71932</li>
        </div>


     <div>
        <form onSubmit={handleSubmit}>
                  <div className='d-grid'>
                    <TextField value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type='password' id="old-password" label="Old Password" variant="outlined" />
    {/*----------------- New Password ------------------------------------------------------*/}
                    <Form.Group controlId="formBasicPassword" className='py-4'>
                            <FormControl style={{width:'100%'}} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                        <OutlinedInput value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                        id='new-password' fullWidth
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="New Password"/>
                        </FormControl> 
                            </Form.Group>
{/*-----------------Confirm Password ------------------------------------------------------*/} 
                      <TextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' id='confirm-password'label="Confirm Password" variant="outlined" />
                      {validationError && <h5 className='error pt-3 text-danger'>{validationError}</h5>}
                      <div className='text-start py-3 text-success'><Button className='bg-success'  role="button" type="submit">Update My Password</Button></div>
                        </div>
        </form>
     </div>
        </div>
      </Paper>
      </div>
   </div>
  )
}

export default Myprofile;
