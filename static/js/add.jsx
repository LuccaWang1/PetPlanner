"use strict";

console.log("jsx is running");

// Import necessary components
const { Button, Modal, Form } = ReactBootstrap;


  // function MyComponent(props) {
  //   const [state, setState] = React.useState("starting value");

  //   function handleChange(evt) {
  //     setState(evt.target.value);
  //   }

  //   return (
  //     <form>
  //       <input type="text" value={state} onChange={handleChange} />
  //     </form>
  //   );

// START add a pet feature modal
function AddPetModal(props) {
// nest function for the event handler onSubmit 

// need nested function for each input onChange

//nested function for input pet first name
  const [petFirstName, setPetFirstName] = React.useState("");

  function handleFirstName(evt) {
    setPetFirstName(evt.target.value)
  }

  //for the form 
  function handleFormSubmit(evt) {
    evt.preventDefault();
    
    //fetch POST request
  }

  return (
    <>
      <Modal
        {...props}
        size="lg"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Pet First Name</Form.Label>
              <Form.Control
                value={petFirstName}
                onChange={handleFirstName}
                type="text"
                placeholder="Feefee"
                autoFocus
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Pet Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wang"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="6"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Energy Level</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Energy Level</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comments</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function AddAPet() {
  console.log("Add pet");

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <React.Fragment>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Pet
      </Button>

      <AddPetModal show={modalShow} onHide={() => setModalShow(false)} />
    </React.Fragment>
  );
}

const add_pet_div = document.querySelector("#add_pet")
console.log(add_pet_div)

ReactDOM.render(<AddAPet />, add_pet_div);
// END add a pet feature modal



// START add an event feature modal
function AddEventModal(props) {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Event title</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onHide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function AddAnEvent() {
  console.log("Add an event");

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <React.Fragment>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Event
      </Button>

      <AddEventModal show={modalShow} onHide={() => setModalShow(false)} />
    </React.Fragment>
  );
}

const add_event_div = document.querySelector("#add_event")
console.log(add_event_div)

ReactDOM.render(<AddAnEvent />, add_event_div);
// END add an event feature modal



// START add a specialist feature modal
function AddSpecialistModal(props) {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Specialist Name</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Specialist title</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onHide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function AddASpecialist() {
  console.log("Add a specialist");

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <React.Fragment>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Specialist
      </Button>

      <AddSpecialistModal show={modalShow} onHide={() => setModalShow(false)} />
    </React.Fragment>
  );
}

const add_specialist_div = document.querySelector("#add_specialist")
console.log(add_specialist_div)

ReactDOM.render(<AddASpecialist />, add_specialist_div);
// END add a specialist feature modal