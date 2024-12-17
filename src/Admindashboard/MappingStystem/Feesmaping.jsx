import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Accordion from 'react-bootstrap/Accordion';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
 import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, TextField, Button, Paper ,Typography} from '@mui/material';

 import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker"; 
import $ from 'jquery'; 
import 'datatables.net/js/jquery.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Feesmaping = () => {
  const [newInvoiceClass, setNewInvoiceClass] = useState('');
  const [newAmount, setnewAmount] = useState('');
  const [newFeesHeading, setnewFeesHeading] = useState('');
  const [newFeesSubHeading, setNewFeesSubHeading] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newAcadYear, setNewAcadYear] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show, setShow] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedOptionsStudent, setSelectedOptionsStudent] = useState([]);
  const [count,setCount]=useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [checkedStatus, setCheckedStatus] = useState({});
  const [inputValues, setInputValues] = useState(Array(subCategory.length).fill(''));
    const [Url, setUrl] = useState('');

   const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  const resetAllStates = () => {
    setnewAmount('');
    setnewFeesHeading('');
    setNewFeesSubHeading('');
    setNewDueDate('');
    setNewAcadYear('');
    setShow1(false);
    setShow2(false);
    setShow(false);
    setSubCategory([]);
    setSelectedOptionsStudent([]);
    setCount(0);
    setOptions([]);
    setSelectedOptions([]);
    setCheckedStatus({});
    setInputValues(Array(subCategory.length).fill(''));
    setUrl('');
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('');
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching data all:', error);
      }
    };

    fetchData();
  }, []);

  const [initialAmount, setInitialAmount] = useState();
  const [partialAmount, setPartialAmount] = useState();
  const [result, setResult] = useState(0);

  const handleInitialAmountChange = (event) => {
    setInitialAmount(Number(event.target.value));
  };

  const handlePartialAmountChange = (event) => {
    const partial = Number(event.target.value);
    setPartialAmount(partial);
    setResult(initialAmount - partial);
  };

  const [validated, setValidated] = useState(false);
  const [Cdate, setDate] = useState(new Date().toLocaleDateString('fr-FR'));
  
  const getStudents = async () => {
    if (newInvoiceClass ) {
      try {
        const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/studentByGrades/${newInvoiceClass}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          } 
        });
        const data = await response.json();
         if (data) {
           const options = data.map(item => ({
             value: item.id,
             label: item.concordinate_string
           }));
           setOptions(options);
         }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(event.target);

      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      data['due_date'] = Cdate;
      try {
        const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/feesmap-insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const responseData = await response.json();
          Swal.fire({
            icon: 'success',
            title: 'Created successfully !',
            showConfirmButton: false,
            timer: 1800
          })
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }

    setValidated(true);
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(event.target);

      try {
        const studentIds =  selectedOptions ? selectedOptions.map(option => option.value) : [];
        const created_by = sessionStorage.getItem('user_id');

        const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/feesmap-insertByID', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_id: studentIds,
            standard: newInvoiceClass.toString(),
            amount: newAmount.toString(),
            fees_heading: newFeesHeading,
            fees_sub_heading: newFeesSubHeading,
            due_date: Cdate,
            acad_year: newAcadYear.toString(),
            created_by: created_by.toString()
          }),
        });
        if (response.ok) {
          const responseData = await response.json();
          Swal.fire({
            icon: 'success',
            title: 'Created successfully !',
            showConfirmButton: false,
            timer: 1800
          })
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }

    setValidated(true);
  };
  const handleSubmit3 = async (event) => {
    // selectedOptionsStudent.map(option => option.value));
    const selectedValuesStudentID = selectedOptionsStudent.map(option => option.value);

    // return;
    console.log(subCategory);
    if (selectedValuesStudentID.length === 0) { // Corrected the comparison operator
      subCategory.forEach((item, index) => {
      item.Priority = index + 1;
    });
    console.log('subCategory', subCategory);
      const filteredData = subCategory.filter(item => item.isChecked === true);
      alert(filteredData.length);
    if (filteredData.length === 0) {

      Swal.fire({

        icon: 'warning',

        title: 'Validation Error',

        text: 'Please check at least one item.',

      });

      return;

    }
    console.log('filteredData', filteredData);
    try {
      if (newInvoiceClass && newFeesHeading) {
        const requestData = {
          //  Sub_Fees: subCategory,
          std: newInvoiceClass,
          Fee_Category_head: newFeesHeading,
          Fee_Category: filteredData,
          //selectedOptionsStudent
          newAcadYear: newAcadYear,
          Cdate: Cdate
        }
        console.log('requestData', requestData);

        const apiResponse = await fetch('https://santhoshavidhyalaya.com/SVSTEST/api/feesmap-insertArray', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });

        const data = await apiResponse.json();
        Swal.fire({
          icon: "success",
          title: "Saved",
          text: "Record  Added Successfully.",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Both newInvoiceClass and newFeesHeading must be defined.',
      });
    }
    } else {
      console.log(selectedValuesStudentID);  
      subCategory.forEach((item, index) => {
        item.Priority = index + 1;
      });
      console.log('subCategory', subCategory);
      const filteredData = subCategory.filter(item => item.isChecked === true);
  
      console.log('filteredData', filteredData);
      try {
        if (newInvoiceClass && newFeesHeading) {
          const requestData = {
            student_id: selectedValuesStudentID,
            std: newInvoiceClass,
            Fee_Category_head: newFeesHeading,
            Fee_Category: filteredData,
            //selectedOptionsStudent
            newAcadYear: newAcadYear,
            Cdate: Cdate
          }
          console.log('requestData', requestData);
  
          const apiResponse = await fetch('https://santhoshavidhyalaya.com/SVSTEST/api/feesmap-insertbyIDArray', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
          });
  
          const data = await apiResponse.json();
          Swal.fire({
            icon: "success",
            title: "Saved",
            text: "Record  Added to Students of Selected Class Successfully.",
          });
          setnewFeesHeading('');setSelectedOptionsStudent([]);setNewInvoiceClass('');
          
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Both newInvoiceClass and newFeesHeading must be defined.',
        });
      }
  }
  };




  
  // SELECT`id`, `Checked`, `Fee_Category`, `Sub_Fees`, `Amount`, `Acad_Year`,
    // `Priority`, `created_by`, `created_at`, `updated_at` FROM `fee_map_arrays` WHERE 1

  const feeCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setnewFeesHeading(selectedValue);
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('id');
    let url = '';
    if(option === 'SM')
      url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolmiscelfees-master-read';
    else if(option === 'HB')
      url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/hostelfee-master-read';
    else if(option === 'SF')
      url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/schoolfees-master-read';
    else if(option === 'O')
      url = 'https://www.santhoshavidhyalaya.com/SVSTEST/api/otherfees-master-read';

    fetchSections(url);
    setUrl(url);
  }

//   if (newInvoiceClass && newFeesHeading) {
//     getfeesArray();
// }
const getfeesArray = async () => {
  try {
      setSubCategory([]);
      await fetchSections(Url); // Wait for fetchSections to complete before proceeding

      if (newInvoiceClass && newFeesHeading) {
          const requestData = {
              std: newInvoiceClass,
              Fee_Category: newFeesHeading
          };

          const apiResponse = await fetch('https://santhoshavidhyalaya.com/SVSTEST/api/feesmaparray-read', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestData)
          });

          const data = await apiResponse.json();

          // Extract Sub_Fees array from data
          const subFeesArray = data[0]?.Sub_Fees ? JSON.parse(data[0].Sub_Fees) : [];
          console.log('subFeesArray ', subFeesArray);
        if (subFeesArray.length === 0) {
           // If subFeesArray is empty, display all data with Amount and Priority
          return;
            
         // setSubCategory(updatedSubCategory);
        } else {
          // Create a map to store the matched subFee by sub_heading
          const matchedSubFeesMap = {};

          // Populate matchedSubFeesMap with Sub_Fees data
          subFeesArray.forEach(subFee => {
            matchedSubFeesMap[subFee.sub_heading] = subFee;
          });

          // Update subCategory based on matchedSubFeesMap and priority
          const updatedSubCategory = [];
          subCategory.forEach(subFee => {
            const matchedSubFee = matchedSubFeesMap[subFee.sub_heading];
            if (matchedSubFee) {
              subFee.amount = matchedSubFee.amount;
              updatedSubCategory[parseInt(matchedSubFee.Priority) - 1] = subFee;
            }
          });

          console.log('updatedSubFeesArray', updatedSubCategory);

          // Fill in any missing priorities with unmatched subFees
          subFeesArray.forEach(subFee => {
            if (!updatedSubCategory[parseInt(subFee.Priority) - 1]) {
              updatedSubCategory[parseInt(subFee.Priority) - 1] = subFee;
            }
          });

          console.log('finalSubFeesArray', updatedSubCategory);

          // Set the updated subCategory state
          setSubCategory([...updatedSubCategory]);
        }// Make sure to create a new array to trigger state update
      } else {
          console.log("Both newInvoiceClass and newFeesHeading must be defined.");
      }
  } catch (error) {
      console.log(error);
  }
};



  const fetchSections = async (url) => {
    try {
      const response = await fetch(url);
    const data = await response.json();

    // Add amount and checkbox properties to each item
    const updatedData = data.data.map(item => ({
      ...item,
      amount: '0',
      isChecked: false
    }));

    setSubCategory(updatedData);
    } catch (error) {
      console.log(error);
    }
    console.log('subCategory',subCategory);

    
    // Re-fetch the data and redraw the table
  
  };

  const handleChange = (event) => {
   // setYear(event.target.value);
  };
  const onsubmit = async () => {

    console.log(subCategory);
    subCategory.forEach((item, index) => {
    item.Priority = index+1;
    });
    console.log('subCategory',subCategory);
 
     try {
  if (newInvoiceClass && newFeesHeading) {
    const requestData = {
      Sub_Fees: subCategory,
      std: newInvoiceClass,
      Fee_Category: newFeesHeading
    }
    const apiResponse = await fetch('https://santhoshavidhyalaya.com/SVSTEST/api/feesmaparray-insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    const data = await apiResponse.json();
    Swal.fire({
      icon: "success",
      title: "Saved",
      text:  "Record  Added Successfully.",
    });
  }
} catch (error) {
       console.log(error);
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Both newInvoiceClass and newFeesHeading must be defined.',
    });
}



    
   };
  const handleSelectChangeStudent = (selectedOptions) => {
    setSelectedOptionsStudent(selectedOptions);
  };
  // useEffect(() => {
  //   $('#dataTable').DataTable({ 
  //     language: {
  //       emptyTable: "",
  //       zeroRecords: "",
  //     },
  //     paging: false // Disable pagination
  //   });
  // }, []);
  
  const inc=()=>{
    setCount(count+1);
  }
  const dec=()=>{
    setCount(count-1);
  }
  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    
    // Create a copy of the subCategory array
    const newSubCategory = [...subCategory];
    
    // If the input is a checkbox
    if (type === 'checkbox') {
      // Update the isChecked state
      newSubCategory[index].isChecked = checked;
    } else {
      // For other inputs (assuming it's a text input)
      // Update the value and amount at the specified index
      if (value.trim() !== '') { // Check if value is not empty
        newSubCategory[index].value = value;
        newSubCategory[index].amount = value; // Assuming amount is also set to value
      }
    }
    
    // Update the state with the new subCategory array
    setSubCategory(newSubCategory);
  };
  
  

  const handleDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list
  
    // Create a copy of the subCategory array
    const items = [...subCategory];
  
    // Remove the reordered item from its original position
    const [reorderedItem] = items.splice(result.source.index, 1);
  
    // Insert the reordered item at its new position
    items.splice(result.destination.index, 0, reorderedItem);
  
    // Update the state with the reordered subCategory array
    setSubCategory(items);
    console.log(subCategory);
  };
  
//   const handleChangestd = async (e) => {
//     try {
//         await setNewInvoiceClass(e.target.value); // Wait until setNewInvoiceClass is done
//         await Promise.all([getfeesArray(), getStudents()]); // Call both functions concurrently after setting newInvoiceClass
//     } catch (error) {
//         console.error('An error occurred:', error);
//     }
// };

  const handleChangestd = async (e) => {
    resetAllStates();
  setNewInvoiceClass(e.target.value); // Set newInvoiceClass immediately
};

useEffect(() => {
  // Define an async function to fetch fees and students
  const fetchData = async () => {
      try {
          await Promise.all([getfeesArray(), getStudents()]); // Wait for both functions to complete
      } catch (error) {
          console.error('An error occurred:', error);
      }
  };

  // Check if newInvoiceClass is set and then fetch data
  if (newInvoiceClass !== null) {
      fetchData(); // Call fetchData function after newInvoiceClass is set 
  }
}, [newInvoiceClass]); // Run the effect whenever newInvoiceClass changes


  
  return (
    <div>
      <Sidebar/>
      <div style={{width:'82.5%',float:'right'}} >
        <Header />
        <div className='px-2 py-1'>
            <h4>Fee Mapping</h4>
            <hr className='feeMapping'/>
          </div>
        <div className='p-4' style={{ backgroundColor: '#F7F7F7' }}>
          <Row>
          <Col className="col-3">  
           <Typography className="" >Select Class:</Typography>
                  <Form.Select name='standard' value={newInvoiceClass}
                       onChange={handleChangestd}
                       >
                            <option>Select Class</option>
                            <option value="lkg">LKG</option>
                            <option value="ukg">UKG</option>
                            <option value="1">I</option>
                            <option value="2">II</option>
                            <option value="3">III</option>
                            <option value="4">IV</option>
                            <option value="5">V</option>
                            <option value="6">VI</option>
                            <option value="7">VII</option>
                            <option value="8">VIII</option>
                            <option value="9">IX</option>
                            <option value="10">X</option>
                            <option value="11">XI</option>
                            <option value="12">XII</option>
            </Form.Select>
   </Col>
   </Row>   
          
          <Row>
          <div className='p-4' style={{backgroundColor:'#F7F7F7'}}>
        <div className='px-2 py-1'>
         {/* <hr className='feeMapping'/> */}
          </div>
          
          <Row>
            <Col className="col-3 pb-3">
           <Typography className="" >Fee Category<span style={{ color: 'red' }}>*</span>:</Typography>
            <Form.Select required value={newFeesHeading}   className='custom-input' name="fees_heading" onChange={feeCategoryChange} style={{width:'100%',height:'35px'}}>
            <option>Select Fee Category</option>
                <option value="School Fees" id="SF">School Fees</option>
                {/* <option value="Other Miscellaneous bill" id="SM">Other Miscellaneous bill</option> */}
                <option value="Hostel Bill" id="HB">Hostel Bill</option>
                {/* <option value="Other Hostel and Educational Expenditure" id="O">Other Hostel and Educational Expenditure</option> */}
            </Form.Select>
            </Col>
            <Col className='col-3 pt-0'>
              <FormControl fullWidth>
              <Typography className="" >Acad Year:</Typography>
                      <Form.Control placeholder='Enter Academic year' value={newAcadYear} onChange={(e)=> setNewAcadYear (e.target.value)} name="acad_year" style={{width:'100%',height:'35px'}} />
                   </FormControl>
            </Col>
            <Col className='col-3 pt-0'>
            <Typography className="" >Date:</Typography>
              <DatePicker className=''
                dateFormat="dd/MM/yyyy"
                style={{width:'100%',height:'35px'}}
                    value={Cdate}
                    onChange={(date) => { 
                      const d = new Date(date).toLocaleDateString('fr-FR');
                      console.log(d);
                      setNewDueDate(d);
                    }}/>
                     </Col>
            
          </Row>
       <Row>
  {/* <div className="pt-5 d-flex" style={{ margin: "auto", width: "100%", border: "5px solid #dfdfdf", padding: "52px", backgroundColor: "#e6e6e6" }}>
  
  </div> */}


   <Col className="col-6">  
      
          <Typography className=""> Select Student : </Typography>
 
        <Select
                isMulti
        options={options}
        value={selectedOptionsStudent}
                onChange={handleSelectChangeStudent}
                menuPortalTarget={document.body} // Render the menu outside of its parent container
        styles={{
          control: (provided) => ({
            ...provided,
            maxHeight:'800px',
            overflowY: 'auto'  ,           // Adjust width as needed
            menu: (provided) => ({
              ...provided,
              height: '50px', //
              position: 'absolute', // Set position to fixed
              zIndex: 9999, // Set a high zIndex to overlay other elements
            }),
          }),
         }}
              />
        </Col>
    </Row>
          

        </div>          
      </Row>

      <Paper elevation={2} className='px-4 py-4'>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell>Check</TableCell>
              <TableCell>Sub Fees</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Priority</TableCell>
            </TableRow>
              </TableHead>
              
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="rows">
              {(provided) => (
                <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                  {subCategory.map((item, index) => (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                      {(provided) => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            '&:nth-of-type(even)': {
                              backgroundColor: '#f2f2f2', // Alternate row background color
                            },
                          }}
                        >
                          <TableCell>
                            <input
  type="checkbox"
  name={item.sub_heading}
  value={item.sub_heading}
  checked={subCategory[index].isChecked || false} // Assuming isChecked property exists in subCategory
  onChange={(e) => handleInputChange(e, index)}
  style={{
    transform: 'scale(1.2)',
    width: '35%',
    backgroundColor: '#E6E6E6',
    color: '#000000',
    borderRadius: '50%',
  }}
/>

                          </TableCell>
                          <TableCell><strong>{item.sub_heading}</strong></TableCell>
                          <TableCell>
                       <input
  type="text"
  value={item.amount}
  onChange={(e) => handleInputChange(e, index)} // Attach onChange event handler
  style={{ height: '50px', paddingLeft: '25px', backgroundColor: '#aa656545' }}
/>
                          </TableCell>
                          <TableCell>
                            {item.sub_heading && index + 1} {/* Render index only if there is content */}
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
  
      <hr className='mb-8 my-8' />
        <div style={{ display: 'flex', justifyContent: 'left'}} className='ml-4'>
          <div style={{ paddingRight:'40px', paddingLeft:'140px'}} >  
            <button className="btn btn-warning py-2 px-7 " type="submit" onClick={handleSubmit3} >
              <h6 className="mb-0 text-danger">Submit</h6>
            </button>
          </div>
          <div style={{ paddingRight:'70px'}} > 
            <button className="btn btn-primary py-2 px-4" type="submit" onClick={onsubmit}>
              <h6 className="mb-0 text-white">Save Record</h6>
            </button>
          </div>
        </div>

        <hr className='mb-8 my-8'/>
      </Paper>

    </div>
  </div>
</div>
);
}

export default Feesmaping;
