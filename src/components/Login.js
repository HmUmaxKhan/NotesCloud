import React, { useState } from "react";

function Login() {
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

    }
  };

  const [login, setLogin] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  return (
    <div className="container my-4">
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
  );
}

export default Login;
