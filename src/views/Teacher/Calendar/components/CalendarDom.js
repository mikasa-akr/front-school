import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, Button, Modal, Select, ModalOverlay, ModalContent,useColorModeValue, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Card from "../../../../components/Card/Card";

function CalendarDom() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [timeDifference, setTimeDifference] = useState(0);
  const id = localStorage.getItem('id'); // Assuming the token is stored in localStorage
  const bgColor = useColorModeValue("white", "gray.700");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(`/session/teacher/${id}`);
        if (!response.data || response.data.length === 0) {
          console.error("Empty or invalid response:", response.data);
          return;
        }
        
        const eventObjects = response.data.map(eventData => {
          // Convert date_seance, time_start, and time_end to Date objects
          const startDateTime = new Date(eventData.date_seance.date);
          const endDateTime = new Date(eventData.time_end.date);
          
          // Extract time_start date and time
          const timeStart = new Date(eventData.time_start.date);
          startDateTime.setHours(timeStart.getHours());
          startDateTime.setMinutes(timeStart.getMinutes());

          // Extract time_start date and time
          const timeEnd = new Date(eventData.time_end.date);
          endDateTime.setHours(timeEnd.getHours());
          endDateTime.setMinutes(timeEnd.getMinutes());
          
          return {
            title: eventData.status,
            course: eventData.seance_course_id,
            start: startDateTime,
            end: endDateTime,
            id: eventData.id,
            status: eventData.status // Include status in event object
          };
        });
        
        setEvents(eventObjects);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    }
    
    fetchEvents(); // Call fetchEvents immediately inside useEffect

  }, [id]); // Add id as a dependency to fetch new data when id changes

  const handleEventClick = (eventClickInfo) => {
    if (eventClickInfo.event.extendedProps.status === 'rattrrapage scheduling') {
      return;
    }
    setSelectedEvent(eventClickInfo.event);
    const status = eventClickInfo.event.extendedProps.status === 'canceled session';
    console.log('status', status);
    const currentTime = new Date();
    const sessionTime = eventClickInfo.event.start;
    const diffInMilliseconds = sessionTime - currentTime;
    const diffInHours = Math.abs(diffInMilliseconds / (1000 * 60 * 60));
    setStatus(status);
    setTimeDifference(diffInHours);
    setIsModalOpen(true);
  };
  
  const handleAnnulation = async (e) => {
    e.preventDefault();
    console.log("Handle annulation function called");
    console.log("Reason:", reason);
    console.log("Selected event:", selectedEvent);
    
    try {
      if (!selectedEvent) {
        console.log("Selected event is missing");
        return;
      }
  
      const formattedData = {
        reason: reason,
        date_seance: selectedEvent.start.toISOString(), // Convert date_seance to ISO string
        time_start: selectedEvent.start.toLocaleTimeString(), // Convert time_start to string
        time_end: selectedEvent.end ? selectedEvent.end.toLocaleTimeString() : '' // Convert time_end to string if selectedEvent.end is not null
      };
  
      const sessionId = selectedEvent.id;
  
      const response = await axios.post(`/reclamation/annulation/teacher/${sessionId}`, formattedData); // Use the session ID in the request URL
      
      // Update the registration status and message based on the response
      if (response.status === 201) {
        setRegistrationStatus('success');
        setRegistrationMessage('Reclamation registered successfully');
      } else {
        setRegistrationStatus('error');
        setRegistrationMessage('Failed to register reclamation');
      }
  
      setShowMessage(true); 
  
      console.log(response.data);
    } catch (error) {
      console.error("Error cancelling session:", error);
      setRegistrationStatus('error');
      setRegistrationMessage('An error occurred while registering reclamation');
      setShowMessage(true);
    }
  };
  
  const handleCreateRattrapage = async () => {
    try {
      // Perform validation checks for date and time input fields here
      
      const response = await axios.post(`/rattrapage/create/${selectedEvent.id}`, {
        date: date,
        time: time,
      });
      
        setRegistrationStatus('success');
        setRegistrationMessage('Rattrapage registered successfully');

      setShowMessage(true); 
      console.log(response.data);
    } catch (error) {
      console.error("Error creating rattrapage:", error);
      setRegistrationStatus('error');
      setRegistrationMessage('An error occurred while registration rattrapage');
      setShowMessage(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setReason('');
    setDate('');
    setTime('');
    setShowMessage(false);
  };

  return (
    <Card marginTop="10%" bg={bgColor} borderRadius={'20px'}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        eventContent={(eventInfo) => (
          <Box 
          style={{
            backgroundColor: eventInfo.event.extendedProps.status === 'canceled session' ? 'red' : 
            eventInfo.event.extendedProps.status === 'rattrrapage scheduling' ? 'green' : '',
            cursor: eventInfo.event.extendedProps.status === 'rattrrapage scheduling' ? 'default' : 'pointer'
          }}
          >
            <b>{eventInfo.event.title}</b> (Course: {eventInfo.event.extendedProps.course})
            <br />
            {eventInfo.event.start && eventInfo.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
            {eventInfo.event.end && <> <br /> {eventInfo.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>}
          </Box>
        )}
      />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{status === true ? 'Create Rattrapage' : 'Annulation'}</ModalHeader>
          <ModalBody>
            {status === true ? (
              <>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Time</FormLabel>
                  <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </FormControl>
                <Button colorScheme="blue" onClick={handleCreateRattrapage} mt={4} mr={3}>Confirm</Button>
              </>
            ) : (
              <>
                {timeDifference >= 24 ? (
                  <Button colorScheme="blue" onClick={handleAnnulation} mr={3}>Confirm</Button>
                ) : (
                  <>
                    <Select
                      id="reason"
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      placeholder="Select Reason"
                      size="md"
                      mt={4}
                    >
                      <option value="sick">Sick</option>
                      <option value="urgency">Urgency</option>
                    </Select>
                    <Button colorScheme="blue" onClick={handleAnnulation} mt={4} mr={3}>Confirm</Button>
                  </>
                )}
              </>
            )}
            <Button onClick={handleCloseModal} mt={4}>Cancel</Button>
            {showMessage && (
              <span>{registrationStatus === 'success' ? registrationMessage : registrationStatus === 'error' ? registrationMessage : ''}</span>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
}

export default CalendarDom;

