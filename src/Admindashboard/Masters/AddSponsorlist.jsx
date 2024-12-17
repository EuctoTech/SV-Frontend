import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Paper from '@mui/material/Paper';
import {TbAddressBook} from 'react-icons/tb';
import AddSponsorDatatable from '../Masters/AddSponsorDatatable'

const AddSponsorlist = () => {
  return (
    <div>
    <Sidebar/>
    <div style={{width:'82.5%',float:'right'}}>
    <Header/>
    <div className='container'>
          <Row className='p-4'>
            <Col>
              <h2 style={{fontFamily:'auto'}}><TbAddressBook className="pe-1 pb-1" size={35}/>Master Sponsor List</h2>
            </Col>
            <Col className='text-end'>
               <a href='/svsportaladmintest/Masters/Msponsor'><Button variant="success">Add Sponsor</Button></a>
            </Col>
          </Row>
          <div className='py-1'>
            <Paper elevation={2} className="pb-5">
                <div className='col-6 p-4'>
                    <h4>Sponsor Details</h4><hr className='hrAdminDashboard'/>
                    </div>
                    <div className='container'>
                        <AddSponsorDatatable/>
                    </div>
            </Paper>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddSponsorlist
