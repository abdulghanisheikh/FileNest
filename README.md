# FileNest

## 🚀 Overview
FileNest is a comprehensive file management system that allows users to securely store, organize, and share their files. It provides a user-friendly interface for uploading, viewing, and managing various types of files, including documents, images, and multimedia. FileNest is designed to be a one-stop solution for all your file storage needs, ensuring that your files are always safe and easily accessible.

## ✨ Features
- 📄 **Document Management**: Easily upload, view, and manage documents of various types.
- 🖼️ **Image Storage**: Store and organize images with ease.
- 🎥 **Multimedia Support**: Upload and manage videos and audio files.
- 🔒 **Security**: Secure file storage with authentication and authorization.
- 📈 **Usage Tracking**: Monitor file usage and storage.
- 🌐 **Cross-Platform Access**: Access your files from anywhere with an internet connection.

## 🛠️ Tech Stack
- **Programming Language**: JavaScript
- **Frameworks and Libraries**:
  - **Backend**: Express.js, Mongoose, Supabase
  - **Frontend**: React, React Router, Tailwind CSS
  - **Other**: Axios, React Icons, React Toastify
- **System Requirements**: Node.js, MongoDB, Supabase

## 📦 Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- Supabase account

### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/FileNest.git

# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
npm run dev

# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

### Alternative Installation Methods
- **Docker**: You can use Docker to set up the entire environment. Check the Dockerfile for instructions.
- **Development Setup**: Follow the setup instructions in the `README.md` file for the respective directories.

## 🎯 Usage

### Basic Usage
```javascript
// Example of uploading a file
const formData = new FormData();
formData.append('uploaded-file', file);
axios.post('http://localhost:3000/user/upload', formData, {
  withCredentials: true
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});
```

### Advanced Usage
- **Configuration**: Customize the configuration files to suit your needs.
- **API Documentation**: Refer to the API documentation for more advanced usage.

## 📁 Project Structure
```
FileNest/
├── backend/
│   ├── .gitignore
│   ├── app.js
│   ├── config/
│   │   ├── db.config.js
│   │   ├── multer.config.js
│   │   └── supabase.config.js
│   ├── controllers/
│   │   ├── auth.js
│   │   ├── file.js
│   │   ├── upload.js
│   │   └── user.js
│   ├── middlewares/
│   │   └── isLoggedIn.js
│   ├── models/
│   │   ├── file.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── file.routes.js
│   │   └── user.routes.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── .gitignore
│   ├── .flowbite-react/
│   │   ├── config.json
│   │   └── init.tsx
│   ├── .eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Documents.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── Images.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Media.jsx
│   │   │   ├── Other.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── vite.config.js
│   └── README.md
├── README.md
└── LICENSE
```

## 🔧 Configuration
- **Environment Variables**: Set up environment variables in a `.env` file.
- **Configuration Files**: Customize the configuration files as needed.

## 📝 License
This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors
Abdul Ghani