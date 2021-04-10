import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import {
   MuiPickersUtilsProvider,
   KeyboardTimePicker,
   KeyboardDatePicker,
} from "@material-ui/pickers";

import "./CalendarPage.css";
import { Button, Modal } from "react-bootstrap"; // <-- JOY
import { InputLabel, MenuItem, Select, TextField } from "@material-ui/core";

export default function CalendarPage(props) {
   const [showModal, setShowModal] = useState(false);
   const [selectedData, setSelectedData] = useState({});

   const selected = (e) => {
      setSelectedData(e);
      setShowModal(true);
   };
   const callbackModal = () => {
      setShowModal(false);
   };
   return (
      <div className="calendar-container">
         <FullCalendar
            height="100%"
            firstDay="1"
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            selectable="true"
            select={selected}
            allDaySlot={false}
         />
         <DateDialog
            showModal={showModal}
            callbackModal={callbackModal}
            startDate={selectedData.start}
            endDate={selectedData.end}
         />
      </div>
   );
}

function DateDialog(props) {
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [showStartDate, setShowStartDate] = useState(false);
   const [showEndDate, setShowEndDate] = useState(false);

   useEffect(() => {
      setStartDate(props.startDate);
      setEndDate(props.endDate);
   });

   const handleClose = () => {
      props.callbackModal();
   };
   const handleDateChange = (e) => {
      console.log(startDate);
      console.log(e);
   };
   const handleSelectChange = (e) => {
      console.log(e);
   };
   const handleGroupChange = (e) => {
      console.log(e)
   }

   return (
      <Modal show={props.showModal} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
         </Modal.Header>
         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
         <Modal.Footer>
            <form className="transaction-form" noValidate autoComplete="off">
               <TextField
                  className="modal-row"
                  margin="normal"
                  id="activity"
                  label="Activity"
                  InputLabelProps={{
                     shrink: true,
                  }}
               />
               <div className="modal-row">
                  <TextField
                     margin="normal"
                     id="standard-number"
                     label="Hours Spent"
                     type="number"
                     InputLabelProps={{
                        shrink: true,
                     }}
                  />
               </div>
               <div className="modal-row">
               <FormControl className="formControlSelect" margin="normal">
                     <InputLabel id="demo-simple-select-label">
                        Category
                     </InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="group-select"
                        // value={age}
                        onChange={handleGroupChange}
                     >
                        {/* TODO: switch this to actual data later */}
                        <MenuItem value={10}>Productivity</MenuItem>
                        <MenuItem value={20}>Health</MenuItem>
                        <MenuItem value={30}>Social</MenuItem>
                     </Select>
                  </FormControl>
               </div>
               <div className="modal-row">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                     <KeyboardDatePicker
                        onClick={() => setShowStartDate(true)}
                        onClose={() => setShowStartDate(false)}
                        open={showStartDate}
                        className="modal-date-picker"
                        disableToolbar
                        autoOk={true}
                        variant="inline"
                        format="EEEE MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Start Date"
                        value={startDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                           "aria-label": "change date",
                        }}
                     />
                  </MuiPickersUtilsProvider>
                  <FormControl className="formControlSelect" margin="normal">
                     <InputLabel id="demo-simple-select-label">
                        Start Time
                     </InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="start-date-select"
                        // value={age}
                        onChange={handleSelectChange}
                     >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                     </Select>
                  </FormControl>
               </div>
               <div className="modal-row">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                     <KeyboardDatePicker
                        onClick={() => setShowEndDate(true)}
                        onClose={() => setShowEndDate(false)}
                        open={showEndDate}
                        autoOk={true}
                        className="modal-date-picker"
                        disableToolbar
                        variant="inline"
                        format="EEEE MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="End Date"
                        value={endDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                           "aria-label": "change date",
                        }}
                     />
                  </MuiPickersUtilsProvider>
                  <FormControl className="formControlSelect" margin="normal">
                     <InputLabel id="demo-simple-select-label">
                        End Time
                     </InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="end-date-select"
                        // value={age}
                        onChange={handleSelectChange}
                     >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                     </Select>
                  </FormControl>
               </div>
               <Button onClick={handleClose}>Save</Button>
            </form>
         </Modal.Footer>
      </Modal>
   );
}
