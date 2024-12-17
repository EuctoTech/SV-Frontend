import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import {BsFillSignpost2Fill} from 'react-icons/bs'
const Role = () => {
  return (
    <div>
       
        <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
    <Header/>
    <div className='container'>
          <h2 className='p-4' style={{fontFamily:'auto'}}><BsFillSignpost2Fill className="pe-1 pb-1" size={35}  />Role</h2>
          <div className='py-1'>
          <Paper elevation={2} className="pb-5">
               <div className='col-6 p-4'>
                <h4>Manger Role</h4><hr className='hrAdminDashboard'/>
                </div>
               <div className='col-6 text-end p-4'>
               </div>
               
               <div >
               <Card className="mx-auto" style={{ width: '18rem',height:'auto',border: '1px solid',padding: '10px',boxShadow: "5px 10px #888888" }}>
                <ListGroup variant="flush" className='py-4'>
                  <h3 className='text-center'>Super Admin</h3><hr style={{fontFamily: 'uiMonospace',height:'10px',color:'green',backgroundColor: '#b7d0e2'}}/>
                  <h3 className='text-center'> Cashier</h3><hr style={{fontFamily: 'uiMonospace',height:'10px',color:'green',backgroundColor: '#b7d0e2'}}/>
                  <h3 className='text-center'>Sponsor</h3><hr style={{fontFamily: 'uiMonospace',height:'10px',color:'green',backgroundColor: '#b7d0e2'}}/>
                  <h3 className='text-center'>Student</h3><hr style={{fontFamily: 'uiMonospace',height:'10px',color:'green',backgroundColor: '#b7d0e2'}}/>
                </ListGroup>
              </Card>
               </div>
          </Paper>
          </div>
        </div>
        <Footer/>
    </div>
    </div>
  )
}

export default Role
