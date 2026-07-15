import DashboardPage from "../components/DashboardPage";
import { dashboardRoutes } from "../components/dashboardRoutes";

const metrics = [
  {
    label: "Matched donors",
    value: "27",
    detail: "Potential donors are sorted by proximity and availability.",
  },
  {
    label: "Active request",
    value: "1",
    detail: "Your current request is being tracked in real time.",
  },
  {
    label: "Response rate",
    value: "91%",
    detail: "The network is responding within the expected window.",
  },
  {
    label: "Next check-in",
    value: "Today",
    detail: "A follow-up reminder is queued for this evening.",
  },
];

const requests = [
  {
    id: "patient-1",
    title: "Emergency request for A- blood",
    description: "Match found in the nearby donor list.",
    bloodType: "A-",
    location: "City hospital",
    status: "In progress",
    updated: "Updated 5 min ago",
    actions: [
      { label: "Refresh match", nextStatus: "In progress", tone: "info" },
      { label: "Escalate", nextStatus: "Escalated", tone: "warning" },
    ],
  },
  {
    id: "patient-2",
    title: "Relative donation confirmation",
    description: "Waiting for verification of the family donor slot.",
    bloodType: "O+",
    location: "District lab",
    status: "Queued",
    updated: "Updated 20 min ago",
    actions: [
      { label: "Approve", nextStatus: "Approved", tone: "success" },
      { label: "Hold", nextStatus: "On hold", tone: "neutral" },
    ],
  },
];

const notifications = [
  {
    id: "patient-notice-1",
    title: "Donor match found",
    message: "Three donors are within your requested radius.",
    time: "3 min ago",
    read: false,
  },
  {
    id: "patient-notice-2",
    title: "Lab verification pending",
    message: "The latest sample check has been sent to the hospital queue.",
    time: "13 min ago",
  },
  {
    id: "patient-notice-3",
    title: "Update received",
    message: "Your request is still active and the support team is watching it.",
    time: "26 min ago",
  },
];

function PatientDashboard() {
  return (
    <DashboardPage
      brand="BloodDonors"
      roleLabel="Patient dashboard"
      title="Recovery request tracker"
      subtitle="See donor matches, request progress, and important follow-ups without leaving the page."
      accent="#0f766e"
      navigation={dashboardRoutes}
      spotlight={{
        label: "Request status",
        title: "Your live request is being tracked and matched automatically.",
        description:
          "Search past updates, review notifications, and keep the care team aligned on the same timeline.",
        badges: ["Live match", "Search history", "Notification stream"],
      }}
      metrics={metrics}
      requests={requests}
      notifications={notifications}
    />
  );
}

export default PatientDashboard;
