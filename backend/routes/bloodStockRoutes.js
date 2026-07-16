const express = require("express");
const router = express.Router();

const {
  createBloodStock,
  getAllBloodStock,
  getBloodStockById,
  updateBloodStock,
  deleteBloodStock,
  searchBloodByGroup,
  availableBlood,
  searchBloodByCity,
  getLowStock,
  getOutOfStock,
  increaseStock,
  decreaseStock,
} = require("../controllers/bloodStockController");


router.post("/create", createBloodStock);
router.get("/", getAllBloodStock);
router.get("/:id", getBloodStockById);
router.put("/:id", updateBloodStock);
router.delete("/:id", deleteBloodStock);
router.get("/group/:blood_group", searchBloodByGroup);
router.get("/available/:blood_group", availableBlood);
router.get("/search/:city/:blood_group", searchBloodByCity);
router.get("/lowstock", getLowStock);
router.get("/outofstock", getOutOfStock);
router.put("/increase/:id", increaseStock);
router.put("/decrease/:id", decreaseStock);


module.exports = router;