import React from 'react'
import {Routes,Route,Link} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";

const App=()=>{
  return(
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/register-page" element={<RegisterPage />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  )
}

export default App;