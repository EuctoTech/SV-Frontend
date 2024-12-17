import React, { useMemo,useState } from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';   
import Header from '../Header';
import Paper from '@mui/material/Paper'; 
import DataTableUser from '../MangerUser/DataTableUser';
import Row from 'react-bootstrap/Row';
import {FaUsersCog} from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Manageuser = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleClick() {
    toast.success('User add successfully', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
      });
  }


  return (
    <div>
       <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
      <Header/>

      <ToastContainer
        className='pt-5'
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"/>



        <div className='container'>
          <h2 className='p-4' style={{fontFamily:'auto'}}><FaUsersCog className="pe-1 pb-1" size={35}  />User</h2>
          <div className='py-1'>
          <Paper elevation={2} className="pb-5">
             <Row>
               <div className='col-6 p-4'><h2 style={{ fontFamily: 'fangsong'}}>Manage User</h2></div>
               <div className='col-6 text-end p-4'>
              <a href='/svsportaladmintest/MangerUser/EditUser'> <button  style={{width:'25%'}} className='button-42 '>Add user</button></a> 
               </div>
             </Row>
             <div className='container'>
               <DataTableUser/>
             </div>
          </Paper>
          </div>
        </div>
   </div>
    </div>
  )
}

export default Manageuser


