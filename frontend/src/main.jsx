import { createRoot } from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import "react-toastify/ReactToastify.css";
import './app/index.css';
import App from './app/App.jsx';
import { AuthContextProvider } from './features/auth/auth.context.jsx';
import { FileManagerContextProvider } from './features/file_manager/file_manager.context.jsx';
import { SummaryContextProvider } from './features/ai_summary/summary.context.jsx';

createRoot(document.getElementById('root')).render(
	<SummaryContextProvider>
		<FileManagerContextProvider>
		<AuthContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthContextProvider>
		</FileManagerContextProvider>
	</SummaryContextProvider>
);