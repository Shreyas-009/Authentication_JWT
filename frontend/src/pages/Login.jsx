import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = axios
        .post("https://authentication-jwt-backend.vercel.app/login", {
          email,
          password,
        })
        .then((res) => {
          console.log(res.data.data);
          localStorage.setItem("token", res.data.data);

          alert(res.data.message);
          navigate("/dashboard");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full bg-zinc-900 flex justify-center items-center">
      <div className="flex flex-col text-center gap-7 bg-zinc-800 p-7 rounded-xl w-1/3">
        <h1 className="text-4xl text-white ">Login</h1>
        <hr />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <input
            className="p-4 text-black outline-none border-none rounded-full"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="p-4 text-black outline-none border-none rounded-full"
            type="text"
            name="password"
            placeholder="Password"
          />
          <input
            className="p-4 bg-purple-400 hover:bg-purple-600 font-semibold rounded-full text-white text-xl"
            type="submit"
          />
        </form>
        <div>
          <span className="text-xl text-white">
            Don't have an account?{" "}
            <Link
              className="font-semibold text-purple-400 hover:text-purple-700"
              to="/"
            >
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
