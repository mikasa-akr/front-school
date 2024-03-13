import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
function CalendarDom() {
  const [events, setEvents] = useState([]);
  const id = localStorage.getItem('id'); // Assuming the token is stored in localStorage

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(`/session/teacher/${id}`);
        if (!response.data || response.data.length === 0) {
          console.error("Empty or invalid response:", response.data);
          return;
        }
        
        const eventObjects = response.data.map(eventData => ({
          title: eventData.status,
          course: eventData.seance_course_id, // Include course information
          start: eventData.date_seance + 'T' + eventData.time_start.padStart(5, '0'),
          end: eventData.date_seance + 'T' + eventData.time_end.padStart(5, '0'),
        }));
        
        setEvents(eventObjects);
        console.log(eventObjects)
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    }
    
    fetchEvents(); // Call fetchEvents immediately inside useEffect

  }, [id]); // Add id as a dependency to fetch new data when id changes

  return (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={(eventInfo) => (
            <div>
              <b>{eventInfo.event.title}</b> (Course: {eventInfo.event.extendedProps.course})
              <br/>
              {eventInfo.event.start && eventInfo.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
              {eventInfo.event.end && <> <br /> {eventInfo.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>}
            </div>
          )}
          
        />
    );
  }

export default CalendarDom;
