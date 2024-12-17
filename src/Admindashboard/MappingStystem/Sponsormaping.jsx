import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import Row from 'react-bootstrap/Row';
import DataTableSponsor from './DataTableSponsor';

const Sponsormaping = () => {
  return (
    <div>
        <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
    <Header/>
    <div className='p-3' style={{backgroundColor:'#F7F7F7'}}>
          <Paper elevation={2} className="pb-5">
             <Row>
               <div className='col-6 p-4'><h4>Sponsor Maping</h4></div>
               <div className='col-6 text-end p-4'>
                 <a href="/svsportaladmintest/MappingStystem/AddSponsoruser"><button  style={{width:'25%'}} className='button-42 ' role='button'>Add</button></a> 
               </div>
             </Row>
             <div className='container'>
               <DataTableSponsor/>
             </div>
          </Paper>
          </div>
    </div>
    </div>
  )
}


export default Sponsormaping
