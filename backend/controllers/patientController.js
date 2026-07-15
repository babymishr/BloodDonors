const db = require("../config/db");

const createPatient = (req, res) => {
  const {
    user_id,
    blood_group,
    age,
    gender,
    city,
    area,
    pincode,
    hospital_name,
    disease,
  } = req.body;

  const sql = `
    INSERT INTO patients
    (user_id, blood_group, age, gender, city, area, pincode, hospital_name, disease)
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
      hospital_name,
      disease,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Create Patient",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Patient Created Successfully",
      });
    }
  );
};
const getAllPatients = (req, res) => {
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

const getPatientById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM patients WHERE patient_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Patient",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Patient Not Found",
      });
    }

    res.status(200).json({
      message: "Patient Found",
      patient: result[0],
    });
  });
};

const updatePatient = (req, res) => {
  const { id } = req.params;

  const {
    blood_group,
    age,
    gender,
    city,
    area,
    pincode,
    hospital_name,
    disease,
  } = req.body;

  const sql = `
    UPDATE patients
    SET blood_group = ?,
        age = ?,
        gender = ?,
        city = ?,
        area = ?,
        pincode = ?,
        hospital_name = ?,
        disease = ?
    WHERE patient_id = ?
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
      hospital_name,
      disease,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Update Patient",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Patient Not Found",
        });
      }

      res.status(200).json({
        message: "Patient Updated Successfully",
      });
    }
  );
};

const deletePatient = (req, res) => {
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
module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
deletePatient,
};