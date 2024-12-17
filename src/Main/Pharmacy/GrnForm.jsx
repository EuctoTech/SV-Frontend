import React,{useState, useEffect} from 'react';
import NabarAll from '../Navbarall';
import {Col, Row,Form,Button,Table} from 'react-bootstrap';
import {FaNotesMedical} from 'react-icons/fa'
import {NavLink} from 'react-router-dom';
import {IoChevronBackCircleOutline} from 'react-icons/io5'
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { max } from 'date-fns';
import CreatableSelect from 'react-select/creatable';
import Swal from 'sweetalert2'

const GrnForm = () => {
  const [headerNames, setHeaderNames] = useState([]); 
   const [proArray, setProArray] = useState([]);
  const [proid, setProid] = useState([]);
   const [selectedProductId, setSelectedProductId] = useState('');
   const [icgst, seticgst] = useState('');
   const [iigst, setiigst] = useState('');
   const [iamount, setiamount] = useState('');
   const [isgst, setisgst] = useState('');
////////////////////////////////////////////////////
     const [number, setNumber] = useState('');
    const [date, setDate] = useState('');
    const [store, setStore] = useState('');
    const [remark, setRemark] = useState('');
    const [billTo, setBillTo] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [billToAddress, setBillToAddress] = useState('');
    const [transportationMode, setTransportationMode] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [supplierInvoiceNumber, setSupplierInvoiceNumber] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
   const [sup, setSup] = useState(''); // State for selected supplier
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [suppliers, setSuppliers] = useState([]); // State to store supplier data
  const [selectedSupplier, setSelectedSupplier] = useState(null); // State for selected supplier
  const [productItems, setproductItems] = useState([]); // State to store supplier data

  
////////////////////////////////////////////////////////
 
  const handleSearchChangesup = newValue => {
    setSearchQuery(newValue);
    const apiUrl = `https://euctostaging.com/prolife/api/masters/supplier/search/${searchQuery}`;

   // console.log(apiUrl);
  // Fetch reference ID options based on search query
  if (searchQuery) {
    console.log(apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Assuming 'data' is an array of supplier objects
        const options = data.map((supplier) => ({
          value: supplier.id,
          label: supplier.sup_code_sup_name,
          supplierName: supplier.sup_name,
          billToAddress: supplier.sup_address,
         }));
        setSuppliers(options);
 
      })
      .catch((error) => {
        console.error('Error fetching supplier data:', error);
      });
  } else {
    // Clear the suppliers list if there's no search query
    setSuppliers([]);
  }
  }
   
 
  const handleSubmit = () => {
    const payload = {
      date: date,
      store: store,
      supplier_id: selectedSupplier.value,
      sup_invoice_no: number,
      invoice_date: invoiceDate,
      total_amount: iamount,
      // discount: discount,
      // total_gst: totalGST,
      cgst: icgst,
      igst: icgst,
      sgst: isgst,
      // credit_card_charges: creditCardCharges,
      // payment_status: paymentStatus,
      // paid_amount: iamount,
      // balance: balance,
      product_items: productItems,
      // Other fields you might need to set separately
    };
    console.log(payload);
    if (iamount){
    // Send formData to the API using a POST request
    fetch('https://euctostaging.com/prolife/api/pharmacy/grn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response, e.g., show a success message or handle errors
        console.log('API Response:', data);
  Swal.fire({
        icon: 'success',
        title: 'GRN created successfully!',
        showConfirmButton: false,
        timer: 1800,
  })
        setiamount('');
      })
      .catch((error) => {
        console.error('API Error:', error);
        Swal.fire('Error', 'Failed to GRN.', 'error');

      });
    } else {
      Swal.fire("Entered amount is not valid, Please press 'Calculate amount' button", "", "warning");
      }
  };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [rows, setRows] = useState([]);

    const addRow = () => {
      setRows([...rows, {}]);
    };
  
    const removeRow = (index) => {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
  };

    // Handle change in other inputs within a row

    const handleInputChange = (index, column, value) => {
      const updatedRows = [...rows];
      updatedRows[index][column] = value;
 // Calculate the Amount based on the formula
 let purchase = parseFloat(updatedRows[index]['column6']) || 0;
 let quantity = parseFloat(updatedRows[index]['column10']) || 0;
      // let discountAmount = parseFloat(updatedRows[index]['column13']) || 0;
      let discountPercent = parseFloat(updatedRows[index]['column12']) || 0;
 
      let amount; // Declare amount here
      let discountAmount; // Declare amount here

      // if (discountAmount) {
      //      discountPercent = ((discountAmount / (purchase * quantity)) * 100);
      //     updatedRows[index]['column12'] = discountPercent;
         
      //   amount = purchase * quantity - discountAmount;
      // } else
        if (column === 'column12') {
          discountAmount = ((discountPercent / 100) * purchase * quantity);
          updatedRows[index]['column18'] = amount;

        // updatedRows[index]['column13'] = discountAmount;
          amount = purchase * quantity - (purchase * quantity * discountPercent / 100);
          updatedRows[index]['column18'] = amount;

      } else if(!(discountPercent)) {
          amount = purchase * quantity;
          updatedRows[index]['column18'] = amount;

      }
 
  
      ///////////////////////////////
      if (column === 'column13') {

        let amount = parseFloat(updatedRows[index]['column18']) ; // Replace 'columnXX' with the appropriate column for the total amount
        let gstPercent = parseFloat(updatedRows[index]['column13']) || 0;
 
        let cgstPercent = gstPercent / 2; // Calculate CGST percentage (half of GST)
        let sgstPercent = gstPercent / 2; // Calculate SGST percentage (half of GST)
 
        let cgstAmount = (cgstPercent / 100) * amount; // Calculate CGST amount
        updatedRows[index]['column14'] = cgstAmount;
        let sgstAmount = (sgstPercent / 100) * amount; // Calculate SGST amount
        updatedRows[index]['column15'] = sgstAmount;

 
      }
      setRows(updatedRows);
    };
 // Update the productId in a specific row when a user selects a product
//  const handleProductSelect = (index, productId) => {
//   const updatedRows = [...rows];
//   updatedRows[index].productId = productId;
//    setRows(updatedRows);
//    setSelectedProductId(productId);

   
//   };
  const handleProductSelect = (index, productId) => {
    const updatedRows = [...rows];
    updatedRows[index].productId = productId;
    setRows(updatedRows);
  };
   
  
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Store table header names

// ... (addRow, removeRow, handleInputChange functions)

const handleAmount = async () => {
  try {
    const formattedData = rows.map((row) => {
      // Construct an object using header names and row values
      const rowData = {};
      rowData['selectedProductId'] =  row.productId;

      headerNames.forEach((header, index) => {
        rowData[header] = row[`column${index + 1}`];
      });
      return rowData;
    });
         console.log('API formattedData:', formattedData);

// Calculate the required values
let totalAmount = 0;
let totalDiscount = 0;
let totalGST = 0;
let totalCGST = 0;
let totalIGST = 0;
let totalSGST = 0;
    let totalDiscountedAmount = 0;
    const productItems = [];

formattedData.forEach((rowData) => {
   let amount = rowData['Amount'] || 0;
  let discountPercent = rowData['Discount%'] || 0;
  
  totalAmount += amount;
   let CGST = rowData['CGST Amount'] || 0;  totalCGST += CGST;
  let IGST = rowData['IGST Amount'] || 0;  totalIGST += IGST;
  let SGST = rowData['SGST Amount'] || 0; totalSGST += SGST;
//   Amount
// Batch
// CGST Amount
// Discount%
// Ex Date
// Exempt Type //
// Free Quantity
// GST%
// HSN Code
// IGST Amount
// Item
// MFR//
// MRP
// P.M
// Pur Rate
// Quantity
// SGST Amount
// Tax Based On
// UOM Unit of measure
// selectedProductId  `cgst_amt`, `sgst_amt`, `igst_amt`, `exempt_type`

  const newProductItem = {
    product_master_id: rowData['selectedProductId'],
    ip: rowData[''],
    hsn_code: rowData['HSN Code'],
    batch_no: rowData['Batch'],
    exp_date: rowData['Ex Date'],
    pkg: rowData[''],
    free: rowData['Free Quantity'],
    pqty: rowData['Quantity'],
    freeqty: rowData['Free Quantity'],
    uom: rowData['UOM Unit of measure'],
    pm: rowData['P.M'],
    pur_rate: rowData['Pur Rate'],
    mrp: rowData['MRP'],
    dis_percentage: rowData['Discount%'],
    gst_percentage: rowData['GST%'],
    cgst_amt: rowData['CGST Amount'],
    igst_amt: rowData['IGST Amount'],
    sgst_amt: rowData['SGST Amount'], 
    amount: rowData['Amount'],
    tax_based_on: rowData['Tax Based On'],
  };
  //  setproductItems([...productItems, newProductItem]);
   productItems.push(newProductItem);

});
setproductItems(productItems);

    seticgst(totalCGST);
    setiigst(totalIGST);
    setisgst(totalSGST);
    setiamount(totalAmount);
 
console.log('Total Amount:', totalAmount);
console.log('totalDiscountedAmount:', totalDiscountedAmount);
 console.log('Total CGST:', totalCGST);
console.log('Total IGST:', totalIGST);
console.log('Total SGST:', totalSGST);

  } catch (error) {
    console.error('Error:', error);
  }
};

// Helper function to set table header names
const setTableHeaderNames = () => {
  const thElements = document.querySelectorAll('thead th');
  const names = Array.from(thElements)
                    .slice(1)
                    .map((th) => th.textContent.trim());
  setHeaderNames(names);
};

// Call the function to set header names when the component mounts
React.useEffect(() => {
  setTableHeaderNames();
}, []);
///////////////////fetch options for product select////////////////
useEffect(() => {
  // Fetch data from the API endpoint
  fetch('https://euctostaging.com/prolife/api/product/getCategoryForSelect2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
        // Add any other headers if needed
      },
      // body: JSON.stringify(requestBody), // Convert the request body to JSON
    })    .then(response => response.json())
    .then(data => {
      // Assuming your API response structure is as described
      setProArray(data.proArray);
      setProid(data.proid);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);
  const Suphandle = (selectedOption) => {
    // console.log(selectedOption);
    if (selectedOption) {
      setSelectedSupplier(selectedOption);
    
       if (selectedOption.billToAddress) {
        setBillToAddress(selectedOption.billToAddress);
      } else {
       
        setBillToAddress();
      }
    
      if (selectedOption.supplierName) {
        setSupplierName(selectedOption.supplierName);
      } else {
        // Handle the case where 'supplierName' is not available
        // You can set it to some default or null value
        setSupplierName();
      }
    } else {
      // Handle the case where 'selectedOption' is null or undefined
      // You can reset the state variables to default or null values
      setSelectedSupplier();
      setBillToAddress();
      setSupplierName();
    }
    
  // setPatientID(selectedOption.patientID);
};
  /////////////////////////////////////////////////////////////////////
  return (
    <div>
        <NabarAll/>
        <div className='py-5 px-3'>
            <div style={{border:'1px solid #000', borderRadius:'10px', background:'#ffff'}}>
            <div className='row pt-3 px-3'>
            <Col><h3> <FaNotesMedical size={35} className='mr-3'/>Create GRN</h3></Col>
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
            <Form.Control
              type="text"
              placeholder="PINVD2928"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="py-3">
        <Col>
          <Form.Group>
            <Form.Label>Store</Form.Label>
            <Form.Control
              as="select"
              value={store}
              onChange={(e) => setStore(e.target.value)}
            >
              <option value="" disabled>
                --select--
              </option>
              <option value="Store-1">Store-1</option>
              <option value="Store-2">Store-2</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Remark</Form.Label>
            <Form.Control
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <h4 style={{ fontFamily: 'auto', color: '#E91E63' }}>Bill to Supplier</h4>
      <hr />
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Bill To</Form.Label>
            
                      <CreatableSelect
            isClearable
            options={suppliers}
            value={selectedSupplier}
            onInputChange={handleSearchChangesup}
            // onChange={(selectedOption) => setSelectedSupplier(selectedOption)}
                      onChange={Suphandle}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Supplier Name</Form.Label>
            <Form.Control
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="py-3">
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Bill to Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Address"
              style={{ backgroundColor: '#e3e3e3' }}
              value={billToAddress}
              onChange={(e) => setBillToAddress(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="">
        <Col>
          <Form.Group>
            <Form.Label>Transportation Mode</Form.Label>
            <Form.Control
              type="text"
              value={transportationMode}
              onChange={(e) => setTransportationMode(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Vehicle Number</Form.Label>
            <Form.Control
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="py-3">
        <Col>
          <Form.Group>
            <Form.Label>Supplier Invoice Number</Form.Label>
            <Form.Control
              type="text"
              value={supplierInvoiceNumber}
              onChange={(e) => setSupplierInvoiceNumber(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Invoice Date</Form.Label>
            <Form.Control
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
 
            <div>
            <div className='py-3'>
              <Button variant="success" onClick={addRow}>Add</Button>
            </div>
      <Table striped bordered responsive>
        <thead>
          <tr style={{backgroundColor:'#343A40', color:'#ffff'}}>
           <th style={{fontFamily: 'math'}} className='text-center'>Actions</th>
            <th style={{fontFamily: 'math'}}>Item</th>
            <th style={{fontFamily: 'math'}}>MFR</th>
            <th style={{fontFamily: 'math'}}>HSN Code</th>
            <th style={{fontFamily: 'math' }}>Batch</th>
            <th style={{fontFamily: 'math' }}>Ex Date</th>
            {/* <th style={{fontFamily: 'math' }}>Package</th> */}
            {/* <th style={{fontFamily: 'math' }}>Free</th> */}
            {/* <th style={{fontFamily: 'math' }}>Package Quantity</th> */}
            <th style={{fontFamily: 'math' }}>Quantity</th>
            <th style={{fontFamily: 'math' }}>Free Quantity</th>

            <th style={{fontFamily: 'math' }}>UOM<br></br><sub style={{ fontSize: '8px' }}> Unit of measure</sub></th>
            <th style={{fontFamily: 'math' }}>P.M</th>
            <th style={{fontFamily: 'math' }}>Pur Rate</th>
            <th style={{fontFamily: 'math' }}>MRP</th>
            <th style={{fontFamily: 'math' }}>Discount%</th>
            {/* <th style={{fontFamily: 'math' }}>GST</th>
            <th style={{fontFamily: 'math' }}>CGST</th> */}
            {/* <th style={{fontFamily: 'math' }}>Exp Date</th> */}
            {/* <th style={{fontFamily: 'math' }}>Package</th> */}
            {/* <th style={{fontFamily: 'math' }}>Free</th> */}

            {/* <th style={{fontFamily: 'math' }}>Package Quantity</th> */}
            {/* <th style={{fontFamily: 'math' }}>Quantity</th> */}
            {/* <th style={{fontFamily: 'math' }}>Free Quantity</th> */}
            {/* <th style={{fontFamily: 'math' }}>VOM</th> */}
            {/* <th style={{fontFamily: 'math' }}>P.M</th> */}
            {/* <th style={{fontFamily: 'math' }}>Purchase Rate</th> */}
            {/* <th style={{fontFamily: 'math' }}>MRP</th> */}
            {/* <th style={{fontFamily: 'math' }}>Discount%</th> */}
            {/* <th style={{fontFamily: 'math' }}>Discount Amount</th> */}
            <th style={{fontFamily: 'math' }}>GST%</th>
            <th style={{fontFamily: 'math' }}>CGST Amount</th>

            <th style={{fontFamily: 'math' }}>SGST Amount</th>
            <th style={{fontFamily: 'math' }}>IGST Amount</th>
            <th style={{fontFamily: 'math'}}>Exempt Type</th>
            <th style={{fontFamily: 'math'}}>Amount</th> 
            <th style={{fontFamily: 'math'}}>Tax Based On</th> 
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>

              <td className='text-center'>
                <IoIosRemoveCircleOutline size={30} style={{color:'red', cursor:'pointer'}} onClick={() => removeRow(index)}/>
              </td>
              <td>
                <select
                  value={row.productId || ''}
                  onChange={(e) => handleProductSelect(index, e.target.value)}
                >
                  <option value="">Select a product</option>
                  {proArray.map((option, proIndex) => (
                    <option key={proid[proIndex]} value={proid[proIndex]}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={row.column2 || ''} style={{maxWidth: '10ch'} }
                  onChange={(e) => handleInputChange(index, 'column2', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column3 || ''} style={{maxWidth: '12ch'} }
                  onChange={(e) => handleInputChange(index, 'column3', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column4 || ''} style={{maxWidth: '9ch'} }
                  onChange={(e) => handleInputChange(index, 'column4', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column5 || ''} style={{maxWidth: '12ch'} } placeholder='dd/mm/yyyy'
                  onChange={(e) => handleInputChange(index, 'column5', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column6 || ''} style={{maxWidth: '8ch',backgroundColor:'#f0cfcf'} }
                  onChange={(e) => handleInputChange(index, 'column6', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column7 || ''} style={{maxWidth: '8ch'} }
                  onChange={(e) => handleInputChange(index, 'column7', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column8 || ''} style={{maxWidth: '8ch' } }
                  onChange={(e) => handleInputChange(index, 'column8', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column9 || ''} style={{maxWidth: '7ch'} }
                  onChange={(e) => handleInputChange(index, 'column9', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column10 || ''} style={{maxWidth: '8ch',backgroundColor:'#f0cfcf'} }
                  onChange={(e) => handleInputChange(index, 'column10', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column11 || ''} style={{maxWidth: '7ch'} }
                  onChange={(e) => handleInputChange(index, 'column11', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column12 || ''} style={{maxWidth: '7ch',backgroundColor:'#f0cfcf'} }
                  onChange={(e) => handleInputChange(index, 'column12', e.target.value)}
                />
              </td>
              {/* <td>
                <input
                  type="text"
                  value={row.column13 || ''} style={{maxWidth: '7ch',backgroundColor:'#f0cfcf'} }
                  onChange={(e) => handleInputChange(index, 'column13', e.target.value)}
                />
              </td> */}
              <td>
                <input
                  type="text"
                  value={row.column13 || ''} style={{maxWidth: '7ch'} }
                  onChange={(e) => handleInputChange(index, 'column13', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column14 || ''} style={{maxWidth: '7ch'} }
                  onChange={(e) => handleInputChange(index, 'column14', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column15 || ''} style={{maxWidth: '7ch'} }
                  onChange={(e) => handleInputChange(index, 'column15', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column16 || ''} style={{maxWidth: '7ch'} }
                  onChange={(e) => handleInputChange(index, 'column16', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column17 || ''} style={{maxWidth: '7ch'} }
                  onChange={(e) => handleInputChange(index, 'column17', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.column18 || ''} style={{maxWidth: '10ch'} }
                  onChange={(e) => handleInputChange(index, 'column18', e.target.value)}
                />
              </td>
              {/* <td>
                <input
                  type="text"
                  value={row.column19 || ''} style={{maxWidth: '7ch'} }
                  onChange={(e) => handleInputChange(index, 'column19', e.target.value)}
                />
              </td>
              */}
              <td>
              <select value={row.column19 || ''} onChange={(e) => handleInputChange(index, 'column19', e.target.value)}>
                 <option value="Purchase Rate">Purchase Rate</option>
                {/* <option value="option2">Sales Rate</option> */}
               
                </select>
                
            </td>

            </tr>
          ))}
        </tbody>
      </Table>
              </div>
              <div className='py-3'>
              <Button variant="success"  onClick={handleAmount}>calculate amount</Button>
            </div>
            <div className='py-4'>
              <Row>
                <Col>
                <Form.Group>
                    <Form.Label>Total SGST</Form.Label>
                    <Form.Control value={isgst} type='number'/>
                  </Form.Group>
                </Col>
                <Col>
                <Form.Group>
                    <Form.Label>Total CGST</Form.Label>
                    <Form.Control value={icgst} type='number'/>
                  </Form.Group>
                  </Col>
                  <Col>
                <Form.Group>
                    <Form.Label>Total IGST</Form.Label>
                    <Form.Control value={iigst} type='number'/>
                  </Form.Group>
                  </Col>
                  <Col>
                <Form.Group>
                    <Form.Label>Total Amount</Form.Label>
                      <Form.Control value={iamount} style={{ border: '1px solid #000',fontSize:'20px' ,color:'red',backgroundColor: 'rgb(226 226 226 / 80%)' }} type='number'/>
                  </Form.Group>
                </Col>
              </Row>
            </div>


            <div className='py-3'>
              <Button variant="success" onClick={handleSubmit}>Submit</Button>
            </div>
            </Form>
          </div>

            </div>
        </div>
    </div>
  )
}

export default GrnForm













// import React,{useState, useEffect} from 'react';
// import NabarAll from '../Navbarall';
// import {Col, Row,Form,Button,Table} from 'react-bootstrap';
// import {FaNotesMedical} from 'react-icons/fa'
// import {NavLink} from 'react-router-dom';
// import {IoChevronBackCircleOutline} from 'react-icons/io5'
// import { IoIosRemoveCircleOutline } from 'react-icons/io';

// const GrnForm = () => {
//   const [headerNames, setHeaderNames] = useState([]); 
//    const [proArray, setProArray] = useState([]);
//   const [proid, setProid] = useState([]);
//   const [selectedProductId, setSelectedProductId] = useState([]);
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     const [rows, setRows] = useState([]);

//     const addRow = () => {
//       setRows([...rows, {}]);
//     };
  
//     const removeRow = (index) => {
//       const updatedRows = rows.filter((_, i) => i !== index);
//       setRows(updatedRows);
//     };
//     // Handle change in other inputs within a row

//     const handleInputChange = (index, column, value) => {
//       const updatedRows = [...rows];
//       updatedRows[index][column] = value;
//       setRows(updatedRows);
//     };
//  // Update the productId in a specific row when a user selects a product
//  const handleProductSelect = (index, productId) => {
//   const updatedRows = [...rows];
//   updatedRows[index].productId = productId;
//    setRows(updatedRows);
//    setSelectedProductId(productId);

   
//   };
  
// /////////////////////////////////////////////////////////////////////////////////////////////////////
// // Store table header names

// // ... (addRow, removeRow, handleInputChange functions)

// const handleAmount = async () => {
//   try {
//     const formattedData = rows.map((row) => {
//       // Construct an object using header names and row values
//       const rowData = {};
//       rowData['selectedProductId'] = selectedProductId;

//       headerNames.forEach((header, index) => {
//         rowData[header] = row[`column${index + 1}`];
//       });
//       return rowData;
//     });
//     console.log('API formattedData:', formattedData);

//     // Replace 'your-api-endpoint' with your actual API endpoint
//     // const response = await axios.post('your-api-endpoint', formattedData);

//     // // Handle the API response as needed
//     // console.log('API response:', response.data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// // Helper function to set table header names
// const setTableHeaderNames = () => {
//   const thElements = document.querySelectorAll('thead th');
//   const names = Array.from(thElements)
//                     .slice(1)
//                     .map((th) => th.textContent.trim());
//   setHeaderNames(names);
// };

// // Call the function to set header names when the component mounts
// React.useEffect(() => {
//   setTableHeaderNames();
// }, []);
// ///////////////////fetch options for product select////////////////
// useEffect(() => {
//   // Fetch data from the API endpoint
//   fetch('https://euctostaging.com/prolife/api/product/getCategoryForSelect2', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json', // Set the content type to JSON
//         // Add any other headers if needed
//       },
//       // body: JSON.stringify(requestBody), // Convert the request body to JSON
//     })    .then(response => response.json())
//     .then(data => {
//       // Assuming your API response structure is as described
//       setProArray(data.proArray);
//       setProid(data.proid);
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// }, []);
   
//   /////////////////////////////////////////////////////////
//   return (
//     <div>
//         <NabarAll/>
//         <div className='py-5 px-3'>
//             <div style={{border:'1px solid #000', borderRadius:'10px', background:'#ffff'}}>
//             <div className='row pt-3 px-3'>
//             <Col><h3> <FaNotesMedical size={35} className='mr-3'/>Create GRN</h3></Col>
//             <Col style={{textAlign:'right'}}>
//               <NavLink to='/Main/Pharmacy/GrnList'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
//             </Col>
//           </div><hr/>

//           <div className='py-3 px-3'>
//             <Form>
//             <h4 style={{fontFamily: 'auto', color:'#E91E63'}}>Order Details</h4><hr/>
//             <Row>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Number</Form.Label>
//                     <Form.Control type='text' placeholder='PINVD2928'/>
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Date</Form.Label>
//                     <Form.Control type='date'/>
//                   </Form.Group>
//                 </Col>
//             </Row>
//             <Row className='py-3'>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Store</Form.Label>
//                     <Form.Control as='select'>
//                         <option value='' disabled >--select--</option>
//                         <option value='Oliment' >Oliment</option>
//                         <option value='Danick' >Danick</option>

//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Remark</Form.Label>
//                     <Form.Control type='text'/>
//                   </Form.Group>
//                 </Col>
//             </Row>

//             <h4 style={{fontFamily: 'auto', color:'#E91E63'}}>Bill to Supplier</h4><hr/>
//             <Row>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Bill To</Form.Label>
//                     <Form.Control type='text' placeholder='PINVD2928'/>
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Suppiler Name</Form.Label>
//                     <Form.Control type='text'/>
//                   </Form.Group>
//                 </Col>
//             </Row>
//             <Row className='py-3'>
//                 <Col>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Bill to Address</Form.Label>
//                     <Form.Control  as="textarea" rows={3} placeholder='Enter Address' style={{backgroundColor: '#e3e3e3'}}/>
//                 </Form.Group>
//                 </Col>
//             </Row>
//             <Row className=''>
//                 <Col>
//                    <Form.Group>
//                     <Form.Label>Transportation Mode</Form.Label>
//                     <Form.Control type='text'/>
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                    <Form.Group>
//                     <Form.Label>Vehicle Number</Form.Label>
//                     <Form.Control type='text'/>
//                   </Form.Group>
//                 </Col>
//             </Row>
//             <Row className='py-3'>
//                 <Col>
//                    <Form.Group>
//                     <Form.Label>Supplier Invoice Number</Form.Label>
//                     <Form.Control type='text'/>
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                    <Form.Group>
//                     <Form.Label>Invoice Date</Form.Label>
//                     <Form.Control type='date'/>
//                   </Form.Group>
//                 </Col>
//             </Row>

//             <div>
//             <div className='py-3'>
//               <Button variant="success" onClick={addRow}>Add</Button>
//             </div>
//       <Table striped bordered responsive>
//         <thead>
//           <tr style={{backgroundColor:'#343A40', color:'#ffff'}}>
//            <th style={{fontFamily: 'math'}} className='text-center'>Actions</th>
//             <th style={{fontFamily: 'math'}}>Item</th>
//             <th style={{fontFamily: 'math'}}>MFR</th>
//             <th style={{fontFamily: 'math'}}>HSN Code</th>
//             <th style={{fontFamily: 'math'}}>Batch</th>
//             <th style={{fontFamily: 'math'}}>Ex Date</th>
//             <th style={{fontFamily: 'math'}}>Package</th>
//             <th style={{fontFamily: 'math'}}>Free</th>
//             <th style={{fontFamily: 'math'}}>Package Quantity</th>
//             <th style={{fontFamily: 'math'}}>Quantity</th>
//             <th style={{fontFamily: 'math'}}>Free Quantity</th>

//             <th style={{fontFamily: 'math'}}>VOM</th>
//             <th style={{fontFamily: 'math'}}>P.M</th>
//             <th style={{fontFamily: 'math'}}>Pur Rate</th>
//             <th style={{fontFamily: 'math'}}>MRP</th>
//             <th style={{fontFamily: 'math'}}>Discount%</th>
//             <th style={{fontFamily: 'math'}}>GST</th>
//             <th style={{fontFamily: 'math'}}>CGST</th>
//             <th style={{fontFamily: 'math'}}>Exp Date</th>
//             <th style={{fontFamily: 'math'}}>Package</th>
//             <th style={{fontFamily: 'math'}}>Free</th>

//             <th style={{fontFamily: 'math'}}>Package Quantity</th>
//             <th style={{fontFamily: 'math'}}>Quantity</th>
//             <th style={{fontFamily: 'math'}}>Free Quantity</th>
//             <th style={{fontFamily: 'math'}}>VOM</th>
//             <th style={{fontFamily: 'math'}}>P.M</th>
//             <th style={{fontFamily: 'math'}}>Purchase Rate</th>
//             <th style={{fontFamily: 'math'}}>MRP</th>
//             <th style={{fontFamily: 'math'}}>Discount%</th>
//             <th style={{fontFamily: 'math'}}>GST%</th>
//             <th style={{fontFamily: 'math'}}>CGST Amount</th>

//             <th style={{fontFamily: 'math'}}>SGST Amount</th>
//             <th style={{fontFamily: 'math'}}>IGST Amount</th>
//             <th style={{fontFamily: 'math'}}>Exempt Type</th>
//             <th style={{fontFamily: 'math'}}>Amount</th>
//             <th style={{fontFamily: 'math'}}>Tax Based On</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => (
//             <tr key={index}>

//               <td className='text-center'>
//                 <IoIosRemoveCircleOutline size={30} style={{color:'red', cursor:'pointer'}} onClick={() => removeRow(index)}/>
//               </td>
//               <td>
//                 <select
//                   value={row.productId || ''}
//                   onChange={(e) => handleProductSelect(index, e.target.value)}>
//                   <option value="">Select a product</option>
//                   {proArray.map((option, proIndex) => (
//                     <option key={proid[proIndex]} value={proid[proIndex]}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column2 || ''}
//                   onChange={(e) => handleInputChange(index, 'column2', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column3 || ''}
//                   onChange={(e) => handleInputChange(index, 'column3', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column4 || ''}
//                   onChange={(e) => handleInputChange(index, 'column4', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column5 || ''}
//                   onChange={(e) => handleInputChange(index, 'column5', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column6 || ''}
//                   onChange={(e) => handleInputChange(index, 'column6', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column7 || ''}
//                   onChange={(e) => handleInputChange(index, 'column7', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column8 || ''}
//                   onChange={(e) => handleInputChange(index, 'column8', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column9 || ''}
//                   onChange={(e) => handleInputChange(index, 'column9', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column10 || ''}
//                   onChange={(e) => handleInputChange(index, 'column10', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column11 || ''}
//                   onChange={(e) => handleInputChange(index, 'column11', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column12 || ''}
//                   onChange={(e) => handleInputChange(index, 'column12', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column13 || ''}
//                   onChange={(e) => handleInputChange(index, 'column13', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column14 || ''}
//                   onChange={(e) => handleInputChange(index, 'column14', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column15 || ''}
//                   onChange={(e) => handleInputChange(index, 'column15', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column16 || ''}
//                   onChange={(e) => handleInputChange(index, 'column16', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column17 || ''}
//                   onChange={(e) => handleInputChange(index, 'column17', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column18 || ''}
//                   onChange={(e) => handleInputChange(index, 'column18', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column19 || ''}
//                   onChange={(e) => handleInputChange(index, 'column19', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column20 || ''}
//                   onChange={(e) => handleInputChange(index, 'column20', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column21 || ''}
//                   onChange={(e) => handleInputChange(index, 'column21', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column22 || ''}
//                   onChange={(e) => handleInputChange(index, 'column22', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column23 || ''}
//                   onChange={(e) => handleInputChange(index, 'column23', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column24 || ''}
//                   onChange={(e) => handleInputChange(index, 'column24', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column25 || ''}
//                   onChange={(e) => handleInputChange(index, 'column25', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column26 || ''}
//                   onChange={(e) => handleInputChange(index, 'column26', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column27 || ''}
//                   onChange={(e) => handleInputChange(index, 'column27', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column28 || ''}
//                   onChange={(e) => handleInputChange(index, 'column28', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column29 || ''}
//                   onChange={(e) => handleInputChange(index, 'column29', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column30 || ''}
//                   onChange={(e) => handleInputChange(index, 'column30', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column31 || ''}
//                   onChange={(e) => handleInputChange(index, 'column31', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column32 || ''}
//                   onChange={(e) => handleInputChange(index, 'column32', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column33 || ''}
//                   onChange={(e) => handleInputChange(index, 'column33', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.column34 || ''}
//                   onChange={(e) => handleInputChange(index, 'column34', e.target.value)}
//                 />
//               </td>
//               <td>
//               <select value={row.column35 || ''} onChange={(e) => handleInputChange(index, 'column35', e.target.value)}>
//                 <option value="" disabled>--Select--</option>
//                 <option value="Purchase Rate">Purchase Rate</option>
//                 <option value="option2">Option 2</option>
//                 <option value="option3">Option 3</option>
//               </select>
//             </td>

//             </tr>
//           ))}
//         </tbody>
//       </Table>
//               </div>
//               <div className='py-3'>
//               <Button variant="success"  onClick={handleAmount}>calculate amount</Button>
//             </div>
//             <div className='py-4'>
//               <Row>
//                 <Col>
//                 <Form.Group>
//                     <Form.Label>Total Amount</Form.Label>
//                     <Form.Control type='number'/>
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                 <Form.Group>
//                     <Form.Label>Net Amount</Form.Label>
//                     <Form.Control type='number'/>
//                   </Form.Group>
//                 </Col>
//               </Row>
//             </div>


//             <div className='py-3'>
//               <Button variant="success">Submit</Button>
//             </div>
//             </Form>
//           </div>

//             </div>
//         </div>
//     </div>
//   )
// }

// export default GrnForm
