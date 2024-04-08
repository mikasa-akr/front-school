import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Import interactionPlugin
import {
  Box,
  Button,
  Select,
  Modal,
  ModalOverlay,
  useColorModeValue,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Card from "../../../../components/Card/Card";
import SessionCreate from './SessionCreate'; // Import SessionCreate component

function CalendarDom() {
  const [events, setEvents] = useState([]); // Array to hold formatted events
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null }); // State to hold selected date range

  const bgColor = useColorModeValue("white", "gray.700");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(`/session/`);
        if (!response.data || response.data.length === 0) {
          console.error("Empty or invalid response:", response.data);
          return;
        }

        const eventObjects = response.data.map((eventData) => {
          const startDateTime = new Date(eventData.date_seance.date); 
          const endDateTime = new Date(eventData.time_end.date);

          // Extract time_start date and time
          const timeStart = new Date(eventData.time_start.date);
          startDateTime.setHours(timeStart.getHours());
          startDateTime.setMinutes(timeStart.getMinutes());

          // Extract time_end date and time
          const timeEnd = new Date(eventData.time_end.date);
          endDateTime.setHours(timeEnd.getHours());
          endDateTime.setMinutes(timeEnd.getMinutes());

          return {
            title: eventData.status,
            course: eventData.seance_course_id, 
            start: startDateTime,
            end: endDateTime,
            status: eventData.status,
          };
        });

        setEvents(eventObjects);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    }

    fetchEvents();
  }, []);

  const handleEventClick = (eventClickInfo) => {
    setSelectedEvent(eventClickInfo.event);
  };

  // Handle selection of date range
  const handleDateSelect = (selectInfo) => {
    setSelectedDates({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <Card marginTop="10%" bg={bgColor} borderRadius="20px" width={'1400px'} ml={'5%'}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Include interactionPlugin
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          selectable={true} // Enable date selection
          select={handleDateSelect} // Handle date selection event
          eventContent={(eventInfo) => (
            <Box
              style={{
                backgroundColor: eventInfo.event.extendedProps.status === 'canceled session' ? 'red' : 
                eventInfo.event.extendedProps.status === 'rattrrapage scheduling' ? 'green' : 
                eventInfo.event.extendedProps.status === 'done' ? 'blue' : '',
              }}
            >
              <b>{eventInfo.event.title}</b> (Course: {eventInfo.event.extendedProps.course})
              <br />
              {eventInfo.event.start && eventInfo.event.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              {eventInfo.event.end && eventInfo.event.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Box>
          )}
        />
      </Card>

      {/* Modal for creating session */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <SessionCreate selectedDates={selectedDates} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CalendarDom;
