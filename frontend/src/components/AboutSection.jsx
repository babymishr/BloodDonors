function AboutSection() {
  return (
    <section className="about">

      <h2>About BloodConnect</h2>

      <p>
        BloodConnect is an online blood donation management system that
        connects blood donors, patients, hospitals, and blood banks.
        Our goal is to make blood available quickly during emergencies
        and encourage more people to donate blood.
      </p>

      <div className="about-cards">

        <div className="card">
          <h3>Our Mission</h3>
          <p>
            Save lives by making blood donation easy and accessible for everyone.
          </p>
        </div>

        <div className="card">
          <h3>Our Vision</h3>
          <p>
            Build a trusted platform where donors and patients can connect safely.
          </p>
        </div>

        <div className="card">
          <h3>Why Choose Us?</h3>
          <p>
            Fast donor search, secure requests, and verified blood donors.
          </p>
        </div>

      </div>

    </section>
  );
}

export default AboutSection;