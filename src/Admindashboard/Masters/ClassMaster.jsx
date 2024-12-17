import React,{useState,useEffect} from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import {SiGoogleclassroom} from 'react-icons/si';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {FaRegEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

const ClassMaster = () => {

  const [classMaster, setClass] = useState([]);
  const [newClass, setNewclass] = useState('');
  const [editSection, setEditSection] = useState('');
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
 
  const handleClose = () => {
    setShow(false);
    setEditSection('');
    setEditId(null);
  };

  const handleShow = () => setShow(true);

  ////////////// Data LIST ////////////////////
  const fetchclass = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/class-master-read');
      const data = await response.json();
      setClass(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchclass();
  }, []);


// //////  Create Input data ///////////////////
  const createSection = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/class-master-insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          class: newClass,
          created_by: sessionStorage.getItem('user_id')
         }),
      });
      const data = await response.json();
      setClass([...classMaster, data[0]]);
      console.log(data[0]);
      Swal.fire({
        icon: 'success',
        title: 'Created successfully !',
        showConfirmButton: false,
        timer: 1800
      })
      setNewclass('');
    } catch (error) {
      console.log(error);
    }
  };

    /////////// Delete//////////////
const deleteSection = async (id) => {
  try {
    await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/class-master-delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: id 
      })
    });

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
        // Add code here to delete the input
        try {
          await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/delete-input`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              id: id 
            })
          });

          setClass(classMaster.filter((section) => section.id !== id));
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
const editclassubmit = async () => {
    try {
      const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/class-master-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: editId, 
          class: editSection, 
          created_by: sessionStorage.getItem('user_id'), 
        }),
      });
      const data = await response.json();
      setClass(classMaster.map((res) => (res.id === editId ? data.data : res)));
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

  return (
    <div>
    <Sidebar/>
      <div style={{width:'82.5%',float:'right'}} >
   <Header/>

   <div className='p-4' >
     <Paper elevation={2} className="pb-5" style={{backgroundColor:'rgb(232 232 232)'}}>
       <h3 className='p-3'><SiGoogleclassroom size={45} className='pe-2' />Class Master</h3>
       <div className='container'>
        <div className='row'>
          <div className='col-6' xs={6}>
            <FloatingLabel controlId="floatingInput" label="Enter Class" className="mb-3">
              <Form.Control  autoComplete='off'
                      value={newClass}
                      onChange={(e) => setNewclass(e.target.value)} type="text"/>
            </FloatingLabel>
          </div>
          <div className='col-6 p-2' xs={6}>
            <Button variant="success" onClick={createSection}>Submit</Button>{' '}
          </div>
        </div>


        <div className='pt-5'>
          {/* ///////////Model PopUp//////////// */}
        <Modal className='pt-5' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Class Master</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className='pb-2' controlId="floatingPassword" label="Class Name">
              <Form.Control 
              type="text"
              value={editSection}
              onChange={(e) => setEditSection(e.target.value)}/> 
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={editclassubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ///////////Model PopUp//////////// */}

          <Table striped bordered hover size="sm">
        <thead>
          <tr style={{background:'#535455',color:'#fff',textAlign:'center'}}>
            <th>Class Name</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
                    {classMaster.map((res) => (
                      <tr key={res.id} style={{ textAlign: 'center' }}>
                        <td>{res.class}</td>
                        <td>{res.created_by}</td>
                        <td>
                          <FaRegEdit
                            onClick={() => {
                              handleShow();
                              setEditSection(res.class);
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

export default ClassMaster
