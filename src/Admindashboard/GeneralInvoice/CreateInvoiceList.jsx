import React, { useMemo,useState } from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';   
import Header from '../Header';
import Paper from '@mui/material/Paper';
import Row from 'react-bootstrap/Row';
import {FaFileInvoice} from 'react-icons/fa';
// import CreateInvoiceTable from './';


const CreateInvoiceList = () => {


  return (
    <div>
       <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
      <Header/>

        <div className='container'>
          <h2 className='p-4' style={{fontFamily:'auto'}}><FaFileInvoice className="pe-1 pb-1" size={35}/>Create Invoice List</h2>
          <div className='py-1'>
          <Paper elevation={2} className="pb-5">
             <Row>
               <div className='col-6 p-4'><h4></h4></div>
               <div className='col-6 text-end p-4'>
              <a href='/GeneralInvoice/Createinvoice'> <button style={{width:'25%'}} className='button-42 ' role='button'>Create Now</button></a>
               </div>
             </Row>
             <div className='container'>
               {/* <CreateInvoiceTable/> */}
             </div>
          </Paper>
          </div>
        </div>
   </div>
    </div>
  )
}

export default CreateInvoiceList
