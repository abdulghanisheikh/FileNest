import {Routes, Route, Navigate} from "react-router-dom";
import FileUpload from "../features/file_manager/pages/FileUpload";
import Documents from "../features/file_manager/pages/Documents";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import Images from "../features/file_manager/pages/Images";
import Media from "../features/file_manager/pages/Media";
import Other from "../features/file_manager/pages/Other";
import Protected from "../features/shared/pages/Protected";

const AppRoutes = () => {
  return <Routes>
        <Route path="/upload-file" element={<Protected>
            <FileUpload />
        </Protected>}></Route>

        <Route path="/documents" element={<Protected>
            <Documents />
        </Protected>}></Route>

        <Route path="/login-page" element={<LoginPage />}></Route>
        <Route path="/" element={<Navigate to="/login-page"/>}></Route>
        <Route path="/signup-page" element={<RegisterPage />}></Route>

        <Route path="/dashboard" element={
            <Protected>
                <Dashboard />
            </Protected>
        }></Route>

        <Route path="/images" element={
            <Protected>
                <Images />
            </Protected>
        }></Route>

        <Route path="/media" element={
            <Protected>
                <Media />
            </Protected>
        }></Route>

        <Route path="/other" element={
            <Protected>
                <Other />
            </Protected>
        }></Route>
    </Routes>
}

export default AppRoutes;