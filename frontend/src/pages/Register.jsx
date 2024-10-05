import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
      const res = await axios.post(
        "https://authentication-jwt-backend.vercel.app/register",
        {
          username,
          email,
          password,
        }
      );
      if (res) {
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="w-full h-full bg-zinc-900 flex justify-center items-center">
      <div className="flex flex-col text-center gap-7 bg-zinc-800 p-7 rounded-xl w-1/3">
        <h1 className="text-4xl text-white ">Register</h1>
        <hr />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <input
            className="p-4 text-black outline-none border-none rounded-full"
            type="text"
            name="username"
            placeholder="UserName"
          />
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
            Already have an account?{" "}
            <Link
              className="font-semibold text-purple-400 hover:text-purple-700"
              to="/login"
            >
              Login
            </Link>{" "}
            or{" "}
            <Link
              className="font-semibold text-purple-400 hover:text-purple-700"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
