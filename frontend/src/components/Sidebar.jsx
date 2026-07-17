import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="dashboard-sidebar-card">
      <h2 className="dashboard-sidebar-card__title">BloodDonors</h2>

      <nav aria-label="Sidebar navigation">
        <ul className="dashboard-sidebar-card__list">
          <li>
            <Link to="/donor-dashboard" className="dashboard-sidebar-card__link">
              Dashboard
            </Link>
          </li>
          
          <li>
            <Link to="/search" className="dashboard-sidebar-card__link">
              Search Donor
            </Link>
          </li>

          <li>
            <Link to="/notifications" className="dashboard-sidebar-card__link">
              Notifications
            </Link>
          </li>

          <li>
            <Link to="/profile" className="dashboard-sidebar-card__link">
              Profile
            </Link>
          </li>

          <li>
            <Link to="/settings" className="dashboard-sidebar-card__link">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;