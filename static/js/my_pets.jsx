"use strict";

console.log("my_pets.jsx is running");

const [myPets, setMyPets] = React.useState([]); // State to store pets associated with owner_id

React.useEffect(() => {
  // Fetch pets associated with the owner_id
  fetch(`/get-pets-for-owner`)
    .then((response) => response.json())
    .then((petsInfoData) => setPets(petsInfoData));
}, []); // Empty dependency array, runs once only when component mounts
  
function PetCards(props) {
    return (
        <div className="petCard">
            <img src={props.imgUrl} alt="pet profile photo" />
            <h2>Name: {props.pet_fname} {props.pet_lname}</h2>
            <h2>Birthday: {props.birthday}</h2>
            <button href='#edit'>Edit</button>
        </div>
    );
}
  
function PetCardContainer(props) {
    const petCards = [];

    for (const currentCard of petCardData) {
        petCards.push(
        <PetCards
        imgUrl={currentCard.imgUrl}
        name={currentCard.pet_fname}
        birthday={currentCard.birthday}
        />,
        );
    }

    return <React.Fragment>{petCards}</React.Fragment>;
}

ReactDOM.render(<PetCardContainer />, document.querySelector('#pet-cards'));