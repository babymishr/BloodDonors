import DashboardPage from "../components/DashboardPage";
import { dashboardRoutes } from "../components/dashboardRoutes";

const metrics = [
  {
    label: "Total donations",
    value: "8",
    detail: "Your donation history is ready for quick review.",
  },
  {
    label: "Match rate",
    value: "94%",
    detail: "Nearby requests are aligned with your blood group.",
  },
  {
    label: "Upcoming reminder",
    value: "12 days",
    detail: "The next donation slot is already on the calendar.",
  },
  {
    label: "Unread alerts",
    value: "3",
    detail: "Updates from the hospital and blood bank are waiting.",
  },
];

const requests = [
  {
    id: "donor-1",
    title: "City clinic needs O+ donors",
    description: "Two donation slots are open for this afternoon.",
    bloodType: "O+",
    location: "5 km away",
    status: "Open",
    updated: "Updated 4 min ago",
    actions: [
      { label: "Accept", nextStatus: "Accepted", tone: "success" },
      { label: "Snooze", nextStatus: "Snoozed", tone: "neutral" },
    ],
  },
  {
    id: "donor-2",
    title: "Family emergency request",
    description: "The request is waiting for a nearby donor response.",
    bloodType: "A+",
    location: "Downtown hospital",
    status: "Pending",
    updated: "Updated 12 min ago",
    actions: [
      { label: "Accept", nextStatus: "Accepted", tone: "success" },
      { label: "Decline", nextStatus: "Declined", tone: "danger" },
    ],
  },
  {
    id: "donor-3",
    title: "Verification complete",
    description: "Your profile is ready for the next scheduled donation.",
    bloodType: "O+",
    location: "Profile center",
    status: "Verified",
    updated: "Updated 1 hour ago",
    actions: [
      { label: "Review", nextStatus: "Reviewed", tone: "info" },
      { label: "Snooze", nextStatus: "Snoozed", tone: "neutral" },
    ],
  },
];

const notifications = [
  {
    id: "donor-notice-1",
    title: "Donation reminder",
    message: "Your next eligible slot is coming up in less than two weeks.",
    time: "5 min ago",
    read: false,
  },
  {
    id: "donor-notice-2",
    title: "Matching request received",
    message: "A nearby hospital needs your blood group and location is a match.",
    time: "18 min ago",
  },
  {
    id: "donor-notice-3",
    title: "Profile verified",
    message: "Your donor profile has been confirmed by the support team.",
    time: "32 min ago",
  },
];

function DonorDashboard() {
  return (
    <DashboardPage
      brand="BloodDonors"
      roleLabel="Donor dashboard"
      title="Welcome back, Bebee"
      subtitle="Track requests, reminders, and your donation history from one place."
      accent="#b91c1c"
      navigation={dashboardRoutes}
      spotlight={{
        label: "Donation match",
        title: "Three requests match your profile right now.",
        description:
          "Use search to find the latest request, scan the notifications panel, and accept a match when you are ready.",
        badges: ["Nearby matches", "Reminder set", "Notifications on"],
      }}
      metrics={metrics}
      requests={requests}
      notifications={notifications}
    />
  );
}

export default DonorDashboard;
