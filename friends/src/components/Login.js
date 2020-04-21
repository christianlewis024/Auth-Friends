import React, { useState } from "react";

import { axiosWithAuth } from "./axiosWithAuth";

function Login({ history }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    setIsFetching(true);

    axiosWithAuth()
      .post("/login", credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        history.push("/protected");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          placeholder="username . . ."
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password . . ."
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Login</button>
        {isFetching && "logging in"}
      </form>
    </div>
  );
}

export default Login;
