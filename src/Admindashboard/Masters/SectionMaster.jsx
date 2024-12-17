import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper';
import { BsSignIntersectionY } from 'react-icons/bs';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'

const SectionMaster = () => {


  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState('');
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
  const fetchSections = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/section-master-read');
      const data = await response.json();
      setSections(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSections();
  }, []);


  // //////  Create Input data ///////////////////
  const createSection = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/section-master-insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          section: newSection,
          created_by: sessionStorage.getItem('user_id')
         }),
      });
      const data = await response.json();
      setSections([...sections, data[0]]);
      console.log(data[0]);
      Swal.fire({
        icon: 'success',
        title: 'Created successfully !',
        showConfirmButton: false,
        timer: 1800
      })
      setNewSection('');
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Add code here to delete the input
        try {
          await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/section-master-delete`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              id: id 
            })
          });

          setSections(sections.filter((section) => section.id !== id));
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
const editSectionSubmit = async () => {
    try {
      const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/section-master-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: editId, 
          section: editSection, 
          created_by: sessionStorage.getItem('user_id'), 
        }),
      });
      const data = await response.json();
      setSections(sections.map((section) => (section.id === editId ? data.data : section)));
      console.log(data, sections);
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
      <Sidebar />
      <div style={{ width: '82.5%', float: 'right' }}>
        <Header />

        <div className="p-4">
          <Paper elevation={2} className="pb-5" style={{ backgroundColor: 'rgb(232 232 232)' }}>
            <h3 className="p-3">
              <BsSignIntersectionY size={45} className="pe-2" />
              Section Master
            </h3>
            <div className="container">
              <div className="row">
                <div className="col-6" xs={6}>
                  <FloatingLabel  controlId="floatingInput" label="Enter Section" className="mb-0">
                    <Form.Control autocomplete='off'
                      type="text"
                      value={newSection}
                      onChange={(e) => setNewSection(e.target.value)} />
                  </FloatingLabel>
                </div>
                <div className="col-6 p-2" xs={6}>
                  <Button variant="success" onClick={createSection}>
                    Submit
                  </Button>{' '}
                </div>
              </div>


              <div className="pt-5">
                {/* ///////////Model PopUp//////////// */}
                <Modal className="pt-5" show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Section Master</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <FloatingLabel className="pb-2" controlId="floatingPassword" label="Section Name">
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
                    <Button variant="success" onClick={editSectionSubmit}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* ///////////Model PopUp//////////// */}

{/* /////////// data Table //////////// */}
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr style={{ background: '#535455', color: '#fff', textAlign: 'center' }}>
                      <th>Section Name</th>
                      <th>Created By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.map((section) => (
                      <tr key={section.id} style={{ textAlign: 'center' }}>
                        <td>{section.section}</td>
                        <td>{section.created_by}</td>
                        <td>
                          <FaRegEdit
                            onClick={() => {
                              handleShow();
                              setEditSection(section.section);
                              setEditId(section.id);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="text-success pb-1 pe-1"
                            size={28}
                            title="Edit user"
                          />
                          <MdDelete
                            onClick={() => deleteSection(section.id)}
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
  );
};

export default SectionMaster;


