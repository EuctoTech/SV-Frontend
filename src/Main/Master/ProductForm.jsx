import React, { useState } from 'react'
import Navbarall from '../Navbarall';
import {Row,Form,Col,Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {IoChevronBackCircleOutline} from 'react-icons/io5';
import {BsCartPlusFill} from 'react-icons/bs'
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';


const ProductForm = () => {
  const [product, setproduct] = useState([])
  const [newCode, setNewCode] = useState('')
  const [newProductName, setNewProductName] = useState('')
  const [newDrugName, setNewDrugName] = useState('')
  const [newBaseUnit, setNewBaseUnit] = useState('')
  const [newRackBox, setNewRackBox] = useState('')
  const [newMfrCompany, setNewMfrCompany] = useState('')
  const [newSupplier, setNewSupplier] = useState('')
  const [newMedicineType, setNewMedicineType] = useState('')
  const [newProductCategory, setNewProductCategory] = useState('')
  const [newMfrShortName, setNewMfrShortName] = useState('')
  const [newPurchaseRate, setNewPurchaseRate] = useState('')
  const [newSalesRate, setNewSalesRate] = useState('')
  const [newMrp, setNewMrp] = useState('')
  const [newHSNCode, setNewHSNCode] = useState('')
  const [newKOM, setNewKOM] = useState('')
  const [newPackUnit, setNewPackUnit] = useState('')
  const [newGodown, setNewGodown] = useState('')
  const [newNrxProduct, setNewNrxProduct] = useState('')


      /////////  Create Input data ///////////////////
      const createDoctor = async (event) => {
        event.preventDefault();
        const databody = {
          code: newCode,
          name: newProductName,
          drug_name: newDrugName,
          base_unit: newBaseUnit,
          rack_box_no: newRackBox,
          manufacturer_company: newMfrCompany,
          //supplier: newSupplier,
          medicine_type: newMedicineType,
          product_category: newProductCategory,
          manufacturer_short_name: newMfrShortName,
          purchase_rate: newPurchaseRate,
          sales_rate: newSalesRate,
          mrp: newMrp,
          hsn_code: newHSNCode,
          kom_hsn_code: newKOM,
          pack_unit: newPackUnit,
          godown: newGodown,
          nrx_product: newNrxProduct ? '1' : '0',
        };
        
        try {
          const response = await fetch('https://euctostaging.com/prolife/api/masters/product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(databody),
    
          });
          const data = await response.json();
          setproduct([...product, data[0]]);
          Swal.fire({
            icon: 'success',
            title: 'Medicine Created successfully !',
            showConfirmButton: false,
            timer: 1800
          })
          setNewProductName('')
          setNewCode('')
          setNewDrugName('')
          setNewBaseUnit('')
          setNewRackBox('')
          setNewMfrCompany('')
          // setNewSupplier('')
          setNewMedicineType('')
          setNewProductCategory('')
          setNewMfrShortName('')
          setNewPurchaseRate('')
          setNewSalesRate('')
          setNewMrp('')
          setNewHSNCode('')
          setNewKOM('')
          setNewPackUnit('')
          setNewGodown('')
          setNewNrxProduct('')
        } catch (error) {
          console.log(error);
        }
      };
  





  return (
    <div>
      <Navbarall/>
      <div className='pt-5 px-3 py-3'>
        <div style={{border:'1px solid #000', background:'#ffff', borderRadius:'10px'}} >
        <div className='row pt-3 px-3'>
            <Col><h3> <BsCartPlusFill size={35} className='mr-2'/>Create Product</h3></Col>
            <Col style={{textAlign:'right'}}>
              <NavLink to='/Main/Master/ProductTable'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
            </Col>
          </div><hr/>
          <div className='px-3  py-4'>
            <Form>
              <Form.Group>
                <TextField value={newCode} onChange={(e)=> setNewCode(e.target.value)} label="Enter Code" variant="filled" />
              </Form.Group><hr/>
            <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control value={newProductName} onChange={(e)=> setNewProductName(e.target.value)} type='text'  />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Drug Name</Form.Label>
                    <Form.Control value={newDrugName} onChange={(e)=> setNewDrugName(e.target.value)} type='text'  />
                  </Form.Group>
                </Col>
            </Row>
            <Row className='pt-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Base Unit</Form.Label>
                    <Form.Control value={newBaseUnit} onChange={(e)=> setNewBaseUnit(e.target.value)} type='text'  />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Rack/Box No</Form.Label>
                    <Form.Control value={newRackBox} onChange={(e)=> setNewRackBox(e.target.value)} type='text'  />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Mfr/Company</Form.Label>
                    <Form.Control value={newMfrCompany} onChange={(e)=> setNewMfrCompany(e.target.value)} type='text'  />
                  </Form.Group>
                </Col>
            </Row>
            <Row className='pt-3'>
                {/* <Col>
                  <Form.Group>
                    <Form.Label>Supplier</Form.Label>
                    <Form.Control type='text'  />
                  </Form.Group>
                </Col> */}
                <Col>
                  <Form.Group>
                    <Form.Label>Medicine Type</Form.Label>
                    <Form.Control value={newMedicineType} onChange={(e)=> setNewMedicineType(e.target.value)} as="select" >
                        <option value='' disable>--Select--</option>
                        <option value='scheduling H'>scheduling H</option>
                        <option value='scheduling H1'>scheduling H1</option>
                        <option value='scheduling HNo'>scheduling HNo</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Product Category</Form.Label>
                    <Form.Control value={newProductCategory} onChange={(e)=> setNewProductCategory(e.target.value)} type='text'  />
                  </Form.Group>
                </Col>
            </Row>
            <Row className='pt-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>MFR Short Name</Form.Label>
                    <Form.Control value={newMfrShortName} onChange={(e)=> setNewMfrShortName(e.target.value)} type='text'  />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Purchase Rate</Form.Label>
                    <Form.Control value={newPurchaseRate} onChange={(e)=> setNewPurchaseRate(e.target.value)} type='number'  />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Sales Rate</Form.Label>
                    <Form.Control value={newSalesRate} onChange={(e)=> setNewSalesRate(e.target.value)} type='number'  />
                  </Form.Group>
                </Col>
            </Row>
            <Row className='pt-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>MRP</Form.Label>
                    <Form.Control value={newMrp} onChange={(e)=> setNewMrp(e.target.value)} type='number'  />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>HSN Code</Form.Label>
                    <Form.Control value={newHSNCode} onChange={(e)=> setNewHSNCode(e.target.value)} type='number'  />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>KOM HSN Code</Form.Label>
                    <Form.Control value={newKOM} onChange={(e)=> setNewKOM(e.target.value)} type='number'  />
                  </Form.Group>
                </Col>
            </Row>
            <Row className='pt-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Pack Unit</Form.Label>
                    <Form.Control value={newPackUnit} onChange={(e)=> setNewPackUnit(e.target.value)} type='text'  />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Godown</Form.Label>
                    <Form.Control value={newGodown} onChange={(e)=> setNewGodown(e.target.value)} type='text'  />
                  </Form.Group>
                </Col>
                <Col>
                <Form.Group style={{ paddingTop: '35px' }}>
                  <input checked={newNrxProduct} onChange={(e) => setNewNrxProduct(e.target.checked)} type='checkbox' style={{ marginRight: '10px' }}/>
                  <Form.Label>NRX Product (Narcotic)</Form.Label>
                </Form.Group>
              </Col>
            </Row>
            <div className='pt-5 text-center'>
              <Button onClick={createDoctor}>Submit</Button>
            </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductForm
