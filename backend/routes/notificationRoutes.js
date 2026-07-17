const express = require("express");
const router = express.Router();

const {
  createNotification,
  getAllNotifications,
  getNotificationById,
  markNotificationAsRead,
  deleteNotification,
  getUnreadNotifications,
  getNotificationCount,
  getNotificationsByUser,
} = require("../controllers/notificationController");


router.post("/create", createNotification);
router.get("/", getAllNotifications);
router.get("/:id", getNotificationById);
router.put("/read/:id", markNotificationAsRead);
router.delete("/:id", deleteNotification);
router.get("/unread/all", getUnreadNotifications);
router.get("/count/unread", getNotificationCount);
router.get("/user/:userId", getNotificationsByUser);


module.exports = router;