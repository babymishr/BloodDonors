const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database Error",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }


    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
   
    const token = jwt.sign(
  {
    id: user.id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d",
  }
);
    res.status(200).json({
      message: "Login Successful",
      token,
      user,

    });
  });
};

const signup = async (req, res) => {
  const { full_name, email, password, role, phone, city } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO users (full_name, email, password, role, phone, city)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [full_name, email, hashedPassword, role, phone, city],
    (err, result) => {
      console.log("Error =>", err);
      console.log("Result =>", result);

      if (err) {
        return res.status(500).json({
          message: "Signup Failed",
          error: err.message,
        });
      }

      return res.status(201).json({
        message: "User Registered Successfully",
      });
    }
  );
};
const getProfile = (req, res) => {
  res.status(200).json({
    message: "Profile Accessed Successfully",
    user: req.user,
  });
};

module.exports = { 
  signup ,
  login,
  getProfile,
};