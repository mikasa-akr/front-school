import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, Button, Modal, Select, ModalOverlay, ModalContent, useColorModeValue, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input } from "@chakra-ui/react";
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
  const [selectedReclamationType, setSelectedReclamationType] = useState('');
  const [selectedAction, setSelectedAction] = useState(null);
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(`/session/teacher/${id}`);
        if (!response.data || response.data.length === 0) {
          console.error("Empty or invalid response:", response.data);
          return;
        }
  
        const eventObjects = response.data.map(async eventData => {
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
  
          // Check if the session is active and if it's past 24 hours from the start date
          const currentTime = new Date();
          const sessionTime = startDateTime;
          const diffInMilliseconds = sessionTime - currentTime;
          const diffInHours = Math.abs(diffInMilliseconds / (1000 * 60 * 60));
          const sessionTimePlus24Hours = new Date(startDateTime.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours to session time

          if (eventData.status != 'done' && sessionTimePlus24Hours < currentTime) {
            // Call the API to mark the session as "perdu"
            try {
              await axios.post(`/session/perdu/${eventData.id}`);
              eventData.status = 'perdu'; // Update the status in the event object
            } catch (error) {
              console.error("Error marking session as perdu:", error);
            }
          }
  
  
          return {
            title: eventData.status,
            course: eventData.seance_course_id,
            start: startDateTime,
            end: endDateTime,
            id: eventData.id,
            status: eventData.status // Include status in event object
          };
        });
  
        const resolvedEvents = await Promise.all(eventObjects);
        setEvents(resolvedEvents);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    }    
  
    fetchEvents();
  }, [id]);
  

  const handleEventClick = (eventClickInfo) => {
    if (eventClickInfo.event.extendedProps.status === 'rattrrapage scheduling' || eventClickInfo.event.extendedProps.status === 'done' || eventClickInfo.event.extendedProps.status === 'perdu' ) {
      return;
    }
    else if (eventClickInfo.event.extendedProps.status === 'active') {
      setSelectedReclamationType(' '); // Set the default reclamation type to 'annulation' for active sessions
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

  const handleReclamation = async (e) => {
    e.preventDefault();
    
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
  
      const response = await axios.post(`/reclamation/teacher/reclame/${sessionId}`, formattedData); // Use the session ID in the request URL
      
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
      console.error("Error reclamation session:", error);
      setRegistrationStatus('error');
      setRegistrationMessage('An error occurred while registering reclamation');
      setShowMessage(true);
    }
  };
  
  const handleCreateRattrapage = async () => {
    try {
      const response = await axios.post(`/rattrapage/create/${selectedEvent.id}`, {
        date: date,
        time: time,
      });
      if (response.status === 200) {
        console.log('Rattrapage created successfully:', response.data.message);
        setRegistrationStatus('success');
        setRegistrationMessage('Rattrapage created successfully');
      } else {
        console.error('Failed to create rattrapage:', response.data.error);
        setRegistrationStatus('error');
        setRegistrationMessage('Failed to create rattrapage');
      }
    } catch (error) {
      console.error('Error creating rattrapage:', error);
      setRegistrationStatus('error');
      setRegistrationMessage('An error occurred while creating rattrapage');
    }
    setShowMessage(true);
  };
  
  const handleCompleteSession = async () => {
    try {
      const response = await axios.post(`/facture/teacher/complete/${selectedEvent.id}`);
      if (response.status === 201) {
        setRegistrationStatus('success');
        setRegistrationMessage('Session completed successfully');
      } else {
        setRegistrationStatus('error');
        setRegistrationMessage('Failed to complete session');
      }
      setShowMessage(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error completing session:", error);
      setRegistrationStatus('error');
      setRegistrationMessage('An error occurred while completing session');
      setShowMessage(true);
    }
  };

  const handleCloseModal = async () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setReason('');
    setDate('');
    setTime('');
    setShowMessage(false);
  
    // Check if the session is active and if the current date has passed the session date
    if (
      selectedEvent &&
      selectedEvent.extendedProps.status === 'active' &&
      new Date() > selectedEvent.start
    ) {
      try {
        // Calculate the time difference between the current date and the session start date
        const currentTime = new Date();
        const sessionTime = selectedEvent.start;
        const diffInMilliseconds = currentTime - sessionTime;
        const diffInHours = Math.abs(diffInMilliseconds / (1000 * 60 * 60));
  
        // If 24 hours have passed since the session start date, simulate marking the session as 'perdu'
        if (diffInHours >= 24) {
          // Simulating marking the session as 'perdu' by updating the event object
          const updatedEvent = { ...selectedEvent };
          updatedEvent.extendedProps.status = 'perdu';
          setEvents(prevEvents => prevEvents.map(event => event.id === selectedEvent.id ? updatedEvent : event));
          
          // Display success message
          setRegistrationStatus('success');
          setRegistrationMessage('Session marked as perdu');
          setShowMessage(true);
        }
      } catch (error) {
        console.error("Error marking session as perdu:", error);
        setRegistrationStatus('error');
        setRegistrationMessage('An error occurred while marking session as perdu');
        setShowMessage(true);
      }
    }
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
            eventInfo.event.extendedProps.status === 'rattrrapage scheduling' ? 'green' : 
            eventInfo.event.extendedProps.status === 'done' ? 'blue' :
            eventInfo.event.extendedProps.status === 'perdu' ? 'red' : '',
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
    <ModalHeader>Rattrapage Schedule / Annulation</ModalHeader>
    <ModalBody>
      {(selectedEvent && selectedEvent.extendedProps.status === 'active' && timeDifference <=24) && (
        <>
                  <Button colorScheme="blue" onClick={() => setSelectedReclamationType('annulation')} mb={3} ml={3}>
                    Annulation
                  </Button>
                  <Button colorScheme="blue" onClick={() => setSelectedReclamationType('reclamation')} mb={3} ml={8}>
                    Reclame
                  </Button>
                </>
      )}
        {selectedReclamationType === 'annulation' && (
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
          <Button colorScheme="red" onClick={handleAnnulation} mt={4} mr={3}>Confirm Annulation</Button>
        </>
      )}
      {selectedReclamationType === 'reclamation' && (
        <>
                <Input
                  type="text"
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  placeholder="Enter Reason"
                  size="md"
                  mt={4}
                />
          <Button colorScheme="green" onClick={handleReclamation} mt={4} mr={3}>Confirm reclamation</Button>
        </>
      )}

      {(selectedEvent && selectedEvent.extendedProps.status === 'canceled session') && (
        <>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Time</FormLabel>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </FormControl>
          <Button colorScheme="blue" onClick={handleCreateRattrapage} mt={4} mr={3}>Confirm Rattrapage</Button>
        </>
      )}
{(selectedEvent && selectedEvent.extendedProps.status === 'active' && new Date() > selectedEvent.start) && (
  <Button colorScheme="blue" onClick={handleCompleteSession} mt={4} mr={3}>Complete Session</Button>
)}
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
