import React, { useState, useEffect } from 'react';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import format from 'date-fns/format';

const locales = {
  'en-IN': require('date-fns/locale/en-IN'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://euctostaging.com/prolife/api/appointment_list', {
          method: 'POST',
          // Add any necessary headers or authentication here
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Map the fetched data to the format expected by react-big-calendar
        const mappedEvents = data.map(appointment => ({
          title: `${appointment.patient_name} - Dr. ${appointment.doctor_name}`,
          start: new Date(appointment.appointment_date + 'T' + appointment.booked_time_slot),
          end: new Date(appointment.appointment_date + 'T' + appointment.booked_time_slot),
        }));

        setEvents(mappedEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: '10px' }}
          events={events}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: '#F759AB', 
            },
          })} />
      </div>
    </div>
  );
};

export default MyCalendar;













// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import format from 'date-fns/format';
// import parseISO from 'date-fns/parseISO';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';

// const locales = {
//   'en-IN': require('date-fns/locale/en-IN'),
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse: (str, formatStr) => parseISO(str), // Use parseISO for parsing
//   startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 0 }), // Sunday as the start of the week
//   getDay, // Include getDay
//   locales,
// });

// const MyCalendar = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // Create a function to fetch data
//     const fetchData = async () => {
//       try {
//         const response = await axios.post('https://euctostaging.com/prolife/api/appointment_list');
//         const formattedEvents = response.data.map((appointment) => ({
//           title: `${appointment.patient_name} - Dr. ${appointment.doctor_name}`,
//           start: parseISO(appointment.appointment_date + 'T' + appointment.booked_time_slot),
//           end: parseISO(appointment.appointment_date + 'T' + appointment.booked_time_slot),
//         }));

//         setEvents(formattedEvents);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     // Call the fetchData function when the component mounts
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div>
//         <Calendar
//           localizer={localizer}
//           startAccessor="start"
//           endAccessor="end"
//           events={events}
//           style={{ height: 500, margin: '10px' }} />
//       </div>
//     </div>
//   );
// };

// export default MyCalendar;





















// import React from 'react';
// import getDay from "date-fns/getDay";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";
// import format from "date-fns/format";

// const locales = {
//   "en-IN": require("date-fns/locale/en-IN"), 
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// // Dummy event data
// const events = [
//   {
//     title: 'Meeting 1',
//     start: new Date(2023, 8, 14, 10, 0), // September 14, 2023, 10:00 AM
//     end: new Date(2023, 8, 14, 11, 30), // September 14, 2023, 11:30 AM
//   },
//   {
//     title: 'Meeting 1',
//     start: new Date(2023, 8, 14, 11, 30), // September 14, 2023, 10:00 AM
//     end: new Date(2023, 8, 14, 12, 30), // September 14, 2023, 11:30 AM
//   },
//   {
//     title: 'Meeting 1',
//     start: new Date(2023, 8, 14, 12, 30), // September 14, 2023, 10:00 AM
//     end: new Date(2023, 8, 14, 1, 30), // September 14, 2023, 11:30 AM
//   },
//   {
//     title: 'Meeting 1',
//     start: new Date(2023, 8, 14, 1, 30), // September 14, 2023, 10:00 AM
//     end: new Date(2023, 8, 14, 2, 30), // September 14, 2023, 11:30 AM
//   },
//   {
//     title: 'Event 2',
//     start: new Date(2023, 8, 15, 14, 0), // September 15, 2023, 2:00 PM
//     end: new Date(2023, 8, 15, 15, 30), // September 15, 2023, 3:30 PM
//   },
//   // Add more events as needed
// ];

// const MyCalendar = () => {
//   return (
//     <div>
//       <div>
//         <Calendar
//           localizer={localizer}
//           startAccessor="start"
//           endAccessor="end"
//           events={events} // Pass the events data here
//           style={{ height: 500, margin: "10px" }}
//         />
//       </div>
//     </div>
//   );
// }

// export default MyCalendar;



















