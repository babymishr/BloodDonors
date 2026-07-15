import { useState } from "react";
import { NavLink } from "react-router-dom";
import { dashboardRoutes } from "./dashboardRoutes";
import "./DashboardPage.css";

const statusToneMap = {
  approved: "success",
  assigned: "info",
  archived: "neutral",
  completed: "success",
  declined: "danger",
  dispatched: "info",
  escalated: "warning",
  inprogress: "info",
  "in progress": "info",
  "in review": "warning",
  packed: "success",
  pending: "warning",
  queued: "neutral",
  ready: "success",
  delayed: "warning",
  "on hold": "neutral",
  open: "warning",
  monitoring: "warning",
  stable: "success",
  verified: "success",
};

function normalize(value) {
  return String(value ?? "").toLowerCase();
}

function getTone(status) {
  return statusToneMap[normalize(status)] ?? "neutral";
}

function DashboardPage({
  brand,
  roleLabel,
  title,
  subtitle,
  accent = "#c2410c",
  navigation = dashboardRoutes,
  spotlight,
  metrics = [],
  requests = [],
  notifications = [],
  deployment,
}) {
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [requestState, setRequestState] = useState(() =>
    requests.map((request, index) => ({
      ...request,
      id: request.id ?? `${request.title}-${index}`,
    })),
  );
  const [notificationState, setNotificationState] = useState(() =>
    notifications.map((notification, index) => ({
      ...notification,
      id: notification.id ?? `${notification.title}-${index}`,
      read: notification.read ?? false,
    })),
  );

  const unreadCount = notificationState.filter((notification) => !notification.read).length;

  const filteredRequests = requestState.filter((request) => {
    const haystack = [
      request.title,
      request.description,
      request.location,
      request.status,
      request.bloodType,
      request.updated,
    ]
      .map(normalize)
      .join(" ");

    return haystack.includes(normalize(search));
  });

  const filteredNotifications = notificationState.filter((notification) => {
    const haystack = [notification.title, notification.message, notification.time]
      .map(normalize)
      .join(" ");

    return haystack.includes(normalize(search));
  });

  const handleRequestAction = (requestId, action) => {
    const targetRequest = requestState.find((request) => request.id === requestId);

    if (!targetRequest) {
      return;
    }

    const nextStatus = action.nextStatus ?? action.label;

    setRequestState((currentRequests) =>
      currentRequests.map((request) =>
        request.id === requestId ? { ...request, status: nextStatus } : request,
      ),
    );

    setNotificationState((currentNotifications) => [
      {
        id: `${requestId}-${action.label}-${Date.now()}`,
        title: `${action.label} applied`,
        message: `${targetRequest.title} moved to ${nextStatus}.`,
        time: "Just now",
        read: false,
      },
      ...currentNotifications,
    ]);
  };

  const markAllRead = () => {
    setNotificationState((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
    setShowNotifications(false);
  };

  return (
    <div className="dashboard-app" style={{ "--accent": accent }}>
      <aside className="dashboard-sidebar">
        <div className="brand-card">
          <span className="brand-name">{brand}</span>
          <h1>{title}</h1>
          <p>{roleLabel}</p>
        </div>

        <nav className="sidebar-nav" aria-label="Dashboard navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link${isActive ? " is-active" : ""}`
              }
            >
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-summary">
          <span className="section-kicker">{spotlight?.label ?? "Live status"}</span>
          <h2>{spotlight?.title ?? "All systems connected"}</h2>
          <p>
            {spotlight?.description ??
              "Search requests, track notifications, and keep the queue moving from one control center."}
          </p>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-copy">
            <span className="eyebrow">{roleLabel}</span>
            <h2>{subtitle}</h2>
            <p>
              {spotlight?.description ??
                "Monitor updates, search requests, and respond to alerts without leaving the page."}
            </p>
          </div>

          <div className="topbar-actions">
            <label className="search-field">
              <span>Search</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search requests and notifications"
              />
            </label>

            <div className="notification-wrap">
              <button
                type="button"
                className="notification-button"
                onClick={() => setShowNotifications((current) => !current)}
                aria-expanded={showNotifications}
              >
                Notifications
                <span className="notification-count">{unreadCount}</span>
              </button>

              {showNotifications ? (
                <div className="notification-panel">
                  <div className="panel-header compact">
                    <div>
                      <span className="section-kicker">Notifications</span>
                      <h3>{unreadCount} unread</h3>
                    </div>

                    <button
                      type="button"
                      className="text-button"
                      onClick={markAllRead}
                      disabled={!unreadCount}
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="notification-list">
                    {filteredNotifications.length ? (
                      filteredNotifications.map((notification) => (
                        <article
                          key={notification.id}
                          className={`notification-item${notification.read ? "" : " is-unread"}`}
                        >
                          <div className="notification-dot" />
                          <div>
                            <h4>{notification.title}</h4>
                            <p>{notification.message}</p>
                            <span>{notification.time}</span>
                          </div>
                        </article>
                      ))
                    ) : (
                      <p className="empty-state">No matching notifications.</p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="hero-card">
            <div>
              <span className="section-kicker">{spotlight?.label ?? "Priority update"}</span>
              <h3>{spotlight?.title ?? "Request flow is stable"}</h3>
              <p>
                {spotlight?.description ??
                  "Keep the queue moving with search, response actions, and live system visibility."}
              </p>
            </div>

            <div className="hero-badges">
              {(spotlight?.badges ?? ["Search enabled", "Live notifications", "Request actions"]).map(
                (badge) => (
                  <span key={badge} className="hero-badge">
                    {badge}
                  </span>
                ),
              )}
            </div>
          </section>

          <section className="stats-grid">
            {metrics.map((metric) => (
              <article key={metric.label} className="stat-card">
                <span className="section-kicker">{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.detail}</p>
              </article>
            ))}
          </section>

          <section className="dashboard-grid">
            <article className="panel panel-large">
              <div className="panel-header">
                <div>
                  <span className="section-kicker">Request management</span>
                  <h3>{requestState.length} live records</h3>
                </div>

                <span className="panel-subtitle">
                  {filteredRequests.length} visible with the current search
                </span>
              </div>

              {filteredRequests.length ? (
                <div className="request-table">
                  <div className="request-table-head">
                    <span>Request</span>
                    <span>Details</span>
                    <span>Status</span>
                    <span>Actions</span>
                  </div>

                  {filteredRequests.map((request) => (
                    <article key={request.id} className="request-row">
                      <div>
                        <h4>{request.title}</h4>
                        <p>{request.description}</p>
                      </div>

                      <div className="request-meta">
                        <span>{request.bloodType ?? "Shared"}</span>
                        <span>{request.location}</span>
                        <span>{request.updated}</span>
                      </div>

                      <span className={`status-pill status-pill--${getTone(request.status)}`}>
                        {request.status}
                      </span>

                      <div className="request-actions">
                        {(request.actions ?? []).map((action) => (
                          <button
                            key={action.label}
                            type="button"
                            className={`action-button action-button--${action.tone ?? "neutral"}`}
                            onClick={() => handleRequestAction(request.id, action)}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No requests match your search.</p>
              )}
            </article>

            <article className="panel">
              <div className="panel-header">
                <div>
                  <span className="section-kicker">Notifications</span>
                  <h3>Activity stream</h3>
                </div>

                <button type="button" className="text-button" onClick={markAllRead} disabled={!unreadCount}>
                  Mark all read
                </button>
              </div>

              <div className="notification-feed">
                {filteredNotifications.length ? (
                  filteredNotifications.map((notification) => (
                    <article
                      key={notification.id}
                      className={`notification-item${notification.read ? "" : " is-unread"}`}
                    >
                      <div className="notification-dot" />
                      <div>
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <span>{notification.time}</span>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="empty-state">No matching notifications.</p>
                )}
              </div>
            </article>
          </section>

          {deployment ? (
            <section className="panel deployment-panel">
              <div className="panel-header">
                <div>
                  <span className="section-kicker">Deployment</span>
                  <h3>{deployment.title}</h3>
                </div>

                <p className="panel-subtitle">{deployment.summary}</p>
              </div>

              <div className="deployment-grid">
                <div className="service-list">
                  {deployment.services.map((service) => (
                    <article key={service.name} className="service-card">
                      <div className="service-head">
                        <h4>{service.name}</h4>
                        <span className={`status-pill status-pill--${service.tone ?? getTone(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                      <p>{service.detail}</p>
                    </article>
                  ))}
                </div>

                <div className="checklist-card">
                  <h4>Release checklist</h4>
                  <div className="checklist-list">
                    {deployment.checklist.map((item) => (
                      <label key={item.label} className="checklist-item">
                        <input type="checkbox" checked={item.done} readOnly />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
