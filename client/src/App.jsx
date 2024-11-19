import React, { Children } from "react";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("user")
  if (!isLoggedIn  && ['/'].includes(window.location.pathname)) {
    return <Navigate to={"/signup"} />;  
  } else if (isLoggedIn && ['/login', '/signup'].includes(window.location.pathname)){
    return <Navigate to={"/"} />;
  }
  return children;
};


const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute>
            <Signup />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
