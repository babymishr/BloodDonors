const db = require("../config/db");

// Create Hospital
const createHospital = (req, res) => {
  const {
    user_id,
    hospital_name,
    city,
    area,
    pincode,
    address,
    contact_number,
  } = req.body;

  const sql = `
    INSERT INTO hospitals
    (user_id, hospital_name, city, area, pincode, address, contact_number)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      user_id,
      hospital_name,
      city,
      area,
      pincode,
      address,
      contact_number,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Create Hospital",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Hospital Created Successfully",
      });
    }
  );
};

// Get All Hospitals
const getAllHospitals = (req, res) => {
  db.query("SELECT * FROM hospitals", (err, result) => {
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

// Get Hospital By ID
const getHospitalById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM hospitals WHERE hospital_id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Fetch Hospital",
          error: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Hospital Not Found",
        });
      }

      res.status(200).json({
        message: "Hospital Found",
        hospital: result[0],
      });
    }
  );
};

// Update Hospital
const updateHospital = (req, res) => {
  const { id } = req.params;

  const {
    hospital_name,
    city,
    area,
    pincode,
    address,
    contact_number,
  } = req.body;

  const sql = `
    UPDATE hospitals
    SET
      hospital_name = ?,
      city = ?,
      area = ?,
      pincode = ?,
      address = ?,
      contact_number = ?
    WHERE hospital_id = ?
  `;

  db.query(
    sql,
    [
      hospital_name,
      city,
      area,
      pincode,
      address,
      contact_number,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Update Hospital",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Hospital Not Found",
        });
      }

      res.status(200).json({
        message: "Hospital Updated Successfully",
      });
    }
  );
};

// Delete Hospital
const deleteHospital = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM hospitals WHERE hospital_id = ?",
    [id],
    (err, result) => {
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
    }
  );
};

module.exports = {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
};