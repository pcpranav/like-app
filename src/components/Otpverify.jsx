import React, { useState, useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router-dom";

const Otpverify = ({ prevStep }) => {
  const history = useHistory();
  const { login, auth, username } = useContext(GlobalContext);
  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({ auth: auth, username: username })
    );
    if (auth === true) history.replace("/home");
  }, [auth, history, username]);
  const [state, setState] = useState({
    num1: "",
    num2: "",
    num3: "",
    num4: "",
  });
  const [val, setVal] = useState(false);
  const handleChange = (input) => (e) => {
    setState({ ...state, [input]: e.target.value });
  };
  const { num1, num2, num3, num4 } = state;
  const otp = num1 + num2 + num3 + num4;

  const onSubmit = (e) => {
    e.preventDefault();
    if (otp === "0000") {
      login();
    } else {
      setVal(true);
    }
  };
  const goBack = (e) => {
    prevStep();
    localStorage.clear();
  };
  const clear = (e) => {
    setState({
      num1: "",
      num2: "",
      num3: "",
      num4: "",
    });
  };
  return (
    <div>
      {val && (
        <Alert
          variant="danger"
          style={{ position: "absolute", bottom: "0" }}
        >
          Invalid OTP.Please enter the OTP again.
        </Alert>
      )}

      <div className="main">
        <div className="login-main">
          {/* <div className="banner">Like-App</div> */}

          <div className="login-comp">
            <div className="welcome">
              <h1>Enter otp</h1>
            </div>
            <div className="input-mobile1">
              <input
                type="password"
                className="otp"
                maxLength="1"
                value={num1}
                onChange={handleChange("num1")}
              />
              <input
                type="password"
                className="otp"
                maxLength="1"
                value={num2}
                onChange={handleChange("num2")}
              />
              <input
                type="password"
                className="otp"
                maxLength="1"
                value={num3}
                onChange={handleChange("num3")}
              />
              <input
                type="password"
                className="otp"
                maxLength="1"
                value={num4}
                onChange={handleChange("num4")}
              />
            </div>
            <div className="input-button">
              <button onClick={onSubmit}>Submit</button>
            </div>
            <div className="input-button">
              <button onClick={goBack}>resend otp</button>
            </div>
            <div className="input-button">
              <button onClick={clear}>clear fields</button>
            </div>
          </div>
        </div>
        <div className="info-main">
          <div className="banner1">
            <h1>Hey, There</h1>
          </div>
          <br/>
          <div className="info">
            <h5>
              a simple website to swipe some pictures
              liking or disliking it along the way.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otpverify;
