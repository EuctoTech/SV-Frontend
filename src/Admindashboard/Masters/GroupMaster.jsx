import React,{useState,useEffect} from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import {MdOutlineGroupWork} from 'react-icons/md';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button' ;
import Table from 'react-bootstrap/Table';
import {FaRegEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';



const GroupMaster = () => {

  const [group, setGroup] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [newGroupDes, setNewGroupDes] = useState('');
  const [editGroup, setEditGroup] = useState('');
  const [editGroupDes, setEditGroupDes] = useState('');
  const [editId, setEditId] = useState(null);

  const handleClose = () => {
    setShow(false);
    setEditGroup('');
    setEditId(null);
  };

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchGroup = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/TwelvethGroup-master-read');
      const data = await response.json();
      setGroup(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGroup();
  }, []);

  // //////  Create Input data ///////////////////
  const createGroup = async () => {
    console.log(newGroup, newGroupDes);
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/TwelvethGroup-master-insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          group:newGroup,
          group_des:newGroupDes,
          created_by: sessionStorage.getItem('user_id')
         }),
      });
      const data = await response.json();
      setGroup([...group, data[0]]);
      console.log(data[0]);
      Swal.fire({
        icon: 'success',
        title: 'Created successfully !',
        showConfirmButton: false,
        timer: 1800
      })
      setNewGroup('');
      setNewGroupDes('');
    } catch (error) {
      console.log(error);
    }
  };

    /////////// Delete//////////////
const deleteSection = async (id) => {
  try {
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        // Add code here to delete the input
        try {
          await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/TwelvethGroup-master-delete`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              id: id 
            })
          });

          setGroup(group.filter((res) => res.id !== id));
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

//////// Edit//////////////////////////
const editGroupMaster = async () => {
  try {
    const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/TwelvethGroup-master-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: editId, 
        group:editGroup,
        group_des:editGroupDes,
        created_by: sessionStorage.getItem('user_id'), 
      }),
    });
    const data = await response.json();
    setGroup(group.map((res) => (res.id === editId ? data.data : res)));

    Swal.fire({
      icon: 'success',
      title: 'Update successfully !',
      showConfirmButton: false,
      timer: 1800
    })
    handleClose();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
         <Sidebar/>
           <div style={{width:'82.5%',float:'right'}} >
        <Header/>

        <div className='p-4' >
          <Paper elevation={2} className="pb-5" style={{backgroundColor:'rgb(232 232 232)'}}>
            <h3 className='p-3'><MdOutlineGroupWork size={45} className='pe-2' />Group Master for higher secondary</h3>
            <div className='p-3'>
            <Form>
              <Form.Group className="pb-3" controlId="formBasicEmail">
                <FloatingLabel controlId="floatingSelect" label="Select Group">
                 <Form.Select
                         value={newGroup}
                         onChange={(e) => setNewGroup(e.target.value)} required>
                    <option value="">-- Select --</option>
                    <option value="Group-I">Group-I</option>
                    <option value="Group-II">Group-II</option>
                    <option value="Group-III">Group-III</option>
                    <option value="Group-IV">Group-IV</option>
                    <option value="Group-V">Group-V</option>
                  </Form.Select>
                </FloatingLabel>
            </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel controlId="floatingTextarea2" label="Add Course">
                        <Form.Control
                        value={newGroupDes}
                        onChange={(e) => setNewGroupDes(e.target.value)}
                        as="textarea"
                        placeholder="Add Course"
                        style={{ height: '100px' }}/>
                    </FloatingLabel>
                </Form.Group>
           </Form>

           <div className='py-4'>
              <Button variant="success" onClick={createGroup}>Submit</Button>{' '}
            </div>    
      
      <div className='pt-5'>
        <Modal className='pt-5' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit group Master</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <FloatingLabel className='pb-2' controlId="floatingPassword" label="Group Name">
              <Form.Control 
               autocomplete='off'
               type="text"
               value={editGroup}
               onChange={(e) => setEditGroup(e.target.value)}  />
          </FloatingLabel> */}
                 <FloatingLabel className='pb-2' controlId="floatingSelect" label="Select Group">
                 <Form.Select
                         value={editGroup}
                         onChange={(e) => setEditGroup(e.target.value)} required>
                    <option value="">-- Select --</option>
                    <option value="Group-I">Group-I</option>
                    <option value="Group-II">Group-II</option>
                    <option value="Group-III">Group-III</option>
                    <option value="Group-IV">Group-IV</option>
                    <option value="Group-V">Group-V</option>
                  </Form.Select>
                </FloatingLabel>
          <FloatingLabel className='pb-2' controlId="floatingPassword" label="Description">
              <Form.Control 
              autocomplete='off'
              type="text"
              value={editGroupDes}
              onChange={(e) => setEditGroupDes(e.target.value)} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={editGroupMaster}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

                <Table className='pt-3' striped bordered hover size="sm">
              <thead>
                <tr style={{background:'#535455',color:'#fff',textAlign:'center'}}>
                  <th>Group</th>
                  <th>New Course</th>
                  <th>Created By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                    {group.map((res) => (
                      <tr key={res.id} style={{ textAlign: 'center' }}>
                        <td>{res.group}</td>
                        <td>{res.group_des}</td>
                        <td>{res.created_by}</td>
                        <td>
                          <FaRegEdit
                            onClick={() => {
                              handleShow();
                              setEditGroup(res.group);
                              setEditGroupDes(res.group_des);
                              setEditId(res.id);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="text-success pb-1 pe-1"
                            size={28}
                            title="Edit user"
                          />
                          <MdDelete
                            onClick={() => deleteSection(res.id)}
                            style={{ cursor: 'pointer' }}
                            className="text-danger pb-1 ps-2"
                            size={35}
                            title="Delete user"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
          </Table>
        </div>

            </div>
        </Paper>
</div>
      </div>
    </div>
  )
}
export default GroupMaster
