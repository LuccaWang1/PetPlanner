"use strict";

console.log("add.jsx is running");

const { Button, Modal, Form, Col, Row } = ReactBootstrap;


// START ADD A PET FEATURE MODAL
function AddPetModal(props) {
  console.log('in the AddPetModal function')
  
  //START nested functions for pet inputs
  const [species, setSpecies] = React.useState("");
  
  function handleSpecies(evt) {
    setSpecies(evt.target.value);
  }
  
  const [petFName, setPetFName] = React.useState("");
  
  function handlePetFName(evt) {
    setPetFName(evt.target.value);
  }
  
  const [petLName, setPetLName] = React.useState("");
  
  function handlePetLName(evt) {
    setPetLName(evt.target.value);
  }
  
  const [birthday, setBirthday] = React.useState("");
  
  function handleBirthday(evt) {
    setBirthday(evt.target.value);
  }
  
  const [age, setAge] = React.useState("");
  
  function handleAge(evt) {
    setAge(evt.target.value);
  }

  //already declared near line 195
  function handleBreed(evt) {
    setBreed(evt.target.value);
  }
  
  const [weight, setWeight] = React.useState("");
  
  function handleWeight(evt) {
    setWeight(evt.target.value);
  }
  
  const [energyLevel, setEnergyLevel] = React.useState("");
  
  function handleEnergyLevel(evt) {
    setEnergyLevel(evt.target.value);
  }
  
  const [coat, setCoat] = React.useState("");
  
  function handleCoat(evt) {
    setCoat(evt.target.value);
  }
  
  const [emerContactFName, setEmerContactFName] = React.useState("");
  
  function handleEmerContactFName(evt) {
    setEmerContactFName(evt.target.value);
  }
  
  const [emerContactLName, setEmerContactLName] = React.useState("");
  
  function handleEmerContactLName(evt) {
    setEmerContactLName(evt.target.value);
  }
  
  const [emerContactPhone, setEmerContactPhone] = React.useState("");
  
  function handleEmerContactPhone(evt) {
    setEmerContactPhone(evt.target.value);
  }
  
  const [emerContactEmail, setEmerContactEmail] = React.useState("");
  
  function handleEmerContactEmail(evt) {
    setEmerContactEmail(evt.target.value);
  }
  
  const [insuranceCompany, setInsuranceCompany] = React.useState("");
  
  function handleInsuranceCompany(evt) {
    setInsuranceCompany(evt.target.value);
  }
  
  const [insurancePolicyNum, setInsurancePolicyNum] = React.useState("");
  
  function handleInsurancePolicyNum(evt) {
    setInsurancePolicyNum(evt.target.value);
  }
  
  const [petComment, setPetComment] = React.useState("");
  
  function handlePetComment(evt) {
    setPetComment(evt.target.value);
  }

  function handleAddAPetFormSubmit(evt) {
    evt.preventDefault();

    console.log('in the handleAddAPetFormSubmit function')

    // Validation
    if (species === '' || petFName === '') {
      alert('Please enter the species type and first name')
      console.log("input error on species and first name");
      return;
    }

    let inputAge

    if (age === "") {
      inputAge = null;
    } else {
      inputAge = Number(age)
    }

    let inputWeight

    if (weight === "") {
      inputWeight = null;
    } else {
      inputWeight = Number(weight)
    }

    const formData = new FormData(); //create variable to send to server 

    const petPhoto = document.querySelector('#petphoto');
   
    formData.append("petphoto", petPhoto.files[0]);
    formData.append("species", species);
    formData.append("pet_fname", petFName);
    formData.append("pet_lname", petLName);
    formData.append("birthday", birthday);
    formData.append("age", inputAge);
    formData.append("breed", breed);
    formData.append("weight", inputWeight);
    formData.append("energy_level", energyLevel);
    formData.append("coat", coat);
    formData.append("emer_contact_fname", emerContactFName);
    formData.append("emer_contact_lname", emerContactLName);
    formData.append("emer_contact_phone", emerContactPhone);
    formData.append("emer_contact_email", emerContactEmail);
    formData.append("insurance_company", insuranceCompany);
    formData.append("insurance_policy_num", insurancePolicyNum);
    formData.append("pet_comment", petComment);
    //have add all items to formData to now send to server in fetch send below:
    fetch("/add-a-pet", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        location.reload()
        props.onHide() 
        console.log(responseData);
        if (response['success'] === false) {
          alert(`Looks like this ${pet_fname}'s already been previous added to your account`);
        } else {
          alert(`Success: ${pet_fname}'s been added!`)
        }
      });
  }

  const [breed, setBreed] = React.useState(""); // State to store none selected, then if selected, start at None
  const [breedOptions, setBreedOptions] = React.useState({});
  React.useEffect(() => {
    // Fetch cat and dog breed data 
    fetch(`/breeds`)
      .then((response) => response.json())
      .then((breedData) => setBreedOptions(breedData));
  }, []); // Empty dependency array, runs once only when component mounts
  let breedInput = null
  if (species === "dog" || species === "cat") {
    const petOptions = []
    
    if (species === "dog") {
      for (let b of breedOptions.dog_breeds) {
        petOptions.push(<option value={b}>{b}</option>)
      }
    } else {
      for (let b of breedOptions.cat_breeds) {
        petOptions.push(<option value={b}>{b}</option>)
      }
    } 
    breedInput = (
      <Form.Select value={breed} onChange={handleBreed} aria-label="Breed" type="text">
        <option>Select</option>
        {petOptions}
      </Form.Select>
    )
  } else {
    breedInput = (
      <Form.Control value={breed} onChange={handleBreed} aria-label="Breed" type="text">
      </Form.Control>
    )
  }

  return (
    <>
      <Modal {...props} size="lg" backdrop="static" keyboard={false} centered>
        
        <Modal.Header closeButton>
          <Modal.Title>Add My Pet</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form onSubmit={handleAddAPetFormSubmit}>
            <Row className="mb-3">
            <Form.Group controlId="formGridEmail">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                id="petphoto"
                type="file"
              />
            </Form.Group>
            
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>*Species</Form.Label>
                <Form.Select
                  value={species}
                  onChange={handleSpecies}
                  aria-label="Species"
                >
                  <option>Select</option>
                  <option value="bird">Bird</option>
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                  <option value="fish">Fish</option>
                  <option value="guinea_pig">Guinea Pig</option>
                  <option value="horse">Horse</option>
                  <option value="turtle">Turtle</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>*First Name</Form.Label>
                <Form.Control
                  value={petFName}
                  onChange={handlePetFName}
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={petLName}
                  onChange={handlePetLName}
                  type="text"
                  placeholder=""
                />
              </Form.Group>
            </Row>

            {/* should below on lines 250-253 be be if statements? Also dogBreed and catBreed are not defined - how do we match up 183 then */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Breed</Form.Label>
                {breedInput}
              </Form.Group>
              
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  value={birthday}
                  onChange={handleBirthday}
                  type="date"
                  placeholder="mm/dd/yyyy"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Age</Form.Label>
                <Form.Select value={age} onChange={handleAge} aria-label="Age" type="number">
                  <option>Select</option>
                  {Array.from({ length: 110 }, (_, index) => (
                      <option key={index} value={index}>
                        {index === 0 ? 'Baby' : index}
                      </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Weight (lbs.)</Form.Label>
                <Form.Select value={weight} onChange={handleWeight} aria-label="Weight (lbs.)" type="number">
                  <option>Select</option>
                  {Array.from({ length: 200 }, (_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Energy Level</Form.Label>
                <Form.Select
                  value={energyLevel}
                  onChange={handleEnergyLevel}
                  aria-label="Energy Level"
                  type="text"
                >
                  <option>Select</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Coat</Form.Label>
                <Form.Select
                  value={coat}
                  onChange={handleCoat}
                  aria-label="Coat"
                  type="text"
                >
                  <option>Coat</option>
                  <option value="hairless">Hairless</option>
                  <option value="short">Short</option>
                  <option value="long">Long</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Emergency Contact First Name</Form.Label>
                <Form.Control
                  value={emerContactFName}
                  onChange={handleEmerContactFName}
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Emergency Contact Last Name</Form.Label>
                <Form.Control
                  value={emerContactLName}
                  onChange={handleEmerContactLName}
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Emergency Contact Phone</Form.Label>
                <Form.Control
                  value={emerContactPhone}
                  onChange={handleEmerContactPhone}
                  ype="number"
                  placeholder="(xxx) xxx-xxxx"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Emergency Contact Email</Form.Label>
                <Form.Control
                  value={emerContactEmail}
                  onChange={handleEmerContactEmail}
                  type="email"
                  placeholder="email@email.com"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Insurance Company</Form.Label>
                <Form.Control
                  value={insuranceCompany}
                  onChange={handleInsuranceCompany}
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Policy Number</Form.Label>
                <Form.Control
                  value={insurancePolicyNum}
                  onChange={handleInsurancePolicyNum}
                  type="text"
                  placeholder=""
                />
              </Form.Group>
            </Row>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Notes</Form.Label>
              <Form.Control
                value={petComment}
                onChange={handlePetComment}
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <Button variant="secondary" onClick={props.onHide}>
              Cancel
            </Button>
            
            <Button variant="primary" type="submit" onClick={handleAddAPetFormSubmit}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

function AddAPet() {
  console.log("in the AddAPet function");

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
const addAPet = document.querySelector("#add_pet")

if (addAPet !== null) {
  ReactDOM.render(<AddAPet />, addAPet);
}
// END add a pet feature modal









// START ADD A SPECIALIST FEATURE MODAL
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
              <Button variant="secondary" onClick={props.onHide}>
                Cancel
              </Button>

              <Button variant="primary" type="submit" onClick={handleAddASpecialistFormSubmit}>
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
      <Button variant="primary" onClick={() => setModalShow(true)}>
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
// END add a specialist feature modal








// START ADD AN EVENT FEATURE MODAL
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

    //have add all items to formData to now send to server in fetch send below:
    fetch("/create-event", {
      method: "POST",
      body: formDataEvent,
    })
      .then((response) => response.json())
      .then((responseData) => {
        // location.reload()
        props.onHide() 
        console.log(responseData);
        if (response['success'] === false) {
          alert(`Looks like this ${eventTitle}'s already been previously added to your account`);
        } else {
          alert(`Success: ${eventTitle}'s been added!`)
        }
      });
    }
  //   const addEventFormInputs = {
  //     specialist: {
  //       title: eventTitle,
  //       description: eventDescription,
  //       start_date: startDate,
  //       start_time: startTime,
  //       end_date: endDate,
  //       end_time: endTime,
  //       allDay: boolTF,
  //       location: location, 
  //     },
  //   };

  //   fetch("/create-event", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(addEventFormInputs),
  //   })
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //     console.log(responseData);
      
  //     if (responseData && responseData.events) {
  //       const eventsData = data.events.map(event => ({
  //         title: event.title,
  //         description: event.description,
  //         start: event.start_date + (event.start_time ? 'T' + event.start_time : ''),
  //         end: event.end_date + (event.end_time ? 'T' + event.end_time : ''),
  //         allDay: false,
  //         extendedProps: {
  //           location: location,
  //         }
  //       }))
  //     } 
  //     location.reload()
  //     props.onHide()
  //   });

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
              <Button variant="secondary" onClick={props.onHide}>
                Cancel
              </Button>

              <Button variant="primary" onClick={handleAddEventModal} type="submit">
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
      <Button variant="primary" onClick={() => setModalShow(true)}>
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
// END add an event feature modal