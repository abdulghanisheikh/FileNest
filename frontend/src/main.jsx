import { createRoot } from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import "react-toastify/ReactToastify.css";
import './app/index.css';
import App from './app/App.jsx';
import { UpdateProvider } from "./context/Update.jsx";
import { AuthContextProvider } from './features/auth/auth.context.jsx';
import { FileManagerContextProvider } from './features/file_manager/file_manager.context.jsx';

createRoot(document.getElementById('root')).render(
  <FileManagerContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
      <UpdateProvider>
        <App />
      </UpdateProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </FileManagerContextProvider>
);