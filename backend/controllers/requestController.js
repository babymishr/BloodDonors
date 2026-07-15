const db = require("../config/db");

const createRequest = (req, res) => {
  const {
    patient_id,
    hospital_id,
    blood_group,
    units_required,
    urgency,
    city,
  } = req.body;

  const sql = `
    INSERT INTO blood_requests
    (patient_id, hospital_id, blood_group, units_required, urgency, city)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      patient_id,
      hospital_id,
      blood_group,
      units_required,
      urgency,
      city,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Create Blood Request",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Blood Request Created Successfully",
      });
    }
  );
};

const getAllRequests = (req, res) => {
  const sql = "SELECT * FROM blood_requests";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Requests",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "All Blood Requests",
      total: result.length,
      requests: result,
    });
  });
};

const getRequestById = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT * FROM blood_requests WHERE request_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Request",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Blood Request Not Found",
      });
    }

    res.status(200).json({
      message: "Blood Request Found",
      request: result[0],
    });
  });
};


const updateRequest = (req, res) => {
  const { id } = req.params;

  const {
    patient_id,
    hospital_id,
    blood_group,
    units_required,
    urgency,
    city,
    status,
  } = req.body;

  const sql = `
    UPDATE blood_requests
    SET
      patient_id = ?,
      hospital_id = ?,
      blood_group = ?,
      units_required = ?,
      urgency = ?,
      city = ?,
      status = ?
    WHERE request_id = ?
  `;

  db.query(
    sql,
    [
      patient_id,
      hospital_id,
      blood_group,
      units_required,
      urgency,
      city,
      status,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Update Request",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Blood Request Not Found",
        });
      }

      res.status(200).json({
        message: "Blood Request Updated Successfully",
      });
    }
  );
};
const deleteRequest = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM blood_requests WHERE request_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Delete Request",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Blood Request Not Found",
      });
    }

    res.status(200).json({
      message: "Blood Request Deleted Successfully",
    });
  });
};

const acceptRequest = (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE blood_requests
    SET status = 'Accepted'
    WHERE request_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Accept Request",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Blood Request Not Found",
      });
    }

    res.status(200).json({
      message: "Blood Request Accepted Successfully",
    });
  });
};

const rejectRequest = (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE blood_requests
    SET status = 'Rejected'
    WHERE request_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Reject Request",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Blood Request Not Found",
      });
    }

    res.status(200).json({
      message: "Blood Request Rejected Successfully",
    });
  });
};

const completeRequest = (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE blood_requests
    SET status = 'Completed'
    WHERE request_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Complete Request",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Blood Request Not Found",
      });
    }

    res.status(200).json({
      message: "Blood Request Completed Successfully",
    });
  });
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  acceptRequest,
  rejectRequest,
  completeRequest,
};