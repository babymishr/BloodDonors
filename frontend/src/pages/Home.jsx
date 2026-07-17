import "./Home.css";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Sidebar from "../components/Sidebar";



function Home() {
  return (
    <>
    <div className="home">
      <Navbar />
      <HeroSection/>
      <Sidebar/>
      <Footer />
      </div>
      

    </>
  );
}

export default Home;