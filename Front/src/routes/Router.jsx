import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
import DashboardPage from "../pages/DashboardPage";
import DetailPage from "../pages/DetailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Router = () => {
  return (
    <BrowserRouter basename="">
      <ToastContainer
        position="top-center"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/:username/dashboard" element={<DashboardPage />} />
        <Route path="/:resourceType/:id_resource" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
