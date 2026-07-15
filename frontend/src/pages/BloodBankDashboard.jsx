import DashboardPage from "../components/DashboardPage";
import { dashboardRoutes } from "../components/dashboardRoutes";

const metrics = [
  {
    label: "Units in stock",
    value: "184",
    detail: "Live stock count across all grouped blood types.",
  },
  {
    label: "Expiring soon",
    value: "12",
    detail: "Units that need dispatch or reallocation today.",
  },
  {
    label: "Pickup requests",
    value: "7",
    detail: "Hospitals and clinics waiting for dispatch approval.",
  },
  {
    label: "Screening queue",
    value: "9",
    detail: "Donations and samples ready for lab verification.",
  },
];

const requests = [
  {
    id: "bank-1",
    title: "Dispatch for Metro clinic",
    description: "Packing list generated for the afternoon pickup.",
    bloodType: "O+",
    location: "Dispatch bay 2",
    status: "Ready",
    updated: "Updated 6 min ago",
    actions: [
      { label: "Pack", nextStatus: "Packed", tone: "success" },
      { label: "Dispatch", nextStatus: "Dispatched", tone: "info" },
      { label: "Delay", nextStatus: "Delayed", tone: "warning" },
    ],
  },
  {
    id: "bank-2",
    title: "Inventory audit correction",
    description: "Reconcile units between the cold storage racks.",
    bloodType: "All types",
    location: "Cold room A",
    status: "Queued",
    updated: "Updated 18 min ago",
    actions: [
      { label: "Approve", nextStatus: "Approved", tone: "success" },
      { label: "Escalate", nextStatus: "Escalated", tone: "warning" },
    ],
  },
  {
    id: "bank-3",
    title: "Donation screening batch",
    description: "Lab team can begin the next screening cycle.",
    bloodType: "A+ / B+",
    location: "Lab wing",
    status: "In review",
    updated: "Updated 29 min ago",
    actions: [
      { label: "Pack", nextStatus: "Packed", tone: "success" },
      { label: "Hold", nextStatus: "On hold", tone: "neutral" },
    ],
  },
];

const notifications = [
  {
    id: "bank-notice-1",
    title: "Cold storage stable",
    message: "Temperatures are within the safe range for the last six hours.",
    time: "4 min ago",
    read: false,
  },
  {
    id: "bank-notice-2",
    title: "Pickup ready",
    message: "One urgent order can be dispatched after the approval step.",
    time: "19 min ago",
  },
  {
    id: "bank-notice-3",
    title: "Screening complete",
    message: "The morning sample batch has been cleared for the next stage.",
    time: "36 min ago",
  },
];

function BloodBankDashboard() {
  return (
    <DashboardPage
      brand="BloodDonors"
      roleLabel="Blood bank dashboard"
      title="Inventory and dispatch board"
      subtitle="Keep stock, screening, and delivery requests aligned across the network."
      accent="#9a3412"
      navigation={dashboardRoutes}
      spotlight={{
        label: "Stock overview",
        title: "Inventory is healthy and the dispatch queue is moving.",
        description:
          "Search requests, manage pickups, and keep alerts visible before unit counts drift too low.",
        badges: ["Stock control", "Request routing", "Notifications live"],
      }}
      metrics={metrics}
      requests={requests}
      notifications={notifications}
    />
  );
}

export default BloodBankDashboard;
