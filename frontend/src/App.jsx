import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import DonorDashboard from "./pages/DonorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import BloodBankDashboard from "./pages/BloodBankDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        <Route path="/bloodbank-dashboard" element={<BloodBankDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;