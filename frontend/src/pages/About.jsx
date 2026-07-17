import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";

function About() {
  return (
    <>
      <Navbar />

      <section className="about">
        <h1>About BloodDonors</h1>

        <p>
          BloodDonors is a Blood Donation Management System that connects
          donors, patients, hospitals, and blood banks on one platform.
        </p>

        <h2>Our Mission</h2>

        <p>
          Our mission is to save lives by making blood donation simple,
          fast, and accessible to everyone.
        </p>

        <h2>Our Vision</h2>

        <p>
          We aim to build a trusted community where blood is always
          available for people in need.
        </p>
      </section>

      <Footer />
    </>
  );
}

export default About;