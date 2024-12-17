import React,{useState,useEffect} from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import {MdOutlinePhotoCameraFront} from 'react-icons/md';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button' ;
import InputGroup from 'react-bootstrap/InputGroup';
import Swal from 'sweetalert2';

const UploadPic = () => {
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    const handlePhotoChange = (event) => {
      const files = Array.from(event.target.files);
      setSelectedPhotos(files);
    };
  
    const handleUpload = async () => {
      if (!selectedPhotos || selectedPhotos.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'No photos selected',
          text: 'Please select at least one photo to upload.',
          showConfirmButton: true,
        });
        return;
      }
      const formData = new FormData();
      Swal.fire({
        title: 'Uploading...',
        html: 'Please wait while the photos are being uploaded...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      for (let index = 0; index < selectedPhotos.length; index++) {
        const photo = selectedPhotos[index];
        const imageBlob = await photo.arrayBuffer();
        const jpegBlob = await new Promise((resolve) => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
    
          const img = new Image();
          img.src = URL.createObjectURL(photo);
    
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 1);
          };
        });
    
        // const jpgPhoto = new File([blob], photo.name.replace(/\.[^/.]+$/, '') + '.jpg', { type: 'image/jpeg' });
        // formData.append(`photos[${jpgPhoto.name}]`, jpgPhoto);
        // const jpegFile = new File([jpegBlob], `photo${index}.jpg`, { type: 'image/jpeg' });
        const jpegFile = new File([jpegBlob], photo.name.replace(/\.[^/.]+$/, '') + '.jpg', { type: 'image/jpeg' });
        formData.append(`photos[${index}]`, jpegFile);
      }
    
      fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/upload-photos', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Uploaded and Updated to students successfully!',
            showConfirmButton: false,
            timer: 2800,
          });
 
        })
        .catch((error) => {
          console.log(error);
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Update successfully!',
            showConfirmButton: false,
            timer: 2800,
          });
 
        });
    };
    

  return (
    <div>
    <Sidebar/>
      <div style={{width:'82.5%',float:'right'}} >
   <Header/>

   <div className='p-4' >
     <Paper elevation={2} className="pb-5" style={{backgroundColor:'rgb(244 244 244)'}}>
       <h3 className='p-3' style={{fontFamily: 'fangsong'}} ><MdOutlinePhotoCameraFront size={45} className='pe-2' />Upload Student Photo Master</h3>

       <div className='container'>

        <div className='pt-2 pb-4' >
            <h5 className='text-primary'>Instructions for uploading image</h5>
            <li>The image should be in the <u><span style={{color:'red'}}>JBG format</span></u></li>
            <li>The size of the image should be <u><span style={{color:'red'}}>less than 1MB (megabyte).</span></u> </li>
            <li>The file name should strictly consist of the <u><span style={{color:'red',fontWeight: '700'}}>Admission number only.</span></u></li>
            <li>Example : <u><i style={{color:'green'}}>AdmissionNo.jpg (0001.jpg)</i></u></li>
        </div>

       <InputGroup className="mb-3" style={{width: '45%'}}>
        <Form.Control onChange={handlePhotoChange} maxFileSize={1 * 1024 * 1024}  multiple type='file'/>
      </InputGroup>

         <div>
            <Button className='bg-success' onClick={handleUpload}>Upload Image</Button>
        </div>

       </div>
   </Paper>
</div>
 </div>
 </div>
  )
}

export default UploadPic





// import React,{useState,useEffect} from 'react';
// import Sidebar from '../Sidebar';
// import Header from '../Header';
// import Footer from '../Footer';
// import Paper from '@mui/material/Paper'; 
// import {MdOutlinePhotoCameraFront} from 'react-icons/md';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button' ;
// import InputGroup from 'react-bootstrap/InputGroup';
// import Swal from 'sweetalert2';

// const UploadPic = () => {
//     const [selectedPhotos, setSelectedPhotos] = useState([]);

//     const handlePhotoChange = (event) => {
//       const files = Array.from(event.target.files);
//       setSelectedPhotos(files);
//     };
  
//     const handleUpload = async () => {
//       const formData = new FormData();
//       Swal.fire({
//         title: 'Uploading...',
//         html: 'Please wait while the photos are being uploaded...',
//         allowOutsideClick: false,
//         allowEscapeKey: false,
//         showConfirmButton: false,
//         onBeforeOpen: () => {
//           Swal.showLoading();
//         },
//       });
//       for (let index = 0; index < selectedPhotos.length; index++) {
//         const photo = selectedPhotos[index];
//         const imageBlob = await photo.arrayBuffer();
//         const jpegBlob = await new Promise((resolve) => {
//           const canvas = document.createElement('canvas');
//           const context = canvas.getContext('2d');
    
//           const img = new Image();
//           img.src = URL.createObjectURL(photo);
    
//           img.onload = () => {
//             canvas.width = img.width;
//             canvas.height = img.height;
//             context.drawImage(img, 0, 0);
//             canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 1);
//           };
//         });
    
//         // const jpgPhoto = new File([blob], photo.name.replace(/\.[^/.]+$/, '') + '.jpg', { type: 'image/jpeg' });
//         // formData.append(`photos[${jpgPhoto.name}]`, jpgPhoto);
//         // const jpegFile = new File([jpegBlob], `photo${index}.jpg`, { type: 'image/jpeg' });
//         const jpegFile = new File([jpegBlob], photo.name.replace(/\.[^/.]+$/, '') + '.jpg', { type: 'image/jpeg' });
//         formData.append(`photos[${index}]`, jpegFile);
//       }
    
//       fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/upload-photos', {
//         method: 'POST',
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           Swal.close();
//           Swal.fire({
//             icon: 'success',
//             title: 'Uploaded and Updated to students successfully!',
//             showConfirmButton: false,
//             timer: 2800,
//           });
 
//         })
//         .catch((error) => {
//           console.log(error);
//           Swal.close();
//           Swal.fire({
//             icon: 'success',
//             title: 'Update successfully!',
//             showConfirmButton: false,
//             timer: 2800,
//           });
 
//         });
//     };
    

//   return (
//     <div>
//     <Sidebar/>
//       <div style={{width:'82.5%',float:'right'}} >
//    <Header/>

//    <div className='p-4' >
//      <Paper elevation={2} className="pb-5" style={{backgroundColor:'rgb(244 244 244)'}}>
//        <h3 className='p-3' style={{fontFamily: 'fangsong'}} ><MdOutlinePhotoCameraFront size={45} className='pe-2' />Upload Student Photo Master</h3>

//        <div className='container'>

//         <div className='pt-2 pb-4' >
//             <h5 className='text-primary'>Instructions for uploading image</h5>
//             <li>The image should be in the <u><span style={{color:'red'}}>JBG format</span></u></li>
//             <li>The size of the image should be <u><span style={{color:'red'}}>less than 1MB (megabyte).</span></u> </li>
//             <li>The file name should strictly consist of the <u><span style={{color:'red',fontWeight: '700'}}>Admission number only.</span></u></li>
//             <li>Example : <u><i style={{color:'green'}}>AdmissionNo.jpg (0001.jpg)</i></u></li>
//         </div>

//        <InputGroup className="mb-3" style={{width: '45%'}}>
//         <Form.Control onChange={handlePhotoChange} maxFileSize={1 * 1024 * 1024}  multiple type='file'/>
//       </InputGroup>

//          <div>
//             <Button className='bg-success' onClick={handleUpload}>Upload Image</Button>
//         </div>

//        </div>
//    </Paper>
// </div>
//  </div>
//  </div>
//   )
// }

// export default UploadPic
