import { createRoot } from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import "react-toastify/ReactToastify.css";
import './app/index.css';
import App from './app/App.jsx';
import { AuthContextProvider } from './features/auth/auth.context.jsx';
import { FileManagerContextProvider } from './features/file_manager/file_manager.context.jsx';
import { ProfileManagerContextProvider } from './features/profile_manager/profile_manager.context.jsx';

createRoot(document.getElementById('root')).render(
	<ProfileManagerContextProvider>
		<FileManagerContextProvider>
		<AuthContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthContextProvider>
		</FileManagerContextProvider>
	</ProfileManagerContextProvider>
);