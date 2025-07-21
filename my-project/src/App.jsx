import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Portfolio from "./components/Portfolio";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Testmonial from "./components/Testmonial";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import OrderSuccessPage from "./pages/OrderPlaced";
import MessageSent from "./pages/MessageSent"; 
import DesignGallery from "./pages/DesignGallery";
import BookConsultation from "./pages/BookConsultation";
import PurchasePlan from "./pages/PurchasePlan";


// Main landing website
const MainWebsite = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Portfolio />
      <Services />
      <Testmonial />
      
      <Pricing />
      <Contact />
      <About />
      <Footer />
    </>
  );
};

const App = () => {
  const isAdmin = localStorage.getItem("admin") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainWebsite />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard/*"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />}
        />
        
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="*" element={<Navigate to="/" />} />
         <Route path="/designs" element={<DesignGallery />} />
        <Route path="/message-sent" element={<MessageSent />} />
        <Route path="/book-consultation" element={<BookConsultation />} />
        <Route path="/purchase-plan" element={<PurchasePlan />} />
      </Routes>
    </Router>
  );
};

export default App;
