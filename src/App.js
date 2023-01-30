import { useState } from 'react';
import './App.css';
import Alert from './components/Alert';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//props can't be schange in the function.
function App() {
  const [mode, setMode] = useState('light'); //whether dark mode is enabled or not.
  const [alert,setAlert] = useState(null);

  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }

  const toggleMode =()=>{
    if (mode==='light'){
      setMode('dark');
      document.body.style.background="#0e4678";
      showAlert("Dark Mode has been enabled.","success");
    }
    else{
      setMode('light');
      document.body.style.background="white";
      showAlert("Light Mode has been enabled.","success");
    }
  }

  return (
  <>
  {/*<Navbar title="TextUtils" aboutText="About Us" />*/}
    
    <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
        <Alert alert={alert}/>
        <div className="container my-4">
      <Routes>
        <Route exact path="/" element={<TextForm heading="Try TextUtils - Word Counter, Character Counter, Remove Extra Spaces" showAlert={showAlert} mode={mode}/>}/>
        <Route exact path="/about" element={<About mode={mode} />}/>
      </Routes>
      </div>
  </Router>

  </>
);
}

export default App;
