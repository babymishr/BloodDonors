const db = require("../config/db");

// ==========================
// Common Query Handler
// ==========================

const executeQuery = (
  res,
  sql,
  params,
  successCallback,
  errorMessage = "Database Error"
) => {
  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: errorMessage,
        error: err.message,
      });
    }

    successCallback(result);
  });
};


// ==========================
// Dashboard
// ==========================

const getDashboard = (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM donors) AS totalDonors,
      (SELECT COUNT(*) FROM patients) AS totalPatients,
      (SELECT COUNT(*) FROM hospitals) AS totalHospitals,
      (SELECT COUNT(*) FROM blood_banks) AS totalBloodBanks,
      (SELECT COUNT(*) FROM blood_requests) AS totalRequests
  `;

  executeQuery(res, sql, [], (result) => {
    res.status(200).json({
      message: "Admin Dashboard",
      dashboard: result[0],
    });
  });
};


// ==========================
// Blood Request Common Function
// ==========================

const getRequestsByStatus = (status, res) => {

  const sql = `
    SELECT * FROM blood_requests
    WHERE status = ?
  `;

  executeQuery(res, sql, [status], (result) => {

    res.status(200).json({
      message: `${status} Requests`,
      total: result.length,
      requests: result,
    });

  });
};


const getPendingRequests = (req, res) => {
  getRequestsByStatus("Pending", res);
};


const getAcceptedRequests = (req, res) => {
  getRequestsByStatus("Accepted", res);
};


const getRejectedRequests = (req, res) => {
  getRequestsByStatus("Rejected", res);
};


const getCompletedRequests = (req, res) => {
  getRequestsByStatus("Completed", res);
};


// ==========================
// Common Get Users Function
// ==========================

const getUsersByTable = (tableName, keyName, message, res) => {

  const sql = `SELECT * FROM ${tableName}`;

  executeQuery(res, sql, [], (result) => {

    res.status(200).json({
      message: message,
      total: result.length,
      [keyName]: result,
    });

  });

};


const getAllDonorsAdmin = (req, res) => {
  getUsersByTable(
    "donors",
    "donors",
    "All Donors",
    res
  );
};


const getAllPatientsAdmin = (req, res) => {
  getUsersByTable(
    "patients",
    "patients",
    "All Patients",
    res
  );
};


const getAllHospitalsAdmin = (req, res) => {
  getUsersByTable(
    "hospitals",
    "hospitals",
    "All Hospitals",
    res
  );
};


const getAllBloodBanksAdmin = (req, res) => {
  getUsersByTable(
    "blood_banks",
    "bloodBanks",
    "All Blood Banks",
    res
  );
};



// ==========================
// Common Delete Function
// ==========================

const deleteUserByTable = (
  tableName,
  idColumn,
  name,
  req,
  res
) => {

  const { id } = req.params;


  const sql = `
    DELETE FROM ${tableName}
    WHERE ${idColumn} = ?
  `;


  executeQuery(
    res,
    sql,
    [id],
    (result)=>{


      if(result.affectedRows === 0){

        return res.status(404).json({
          message:`${name} Not Found`,
        });

      }


      res.status(200).json({
        message:`${name} Deleted Successfully`,
      });


    }
  );

};



const deleteDonorAdmin = (req,res)=>{
  deleteUserByTable(
    "donors",
    "donor_id",
    "Donor",
    req,
    res
  );
};


const deletePatientAdmin = (req,res)=>{
  deleteUserByTable(
    "patients",
    "patient_id",
    "Patient",
    req,
    res
  );
};


const deleteHospitalAdmin = (req,res)=>{
  deleteUserByTable(
    "hospitals",
    "hospital_id",
    "Hospital",
    req,
    res
  );
};


const deleteBloodBankAdmin = (req,res)=>{
  deleteUserByTable(
    "blood_banks",
    "blood_bank_id",
    "Blood Bank",
    req,
    res
  );
};



// ==========================
// Common Verify Function
// ==========================


const verifyOrganization = (
  tableName,
  idColumn,
  name,
  req,
  res
)=>{

  const {id}=req.params;


  const sql = `
    UPDATE ${tableName}
    SET is_verified = TRUE
    WHERE ${idColumn} = ?
  `;


  executeQuery(
    res,
    sql,
    [id],
    (result)=>{


      if(result.affectedRows===0){

        return res.status(404).json({
          message:`${name} Not Found`,
        });

      }


      res.status(200).json({
        message:`${name} Verified Successfully`,
      });


    }
  );


};



const verifyHospital = (req,res)=>{

  verifyOrganization(
    "hospitals",
    "hospital_id",
    "Hospital",
    req,
    res
  );

};



const verifyBloodBank = (req,res)=>{

  verifyOrganization(
    "blood_banks",
    "blood_bank_id",
    "Blood Bank",
    req,
    res
  );

};



// ==========================
// Export
// ==========================

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