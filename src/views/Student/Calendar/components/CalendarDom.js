import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, Button,Select, Modal, ModalOverlay,Text,useColorModeValue, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import Card from "../../../../components/Card/Card";

function CalendarDom() {
  const [events, setEvents] = useState([]);
  const [info, setInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [loadingVote, setLoadingVote] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [timeDifference, setTimeDifference] = useState(0);
  const [selectedReclamationType, setSelectedReclamationType] = useState('');
  const [vote, setVote] = useState('');
  const bgColor = useColorModeValue("white", "gray.700");
  const [sessionId, setSessionId] = useState(null);

  const id = localStorage.getItem('id'); // Assuming the token is stored in localStorage


  useEffect(() => {
    const fetchInfo = async () => {
        try {
            setLoadingInfo(true);
            const response = await axios.get(`/rattrapage/info/${id}`);
            const sessions = response.data;
            if (sessions.length > 0) {
                const firstSession = sessions[0];
                const sessionIdFromResponse = firstSession.sessionId;
                setSessionId(sessionIdFromResponse);
            } else {
                console.error('No sessions found in the response');
            }
            setInfo(sessions);
        } catch (error) {
            console.error('Error fetching info:', error);
        } finally {
            setLoadingInfo(false);
        }
    };

    fetchInfo(); // Call fetchInfo on component mount
}, [id]); // Add id as a dependency


  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(`/session/student/${id}`);
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
            status: eventData.status
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
  const eventStatus = eventClickInfo.event.extendedProps.status;
  if (eventStatus === 'canceled session' || eventStatus === 'done'|| eventStatus === 'perdu') {
    return;
  } 
  else if (eventStatus === 'active') {
    setSelectedReclamationType(' '); // Set the default reclamation type to 'annulation' for active sessions
  } else if (eventStatus === 'rattrrapage scheduling') {
    setSelectedReclamationType('vote'); // Set the default reclamation type to 'vote' for rattrrapage scheduling
  }

  setSelectedEvent(eventClickInfo.event);
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
  
      const sessionId = selectedEvent.id; // Extract the session ID from the selected event

      // Conditionally call the annulation or reclame endpoint based on the selectedReclamationType
      let response;
      if (selectedReclamationType === 'annulation') {
        response = await axios.post(`/reclamation/annulation/session/${id}/${sessionId}`, formattedData);
      } else if (selectedReclamationType === 'reclame') {
        response = await axios.post(`/reclamation/student/reclame/${id}/${sessionId}`, { reason: reason });
      } else {
        console.error("Invalid reclamation type");
        return;
      }
  
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

  const handleSubmitVote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/rattrapage/vote/${selectedEvent.id}`, { agree: vote }); // Send the selected vote as 'agree'
      console.log(response.data);
      // Handle success, e.g., show a success message to the user
    } catch (error) {
      console.error('Error saving vote:', error);
      // Handle error, e.g., show an error message to the user
    } finally {
      setIsModalOpen(false); // Close the modal after voting
      setVote(''); // Reset the vote state
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setShowMessage(false); // Hide the message when the modal is closed
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
          <ModalHeader>{selectedEvent ? 'Vote' : 'Annulation / Reclame'}</ModalHeader>
          <ModalBody>
  {selectedEvent && selectedEvent.extendedProps.status === 'active' && (
    <>
      <Button colorScheme="blue" onClick={() => setSelectedReclamationType('annulation')} mb={3} ml={3}>
        Annulation
      </Button>
      <Button colorScheme="blue" onClick={() => setSelectedReclamationType('reclame')} mb={3} ml={8}>
        Reclame
      </Button>
    </>
  )}
  {selectedEvent && selectedEvent.extendedProps.status === 'rattrrapage scheduling' && timeDifference <= 24 && (
    <>
      <Box>
        {info && info.length > 0 ? (
          info.map((sessionInfo, index) => (
            <div key={index}>
              <Text>
                Your teacher {sessionInfo.nameF} {sessionInfo.nameL} canceled the Session {sessionInfo.sessionDate} and Rattrapage it with {sessionInfo.rattrapageDate}
              </Text>
            </div>
          ))
        ) : (
          <Text>No Rattrapage given</Text>
        )}
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          Do you agree with this rattrapage?
        </Text>
      </Box>
      <form onSubmit={handleSubmitVote} style={{ display: 'flex', alignItems: 'center' }}>
        <Box mr={4}>
          <input
            type="radio"
            id="yes"
            value="yes"
            checked={vote === 'yes'}
            onChange={(e) => setVote(e.target.value)}
            style={{ marginRight: '5px' }}
          />
          <label htmlFor="yes">Yes</label>
        </Box>
        <Box>
          <input
            type="radio"
            id="no"
            value="no"
            checked={vote === 'no'}
            onChange={(e) => setVote(e.target.value)}
            style={{ marginRight: '5px' }}
          />
          <label htmlFor="no">No</label>
        </Box>
        <Button type="submit" colorScheme="blue" ml={3}>
          Submit Vote
        </Button>
      </form>
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
            mb={3}
          >
            <option value="sick">Sick</option>
            <option value="urgency">Urgency</option>
          </Select>
          <Button colorScheme="blue" onClick={handleAnnulation} mr={3}>
            Confirm
          </Button>
    </>
  )}
  {selectedReclamationType === 'reclame' && (
    <>
      <Select
        id="reason"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        placeholder="Select Reason"
        size="md"
        mb={3}
      >
        <option value="retard_prof">Retard prof</option>
        <option value="absence_prof">Absence prof</option>
      </Select>
      <Button colorScheme="blue" onClick={handleAnnulation} mr={3}>
        Confirm
      </Button>
    </>
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
