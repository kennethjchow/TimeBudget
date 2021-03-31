import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "./CalendarPage.css";
import { Button, Modal } from 'react-bootstrap' // <-- JOY

export default class CalendarPage extends React.Component {
   constructor(props) {
      super(props)
      this.state = { showModal: false };
      this.callbackModal = this.callbackModal.bind(this);
   }

   selected = (e) => {
      console.log(e);
      this.setState({ showModal: true });
   };
   callbackModal = () => {
      this.setState({ showModal: false });
   };
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
            <DateDialog showModal={this.state.showModal} callbackModal={this.callbackModal}/>
         </div>
      );
   }
}

function DateDialog(props) {
   const handleClose = () => {
      props.callbackModal();
   };
   return (
      <Modal show={props.showModal} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
         </Modal.Header>
         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
               Save Changes
            </Button>
         </Modal.Footer>
      </Modal>
   );
}
