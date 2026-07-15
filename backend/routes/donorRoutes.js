const express = require("express");
const router = express.Router();

const {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
  searchDonors,
} = require("../controllers/donorController");


router.post("/create", createDonor);
router.get("/", getAllDonors);
router.get("/search", searchDonors);

router.get("/:id", getDonorById);
router.put("/:id", updateDonor);
router.delete("/:id", deleteDonor);


module.exports = router;