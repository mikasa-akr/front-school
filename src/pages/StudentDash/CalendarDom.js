import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

function CalendarDom() {
  const [events, setEvents] = useState([]);
  const id = localStorage.getItem("id"); // Assuming the token is stored in localStorage

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(`/session/student/${id}`);
        if (!response.data || response.data.length === 0) {
          console.error("Empty or invalid response:", response.data);
          return;
        }

        // Map events data to FullCalendar compatible format
        const eventObjects = response.data.map((eventData) => ({
          title: eventData.status,
          course: eventData.seance_course_id, // Include course information
          start: eventData.date_seance + "T" + eventData.time_start,
          end: eventData.date_seance + "T" + eventData.time_end,
        }));

        setEvents(eventObjects);
        console.log(eventObjects);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    }

    fetchEvents(); // Call fetchEvents immediately inside useEffect
  }, [id]);

  return (
      <div style={{marginTop:'50%'}}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={[events]}
          eventContent={(eventInfo) => (
            <div style={{ color:'#ffffff' }}>
              <b>{eventInfo.event.title}</b> (Course: {eventInfo.event.extendedProps.course})
              <br />
              {eventInfo.event.start && eventInfo.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
              {eventInfo.event.end && <> <br /> {eventInfo.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>}
            </div>
          )}
        />
      </div>
    );
}

export default CalendarDom;
