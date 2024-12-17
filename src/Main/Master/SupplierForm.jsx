
import React, { useState } from 'react'
import Navbarall from '../Navbarall';
import {Row,Col,Form, Button} from 'react-bootstrap';
import {Select, TextField} from '@mui/material'
import {NavLink} from 'react-router-dom'
import {IoChevronBackCircleOutline} from 'react-icons/io5'
import {GiCardExchange} from 'react-icons/gi'
import Swal from 'sweetalert2'


const SupplierForm = () => {

  const [supplier, setSupplier] = useState([])
  const [newSupplierName, setNewSupplierName] = useState('')
  const [newSupplierNumber, setNewSupplierNumber] = useState('')
  const [newSupplierAddress, setNewSupplierAddress] = useState('')
  const [newSupplierEmailID , setNewSupplierEmailID ] = useState('')
  const [newSupplierPostalID , setNewSupplierPostalID ] = useState('')
  const [newContactPerson , setNewContactPerson ] = useState('')
  const [newMobile , setNewMobile] = useState('')
  const [newSupplierTINNumber , setNewSupplierTINNumber ] = useState('')
  const [newSupplierCST , setNewSupplierCST ] = useState('')
  const [newSupplierDLNO , setNewSupplierDLNO ] = useState('')
  const [newSupplierGSTINNumber , setNewSupplierGSTINNumber ] = useState('')
  const [newSupplierStateCode , setNewSupplierStateCode ] = useState('')
  const [newSupplierStateName , setNewSupplierStateName ] = useState('')
  const [newSupplierPaymentAfter , setNewSupplierPaymentAfter ] = useState('')


  const createSupplier = async(e)=>{
    e.preventDefault();
    const databody = {
      sup_name:newSupplierName,
      sup_phone:newSupplierNumber,
      sup_email:newSupplierEmailID,
      sup_address:newSupplierAddress,
      sup_pin:newSupplierPostalID,
      contact_person:newContactPerson,
      mobile:newMobile,
      TIN_no:newSupplierTINNumber,
      CST:newSupplierCST,
      DL_no:newSupplierDLNO,
      GSTIN_num:newSupplierGSTINNumber,
      state_code:newSupplierStateCode,
      state_name:newSupplierStateName,
      payment_after:newSupplierPaymentAfter,

    }
    try {
      const response = await fetch('https://euctostaging.com/prolife/api/masters/supplier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(databody),
  
      });
      const data = await response.json();
      setSupplier([...supplier, data[0]]);
      Swal.fire({
        icon: 'success',
        title: 'Supplier Created successfully!',
        showConfirmButton: false,
        timer: 1800
      })
      setNewSupplierName('')
      setNewSupplierNumber('')
      setNewSupplierAddress('')
      setNewSupplierEmailID ('')
      setNewSupplierPostalID ('')
      setNewSupplierTINNumber('') 
      setNewSupplierCST('') 
      setNewSupplierDLNO ('')
      setNewSupplierGSTINNumber('') 
      setNewSupplierStateCode ('')
      setNewSupplierStateName('') 
      setNewContactPerson('')
      setNewSupplierPaymentAfter ('')
      setNewMobile('')
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <Navbarall/>
      <div className='pt-5 px-3 py-3'>
      <div style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
        <div className='py-3 container'>
        <Row>
            <Col>
              <h3 style={{fontFamily:'serif'}}><GiCardExchange className='mr-2'/>Supplier Master</h3>
            </Col>
            <Col style={{textAlign:'right'}}>
              <NavLink to='/Main/Master/Supplier'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
            </Col>
          </Row><hr/>
            <Form>
             {/* <Form.Group className="mb-2">
            <TextField id="filled-basic" label="Code" variant="filled" />
             </Form.Group> */}
            <Row className=''>
                <Col>
                <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>Name</Form.Label>
                        <Form.Control type="text"  value={newSupplierName} onChange={(e)=> setNewSupplierName(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>Phone Number</Form.Label>
                        <Form.Control type="number" value={newSupplierNumber} onChange={(e)=> setNewSupplierNumber(e.target.value)} />
                  </Form.Group>
                </Col>
            </Row>
            <Row className=''>
                <Col>
                <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>Address Line 1</Form.Label>
                        <Form.Control type="text" value={newSupplierAddress} onChange={(e)=> setNewSupplierAddress(e.target.value)} />
                  </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>Email ID</Form.Label>
                        <Form.Control type="email" value={newSupplierEmailID} onChange={(e)=> setNewSupplierEmailID(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>Postal ID</Form.Label>
                        <Form.Control type="text" value={newSupplierPostalID} onChange={(e)=> setNewSupplierPostalID(e.target.value)} />
                  </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>Contact Person</Form.Label>
                        <Form.Control type="text" value={newContactPerson} onChange={(e)=> setNewContactPerson(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>Mobile Number</Form.Label>
                        <Form.Control type="number" value={newMobile} onChange={(e)=> setNewMobile(e.target.value)} />
                  </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>TIN Number</Form.Label>
                        <Form.Control type="text" value={newSupplierTINNumber} onChange={(e)=> setNewSupplierTINNumber(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>CST</Form.Label>
                        <Form.Control type="text" value={newSupplierCST} onChange={(e)=> setNewSupplierCST(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>DL NO</Form.Label>
                        <Form.Control type="text" value={newSupplierDLNO} onChange={(e)=> setNewSupplierDLNO(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>GSTIN Number</Form.Label>
                        <Form.Control type="text" value={newSupplierGSTINNumber} onChange={(e)=> setNewSupplierGSTINNumber(e.target.value)} />
                  </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>State Code</Form.Label>
                        <Form.Control type="text" value={newSupplierStateCode} onChange={(e)=> setNewSupplierStateCode(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>State Name</Form.Label>
                        <Form.Control type="text" value={newSupplierStateName} onChange={(e)=> setNewSupplierStateName(e.target.value)} />
                  </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>Payment After</Form.Label>
                        <Form.Control type="text" value={newSupplierPaymentAfter} onChange={(e)=> setNewSupplierPaymentAfter(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col>
                </Col>
            </Row>
            <div className='py-4 text-center'>
              <Button onClick={createSupplier} className='bg-success'>Add Supplier</Button>
            </div>
            </Form>  
        </div>
      </div>
      </div>
    </div>
  )
}

export default SupplierForm

