import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Portfolio from "./components/Portfolio";
import Hero from "./components/Hero";
import Testmonial from "./components/Testmonial";
import LetsTalk from "./components/LetsTalk";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ'S";
import FAQCTA from "./components/FaqCta";


// Main landing website
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
     <Navbar/>
      <main>
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="services"><Services/></section>
        <section id="portfolio"><Portfolio  preview={true} /></section>
  <section id="testimonials"><Testmonial /></section>
  <section id="pricing"> <Pricing/></section>
  <section id="cta"> <CTA/> </section>
  <section id="let-start"><LetsTalk /></section>
  <section id="faq"> <FAQ/> </section>
  <section id="FaqCta"> <FAQCTA/> </section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  );
};

export default  App;
