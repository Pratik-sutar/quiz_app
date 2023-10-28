import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Quiz from "./Components/Quiz";
import Login from "./Components/Login";
import Register from "./Components/Register";
import UserProtectedRoutes from "./Routes/UserProtectedRoutes";
import AdminProtectedRoutes from "./Routes/AdminProtectedRoutes";
import Profile from "./Components/Profile";
import Dashboard from "./Components/Dashboard";
import Result from "./Components/Result";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route element={<AdminProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<UserProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/result/:ResultId" element={<Result />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
