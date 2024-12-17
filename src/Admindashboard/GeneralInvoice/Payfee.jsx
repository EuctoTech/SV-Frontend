import React from 'react'
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper';
import {Row,Col,Button} from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {BsSearch} from 'react-icons/bs';
import {BsCalendarWeek,BsCalendarMonth} from 'react-icons/bs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Createinvoicetable from './Createinvoicetable';


const Payfee = () => {
  return (
    <div>
       
       <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
      <Header/>
      <div className='p-4' >
          <Paper elevation={2} className="pb-5">
            <Row className='container pt-4'>
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Select Student / Sponsor">
                  <Form.Select aria-label="Floating label select example">
                    <option>Select</option>
                    <option value="student">Student</option>
                    <option value="sponsor">sponsor</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Select">
                    <Form.Select aria-label="Floating label select example">
                      <option>Select</option>
                      <option value="Anu Sufiyan">Anu Sufiyan</option>
                      <option value="Mohammed">Mohammed</option>
                      <option value="Hari">Hari</option>
                      <option value="Mohammed">Fareestha</option>
                    </Form.Select>
                  </FloatingLabel>
              </Col>
              <Col className='pt-2 ps-5'>
              <Button style={{backgroundColor:'#149722',borderRadius:'5px'}} type='submit'>
                <BsSearch className='text-light pe-2' size={26} />Search
              </Button>
              </Col>
            </Row>

              <div className='pt-5 d-flex' style={{marginLeft:'156px'}}>
                <div className='d-flex'>
                <h5 className='p-4'>From</h5>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker  format='DD/MM/YYYY' />
                      </DemoContainer>
                    </LocalizationProvider>
                </div>

                <div className='d-flex'>
                <h5 className='p-4' >To</h5>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker format='DD/MM/YYYY'/>
                      </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className='pt-2 ps-4'>
                  <button  class="button-18" role="button"><h6 className='mb-0'>Sumbit</h6></button>
                </div>
            </div>

          
          
          <div className='container py-5'>
            <Createinvoicetable/>
          </div>
        </Paper>
</div>
    
    </div>
    </div>
  )
}


export default Payfee