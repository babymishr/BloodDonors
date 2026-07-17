import blood1 from "../assets/blood1.jpg";
import blood2 from "../assets/blood2.jpg";
import blood3 from "../assets/blood3.jpg";
import blood4 from "../assets/blood4.jpg";
import blood5 from "../assets/blood5.jpg";
import "./HeroSection.css";
function HeroSection() {
  return (
    <div
      id="heroCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >

      <div className="carousel-inner">

        <div className="carousel-item active">
          <img
            src={blood5}
            className="d-block w-100"
            alt="Blood Donation"
          />
        </div>

        <div className="carousel-item">
          <img
            src={blood2}
            className="d-block w-100"
            alt="Blood Donation"
          />
        </div>

        <div className="carousel-item">
          <img
            src={blood3}
            className="d-block w-100"
            alt="Blood Donation"
          />
        </div>

         <div className="carousel-item active">
          <img
            src={blood1}
            className="d-block w-100"
            alt="Blood Donation"
          />
        </div>
          
         <div className="carousel-item active">
          <img
            src={blood4}
            className="d-block w-100"
            alt="Blood Donation"
          />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}

export default HeroSection;