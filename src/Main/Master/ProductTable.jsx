import React,{useEffect,useState} from 'react';
import Navbarall from '../Navbarall';
//Datatable Modules
import $ from 'jquery'; 
import 'jquery/dist/jquery.min.js';
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import {NavLink} from 'react-router-dom'
import {Table,Button,Modal,Form} from 'react-bootstrap';
import {BsCartPlusFill} from 'react-icons/bs'
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

const format = 'HH:mm'

const ProductTable = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState(null)
  const [selectedDateTo, setSelectedDateTo] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const [editId, setEditId] = useState('');
  const [ editCode, setEditCode] = useState('');
  const [ editProductName  ,setEditProductName] = useState('')
  const [ editDrugName  ,setEditDrugName] = useState('')
  const [ editBaseUnit  ,setEditBaseUnit] = useState('')
  const [ editRackBox  ,setEditRackBox] = useState('')
  const [ editMfrCompany  ,setEditMfrCompany] = useState('')
  const [ editMedicineType  ,setEditMedicineType] = useState('')
  const [ editProductCategory  ,setEditProductCategory] = useState('')
  const [ editMfrShortName ,setEditMfrShortName] = useState('')
  const [ editPurchaseRate  ,setEditPurchaseRate] = useState('')
  const [ editSalesRate  ,setEditSalesRate] = useState('')
  const [ editMrp  ,setEditMrp] = useState('')
  const [ editHSNCode  ,setEditHSNCode] = useState('')
  const [ editKOM ,setEditKOM] = useState('')
  const [ editPackUnit  ,setEditPackUnit] = useState('')
  const [ editGodown  ,setEditGodown] = useState('')
  const [ editNrxProduct  ,setEditNrxProduct] = useState('')




  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//Insert View Table
  useEffect(() => {
    fetch('https://euctostaging.com/prolife/api/masters/product')
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  const initDataTable = () => {
    $('#registaion').DataTable({
      destroy: true,
      processing: true,
      serverSide: false,
      data: tableData, 
      dom: 'lfBrtip',
      buttons: [
        {
          extend: 'copy',
          className: 'btn btn-success',
        },
        {
          extend: 'csv',
          className: 'btn btn-danger',
        },
        {
          extend: 'print',
          className: 'btn btn-warning',
        },
        
      ],
      searching: true,
      columnDefs: [
        {
          data: 'action',
          defaultContent: "<button>Edit</button>",
          targets: 19
        }
      ],
      columns: [
        { data: 'code',defaultContent: '-' },
        { data: 'name',defaultContent: '-' },
        { data: 'drug_name',defaultContent: '-' },
        { data: 'base_unit',defaultContent: '-' },
        { data: 'rack_box_no',defaultContent: '-' },
        { data: 'manufacturer_company',defaultContent: '-' },
        { data: 'medicine_type',defaultContent: '-' },
        { data: 'product_category',defaultContent: '-' },
        { data: 'manufacturer_short_name',defaultContent: '-' },
        { data: 'purchase_rate',defaultContent: '-' },
        { data: 'sales_rate',defaultContent: '-' },
        { data: 'mrp',defaultContent: '-' },
        { data: 'hsn_code',defaultContent: '-' },
        { data: 'kom_hsn_code',defaultContent: '-' },
        { data: 'pack_unit',defaultContent: '-' },
        { data: 'godown',defaultContent: '-' },
        { data: 'nrx_product',defaultContent: '-' },
        { data: 'created_by',defaultContent: '-' },
        { data: 'created_at',defaultContent: '-' },
        {
          data: 'action',
          "targets": 19,
          createdCell: (td, cellData, rowData, row, col) =>
            ReactDOM.render(
              [
                <FaRegEdit onClick={()=> {handleShow(); getDataID(rowData.id);setEditId(rowData.id);}} style={{ color: 'green', cursor: 'pointer' }} size={25} />,
                <MdDelete onClick={()=> {deleteProductMaster(rowData.id)}} style={{ color: 'red', cursor: 'pointer' }} size={28} />,
              ],
              td
            ),
        },
      ],
    });
  };

  useEffect(() => {
    if (!isLoading && tableData.length > 0) {
      initDataTable();
    }
    
  }, [isLoading, tableData]);


const deleteProductMaster = async (id) => {
  try {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`https://euctostaging.com/prolife/api/masters/product/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          setTableData(tableData.filter((res) => res.id !== id));
          Swal.fire(
            'Deleted!',
            'Your input has been deleted.',
            'success'
          );
        } catch (error) {
          console.log(error);
          Swal.fire(
            'Error',
            'An error occurred while deleting the input.',
            'error'
          );
        }
      } else {
        Swal.fire(
          'Cancelled',
          'Your input is safe.',
          'info'
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};


//  Edit Table
const editProduct = async () => {
  try {
    const response = await fetch(`https://euctostaging.com/prolife/api/product/update/${editId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: editId,
        code: editCode,
        name: editProductName,
        drug_name:editDrugName ,
        base_unit:editBaseUnit ,
        rack_box_no: editRackBox,
        manufacturer_company: editMfrCompany,
        medicine_type:editMedicineType ,
        product_category: editProductCategory,
        manufacturer_short_name: editMfrShortName,
        purchase_rate: editPurchaseRate,
        sales_rate:editSalesRate ,
        mrp: editMrp,
        hsn_code: editHSNCode,
        kom_hsn_code: editKOM,
        pack_unit:editPackUnit ,
        godown:editGodown ,
        nrx_product:editNrxProduct,
      }),
    });
    const data = await response.json();
    console.log(data);
    handleClose();
    if (response.ok) {
      await initDataTable(); 
      Swal.fire({
        icon: 'success',
        title: 'Product updated successfully !',
        showConfirmButton: false,
        timer: 1800,
      })
      .then(() => {
        window.location.reload(); 
           });

    } else {
      Swal.fire('Error', 'Failed to update the Patient.', 'error');
    }
  } catch (error) {
    console.error('Error updating item:', error);
    Swal.fire('Error', 'An error occurred while updating the item.', 'error');
  }
} 

 const getDataID = async (datid)=>{
  try{ 
    const response = await fetch(`https://euctostaging.com/prolife/api/masters/product/${datid}`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const {
      id,                                                                                                                            
      code,                                                                     
      name,                                                                     
      drug_name,                                                                 
      base_unit,                                                                 
      rack_box_no,                                                                 
      manufacturer_company,                                                                 
      medicine_type,                                                                 
      product_category,                                                                 
      manufacturer_short_name,                                                                 
      purchase_rate,                                                                 
      sales_rate,                                                                 
      mrp,                                                                 
      hsn_code,                                                                 
      kom_hsn_code,                                                                 
      pack_unit,                                                                 
      godown,                                                                
      nrx_product,                                                             
    } = data;

    setEditId(id);
    setEditCode(code);
    setEditProductName(name)
    setEditDrugName(drug_name)
    setEditBaseUnit(base_unit)
    setEditRackBox(rack_box_no)
    setEditMfrCompany(manufacturer_company)
    // setEditSupplier()
    setEditMedicineType(medicine_type)
    setEditProductCategory(product_category)
    setEditMfrShortName(manufacturer_short_name)
    setEditPurchaseRate(purchase_rate)
    setEditSalesRate(sales_rate)
    setEditMrp(mrp)
    setEditHSNCode(hsn_code)
    setEditKOM(kom_hsn_code)
    setEditPackUnit(pack_unit)
    setEditGodown(godown)
    setEditNrxProduct(nrx_product)

  }catch(error){
    console.log('Error fetching data for id:', datid, error);
  }
 }  


  return (
    <div>
      <Navbarall/>
      <div className='py-4 px-5'>
        <div style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
          <div className='px-5 py-3'>
            <div style={{textAlign:'end', marginBottom:'20px'}}>
              <NavLink to='/Main/Master/ProductForm'>
              <Button style={{backgroundColor:'#CCA047', color:'white'}}><BsCartPlusFill className='mr-2'/>Add Product</Button></NavLink><hr/>
            </div>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Product Master</Modal.Title>
        </Modal.Header>
        <Form> 
        <Modal.Body>
          <div>
          <Form.Control  value={editId} type="hidden"  />
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Code</Form.Label>
              <Form.Control value={editCode} onChange={(e)=> setEditCode(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Product Name</Form.Label>
              <Form.Control value={editProductName} onChange={(e)=> setEditProductName(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Drug Name</Form.Label>
              <Form.Control  value={editDrugName} onChange={(e)=> setEditDrugName(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Base Unit</Form.Label>
              <Form.Control value={editBaseUnit} onChange={(e)=> setEditBaseUnit(e.target.value)}  type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Rack Box No</Form.Label>
              <Form.Control value={editRackBox} onChange={(e)=> setEditRackBox(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Manufacturer Company</Form.Label>
              <Form.Control value={editMfrCompany} onChange={(e)=> setEditMfrCompany(e.target.value)}  type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Medicine Type</Form.Label>
              <Form.Control value={editMedicineType} onChange={(e)=> setEditMedicineType(e.target.value)}  as='select'>
                <option value='' disabled >--Select--</option>
                <option value='Scheduling H' >Scheduling H</option>
                <option value='Scheduling H1' >Scheduling H1</option>
                <option value='Scheduling HNo' >Scheduling HNo</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Product Category</Form.Label>
              <Form.Control value={editProductCategory} onChange={(e)=> setEditProductCategory(e.target.value)}  type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Manufacturer short name</Form.Label>
              <Form.Control value={editMfrShortName} onChange={(e)=> setEditMfrShortName(e.target.value)}  type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Purchase Rate</Form.Label>
              <Form.Control value={editPurchaseRate} onChange={(e)=> setEditPurchaseRate(e.target.value)}  type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Sales Rate</Form.Label>
              <Form.Control  value={editSalesRate} onChange={(e)=> setEditSalesRate(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>MRP</Form.Label>
              <Form.Control value={editMrp} onChange={(e)=> setEditMrp(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>HSN Code</Form.Label>
              <Form.Control value={editHSNCode} onChange={(e)=> setEditHSNCode(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>KOM HSN Code</Form.Label>
              <Form.Control value={editKOM} onChange={(e)=> setEditKOM(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Pack Unit</Form.Label>
              <Form.Control value={editPackUnit} onChange={(e)=> setEditPackUnit(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>Godown</Form.Label>
              <Form.Control value={editGodown} onChange={(e)=> setEditGodown(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className='mb-0'>NRX product</Form.Label>
              <p style={{ fontSize: 'small', color:'red', marginBottom:'0px'}}>(Use '1' for editing the status to indicate 'Active' and '0' is 'Inactive')</p>
              <Form.Control value={editNrxProduct} onChange={(e)=> setEditNrxProduct(e.target.value)} type="number" />
            </Form.Group>
          </div>
           
        </Modal.Body>
        </Form> 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
          
           </Modal>
            {/* Table  */}
            <div>
              <div className="MainDiv">
                {isLoading ? (
                  <div className='text-center'><h5>Loading... Thank you for your patience </h5></div>
                ) : (
                  <Table striped bordered hover responsive id="registaion" className="display">
                    <thead>
                    <tr>
                       
                        <th>Code</th>
                        <th>Name</th>
                        <th>Drug Name</th>
                        <th>Base Unit</th>
                        <th>Rack Box No</th>
                        <th>Manufacturer Company</th>
                        <th>Medicine Type</th>
                        <th>Product Category</th>
                        <th>Manufacturer_short name</th>
                        <th>Purchase Rate</th>
                        <th>Sales Rate</th>
                        <th>MRP</th>
                        <th>HSN Code</th>
                        <th>KOM HSN Code</th>
                        <th>Pack Unit</th>
                        <th>Godown</th>
                        <th>NRX product</th>
                        <th>Created By</th>
                        <th>Created at</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTable


