import React,{useRef,useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import Header from '../Header';
import Sidebar from '../Sidebar';
import SvsInvoice from '../Svs-invoice.jpg';
import {Form,Col,Row,Button} from 'react-bootstrap'
import {TfiControlBackward} from 'react-icons/tfi'
import {AiOutlinePrinter} from 'react-icons/ai';
import {useReactToPrint} from 'react-to-print';
import Swal from 'sweetalert2';

const NodueForm = () => {

  const [viewProfile, setViewProfile] = useState([]);

  ///For Print
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `No Due From`,
    onBeforePrint: () => {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Printing...',
        showConfirmButton: false,
        timer: 1000,
      });
    },
    onAfterPrint: () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'File Downloaded Successfully',
        showConfirmButton: false,
        timer: 1700,
      });
    },
  });

  // const queryParameters = new URLSearchParams(window.location.search)
  // const id = queryParameters.get("id") 
  // console.log('urlid',id);
  const { id } = useParams();
  console.log('url id', id);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://santhoshavidhyalaya.com/SVSTEST/api/student/nodues/${id}/selectbyid`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log('data',data);

      if (data && data.length > 0) {
        setViewProfile(data[0]);
      } else {
        setViewProfile(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);



  return (
    <div>
     <Sidebar/>
      <div style={{width:'82.5%',float:'right'}} >
        <Header/>
          <div className='p-4'>
            <div className='py-4'>
              <Row>
                <Col className='d-flex'>
                    <Button onClick={handlePrint}  style={{marginLeft:'10px'}} variant="outline-success"><AiOutlinePrinter size={25} className='m-1'/>Print now</Button>
                </Col>
                <Col className='text-end'>
                   <a href='/svsportaladmintest/Admindashboard/NoDueForm/NodueTable'><TfiControlBackward size={35} style={{color:'red'}}/></a>
                </Col>
              </Row><hr/>
            </div>
{/*-------- Form ------------ */}
<div ref={componentRef} className='pt-3 container' >
        <div style={{ borderRadius: '10px', border: '1px solid #000', backgroundColor: '#ffff' }}>
           <div>
           {viewProfile && viewProfile.student_info ? (
              <div
                style={{
                  borderRadius: '10px',
                  border: '1px solid #000',
                  backgroundColor: '#ffff',
                }}>
                <div className='text-center'>
                  <img
                    style={{ width: '15%', marginTop: '10px',marginBottom: '10px' }}
                    src={SvsInvoice}
                    alt='school Logo'/>
                  <h2 style={{ fontFamily: 'sans-serif' }}>
                    Santhosha Vidhyalaya higher secondary school
                  </h2>
                  <u>
                    <h1 style={{ fontFamily: 'sans-serif' }}>
                      No Due Certificate
                    </h1>
                  </u>
                </div>
                <hr />
                <div className='text-end'>
                  <h5 className='me-5 pt-2' style={{ fontFamily: 'sans-serif' }}>
                    Date: 03/10/2023
                  </h5>
                </div>
                <div className='px-4 py-4'>
                  <Row>
                    <Col>
                      <h4 style={{ fontFamily: 'sans-serif' }}>
                        Name of Student: {viewProfile.student_info.name}
                      </h4>
                    </Col>
                    <Col className='text-end'>
                      <h4 style={{ fontFamily: 'sans-serif' }}>
                        Admission no: {viewProfile.student_info.admission_no}
                      </h4>
                    </Col>
                  </Row>
                  <Row className='py-3'>
                    <Col>
                      <h4 style={{ fontFamily: 'sans-serif' }} className='me-4'>
                        Class & Grade: {viewProfile.student_info.standard}{' '}
                        {viewProfile.student_info.sec}
                      </h4>
                    </Col>
                  </Row>
                  <h5 className='text-center mt-4'>
                    We hereby certify that there are NO OUTSTANDING FEE DUES for the
                    student mentioned above
                  </h5>
                  <Row style={{ marginTop: '200px' }}>
                    <Col>
                      <hr />
                      <h4 style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
                        Class Teacher sign
                      </h4>
                    </Col>
                    <Col>
                      <hr />
                      <h4 style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
                        Accountant sign
                      </h4>
                    </Col>
                    <Col>
                      <hr />
                      <h4 style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
                        No due seal
                      </h4>
                    </Col>
                  </Row>
                </div>
              </div>
            ) : (
              // Render a message or component when no data is found
              <p>No data found for the given ID.</p>
            )}
     
</div>


        </div>
        </div>
      </div>
     </div>
   </div>
  )
}

export default NodueForm
