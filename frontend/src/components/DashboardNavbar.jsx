import "./dashboard-layout.css";

function DashboardNavbar() {
  return (
    <header className="dashboard-navbar">
      <h1 className="dashboard-navbar__title">Donor Dashboard</h1>

      <button type="button" className="dashboard-navbar__button">
        Logout
      </button>
    </header>
  );
}

export default DashboardNavbar;