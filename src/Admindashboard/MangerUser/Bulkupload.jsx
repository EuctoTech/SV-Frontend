import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import BulkuploadTable from './BulkuploadTable';
import {TbWorldUpload} from 'react-icons/tb'
import Swal from 'sweetalert2';

const Bulkupload = () => {
  return (
    <div>
         <Sidebar/>
           <div style={{width:'82.5%',float:'right'}} >
        <Header/>

        <div className='p-4' >
          <Paper elevation={2} className="pb-5" style={{backgroundColor:'rgb(229 229 229)'}}>
            <h3 className='p-3'><TbWorldUpload size={45} className='pe-2' />Student's Bulk Upload</h3>
          
          <div className='container'>
            <BulkuploadTable/>
          </div>
        </Paper>
</div>
      </div>
    </div>
  )
}

export default Bulkupload
