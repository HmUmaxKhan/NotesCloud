import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: signUp.name,
        email: signUp.email,
        password: signUp.password,
      }),
    });
    let result = await res.json();
    console.log(result);

    if (result.sucess) {
      localStorage.setItem("token", result.authtoken);
      navigate("/login")
    } else {
      props.showAlert("User is created successfully","success")
    }
  };

  const [signUp, setsignUp] = useState({ name: "", email: "", password: "" });

  const handleChange = (event) => {
    setsignUp({ ...signUp, [event.target.name]: event.target.value });
  };

  return (
    <div style={{height:"80vh"}}>
    <div className="container my-4">
    <div className="container text-center my-5">
    <div className="text-center mt-3 my-3 text-bg-light" style={{marginLeft:"30%",marginRight:"30%",borderRadius:"20px",border:"solid 3px green"}}>
    <h2>SignUp</h2>
    </div>
    </div>
    <div className="container bg-light pt-3" style={{paddingBottom:"21rem",border:"solid black 1px", borderRadius:"25px", height:"20rem", boxShadow: "5px 10px green"}}>
      <form onSubmit={handleSubmit}>

      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
          </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
      </form>
      </div>
    </div>
    </div>
  );
}

export default Signup;
