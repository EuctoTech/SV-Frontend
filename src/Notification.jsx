import React, { useState, useEffect } from "react";
import Notifications from "react-notifications-menu";
import axios from "axios";
import Swal from 'sweetalert2';


export default function Notification() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post("https://www.santhoshavidhyalaya.com/SVSTEST/api/notification", { id: sessionStorage.getItem('user_id') })
      .then((response) => {
        const notifications = response.data.data;
        // Add a "read" property to each notification object
        const dataWithReadStatus = notifications.map((notification) => ({
          ...notification,
          read: false,
        }));
        setData(dataWithReadStatus);
      })
      .catch((error) => {
        console.error("Failed to fetch notifications:", error);
      });
  }, []);

/////////// Delete//////////////
    const deleteMessage = async (id) => {
      try {
        Swal.fire({
          icon: 'success',
          title: 'Remove successfully !',
          showConfirmButton: false,
          timer: 1800,
          
        }).then(async (result) => {
          if (result.isConfirmed) {
        try{
              await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/hide-notification`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                  id: id 
                })
              });
              setData(data.filter((section) => section.id !== id));
            } 
            catch (error) {
              console.log(error)
            }
          } 
        });
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div>
    <Notifications
        height="500px"
        width="480px"
        padding="40px"
        data={data.map((res) => ({
        image: 'https://www.santhoshavidhyalaya.com/wp-content/uploads/2022/04/WhatsApp-Image-2022-04-15-at-2.05.33-PM.jpeg',
        message: (
        <div>
            <h6 style={{fontFamily: 'Roboto, Arial, sans-serif',fontWeight: '400',color: res.read ? '#000' : '#1b2a45', lineHeight: '24px'}}>
             <a  onClick={() => deleteMessage(res.id)} target="_blank" href={res.url}>{res.text}</a> 
            </h6>
          {/* <span onClick={() => deleteMessage(res.id)}  style={{color:'red',textAlign:'end'}}>Remove</span> */}
          </div>
    ),
    // detailPage: res.url,
    receivedTime: res.receivedTime,
  }))}
  header={{
    title:(
      <div>
        <h4 style={{fontFamily: 'sans-serif',paddingTop:'inherit'}}>Notifications</h4>
      </div>
    ),
    option: {onClick: () => console.log("Clicked") },
  }}/>

    </div>
  );
}