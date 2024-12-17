import { useState } from "react";
import Notifications from "react-notifications-menu";

const DEFAULT_NOTIFICATION = {
  image:
    "https://www.santhoshavidhyalaya.com/wp-content/uploads/2022/04/WhatsApp-Image-2022-04-15-at-2.05.33-PM.jpeg",
  message: "Notification one.",
  detailPage: "/",
  receivedTime: "12h ago"
};



export default function Notification() {
  const [data, setData] = useState([DEFAULT_NOTIFICATION]);
  const [message, setMessage] = useState("");

  const onClick = () => {
    if (message.length > 0) {
      setData([
        ...data,
        {
          ...DEFAULT_NOTIFICATION,
          message
        }
      ]);
      setMessage("");
    }
  };

  return (
    <div>
        <Notifications
          data={data}
          header={{
            title: "Notifications",
            option: { text: "View All", onClick: () => console.log("Clicked") }
          }}
          markAsRead={(data) => {
            console.log(data);
          }}/>
      </div>
  );
}
