import React from "react";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";


const App = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      {/* <Login/> */}
      {/* <Signup/> */}
      <Dashboard/>
    </div>
  );
};

export default App;
