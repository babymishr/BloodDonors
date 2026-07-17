import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h2>BloodConnect</h2>
          <p>Donate Blood, Save Lives.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>About</p>
          <p>Blood Request</p>
          <p>Contact</p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: support@bloodconnect.com</p>
          <p>Phone: +91 9876543210</p>
          <p>India</p>
        </div>
      </div>
      
      <hr />

      <p className="copyright">
        © 2026 BloodConnect. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;