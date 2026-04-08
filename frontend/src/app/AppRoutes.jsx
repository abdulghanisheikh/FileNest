import {Routes, Route, Navigate} from "react-router-dom";
import FileUpload from "../features/file_manager/pages/FileUpload";
import Documents from "../features/file_manager/pages/Documents";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import Images from "../features/file_manager/pages/Images";
import Media from "../features/file_manager/pages/Media";
import Other from "../features/file_manager/pages/Other";

const AppRoutes = () => {
  return <Routes>
        <Route path="/upload-file" element={<FileUpload />}></Route>
        <Route path="/documents" element={<Documents />}></Route>
        <Route path="/login-page" element={<LoginPage />}></Route>
        <Route path="/" element={<Navigate to="/login-page"/>}></Route>
        <Route path="/signup-page" element={<RegisterPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/images" element={<Images />}></Route>
        <Route path="/media" element={<Media/>}></Route>
        <Route path="/other" element={<Other />}></Route>
    </Routes>
}

export default AppRoutes;