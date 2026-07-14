const express = require("express");
const router = express.Router();

const { createDonor } = require("../controllers/donorController");

router.post("/create", createDonor);

module.exports = router;