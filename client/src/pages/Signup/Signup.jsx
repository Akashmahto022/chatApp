import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Signup = () => {
  const [data, setData] = useState({
    fullName: "",
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
      const response = await axios.post("http://localhost:4000/api/signup", data)
      console.log(response)
      setData("")
      navigate('/login')

    } catch (error) {
      console.log("Error while register the user")
    }

  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white w-[500px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-2xl font-extrabold">Sign Up Now</div>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Full Name"
            name="fullName"
            placeholder="Enter Your Name"
            onChange={handleChange}
          />
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

          <button
            type="submit"
            className="p-2 bg-blue-700 text-white mt-3 rounded-md w-16"
          >
            Signup
          </button>
        </form>
        <p>
          if already have an account go to{" "}
          <Link to={"/login"}>
            <span className="underline text-blue-700">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
