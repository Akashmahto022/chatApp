import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
    console.log(data);
      const response = await axios.post("http://localhost:4000/api/login", data)
      console.log(response)
      if (response.data) {
        localStorage.setItem("user", response.data.user)
        navigate('/')
      }
    } catch (error) {
      console.log("Error while login the user")
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white w-[500px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-2xl font-extrabold">Login Now</div>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email"
            name="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            placeholder="Enter Your Password"
            onChange={handleChange}
          />

          <button type="submit" className="p-2 bg-blue-700 text-white mt-3 rounded-md w-16">
            Login
          </button>
        </form>
        <p>
          if don't have an account go to
          <Link to={'/signup'}>
          <span className="underline text-blue-700"> Signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
