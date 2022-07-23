import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

export default function Register() {
  const [errList, setErrList] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    password: "",
    age: 0,
    email: "",
  });

  let navigate = useNavigate();

  function getUser(e) {
    setErrList('');
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    // console.log(newUser);
    setUser(newUser);
  }

  async function submitRegister(e) {
    e.preventDefault();

    const vaildUser = Joi.object({
      first_name: Joi.string().max(10).min(3).required(),
      last_name: Joi.string().max(10).min(3).required(),
      age: Joi.number().max(60).min(18),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string()
        .pattern(/^[a-z0-9]{4,10}$/i)
        .required(),
    });

    let joiRes = vaildUser.validate(user, { abortEarly: false });
    if (joiRes.error) {
      setErrList(joiRes.error.details);
    } else {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signup",
        user
      );

      // console.log(data);

      if (data.message === "success") {
        navigate("/login");
      } else {
        setError(data.message);
      }
    }
  }

  function getCrrErro(key) {
    for (const err of errList) {
      if (err.context.key === key) {
        return err.message;
      }
    }

    return "";
  }

  return (
    <>
      <h2 className="text-center my-3">Register Form</h2>
      <div className="w-75 m-auto mb-5">
        <form onSubmit={submitRegister}>
          {/* {errList.map((err, idx) => (
            <div className="alert alert-danger" key={idx}>{err.message}</div>
          ))} */}
          <label htmlFor="first_name">First Name</label>
          <input
            onChange={getUser}
            placeholder="First Name"
            className="form-control mb-4"
            type="text"
            id="first_name"
            name="first_name"
          />
          {getCrrErro("first_name").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{getCrrErro("first_name")}</div>
          )}
          <label htmlFor="last_name">Last Name</label>
          <input
            onChange={getUser}
            placeholder="Last Name"
            className="form-control mb-4"
            type="text"
            id="last_name"
            name="last_name"
          />
          {getCrrErro("last_name").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{getCrrErro("first_name")}</div>
          )}
          <label htmlFor="email">Email</label>
          <input
            onChange={getUser}
            placeholder="Email"
            className="form-control mb-4"
            type="email"
            id="email"
            name="email"
          />
          {getCrrErro("email").length === 0 ? "" : <div className="alert alert-danger">{getCrrErro("email")}</div>}
          <label htmlFor="age">Age</label>
          <input
            onChange={getUser}
            placeholder="Age"
            className="form-control mb-4"
            type="number"
            id="age"
            name="age"
          />
          {getCrrErro("age").length === 0 ? "" : <div className="alert alert-danger">{getCrrErro("age")}</div>}
          <label htmlFor="password">Password</label>
          <input
            onChange={getUser}
            placeholder="Password"
            className="form-control mb-4"
            type="password"
            id="password"
            name="password"
          />
          {getCrrErro("password").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{getCrrErro("password")}</div>
          )}
          {error.length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{error}</div>
          )}
          <button type="submit" className="btn btn-outline-info">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
