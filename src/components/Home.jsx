import React, { useState ,useEffect,useContext} from "react";
import TinderCard from "react-tinder-card";
import { GlobalContext } from "../context/GlobalState";
import { useHistory }from "react-router-dom"
const data = [
  {
    url: "https://res.cloudinary.com/djclc3a7t/image/upload/v1622048270/2_lgkxfr.png",
    name: "One",
  },
  {
    url: "https://res.cloudinary.com/djclc3a7t/image/upload/v1622048270/1_w4lazg.png",
    name: "Two",
  },
  {
    url: "https://res.cloudinary.com/djclc3a7t/image/upload/v1622048270/3_lsai5t.png",
    name: "Three",
  },
  {
    url: "https://res.cloudinary.com/djclc3a7t/image/upload/v1622048270/4_uakrrm.png",
    name: "Four",
  },
  {
    url: "https://res.cloudinary.com/djclc3a7t/image/upload/v1622048270/5_varpfj.png",
    name: "Five",
  },
];

const alreadyRemoved = [];
// let imgState = data;

const Home = () => {
const history = useHistory()
const context = useContext(GlobalContext)
console.log(context);


  const [value, setValue] = useState(data);
  const [lastDirection, setLastDirection] = useState();


//   useEffect(() => {
//     localStorage.setItem("data",JSON.stringify(value));
//     console.log(value)
// }, [value])

// useEffect(() => {
//   outOfFrame()
// }, [])

let val = JSON.parse(localStorage.getItem("data"))

  // const [img, setImg] = useState(data);
  const [img, setImg] = useState(val);
  // const [lastDirection, setLastDirection] = useState();
  const [name, setName] = useState("");

  const outOfFrame = (name, direction) => {
    setName(name);
    setLastDirection(direction);
    alreadyRemoved.push(name);
    // imgState = imgState.filter((img) => img.name !== name);
    if(val)
    val= val.filter((img) => img.name !== name);

    setImg(val);
    setValue(val)
  };
  const swipe = (dir) => {
    const cardsLeft = img.filter(
      (img) => !alreadyRemoved.includes(img.name)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name;
      outOfFrame(toBeRemoved,dir)
    }
  };
  const submitHandler=(e)=>{
    e.preventDefault();
    context.logout();
    localStorage.removeItem("user");
    localStorage.removeItem("data");
    history.push("/login")
  }
  return (
    <div className="home">
      <div className="nav">
        <h1>Welcome,Pranav</h1>
        <button onClick={submitHandler}>Logout</button>
      </div>
      <div className="card_main">
        {img?(img.map((img) => (
          <TinderCard
            className="swipe"
            preventSwipe={["up", "down"]}
            key={img.name}
            onCardLeftScreen={(dir) => outOfFrame(img.name, dir)}
          >
            <div
              className="card"
              style={{
                backgroundImage: `url(${img.url})`,
                backgroundRepeat: "no-repeat",
              }}
            >
              <h3>{img.name}</h3>
            </div>
          </TinderCard>
        ))):""}
      </div>
      <div className="buttons">
      <button onClick={() => swipe("left")}>Swipe left!</button>
        <button onClick={() => swipe("right")}>Swipe right!</button>
      </div>
      <div className="infoText">
        {lastDirection ? (
          lastDirection === "right" ? (
            <h2>You have selected image {name}</h2>
          ) : (
            <h2>You have rejected image {name}</h2>
          )
        ) : (
          <h2>Swipe a card or press a button to get started!</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
