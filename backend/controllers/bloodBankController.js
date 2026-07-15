const db = require("../config/db");

// Create Blood Bank
const createBloodBank = (req, res) => {
  const {
    user_id,
    blood_bank_name,
    city,
    area,
    pincode,
    address,
    contact_number,
  } = req.body;

  const sql = `
    INSERT INTO blood_banks
    (user_id, blood_bank_name, city, area, pincode, address, contact_number)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      user_id,
      blood_bank_name,
      city,
      area,
      pincode,
      address,
      contact_number,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Create Blood Bank",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Blood Bank Created Successfully",
      });
    }
  );
};

// Get All Blood Banks
const getAllBloodBanks = (req, res) => {
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

// Get Blood Bank By ID
const getBloodBankById = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT * FROM blood_banks WHERE blood_bank_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Blood Bank",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Blood Bank Not Found",
      });
    }

    res.status(200).json({
      message: "Blood Bank Found",
      bloodBank: result[0],
    });
  });
};

// Update Blood Bank
const updateBloodBank = (req, res) => {
  const { id } = req.params;

  const {
    blood_bank_name,
    city,
    area,
    pincode,
    address,
    contact_number,
  } = req.body;

  const sql = `
    UPDATE blood_banks
    SET
      blood_bank_name = ?,
      city = ?,
      area = ?,
      pincode = ?,
      address = ?,
      contact_number = ?
    WHERE blood_bank_id = ?
  `;

  db.query(
    sql,
    [
      blood_bank_name,
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
          message: "Failed to Update Blood Bank",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Blood Bank Not Found",
        });
      }

      res.status(200).json({
        message: "Blood Bank Updated Successfully",
      });
    }
  );
};

// Delete Blood Bank
const deleteBloodBank = (req, res) => {
  const { id } = req.params;

  const sql =
    "DELETE FROM blood_banks WHERE blood_bank_id = ?";

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

module.exports = {
  createBloodBank,
  getAllBloodBanks,
  getBloodBankById,
  updateBloodBank,
  deleteBloodBank,
}