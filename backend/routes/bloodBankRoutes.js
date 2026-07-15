const express = require("express");
const router = express.Router();

const {
  createBloodBank,
  getAllBloodBanks,
  getBloodBankById,
  updateBloodBank,
  deleteBloodBank,
} = require("../controllers/bloodBankController");

router.post("/create", createBloodBank);

router.get("/", getAllBloodBanks);

router.get("/:id", getBloodBankById);

router.put("/:id", updateBloodBank);

router.delete("/:id", deleteBloodBank);

module.exports = router;