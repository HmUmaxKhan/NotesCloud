import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {

  let navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers:{
      "content-type": "application/json",
      },
      body: JSON.stringify({email:login.email,password:login.password}),
    });
    let result = await res.json();
    console.log(result);

    if(result.success){
       localStorage.setItem("token", result.authtoken);
    
     props.showAlert("Successfully Logged In","success")
     navigate("/");
    }else{
        props.showAlert("Please enter correct credentials","danger");
    }
  };

  const [login, setLogin] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  return (
    <div style={{height:"80vh"}}>
    <div className="container my-4">
    <div className="container text-center my-5"><h2>Login</h2></div>
    <div className="container" style={{border:"solid black 1px", borderRadius:"25px", height:"20rem", boxShadow: "5px 10px #888888"}}>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
