import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Hero from "./components/Hero";
import Testmonial from "./components/Testmonial";
import LetsTalk from "./components/LetsTalk";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ'S";
import FAQCTA from "./components/FaqCta";
import Navbar from "./components/Navbar";


// Main landing website
const App = () => {
  return (
    <>
      
        <div id="home"><Hero /></div>
        <div id="about"><About /></div>
        <div id="services"><Services/></div>
        {/* <section id="portfolio"><Portfolio  preview={true} /></section> */}
  <section id="testimonials"><Testmonial /></section>
  <div id="cta"> <CTA/> </div>
  <section id="let-start"><LetsTalk /></section>
  <section id="faq"> <FAQ/> </section>
  <div id="FaqCta"> <FAQCTA/> </div>
        <section id="contact"><Contact /></section>
      
      <Footer />
      
    </>
  );
};

export default  App;
