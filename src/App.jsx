import DonorDashboard from "./components/DonorDashboard";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
        <Route path="/donorDashboard" element={<DonorDashboard/>} />
      
      </Routes>
    </Router>
  );
}

export default App;
