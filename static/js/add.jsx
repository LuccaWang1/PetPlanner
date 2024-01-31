"use strict";

console.log("jsx is running");

// Import necessary components
const { Button, Modal, Form, Col, Row } = ReactBootstrap;

// START ADD A PET FEATURE MODAL
function AddPetModal(props) {
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

  //submit form, save to db
  function handleAddAPetFormSubmit(evt) {
    evt.preventDefault();

    const addAPetFormInputs = {
      pet: {
        species: species,
        pet_fname: petFName,
        pet_lname: petLName,
        birthday: birthday,
        age: age,
        weight: weight,
        energy_level: energyLevel,
        coat: coat,
        emer_contact_fname: emerContactFName,
        emer_contact_lname: emerContactLName,
        emer_contact_phone: emerContactPhone,
        emer_contact_email: emerContactEmail,
        insurance_company: insuranceCompany,
        insurance_policy_num: insurancePolicyNum,
        pet_comment: petComment,
      },
    };

    fetch("/add-a-pet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addAPetFormInputs),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      });
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

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  value={birthday}
                  onChange={handleBirthday}
                  type="number"
                  placeholder="09/27/2017"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Age</Form.Label>
                <Form.Select value={age} onChange={handleAge} aria-label="Age">
                  <option>Select</option>
                  <option value="0">Baby</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="49">49</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                  <option value="57">57</option>
                  <option value="58">58</option>
                  <option value="59">59</option>
                  <option value="60">60</option>
                  <option value="61">61</option>
                  <option value="62">62</option>
                  <option value="63">63</option>
                  <option value="64">64</option>
                  <option value="65">65</option>
                  <option value="66">66</option>
                  <option value="67">67</option>
                  <option value="68">68</option>
                  <option value="69">69</option>
                  <option value="70">70</option>
                  <option value="71">71</option>
                  <option value="72">72</option>
                  <option value="73">73</option>
                  <option value="74">74</option>
                  <option value="75">75</option>
                  <option value="76">76</option>
                  <option value="77">77</option>
                  <option value="78">78</option>
                  <option value="79">79</option>
                  <option value="80">80</option>
                  <option value="81">81</option>
                  <option value="82">82</option>
                  <option value="83">83</option>
                  <option value="84">84</option>
                  <option value="85">85</option>
                  <option value="86">86</option>
                  <option value="87">87</option>
                  <option value="88">88</option>
                  <option value="89">89</option>
                  <option value="90">90</option>
                  <option value="91">91</option>
                  <option value="92">92</option>
                  <option value="93">93</option>
                  <option value="94">94</option>
                  <option value="95">95</option>
                  <option value="96">96</option>
                  <option value="97">97</option>
                  <option value="98">98</option>
                  <option value="99">99</option>
                  <option value="100">100</option>
                  <option value="101">101</option>
                  <option value="102">102</option>
                  <option value="103">103</option>
                  <option value="104">104</option>
                  <option value="105">105</option>
                  <option value="106">106</option>
                  <option value="107">107</option>
                  <option value="108">108</option>
                  <option value="109">109</option>
                  <option value="110">110</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Weight (lbs.)</Form.Label>
                <Form.Select
                  value={weight}
                  onChange={handleWeight}
                  aria-label="Weight (lbs.)"
                >
                  <option>Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="49">49</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                  <option value="57">57</option>
                  <option value="58">58</option>
                  <option value="59">59</option>
                  <option value="60">60</option>
                  <option value="61">61</option>
                  <option value="62">62</option>
                  <option value="63">63</option>
                  <option value="64">64</option>
                  <option value="65">65</option>
                  <option value="66">66</option>
                  <option value="67">67</option>
                  <option value="68">68</option>
                  <option value="69">69</option>
                  <option value="70">70</option>
                  <option value="71">71</option>
                  <option value="72">72</option>
                  <option value="73">73</option>
                  <option value="74">74</option>
                  <option value="75">75</option>
                  <option value="76">76</option>
                  <option value="77">77</option>
                  <option value="78">78</option>
                  <option value="79">79</option>
                  <option value="80">80</option>
                  <option value="81">81</option>
                  <option value="82">82</option>
                  <option value="83">83</option>
                  <option value="84">84</option>
                  <option value="85">85</option>
                  <option value="86">86</option>
                  <option value="87">87</option>
                  <option value="88">88</option>
                  <option value="89">89</option>
                  <option value="90">90</option>
                  <option value="91">91</option>
                  <option value="92">92</option>
                  <option value="93">93</option>
                  <option value="94">94</option>
                  <option value="95">95</option>
                  <option value="96">96</option>
                  <option value="97">97</option>
                  <option value="98">98</option>
                  <option value="99">99</option>
                  <option value="100">100</option>
                  <option value="101">101</option>
                  <option value="102">102</option>
                  <option value="103">103</option>
                  <option value="104">104</option>
                  <option value="105">105</option>
                  <option value="106">106</option>
                  <option value="107">107</option>
                  <option value="108">108</option>
                  <option value="109">109</option>
                  <option value="110">110</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Energy Level</Form.Label>
                <Form.Select
                  value={energyLevel}
                  onChange={handleEnergyLevel}
                  aria-label="Energy Level"
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
              <Form.Label>Comments</Form.Label>
              <Form.Control
                value={petComment}
                onChange={handlePetComment}
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>
                Cancel
              </Button>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
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

ReactDOM.render(<AddAPet />, document.querySelector("#add_pet"));
// END add a pet feature modal









// START ADD A SPECIALIST FEATURE MODAL
function AddSpecialistModal(props) {
  console.log("in the AddSpecialistModal function")

  //START nested functions for specialist inputs
  const [role, setRole] = React.useState("");

  function handleRole(evt) {
    setRole(evt.target.value);
  }

  const [specialistFName, setSpecialistFName] = React.useState("");

  function handleSpecialistFName(evt) {
    setSpecialistFName(evt.target.value);
  }

  const [specialistLName, setSpecialistLName] = React.useState("");

  function handleSpecialistLName(evt) {
    setSpecialistLName(evt.target.value);
  }

  const [petsSelected, setPetsSelected] = React.useState("");

  function handlePetsSelected(evt) {
    console.log(evt.target.value) 
    // if they select multiple, see what that does, might need to update the server.py route for handling this and this func too 
    setPetsSelected(evt.target.value);
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
    
    const addASpecialistFormInputs = {
      specialist: {
        role: role,
        specialist_fname: specialistFName,
        specialist_lname: specialistLName,
        specialist_email: specialistEmail,
        specialist_phone: specialistPhone,
        street: street,
        street2: street2,
        city: city,
        state: state,
        zip_code: zipCode,
        specialist_comment: specialistComment,
      },
    };

    fetch("/add-a-specialist", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addASpecialistFormInputs),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
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
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={handleRole}
                  aria-label="Default select example"
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
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={specialistFName}
                  onChange={handleSpecialistFName}
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={specialistLName}
                  onChange={handleSpecialistLName}
                  type="text"
                  placeholder=""
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>
                  What pet or pets would you like to assign this specialist to?
                </Form.Label>
                <Form.Select
                  value={petsSelected}
                  onChange={handlePetsSelected}
                  aria-label="What pet or pets would you like to assign this specialist to?"
                  multiple
                >
                  <option>Select</option>
                  {pets.map((pet) => (
                    <option key={pet.pet_id} value={pet.pet_id}>
                      {pet.species}: {pet.pet_fname} {pet.pet_lname}
                    </option>
                  ))}
                </Form.Select>
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
              <Form.Label>Comments</Form.Label>
              <Form.Control
                value={specialistComment}
                onChange={handleSpecialistComment}
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>
                Cancel
              </Button>

              <Button variant="primary" onClick={props.onHide}>
                Save Changes
              </Button>
            </Modal.Footer>
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

ReactDOM.render(<AddASpecialist />, document.querySelector("#add_specialist"));
// END add a specialist feature modal

// START add an event feature modal
function AddEventModal(props) {
  return (
    <>
      <Modal {...props} size="lg" backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add An Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Event title</Form.Label>
              <Form.Control as="textarea" rows={3} />
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
            Cancel
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

const add_event_div = document.querySelector("#add_event");
console.log(add_event_div);

ReactDOM.render(<AddAnEvent />, add_event_div);
// END add an event feature modal
