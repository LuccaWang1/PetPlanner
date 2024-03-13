"use strict";

console.log("AddSpecialistModal.jsx is running");

const { Button, Modal, Form, Col, Row } = ReactBootstrap;

function AddSpecialistModal(props) {
    console.log("in the AddSpecialistModal function")
  
    //START nested functions for specialist inputs
    const [role, setRole] = React.useState("");
  
    function handleRole(evt) {
      setRole(evt.target.value);
    }
  
    const [specialistCompany, setSpecialistCompany] = React.useState("");
  
    function handleSpecialistCompany(evt) {
      setSpecialistCompany(evt.target.value);
    }
  
    const [specialistFName, setSpecialistFName] = React.useState("");
  
    function handleSpecialistFName(evt) {
      setSpecialistFName(evt.target.value);
    }
  
    const [specialistLName, setSpecialistLName] = React.useState("");
  
    function handleSpecialistLName(evt) {
      setSpecialistLName(evt.target.value);
    }
  
    // START Selecting a pet or all pets 
    const [petSelected, setPetSelected] = React.useState("");
    const [allPetsSelected, setAllPetsSelected] = React.useState("");
    
    function handlePetSelected(evt) { 
      setPetSelected(evt.target.value); //pull value from dropdown menu
      
      if (allPetsSelected !== "") {
        petSelected == ""
      }
    }
  
    function handleAllPetsSelected(evt) { 
      setAllPetsSelected(evt.target.checked);
      setPetSelected(""); // if this is selected, then void the handlePetSelected option
    }
  
    const [specialistEmail, setSpecialistEmail] = React.useState("");
  
    function handleSpecialistEmail(evt) {
      setSpecialistEmail(evt.target.value);
    }
  
    const [specialistPhone, setSpecialistPhone] = React.useState("");
  
    function handleSpecialistPhone(evt) {
      setSpecialistPhone(evt.target.value);
    }
  
    const [street, setStreet] = React.useState("");
  
    function handleStreet(evt) {
      setStreet(evt.target.value);
    }
  
    const [street2, setStreet2] = React.useState("");
  
    function handleStreet2(evt) {
      setStreet2(evt.target.value);
    }
  
    const [city, setCity] = React.useState("");
  
    function handleCity(evt) {
      setCity(evt.target.value);
    }
  
    const [state, setState] = React.useState("");
  
    function handleState(evt) {
      setState(evt.target.value);
    }
  
    const [zipCode, setZipCode] = React.useState("");
  
    function handleZipCode(evt) {
      setZipCode(evt.target.value);
    }
  
    const [specialistComment, setSpecialistComment] = React.useState("");
  
    function handleSpecialistComment(evt) {
      setSpecialistComment(evt.target.value);
    }
  
    //submit form, save to db
    function handleAddASpecialistFormSubmit(evt) {
      evt.preventDefault();
  
      console.log("in the handleAddASpecialistFormSubmit function")
  
      const formDataSpecialist = new FormData(); //create variable to send to server 
  
      formDataSpecialist.append("role", role);
      formDataSpecialist.append("specialist_company", specialistCompany);
      formDataSpecialist.append("specialist_fname", specialistFName);
      formDataSpecialist.append("specialist_lname", specialistLName);
      formDataSpecialist.append("specialist_email", specialistEmail);
      formDataSpecialist.append("specialist_phone", specialistPhone);
      formDataSpecialist.append("street", street);
      formDataSpecialist.append("street2", street2);  
      formDataSpecialist.append("city", city); 
      formDataSpecialist.append("state", state); 
      formDataSpecialist.append("zip_code", zipCode); 
      formDataSpecialist.append("specialist_comment", specialistComment); 
      formDataSpecialist.append("pet_selected", petSelected); 
      formDataSpecialist.append("all_pets_selected", allPetsSelected); 
  
      fetch("/add-a-specialist", {
        method: "POST",
        body: formDataSpecialist,
      })
        .then((response) => response.json())
        .then((responseData) => {
          props.onHide() 
          console.log(responseData);
          if (responseData['success'] === false) {
            alert("Looks like this specialist's already been previously added to your account");
          } else {
            alert(`Success: This specialist's been added!`)
          }
        });
      }
  
    const [pets, setPets] = React.useState([]); // State to store pets associated with owner_id
  
    React.useEffect(() => {
      // Fetch pets associated with the owner_id
      fetch(`/get-pets-for-owner`)
      .then((response) => response.json())
      .then((petsInfoData) => setPets(petsInfoData));
    }, []); // Empty dependency array, runs once only when component mounts
  
    return (
      <>
        <Modal {...props} size="lg" backdrop="static" keyboard={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add a Specialist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddASpecialistFormSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>*Role</Form.Label>
                  <Form.Select
                    value={role}
                    onChange={handleRole}
                    aria-label="Role"
                    type="text"
                  >
                    <option>Select</option>
                    <option value="vet">Vet</option>
                    <option value="groomer">Groomer</option>
                    <option value="nail_trimmer">Nail Trimmer</option>
                    <option value="emergency_vet">Emergency Vet</option>
                    <option value="emergency_vet">Pharmacy</option>
                    <option value="doctor">Doctor</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    value={specialistCompany}
                    onChange={handleSpecialistCompany}
                    type="text"
                    placeholder=""
                  />
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    value={specialistFName}
                    onChange={handleSpecialistFName}
                    type="text"
                    placeholder=""
                  />
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>*Last Name</Form.Label>
                  <Form.Control
                    value={specialistLName}
                    onChange={handleSpecialistLName}
                    type="text"
                    placeholder=""
                  />
                </Form.Group>
              </Row>
  
              <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>
                    *What pet or pets would you like to assign this specialist to?
                </Form.Label>
                <Form.Select value={petSelected} onChange={handlePetSelected}     aria-label="Select the pet this specialist helps care for:" type="text">
                  <option>Or, select one of your pets</option>
                  {pets.map((pet) => (
                    <option key={pet.pet_id} value={pet.pet_id}>
                    {pet.species}: {pet.pet_fname} {pet.pet_lname}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
                
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Check value={allPetsSelected} onChange={handleAllPetsSelected}
                    type="switch"
                    id="custom-switch"
                    label="Apply this specialist to all my pets (on is yes)"
                  />
                </Form.Group>
              </Row>
  
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={specialistEmail}
                    onChange={handleSpecialistEmail}
                    type="email"
                    placeholder="email@email.com"
                    aria-label="Email"
                  />
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    value={specialistPhone}
                    onChange={handleSpecialistPhone}
                    type="number"
                    placeholder="(xxx) xxx-xxxx"
                  />
                </Form.Group>
              </Row>
  
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  value={street}
                  onChange={handleStreet}
                  type="text"
                  placeholder="1234 Main Street"
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  value={street2}
                  onChange={handleStreet2}
                  type="text"
                  placeholder="Apartment, studio, or floor"
                />
              </Form.Group>
  
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control value={city} onChange={handleCity} type="text" />
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    value={state}
                    onChange={handleState}
                    type="text"
                    placeholder="CA"
                  />
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    value={zipCode}
                    onChange={handleZipCode}
                    type="number"
                    placeholder="66049"
                  />
                </Form.Group>
              </Row>
  
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  value={specialistComment}
                  onChange={handleSpecialistComment}
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
                <Button className='LW-modal-btn' variant="secondary" onClick={props.onHide}>
                  Cancel
                </Button>
  
                <Button className='LW-modal-btn ms-1' variant="primary" type="submit" onClick={handleAddASpecialistFormSubmit}>
                  Save Changes
                </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  function AddASpecialist() {
    console.log("In the AddASpecialist function");
  
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <React.Fragment>
        <Button variant="primary" className='LW-dropdown-content-btn' onClick={() => setModalShow(true)}>
          Specialist
        </Button>
  
        <AddSpecialistModal show={modalShow} onHide={() => setModalShow(false)} />
      </React.Fragment>
    );
  }
  
  const addASpecialist = document.querySelector("#add_specialist")
  
  if (addASpecialist !== null) {
    ReactDOM.render(<AddASpecialist />, addASpecialist);
  }