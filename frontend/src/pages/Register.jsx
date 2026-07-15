function Register() {
  return (
    <div className="register-container">
      <h1>Create Account</h1>

      <form>
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
        />

        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Enter your phone number"
        />

        <label>Blood Group</label>
        <select>
          <option>Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <label>Password</label>
        <input
          type="password"
          placeholder="Create password"
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;