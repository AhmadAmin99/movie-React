import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

export default function Login({ decodeToken }) {
  const [flag, setFlag] = useState(false);

  const [errList, setErrList] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  let navigate = useNavigate();

  function getUser(e) {
    setErrList([]);
    setError("");
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    // console.log(newUser);
    setUser(newUser);
  }

  async function submitRegister(e) {
    e.preventDefault();
    setFlag(true);
    const vaildUser = Joi.object({
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
      setFlag(false);
    } else {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signin",
        user
      );

      // console.log(data);

      if (data.message === "success") {
        localStorage.setItem("tkn", data.token);
        decodeToken();
        navigate("/home");
      } else {
        setError(data.message);
      }
      setFlag(false);
    }
  }

  return (
    <>
      <h2 className="text-center my-3">Login Form</h2>
      <div className="w-75 m-auto mb-5">
        <form onSubmit={submitRegister}>
          {errList.map((err, idx) => (
            <div className="alert alert-danger" key={idx}>
              {err.message}
            </div>
          ))}

          <label htmlFor="email">Email</label>
          <input
            onChange={getUser}
            placeholder="Email"
            className="form-control mb-4"
            type="email"
            id="email"
            name="email"
          />

          <label htmlFor="password">Password</label>
          <input
            onChange={getUser}
            placeholder="Password"
            className="form-control mb-4"
            type="password"
            id="password"
            name="password"
          />

          {error.length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{error}</div>
          )}

          <button type="submit" className="btn btn-outline-info">
            {flag ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
