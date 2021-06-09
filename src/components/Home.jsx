import React, { useState, useEffect, useContext } from "react";
import TinderCard from "react-tinder-card";
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router-dom";

const Home = () => {
  const context = useContext(GlobalContext);

  //setting up state such that state persists even on refresh
  let localvalue = JSON.parse(localStorage.getItem("data")) || context.data;
  let ld = JSON.parse(localStorage.getItem("direction"));
  let nm = JSON.parse(localStorage.getItem("name"));

  let [local, setLocal] = useState(localvalue);
  let [lastDirection, setLastDirection] = useState(ld);
  let [name, setName] = useState(nm);

  //multiple useffects to reduce clutter

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(local));
    console.log("called");
  }, [local]);

  useEffect(() => {
    localStorage.setItem("direction", JSON.stringify(lastDirection));
  }, [lastDirection]);

  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(name));
  }, [name]);

  const user = JSON.parse(localStorage.getItem("user"));

  const history = useHistory();

  // const [img, setImg] = useState(local);

  // const outOfFrame = (name, direction) => {
  //   // setName(name);
  //   // setLastDirection(direction);
  //   if (local) {
  //     setName(name);
  //   setLastDirection(direction);
  //     local = local.filter((x) => x.name !== name);
  //     setLocal(local);
  //     setImg(local);

  //   }
  //   // setImg(local);
  // };

  const outOfFrame = (name) => {
    if (local) {
      local = local.filter((x) => x.name !== name);
      setLocal(local);
      // setImg(local);
    }
  };

  const swiped = (name, direction) => {
    setName(name);
    setLastDirection(direction);
  };

  const swipe = (dir) => {
    // if (local) {
    //   let last = local[local.length - 1].name;
    //   setName(last);
    //   setLastDirection(dir);
    //   // if (local) {
    //   //   local = local.filter((x) => x.name !== last);
    //   //   setLocal(local);
    //   // }
    //   local = local.filter((x) => x.name !== last);
    //   setLocal(local);
    //   // setImg(local);
    // }
    if(local){
      let last = local[local.length-1].name;
      swiped(last,dir)
      outOfFrame(last)
    }
  };
  console.log(local);
  const submitHandler = (e) => {
    e.preventDefault();
    context.logout();
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className="home">
      <div className="nav">
        <h1>Welcome,{user ? user.username : ""}</h1>
        <button onClick={submitHandler}>Logout</button>
      </div>
      <div>
        {name === "Five" ? (
          <h1 style={{ textAlign: "center", marginTop: "10rem" }}>
            {user.username}, you have rated all the images. Thank You!
          </h1>
        ) : (
          <div>
            <div className="card_main">
              {local
                ? local.map((img) => (
                    <TinderCard
                      className="swipe"
                      preventSwipe={["up", "down"]}
                      key={img.name}
                      // onCardLeftScreen={(dir) => outOfFrame(img.name, dir)}
                      onCardLeftScreen={() => outOfFrame(img.name)}
                      onSwipe={(dir) => {
                        swiped(dir, img.name);
                      }}
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
                  ))
                : ""}
            </div>
            <div className="buttons">
              <button onClick={() => swipe("left")}>Dislike</button>
              <button onClick={() => swipe("right")}>Like</button>
            </div>
            <div className="infoText">
              {lastDirection ? (
                lastDirection === "right" ? (
                  <h2>
                    {user.username}, you have selected image {name}
                  </h2>
                ) : (
                  <h2>
                    {user.username}, you have rejected image {name}
                  </h2>
                )
              ) : (
                <h2>Swipe a card or press a button to get started!</h2>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
