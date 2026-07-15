const express = require("express");
const router = express.Router();

const {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  acceptRequest,
  rejectRequest,
  completeRequest,
} = require("../controllers/requestController");

router.post("/create", createRequest);
router.get("/", getAllRequests);
router.get("/:id", getRequestById);
router.put("/:id", updateRequest);
router.delete("/:id", deleteRequest);
router.put("/:id/accept", acceptRequest);
router.put("/:id/reject", rejectRequest);
router.put("/:id/complete", completeRequest);

module.exports = router;