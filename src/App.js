import './App.css';

import { GlobalProvider } from './context/GlobalState';
// import Home from './components/Home';
// import Login from './components/Login';
import StepForm from "./components/StepForm"

function App() {
  return (
    <GlobalProvider>
    {/* <Login/> */}
    {/* <Home/> */}
    {/* <PhoneInput/> */}
    {/* <Otpverify/> */}
    <StepForm/>
    </GlobalProvider>
  );
}

export default App;
