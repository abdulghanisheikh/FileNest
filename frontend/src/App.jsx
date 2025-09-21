import React from 'react'
import {Routes,Route,Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";
import FileUpload from "./pages/FileUpload";
import Documents from "./pages/Documents";

const App=()=>{
  return(
    <Routes>
      <Route path="/upload-file" element={<FileUpload />}></Route>
      <Route path="/documents" element={<Documents />}></Route>
      <Route path="/login-page" element={<LoginPage />}></Route>
      <Route path="/" element={<Navigate to="/login-page"/>}></Route>
      <Route path="/signup-page" element={<RegisterPage />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  )
}

export default App;