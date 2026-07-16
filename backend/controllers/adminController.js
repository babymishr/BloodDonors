const db = require("../config/db");

const getDashboard = (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM donors) AS totalDonors,
      (SELECT COUNT(*) FROM patients) AS totalPatients,
      (SELECT COUNT(*) FROM hospitals) AS totalHospitals,
      (SELECT COUNT(*) FROM blood_banks) AS totalBloodBanks,
      (SELECT COUNT(*) FROM blood_requests) AS totalRequests
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Dashboard",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Admin Dashboard",
      dashboard: result[0],
    });
  });
};

const getPendingRequests = (req, res) => {
  const sql = `
    SELECT * FROM blood_requests
    WHERE status = 'Pending'
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Pending Requests",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Pending Requests",
      total: result.length,
      requests: result,
    });
  });
};

const getAcceptedRequests = (req, res) => {
  const sql = `
    SELECT * FROM blood_requests
    WHERE status = 'Accepted'
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Accepted Requests",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Accepted Requests",
      total: result.length,
      requests: result,
    });
  });
};

const getRejectedRequests = (req, res) => {
  const sql = `
    SELECT * FROM blood_requests
    WHERE status = 'Rejected'
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Rejected Requests",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Rejected Requests",
      total: result.length,
      requests: result,
    });
  });
};

const getCompletedRequests = (req, res) => {
  const sql = `
    SELECT * FROM blood_requests
    WHERE status = 'Completed'
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Completed Requests",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Completed Requests",
      total: result.length,
      requests: result,
    });
  });
};

const getAllDonorsAdmin = (req, res) => {
  const sql = "SELECT * FROM donors";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Donors",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "All Donors",
      total: result.length,
      donors: result,
    });
  });
};

const getAllPatientsAdmin = (req, res) => {
  const sql = "SELECT * FROM patients";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Patients",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "All Patients",
      total: result.length,
      patients: result,
    });
  });
};

const getAllHospitalsAdmin = (req, res) => {
  const sql = "SELECT * FROM hospitals";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Hospitals",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "All Hospitals",
      total: result.length,
      hospitals: result,
    });
  });
};
const getAllBloodBanksAdmin = (req, res) => {
  const sql = "SELECT * FROM blood_banks";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Blood Banks",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "All Blood Banks",
      total: result.length,
      bloodBanks: result,
    });
  });
};

const deleteDonorAdmin = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM donors WHERE donor_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Delete Donor",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Donor Not Found",
      });
    }

    res.status(200).json({
      message: "Donor Deleted Successfully",
    });
  });
};

const deletePatientAdmin = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM patients WHERE patient_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Delete Patient",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Patient Not Found",
      });
    }

    res.status(200).json({
      message: "Patient Deleted Successfully",
    });
  });
};

const deleteHospitalAdmin = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM hospitals WHERE hospital_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Delete Hospital",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Hospital Not Found",
      });
    }

    res.status(200).json({
      message: "Hospital Deleted Successfully",
    });
  });
};

const deleteBloodBankAdmin = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM blood_banks WHERE blood_bank_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Delete Blood Bank",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Blood Bank Not Found",
      });
    }

    res.status(200).json({
      message: "Blood Bank Deleted Successfully",
    });
  });
};


const verifyHospital = (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE hospitals
    SET is_verified = TRUE
    WHERE hospital_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Verify Hospital",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Hospital Not Found",
      });
    }

    res.status(200).json({
      message: "Hospital Verified Successfully",
    });
  });
};

const verifyBloodBank = (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE blood_banks
    SET is_verified = TRUE
    WHERE blood_bank_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Verify Blood Bank",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Blood Bank Not Found",
      });
    }

    res.status(200).json({
      message: "Blood Bank Verified Successfully",
    });
  });
};

module.exports = {
  getDashboard,
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
};