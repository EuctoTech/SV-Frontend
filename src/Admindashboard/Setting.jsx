import React,{useState,useEffect} from 'react';
import './dashboard.css';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {GrSettingsOption} from 'react-icons/gr';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Form from 'react-bootstrap/Form';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Container } from 'react-bootstrap';
import {MdAddAPhoto} from 'react-icons/md'
import axios from 'axios';
import Swal from 'sweetalert2'
import Paper from '@mui/material/Paper';



function TabPanel(props) {



    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}>

        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }


const Setting = () => {

  
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post("https://www.santhoshavidhyalaya.com/SVSTEST/api/allnotification", { id: sessionStorage.getItem('user_id') })
      .then((response) => {
        const notifications = response.data.data;
        // Add a "read" property to each notification object
        const dataWithReadStatus = notifications.map((notification) => ({
          ...notification,
          read: false,
        }));
        setData(dataWithReadStatus);
      })
      .catch((error) => {
        console.error("Failed to fetch notifications:", error);
      });
  }, []);


  // Upload-Image//////
  const handleChanges = (event) => {
    let selectedFile = event.target.files[0];

    if (!selectedFile) {
      setImage(null);
      setError("No file selected");
      return;
    }

    if (selectedFile.type.match(/image\/*/) == null) {
      setImage(null);
      setError("File is not an image");
      return;
    }

    setError(null);
    setImage(selectedFile);
  };
  const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


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
      // API request payload
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
          title: 'Password Updated Successfully',
          text: 'Your password has been successfully updated',
          confirmButtonText: 'OK'
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

    
  return (
    <div>
       
    <Sidebar/>
      <div style={{width:'82.5%',float:'right'}} >
        <Header/>

            <div className='p-4'>
                <h3 ><GrSettingsOption  size={34} className='pe-2 pb-1'/>Setting</h3>
                <hr className='settingHr'/>
            </div>
            <section className='container'>
                <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}>
           <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 2, borderColor: 'divider' }}>
            <Tab label="Change Password" {...a11yProps(0)} />
            {/* <Tab label="Admin Profile" {...a11yProps(1)} /> */}
            <Tab label="Notification" {...a11yProps(1)} />
        </Tabs>
{/*----------------------- Tabpanel-2-------------------------------------------- */}        
        <TabPanel value={value} index={0}>
            <h6 style={{fontSize: '3rem',fontWeight: 100}}>Change Password</h6>
            <li>Strong password required. Enter 6-18 characters. Do not include common words or name </li>
            <li>Combine uppercase letters, lowercase letter, number and symbols </li>
            <li>Example : Useradmin@71932 </li>

            <section className='pt-4'>
             <Card style={{ width: '100%' ,textAlign:'center'}}>
             <Card.Body>
               <Card.Title className='mb-0'>User Type</Card.Title>
               <p className='mt-0'>ADMIN</p>

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
{/*-----------------Confirm PAssword ------------------------------------------------------*/} 
                 <TextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' id='confirm-password'label="Confirm Password" variant="outlined" />
                 {validationError && <h5 className='error pt-3 text-danger'>{validationError}</h5>}
                 <div className='text-center py-3'><Button  role="button" type="submit">Update</Button></div>
                  </div>
                 </form>
                </Card.Body>
                </Card>
              
            </section>
        </TabPanel>
{/*----------------------- Tabpanel-2-------------------------------------------- */}
        {/* <TabPanel value={value} index={1} style={{width:'80%'}}>
            <section >
              <Container>
                <div className='row'>
                    <div className='col-2 '>
                       <div className="" style={{width: '150px'}}>
                {error && <div className="error text-danger">{error}</div>}
                             
                     {image && (
                            <div>
                               <img className="imageSize" src={URL.createObjectURL(image)} alt="Preview" />
                            </div>
                      )}
                      
                      {!image && (
                            <div>
                               <img className="imageSize" src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="okdbhg"/>
                            </div>
                      )}       
                        <div className='uploadProfileBtn'>
                <label for="file-input" class="custom-file-upload">Edit Profile<MdAddAPhoto size={25} className='ps-2'/></label>
                <input className="han" id="file-input" type="file" onChange={handleChanges}/>
            </div> 
                 
         
                 
                </div>
                    </div>
                    <div className='col-10' style={{padding:'30px 0 50px 70px'}}>
                      <h5>Udhaya Suriya A</h5>
                      <p>~ Adminator</p>
                      <Button >Edit Profile</Button>
                    </div>

                </div>

                <div className='row p-4'>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="Password" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
              </Form>
                </div>
               </Container>
            </section>
        </TabPanel> */}
{/*-----------------   Notification -----------------------------*/}
        <TabPanel value={value} index={1} style={{width:'80%'}}>
            <Paper elevation={8} >
               <div className='container'>
                 <h4 className='py-3 text-center' style={{fontFamily: 'emoji'}}>Notification History</h4>
               {data.map((res)=>(  
                  <div style={{width: '95%',border: '1px solid green',padding: '12px',margin: '23px',backgroundColor: 'cornsilk'}}>
                    <Row>
                      <Col xs={1}>
                        <img style={{width:'100%'}} src='https://www.santhoshavidhyalaya.com/wp-content/uploads/2022/04/WhatsApp-Image-2022-04-15-at-2.05.33-PM.jpeg'  />
                      </Col>
                      <Col xs={8} className='pt-2'>
                        <h5> <a style={{textDecoration:'none', color: 'crimson',fontFamily: 'sans-serif'}} target="_blank" href={res.url}>{res.text}</a> </h5>
                      </Col>
                      <Col xs={3}>
                        <p className='mb-0 pt-2 text-center'>{res.date}</p>
                      </Col>
                    </Row>
                  </div>
                  ))}  
               </div>
            </Paper>
        </TabPanel>
        </Box>
            </section>

      </div>
 </div>
  )
}

export default Setting






