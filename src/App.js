import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Movies from "./Components/Movies/Movies";
import People from "./Components/People/People";
import Tv from "./Components/Tv/Tv";
import About from "./Components/About/About";
import Contacts from "./Components/Contacts/Contacts";
import Detailes from "./Components/Datails/Detailes";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function App() {
  function TestingRoute(props) {
    if (localStorage.getItem("tkn") == null) {
      return <Navigate to="/login" />;
    } //
    else {
      console.log(props.children);
      return props.children;
    }
  }

  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  function decodeToken() {
    let user = jwtDecode(localStorage.getItem("tkn"));
    setCurrentUser(user);
  }

  function clearUserData() {
    localStorage.removeItem("tkn");
    setCurrentUser(null);
    navigate("/login");
  }

  useEffect(() => {
    if (localStorage.getItem("tkn") == null) {
      navigate("/login");
    } else {
      decodeToken();
    }
  }, []);

  return (
    <>
      <NavBar crrUser={currentUser} clruser={clearUserData} />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login decodeToken={decodeToken} />} />
        <Route path="register" element={<Register />} />
        <Route
          path="movies"
          element={
            <TestingRoute>
              <Movies />
            </TestingRoute>
          }
        />
        <Route path="people" element={<People />} />
        <Route path="details" element={<Detailes />}>
          <Route path=":id/:cat" element={<Detailes />} />
        </Route>
        <Route
          path="tv"
          element={
            <TestingRoute>
              <Tv />
            </TestingRoute>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="contacts" element={<Contacts />} />
        <Route
          path="*"
          element={
            <div className="vh-100 d-flex justify-content-center align-items-center">
              <h1>4 0 4</h1>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
