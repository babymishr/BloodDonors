import DashboardPage from "../components/DashboardPage";
import { dashboardRoutes } from "../components/dashboardRoutes";

const metrics = [
  {
    label: "Open cases",
    value: "6",
    detail: "Emergency requests currently in the review queue.",
  },
  {
    label: "Matched donors",
    value: "42",
    detail: "Donors grouped by blood type, location, and availability.",
  },
  {
    label: "Approval time",
    value: "12m",
    detail: "Average time from request submission to review.",
  },
  {
    label: "Fulfillment rate",
    value: "96%",
    detail: "Requests marked complete after hospital confirmation.",
  },
];

const requests = [
  {
    id: "hospital-1",
    title: "ICU request for O+ units",
    description: "Critical shortage flagged by the morning round.",
    bloodType: "O+",
    location: "Ward 4",
    status: "Pending",
    updated: "Updated 2 min ago",
    actions: [
      { label: "Approve", nextStatus: "Approved", tone: "success" },
      { label: "Assign", nextStatus: "Assigned", tone: "info" },
      { label: "Decline", nextStatus: "Declined", tone: "danger" },
    ],
  },
  {
    id: "hospital-2",
    title: "Operation theatre follow-up",
    description: "Backup donors have been prequalified and queued.",
    bloodType: "A+",
    location: "Surgery block",
    status: "In review",
    updated: "Updated 14 min ago",
    actions: [
      { label: "Approve", nextStatus: "Approved", tone: "success" },
      { label: "Escalate", nextStatus: "Escalated", tone: "warning" },
    ],
  },
  {
    id: "hospital-3",
    title: "Pharmacy restock alert",
    description: "Inventory is being synchronized with the blood bank queue.",
    bloodType: "B+",
    location: "Support desk",
    status: "Queued",
    updated: "Updated 31 min ago",
    actions: [
      { label: "Assign", nextStatus: "Assigned", tone: "info" },
      { label: "Close", nextStatus: "Completed", tone: "success" },
    ],
  },
];

const notifications = [
  {
    id: "hospital-notice-1",
    title: "Urgent donor response",
    message: "Two donors accepted the emergency request in the last ten minutes.",
    time: "1 min ago",
    read: false,
  },
  {
    id: "hospital-notice-2",
    title: "Crossmatch complete",
    message: "Lab confirmation is ready for the next approval step.",
    time: "15 min ago",
  },
  {
    id: "hospital-notice-3",
    title: "Queue synced",
    message: "The latest request batch has been mirrored to the operations panel.",
    time: "28 min ago",
  },
];

function HospitalDashboard() {
  return (
    <DashboardPage
      brand="BloodDonors"
      roleLabel="Hospital dashboard"
      title="Care coordination board"
      subtitle="Review emergency requests, match donors, and keep the ward queue synchronized."
      accent="#1d4ed8"
      navigation={dashboardRoutes}
      spotlight={{
        label: "Clinical workflow",
        title: "The queue is live and the team can resolve requests faster.",
        description:
          "Search urgent items, push approvals, and follow the notifications stream while the patient care team works.",
        badges: ["Request review", "Search by ward", "Live notifications"],
      }}
      metrics={metrics}
      requests={requests}
      notifications={notifications}
    />
  );
}

export default HospitalDashboard;
