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

module.exports = {
  createDonor,
};