import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/auth/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import './App.css'
import ConcertList from "./components/concerts/ConcertList";
import ConcertUpdate from "./components/concerts/ConcertUpdate";
import ConcertDelete from "./components/concerts/ConcertDelete";
import ConcertCreate from "./components/concerts/ConcertCreate";
import { UserProvider } from "./components/UserContext";



function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/create" element={<ConcertCreate />}/>
        <Route path="/delete" element={<ConcertDelete />}/>
        <Route path="/update" element={<ConcertUpdate />}/>
        <Route path="/concerts" element={<ConcertList />}/>

      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
