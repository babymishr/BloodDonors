import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Register hone ke baad Dashboard open hoga
    navigate("/donor-dashboard");
  };

  return (
    <>
      <Navbar />

      <div className="register-container">
        <h1>Create Account</h1>

        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            required
          />

          <label>Role</label>
          <select required>
            <option value="">Select Role</option>
            <option>Donor</option>
            <option>Patient</option>
            <option>Hospital</option>
            <option>Blood Bank</option>
            <option>Admin</option>
          </select>

          <label>Blood Group</label>
          <select required>
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            required
          />

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "red",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </span>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Register;