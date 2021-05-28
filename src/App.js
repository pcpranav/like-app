import React, { useEffect} from "react";
import './App.css';
import { GlobalProvider } from './context/GlobalState';
import Home from './components/Home';
import StepForm from "./components/StepForm"
import { BrowserRouter as Router,Route,Switch,useHistory} from 'react-router-dom'

const Routing = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));

//set page according to login status
  useEffect(() => {
    if (user && user.auth===true) {
      history.push("/home")
    } else {
        history.push("/login");
    }
  }, [user,history]);
  return (
    <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/login" component={StepForm} />
          <Route path="/home" component={Home} />
        </Switch>
  );
};

function App() {
  return (

    <GlobalProvider>
      <Router>
      <Routing />
      </Router>
    </GlobalProvider>
  );
}

export default App;
