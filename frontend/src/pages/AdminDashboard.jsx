import DashboardPage from "../components/DashboardPage";
import { dashboardRoutes } from "../components/dashboardRoutes";

const metrics = [
  {
    label: "System health",
    value: "98%",
    detail: "Frontend, API, and database checks are green.",
  },
  {
    label: "Pending approvals",
    value: "14",
    detail: "Requests waiting for admin review or escalation.",
  },
  {
    label: "Deployment pipeline",
    value: "Ready",
    detail: "Build passed and release notes are approved.",
  },
  {
    label: "Open incidents",
    value: "2",
    detail: "One notification escalation and one sync issue.",
  },
];

const requests = [
  {
    id: "admin-1",
    title: "Regional priority review",
    description: "Approve the hospital request burst from the north zone.",
    bloodType: "Mixed",
    location: "North cluster",
    status: "Pending",
    updated: "Updated 4 min ago",
    actions: [
      { label: "Approve", nextStatus: "Approved", tone: "success" },
      { label: "Escalate", nextStatus: "Escalated", tone: "warning" },
      { label: "Decline", nextStatus: "Declined", tone: "danger" },
    ],
  },
  {
    id: "admin-2",
    title: "Blood bank dispatch queue",
    description: "Release the morning dispatch after inventory verification.",
    bloodType: "O+ / A+",
    location: "Central warehouse",
    status: "In review",
    updated: "Updated 9 min ago",
    actions: [
      { label: "Approve", nextStatus: "Approved", tone: "success" },
      { label: "Hold", nextStatus: "On hold", tone: "neutral" },
    ],
  },
  {
    id: "admin-3",
    title: "Profile verification backlog",
    description: "Review the last set of donor and hospital identity checks.",
    bloodType: "Compliance",
    location: "Operations desk",
    status: "Queued",
    updated: "Updated 17 min ago",
    actions: [
      { label: "Approve", nextStatus: "Approved", tone: "success" },
      { label: "Archive", nextStatus: "Archived", tone: "neutral" },
    ],
  },
];

const notifications = [
  {
    id: "admin-notice-1",
    title: "Frontend build passed",
    message: "The latest production bundle completed without errors.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "admin-notice-2",
    title: "Database sync stable",
    message: "Queued updates have been applied to the request ledger.",
    time: "11 min ago",
  },
  {
    id: "admin-notice-3",
    title: "Escalation logged",
    message: "One hospital request requires manual verification.",
    time: "24 min ago",
    read: false,
  },
  {
    id: "admin-notice-4",
    title: "Deployment notes ready",
    message: "Release checklist, rollback notes, and smoke tests are attached.",
    time: "41 min ago",
  },
];

const deployment = {
  title: "Deployment control",
  summary: "Track the shipping state of the full stack before each release.",
  services: [
    {
      name: "Frontend",
      status: "Ready",
      detail: "Vite build validated with responsive dashboard styles.",
      tone: "success",
    },
    {
      name: "Backend",
      status: "Ready",
      detail: "API routes are synced and request mutations are stable.",
      tone: "success",
    },
    {
      name: "Database",
      status: "Monitoring",
      detail: "Live read/write checks are running after the last deploy.",
      tone: "warning",
    },
  ],
  checklist: [
    { label: "Smoke tests completed", done: true },
    { label: "Rollback plan documented", done: true },
    { label: "Notifications verified", done: true },
    { label: "Post-release audit scheduled", done: false },
  ],
};

function AdminDashboard() {
  return (
    <DashboardPage
      brand="BloodDonors"
      roleLabel="Admin dashboard"
      title="Operations command center"
      subtitle="Manage requests, alerts, deployment health, and the full network from one place."
      accent="#7c2d12"
      navigation={dashboardRoutes}
      spotlight={{
        label: "Release status",
        title: "Deployment is green and the request queue is under control.",
        description:
          "Use search to find urgent items, resolve request backlogs, and confirm the release pipeline before shipping.",
        badges: ["Search enabled", "Request queue live", "Release ready"],
      }}
      metrics={metrics}
      requests={requests}
      notifications={notifications}
      deployment={deployment}
    />
  );
}

export default AdminDashboard;