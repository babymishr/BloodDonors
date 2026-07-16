const db = require("../config/db");

// Create Blood Stock
const createBloodStock = (req, res) => {
  const { blood_bank_id, blood_group, units_available } = req.body;

  const sql = `
    INSERT INTO blood_stock
    (blood_bank_id, blood_group, units_available)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [blood_bank_id, blood_group, units_available],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Add Blood Stock",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Blood Stock Added Successfully",
      });
    }
  );
};

// Get All Blood Stock
const getAllBloodStock = (req, res) => {
  const sql = "SELECT * FROM blood_stock";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Blood Stock",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "All Blood Stock",
      total: result.length,
      stock: result,
    });
  });
};

// Get Blood Stock By ID
const getBloodStockById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM blood_stock WHERE stock_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Blood Stock",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Blood Stock Not Found",
      });
    }

    res.status(200).json({
      message: "Blood Stock Found",
      stock: result[0],
    });
  });
};

// Update Blood Stock
const updateBloodStock = (req, res) => {
  const { id } = req.params;

  const { blood_group, units_available } = req.body;

  const sql = `
    UPDATE blood_stock
    SET
      blood_group = ?,
      units_available = ?
    WHERE stock_id = ?
  `;

  db.query(
    sql,
    [blood_group, units_available, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Update Blood Stock",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Blood Stock Not Found",
        });
      }

      res.status(200).json({
        message: "Blood Stock Updated Successfully",
      });
    }
  );
};

// Delete Blood Stock
const deleteBloodStock = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM blood_stock WHERE stock_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Delete Blood Stock",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Blood Stock Not Found",
      });
    }

    res.status(200).json({
      message: "Blood Stock Deleted Successfully",
    });
  });
};

const searchBloodByGroup = (req, res) => {
  const { blood_group } = req.params;

  const sql = `
    SELECT *
    FROM blood_stock
    WHERE blood_group = ?
  `;

  db.query(sql, [blood_group], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Search Failed",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Blood Not Available",
      });
    }

    res.status(200).json({
      message: "Blood Found",
      total: result.length,
      stock: result,
    });
  });
};


const availableBlood = (req, res) => {

  const { blood_group } = req.params;

  const sql = `
    SELECT *
    FROM blood_stock
    WHERE blood_group = ?
    AND units_available > 0
  `;

  db.query(sql,[blood_group],(err,result)=>{

    if(err){
      return res.status(500).json({
        message:"Failed",
        error:err.message
      });
    }


    if(result.length===0){
      return res.status(404).json({
        message:"Blood Not Available"
      });
    }

    res.status(200).json({
      message:"Available Blood",
      total:result.length,
      stock:result
    });

  });

};

const searchBloodByCity = (req, res) => {
  const { city, blood_group } = req.params;

  const sql = `
    SELECT
      bs.stock_id,
      bb.blood_bank_name,
      bb.city,
      bs.blood_group,
      bs.units_available
    FROM blood_stock bs
    JOIN blood_banks bb
      ON bs.blood_bank_id = bb.blood_bank_id
    WHERE bb.city = ? AND bs.blood_group = ?
  `;

  db.query(sql, [city, blood_group], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Search Failed",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Blood Not Available",
      });
    }

    res.status(200).json({
      message: "Blood Found",
      total: result.length,
      stock: result,
    });
  });
};


const getLowStock = (req, res) => {

  const sql = `
    SELECT *
    FROM blood_stock
    WHERE units_available <= 5
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Failed",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Low Stock",
      total: result.length,
      stock: result,
    });

  });

};

const getOutOfStock = (req, res) => {

  const sql = `
    SELECT *
    FROM blood_stock
    WHERE units_available = 0
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Failed",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Out Of Stock",
      total: result.length,
      stock: result,
    });

  });

};

const increaseStock = (req, res) => {

  const { id } = req.params;
  const { units } = req.body;

  const sql = `
    UPDATE blood_stock
    SET units_available = units_available + ?
    WHERE stock_id = ?
  `;

  db.query(sql, [units, id], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Failed",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Stock Increased Successfully",
    });

  });

};

const decreaseStock = (req, res) => {

  const { id } = req.params;
  const { units } = req.body;

  const sql = `
    UPDATE blood_stock
    SET units_available = units_available - ?
    WHERE stock_id = ?
    AND units_available >= ?
  `;

  db.query(sql, [units, id, units], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Failed",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Not Enough Stock",
      });
    }

    res.status(200).json({
      message: "Stock Decreased Successfully",
    });

  });

};

module.exports = {
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
};