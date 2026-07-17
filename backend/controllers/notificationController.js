const db = require("../config/db");

// Create Notification
const createNotification = (req, res) => {
  const { user_id, title, message, type } = req.body;

  const sql = `
    INSERT INTO notifications (user_id, title, message, type)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [user_id, title, message, type], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Create Notification",
        error: err.message,
      });
    }

    res.status(201).json({
      message: "Notification Created Successfully",
    });
  });
};

// Get All Notifications
const getAllNotifications = (req, res) => {
  const sql = "SELECT * FROM notifications ORDER BY created_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Notifications",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "No Notifications Found",
      });
    }

    res.status(200).json({
      total: result.length,
      notifications: result,
    });
  });
};

const getNotificationById = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT * FROM notifications WHERE notification_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Notification",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Notification Not Found",
      });
    }

    res.status(200).json(result[0]);
  });
};


const markNotificationAsRead = (req, res) => {
  const { id } = req.params;

  const sql =
    "UPDATE notifications SET is_read = TRUE WHERE notification_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Update Notification",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Notification Not Found",
      });
    }

    res.status(200).json({
      message: "Notification Marked as Read",
    });
  });
};

const deleteNotification = (req, res) => {
  const { id } = req.params;

  const sql =
    "DELETE FROM notifications WHERE notification_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Delete Notification",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Notification Not Found",
      });
    }

    res.status(200).json({
      message: "Notification Deleted Successfully",
    });
  });
};

const getUnreadNotifications = (req, res) => {
  const sql = `
    SELECT * FROM notifications
    WHERE is_read = FALSE
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Notifications",
        error: err.message,
      });
    }

    res.status(200).json({
      total: result.length,
      notifications: result,
    });
  });
};

const getNotificationCount = (req, res) => {
  const sql = `
    SELECT COUNT(*) AS total
    FROM notifications
    WHERE is_read = FALSE
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Count Notifications",
        error: err.message,
      });
    }

    res.status(200).json(result[0]);
  });
};


const getNotificationsByUser = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT *
    FROM notifications
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch User Notifications",
        error: err.message,
      });
    }

    res.status(200).json({
      total: result.length,
      notifications: result,
    });
  });
};


module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  markNotificationAsRead,
deleteNotification,
getUnreadNotifications,
getNotificationCount,
getNotificationsByUser,
};