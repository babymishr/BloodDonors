import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";
function Contact() {
  return (
    <>
      <Navbar />

      <section className="contact">
        <h1>Contact Us</h1>

        <form>
          <label>Name</label>
          <input type="text" placeholder="Enter your name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Message</label>
          <textarea
            rows="5"
            placeholder="Write your message"
          ></textarea>

          <button>Send Message</button>
        </form>
      </section>

      <Footer />
    </>
  );
}

export default Contact;