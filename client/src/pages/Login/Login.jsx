import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  console.log(data);
  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
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
            type="email"
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
          <span className="underline text-blue-700">Signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
