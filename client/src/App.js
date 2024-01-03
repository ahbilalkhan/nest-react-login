import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Application from "./components/Application";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "./utils/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <div>
        <Router>
          <Routes>
            {/* Sign Up Route */}
            <Route path="/signup" element={<AuthForm isLogin={false} />} />

            {/* Sign In Route */}
            <Route path="/signin" element={<AuthForm isLogin={true} />} />

            {/* Application Root Route */}
            <Route path="/" element={<Application />} />
          </Routes>
        </Router>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </ErrorBoundary>
  );
};

export default App;
