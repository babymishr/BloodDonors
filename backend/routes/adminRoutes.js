const express = require("express");
const router = express.Router();

const { 
    getDashboard ,
    getPendingRequests,
    getAcceptedRequests,
    getRejectedRequests,
    getCompletedRequests,
    getAllDonorsAdmin,
    getAllPatientsAdmin,
    getAllHospitalsAdmin,
    getAllBloodBanksAdmin,
    deleteDonorAdmin,
    deletePatientAdmin,
    deleteHospitalAdmin,
    deleteBloodBankAdmin,
    verifyHospital,
    verifyBloodBank,
} = require("../controllers/adminController");



router.get("/dashboard", getDashboard);
router.get("/pending", getPendingRequests);
router.get("/accepted", getAcceptedRequests);
router.get("/rejected", getRejectedRequests);
router.get("/completed", getCompletedRequests);
router.get("/donors", getAllDonorsAdmin);
router.get("/patients", getAllPatientsAdmin);
router.get("/hospitals", getAllHospitalsAdmin);
router.get("/bloodbanks", getAllBloodBanksAdmin);
router.delete("/donors/:id", deleteDonorAdmin);
router.delete("/patients/:id", deletePatientAdmin);
router.delete("/hospitals/:id", deleteHospitalAdmin);
router.delete("/bloodbanks/:id", deleteBloodBankAdmin);
router.put("/hospitals/:id/verify", verifyHospital);
router.put("/bloodbanks/:id/verify", verifyBloodBank);


module.exports = router;