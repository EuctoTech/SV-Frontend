import React,{useState} from 'react';
import NabarAll from '../Navbarall';
import {Col, Row,Form,Button,Table} from 'react-bootstrap';
import {FaNotesMedical} from 'react-icons/fa'
import {NavLink} from 'react-router-dom';
import {IoChevronBackCircleOutline} from 'react-icons/io5'
import { IoIosRemoveCircleOutline } from 'react-icons/io';

const SalesTableForm = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectMode, setSelectMode] = useState()
    const [rows, setRows] = useState([]);

    const addRow = () => {
      setRows([...rows, {}]);
    };
  
    const removeRow = (index) => {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    };
  
    const handleInputChange = (index, column, value) => {
      const updatedRows = [...rows];
      updatedRows[index][column] = value;
      setRows(updatedRows);
    };


    const handleRowClick = (id) => {
      const isSelected = selectedRows.includes(id);
  
      if (isSelected) {
        setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      } else {
        setSelectedRows([...selectedRows, id]);
      }
    };
  



  return (
    <div>
        <NabarAll/>
        <div className='py-5 px-3'>
            <div style={{border:'1px solid #000', borderRadius:'10px', background:'#ffff'}}>
            <div className='row pt-3 px-3'>
            <Col><h3> <FaNotesMedical size={35} className='mr-3'/>Sales Form</h3></Col>
            <Col style={{textAlign:'right'}}>
              <NavLink to='/Main/Pharmacy/GrnList'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
            </Col>
          </div><hr/>

          <div className='py-3 px-3'>
            <Form>
            <h4 style={{fontFamily: 'auto', color:'#E91E63'}}>Order Details</h4><hr/>
            <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Number</Form.Label>
                    <Form.Control type='text' placeholder='PINVD2928'/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type='date'/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Time</Form.Label>
                    <Form.Control type='time'/>
                  </Form.Group>
                </Col>
            </Row>
            <Row className='pt-3'>
                <Col>
                  <Form.Group>
                    <Form.Control as='select'>
                        <option value='' disabled >--select--</option>
                        <option value='Phamacy'>Phamacy</option>
                        <option value='Phamacy' >Phamacy</option>
                        <option value='Phamacy' >Phamacy</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col></Col>
            </Row>

        <div className='pt-4'>
        <h4 style={{fontFamily: 'auto', color:'#E91E63'}}>Customer Details</h4><hr/>
            <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Customer ID</Form.Label>
                    <Form.Control type='text' placeholder='PINVD2928'/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control type='text'/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type='number'/>
                  </Form.Group>
                </Col>
            </Row>
        </div> <hr/>

        <div className='pt-4'>
        <h4 style={{fontFamily: 'auto', color:'#E91E63'}}>Payment Details</h4><hr/>
            <Row >
                <Col>
                <Form.Group>
                    <Form.Label>Payment Mode</Form.Label>
                    <Form.Control as='select' value={selectMode} onChange={(e)=> setSelectMode(e.target.value)}>
                        <option value='' disabled >--select--</option>
                        <option value='CASH'>CASH</option>
                        <option value='DD' >DD</option>
                        <option value='CARD' >CARD</option>
                        <option value='UPI' >UPI</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                </Col>
            </Row>
            {( selectMode === 'DD' || selectMode === 'CARD' || selectMode === 'UPI') && (
                   <Row className='pt-4'>
                   <Col>
                   <Form.Group>
                   <Form.Label>Remark</Form.Label>
                     <Form.Control type="text" placeholder="Remark" />
                   </Form.Group>
                   </Col>
                   <Col>
                   <Form.Group>
                   <Form.Label>Note</Form.Label>
                     <Form.Control type="text" placeholder="Remark" />
                   </Form.Group>
                   </Col>
                 </Row>
            )}
        </div> <hr/>

            <div>
            <div>
                  <div className='py-3'>
              <Button variant="success" onClick={addRow}>Add</Button>
            </div>
      <Table striped bordered responsive>
      <thead>
              <tr style={{backgroundColor:'#343A40', color:'#ffff'}}>
               <th style={{fontFamily: 'math'}} className='text-center'>Select</th>
                <th style={{fontFamily: 'math'}}>S.No</th>
                <th style={{fontFamily: 'math'}}>Item</th>
                <th style={{fontFamily: 'math'}}>Batch</th>
                <th style={{fontFamily: 'math'}}>Exp Data</th>
                <th style={{fontFamily: 'math'}}>MFR</th>
                <th style={{fontFamily: 'math'}}>Quantity</th>
                <th style={{fontFamily: 'math'}}>Rate</th>
                <th style={{fontFamily: 'math'}}>Discount%</th>
                <th style={{fontFamily: 'math'}}>GST%</th>
                <th style={{fontFamily: 'math'}}>Amount</th>
                <th style={{fontFamily: 'math'}}>Lac</th>
                <th style={{fontFamily: 'math'}} className='text-center'>Actions</th>
              </tr>
            </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>

          

              <td className='text-center'>
                <input
                  type="checkbox"
                  value={row.column0 || ''}
                  onChange={(e) => handleInputChange(index, 'column0', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column1 || ''}
                  onChange={(e) => handleInputChange(index, 'column1', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column2 || ''}
                  onChange={(e) => handleInputChange(index, 'column2', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column3 || ''}
                  onChange={(e) => handleInputChange(index, 'column3', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column4 || ''}
                  onChange={(e) => handleInputChange(index, 'column4', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column5 || ''}
                  onChange={(e) => handleInputChange(index, 'column5', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column6 || ''}
                  onChange={(e) => handleInputChange(index, 'column6', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column7 || ''}
                  onChange={(e) => handleInputChange(index, 'column7', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column8 || ''}
                  onChange={(e) => handleInputChange(index, 'column8', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column9 || ''}
                  onChange={(e) => handleInputChange(index, 'column9', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column10 || ''}
                  onChange={(e) => handleInputChange(index, 'column10', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column11 || ''}
                  onChange={(e) => handleInputChange(index, 'column11', e.target.value)}
                />
              </td>
              <td className='text-center'>
                <IoIosRemoveCircleOutline size={30} style={{color:'red', cursor:'pointer'}} onClick={() => removeRow(index)}/>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
            </div>

            <div className='py-3'>
              <Button variant="success">Submit</Button>
            </div>
            </Form>
          </div>

            </div>
        </div>
    </div>
  )
}



export default SalesTableForm
