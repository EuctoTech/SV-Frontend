import React,{useState} from 'react'
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Header from '../Header';
import Paper from '@mui/material/Paper'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {FaUsersCog} from 'react-icons/fa'
import {TiBackspace} from 'react-icons/ti';
import Swal from 'sweetalert2';

const EditUser = () => {



  const [user, setUser] = useState([]);
  const [newName, setNewName] = useState('');
  const [newGender, setNewGender] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newUserType, setNewUserType] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newSection, setNewSection] = useState('');
  const [newGroup, setNewGroup] = useState('');
  const [newRollNo, setNewRollNo] = useState('');
  const [newHostelOrDay, setNewHostelOrDay] = useState('');



  /////////  Create Input data ///////////////////
  const createUser = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: newName,
          gender:newGender,
          email:newEmail,
          user_type:newUserType,
          standard:newGrade,
          sec:newSection,
          twe_group:newGroup,
          hostelOrDay:newHostelOrDay,
          created_by: sessionStorage.getItem('user_id')
         }),
      });
      const data = await response.json();
      setUser([...user, data[0]]);
      console.log(data[0]);
      Swal.fire({
        icon: 'success',
        title: 'User Created successfully !',
        showConfirmButton: false,
        timer: 1800
      })
      setNewName('');
      setNewGender('');
      setNewEmail('');
      setNewUserType('');
      setNewGrade('');
      setNewSection('');
      setNewGroup('');
      setNewHostelOrDay('');
    } catch (error) {
      console.log(error);
    }
  };



  return (

          <div>
       <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
      <Header/>

        <div className='container'>
          <h2 className='px-4 py-2' style={{fontFamily:'auto'}}><FaUsersCog className="pe-1 pb-1" size={35}  />User</h2>
          <div className='py-1'>
          <Paper elevation={2} className="pb-5" style={{backgroundColor:'#F4F4F5'}}>
            <div className='text-end p-2'>
                <a href="/svsportaladmintest/MangerUser/User">
                    <TiBackspace size={35} className='text-danger'/>
                </a>
            </div>
               <div className='text-center py-4'><h4>Add User</h4></div>

             <div className='container' style={{width:'50%'}}>
             <Form>
               <Form.Group className="mb-5" controlId="exampleForm.ControlInput1" style={{height: '60px'}}>
               <Form.Label>User name</Form.Label>
               <Form.Control value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                           autoComplete='off' 
                           type="text" 
                           placeholder="Enter user name" style={{height: '60px'}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>Gender</Form.Label>
                  <Form.Select value={newGender} onChange={(e) => setNewGender(e.target.value)} aria-label="Default select example" style={{height: '60px'}}>
                   <option value="" disabled>--Select--</option>
                   <option value="male">Male</option>
                   <option value="female">Female</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
              value={newEmail} onChange={(e)=> setNewEmail(e.target.value)}  autoComplete='off' type="text" placeholder="name@example.com" style={{height: '60px'}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User Type</Form.Label>
              <Form.Select value={newUserType} onChange={(e)=> setNewUserType(e.target.value)} aria-label="Default select example" style={{height: '60px'}}>
              <option value="" disabled>--Select--</option>
                {/* <option value="student">Student</option> */}
                {/* <option value="sponser">Sponsor</option> */}
                <option value="hostel-user">Hostel Admin</option>
                <option value="admin">Admin</option>
                {/* <option value="cashier">Cashier</option> */}
              </Form.Select>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div className='d-flex'><Form.Label>Roll No</Form.Label><p className='ps-2 text-danger'>(optional)</p></div> 
              <Form.Control 
              value={newRollNo} onChange={(e)=> setNewRollNo(e.target.value)}  autoComplete='off' type="text" placeholder="" style={{height: '60px'}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <div className='d-flex'><Form.Label>Grade</Form.Label><p className='ps-2 text-danger'>(optional)</p></div> 
              <Form.Select value={newGrade} onChange={(e)=> setNewGrade(e.target.value)} aria-label="Default select example" style={{height: '60px'}}>
              <option value="" disabled>--Select--</option>
                <option value="lkg">LKG</option>
                <option value="ukg">UKG</option>
                <option value="1">I</option>
                <option value="2">II</option>
                <option value="3">III</option>
                <option value="4">IV</option>
                <option value="5">V</option>
                <option value="6">VI</option> 
                <option value="7">VII</option>
                <option value="8">VIII</option>
                <option value="9">IX</option>
                <option value="10">X</option>
                <option value="11">XI</option>
                <option value="12">XII</option>
              </Form.Select>

            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div className='d-flex'><Form.Label>Section</Form.Label><p className='ps-2 text-danger'>(optional)</p></div> 
              <Form.Select value={newSection} onChange={(e) => setNewSection(e.target.value)} aria-label="Default select example" style={{height: '60px'}}>
              <option value="" disabled>--Select--</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <div className='d-flex'><Form.Label>Group</Form.Label><p className='ps-2 text-danger'>(optional)</p></div> 
              
              <Form.Select value={newGroup} onChange={(e) => setNewGroup(e.target.value)} aria-label="Default select example" style={{height: '60px'}}>
              <option value="" disabled>--Select--</option>
                <option value="Group-I">Group-I</option>
                <option value="Group-II">Group-II</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div className='d-flex'><Form.Label>Hostel / Day</Form.Label><p className='ps-2 text-danger'>(optional)</p></div> 
              <Form.Select value={newHostelOrDay} onChange={(e) => setNewHostelOrDay(e.target.value)} aria-label="Default select example" style={{height: '60px'}}>
              <option value="" disabled>--Select--</option> 
                <option value="hostel">Hostel</option>
                <option value="day">Day Scholar</option>
              </Form.Select>
            </Form.Group> */}
              <div className='text-center'>
                <Button  className='bg-success'  onClick={createUser}>Add User</Button>
              </div>
             </Form>
             
             </div>
          </Paper>
          </div>
        </div>
        <div>
          {/* <Footer /> */}
        </div>
   </div>
      
    </div>

  )
}

export default EditUser
