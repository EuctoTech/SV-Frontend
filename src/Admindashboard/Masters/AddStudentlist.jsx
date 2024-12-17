import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import {TbAddressBook} from 'react-icons/tb'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import Paper from '@mui/material/Paper';
import AddStudentDatatable from '../Masters/AddStudentDatatable';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

const AddStudentlist = () => {
  return (
    <div>
    <Sidebar/>
    <div style={{width:'82.5%',float:'right'}}>
    <Header/>
    <div className='container'>
          <Row className='p-4'>
            <Col>
              <h2 style={{fontFamily:'auto'}}><TbAddressBook className="pe-1 pb-1" size={35}/>Master Student List</h2>
            </Col>
            <Col className='text-end'>
            <a href='/MangerUser/Bulkupload'><Button style={{backgroundColor:'#FE8C00'}}><AiOutlineCloudUpload className='pe-2' size={30}/>Bulk Upload</Button></a>{' '}
               <a href='/Masters/AddStudent'><Button variant="success">Add Student</Button></a>
            </Col>
          </Row>
          <div className='py-1'>
            <Paper elevation={2} className="pb-5">
                <div className='col-6 p-4'>
                    <h4>Student Details</h4><hr className='hrAdminDashboard'/>
                    </div>
                    <div className='container'>
                        <AddStudentDatatable/>
                    </div>
            </Paper>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddStudentlist




// import React from 'react';
// import Sidebar from '../Sidebar';
// import Header from '../Header';
// import Footer from '../Footer';
// import {TbAddressBook} from 'react-icons/tb'
// import Paper from '@mui/material/Paper';
// import AddStudentDatatable from '../Masters/AddStudentDatatable';
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button';

// const AddStudentlist = () => {
//   return (
//     <div>
//     <Sidebar/>
//     <div style={{width:'82.5%',float:'right'}}>
//     <Header/>
//     <div className='container'>
//           <Row className='p-4' >
//             <Col>
//               <h2 style={{fontFamily:'auto'}}><TbAddressBook className="pe-1 pb-1" size={35}/>Master Student List</h2>
//             </Col>
//             <Col className='text-end'>
//                <a href='/Masters/AddStudent'><Button variant="success">Add Student</Button></a>
//             </Col>
//           </Row>
//           <div className='py-1'>
//             <Paper elevation={2} className="pb-5">
//                 <div className='col-6 p-4'>
//                     <h4>Student Details</h4><hr className='hrAdminDashboard'/>
//                     </div>
//                     <div className='container'>
//                         <AddStudentDatatable/>
//                     </div>
//             </Paper>
//             </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AddStudentlist
