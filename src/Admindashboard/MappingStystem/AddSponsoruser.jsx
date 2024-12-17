import React, { useEffect,useState } from 'react';
 
import Select from "react-select";
// import './dashboard.css'
import Sidebar from '../Sidebar';
import Header from '../Header';
import Paper from '@mui/material/Paper'; 
import {GrAddCircle} from 'react-icons/gr';
import {HiBackspace} from 'react-icons/hi';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import {MdDelete} from 'react-icons/md'
import BootstrapTable from 'react-bootstrap-table-next';
import Swal from 'sweetalert2';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';



const AddSponsoruser = () => {

  const [data, setData] = useState([]);
  const [sponsorname, setSponsorname] = useState('');
  const [sponsorOptions, setSponsorOptions] = useState([]);

  const [grade, setGrade] = useState('');
  const [section, setSection] = useState('');
  const [studentname, setStudentname] = useState('');
  const [options, setOptions] = useState([]);

///////////////////
const createMap = async (event) => {
  event.preventDefault(); // Prevent page reloading

  try {
    const studentIds = selectedOptions.map(option => option.value); 
    const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/mapSponserStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        student_id:studentIds,
        sponseriD: sponsorname,
        Grade: grade, 
       }),
    });
    const data = await response.json();
    // setInvoice([...invoice, data[0]]);
    // console.log(data[0]);
    Swal.fire({
      icon: 'success',
      title: 'Created successfully !',
      showConfirmButton: false,
      timer: 1800
    })
    console.log(data);
    
  } catch (error) {
    console.log(error);
  }

  
};
  let jsonData = [];
  const handleSubmit = (event) => {
    event.preventDefault();
    createMap();
    // studentname.forEach((val, index) => {
      
    //   var studentname = val.label;
    //   jsonData.push({
    //     sponsorname, grade,section, studentname
    //   });
    // });
    
    // if(data.length === 0) {
    //   setData([...data, jsonData]);
    // } else {
    //   data.forEach((val, index) => {
    //     jsonData.forEach((val1, index1) => {
    //       val.push(val1);
    //     });
    //   });
    // }

    // setSponsorname('');
    // setGrade('');
    // setSection('');
    // setStudentname('');

  };

  // const handleDeleteRow = (row) => {
  //   console.log(row);
  //   setData(data.filter((d) => d !== row));
  // };

  const handleDeleteRow = (index,e) => {
    console.log(index, e);
    setData(data.filter((v, i) => i !== index));
  }
  
  //getStudents
  const getStudents = async () => {
    if (grade) {
       console.log(grade);
       try { 
        const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/withoutSponsorGrades/${grade}`, {
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
           console.log(options);
           setOptions(options);
         }

      } catch (error) {
        console.log(error);
      }
    }
  }
useEffect(() => {
  // Fetch the sponsor names from the API
  fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/GetSponserall')
    .then(response => response.json())
    .then(data => {
      // Extract the sponsor names from the API response
      const sponsorNames = data.data.map(item => ({
        value: item.id.toString(),
        label: item.name
      }));      setSponsorOptions(sponsorNames);
      console.log('API Response:', data);
    })
    .catch(error => {
      console.error('Failed to fetch sponsor names:', error);
    });

}, []);

  const columns = [
    {
      dataField: 'sponsorname',
      text: 'Name',
    },
    {
      dataField: 'grade',
      text: 'Grade',
    },
    {
      dataField: 'section',
      text: 'Section',
    },
    {
      dataField: 'studentname',
      text: 'Student Names',
    },
    {
      dataField: 'delete',
      text: 'Action',
      formatter: (cellContent, row) => (
        <div className='text-center'>
          <Button variant="danger" onClick={e => handleDeleteRow(row,e)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];



      // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState();



  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);    
    setStudentname(data);
  }
  
  return (
    <div>
          <div>
       <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
      <Header/>
      <div className='p-4' style={{backgroundColor:'aliceblue'}}>
          <div>
          <Paper elevation={2} style={{paddingBottom:'100px'}}>
            <Row>
              <Col xs={11}>
               <h3 className='p-4'><GrAddCircle size={35} className='pe-2 pb-1'/>Add Sponsor Details form</h3>
              </Col>
              <Col xs={1} className='text-center'>
               <a href='/svsportaladmintest/MappingStystem/Sponsormaping'><HiBackspace style={{marginTop:'20px',color:'red'}} size={40}/></a> 
              </Col>
            </Row>
            <div className='pt-3'>
            <Form onSubmit={handleSubmit} className='container' style={{overflowX: 'inherit'}} >
              <Row>
              <Col>
                    <Form.Select aria-label="Default select example" >
                      <option >Select-Type</option>
                      <option  value="Sponsor">Sponsor</option>
                     </Form.Select>
                </Col>
                <Col>
                <Form.Select value={sponsorname} onChange={(e) => setSponsorname(e.target.value)} aria-label="Default select example">
                  <option>Sponsor Name</option>
                  {sponsorOptions.map((sponsor, index) => (
                    <option key={index} value={sponsor.value}>{sponsor.label}</option>
                  ))}
                </Form.Select>

                </Col>
              </Row>
                <Row className='py-3'>
                  <Col xs={6}>
                    <Form.Select onClick={getStudents} value={grade} onChange={(e) => setGrade(e.target.value)} aria-label="Default select example" >
                    <option  className='text-center'>Select-Grade</option>
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
              {/* onChange={(e) => setStudentname(e.target.value)} */}
              <Col>
              <Col className='pt-4'>
                        <Select
                          isMulti
                          options={options}
                          value={selectedOptions}
                          onChange={handleSelect} />
                     </Col>
                </Col>
              </Row>
               

             </Form>
            
            </div>
          </Paper>
          

          </div>
            <div className='pt-5'>
              <Button className='bg-success' type="submit" onClick={createMap} >Submit form</Button>
            </div>
          </div>
    </div>
    </div>
    </div>
  )
}

export default AddSponsoruser




// import React,{useState} from 'react';
// import Select from "react-select";
// // import './dashboard.css'
// import Sidebar from '../Sidebar';
// import Header from '../Header';
// import Paper from '@mui/material/Paper'; 
// import {GrAddCircle} from 'react-icons/gr';
// import {HiBackspace} from 'react-icons/hi';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row'
// import {MdDelete} from 'react-icons/md'
// import BootstrapTable from 'react-bootstrap-table-next';
// // import paginationFactory from 'react-bootstrap-table2-paginator';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';



// const AddSponsoruser = () => {

//   const [data, setData] = useState([]);
//   const [sponsorname, setSponsorname] = useState('');
//   const [grade, setGrade] = useState('');
//   const [section, setSection] = useState('');
//   const [studentname, setStudentname] = useState('');


//   let jsonData = [];
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     studentname.forEach((val, index) => {
      
//       var studentname = val.label;
//       jsonData.push({
//         sponsorname, grade,section, studentname
//       });
//     });
    
//     if(data.length === 0) {
//       setData([...data, jsonData]);
//     } else {
//       data.forEach((val, index) => {
//         jsonData.forEach((val1, index1) => {
//           val.push(val1);
//         });
//       });
//     }

//     setSponsorname('');
//     setGrade('');
//     setSection('');
//     setStudentname('');

//   };

//   // const handleDeleteRow = (row) => {
//   //   console.log(row);
//   //   setData(data.filter((d) => d !== row));
//   // };

//   const handleDeleteRow = (index,e) => {
//     console.log(index, e);
//     setData(data.filter((v, i) => i !== index));
// }


//   const columns = [
//     {
//       dataField: 'sponsorname',
//       text: 'Name',
//     },
//     {
//       dataField: 'grade',
//       text: 'Grade',
//     },
//     {
//       dataField: 'section',
//       text: 'Section',
//     },
//     {
//       dataField: 'studentname',
//       text: 'Student Names',
//     },
//     {
//       dataField: 'delete',
//       text: 'Action',
//       formatter: (cellContent, row) => (
//         <div className='text-center'>
//           <Button variant="danger" onClick={e => handleDeleteRow(row,e)}>
//             Delete
//           </Button>
//         </div>
//       ),
//     },
//   ];



//       // React state to manage selected options
//   const [selectedOptions, setSelectedOptions] = useState();

//   // Array of all options
//   const optionList = [
//     { value: "red", label: "Abu Sufiyan.U" },
//     { value: "green", label: "Alfiya.S" },
//     { value: "yellow", label: "Shivadheena.R" },
//     { value: "blue", label: "Mohammed Fareestha" },
//     { value: "white", label: "Rukshana rufar" },
//     { value: "ShakinaJula", label: "Shakina Jula" },
//     { value: "JulfaHaasi", label: "JulfaHaasi" },
//     { value: "ZeenuMakr", label: "ZeenuMakr" },
//     { value: "MakeDevie", label: "MakeDevie" },
//   ];

//   // Function triggered on selection
//   function handleSelect(data) {
//     setSelectedOptions(data);    
//     setStudentname(data);
//   }
  
//   return (
//     <div>
//           <div>
//        <Sidebar/>
//     <div style={{width:'82.5%',float:'right'}} >
//       <Header/>
//       <div className='p-4' style={{backgroundColor:'aliceblue'}}>

//           <Paper elevation={2} className="pb-3">
//             <Row>
//               <Col xs={11}>
//                <h3 className='p-4'><GrAddCircle size={35} className='pe-2 pb-1'/>Add Sponsor Details form</h3>
//               </Col>
//               <Col xs={1} className='text-center'>
//                <a href='/MappingStystem/Sponsormaping'><HiBackspace style={{marginTop:'20px',color:'red'}} size={40}/></a> 
//               </Col>
//             </Row>
//             <div className='pt-3'>
//             <Form onSubmit={handleSubmit} className='container'>
//               <Row>
//               <Col>
//                     <Form.Select aria-label="Default select example" >
//                       <option >Select-Type</option>
//                       <option  value="Sponsor">Sponsor</option>
//                      </Form.Select>
//                 </Col>
//                 <Col>
//                       <Form.Select value={sponsorname} onChange={(e) => setSponsorname(e.target.value)} aria-label="Default select example" >
//                         <option >Sponsor Name</option>
//                         <option value="Mark Antony">Mark Antony</option>
//                        </Form.Select>
//                 </Col>
//               </Row>
//                 <Row className='py-3'>
//                   <Col>
//                     <Form.Select value={grade} onChange={(e) => setGrade(e.target.value)} aria-label="Default select example" >
//                     <option  className='text-center'>Select-Grade</option>
//                             <option value="lkg">LKG</option>
//                             <option value="ukg">UKG</option>
//                             <option value="1">I</option>
//                             <option value="2">II</option>
//                             <option value="3">III</option>
//                             <option value="4">IV</option>
//                             <option value="5">V</option>
//                             <option value="6">VI</option>
//                             <option value="7">IIV</option>
//                             <option value="8">IIIV</option>
//                             <option value="9">IX</option>
//                             <option value="10">X</option>
//                             <option value="11">XI</option>
//                             <option value="12">XII</option>
//                     </Form.Select>
//                   </Col>
//                   <Col>
//                     <Form.Select value={section} onChange={(e) => setSection(e.target.value)} aria-label="Default select example">
//                       <option  className='text-center'>Select-Section</option>
//                             <option value="A">A</option>
//                             <option value="B">B</option>
//                             <option value="C">C</option>

//                     </Form.Select>
//                   </Col>
//                 </Row>

//               <Row>
//               {/* onChange={(e) => setStudentname(e.target.value)} */}
//               <Col>
//                 <div styles={{width:'32%'}}  >
//                   <Select 
//                     options={optionList}
//                     placeholder="Select Student"
//                     value={selectedOptions}
//                     onChange={handleSelect}
//                     isSearchable={true}
//                     isMulti/>
//                 </div>
//                 </Col>
//               </Row>
              
//               <div  style={{display:'flex',justifyContent:'end',alignContent:'end',paddingTop:'28px',paddingBottom:'20px'}}>
//               <Button variant="primary" type="submit">Add</Button>
//               </div>

//              </Form>
//              <div className='container'>
//                <BootstrapTable
//                 keyField="data"
//                 data={data[0] ?? ''}
//                 columns={columns}
//                 // pagination={paginationFactory()}
//                 // rowEvents={rowEvents}
//                   />
//              </div>
//             </div>
//           </Paper>

          
//             <div className='pt-5'>
//               <Button className='bg-success' type="submit">Submit form</Button>
//             </div>
//           </div>
//     </div>
//     </div>
//     </div>
//   )
// }

// export default AddSponsoruser


