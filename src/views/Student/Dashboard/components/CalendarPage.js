import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Card from '../../../../components/Card/Card';

const CalendarPage = () => {
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Box width="450px"> {/* Set the width explicitly */}
      <style>
        {`
          /* Reduce padding for individual days */
          .fc-day {
            padding: 0px !important;
          }

          /* Reduce font size for the calendar */
          .fc {
            font-size: 10px !important;
          }

          /* Reduce font size for day numbers */
          .fc-daygrid-day-number {
            font-size: 11.5px !important;
          }

          /* Change border color to red for the header and grid */
          .fc-day,.fc-scrollgrid {
            border: none !important;
          }
        `}
      </style>
      <Card bg={bgColor} borderRadius={'20px'}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next'
          }}
          eventColor="transparent"
          eventTextColor="transparent"
          eventBorderColor="transparent"
          eventClick={() => false}
          selectable={false}
        />
      </Card>
    </Box>
  );
};

export default CalendarPage;
