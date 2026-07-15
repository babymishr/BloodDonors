import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav>
      <h2>BloodDonors</h2>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/blood-groups">Blood Groups</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/register">Register</Link>
        </li>

        <li>
          <Link to="/donor-dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;