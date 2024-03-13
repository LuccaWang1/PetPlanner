"use strict";

console.log("AddEventModal.jsx is running");

const { Button, Modal, Form, Col, Row } = ReactBootstrap; 


function AddEventModal(props) {
    console.log("in the AddEventModal function")
  
    //START nested functions for specialist inputs
    const [eventTitle, setEventTitle] = React.useState("");
  
    function handleEventTitle(evt) {
      setEventTitle(evt.target.value);
    }
  
    const [eventDescription, setEventDescription] = React.useState("");
  
    function handleEventDescription(evt) {
      setEventDescription(evt.target.value);
    }
  
    const [location, setLocation] = React.useState("");
  
    function handleLocation(evt) {
      setLocation(evt.target.value);
    }
  
    const [startDate, setStartDate] = React.useState("");
  
    function handleStartDate(evt) {
      setStartDate(evt.target.value);
    }
  
    const [allDay, setAllDay] = React.useState("");
  
    function handleAllDay(evt) {
      setAllDay(evt.target.value);
    }
  
    const [startTime, setStartTime] = React.useState("");
  
    function handleStartTime(evt) {
      setStartTime(evt.target.value);
    }
  
    const [endDate, setEndDate] = React.useState("");
  
    function handleEndDate(evt) {
      setEndDate(evt.target.value);
    }
  
    const [endTime, setEndTime] = React.useState("");
  
    function handleEndTime(evt) {
      setEndTime(evt.target.value);
    }
  
    const [boolTF, setboolTF] = React.useState("");
  
    function handleBoolTF(evt) {
      setboolTF(evt.target.checked);
    }
  
    //submit form, save to db
    function handleAddEventModal(evt) {
      evt.preventDefault();
  
      console.log("in the handleAddEventModel function")
  
      const formDataEvent = new FormData(); //create variable to send to server 
  
      formDataEvent.append("title", eventTitle);
      formDataEvent.append("description", eventDescription);
      formDataEvent.append("start_date", startDate);
      formDataEvent.append("start_time", startTime);
      formDataEvent.append("end_date", endDate);
      formDataEvent.append("end_time", endTime);
      formDataEvent.append("allDay", boolTF);
      formDataEvent.append("location", location);

      // Can create a regular JS object instead of using formData here - but might use a form library to handle repetitive code
      // {
      //   title: eventTitle, 
      //   description: eventDescription,
      // }
  
      //have add all items to formData to now send to server in fetch send below:
      fetch("/create-event", {
        method: "POST",
        body: formDataEvent,
      })
        .then((response) => response.json())
        .then((responseData) => {
          props.onHide() 
          console.log(responseData);
          if (responseData['success'] === false) {
            alert('Oops, something went wrong, please try again');
          } else {
            alert("Success: The event's been added!")
          }
        });
      }
  
    return (
      <>
        <Modal {...props} size="lg" backdrop="static" keyboard={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add An Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddEventModal}>
              <Row className="mb-3">
                <Form.Group controlId="formGridPassword">
                  <Form.Label>*Title</Form.Label>
                  <Form.Control
                    value={eventTitle} onChange={handleEventTitle}
                    type="text"
                    placeholder=""
                    aria-label="Title"
                  />
                </Form.Group>
              </Row>
  
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  value={location}
                  onChange={handleLocation}
                  type="text"
                  placeholder="1234 Main Street"
                />
              </Form.Group>
  
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>*Start Date</Form.Label>
                  <Form.Control
                    value={startDate}
                    onChange={handleStartDate}
                    type="date"
                    placeholder="mm/dd/yyyy"
                    aria-label="Start Date"
                  />
                </Form.Group>
  
  
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    value={startTime}
                    onChange={handleStartTime}
                    type="time"
                    placeholder=""
                    aria-label="Start Time"
                  />
                </Form.Group>
              </Row>
  
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>*End Date</Form.Label>
                  <Form.Control
                    value={endDate}
                    onChange={handleEndDate}
                    type="date"
                    placeholder="mm/dd/yyyy"
                    aria-label="End Date"
                  />
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    value={endTime}
                    onChange={handleEndTime}
                    type="time"
                    placeholder=""
                    aria-label="End Time"
                  />
                </Form.Group>
              </Row>
  
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Check value={boolTF} onChange={handleBoolTF}
                  type="switch"
                  id="all-day-rose"
                  label="All Day (on is all day)"
                />
              </Form.Group>
  
              <Row className="mb-3">
                <Form.Group controlId="formGridPassword">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control value={eventDescription} onChange={handleEventDescription}
                    placeholder=""
                    aria-label="Description"
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
              </Row>
                <Button className='LW-modal-btn' variant="secondary" onClick={props.onHide}>
                  Cancel
                </Button>
  
                <Button className='LW-modal-btn ms-1' variant="primary" onClick={handleAddEventModal} type="submit">
                  Save Changes
                </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  function AddAnEvent() {
    console.log("Add an event");
  
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <React.Fragment>
        <Button variant="primary" className='LW-dropdown-content-btn' onClick={() => setModalShow(true)}>
          Event
        </Button>
  
        <AddEventModal show={modalShow} onHide={() => setModalShow(false)} />
      </React.Fragment>
    );
  }
  
  const addAnEvent = document.querySelector("#add_event")
  
  if (addAnEvent !== null) {
    ReactDOM.render(<AddAnEvent />, addAnEvent);
  }