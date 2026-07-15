const db = require("../config/db");

const createDonor = (req, res) => {
  const {
    user_id,
    blood_group,
    age,
    gender,
    city,
    area,
    pincode,
    availability,
    last_donation_date,
  } = req.body;

  const sql = `
    INSERT INTO donors
    (user_id, blood_group, age, gender, city, area, pincode, availability, last_donation_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      user_id,
      blood_group,
      age,
      gender,
      city,
      area,
      pincode,
      availability,
      last_donation_date,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Create Donor",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Donor Created Successfully",
      });
    }
  );
};

const getAllDonors = (req, res) => {
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

const getDonorById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM donors WHERE donor_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Donor",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Donor Not Found",
      });
    }

    res.status(200).json({
      message: "Donor Found",
      donor: result[0],
    });
  });
};


const updateDonor = (req, res) => {
  const { id } = req.params;

  const {
    blood_group,
    age,
    gender,
    city,
    area,
    pincode,
    availability,
    last_donation_date,
  } = req.body;

  const sql = `
    UPDATE donors
    SET
      blood_group = ?,
      age = ?,
      gender = ?,
      city = ?,
      area = ?,
      pincode = ?,
      availability = ?,
      last_donation_date = ?
    WHERE donor_id = ?
  `;

  db.query(
    sql,
    [
      blood_group,
      age,
      gender,
      city,
      area,
      pincode,
      availability,
      last_donation_date,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Update Donor",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Donor Not Found",
        });
      }

      res.status(200).json({
        message: "Donor Updated Successfully",
      });
    }
  );
};

const deleteDonor = (req, res) => {
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


const searchDonors = (req, res) => {
  const { blood_group, city } = req.query;

  const sql = `
    SELECT * FROM donors
    WHERE blood_group = ? AND city = ? AND availability = true
  `;

  db.query(sql, [blood_group, city], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Search Failed",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Matching Donors",
      total: result.length,
      donors: result,
    });
  });
};

module.exports = {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
  searchDonors,
};