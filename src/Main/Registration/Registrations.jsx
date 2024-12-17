import React,{useEffect,useState,useRef} from 'react';
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
import {Table,Button,Modal} from 'react-bootstrap';
import {IoPersonAdd} from 'react-icons/io5'
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import ReactDOM from 'react-dom';
import {Form,Row,Col} from 'react-bootstrap';
import LinearProgress from '@mui/material/LinearProgress';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';


const Registrations = () => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateRelation, setSelectedDateRelation] = useState(null);
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const [editId, setEditId] = useState('');
  const [editPatientName, setEditPatientName] = useState('');
  const [editMartialStatus, setEditMartialStatus] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editDob, setEditDob] = useState('');
  const [editGender, setEditGender] = useState('');
  const [editNativePlace, setEditNativePlace] = useState('');
  const [editOccupation, setEditOccupation] = useState('');
  const [editBranch, setEditBranch] = useState('');
  const [editPartnerName, setEditPartnerName] = useState('');
  const [editParterRelation, setEditParterRelation] = useState('')
  const [editPartnerGender, setEditPartnerGender] = useState('');
  const [editPartnerAge, setEditPartnerAge] = useState('');
  const [editPartnerDob, setEditPartnerDob] = useState('');
  const [editReferralDoctor, setEditReferralDoctor] = useState('');
  const [editReason, setEditReason] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editAddress2, setEditAddress2] = useState('');
  const [editSourceWebsite, setEditSourceWebsite] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');
  const [editAltPhoneNumber, setEditAltPhoneNumber] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhotoUrl, setEditPhotoUrl] = useState('');
  const [editIDProof, setEditIDProof] = useState('')



//////////// For Table Loading  //////////////
  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });
  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
//////////// For Table Loading  //////////////

const handleDateChange = (date) => {
  setSelectedDate(date);
  setEditDob(date.toLocaleDateString())
  // setEditDob(date.target.value)
};
const handleDateChange2 = (date) => {
  setSelectedDateRelation(date);
  setEditPartnerDob(date.toLocaleDateString())
};

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Read the selected image file as a data URL and set it as the editPhotoUrl state
          setEditPhotoUrl(reader.result);
        };
        reader.readAsDataURL(file); // Start reading the selected file as a data URL
      } else {
        // alert('Please select an image file.');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please select an image file!',
        })
      }
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);

  };


/////// Table View  ///
  useEffect(() => {
    fetch('https://euctostaging.com/prolife/api/masters/patient')
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
          targets: 22
        }
      ],
      columns: [
        {
          data: 'photo_url',
          render: function (data, type, row) {
            const dummyImageUrl = 'https://www.caribbeannationalweekly.com/wp-content/uploads/2020/09/Female-Avatar-300X300-01.jpg';
            const imageSource = data ? data : dummyImageUrl;
            return `<img src="${imageSource}" alt="Patient Image" style="max-width: 100px; max-height: 100px;" />`;
          }
        },
        { data: 'uhid'  ,defaultContent: '-'},
        { data: 'patient_name'  ,defaultContent: '-'},
        { data: 'gender'  ,defaultContent: '-'},
        { data: 'age'  ,defaultContent: '-'},
        { data: 'dob'  ,defaultContent: '-'},
        // { data: 'martial_status'  ,defaultContent: '-'},
        { data: 'partner_name'  ,defaultContent: '-'},
        { data: 'is_couple' ,defaultContent: '-'},
        { data: 'p_relation' ,defaultContent: '-'},
        { data: 'p_gender' ,defaultContent: '-'},
        { data:'p_age' ,defaultContent: '-'},
        { data:'p_dob' ,defaultContent: '-'},
        { data:'referral_doctor' ,defaultContent: '-'},
        { data:'reason' ,defaultContent: '-'},
        {
          render: function (data, type, row) {
            return `${row.address}<br>${row.address2}`;
          }
        },
        { data:'phone_number',defaultContent: '-'},
        { data:'alt_phone_number',defaultContent: '-'},
        { data:'occupation',defaultContent: '-'},
        { data:'native_place',defaultContent: '-'},
        { data:'e_mail',defaultContent: '-'},
        { data:'source_website',defaultContent: '-'},
        // { data:'branch',defaultContent: '-'},
        {
          data: 'source_url',
          render: function (data, type, row) {
            if (data) {
              return `<a href="${data}" download target="_blank" >Download</a>`;
            } else {  
              return '<div style="color:red;" >No ID Proof is available</div>';
            }
          }
        },        
        // { data:'created_by',defaultContent: '-'}, 
        {
          data: 'action',
          targets: 22,
          createdCell: (td, cellData, rowData, row, col) =>
            ReactDOM.render(
              [
                <FaRegEdit style={{ color: 'green', cursor: 'pointer' }} size={25}
                onClick={() => { handleShowModal(); getDataID(rowData.id);setEditId(rowData.id);}}  />,
                <MdDelete style={{ color: 'red', cursor: 'pointer' }} size={28} 
                onClick={() => { deletePatient(rowData.id)}}/>
              ],
              td
            )
        },
      ],
    });
  };
  
  useEffect(() => {
    if (!isLoading && tableData.length > 0) {
      initDataTable();
    }
    
  }, [isLoading, tableData]);

  const getDataID = async (datid) => {
    try {
      const response = await fetch(`https://euctostaging.com/prolife/api/masters/patient/${datid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      const {
        id,
        patient_name,
        martial_status,
        age,
        dob,
        gender,
        native_place,
        occupation,
        branch,
        partner_name,
        p_gender,
        p_age,
        p_dob,
        p_relation,
        referral_doctor,
        reason,
        address,
        address2,
        source_website,
        phone_number,
        alt_phone_number,
        e_mail,
        source_url,
        photo_url,
      } = data;

      setEditId(id);
      setEditPatientName(patient_name);
      setEditMartialStatus(martial_status);
      setEditAge(age);
      setEditDob(dob);
      setEditGender(gender);
      setEditNativePlace(native_place);
      setEditOccupation(occupation);
      setEditBranch(branch);
      setEditPartnerName(partner_name);
      setEditPartnerGender(p_gender);
      setEditPartnerAge(p_age);
      setEditPartnerDob(p_dob);
      setEditParterRelation(p_relation);
      setEditReferralDoctor(referral_doctor);
      setEditReason(reason)
      setEditAddress(address);
      setEditAddress2(address2);
      setEditSourceWebsite(source_website);
      setEditPhoneNumber(phone_number);
      setEditAltPhoneNumber(alt_phone_number);
      setEditEmail(e_mail);
      setEditIDProof(source_url);
      setEditPhotoUrl(photo_url);

    } catch (error) {
      console.log('Error fetching data for id:', datid, error);
    }
  };

//Edit Table
const editPatient = async () => {
  try {
    const response = await fetch(`https://euctostaging.com/prolife/api/masters/patient/update/${editId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: editId,
        patient_name: editPatientName,
        martial_status: editMartialStatus,
        age: editAge,
        dob: editDob,
        gender: editGender,
        native_place: editNativePlace,
        occupation: editOccupation,
        branch: editBranch,
        partner_name: editPartnerName,
        p_gender: editPartnerGender,
        p_age: editPartnerAge,
        p_dob: editPartnerDob,
        p_relation: editParterRelation,
        referral_doctor: editReferralDoctor,
        reason: editReason,
        address: editAddress,
        address2: editAddress2,
        source_website: editSourceWebsite,
        phone_number: editPhoneNumber,
        alt_phone_number: editAltPhoneNumber,
        e_mail: editEmail,
        source_url: editIDProof,
        photo_url: editPhotoUrl,
      }),
    });
    const data = await response.json();
    console.log(data);
    handleCloseModal();
    //  $('#registaion').DataTable().ajax.reload(null, false);
    if (response.ok) {
      // Successfully updated, reload the table
      await initDataTable(); 

      // table.ajax.reload();
      Swal.fire({
        icon: 'success',
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
};


  // Delete
  const deletePatient = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Patient Details!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://euctostaging.com/prolife/api/masters/patient/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setTableData((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
              Swal.fire('Deleted!', 'The Patient has been deleted.', 'success');
            } else {
              // Handle delete error response (optional)
              Swal.fire('Error', 'Failed to delete the item.', 'error');
            }
          })
          .catch((error) => {
            console.error('Error deleting item:', error);
            Swal.fire('Error', 'An error occurred while deleting the item.', 'error');
          });
      }
    });
  };

  return (
    <div>
      <Navbarall/>
      <div className='py-4 px-5'>
        <div style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
          <div className='px-5 py-3'>
            <div style={{textAlign:'end', marginBottom:'20px'}}>
              <NavLink to='/Main/Registration/FormRegistrations'>
              <Button style={{backgroundColor:'#CCA047', color:'white'}}><IoPersonAdd className='mr-2'/>Add Patient</Button></NavLink><hr/>
            </div>
 {/*--------------- Model POPUP ------------------ */}
            <Modal show={showModal} onHide={handleCloseModal} dialogClassName="large-modal-dialog" contentClassName="large-modal-content">
            <Modal.Header>
              <Modal.Title style={{fontFamily: 'sans-serif'}}>Edit Patient Registration</Modal.Title>
            </Modal.Header>
              <Modal.Body>
              <Form>
                <Form.Control  value={editId} type="hidden"  />
                  <Row>
                    <Col xs={12} md={4} style={{textAlign:'center'}}>
                    <img onChange={(e)=> setEditPhotoUrl(e.target.value) } src={editPhotoUrl || 'https://www.caribbeannationalweekly.com/wp-content/uploads/2020/09/Female-Avatar-300X300-01.jpg'} style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div className='py-3'>
                      <div>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange}/>
                          <Button className='bg-info' onClick={handleButtonClick}>Change</Button>
                      </div>
                      </div>
                    </Col>
                    <Col xs={12} md={8}>
                      <Form.Group className="mb-2">
                        <Form.Label className='mb-0'>Patient Name</Form.Label>
                        <Form.Control type="text"  value={editPatientName} onChange={(e) => setEditPatientName(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Gender</Form.Label>
                        <Form.Control as="select" value={editMartialStatus} onChange={(e)=> setEditMartialStatus(e.target.value)}>
                        <option value='' >--Select--</option>
                        <option value="Married">Male</option>
                        <option value="Single">Female</option>
                      </Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Age</Form.Label>
                        <Form.Control type="number" value={editAge} onChange={(e)=> setEditAge(e.target.value)} />
                      </Form.Group>

                      <Form.Group className='d-grid mb-3'>
                    <Form.Label style={{width: '100%', marginBottom:'0px'}}>DOB</Form.Label>
                    <DatePicker
                        placeholderText="DD/MM/YYYY"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        value={editDob}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        showMonthDropdown
                        scrollableMonthYearDropdown
                        customInput={
                          <input type="text" id="txtDate" name="SelectedDate"   style={{ cursor: 'pointer', width:'100%', height:'35px' }}/>}/>
                  </Form.Group>

                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Marital Status</Form.Label>
                        <Form.Control as="select" value={editMartialStatus} onChange={(e)=> setEditMartialStatus(e.target.value) } >
                          <option value='' >--Select--</option>
                          <option value="Married">Married</option>
                          <option value="Single">Single</option>
                          <option value="Divorced">Divorced</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Husband/Partner Name</Form.Label>
                        <Form.Control type="text" value={editPartnerName} onChange={(e)=> setEditPartnerName(e.target.value) } />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Relation name</Form.Label>
                        <Form.Control type="text" value={editParterRelation} onChange={(e)=> setEditParterRelation(e.target.value) } />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Relation Gender</Form.Label>
                        <Form.Control as="select" value={editPartnerGender} onChange={(e)=> setEditPartnerGender(e.target.value) } >
                        <option value='' >--Select--</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Relation Age</Form.Label>
                        <Form.Control type="text" value={editPartnerAge} onChange={(e)=> editPartnerAge(e.target.value) }  />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Relation DOB</Form.Label>
                          <DatePicker
                          placeholderText="DD/MM/YYYY"
                          selected={selectedDateRelation}
                          onChange={handleDateChange2}
                          value={editPartnerDob}
                          dateFormat="dd/MM/yyyy"
                          showYearDropdown
                          scrollableYearDropdown
                          showMonthDropdown
                          scrollableMonthYearDropdown
                          customInput={
                            <input type="text" id="txtDate" name="SelectedDate"   style={{ cursor: 'pointer', width:'100%', height:'35px' }}/>
                          }/>
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Referral Doctor</Form.Label>
                        <Form.Control type="text" value={editReferralDoctor} onChange={(e)=> setEditReferralDoctor(e.target.value) }  />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Reason</Form.Label>
                        <Form.Control type="text" value={editReason} onChange={(e)=> setEditReason(e.target.value) }  />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Address Line1</Form.Label>
                        <Form.Control type="text" value={editAddress} onChange={(e)=> setEditAddress(e.target.value) }  />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Address Line2</Form.Label>
                        <Form.Control type="text" value={editAddress2} onChange={(e)=> setEditAddress2(e.target.value) }  />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Phone Number</Form.Label>
                        <Form.Control type="number" value={editPhoneNumber} onChange={(e)=> setEditPhoneNumber(e.target.value) }  />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Alternative Phone Number</Form.Label>
                        <Form.Control type="number" value={editAltPhoneNumber} onChange={(e)=> setEditAltPhoneNumber(e.target.value) }  />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Occupation</Form.Label>
                        <Form.Control type="text" value={editOccupation} onChange={(e)=> setEditOccupation(e.target.value) }  />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Native Place</Form.Label>
                        <Form.Control type="text" value={editNativePlace} onChange={(e)=> setEditNativePlace(e.target.value) }  />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Email ID</Form.Label>
                        <Form.Control type="text" value={editEmail} onChange={(e)=> setEditEmail(e.target.value) }  />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Source</Form.Label>
                        <Form.Control type="text" value={editSourceWebsite} onChange={(e)=> setEditSourceWebsite(e.target.value) }  />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Branch</Form.Label>
                        <Form.Control type="text" value={editBranch} onChange={(e)=> setEditBranch(e.target.value) }  />
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Change ID Proof</Form.Label>
                        <Form.Control type="file" />
                        {/* <Form.Control type="file" value={editPartnerGender} onChange={(e)=> setEditPartnerGender(e.target.value) }  /> */}
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                <Button variant="success"  onClick={editPatient} >Save Changes</Button>
              </Modal.Footer>
            </Modal>

            {/* Table  */}
            <div>
              <div className="MainDiv">
                {isLoading ? (
                  <div className='text-center'><h5>Loading... Thank you for your patience </h5><LinearProgress  variant="buffer" value={progress} valueBuffer={buffer} /></div>
                ) : (
                  <Table striped bordered hover responsive id="registaion" className="display">
                    <thead>
                    <tr>
                        <th>Photo</th>
                        <th>UHID</th>
                        <th>Patient Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>DOB</th>
                        <th>Partner Name</th>
                        <th>Is-Couple</th>
                        <th>IC-Relation name</th>
                        <th>IC-Gender</th>
                        <th>IC-Age</th>
                        <th>IC-DOB</th>
                        <th>Referral Doctor</th>
                        <th>Reason</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Alternate Phone Number</th>
                        <th>Occupation</th>
                        <th>Native Place</th>
                        <th>Email ID</th>
                        <th>Source</th>
                        <th>ID Proof</th>
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

export default Registrations