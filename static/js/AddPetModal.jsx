"use strict";

console.log("add.jsx is running");

const { Button, Modal, Form, Col, Row } = ReactBootstrap;


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
        console.log(responseData);
        if (responseData['success'] === false) {
          alert(responseData.status);
        } else {
          props.onHide()
          alert(responseData.status)
          location.reload()
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

            <Button className='LW-modal-btn' variant="secondary" onClick={props.onHide}>
              Cancel
            </Button>
            
            <Button className='LW-modal-btn ms-1' variant="primary" type="submit" onClick={handleAddAPetFormSubmit}>
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
      <Button variant="primary" className='LW-dropdown-content-btn' onClick={() => setModalShow(true)}>
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