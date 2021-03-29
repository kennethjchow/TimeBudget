import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import "./CalendarPage.css";

export default class CalendarPage extends React.Component {
  selected = (e) => {
    console.log(e)
  }
   render() {
      return (
         <div className="calendar-container">
            <FullCalendar
               height="100%"
               firstDay="1"
               plugins={[timeGridPlugin, interactionPlugin]}
               initialView="timeGridWeek"
               selectable="true"
               select={this.selected}
               allDaySlot={false}
            />
         </div>
      );
   }
}
