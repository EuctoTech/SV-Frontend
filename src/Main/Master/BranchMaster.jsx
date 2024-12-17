import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Navbarall from '../Navbarall';
import {NavLink} from 'react-router-dom';
import {IoChevronBackCircleOutline} from 'react-icons/io5'
import {Row,Col,Table,Button,Modal} from 'react-bootstrap';
import {FaRegEdit} from 'react-icons/fa';
import {MdDelete, MdOutlineTextRotationAngleup} from 'react-icons/md';
import {BsHospital} from 'react-icons/bs';
import Swal from 'sweetalert2';


const BranchMaster = () => {
  const [branch, setBranch] = useState([]);
  const [newCode, setNewCode] = useState('');
  const [newBranchName, setNewBranchName] = useState('');
  const [newEmail, setNewEmail] = useState('')
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null)
  const [editCode, setEditCode] = useState('')
  const [editBranchName, setEditBranchName] = useState('')
  const [editEmailID, setEditEmailId] = useState('')



  const handleClose = () => {
    setEditEmailId('')
    setEditBranchName('')
    setEditCode('')
    setShow(false);
    setEditId(null);
  };

  const handleShow = () => setShow(true);
  
  // fetchBranch
  const fetchBranch = async () => {
    try {
      const response = await fetch('https://euctostaging.com/prolife/api/masters/branches');
      const data = await response.json();
      setBranch(data);
    } catch (error) {
      console.log(error);
      setBranch([]); 
    }
  };
  useEffect(() => {
    fetchBranch();
  }, []);

  //////// Edit//////////////////////////
const editBranchMaster = async () => {
  try {
    const response = await fetch(`https://euctostaging.com/prolife/api/masters/branches/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: editId,
        code:editCode,
        branch_name:editBranchName,
        email:editEmailID,
      }),
    });
    const data = await response.json();
    setBranch(branch.map((res) => (res.id === editId ? data : res)));
    Swal.fire({
      icon: 'success',
      title: 'Created successfully !',
      showConfirmButton: false,
      timer: 1800
    })
    handleClose();
  } catch (error) {
    console.log(error);
  }
};

//Edit Table By id////
  const getDataID = async (getid) => {
     try {
      const response = await fetch(`https://euctostaging.com/prolife/api/masters/branches/${getid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      const { id,code,branch_name,email} = data;
      setEditId(id);
      setEditCode(code);
      setEditBranchName(branch_name);
      setEditEmailId(email);
    } catch (error) {
      console.log('Error fetching data for id:', getid, error);
    }
  };

//////////  Create Input data ///////////////////
const createSection = async () => {
  try {
    const response = await fetch(`https://euctostaging.com/prolife/api/masters/branches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        code: newCode,
        branch_name: newBranchName,
        email: newEmail,
       }),
    });
    const data = await response.json();
    setBranch([...branch, data[0]]);
    console.log(data);
    Swal.fire({
      icon: 'success',
      title: 'Created successfully !',
      showConfirmButton: false,
      timer: 1800
    })
    setNewCode('');
    setNewBranchName('');
    setNewEmail('') 
    fetchBranch();
  } catch (error) {
    console.log(error);
  }
};

const deleteBranch = async (id) => {
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
          await fetch(`https://euctostaging.com/prolife/api/masters/branches/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              id: id 
            })
          });

          setBranch(branch.filter((res) => res.id !== id));
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
        // Code to execute if the user clicks "Cancel"
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


  return (
    <div>
      <Navbarall/>
       <div className='pt-5 px-4 py-4'>
         <div  style={{border:'1px solid #000', backgroundColor:'#ffff', borderRadius:'10px'}}>
          <div className='row pt-3 px-3'>
            <Col><h3> <BsHospital size={35} className='mr-3'/>BRANCH MASTER</h3></Col>
            <Col style={{textAlign:'right'}}>
              <NavLink to='/Main/Master/Masters'> <IoChevronBackCircleOutline size={36} style={{color:'red', cursor:'pointer'}}/></NavLink>
            </Col>
          </div><hr/>
          <Modal className='pt-5' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Branch Master</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className='py-3'>
              <Form.Control value={editCode} onChange={(e)=> setEditCode(e.target.value)} size="lg" type="text" placeholder="Branch Code" style={{ fontFamily: 'initial', marginRight: '10px' }} />
            </Form.Group>   
            <Form.Group className='pb-3'>
              <Form.Control value={editBranchName} onChange={(e)=>setEditBranchName(e.target.value) } size="lg" type="text" placeholder="Branch Name" style={{ fontFamily: 'initial', marginRight: '10px' }} />
            </Form.Group>   
            <Form.Group>
              <Form.Control value={editEmailID} onChange={(e)=>setEditEmailId(e.target.value) } size="lg" type="text" placeholder="Branch Email" style={{ fontFamily: 'initial', marginRight: '10px' }} />
            </Form.Group>   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success"  onClick={editBranchMaster}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
          <div className='py-3 px-5'>
            <Form>
              <Row>
                <Col xs={12} md={2} className='pb-2'>
                  {/* <Form.Control value={newCode} onChange={(e)=> setNewCode(e.target.value)} size="lg" type="text" placeholder="Branch Code" style={{ fontFamily: 'initial', marginRight: '10px' }} /> */}
                  <Form.Control
                    value={newCode}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const isValidInput = /^$|^[A-Z]{0,2}$/.test(inputValue);
                      if (isValidInput) {
                        setNewCode(inputValue);
                      } else {
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops... wrong Branch Code!',
                              text: 'Invalid input! Please enter 0 to 2 UPPERCASE letters only!',
                              confirmButtonText: 'Got It'
                            })
                      }
                    }}
                    size="lg" type="text" placeholder="Branch Code" style={{ fontFamily: 'initial', marginRight: '10px' }}/>


                </Col>
                <Col xs={12} md={4} className='pb-2'>
                  <Form.Control value={newBranchName} onChange={(e)=> setNewBranchName(e.target.value)} size="lg" type="text" placeholder="Enter Branch Name" style={{ fontFamily: 'initial', marginRight: '10px' }} />
                </Col>
                <Col xs={12} md={4} className='pb-2'>
                  <Form.Control value={newEmail} onChange={(e)=> setNewEmail(e.target.value)} size="lg" type="text" placeholder="Enter Email ID" style={{ fontFamily: 'initial', marginRight: '10px' }} />
                </Col>
                <Col xs={12} md={2} className='pb-2'>
                  <Button onClick={createSection} style={{ fontFamily: 'math', backgroundColor:'#CCA047',height: '46px',width: '100%' }}>Enter Branch</Button>
                </Col>
              </Row>
            </Form>
          </div>
          <div className='container'>
          <Table striped bordered hover>
              <thead>
                <tr style={{ textAlign: 'center' }}>
                  <th>Branch Code</th>
                  <th>Branch Name</th>
                  <th>Branch Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {branch.map((res) => (
                <tr key={res?.id} style={{ textAlign: 'center' }}>
                  <td>{res?.code}</td>
                  <td>{res?.branch_name}</td>
                  <td>{res?.email}</td>
                  <td>
                    <FaRegEdit onClick={()=>{ handleShow(); getDataID(res.id); setEditId(res.id);}} style={{ cursor: 'pointer' }} className="text-success pb-1 pe-1" size={28} title="Edit user" />
                    <MdDelete onClick={() => deleteBranch(res.id)} style={{ cursor: 'pointer' }} className="text-danger pb-1 ps-2" size={35}title="Delete user" />
                  </td>
                </tr>
              ))}
           </tbody>
            </Table>
          </div>
         </div>
       </div>
    </div>
  )
}

export default BranchMaster
{/* <h5 style={{ fontFamily: 'system-ui' }}>Enter Branch Name</h5>
<div style={{ display: 'flex', alignItems: 'center' }}>
  <Form.Control size="lg" type="text" placeholder="Enter Branch Name" style={{ fontFamily: 'initial', marginRight: '10px' }} />
  <Button style={{ fontFamily: 'math', backgroundColor:'#CCA047',height: '46px',width: '15%' }}>Enter Branch</Button>
</div> */}