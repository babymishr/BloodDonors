
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import BloodGroups from "../components/BloodGroups";
import Footer from "../components/Footer";
import HowItwork from '../components/ HowItWorks'
import AboutSection from "../components/AboutSection"
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <>
    <div className="home">
      <Navbar />
      <HeroSection />
      <BloodGroups />
      <Footer />
      <HowItwork/>
      <AboutSection/>
      <Sidebar/>
      </div>
      

    </>
  );
}

export default Home;