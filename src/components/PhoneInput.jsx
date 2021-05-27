import React, { useState, useContext} from "react";
import { Alert } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";

const PhoneInput = ({ nextStep }) => {
  const [state, setState] = useState({ username: "", phone: "" });
  const [val, setVal] = useState(false);
  const handleChange = (input) => (e) => {
    setState({ ...state, [input]: e.target.value });
  };
  const { phone, username } = state;
  const {naming} = useContext(GlobalContext);
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      state.username === "" ||
      state.phone === "" ||
      isNaN(state.phone) ||
      state.phone.length !== 10
    )
      setVal(true);
    else {
      naming(username)
      nextStep();
    }
  };
  return (
    <div>
      {val && (
        <Alert
          variant="danger"
          style={{ position: "absolute", top: 0, right: "40%" }}
        >
          Invalid Input
        </Alert>
      )}

      <div className="main">
        <div className="login-main">
          <div className="banner">Like-App</div>

          <div className="login-comp">
            <div className="welcome">
              <h1>Welcome</h1>
            </div>
            <div className="input-text">
              <input
                type="text"
                placeholder="enter username"
                value={username}
                onChange={handleChange("username")}
              />
            </div>
            <div className="input-mobile">
              <input
                type="tel"
                placeholder="enter mobile-number"
                maxLength="10"
                value={phone}
                onChange={handleChange("phone")}
              />
            </div>
            <div className="input-button">
              <button onClick={onSubmit}>Send OTP</button>
            </div>
          </div>
        </div>
        <div className="info-main">
          <div className="banner1">
            <h1>Hey, There</h1>
          </div>
          <div className="info">
            <h5>
              <strong>Like-App</strong> is a simple app to swipe some pictures
              liking or disliking it along the way.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneInput;
